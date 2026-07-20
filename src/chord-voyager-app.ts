import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ProjectService, ProjectData } from './services/project-service';
import { GoogleDriveService } from './services/google-drive-service';
import { playChord } from './services/audio-service';
import {
  loadChordData, generateProgression, generateAlternatives,
  RawChordData, Progression, ChordBlock, Alternative,
} from './services/chord-engine';
import './components/seed-screen';
import './components/loop-screen';

type Screen = 'seed' | 'loop';

@customElement('chord-voyager-app')
export class ChordVoyagerApp extends LitElement {
  @state() private chordData: RawChordData = { chords: {}, scales: {} };
  @state() private screen: Screen = 'seed';
  @state() private genre = 'Pop';
  @state() private mood = 'Uplifting';
  @state() private progression: Progression | null = null;
  @state() private activeIndex = 0;
  @state() private order: number[] = [0, 1, 2, 3, 4];
  @state() private keyOverride: string | null = null;
  @state() private scaleOverride: string | null = null;
  @state() private playing = true;
  @state() private showTheory = false;
  @state() private sheetOpen = false;
  @state() private swapIndex: number | null = null;
  @state() private alternatives: Alternative[] = [];

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
    this.showTheory = localStorage.getItem('chord-voyager-show-theory') === 'true';

    try {
      this.chordData = await loadChordData();
    } catch (err) {
      console.error('Failed to load chord voyager data:', err);
    }

    this.initSilentAuth();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoplay();
  }

  private startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.progression || !this.playing || this.sheetOpen) return;
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
    playChord(chord.notes.map(n => `${n}4`), 1.0);
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
    const progression = generateProgression(this.chordData, this.genre, this.mood);
    this.progression = progression;
    this.order = [0, 1, 2, 3, 4];
    this.activeIndex = 0;
    this.playing = true;
    this.screen = 'loop';
    this.saveProject();
    this.startAutoplay();
    this.playActiveChord();
  }

  private regenerate() {
    const progression = generateProgression(this.chordData, this.genre, this.mood, {
      key: this.keyOverride ?? undefined,
      scaleType: this.scaleOverride ?? undefined,
    });
    this.progression = progression;
    this.order = [0, 1, 2, 3, 4];
    this.activeIndex = 0;
    this.saveProject();
    this.playActiveChord();
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

  private onShuffle() {
    if (!this.progression) return;
    const order = [...this.order];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    this.order = order;
    this.activeIndex = 0;
    this.playActiveChord();
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
    localStorage.setItem('chord-voyager-show-theory', String(this.showTheory));
  }

  private onTogglePlay() {
    this.playing = !this.playing;
    if (this.playing) {
      this.playActiveChord();
    }
  }

  private onChordTap(e: CustomEvent<number>) {
    if (!this.progression) return;
    this.swapIndex = e.detail;
    this.alternatives = generateAlternatives(this.chordData, this.progression, e.detail);
    this.sheetOpen = true;
    playChord(this.progression.chords[e.detail].notes.map(n => `${n}4`), 0.8);
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
    this.saveProject();
    playChord(e.detail.chord.notes.map(n => `${n}4`), 0.8);
  }

  private onVoicingPreview(e: CustomEvent<string[]>) {
    playChord(e.detail.map(n => `${n}4`), 0.6);
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
    const savedAuth = localStorage.getItem('chord-voyager-auth');
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
            localStorage.setItem('chord-voyager-auth', userInfo.email);
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
          @genre-change=${this.onGenreChange}
          @mood-change=${this.onMoodChange}
          @generate=${this.onGenerate}
        ></seed-screen>
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
        .alternatives=${this.alternatives}
        @back=${this.onBack}
        @theory-toggle=${this.onTheoryToggle}
        @toggle-play=${this.onTogglePlay}
        @chord-tap=${this.onChordTap}
        @close=${this.onSheetClose}
        @select-alternative=${this.onSelectAlternative}
        @voicing-preview=${this.onVoicingPreview}
        @set-key=${this.onSetKey}
        @set-scale=${this.onSetScale}
        @set-genre=${this.onSetGenre}
        @set-mood=${this.onSetMood}
        @shuffle=${this.onShuffle}
      ></loop-screen>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chord-voyager-app': ChordVoyagerApp;
  }
}
