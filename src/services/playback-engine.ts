import { playChordForGenre } from './audio-service';
import { Progression, AUTOPLAY_INTERVAL_MS } from './chord-engine';

export type PlaybackTickCallback = (activeIndex: number, progressStep: number) => void;

export class PlaybackEngine {
  private progression: Progression | null = null;
  private order: number[] = [];
  private activeIndex = 0;
  private progressStep = 0;
  private playing = false;
  private instrument: string | null = null;
  private playStyle: string | null = null;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private tickCallbacks = new Set<PlaybackTickCallback>();

  public setProgression(progression: Progression | null, order?: number[]): void {
    this.progression = progression;
    if (progression) {
      this.order = order || Array.from({ length: progression.chords.length }, (_, i) => i);
    } else {
      this.order = [];
    }
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
    return this.progressStep;
  }

  public subscribeTick(cb: PlaybackTickCallback): () => void {
    this.tickCallbacks.add(cb);
    return () => this.tickCallbacks.delete(cb);
  }

  private notifyTick() {
    this.tickCallbacks.forEach(cb => cb(this.activeIndex, this.progressStep));
  }

  public startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.progression || !this.playing) return;
      this.activeIndex = (this.activeIndex + 1) % this.order.length;
      this.progressStep = (this.progressStep + 1) % this.order.length;
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
      this.stopAutoplay();
      this.notifyTick();
    } else {
      this.playing = true;
      this.activeIndex = 0;
      this.progressStep = 0;
      this.startAutoplay();
      this.playActiveChord();
      this.notifyTick();
    }
    return this.playing;
  }

  public playActiveChord(): void {
    if (!this.progression) return;
    const chordIndex = this.order[this.activeIndex] ?? 0;
    const chord = this.progression.chords[chordIndex];
    if (chord) {
      this.playChordNotes(chord.notes, 1.2);
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
    this.notifyTick();
  }
}

export const playbackEngine = new PlaybackEngine();
