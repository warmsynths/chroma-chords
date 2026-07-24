import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ProjectService, ProjectData } from './services/project-service';
import { GoogleDriveService } from './services/google-drive-service';
import { playChordForGenre } from './services/audio-service';
import {
  loadChordData, generateProgression, generateAlternatives, applyVoicingToChord,
  RawChordData, Progression, ChordBlock, Alternative,
} from './services/chord-engine';
import './components/seed-screen';
import './components/loop-screen';
import './components/song-screen';
import { SongSection } from './components/song-screen';

type Screen = 'seed' | 'loop' | 'song';

const SECTION_NAMES = ['Verse', 'Chorus', 'Bridge', 'Pre-chorus', 'Outro'];

@customElement('chroma-chords-app')
export class ChromaChordsApp extends LitElement {
  @state() private chordData: RawChordData = { chords: {}, scales: {} };
  @state() private screen: Screen = 'seed';
  @state() private genre = 'Pop';
  @state() private mood = 'Uplifting';
  @state() private progression: Progression | null = null;
  @state() private activeIndex = 0;
  @state() private order: number[] = [0, 1, 2, 3];
  @state() private keyOverride: string | null = null;
  @state() private scaleOverride: string | null = null;
  @state() private playing = true;
  @state() private showTheory = false;
  @state() private sheetOpen = false;
  @state() private swapIndex: number | null = null;
  @state() private alternatives: Alternative[] = [];
  @state() private length = 4;
  @state() private sections: SongSection[] = [];
  @state() private activeSectionIdx = 0;

  private currentProjectId: string | null = null;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  private readonly AUTHORIZED_HASHES = [
    'cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2',
    '99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac',
  ];

  private driveService = new GoogleDriveService();
  private tokenClient: any = null;
  private isAuthenticated = false;
  private isDriveSyncing = false;

  static styles = css`
    :host {
      display: block;
      min-height: 100dvh;
    }
  `;

  async firstUpdated() {
    this.showTheory = (localStorage.getItem('chroma-chords-show-theory') || localStorage.getItem('chord-voyager-show-theory')) === 'true';

    try {
      this.chordData = await loadChordData();
    } catch (err) {
      console.error('Failed to load chord data:', err);
    }

    // Not currently surfaced in the UI (no login/sync affordance), so don't trigger it on load.
    // this.initSilentAuth();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoplay();
  }

  private startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.progression || !this.playing) return;
      this.activeIndex = (this.activeIndex + 1) % this.order.length;
      this.playActiveChord();
    }, 1700);
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private playActiveChord() {
    if (!this.progression) return;
    const chordIndex = this.order[this.activeIndex] ?? 0;
    const chord = this.progression.chords[chordIndex];
    playChordForGenre(chord.notes.map(n => `${n}4`), this.progression.genre, { bpm: this.progression.bpm });
  }

  private onGenreChange(e: CustomEvent<string>) {
    this.genre = e.detail;
  }

  private onMoodChange(e: CustomEvent<string>) {
    this.mood = e.detail;
  }

  private onGenerate() {
    this.keyOverride = null;
    this.scaleOverride = null;
    const progression = generateProgression(this.chordData, this.genre, this.mood, { length: this.length });
    this.progression = progression;
    this.order = Array.from({ length: this.length }, (_, i) => i);
    this.activeIndex = 0;
    this.playing = false;
    this.screen = 'loop';
    this.sections = [{ name: SECTION_NAMES[0], progression, order: this.order.slice() }];
    this.activeSectionIdx = 0;
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
    this.syncActiveSection();
    this.saveProject();
    if (this.playing) {
      this.startAutoplay();
      this.playActiveChord();
    }
  }

  // Keeps the section the user is currently editing in the Loop screen up to date with
  // whatever they just changed (key/scale/genre/mood, a chord swap, a reorder), so revisiting
  // the Song screen or switching sections doesn't show stale chords.
  private syncActiveSection() {
    if (!this.progression || !this.sections[this.activeSectionIdx]) return;
    const sections = [...this.sections];
    sections[this.activeSectionIdx] = { ...sections[this.activeSectionIdx], progression: this.progression, order: this.order.slice() };
    this.sections = sections;
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

  // Dice reroll: a new progression in the current genre/mood/key/scale, not just a reorder.
  private onReroll() {
    if (!this.progression) return;
    this.regenerate();
  }

  // Drag-to-reorder: keep the currently active chord "active" by absolute identity, not by
  // screen position, so playback doesn't jump to a different chord just because the one that
  // was playing got dragged to a new slot.
  private onReorder(e: CustomEvent<number[]>) {
    if (!this.progression) return;
    const activeChordIndex = this.order[this.activeIndex];
    this.order = e.detail;
    const newPos = this.order.indexOf(activeChordIndex);
    this.activeIndex = newPos >= 0 ? newPos : 0;
    this.syncActiveSection();
    this.saveProject();
  }

  private onBack() {
    this.stopAutoplay();
    this.screen = 'seed';
    this.sheetOpen = false;
    this.keyOverride = null;
    this.scaleOverride = null;
  }

  private onTheoryToggle() {
    this.showTheory = !this.showTheory;
    localStorage.setItem('chroma-chords-show-theory', String(this.showTheory));
  }

  // Play/Stop, not play/pause: stopping always returns to the first chord and halts the
  // loop entirely, rather than leaving a stale autoplay interval running in the background
  // (which was the source of the "resumes and immediately skips ahead" glitch — the old
  // interval kept ticking on its original schedule the whole time it was "paused").
  private onTogglePlay() {
    if (this.playing) {
      this.playing = false;
      this.activeIndex = 0;
      this.stopAutoplay();
    } else {
      this.playing = true;
      this.activeIndex = 0;
      this.startAutoplay();
      this.playActiveChord();
    }
  }

  private onChordTap(e: CustomEvent<number>) {
    if (!this.progression) return;
    this.swapIndex = e.detail;
    this.alternatives = generateAlternatives(this.chordData, this.progression, e.detail);
    this.sheetOpen = true;
    playChordForGenre(this.progression.chords[e.detail].notes.map(n => `${n}4`), this.progression.genre, { bpm: this.progression.bpm, duration: 0.8 });
  }

  // A plain tap on a chord shape just previews the sound — it doesn't open the swap sheet.
  // Only the shape's dedicated swap-icon badge does that (see onChordTap above).
  private onChordPreview(e: CustomEvent<number>) {
    if (!this.progression) return;
    playChordForGenre(this.progression.chords[e.detail].notes.map(n => `${n}4`), this.progression.genre, { bpm: this.progression.bpm, duration: 0.8 });
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
    this.sheetOpen = false;
    this.swapIndex = null;
    this.syncActiveSection();
    this.saveProject();
    playChordForGenre(e.detail.chord.notes.map(n => `${n}4`), this.progression.genre, { bpm: this.progression.bpm, duration: 0.8 });
  }

  private onVoicingPreview(e: CustomEvent<string[]>) {
    if (!this.progression) return;
    playChordForGenre(e.detail.map(n => `${n}4`), this.progression.genre, { bpm: this.progression.bpm, duration: 0.6 });
  }

  // Applying a quality/extension in the swap sheet used to only preview the sound — the
  // progression itself was never touched, so the chord reverted the moment the sheet closed
  // or the loop moved to the next chord. Persist it into the real chord here instead.
  private onVoicingChange(e: CustomEvent<{ quality: string; extension: string }>) {
    if (!this.progression || this.swapIndex === null) return;
    const chords = [...this.progression.chords];
    chords[this.swapIndex] = applyVoicingToChord(chords[this.swapIndex], e.detail.quality, e.detail.extension);
    this.progression = { ...this.progression, chords };
    this.syncActiveSection();
    this.saveProject();
  }

  private onViewSong() {
    this.stopAutoplay();
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
    this.length = section.progression.chords.length;
    this.keyOverride = section.progression.key;
    this.scaleOverride = section.progression.scaleType;
    this.sheetOpen = false;
    this.screen = 'loop';
    if (this.playing) {
      this.startAutoplay();
      this.playActiveChord();
    }
  }

  private onAddSection() {
    if (!this.progression || this.sections.length >= SECTION_NAMES.length) return;
    const progression = generateProgression(this.chordData, this.genre, this.mood, {
      key: this.progression.key,
      scaleType: this.progression.scaleType,
      length: this.length,
    });
    const order = Array.from({ length: this.length }, (_, i) => i);
    const section: SongSection = { name: SECTION_NAMES[this.sections.length], progression, order };
    this.sections = [...this.sections, section];
    this.activeSectionIdx = this.sections.length - 1;
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
      chords: this.progression.chords as ChordBlock[],
      showTheory: this.showTheory,
    };
    ProjectService.saveProject(project);
    this.syncProjectsToCloud();
  }

  private initSilentAuth() {
    const savedAuth = localStorage.getItem('chroma-chords-auth') || localStorage.getItem('chord-voyager-auth');
    if (!savedAuth) return;

    this.hashEmail(savedAuth).then(hash => {
      if (!this.AUTHORIZED_HASHES.includes(hash)) return;
      this.isAuthenticated = true;
      this.setupGoogleAuth();
    });
  }

  private setupGoogleAuth() {
    const checkGoogle = setInterval(() => {
      if (!(window as any).google) return;
      clearInterval(checkGoogle);

      this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: '184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email',
        callback: async (tokenResponse: any) => {
          if (!tokenResponse || !tokenResponse.access_token) return;
          try {
            const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            if (!userInfoRes.ok) return;
            const userInfo = await userInfoRes.json();
            if (!userInfo?.email) return;
            const hash = await this.hashEmail(userInfo.email);
            if (!this.AUTHORIZED_HASHES.includes(hash)) return;

            this.isAuthenticated = true;
            localStorage.setItem('chroma-chords-auth', userInfo.email);
            this.driveService.setAccessToken(tokenResponse.access_token);
            await this.syncProjectsFromCloud();
            await this.syncProjectsToCloud();
          } catch (e) {
            console.error('Silent Drive auth failed', e);
          }
        },
      });

      try {
        this.tokenClient.requestAccessToken({ prompt: '' });
      } catch (e) {
        console.error('Failed to request Drive access silently', e);
      }
    }, 200);
  }

  private async syncProjectsFromCloud() {
    if (this.isDriveSyncing || !this.driveService.hasAccessToken()) return;
    this.isDriveSyncing = true;
    try {
      const cloudProjects = await this.driveService.loadProjects();
      if (cloudProjects) {
        cloudProjects.forEach(p => (p.syncedToCloud = true));
        const localProjects = ProjectService.getProjects();
        const merged = ProjectService.mergeProjects(localProjects, cloudProjects);
        ProjectService.setProjects(merged);
      }
    } catch (e) {
      console.error('Failed to sync from cloud', e);
    } finally {
      this.isDriveSyncing = false;
    }
  }

  private async syncProjectsToCloud() {
    if (!this.isAuthenticated || !this.driveService.hasAccessToken() || this.isDriveSyncing) return;
    this.isDriveSyncing = true;
    try {
      const projects = ProjectService.getProjects();
      await this.driveService.saveProjects(projects);
      projects.forEach(p => (p.syncedToCloud = true));
      ProjectService.setProjects(projects);
    } catch (e) {
      console.error('Failed to sync to cloud', e);
    } finally {
      this.isDriveSyncing = false;
    }
  }

  private async hashEmail(email: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(email);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  render() {
    if (this.screen === 'seed' || !this.progression) {
      return html`
        <seed-screen
          .genre=${this.genre}
          .mood=${this.mood}
          .length=${this.length}
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @length-change=${this.onLengthChange}
          @generate=${this.onGenerate}
        ></seed-screen>
      `;
    }

    if (this.screen === 'song') {
      return html`
        <song-screen
          .sections=${this.sections}
          .activeSectionIdx=${this.activeSectionIdx}
          .canAddSection=${this.sections.length < SECTION_NAMES.length}
          @select-section=${this.onSelectSection}
          @add-section=${this.onAddSection}
        ></song-screen>
      `;
    }

    const swapChord = this.swapIndex !== null ? this.progression.chords[this.swapIndex] : null;

    return html`
      <loop-screen
        .progression=${this.progression}
        .activeIndex=${this.activeIndex}
        .order=${this.order}
        .playing=${this.playing}
        .showTheory=${this.showTheory}
        .sheetOpen=${this.sheetOpen}
        .swapChord=${swapChord}
        .swapIndex=${this.swapIndex}
        .alternatives=${this.alternatives}
        @back=${this.onBack}
        @theory-toggle=${this.onTheoryToggle}
        @toggle-play=${this.onTogglePlay}
        @chord-tap=${this.onChordTap}
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
