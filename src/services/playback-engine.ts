import { playChordForGenre, playSubNote, applyVoicingToNotes, FeelSettings } from './audio-service';
import { Progression, ChordBlock, AUTOPLAY_INTERVAL_MS, notesForSymbol, preferFlatSpelling } from './chord-engine';
import type { SongSection } from '../components/song-screen';

export type PlaybackTickCallback = (
  activeIndex: number,
  progressStep: number,
  sectionIndex?: number,
  totalSteps?: number,
  isSongMode?: boolean
) => void;

export function pitchNotesAscending(notes: string[], baseOctave = 4): string[] {
  const validNotes = Array.isArray(notes) ? notes.filter(n => typeof n === 'string' && n.trim().length > 0) : [];
  if (validNotes.length === 0) return [];

  const noteToPc: Record<string, number> = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
    'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
  };
  
  const clean = validNotes.map(n => n.replace(/\d+$/, ''));
  const root = clean[0];
  const rootPc = noteToPc[root] ?? 0;
  let currentOctave = baseOctave;
  let lastPc = rootPc;
  
  const pitched: string[] = [];
  clean.forEach((n, idx) => {
    const pc = noteToPc[n] ?? 0;
    if (idx > 0 && pc <= lastPc) {
      currentOctave++;
    }
    pitched.push(`${n}${currentOctave}`);
    lastPc = pc;
  });
  
  // Add fundamental root bass note in lower register (e.g. C3, E3)
  const bassNote = `${root}${baseOctave - 1}`;
  return [bassNote, ...pitched];
}

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
  private abOverride: { index: number; chord: ChordBlock | null; side: 'before' | 'after' } | null = null;
  private subBassEnabled = false;
  private barsPerChord = 1;
  private feelSettings: FeelSettings = { swing: 0, spread: 50, density: 50, tone: 'Warm' };

  public setSubBassEnabled(enabled: boolean): void {
    this.subBassEnabled = enabled;
  }

  public isSubBassEnabled(): boolean {
    return this.subBassEnabled;
  }

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

  public setBpm(bpm: number): void {
    const safeBpm = Math.max(40, Math.min(240, bpm));
    if (this.progression) {
      this.progression.bpm = safeBpm;
    }
    if (this.playing) {
      this.startAutoplay();
    }
  }

  public setBarsPerChord(bars: number): void {
    this.barsPerChord = Math.max(1, bars);
    if (this.playing) {
      this.startAutoplay();
    }
  }

  public getBarsPerChord(): number {
    return this.barsPerChord;
  }

  public setFeelSettings(feel: Partial<FeelSettings>): void {
    this.feelSettings = { ...this.feelSettings, ...feel };
  }

  public getFeelSettings(): FeelSettings {
    return { ...this.feelSettings };
  }

  public getStepIntervalMs(): number {
    const bpm = this.mode === 'song'
      ? (this.sections[this.activeSectionIndex]?.progression.bpm || this.progression?.bpm || 84)
      : (this.progression?.bpm || 84);
    const safeBpm = Math.max(40, Math.min(240, bpm));
    const bars = Math.max(1, this.barsPerChord);
    return Math.round(bars * (240000 / safeBpm));
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
    const intervalMs = this.getStepIntervalMs();
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
    }, intervalMs);
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

  public setABOverride(
    overrideOrIndex: { index: number; chord: ChordBlock | null; side: 'before' | 'after' } | number | null,
    chord?: ChordBlock | null,
    side: 'before' | 'after' = 'before'
  ): void {
    if (overrideOrIndex === null || overrideOrIndex === undefined) {
      this.abOverride = null;
    } else if (typeof overrideOrIndex === 'object') {
      this.abOverride = overrideOrIndex;
    } else {
      this.abOverride = { index: overrideOrIndex, chord: chord || null, side };
    }
  }

  public clearABOverride(): void {
    this.abOverride = null;
  }

  public playActiveChord(): void {
    if (this.mode === 'song') {
      const sec = this.sections[this.activeSectionIndex];
      if (!sec) return;
      const chordIndex = this.activeIndex;
      const chord = sec.progression.chords[chordIndex];
      if (chord) {
        const notes = (chord.notes && chord.notes.length > 0) 
          ? chord.notes 
          : notesForSymbol(chord.name, preferFlatSpelling(sec.progression.key, sec.progression.scaleType));
        const pitchedNotes = pitchNotesAscending(notes, 4);
        playChordForGenre(pitchedNotes, sec.progression.genre, {
          bpm: sec.progression.bpm,
          duration: (this.getStepIntervalMs() / 1000) * 0.85,
          instrument: this.instrument ?? undefined,
          playStyle: this.playStyle ?? undefined,
          feelSettings: this.feelSettings,
        });
      }
    } else {
      if (!this.progression) return;
      const chordIndex = this.order[this.activeIndex] ?? 0;
      let chord = this.progression.chords[chordIndex];
      if (this.abOverride && this.abOverride.index === chordIndex) {
        if (this.abOverride.side === 'after' && this.abOverride.chord) {
          chord = this.abOverride.chord;
        }
      }
      if (chord) {
        let notes = Array.isArray(chord.notes) ? chord.notes : [];
        if (notes.length === 0 || !notes.every(n => typeof n === 'string' && n.trim().length > 0)) {
          const safeName = chord.name || 'CMAJ';
          const key = this.progression.key || 'C';
          const scaleType = this.progression.scaleType || 'MAJOR';
          notes = notesForSymbol(safeName, preferFlatSpelling(key, scaleType));
        }
        this.playChordNotes(notes, 1.2);
        if (this.subBassEnabled && notes.length > 0) {
          playSubNote(notes[0], 1.4);
        }
      }
    }
  }

  public auditionChord(chord: ChordBlock, duration = 0.8): void {
    if (!chord) return;
    let notes = Array.isArray(chord.notes) ? chord.notes : [];
    if (notes.length === 0 || !notes.every(n => typeof n === 'string' && n.trim().length > 0)) {
      const safeName = chord.name || 'CMAJ';
      const key = this.progression?.key || 'C';
      const scaleType = this.progression?.scaleType || 'MAJOR';
      notes = notesForSymbol(safeName, preferFlatSpelling(key, scaleType));
    }
    this.playChordNotes(notes, duration);
  }

  public playChordAtIndex(index: number, duration = 0.8, voicing?: string, velocity?: number): void {
    if (!this.progression || !this.progression.chords[index]) return;
    const chord = this.progression.chords[index];
    
    let notes = Array.isArray(chord.notes) ? chord.notes : [];
    if (notes.length === 0 || !notes.every(n => typeof n === 'string' && n.trim().length > 0)) {
      const safeName = chord.name || 'CMAJ';
      const key = this.progression.key || 'C';
      const scaleType = this.progression.scaleType || 'MAJOR';
      notes = notesForSymbol(safeName, preferFlatSpelling(key, scaleType));
    }
    
    this.playChordNotes(notes, duration, voicing, velocity);
  }

  public playChordNotes(notes: string[], duration?: number, voicing?: string, velocity?: number): void {
    if (!this.progression) return;
    
    const validNotes = Array.isArray(notes) ? notes.filter(n => typeof n === 'string' && n.trim().length > 0) : [];
    if (validNotes.length === 0) return;

    const pitchedNotes = voicing
      ? applyVoicingToNotes(validNotes, voicing)
      : pitchNotesAscending(validNotes, 4);

    playChordForGenre(pitchedNotes, this.progression.genre || 'Unknown', {
      bpm: this.progression.bpm || 120,
      duration: duration || (this.getStepIntervalMs() / 1000) * 0.85,
      instrument: this.instrument ?? undefined,
      playStyle: this.playStyle ?? undefined,
      velocity,
      feelSettings: this.feelSettings,
    });
  }

  public jumpToStep(step: number): void {
    if (!this.progression || this.order.length <= 0) return;
    this.activeIndex = step % this.order.length;
    this.progressStep = step % this.order.length;
    this.playActiveChord();
    this.notifyTick();
  }

  public playFromBar(bar: number): void {
    if (!this.progression || this.order.length <= 0) return;
    this.activeIndex = bar % this.order.length;
    this.progressStep = bar % this.order.length;
    this.playing = true;
    this.startAutoplay();
    this.playActiveChord();
    this.notifyTick();
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

/**
 * Non-destructive quantize utility for recorded loop hits.
 */
export function quantiseHits(
  hits: Array<{ pos: number; vel: number; bar?: number; voicing?: string }>,
  quantise: 'Off' | '1/16' | '1/8' | 'Bar',
  loopBars = 4
): Array<{ pos: number; vel: number; bar?: number; voicing?: string }> {
  const grid = quantise === '1/16' ? 16 : quantise === '1/8' ? 8 : quantise === 'Bar' ? loopBars : 0;
  if (!grid) return hits;
  return hits.map(h => ({
    ...h,
    pos: Math.min(0.99, Math.round(h.pos * grid) / grid),
  }));
}

