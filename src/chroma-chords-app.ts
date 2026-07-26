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
import { SongSection } from './components/song-screen';

type Screen = 'seed' | 'loop' | 'song';

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
  @state() private pendingChordSuggestion: NormalizedPrompt | null = null;
  @state() private userEmail: string | null = null;
  @state() private isAuthenticated = false;

  private currentProjectId: string | null = null;
  private activeSearchPrompt: string | null = null;
  private unsubscribeAuth: (() => void) | null = null;
  private unsubscribeTick: (() => void) | null = null;

  static styles = css`
    :host {
      display: block;
      min-height: 100dvh;
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

    this.unsubscribeTick = playbackEngine.subscribeTick((activeIdx, step) => {
      this.activeIndex = activeIdx;
      this.progressStep = step;
      this.playing = playbackEngine.isPlaying();
      this.requestUpdate();
    });

    projectStorage.initSilentAuth();

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
    this.saveProject();
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
    this.saveProject();

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
    this.saveProject();
  }

  private onBack() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.screen = 'seed';
    this.sheetOpen = false;
    this.keyOverride = null;
    this.scaleOverride = null;
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
    this.saveProject();
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
    this.saveProject();
  }

  private onBackToProgression() {
    this.screen = 'loop';
  }

  private onViewSong() {
    playbackEngine.stopAutoplay();
    this.playing = false;
    this.sheetOpen = false;
    this.screen = 'song';
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
  }

  private saveProject() {
    if (!this.progression) return;
    const id = this.currentProjectId || Math.random().toString(36).slice(2, 11);
    this.currentProjectId = id;
    const project: ProjectData = {
      id,
      name: `${this.progression.genre} · ${this.progression.mood}`,
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
  }

  render() {
    if (this.screen === 'seed' || !this.progression) {
      return html`
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
        ></seed-screen>
      `;
    }

    if (this.screen === 'song') {
      return html`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .canAddSection=${this.sections.length < SECTION_TEMPLATES.length}
          @select-section=${this.onSelectSection}
          @add-section=${this.onAddSection}
          @back-to-progression=${this.onBackToProgression}
        ></song-screen>
      `;
    }

    const swapChord = this.swapIndex !== null ? this.progression.chords[this.swapIndex] : null;

    return html`
      <loop-screen
        .progression=${this.progression}
        .activeIndex=${this.activeIndex}
        .progressStep=${this.progressStep}
        .order=${this.order}
        .playing=${this.playing}
        .showTheory=${this.showTheory}
        .instrument=${this.instrument}
        .playStyle=${this.playStyle}
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
      ></loop-screen>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chroma-chords-app': ChromaChordsApp;
  }
}
