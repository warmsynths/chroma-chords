import { playChordForGenre } from './audio-service';
import { Progression, AUTOPLAY_INTERVAL_MS } from './chord-engine';
import type { SongSection } from '../components/song-screen';

export type PlaybackTickCallback = (
  activeIndex: number,
  progressStep: number,
  sectionIndex?: number,
  totalSteps?: number,
  isSongMode?: boolean
) => void;

export class PlaybackEngine {
  private mode: 'single' | 'song' = 'single';
  private progression: Progression | null = null;
  private order: number[] = [];
  private sections: SongSection[] = [];
  private activeIndex = 0;
  private progressStep = 0;
  private songStep = 0;
  private activeSectionIndex = 0;
  private playing = false;
  private instrument: string | null = null;
  private playStyle: string | null = null;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private tickCallbacks = new Set<PlaybackTickCallback>();

  public setProgression(progression: Progression | null, order?: number[]): void {
    this.mode = 'single';
    this.progression = progression;
    if (progression) {
      this.order = order || Array.from({ length: progression.chords.length }, (_, i) => i);
    } else {
      this.order = [];
    }
  }

  public setSong(sections: SongSection[]): void {
    this.mode = 'song';
    this.sections = sections;
    this.songStep = 0;
    this.activeSectionIndex = 0;
    this.activeIndex = 0;
    this.progressStep = 0;
  }

  public isSongMode(): boolean {
    return this.mode === 'song';
  }

  public getActiveSectionIndex(): number {
    return this.activeSectionIndex;
  }

  public getTotalSteps(): number {
    if (this.mode === 'song') {
      return this.sections.reduce((acc, s) => acc + s.order.length, 0);
    }
    return this.order.length;
  }

  public setOrder(order: number[], newActiveIndex?: number): void {
    this.order = order;
    if (typeof newActiveIndex === 'number') {
      this.activeIndex = newActiveIndex;
    }
  }

  public setInstrument(instrument: string | null): void {
    this.instrument = instrument;
  }

  public setPlayStyle(playStyle: string | null): void {
    this.playStyle = playStyle;
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public getActiveIndex(): number {
    return this.activeIndex;
  }

  public getProgressStep(): number {
    return this.mode === 'song' ? this.songStep : this.progressStep;
  }

  public subscribeTick(cb: PlaybackTickCallback): () => void {
    this.tickCallbacks.add(cb);
    return () => this.tickCallbacks.delete(cb);
  }

  private notifyTick() {
    const totalSteps = this.getTotalSteps();
    if (this.mode === 'song') {
      this.tickCallbacks.forEach(cb => cb(this.activeIndex, this.songStep, this.activeSectionIndex, totalSteps, true));
    } else {
      this.tickCallbacks.forEach(cb => cb(this.activeIndex, this.progressStep, 0, totalSteps, false));
    }
  }

  private updateSongStepState(globalStep: number): void {
    let accum = 0;
    for (let i = 0; i < this.sections.length; i++) {
      const count = this.sections[i].order.length;
      if (globalStep < accum + count) {
        this.activeSectionIndex = i;
        const stepInSec = globalStep - accum;
        this.activeIndex = this.sections[i].order[stepInSec] ?? 0;
        this.progressStep = stepInSec;
        return;
      }
      accum += count;
    }
    this.activeSectionIndex = 0;
    this.activeIndex = 0;
    this.progressStep = 0;
  }

  public startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.playing) return;

      if (this.mode === 'song') {
        const totalSteps = this.getTotalSteps();
        if (totalSteps <= 0) return;
        this.songStep = (this.songStep + 1) % totalSteps;
        this.updateSongStepState(this.songStep);
      } else {
        if (!this.progression || this.order.length <= 0) return;
        this.activeIndex = (this.activeIndex + 1) % this.order.length;
        this.progressStep = (this.progressStep + 1) % this.order.length;
      }

      this.playActiveChord();
      this.notifyTick();
    }, AUTOPLAY_INTERVAL_MS);
  }

  public stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  public togglePlay(): boolean {
    if (this.playing) {
      this.playing = false;
      this.activeIndex = 0;
      this.progressStep = 0;
      this.songStep = 0;
      this.activeSectionIndex = 0;
      this.stopAutoplay();
      this.notifyTick();
    } else {
      this.playing = true;
      this.activeIndex = 0;
      this.progressStep = 0;
      this.songStep = 0;
      this.activeSectionIndex = 0;
      if (this.mode === 'song' && this.sections.length > 0) {
        this.updateSongStepState(0);
      }
      this.startAutoplay();
      this.playActiveChord();
      this.notifyTick();
    }
    return this.playing;
  }

  public playActiveChord(): void {
    if (this.mode === 'song') {
      const sec = this.sections[this.activeSectionIndex];
      if (!sec) return;
      const chordIndex = this.activeIndex;
      const chord = sec.progression.chords[chordIndex];
      if (chord) {
        const pitchedNotes = chord.notes.map(n => `${n}4`);
        playChordForGenre(pitchedNotes, sec.progression.genre, {
          bpm: sec.progression.bpm,
          duration: 1.2,
          instrument: this.instrument ?? undefined,
          playStyle: this.playStyle ?? undefined,
        });
      }
    } else {
      if (!this.progression) return;
      const chordIndex = this.order[this.activeIndex] ?? 0;
      const chord = this.progression.chords[chordIndex];
      if (chord) {
        this.playChordNotes(chord.notes, 1.2);
      }
    }
  }

  public playChordAtIndex(index: number, duration = 0.8): void {
    if (!this.progression || !this.progression.chords[index]) return;
    const chord = this.progression.chords[index];
    this.playChordNotes(chord.notes, duration);
  }

  public playChordNotes(notes: string[], duration?: number): void {
    if (!this.progression) return;
    const pitchedNotes = notes.map(n => `${n}4`);
    playChordForGenre(pitchedNotes, this.progression.genre, {
      bpm: this.progression.bpm,
      duration,
      instrument: this.instrument ?? undefined,
      playStyle: this.playStyle ?? undefined,
    });
  }

  public reset(): void {
    this.stopAutoplay();
    this.playing = false;
    this.activeIndex = 0;
    this.progressStep = 0;
    this.songStep = 0;
    this.activeSectionIndex = 0;
    this.notifyTick();
  }
}

export const playbackEngine = new PlaybackEngine();

