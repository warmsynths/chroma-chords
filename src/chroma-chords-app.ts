import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ProjectData, ProjectChord } from './services/project-service';
import { projectStorage } from './services/project-storage';
import { playbackEngine } from './services/playback-engine';
import { PromptClassifier } from './services/prompt-classifier';
import { SongArranger, SECTION_TEMPLATES } from './services/song-arranger';
import {
  loadChordData, generateProgression, RawChordData, Progression, ChordBlock, Alternative, generateAlternatives, applyVoicingToChord,
} from './services/chord-engine';
import { USER_INSTRUMENTS, USER_PLAY_STYLES } from './services/audio-service';
import { NormalizedPrompt } from './services/freetext-schema';
import './components/seed-screen';
import './components/loop-screen';
import './components/song-screen';
import './components/sets-screen';
import { SongSection } from './components/song-screen';

type Screen = 'seed' | 'loop' | 'song' | 'sets';

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
  @state() private length = 4;
  @state() private sections: SongSection[] = [];
  @state() private activeSectionIdx = 0;
  @state() private activePlayingSectionIdx = 0;
  @state() private totalSongSteps = 0;
  @state() private pendingChordSuggestion: NormalizedPrompt | null = null;
  @state() private userEmail: string | null = null;
  @state() private isAuthenticated = false;

  private currentProjectId: string | null = null;
  private activeSearchPrompt: string | null = null;
  private unsubscribeAuth: (() => void) | null = null;
  private unsubscribeTick: (() => void) | null = null;

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
    }
  `;

  async firstUpdated() {
    this.showTheory = (localStorage.getItem('chroma-chords-show-theory') || localStorage.getItem('chord-voyager-show-theory')) === 'true';
    const savedInstrument = localStorage.getItem('chroma-chords-instrument');
    if (savedInstrument && USER_INSTRUMENTS.some(i => i.name === savedInstrument)) this.instrument = savedInstrument;
    const savedPlayStyle = localStorage.getItem('chroma-chords-play-style');
    if (savedPlayStyle && USER_PLAY_STYLES.some(p => p.name === savedPlayStyle)) this.playStyle = savedPlayStyle;

    playbackEngine.setInstrument(this.instrument);
    playbackEngine.setPlayStyle(this.playStyle);

    this.unsubscribeAuth = projectStorage.subscribeAuthState((email, authenticated) => {
      this.userEmail = email;
      this.isAuthenticated = authenticated;
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
      this.requestUpdate();
    });

    try {
      this.chordData = await loadChordData();
    } catch (err) {
      console.error('Failed to load chord data:', err);
    }
  }

  get isAdmin(): boolean {
    return projectStorage.isAdmin;
  }

  private onLoginRequest = async () => {
    await projectStorage.requestLogin();
  };

  private onLogoutRequest = () => {
    projectStorage.logout();
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    playbackEngine.stopAutoplay();
    if (this.unsubscribeAuth) this.unsubscribeAuth();
    if (this.unsubscribeTick) this.unsubscribeTick();
  }

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

    this.screen = 'loop';
    this.sections = SongArranger.createInitialSong(progression, this.order);
    this.activeSectionIdx = 0;
    this.pendingChordSuggestion = null;
    this.activeSearchPrompt = null;
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
    this.screen = 'seed';
    this.sheetOpen = false;
    this.keyOverride = null;
    this.scaleOverride = null;
  }

  private onViewSets() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.screen = 'sets';
  }

  private onLoadProject(e: CustomEvent<string>) {
    const id = e.detail;
    const p = projectStorage.getProjects().find(proj => proj.id === id);
    if (!p) return;
    this.currentProjectId = p.id;
    this.progression = {
      genre: p.genre || 'Unknown',
      mood: p.mood || 'Neutral',
      key: p.key || 'C',
      scaleType: p.scaleType || 'MAJOR',
      bpm: p.bpm || 120,
      chords: p.chords as unknown as ChordBlock[],
    };
    this.order = Array.from({ length: this.progression.chords.length }, (_, i) => i);
    this.length = this.progression.chords.length;
    this.showTheory = p.showTheory ?? this.showTheory;
    
    playbackEngine.setProgression(this.progression, this.order);
    this.screen = 'loop';
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

  private async onSyncProjects() {
    await projectStorage.syncProjectsFromCloud();
    await projectStorage.syncProjectsToCloud();
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
    this.swapIndex = e.detail;
    this.sheetMode = 'swap';
    this.alternatives = generateAlternatives(this.chordData, this.progression, e.detail);
    this.sheetOpen = true;
    playbackEngine.playChordAtIndex(e.detail, 0.8);
  }

  private onChordVoicingTap(e: CustomEvent<number>) {
    if (!this.progression) return;
    this.swapIndex = e.detail;
    this.sheetMode = 'voicing';
    this.alternatives = [];
    this.sheetOpen = true;
    playbackEngine.playChordAtIndex(e.detail, 0.8);
  }

  private onChordPreview(e: CustomEvent<number>) {
    if (!this.progression) return;
    playbackEngine.playChordAtIndex(e.detail, 0.8);
  }

  private onSheetClose() {
    this.sheetOpen = false;
    this.swapIndex = null;
  }

  private onSelectAlternative(e: CustomEvent<Alternative>) {
    if (!this.progression || this.swapIndex === null) return;
    const chords = [...this.progression.chords];
    chords[this.swapIndex] = e.detail.chord;
    this.progression = { ...this.progression, chords };
    playbackEngine.setProgression(this.progression, this.order);
    this.sheetOpen = false;
    this.swapIndex = null;
    this.syncActiveSection();
    playbackEngine.playChordNotes(e.detail.chord.notes, 0.8);
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
    this.screen = 'loop';
    if (this.progression) {
      playbackEngine.setProgression(this.progression, this.order);
    }
  }

  private onViewSong() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.sheetOpen = false;
    this.screen = 'song';
    playbackEngine.setSong(this.sections);
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
    this.screen = 'loop';

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
  }

  render() {
    let screenContent;
    if (this.screen === 'sets') {
      screenContent = html`
        <sets-screen
          .projects=${projectStorage.getProjects()}
          @back=${this.onBack}
          @load-project=${this.onLoadProject}
          @delete-project=${this.onDeleteProject}
          @sync-projects=${this.onSyncProjects}
        ></sets-screen>
      `;
    } else if (this.screen === 'seed' || !this.progression) {
      screenContent = html`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          .length=${this.length}
          .isAuthenticated=${this.isAuthenticated}
          .isAdmin=${this.isAdmin}
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
          .sheetOpen=${this.sheetOpen}
          .sheetMode=${this.sheetMode}
          .swapChord=${swapChord}
          .swapIndex=${this.swapIndex}
          .alternatives=${this.alternatives}
          @back=${this.onBack}
          @theory-toggle=${this.onTheoryToggle}
          @set-instrument=${this.onSetInstrument}
          @set-play-style=${this.onSetPlayStyle}
          @toggle-play=${this.onTogglePlay}
          @chord-tap=${this.onChordTap}
          @chord-voicing-tap=${this.onChordVoicingTap}
          @chord-preview=${this.onChordPreview}
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
          @save-set=${this.onSaveSet}
          @view-sets=${this.onViewSets}
        ></loop-screen>
      `;
    }

    return html`<div class="screen-view">${screenContent}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chroma-chords-app': ChromaChordsApp;
  }
}
