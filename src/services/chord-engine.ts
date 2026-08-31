export interface NextChordOption {
  name: string;
  nodeId: string;
}

export interface ScaleDegree {
  chord_name: string;
  next_chord_options: NextChordOption[];
}

export interface ScaleProfile {
  root: string;
  type: string;
  degrees: Record<string, ScaleDegree>;
}

export interface RawChordData {
  chords: Record<string, unknown>;
  scales: Record<string, ScaleProfile>;
}

export interface ChordBlock {
  name: string;
  tag: string;
  roman: string;
  color: string;
  functionLabel: string;
  notes: string[];
  scaleLabel: string;
  desc: string;
  degree: string;
  scaleKey: string;
  tension: number;
}

export interface Progression {
  genre: string;
  mood: string;
  key: string;
  scaleType: string;
  bpm: number;
  chords: ChordBlock[];
  searchTerm?: string;
}

export interface Alternative {
  label: string;
  sub: string;
  chord: ChordBlock;
  functionCaption: string;
  rationale: string;
}

export interface TheoryGroupRow {
  name: string;
  roman: string;
  notes: string[];
  sub: string;
  chord: ChordBlock;
  tension: number;
}

export interface TheoryGroup {
  name: string;
  sub: string;
  tension: number;
  rows: TheoryGroupRow[];
}

export interface BorrowedChordRow {
  name: string;
  sub: string;
  roman: string;
  notes: string[];
  chord: ChordBlock;
  tension: number;
}


const NOTE_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const PITCH_CLASS: Record<string, number> = {
  'C': 0, 'B#': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4, 'E#': 5, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7,
  'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11, 'Cb': 11,
};

const FLAT_TONICS = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']);

export const ROOT_KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const QUALITY_INTERVALS: Record<string, number[]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  dom7: [0, 4, 7, 10],
  min7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  dim7: [0, 3, 6, 9],
  sus4: [0, 5, 7],
  sus2: [0, 2, 7],
  dom9: [0, 4, 7, 10, 14],
  maj9: [0, 4, 7, 11, 14],
  min9: [0, 3, 7, 10, 14],
};

export const CHORD_QUALITIES = Object.keys(QUALITY_INTERVALS);

const DEGREE_TAG: Record<string, string> = {
  TONIC: 'home',
  SUPERTONIC: 'rise',
  MEDIANT: 'glow',
  SUBDOMINANT: 'lift',
  DOMINANT: 'reach',
  SUBMEDIANT: 'hold',
  'LEADING-TONE': 'edge',
  SUBTONIC: 'drift',
};

const DEGREE_FUNCTION: Record<string, string> = {
  TONIC: 'Tonic',
  SUPERTONIC: 'Supertonic',
  MEDIANT: 'Mediant',
  SUBDOMINANT: 'Subdominant',
  DOMINANT: 'Dominant',
  SUBMEDIANT: 'Submediant',
  'LEADING-TONE': 'Leading tone',
  SUBTONIC: 'Subtonic',
};

const DEGREE_TENSION: Record<string, number> = {
  TONIC: 0.04,
  SUBMEDIANT: 0.24,
  MEDIANT: 0.34,
  SUBDOMINANT: 0.42,
  SUPERTONIC: 0.52,
  SUBTONIC: 0.58,
  'LEADING-TONE': 0.78,
  DOMINANT: 0.68,
};

const ROMAN_BY_SCALE: Record<string, Record<string, string>> = {
  MAJOR: {
    TONIC: 'I',
    SUPERTONIC: 'ii',
    MEDIANT: 'iii',
    SUBDOMINANT: 'IV',
    DOMINANT: 'V',
    SUBMEDIANT: 'vi',
    'LEADING-TONE': 'vii°',
    SUBTONIC: '♭VII',
  },
  NATURAL_MINOR: {
    TONIC: 'i',
    SUPERTONIC: 'ii°',
    MEDIANT: '♭III',
    SUBDOMINANT: 'iv',
    DOMINANT: 'v',
    SUBMEDIANT: '♭VI',
    'LEADING-TONE': 'vii°',
    SUBTONIC: '♭VII',
  },
  HARMONIC_MINOR: {
    TONIC: 'i',
    SUPERTONIC: 'ii°',
    MEDIANT: '♭III+',
    SUBDOMINANT: 'iv',
    DOMINANT: 'V',
    SUBMEDIANT: '♭VI',
    'LEADING-TONE': 'vii°',
    SUBTONIC: '♭VII',
  },
  MELODIC_MINOR: {
    TONIC: 'i',
    SUPERTONIC: 'ii',
    MEDIANT: '♭III+',
    SUBDOMINANT: 'IV',
    DOMINANT: 'V',
    SUBMEDIANT: 'vi°',
    'LEADING-TONE': 'vii°',
    SUBTONIC: '♭VII',
  },
  DORIAN: {
    TONIC: 'i',
    SUPERTONIC: 'ii',
    MEDIANT: '♭III',
    SUBDOMINANT: 'IV',
    DOMINANT: 'v',
    SUBMEDIANT: 'vi°',
    'LEADING-TONE': 'vii°',
    SUBTONIC: '♭VII',
  },
  MIXOLYDIAN: {
    TONIC: 'I',
    SUPERTONIC: 'ii',
    MEDIANT: 'iii°',
    SUBDOMINANT: 'IV',
    DOMINANT: 'v',
    SUBMEDIANT: 'vi',
    'LEADING-TONE': 'vii°',
    SUBTONIC: '♭VII',
  },
  LYDIAN: {
    TONIC: 'I',
    SUPERTONIC: 'II',
    MEDIANT: 'iii',
    SUBDOMINANT: 'iv°',
    DOMINANT: 'V',
    SUBMEDIANT: 'vi',
    'LEADING-TONE': 'vii',
    SUBTONIC: '♭VII',
  },
  PHRYGIAN: {
    TONIC: 'i',
    SUPERTONIC: '♭II',
    MEDIANT: '♭III',
    SUBDOMINANT: 'iv',
    DOMINANT: 'v°',
    SUBMEDIANT: '♭VI',
    'LEADING-TONE': 'vii',
    SUBTONIC: '♭vii',
  },
  LOCRIAN: {
    TONIC: 'i°',
    SUPERTONIC: '♭II',
    MEDIANT: '♭iii',
    SUBDOMINANT: 'iv',
    DOMINANT: '♭V',
    SUBMEDIANT: '♭VI',
    'LEADING-TONE': '♭vii',
    SUBTONIC: '♭vii',
  },
};

function noteName(pc: number, preferFlat: boolean): string {
  const idx = ((pc % 12) + 12) % 12;
  return preferFlat ? NOTE_FLAT[idx] : NOTE_SHARP[idx];
}

// Chord names can be formatted standard (e.g. "Bbmaj7", "E7", "F#m", "Eb")
// or uppercase database notation (e.g. "BBMAJ", "ABMAJ7", "CMAJ").
export function parseChordSymbol(symbol: string): { root: string; quality: keyof typeof QUALITY_INTERVALS } {
  if (!symbol) return { root: 'C', quality: 'maj' };
  const clean = symbol.trim();
  const first = clean[0]?.toUpperCase();
  let root = 'C';
  let rest = clean;
  if (first && /[A-G]/.test(first)) {
    const second = clean[1];
    if (second === 'b' || second === 'B' || second === '♭' || second === '\u266d') {
      root = `${first}b`;
      rest = clean.slice(2);
    } else if (second === '#' || second === '♯' || second === '\u266f') {
      root = `${first}#`;
      rest = clean.slice(2);
    } else {
      root = first;
      rest = clean.slice(1);
    }
  }
  rest = rest.toLowerCase();
  let quality: keyof typeof QUALITY_INTERVALS = 'maj';
  if (rest.includes('maj9') || (rest.includes('m9') && rest.includes('maj'))) quality = 'maj9';
  else if (rest.includes('min9') || rest.includes('m9')) quality = 'min9';
  else if (rest.includes('9') || rest.includes('dom9')) quality = 'dom9';
  else if (rest.includes('maj7') || (rest.includes('m7') && rest.includes('maj'))) quality = 'maj7';
  else if (rest.includes('min7') || rest.includes('m7')) quality = 'min7';
  else if (rest.includes('dim7')) quality = 'dim7';
  else if (rest.includes('dim') || rest.includes('°')) quality = 'dim';
  else if (rest.includes('aug') || rest.includes('+')) quality = 'aug';
  else if (rest.includes('sus2')) quality = 'sus2';
  else if (rest.includes('sus4') || rest.includes('sus')) quality = 'sus4';
  else if (rest.includes('7')) quality = 'dom7';
  else if (rest.includes('min') || rest === 'm') quality = 'min';
  else quality = 'maj';
  return { root, quality };
}

export const SCALE_TYPES = Object.keys(ROMAN_BY_SCALE);

const SCALE_LABEL: Record<string, string> = {
  MAJOR: 'Ionian',
  NATURAL_MINOR: 'Aeolian',
  HARMONIC_MINOR: 'Harmonic minor',
  MELODIC_MINOR: 'Melodic minor',
  DORIAN: 'Dorian',
  MIXOLYDIAN: 'Mixolydian',
  LYDIAN: 'Lydian',
};

// Canonical genre list/order — also drives the seed-screen pill grid, so this is the one
// place that order should be edited.
export const GENRES = [
  "Pop",
  "Lo-fi/Chill",
  "R&B/Soul",
  "Indie/Folk",
  "Synthwave",
  "Jazz-ish",
  "Gospel",
  "Cinematic",
  "Rock",
  "House/Dance",
  "Blues",
  "Funk/Disco",
  "Country/Bluegrass",
  "Reggae/Dub",
  "Metal",
  "Punk",
  "Ambient/Drone",
  "Trap/Hip-Hop",
  "Bossa Nova/Latin",
  "Classical/Orchestral",
  "EDM/Trance",
  "Afrobeats",
  "Shoegaze"
];

const GENRE_SCALE: Record<string, string> = {
  "Pop": "MAJOR",
  "Rock": "MAJOR",
  "Gospel": "MAJOR",
  "Indie/Folk": "MAJOR",
  "Lo-fi/Chill": "DORIAN",
  "Jazz-ish": "DORIAN",
  "R&B/Soul": "MIXOLYDIAN",
  "House/Dance": "MIXOLYDIAN",
  "Synthwave": "LYDIAN",
  "Cinematic": "LYDIAN",
  "Blues": "MIXOLYDIAN",
  "Funk/Disco": "MIXOLYDIAN",
  "Country/Bluegrass": "MAJOR",
  "Reggae/Dub": "DORIAN",
  "Metal": "HARMONIC_MINOR",
  "Punk": "MAJOR",
  "Ambient/Drone": "LYDIAN",
  "Trap/Hip-Hop": "NATURAL_MINOR",
  "Bossa Nova/Latin": "DORIAN",
  "Classical/Orchestral": "MAJOR",
  "EDM/Trance": "NATURAL_MINOR",
  "Afrobeats": "MIXOLYDIAN",
  "Shoegaze": "LYDIAN"
};

const MOOD_SHIFT: Record<string, string | null> = {
  "Uplifting": null,
  "Melancholy": "NATURAL_MINOR",
  "Dreamy": null,
  "Tense": "HARMONIC_MINOR",
  "Warm": null,
  "Nostalgic": "NATURAL_MINOR",
  "Energetic": null,
  "Dark": "HARMONIC_MINOR",
  "Peaceful": null,
  "Groovy": "MIXOLYDIAN",
  "Epic": "MAJOR"
};

const MOOD_DEGREE_BIAS: Record<string, string[]> = {
  "Uplifting": [
    "DOMINANT",
    "SUBDOMINANT",
    "SUBMEDIANT"
  ],
  "Melancholy": [
    "SUBMEDIANT",
    "SUBTONIC",
    "SUPERTONIC"
  ],
  "Dreamy": [
    "MEDIANT",
    "SUBDOMINANT",
    "SUPERTONIC"
  ],
  "Tense": [
    "DOMINANT",
    "LEADING-TONE",
    "SUPERTONIC"
  ],
  "Warm": [
    "SUBDOMINANT",
    "MEDIANT",
    "SUBMEDIANT"
  ],
  "Nostalgic": [
    "SUBMEDIANT",
    "MEDIANT",
    "DOMINANT"
  ],
  "Energetic": [
    "DOMINANT",
    "SUBDOMINANT",
    "SUPERTONIC"
  ],
  "Dark": [
    "SUBMEDIANT",
    "SUBTONIC",
    "SUPERTONIC"
  ],
  "Peaceful": [
    "TONIC",
    "SUBDOMINANT",
    "MEDIANT"
  ],
  "Groovy": [
    "SUBDOMINANT",
    "DOMINANT",
    "SUBTONIC"
  ],
  "Epic": [
    "TONIC",
    "DOMINANT",
    "SUBMEDIANT"
  ]
};

export interface MoodDef {
  name: string;
  dot: string;
  desc: string;
  // Small line-art glyph (24x24 viewBox) shown inside each mood pill's tinted badge.
  iconPath: string;
}

// Shared mood data: dot/accent color (tints the pill badge, background blobs, and the
// mood-colored action elements — CTA, play button, dice, selected chips) plus a short
// caption and a small line-icon shown in the mood pill's badge.
export const MOODS: MoodDef[] = [
  {
    "name": "Uplifting",
    "dot": "#F6D98B",
    "desc": "Bright, major, forward-moving",
    "iconPath": "M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5"
  },
  {
    "name": "Melancholy",
    "dot": "#9CC0EC",
    "desc": "Minor-leaning, unresolved longing",
    "iconPath": "M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15"
  },
  {
    "name": "Dreamy",
    "dot": "#C9A9E0",
    "desc": "Suspended, floating, reverb-soaked",
    "iconPath": "M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0"
  },
  {
    "name": "Tense",
    "dot": "#F2735F",
    "desc": "Chromatic pulls, unresolved tension",
    "iconPath": "M3 12 L7 6 L11 16 L15 6 L19 16 L21 12"
  },
  {
    "name": "Warm",
    "dot": "#F2C9A0",
    "desc": "Rich, consonant, close voicings",
    "iconPath": "M12 4 a6.5 6.5 0 1 0 6.5 6.5"
  },
  {
    "name": "Nostalgic",
    "dot": "#B8CC9E",
    "desc": "Bittersweet, borrowed chords",
    "iconPath": "M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12"
  },
  {
    "name": "Energetic",
    "dot": "#FF8C42",
    "desc": "High velocity, driving rhythm",
    "iconPath": "M13 2 L4 14 h7 l-2 8 11-12 h-7 z"
  },
  {
    "name": "Dark",
    "dot": "#7B61FF",
    "desc": "Deep minor, ominous resonance",
    "iconPath": "M12 3 a9 9 0 1 0 9 9 a9 9 0 0 1-9-9 z"
  },
  {
    "name": "Peaceful",
    "dot": "#7CD9B6",
    "desc": "Serene, gentle acoustic space",
    "iconPath": "M12 2 a10 10 0 1 0 10 10 A10 10 0 0 0 12 2 z M12 6 a6 6 0 1 1-6 6 a6 6 0 0 1 6-6 z"
  },
  {
    "name": "Groovy",
    "dot": "#E8609A",
    "desc": "Syncopated, rhythmic bounce",
    "iconPath": "M4 12 c4-4 8 4 12-4 s8 4 4 8"
  },
  {
    "name": "Epic",
    "dot": "#E5C158",
    "desc": "Sweeping dynamics, triumphant power",
    "iconPath": "M12 2 l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 z"
  }
];

export function getMoodColor(mood: string): string {
  return (MOODS.find(m => m.name === mood) || MOODS[0]).dot;
}

interface ProgressionTemplate {
  degrees: string[];
}

// Idiomatic 4-chord shapes per scale/mode, drawn from real progressions common to that
// harmonic world (e.g. I-V-vi-IV pop, i-VI-III-VII cinematic minor, mixolydian I-bVII-IV vamps).
// Every template uses 4 distinct degrees — no repeats — so the loop never lands on the
// same chord twice. Genre picks the scale/mode via GENRE_SCALE; mood then re-weights which
// shape gets picked (see degreeBiasWeight) so the same genre still varies with mood, and
// randomly among same-weight shapes so repeated generations of the same genre+mood don't repeat.
const PROGRESSION_TEMPLATES: Record<string, ProgressionTemplate[]> = {
  MAJOR: [
    { degrees: ['TONIC', 'DOMINANT', 'SUBMEDIANT', 'SUBDOMINANT'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'SUBDOMINANT', 'DOMINANT'] },
    { degrees: ['SUBMEDIANT', 'SUBDOMINANT', 'TONIC', 'DOMINANT'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBDOMINANT', 'DOMINANT'] },
    { degrees: ['TONIC', 'MEDIANT', 'SUBMEDIANT', 'SUBDOMINANT'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUBMEDIANT', 'DOMINANT'] },
    { degrees: ['SUBDOMINANT', 'DOMINANT', 'MEDIANT', 'SUBMEDIANT'] },
    { degrees: ['SUBDOMINANT', 'TONIC', 'DOMINANT', 'SUBMEDIANT'] },
    { degrees: ['SUPERTONIC', 'DOMINANT', 'TONIC', 'SUBMEDIANT'] },
    { degrees: ['SUBMEDIANT', 'DOMINANT', 'SUBDOMINANT', 'DOMINANT'] },
    { degrees: ['SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'TONIC'] },
  ],
  NATURAL_MINOR: [
    { degrees: ['TONIC', 'SUBMEDIANT', 'MEDIANT', 'SUBTONIC'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUBTONIC', 'MEDIANT'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'SUBTONIC', 'DOMINANT'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBTONIC', 'SUBMEDIANT'] },
    { degrees: ['SUBMEDIANT', 'SUBTONIC', 'TONIC', 'DOMINANT'] },
    { degrees: ['SUBMEDIANT', 'SUBTONIC', 'MEDIANT', 'TONIC'] },
    { degrees: ['SUBDOMINANT', 'DOMINANT', 'TONIC', 'SUBMEDIANT'] },
    { degrees: ['SUBTONIC', 'SUBMEDIANT', 'SUBDOMINANT', 'TONIC'] },
  ],
  HARMONIC_MINOR: [
    { degrees: ['TONIC', 'SUBMEDIANT', 'DOMINANT', 'SUBDOMINANT'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'DOMINANT', 'SUBMEDIANT'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'SUPERTONIC', 'DOMINANT'] },
    { degrees: ['SUBMEDIANT', 'DOMINANT', 'TONIC', 'SUBDOMINANT'] },
    { degrees: ['SUBDOMINANT', 'DOMINANT', 'TONIC', 'SUBMEDIANT'] },
  ],
  DORIAN: [
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUBTONIC', 'SUPERTONIC'] },
    { degrees: ['TONIC', 'SUBTONIC', 'SUBDOMINANT', 'SUPERTONIC'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBDOMINANT', 'SUBTONIC'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUPERTONIC', 'SUBTONIC'] },
    { degrees: ['SUBDOMINANT', 'TONIC', 'SUBTONIC', 'SUPERTONIC'] },
    { degrees: ['SUBTONIC', 'SUBDOMINANT', 'TONIC', 'DOMINANT'] },
    { degrees: ['SUPERTONIC', 'SUBDOMINANT', 'SUBTONIC', 'TONIC'] },
  ],
  MIXOLYDIAN: [
    { degrees: ['TONIC', 'SUBTONIC', 'SUBDOMINANT', 'SUBMEDIANT'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUBTONIC', 'SUPERTONIC'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'SUBDOMINANT', 'SUBTONIC'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBTONIC', 'SUBDOMINANT'] },
    { degrees: ['SUBTONIC', 'SUBDOMINANT', 'TONIC', 'DOMINANT'] },
    { degrees: ['SUBDOMINANT', 'SUBTONIC', 'TONIC', 'SUBMEDIANT'] },
    { degrees: ['SUBTONIC', 'TONIC', 'SUBDOMINANT', 'SUPERTONIC'] },
  ],
  LYDIAN: [
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBMEDIANT', 'DOMINANT'] },
    { degrees: ['TONIC', 'DOMINANT', 'SUPERTONIC', 'SUBMEDIANT'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'DOMINANT', 'SUPERTONIC'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'DOMINANT', 'SUBMEDIANT'] },
    { degrees: ['SUPERTONIC', 'TONIC', 'DOMINANT', 'SUBMEDIANT'] },
    { degrees: ['SUPERTONIC', 'DOMINANT', 'TONIC', 'SUBMEDIANT'] },
  ],
};

function degreeBiasWeight(template: ProgressionTemplate, bias: string[]): number {
  return 1 + template.degrees.filter(d => bias.includes(d)).length * 0.6;
}

function pickWeighted<T>(items: T[], weight: (item: T) => number): T {
  const total = items.reduce((sum, item) => sum + weight(item), 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= weight(item);
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

function pickOne<T>(items: T[]): T | undefined {
  if (!items.length) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}

const DEFAULT_PROGRESSION_LENGTH = 4;
export const MIN_PROGRESSION_LENGTH = 1;
export const MAX_PROGRESSION_LENGTH = 8;

// How long each chord holds during autoplay — shared between the app's setInterval and the
// loop screen's progress-bar CSS transition so the fill's animation duration always matches
// real playback timing instead of drifting out of two hardcoded copies of the same number.
export const AUTOPLAY_INTERVAL_MS = 1700;

const DEFAULT_MARKOV_TRANSITIONS: Record<string, Record<string, number>> = {
  TONIC: { SUBDOMINANT: 0.35, SUBMEDIANT: 0.25, SUPERTONIC: 0.15, DOMINANT: 0.15, MEDIANT: 0.05, SUBTONIC: 0.05 },
  SUPERTONIC: { DOMINANT: 0.50, SUBDOMINANT: 0.20, SUBMEDIANT: 0.15, TONIC: 0.10, 'LEADING-TONE': 0.05 },
  MEDIANT: { SUBMEDIANT: 0.40, SUBDOMINANT: 0.30, SUPERTONIC: 0.15, DOMINANT: 0.15 },
  SUBDOMINANT: { DOMINANT: 0.45, TONIC: 0.25, SUPERTONIC: 0.15, SUBMEDIANT: 0.15 },
  DOMINANT: { TONIC: 0.55, SUBMEDIANT: 0.25, SUBDOMINANT: 0.15, MEDIANT: 0.05 },
  SUBMEDIANT: { SUBDOMINANT: 0.40, SUPERTONIC: 0.25, DOMINANT: 0.20, TONIC: 0.15 },
  'LEADING-TONE': { TONIC: 0.70, SUBMEDIANT: 0.20, MEDIANT: 0.10 },
  SUBTONIC: { TONIC: 0.45, SUBDOMINANT: 0.30, SUBMEDIANT: 0.15, DOMINANT: 0.10 },
};

export function getStartingDegreeWeight(
  degree: string,
  scaleType: string = 'MAJOR',
  genre: string = 'Pop',
  mood: string = 'Uplifting'
): number {
  const baseWeights: Record<string, number> = {
    TONIC: 1.0,
    SUBDOMINANT: 0.45,
    SUBMEDIANT: 0.4,
    SUPERTONIC: 0.3,
    SUBTONIC: 0.3,
    MEDIANT: 0.15,
    DOMINANT: 0.15,
    'LEADING-TONE': 0.02,
  };

  let weight = baseWeights[degree] ?? 0.1;

  // Scale-specific adjustments
  if (scaleType.includes('MINOR') || scaleType === 'DORIAN') {
    if (degree === 'SUBMEDIANT') weight *= 1.4;
    if (degree === 'SUBTONIC') weight *= 1.3;
  } else if (scaleType === 'MIXOLYDIAN') {
    if (degree === 'SUBTONIC') weight *= 1.8;
    if (degree === 'SUBDOMINANT') weight *= 1.5;
  } else if (scaleType === 'LYDIAN') {
    if (degree === 'SUPERTONIC') weight *= 1.8;
  }

  // Genre adjustments
  if (genre === 'Lo-fi/Chill' || genre === 'R&B/Soul') {
    if (degree === 'SUBDOMINANT' || degree === 'SUPERTONIC') weight *= 2.0;
    if (degree === 'SUBMEDIANT') weight *= 1.5;
  } else if (genre === 'Jazz-ish' || genre === 'Bossa Nova/Latin') {
    if (degree === 'SUPERTONIC') weight *= 2.5;
    if (degree === 'SUBDOMINANT') weight *= 1.8;
  } else if (genre === 'Pop' || genre === 'Indie/Folk' || genre === 'Shoegaze') {
    if (degree === 'SUBDOMINANT' || degree === 'SUBMEDIANT') weight *= 1.8;
  } else if (genre === 'Synthwave' || genre === 'House/Dance' || genre === 'Rock' || genre === 'Punk' || genre === 'Funk/Disco' || genre === 'Reggae/Dub') {
    if (degree === 'SUBTONIC') weight *= 2.2;
    if (degree === 'SUBDOMINANT') weight *= 1.8;
    if (degree === 'SUBMEDIANT') weight *= 1.6;
  } else if (genre === 'Classical/Orchestral' || genre === 'Gospel') {
    if (degree === 'TONIC') weight *= 2.5;
  }

  // Mood adjustments
  if (mood === 'Uplifting' || mood === 'Epic' || mood === 'Peaceful') {
    if (degree === 'TONIC') weight *= 2.5;
  } else if (mood === 'Melancholy' || mood === 'Dark') {
    if (degree === 'SUBMEDIANT') weight *= 2.2;
    if (degree === 'SUPERTONIC') weight *= 1.5;
  } else if (mood === 'Dreamy' || mood === 'Nostalgic' || mood === 'Warm') {
    if (degree === 'SUBDOMINANT') weight *= 2.0;
    if (degree === 'SUBMEDIANT') weight *= 1.6;
    if (degree === 'MEDIANT') weight *= 1.4;
  } else if (mood === 'Tense') {
    if (degree === 'SUPERTONIC' || degree === 'SUBDOMINANT') weight *= 1.8;
  } else if (mood === 'Groovy' || mood === 'Energetic') {
    if (degree === 'SUBTONIC' || degree === 'SUBDOMINANT') weight *= 1.8;
  }

  const bias = MOOD_DEGREE_BIAS[mood] || [];
  if (bias.includes(degree)) {
    weight *= 1.3;
  }

  return Math.max(0.01, weight);
}

export function getMarkovTransitionWeight(
  fromDegree: string,
  toDegree: string,
  scaleType: string = 'MAJOR',
  genre: string = 'Pop',
  mood: string = 'Uplifting'
): number {
  if (fromDegree === toDegree) return 0.05;

  const baseTransitions = DEFAULT_MARKOV_TRANSITIONS[fromDegree] || {};
  let weight = baseTransitions[toDegree] ?? 0.1;

  if (scaleType.includes('MINOR') || scaleType === 'DORIAN') {
    if (fromDegree === 'TONIC' && toDegree === 'SUBMEDIANT') weight *= 1.5;
    if (fromDegree === 'SUBMEDIANT' && toDegree === 'MEDIANT') weight *= 1.4;
    if (fromDegree === 'MEDIANT' && toDegree === 'SUBTONIC') weight *= 1.4;
    if (fromDegree === 'SUBTONIC' && toDegree === 'TONIC') weight *= 1.3;
  }

  if (genre === 'Jazz-ish' || genre === 'Lo-fi/Chill') {
    if (fromDegree === 'SUPERTONIC' && toDegree === 'DOMINANT') weight *= 1.8;
    if (fromDegree === 'DOMINANT' && toDegree === 'TONIC') weight *= 1.5;
    if (fromDegree === 'TONIC' && toDegree === 'SUPERTONIC') weight *= 1.4;
  } else if (genre === 'House/Dance' || genre === 'Synthwave') {
    if (toDegree === 'SUBTONIC' || toDegree === 'SUBDOMINANT') weight *= 1.5;
  }

  const bias = MOOD_DEGREE_BIAS[mood] || [];
  if (bias.includes(toDegree)) {
    weight *= 1.5;
  }

  return Math.max(0.01, weight);
}

function walkMarkovGraph(
  scale: ScaleProfile,
  scaleKey: string,
  degreeOrder: string[],
  bias: string[],
  genre: string,
  mood: string,
  length: number = DEFAULT_PROGRESSION_LENGTH
): string[] {
  let candidates = degreeOrder.filter(d => scale.degrees[d]);
  if (!candidates.length) candidates = degreeOrder;

  const firstDegree = pickWeighted(candidates, d => getStartingDegreeWeight(d, scale.type, genre, mood)) || 'TONIC';
  const chosenDegrees: string[] = [firstDegree];
  let currentDegree = firstDegree;

  for (let i = 1; i < length; i++) {
    const isLast = i === length - 1;

    let stepCandidates = degreeOrder.filter(d => scale.degrees[d]);
    if (!stepCandidates.length) stepCandidates = degreeOrder;

    const nonDuplicates = stepCandidates.filter(d => d !== currentDegree);
    const pool = nonDuplicates.length ? nonDuplicates : stepCandidates;

    if (isLast) {
      const cadencePick = pickWeighted(pool, d => {
        const transitionToFirst = getMarkovTransitionWeight(d, chosenDegrees[0], scale.type, genre, mood);
        const transitionFromCurrent = getMarkovTransitionWeight(currentDegree, d, scale.type, genre, mood);
        return transitionToFirst * transitionFromCurrent;
      });
      chosenDegrees.push(cadencePick);
    } else {
      const unused = pool.filter(d => !chosenDegrees.includes(d));
      const searchPool = unused.length ? unused : pool;

      const pick = pickWeighted(searchPool, d => getMarkovTransitionWeight(currentDegree, d, scale.type, genre, mood));
      currentDegree = pick;
      chosenDegrees.push(pick);
    }
  }

  return chosenDegrees;
}



export function notesForSymbol(symbol: string, preferFlat: boolean): string[] {
  const { root, quality } = parseChordSymbol(symbol);
  const rootPc = PITCH_CLASS[root] ?? 0;
  const intervals = QUALITY_INTERVALS[quality];
  return intervals.map(iv => noteName(rootPc + iv, preferFlat));
}

export async function loadChordData(): Promise<RawChordData> {
  const base = (typeof import.meta !== 'undefined' && (import.meta as any).env?.BASE_URL) ? (import.meta as any).env.BASE_URL : '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const primaryUrl = `${cleanBase}chroma_chords_data.json`;
  const fallbackUrl = `${cleanBase}chord_voyager_data.json`;

  let res = await fetch(primaryUrl).catch(() => null);
  if (!res || !res.ok) {
    res = await fetch(fallbackUrl).catch(() => null);
  }
  if (!res || !res.ok) {
    res = await fetch('/chroma_chords_data.json').catch(() => null);
  }
  if (!res || !res.ok) {
    res = await fetch('/chord_voyager_data.json').catch(() => null);
  }
  if (!res || !res.ok) {
    const dataUrl = new URL('./chroma_chords_data.json', import.meta.url).href;
    res = await fetch(dataUrl);
  }
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const data = (await res.json()) as RawChordData;
  injectModes(data);
  return data;
}

const MIXOLYDIAN_PARENT_ROOTS: Record<string, string> = {
  'C': 'F', 'Db': 'F#', 'D': 'G', 'Eb': 'Ab', 'E': 'A', 'F': 'Bb',
  'F#': 'B', 'G': 'C', 'Ab': 'Db', 'A': 'D', 'Bb': 'Eb', 'B': 'E',
};

const DORIAN_PARENT_ROOTS: Record<string, string> = {
  'C': 'Bb', 'C#': 'B', 'D': 'C', 'D#': 'Db', 'E': 'D', 'F': 'Eb',
  'F#': 'E', 'G': 'F', 'G#': 'F#', 'A': 'G', 'A#': 'Ab', 'B': 'A',
};

const LYDIAN_PARENT_ROOTS: Record<string, string> = {
  'C': 'G', 'Db': 'Ab', 'D': 'A', 'Eb': 'Bb', 'E': 'B', 'F': 'C',
  'F#': 'Db', 'G': 'D', 'Ab': 'Eb', 'A': 'E', 'Bb': 'F', 'B': 'F#',
};

const PARENT_TO_MODE_DEGREE: Record<string, string> = {
  'DORIAN_SUPERTONIC': 'TONIC', 'DORIAN_MEDIANT': 'SUPERTONIC', 'DORIAN_SUBDOMINANT': 'MEDIANT',
  'DORIAN_DOMINANT': 'SUBDOMINANT', 'DORIAN_SUBMEDIANT': 'DOMINANT', 'DORIAN_LEADING-TONE': 'SUBMEDIANT', 'DORIAN_TONIC': 'SUBTONIC',
  'MIXOLYDIAN_DOMINANT': 'TONIC', 'MIXOLYDIAN_SUBMEDIANT': 'SUPERTONIC', 'MIXOLYDIAN_LEADING-TONE': 'MEDIANT',
  'MIXOLYDIAN_TONIC': 'SUBDOMINANT', 'MIXOLYDIAN_SUPERTONIC': 'DOMINANT', 'MIXOLYDIAN_MEDIANT': 'SUBMEDIANT', 'MIXOLYDIAN_SUBDOMINANT': 'SUBTONIC',
  'LYDIAN_SUBDOMINANT': 'TONIC', 'LYDIAN_DOMINANT': 'SUPERTONIC', 'LYDIAN_SUBMEDIANT': 'MEDIANT',
  'LYDIAN_LEADING-TONE': 'SUBDOMINANT', 'LYDIAN_TONIC': 'DOMINANT', 'LYDIAN_SUPERTONIC': 'SUBMEDIANT', 'LYDIAN_MEDIANT': 'LEADING-TONE',
};

const MODE_TO_PARENT_DEGREE: Record<string, string> = {
  'DORIAN_TONIC': 'SUPERTONIC', 'DORIAN_SUPERTONIC': 'MEDIANT', 'DORIAN_MEDIANT': 'SUBDOMINANT',
  'DORIAN_SUBDOMINANT': 'DOMINANT', 'DORIAN_DOMINANT': 'SUBMEDIANT', 'DORIAN_SUBMEDIANT': 'LEADING-TONE', 'DORIAN_SUBTONIC': 'TONIC',
  'MIXOLYDIAN_TONIC': 'DOMINANT', 'MIXOLYDIAN_SUPERTONIC': 'SUBMEDIANT', 'MIXOLYDIAN_MEDIANT': 'LEADING-TONE',
  'MIXOLYDIAN_SUBDOMINANT': 'TONIC', 'MIXOLYDIAN_DOMINANT': 'SUPERTONIC', 'MIXOLYDIAN_SUBMEDIANT': 'MEDIANT', 'MIXOLYDIAN_SUBTONIC': 'SUBDOMINANT',
  'LYDIAN_TONIC': 'SUBDOMINANT', 'LYDIAN_SUPERTONIC': 'DOMINANT', 'LYDIAN_MEDIANT': 'SUBMEDIANT',
  'LYDIAN_SUBDOMINANT': 'LEADING-TONE', 'LYDIAN_DOMINANT': 'TONIC', 'LYDIAN_SUBMEDIANT': 'SUPERTONIC', 'LYDIAN_LEADING-TONE': 'MEDIANT',
};

const MODE_DEGREES: Record<string, string[]> = {
  DORIAN: ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'SUBTONIC'],
  MIXOLYDIAN: ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'SUBTONIC'],
  LYDIAN: ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'LEADING-TONE'],
};

export function injectModes(data: RawChordData) {
  const modeConfigs: [string, Record<string, string>][] = [
    ['MIXOLYDIAN', MIXOLYDIAN_PARENT_ROOTS],
    ['DORIAN', DORIAN_PARENT_ROOTS],
    ['LYDIAN', LYDIAN_PARENT_ROOTS],
  ];

  for (const [modeType, parentRoots] of modeConfigs) {
    for (const [modeRoot, parentRoot] of Object.entries(parentRoots)) {
      const parentScale = data.scales[`${parentRoot}_MAJOR`];
      if (!parentScale) continue;

      const scaleKey = `${modeRoot}_${modeType}`;
      const degreesObj: Record<string, ScaleDegree> = {};

      for (const modeDegree of MODE_DEGREES[modeType]) {
        const parentDegree = MODE_TO_PARENT_DEGREE[`${modeType}_${modeDegree}`];
        const parentDegProfile = parentScale.degrees[parentDegree];
        if (!parentDegProfile) continue;

        const degProfile: ScaleDegree = JSON.parse(JSON.stringify(parentDegProfile));
        degProfile.next_chord_options = (degProfile.next_chord_options || []).map(opt => {
          if (opt.nodeId.startsWith(`${parentRoot}_MAJOR_`)) {
            const parentDeg = opt.nodeId.replace(`${parentRoot}_MAJOR_`, '');
            const modeDeg = PARENT_TO_MODE_DEGREE[`${modeType}_${parentDeg}`];
            if (modeDeg) {
              return { name: opt.name, nodeId: `${modeRoot}_${modeType}_${modeDeg}` };
            }
          }
          return opt;
        });

        degreesObj[modeDegree] = degProfile;
      }

      data.scales[scaleKey] = { root: modeRoot, type: modeType, degrees: degreesObj };
    }
  }
}

// Flat-vector chord-role dictionary: a chord's harmonic tension (0 = stable/resolved,
// 1 = maximally tense) maps directly to how it looks — cool pastel blue and round/small
// when stable, warm pastel coral and large/sharp-cornered when tense. Same mapping used
// for the chord's fill color, its shape/size everywhere it's drawn (loop stage, swap
// options, song chip previews), and its name's font size.
const TENSION_COLOR_FROM = [0x9c, 0xc0, 0xec]; // --cv-blue
const TENSION_COLOR_TO = [0xf2, 0x73, 0x5f]; // --cv-red-deep

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function colorForTension(tension: number): string {
  const t = Math.max(0, Math.min(1, tension));
  const rgb = TENSION_COLOR_FROM.map((c, i) => Math.round(lerp(c, TENSION_COLOR_TO[i], t)));
  return '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
}

export interface ChordRole {
  size: number;
  radius: number;
  fontSize: number;
  color: string;
}

export function roleForTension(tension: number): ChordRole {
  const t = Math.max(0, Math.min(1, tension));
  return {
    size: Math.round(lerp(84, 128, t)),
    radius: Math.round(lerp(40, 12, t)),
    fontSize: Math.round(lerp(21, 30, t)),
    color: colorForTension(t),
  };
}

function describeChord(functionLabel: string, scaleLabel: string, name: string): string {
  const templates: Record<string, string> = {
    Tonic: `As the tonic, ${name} establishes home — the point of full rest and resolution.`,
    Supertonic: `As the supertonic, ${name} steps just off home, a light pivot toward what comes next.`,
    Mediant: `As the mediant, ${name} offers a soft, glowing detour — related to home, but colored differently.`,
    Subdominant: `As the subdominant, ${name} lifts away from home, opening the progression outward before it turns back.`,
    Dominant: `As the dominant, ${name} builds the pull of the progression — tension that wants to resolve.`,
    Submediant: `As the submediant, ${name} offers a warmer, more introspective variation of the tonic — stable but tinged with longing.`,
    'Leading tone': `As the leading tone, ${name} sits right on the edge, straining toward resolution.`,
    Subtonic: `As the subtonic, ${name} drifts just below home, a soft modal step rather than a hard pull.`,
  };
  return templates[functionLabel] || `${name} colors the progression as the ${functionLabel.toLowerCase()} of ${scaleLabel}.`;
}

function buildChordBlock(scaleKey: string, degree: string, scale: ScaleProfile, preferFlat: boolean): ChordBlock {
  const degProfile = scale.degrees[degree];
  const name = degProfile.chord_name;
  const tension = DEGREE_TENSION[degree] ?? 0.5;
  const romanTable = ROMAN_BY_SCALE[scale.type] || ROMAN_BY_SCALE.MAJOR;
  return {
    name: prettifyChordName(name),
    tag: DEGREE_TAG[degree] || 'move',
    roman: romanTable[degree] || '?',
    color: colorForTension(tension),
    functionLabel: DEGREE_FUNCTION[degree] || degree,
    notes: notesForSymbol(name, preferFlat),
    scaleLabel: `${scale.root} ${SCALE_LABEL[scale.type] || scale.type}`,
    desc: describeChord(DEGREE_FUNCTION[degree] || degree, SCALE_LABEL[scale.type] || scale.type, prettifyChordName(name)),
    degree,
    scaleKey,
    tension,
  };
}

function prettifyChordName(symbol: string): string {
  const { root, quality } = parseChordSymbol(symbol);
  const suffix: Record<string, string> = {
    maj: '', min: 'm', dim: 'dim', aug: 'aug', dom7: '7', min7: 'm7', maj7: 'maj7', dim7: 'dim7', sus4: 'sus4',
  };
  return `${root}${suffix[quality] ?? ''}`;
}

export interface ProgressionOverrides {
  key?: string;
  scaleType?: string;
  length?: number;
}

const GENRE_BPM: Record<string, number> = {
  "Pop": 116,
  "Lo-fi/Chill": 80,
  "R&B/Soul": 90,
  "Indie/Folk": 105,
  "Synthwave": 118,
  "Jazz-ish": 95,
  "Gospel": 85,
  "Cinematic": 75,
  "Rock": 124,
  "House/Dance": 126,
  "Blues": 88,
  "Funk/Disco": 114,
  "Country/Bluegrass": 110,
  "Reggae/Dub": 78,
  "Metal": 140,
  "Punk": 155,
  "Ambient/Drone": 65,
  "Trap/Hip-Hop": 135,
  "Bossa Nova/Latin": 120,
  "Classical/Orchestral": 72,
  "EDM/Trance": 132,
  "Afrobeats": 108,
  "Shoegaze": 112
};

export function bpmForGenreMood(genre: string, mood: string): number {
  let bpm = GENRE_BPM[genre] || 92;
  if (mood === 'Tense') bpm += 6;
  if (mood === 'Dreamy' || mood === 'Melancholy') bpm -= 6;
  return bpm;
}

export function generateProgression(data: RawChordData, genre: string, mood: string, overrides?: ProgressionOverrides): Progression {
  const length = Math.max(MIN_PROGRESSION_LENGTH, Math.min(MAX_PROGRESSION_LENGTH, overrides?.length ?? DEFAULT_PROGRESSION_LENGTH));
  const baseScaleType = GENRE_SCALE[genre] || 'MAJOR';
  const shift = MOOD_SHIFT[mood];
  const scaleType = overrides?.scaleType || (shift && (baseScaleType === 'MAJOR') ? shift : baseScaleType);

  let root = overrides?.key && ROOT_KEYS.includes(overrides.key) ? overrides.key : pickOne(ROOT_KEYS)!;

  let scaleKey = `${root}_${scaleType}`;
  if (!data.scales[scaleKey]) {
    root = 'C';
    scaleKey = `${root}_${scaleType}`;
  }
  let scale = data.scales[scaleKey];
  if (!scale) {
    const fallbackKey = Object.keys(data.scales).find(k => k.endsWith(`_${scaleType}`)) || Object.keys(data.scales)[0];
    scale = data.scales[fallbackKey];
    root = scale ? scale.root : 'C';
    scaleKey = fallbackKey;
  }
  const preferFlat = preferFlatSpelling(root, scaleType);

  const degreeOrder = Object.keys(scale.degrees);
  const bias = MOOD_DEGREE_BIAS[mood] || [];

  const templates = PROGRESSION_TEMPLATES[scaleType] || [];
  const validTemplates = length === DEFAULT_PROGRESSION_LENGTH
    ? templates.filter(t => t.degrees.every(d => degreeOrder.includes(d)))
    : [];

  const useTemplate = validTemplates.length && Math.random() < 0.25;
  const chosenDegrees = useTemplate
    ? pickWeighted(validTemplates, t => degreeBiasWeight(t, bias)).degrees
    : walkMarkovGraph(scale, scaleKey, degreeOrder, bias, genre, mood, length);

  const chords = chosenDegrees.map(degree => buildChordBlock(scaleKey, degree, scale, preferFlat));

  return { genre, mood, key: root, scaleType, bpm: bpmForGenreMood(genre, mood), chords };
}

export interface RequestedChord {
  root: string;
  quality: string;
}

// Turns a real chord list (e.g. from the freetext LLM classifier) into an actual Progression,
// built from this app's existing per-key chord data rather than anything the caller invented.
// Each requested chord is matched to whichever scale degree owns that root's pitch class in the
// given key — so the resulting ChordBlocks carry real roman numerals, tension, and
// next_chord_options, identical to a manually-generated progression. A root that doesn't belong
// to the given key becomes a synthesized "borrowed" chord (the same mechanism the "Darker" swap
// suggestion already uses) rather than being dropped, so the shape of the requested progression
// is preserved even when it isn't fully diatonic in that key.
export function alignChordsToScale(
  data: RawChordData,
  key: string,
  scaleType: string,
  chords: RequestedChord[],
  genre: string,
  mood: string
): Progression | null {
  const scaleKey = `${key}_${scaleType}`;
  const scale = data.scales[scaleKey];
  if (!scale || !chords.length) return null;

  const preferFlat = preferFlatSpelling(key, scaleType);
  const keyPc = PITCH_CLASS[key] ?? 0;

  const pitchClassToDegree: Record<number, string> = {};
  Object.entries(scale.degrees).forEach(([degree, degProfile]) => {
    const { root: degRoot } = parseChordSymbol(degProfile.chord_name);
    const pc = PITCH_CLASS[degRoot] ?? 0;
    if (!(pc in pitchClassToDegree)) pitchClassToDegree[pc] = degree;
  });

  const blocks = chords.slice(0, MAX_PROGRESSION_LENGTH).map(({ root, quality }) => {
    const pc = PITCH_CLASS[root] ?? keyPc;
    const degree = pitchClassToDegree[pc];
    if (degree) return buildChordBlock(scaleKey, degree, scale, preferFlat);

    const semitones = ((pc - keyPc) + 12) % 12;
    const safeQuality = (QUALITY_INTERVALS[quality] ? quality : 'maj') as keyof typeof QUALITY_INTERVALS;
    return synthBorrowedBlock(key, semitones, safeQuality, 'Borrowed', '?', 'drift', preferFlat);
  });

  if (blocks.length < MIN_PROGRESSION_LENGTH) return null;

  return { genre, mood, key, scaleType, bpm: bpmForGenreMood(genre, mood), chords: blocks };
}

function pickDegreeWithMarkov(
  candidates: string[],
  degreeOrder: string[],
  exclude: string,
  prevDegree: string,
  scaleType: string,
  genre: string,
  mood: string
): string | undefined {
  const available = candidates.filter(d => degreeOrder.includes(d));
  const preferred = available.filter(d => d !== exclude);
  const pool = preferred.length ? preferred : available;
  if (!pool.length) return undefined;
  return pickWeighted(pool, d => getMarkovTransitionWeight(prevDegree, d, scaleType, genre, mood));
}

const CHORD_SUFFIX: Record<string, string> = {
  maj: '', min: 'm', dim: 'dim', aug: 'aug', dom7: '7', min7: 'm7', maj7: 'maj7', dim7: 'dim7', sus4: 'sus4',
};

// The source data only has NATURAL_MINOR scales for a handful of keys (no flat-major keys),
// so borrowing a real parallel-mode chord isn't always possible. Synthesize a plausible
// borrowed chord directly by transposition instead of leaving "Darker" with no option.
export function synthBorrowedBlock(root: string, semitones: number, quality: keyof typeof QUALITY_INTERVALS, functionLabel: string, roman: string, tag: string, preferFlat: boolean): ChordBlock {
  const rootPc = (PITCH_CLASS[root] ?? 0) + semitones;
  const chordRoot = noteName(rootPc, preferFlat);
  const name = `${chordRoot}${CHORD_SUFFIX[quality]}`;
  const notes = QUALITY_INTERVALS[quality].map(iv => noteName(rootPc + iv, preferFlat));
  const tension = 0.3;
  return {
    name, tag, roman, color: colorForTension(tension),
    functionLabel, notes, scaleLabel: 'Borrowed',
    desc: `${name} borrows its color from outside the current key.`,
    degree: 'BORROWED', scaleKey: '', tension,
  };
}

export function rootOfChordName(name: string): string {
  const m = name.match(/^[A-Ga-g][#b]?/);
  const rootRaw = m ? m[0] : 'C';
  return rootRaw[0].toUpperCase() + rootRaw.slice(1);
}

const VOICING_QUALITY_INTERVALS: Record<string, number[]> = {
  'Major': [0, 4, 7],
  'Minor': [0, 3, 7],
  'Suspended (sus)': [0, 5, 7],
  'Diminished': [0, 3, 6],
};

export function buildVoicingNotes(root: string, quality: string, extension: string, preferFlat: boolean): string[] {
  const rootPc = PITCH_CLASS[root] ?? 0;
  let intervals = VOICING_QUALITY_INTERVALS[quality] || VOICING_QUALITY_INTERVALS['Major'];
  if (extension === '6th') intervals = [...intervals, 9];
  else if (extension === '7th (dom / m7)') intervals = [...intervals, 10];
  else if (extension === 'Major 7th (M7)') intervals = [...intervals, 11];
  else if (extension === '9th') intervals = [...intervals, 10, 14];
  return intervals.map(iv => noteName(rootPc + iv, preferFlat));
}

const VOICING_QUALITY_SUFFIX: Record<string, string> = {
  'Major': '', 'Minor': 'm', 'Suspended (sus)': 'sus', 'Diminished': 'dim',
};
const VOICING_EXTENSION_SUFFIX: Record<string, string> = {
  'None': '', '6th': '6', '7th (dom / m7)': '7', 'Major 7th (M7)': 'maj7', '9th': '9',
};

function voicingChordName(root: string, quality: string, extension: string): string {
  if (quality === 'Minor' && extension === 'Major 7th (M7)') return `${root}m(maj7)`;
  return `${root}${VOICING_QUALITY_SUFFIX[quality] ?? ''}${VOICING_EXTENSION_SUFFIX[extension] ?? ''}`;
}

export interface ChordStaff {
  width: number;
  height: number;
  lines: number[];
  ledgers: { x: number; y: number }[];
  notes: { x: number; y: number }[];
  keySignature: { x: number; y: number; sign: 'sharp' | 'flat' }[];
}

const LETTER_ORDER = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const STAFF_WIDTH = 116;
const STAFF_LINE_GAP = 10;
const BOTTOM_LINE_STEP = LETTER_ORDER.indexOf('E') + 4 * 7;
const TOP_LINE_STEP = BOTTOM_LINE_STEP + 4 * 2;
const STAFF_TOP_Y = 20;
const STAFF_BOTTOM_Y = STAFF_TOP_Y + 4 * STAFF_LINE_GAP;

// Standard treble-clef key signatures for the 12 major keys this app's roots can canonically
// spell as (see ROOT_KEYS/CANONICAL_ROOT_BY_PC below) — sharps/flats always added in this order.
const MAJOR_KEY_SIGNATURES: Record<string, string[]> = {
  C: [],
  G: ['F#'], D: ['F#', 'C#'], A: ['F#', 'C#', 'G#'], E: ['F#', 'C#', 'G#', 'D#'],
  B: ['F#', 'C#', 'G#', 'D#', 'A#'], 'F#': ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
  F: ['Bb'], Bb: ['Bb', 'Eb'], Eb: ['Bb', 'Eb', 'Ab'], Ab: ['Bb', 'Eb', 'Ab', 'Db'], Db: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
};

// Semitone offset of each mode's tonic within its parent major scale (e.g. Dorian is the major
// scale's 2nd degree, a whole step up), used to find the parent major whose key signature this
// mode is notated with. Harmonic minor is notated with natural minor's signature plus an
// explicit accidental on the raised 7th wherever it occurs, not its own signature.
const MODE_PARENT_OFFSET: Record<string, number> = {
  MAJOR: 0, LYDIAN: 5, MIXOLYDIAN: 7, DORIAN: 2, NATURAL_MINOR: 9, HARMONIC_MINOR: 9,
};

const CANONICAL_ROOT_BY_PC: Record<number, string> = {};
ROOT_KEYS.forEach(r => { CANONICAL_ROOT_BY_PC[PITCH_CLASS[r]] = r; });

// The major key whose signature/spelling a given key+scaleType is notated with — e.g. C Dorian
// is notated in Bb major's 2 flats, since C Dorian is the 2nd mode of Bb major and shares all of
// its pitches. Used both to pick the key signature and to decide whether individual chord tones
// should be spelled with sharps or flats (a mode's notes must use its parent's spelling, not
// whatever the mode's own tonic letter would suggest — e.g. C Dorian's notes are Eb/Bb, not D#/A#).
function parentMajorKeyFor(key: string, scaleType: string): string {
  const offset = MODE_PARENT_OFFSET[scaleType] ?? 0;
  const rootPc = PITCH_CLASS[key] ?? 0;
  const parentPc = ((rootPc - offset) % 12 + 12) % 12;
  return CANONICAL_ROOT_BY_PC[parentPc] ?? 'C';
}

export function getKeySignature(key: string, scaleType: string): string[] {
  return MAJOR_KEY_SIGNATURES[parentMajorKeyFor(key, scaleType)] ?? [];
}

export function preferFlatSpelling(key: string, scaleType: string): boolean {
  const parentName = parentMajorKeyFor(key, scaleType);
  return FLAT_TONICS.has(parentName) || parentName.includes('b');
}

// The key/scaleType pair is stored under its ROOT_KEYS canonical spelling (e.g. "F#") purely as
// a lookup key into data.scales — but a mode's actual notated spelling can differ (F# Lydian's
// notes are spelled from Db major's flats, so its tonic reads "Gb" on every chord chip). Use
// this wherever the key is displayed to the user, so the label matches what the chords actually
// show instead of the raw dictionary key.
export function displayKeyName(key: string, scaleType: string): string {
  return noteName(PITCH_CLASS[key] ?? 0, preferFlatSpelling(key, scaleType));
}

// Standard treble-clef vertical placement (in the same letter+octave "step" units as
// diatonicSteps/stepToY) for each accidental that can appear in one of the signatures above.
const KEY_SIG_STEP: Record<string, number> = {
  'F#': 38, 'C#': 35, 'G#': 39, 'D#': 36, 'A#': 33, 'E#': 37, 'B#': 34,
  'Bb': 34, 'Eb': 37, 'Ab': 33, 'Db': 36, 'Gb': 32, 'Cb': 35, 'Fb': 31,
};

function diatonicSteps(notes: string[]): number[] {
  let octave = 4;
  let prevLetter = -1;
  return notes.map(note => {
    const letter = LETTER_ORDER.indexOf(note[0].toUpperCase());
    if (prevLetter !== -1 && letter <= prevLetter) octave++;
    prevLetter = letter;
    return letter + octave * 7;
  });
}

function stepToY(step: number): number {
  return STAFF_BOTTOM_Y - (step - BOTTOM_LINE_STEP) * (STAFF_LINE_GAP / 2);
}

export function buildChordStaff(notes: string[], key: string, scaleType: string): ChordStaff {
  const steps = diatonicSteps(notes);
  const margin = 9;
  const noteWidth = 12;

  const sigLetters = getKeySignature(key, scaleType);
  const sigGlyphSpacing = 8;
  const sigWidth = sigLetters.length ? sigLetters.length * sigGlyphSpacing + 5 : 0;
  const sigSteps = sigLetters.map(l => KEY_SIG_STEP[l]);

  const rawMinY = Math.min(STAFF_TOP_Y, ...steps.map(stepToY), ...sigSteps.map(stepToY));
  const rawMaxY = Math.max(STAFF_BOTTOM_Y, ...steps.map(stepToY), ...sigSteps.map(stepToY));
  const offsetY = margin - rawMinY;
  const height = rawMaxY - rawMinY + noteWidth + margin;

  const lines = [0, 1, 2, 3, 4].map(i => STAFF_TOP_Y + i * STAFF_LINE_GAP + offsetY);

  const usable = STAFF_WIDTH - margin * 2 - noteWidth - sigWidth;
  const noteX = (i: number) => margin + sigWidth + (steps.length > 1 ? (i * usable) / (steps.length - 1) : usable / 2);

  const noteDots = steps.map((step, i) => ({ x: noteX(i), y: stepToY(step) + offsetY - noteWidth / 2 }));

  const ledgers: { x: number; y: number }[] = [];
  steps.forEach((step, i) => {
    const isLinePosition = (step - BOTTOM_LINE_STEP) % 2 === 0;
    if (isLinePosition && (step < BOTTOM_LINE_STEP || step > TOP_LINE_STEP)) {
      ledgers.push({ x: noteX(i) - 2.5, y: stepToY(step) + offsetY });
    }
  });

  const keySignature = sigLetters.map((l, i) => ({
    x: margin + i * sigGlyphSpacing,
    y: stepToY(KEY_SIG_STEP[l]) + offsetY,
    sign: (l.includes('#') ? 'sharp' : 'flat') as 'sharp' | 'flat',
  }));

  return { width: STAFF_WIDTH, height, lines, ledgers, notes: noteDots, keySignature };
}

export interface ProgressionStaffChord {
  cx: number;
  name: string;
  roman: string;
  notes: { x: number; y: number }[];
  ledgers: { x: number; y: number }[];
  labelY: number;
}

export interface ProgressionStaff {
  width: number;
  height: number;
  lines: number[];
  keySignature: { x: number; y: number; sign: 'sharp' | 'flat' }[];
  chords: ProgressionStaffChord[];
}

const PSTAFF_MARGIN = 10;
const PSTAFF_CHORD_GAP = 46;
const PSTAFF_CLEF_WIDTH = 26;
const PSTAFF_LABEL_HEIGHT = 14;

// Same layout math as buildChordStaff, generalized to lay multiple chords out along one
// continuous staff (clef + key signature drawn once) instead of one compact box per chord —
// this is what the full progression's "show music theory" view renders, vs. the single-chord
// mini staff buildChordStaff still serves elsewhere.
export function buildProgressionStaff(chords: ChordBlock[], key: string, scaleType: string): ProgressionStaff {
  const sigLetters = getKeySignature(key, scaleType);
  const sigGlyphSpacing = 8;
  const sigWidth = sigLetters.length ? sigLetters.length * sigGlyphSpacing + 6 : 0;
  const sigSteps = sigLetters.map(l => KEY_SIG_STEP[l]);

  const perChordSteps = chords.map(c => diatonicSteps(c.notes));
  const allSteps = perChordSteps.flat();

  const rawMinY = Math.min(STAFF_TOP_Y, ...allSteps.map(stepToY), ...sigSteps.map(stepToY));
  const rawMaxY = Math.max(STAFF_BOTTOM_Y, ...allSteps.map(stepToY), ...sigSteps.map(stepToY));
  // Reserve PSTAFF_LABEL_HEIGHT of headroom above the highest note of ANY chord, not just the
  // staff itself — a chord voiced higher than the others (e.g. a bass note that lands near the
  // top of its octave) would otherwise land right where a fixed label position sits, and its
  // notehead would paint directly over the chord name text.
  const offsetY = PSTAFF_MARGIN + PSTAFF_LABEL_HEIGHT - rawMinY;
  const height = rawMaxY - rawMinY + 12 + PSTAFF_MARGIN + PSTAFF_LABEL_HEIGHT;

  const lines = [0, 1, 2, 3, 4].map(i => STAFF_TOP_Y + i * STAFF_LINE_GAP + offsetY);

  const chordStartX = PSTAFF_MARGIN + PSTAFF_CLEF_WIDTH + sigWidth;

  const keySignature = sigLetters.map((l, i) => ({
    x: PSTAFF_MARGIN + PSTAFF_CLEF_WIDTH + i * sigGlyphSpacing,
    y: stepToY(KEY_SIG_STEP[l]) + offsetY,
    sign: (l.includes('#') ? 'sharp' : 'flat') as 'sharp' | 'flat',
  }));

  const staffChords: ProgressionStaffChord[] = chords.map((chord, i) => {
    const cx = chordStartX + i * PSTAFF_CHORD_GAP + PSTAFF_CHORD_GAP / 2;
    const steps = perChordSteps[i];
    const notes = steps.map(step => ({ x: cx, y: stepToY(step) + offsetY }));
    const ledgers: { x: number; y: number }[] = [];
    steps.forEach(step => {
      const isLinePosition = (step - BOTTOM_LINE_STEP) % 2 === 0;
      if (isLinePosition && (step < BOTTOM_LINE_STEP || step > TOP_LINE_STEP)) {
        ledgers.push({ x: cx - 9, y: stepToY(step) + offsetY });
      }
    });
    const topNoteY = Math.min(...notes.map(n => n.y));
    const labelY = topNoteY - 10;
    return { cx, name: chord.name, roman: chord.roman, notes, ledgers, labelY };
  });

  const width = chordStartX + chords.length * PSTAFF_CHORD_GAP + PSTAFF_MARGIN;

  return { width, height, lines, keySignature, chords: staffChords };
}

export function applyVoicingToChord(chord: ChordBlock, quality: string, extension: string): ChordBlock {
  const root = rootOfChordName(chord.name);
  const preferFlat = root.includes('b');
  return {
    ...chord,
    name: voicingChordName(root, quality, extension),
    notes: buildVoicingNotes(root, quality, extension, preferFlat),
  };
}

export function synthCustomBlock(
  root: string,
  quality: string,
  extension: string,
  roman: string,
  functionLabel: string,
  desc: string,
  tension: number,
  preferFlat: boolean
): ChordBlock {
  const name = voicingChordName(root, quality, extension);
  const notes = buildVoicingNotes(root, quality, extension, preferFlat);
  return {
    name,
    tag: roman || 'sub',
    roman,
    color: colorForTension(tension),
    functionLabel,
    notes,
    scaleLabel: 'Substitution',
    desc,
    degree: 'SUBSTITUTION',
    scaleKey: '',
    tension,
  };
}

export function generateTheoryGroups(data: RawChordData, progression: Progression, chordIndex: number): TheoryGroup[] {
  const keyPc = PITCH_CLASS[progression.key] ?? 0;
  const isMinor = progression.scaleType.includes('MINOR');
  const preferFlat = preferFlatSpelling(progression.key, progression.scaleType);

  const darkerRows: TheoryGroupRow[] = isMinor ? [
    (() => {
      const root = noteName(keyPc + 1, true);
      const chord = synthCustomBlock(root, 'Major', 'Major 7th (M7)', '♭II', 'Neapolitan', 'a dark, dramatic slide in from a half-step above', 0.6, true);
      return { name: chord.name, roman: '♭II', notes: chord.notes, sub: 'Neapolitan chord — a dramatic slide in from a half-step above', chord, tension: 0.6 };
    })(),
    (() => {
      const root = noteName(keyPc + 5, true);
      const chord = synthCustomBlock(root, 'Minor', '7th (dom / m7)', 'iv', 'Minor subdominant', 'the minor subdominant — softer, sadder', 0.45, true);
      return { name: chord.name, roman: 'iv', notes: chord.notes, sub: 'the minor subdominant — deeper minor mood', chord, tension: 0.45 };
    })(),
    (() => {
      const root = noteName(keyPc + 10, true);
      const chord = synthCustomBlock(root, 'Minor', '7th (dom / m7)', 'v', 'Minor dominant', 'unresolved minor drift', 0.52, true);
      return { name: chord.name, roman: 'v', notes: chord.notes, sub: 'a step further into shadow — unresolving drift', chord, tension: 0.52 };
    })(),
  ] : [
    (() => {
      const root = noteName(keyPc + 8, true);
      const chord = synthCustomBlock(root, 'Major', 'Major 7th (M7)', '♭VI', 'Flat submediant', `borrowed from ${progression.key} minor — the cinematic shadow`, 0.5, true);
      return { name: chord.name, roman: '♭VI', notes: chord.notes, sub: `borrowed from ${progression.key} minor — the cinematic shadow`, chord, tension: 0.5 };
    })(),
    (() => {
      const root = noteName(keyPc + 5, true);
      const chord = synthCustomBlock(root, 'Minor', '7th (dom / m7)', 'iv', 'Minor subdominant', 'the minor subdominant — softer, sadder', 0.42, true);
      return { name: chord.name, roman: 'iv', notes: chord.notes, sub: 'the minor subdominant — softer, sadder', chord, tension: 0.42 };
    })(),
    (() => {
      const root = noteName(keyPc + 3, true);
      const chord = synthCustomBlock(root, 'Major', 'Major 7th (M7)', '♭III', 'Flat mediant', 'a step further out — cooler, more remote', 0.58, true);
      return { name: chord.name, roman: '♭III', notes: chord.notes, sub: 'a step further out — cooler, more remote', chord, tension: 0.58 };
    })(),
  ];

  const tensionRows: TheoryGroupRow[] = [
    (() => {
      const targetNote = noteName(keyPc + 7, preferFlat);
      const root = noteName(keyPc + 2, preferFlat);
      const chord = synthCustomBlock(root, 'Major', '7th (dom / m7)', 'V7/V', 'Secondary dominant', `aimed at ${targetNote}7 — sharpens the approach`, 0.82, preferFlat);
      return { name: chord.name, roman: 'V7/V', notes: chord.notes, sub: `aimed at ${targetNote}7 — sharpens the approach`, chord, tension: 0.82 };
    })(),
    (() => {
      const targetNote = noteName(keyPc + (isMinor ? 3 : 9), preferFlat);
      const root = noteName(keyPc + 4, preferFlat);
      const chord = synthCustomBlock(root, 'Major', '7th (dom / m7)', 'V7/vi', 'Secondary dominant', `aimed at ${targetNote}m7 — makes it feel arrived at`, 0.88, preferFlat);
      return { name: chord.name, roman: 'V7/vi', notes: chord.notes, sub: `aimed at ${targetNote}m7 — makes it feel arrived at`, chord, tension: 0.88 };
    })(),
    (() => {
      const root = noteName(keyPc + 1, true);
      const chord = synthCustomBlock(root, 'Major', '7th (dom / m7)', 'subV7', 'Tritone substitute', 'a tritone substitute — slides in sideways', 0.95, true);
      return { name: chord.name, roman: 'subV7', notes: chord.notes, sub: 'a tritone substitute — slides in sideways', chord, tension: 0.95 };
    })(),
  ];

  const dreamierRows: TheoryGroupRow[] = [
    (() => {
      const root = noteName(keyPc + 5, preferFlat);
      const chord = synthCustomBlock(root, 'Major', 'Major 7th (M7)', isMinor ? 'IV' : 'IVmaj7', 'Subdominant', 'floats rather than resolving', 0.3, preferFlat);
      return { name: chord.name, roman: isMinor ? 'IV' : 'IV', notes: chord.notes, sub: 'floats rather than resolving', chord, tension: 0.3 };
    })(),
    (() => {
      const root = noteName(keyPc, preferFlat);
      const chord = synthCustomBlock(root, isMinor ? 'Minor' : 'Major', '9th', isMinor ? 'im9' : 'Imaj9', 'Tonic extension', 'the same home with more air in it', 0.18, preferFlat);
      return { name: chord.name, roman: isMinor ? 'im9' : 'Imaj9', notes: chord.notes, sub: 'the same home with more air in it', chord, tension: 0.18 };
    })(),
    (() => {
      const root = noteName(keyPc + (isMinor ? 3 : 4), preferFlat);
      const chord = synthCustomBlock(root, isMinor ? 'Major' : 'Minor', '7th (dom / m7)', isMinor ? '♭III' : 'iii', 'Mediant', 'wistful, halfway between home and away', 0.35, preferFlat);
      return { name: chord.name, roman: isMinor ? '♭III' : 'iii', notes: chord.notes, sub: 'wistful, halfway between home and away', chord, tension: 0.35 };
    })(),
  ];

  const resolveRows: TheoryGroupRow[] = [
    (() => {
      const root = noteName(keyPc, preferFlat);
      const chord = synthCustomBlock(root, isMinor ? 'Minor' : 'Major', isMinor ? 'None' : 'Major 7th (M7)', isMinor ? 'i' : 'I', 'Tonic', 'full resolution — the sense of arriving', 0.05, preferFlat);
      return { name: chord.name, roman: isMinor ? 'i' : 'I', notes: chord.notes, sub: 'full resolution — the sense of arriving', chord, tension: 0.05 };
    })(),
    (() => {
      const root = noteName(keyPc + 7, preferFlat);
      const chord = synthCustomBlock(root, 'Major', '7th (dom / m7)', 'V7', 'Dominant', 'the pull that makes home feel earned', 1.0, preferFlat);
      return { name: chord.name, roman: 'V7', notes: chord.notes, sub: 'the pull that makes home feel earned', chord, tension: 1.0 };
    })(),
    (() => {
      const root = noteName(keyPc + (isMinor ? 8 : 9), preferFlat);
      const chord = synthCustomBlock(root, isMinor ? 'Major' : 'Minor', '7th (dom / m7)', isMinor ? '♭VI' : 'vi', 'Submediant', 'a soft landing instead of a full stop', 0.28, preferFlat);
      return { name: chord.name, roman: isMinor ? '♭VI' : 'vi', notes: chord.notes, sub: 'a soft landing instead of a full stop', chord, tension: 0.28 };
    })(),
  ];

  return [
    { name: 'Darker', sub: 'heavier, more shadow', tension: 0.55, rows: darkerRows },
    { name: 'More tension', sub: 'sharper pull forward', tension: 0.85, rows: tensionRows },
    { name: 'Dreamier', sub: 'softer, more air', tension: 0.3, rows: dreamierRows },
    { name: 'Resolve home', sub: 'settles back to center', tension: 0.05, rows: resolveRows },
  ];
}

export function generateBorrowedChords(data: RawChordData, progression: Progression, chordIndex: number): BorrowedChordRow[] {
  const keyPc = PITCH_CLASS[progression.key] ?? 0;
  const isMinor = progression.scaleType.includes('MINOR');
  const preferFlat = preferFlatSpelling(progression.key, progression.scaleType);
  const chords = progression.chords;

  if (isMinor) {
    // Parallel Major borrowed chords
    const c1 = chords[0]?.name || 'chord 1';
    const c2 = chords[1]?.name || 'chord 2';
    const c3 = chords[2]?.name || 'chord 3';
    const c4 = chords[3]?.name || 'chord 4';

    const b1 = synthCustomBlock(noteName(keyPc, preferFlat), 'Major', 'None', 'I', 'Major tonic', 'same root, turned bright', 0.2, preferFlat);
    const b2 = synthCustomBlock(noteName(keyPc + 5, preferFlat), 'Major', 'None', 'IV', 'Major subdominant', 'the Dorian lift, sunny and open', 0.35, preferFlat);
    const b3 = synthCustomBlock(noteName(keyPc + 9, preferFlat), 'Minor', 'None', 'vi', 'Submediant', 'melodic lift upward', 0.4, preferFlat);
    const b4 = synthCustomBlock(noteName(keyPc + 11, preferFlat), 'Diminished', 'None', 'vii°', 'Leading tone', 'classical harmonic pull', 0.55, preferFlat);

    return [
      { name: b1.name, sub: `in place of ${c1} · same root, turned bright`, roman: 'I', notes: b1.notes, chord: b1, tension: 0.2 },
      { name: b2.name, sub: `in place of ${c2} · the Dorian lift, sunny and open`, roman: 'IV', notes: b2.notes, chord: b2, tension: 0.35 },
      { name: b3.name, sub: `in place of ${c3} · melodic lift upward`, roman: 'vi', notes: b3.notes, chord: b3, tension: 0.4 },
      { name: b4.name, sub: `in place of ${c4} · classical harmonic pull`, roman: 'vii°', notes: b4.notes, chord: b4, tension: 0.55 },
    ];
  }

  // Parallel Minor borrowed chords
  const c1 = chords[0]?.name || 'chord 1';
  const c2 = chords[1]?.name || 'chord 2';
  const c3 = chords[2]?.name || 'chord 3';
  const c4 = chords[3]?.name || 'chord 4';

  const b1 = synthCustomBlock(noteName(keyPc, preferFlat), 'Minor', 'None', 'i', 'Tonic minor', 'same root, turned sad', 0.3, preferFlat);
  const b2 = synthCustomBlock(noteName(keyPc + 5, true), 'Minor', 'None', 'iv', 'Minor subdominant', 'the lift, but heavier', 0.4, true);
  const b3 = synthCustomBlock(noteName(keyPc + 8, true), 'Major', 'None', '♭VI', 'Flat submediant', 'big and cinematic', 0.45, true);
  const b4 = synthCustomBlock(noteName(keyPc + 10, true), 'Major', 'None', '♭VII', 'Flat subtonic', 'lands sideways, not home', 0.5, true);

  return [
    { name: b1.name, sub: `in place of ${c1} · same root, turned sad`, roman: 'i', notes: b1.notes, chord: b1, tension: 0.3 },
    { name: b2.name, sub: `in place of ${c2} · the lift, but heavier`, roman: 'iv', notes: b2.notes, chord: b2, tension: 0.4 },
    { name: b3.name, sub: `in place of ${c3} · big and cinematic`, roman: '♭VI', notes: b3.notes, chord: b3, tension: 0.45 },
    { name: b4.name, sub: `in place of ${c4} · lands sideways, not home`, roman: '♭VII', notes: b4.notes, chord: b4, tension: 0.5 },
  ];
}

export function generateAlternatives(data: RawChordData, progression: Progression, chordIndex: number): Alternative[] {
  const groups = generateTheoryGroups(data, progression, chordIndex);
  return groups.map(g => {
    const primaryRow = g.rows[0];
    return {
      label: g.name,
      sub: g.sub,
      chord: primaryRow.chord,
      functionCaption: `${primaryRow.roman} · ${primaryRow.notes.join(' · ')}`,
      rationale: primaryRow.sub,
    };
  });
}


export type ShareDevice = 'm8' | 'circuit';

// Same companion-helper URLs and localhost dev overrides as the original app's
// openDeviceLink. The old encoder used a `human-engine` package (with full MIDI voicings
// and humanize state) that isn't part of this rebuild; this keeps the same "?p=" fallback
// query scheme it used when that package wasn't available — a plain '+'-joined chord list.
const DEVICE_BASE_URL: Record<ShareDevice, string> = {
  m8: 'https://warmsynths.github.io/hypersyn-chord-helper/',
  circuit: 'https://warmsynths.github.io/circuit-chords/',
};

const DEVICE_LOCAL_PORT: Record<ShareDevice, number> = { m8: 43303, circuit: 43302 };

export function buildDeviceShareUrl(progression: Progression, device: ShareDevice, order?: number[]): string {
  let base = DEVICE_BASE_URL[device];
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    base = `http://localhost:${DEVICE_LOCAL_PORT[device]}/`;
  }
  const chords = (order && order.length > 0)
    ? order.map(i => progression.chords[i]).filter((c): c is ChordBlock => Boolean(c))
    : progression.chords;
  const chordParam = chords.map(c => encodeURIComponent(c.name)).join('+');
  return `${base}?p=${chordParam}`;
}
