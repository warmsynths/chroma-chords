import {
  ChordBlock,
  Progression,
  parseChordSymbol,
  ROOT_KEYS,
} from './chord-engine';
import { noteToMidiNumber } from './export-service';
import { midiToNoteName } from './audio-service';

export type ChordToneRole =
  | 'root'
  | '3rd'
  | '5th'
  | '7th'
  | 'tension'   // 9th, 11th, 13th
  | 'passing'   // diatonic scale degree between chord tones
  | 'chromatic' // non-scale chromatic passing or enclosure tone
  | 'drone';    // static held pedal note

export interface MelodyNote {
  id: string;
  stepInBar: number;      // 0 to 15 (16th-note step within current bar)
  barIndex: number;       // 0 to progression.chords.length - 1
  beatOffset: number;     // absolute beat position from start of progression (e.g. 0.0, 1.25)
  durationBeats: number;  // duration in quarter notes (e.g. 0.25 = 16th, 0.5 = 8th, 1.0 = quarter)
  pitch: string;          // scientific pitch notation (e.g. 'E5', 'C#4', 'G4')
  midi: number;           // MIDI pitch number (e.g. 60 = C4, 76 = E5)
  velocity: number;       // 1 to 127
  chordToneRole: ChordToneRole;
  isClash?: boolean;      // flag for harsh minor-second rub against active chord third
  tag?: string;           // optional stylistic tag (e.g. 'band-oasis-drone', 'blue-note')
}

export type GuideMode = 'strict-chord' | 'scale-key' | 'free';

export interface MelodyFeelSettings {
  humanVariance: number; // 0.0 to 1.0: microtiming jitter (push/pull in seconds)
  swing: number;         // 0 to 100%: 16th-note shuffle delay
  velocityDrift: number; // 0.0 to 1.0: human touch dynamic variation & downbeat accents
  gateRatio: number;     // 0.2 to 1.5: articulation duration multiplier (staccato to legato)
  glide: number;         // 0.0 to 0.15s: portamento pitch glide between adjacent notes
}

export const GENRE_MELODY_FEEL: Record<string, MelodyFeelSettings> = {
  Pop: {
    humanVariance: 0.15,
    swing: 0,
    velocityDrift: 0.25,
    gateRatio: 0.85,
    glide: 0.0,
  },
  Rock: {
    humanVariance: 0.35,
    swing: 10,
    velocityDrift: 0.45,
    gateRatio: 0.9,
    glide: 0.02,
  },
  'Lo-Fi': {
    humanVariance: 0.65,
    swing: 45,
    velocityDrift: 0.4,
    gateRatio: 0.75,
    glide: 0.04,
  },
  'Neo-Soul': {
    humanVariance: 0.5,
    swing: 55,
    velocityDrift: 0.35,
    gateRatio: 0.95,
    glide: 0.03,
  },
  EDM: {
    humanVariance: 0.05,
    swing: 0,
    velocityDrift: 0.1,
    gateRatio: 0.7,
    glide: 0.05,
  },
  Ambient: {
    humanVariance: 0.3,
    swing: 0,
    velocityDrift: 0.2,
    gateRatio: 1.3,
    glide: 0.08,
  },
};

export function getMelodyFeelForGenre(genre: string): MelodyFeelSettings {
  const norm = Object.keys(GENRE_MELODY_FEEL).find(k => k.toLowerCase() === genre.toLowerCase());
  return GENRE_MELODY_FEEL[norm || 'Pop'] || GENRE_MELODY_FEEL.Pop;
}

export type ContourArchetype =
  | 'Arch'              // Rises to peak around bar 3, then descends to resolve
  | 'AscendingClimax'   // Starts low, climbs across bars to high climax
  | 'DescendingSigh'    // Starts high and emotional, gently steps down
  | 'CallAndResponse'   // 2-bar question (ends unstable), 2-bar answer (resolves)
  | 'OstinatoRiff'      // Punchy 1-2 bar repeating rhythmic motif with harmonic shifts
  | 'AnthemHook';       // High-register soaring hook with syncopated anticipations

export interface MelodyTrack {
  id: string;
  progressionId?: string;
  notes: MelodyNote[];
  contour: ContourArchetype;
  density: number;          // 0 to 100 (sparse ambient to busy arp/riff)
  octave: number;           // 3, 4, or 5 (default 4/5 for lead)
  guideMode: GuideMode;
  feelSettings: MelodyFeelSettings;
  presetId: string;         // e.g. 'lead-synth', 'warm-pluck', 'lofi-sine', 'electric-lead'
  volume: number;           // 0 to 100
  muted: boolean;
  solo: boolean;
  bandId?: string;          // optional active Band DNA signature
}

export interface NoteAnalysis {
  pitch: string;
  role: ChordToneRole;
  intervalFromRoot: string; // e.g. 'P1', 'm3', 'M3', 'P5', 'm7', 'M7', 'M9'
  chordName: string;
  isClash: boolean;
  clashReason?: string;
  suggestion?: string;
}

export interface HarmonicChordMatrix {
  chordName: string;
  rootPc: number;
  thirdPc?: number;
  fifthPc?: number;
  seventhPc?: number;
  chordTonePcs: number[];
  tensionPcs: number[];
  avoidPcs: number[];
  scalePcs: number[];
}

export interface ScheduledMelodyEvent {
  note: string;
  midi: number;
  time: number;       // in seconds from start
  duration: number;   // in seconds
  velocity: number;   // 0.0 to 1.0 normalized
}

export interface MelodyGenerateOptions {
  contour?: ContourArchetype;
  density?: number;
  octave?: number;
  guideMode?: GuideMode;
  feelSettings?: Partial<MelodyFeelSettings>;
  presetId?: string;
  bandId?: string;
  seed?: number;
}

/* ==========================================================================
   Scale Pitch Class Intervals (Relative to Scale Tonic)
   ========================================================================== */
export const SCALE_INTERVALS: Record<string, number[]> = {
  MAJOR: [0, 2, 4, 5, 7, 9, 11],
  MINOR: [0, 2, 3, 5, 7, 8, 10],
  NATURAL_MINOR: [0, 2, 3, 5, 7, 8, 10],
  DORIAN: [0, 2, 3, 5, 7, 9, 10],
  MIXOLYDIAN: [0, 2, 4, 5, 7, 9, 10],
  LYDIAN: [0, 2, 4, 6, 7, 9, 11],
  PHRYGIAN: [0, 1, 3, 5, 7, 8, 10],
  LOCRIAN: [0, 1, 3, 5, 6, 8, 10],
  HARMONIC_MINOR: [0, 2, 3, 5, 7, 8, 11],
  MELODIC_MINOR: [0, 2, 3, 5, 7, 9, 11],
  MAJOR_PENTATONIC: [0, 2, 4, 7, 9],
  MINOR_PENTATONIC: [0, 3, 5, 7, 10],
  BLUES: [0, 3, 5, 6, 7, 10],
};

const INTERVAL_NAMES: Record<number, string> = {
  0: 'P1',
  1: 'm2',
  2: 'M2',
  3: 'm3',
  4: 'M3',
  5: 'P4',
  6: 'd5/#11',
  7: 'P5',
  8: 'm6',
  9: 'M6',
  10: 'm7',
  11: 'M7',
};

export function getScalePitchClasses(root: string, scaleType: string): number[] {
  const rootPc = (noteToMidiNumber(`${root}4`) % 12);
  const normalizedType = scaleType.toUpperCase().replace(/\s+/g, '_');
  const intervals = SCALE_INTERVALS[normalizedType] || SCALE_INTERVALS.MAJOR;
  return intervals.map(iv => (rootPc + iv) % 12);
}

/* ==========================================================================
   Harmonic Chord-Scale Matrix
   ========================================================================== */
export function getHarmonicChordMatrix(
  chord: ChordBlock,
  key = 'C',
  scaleType = 'MAJOR'
): HarmonicChordMatrix {
  const { root, quality } = parseChordSymbol(chord.name);
  const rootPc = noteToMidiNumber(`${root}4`) % 12;

  let thirdInterval: number | undefined;
  let fifthInterval: number | undefined = 7;
  let seventhInterval: number | undefined;
  let tensionIntervals: number[] = [2]; // Major 9th by default
  let avoidIntervals: number[] = [];

  switch (quality) {
    case 'maj':
    case 'maj7':
    case 'maj9':
    case 'maj6':
      thirdInterval = 4;
      fifthInterval = 7;
      if (quality === 'maj7' || quality === 'maj9') seventhInterval = 11;
      if (quality === 'maj6') seventhInterval = 9;
      tensionIntervals = [2, 6, 9]; // 9, #11, 13
      avoidIntervals = [5]; // Natural 11 clashes with Major 3rd (minor 9th)
      break;

    case 'min':
    case 'min7':
    case 'min9':
    case 'min6':
    case 'mmaj7':
      thirdInterval = 3;
      fifthInterval = 7;
      if (quality === 'min7' || quality === 'min9') seventhInterval = 10;
      if (quality === 'min6') seventhInterval = 9;
      if (quality === 'mmaj7') seventhInterval = 11;
      tensionIntervals = [2, 5, 9]; // 9, 11, 13
      avoidIntervals = [8]; // b6 unless modal
      break;

    case 'dom7':
    case 'dom9':
      thirdInterval = 4;
      fifthInterval = 7;
      seventhInterval = 10;
      tensionIntervals = [2, 6, 9, 1, 3]; // 9, #11, 13, b9, #9
      avoidIntervals = [11]; // Major 7th clashes with b7
      break;

    case 'dim':
    case 'dim7':
      thirdInterval = 3;
      fifthInterval = 6;
      if (quality === 'dim7') seventhInterval = 9;
      tensionIntervals = [2, 5, 8]; // 9, 11, b13
      avoidIntervals = [7]; // Natural 5 clashes with dim 5th
      break;

    case 'aug':
      thirdInterval = 4;
      fifthInterval = 8;
      tensionIntervals = [2, 6];
      avoidIntervals = [7];
      break;

    case 'sus4':
    case 'sus7':
    case 'sus9':
      thirdInterval = 5; // 4th acts as third
      fifthInterval = 7;
      if (quality === 'sus7' || quality === 'sus9') seventhInterval = 10;
      tensionIntervals = [10, 2];
      avoidIntervals = [4]; // Major 3rd negates suspension
      break;

    case 'sus2':
      thirdInterval = 2; // 2nd acts as third
      fifthInterval = 7;
      tensionIntervals = [10, 5];
      avoidIntervals = [4];
      break;

    default:
      thirdInterval = 4;
      fifthInterval = 7;
      break;
  }

  const chordToneIntervals = [
    0,
    ...(thirdInterval !== undefined ? [thirdInterval] : []),
    ...(fifthInterval !== undefined ? [fifthInterval] : []),
    ...(seventhInterval !== undefined ? [seventhInterval] : []),
  ];

  const chordTonePcs = chordToneIntervals.map(iv => (rootPc + iv) % 12);
  const tensionPcs = tensionIntervals.map(iv => (rootPc + iv) % 12);
  const avoidPcs = avoidIntervals.map(iv => (rootPc + iv) % 12);
  const scalePcs = getScalePitchClasses(key, scaleType);

  return {
    chordName: chord.name,
    rootPc,
    thirdPc: thirdInterval !== undefined ? (rootPc + thirdInterval) % 12 : undefined,
    fifthPc: fifthInterval !== undefined ? (rootPc + fifthInterval) % 12 : undefined,
    seventhPc: seventhInterval !== undefined ? (rootPc + seventhInterval) % 12 : undefined,
    chordTonePcs,
    tensionPcs,
    avoidPcs,
    scalePcs,
  };
}

/* ==========================================================================
   Pitch Classification & Clash Analysis
   ========================================================================== */
export function classifyPitch(
  midiOrPitch: number | string,
  chord: ChordBlock,
  key = 'C',
  scaleType = 'MAJOR'
): {
  role: ChordToneRole;
  intervalFromRoot: string;
  isClash: boolean;
  clashReason?: string;
  suggestion?: string;
} {
  const midi = typeof midiOrPitch === 'number' ? midiOrPitch : noteToMidiNumber(midiOrPitch);
  const pitchPc = midi % 12;
  const matrix = getHarmonicChordMatrix(chord, key, scaleType);
  const semitonesFromRoot = (pitchPc - matrix.rootPc + 12) % 12;
  const intervalName = INTERVAL_NAMES[semitonesFromRoot] || `+${semitonesFromRoot}`;

  let role: ChordToneRole = 'chromatic';
  let isClash = false;
  let clashReason: string | undefined;
  let suggestion: string | undefined;

  if (pitchPc === matrix.rootPc) {
    role = 'root';
  } else if (pitchPc === matrix.thirdPc) {
    role = '3rd';
  } else if (pitchPc === matrix.fifthPc) {
    role = '5th';
  } else if (pitchPc === matrix.seventhPc) {
    role = '7th';
  } else if (matrix.tensionPcs.includes(pitchPc)) {
    role = 'tension';
  } else if (matrix.scalePcs.includes(pitchPc)) {
    role = 'passing';
  } else {
    role = 'chromatic';
  }

  // Check clashes against avoid intervals
  if (matrix.avoidPcs.includes(pitchPc)) {
    isClash = true;
    const { quality } = parseChordSymbol(chord.name);
    if ((quality.startsWith('maj') || quality === 'dom7' || quality === 'dom9') && semitonesFromRoot === 5) {
      clashReason = 'Natural 4th clashes with Major 3rd (minor 9th/2nd rub)';
      const safeMidi = midi - 1; // resolve down to 3rd
      suggestion = midiToNoteName(safeMidi);
    } else if ((quality === 'dom7' || quality === 'dom9') && semitonesFromRoot === 11) {
      clashReason = 'Major 7th clashes with Dominant ♭7';
      const safeMidi = midi - 1; // resolve down to b7
      suggestion = midiToNoteName(safeMidi);
    } else if ((quality === 'sus4' || quality === 'sus2') && semitonesFromRoot === 4) {
      clashReason = 'Major 3rd negates suspended chord feel';
      const safeMidi = midi + 1; // resolve to 4th
      suggestion = midiToNoteName(safeMidi);
    } else if (quality.startsWith('dim') && semitonesFromRoot === 7) {
      clashReason = 'Natural 5th clashes with Diminished 5th';
      const safeMidi = midi - 1; // resolve to b5
      suggestion = midiToNoteName(safeMidi);
    } else {
      clashReason = `Harsh dissonance against ${chord.name}`;
      const safeMidi = midi - 1;
      suggestion = midiToNoteName(safeMidi);
    }
  }

  return {
    role,
    intervalFromRoot: intervalName,
    isClash,
    clashReason,
    suggestion,
  };
}

/* ==========================================================================
   Guidance Snapping
   ========================================================================== */
export function snapNoteToGuide(
  pitch: string,
  timeBeats: number,
  mode: GuideMode,
  progression: Progression
): string {
  if (mode === 'free' || !progression?.chords?.length) {
    return pitch;
  }

  const targetMidi = noteToMidiNumber(pitch);
  const barsCount = progression.chords.length;
  const barIndex = Math.max(0, Math.min(barsCount - 1, Math.floor(timeBeats / 4) % barsCount));
  const activeChord = progression.chords[barIndex];
  const matrix = getHarmonicChordMatrix(activeChord, progression.key, progression.scaleType);

  let allowedPcs: number[] = [];

  if (mode === 'strict-chord') {
    // Only chord tones and safe extensions
    allowedPcs = [...new Set([...matrix.chordTonePcs, ...matrix.tensionPcs])];
  } else if (mode === 'scale-key') {
    // Diatonic / modal scale pitch classes
    allowedPcs = matrix.scalePcs;
  }

  if (allowedPcs.length === 0) return pitch;

  // Find closest MIDI note whose pitch class is in allowedPcs
  let bestMidi = targetMidi;
  let minDiff = Infinity;

  // Search within +/- 12 semitones
  for (let offset = -12; offset <= 12; offset++) {
    const candidateMidi = targetMidi + offset;
    const pc = (candidateMidi % 12 + 12) % 12;
    if (allowedPcs.includes(pc)) {
      const diff = Math.abs(offset);
      if (diff < minDiff) {
        minDiff = diff;
        bestMidi = candidateMidi;
        if (diff === 0) break;
      }
    }
  }

  return midiToNoteName(bestMidi);
}

/* ==========================================================================
   Adaptive Chord-Change Aligner
   ========================================================================== */
export function alignMelodyToChords(
  melody: MelodyTrack,
  newProgression: Progression
): MelodyTrack {
  if (!newProgression?.chords?.length || !melody?.notes?.length) {
    return melody;
  }

  const alignedNotes: MelodyNote[] = melody.notes.map(note => {
    const barIndex = Math.min(note.barIndex, newProgression.chords.length - 1);
    const newChord = newProgression.chords[barIndex];
    const newMatrix = getHarmonicChordMatrix(newChord, newProgression.key, newProgression.scaleType);

    let targetPc: number = note.midi % 12;

    if (note.chordToneRole === 'root') {
      targetPc = newMatrix.rootPc;
    } else if (note.chordToneRole === '3rd') {
      targetPc = newMatrix.thirdPc ?? newMatrix.rootPc;
    } else if (note.chordToneRole === '5th') {
      targetPc = newMatrix.fifthPc ?? newMatrix.rootPc;
    } else if (note.chordToneRole === '7th') {
      targetPc = newMatrix.seventhPc ?? (newMatrix.fifthPc ?? newMatrix.rootPc);
    } else if (note.chordToneRole === 'tension') {
      targetPc = newMatrix.tensionPcs[0] ?? newMatrix.rootPc;
    } else {
      // Passing or chromatic: preserve original pitch unless it causes clash
      const classification = classifyPitch(note.midi, newChord, newProgression.key, newProgression.scaleType);
      if (classification.isClash && classification.suggestion) {
        targetPc = noteToMidiNumber(classification.suggestion) % 12;
      } else {
        targetPc = note.midi % 12;
      }
    }

    // Shift to nearest octave of original note's midi
    let bestMidi = note.midi;
    let minDiff = Infinity;
    for (let delta = -12; delta <= 12; delta++) {
      const cand = note.midi + delta;
      if (((cand % 12 + 12) % 12) === targetPc) {
        if (Math.abs(delta) < minDiff) {
          minDiff = Math.abs(delta);
          bestMidi = cand;
        }
      }
    }

    const newPitch = midiToNoteName(bestMidi);
    const classification = classifyPitch(bestMidi, newChord, newProgression.key, newProgression.scaleType);

    return {
      ...note,
      pitch: newPitch,
      midi: bestMidi,
      chordToneRole: classification.role,
      isClash: classification.isClash,
    };
  });

  return {
    ...melody,
    progressionId: newProgression.key + '_' + newProgression.scaleType,
    notes: alignedNotes,
  };
}

/* ==========================================================================
   Melody Engine Main Service Class
   ========================================================================== */
/* ==========================================================================
   Rhythmic Cells & Contour Trajectory Helpers
   ========================================================================== */

export interface RhythmicCell {
  step: number;     // 0 to 15 (16th-note step within current bar)
  duration: number; // duration in quarter note beats (e.g. 0.25, 0.5, 1.0, etc.)
  accent?: boolean;
}

export function getRhythmicCellsForBar(
  density: number,
  barIndex: number,
  totalBars: number,
  contour: ContourArchetype,
  seed: number = 0
): RhythmicCell[] {
  // Density 0-25: Sparse / Ambient (1-2 notes per bar)
  if (density < 25) {
    const sparsePatterns: RhythmicCell[][] = [
      [{ step: 0, duration: 3.0, accent: true }],
      [{ step: 4, duration: 2.5, accent: true }],
      [
        { step: 0, duration: 2.0, accent: true },
        { step: 8, duration: 1.5 },
      ],
      [
        { step: 2, duration: 2.0, accent: true },
        { step: 10, duration: 1.5 },
      ],
    ];

    if (seed === 0) {
      if (barIndex % 2 === 0) return sparsePatterns[0];
      return sparsePatterns[2];
    }
    const offset = Math.abs(seed) % sparsePatterns.length;
    return sparsePatterns[(barIndex + offset) % sparsePatterns.length];
  }

  // Density 26-60: Topline Vocal Hook (3-5 notes per bar)
  if (density <= 60) {
    const patterns: RhythmicCell[][] = [
      // Pattern 0: Classic 4-note syncopated vocal hook
      [
        { step: 0, duration: 1.0, accent: true },
        { step: 4, duration: 0.5 },
        { step: 6, duration: 1.0 },
        { step: 10, duration: 1.0 },
      ],
      // Pattern 1: Dotted push rhythm
      [
        { step: 0, duration: 0.75, accent: true },
        { step: 3, duration: 0.75 },
        { step: 6, duration: 1.0 },
        { step: 10, duration: 1.0 },
      ],
      // Pattern 2: Breath rest on beat 1, punch on beat 2
      [
        { step: 4, duration: 1.0, accent: true },
        { step: 8, duration: 0.75 },
        { step: 11, duration: 0.75 },
      ],
      // Pattern 3: Final bar resolving cadence
      [
        { step: 0, duration: 1.5, accent: true },
        { step: 6, duration: 0.5 },
        { step: 8, duration: 2.0 },
      ],
      // Pattern 4: Syncopated late groove
      [
        { step: 2, duration: 1.0, accent: true },
        { step: 6, duration: 0.5 },
        { step: 8, duration: 1.0 },
        { step: 12, duration: 1.0 },
      ],
      // Pattern 5: Spacious phrasing
      [
        { step: 0, duration: 1.5, accent: true },
        { step: 6, duration: 1.0 },
        { step: 10, duration: 1.5 },
      ],
      // Pattern 6: Double tap drive
      [
        { step: 0, duration: 0.5, accent: true },
        { step: 2, duration: 0.5 },
        { step: 6, duration: 1.0 },
        { step: 10, duration: 1.0 },
      ],
    ];

    if (barIndex === totalBars - 1) return patterns[3];
    if (seed === 0) {
      return patterns[barIndex % 3];
    }
    const offset = Math.abs(seed) % (patterns.length - 1);
    return patterns[(barIndex + offset) % (patterns.length - 1)];
  }

  // Density 61-100: Driving Riff / Arpeggio (6-12 notes per bar)
  const isHeavy = density > 80;
  if (isHeavy) {
    return [0, 2, 4, 6, 8, 10, 12, 14].map((step, i) => ({
      step,
      duration: 0.5,
      accent: i === 0 || i === 4,
    }));
  } else {
    if (seed && seed % 2 === 1) {
      return [
        { step: 0, duration: 0.5, accent: true },
        { step: 3, duration: 0.5 },
        { step: 6, duration: 0.5, accent: true },
        { step: 8, duration: 0.5 },
        { step: 10, duration: 0.75 },
        { step: 13, duration: 0.75 },
      ];
    }
    return [
      { step: 0, duration: 0.5, accent: true },
      { step: 2, duration: 0.5 },
      { step: 4, duration: 0.75, accent: true },
      { step: 7, duration: 0.5 },
      { step: 9, duration: 0.75 },
      { step: 12, duration: 1.0 },
    ];
  }
}

export function getContourBias(
  contour: ContourArchetype,
  barIndex: number,
  stepInBar: number,
  totalBars: number
): number {
  const norm = (barIndex * 16 + stepInBar) / (totalBars * 16);

  switch (contour) {
    case 'Arch':
      return Math.round(Math.sin(norm * Math.PI) * 9);

    case 'AscendingClimax':
      return Math.round(-4 + norm * 16);

    case 'DescendingSigh':
      return Math.round(12 - norm * 14);

    case 'CallAndResponse': {
      const isQuestion = barIndex < Math.ceil(totalBars / 2);
      if (isQuestion) {
        const qNorm = (barIndex * 16 + stepInBar) / (Math.ceil(totalBars / 2) * 16);
        return Math.round(qNorm * 7);
      } else {
        const aNorm = ((barIndex - Math.ceil(totalBars / 2)) * 16 + stepInBar) / (Math.floor(totalBars / 2) * 16);
        return Math.round(5 * (1 - aNorm));
      }
    }

    case 'OstinatoRiff': {
      const stepNorm = stepInBar / 16;
      return Math.round(Math.sin(stepNorm * Math.PI * 2) * 5);
    }

    case 'AnthemHook': {
      return Math.round(8 + Math.sin(norm * Math.PI * 3) * 3);
    }

    default:
      return 0;
  }
}

/* ==========================================================================
   Melody Engine Main Service Class
   ========================================================================== */
export class MelodyEngine {
  /**
   * Creates an empty melody track with 0 notes.
   */
  createEmptyTrack(progression?: Progression | null, options: Partial<MelodyTrack> = {}): MelodyTrack {
    const genre = progression?.genre || 'Pop';
    return {
      id: `melody-track-${Date.now()}`,
      progressionId: progression ? `${progression.key}_${progression.scaleType}` : undefined,
      notes: [],
      contour: 'Arch',
      density: 50,
      octave: 4,
      guideMode: 'strict-chord',
      feelSettings: this.getMelodyFeelForGenre(genre),
      presetId: 'lead-synth',
      volume: 80,
      muted: false,
      solo: false,
      ...options,
    };
  }

  /**
   * Generates a coherent melodic track for the given progression.
   */
  generateMelody(progression: Progression, options: MelodyGenerateOptions = {}): MelodyTrack {
    const contour = options.contour || 'Arch';
    const density = options.density ?? 50;
    const octave = options.octave ?? 4;
    const guideMode = options.guideMode || 'strict-chord';
    const feelSettings: MelodyFeelSettings = {
      humanVariance: options.feelSettings?.humanVariance ?? 0.25,
      swing: options.feelSettings?.swing ?? 0,
      velocityDrift: options.feelSettings?.velocityDrift ?? 0.3,
      gateRatio: options.feelSettings?.gateRatio ?? 0.9,
      glide: options.feelSettings?.glide ?? 0.0,
    };
    const presetId = options.presetId || 'lead-synth';
    const bandId = options.bandId;
    const seed = options.seed ?? 0;

    const notes: MelodyNote[] = [];
    const chords = progression.chords || [];
    const totalBars = Math.max(1, chords.length);

    let previousMidi: number | null = null;
    let previousJump = 0; // tracks distance of last jump for leap recovery

    chords.forEach((chord, barIndex) => {
      const matrix = getHarmonicChordMatrix(chord, progression.key, progression.scaleType);
      const cells = getRhythmicCellsForBar(density, barIndex, totalBars, contour, seed);

      cells.forEach((cell, cellIdx) => {
        const stepInBar = cell.step;
        const beatOffset = barIndex * 4 + (stepInBar / 4);
        const durationBeats = cell.duration;

        // Base contour pitch bias in semitones
        const contourBias = getContourBias(contour, barIndex, stepInBar, totalBars);
        const targetMidiCenter = 12 * (octave + 1) + matrix.rootPc + contourBias;

        // Candidate pitch selection: chord tones, tensions, or scale steps
        let chosenMidi: number;
        let chosenRole: ChordToneRole = 'root';

        // Collect available valid pitch classes for this step
        const availablePcs = [...matrix.chordTonePcs];
        if (matrix.tensionPcs.length > 0 && (cellIdx % 2 === 1 || density > 40)) {
          availablePcs.push(...matrix.tensionPcs);
        }

        // Generate candidate pitches across 3 octaves around targetMidiCenter
        const candidates: Array<{ midi: number; pc: number; role: ChordToneRole }> = [];
        for (let oct = octave - 1; oct <= octave + 2; oct++) {
          availablePcs.forEach(pc => {
            const m = 12 * (oct + 1) + pc;
            let role: ChordToneRole = 'root';
            if (pc === matrix.rootPc) role = 'root';
            else if (pc === matrix.thirdPc) role = '3rd';
            else if (pc === matrix.fifthPc) role = '5th';
            else if (pc === matrix.seventhPc) role = '7th';
            else if (matrix.tensionPcs.includes(pc)) role = 'tension';

            candidates.push({ midi: m, pc, role });
          });
        }

        if (previousMidi === null) {
          // First note: choose pitch closest to targetMidiCenter preferring root or 3rd
          candidates.sort((a, b) => {
            const aDist = Math.abs(a.midi - targetMidiCenter);
            const bDist = Math.abs(b.midi - targetMidiCenter);
            const aPref = (a.role === 'root' || a.role === '3rd') ? -4 : 0;
            const bPref = (b.role === 'root' || b.role === '3rd') ? -4 : 0;
            return (aDist + aPref) - (bDist + bPref);
          });
          const pickIdx = seed ? Math.abs(seed + barIndex) % Math.min(3, candidates.length) : 0;
          chosenMidi = candidates[pickIdx].midi;
          chosenRole = candidates[pickIdx].role;
          previousJump = 0;
        } else {
          // Leap recovery rule:
          // If previous note jumped by > 5 semitones, next note should reverse direction by step (1-3 semitones)
          const mustRecoverDown = previousJump > 5;
          const mustRecoverUp = previousJump < -5;

          candidates.sort((a, b) => {
            const aDelta = a.midi - previousMidi!;
            const bDelta = b.midi - previousMidi!;
            let aScore = Math.abs(a.midi - targetMidiCenter);
            let bScore = Math.abs(b.midi - targetMidiCenter);

            if (mustRecoverDown) {
              if (aDelta < 0 && Math.abs(aDelta) <= 4) aScore -= 20; // reward downward step
              if (bDelta < 0 && Math.abs(bDelta) <= 4) bScore -= 20;
            } else if (mustRecoverUp) {
              if (aDelta > 0 && Math.abs(aDelta) <= 4) aScore -= 20; // reward upward step
              if (bDelta > 0 && Math.abs(bDelta) <= 4) bScore -= 20;
            } else {
              // Prefer stepwise motion (1-2 semitones) or small thirds (3-4 semitones)
              if (Math.abs(aDelta) >= 1 && Math.abs(aDelta) <= 4) aScore -= 12;
              if (Math.abs(bDelta) >= 1 && Math.abs(bDelta) <= 4) bScore -= 12;
            }

            return aScore - bScore;
          });

          const poolSize = Math.min(2, candidates.length);
          const pickIdx = seed && poolSize > 1 ? ((seed * 31 + barIndex * 17 + stepInBar * 7) % 7 < 3 ? 1 : 0) : 0;
          chosenMidi = candidates[pickIdx].midi;
          chosenRole = candidates[pickIdx].role;
          previousJump = chosenMidi - previousMidi;
        }

        previousMidi = chosenMidi;

        const pitch = midiToNoteName(chosenMidi);
        const classification = classifyPitch(chosenMidi, chord, progression.key, progression.scaleType);

        notes.push({
          id: `m-note-${barIndex}-${stepInBar}-${cellIdx}`,
          barIndex,
          stepInBar,
          beatOffset,
          durationBeats,
          pitch,
          midi: chosenMidi,
          velocity: cell.accent ? 110 : 92,
          chordToneRole: chosenRole,
          isClash: classification.isClash,
        });
      });
    });

    let resultTrack: MelodyTrack = {
      id: `melody-track-${Date.now()}`,
      progressionId: `${progression.key}_${progression.scaleType}`,
      notes,
      contour,
      density,
      octave,
      guideMode,
      feelSettings,
      presetId,
      volume: 85,
      muted: false,
      solo: false,
      bandId,
    };

    if (bandId) {
      resultTrack = this.spiceWithBandTrick(resultTrack, bandId, 0, progression);
    }

    return resultTrack;
  }

  regenerateBar(melody: MelodyTrack, barIndex: number, progression: Progression): MelodyTrack {
    if (!progression.chords[barIndex]) return melody;
    const singleBarProgression: Progression = {
      ...progression,
      chords: [progression.chords[barIndex]],
    };
    const newBar = this.generateMelody(singleBarProgression, {
      contour: melody.contour,
      density: melody.density,
      octave: melody.octave,
      guideMode: melody.guideMode,
      feelSettings: melody.feelSettings,
      presetId: melody.presetId,
      bandId: melody.bandId,
    });

    const otherNotes = melody.notes.filter(n => n.barIndex !== barIndex);
    const updatedBarNotes = newBar.notes.map(n => ({
      ...n,
      barIndex,
      beatOffset: barIndex * 4 + (n.stepInBar / 4),
      id: `m-note-${barIndex}-${n.stepInBar}`,
    }));

    return {
      ...melody,
      notes: [...otherNotes, ...updatedBarNotes].sort((a, b) => a.beatOffset - b.beatOffset),
    };
  }

  mutateMelody(melody: MelodyTrack, intensity: number, progression: Progression): MelodyTrack {
    const mutatedNotes = melody.notes.map(note => {
      if (Math.random() > intensity) return note;
      const barChord = progression.chords[note.barIndex] || progression.chords[0];
      const matrix = getHarmonicChordMatrix(barChord, progression.key, progression.scaleType);
      const options = [...matrix.chordTonePcs, ...matrix.tensionPcs];
      const randomPc = options[Math.floor(Math.random() * options.length)];
      const currentOctave = Math.floor(note.midi / 12) - 1;
      const newMidi = (currentOctave + 1) * 12 + randomPc;
      const newPitch = midiToNoteName(newMidi);
      const classification = classifyPitch(newMidi, barChord, progression.key, progression.scaleType);

      return {
        ...note,
        midi: newMidi,
        pitch: newPitch,
        chordToneRole: classification.role,
        isClash: classification.isClash,
      };
    });

    return {
      ...melody,
      notes: mutatedNotes,
    };
  }

  invertMelody(melody: MelodyTrack, progression?: Progression): MelodyTrack {
    if (melody.notes.length === 0) return melody;
    const avgMidi = Math.round(melody.notes.reduce((sum, n) => sum + n.midi, 0) / melody.notes.length);
    const invertedNotes = melody.notes.map(n => {
      const diff = n.midi - avgMidi;
      const invMidi = Math.max(24, Math.min(108, avgMidi - diff));
      const pitch = midiToNoteName(invMidi);
      return {
        ...n,
        midi: invMidi,
        pitch,
      };
    });

    if (progression) {
      return alignMelodyToChords({ ...melody, notes: invertedNotes }, progression);
    }
    return { ...melody, notes: invertedNotes };
  }

  spiceWithBandTrick(melody: MelodyTrack, bandId: string, barIndex: number, progression: Progression): MelodyTrack {
    const activeChord = progression.chords[barIndex] || progression.chords[0];
    const bId = bandId.toLowerCase().replace(/[^a-z]/g, '');

    if (bId.includes('oasis')) {
      // Oasis Trick: Drone anchor pedal note (G4 or D5) held over chords
      const dronePitch = 'G4';
      const droneMidi = noteToMidiNumber(dronePitch);
      const droneNotes: MelodyNote[] = [
        {
          id: `oasis-drone-${barIndex}-0`,
          barIndex,
          stepInBar: 0,
          beatOffset: barIndex * 4,
          durationBeats: 4.0,
          pitch: dronePitch,
          midi: droneMidi,
          velocity: 105,
          chordToneRole: 'drone',
          tag: 'band-oasis-drone',
        },
      ];
      return {
        ...melody,
        notes: [...melody.notes.filter(n => n.barIndex !== barIndex), ...droneNotes].sort((a, b) => a.beatOffset - b.beatOffset),
        bandId,
      };
    }

    if (bId.includes('beatles')) {
      // Beatles Trick: Bittersweet 4-note descending chromatic line
      const baseNote = noteToMidiNumber('C5');
      const beatlesNotes: MelodyNote[] = [0, 1, 2, 3].map(i => {
        const m = baseNote - i;
        return {
          id: `beatles-chromatic-${barIndex}-${i * 4}`,
          barIndex,
          stepInBar: i * 4,
          beatOffset: barIndex * 4 + i,
          durationBeats: 1.0,
          pitch: midiToNoteName(m),
          midi: m,
          velocity: 96,
          chordToneRole: i === 0 ? 'root' : 'chromatic',
          tag: 'band-beatles-chromatic',
        };
      });
      return {
        ...melody,
        notes: [...melody.notes.filter(n => n.barIndex !== barIndex), ...beatlesNotes].sort((a, b) => a.beatOffset - b.beatOffset),
        bandId,
      };
    }

    if (bId.includes('radiohead')) {
      // Radiohead Trick: Falsetto 7th/octave leap landing on 9th, then eerie semitone oscillation
      const rootMidi = noteToMidiNumber(`${progression.key || 'C'}4`);
      const highLeap = rootMidi + 14; // high 9th
      const radioheadNotes: MelodyNote[] = [
        {
          id: `radiohead-leap-${barIndex}-0`,
          barIndex,
          stepInBar: 0,
          beatOffset: barIndex * 4,
          durationBeats: 2.0,
          pitch: midiToNoteName(highLeap),
          midi: highLeap,
          velocity: 110,
          chordToneRole: 'tension',
          tag: 'band-radiohead-falsetto',
        },
        {
          id: `radiohead-trill-${barIndex}-8`,
          barIndex,
          stepInBar: 8,
          beatOffset: barIndex * 4 + 2,
          durationBeats: 1.0,
          pitch: midiToNoteName(highLeap + 1),
          midi: highLeap + 1,
          velocity: 90,
          chordToneRole: 'tension',
          tag: 'band-radiohead-trill',
        },
        {
          id: `radiohead-trill2-${barIndex}-12`,
          barIndex,
          stepInBar: 12,
          beatOffset: barIndex * 4 + 3,
          durationBeats: 1.0,
          pitch: midiToNoteName(highLeap),
          midi: highLeap,
          velocity: 85,
          chordToneRole: 'tension',
          tag: 'band-radiohead-trill',
        },
      ];
      return {
        ...melody,
        notes: [...melody.notes.filter(n => n.barIndex !== barIndex), ...radioheadNotes].sort((a, b) => a.beatOffset - b.beatOffset),
        bandId,
      };
    }

    if (bId.includes('nirvana')) {
      // Nirvana Trick: 3-note minor pentatonic grunge riff with semitone slide
      const rootMidi = noteToMidiNumber(`${progression.key || 'C'}4`);
      const nirvanaNotes: MelodyNote[] = [
        {
          id: `nirvana-root-${barIndex}-0`,
          barIndex,
          stepInBar: 0,
          beatOffset: barIndex * 4,
          durationBeats: 1.0,
          pitch: midiToNoteName(rootMidi),
          midi: rootMidi,
          velocity: 115,
          chordToneRole: 'root',
          tag: 'band-nirvana-grunge',
        },
        {
          id: `nirvana-slide-${barIndex}-4`,
          barIndex,
          stepInBar: 4,
          beatOffset: barIndex * 4 + 1,
          durationBeats: 0.5,
          pitch: midiToNoteName(rootMidi + 2),
          midi: rootMidi + 2,
          velocity: 100,
          chordToneRole: 'passing',
          tag: 'band-nirvana-slide',
        },
        {
          id: `nirvana-min3-${barIndex}-6`,
          barIndex,
          stepInBar: 6,
          beatOffset: barIndex * 4 + 1.5,
          durationBeats: 1.5,
          pitch: midiToNoteName(rootMidi + 3),
          midi: rootMidi + 3,
          velocity: 110,
          chordToneRole: '3rd',
          tag: 'band-nirvana-grunge',
        },
      ];
      return {
        ...melody,
        notes: [...melody.notes.filter(n => n.barIndex !== barIndex), ...nirvanaNotes].sort((a, b) => a.beatOffset - b.beatOffset),
        bandId,
      };
    }

    if (bId.includes('steely') || bId.includes('dan')) {
      // Steely Dan: Syncopated jazz phrasing with chromatic enclosure into the 9th
      const rootMidi = noteToMidiNumber(`${progression.key || 'C'}4`);
      const ninth = rootMidi + 14;
      const steelyNotes: MelodyNote[] = [
        {
          id: `steely-enc-low-${barIndex}-2`,
          barIndex,
          stepInBar: 2,
          beatOffset: barIndex * 4 + 0.5,
          durationBeats: 0.5,
          pitch: midiToNoteName(ninth - 1),
          midi: ninth - 1,
          velocity: 88,
          chordToneRole: 'chromatic',
          tag: 'band-steely-enclosure',
        },
        {
          id: `steely-enc-high-${barIndex}-4`,
          barIndex,
          stepInBar: 4,
          beatOffset: barIndex * 4 + 1,
          durationBeats: 0.5,
          pitch: midiToNoteName(ninth + 1),
          midi: ninth + 1,
          velocity: 92,
          chordToneRole: 'chromatic',
          tag: 'band-steely-enclosure',
        },
        {
          id: `steely-target-${barIndex}-6`,
          barIndex,
          stepInBar: 6,
          beatOffset: barIndex * 4 + 1.5,
          durationBeats: 2.5,
          pitch: midiToNoteName(ninth),
          midi: ninth,
          velocity: 108,
          chordToneRole: 'tension',
          tag: 'band-steely-jazz9',
        },
      ];
      return {
        ...melody,
        notes: [...melody.notes.filter(n => n.barIndex !== barIndex), ...steelyNotes].sort((a, b) => a.beatOffset - b.beatOffset),
        bandId,
      };
    }

    if (bId.includes('mac') || bId.includes('demarco')) {
      // Mac DeMarco: Lazy behind-the-beat descending walkdown
      const rootMidi = noteToMidiNumber(`${progression.key || 'C'}4`);
      const macNotes: MelodyNote[] = [
        {
          id: `mac-7th-${barIndex}-2`,
          barIndex,
          stepInBar: 2,
          beatOffset: barIndex * 4 + 0.5,
          durationBeats: 1.0,
          pitch: midiToNoteName(rootMidi + 11), // maj7
          midi: rootMidi + 11,
          velocity: 92,
          chordToneRole: '7th',
          tag: 'band-mac-walkdown',
        },
        {
          id: `mac-5th-${barIndex}-6`,
          barIndex,
          stepInBar: 6,
          beatOffset: barIndex * 4 + 1.5,
          durationBeats: 1.0,
          pitch: midiToNoteName(rootMidi + 7), // 5th
          midi: rootMidi + 7,
          velocity: 88,
          chordToneRole: '5th',
          tag: 'band-mac-walkdown',
        },
        {
          id: `mac-3rd-${barIndex}-10`,
          barIndex,
          stepInBar: 10,
          beatOffset: barIndex * 4 + 2.5,
          durationBeats: 1.5,
          pitch: midiToNoteName(rootMidi + 4), // 3rd
          midi: rootMidi + 4,
          velocity: 95,
          chordToneRole: '3rd',
          tag: 'band-mac-walkdown',
        },
      ];
      return {
        ...melody,
        notes: [...melody.notes.filter(n => n.barIndex !== barIndex), ...macNotes].sort((a, b) => a.beatOffset - b.beatOffset),
        bandId,
      };
    }

    return { ...melody, bandId };
  }

  shiftOctave(melody: MelodyTrack, delta: number): MelodyTrack {
    const shiftedNotes = melody.notes.map(note => {
      const newMidi = Math.max(12, Math.min(127, note.midi + delta * 12));
      return {
        ...note,
        midi: newMidi,
        pitch: midiToNoteName(newMidi),
      };
    });

    return {
      ...melody,
      octave: Math.max(1, Math.min(7, melody.octave + delta)),
      notes: shiftedNotes,
    };
  }

  setContour(melody: MelodyTrack, contour: ContourArchetype, progression: Progression): MelodyTrack {
    return this.generateMelody(progression, {
      contour,
      density: melody.density,
      octave: melody.octave,
      guideMode: melody.guideMode,
      feelSettings: melody.feelSettings,
      presetId: melody.presetId,
      bandId: melody.bandId,
    });
  }

  setDensity(melody: MelodyTrack, density: number, progression: Progression): MelodyTrack {
    return this.generateMelody(progression, {
      contour: melody.contour,
      density,
      octave: melody.octave,
      guideMode: melody.guideMode,
      feelSettings: melody.feelSettings,
      presetId: melody.presetId,
      bandId: melody.bandId,
    });
  }

  snapNoteToGuide(pitch: string, timeBeats: number, mode: GuideMode, progression: Progression): string {
    return snapNoteToGuide(pitch, timeBeats, mode, progression);
  }

  analyzeMelodyNote(note: MelodyNote, progression: Progression): NoteAnalysis {
    const barIndex = Math.max(0, Math.min((progression.chords?.length || 1) - 1, note.barIndex));
    const chord = progression.chords?.[barIndex] || {
      name: 'C',
      notes: ['C', 'E', 'G'],
      tag: '',
      roman: 'I',
      color: '',
      functionLabel: '',
      scaleLabel: '',
      desc: '',
      degree: '',
      scaleKey: '',
      tension: 0,
    };

    const classification = classifyPitch(note.midi, chord, progression.key, progression.scaleType);
    return {
      pitch: note.pitch,
      role: classification.role,
      intervalFromRoot: classification.intervalFromRoot,
      chordName: chord.name,
      isClash: classification.isClash,
      clashReason: classification.clashReason,
      suggestion: classification.suggestion,
    };
  }

  validateMelody(melody: MelodyTrack, progression: Progression): NoteAnalysis[] {
    return melody.notes.map(note => this.analyzeMelodyNote(note, progression));
  }

  alignMelodyToChords(melody: MelodyTrack, newProgression: Progression): MelodyTrack {
    return alignMelodyToChords(melody, newProgression);
  }

  applyHumanFeel(
    notes: MelodyNote[],
    feel: MelodyFeelSettings,
    bpm: number
  ): ScheduledMelodyEvent[] {
    const secondsPerBeat = 60 / bpm;
    const events: ScheduledMelodyEvent[] = [];

    notes.forEach(note => {
      // 16th-note swing offset: applies to odd 16th-note steps
      const isEven16th = (note.stepInBar % 2 === 1);
      const swingDelay = isEven16th ? (feel.swing / 100) * (secondsPerBeat * 0.25 * 0.35) : 0;

      // Microtiming jitter (deterministic pseudo-random based on note id/step)
      const pseudoRandom = Math.sin(note.stepInBar * 13.37 + note.barIndex * 7.1) * 0.5;
      const jitterSeconds = pseudoRandom * feel.humanVariance * 0.025;

      const scheduledTime = Math.max(0, note.beatOffset * secondsPerBeat + swingDelay + jitterSeconds);
      const durationSeconds = Math.max(0.05, note.durationBeats * secondsPerBeat * feel.gateRatio);

      // Velocity drift: downbeats louder, dynamic variation
      const isDownbeat = (note.stepInBar === 0);
      const downbeatAccent = isDownbeat ? 12 : 0;
      const velocityVariance = Math.cos(note.stepInBar * 5.5) * (feel.velocityDrift * 10);
      const finalVelocity = Math.max(1, Math.min(127, Math.round(note.velocity + downbeatAccent + velocityVariance))) / 127;

      events.push({
        note: note.pitch,
        midi: note.midi,
        time: scheduledTime,
        duration: durationSeconds,
        velocity: finalVelocity,
      });
    });

    return events.sort((a, b) => a.time - b.time);
  }

  getMelodyFeelForGenre(genre: string): MelodyFeelSettings {
    return getMelodyFeelForGenre(genre);
  }
}

export const melodyEngine = new MelodyEngine();
