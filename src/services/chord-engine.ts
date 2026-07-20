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

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function noteName(pc: number, preferFlat: boolean): string {
  const idx = ((pc % 12) + 12) % 12;
  return preferFlat ? NOTE_FLAT[idx] : NOTE_SHARP[idx];
}

function parseChordSymbol(symbol: string): { root: string; quality: keyof typeof QUALITY_INTERVALS } {
  const m = symbol.match(/^[A-Ga-g][#b]?/);
  const rootRaw = m ? m[0] : 'C';
  const root = rootRaw[0].toUpperCase() + rootRaw.slice(1);
  const rest = symbol.slice(rootRaw.length).toLowerCase();
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

  const keyIndex = (hashString(genre) + hashString(mood) * 7) % ROOT_KEYS.length;
  let root = overrides?.key && ROOT_KEYS.includes(overrides.key) ? overrides.key : ROOT_KEYS[keyIndex];

  let scaleKey = `${root}_${scaleType}`;
  if (!data.scales[scaleKey]) {
    root = 'C';
    scaleKey = `${root}_${scaleType}`;
  }
  const scale = data.scales[scaleKey];
  const preferFlat = FLAT_TONICS.has(root) || root.includes('b');

  const degreeOrder = Object.keys(scale.degrees);
  const bias = MOOD_DEGREE_BIAS[mood] || [];
  const rngSeed = hashString(`${genre}:${mood}:${Date.now() % 997}`);
  let seed = rngSeed;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) >>> 0;
    return (seed >>> 8) / 0xffffff;
  };

  const chosenDegrees: string[] = ['TONIC'];
  let currentDegree = 'TONIC';
  for (let i = 1; i < 5; i++) {
    const options = scale.degrees[currentDegree].next_chord_options
      .filter(o => o.nodeId.startsWith(`${scaleKey}_`))
      .map(o => o.nodeId.replace(`${scaleKey}_`, ''))
      .filter(d => degreeOrder.includes(d));

    if (!options.length) {
      currentDegree = 'TONIC';
      chosenDegrees.push(currentDegree);
      continue;
    }

    let pool = options;
    if (i === 4) {
      const resolving = options.filter(d => d === 'TONIC' || d === 'DOMINANT');
      if (resolving.length) pool = resolving;
    } else {
      const biased = options.filter(d => bias.includes(d));
      if (biased.length && rand() < 0.6) pool = biased;
    }

    const pick = pool[Math.floor(rand() * pool.length)];
    currentDegree = pick;
    chosenDegrees.push(pick);
  }

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

interface AltTemplate {
  label: string;
  sub: string;
  pickDegree: (current: string, degreeOrder: string[]) => string | null;
  borrow?: boolean;
}

const ALT_TEMPLATES: AltTemplate[] = [
  {
    label: 'Darker',
    sub: 'heavier, more shadow',
    pickDegree: () => null,
    borrow: true,
  },
  {
    label: 'More tension',
    sub: 'sharper pull forward',
    pickDegree: (_current, order) => order.includes('DOMINANT') ? 'DOMINANT' : (order.includes('LEADING-TONE') ? 'LEADING-TONE' : null),
  },
  {
    label: 'Dreamier',
    sub: 'softer, more air',
    pickDegree: (_current, order) => order.includes('SUBDOMINANT') ? 'SUBDOMINANT' : (order.includes('MEDIANT') ? 'MEDIANT' : null),
  },
  {
    label: 'Resolve home',
    sub: 'settles back to center',
    pickDegree: () => 'TONIC',
  },
];

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

export function generateAlternatives(data: RawChordData, progression: Progression, chordIndex: number): Alternative[] {
  const chord = progression.chords[chordIndex];
  const scale = data.scales[chord.scaleKey];
  const degreeOrder = Object.keys(scale.degrees);
  const preferFlat = FLAT_TONICS.has(progression.key) || progression.key.includes('b');

  return ALT_TEMPLATES.map(tpl => {
    if (tpl.borrow) {
      const parallelType = progression.scaleType.includes('MAJOR') ? 'NATURAL_MINOR' : 'MAJOR';
      const parallelKey = `${progression.key}_${parallelType}`;
      const parallelScale = data.scales[parallelKey];
      const borrowedDegree = parallelType === 'NATURAL_MINOR' ? 'SUBMEDIANT' : 'SUBDOMINANT';
      if (parallelScale && parallelScale.degrees[borrowedDegree]) {
        const block = buildChordBlock(parallelKey, borrowedDegree, parallelScale, preferFlat);
        return {
          label: tpl.label,
          sub: tpl.sub,
          chord: block,
          functionCaption: `Borrowed · ${block.notes.join(' · ')}`,
          rationale: `A borrowed chord — it darkens the color with a shadow pulled from the parallel ${parallelType === 'NATURAL_MINOR' ? 'minor' : 'major'}.`,
        };
      }
    }

    const degree = tpl.pickDegree(chord.degree, degreeOrder);
    const targetDegree = degree && scale.degrees[degree] ? degree : chord.degree;
    const block = buildChordBlock(chord.scaleKey, targetDegree, scale, preferFlat);
    const isTension = tpl.label === 'More tension';
    const rationale = targetDegree === chord.degree
      ? `Stays close to the current color, ${block.functionLabel.toLowerCase()} in feel.`
      : isTension
        ? `Aimed at the ${block.functionLabel.toLowerCase()} — it sharpens the pull forward with extra bite.`
        : tpl.label === 'Resolve home'
          ? `Returns to the tonic — full resolution, the sense of arriving home.`
          : `Soft and airy — it floats rather than resolving.`;

    return {
      label: tpl.label,
      sub: tpl.sub,
      chord: block,
      functionCaption: `${block.functionLabel} · ${block.notes.join(' · ')}`,
      rationale,
    };
  });
}
