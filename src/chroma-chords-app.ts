import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ProjectData, ProjectChord } from './services/project-service';
import { projectStorage, SyncStatus } from './services/project-storage';
import { playbackEngine } from './services/playback-engine';
import { PromptClassifier } from './services/prompt-classifier';
import { SongArranger, SECTION_TEMPLATES } from './services/song-arranger';
import {
  loadChordData, generateProgression, RawChordData, Progression, ChordBlock, Alternative,
  TheoryGroup, BorrowedChordRow, generateAlternatives, generateTheoryGroups, generateBorrowedChords, applyVoicingToChord,
  notesForSymbol, preferFlatSpelling,
} from './services/chord-engine';
import { USER_INSTRUMENTS, USER_PLAY_STYLES } from './services/audio-service';
import { NormalizedPrompt } from './services/freetext-schema';
import { authService } from './services/auth-service';
import './components/seed-screen';
import './components/loop-screen';
import './components/song-screen';
import './components/sets-screen';
import './components/play-along-screen';
import './components/auth-modal';
import { SongSection } from './components/song-screen';

type Screen = 'seed' | 'loop' | 'song' | 'sets' | 'play-along';

@customElement('chroma-chords-app')
export class ChromaChordsApp extends LitElement {
  @state() private chordData: RawChordData = { chords: {}, scales: {} };
  @state() private screen: Screen = 'seed';
  @state() private genre = 'Pop';
  @state() private mood = 'Dreamy';
  @state() private progression: Progression | null = null;
  @state() private activeIndex = 0;
  @state() private progressStep = 0;
  @state() private order: number[] = [0, 1, 2, 3];
  @state() private keyOverride: string | null = null;
  @state() private scaleOverride: string | null = null;
  @state() private playing = false;
  @state() private showTheory = false;
  @state() private instrument: string | null = null;
  @state() private playStyle: string | null = null;
  @state() private sheetOpen = false;
  @state() private sheetMode: 'swap' | 'voicing' = 'swap';
  @state() private swapIndex: number | null = null;
  @state() private alternatives: Alternative[] = [];
  @state() private theoryGroups: TheoryGroup[] = [];
  @state() private borrowedChords: BorrowedChordRow[] = [];
  @state() private length = 4;
  @state() private sections: SongSection[] = [];
  @state() private activeSectionIdx = 0;
  @state() private activePlayingSectionIdx = 0;
  @state() private totalSongSteps = 0;
  @state() private pendingChordSuggestion: NormalizedPrompt | null = null;
  @state() private userEmail: string | null = null;
  @state() private isAuthenticated = false;
  @state() private syncStatus: SyncStatus = 'sign-in';
  @state() private authModalOpen = false;
  @state() private toastMessage: string | null = null;
  @state() private toastUndoId: string | null = null;
  @state() private isGenerating = false;

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
      --cv-ink-04: rgba(46, 39, 31, 0.04);
      --cv-ink-08: rgba(46, 39, 31, 0.08);
      --cv-ink-10: rgba(46, 39, 31, 0.10);
      --cv-ink-12: rgba(46, 39, 31, 0.12);
      --cv-ink-14: rgba(46, 39, 31, 0.14);
      --cv-ink-16: rgba(46, 39, 31, 0.16);
      --cv-ink-20: rgba(46, 39, 31, 0.20);
      --cv-ink-25: rgba(46, 39, 31, 0.25);
      --cv-ink-35: rgba(46, 39, 31, 0.35);
      --cv-ink-45: rgba(46, 39, 31, 0.45);
      --cv-ink-55: rgba(46, 39, 31, 0.55);
      --cv-red: #F2A79B;
      --cv-red-deep: #F2735F;
      --cv-red-deep-hover: #E85F49;
      --cv-blue: #9CC0EC;
      --cv-yellow: #F6D98B;
      --cv-purple: #C9A9E0;
      --cv-green: #B8CC9E;
      --cv-peach: #F2C9A0;
      --cv-plum: #9B7CA8;
      --cv-plum-hover: #84698F;

      display: block;
      min-height: 100%;
      background: var(--cv-canvas);
      font-family: var(--cv-font);
      color: var(--cv-ink);
    }
    .screen-view {
      display: block;
      min-height: 100%;
      opacity: 1;
      transform: scale(1);
      transition: opacity 200ms var(--cv-ease), transform 240ms var(--cv-ease);
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
    @starting-style {
      .screen-view {
        opacity: 0;
        transform: scale(0.985);
      }
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
    this.showTheory = (localStorage.getItem('chroma-chords-show-theory') || localStorage.getItem('chord-voyager-show-theory')) === 'true';
    const savedInstrument = localStorage.getItem('chroma-chords-instrument');
    if (savedInstrument && USER_INSTRUMENTS.some(i => i.name === savedInstrument)) this.instrument = savedInstrument;
    const savedPlayStyle = localStorage.getItem('chroma-chords-play-style');
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
      this.syncStatus = status;
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
      if (this.sheetOpen) {
        this.sheetOpen = false;
        this.swapIndex = null;
        this.requestUpdate();
      }
    }
  };

  private syncRouteFromHash() {
    const hash = window.location.hash.replace(/^#/, '').toLowerCase();
    if (hash === 'sets' || hash === '11a') {
      if (this.screen !== 'sets') {
        this.previousScreenBeforeSets = this.screen;
      }
      this.screen = 'sets';
    } else if (hash === 'play-along' || hash === '12a') {
      if (this.progression) {
        this.screen = 'play-along';
      } else {
        this.screen = 'seed';
      }
    } else if (hash === 'song' || hash === '5a') {
      if (this.progression) {
        this.screen = 'song';
        playbackEngine.setSong(this.sections);
      } else {
        this.screen = 'seed';
      }
    } else if (hash === 'loop' || hash === '3a' || hash === '8a') {
      if (this.progression) {
        this.screen = 'loop';
      } else {
        this.screen = 'seed';
      }
    } else if (hash === 'seed' || hash === '2a' || !hash) {
      this.screen = 'seed';
    }
  }

  private setScreen(nextScreen: Screen) {
    this.screen = nextScreen;
    const targetHash = `#${nextScreen}`;
    if (window.location.hash !== targetHash) {
      history.pushState(null, '', targetHash);
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
    this.pendingChordSuggestion = null;
    this.activeSearchPrompt = null;
  }

  private onMoodChange(e: CustomEvent<string>) {
    this.mood = e.detail;
    this.pendingChordSuggestion = null;
    this.activeSearchPrompt = null;
  }

  private onFreetextSuggestionApplied(e: CustomEvent<NormalizedPrompt & { promptText?: string }>) {
    const suggestion = e.detail;
    this.pendingChordSuggestion = suggestion.chords?.length && suggestion.key && suggestion.scaleType ? suggestion : null;
    if (e.detail.promptText) {
      this.activeSearchPrompt = e.detail.promptText;
    }
  }

  private async onGenerate(e?: CustomEvent<{ promptText?: string }>) {
    if (this.isGenerating) return;
    this.isGenerating = true;
    try {
      this.keyOverride = null;
      this.scaleOverride = null;

      const searchTerm = e?.detail?.promptText || this.activeSearchPrompt || undefined;
      const result = await PromptClassifier.resolvePrompt(
        this.chordData,
        this.genre,
        this.mood,
        this.length,
        searchTerm,
        this.pendingChordSuggestion
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
      this.order = Array.from({ length: progression.chords.length }, (_, i) => i);
      this.length = progression.chords.length;
      this.activeIndex = 0;
      this.progressStep = 0;
      this.playing = false;

      playbackEngine.setProgression(progression, this.order);
      playbackEngine.reset();

      this.setScreen('loop');
      this.sections = SongArranger.createInitialSong(progression, this.order);
      this.activeSectionIdx = 0;
      this.pendingChordSuggestion = null;
      this.activeSearchPrompt = null;
    } catch (err) {
      console.error('Failed to generate progression:', err);
      this.toastMessage = 'Failed to generate progression. Please try again.';
      setTimeout(() => { if (this.toastMessage) this.toastMessage = null; }, 3500);
    } finally {
      this.isGenerating = false;
    }
  }

  private onLengthChange(e: CustomEvent<number>) {
    this.length = e.detail;
  }

  private regenerate() {
    const progression = generateProgression(this.chordData, this.genre, this.mood, {
      key: this.keyOverride ?? undefined,
      scaleType: this.scaleOverride ?? undefined,
      length: this.length,
    });
    this.progression = progression;
    this.order = Array.from({ length: this.length }, (_, i) => i);
    this.activeIndex = 0;
    this.progressStep = 0;
    
    playbackEngine.setProgression(progression, this.order);

    this.syncActiveSection();

    if (this.playing) {
      playbackEngine.startAutoplay();
      playbackEngine.playActiveChord();
    }
  }

  private syncActiveSection() {
    if (!this.progression) return;
    this.sections = SongArranger.syncActiveSection(this.sections, this.activeSectionIdx, this.progression, this.order);
  }

  private onSetKey(e: CustomEvent<string>) {
    this.keyOverride = e.detail;
    this.regenerate();
  }

  private onSetScale(e: CustomEvent<string>) {
    this.scaleOverride = e.detail;
    this.regenerate();
  }

  private onSetGenre(e: CustomEvent<string>) {
    this.genre = e.detail;
    this.regenerate();
  }

  private onSetMood(e: CustomEvent<string>) {
    this.mood = e.detail;
    this.regenerate();
  }

  private onSetLength(e: CustomEvent<number>) {
    this.length = e.detail;
    this.regenerate();
  }

  private onReroll() {
    if (!this.progression) return;
    this.regenerate();
  }

  private onReorder(e: CustomEvent<number[]>) {
    if (!this.progression) return;
    const activeChordIndex = this.order[this.activeIndex];
    this.order = e.detail;
    const newPos = this.order.indexOf(activeChordIndex);
    this.activeIndex = newPos >= 0 ? newPos : 0;
    
    playbackEngine.setOrder(this.order, this.activeIndex);
    this.syncActiveSection();
  }

  private onBack() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.setScreen('seed');
    this.sheetOpen = false;
    this.keyOverride = null;
    this.scaleOverride = null;
  }

  private previousScreenBeforeSets: Screen = 'seed';

  private onViewSets() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.previousScreenBeforeSets = this.screen === 'sets' ? 'seed' : this.screen;
    this.setScreen('sets');
  }

  private onBackFromSets() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    if (this.progression) {
      this.setScreen(this.previousScreenBeforeSets === 'song' ? 'song' : 'loop');
    } else {
      this.setScreen('seed');
    }
  }

  private async onLoadProject(e: CustomEvent<string>) {
    const id = e.detail;
    const p = projectStorage.getProjects().find(proj => proj.id === id);
    if (!p) return;
    let chords = Array.isArray(p.chords) ? (p.chords as unknown as ChordBlock[]) : [];

    if (chords.length === 0) {
      try {
        let data = this.chordData;
        if (!data || !data.scales || Object.keys(data.scales).length === 0) {
          data = await loadChordData();
          this.chordData = data;
        }
        const generated = generateProgression(data, p.genre || 'Pop', p.mood || 'Neutral', {
          key: p.key || 'C',
          scaleType: p.scaleType || 'MAJOR',
          length: 4,
        });
        chords = generated.chords;
        p.chords = chords as unknown as ProjectChord[];
        projectStorage.saveProject(p);
      } catch (err) {
        console.error(`Failed to auto-recover chords for project "${id}":`, err);
        this.showToast('Unable to load set: empty chord data.');
        return;
      }
    }

    this.currentProjectId = p.id;
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
    this.showTheory = p.showTheory ?? this.showTheory;
    
    playbackEngine.setProgression(this.progression, this.order);
    this.setScreen('loop');
    this.sections = SongArranger.createInitialSong(this.progression, this.order);
    this.activeSectionIdx = 0;
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

  private onTheoryToggle() {
    this.showTheory = !this.showTheory;
    localStorage.setItem('chroma-chords-show-theory', String(this.showTheory));
  }

  private onSetInstrument(e: CustomEvent<string>) {
    this.instrument = e.detail;
    localStorage.setItem('chroma-chords-instrument', e.detail);
    playbackEngine.setInstrument(e.detail);
  }

  private onSetPlayStyle(e: CustomEvent<string>) {
    this.playStyle = e.detail;
    localStorage.setItem('chroma-chords-play-style', e.detail);
    playbackEngine.setPlayStyle(e.detail);
  }

  private onTogglePlay() {
    this.playing = playbackEngine.togglePlay();
  }

  private onTogglePlaySong() {
    playbackEngine.setSong(this.sections);
    this.playing = playbackEngine.togglePlay();
  }

  private onChordTap(e: CustomEvent<number>) {
    if (!this.progression) return;
    if (this.playing) {
      playbackEngine.stopAutoplay();
      this.playing = false;
    }
    playbackEngine.clearABOverride();
    this.swapIndex = e.detail;
    this.sheetMode = 'swap';
    this.alternatives = generateAlternatives(this.chordData, this.progression, e.detail);
    this.theoryGroups = generateTheoryGroups(this.chordData, this.progression, e.detail);
    this.borrowedChords = generateBorrowedChords(this.chordData, this.progression, e.detail);
    this.sheetOpen = true;
    playbackEngine.playChordAtIndex(e.detail, 0.8);
  }

  private onChordVoicingTap(e: CustomEvent<number>) {
    if (!this.progression) return;
    if (this.playing) {
      playbackEngine.stopAutoplay();
      this.playing = false;
    }
    playbackEngine.clearABOverride();
    this.swapIndex = e.detail;
    this.sheetMode = 'voicing';
    this.alternatives = [];
    this.theoryGroups = [];
    this.borrowedChords = [];
    this.sheetOpen = true;
    playbackEngine.playChordAtIndex(e.detail, 0.8);
  }

  private onChordPreview(e: CustomEvent<number>) {
    if (!this.progression) return;
    if (this.playing) {
      playbackEngine.stopAutoplay();
      this.playing = false;
    }
    playbackEngine.playChordAtIndex(e.detail, 0.8);
  }

  private onAuditionChord(e: CustomEvent<ChordBlock>) {
    const chord = e.detail;
    let notes = Array.isArray(chord.notes) ? chord.notes : [];
    if (notes.length === 0 && chord.name && this.progression) {
      notes = notesForSymbol(chord.name, preferFlatSpelling(this.progression.key, this.progression.scaleType));
    }
    playbackEngine.playChordNotes(notes, 0.8);
  }

  private onSheetClose() {
    playbackEngine.clearABOverride();
    this.sheetOpen = false;
    this.swapIndex = null;
  }

  private onSelectAlternative(e: CustomEvent<{ chord: ChordBlock } | Alternative>) {
    if (!this.progression || this.swapIndex === null) return;
    if (this.playing) {
      playbackEngine.stopAutoplay();
      this.playing = false;
    }
    playbackEngine.clearABOverride();
    const chord = (e.detail as any).chord ?? (e.detail as any);
    const chords = [...this.progression.chords];
    chords[this.swapIndex] = chord;
    this.progression = { ...this.progression, chords };
    playbackEngine.setProgression(this.progression, this.order);
    this.sheetOpen = false;
    this.swapIndex = null;
    this.syncActiveSection();
    playbackEngine.playChordNotes(chord.notes, 0.8);
  }

  private onVoicingPreview(e: CustomEvent<string[]>) {
    playbackEngine.playChordNotes(e.detail, 0.6);
  }

  private onVoicingChange(e: CustomEvent<{ quality: string; extension: string }>) {
    if (!this.progression || this.swapIndex === null) return;
    const chords = [...this.progression.chords];
    chords[this.swapIndex] = applyVoicingToChord(chords[this.swapIndex], e.detail.quality, e.detail.extension);
    this.progression = { ...this.progression, chords };
    playbackEngine.setProgression(this.progression, this.order);
    this.syncActiveSection();
  }

  private onBackToProgression() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.setScreen('loop');
    if (this.progression) {
      playbackEngine.setProgression(this.progression, this.order);
    }
  }

  private onViewSong() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.sheetOpen = false;
    this.setScreen('song');
    playbackEngine.setSong(this.sections);
  }

  private onViewPlayAlong() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.sheetOpen = false;
    this.setScreen('play-along');
  }

  private onBackFromPlayAlong() {
    this.setScreen('loop');
  }

  private onSelectSection(e: CustomEvent<number>) {
    const section = this.sections[e.detail];
    if (!section) return;
    this.activeSectionIdx = e.detail;
    this.progression = section.progression;
    this.order = section.order.slice();
    this.activeIndex = 0;
    this.progressStep = 0;
    this.length = section.progression.chords.length;
    this.keyOverride = section.progression.key;
    this.scaleOverride = section.progression.scaleType;
    this.sheetOpen = false;
    this.setScreen('loop');

    playbackEngine.setProgression(this.progression, this.order);
    if (this.playing) {
      playbackEngine.startAutoplay();
      playbackEngine.playActiveChord();
    }
  }

  private onAddSection() {
    if (!this.progression) return;
    const res = SongArranger.addSection(this.sections, this.progression);
    this.sections = res.sections;
    this.activeSectionIdx = res.activeIndex;
    if (this.screen === 'song') {
      playbackEngine.setSong(this.sections);
    }
  }

  private showToast(msg: string, undoId?: string) {
    if (this.toastDismissTimeout) clearTimeout(this.toastDismissTimeout);
    this.toastMessage = msg;
    this.toastUndoId = undoId || null;
    this.toastDismissTimeout = setTimeout(() => {
      this.toastMessage = null;
      this.toastUndoId = null;
    }, 4500);
  }

  private onToastUndo() {
    if (this.toastUndoId) {
      projectStorage.deleteProject(this.toastUndoId);
      if (this.currentProjectId === this.toastUndoId) {
        this.currentProjectId = null;
      }
      this.toastMessage = null;
      this.toastUndoId = null;
      this.requestUpdate();
    }
  }

  private onToastView() {
    this.toastMessage = null;
    this.toastUndoId = null;
    this.onViewSets();
  }

  private saveProject(customName?: string) {
    if (!this.progression) return;
    const id = this.currentProjectId || Math.random().toString(36).slice(2, 11);
    this.currentProjectId = id;
    
    const existing = projectStorage.getProjects().find(p => p.id === id);
    const name = customName || (existing ? existing.name : `${this.progression.genre} · ${this.progression.mood}`);

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
    };
    projectStorage.saveProject(project);
    if (customName) {
      projectStorage.scheduleCloudSync();
    }
    this.showToast(`Saved "${name}"`, id);
    this.requestUpdate();
  }

  render() {
    let screenContent;
    const isBookmarked = Boolean(this.currentProjectId && projectStorage.isProjectSaved(this.currentProjectId));

    if (this.screen === 'sets') {
      screenContent = html`
        <sets-screen
          .projects=${projectStorage.getProjects()}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .syncStatus=${this.syncStatus}
          @back=${this.onBackFromSets}
          @load-project=${this.onLoadProject}
          @delete-project=${this.onDeleteProject}
          @rename-project=${this.onRenameProject}
          @sync-projects=${this.onSyncProjects}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
        ></sets-screen>
      `;
    } else if (this.screen === 'seed' || !this.progression) {
      screenContent = html`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          .length=${this.length}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .isAdmin=${this.isAdmin}
          .isGenerating=${this.isGenerating}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @length-change=${this.onLengthChange}
          @freetext-suggestion-applied=${this.onFreetextSuggestionApplied}
          @generate=${this.onGenerate}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @view-sets=${this.onViewSets}
        ></seed-screen>
      `;
    } else if (this.screen === 'play-along' && this.progression) {
      screenContent = html`
        <play-along-screen
          .progression=${this.progression}
          .order=${this.order}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${projectStorage.getProjects().length}
          @back=${() => this.onBackFromPlayAlong()}
          @chord-preview=${(e: CustomEvent<number>) => this.onChordPreview(e)}
        ></play-along-screen>
      `;
    } else if (this.screen === 'song') {
      screenContent = html`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .activePlayingSectionIdx=${this.activePlayingSectionIdx}
          .canAddSection=${this.sections.length < SECTION_TEMPLATES.length}
          .playing=${this.playing}
          .progressStep=${this.progressStep}
          .totalSteps=${this.totalSongSteps}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          .isAuthenticated=${this.isAuthenticated}
          .isBookmarked=${isBookmarked}
          @select-section=${this.onSelectSection}
          @add-section=${this.onAddSection}
          @back-to-progression=${this.onBackToProgression}
          @toggle-play-song=${this.onTogglePlaySong}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
        ></song-screen>
      `;
    } else {
      const swapChord = this.swapIndex !== null ? this.progression.chords[this.swapIndex] : null;

      screenContent = html`
        <loop-screen
          .progression=${this.progression}
          .activeIndex=${this.activeIndex}
          .progressStep=${this.progressStep}
          .order=${this.order}
          .playing=${this.playing}
          .showTheory=${this.showTheory}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .isBookmarked=${isBookmarked}
          .sheetOpen=${this.sheetOpen}
          .sheetMode=${this.sheetMode}
          .swapChord=${swapChord}
          .swapIndex=${this.swapIndex}
          .alternatives=${this.alternatives}
          .theoryGroups=${this.theoryGroups}
          .borrowedChords=${this.borrowedChords}
          @back=${this.onBack}
          @theory-toggle=${this.onTheoryToggle}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @toggle-play=${this.onTogglePlay}
          @chord-tap=${this.onChordTap}
          @chord-voicing-tap=${this.onChordVoicingTap}
          @chord-preview=${this.onChordPreview}
          @audition-chord=${this.onAuditionChord}
          @close=${this.onSheetClose}
          @select-alternative=${this.onSelectAlternative}
          @voicing-preview=${this.onVoicingPreview}
          @voicing-change=${this.onVoicingChange}
          @set-key=${this.onSetKey}
          @set-scale=${this.onSetScale}
          @set-genre=${this.onSetGenre}
          @set-mood=${this.onSetMood}
          @reroll=${this.onReroll}
          @reorder=${this.onReorder}
          @set-length=${this.onSetLength}
          @view-song=${this.onViewSong}
          @view-play-along=${() => this.onViewPlayAlong()}
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
        ></loop-screen>
      `;
    }

    return html`
      <div class="screen-view">
        ${screenContent}
        ${this.toastMessage ? html`
          <div class="save-toast">
            <span>${this.toastMessage}</span>
            <div class="toast-actions">
              <button class="toast-btn" @click=${this.onToastView}>View</button>
              ${this.toastUndoId ? html`
                <button class="toast-btn undo" @click=${this.onToastUndo}>Undo</button>
              ` : ''}
            </div>
          </div>
        ` : ''}
        <auth-modal
          .open=${this.authModalOpen}
          @close-modal=${() => { this.authModalOpen = false; }}
        ></auth-modal>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chroma-chords-app': ChromaChordsApp;
  }
}
