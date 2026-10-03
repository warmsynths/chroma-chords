import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ProjectData, ProjectChord } from './services/project-service';
import { projectStorage, SyncStatus } from './services/project-storage';
import { playbackEngine } from './services/playback-engine';
import { PromptClassifier } from './services/prompt-classifier';
import { SongArranger, SongSection, SongTimelineItem } from './services/song-arranger';
import { loadChordData, generateProgression, extendProgression, RawChordData, Progression, ChordBlock, notesForSymbol, preferFlatSpelling, getMoodColor, applyVoicingToChord } from './services/chord-engine';
import { USER_INSTRUMENTS, USER_PLAY_STYLES } from './services/audio-service';
import { authService } from './services/auth-service';
import { melodyEngine, MelodyTrack } from './services/melody-engine';
import { NavTabId } from './components/app-header';
import { PlayInstrument } from './components/tabs/tab-play';
import './components/app-header';
import './components/transport-bar';
import './components/mobile-dock';
import './components/tabs/tab-chords';
import './components/tabs/tab-melody';
import './components/tabs/tab-song';
import './components/tabs/tab-play';
import './components/aside/chord-inspector';
import './components/modals/midi-modal';
import './components/share-modal';
import './components/auth-modal';
import './components/loop-screen';

function getMoodTint(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 201;
  const g = parseInt(clean.substring(2, 4), 16) || 169;
  const b = parseInt(clean.substring(4, 6), 16) || 224;
  return `rgba(${r}, ${g}, ${b}, 0.18)`;
}

@customElement('chroma-chords-app')
export class ChromaChordsApp extends LitElement {
  @state() private activeTab: NavTabId = 'loop';
  @state() private chordData: RawChordData = { chords: {}, scales: {} };
  @state() private libraryOpen = false;
  @state() private genre = 'Pop';
  @state() private mood = 'Dreamy';
  @state() private progression: Progression | null = null;
  @state() private activeIndex = 0;
  @state() private progressStep = 0;
  @state() private order: number[] = [0, 1, 2, 3];
  @state() private playing = false;
  @state() private showTheory = false;
  @state() private instrument: string | null = null;
  @state() private playStyle: string | null = null;
  @state() private length = 4;
  @state() private sections: SongSection[] = [];
  @state() private songTimeline: SongTimelineItem[] = [];
  @state() private activeSectionIdx = 0;
  @state() private activePlayingSectionIdx = 0;
  @state() private totalSongSteps = 0;
  @state() private userEmail: string | null = null;
  @state() private isAuthenticated = false;
  @state() private syncStatus: SyncStatus = 'sign-in';
  @state() private syncError: string | null = null;
  @state() private authModalOpen = false;
  @state() private midiModalOpen = false;
  @state() private shareModalOpen = false;
  @state() private selectedChordIndex: number | null = null;
  @state() private selectedBand: string | null = null;
  @state() private melodyTrack: MelodyTrack | null = null;
  @state() private playInstrument: PlayInstrument = 'Piano';
  @state() private showDegrees = false;
  @state() private toastMessage: string | null = null;
  @state() private toastUndoId: string | null = null;
  @state() private isGenerating = false;
  @state() private chordLengthCache: ChordBlock[] = [];

  private currentProjectId: string | null = null;
  private activeSearchPrompt: string | null = null;
  private unsubscribeAuth: (() => void) | null = null;
  private unsubscribeProjects: (() => void) | null = null;
  private unsubscribeSyncStatus: (() => void) | null = null;
  private unsubscribeTick: (() => void) | null = null;
  private toastDismissTimeout: ReturnType<typeof setTimeout> | null = null;

  static styles = css`
    :host {
      --cv-ease: cubic-bezier(0.23, 1, 0.32, 1);
      --cv-font: 'Plus Jakarta Sans', sans-serif;
      --cv-cream: #FBF3E6;
      --cv-surface: #F6EADB;
      --cv-surface-2: #F1E4CC;
      --cv-canvas: #EDE3D3;
      --cv-ink: #2E271F;
      --cv-ink-muted: #6B5F50;
      --cv-label: #8A6B3F;
      --cv-red: #F2A79B;
      --cv-red-deep: #F2735F;
      --cv-blue: #9CC0EC;
      --cv-yellow: #F6D98B;
      --cv-purple: #C9A9E0;
      --cv-green: #B8CC9E;
      --cv-plum: #9B7CA8;

      display: flex;
      flex-direction: column;
      height: 100%;
      height: 100vh;
      height: 100dvh;
      width: 100%;
      background: var(--cv-cream, #FBF3E6);
      font-family: var(--cv-font);
      color: var(--cv-ink);
      overflow: hidden;
      box-sizing: border-box;
    }

    .app-header-container {
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      background: var(--cv-cream);
      flex-shrink: 0;
      z-index: 40;
    }

    .screen-view {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      padding: 20px 24px 28px;
      box-sizing: border-box;
    }

    @media (max-width: 899px) {
      .screen-view {
        padding: var(--cv-mob-panel-padding, 14px 18px 26px);
        padding-bottom: 96px;
        box-sizing: border-box;
      }
    }

    .tab-content-wrapper {
      max-width: 1360px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }

    /* Chords tab desktop aside split */
    .chords-tab-layout {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      width: 100%;
    }

    .chords-tab-layout .main-tinted-panel {
      flex: 1;
      min-width: 0;
    }

    .desktop-aside {
      flex-shrink: 0;
      width: clamp(304px, 26vw, 384px);
    }

    @media (max-width: 1024px) {
      .chords-tab-layout {
        flex-direction: column;
      }
      .desktop-aside {
        width: 100%;
      }
    }

    /* ONE Main Panel (Mood-Tinted 18% alpha, Radius 26px / 22px mobile) */
    .main-tinted-panel {
      position: relative;
      border-radius: 26px;
      padding: 16px 20px 24px;
      background: var(--panel-tint-bg, rgba(201, 169, 224, 0.18));
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 4px 24px rgba(46, 39, 31, 0.04);
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      box-sizing: border-box;
    }

    @media (max-width: 899px) {
      .main-tinted-panel {
        border-radius: 22px;
        padding: 14px 16px 20px;
      }
    }

    .transport-container {
      flex-shrink: 0;
      z-index: 45;
    }

    .dock-container {
      flex-shrink: 0;
      z-index: 45;
    }

    .desktop-only {
      display: block;
    }
    .mobile-only {
      display: none;
    }

    @media (max-width: 899px) {
      .desktop-only {
        display: none !important;
      }
      .mobile-only {
        display: block !important;
      }
    }

    .save-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      background: var(--cv-ink);
      color: var(--cv-cream);
      padding: 10px 18px 10px 20px;
      border-radius: 100px;
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 13.5px;
      font-weight: 700;
      box-shadow: 0 16px 36px -10px rgba(46, 39, 31, 0.45);
      z-index: 99;
      animation: cv-toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes cv-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(14px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .toast-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast-btn {
      background: rgba(253, 246, 235, 0.16);
      color: var(--cv-cream);
      border: none;
      padding: 4px 10px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s ease;
    }
    .toast-btn:hover {
      background: rgba(253, 246, 235, 0.28);
    }
    .toast-btn.undo {
      color: #F2A79B;
    }

    @media (prefers-reduced-motion: reduce) {
      .screen-view {
        transition: opacity 150ms ease;
        transform: none !important;
      }
      .save-toast {
        animation: none;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    const safeGet = (k: string) => {
      try { return typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function' ? localStorage.getItem(k) : null; } catch { return null; }
    };
    this.showTheory = (safeGet('chroma-chords-show-theory') || safeGet('chord-voyager-show-theory')) === 'true';
    const savedInstrument = safeGet('chroma-chords-instrument');
    if (savedInstrument && USER_INSTRUMENTS.some(i => i.name === savedInstrument)) this.instrument = savedInstrument;
    const savedPlayStyle = safeGet('chroma-chords-play-style');
    if (savedPlayStyle && USER_PLAY_STYLES.some(p => p.name === savedPlayStyle)) this.playStyle = savedPlayStyle;

    playbackEngine.setInstrument(this.instrument);
    playbackEngine.setPlayStyle(this.playStyle);

    this.unsubscribeAuth = authService.subscribe((state) => {
      this.userEmail = state.user?.email || null;
      this.isAuthenticated = state.isAuthenticated;
    });

    this.unsubscribeProjects = projectStorage.subscribeProjects(() => {
      this.requestUpdate();
    });

    this.unsubscribeSyncStatus = projectStorage.subscribeSyncStatus((status) => {
      const prevStatus = this.syncStatus;
      this.syncStatus = status;
      this.syncError = projectStorage.getLastSyncError();
      if (status === 'offline' && prevStatus !== 'offline') {
        const err = this.syncError || 'Cloud sync failed';
        this.showToast(`Sync failed: ${err}`);
      }
      this.requestUpdate();
    });

    this.unsubscribeTick = playbackEngine.subscribeTick((activeIdx, step, secIdx, totalSteps, isSongMode) => {
      this.activeIndex = activeIdx;
      this.progressStep = step;
      if (typeof secIdx === 'number') {
        this.activePlayingSectionIdx = secIdx;
      }
      if (typeof totalSteps === 'number') {
        this.totalSongSteps = totalSteps;
      }
      this.playing = playbackEngine.isPlaying();
    });

    window.addEventListener('hashchange', this.onHashChange);
    window.addEventListener('keydown', this.onGlobalKeyDown);
    this.syncRouteFromHash();

    loadChordData().then(data => {
      this.chordData = data;
      if (!this.progression) {
        this.progression = generateProgression(this.chordData, this.genre, this.mood, {
          length: this.length,
        });
        this.order = Array.from({ length: this.length }, (_, i) => i);
        playbackEngine.setProgression(this.progression, this.order);
        this.sections = SongArranger.createInitialSong(this.progression, this.order);
        this.songTimeline = SongArranger.createDefaultTimeline(this.sections);
        this.melodyTrack = melodyEngine.generateMelody(this.progression);
        playbackEngine.setMelodyTrack(this.melodyTrack);
      }
    }).catch(err => {
      console.error('Failed to load chord data:', err);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    playbackEngine.stopAutoplay();
    window.removeEventListener('hashchange', this.onHashChange);
    window.removeEventListener('keydown', this.onGlobalKeyDown);
    if (this.unsubscribeAuth) this.unsubscribeAuth();
    if (this.unsubscribeProjects) this.unsubscribeProjects();
    if (this.unsubscribeSyncStatus) this.unsubscribeSyncStatus();
    if (this.unsubscribeTick) this.unsubscribeTick();
    if (this.toastDismissTimeout) clearTimeout(this.toastDismissTimeout);
  }

  get isAdmin(): boolean {
    return projectStorage.isAdmin;
  }

  private onHashChange = () => {
    this.syncRouteFromHash();
  };

  private onGlobalKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.libraryOpen) {
        this.libraryOpen = false;
        this.requestUpdate();
      }
    }
  };

  private syncRouteFromHash() {
    const hash = window.location.hash.replace(/^#/, '').toLowerCase();
    if (hash === 'sets' || hash === '11a') {
      this.libraryOpen = true;
    } else if (hash === 'melody') {
      this.activeTab = 'melody';
    } else if (hash === 'song') {
      this.activeTab = 'song';
    } else if (hash === 'play') {
      this.activeTab = 'play';
    } else if (hash === 'chords' || hash === 'loop') {
      this.activeTab = 'loop';
    }
  }

  private onLoginRequest = () => {
    this.authModalOpen = true;
  };

  private onLogoutRequest = async () => {
    await authService.signOut();
    projectStorage.logout();
  };

  private onGenreChange(e: CustomEvent<string>) {
    this.genre = e.detail;
    this.regenerate();
  }

  private onMoodChange(e: CustomEvent<string>) {
    this.mood = e.detail;
    this.regenerate();
  }

  private async onGenerate(e?: CustomEvent<{ promptText?: string } | string>) {
    if (this.isGenerating) return;
    this.isGenerating = true;
    try {
      const detailPrompt = typeof e?.detail === 'string' ? e.detail : e?.detail?.promptText;
      const searchTerm = detailPrompt || this.activeSearchPrompt || undefined;
      if (searchTerm) {
        this.showToast('Composing chords with AI...');
      }
      const result = await PromptClassifier.resolvePrompt(
        this.chordData,
        this.genre,
        this.mood,
        this.length,
        searchTerm
      );

      if (result.instrument) {
        this.instrument = result.instrument;
        localStorage.setItem('chroma-chords-instrument', result.instrument);
        playbackEngine.setInstrument(result.instrument);
      }
      if (result.playStyle) {
        this.playStyle = result.playStyle;
        localStorage.setItem('chroma-chords-play-style', result.playStyle);
        playbackEngine.setPlayStyle(result.playStyle);
      }

      const progression = result.progression;
      this.progression = progression;
      if (progression.genre) this.genre = progression.genre;
      if (progression.mood) this.mood = progression.mood;
      this.order = Array.from({ length: progression.chords.length }, (_, i) => i);
      this.length = progression.chords.length;
      this.activeIndex = 0;
      this.progressStep = 0;
      this.playing = false;
      this.chordLengthCache = [];

      playbackEngine.setProgression(progression, this.order);
      playbackEngine.reset();

      this.sections = SongArranger.createInitialSong(progression, this.order);
      this.songTimeline = SongArranger.createDefaultTimeline(this.sections);
      this.melodyTrack = melodyEngine.generateMelody(progression);
      playbackEngine.setMelodyTrack(this.melodyTrack);
      this.activeSectionIdx = 0;
      this.activeSearchPrompt = null;
      if (searchTerm) {
        this.showToast(`Composed from "${searchTerm}"`);
      }
    } catch (err) {
      console.error('Failed to generate progression:', err);
      this.showToast('Failed to generate progression. Please try again.');
    } finally {
      this.isGenerating = false;
    }
  }

  private onLengthChange(e: CustomEvent<number>) {
    const targetLength = e.detail;
    if (!this.progression) return;
    if (targetLength === this.length) return;

    const result = extendProgression(
      this.progression,
      targetLength,
      this.chordData,
      this.chordLengthCache
    );

    this.progression = result.progression;
    this.chordLengthCache = result.cachedTailChords;
    this.length = this.progression.chords.length;
    this.order = Array.from({ length: this.length }, (_, i) => i);

    playbackEngine.setProgression(this.progression, this.order);

    if (this.sections.length > 0) {
      this.sections = SongArranger.syncActiveSection(this.sections, this.activeSectionIdx, this.progression, this.order);
    } else {
      this.sections = SongArranger.createInitialSong(this.progression, this.order);
    }
    this.songTimeline = SongArranger.createDefaultTimeline(this.sections);

    if (this.melodyTrack && this.progression) {
      this.melodyTrack = melodyEngine.alignMelodyToChords(this.melodyTrack, this.progression);
      playbackEngine.setMelodyTrack(this.melodyTrack);
    }

    this.requestUpdate();
  }

  private regenerate() {
    if (!this.chordData.scales || Object.keys(this.chordData.scales).length === 0) return;
    this.chordLengthCache = [];
    const progression = generateProgression(this.chordData, this.genre, this.mood, {
      length: this.length,
    });
    this.progression = progression;
    this.order = Array.from({ length: this.length }, (_, i) => i);
    this.activeIndex = 0;
    this.progressStep = 0;
    
    playbackEngine.setProgression(progression, this.order);

    this.sections = SongArranger.createInitialSong(this.progression, this.order);
    this.songTimeline = SongArranger.createDefaultTimeline(this.sections);
    this.melodyTrack = melodyEngine.generateMelody(this.progression);
    playbackEngine.setMelodyTrack(this.melodyTrack);
    this.activeSectionIdx = 0;

    if (this.playing) {
      playbackEngine.startAutoplay();
      playbackEngine.playActiveChord();
    }
    this.requestUpdate();
  }

  private onReroll() {
    this.regenerate();
  }

  private onLoadProject(e: CustomEvent<ProjectData>) {
    const p = e.detail;
    const chords: ChordBlock[] = [];
    
    for (const c of p.chords) {
      let notes = c.notes;
      if (!notes || notes.length === 0) {
        notes = notesForSymbol(c.name, preferFlatSpelling(p.key || 'C', p.scaleType || 'MAJOR'));
      }
      chords.push({
        name: c.name,
        tag: c.tag || 'diatonic',
        roman: c.roman || '',
        color: c.color || '#9CC0EC',
        functionLabel: c.functionLabel || '',
        notes,
        scaleLabel: c.scaleLabel || '',
        desc: c.desc || '',
        degree: c.degree || '',
        scaleKey: c.scaleKey || '',
        tension: c.tension || 0.1,
      });
    }

    this.currentProjectId = p.id;
    this.genre = p.genre || 'Pop';
    this.mood = p.mood || 'Dreamy';
    this.progression = {
      genre: p.genre || 'Unknown',
      mood: p.mood || 'Neutral',
      key: p.key || 'C',
      scaleType: p.scaleType || 'MAJOR',
      bpm: p.bpm || 120,
      chords,
    };
    this.order = Array.from({ length: this.progression.chords.length }, (_, i) => i);
    this.length = this.progression.chords.length;
    this.chordLengthCache = [];
    this.showTheory = p.showTheory ?? this.showTheory;
    
    if (p.barsPerChord) {
      playbackEngine.setBarsPerChord(p.barsPerChord);
    }
    if (p.feel) {
      playbackEngine.setFeelSettings(p.feel);
    }
    playbackEngine.setProgression(this.progression, this.order);
    this.sections = SongArranger.createInitialSong(this.progression, this.order);
    this.songTimeline = SongArranger.createDefaultTimeline(this.sections);
    this.melodyTrack = melodyEngine.generateMelody(this.progression);
    playbackEngine.setMelodyTrack(this.melodyTrack);
    this.activeSectionIdx = 0;
    this.showToast(`Loaded "${p.name}"`);
  }

  private onDeleteProject(e: CustomEvent<string>) {
    projectStorage.deleteProject(e.detail);
    if (this.currentProjectId === e.detail) {
      this.currentProjectId = null;
    }
    this.requestUpdate();
  }

  private onRenameProject(e: CustomEvent<{ id: string; name: string }>) {
    const p = projectStorage.getProjects().find(proj => proj.id === e.detail.id);
    if (p) {
      p.name = e.detail.name;
      projectStorage.saveProject(p);
      this.requestUpdate();
    }
  }

  private async onSyncProjects() {
    await projectStorage.syncWithCloud();
    this.requestUpdate();
  }

  private onSaveSet(e: CustomEvent<string>) {
    this.saveProject(e.detail);
  }

  private onUnsaveSet(e: CustomEvent<string>) {
    const id = e.detail || this.currentProjectId;
    if (id) {
      const p = projectStorage.getProjects().find(proj => proj.id === id);
      const name = p?.name || 'Loop';
      if (p) {
        this.toastUndoProject = { ...p };
      }
      projectStorage.deleteProject(id);
      if (this.currentProjectId === id) {
        this.currentProjectId = null;
      }
      this.showToast(`Removed "${name}"`, id, 'restore');
      this.requestUpdate();
    }
  }

  private safeSet(k: string, v: string) {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem(k, v);
      }
    } catch {}
  }

  private onTheoryToggle() {
    this.showTheory = !this.showTheory;
    this.safeSet('chroma-chords-show-theory', String(this.showTheory));
  }

  private onSetInstrument(e: CustomEvent<string>) {
    this.instrument = e.detail;
    this.safeSet('chroma-chords-instrument', e.detail);
    playbackEngine.setInstrument(e.detail);
  }

  private onSetPlayStyle(e: CustomEvent<string>) {
    this.playStyle = e.detail;
    this.safeSet('chroma-chords-play-style', e.detail);
    playbackEngine.setPlayStyle(e.detail);
  }

  private onTogglePlay() {
    this.playing = playbackEngine.togglePlay();
  }

  private onTogglePlaySong() {
    playbackEngine.setSong(this.sections);
    this.playing = playbackEngine.togglePlay();
  }

  private onProgressionChange(e: CustomEvent<Progression>) {
    this.progression = e.detail;
    if (this.progression) {
      this.length = this.progression.chords.length;
      if (this.order.length !== this.length || this.order.some(idx => idx >= this.length)) {
        this.order = Array.from({ length: this.length }, (_, i) => i);
      }
    }
    playbackEngine.setProgression(this.progression, this.order);
    if (this.sections.length > 0) {
      this.sections = SongArranger.syncActiveSection(this.sections, this.activeSectionIdx, this.progression, this.order);
    }
    this.songTimeline = SongArranger.createDefaultTimeline(this.sections);

    if (this.melodyTrack && this.progression) {
      this.melodyTrack = melodyEngine.alignMelodyToChords(this.melodyTrack, this.progression);
      playbackEngine.setMelodyTrack(this.melodyTrack);
    }

    this.requestUpdate();
  }

  private onAddSection() {
    if (!this.progression) return;
    const res = SongArranger.addSection(this.sections, this.progression, this.chordData);
    this.sections = res.sections;
    this.songTimeline = SongArranger.createDefaultTimeline(this.sections);
    this.activeSectionIdx = res.activeIndex;
    const activeSec = this.sections[this.activeSectionIdx];
    if (activeSec) {
      this.progression = activeSec.progression;
      this.order = activeSec.order.slice();
      playbackEngine.setProgression(this.progression, this.order);
    }
    playbackEngine.setSong(this.sections);
    this.requestUpdate();
  }

  private onRemoveSection(e: CustomEvent<number>) {
    const idx = e.detail;
    const res = SongArranger.removeSection(this.sections, idx);
    this.sections = res.sections;
    this.songTimeline = SongArranger.createDefaultTimeline(this.sections);
    this.activeSectionIdx = res.activeIndex;
    const activeSec = this.sections[this.activeSectionIdx];
    if (activeSec) {
      this.progression = activeSec.progression;
      this.order = activeSec.order.slice();
      playbackEngine.setProgression(this.progression, this.order);
    }
    playbackEngine.setSong(this.sections);
    this.requestUpdate();
  }

  private onSelectSection(e: CustomEvent<number>) {
    this.activeSectionIdx = e.detail;
    const sec = this.sections[e.detail];
    if (sec) {
      this.progression = sec.progression;
      this.order = sec.order.slice();
      playbackEngine.setProgression(this.progression, this.order);
    }
    this.requestUpdate();
  }

  private toastUndoAction: 'delete' | 'restore' = 'delete';
  private toastUndoProject: ProjectData | null = null;

  private showToast(msg: string, undoId?: string, action: 'delete' | 'restore' = 'delete') {
    if (this.toastDismissTimeout) clearTimeout(this.toastDismissTimeout);
    this.toastMessage = msg;
    this.toastUndoId = undoId || null;
    this.toastUndoAction = action;
    this.toastDismissTimeout = setTimeout(() => {
      this.toastMessage = null;
      this.toastUndoId = null;
      this.toastUndoProject = null;
    }, 3200);
  }

  private onToastUndo() {
    if (this.toastUndoId) {
      if (this.toastUndoAction === 'restore' && this.toastUndoProject) {
        projectStorage.saveProject(this.toastUndoProject);
        this.currentProjectId = this.toastUndoProject.id;
      } else if (this.toastUndoAction === 'delete') {
        projectStorage.deleteProject(this.toastUndoId);
        if (this.currentProjectId === this.toastUndoId) {
          this.currentProjectId = null;
        }
      }
      this.toastMessage = null;
      this.toastUndoId = null;
      this.toastUndoProject = null;
      this.requestUpdate();
    }
  }

  private saveProject(customName?: string) {
    if (!this.progression) return;
    const id = this.currentProjectId || Math.random().toString(36).slice(2, 11);
    this.currentProjectId = id;
    
    const existing = projectStorage.getProjects().find(p => p.id === id);
    const name = customName || existing?.name || `Progression in ${this.progression.key} ${this.progression.scaleType}`;

    const feelSettings = playbackEngine.getFeelSettings();
    const barsPerChord = playbackEngine.getBarsPerChord();

    const project: ProjectData = {
      id,
      name,
      lastModified: Date.now(),
      genre: this.progression.genre,
      mood: this.progression.mood,
      key: this.progression.key,
      scaleType: this.progression.scaleType,
      bpm: this.progression.bpm,
      chords: this.progression.chords as unknown as ProjectChord[],
      showTheory: this.showTheory,
      barsPerChord,
      feel: {
        swing: feelSettings.swing ?? 0,
        spread: feelSettings.spread ?? 50,
        density: feelSettings.density ?? 50,
        tone: feelSettings.tone ?? 'Warm',
        humanState: feelSettings.humanState,
      },
    };
    projectStorage.saveProject(project);
    if (customName) {
      projectStorage.scheduleCloudSync();
    }
    this.showToast(`Saved "${name}"`, id, 'delete');
    this.requestUpdate();
  }

  render() {
    const isBookmarked = Boolean(this.currentProjectId && projectStorage.isProjectSaved(this.currentProjectId));
    const moodColor = getMoodColor(this.progression?.mood || this.mood);
    const moodTint = getMoodTint(moodColor);
    const activeSec = this.sections[this.activeSectionIdx];
    const activeSecLetter = activeSec ? (activeSec.id || String.fromCharCode(65 + this.activeSectionIdx)) : 'A';
    const totalBars = this.sections.reduce((acc, s) => acc + (s.order?.length || 4) * (playbackEngine.getBarsPerChord() || 1), 0);
    const songTotal = `${this.sections.length} sections · ${totalBars} bars`;

    return html`
      <div class="app-header-container">
        <app-header
          .activeTab=${this.activeTab}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${projectStorage.getProjects().length}
          .syncStatus=${this.syncStatus}
          .syncError=${this.syncError}
          @tab-change=${(e: CustomEvent<NavTabId>) => { this.activeTab = e.detail; }}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @sync-projects=${this.onSyncProjects}
          @view-sets=${() => { this.libraryOpen = true; }}
          @brand-click=${() => { this.activeTab = 'loop'; }}
          @open-midi=${() => { this.midiModalOpen = true; }}
        ></app-header>
      </div>

      <main class="screen-view" style="--panel-tint-bg: ${moodTint};">
        ${this.progression ? html`
          <div class="tab-content-wrapper">
            ${this.activeTab === 'loop' ? html`
              <div class="chords-tab-layout">
                <div class="main-tinted-panel">
                  <tab-chords
                    .progression=${this.progression}
                    .chordData=${this.chordData}
                    .moodColor=${moodColor}
                    .selectedBand=${this.selectedBand}
                    .isPlaying=${this.playing}
                    .activeIndex=${this.activeIndex}
                    .showTheory=${this.showTheory}
                    @chord-detail-open=${(e: CustomEvent) => {
                      this.selectedChordIndex = e.detail.index;
                    }}
                    @progression-update=${(e: CustomEvent) => {
                      if (this.progression) {
                        this.onProgressionChange(new CustomEvent('progression-change', {
                          detail: { ...this.progression, chords: e.detail.chords }
                        }));
                      }
                    }}
                    @set-chord-count=${(e: CustomEvent) => {
                      this.onLengthChange(new CustomEvent('set-length', { detail: e.detail.count }));
                    }}
                    @reroll=${this.onReroll}
                    @clear-band=${() => { this.selectedBand = null; }}
                    @open-vibe-picker=${() => { this.onReroll(); }}
                  ></tab-chords>
                </div>
                <aside class="desktop-aside">
                  <chord-inspector
                    .progression=${this.progression}
                    .selectedChordIndex=${this.selectedChordIndex}
                    .selectedBand=${this.selectedBand}
                    .showTheory=${this.showTheory}
                    .moodColor=${moodColor}
                    .isSaved=${isBookmarked}
                    @close-detail=${() => { this.selectedChordIndex = null; }}
                    @change-voicing=${(e: CustomEvent) => {
                      if (this.progression && this.selectedChordIndex !== null) {
                        const chords = [...this.progression.chords];
                        const cur = chords[this.selectedChordIndex];
                        if (cur) {
                          chords[this.selectedChordIndex] = applyVoicingToChord(cur, e.detail.voicing || 'Major', 'None');
                          this.onProgressionChange(new CustomEvent('progression-change', {
                            detail: { ...this.progression, chords }
                          }));
                        }
                      }
                    }}
                  ></chord-inspector>
                </aside>
              </div>
            ` : this.activeTab === 'melody' ? html`
              <div class="main-tinted-panel">
                <tab-melody
                  .progression=${this.progression}
                  .melodyTrack=${this.melodyTrack}
                  .activeStepIndex=${this.progressStep}
                  .playing=${this.playing}
                  @melody-change=${(e: CustomEvent) => {
                    this.melodyTrack = e.detail.track;
                    playbackEngine.setMelodyTrack(this.melodyTrack);
                  }}
                  @toast=${(e: CustomEvent<string>) => this.showToast(e.detail)}
                ></tab-melody>
              </div>
            ` : this.activeTab === 'song' ? html`
              <tab-song
                .sections=${this.sections}
                .timeline=${this.songTimeline}
                .activeSectionIdx=${this.activeSectionIdx}
                .activeTimelineIdx=${this.activePlayingSectionIdx}
                .currentStep=${this.progressStep}
                .playing=${this.playing}
                .mood=${this.mood}
                .bpm=${this.progression?.bpm || 120}
                @section-select=${(e: CustomEvent) => this.onSelectSection(e)}
                @add-section=${() => this.onAddSection()}
                @remove-section=${(e: CustomEvent) => this.onRemoveSection(e)}
                @timeline-change=${(e: CustomEvent) => {
                  this.songTimeline = e.detail.timeline;
                }}
              ></tab-song>
            ` : html`
              <tab-play
                .progression=${this.progression}
                .activeIndex=${this.activeIndex}
                .playing=${this.playing}
                .showTheory=${this.showTheory}
                .playInstrument=${this.playInstrument}
                .showDegrees=${this.showDegrees}
                .mood=${this.mood}
                @instrument-change=${(e: CustomEvent) => {
                  this.playInstrument = e.detail.instrument;
                }}
                @degrees-toggle=${(e: CustomEvent) => {
                  this.showDegrees = e.detail.showDegrees;
                }}
                @play-chord=${(e: CustomEvent) => {
                  if (e.detail.chord?.notes) {
                    playbackEngine.playChordNotes(e.detail.chord.notes, 0.85);
                  }
                }}
              ></tab-play>
            `}
          </div>
        ` : html`
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
            Loading studio workspace...
          </div>
        `}
      </main>

      <div class="transport-container desktop-only">
        <transport-bar
          .activeTab=${this.activeTab}
          .isPlaying=${this.playing}
          .playLabel=${this.activeTab === 'song' ? 'Play song' : 'Play section'}
          .moodColor=${moodColor}
          .sections=${this.sections}
          .activeSectionId=${activeSecLetter}
          .chordSound=${this.instrument || 'Stage Rhodes'}
          .melodySound=${'Lead Synth'}
          .chordFeel=${this.playStyle || 'Block chords'}
          .keyRoot=${this.progression?.key || 'C'}
          .scaleMode=${this.progression?.scaleType === 'MINOR' ? 'Minor' : 'Major'}
          .bpm=${this.progression?.bpm || 84}
          .barsPerChord=${playbackEngine.getBarsPerChord()}
          .songTotal=${songTotal}
          @toggle-play=${() => {
            if (this.activeTab === 'song') {
              this.onTogglePlaySong();
            } else {
              this.onTogglePlay();
            }
          }}
          @share-click=${() => { this.shareModalOpen = true; }}
          @bpm-change=${(e: CustomEvent) => {
            if (this.progression) {
              this.progression = { ...this.progression, bpm: e.detail.bpm };
              playbackEngine.setBpm(e.detail.bpm);
              this.requestUpdate();
            }
          }}
          @bars-change=${(e: CustomEvent) => {
            playbackEngine.setBarsPerChord(e.detail.bars);
            this.requestUpdate();
          }}
          @key-change=${(e: CustomEvent) => {
            if (this.progression) {
              this.progression = { ...this.progression, key: e.detail.root };
              playbackEngine.setProgression(this.progression, this.order);
              this.requestUpdate();
            }
          }}
          @scale-change=${(e: CustomEvent) => {
            if (this.progression) {
              const scaleType = e.detail.mode.toUpperCase();
              this.progression = { ...this.progression, scaleType };
              playbackEngine.setProgression(this.progression, this.order);
              this.requestUpdate();
            }
          }}
          @sound-change=${(e: CustomEvent) => {
            this.onSetInstrument(new CustomEvent('set-instrument', { detail: e.detail.sound }));
          }}
          @feel-change=${(e: CustomEvent) => {
            this.onSetPlayStyle(new CustomEvent('set-play-style', { detail: e.detail.feel }));
          }}
        ></transport-bar>
      </div>

      <div class="dock-container mobile-only">
        <mobile-dock
          .activeTab=${this.activeTab}
          .isPlaying=${this.playing}
          .playLabel=${this.activeTab === 'song' ? 'Play song' : 'Play section'}
          .moodColor=${moodColor}
          .sections=${this.sections}
          .activeSectionId=${activeSecLetter}
          .chordSound=${this.instrument || 'Stage Rhodes'}
          .melodySound=${'Lead Synth'}
          .chordFeel=${this.playStyle || 'Block chords'}
          .keyRoot=${this.progression?.key || 'C'}
          .scaleMode=${this.progression?.scaleType === 'MINOR' ? 'Minor' : 'Major'}
          .bpm=${this.progression?.bpm || 84}
          .barsPerChord=${playbackEngine.getBarsPerChord()}
          .isSaved=${isBookmarked}
          @toggle-play=${() => {
            if (this.activeTab === 'song') {
              this.onTogglePlaySong();
            } else {
              this.onTogglePlay();
            }
          }}
          @open-share=${() => { this.shareModalOpen = true; }}
          @reroll=${this.onReroll}
          @save-set=${() => { this.saveProject(); }}
          @unsave-set=${() => { if (this.currentProjectId) this.onUnsaveSet(new CustomEvent('unsave-set', { detail: this.currentProjectId })); }}
          @view-sets=${() => { this.libraryOpen = true; }}
          @set-bpm=${(e: CustomEvent) => {
            if (this.progression) {
              this.progression = { ...this.progression, bpm: e.detail.bpm };
              playbackEngine.setBpm(e.detail.bpm);
              this.requestUpdate();
            }
          }}
          @set-bars-per-chord=${(e: CustomEvent) => {
            playbackEngine.setBarsPerChord(e.detail.bars);
            this.requestUpdate();
          }}
          @set-key=${(e: CustomEvent) => {
            if (this.progression) {
              const root = e.detail.root;
              const mode = e.detail.mode?.toUpperCase() === 'MINOR' ? 'MINOR' : 'MAJOR';
              this.progression = { ...this.progression, key: root, scaleType: mode };
              playbackEngine.setProgression(this.progression, this.order);
              this.requestUpdate();
            }
          }}
          @set-sound=${(e: CustomEvent) => {
            this.onSetInstrument(new CustomEvent('set-instrument', { detail: e.detail.sound }));
          }}
          @set-feel=${(e: CustomEvent) => {
            this.onSetPlayStyle(new CustomEvent('set-play-style', { detail: e.detail.feel }));
          }}
        ></mobile-dock>
      </div>

      <midi-modal
        .isOpen=${this.midiModalOpen}
        @close-modal=${() => { this.midiModalOpen = false; }}
      ></midi-modal>

      <share-modal
        .open=${this.shareModalOpen}
        .progression=${this.progression}
        .order=${this.order}
        .instrument=${this.instrument}
        .playStyle=${this.playStyle}
        .barsPerChord=${playbackEngine.getBarsPerChord()}
        .feelSettings=${playbackEngine.getFeelSettings()}
        .melodyTrack=${this.melodyTrack}
        @close=${() => { this.shareModalOpen = false; }}
        @toast=${(e: CustomEvent<string>) => this.showToast(e.detail)}
      ></share-modal>

      <auth-modal
        .open=${this.authModalOpen}
        @close-modal=${() => { this.authModalOpen = false; }}
      ></auth-modal>

      ${this.toastMessage ? html`
        <div class="save-toast">
          <span>${this.toastMessage}</span>
          <div class="toast-actions">
            ${this.toastUndoId ? html`
              <button class="toast-btn" @click=${() => { this.libraryOpen = true; this.toastMessage = null; }}>View</button>
              <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
            ` : html`
              <button class="toast-btn" @click=${() => { this.toastMessage = null; }} aria-label="Dismiss">✕</button>
            `}
          </div>
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chroma-chords-app': ChromaChordsApp;
  }
}
