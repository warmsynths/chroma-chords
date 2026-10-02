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
export class MelodyEngine {
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

    const notes: MelodyNote[] = [];
    const chords = progression.chords || [];

    // Density steps mapping: density 0-25 => 1-2 notes/bar, 26-60 => 3-5 notes/bar, 61-100 => 6-12 notes/bar
    let notesPerBar = 4;
    if (density < 25) notesPerBar = Math.max(1, Math.round((density / 25) * 2));
    else if (density <= 60) notesPerBar = 2 + Math.round(((density - 25) / 35) * 3);
    else notesPerBar = 5 + Math.round(((density - 60) / 40) * 7);

    chords.forEach((chord, barIndex) => {
      const matrix = getHarmonicChordMatrix(chord, progression.key, progression.scaleType);
      const stepInterval = Math.max(1, Math.floor(16 / notesPerBar));

      for (let i = 0; i < notesPerBar; i++) {
        const stepInBar = Math.min(15, i * stepInterval);
        const beatOffset = barIndex * 4 + (stepInBar / 4);
        const durationBeats = Math.min(2.0, Math.max(0.5, stepInterval / 4));

        // Choose chord tone according to metric beat position
        let chosenPc: number;
        let role: ChordToneRole = 'root';

        if (stepInBar === 0) {
          // Strong downbeat: root or 3rd
          chosenPc = (i % 2 === 0 || !matrix.thirdPc) ? matrix.rootPc : matrix.thirdPc;
          role = (chosenPc === matrix.rootPc) ? 'root' : '3rd';
        } else if (stepInBar === 8) {
          // Mid-bar beat 3: 5th or 3rd
          chosenPc = matrix.fifthPc ?? matrix.rootPc;
          role = '5th';
        } else if (matrix.tensionPcs.length > 0 && i % 2 === 1) {
          chosenPc = matrix.tensionPcs[0];
          role = 'tension';
        } else {
          chosenPc = matrix.thirdPc ?? matrix.rootPc;
          role = '3rd';
        }

        // Apply contour archetype pitch bias
        let contourOffset = 0;
        const normalizedPos = (barIndex * 4 + beatOffset) / (chords.length * 4);

        if (contour === 'Arch') {
          // Rises to peak at center, resolves at end
          contourOffset = Math.round(Math.sin(normalizedPos * Math.PI) * 7);
        } else if (contour === 'AscendingClimax') {
          // Climbs upward
          contourOffset = Math.round(normalizedPos * 12);
        } else if (contour === 'DescendingSigh') {
          // Drops downward
          contourOffset = Math.round((1 - normalizedPos) * 12);
        }

        const baseMidi = 12 * (octave + 1) + chosenPc + contourOffset;
        // Keep within pitch class
        const finalPc = (baseMidi % 12 + 12) % 12;
        let finalMidi = baseMidi;
        if (finalPc !== chosenPc) {
          finalMidi = baseMidi + ((chosenPc - finalPc + 12) % 12);
        }

        const pitch = midiToNoteName(finalMidi);
        const classification = classifyPitch(finalMidi, chord, progression.key, progression.scaleType);

        notes.push({
          id: `m-note-${barIndex}-${stepInBar}-${i}`,
          barIndex,
          stepInBar,
          beatOffset,
          durationBeats,
          pitch,
          midi: finalMidi,
          velocity: stepInBar === 0 ? 105 : 90,
          chordToneRole: classification.role,
          isClash: classification.isClash,
        });
      }
    });

    return {
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

  spiceWithBandTrick(melody: MelodyTrack, bandId: string, barIndex: number, progression: Progression): MelodyTrack {
    const activeChord = progression.chords[barIndex] || progression.chords[0];
    const notes = [...melody.notes];

    if (bandId.toLowerCase().includes('oasis')) {
      // Oasis Trick: Drone anchor pedal note G4 or D5 over changing chords
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
          velocity: 100,
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
}

export const melodyEngine = new MelodyEngine();
