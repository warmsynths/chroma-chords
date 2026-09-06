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
import './components/app-header';
import './components/seed-screen';
import './components/loop-screen';
import './components/song-screen';
import './components/play-along-screen';
import './components/auth-modal';
import { SongSection } from './components/song-screen';

type Screen = 'seed' | 'loop' | 'song' | 'play-along';

@customElement('chroma-chords-app')
export class ChromaChordsApp extends LitElement {
  @state() private chordData: RawChordData = { chords: {}, scales: {} };
  @state() private screen: Screen = 'loop';
  @state() private libraryOpen = false;
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
  private previousScreenBeforeSets: Screen = 'loop';
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
      height: 100vh;
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
      overflow: hidden;
      position: relative;
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
      if (!this.progression) {
        this.progression = generateProgression(this.chordData, this.genre, this.mood, {
          length: this.length,
        });
        this.order = Array.from({ length: this.length }, (_, i) => i);
        playbackEngine.setProgression(this.progression, this.order);
        this.sections = SongArranger.createInitialSong(this.progression, this.order);
        this.screen = 'loop';
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
      this.libraryOpen = true;
      this.screen = 'loop';
    } else if (hash === 'play-along' || hash === '12a') {
      this.screen = 'play-along';
    } else if (hash === 'song' || hash === '5a') {
      this.screen = 'song';
      if (this.sections.length) playbackEngine.setSong(this.sections);
    } else {
      this.screen = 'loop';
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
    this.regenerate();
  }

  private onMoodChange(e: CustomEvent<string>) {
    this.mood = e.detail;
    this.regenerate();
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
      this.showToast('Failed to generate progression. Please try again.');
    } finally {
      this.isGenerating = false;
    }
  }

  private onLengthChange(e: CustomEvent<number>) {
    this.length = e.detail;
    this.regenerate();
  }

  private regenerate() {
    if (!this.chordData.scales || Object.keys(this.chordData.scales).length === 0) return;
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

    this.sections = SongArranger.createInitialSong(this.progression, this.order);
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
    this.showTheory = p.showTheory ?? this.showTheory;
    
    playbackEngine.setProgression(this.progression, this.order);
    this.setScreen('loop');
    this.sections = SongArranger.createInitialSong(this.progression, this.order);
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

  private onAuditionChord(e: CustomEvent<ChordBlock>) {
    playbackEngine.auditionChord(e.detail, 0.8);
  }

  private onSelectAlternative(e: CustomEvent<Alternative>) {
    if (!this.progression || this.swapIndex === null) return;
    const alt = e.detail;
    const oldChords = this.progression.chords;
    const newChords = [...oldChords];
    newChords[this.swapIndex] = alt.chord;

    this.progression = {
      ...this.progression,
      chords: newChords,
    };
    playbackEngine.setProgression(this.progression, this.order);
    this.sheetOpen = false;
    this.swapIndex = null;
    this.showToast(`Swapped in ${alt.chord.name}`);
  }

  private onSheetClose() {
    this.sheetOpen = false;
    this.swapIndex = null;
    playbackEngine.clearABOverride();
  }

  private onProgressionChange(e: CustomEvent<Progression>) {
    this.progression = e.detail;
    playbackEngine.setProgression(this.progression, this.order);
    if (this.sections.length > 0) {
      this.sections = SongArranger.syncActiveSection(this.sections, this.activeSectionIdx, this.progression, this.order);
    }
    this.requestUpdate();
  }

  private onAddSection() {
    if (!this.progression) return;
    const res = SongArranger.addSection(this.sections, this.progression);
    this.sections = res.sections;
    this.activeSectionIdx = res.activeIndex;
    this.requestUpdate();
  }

  private onSelectSection(e: CustomEvent<number>) {
    this.activeSectionIdx = e.detail;
    const sec = this.sections[e.detail];
    if (sec) {
      this.order = sec.order.slice();
      playbackEngine.setOrder(this.order);
    }
    this.requestUpdate();
  }

  private showToast(msg: string, undoId?: string) {
    if (this.toastDismissTimeout) clearTimeout(this.toastDismissTimeout);
    this.toastMessage = msg;
    this.toastUndoId = undoId || null;
    this.toastDismissTimeout = setTimeout(() => {
      this.toastMessage = null;
      this.toastUndoId = null;
    }, 3200);
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

  private saveProject(customName?: string) {
    if (!this.progression) return;
    const id = this.currentProjectId || Math.random().toString(36).slice(2, 11);
    this.currentProjectId = id;
    
    const existing = projectStorage.getProjects().find(p => p.id === id);
    const name = customName || existing?.name || `Progression in ${this.progression.key} ${this.progression.scaleType}`;

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
    const isBookmarked = Boolean(this.currentProjectId && projectStorage.isProjectSaved(this.currentProjectId));

    return html`
      <div class="app-header-container">
        <app-header
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          .savedCount=${projectStorage.getProjects().length}
          .syncStatus=${this.syncStatus}
          @request-login=${this.onLoginRequest}
          @request-logout=${this.onLogoutRequest}
          @sync-projects=${this.onSyncProjects}
          @view-sets=${() => { this.libraryOpen = true; }}
          @brand-click=${() => { this.setScreen('loop'); }}
        ></app-header>
      </div>

      <div class="screen-view">
        ${this.progression ? html`
          <loop-screen
            .chordData=${this.chordData}
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
            .sections=${this.sections}
            .activeSectionIdx=${this.activeSectionIdx}
            .activePlayingSectionIdx=${this.activePlayingSectionIdx}
            .totalSongSteps=${this.totalSongSteps}
            .isGenerating=${this.isGenerating}
            .libraryOpen=${this.libraryOpen}
            @library-open-change=${(e: CustomEvent<boolean>) => { this.libraryOpen = e.detail; }}
            @progression-change=${this.onProgressionChange}
            @theory-toggle=${this.onTheoryToggle}
            @set-instrument=${this.onSetInstrument}
            @set-play-style=${this.onSetPlayStyle}
            @toggle-play=${this.onTogglePlay}
            @toggle-play-song=${this.onTogglePlaySong}
            @set-genre=${this.onGenreChange}
            @set-mood=${this.onMoodChange}
            @set-length=${this.onLengthChange}
            @freetext-generate=${this.onGenerate}
            @reroll=${this.onReroll}
            @add-section=${this.onAddSection}
            @select-section=${this.onSelectSection}
            @save-set=${this.onSaveSet}
            @load-project=${this.onLoadProject}
            @view-sets=${() => { this.libraryOpen = true; }}
            @request-login=${this.onLoginRequest}
            @request-logout=${this.onLogoutRequest}
            @toast=${(e: CustomEvent<string>) => this.showToast(e.detail)}
          ></loop-screen>
        ` : html`
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
            Loading studio workspace...
          </div>
        `}

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
