import type { ContourArchetype, RhythmicCell } from './melody-engine';

/**
 * How each band writes a *tune*, as opposed to a chord loop. These are musical habits drawn from
 * published transcriptions and analyses (see the `how` / `songs` fields), expressed as knobs the
 * melody engine can apply on top of its harmonic rules:
 *
 *  - contour weights   which shapes the band tends toward (used when the style is "Surprise me")
 *  - rhythm            a bar-rhythm grammar, e.g. Radiohead's 3+3+4+3+3 "Pyramid Song" grouping
 *  - bias              pitch-choice preferences (positive = favoured, negative = avoided)
 *  - ornament          the small embellishment they put on phrase-ending notes
 *  - echo              whether a phrase is answered by a (transposed-to-the-chord) repeat of bar 1
 *  - dynamics          how hard the accents hit relative to the rest
 *
 * These are heuristics for flavour, not transcriptions: the chord-tone, leap-recovery and clash
 * rules in the engine still decide whether a note is allowed.
 */

export type MelodyOrnament = 'scoop' | 'slide' | 'enclosure' | 'trill' | 'none';
export type MelodyRhythm = 'default' | 'pyramid' | 'anthem' | 'riff' | 'syncopated' | 'lazy' | 'space' | 'offbeat';

export interface MelodyBias {
  pentatonic?: number;   // favour the (major or minor) pentatonic degrees
  extension?: number;    // favour 9ths / 13ths (tension tones)
  repeat?: number;       // favour repeating the previous pitch (hook-like)
  leap?: number;         // + favours leaps of a fourth or more, − favours steps
  semitone?: number;     // favour chromatic neighbour motion
  descend?: number;      // favour downward motion
  chordTone?: number;    // extra pull toward chord tones on every note
}

export interface BandMelodyProfile {
  id: string;
  contourWeights: Partial<Record<ContourArchetype, number>>;
  rhythm: MelodyRhythm;
  bias: MelodyBias;
  ornament: MelodyOrnament;
  echo: boolean;
  /** Extra semitones to shift the line's centre of gravity (negative = lower). */
  centerShift: number;
  /** Velocity of accented notes / unaccented notes. */
  dynamics: { accent: number; plain: number };
  sigLine: string;
  how: string[];
  songs: string[];
}

export const BAND_MELODY_PROFILES: Record<string, BandMelodyProfile> = {
  oasis: {
    id: 'oasis',
    contourWeights: { AnthemHook: 4, DescendingSigh: 2, Arch: 2, AscendingClimax: 1 },
    rhythm: 'anthem',
    bias: { pentatonic: 8, repeat: 9, leap: -4, chordTone: 3 },
    ornament: 'scoop',
    echo: true,
    centerShift: 0,
    dynamics: { accent: 114, plain: 96 },
    sigLine: 'Narrow, sing-along tune built on repeated notes and the pentatonic scale, hammering one pitch before it moves.',
    how: [
      'Repeated notes: the tune sits on one pitch for a beat or two before stepping, like the Wonderwall chorus.',
      'Pentatonic shape: mostly five scale notes, few chromatic surprises, so it is easy to shout back.',
      'Phrase answered: bar 1 comes back near the middle, the way a chorus restates its hook.',
    ],
    songs: ['Wonderwall', 'Don’t Look Back in Anger', 'Champagne Supernova'],
  },
  beatles: {
    id: 'beatles',
    contourWeights: { DescendingSigh: 3, Arch: 3, CallAndResponse: 3, AnthemHook: 1 },
    rhythm: 'default',
    bias: { leap: -6, semitone: 4, descend: 3, chordTone: 4 },
    ornament: 'none',
    echo: false,
    centerShift: 0,
    dynamics: { accent: 104, plain: 90 },
    sigLine: 'Singable, mostly stepwise tune that bends through a chromatic neighbour and often descends under the chords.',
    how: [
      'Stepwise vocal line with the occasional wide leap, then a step back.',
      'Chromatic passing notes: a descending line walking down under a held chord.',
      'Question and answer phrases, like a verse that asks and a bridge that answers.',
    ],
    songs: ['Michelle', 'Here, There and Everywhere', 'Eleanor Rigby'],
  },
  radiohead: {
    id: 'radiohead',
    contourWeights: { DescendingSigh: 3, CallAndResponse: 2, Arch: 2, OstinatoRiff: 1 },
    rhythm: 'pyramid',
    bias: { leap: 5, semitone: 5, extension: 4, chordTone: 1 },
    ornament: 'trill',
    echo: false,
    centerShift: 3,
    dynamics: { accent: 108, plain: 82 },
    sigLine: 'Small cells of notes in odd groupings, a falsetto leap, and a nagging semitone that never quite lands.',
    how: [
      'Odd-length rhythm groups (3+3+4+3+3) that float against the bar line, as in Pyramid Song.',
      'Chromatic neighbour tones and wide falsetto leaps against a static chord.',
      'Held notes that fall behind the beat, leaving space instead of filling it.',
    ],
    songs: ['Pyramid Song', 'Creep', 'Karma Police'],
  },
  nirvana: {
    id: 'nirvana',
    contourWeights: { OstinatoRiff: 4, AnthemHook: 2, DescendingSigh: 2 },
    rhythm: 'riff',
    bias: { pentatonic: 6, repeat: 6, leap: 2, chordTone: 5 },
    ornament: 'scoop',
    echo: true,
    centerShift: -3,
    dynamics: { accent: 120, plain: 80 },
    sigLine: 'Root-heavy minor-pentatonic riff that repeats, scoops up into notes, and hits much harder on the accents.',
    how: [
      'Riff first: a short root-and-fifth hook that is simply repeated, like Teen Spirit’s opening.',
      'Scooped notes: each accent slides up from a semitone below, the way a vocal is shouted.',
      'Quiet-loud dynamics: accents hit hard while the notes between stay low.',
    ],
    songs: ['Smells Like Teen Spirit', 'Come As You Are', 'In Bloom'],
  },
  'steely-dan': {
    id: 'steely-dan',
    contourWeights: { CallAndResponse: 3, Arch: 3, AscendingClimax: 2, DescendingSigh: 1 },
    rhythm: 'syncopated',
    bias: { extension: 9, semitone: 5, leap: 3, chordTone: 2 },
    ornament: 'enclosure',
    echo: false,
    centerShift: 2,
    dynamics: { accent: 104, plain: 90 },
    sigLine: 'Jazz-flavoured line leaning on 9ths and 13ths, approached chromatically from above and below.',
    how: [
      'Extension tones: 9ths and 13ths treated as chord notes, not passing colour.',
      'Enclosures: a target note is circled from a semitone above and below before landing.',
      'Syncopated phrasing that starts just ahead of or behind the beat.',
    ],
    songs: ['Peg', 'Aja', 'Reelin’ In the Years'],
  },
  'mac-demarco': {
    id: 'mac-demarco',
    contourWeights: { DescendingSigh: 4, Arch: 2, CallAndResponse: 1 },
    rhythm: 'lazy',
    bias: { pentatonic: 4, descend: 5, repeat: 3, leap: -5, chordTone: 3 },
    ornament: 'slide',
    echo: false,
    centerShift: -2,
    dynamics: { accent: 96, plain: 84 },
    sigLine: 'Lazy, drooping tune that lets notes sag a little flat and walks down the chord rather than leaping.',
    how: [
      'Descending lines that slump down the chord and stay there.',
      'Slides into notes, a little behind the beat.',
      'Minimal range and few notes per bar so the loop does the talking.',
    ],
    songs: ['Chamber of Reflection', 'Salad Days', 'Ode to Viceroy'],
  },
  khruangbin: {
    id: 'khruangbin',
    contourWeights: { CallAndResponse: 3, DescendingSigh: 2, Arch: 3, OstinatoRiff: 1 },
    rhythm: 'space',
    bias: { pentatonic: 8, repeat: 4, leap: -2, chordTone: 3 },
    ornament: 'slide',
    echo: true,
    centerShift: 0,
    dynamics: { accent: 96, plain: 82 },
    sigLine: 'Sparse, reverb-soaked pentatonic phrases with long slides, answered later like an echo.',
    how: [
      'Space first: few notes per bar, held long so the bass and drums can breathe.',
      'Pentatonic phrases with slides, like Mark Speer’s clean surf-and-Thai guitar tone.',
      'Echo answer: the opening phrase returns in the second half, as if through a dub delay.',
    ],
    songs: ['Maria También', 'Time (You and I)', 'White Gloves'],
  },
  'daft-punk': {
    id: 'daft-punk',
    contourWeights: { OstinatoRiff: 5, AnthemHook: 2, CallAndResponse: 1 },
    rhythm: 'offbeat',
    bias: { repeat: 9, pentatonic: 5, leap: -3, chordTone: 4 },
    ornament: 'none',
    echo: true,
    centerShift: 0,
    dynamics: { accent: 110, plain: 94 },
    sigLine: 'A short riff on repeat, pushed off the beat, that evolves by dropping one note at a time rather than by writing a new tune.',
    how: [
      'Loop-first writing: one tight riff repeated, then varied a note at a time.',
      'Offbeat placement: notes land on the “and” of the beat to feel like a funk bass.',
      'Strict repeat: each phrase is answered exactly, like a sampled loop.',
    ],
    songs: ['Get Lucky', 'Around the World', 'Digital Love'],
  },
};

export function getBandMelodyProfile(bandId?: string | null): BandMelodyProfile | undefined {
  if (!bandId) return undefined;
  const norm = bandId.toLowerCase().trim().replace(/[\s_]+/g, '-');
  if (BAND_MELODY_PROFILES[norm]) return BAND_MELODY_PROFILES[norm];
  const compact = norm.replace(/[^a-z]/g, '');
  return Object.values(BAND_MELODY_PROFILES).find(p => p.id.replace(/[^a-z]/g, '') === compact)
    || (compact.includes('beatles') ? BAND_MELODY_PROFILES.beatles : undefined);
}

/** Picks a contour for a band weighted by its habits. `rand` is injectable for tests. */
export function pickBandContour(bandId: string | null | undefined, rand: () => number = Math.random): ContourArchetype | undefined {
  const profile = getBandMelodyProfile(bandId);
  if (!profile) return undefined;
  const entries = Object.entries(profile.contourWeights) as Array<[ContourArchetype, number]>;
  const total = entries.reduce((s, [, w]) => s + w, 0);
  if (!total) return undefined;
  let r = rand() * total;
  for (const [id, w] of entries) {
    r -= w;
    if (r <= 0) return id;
  }
  return entries[entries.length - 1][0];
}

const r = (step: number, duration: number, accent = false): RhythmicCell =>
  accent ? { step, duration, accent: true } : { step, duration };

/**
 * Bar rhythm for a band, or null to let the density-based default stand.
 * Sparse densities thin the grammar rather than replacing it.
 */
export function getBandRhythmCells(
  profile: BandMelodyProfile,
  density: number,
  barIndex: number,
  totalBars: number,
  seed: number = 0
): RhythmicCell[] | null {
  const last = barIndex === totalBars - 1;
  const alt = barIndex % 2 === 1;
  let cells: RhythmicCell[] | null = null;

  // Each band rhythm has a few variants of the same feel; the seed (a re-roll) picks among them
  // bar by bar, so the groove stays on-brand without repeating the same pattern every time.
  const pick = <T,>(variants: T[]): T => {
    const i = seed ? Math.abs(seed * 31 + barIndex * 17) % variants.length : barIndex % variants.length;
    return variants[i];
  };

  switch (profile.rhythm) {
    case 'pyramid':
      // 3+3+4+3+3 sixteenth grouping is the signature, so only the tail varies
      cells = alt
        ? [r(0, 0.75, true), r(3, 0.75), r(6, 1.0), r(10, 1.5, true)]
        : [r(0, 0.75, true), r(3, 0.75), r(6, 1.0, true), r(10, 0.75), r(13, 0.75)];
      break;
    case 'anthem':
      cells = pick([
        [r(0, 1.0, true), r(4, 0.5), r(6, 0.5), r(8, 1.0, true), r(12, 1.0)],
        [r(0, 0.5, true), r(2, 0.5), r(4, 1.0), r(8, 1.0, true), r(12, 1.0)],
        [r(0, 1.5, true), r(6, 0.5), r(8, 0.5, true), r(10, 0.5), r(12, 1.0)],
        [r(0, 0.5, true), r(2, 0.5), r(4, 0.5), r(6, 0.5), r(8, 1.5, true)],
      ]);
      break;
    case 'riff':
      cells = pick([
        [r(0, 0.5, true), r(2, 0.5), r(4, 0.5), r(6, 0.5, true), r(8, 0.5), r(10, 0.5), r(12, 1.0, true)],
        [r(0, 0.75, true), r(3, 0.75), r(6, 0.5, true), r(8, 0.5), r(11, 0.5), r(14, 0.5, true)],
        [r(0, 0.5, true), r(2, 0.5, true), r(4, 1.0), r(8, 0.5, true), r(10, 0.5), r(12, 1.0)],
      ]);
      break;
    case 'syncopated':
      cells = pick([
        [r(0, 0.5), r(3, 0.75, true), r(6, 0.5), r(10, 0.75), r(13, 0.5, true)],
        [r(2, 0.5, true), r(5, 0.5), r(8, 0.75), r(11, 0.5, true), r(14, 0.5)],
        [r(1, 0.5), r(4, 0.75, true), r(7, 0.5), r(9, 0.5), r(12, 0.75, true)],
      ]);
      break;
    case 'lazy':
      cells = pick([
        [r(0, 1.5, true), r(6, 1.0), r(10, 1.5)],
        [r(2, 2.0, true), r(10, 1.5)],
        [r(0, 2.0, true), r(8, 1.0), r(12, 1.0)],
      ]);
      break;
    case 'space':
      cells = pick([
        [r(0, 1.5, true), r(8, 2.5)],
        [r(4, 3.0, true)],
        [r(2, 2.0, true), r(10, 1.5)],
      ]);
      break;
    case 'offbeat':
      cells = pick([
        [r(2, 0.5, true), r(6, 0.5), r(10, 0.5, true), r(14, 0.5)],
        [r(2, 0.5, true), r(6, 0.5), r(10, 0.5), r(11, 0.5, true), r(14, 0.5)],
        [r(2, 0.5, true), r(3, 0.25), r(6, 0.5, true), r(10, 0.5), r(14, 0.5, true)],
      ]);
      break;
    default:
      return null;
  }

  // Thin the grammar for sparse settings, thicken the end for busy ones.
  if (density < 25 && cells.length > 2) cells = cells.filter((_, i) => i % 2 === 0 || i === 0).slice(0, 3);
  if (density > 80 && profile.rhythm !== 'pyramid' && profile.rhythm !== 'space' && cells.length < 8) {
    const extra = [1, 5, 9, 13].filter(s => !cells!.some(c => c.step === s)).slice(0, 2).map(s => r(s, 0.25));
    cells = [...cells, ...extra].sort((a, b) => a.step - b.step);
  }
  if (last && profile.rhythm !== 'riff' && profile.rhythm !== 'offbeat') {
    // Land the last bar: end on a held note instead of mid-grammar
    const head = cells.slice(0, Math.max(1, cells.length - 1));
    const lastCell = head[head.length - 1];
    head[head.length - 1] = { ...lastCell, duration: Math.max(lastCell.duration, 2.0) };
    cells = head;
  }
  return cells;
}

const MAJOR_PENT = [0, 2, 4, 7, 9];
const MINOR_PENT = [0, 3, 5, 7, 10];

export interface BiasContext {
  tonicPc: number;
  isMinor: boolean;
  previousMidi: number | null;
  /** Candidate MIDI note and whether it is a tension/extension tone or a chord tone. */
  midi: number;
  isTension: boolean;
  isChordTone: boolean;
}

/** Score adjustment (negative = more attractive) a profile applies to one candidate pitch. */
export function biasAdjustment(profile: BandMelodyProfile, ctx: BiasContext): number {
  const b = profile.bias;
  let s = 0;
  const rel = (((ctx.midi % 12) - ctx.tonicPc) % 12 + 12) % 12;
  if (b.pentatonic && (ctx.isMinor ? MINOR_PENT : MAJOR_PENT).includes(rel)) s -= b.pentatonic;
  if (b.extension && ctx.isTension) s -= b.extension;
  if (b.chordTone && ctx.isChordTone) s -= b.chordTone;
  if (ctx.previousMidi !== null) {
    const delta = ctx.midi - ctx.previousMidi;
    const abs = Math.abs(delta);
    if (b.repeat && delta === 0) s -= b.repeat;
    if (b.leap) {
      if (abs >= 5) s -= b.leap;
      else if (abs >= 1 && abs <= 2 && !(abs === 1 && b.semitone)) s += b.leap;
    }
    if (b.semitone && abs === 1) s -= b.semitone;
    if (b.descend && delta < 0 && abs <= 5) s -= b.descend;
  }
  return s;
}
