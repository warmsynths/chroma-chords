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
  grain: number;
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
}

export interface Alternative {
  label: string;
  sub: string;
  chord: ChordBlock;
  functionCaption: string;
  rationale: string;
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
};

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
  MAJOR: { TONIC: 'I', SUPERTONIC: 'ii', MEDIANT: 'iii', SUBDOMINANT: 'IV', DOMINANT: 'V', SUBMEDIANT: 'vi', 'LEADING-TONE': 'vii°' },
  NATURAL_MINOR: { TONIC: 'i', SUPERTONIC: 'ii°', MEDIANT: 'III', SUBDOMINANT: 'iv', DOMINANT: 'v', SUBMEDIANT: 'VI', SUBTONIC: 'VII' },
  HARMONIC_MINOR: { TONIC: 'i', SUPERTONIC: 'ii°', MEDIANT: 'III+', SUBDOMINANT: 'iv', DOMINANT: 'V', SUBMEDIANT: 'VI', 'LEADING-TONE': 'vii°' },
  MELODIC_MINOR: { TONIC: 'i', SUPERTONIC: 'ii', MEDIANT: 'III+', SUBDOMINANT: 'IV', DOMINANT: 'V', SUBMEDIANT: 'vi°', 'LEADING-TONE': 'vii°' },
  DORIAN: { TONIC: 'i', SUPERTONIC: 'ii', MEDIANT: 'III', SUBDOMINANT: 'IV', DOMINANT: 'v', SUBMEDIANT: 'vi°', SUBTONIC: 'VII' },
  MIXOLYDIAN: { TONIC: 'I', SUPERTONIC: 'ii', MEDIANT: 'iii°', SUBDOMINANT: 'IV', DOMINANT: 'v', SUBMEDIANT: 'vi', SUBTONIC: 'VII' },
  LYDIAN: { TONIC: 'I', SUPERTONIC: 'II', MEDIANT: 'iii', SUBDOMINANT: 'iv°', DOMINANT: 'V', SUBMEDIANT: 'vi', 'LEADING-TONE': 'vii' },
};

const SCALE_LABEL: Record<string, string> = {
  MAJOR: 'Ionian',
  NATURAL_MINOR: 'Aeolian',
  HARMONIC_MINOR: 'Harmonic minor',
  MELODIC_MINOR: 'Melodic minor',
  DORIAN: 'Dorian',
  MIXOLYDIAN: 'Mixolydian',
  LYDIAN: 'Lydian',
};

const GENRE_SCALE: Record<string, string> = {
  'Pop': 'MAJOR',
  'Rock': 'MAJOR',
  'Gospel': 'MAJOR',
  'Indie/Folk': 'MAJOR',
  'Lo-fi/Chill': 'DORIAN',
  'Jazz-ish': 'DORIAN',
  'R&B/Soul': 'MIXOLYDIAN',
  'House/Dance': 'MIXOLYDIAN',
  'Synthwave': 'LYDIAN',
  'Cinematic': 'LYDIAN',
};

const MOOD_SHIFT: Record<string, string | null> = {
  Uplifting: null,
  Melancholy: 'NATURAL_MINOR',
  Dreamy: null,
  Tense: 'HARMONIC_MINOR',
  Warm: null,
  Nostalgic: 'NATURAL_MINOR',
};

const MOOD_DEGREE_BIAS: Record<string, string[]> = {
  Uplifting: ['DOMINANT', 'SUBDOMINANT', 'SUBMEDIANT'],
  Melancholy: ['SUBMEDIANT', 'SUBTONIC', 'SUPERTONIC'],
  Dreamy: ['MEDIANT', 'SUBDOMINANT', 'SUPERTONIC'],
  Tense: ['DOMINANT', 'LEADING-TONE', 'SUPERTONIC'],
  Warm: ['SUBDOMINANT', 'MEDIANT', 'SUBMEDIANT'],
  Nostalgic: ['SUBMEDIANT', 'MEDIANT', 'DOMINANT'],
};

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
  ],
  NATURAL_MINOR: [
    { degrees: ['TONIC', 'SUBMEDIANT', 'MEDIANT', 'SUBTONIC'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUBTONIC', 'MEDIANT'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'SUBTONIC', 'DOMINANT'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBTONIC', 'SUBMEDIANT'] },
  ],
  HARMONIC_MINOR: [
    { degrees: ['TONIC', 'SUBMEDIANT', 'DOMINANT', 'SUBDOMINANT'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'DOMINANT', 'SUBMEDIANT'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'SUPERTONIC', 'DOMINANT'] },
  ],
  DORIAN: [
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUBTONIC', 'SUPERTONIC'] },
    { degrees: ['TONIC', 'SUBTONIC', 'SUBDOMINANT', 'SUPERTONIC'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBDOMINANT', 'SUBTONIC'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUPERTONIC', 'SUBTONIC'] },
  ],
  MIXOLYDIAN: [
    { degrees: ['TONIC', 'SUBTONIC', 'SUBDOMINANT', 'SUBMEDIANT'] },
    { degrees: ['TONIC', 'SUBDOMINANT', 'SUBTONIC', 'SUPERTONIC'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'SUBDOMINANT', 'SUBTONIC'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBTONIC', 'SUBDOMINANT'] },
  ],
  LYDIAN: [
    { degrees: ['TONIC', 'SUPERTONIC', 'SUBMEDIANT', 'DOMINANT'] },
    { degrees: ['TONIC', 'DOMINANT', 'SUPERTONIC', 'SUBMEDIANT'] },
    { degrees: ['TONIC', 'SUBMEDIANT', 'DOMINANT', 'SUPERTONIC'] },
    { degrees: ['TONIC', 'SUPERTONIC', 'DOMINANT', 'SUBMEDIANT'] },
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

const PROGRESSION_LENGTH = 4;

// Fallback for scale/mode combos without a curated template bank entry: a biased random
// walk over the diatonic neighbor graph encoded in the chord data's next_chord_options.
// Prefers a degree not already used in this progression at every step (falling back to
// "not the immediately previous degree" only when truly no fresh option exists), so this
// never lands on the same chord twice in a row and rarely repeats one at all.
function walkDegreeGraph(scale: ScaleProfile, scaleKey: string, degreeOrder: string[], bias: string[]): string[] {
  const chosenDegrees: string[] = ['TONIC'];
  let currentDegree = 'TONIC';
  for (let i = 1; i < PROGRESSION_LENGTH; i++) {
    const rawOptions = (scale.degrees[currentDegree]?.next_chord_options || [])
      .filter(o => o.nodeId.startsWith(`${scaleKey}_`))
      .map(o => o.nodeId.replace(`${scaleKey}_`, ''))
      .filter(d => degreeOrder.includes(d));

    const fresh = rawOptions.filter(d => !chosenDegrees.includes(d));
    let options = fresh.length ? fresh : rawOptions.filter(d => d !== currentDegree);

    if (!options.length) {
      const unused = degreeOrder.filter(d => d !== currentDegree && !chosenDegrees.includes(d));
      options = unused.length ? unused : degreeOrder.filter(d => d !== currentDegree);
    }
    if (!options.length) options = degreeOrder;

    let pool = options;
    if (i === PROGRESSION_LENGTH - 1) {
      const resolving = options.filter(d => d === 'TONIC' || d === 'DOMINANT');
      if (resolving.length) pool = resolving;
    } else {
      const biased = options.filter(d => bias.includes(d));
      if (biased.length && Math.random() < 0.6) pool = biased;
    }

    const pick = pool[Math.floor(Math.random() * pool.length)];
    currentDegree = pick;
    chosenDegrees.push(pick);
  }
  return chosenDegrees;
}

function noteName(pc: number, preferFlat: boolean): string {
  const idx = ((pc % 12) + 12) % 12;
  return preferFlat ? NOTE_FLAT[idx] : NOTE_SHARP[idx];
}

// Chord names in the source data are uppercase with sharps as '#' but flats written as a
// literal 'B' after the root letter (e.g. "BBMAJ" = Bb major, "ABMAJ" = Ab major) — not
// standard "Bb"/"b" notation, so this can't be a simple case-insensitive regex match.
function parseChordSymbol(symbol: string): { root: string; quality: keyof typeof QUALITY_INTERVALS } {
  const first = symbol[0]?.toUpperCase();
  let root = 'C';
  let rest = symbol;
  if (first && /[A-G]/.test(first)) {
    if (symbol[1] === 'B') {
      root = `${first}b`;
      rest = symbol.slice(2);
    } else if (symbol[1] === '#') {
      root = `${first}#`;
      rest = symbol.slice(2);
    } else {
      root = first;
      rest = symbol.slice(1);
    }
  }
  rest = rest.toLowerCase();
  let quality: keyof typeof QUALITY_INTERVALS = 'maj';
  if (rest.includes('maj7')) quality = 'maj7';
  else if (rest.includes('min7') || rest.includes('m7')) quality = 'min7';
  else if (rest.includes('dim7')) quality = 'dim7';
  else if (rest.includes('dim')) quality = 'dim';
  else if (rest.includes('aug')) quality = 'aug';
  else if (rest.includes('sus')) quality = 'sus4';
  else if (rest === '7') quality = 'dom7';
  else if (rest.includes('min') || rest === 'm') quality = 'min';
  else quality = 'maj';
  return { root, quality };
}

export function notesForSymbol(symbol: string, preferFlat: boolean): string[] {
  const { root, quality } = parseChordSymbol(symbol);
  const rootPc = PITCH_CLASS[root] ?? 0;
  const intervals = QUALITY_INTERVALS[quality];
  return intervals.map(iv => noteName(rootPc + iv, preferFlat));
}

export async function loadChordData(): Promise<RawChordData> {
  const res = await fetch('./chord_voyager_data.json');
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

function injectModes(data: RawChordData) {
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

function colorForTension(tension: number): string {
  const t = Math.max(0, Math.min(1, tension));
  const lightness = (0.42 - t * 0.05).toFixed(2);
  const chroma = (0.11 + t * 0.07).toFixed(2);
  const hue = Math.round(Math.max(40, 187 - t * 140));
  return `oklch(${lightness} ${chroma} ${hue})`;
}

function grainForTension(tension: number): number {
  return Math.max(0.06, Math.min(0.2, 0.08 + tension * 0.12));
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
    grain: grainForTension(tension),
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
}

export function generateProgression(data: RawChordData, genre: string, mood: string, overrides?: ProgressionOverrides): Progression {
  const baseScaleType = GENRE_SCALE[genre] || 'MAJOR';
  const shift = MOOD_SHIFT[mood];
  const scaleType = overrides?.scaleType || (shift && (baseScaleType === 'MAJOR') ? shift : baseScaleType);

  let root = overrides?.key && ROOT_KEYS.includes(overrides.key) ? overrides.key : pickOne(ROOT_KEYS)!;

  let scaleKey = `${root}_${scaleType}`;
  if (!data.scales[scaleKey]) {
    root = 'C';
    scaleKey = `${root}_${scaleType}`;
  }
  const scale = data.scales[scaleKey];
  const preferFlat = FLAT_TONICS.has(root) || root.includes('b');

  const degreeOrder = Object.keys(scale.degrees);
  const bias = MOOD_DEGREE_BIAS[mood] || [];

  const templates = PROGRESSION_TEMPLATES[scaleType] || [];
  const validTemplates = templates.filter(t => t.degrees.every(d => degreeOrder.includes(d)));

  const chosenDegrees = validTemplates.length
    ? pickWeighted(validTemplates, t => degreeBiasWeight(t, bias)).degrees
    : walkDegreeGraph(scale, scaleKey, degreeOrder, bias);

  const chords = chosenDegrees.map(degree => buildChordBlock(scaleKey, degree, scale, preferFlat));

  const bpmBase: Record<string, number> = {
    Pop: 100, Rock: 118, Gospel: 84, 'Indie/Folk': 92, 'Lo-fi/Chill': 76,
    'Jazz-ish': 96, 'R&B/Soul': 88, 'House/Dance': 124, Synthwave: 108, Cinematic: 72,
  };
  let bpm = bpmBase[genre] || 92;
  if (mood === 'Tense') bpm += 6;
  if (mood === 'Dreamy' || mood === 'Melancholy') bpm -= 6;

  return { genre, mood, key: root, scaleType, bpm, chords };
}

// Each category offers several real candidate degrees rather than one fixed target, so
// re-opening the swap sheet on the same chord doesn't always surface the same four chords.
function pickDegreeExcluding(candidates: string[], degreeOrder: string[], exclude: string): string | undefined {
  const available = candidates.filter(d => degreeOrder.includes(d));
  const preferred = available.filter(d => d !== exclude);
  return pickOne(preferred.length ? preferred : available);
}

const CHORD_SUFFIX: Record<string, string> = {
  maj: '', min: 'm', dim: 'dim', aug: 'aug', dom7: '7', min7: 'm7', maj7: 'maj7', dim7: 'dim7', sus4: 'sus4',
};

// The source data only has NATURAL_MINOR scales for a handful of keys (no flat-major keys),
// so borrowing a real parallel-mode chord isn't always possible. Synthesize a plausible
// borrowed chord directly by transposition instead of leaving "Darker" with no option.
function synthBorrowedBlock(root: string, semitones: number, quality: keyof typeof QUALITY_INTERVALS, functionLabel: string, roman: string, tag: string, preferFlat: boolean): ChordBlock {
  const rootPc = (PITCH_CLASS[root] ?? 0) + semitones;
  const chordRoot = noteName(rootPc, preferFlat);
  const name = `${chordRoot}${CHORD_SUFFIX[quality]}`;
  const notes = QUALITY_INTERVALS[quality].map(iv => noteName(rootPc + iv, preferFlat));
  const tension = 0.3;
  return {
    name, tag, roman, color: colorForTension(tension), grain: grainForTension(tension),
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

// Applying a quality/extension in the swap sheet's "Adjust voicing" panel used to only
// preview the sound — it never touched the actual progression, so the change vanished the
// moment the loop moved on or anything else re-rendered. This bakes the picked quality/
// extension into a real ChordBlock (new name + notes, everything else — degree, scaleKey,
// color, function, etc. — carried over) so the caller can persist it into the progression.
export function applyVoicingToChord(chord: ChordBlock, quality: string, extension: string): ChordBlock {
  const root = rootOfChordName(chord.name);
  const preferFlat = root.includes('b');
  return {
    ...chord,
    name: voicingChordName(root, quality, extension),
    notes: buildVoicingNotes(root, quality, extension, preferFlat),
  };
}

export function generateAlternatives(data: RawChordData, progression: Progression, chordIndex: number): Alternative[] {
  const chord = progression.chords[chordIndex];
  const scale = data.scales[chord.scaleKey];
  const degreeOrder = Object.keys(scale.degrees);
  const preferFlat = FLAT_TONICS.has(progression.key) || progression.key.includes('b');
  const results: Alternative[] = [];

  // Darker — a borrowed chord from the parallel mode, varying which degree gets borrowed.
  const parallelType = progression.scaleType.includes('MINOR') ? 'MAJOR' : 'NATURAL_MINOR';
  const parallelKey = `${progression.key}_${parallelType}`;
  const parallelScale = data.scales[parallelKey];
  const borrowCandidates = parallelType === 'NATURAL_MINOR' ? ['SUBMEDIANT', 'MEDIANT', 'SUBDOMINANT'] : ['SUBDOMINANT', 'SUBMEDIANT'];
  if (parallelScale) {
    const borrowedDegree = pickDegreeExcluding(borrowCandidates, Object.keys(parallelScale.degrees), chord.degree);
    if (borrowedDegree) {
      const block = buildChordBlock(parallelKey, borrowedDegree, parallelScale, preferFlat);
      results.push({
        label: 'Darker',
        sub: 'heavier, more shadow',
        chord: block,
        functionCaption: `Borrowed · ${block.notes.join(' · ')}`,
        rationale: `A borrowed chord from the parallel ${parallelType === 'NATURAL_MINOR' ? 'minor' : 'major'} — it darkens the color with an unexpected shadow.`,
      });
    }
  } else {
    const block = parallelType === 'NATURAL_MINOR'
      ? synthBorrowedBlock(progression.key, 8, 'maj', 'Submediant', 'bVI', 'hold', preferFlat)
      : synthBorrowedBlock(progression.key, 5, 'maj', 'Subdominant', 'IV', 'lift', preferFlat);
    results.push({
      label: 'Darker',
      sub: 'heavier, more shadow',
      chord: block,
      functionCaption: `Borrowed · ${block.notes.join(' · ')}`,
      rationale: `A borrowed chord — it darkens the color with a shadow pulled from outside the current key.`,
    });
  }

  // More tension — usually the dominant family, but occasionally reach into the harmonic-minor
  // dominant (a raised leading tone) when we're in natural minor, for extra bite.
  let tensionScaleKey = chord.scaleKey;
  let tensionScale = scale;
  if (progression.scaleType === 'NATURAL_MINOR' && Math.random() < 0.5) {
    const hmKey = `${progression.key}_HARMONIC_MINOR`;
    const hmScale = data.scales[hmKey];
    if (hmScale?.degrees.DOMINANT) {
      tensionScaleKey = hmKey;
      tensionScale = hmScale;
    }
  }
  const tensionDegree = pickDegreeExcluding(['DOMINANT', 'LEADING-TONE', 'SUPERTONIC'], Object.keys(tensionScale.degrees), chord.degree);
  if (tensionDegree) {
    const block = buildChordBlock(tensionScaleKey, tensionDegree, tensionScale, preferFlat);
    results.push({
      label: 'More tension',
      sub: 'sharper pull forward',
      chord: block,
      functionCaption: `${block.functionLabel} · ${block.notes.join(' · ')}`,
      rationale: `Aimed at the ${block.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`,
    });
  }

  // Dreamier — a softer, non-resolving degree.
  const dreamierDegree = pickDegreeExcluding(['SUBDOMINANT', 'MEDIANT', 'SUBMEDIANT'], degreeOrder, chord.degree);
  if (dreamierDegree) {
    const block = buildChordBlock(chord.scaleKey, dreamierDegree, scale, preferFlat);
    results.push({
      label: 'Dreamier',
      sub: 'softer, more air',
      chord: block,
      functionCaption: `${block.functionLabel} · ${block.notes.join(' · ')}`,
      rationale: `Soft and airy — it floats rather than resolving.`,
    });
  }

  // Resolve home — always the tonic.
  if (degreeOrder.includes('TONIC')) {
    const block = buildChordBlock(chord.scaleKey, 'TONIC', scale, preferFlat);
    results.push({
      label: 'Resolve home',
      sub: 'settles back to center',
      chord: block,
      functionCaption: `${block.functionLabel} · ${block.notes.join(' · ')}`,
      rationale: `Returns to the tonic — full resolution, the sense of arriving home.`,
    });
  }

  return results;
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

export function buildDeviceShareUrl(progression: Progression, device: ShareDevice): string {
  let base = DEVICE_BASE_URL[device];
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    base = `http://localhost:${DEVICE_LOCAL_PORT[device]}/`;
  }
  const chordParam = progression.chords.map(c => encodeURIComponent(c.name)).join('+');
  return `${base}?p=${chordParam}`;
}
