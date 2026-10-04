import {
  playChordForGenre,
  playSubNote,
  applyVoicingToNotes,
  FeelSettings,
  playLeadNote,
  setLeadPreset,
  setLeadInstrument,
  setLeadVolume,
  setLeadMute,
  setLeadSolo,
} from './audio-service';
import { Progression, ChordBlock, AUTOPLAY_INTERVAL_MS, notesForSymbol, preferFlatSpelling } from './chord-engine';
import type { SongSection } from './song-arranger';
import { MelodyTrack, melodyEngine } from './melody-engine';

export type PlaybackTickCallback = (
  activeIndex: number,
  progressStep: number,
  sectionIndex?: number,
  totalSteps?: number,
  isSongMode?: boolean,
  /** Global 16th-step position (bar * 16 + step) while a step loop is active, else -1. */
  stepPos?: number
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
  private melodyTrack: MelodyTrack | null = null;
  /** Half-open [start, end) range in global 16th steps; null = normal per-bar playback. */
  private stepLoop: [number, number] | null = null;
  private stepPos = -1;
  private playTarget: 'chords' | 'melody' | 'song' = 'chords';
  private melodyBackingEnabled = true;
  private melodySound: string | null = 'Stage Rhodes';
  private melodyFeel: string | null = null;
  private melodyFeelSettings: FeelSettings = { swing: 0, spread: 50, density: 50, tone: 'Warm' };

  public setPlayTarget(target: 'chords' | 'melody' | 'song'): void {
    this.playTarget = target;
  }

  public getPlayTarget(): 'chords' | 'melody' | 'song' {
    return this.playTarget;
  }

  public isChordPlaying(): boolean {
    return this.playing && this.playTarget === 'chords';
  }

  public isMelodyPlaying(): boolean {
    return this.playing && this.playTarget === 'melody';
  }

  public isSongPlaying(): boolean {
    return this.playing && (this.playTarget === 'song' || this.mode === 'song');
  }

  public setMelodyBackingEnabled(enabled: boolean): void {
    this.melodyBackingEnabled = enabled;
  }

  public isMelodyBackingEnabled(): boolean {
    return this.melodyBackingEnabled;
  }

  public setMelodySound(sound: string | null): void {
    this.melodySound = sound || 'Stage Rhodes';
    if (this.melodySound) {
      setLeadInstrument(this.melodySound);
    }
  }

  public getMelodySound(): string | null {
    return this.melodySound;
  }

  public setMelodyFeel(feel: string | null): void {
    this.melodyFeel = feel;
  }

  public getMelodyFeel(): string | null {
    return this.melodyFeel;
  }

  public setMelodyFeelSettings(feel: Partial<FeelSettings>): void {
    this.melodyFeelSettings = { ...this.melodyFeelSettings, ...feel };
  }

  public getMelodyFeelSettings(): FeelSettings {
    return { ...this.melodyFeelSettings };
  }

  /**
   * Loop a range of 16th steps (melody Chord / Span loop modes).
   * Pass null to return to normal section playback.
   */
  public setStepLoop(range: [number, number] | null): void {
    const next = range && range[1] > range[0] ? [range[0], range[1]] as [number, number] : null;
    const same = next === this.stepLoop
      || (!!next && !!this.stepLoop && next[0] === this.stepLoop[0] && next[1] === this.stepLoop[1]);
    if (same) return;
    this.stepLoop = next;
    if (!next) this.stepPos = -1;
    if (this.playing && this.playTarget === 'melody') this.startAutoplay();
  }

  public getStepLoop(): [number, number] | null {
    return this.stepLoop ? [this.stepLoop[0], this.stepLoop[1]] : null;
  }

  public getStepPos(): number {
    return this.stepPos;
  }

  private isStepLooping(): boolean {
    return this.playTarget === 'melody' && !!this.progression;
  }

  private getSixteenthMs(): number {
    const safeBpm = Math.max(40, Math.min(240, this.progression?.bpm || 84));
    return 60000 / safeBpm / 4;
  }

  /** One 16th step of a step loop — mirrors MelodyGrid.dc.html tick(). */
  private stepTick(): void {
    if (!this.progression) return;
    const totalBars = this.progression.chords.length || 4;
    const [a, b] = (this.stepLoop && this.stepLoop[1] > this.stepLoop[0])
      ? this.stepLoop
      : [0, totalBars * 16];

    let pos = this.stepPos + 1;
    if (pos < a || pos >= b) pos = a;
    this.stepPos = pos;

    const sd = this.getSixteenthMs() / 1000;
    const row = Math.floor(pos / 16);
    const chordCount = this.progression.chords.length;
    if (chordCount > 0) {
      const chordIndex = row % chordCount;
      const orderIdx = this.order.indexOf(chordIndex);
      this.activeIndex = orderIdx >= 0 ? orderIdx : chordIndex;
      this.progressStep = this.activeIndex;

      // Strike the chord at each row start, or at the loop start, held to the row/loop end
      // Only if backing chords are enabled for melody playback
      if (this.melodyBackingEnabled && (pos % 16 === 0 || pos === a)) {
        const chord = this.progression.chords[chordIndex];
        if (chord) {
          let notes = Array.isArray(chord.notes) ? chord.notes : [];
          if (notes.length === 0 || !notes.every(n => typeof n === 'string' && n.trim().length > 0)) {
            notes = notesForSymbol(chord.name || 'CMAJ', preferFlatSpelling(this.progression.key || 'C', this.progression.scaleType || 'MAJOR'));
          }
          const holdSec = Math.max(0.05, (Math.min(b, (row + 1) * 16) - pos) * sd);
          this.playChordNotes(notes, holdSec, chord.voicing, undefined, chordIndex);
          if (this.subBassEnabled && notes.length > 0) playSubNote(notes[0], holdSec);
        }
      }

      // Melody note starting on this step
      if (this.melodyTrack && !this.melodyTrack.muted) {
        const stepInBar = pos % 16;
        const note = this.melodyTrack.notes.find(n => n.barIndex === row && n.stepInBar === stepInBar);
        if (note) {
          const lenSteps = Math.max(1, Math.round((note.durationBeats || 0.25) * 4));
          const vel = typeof note.velocity === 'number' ? Math.max(0.05, Math.min(1, note.velocity / 127)) : 0.85;
          playLeadNote(note.pitch, lenSteps * sd * 0.92, undefined, vel, this.melodySound || undefined);
        }
      }
    }
    this.notifyTick();
  }

  public setMelodyTrack(track: MelodyTrack | null): void {
    this.melodyTrack = track;
    if (track) {
      if (track.presetId) setLeadPreset(track.presetId);
      if (typeof track.volume === 'number') setLeadVolume(track.volume);
      setLeadMute(track.muted);
      setLeadSolo(track.solo);
    }
  }

  public getMelodyTrack(): MelodyTrack | null {
    return this.melodyTrack;
  }

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
      if (order && order.length === progression.chords.length && order.every(idx => idx < progression.chords.length)) {
        this.order = order;
      } else {
        this.order = Array.from({ length: progression.chords.length }, (_, i) => i);
      }
      if (this.order.length > 0) {
        if (this.activeIndex >= this.order.length) {
          this.activeIndex = this.activeIndex % this.order.length;
        }
        if (this.progressStep >= this.order.length) {
          this.progressStep = this.progressStep % this.order.length;
        }
      }
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
    if (this.mode === 'song' || this.playTarget === 'song') {
      this.tickCallbacks.forEach(cb => cb(this.activeIndex, this.songStep, this.activeSectionIndex, totalSteps, true));
    } else if (this.playTarget === 'melody') {
      this.tickCallbacks.forEach(cb => cb(this.activeIndex, this.progressStep, 0, totalSteps, false, this.stepPos));
    } else {
      this.tickCallbacks.forEach(cb => cb(this.activeIndex, this.progressStep, 0, totalSteps, false, -1));
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
    if (this.playTarget === 'melody') {
      this.autoplayTimer = setInterval(() => {
        if (this.playing && this.playTarget === 'melody') {
          this.stepTick();
        }
      }, this.getSixteenthMs());
      return;
    }
    const intervalMs = this.getStepIntervalMs();
    this.autoplayTimer = setInterval(() => {
      if (!this.playing) return;

      if (this.mode === 'song' || this.playTarget === 'song') {
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

  public togglePlay(target?: 'chords' | 'melody' | 'song'): boolean {
    const requested = target || (this.mode === 'song' ? 'song' : this.playTarget);
    if (this.playing) {
      if (requested === this.playTarget) {
        this.playing = false;
        this.activeIndex = 0;
        this.progressStep = 0;
        this.songStep = 0;
        this.activeSectionIndex = 0;
        this.stepPos = -1;
        this.stopAutoplay();
        this.notifyTick();
        return false;
      }
      this.stopAutoplay();
      this.playTarget = requested;
      this.activeIndex = 0;
      this.progressStep = 0;
      this.songStep = 0;
      this.activeSectionIndex = 0;
      this.stepPos = -1;
    } else {
      this.playing = true;
      this.playTarget = requested;
      this.activeIndex = 0;
      this.progressStep = 0;
      this.songStep = 0;
      this.activeSectionIndex = 0;
      this.stepPos = -1;
    }

    if (this.playTarget === 'song') {
      this.mode = 'song';
      if (this.sections.length > 0) {
        this.updateSongStepState(0);
      }
      this.startAutoplay();
      this.playActiveChord();
      this.notifyTick();
    } else if (this.playTarget === 'melody') {
      this.mode = 'single';
      const [a] = (this.stepLoop && this.stepLoop[1] > this.stepLoop[0])
        ? this.stepLoop
        : [0, (this.progression?.chords.length || 4) * 16];
      this.stepPos = a - 1;
      this.startAutoplay();
      this.stepTick();
    } else {
      // 'chords'
      this.mode = 'single';
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
        const activeFeel = (chordIndex !== undefined && this.feelSettings?.barFeel && this.feelSettings.barFeel[chordIndex])
          ? { ...this.feelSettings, ...this.feelSettings.barFeel[chordIndex] }
          : this.feelSettings;
        playChordForGenre(pitchedNotes, sec.progression.genre, {
          bpm: sec.progression.bpm,
          duration: (this.getStepIntervalMs() / 1000) * 0.85,
          instrument: this.instrument ?? undefined,
          playStyle: activeFeel?.playStyle ?? this.playStyle ?? undefined,
          feelSettings: activeFeel,
        });

        // In song mode, companion melody notes for this bar play with relative bar timing
        if (this.melodyTrack && !this.melodyTrack.muted && sec.progression) {
          const barNotes = this.melodyTrack.notes.filter(n => n.barIndex === chordIndex);
          if (barNotes.length > 0) {
            const bpm = sec.progression.bpm || 84;
            const secondsPerBeat = 60 / bpm;
            barNotes.forEach(note => {
              const relSec = (note.stepInBar / 4) * secondsPerBeat;
              const durSec = (note.durationBeats || 0.25) * secondsPerBeat;
              const vel = typeof note.velocity === 'number' ? Math.max(0.05, Math.min(1, note.velocity / 127)) : 0.85;
              setTimeout(() => {
                if (this.playing && this.mode === 'song') {
                  playLeadNote(note.pitch, durSec, undefined, vel, this.melodySound || undefined);
                }
              }, Math.round(relSec * 1000));
            });
          }
        }
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
        if (chord.voicing) {
          this.playChordNotes(notes, 1.2, chord.voicing);
        } else {
          this.playChordNotes(notes, 1.2);
        }
        if (this.subBassEnabled && notes.length > 0) {
          playSubNote(notes[0], 1.4);
        }

        // NOTE: In single chord playback mode (Chords tab), DO NOT play melody notes!
        // Chords playback is purely chords. Melody is controlled by its own independent controls.
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
    if (chord.voicing) {
      this.playChordNotes(notes, duration, chord.voicing);
    } else {
      this.playChordNotes(notes, duration);
    }
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
    
    const v = voicing || chord.voicing;
    if (v !== undefined) {
      this.playChordNotes(notes, duration, v, velocity);
    } else {
      this.playChordNotes(notes, duration);
    }
  }

  public playChordNotes(notes: string[], duration?: number, voicing?: string, velocity?: number, chordIndex?: number): void {
    if (!this.progression) return;
    
    const validNotes = Array.isArray(notes) ? notes.filter(n => typeof n === 'string' && n.trim().length > 0) : [];
    if (validNotes.length === 0) return;

    const pitchedNotes = voicing
      ? applyVoicingToNotes(validNotes, voicing)
      : pitchNotesAscending(validNotes, 4);

    const effectiveIndex = chordIndex !== undefined
      ? chordIndex
      : (this.playing ? (this.order[this.activeIndex] ?? 0) : undefined);
    const activeFeel = (effectiveIndex !== undefined && this.feelSettings?.barFeel && this.feelSettings.barFeel[effectiveIndex])
      ? { ...this.feelSettings, ...this.feelSettings.barFeel[effectiveIndex] }
      : this.feelSettings;

    playChordForGenre(pitchedNotes, this.progression.genre || 'Unknown', {
      bpm: this.progression.bpm || 120,
      duration: duration || (this.getStepIntervalMs() / 1000) * 0.85,
      instrument: this.instrument ?? undefined,
      playStyle: activeFeel?.playStyle ?? this.playStyle ?? undefined,
      velocity,
      feelSettings: activeFeel,
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
    this.stepPos = -1;
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

