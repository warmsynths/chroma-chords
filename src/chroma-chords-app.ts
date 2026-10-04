import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ProjectData, ProjectChord } from './services/project-service';
import { projectStorage, SyncStatus } from './services/project-storage';
import { playbackEngine } from './services/playback-engine';
import { PromptClassifier } from './services/prompt-classifier';
import { SongArranger, SongSection, SongTimelineItem } from './services/song-arranger';
import { loadChordData, generateProgression, extendProgression, RawChordData, Progression, ChordBlock, notesForSymbol, preferFlatSpelling, getMoodColor, applyVoicingToChord } from './services/chord-engine';
import { USER_INSTRUMENTS, USER_PLAY_STYLES, setMasterTone, FeelSettings } from './services/audio-service';
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
  @state() private chordPlaying = false;
  @state() private melodyPlaying = false;
  @state() private songPlaying = false;
  @state() private showTheory = false;
  @state() private instrument: string | null = null;
  @state() private playStyle: string | null = null;
  @state() private melodySound = 'Stage Rhodes';
  @state() private melodyFeel = 'Smooth';
  @state() private melodyFeelSettings: FeelSettings = { swing: 0, spread: 50, density: 50, tone: 'Warm' };
  @state() private chordFeelSettings: FeelSettings = { swing: 0, spread: 50, density: 50, tone: 'Warm' };
  @state() private melodyBackingEnabled = true;
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
  @state() private melodyLoop: 'Section' | 'Chord' | 'Span' = 'Section';
  @state() private melodySpan: [number, number] = [0, 16];
  @state() private playInstrument: PlayInstrument = 'Piano';
  @state() private showDegrees = false;
  @state() private toastMessage: string | null = null;
  @state() private toastUndoId: string | null = null;
  @state() private isGenerating = false;
  @state() private chordLengthCache: ChordBlock[] = [];
  @state() private vibeOpen = false;
  @state() private vibeSearchText = '';

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
      font-family: var(--cv-font, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink);
      overflow: hidden;
      box-sizing: border-box;
    }

    button, input, select, textarea {
      font-family: inherit;
    }

    .app-header-container {
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      background: var(--cv-cream);
      flex-shrink: 0;
      z-index: 40;
    }

    /* 3-Column Desktop Stage Body */
    .stage-body {
      flex: 1;
      min-height: 0;
      min-width: 0;
      display: flex;
      align-items: stretch;
      overflow: hidden;
      position: relative;
    }


    /* Center Main Column */
    .main-column {
      flex: 1;
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Sub-Header Nav Row */
    .sub-nav-row {
      padding: 8px 22px 6px;
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
      background: var(--cv-cream);
      box-sizing: border-box;
    }

    .nav-tabs-track {
      display: flex;
      gap: 2px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 100px;
      padding: 4px;
      box-sizing: border-box;
    }

    .nav-tab-btn {
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 6px 16px;
      min-height: 34px;
      border-radius: 100px;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease, transform 120ms ease;
      white-space: nowrap;
    }
    .nav-tab-btn:hover {
      color: var(--cv-ink, #2E271F);
    }
    .nav-tab-btn.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      font-weight: 800;
    }

    .nav-spacer {
      flex: 1;
      min-width: 0;
    }

    /* Theory Toggle Switch (Matches Chroma Melody prototype lines 3555-3561) */
    .theory-nav-toggle {
      border: none;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 38px;
      padding: 0 6px 0 14px;
      border-radius: 100px;
      cursor: pointer;
      flex-shrink: 0;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink-muted, #6B5F50);
      box-shadow: inset 0 0 0 1.5px transparent;
      transition: background 160ms var(--cv-ease, ease), color 160ms var(--cv-ease, ease), box-shadow 160ms var(--cv-ease, ease);
    }
    .theory-nav-toggle:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .theory-nav-toggle.active {
      color: var(--cv-ink, #2E271F);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
    }
    .theory-nav-label {
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: -0.005em;
      white-space: nowrap;
      color: inherit;
    }
    .theory-nav-pip {
      width: 34px;
      height: 20px;
      border-radius: 100px;
      position: relative;
      flex-shrink: 0;
      background: rgba(46, 39, 31, 0.14);
      transition: background 160ms var(--cv-ease, ease);
      display: inline-block;
    }
    .theory-nav-pip.on {
      background: var(--theory-mood-color, #C9A9E0);
    }
    .theory-nav-knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.18);
      transition: transform 160ms var(--cv-ease, ease), background 160ms var(--cv-ease, ease);
    }
    .theory-nav-pip.on .theory-nav-knob {
      transform: translateX(14px);
      background: #FBF3E6;
    }

    /* Scrollable Content View */
    .scrollable-content {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 8px 22px 14px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
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

    /* Bottom Docked Transport Bar (Desktop) */
    .transport-dock-wrapper {
      padding: 2px 22px 16px;
      background: var(--cv-cream);
      flex-shrink: 0;
      box-sizing: border-box;
    }

    /* Right Desktop Aside */
    .desktop-aside {
      width: clamp(304px, 26vw, 384px);
      min-width: 304px;
      max-width: 384px;
      border-left: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-surface);
      overflow-y: auto;
      overflow-x: hidden;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .desktop-aside.hidden {
      display: none !important;
    }

    /* Vibe Popover */
    /* Animations */
    @keyframes cvfv-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes cvfv-pop {
      from { transform: scale(0.97); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes cvfv-sheet-up {
      from { transform: translateY(14px); opacity: 0.6; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Vibe Popover Overlay Backdrop */
    .vibe-overlay {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.36);
      z-index: 110;
      animation: cvfv-fade 200ms ease-out;
      cursor: pointer;
    }
    .vibe-popover {
      position: fixed;
      left: 36px;
      top: 110px;
      width: 340px;
      max-height: calc(100vh - 128px);
      overflow-y: auto;
      background: var(--cv-cream);
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 20px;
      padding: 16px 18px 20px;
      box-shadow: 0 28px 54px -22px rgba(46, 39, 31, 0.55);
      z-index: 120;
      box-sizing: border-box;
      transform-origin: left top;
      animation: cvfv-pop 180ms ease-out, cvfv-sheet-up 180ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    @media (max-width: 899px) {
      .vibe-popover {
        left: 16px;
        right: 16px;
        top: auto;
        bottom: 24px;
        width: auto;
      }
    }
    .vibe-popover-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .vibe-popover-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.4px;
      color: var(--cv-label);
      text-transform: uppercase;
    }
    .vibe-popover-close {
      border: none;
      background: var(--cv-surface);
      color: var(--cv-ink-muted);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 150ms ease;
    }
    .vibe-popover-close:hover {
      background: var(--cv-surface-2);
    }
    .vibe-search-row {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      padding: 5px 5px 5px 12px;
      margin-top: 10px;
    }
    .vibe-search-input {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--cv-ink);
      padding: 8px 0;
    }
    .vibe-search-submit {
      width: 34px;
      height: 34px;
      border-radius: 11px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 120ms ease;
    }
    .vibe-search-submit:hover {
      transform: scale(1.05);
    }
    .vibe-section-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.4px;
      color: var(--cv-label);
      text-transform: uppercase;
      margin-top: 20px;
    }
    .vibe-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 9px;
    }
    .vibe-chip {
      border: none;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 700;
      padding: 7px 14px;
      border-radius: 100px;
      background: #F1E4CC;
      color: #5B5145;
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
    }
    .vibe-chip:hover {
      transform: translateY(-1px);
    }
    .vibe-chip:active {
      transform: scale(0.97);
    }
    .vibe-chip.active {
      background: #2E271F;
      color: #FBF3E6;
      font-weight: 800;
    }
    .vibe-mood-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      padding: 5px 14px 5px 6px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      background: #F1E4CC;
      color: #2E271F;
      transition: background 150ms ease, transform 120ms ease;
    }
    .vibe-mood-btn:hover {
      transform: translateY(-1px);
    }
    .vibe-mood-btn:active {
      transform: scale(0.97);
    }
    .vibe-mood-btn.active {
      font-weight: 800;
    }
    .vibe-mood-badge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      flex-shrink: 0;
      transition: background 150ms ease;
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
      .stage-body {
        flex-direction: column;
      }
      .desktop-only {
        display: none !important;
      }
      .mobile-only {
        display: block !important;
      }
      .main-tinted-panel {
        border-radius: 22px;
        padding: 16px;
      }
      .sub-nav-row {
        padding: 10px 18px 4px;
        gap: 8px;
      }
      .nav-tabs-track {
        flex: 1 1 auto;
        min-width: 0;
        justify-content: space-between;
      }
      .nav-tab-btn {
        flex: 1 1 auto;
        padding: 6px 6px;
        font-size: 12.5px;
      }
      .nav-spacer {
        display: none;
      }
      .theory-nav-toggle {
        gap: 6px;
        padding: 0 6px 0 10px;
      }
      .theory-nav-label {
        font-size: 12px;
      }
      /* Same gap under the nav on every tab (design rule: 14px 18px 26px) */
      .scrollable-content {
        padding: 14px 18px 26px;
      }
      /* Melody fills the space between nav and dock; the grid scales to fit */
      .scrollable-content.fill {
        overflow: hidden;
      }
      .scrollable-content.fill .main-tinted-panel {
        flex: 1;
        min-height: 0;
        overflow: hidden;
        padding: 14px 12px 12px;
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
    @media (max-width: 899px) {
      /* Keep toasts clear of the dock */
      .save-toast {
        bottom: 112px;
        max-width: calc(100vw - 32px);
      }
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
    const savedMelodySound = safeGet('chroma-melody-sound');
    if (savedMelodySound && USER_INSTRUMENTS.some(i => i.name.toLowerCase() === savedMelodySound.toLowerCase())) {
      this.melodySound = savedMelodySound;
    } else {
      this.melodySound = 'Stage Rhodes';
    }
    const savedMelodyFeel = safeGet('chroma-melody-feel');
    if (savedMelodyFeel) this.melodyFeel = savedMelodyFeel;

    playbackEngine.setInstrument(this.instrument);
    playbackEngine.setPlayStyle(this.playStyle);
    playbackEngine.setMelodySound(this.melodySound);
    playbackEngine.setMelodyFeel(this.melodyFeel);
    playbackEngine.setMelodyFeelSettings(this.melodyFeelSettings);
    playbackEngine.setMelodyBackingEnabled(this.melodyBackingEnabled);

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

    this.unsubscribeTick = playbackEngine.subscribeTick((activeIdx, step, secIdx, totalSteps, isSongMode, stepPos) => {
      this.activeIndex = activeIdx;
      this.progressStep = typeof stepPos === 'number' && stepPos >= 0 ? stepPos : step;
      if (typeof secIdx === 'number') {
        this.activePlayingSectionIdx = secIdx;
      }
      if (typeof totalSteps === 'number') {
        this.totalSongSteps = totalSteps;
      }
      this.playing = playbackEngine.isPlaying();
      this.chordPlaying = playbackEngine.isChordPlaying();
      this.melodyPlaying = playbackEngine.isMelodyPlaying();
      this.songPlaying = playbackEngine.isSongPlaying();
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
        this.melodyTrack = melodyEngine.createEmptyTrack(this.progression);
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
      if (this.melodyTrack && this.melodyTrack.notes.length > 0) {
        this.melodyTrack = melodyEngine.alignMelodyToChords(this.melodyTrack, progression);
      } else {
        this.melodyTrack = melodyEngine.createEmptyTrack(progression);
      }
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
    if (this.melodyTrack && this.melodyTrack.notes.length > 0) {
      this.melodyTrack = melodyEngine.alignMelodyToChords(this.melodyTrack, this.progression);
    } else {
      this.melodyTrack = melodyEngine.createEmptyTrack(this.progression);
    }
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

  private toggleTheory() {
    this.showTheory = !this.showTheory;
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem('chroma-chords-show-theory', String(this.showTheory));
      }
    } catch {
      // ignore
    }
  }

  private toggleVibe() {
    this.vibeOpen = !this.vibeOpen;
  }

  private applyPromptSearch() {
    if (this.vibeSearchText.trim()) {
      this.onGenerate(new CustomEvent('generate', { detail: this.vibeSearchText.trim() }));
      this.vibeOpen = false;
      this.vibeSearchText = '';
    }
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
    this.melodyTrack = (p as any).melodyTrack || melodyEngine.createEmptyTrack(this.progression);
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

  private onTogglePlay(target?: 'chords' | 'melody' | 'song') {
    const effectiveTarget = target || (this.activeTab === 'melody' ? 'melody' : (this.activeTab === 'song' ? 'song' : 'chords'));
    if (effectiveTarget === 'melody') {
      this.updateEngineLoop();
      this.playing = playbackEngine.togglePlay('melody');
      this.melodyPlaying = playbackEngine.isMelodyPlaying();
      this.chordPlaying = false;
      this.songPlaying = false;
    } else if (effectiveTarget === 'song') {
      playbackEngine.setStepLoop(null);
      playbackEngine.setSong(this.sections);
      this.playing = playbackEngine.togglePlay('song');
      this.songPlaying = playbackEngine.isSongPlaying();
      this.chordPlaying = false;
      this.melodyPlaying = false;
    } else {
      playbackEngine.setStepLoop(null);
      playbackEngine.setProgression(this.progression, this.order);
      this.playing = playbackEngine.togglePlay('chords');
      this.chordPlaying = playbackEngine.isChordPlaying();
      this.melodyPlaying = false;
      this.songPlaying = false;
    }
  }

  private onTogglePlaySong() {
    this.onTogglePlay('song');
  }

  private onSetMelodySound(e: CustomEvent<string | { sound: string }>) {
    const sound = typeof e.detail === 'object' && e.detail !== null ? (e.detail as any).sound : e.detail;
    if (sound) {
      this.melodySound = sound;
      this.safeSet('chroma-melody-sound', sound);
      playbackEngine.setMelodySound(sound);
      this.requestUpdate();
    }
  }

  private onSetMelodyFeel(e: CustomEvent<string | { feel?: string; playStyle?: string }>) {
    const val = typeof e.detail === 'object' && e.detail !== null
      ? (e.detail as any).feel || (e.detail as any).playStyle
      : e.detail;
    if (val) {
      this.melodyFeel = val;
      this.safeSet('chroma-melody-feel', val);
      playbackEngine.setMelodyFeel(val);
      this.requestUpdate();
    }
  }

  private onMelodyFeelSettingsChange(e: CustomEvent<{ feelSettings?: FeelSettings }>) {
    const fs = e.detail?.feelSettings;
    if (fs) {
      this.melodyFeelSettings = { ...fs };
      playbackEngine.setMelodyFeelSettings(fs);
      this.requestUpdate();
    }
  }

  private onToggleMelodyBacking(e?: CustomEvent<{ backingEnabled: boolean }>) {
    if (e && typeof e.detail?.backingEnabled === 'boolean') {
      this.melodyBackingEnabled = e.detail.backingEnabled;
    } else {
      this.melodyBackingEnabled = !this.melodyBackingEnabled;
    }
    playbackEngine.setMelodyBackingEnabled(this.melodyBackingEnabled);
    this.requestUpdate();
  }

  private onMelodyLoopCycle(mode?: 'Section' | 'Chord' | 'Span') {
    const modes: Array<'Section' | 'Chord' | 'Span'> = ['Section', 'Chord', 'Span'];
    const next = mode || modes[(modes.indexOf(this.melodyLoop) + 1) % 3];
    this.melodyLoop = next;
    this.updateEngineLoop();
    this.requestUpdate();
  }

  private updateEngineLoop() {
    if (this.activeTab !== 'melody') {
      playbackEngine.setStepLoop(null);
      return;
    }
    const totalBars = this.progression?.chords.length || 4;
    if (this.melodyLoop === 'Section') {
      playbackEngine.setStepLoop([0, totalBars * 16]);
    } else if (this.melodyLoop === 'Chord') {
      const chordIdx = this.activeIndex % totalBars;
      playbackEngine.setStepLoop([chordIdx * 16, (chordIdx + 1) * 16]);
    } else if (this.melodyLoop === 'Span') {
      playbackEngine.setStepLoop(this.melodySpan && this.melodySpan[1] > this.melodySpan[0] ? this.melodySpan : [0, 16]);
    }
  }

  private onSwitchTab(tab: NavTabId) {
    this.activeTab = tab;
    this.updateEngineLoop();
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

  private onSelectSection(e: CustomEvent<any>) {
    const idx = typeof e.detail === 'object' && e.detail !== null && 'sectionIndex' in e.detail
      ? (e.detail as any).sectionIndex
      : e.detail;
    this.activeSectionIdx = idx;
    const sec = this.sections[idx];
    if (sec) {
      this.progression = sec.progression;
      this.order = sec.order.slice();
      playbackEngine.setProgression(this.progression, this.order);
    }
    this.requestUpdate();
  }

  private onPickSection(e: CustomEvent<{ id?: string }>) {
    const id = e.detail?.id;
    const idx = this.sections.findIndex((sec, i) => (sec.id || String.fromCharCode(65 + i)) === id);
    if (idx >= 0) this.onSelectSection(new CustomEvent('select-section', { detail: idx }));
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
      <!-- Top Site Header -->
      <header class="app-header-container">
        <app-header
          .activeTab=${this.activeTab}
          .showNav=${false}
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
      </header>

      <!-- 3-Part Desktop Stage / Mobile Flex Body -->
      <div class="stage-body">

        <!-- 2. Center Main Column (Sub-Nav Row -> Scrollable Content -> Docked Transport Bar) -->
        <main class="main-column">
          <!-- Sub-Header Nav Row: Tier-1 Navigation Tabs + Theory Switch -->
          <div class="sub-nav-row">
            <div class="nav-tabs-track" role="tablist" aria-label="Main Views">
              <button
                class="nav-tab-btn ${this.activeTab === 'loop' ? 'active' : ''}"
                role="tab"
                aria-selected=${this.activeTab === 'loop'}
                @click=${() => this.onSwitchTab('loop')}
              >
                Chords
              </button>
              <button
                class="nav-tab-btn ${this.activeTab === 'melody' ? 'active' : ''}"
                role="tab"
                aria-selected=${this.activeTab === 'melody'}
                @click=${() => this.onSwitchTab('melody')}
              >
                Melody
              </button>
              <button
                class="nav-tab-btn ${this.activeTab === 'song' ? 'active' : ''}"
                role="tab"
                aria-selected=${this.activeTab === 'song'}
                @click=${() => this.onSwitchTab('song')}
              >
                Song
              </button>
              <button
                class="nav-tab-btn ${this.activeTab === 'play' ? 'active' : ''}"
                role="tab"
                aria-selected=${this.activeTab === 'play'}
                @click=${() => this.onSwitchTab('play')}
              >
                Play it
              </button>
            </div>

            <div class="nav-spacer"></div>

            <button
              class="theory-nav-toggle ${this.showTheory ? 'active' : ''}"
              @click=${this.toggleTheory}
              aria-label="${this.showTheory ? 'Hide music theory' : 'Show music theory'}"
              aria-pressed="${this.showTheory}"
              style="--theory-mood-color: ${moodColor};"
            >
              <span class="theory-nav-label">Theory</span>
              <span class="theory-nav-pip ${this.showTheory ? 'on' : ''}">
                <span class="theory-nav-knob"></span>
              </span>
            </button>
          </div>

          <!-- Scrollable Content View: ONE Main Tinted Panel -->
          <div class="scrollable-content ${this.activeTab === 'melody' ? 'fill' : ''}" style="--panel-tint-bg: ${moodTint};">
            ${this.progression ? html`
              ${this.activeTab === 'loop' ? html`
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
                    @progression-change=${this.onProgressionChange}
                    @set-chord-count=${(e: CustomEvent) => {
                      this.onLengthChange(new CustomEvent('set-length', { detail: e.detail.count }));
                    }}
                    @reroll=${this.onReroll}
                    @clear-band=${() => { this.selectedBand = null; }}
                    @open-vibe-picker=${() => { this.vibeOpen = true; }}
                  ></tab-chords>
                </div>
              ` : this.activeTab === 'melody' ? html`
                <div class="main-tinted-panel">
                  <tab-melody
                    .progression=${this.progression}
                    .melodyTrack=${this.melodyTrack}
                    .melodySound=${this.melodySound}
                    .activeStepIndex=${this.progressStep}
                    .playing=${this.melodyPlaying}
                    .backingEnabled=${this.melodyBackingEnabled}
                    .showTheory=${this.showTheory}
                    .melodyLoop=${this.melodyLoop}
                    .span=${this.melodySpan}
                    @toggle-play=${() => {
                      this.onTogglePlay('melody');
                    }}
                    @toggle-backing=${(e: CustomEvent) => {
                      this.onToggleMelodyBacking(e);
                    }}
                    @melody-change=${(e: CustomEvent) => {
                      this.melodyTrack = e.detail.track;
                      playbackEngine.setMelodyTrack(this.melodyTrack);
                    }}
                    @span-change=${(e: CustomEvent) => {
                      this.melodySpan = e.detail.span;
                      this.updateEngineLoop();
                    }}
                    @melody-loop-change=${(e: CustomEvent) => {
                      this.onMelodyLoopCycle(e.detail.loop || e.detail.melodyLoop);
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
                  @select-section=${(e: CustomEvent) => this.onSelectSection(e)}
                  @section-select=${(e: CustomEvent) => this.onSelectSection(e)}
                  @reorder-timeline=${(e: CustomEvent) => { this.songTimeline = e.detail.timeline; }}
                  @timeline-change=${(e: CustomEvent) => { this.songTimeline = e.detail.timeline; }}
                  @new-section-from-loop=${() => this.onAddSection()}
                  @add-section=${() => this.onAddSection()}
                  @remove-section=${(e: CustomEvent) => this.onRemoveSection(e)}
                  @edit-chords=${(e: CustomEvent) => {
                    this.activeSectionIdx = e.detail.sectionIndex;
                    this.activeTab = 'loop';
                  }}
                  @edit-melody=${(e: CustomEvent) => {
                    this.activeSectionIdx = e.detail.sectionIndex;
                    this.activeTab = 'melody';
                  }}
                  @toggle-play-song=${() => this.onTogglePlaySong()}
                ></tab-song>
              ` : html`
                <div class="main-tinted-panel">
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
                </div>
              `}
            ` : html`
              <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-weight: 700; color: var(--cv-ink-muted);">
                Loading studio workspace...
              </div>
            `}
          </div>

          <!-- Bottom Docked Transport Bar: Bounded within Center Column on Desktop -->
          <div class="transport-dock-wrapper desktop-only">
            ${this.activeTab === 'melody' ? html`
              <!-- Separate independent instance of controls for Melody -->
              <transport-bar
                id="melody-transport-bar"
                @select-section=${(e: CustomEvent) => this.onPickSection(e)}
                @new-section=${() => this.onAddSection()}
                .activeTab=${'melody'}
                .isPlaying=${this.melodyPlaying}
                .playLabel=${'Play melody'}
                .moodColor=${moodColor}
                .sections=${this.sections}
                .activeSectionId=${activeSecLetter}
                .chordSound=${this.instrument || 'Stage Rhodes'}
                .melodySound=${this.melodySound || 'Lead Synth'}
                .chordFeel=${this.playStyle || 'Block chords'}
                .melodyFeel=${this.melodyFeel || 'Smooth'}
                .feelSettings=${this.melodyFeelSettings}
                .backingEnabled=${this.melodyBackingEnabled}
                .chords=${this.progression?.chords || []}
                .keyRoot=${this.progression?.key || 'C'}
                .scaleMode=${this.progression?.scaleType === 'MINOR' ? 'Minor' : 'Major'}
                .bpm=${this.progression?.bpm || 84}
                .barsPerChord=${playbackEngine.getBarsPerChord()}
                .melodyLoop=${this.melodyLoop}
                .songTotal=${songTotal}
                @loop-cycle=${(e: CustomEvent) => {
                  this.onMelodyLoopCycle(e.detail?.melodyLoop);
                }}
                @toggle-play=${(e: CustomEvent) => {
                  this.onTogglePlay(e.detail?.target || 'melody');
                }}
                @toggle-melody-backing=${(e: CustomEvent) => {
                  this.onToggleMelodyBacking(e);
                }}
                @set-melody-sound=${(e: CustomEvent) => {
                  this.onSetMelodySound(e);
                }}
                @set-melody-feel=${(e: CustomEvent) => {
                  this.onSetMelodyFeel(e);
                }}
                @melody-feel-settings-change=${(e: CustomEvent) => {
                  this.onMelodyFeelSettingsChange(e);
                }}
                @share-click=${() => { this.shareModalOpen = true; }}
                @open-share=${() => { this.shareModalOpen = true; }}
                @bpm-change=${(e: CustomEvent) => {
                  if (this.progression) {
                    this.progression = { ...this.progression, bpm: e.detail.bpm };
                    playbackEngine.setBpm(e.detail.bpm);
                    this.requestUpdate();
                  }
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
              ></transport-bar>
            ` : html`
              <!-- Dedicated instance of controls for Chords / Song / Play -->
              <transport-bar
                id="chord-transport-bar"
                @select-section=${(e: CustomEvent) => this.onPickSection(e)}
                @new-section=${() => this.onAddSection()}
                .activeTab=${this.activeTab}
                .isPlaying=${this.activeTab === 'song' ? this.songPlaying : this.chordPlaying}
                .playLabel=${this.activeTab === 'song' ? 'Play song' : 'Play chords'}
                .moodColor=${moodColor}
                .sections=${this.sections}
                .activeSectionId=${activeSecLetter}
                .chordSound=${this.instrument || 'Stage Rhodes'}
                .melodySound=${this.melodySound || 'Lead Synth'}
                .chordFeel=${this.playStyle || 'Block chords'}
                .melodyFeel=${this.melodyFeel || 'Smooth'}
                .feelSettings=${this.chordFeelSettings}
                .chords=${this.progression?.chords || []}
                .keyRoot=${this.progression?.key || 'C'}
                .scaleMode=${this.progression?.scaleType === 'MINOR' ? 'Minor' : 'Major'}
                .bpm=${this.progression?.bpm || 84}
                .barsPerChord=${playbackEngine.getBarsPerChord()}
                .melodyLoop=${this.melodyLoop}
                .songTotal=${songTotal}
                @loop-cycle=${(e: CustomEvent) => {
                  this.onMelodyLoopCycle(e.detail?.melodyLoop);
                }}
                @toggle-play=${(e: CustomEvent) => {
                  if (this.activeTab === 'song') {
                    this.onTogglePlaySong();
                  } else {
                    this.onTogglePlay(e.detail?.target || 'chords');
                  }
                }}
                @share-click=${() => { this.shareModalOpen = true; }}
                @open-share=${() => { this.shareModalOpen = true; }}
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
                @set-chord-sound=${(e: CustomEvent) => {
                  this.onSetInstrument(new CustomEvent('set-instrument', { detail: e.detail.sound }));
                }}
                @feel-change=${(e: CustomEvent) => {
                  const val = e.detail.feel || e.detail.playStyle;
                  this.onSetPlayStyle(new CustomEvent('set-play-style', { detail: val }));
                }}
                @set-chord-feel=${(e: CustomEvent) => {
                  const val = e.detail.feel || e.detail.playStyle;
                  this.onSetPlayStyle(new CustomEvent('set-play-style', { detail: val }));
                }}
                @feel-settings-change=${(e: CustomEvent) => {
                  const fs = e.detail.feelSettings;
                  if (fs) {
                    this.chordFeelSettings = { ...fs };
                    playbackEngine.setFeelSettings(fs);
                    if (fs.playStyle && fs.playStyle !== this.playStyle) {
                      this.playStyle = fs.playStyle;
                      this.safeSet('chroma-chords-play-style', fs.playStyle);
                      playbackEngine.setPlayStyle(fs.playStyle);
                    }
                    if (fs.tone) {
                      setMasterTone(fs.tone);
                    }
                    this.requestUpdate();
                  }
                }}
                @set-feel-settings=${(e: CustomEvent) => {
                  this.chordFeelSettings = { ...this.chordFeelSettings, ...e.detail };
                  playbackEngine.setFeelSettings(this.chordFeelSettings);
                  if (e.detail.tone) {
                    setMasterTone(e.detail.tone);
                  }
                  this.requestUpdate();
                }}
              ></transport-bar>
            `}
          </div>
        </main>

        <!-- 3. Right Desktop Aside (Shown on Chords & Play It tabs per design) -->
        <aside class="desktop-aside desktop-only ${this.activeTab === 'loop' || this.activeTab === 'play' ? 'visible' : 'hidden'}">
          <chord-inspector
            .progression=${this.progression}
            .selectedChordIndex=${this.selectedChordIndex}
            .selectedBand=${this.selectedBand}
            .showTheory=${this.showTheory}
            .moodColor=${moodColor}
            .isSaved=${isBookmarked}
            .libraryOpen=${this.libraryOpen}
            .savedSets=${projectStorage.getProjects()}
            @close-detail=${() => { this.selectedChordIndex = null; }}
            @toggle-save=${() => {
              if (this.currentProjectId && projectStorage.isProjectSaved(this.currentProjectId)) {
                this.onUnsaveSet(new CustomEvent('unsave-set', { detail: this.currentProjectId }));
              } else {
                this.saveProject();
              }
            }}
            @toggle-library=${() => {
              this.libraryOpen = !this.libraryOpen;
            }}
            @select-set=${(e: CustomEvent) => this.onLoadProject(e)}
            @delete-set=${(e: CustomEvent) => this.onUnsaveSet(e)}
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

      <!-- Mobile Dock: Persistent at viewport bottom on mobile only -->
      <div class="dock-container mobile-only">
        <mobile-dock
          .activeTab=${this.activeTab}
          .isPlaying=${this.activeTab === 'melody' ? this.melodyPlaying : (this.activeTab === 'song' ? this.songPlaying : this.chordPlaying)}
          .playLabel=${this.activeTab === 'melody' ? 'Play melody' : (this.activeTab === 'song' ? 'Play song' : 'Play chords')}
          .moodColor=${moodColor}
          .sections=${this.sections}
          .activeSectionId=${activeSecLetter}
          .chordSound=${this.instrument || 'Stage Rhodes'}
          .melodySound=${this.melodySound || 'Lead Synth'}
          .chordFeel=${this.playStyle || 'Block chords'}
          .melodyFeel=${this.melodyFeel || 'Smooth'}
          .feelSettings=${this.activeTab === 'melody' ? this.melodyFeelSettings : this.chordFeelSettings}
          .backingEnabled=${this.melodyBackingEnabled}
          .chords=${this.progression?.chords || []}
          .keyRoot=${this.progression?.key || 'C'}
          .scaleMode=${this.progression?.scaleType === 'MINOR' ? 'Minor' : 'Major'}
          .bpm=${this.progression?.bpm || 84}
          .barsPerChord=${playbackEngine.getBarsPerChord()}
          .melodyLoop=${this.melodyLoop}
          .isSaved=${isBookmarked}
          @loop-cycle=${(e: CustomEvent) => {
            this.onMelodyLoopCycle(e.detail?.melodyLoop);
          }}
          @toggle-play=${(e: CustomEvent) => {
            if (this.activeTab === 'song') {
              this.onTogglePlaySong();
            } else if (this.activeTab === 'melody') {
              this.onTogglePlay('melody');
            } else {
              this.onTogglePlay(e.detail?.target || 'chords');
            }
          }}
          @toggle-melody-backing=${(e: CustomEvent) => {
            this.onToggleMelodyBacking(e);
          }}
          @set-melody-sound=${(e: CustomEvent) => {
            this.onSetMelodySound(e);
          }}
          @set-melody-feel=${(e: CustomEvent) => {
            this.onSetMelodyFeel(e);
          }}
          @melody-feel-settings-change=${(e: CustomEvent) => {
            this.onMelodyFeelSettingsChange(e);
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
          @set-chord-sound=${(e: CustomEvent) => {
            this.onSetInstrument(new CustomEvent('set-instrument', { detail: e.detail.sound }));
          }}
          @set-chord-feel=${(e: CustomEvent) => {
            const val = e.detail.feel || e.detail.playStyle;
            this.onSetPlayStyle(new CustomEvent('set-play-style', { detail: val }));
          }}
          @select-section=${(e: CustomEvent) => this.onPickSection(e)}
          @new-section=${() => this.onAddSection()}
          @set-feel=${(e: CustomEvent) => {
            const val = e.detail.feel || e.detail.playStyle;
            this.onSetPlayStyle(new CustomEvent('set-play-style', { detail: val }));
          }}
          @feel-settings-change=${(e: CustomEvent) => {
            const fs = e.detail.feelSettings;
            if (fs) {
              this.chordFeelSettings = { ...fs };
              playbackEngine.setFeelSettings(fs);
              if (fs.playStyle && fs.playStyle !== this.playStyle) {
                this.playStyle = fs.playStyle;
                this.safeSet('chroma-chords-play-style', fs.playStyle);
                playbackEngine.setPlayStyle(fs.playStyle);
              }
              if (fs.tone) {
                setMasterTone(fs.tone);
              }
              this.requestUpdate();
            }
          }}
          @set-feel-settings=${(e: CustomEvent) => {
            this.chordFeelSettings = { ...this.chordFeelSettings, ...e.detail };
            playbackEngine.setFeelSettings(this.chordFeelSettings);
            if (e.detail.tone) {
              setMasterTone(e.detail.tone);
            }
            this.requestUpdate();
          }}
        ></mobile-dock>
      </div>

      <!-- Vibe Popover (Desktop / Mobile) -->
      ${this.vibeOpen ? html`
        <div class="vibe-overlay" @click=${() => this.vibeOpen = false}></div>
        <div class="vibe-popover" role="dialog" aria-label="Vibe, genre and mood">
          <div class="vibe-popover-header">
            <div class="vibe-popover-title">The vibe</div>
            <button class="vibe-popover-close" @click=${() => this.vibeOpen = false} aria-label="Close vibe">×</button>
          </div>
          <div class="vibe-search-row">
            <input
              type="text"
              class="vibe-search-input"
              placeholder="e.g. Neon midnight drive, late 70s soul..."
              .value=${this.vibeSearchText}
              @input=${(e: any) => this.vibeSearchText = e.target.value}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                  this.applyPromptSearch();
                }
              }}
            />
            <button class="vibe-search-submit" @click=${this.applyPromptSearch} style="background: ${moodColor};" aria-label="Generate from prompt">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          <div class="vibe-section-label">Genre</div>
          <div class="vibe-pills-row">
            ${['Folk', 'Jazz', 'Lo-fi', 'Cinematic', 'Pop', 'R&B', 'Ambient', 'Rock'].map(g => {
              const active = this.genre.toLowerCase() === g.toLowerCase();
              return html`
                <button
                  class="vibe-chip ${active ? 'active' : ''}"
                  style="background: ${active ? moodColor : '#F1E4CC'}; color: #2E271F;"
                  @click=${() => { this.genre = g; this.regenerate(); }}
                >
                  ${g}
                </button>
              `;
            })}
          </div>

          <div class="vibe-section-label">Mood</div>
          <div class="vibe-pills-row">
            ${[
              { name: 'Uplifting', color: '#F6D98B', icon: 'M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5' },
              { name: 'Melancholy', color: '#9CC0EC', icon: 'M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15' },
              { name: 'Dreamy', color: '#C9A9E0', icon: 'M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0' },
              { name: 'Tense', color: '#F2735F', icon: 'M3 12 L7 6 L11 16 L15 6 L19 16 L21 12' },
              { name: 'Warm', color: '#F2C9A0', icon: 'M12 4 a6.5 6.5 0 1 0 6.5 6.5' },
              { name: 'Nostalgic', color: '#B8CC9E', icon: 'M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12' },
            ].map(m => {
              const active = this.mood.toLowerCase() === m.name.toLowerCase();
              return html`
                <button
                  class="vibe-mood-btn ${active ? 'active' : ''}"
                  style="background: ${active ? m.color : '#F1E4CC'};"
                  @click=${() => { this.mood = m.name; this.regenerate(); }}
                >
                  <div
                    class="vibe-mood-badge"
                    style="background: ${active ? 'rgba(46,39,31,0.1)' : m.color + '44'};"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${active ? '#2E271F' : m.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="${m.icon}"/>
                    </svg>
                  </div>
                  <span>${m.name}</span>
                </button>
              `;
            })}
          </div>

          <div style="display: flex; align-items: baseline; gap: 7px; margin-top: 20px;">
            <div class="vibe-section-label" style="margin-top: 0;">Band</div>
            <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.38);">optional</div>
          </div>
          <div class="vibe-pills-row">
            ${['Steely Dan', 'Khruangbin', 'Daft Punk', 'Radiohead', 'Mac DeMarco'].map(b => html`
              <button
                class="vibe-chip ${this.selectedBand === b ? 'active' : ''}"
                @click=${() => { this.selectedBand = this.selectedBand === b ? null : b; this.regenerate(); }}
              >
                ${b}
              </button>
            `)}
          </div>
        </div>
      ` : ''}

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
