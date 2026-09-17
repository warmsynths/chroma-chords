import { LitElement, html, svg, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Progression, ChordBlock, TheoryGroup, BorrowedChordRow,
  MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH, getMoodColor, roleForTension,
  RawChordData, AUTOPLAY_INTERVAL_MS, preferFlatSpelling, notesForSymbol, parseChordSymbol,
  generateTheoryGroups, generateBorrowedChords, applyVoicingToChord,
  getDiatonicScaleDegreeList, ScaleDegreeItem,
  getChordIntervalBreakdown, IntervalToken,
  detectProgressionCadences, CadenceInfo,
  analyzeVoiceLeading, VoiceLeadingLink,
  PITCH_CLASS,
  transposeProgression,
  shiftProgressionScale,
  SCALE_LABEL,
  SCALE_ABBREV,
  SCALE_DEGREE_NAMES,
  SCALE_DEGREE_SEMITONES,
  SCALE_DEGREE_QUALITIES,
  ROMAN_BY_SCALE,
} from '../services/chord-engine';
import { playbackEngine } from '../services/playback-engine';
import { projectStorage } from '../services/project-storage';
import { ProjectData } from '../services/project-service';
import { SongArranger, SongSection } from '../services/song-arranger';
import { USER_INSTRUMENTS, USER_PLAY_STYLES, GENRE_HUMANIZE, setMasterTone, normalizeInstrumentName } from '../services/audio-service';
import 'human-engine';
import type { HumanState } from 'human-engine';
import './share-modal';
import './chord-swap-lane';
import './chord-pad-cycler';
import type { SwapFeelItem } from './chord-swap-lane';

export interface BandArchetype {
  name: string;
  color: string;
  r: number;
  plain: string;
  theory: string;
  hoist: string[];
  font: string;
  weight?: number;
  italic?: boolean;
  pillFs: number;
  pillTrack: string;
}

export const BANDS: BandArchetype[] = [
  {
    name: 'Oasis',
    color: '#F6D98B',
    r: 10,
    plain: 'leans on a bright chord that shouldn’t fit, then walks home',
    theory: 'borrowed major ♭III, plagal IV–I, sus4 held over a static root',
    hoist: ['E♭maj7', 'Fmaj7', 'A♭'],
    font: 'Anton, sans-serif',
    pillFs: 13,
    pillTrack: '0.08em',
  },
  {
    name: 'Radiohead',
    color: '#C9A9E0',
    r: 3,
    plain: 'swaps a chord for its stranger neighbour a third away',
    theory: 'chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic',
    hoist: ['A♭maj7', 'E♭maj7', 'Em7'],
    font: "'Space Mono', monospace",
    weight: 700,
    pillFs: 12.5,
    pillTrack: '0.02em',
  },
  {
    name: 'Nirvana',
    color: '#F2A79B',
    r: 2,
    plain: 'moves the root in big jumps and leaves the middle empty',
    theory: 'power-chord roots by minor third and tritone — no thirds, so major or minor stays open',
    hoist: ['A♭', 'E♭maj7', 'B♭'],
    font: "'Plus Jakarta Sans', sans-serif",
    weight: 800,
    pillFs: 12,
    pillTrack: '0.04em',
  },
  {
    name: 'Steely Dan',
    color: '#9CC0EC',
    r: 13,
    plain: 'adds one note that makes a plain chord sound expensive',
    theory: 'major triad plus 9th with no 7th, ii–V chains, tritone substitution',
    hoist: ['Cmaj9', 'D♭7', 'Fm7'],
    font: "'Plus Jakarta Sans', sans-serif",
    weight: 800,
    italic: true,
    pillFs: 13,
    pillTrack: '0.01em',
  },
  {
    name: 'Mac DeMarco',
    color: '#B8CC9E',
    r: 7,
    plain: 'two lush chords looped loose, bass sliding underneath',
    theory: 'maj7 vamp with chromatic bass motion, no real resolution',
    hoist: ['Fmaj7', 'Cmaj9', 'Em7'],
    font: "'Plus Jakarta Sans', sans-serif",
    weight: 800,
    pillFs: 12,
    pillTrack: '-0.01em',
  },
];

const GENRE_PRIMARY = ['Pop', 'Lo-fi/Chill', 'R&B/Soul', 'Synthwave', 'Indie/Folk', 'Rock', 'Jazz-ish', 'Cinematic'];
const GENRE_ALL = ['Pop', 'Lo-fi/Chill', 'R&B/Soul', 'Indie/Folk', 'Synthwave', 'Jazz-ish', 'Rock', 'Cinematic', 'Ambient/Drone', 'House/Dance', 'Reggae/Dub', 'Gospel'];
const MOOD_ALL = ['Uplifting', 'Melancholy', 'Dreamy', 'Tense', 'Warm', 'Nostalgic'];
const MOOD_PRIMARY = ['Uplifting', 'Melancholy', 'Dreamy'];

const MOOD_ICONS: Record<string, string> = {
  Uplifting: 'M4 18 C 8 18 8 11 12 11 C 16 11 16 5 20 5',
  Melancholy: 'M3 9 Q 8 9 9 14 T 15 17 Q 19 18 21 15',
  Dreamy: 'M4 15 a4 4 0 1 1 8 0 a4 4 0 1 1 8 0',
  Tense: 'M3 12 L7 6 L11 16 L15 6 L19 16 L21 12',
  Warm: 'M12 4 a6.5 6.5 0 1 0 6.5 6.5',
  Nostalgic: 'M3 12 C 7 6 9 18 13 12 C 17 6 19 18 21 12',
};

const ROLE_PLAIN: Record<string, string> = {
  Tonic: 'home',
  Submediant: 'drifting',
  Subdominant: 'lifting',
  Supertonic: 'stepping up',
  Mediant: 'wistful',
  Dominant: 'pulling home',
  'Dominant 7th': 'pulling home',
};

const ROLE_SHORT: Record<string, string> = ROLE_PLAIN;

const PAD_KEYS = ['A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];
const ZONE_NAMES = ['Octave up', '1st inversion', 'Low root'];

function zoneForVoicing(v?: string): number {
  if (!v) return 1;
  const l = v.toLowerCase();
  if (l.includes('octave') || l.includes('up')) return 0;
  if (l.includes('low') || l.includes('root')) return 2;
  return 1;
}

export const CHORD_QUALITIES = [
  { label: 'Major', sub: 'bright' },
  { label: 'Minor', sub: 'warm' },
  { label: 'Suspended (sus)', sub: 'floating' },
  { label: 'Diminished', sub: 'unstable' },
];

export const CHORD_EXTENSIONS = [
  { label: 'None', sub: 'triad only' },
  { label: '6th', sub: 'soft lift' },
  { label: '7th (dom / m7)', sub: 'classic tension' },
  { label: 'Major 7th (M7)', sub: 'lush, jazzy' },
  { label: '9th', sub: 'wide, colorful' },
];

export const FEEL_AXES = [
  {
    k: 'playStyle' as const,
    label: 'Pattern',
    hint: 'How the notes are laid out in time',
    steps: [
      { v: 'Block chords', name: 'Block' },
      { v: 'Arpeggio', name: 'Arp' },
      { v: 'Strum', name: 'Strum' },
      { v: 'Broken (swing)', name: 'Broken' },
      { v: 'Half-time', name: 'Half-time' },
    ],
  },
  {
    k: 'swing' as const,
    label: 'Swing',
    hint: 'How far behind the beat the notes land',
    steps: [
      { v: 0, name: 'Straight' },
      { v: 25, name: 'Light' },
      { v: 55, name: 'Loose' },
      { v: 85, name: 'Heavy' },
    ],
  },
  {
    k: 'spread' as const,
    label: 'Spread',
    hint: 'How far apart the notes sit',
    steps: [
      { v: 15, name: 'Tight' },
      { v: 50, name: 'Close' },
      { v: 75, name: 'Open' },
      { v: 95, name: 'Wide' },
    ],
  },
  {
    k: 'density' as const,
    label: 'Density',
    hint: 'How many notes per chord',
    steps: [
      { v: 20, name: 'Sparse' },
      { v: 50, name: 'Simple' },
      { v: 75, name: 'Full' },
      { v: 95, name: 'Busy' },
    ],
  },
  {
    k: 'humanise' as const,
    label: 'Humanise',
    hint: 'How loose the timing and touch are',
    steps: [
      { v: 0, name: 'Machine' },
      { v: 45, name: 'Natural' },
      { v: 80, name: 'Loose' },
    ],
  },
  {
    k: 'tone' as const,
    label: 'Tone',
    hint: 'The colour of the instrument',
    steps: [
      { v: 'Warm', name: 'Warm' },
      { v: 'Glassy', name: 'Glassy' },
      { v: 'Dusty', name: 'Dusty' },
    ],
  },
];

export const FEEL_DEFS = FEEL_AXES;
export const FEEL_DEFAULTS = { playStyle: 'Block chords', swing: 0, spread: 50, density: 50, humanise: 45, tone: 'Warm' };
export const TONES = ['Warm', 'Glassy', 'Dusty'];
export const KEYS = ['C min', 'A min', 'F min', 'D min', 'G min', 'E♭ maj', 'C maj', 'G maj', 'F maj'];
export const SCALE_NOTE_NAMES = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];

export interface RootOption {
  root: string;
  label: string;
}

export const ROOT_OPTIONS: RootOption[] = [
  { root: 'C', label: 'C' },
  { root: 'Db', label: 'C♯ / D♭' },
  { root: 'D', label: 'D' },
  { root: 'Eb', label: 'D♯ / E♭' },
  { root: 'E', label: 'E' },
  { root: 'F', label: 'F' },
  { root: 'F#', label: 'F♯ / G♭' },
  { root: 'G', label: 'G' },
  { root: 'Ab', label: 'G♯ / A♭' },
  { root: 'A', label: 'A' },
  { root: 'Bb', label: 'A♯ / B♭' },
  { root: 'B', label: 'B' },
];

export interface ScaleOption {
  type: string;
  label: string;
  abbrev: string;
}

export const SCALE_OPTIONS: ScaleOption[] = [
  { type: 'MAJOR', label: 'Major', abbrev: 'Maj' },
  { type: 'NATURAL_MINOR', label: 'Minor', abbrev: 'Min' },
  { type: 'DORIAN', label: 'Dorian', abbrev: 'Dor' },
  { type: 'MIXOLYDIAN', label: 'Mixolydian', abbrev: 'Mix' },
  { type: 'LYDIAN', label: 'Lydian', abbrev: 'Lyd' },
  { type: 'PHRYGIAN', label: 'Phrygian', abbrev: 'Phr' },
  { type: 'HARMONIC_MINOR', label: 'Harmonic Min', abbrev: 'Harm' },
  { type: 'MELODIC_MINOR', label: 'Melodic Min', abbrev: 'Mel' },
  { type: 'LOCRIAN', label: 'Locrian', abbrev: 'Loc' },
];

const THEORY_SCALES: Record<string, {
  steps: number[];
  romans: string[];
  quals: string[];
  fns: string[];
  name: string;
}> = {
  MAJOR: {
    steps: [0, 2, 4, 5, 7, 9, 11],
    romans: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
    quals: ['', 'm', 'm', '', '', 'm', 'dim'],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone'],
    name: 'major',
  },
  NATURAL_MINOR: {
    steps: [0, 2, 3, 5, 7, 8, 10],
    romans: ['i', 'ii°', '♭III', 'iv', 'v', '♭VI', '♭VII'],
    quals: ['m', 'dim', '', 'm', 'm', '', ''],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic'],
    name: 'natural minor',
  },
  DORIAN: {
    steps: [0, 2, 3, 5, 7, 9, 10],
    romans: ['i', 'ii', '♭III', 'IV', 'v', 'vi°', '♭VII'],
    quals: ['m', 'm', '', '', 'm', 'dim', ''],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic'],
    name: 'Dorian',
  },
  PHRYGIAN: {
    steps: [0, 1, 3, 5, 7, 8, 10],
    romans: ['i', '♭II', '♭III', 'iv', 'v°', '♭VI', '♭vii'],
    quals: ['m', '', '', 'm', 'dim', '', 'm'],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic'],
    name: 'Phrygian',
  },
  LYDIAN: {
    steps: [0, 2, 4, 6, 7, 9, 11],
    romans: ['I', 'II', 'iii', 'iv°', 'V', 'vi', 'vii'],
    quals: ['', '', 'm', 'dim', '', 'm', 'm'],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone'],
    name: 'Lydian',
  },
  MIXOLYDIAN: {
    steps: [0, 2, 4, 5, 7, 9, 10],
    romans: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', '♭VII'],
    quals: ['', 'm', 'dim', '', 'm', 'm', ''],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic'],
    name: 'Mixolydian',
  },
  LOCRIAN: {
    steps: [0, 1, 3, 5, 6, 8, 10],
    romans: ['i°', '♭II', '♭iii', 'iv', '♭V', '♭VI', '♭vii'],
    quals: ['dim', '', 'm', 'm', '', '', 'm'],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic'],
    name: 'Locrian',
  },
  HARMONIC_MINOR: {
    steps: [0, 2, 3, 5, 7, 8, 11],
    romans: ['i', 'ii°', '♭III+', 'iv', 'V', '♭VI', 'vii°'],
    quals: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone'],
    name: 'Harmonic minor',
  },
  MELODIC_MINOR: {
    steps: [0, 2, 3, 5, 7, 9, 11],
    romans: ['i', 'ii', '♭III+', 'IV', 'V', 'vi°', 'vii°'],
    quals: ['m', 'm', 'aug', '', '', 'dim', 'dim'],
    fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone'],
    name: 'Melodic minor',
  },
};

export const GROUP_NOTES: Record<string, [string, string]> = {
  Darker: [
    'Three chords that add weight without changing the key.',
    'All three pull from the parallel minor or its subdominant — same key, more shadow.',
  ],
  'More tension': [
    'Three chords that lean harder into the next bar.',
    'Dominant approaches — each one aims at a chord later in the loop.',
  ],
  Dreamier: [
    'Three chords that open the bar up and let it float.',
    'Extensions and softer degrees — less pull toward home.',
  ],
  'Resolve home': [
    'Three chords that settle the bar back to center.',
    'Tonic and its neighbours — the sense of arriving.',
  ],
  Borrowed: [
    'Four chords from the minor version of this key. Each one swaps in for a chord you already have.',
    'Modal interchange — four chords from the parallel minor, each matched to the chord it can stand in for.',
  ],
};

const PC_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const PC: Record<string, number> = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
const DEG: Record<number, string> = { 0: '1', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '4', 6: '♭5', 7: '5', 8: '♭6', 9: '6', 10: '♭7', 11: '7' };
const QUAL: Record<string, number[]> = {
  '': [0, 4, 7], maj: [0, 4, 7], m: [0, 3, 7], min: [0, 3, 7],
  maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], '7': [0, 4, 7, 10],
  '6': [0, 4, 7, 9], m6: [0, 3, 7, 9], dim: [0, 3, 6], m7b5: [0, 3, 6, 10],
  sus4: [0, 5, 7], sus2: [0, 2, 7], '9': [0, 4, 7, 10], maj9: [0, 4, 7, 11],
  m9: [0, 3, 7, 10], add9: [0, 4, 7],
};
const QFALL: Record<string, string> = { '9': '7', maj9: 'maj7', m9: 'm7', add9: 'maj', sus2: 'sus4', min: 'm', '': 'maj' };

const SHAPES: Record<number, Record<string, (number | null)[]>> = {
  6: {
    maj: [0, 2, 2, 1, 0, 0],
    m: [0, 2, 2, 0, 0, 0],
    '7': [0, 2, 0, 1, 0, 0],
    maj7: [0, 2, 1, 1, 0, 0],
    m7: [0, 2, 0, 0, 0, 0],
    '6': [0, 2, 2, 1, 2, 0],
    m6: [0, 2, 2, 0, 2, 0],
    sus4: [0, 2, 2, 2, 0, 0],
  },
  5: {
    maj: [null, 0, 2, 2, 2, 0],
    m: [null, 0, 2, 2, 1, 0],
    '7': [null, 0, 2, 0, 2, 0],
    maj7: [null, 0, 2, 1, 2, 0],
    m7: [null, 0, 2, 0, 1, 0],
    '6': [null, 0, 2, 2, 2, 2],
    m6: [null, 0, 2, 2, 1, 2],
    sus4: [null, 0, 2, 2, 3, 0],
    dim: [null, 0, 1, 2, 1, null],
    m7b5: [null, 0, 1, 0, 1, null],
  },
};

function shapeQual(q: string): string {
  const key = q === '' ? 'maj' : q;
  if (SHAPES[5][key] || SHAPES[6][key]) return key;
  const f = QFALL[key];
  if (f && (SHAPES[5][f] || SHAPES[6][f])) return f;
  return 'maj';
}

function guitarVoicing(c: { root: string; rootPc: number; q: string; intervals: number[] }): (number | null)[] | null {
  const sq = shapeQual(c.q);
  const cands: { rootFret: number; frets: (number | null)[] }[] = [];
  ([[6, 4], [5, 9]] as [number, number][]).forEach(([anchor, openPc]) => {
    const shape = SHAPES[anchor][sq];
    if (!shape) return;
    const rootFret = ((c.rootPc - openPc) % 12 + 12) % 12;
    cands.push({ rootFret, frets: shape.map(o => (o === null ? null : o + rootFret)) });
  });
  if (!cands.length) return null;
  cands.sort((a, b) => a.rootFret - b.rootFret);
  return cands[0].frets;
}

function ukeVoicing(c: { root: string; rootPc: number; q: string; intervals: number[] }): (number | null)[] | null {
  const open = [7, 0, 4, 9];
  const want = c.intervals.map(i => (c.rootPc + i) % 12);
  const attempt = (targets: number[]): { frets: number[]; score: number } | null => {
    const targetSet = new Set(targets);
    let best: { frets: number[]; score: number } | null = null;
    const frets: number[] = [];
    const rec = (i: number) => {
      if (i === 4) {
        const pcs = frets.map((f, k) => (open[k] + f) % 12);
        for (const w of targetSet) if (pcs.indexOf(w) < 0) return;
        for (const p of pcs) if (!targetSet.has(p)) return;
        const nz = frets.filter(f => f > 0);
        const span = nz.length ? Math.max(...nz) - Math.min(...nz) : 0;
        if (span > 3) return;
        const score = span * 12 + frets.reduce((a, b) => a + b, 0);
        if (!best || score < best.score) best = { frets: frets.slice(), score };
        return;
      }
      for (let f = 0; f <= 5; f++) { frets.push(f); rec(i + 1); frets.pop(); }
    };
    rec(0);
    return best;
  };
  const full = attempt(want);
  if (full) return full.frets;
  const noFifth = attempt(c.intervals.filter(i => i !== 7).map(i => (c.rootPc + i) % 12));
  return noFifth ? noFifth.frets : null;
}

export interface SwapFamilyItem {
  key: string;
  label: string;
  tension: number;
  twoTone?: boolean;
}

export const SWAP_FAMILIES: SwapFamilyItem[] = [
  { key: 'Darker', label: 'Darker', tension: 0.55 },
  { key: 'More tension', label: 'Tense', tension: 0.9 },
  { key: 'Dreamier', label: 'Dreamy', tension: 0.3 },
  { key: 'Resolve home', label: 'Home', tension: 0.05 },
  { key: 'Borrowed', label: 'Borrow', tension: 0.42, twoTone: true },
];

type ViewTab = 'loop' | 'song' | 'play';
type PlayInstrument = 'Piano' | 'Guitar' | 'Ukulele';

@customElement('loop-screen')
export class LoopScreen extends LitElement {
  @property({ type: Object }) chordData: RawChordData = { chords: {}, scales: {} };
  @property({ type: Object }) progression!: Progression;
  @property({ type: Number }) activeIndex = 0;
  @property({ type: Number }) progressStep = 0;
  @property({ type: Array }) order: number[] = [0, 1, 2, 3];
  @property({ type: Boolean }) playing = false;
  @property({ type: Boolean }) showTheory = false;
  @property({ type: String }) instrument: string | null = null;
  @property({ type: String }) playStyle: string = 'Block chords';
  @property({ type: Boolean }) isAuthenticated = false;
  @property({ type: String }) userEmail: string | null = null;
  @property({ type: Array }) sections: SongSection[] = [];
  @property({ type: Number }) activeSectionIdx = 0;
  @property({ type: Number }) activePlayingSectionIdx = 0;
  @property({ type: Number }) totalSongSteps = 0;
  @property({ type: Boolean }) isGenerating = false;
  @property({ type: Boolean }) libraryOpen = false;

  @state() private isMobile = typeof window !== 'undefined' ? window.innerWidth < 900 : false;
  @state() private activeView: ViewTab = 'loop';
  @state() vibeOpen = false;
  @state() private selectedBand: string | null = null;
  @state() private freeText = '';
  @state() private vibePlaceholderIdx = 0;
  @state() private expandedGenre = false;
  @state() private expandedMood = false;
  @state() private activeSwapFamily = 'Darker';
  @state() private swapIndex: number | null = null;
  @state() private isInspectorOpen = false;
  @state() private detailOpen = false;
  @state() private detailIndex = 0;
  @state() private abPick: { chord: string; name?: string; tension: number; roman: string; fn?: string; functionLabel?: string; notes?: string[]; label?: string } | null = null;
  @state() private abSide: 'before' | 'after' = 'before';
  @state() private abPlaying = false;
  @state() private mobileFeelIndex = 0;
  @state() private mobileChordIndex = 0;
  @state() private savedSets: ProjectData[] = [];
  @state() private renamingId: string | null = null;
  @state() private draftName = '';
  @state() private confirmDeleteId: string | null = null;
  @state() private librarySearch = '';
  @state() private librarySelectMode = false;
  @state() private librarySelected: string[] = [];
  @state() private playInstrument: PlayInstrument = 'Piano';
  @state() private showDegrees = false;
  @state() private mobileSheetOpen = false;
  @state() private mobileDetailSheetOpen = false;
  @state() padFlash = -1;
  @state() padHeld = -1;
  @state() gridFor = -1;
  @state() lastPad: { idx: number; voicing: string; vel: number; zone: number; reach?: number; meta?: string; playedChordName?: string } | null = null;
  @state() tempoOpen = false;
  @state() feelOpen = false;
  @state() shareOpen = false;
  @state() private expandedInstrument = false;
  @state() barsPerChord = 1;
  @state() swing = 0;
  @state() spread = 50;
  @state() density = 50;
  @state() humanise = 45;
  @state() tone = 'Warm';
  @state() private feelScope: 'loop' | number = 'loop';
  @state() private barFeel: Record<number, Record<string, any>> = {};
  @state() private advOverride: Record<string, any> = {};
  @state() private advOpen = false;
  @state() private showAdvancedFeel = false;
  @state() private humanEngineState: any = null;
  @state() auditionDeg: number | null = null;
  @state() auditionName: string | null = null;
  @state() auditionBar: number = 0;

  private gridTimer: number | null = null;
  private pendingLatch: {
    index: number;
    reach?: number;
    voicing?: string;
    targetChordName?: string;
  } | null = null;

  private vibeExamples = ['Rainy drive at 2am, first day of summer...', 'Portishead trip-hop', 'Bohemian Rhapsody', 'Tame Impala neo-psychedelia', 'Warm acoustic fireplace'];
  private placeholderTimer: ReturnType<typeof setInterval> | null = null;
  private unsubscribeProjects: (() => void) | null = null;
  private onResizeHandler = () => {
    this.isMobile = window.innerWidth < 900;
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      background: var(--cv-cream, #FBF3E6);
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      color: var(--cv-ink, #2E271F);
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
    }

    * {
      box-sizing: border-box;
      scrollbar-width: none;
    }
    *::-webkit-scrollbar {
      display: none;
    }

    button {
      font-family: inherit;
    }

    @keyframes cvfv-sheet-up {
      from { transform: translateY(14px); opacity: 0.6; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* Top Band DNA Banner */
    .band-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 24px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      flex-shrink: 0;
      animation: cvfv-sheet-up 180ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .band-bar-content {
      display: flex;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
    }
    .band-bar-kicker {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.55);
    }
    .band-bar-name {
      font-size: 14px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .band-bar-trick {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-muted, #6B5F50);
    }
    .band-bar-close {
      border: none;
      background: rgba(251, 243, 230, 0.7);
      width: 26px;
      height: 26px;
      border-radius: 50%;
      font-size: 15px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--cv-ink, #2E271F);
      transition: background 150ms ease;
    }
    .band-bar-close:hover {
      background: var(--cv-cream, #FBF3E6);
    }

    /* Studio Shell */
    .studio-container {
      display: flex;
      align-items: stretch;
      flex: 1;
      min-height: 0;
      min-width: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    /* 1. Left Narrow Rail (62px) */
    .rail-left {
      width: 62px;
      min-width: 62px;
      max-width: 62px;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;
      border-right: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream, #FBF3E6);
      box-sizing: border-box;
      z-index: 10;
    }
    .rail-top {
      min-width: 0;
      overflow: hidden;
      padding: 18px 8px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .rail-bottom {
      position: relative;
      padding: 0 8px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .vibe-rail-btn {
      width: 40px;
      height: 40px;
      border-radius: 13px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 8px 16px -10px rgba(46,39,31,0.6);
      transition: transform 140ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 140ms ease;
    }
    .vibe-rail-btn:hover {
      transform: scale(1.04);
    }
    .vibe-rail-btn.active {
      box-shadow: inset 0 0 0 2.5px #2E271F;
    }
    .loops-rail-btn {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 150ms ease;
    }
    .loops-rail-btn:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .rail-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 1.1px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      text-align: center;
      line-height: 1.3;
    }
    .rail-divider {
      width: 26px;
      height: 1px;
      background: rgba(46, 39, 31, 0.12);
      margin: 2px 0;
    }
    .vibe-summary-vertical {
      writing-mode: vertical-rl;
      font-size: 11px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      letter-spacing: 0.4px;
      max-height: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Floating Vibe Popover (Desktop) */
    .vibe-popover-desktop {
      position: fixed;
      left: 70px;
      top: 64px;
      width: 322px;
      z-index: 45;
      max-height: calc(100vh - 96px);
      overflow-y: auto;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 20px;
      padding: 16px 18px 20px;
      box-shadow: 0 28px 54px -22px rgba(46, 39, 31, 0.55);
      animation: cvfv-sheet-up 180ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      box-sizing: border-box;
    }
    .popover-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .popover-kicker {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.4px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      flex: 1;
      min-width: 0;
    }
    .popover-kicker.spaced {
      margin-top: 20px;
      margin-bottom: 9px;
    }
    .close-popover-btn {
      border: none;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink-muted, #6B5F50);
      width: 28px;
      height: 28px;
      border-radius: 100px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
    }
    .popover-input-row {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface, #F6EADB);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      padding: 5px 5px 5px 12px;
      margin-top: 9px;
    }
    .cv-vibe-input {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--cv-ink, #2E271F);
      padding: 9px 0;
    }
    .cv-vibe-input::placeholder {
      color: rgba(46, 39, 31, 0.52);
    }
    .vibe-submit-btn {
      width: 34px;
      height: 34px;
      border-radius: 11px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
      transition: transform 120ms ease;
    }
    .vibe-submit-btn:active {
      transform: scale(0.95);
    }

    /* Floating Loops Popover (Desktop) */
    .loops-popover-desktop {
      position: absolute;
      left: 8px;
      width: 300px;
      bottom: 62px;
      z-index: 30;
      max-height: calc(100vh - 150px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 10px;
      box-shadow: 0 22px 44px -20px rgba(46, 39, 31, 0.5);
      animation: cvfv-sheet-up 180ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      box-sizing: border-box;
    }

    /* Pills Groups */
    .pills-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .pill {
      border: none;
      font-family: inherit;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink-muted, #6B5F50);
      border-radius: 100px;
      padding: 7px 12px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 150ms ease, color 150ms ease, transform 100ms ease;
    }
    .pill:hover {
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
    }
    .pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .mood-pill {
      padding: 5px 12px 5px 6px;
    }
    .mood-badge {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* 2. Center Stage (<main>) */
    .stage-main {
      flex: 1;
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto;
      background: var(--cv-cream, #FBF3E6);
    }
    .stage-top-bar {
      padding: 6px 22px 8px;
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
    }
    .view-tabs-bar {
      display: flex;
      gap: 2px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 100px;
      padding: 4px;
      width: fit-content;
      flex-shrink: 0;
    }
    .view-tab {
      border: none;
      font-family: inherit;
      min-height: 40px;
      padding: 0 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      white-space: nowrap;
      cursor: pointer;
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      transition: background 160ms ease, color 160ms ease;
    }
    .view-tab.active {
      background: #2E271F;
      color: #FBF3E6;
    }
    .stage-scroll-canvas {
      min-width: 0;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 22px 20px;
    }
    .stage-card {
      position: relative;
      min-height: 280px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 26px;
      padding: 26px 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
      box-sizing: border-box;
    }

    /* Loop Strip at top of card */
    .loop-strip-header {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      flex-shrink: 0;
    }
    .loop-play-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 44px;
      padding: 0 18px;
      border: none;
      font-family: inherit;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      transition: background 150ms ease, color 150ms ease;
    }
    .strip-timeline-wrap {
      flex: 1;
      min-width: 180px;
    }
    .strip-cells-bar {
      display: flex;
      gap: 2px;
      align-items: flex-end;
      height: 20px;
    }
    .strip-cell {
      flex: 1;
      min-width: 0;
      border-radius: 2px;
      transition: height 90ms linear, background 90ms linear;
    }
    .strip-labels-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-top: 7px;
      flex-wrap: wrap;
    }
    .strip-status-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }
    .strip-space-hint {
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }
    .loop-bar-chips-group {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      flex-wrap: wrap;
    }
    .from-bar-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }
    .loop-bar-chips {
      display: flex;
      gap: 4px;
    }
    .strip-jump-chip {
      border: none;
      font-family: inherit;
      min-width: 34px;
      min-height: 34px;
      padding: 0 10px;
      border-radius: 11px;
      font-size: 11.5px;
      font-weight: 800;
      cursor: pointer;
      background: var(--cv-surface-2, #F1E4CC);
      color: #2E271F;
      transition: background 150ms ease;
    }

    /* Pad Cells Grid */
    .pad-cells-grid {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      min-width: 0;
    }
    @media (max-width: 768px) {
      .pad-cells-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .pad-cell {
      position: relative;
      overflow: hidden;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      padding: 14px;
      border-radius: 20px;
      cursor: pointer;
      min-height: 124px;
      outline-offset: 4px;
      touch-action: none;
      transition: box-shadow 140ms ease, transform 120ms ease;
      box-shadow: 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }
    .pad-cell:hover {
      transform: translateY(-1px);
    }
    .pad-cell.pad-held {
      transform: scale(0.96);
      box-shadow: inset 0 0 0 2.5px #2E271F;
    }
    .pad-cell.selected {
      box-shadow: inset 0 0 0 2.5px #2E271F, 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }
    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 2.5px rgba(46, 39, 31, 0.4);
    }
    .pad-voicing-grid {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background-image: linear-gradient(180deg, rgba(46, 39, 31, 0.2) 1px, transparent 1px);
      background-size: 100% 33.33%;
      opacity: 0;
      transition: opacity 1100ms ease;
    }
    .pad-voicing-grid.active {
      opacity: 1 !important;
      transition: opacity 90ms ease !important;
    }
    .pad-rung-dots {
      display: flex;
      gap: 3px;
      margin-top: 7px;
      align-items: center;
    }
    .pad-rung-dot {
      height: 4px;
      border-radius: 3px;
      transition: width 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), background 180ms ease;
    }

    .play-card {
      background: var(--cv-surface, #F1E4CC);
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform 150ms var(--cv-ease);
    }
    .play-card:active {
      transform: scale(0.99);
    }
    .pad-swap-btn {
      position: absolute;
      top: 9px;
      right: 9px;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.88);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      z-index: 3;
      transition: background 150ms ease, transform 120ms ease;
    }
    .pad-swap-btn:hover {
      background: #FBF3E6;
      transform: scale(1.06);
    }
    .pad-detail-btn {
      position: absolute;
      top: 9px;
      right: 43px;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.88);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      z-index: 3;
      transition: background 150ms ease, transform 120ms ease;
    }
    .pad-detail-btn:hover {
      background: #FBF3E6;
      transform: scale(1.06);
    }
    .pad-top-row {
      position: relative;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      padding-right: 76px;
    }
    .pad-key-badge {
      font-size: 11px;
      font-weight: 800;
      color: rgba(46, 39, 31, 0.5);
    }
    .pad-roman-badge {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.6px;
      color: rgba(46, 39, 31, 0.55);
    }
    .pad-bottom-info {
      position: relative;
    }
    .pad-role-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.9px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.45);
    }
    .pad-chord-name {
      font-family: var(--cv-font, 'Plus Jakarta Sans', -apple-system, sans-serif);
      font-size: clamp(20px, 2.1vw, 30px);
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.02em;
      line-height: 1.05;
      overflow-wrap: anywhere;
      margin-top: 2px;
    }
    @keyframes cvfv-panel {
      from { transform: translateY(-8px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .pad-meta-voicing {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.62);
      margin-top: 4px;
      min-height: 14px;
    }

    /* Playing now strip */
    .playing-now-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: baseline;
      gap: 11px;
      flex-wrap: wrap;
      padding-top: 15px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }
    .playing-now-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }
    .playing-now-chord {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      letter-spacing: -0.01em;
    }
    .playing-now-desc {
      flex: 1 1 200px;
      min-width: 0;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.45;
      color: var(--cv-ink-muted, #6B5F50);
      text-wrap: pretty;
    }

    /* Quick controls below card */
    .stage-quick-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      column-gap: 8px;
      row-gap: 10px;
      margin-top: 16px;
    }
    .instrument-chip, .play-style-chip, .tempo-chip, .feel-chip {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface-2, #F1E4CC);
      color: #5B5145;
      min-height: 38px;
      padding: 0 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 120ms ease, box-shadow 150ms ease;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .instrument-chip:hover, .play-style-chip:hover, .tempo-chip:hover, .feel-chip:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .instrument-chip.open, .play-style-chip.open, .tempo-chip.open, .feel-chip.open {
      background: var(--cv-surface, #F6EADB);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
    }
    .instrument-chip:active, .play-style-chip:active, .tempo-chip:active, .feel-chip:active {
      transform: scale(0.97);
    }
    .quick-divider {
      width: 1px;
      align-self: stretch;
      min-height: 28px;
      background: rgba(46, 39, 31, 0.12);
      margin: 0 4px;
    }
    .song-track-container {
      display: flex;
      gap: 14px;
      margin-top: 18px;
      overflow-x: auto;
      padding-bottom: 12px;
      align-items: stretch;
    }
    @media (max-width: 768px) {
      .song-track-container {
        flex-direction: column;
        overflow-x: visible;
      }
    }
    .song-track-card {
      flex: 1;
      min-width: 190px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 18px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 150ms ease;
      box-sizing: border-box;
    }
    .song-track-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px -14px rgba(46, 39, 31, 0.35);
    }
    .song-track-card.active {
      box-shadow: inset 0 0 0 2px var(--cv-ink, #2E271F);
    }
    .song-card-chips {
      display: flex;
      gap: 5px;
      margin-top: 6px;
      flex-wrap: wrap;
      align-items: center;
    }
    .add-section-card {
      min-width: 180px;
      border-radius: 18px;
      border: 1.5px dashed rgba(46, 39, 31, 0.25);
      padding: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--cv-label, #8A6B3F);
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), background 150ms ease;
      box-sizing: border-box;
    }
    .add-section-card:hover {
      background: rgba(46, 39, 31, 0.03);
      transform: translateY(-2px);
    }
    .add-section-card:active {
      transform: scale(0.98);
    }
    .share-btn {
      margin-left: auto;
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border-radius: 100px;
      min-height: 38px;
      padding: 0 18px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: transform 120ms ease, background 150ms var(--cv-ease);
    }
    .share-btn:active {
      transform: scale(0.97);
    }

    /* Bottom Bar (Row 3) */
    .stage-bottom-bar {
      min-width: 0;
      background: var(--cv-cream, #FBF3E6);
      padding: 4px 22px 14px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap: 8px;
    }
    .length-stepper {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .stepper-btn {
      border: none;
      font-family: inherit;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      font-size: 15px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 150ms ease, transform 100ms ease;
    }
    .stepper-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .stepper-btn:active {
      transform: scale(0.94);
    }
    .stepper-count {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      min-width: 58px;
      text-align: center;
    }
    .length-presets {
      display: flex;
      align-items: center;
      gap: 3px;
      margin-left: 2px;
      padding-left: 6px;
      border-left: 1px solid rgba(46, 39, 31, 0.12);
    }
    .preset-btn {
      border: 1px solid rgba(46, 39, 31, 0.1);
      font-family: inherit;
      min-width: 24px;
      height: 24px;
      padding: 0 6px;
      border-radius: 999px;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 150ms ease, color 150ms ease, border-color 150ms ease, transform 100ms ease;
    }
    .preset-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
    }
    .preset-btn:active {
      transform: scale(0.94);
    }
    .preset-btn.active {
      background: var(--cv-ink, #2E271F);
      color: #FAF4EB;
      border-color: var(--cv-ink, #2E271F);
      font-weight: 800;
    }
    .try-another-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      min-height: 36px;
      padding: 0 14px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms ease;
    }
    .try-another-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }

    /* 3. Right Inspector (<aside>) */
    .inspector-right {
      width: clamp(304px, 26vw, 384px);
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto;
      border-left: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-surface, #F6EADB);
      box-sizing: border-box;
    }
    .inspector-header {
      padding: 18px 22px 14px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }
    .inspector-body {
      min-width: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px 22px 22px;
    }
    .inspector-kicker, .detail-kicker, .swap-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
    }
    .arc-title-text {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      margin-top: 5px;
      letter-spacing: -0.015em;
      text-wrap: pretty;
    }
    .theory-toggle-btn {
      border: none;
      font-family: inherit;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 2px 0;
      flex-shrink: 0;
    }
    .toggle-track {
      width: 34px;
      height: 18px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      position: relative;
      transition: background 200ms ease;
    }
    .toggle-track.active {
      background: var(--mood-color, #9B7CA8);
    }
    .toggle-knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FBF3E6;
      transition: transform 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .toggle-track.active .toggle-knob {
      transform: translateX(16px);
    }
    .arc-bars-row {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: 152px;
      padding: 0 2px;
    }
    .arc-bar-col {
      flex: 1 1 0;
      min-width: 0;
      border: none;
      font-family: inherit;
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding: 4px 2px 5px;
      border-radius: 11px;
      cursor: pointer;
      height: 100%;
      transition: background 150ms ease;
    }
    .arc-bar-col:hover {
      background: var(--cv-cream, #FBF3E6);
    }
    .arc-bar-fill-wrap {
      height: 80px;
      flex-shrink: 0;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .arc-bar-fill {
      width: 100%;
      max-width: 34px;
      border-radius: 4px;
      transition: height 320ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), background 320ms ease;
    }
    .arc-bar-name {
      font-size: 11.5px;
      font-weight: 800;
      line-height: 1.25;
      color: var(--cv-ink, #2E271F);
      flex-shrink: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      margin-top: 6px;
    }
    .arc-bar-feel {
      font-size: 9.5px;
      font-weight: 700;
      line-height: 1.2;
      color: rgba(46, 39, 31, 0.45);
      text-align: center;
      flex-shrink: 0;
      max-width: 100%;
    }
    .arc-caption {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.2px;
      color: rgba(46, 39, 31, 0.42);
      margin-top: 8px;
    }
    .arc-sentence-text {
      font-size: 13.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 14px;
      text-wrap: pretty;
    }
    .arc-theory-note {
      font-size: 13px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      text-wrap: pretty;
    }
    .inspector-tip-box {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      margin-top: 16px;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 14px;
      padding: 11px 13px;
      font-size: 12.5px;
      line-height: 1.55;
      color: var(--cv-ink-muted, #6B5F50);
      text-wrap: pretty;
    }

    /* Chord Detail Inspector */
    .chord-shape-badge {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      flex-shrink: 0;
    }
    .detail-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin-top: 4px;
    }
    .detail-chord-function {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 3px;
    }
    .close-detail-btn {
      border: none;
      font-family: inherit;
      width: 44px;
      height: 44px;
      margin: -8px -10px 0 0;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: rgba(46, 39, 31, 0.55);
      cursor: pointer;
      flex-shrink: 0;
      transition: background 150ms ease;
    }
    .close-detail-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .detail-notes-pills {
      display: flex;
      gap: 7px;
      margin-top: 9px;
      flex-wrap: wrap;
    }
    .note-pill {
      background: var(--cv-surface-2, #F1E4CC);
      border-radius: 100px;
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
    }
    .detail-quality-box, .detail-extension-box {
      display: flex;
      align-items: baseline;
      gap: 9px;
      background: var(--cv-surface-2, #F1E4CC);
      border-radius: 14px;
      padding: 11px 14px;
      margin-top: 9px;
    }
    .quality-label {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .quality-sub {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }
    .quality-chips-grid, .ext-chips-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    .chord-mod-chip {
      padding: 10px 12px;
      border-radius: 14px;
      border: none;
      font-family: inherit;
      cursor: pointer;
      background: var(--cv-surface, #F1E4CC);
      text-align: left;
      transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease;
    }
    .chord-mod-chip:hover {
      transform: scale(0.99);
    }
    .chord-mod-chip.selected,
    .chord-mod-chip.active {
      background: var(--cv-mood-color, #F6D98B);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.2);
    }
    .chord-mod-chip .chip-title {
      font-size: 13px;
      font-weight: 700;
      color: #2E271F;
    }
    .chord-mod-chip .chip-desc {
      font-size: 11px;
      color: rgba(46, 39, 31, 0.6);
      margin-top: 2px;
    }
    .detail-mini-keyboard {
      position: relative;
      margin-top: 10px;
      border-radius: 14px;
      overflow: hidden;
      border: 1.5px solid rgba(46, 39, 31, 0.1);
      background: var(--cv-cream, #FBF3E6);
    }
    .detail-mini-keyboard .white-key {
      flex: 1;
      height: 72px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
      font-size: 11px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.35);
      background: #FBF3E6;
      border-right: 1px solid rgba(46, 39, 31, 0.08);
      transition: background 150ms ease, color 150ms ease;
    }
    .detail-mini-keyboard .white-key:last-child {
      border-right: none;
    }
    .detail-mini-keyboard .white-key.active {
      color: #2E271F;
      background: var(--cv-mood-color, #F6D98B);
      font-weight: 800;
    }
    .detail-mini-keyboard .black-key {
      position: absolute;
      top: 0;
      width: calc(100% / 7 * 0.58);
      height: 44px;
      background: var(--cv-plum, #2E271F);
      border-radius: 0 0 5px 5px;
      z-index: 2;
      transition: background 150ms ease;
    }
    .detail-mini-keyboard .black-key.active {
      background: #F2735F;
    }

    /* Swap Inspector */
    .swap-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      letter-spacing: -0.02em;
      line-height: 1;
    }
    .swap-roman {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
      letter-spacing: 0.5px;
    }
    .swap-role {
      font-size: 12px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.45);
    }
    .close-swap-btn {
      border: none;
      font-family: inherit;
      width: 44px;
      height: 44px;
      margin: -8px -10px 0 0;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: rgba(46, 39, 31, 0.55);
      cursor: pointer;
      flex-shrink: 0;
    }
    .ab-compare-box, .ab-box {
      background: var(--cv-surface, #F6EADB);
      border-radius: 16px;
      padding: 12px 13px;
      margin-top: 12px;
    }
    .ab-compare-row {
      display: flex;
      gap: 7px;
    }
    .ab-card-half {
      flex: 1;
      min-width: 0;
      text-align: left;
      border-radius: 14px;
      padding: 10px 12px;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: all 150ms var(--cv-ease);
    }
    .ab-card-half:disabled {
      cursor: default;
    }
    .ab-loop-player-row {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-top: 10px;
    }
    .ab-play-toggle-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      cursor: pointer;
      color: #2E271F;
      transition: background 150ms var(--cv-ease), transform 120ms ease;
    }
    .ab-play-toggle-btn:active {
      transform: scale(0.94);
    }
    .ab-cells-track {
      display: flex;
      gap: 5px;
      flex: 1;
      min-width: 0;
    }
    .ab-cell-item {
      flex: 1;
      min-width: 0;
      height: 40px;
      border-radius: 11px;
      border: none;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10.5px;
      font-weight: 800;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 4px;
      box-sizing: border-box;
      color: #2E271F;
      cursor: pointer;
      user-select: none;
    }
    .ab-cell-item:active {
      transform: scale(0.94);
    }
    .ab-cell-item.active-step {
      box-shadow: inset 0 0 0 2px #2E271F;
    }
    /* legacy names kept for compat */
    .ab-now-card, .ab-swap-card {
      flex: 1;
      padding: 7px 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 150ms ease;
    }
    .ab-now-card.active, .ab-swap-card.active {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .ab-side-label {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      opacity: 0.65;
    }
    .ab-side-chord {
      font-size: 14px;
      font-weight: 800;
      margin-top: 1px;
    }
    .accept-swap-btn {
      border: none;
      font-family: inherit;
      cursor: pointer;
      width: 100%;
      padding: 11px 14px;
      font-size: 13px;
      font-weight: 800;
      border-radius: 100px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      margin-top: 8px;
      transition: transform 120ms ease;
    }
    .accept-swap-btn:active {
      transform: scale(0.98);
    }
    .accept-swap-btn:disabled {
      background: var(--cv-surface-2, #F1E4CC);
      color: rgba(46, 39, 31, 0.35);
      cursor: default;
    }
    .swap-family-tabs, .swap-tab-nav {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      padding-bottom: 8px;
      margin-bottom: 12px;
      width: 100%;
    }
    .swap-family-tab {
      border: none;
      font-family: inherit;
      background: transparent;
      padding: 6px 3px 5px;
      border-radius: 14px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      min-height: 48px;
      flex: 1 1 0;
      min-width: 0;
      transition: background 150ms ease;
    }
    .swap-family-tab:hover {
      background: var(--cv-cream, #FBF3E6);
    }
    .swap-family-tab.active {
      background: rgba(255, 255, 255, 0.45);
    }
    .family-shape {
      display: block;
      transition: box-shadow 160ms ease, transform 150ms ease;
    }
    .two-tone-swatch {
      display: flex;
      gap: 3px;
      padding: 2px;
      border-radius: 5px;
      transition: box-shadow 160ms ease;
    }
    .family-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.45);
      max-width: 100%;
      transition: color 150ms ease;
    }
    .swap-family-tab.active .family-label {
      color: var(--cv-ink, #2E271F);
    }
    .band-note-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.3px;
      color: #6B5F50;
      border-radius: 11px;
      padding: 8px 11px;
      margin-bottom: 12px;
    }
    .band-move-tag {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.9px;
      text-transform: uppercase;
      color: #2E271F;
      border-radius: 100px;
      padding: 3px 8px;
    }
    .alt-candidates-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .alt-chord-row {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 9px 12px;
      border-radius: 12px;
      background: var(--cv-cream, #FBF3E6);
      cursor: pointer;
      transition: background 140ms ease;
    }
    .alt-chord-row:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .alt-chord-row.selected {
      box-shadow: inset 0 0 0 2px var(--cv-ink, #2E271F);
    }
    .alt-shape {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      flex-shrink: 0;
    }
    .alt-play-chip {
      border: none;
      font-family: inherit;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
      border-radius: 100px;
      padding: 5px 10px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
    }

    /* Mobile Dedicated Styles */
    .mobile-stage-wrap {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
      background: var(--cv-cream, #FBF3E6);
    }
    .mobile-vibe-toggle {
      width: 100%;
      border: none;
      background: var(--cv-surface, #F6EADB);
      border-radius: 16px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
    }
    .mobile-swap-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 84%;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 26px 26px 0 0;
      box-shadow: 0 -20px 50px -20px rgba(0, 0, 0, 0.5);
      z-index: 100;
      display: flex;
      flex-direction: column;
      animation: cvfv-sheet-up 260ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      box-sizing: border-box;
      padding: 16px 20px max(24px, calc(16px + env(safe-area-inset-bottom, 0px)));
      overflow-y: auto;
    }
    .sheet-handle {
      width: 38px;
      height: 4px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      margin: 0 auto 14px;
      flex-shrink: 0;
    }
    .sheet-cancel-btn {
      border: none;
      font-family: inherit;
      text-align: center;
      border-radius: 100px;
      padding: 12px 18px;
      background: transparent;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.18);
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
    .sheet-scrim {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.44);
      z-index: 95;
    }
    .mobile-bottom-transport-bar {
      flex-shrink: 0;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream, #FBF3E6);
      padding: 11px 14px max(16px, calc(10px + env(safe-area-inset-bottom, 0px)));
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      z-index: 50;
      box-sizing: border-box;
      width: 100%;
    }
    .mobile-circle-btn {
      border: none;
      font-family: inherit;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--cv-surface, #F6EADB);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 150ms ease, transform 120ms ease;
    }
    .mobile-circle-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .mobile-circle-btn:active {
      transform: scale(0.96);
    }
    .mobile-circle-btn.active {
      background: var(--cv-surface-2, #F1E4CC);
      box-shadow: inset 0 0 0 2px var(--cv-ink, #2E271F);
    }
    .mobile-chip-btn {
      border: none;
      font-family: inherit;
      flex: 1;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      border-radius: 14px;
      min-height: 46px;
      padding: 0 10px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 150ms ease;
    }
    .mobile-chip-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }

    .mobile-theory-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 22px;
      padding-top: 18px;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      cursor: pointer;
    }
    .mobile-theory-panel {
      margin-top: 20px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.onResizeHandler);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.placeholderTimer = setInterval(() => {
      this.vibePlaceholderIdx = (this.vibePlaceholderIdx + 1) % this.vibeExamples.length;
    }, 2800);
    this.savedSets = projectStorage.getProjects();
    this.unsubscribeProjects = typeof projectStorage.subscribeProjects === 'function'
      ? projectStorage.subscribeProjects(() => {
          this.savedSets = projectStorage.getProjects();
          this.requestUpdate();
        })
      : typeof (projectStorage as any).subscribe === 'function'
        ? (projectStorage as any).subscribe(() => {
            this.savedSets = projectStorage.getProjects();
            this.requestUpdate();
          })
        : null;

    playbackEngine.setFeelSettings({
      playStyle: this.playStyle,
      swing: this.swing,
      spread: this.spread,
      density: this.density,
      humanise: this.humanise,
      tone: this.tone,
      barFeel: this.barFeel,
      advOverride: this.advOverride,
    });
    playbackEngine.setBarsPerChord(this.barsPerChord);
    setMasterTone(this.tone);
  }

  updated(changed: PropertyValues) {
    super.updated(changed);
    if (
      changed.has('swing') ||
      changed.has('spread') ||
      changed.has('density') ||
      changed.has('humanise') ||
      changed.has('playStyle') ||
      changed.has('tone') ||
      changed.has('barFeel') ||
      changed.has('advOverride') ||
      changed.has('humanEngineState')
    ) {
      playbackEngine.setFeelSettings({
        playStyle: this.playStyle,
        swing: this.swing,
        spread: this.spread,
        density: this.density,
        humanise: this.humanise,
        tone: this.tone,
        barFeel: this.barFeel,
        advOverride: this.advOverride,
        humanState: this.humanEngineState,
      });
      if (changed.has('playStyle')) {
        playbackEngine.setPlayStyle(this.playStyle);
      }
      if (changed.has('tone')) {
        setMasterTone(this.tone);
      }
    }
    if (changed.has('barsPerChord')) {
      playbackEngine.setBarsPerChord(this.barsPerChord);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.onResizeHandler);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    if (this.placeholderTimer) clearInterval(this.placeholderTimer);
    if (this.unsubscribeProjects) this.unsubscribeProjects();
  }

  private isEditableTarget(e: KeyboardEvent): boolean {
    const isElementEditable = (el: unknown): boolean => {
      if (!el || typeof el !== 'object') return false;
      const htmlEl = el as HTMLElement;
      const tag = (htmlEl.tagName || '').toUpperCase();
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || Boolean(htmlEl.isContentEditable);
    };

    const path = typeof e.composedPath === 'function' ? e.composedPath() : [e.target];
    for (const el of path) {
      if (isElementEditable(el)) {
        return true;
      }
    }

    let active: Element | null = typeof document !== 'undefined' ? document.activeElement : null;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    if (isElementEditable(active)) {
      return true;
    }

    return false;
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (this.vibeOpen || this.tempoOpen || this.feelOpen) {
        e.preventDefault();
        this.vibeOpen = false;
        this.tempoOpen = false;
        this.feelOpen = false;
        this.requestUpdate();
        return;
      }
    }
    if (this.isEditableTarget(e)) return;
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      this.togglePlay();
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const idx = PAD_KEYS.map(k => k.toLowerCase()).indexOf((e.key || '').toLowerCase());
    const chords = this.progression?.chords || [];
    if (idx >= 0 && idx < chords.length) {
      e.preventDefault();
      const vel = 88 + (idx % 3) * 6;
      const chord = chords[idx];
      const rung = this.getLadderHome(chord);
      const voicing = chord.voicing || '1st inversion';
      const zone = zoneForVoicing(voicing);

      const key = this.progression?.key || 'C';
      const scaleType = this.progression?.scaleType || 'MAJOR';
      const notes = chord.notes && chord.notes.length
        ? chord.notes
        : notesForSymbol(chord.name, preferFlatSpelling(key, scaleType));

      if (this.gridTimer) {
        clearTimeout(this.gridTimer);
        this.gridTimer = null;
      }
      this.padFlash = idx;
      this.padHeld = idx;
      this.gridFor = idx;
      const meta = zone === 0 ? 'UP AN OCTAVE' : (zone === 1 ? '1ST INVERSION' : 'ROOT POSITION');
      this.lastPad = { idx, voicing, vel, zone, reach: rung, meta };

      playbackEngine.playChordNotes(notes, 0.85, voicing, vel);
      this.requestUpdate();
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    if (this.isEditableTarget(e)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const idx = PAD_KEYS.map(k => k.toLowerCase()).indexOf((e.key || '').toLowerCase());
    if (idx >= 0) {
      this.padFlash = -1;
      this.requestUpdate();
    }
  };

  private toggleVibe = () => {
    this.vibeOpen = !this.vibeOpen;
    this.requestUpdate();
  };

  private setLibraryOpen = (open: boolean) => {
    this.libraryOpen = open;
    this.dispatchEvent(new CustomEvent('library-open-change', { detail: open, bubbles: true, composed: true }));
    this.requestUpdate();
  };

  private toggleLibrary = () => {
    this.setLibraryOpen(!this.libraryOpen);
  };

  private toggleLibrarySelectMode = () => {
    this.librarySelectMode = !this.librarySelectMode;
    if (!this.librarySelectMode) {
      this.librarySelected = [];
    }
    this.requestUpdate();
  };

  private toggleSelectLoop = (id: string) => {
    if (this.librarySelected.includes(id)) {
      this.librarySelected = this.librarySelected.filter(item => item !== id);
    } else {
      this.librarySelected = [...this.librarySelected, id];
    }
    this.requestUpdate();
  };

  private toggleSelectAllVisible = () => {
    const q = this.librarySearch.trim().toLowerCase();
    const visible = this.savedSets.filter(s => !q || (s.name + ' ' + s.genre + ' ' + s.mood).toLowerCase().includes(q));
    const visibleIds = visible.map(s => s.id);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => this.librarySelected.includes(id));

    if (allVisibleSelected) {
      this.librarySelected = this.librarySelected.filter(id => !visibleIds.includes(id));
    } else {
      const set = new Set([...this.librarySelected, ...visibleIds]);
      this.librarySelected = Array.from(set);
    }
    this.requestUpdate();
  };

  private deleteSelectedLoops = () => {
    const toDelete = [...this.librarySelected];
    if (!toDelete.length) return;
    const count = toDelete.length;
    for (const id of toDelete) {
      projectStorage.deleteProject(id);
      this.dispatchEvent(new CustomEvent('delete-project', { detail: id, bubbles: true, composed: true }));
    }
    this.savedSets = projectStorage.getProjects();
    this.librarySelected = [];
    if (!this.savedSets.length) {
      this.librarySelectMode = false;
    }
    this.dispatchEvent(new CustomEvent('toast', {
      detail: `Deleted ${count} loop${count > 1 ? 's' : ''}`,
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  };

  private getVibeSummary(): string {
    const parts = [this.progression?.genre || 'Pop', (this.progression?.mood || 'Warm').toLowerCase()];
    if (this.selectedBand) parts.push(this.selectedBand);
    return parts.join(' · ');
  }

  private onGenreClick(genre: string) {
    this.dispatchEvent(new CustomEvent('set-genre', { detail: genre, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private onMoodClick(mood: string) {
    this.dispatchEvent(new CustomEvent('set-mood', { detail: mood, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private onBandClick(bandName: string) {
    if (this.selectedBand === bandName) {
      this.selectedBand = null;
    } else {
      this.selectedBand = bandName;
    }
    const band = BANDS.find(b => b.name === this.selectedBand);
    if (band) {
      this.dispatchEvent(new CustomEvent('toast', { detail: `Active artist DNA: ${band.name}`, bubbles: true, composed: true }));
    }
    this.requestUpdate();
  }

  private onVibeSubmit(e: Event) {
    e.preventDefault();
    const prompt = this.freeText.trim();
    if (!prompt) return;
    this.dispatchEvent(new CustomEvent('freetext-generate', { detail: prompt, bubbles: true, composed: true }));
    this.vibeOpen = false;
    this.requestUpdate();
  }

  private togglePlay = () => {
    this.dispatchEvent(new CustomEvent('toggle-play', { bubbles: true, composed: true }));
  };

  private onJumpBar(index: number) {
    this.progressStep = index * 4;
    playbackEngine.playFromBar(index);
    if (!this.playing) {
      this.dispatchEvent(new CustomEvent('toggle-play', { bubbles: true, composed: true }));
    }
    this.requestUpdate();
  }

  getChordLadder(c: ChordBlock): string[] {
    if (!c) return [];
    const n = String(c.name);
    const root = (n.match(/^[A-G][#b]?/) || ['C'])[0];
    const suf = /sus/.test(n) ? ['sus4', '7sus4', '9sus4', 'maj7sus4']
      : (/dim/.test(n) ? ['dim', 'dim7', 'dim9']
      : (/^[A-G][#b]?m(?!aj)/.test(n) ? ['m', 'm6', 'm7', 'm9', 'mMaj7']
      : ['', '6', '7', 'maj7', 'maj9']));
    return suf.map(s => root + s);
  }

  getLadderHome(c: ChordBlock): number {
    return this.getChordLadder(c).indexOf(c && c.name);
  }

  private handlePadPointerDown(e: PointerEvent, index: number) {
    const chords = this.progression?.chords;
    const chord = chords ? chords[index] : null;
    if (!chord) return;

    let voicing = chord.voicing || '1st inversion';
    let zone = zoneForVoicing(voicing);
    let reach: number | undefined = undefined;

    const lad = this.getChordLadder(chord);
    const rung = this.getLadderHome(chord);

    if (e.currentTarget && typeof (e.currentTarget as HTMLElement).getBoundingClientRect === 'function') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const xRatio = Math.min(0.999, Math.max(0, (e.clientX - rect.left) / (rect.width || 1)));
      const yRatio = Math.min(0.999, Math.max(0, (e.clientY - rect.top) / (rect.height || 1)));

      if (yRatio < 0.34) {
        zone = 0;
        voicing = 'up an octave';
      } else if (yRatio > 0.67) {
        zone = 2;
        voicing = 'low, root position';
      } else {
        zone = 1;
        voicing = '1st inversion';
      }

      if (lad.length > 0) {
        reach = Math.min(lad.length - 1, Math.floor(xRatio * lad.length));
      }

      try {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      } catch (_) {}
    }

    const targetChordName = (reach !== undefined && lad[reach]) ? lad[reach] : chord.name;
    const showsReach = reach !== undefined && reach !== rung && !!lad[reach];

    const key = this.progression?.key || 'C';
    const scaleType = this.progression?.scaleType || 'MAJOR';
    const notes = notesForSymbol(targetChordName, preferFlatSpelling(key, scaleType));

    const vel = 88 + (index % 3) * 6;
    if (this.gridTimer) {
      clearTimeout(this.gridTimer);
      this.gridTimer = null;
    }
    this.padFlash = index;
    this.padHeld = index;
    this.gridFor = index;
    const meta = showsReach ? ('→ ' + targetChordName) : (zone === 0 ? 'UP AN OCTAVE' : (zone === 1 ? '1ST INVERSION' : 'ROOT POSITION'));
    this.lastPad = { idx: index, voicing, vel, zone, reach, meta };

    playbackEngine.playChordNotes(notes, 0.85, voicing, vel);

    this.pendingLatch = {
      index,
      reach,
      voicing,
      targetChordName,
    };

    this.requestUpdate();
  }

  private handlePadPointerMove(e: PointerEvent, index: number) {
    if (this.padHeld !== index) return;
    const chords = this.progression?.chords;
    const chord = chords ? chords[index] : null;
    if (!chord) return;

    if (e.currentTarget && typeof (e.currentTarget as HTMLElement).getBoundingClientRect === 'function') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const xRatio = Math.min(0.999, Math.max(0, (e.clientX - rect.left) / (rect.width || 1)));
      const yRatio = Math.min(0.999, Math.max(0, (e.clientY - rect.top) / (rect.height || 1)));

      let zone = 1;
      let voicing = '1st inversion';
      if (yRatio < 0.34) {
        zone = 0;
        voicing = 'up an octave';
      } else if (yRatio > 0.67) {
        zone = 2;
        voicing = 'low, root position';
      }

      const lad = this.getChordLadder(chord);
      const rung = this.getLadderHome(chord);
      const reach = lad.length > 0 ? Math.min(lad.length - 1, Math.floor(xRatio * lad.length)) : undefined;

      const targetChordName = (reach !== undefined && lad[reach]) ? lad[reach] : chord.name;
      const showsReach = reach !== undefined && reach !== rung && !!lad[reach];

      if (this.pendingLatch?.reach !== reach || this.pendingLatch?.voicing !== voicing) {
        this.pendingLatch = {
          index,
          reach,
          voicing,
          targetChordName,
        };

        const key = this.progression?.key || 'C';
        const scaleType = this.progression?.scaleType || 'MAJOR';
        const notes = notesForSymbol(targetChordName, preferFlatSpelling(key, scaleType));
        const vel = 88 + (index % 3) * 6;
        const meta = showsReach ? ('→ ' + targetChordName) : (zone === 0 ? 'UP AN OCTAVE' : (zone === 1 ? '1ST INVERSION' : 'ROOT POSITION'));
        this.lastPad = { idx: index, voicing, vel, zone, reach, meta };

        playbackEngine.playChordNotes(notes, 0.65, voicing, vel);
        this.requestUpdate();
      }
    }
  }

  private handlePadPointerUp(e?: PointerEvent) {
    if (e && e.currentTarget) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch (_) {}
    }
    this.padFlash = -1;
    this.padHeld = -1;
    if (this.gridTimer) {
      clearTimeout(this.gridTimer);
    }
    this.gridTimer = window.setTimeout(() => {
      this.gridFor = -1;
      this.requestUpdate();
    }, 1100);

    if (this.pendingLatch) {
      const { index, reach, voicing, targetChordName } = this.pendingLatch;
      this.pendingLatch = null;

      if (this.progression && this.progression.chords[index]) {
        const currentChord = this.progression.chords[index];
        const lad = this.getChordLadder(currentChord);
        const rung = this.getLadderHome(currentChord);
        const currentVoicing = currentChord.voicing || '1st inversion';

        const extensionChanged = reach !== undefined && reach !== rung && !!lad[reach] && !!targetChordName;
        const voicingChanged = !!voicing && voicing !== currentVoicing;

        if (extensionChanged || voicingChanged) {
          const initialChord = currentChord.initialChord || { ...currentChord };
          let updated: ChordBlock;

          if (extensionChanged && targetChordName) {
            const curQual = this.getChordQualityLabel(currentChord.name);
            const extLabel = this.getChordExtensionLabel(targetChordName);
            const key = this.progression.key || 'C';
            const scaleType = this.progression.scaleType || 'MAJOR';
            updated = applyVoicingToChord(currentChord, curQual, extLabel);
            updated.name = targetChordName;
            updated.notes = notesForSymbol(targetChordName, preferFlatSpelling(key, scaleType));
          } else {
            updated = { ...currentChord };
          }

          if (voicing) {
            updated.voicing = voicing;
          }

          if (updated.name === initialChord.name && (!initialChord.voicing || updated.voicing === initialChord.voicing)) {
            delete updated.initialChord;
          } else {
            updated.initialChord = initialChord;
          }

          const updatedChords = [...this.progression.chords];
          updatedChords[index] = updated;
          const newProg = { ...this.progression, chords: updatedChords };
          this.progression = newProg;

          this.dispatchEvent(new CustomEvent('progression-change', {
            detail: newProg,
            bubbles: true,
            composed: true,
          }));
          playbackEngine.setProgression(newProg, this.order);
        }
      }
    }

    this.requestUpdate();
  }

  private openSwap(index: number) {
    this.swapIndex = index;
    this.detailOpen = false;
    this.isInspectorOpen = true;
    this.abPick = null;
    this.abSide = 'before';
    this.abPlaying = false;
    this.mobileFeelIndex = 0;
    this.mobileChordIndex = 0;
    this.activeSwapFamily = 'Darker';
    playbackEngine.setABOverride(null);
    this.requestUpdate();
  }

  private getSwapFeelings(swapIndex: number): SwapFeelItem[] {
    if (!this.progression || !this.chordData.scales) return [];
    const isMinor = this.progression.scaleType?.includes('MINOR') ?? false;
    const groups = generateTheoryGroups(this.chordData, this.progression, swapIndex);
    const borrowedRows = generateBorrowedChords(this.chordData, this.progression, swapIndex);

    const feels: SwapFeelItem[] = groups.map(g => ({
      name: g.name,
      sub: GROUP_NOTES[g.name] ? GROUP_NOTES[g.name][this.showTheory ? 1 : 0] : (g.sub || ''),
      tension: g.tension,
      rows: g.rows.map(r => ({
        name: r.name,
        roman: r.roman || '',
        notes: r.notes || r.chord?.notes,
        sub: r.sub,
        tension: r.tension,
        chord: r.chord,
      })),
    }));

    feels.push({
      name: 'Borrowed',
      sub: `Four chords from the ${isMinor ? 'major' : 'minor'} version of this key`,
      tension: 0.45,
      rows: borrowedRows.map(r => ({
        name: r.name,
        roman: r.roman || '',
        notes: r.notes || r.chord?.notes,
        sub: r.sub,
        tension: r.tension,
        chord: r.chord,
      })),
    });

    const ordered = feels.filter(f => f.name !== 'Borrowed').sort((a, b) => a.tension - b.tension);
    const borrowed = feels.filter(f => f.name === 'Borrowed');
    return [...ordered, ...borrowed];
  }

  private handleSwapAudition(detail: {
    chordName: string;
    roman?: string;
    notes?: string[];
    sub: string;
    tension: number;
    feel: string;
    chord?: ChordBlock;
  }) {
    if (this.swapIndex === null || !this.progression) return;
    const original = this.progression.chords[this.swapIndex];
    const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);
    const resolvedNotes = detail.notes && detail.notes.length
      ? detail.notes
      : (notesForSymbol(detail.chordName, preferFlat) || original.notes);

    const pickedChord: ChordBlock = detail.chord ? {
      ...detail.chord,
      name: detail.chordName,
      notes: resolvedNotes,
      roman: detail.roman || detail.chord.roman || '',
      tension: detail.tension,
      functionLabel: detail.sub || detail.chord.functionLabel || 'Swapped in',
    } : {
      ...original,
      name: detail.chordName,
      notes: resolvedNotes,
      roman: detail.roman || '',
      tension: detail.tension,
      functionLabel: detail.sub || 'Swapped in',
    };

    this.abPick = {
      chord: detail.chordName,
      name: detail.chordName,
      roman: detail.roman || '',
      notes: resolvedNotes,
      tension: detail.tension,
      fn: detail.sub,
      functionLabel: detail.sub,
      label: detail.chordName,
    };
    this.abSide = 'after';
    this.activeSwapFamily = detail.feel;

    // Single chord audition
    playbackEngine.auditionChord(pickedChord, 0.8);

    // In-loop override so replacement is heard in rhythm
    playbackEngine.setABOverride({
      index: this.swapIndex,
      side: 'after',
      chord: pickedChord,
    });

    this.requestUpdate();
  }

  private openDetail(index: number) {
    this.detailIndex = index;
    this.detailOpen = true;
    this.swapIndex = null;
    this.isInspectorOpen = false;
    if (this.isMobile) {
      this.mobileDetailSheetOpen = true;
    }
    this.requestUpdate();
  }

  private clearSelection = () => {
    this.swapIndex = null;
    this.isInspectorOpen = false;
    this.detailOpen = false;
    this.abPick = null;
    this.abPlaying = false;
    playbackEngine.setABOverride(null);
    this.requestUpdate();
  };

  private selectAlternative(row: { name: string; tension: number; roman?: string; sub: string; chord: ChordBlock }) {
    const preferFlat = this.progression ? preferFlatSpelling(this.progression.key, this.progression.scaleType) : false;
    const chordNotes = (row.chord.notes && row.chord.notes.length > 0)
      ? row.chord.notes
      : notesForSymbol(row.chord.name, preferFlat);

    this.abPick = {
      chord: row.name,
      tension: row.tension,
      roman: row.roman || '',
      fn: row.sub,
      label: row.name,
    };
    this.abSide = 'after';

    if (this.swapIndex !== null && this.progression) {
      playbackEngine.setABOverride({
        index: this.swapIndex,
        side: 'after',
        chord: {
          ...this.progression.chords[this.swapIndex],
          name: row.name,
          roman: row.roman || '',
          tension: row.tension,
          notes: chordNotes,
        },
      });
    }
    playbackEngine.auditionChord({ ...row.chord, notes: chordNotes }, 0.8);
    this.requestUpdate();
  }

  private previewAlternative(name: string) {
    if (!this.progression) return;
    const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);
    const notes = notesForSymbol(name, preferFlat);
    playbackEngine.auditionChord({
      name,
      notes,
      tag: '',
      color: '#F2A79B',
      functionLabel: '',
      desc: '',
      degree: '',
      scaleKey: this.progression.key,
      roman: '',
      scaleLabel: '',
      tension: 0.2,
    }, 0.8);
  }

  private toggleABPlayback = () => {
    if (!this.progression || this.swapIndex === null) return;
    this.abPlaying = !this.abPlaying;
    if (this.abPlaying) {
      const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);
      const targetChord = (this.abSide === 'after' && this.abPick)
        ? {
          ...this.progression.chords[this.swapIndex],
          name: this.abPick.chord,
          roman: this.abPick.roman,
          tension: this.abPick.tension,
          notes: notesForSymbol(this.abPick.chord, preferFlat),
        }
        : this.progression.chords[this.swapIndex];

      playbackEngine.setABOverride({
        index: this.swapIndex,
        side: this.abSide,
        chord: targetChord,
      });
      if (!this.playing) {
        this.dispatchEvent(new CustomEvent('toggle-play', { bubbles: true, composed: true }));
      }
    } else {
      if (this.playing) {
        this.dispatchEvent(new CustomEvent('toggle-play', { bubbles: true, composed: true }));
      }
      playbackEngine.setABOverride(null);
    }
    this.requestUpdate();
  };

  private setABSide(side: 'before' | 'after') {
    this.abSide = side;
    if (this.swapIndex !== null && this.progression) {
      const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);
      if (side === 'before') {
        playbackEngine.setABOverride({
          index: this.swapIndex,
          side: 'before',
          chord: this.progression.chords[this.swapIndex],
        });
        playbackEngine.auditionChord(this.progression.chords[this.swapIndex], 0.8);
      } else if (this.abPick) {
        const candidateNotes = notesForSymbol(this.abPick.chord, preferFlat);
        const pickedChord: ChordBlock = {
          ...this.progression.chords[this.swapIndex],
          name: this.abPick.chord,
          roman: this.abPick.roman,
          tension: this.abPick.tension,
          notes: candidateNotes,
        };
        playbackEngine.setABOverride({ index: this.swapIndex, side: 'after', chord: pickedChord });
        playbackEngine.auditionChord(pickedChord, 0.8);
      }
    }
    this.requestUpdate();
  }

  private onAbCellClick(index: number) {
    if (!this.progression) return;
    const isSwapBar = index === this.swapIndex;
    if (isSwapBar && this.abSide === 'after' && this.abPick) {
      const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);
      const pickedChord: ChordBlock = {
        ...this.progression.chords[index],
        name: this.abPick.chord,
        roman: this.abPick.roman,
        tension: this.abPick.tension,
        notes: notesForSymbol(this.abPick.chord, preferFlat),
      };
      playbackEngine.auditionChord(pickedChord, 0.8);
    } else {
      playbackEngine.playChordAtIndex(index, 0.8);
    }
  }

  private confirmSwap = () => {
    if (this.swapIndex === null || !this.abPick || !this.progression) return;
    const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);
    const newNotes = this.abPick.notes && this.abPick.notes.length ? this.abPick.notes : notesForSymbol(this.abPick.chord, preferFlat);

    const updatedChords = [...this.progression.chords];
    const currentChord = updatedChords[this.swapIndex];
    const initialChord = currentChord.initialChord || { ...currentChord };
    updatedChords[this.swapIndex] = {
      ...currentChord,
      name: this.abPick.chord,
      roman: this.abPick.roman,
      tension: this.abPick.tension,
      notes: newNotes,
      initialChord,
    };

    const newProg = { ...this.progression, chords: updatedChords };
    this.progression = newProg;
    this.dispatchEvent(new CustomEvent('progression-change', { detail: newProg, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', { detail: `Swapped in ${this.abPick.chord}`, bubbles: true, composed: true }));

    playbackEngine.setABOverride(null);
    this.abPlaying = false;
    this.swapIndex = null;
    this.isInspectorOpen = false;
    this.mobileSheetOpen = false;
    this.abPick = null;
    this.requestUpdate();
  };

  private handleCyclerKeep = (detail?: { chordName?: string; chord?: ChordBlock; roman?: string; tension?: number; sub?: string; feel?: string }) => {
    if (detail && detail.chordName && (!this.abPick || this.abPick.chord !== detail.chordName)) {
      this.handleSwapAudition({
        chordName: detail.chordName,
        roman: detail.roman || '',
        tension: detail.tension ?? 0.3,
        sub: detail.sub || '',
        feel: detail.feel || 'Resolve home',
        chord: detail.chord,
      });
    }
    this.confirmSwap();
  };

  private onDecLength = () => {
    const curLen = this.progression?.chords.length || 4;
    if (curLen > MIN_PROGRESSION_LENGTH) {
      this.dispatchEvent(new CustomEvent('set-length', { detail: curLen - 1, bubbles: true, composed: true }));
    }
  };

  private onIncLength = () => {
    const curLen = this.progression?.chords.length || 4;
    if (curLen < MAX_PROGRESSION_LENGTH) {
      this.dispatchEvent(new CustomEvent('set-length', { detail: curLen + 1, bubbles: true, composed: true }));
    }
  };

  private onSetLength = (len: number) => {
    const curLen = this.progression?.chords.length || 4;
    if (curLen !== len) {
      this.dispatchEvent(new CustomEvent('set-length', { detail: len, bubbles: true, composed: true }));
    }
  };

  private onReroll = () => {
    this.dispatchEvent(new CustomEvent('reroll', { bubbles: true, composed: true }));
  };

  private onTheoryToggle = () => {
    this.showTheory = !this.showTheory;
    this.dispatchEvent(new CustomEvent('theory-toggle', { detail: this.showTheory, bubbles: true, composed: true }));
    this.requestUpdate();
  };

  private toggleInstrumentExpand = () => {
    this.expandedInstrument = !this.expandedInstrument;
    this.requestUpdate();
  };

  private getChordQualityLabel(name?: string): string {
    if (!name) return 'Major';
    const clean = name.trim().replace(/^[A-G][#b♭♯]?/i, '');
    if (/sus/i.test(clean)) return 'Suspended (sus)';
    if (/(dim|°)/i.test(clean)) return 'Diminished';
    if (/^(m|min)(?!aj)/.test(clean)) return 'Minor';
    return 'Major';
  }

  private getChordQualitySub(name?: string): string {
    const q = this.getChordQualityLabel(name);
    switch (q) {
      case 'Minor': return 'warm';
      case 'Suspended (sus)': return 'floating';
      case 'Diminished': return 'unstable';
      default: return 'bright';
    }
  }

  private getChordExtensionLabel(name?: string): string {
    if (!name) return 'None';
    const clean = name.trim().replace(/^[A-G][#b♭♯]?/i, '');
    if (/9/.test(clean)) return '9th';
    if (/(maj7|\(maj7\)|Δ)/i.test(clean) || /M7/.test(clean)) return 'Major 7th (M7)';
    if (/6/.test(clean)) return '6th';
    if (/(7|11|13)/.test(clean)) return '7th (dom / m7)';
    return 'None';
  }

  private getChordExtensionSub(name?: string): string {
    const ext = this.getChordExtensionLabel(name);
    switch (ext) {
      case '6th': return 'soft lift';
      case '7th (dom / m7)': return 'classic tension';
      case 'Major 7th (M7)': return 'lush, jazzy';
      case '9th': return 'wide, colorful';
      default: return 'triad only';
    }
  }

  private changeChordQuality(newQuality: string) {
    if (!this.progression) return;
    const chords = [...this.progression.chords];
    const currentChord = chords[this.detailIndex];
    if (!currentChord) return;

    const curExt = this.getChordExtensionLabel(currentChord.name);
    const updated = applyVoicingToChord(currentChord, newQuality, curExt);
    chords[this.detailIndex] = updated;

    const newProg = { ...this.progression, chords };
    this.progression = newProg;
    this.dispatchEvent(new CustomEvent('progression-change', { detail: newProg, bubbles: true, composed: true }));
    playbackEngine.auditionChord(updated, 0.8);
    this.dispatchEvent(new CustomEvent('toast', { detail: `Changed chord to ${updated.name}`, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private changeChordExtension(newExt: string) {
    if (!this.progression) return;
    const chords = [...this.progression.chords];
    const currentChord = chords[this.detailIndex];
    if (!currentChord) return;

    const curQual = this.getChordQualityLabel(currentChord.name);
    const updated = applyVoicingToChord(currentChord, curQual, newExt);
    chords[this.detailIndex] = updated;

    const newProg = { ...this.progression, chords };
    this.progression = newProg;
    this.dispatchEvent(new CustomEvent('progression-change', { detail: newProg, bubbles: true, composed: true }));
    playbackEngine.auditionChord(updated, 0.8);
    this.dispatchEvent(new CustomEvent('toast', { detail: `Changed chord to ${updated.name}`, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private renderDetailKeyboard(notes: string[] = []) {
    const ENHARMONIC_PC: Record<string, number> = {
      'C': 0, 'B#': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'Fb': 4,
      'F': 5, 'E#': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11, 'Cb': 11,
    };
    const highlightPcs = new Set(notes.map(n => ENHARMONIC_PC[n.replace(/\d+$/, '')] ?? -1));
    const whiteKeys = [
      { note: 'C', pc: 0 }, { note: 'D', pc: 2 }, { note: 'E', pc: 4 },
      { note: 'F', pc: 5 }, { note: 'G', pc: 7 }, { note: 'A', pc: 9 }, { note: 'B', pc: 11 },
    ];
    const whitePct = 100 / 7;
    const blackPct = whitePct * 0.58;
    const blackKeys = [
      { note: 'C#', pc: 1, after: 0 },
      { note: 'D#', pc: 3, after: 1 },
      { note: 'F#', pc: 6, after: 3 },
      { note: 'G#', pc: 8, after: 4 },
      { note: 'A#', pc: 10, after: 5 },
    ];

    return html`
      <div class="detail-mini-keyboard">
        <div style="display: flex;">
          ${whiteKeys.map(k => {
            const on = highlightPcs.has(k.pc);
            return html`<div class="white-key ${on ? 'active' : ''}">${k.note}</div>`;
          })}
        </div>
        ${blackKeys.map(bk => {
          const left = (bk.after + 1) * whitePct - blackPct / 2;
          const on = highlightPcs.has(bk.pc);
          return html`<div class="black-key ${on ? 'active' : ''}" style="left: ${left}%;"></div>`;
        })}
      </div>
    `;
  }

  private get feelChanged(): boolean {
    return this.playStyle !== FEEL_DEFAULTS.playStyle ||
           this.swing !== FEEL_DEFAULTS.swing ||
           this.spread !== FEEL_DEFAULTS.spread ||
           this.density !== FEEL_DEFAULTS.density ||
           this.humanise !== FEEL_DEFAULTS.humanise ||
           this.tone !== FEEL_DEFAULTS.tone ||
           Object.keys(this.barFeel).length > 0 ||
           Object.keys(this.advOverride).length > 0;
  }

  private resetFeel() {
    this.playStyle = FEEL_DEFAULTS.playStyle;
    this.swing = FEEL_DEFAULTS.swing;
    this.spread = FEEL_DEFAULTS.spread;
    this.density = FEEL_DEFAULTS.density;
    this.humanise = FEEL_DEFAULTS.humanise;
    this.tone = FEEL_DEFAULTS.tone;
    this.barFeel = {};
    this.advOverride = {};
    this.humanEngineState = null;
    playbackEngine.setPlayStyle(this.playStyle);
    playbackEngine.setFeelSettings({
      playStyle: this.playStyle,
      swing: this.swing,
      spread: this.spread,
      density: this.density,
      humanise: this.humanise,
      tone: this.tone,
      barFeel: {},
      advOverride: {},
      humanState: undefined,
    });
    setMasterTone(this.tone);
    this.requestUpdate();
  }

  private get fScopeBar(): number | null {
    return typeof this.feelScope === 'number' ? this.feelScope : null;
  }

  private fget(k: string): any {
    const bar = this.fScopeBar;
    if (bar !== null && this.barFeel[bar] && this.barFeel[bar][k] !== undefined) {
      return this.barFeel[bar][k];
    }
    return (this as any)[k];
  }

  private fset(k: string, v: any) {
    const bar = this.fScopeBar;
    if (bar === null) {
      (this as any)[k] = v;
      if (k === 'playStyle') {
        playbackEngine.setPlayStyle(v);
        this.dispatchEvent(new CustomEvent('set-play-style', { detail: v, bubbles: true, composed: true }));
      } else if (k === 'tone') {
        playbackEngine.setFeelSettings({ tone: v });
        setMasterTone(v);
      } else {
        playbackEngine.setFeelSettings({ [k]: v });
      }
    } else {
      const bf = { ...this.barFeel };
      bf[bar] = { ...(bf[bar] || {}), [k]: v };
      this.barFeel = bf;
      playbackEngine.setFeelSettings({ barFeel: bf });
    }
    this.requestUpdate();
  }

  private getPatternShortName(val?: string): string {
    const pattern = val || this.fget('playStyle') || this.playStyle || 'Block chords';
    const match = FEEL_AXES[0].steps.find(s => s.v === pattern);
    return match ? match.name : 'Block';
  }

  private get feelChipLabel(): string {
    return `Feel · ${this.getPatternShortName()}`;
  }

  private getDerivedParams() {
    const numOf = (k: string) => {
      const v = this.fget(k);
      return typeof v === 'number' ? v : 0;
    };
    const currentPattern = this.fget('playStyle') || this.playStyle || 'Block chords';
    const styleObj = USER_PLAY_STYLES.find(p => p.name === currentPattern);
    const patch = (styleObj?.patch ?? {}) as Record<string, any>;
    const genre = this.progression?.genre ?? 'Pop';
    const profile = GENRE_HUMANIZE[genre] ?? {};

    return {
      spread: +(numOf('spread') / 100).toFixed(2),
      duration: +(currentPattern === 'Half-time' ? 1.6 : (numOf('density') > 70 ? 0.65 : 1)).toFixed(2),
      humanVariance: +(numOf('humanise') / 100).toFixed(2),
      microTiming: +((numOf('swing') / 100) * 0.5 + (numOf('humanise') / 100) * 0.3).toFixed(2),
      arpMode: (patch.arpMode as string) ?? (profile.arpMode as string) ?? 'off',
      arpRate: (patch.arpRate as string) ?? (profile.arpRate as string) ?? '1/16',
      arpRange: (patch.arpRange as number) ?? (profile.arpRange as number) ?? 1,
      arpGate: 0.85,
      minVelocity: (profile.minVelocity as number) ?? 60,
      maxVelocity: (profile.maxVelocity as number) ?? 110,
    };
  }

  private get activeEngineParams() {
    const derived = this.getDerivedParams();
    return {
      spread: this.advOverride.spread !== undefined ? this.advOverride.spread : derived.spread,
      duration: this.advOverride.duration !== undefined ? this.advOverride.duration : derived.duration,
      humanVariance: this.advOverride.humanVariance !== undefined ? this.advOverride.humanVariance : derived.humanVariance,
      microTiming: this.advOverride.microTiming !== undefined ? this.advOverride.microTiming : derived.microTiming,
      arpMode: this.advOverride.arpMode !== undefined ? this.advOverride.arpMode : derived.arpMode,
      arpRate: this.advOverride.arpRate !== undefined ? this.advOverride.arpRate : derived.arpRate,
      arpRange: this.advOverride.arpRange !== undefined ? this.advOverride.arpRange : derived.arpRange,
      arpGate: this.advOverride.arpGate !== undefined ? this.advOverride.arpGate : derived.arpGate,
      minVelocity: this.advOverride.minVelocity !== undefined ? this.advOverride.minVelocity : derived.minVelocity,
      maxVelocity: this.advOverride.maxVelocity !== undefined ? this.advOverride.maxVelocity : derived.maxVelocity,
    };
  }

  private onParameterOverride = (e: CustomEvent<{ param: string; value: number | string }>) => {
    const { param, value } = e.detail;
    this.advOverride = { ...this.advOverride, [param]: value };
    playbackEngine.setFeelSettings({ advOverride: this.advOverride });
    this.requestUpdate();
  };

  private onParameterRelink = (e: CustomEvent<{ param: string }>) => {
    const { param } = e.detail;
    const next = { ...this.advOverride };
    delete next[param];
    this.advOverride = next;
    playbackEngine.setFeelSettings({ advOverride: this.advOverride });
    this.requestUpdate();
  };

  private nudgeBpm(d: number) {
    const cur = this.progression?.bpm || 84;
    const next = Math.max(40, Math.min(240, cur + d));
    if (this.progression) {
      this.progression.bpm = next;
    }
    playbackEngine.setBpm(next);
    this.dispatchEvent(new CustomEvent('set-bpm', { detail: next, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private setDirectBpm(bpm: number) {
    if (isNaN(bpm)) return;
    const next = Math.max(40, Math.min(240, bpm));
    if (this.progression) {
      this.progression.bpm = next;
    }
    playbackEngine.setBpm(next);
    this.dispatchEvent(new CustomEvent('set-bpm', { detail: next, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private setBarsPerChord(n: number) {
    this.barsPerChord = n;
    playbackEngine.setBarsPerChord(n);
    this.requestUpdate();
  }

  private getCurrentScaleAbbrev(): string {
    const scale = (this.progression?.scaleType || 'MAJOR').toUpperCase().replace(/\s+/g, '_');
    const opt = SCALE_OPTIONS.find(s => s.type === scale || (s.type === 'NATURAL_MINOR' && scale === 'MINOR'));
    return opt ? opt.abbrev : 'Maj';
  }

  private getCurrentScaleLabel(): string {
    const scale = (this.progression?.scaleType || 'MAJOR').toUpperCase().replace(/\s+/g, '_');
    const opt = SCALE_OPTIONS.find(s => s.type === scale || (s.type === 'NATURAL_MINOR' && scale === 'MINOR'));
    return opt ? opt.label : 'Major';
  }

  private selectRoot(rootStr: string) {
    if (!this.progression) return;
    const targetScale = this.progression.scaleType || 'MAJOR';
    const transposed = transposeProgression(this.progression, rootStr, targetScale);
    this.progression = transposed;
    playbackEngine.setProgression(transposed);
    this.dispatchEvent(new CustomEvent('progression-change', { detail: transposed, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', {
      detail: `Transposed to ${transposed.key} ${this.getCurrentScaleLabel()}`,
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  private selectScale(scaleType: string) {
    if (!this.progression) return;
    const shifted = shiftProgressionScale(this.progression, scaleType);
    this.progression = shifted;
    playbackEngine.setProgression(shifted);
    this.dispatchEvent(new CustomEvent('progression-change', { detail: shifted, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', {
      detail: `Scale shifted to ${shifted.key} ${this.getCurrentScaleLabel()}`,
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  private selectKey(keyStr: string) {
    if (!this.progression) return;
    const transposed = transposeProgression(this.progression, keyStr);
    this.progression = transposed;
    playbackEngine.setProgression(transposed);
    this.dispatchEvent(new CustomEvent('progression-change', { detail: transposed, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', { detail: `Transposed to ${transposed.key} ${this.getCurrentScaleLabel()}`, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private onHumanChange = (e: CustomEvent<HumanState>) => {
    if (e.detail) {
      this.humanEngineState = e.detail;
      playbackEngine.setFeelSettings({
        playStyle: this.playStyle,
        swing: this.swing,
        spread: this.spread,
        density: this.density,
        tone: this.tone,
        barFeel: this.barFeel,
        advOverride: this.advOverride,
        humanState: e.detail,
      });
    }
  };

  private onHumanPreview = (e: CustomEvent<HumanState>) => {
    if (e.detail) {
      this.humanEngineState = e.detail;
      playbackEngine.setFeelSettings({
        playStyle: this.playStyle,
        swing: this.swing,
        spread: this.spread,
        density: this.density,
        tone: this.tone,
        barFeel: this.barFeel,
        advOverride: this.advOverride,
        humanState: e.detail,
      });
    }
  };



  private onScaleDegreeClick(di: number, chordName: string, inLoop: boolean, barIdx: number) {
    this.auditionDeg = di;
    this.auditionName = chordName;
    this.auditionBar = inLoop ? barIdx + 1 : 0;
    const preferFlat = preferFlatSpelling(this.progression?.key || 'C', this.progression?.scaleType || 'MAJOR');
    const notes = notesForSymbol(chordName, preferFlat);
    playbackEngine.auditionChord({ name: chordName, notes } as ChordBlock, 0.8);
    this.requestUpdate();
  }

  private getTheoryData(chords: ChordBlock[]) {
    const curScaleType = (this.progression?.scaleType || 'MAJOR').toUpperCase().replace(/\s+/g, '_');
    const SCALE = THEORY_SCALES[curScaleType] || THEORY_SCALES[curScaleType.includes('MINOR') ? 'NATURAL_MINOR' : 'MAJOR'] || THEORY_SCALES.MAJOR;
    const keyTonicName = this.progression?.key || 'C';
    const keyTonicPc = PITCH_CLASS[keyTonicName.replace(/♭/g, 'b').replace(/♯/g, '#').trim()] ?? 0;
    const preferFlat = preferFlatSpelling(keyTonicName, curScaleType);

    const scaleName = keyTonicName.replace('b', '♭') + ' ' + SCALE.name;
    const loopRootPcs = chords.map(c => {
      const parsed = parseChordSymbol(c.name);
      return PITCH_CLASS[parsed.root] ?? 0;
    });

    const degIndexOf = (pc: number) => SCALE.steps.indexOf(((pc - keyTonicPc) % 12 + 12) % 12);

    const scaleDegrees = SCALE.steps.map((st, di) => {
      const pc = (keyTonicPc + st) % 12;
      const noteName = SCALE_NOTE_NAMES[pc];
      const chordName = noteName + SCALE.quals[di];
      const barIdx = loopRootPcs.indexOf(pc);
      const inLoop = barIdx >= 0;
      const on = this.auditionDeg === di;
      return {
        di,
        roman: SCALE.romans[di],
        name: chordName,
        fn: SCALE.fns[di],
        inLoop,
        on,
        barIdx,
        aria: `Hear ${chordName}, the ${SCALE.fns[di].toLowerCase()} of ${scaleName}`,
      };
    });

    const scaleHint = this.auditionDeg === null || this.auditionDeg < 0
      ? 'Tap a degree to hear it'
      : (this.auditionBar ? `${this.auditionName} · bar ${this.auditionBar} of the loop` : `${this.auditionName} · not in this loop`);

    const romanFormula = chords.map(c => c.roman || SCALE.romans[Math.max(0, degIndexOf(PITCH_CLASS[parseChordSymbol(c.name).root] ?? 0))]).join(' – ');
    const keyModeLine = keyTonicName.replace('b', '♭') + ' ' + SCALE.name;
    const cadences = detectProgressionCadences(chords);
    const voiceLinks = analyzeVoiceLeading(chords);
    const setNote = (this.progression as any)?.note || '';

    return {
      scaleName,
      scaleHint,
      scaleDegrees,
      romanFormula,
      keyModeLine,
      cadences,
      voiceLinks,
      setNote,
    };
  }

  private renderScaleChords(scaleName: string, scaleHint: string, scaleDegrees: ReturnType<typeof this.getTheoryData>['scaleDegrees'], isMobileView: boolean) {
    const moodColor = getMoodColor(this.progression?.mood || 'Warm');
    return html`
      <div
        class="scale-chords-panel"
        style="position: relative; z-index: 2; background: var(--cv-cream); border-radius: ${isMobileView ? '18px' : '20px'}; padding: ${isMobileView ? '11px 12px 13px' : '13px 15px 15px'}; margin-top: ${isMobileView ? '12px' : '0'}; margin-bottom: ${isMobileView ? '0' : '12px'}; flex-shrink: 0;"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: ${isMobileView ? '8px' : '12px'}; flex-wrap: wrap;">
          <div style="font-size: ${isMobileView ? '9.5px' : '10px'}; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
            Scale · ${scaleName}
          </div>
          <div style="font-size: ${isMobileView ? '10.5px' : '11px'}; font-weight: 700; color: rgba(46, 39, 31, 0.45);">
            ${scaleHint}
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(${isMobileView ? '76px' : '92px'}, 1fr)); gap: ${isMobileView ? '5px' : '6px'}; margin-top: ${isMobileView ? '9px' : '10px'}; min-width: 0;">
          ${scaleDegrees.map(d => html`
            <button
              class="scale-degree-btn ${d.on ? 'active' : ''} ${d.inLoop ? 'in-loop' : ''}"
              style="border: none; font-family: inherit; text-align: left; cursor: pointer; min-width: 0; min-height: 46px; padding: 7px 10px 8px; border-radius: 13px; transition: background 160ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), box-shadow 160ms ease, transform 160ms ease; background: ${d.on ? moodColor : (d.inLoop ? 'var(--cv-surface-2, #F1E4CC)' : 'transparent')}; box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, ${d.on ? 0.22 : (d.inLoop ? 0.14 : 0.13)}); outline: none;"
              @click=${() => this.onScaleDegreeClick(d.di, d.name, d.inLoop, d.barIdx)}
              aria-label="${d.aria}"
            >
              <div style="display: flex; align-items: center; gap: 5px;">
                <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 0.9px; color: var(--cv-label);">${d.roman}</div>
                <div style="width: 5px; height: 5px; border-radius: 50%; background: ${d.inLoop ? 'rgba(46, 39, 31, 0.42)' : 'transparent'}; flex-shrink: 0;"></div>
              </div>
              <div style="font-size: 14.5px; font-weight: 800; letter-spacing: -0.015em; line-height: 1.1; color: var(--cv-ink); margin-top: 1px;">${d.name}</div>
              <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; margin-top: 1px; color: var(--cv-ink-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${d.fn}</div>
            </button>
          `)}
        </div>
      </div>
    `;
  }

  private renderTempoDrawerDesktop() {
    if (!this.tempoOpen) return '';
    const bpmVal = this.progression?.bpm || 84;
    return html`
      <div class="tempo-popover-desktop" style="background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px; display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px;">
        <div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Tempo</div>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
            <button
              @click=${() => this.nudgeBpm(-1)}
              aria-label="Slower"
              style="border: none; font-family: inherit; width: 36px; height: 36px; border-radius: 11px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 17px; font-weight: 800; cursor: pointer;"
            >&#8722;</button>
            <input
              type="number"
              min="40"
              max="240"
              .value=${bpmVal.toString()}
              @change=${(e: Event) => this.setDirectBpm(parseInt((e.target as HTMLInputElement).value, 10))}
              style="border: 1px solid rgba(46,39,31,0.18); border-radius: 9px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 20px; font-weight: 800; letter-spacing: -0.02em; width: 66px; text-align: center; padding: 4px 0; font-family: inherit;"
              aria-label="Tempo BPM"
            />
            <button
              @click=${() => this.nudgeBpm(1)}
              aria-label="Faster"
              style="border: none; font-family: inherit; width: 36px; height: 36px; border-radius: 11px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 17px; font-weight: 800; cursor: pointer;"
            >+</button>
          </div>
        </div>
        <div style="min-width: 190px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Bars per chord</div>
          <div style="display: flex; gap: 6px; margin-top: 6px;">
            ${[1, 2, 4].map(n => html`
              <button
                style="flex: 1; text-align: center; padding: 10px 0; border: none; font-family: inherit; border-radius: 11px; font-size: 12.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${this.barsPerChord === n ? 'var(--cv-ink, #2E271F)' : 'var(--cv-cream, #FBF3E6)'}; color: ${this.barsPerChord === n ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                @click=${() => this.setBarsPerChord(n)}
              >
                ${n === 1 ? '1 bar' : `${n} bars`}
              </button>
            `)}
          </div>
        </div>
        <div style="flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Key Root</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              ${ROOT_OPTIONS.map(opt => {
                const curKey = (this.progression?.key || 'C').replace(/♭/g, 'b').replace(/♯/g, '#').trim();
                const curPc = PITCH_CLASS[curKey] ?? 0;
                const optPc = PITCH_CLASS[opt.root] ?? 0;
                const active = curPc === optPc;
                return html`
                  <button
                    style="border: none; font-family: inherit; padding: 7px 11px; border-radius: 100px; font-size: 11.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${active ? 'var(--cv-ink, #2E271F)' : 'var(--cv-cream, #FBF3E6)'}; color: ${active ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                    @click=${() => this.selectRoot(opt.root)}
                    aria-label="Root note ${opt.label}"
                  >
                    ${opt.label}
                  </button>
                `;
              })}
            </div>
          </div>
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Scale / Mode</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              ${SCALE_OPTIONS.map(opt => {
                const curScale = (this.progression?.scaleType || 'MAJOR').toUpperCase().replace(/\s+/g, '_');
                const active = curScale === opt.type || (opt.type === 'NATURAL_MINOR' && curScale === 'MINOR');
                return html`
                  <button
                    style="border: none; font-family: inherit; padding: 7px 11px; border-radius: 100px; font-size: 11.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${active ? 'var(--cv-ink, #2E271F)' : 'var(--cv-cream, #FBF3E6)'}; color: ${active ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                    @click=${() => this.selectScale(opt.type)}
                    aria-label="Scale ${opt.label}"
                  >
                    ${opt.label}
                  </button>
                `;
              })}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderFeelDrawerDesktop() {
    if (!this.feelOpen) return '';
    const feelScopeNote = this.fScopeBar === null
      ? 'Everything below applies to every chord in the loop.'
      : `Only ${this.progression?.chords?.[this.fScopeBar]?.name || 'this chord'} plays this way — the rest keep the loop feel.`;

    return html`
      <div class="feel-popover-desktop" style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); background: var(--cv-cream); border-radius: 18px; padding: 14px 16px 16px; margin-top: 11px;">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); flex-shrink: 0;">Feel</div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; flex: 1; min-width: 0;">
            <button
              type="button"
              style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${this.fScopeBar === null ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${this.fScopeBar === null ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
              @click=${() => { this.feelScope = 'loop'; }}
              aria-label="Whole loop feel"
            >
              Whole loop
            </button>
            ${(this.progression?.chords || []).map((c, ci) => {
              const on = this.fScopeBar === ci;
              const dirty = !!this.barFeel[ci];
              return html`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${on ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${on ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                  @click=${() => { this.feelScope = ci; }}
                  aria-label="${c.name}, ${on ? 'editing' : 'edit feel'}"
                >
                  ${c.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${on ? 'var(--cv-cream, #FBF3E6)' : '#9E5D53'}; opacity: ${dirty ? 1 : 0}; transition: opacity 150ms ease;"></span>
                </button>
              `;
            })}
          </div>
          ${this.feelChanged ? html`
            <button
              type="button"
              @click=${this.resetFeel}
              style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11.5px; font-weight: 800; cursor: pointer; padding: 6px 8px; border-radius: 9px;"
            >Reset</button>
          ` : ''}
          <button
            type="button"
            @click=${() => { this.feelOpen = false; }}
            aria-label="Close feel and tone"
            style="border: none; font-family: inherit; background: transparent; color: rgba(46,39,31,0.5); width: 30px; height: 30px; border-radius: 50%; font-size: 16px; font-weight: 800; cursor: pointer; flex-shrink: 0;"
          >×</button>
        </div>
        <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 7px; text-wrap: pretty;">
          ${feelScopeNote}
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 8px 22px; margin-top: 10px;">
          ${FEEL_AXES.map(d => {
            const cur = this.fget(d.k);
            let nearest = d.steps[0];
            if (typeof cur !== 'number') {
              nearest = d.steps.find(s => s.v === cur) || d.steps[0];
            } else {
              d.steps.forEach(s => {
                if (Math.abs(Number(s.v) - Number(cur)) < Math.abs(Number(nearest.v) - Number(cur))) nearest = s;
              });
            }
            return html`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${d.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${d.hint}</div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                  ${d.steps.map(s => {
                    const on = s.v === nearest.v;
                    return html`
                      <button
                        type="button"
                        style="border: none; font-family: inherit; flex: 1 1 auto; min-width: fit-content; min-height: 44px; padding: 0 11px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${on ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${on ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                        @click=${() => this.fset(d.k, s.v)}
                        aria-label="${d.label}: ${s.name}"
                      >
                        ${s.name}
                      </button>
                    `;
                  })}
                </div>
              </div>
            `;
          })}
        </div>
        <button
          type="button"
          @click=${() => { this.advOpen = !this.advOpen; }}
          style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; padding: 8px 10px; margin: 10px 0 0 -10px; border-radius: 9px;"
          aria-label="Show the engine parameters these choices set"
        >
          Engine parameters <span style="font-size: 9px;">${this.advOpen ? '▲' : '▼'}</span>
        </button>
        ${this.advOpen ? html`
          <div style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; margin-top: 6px;">
            <human-panel
              layout="embedded"
              .spread=${this.activeEngineParams.spread}
              .duration=${this.activeEngineParams.duration}
              .humanVariance=${this.activeEngineParams.humanVariance}
              .microTiming=${this.activeEngineParams.microTiming}
              .arpMode=${this.activeEngineParams.arpMode}
              .arpRate=${this.activeEngineParams.arpRate}
              .arpRange=${this.activeEngineParams.arpRange}
              .arpGate=${this.activeEngineParams.arpGate}
              .minVelocity=${this.activeEngineParams.minVelocity}
              .maxVelocity=${this.activeEngineParams.maxVelocity}
              .parameterOverrides=${this.advOverride}
              .sourceLabels=${{
                spread: 'Spread',
                duration: 'Pattern + Density',
                humanVariance: 'Humanise',
                microTiming: 'Swing + Humanise',
                arpMode: 'Pattern',
                arpRate: 'Pattern',
                arpRange: 'Pattern',
                arpGate: 'Pattern',
                minVelocity: 'Genre',
                maxVelocity: 'Genre',
              }}
              style="--human-bg: transparent; --human-surface: var(--cv-surface, #F6EADB); --human-surface-2: var(--cv-surface-2, #F1E4CC); --human-border: rgba(46,39,31,0.12); --human-text-primary: var(--cv-ink, #2E271F); --human-text-secondary: rgba(46,39,31,0.45); --human-accent: #9E5D53; --human-accent-hover: #804A41; width: 100%; min-width: 0; box-shadow: none;"
              @parameter-override=${this.onParameterOverride}
              @parameter-relink=${this.onParameterRelink}
              @human-change=${this.onHumanChange}
            ></human-panel>
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderTempoSheetMobile() {
    if (!this.tempoOpen) return '';
    const bpmVal = this.progression?.bpm || 84;
    return html`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${() => { this.tempoOpen = false; }}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; background: var(--cv-surface); border-radius: 26px 26px 0 0; padding: 14px 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); flex: 1; min-width: 0;">Key, tempo and length</div>
            <button
              @click=${() => { this.tempoOpen = false; }}
              style="border: none; font-family: inherit; background: var(--cv-surface-2); color: var(--cv-ink); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
            >Done</button>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: var(--cv-cream); border-radius: 16px; padding: 12px 14px; margin-top: 13px;">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Tempo</div>
              <div style="display: flex; align-items: baseline; gap: 6px; margin-top: 2px;">
                <input
                  type="number"
                  min="40"
                  max="240"
                  .value=${bpmVal.toString()}
                  @change=${(e: Event) => this.setDirectBpm(parseInt((e.target as HTMLInputElement).value, 10))}
                  style="border: 1px solid rgba(46,39,31,0.18); border-radius: 9px; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-size: 22px; font-weight: 800; letter-spacing: -0.02em; width: 68px; text-align: center; padding: 4px 0; font-family: inherit;"
                  aria-label="Tempo BPM"
                />
                <span style="font-size: 12px; font-weight: 800; color: var(--cv-ink-muted);">bpm</span>
              </div>
            </div>
            <button
              @click=${() => this.nudgeBpm(-1)}
              aria-label="Slower"
              style="border: none; font-family: inherit; width: 44px; height: 44px; border-radius: 14px; background: var(--cv-surface-2); color: var(--cv-ink); font-size: 19px; font-weight: 800; cursor: pointer;"
            >&#8722;</button>
            <button
              @click=${() => this.nudgeBpm(1)}
              aria-label="Faster"
              style="border: none; font-family: inherit; width: 44px; height: 44px; border-radius: 14px; background: var(--cv-surface-2); color: var(--cv-ink); font-size: 19px; font-weight: 800; cursor: pointer;"
            >+</button>
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Bars per chord</div>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            ${[1, 2, 4].map(n => html`
              <button
                style="flex: 1; text-align: center; padding: 10px 0; border: none; font-family: inherit; border-radius: 11px; font-size: 12.5px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${this.barsPerChord === n ? 'var(--cv-ink, #2E271F)' : 'var(--cv-cream, #FBF3E6)'}; color: ${this.barsPerChord === n ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                @click=${() => this.setBarsPerChord(n)}
              >
                ${n === 1 ? '1 bar' : `${n} bars`}
              </button>
            `)}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Key Root</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${ROOT_OPTIONS.map(opt => {
              const curKey = (this.progression?.key || 'C').replace(/♭/g, 'b').replace(/♯/g, '#').trim();
              const curPc = PITCH_CLASS[curKey] ?? 0;
              const optPc = PITCH_CLASS[opt.root] ?? 0;
              const active = curPc === optPc;
              return html`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${active ? 'var(--cv-ink, #2E271F)' : 'var(--cv-cream, #FBF3E6)'}; color: ${active ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                  @click=${() => this.selectRoot(opt.root)}
                  aria-label="Root note ${opt.label}"
                >
                  ${opt.label}
                </button>
              `;
            })}
          </div>
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Scale / Mode</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${SCALE_OPTIONS.map(opt => {
              const curScale = (this.progression?.scaleType || 'MAJOR').toUpperCase().replace(/\s+/g, '_');
              const active = curScale === opt.type || (opt.type === 'NATURAL_MINOR' && curScale === 'MINOR');
              return html`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${active ? 'var(--cv-ink, #2E271F)' : 'var(--cv-cream, #FBF3E6)'}; color: ${active ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                  @click=${() => this.selectScale(opt.type)}
                  aria-label="Scale ${opt.label}"
                >
                  ${opt.label}
                </button>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  private renderFeelSheetMobile() {
    if (!this.feelOpen) return '';
    const feelScopeNote = this.fScopeBar === null
      ? 'Everything below applies to every chord in the loop.'
      : `Only ${this.progression?.chords?.[this.fScopeBar]?.name || 'this chord'} plays this way — the rest keep the loop feel.`;

    return html`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${() => { this.feelOpen = false; }}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; max-height: calc(100% - 24px); overflow-y: auto; overscroll-behavior: contain; background: var(--cv-surface, #F6EADB); border-radius: 26px 26px 0 0; padding: 0 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="position: sticky; top: 0; z-index: 2; background: var(--cv-surface, #F6EADB); padding: 14px 0 10px;">
            <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">Feel</div>
              ${this.feelChanged ? html`
                <button
                  type="button"
                  @click=${this.resetFeel}
                  style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 12px; font-weight: 800; cursor: pointer; padding: 8px 10px; border-radius: 10px;"
                >Reset</button>
              ` : ''}
              <button
                type="button"
                @click=${() => { this.feelOpen = false; }}
                style="border: none; font-family: inherit; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink, #2E271F); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
              >Done</button>
            </div>
          </div>
          <div style="display: flex; gap: 5px; overflow-x: auto; margin-top: 2px; padding-bottom: 2px;">
            <button
              type="button"
              style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; background: ${this.fScopeBar === null ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${this.fScopeBar === null ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
              @click=${() => { this.feelScope = 'loop'; }}
            >
              Whole loop
            </button>
            ${(this.progression?.chords || []).map((c, ci) => {
              const on = this.fScopeBar === ci;
              const dirty = !!this.barFeel[ci];
              return html`
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; background: ${on ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${on ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                  @click=${() => { this.feelScope = ci; }}
                >
                  ${c.name}
                  <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${on ? 'var(--cv-cream, #FBF3E6)' : '#9E5D53'}; opacity: ${dirty ? 1 : 0};"></span>
                </button>
              `;
            })}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 8px; text-wrap: pretty;">
            ${feelScopeNote}
          </div>
          <div style="display: flex; flex-direction: column; gap: 13px; margin-top: 14px;">
            ${FEEL_AXES.map(d => {
              const cur = this.fget(d.k);
              let nearest = d.steps[0];
              if (typeof cur !== 'number') {
                nearest = d.steps.find(s => s.v === cur) || d.steps[0];
              } else {
                d.steps.forEach(s => {
                  if (Math.abs(Number(s.v) - Number(cur)) < Math.abs(Number(nearest.v) - Number(cur))) nearest = s;
                });
              }
              return html`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${d.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${d.hint}</div>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px;">
                    ${d.steps.map(s => {
                      const on = s.v === nearest.v;
                      return html`
                        <button
                          type="button"
                          style="border: none; font-family: inherit; flex: 1 1 auto; min-width: fit-content; min-height: 44px; padding: 0 11px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; background: ${on ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${on ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                          @click=${() => this.fset(d.k, s.v)}
                          aria-label="${d.label}: ${s.name}"
                        >
                          ${s.name}
                        </button>
                      `;
                    })}
                  </div>
                </div>
              `;
            })}
          </div>
          <button
            type="button"
            @click=${() => { this.advOpen = !this.advOpen; }}
            style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; padding: 8px 10px; margin: 10px 0 0 -10px; border-radius: 9px;"
            aria-label="Show the engine parameters these choices set"
          >
            Engine parameters <span style="font-size: 9px;">${this.advOpen ? '▲' : '▼'}</span>
          </button>
          ${this.advOpen ? html`
            <div style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; margin-top: 6px;">
              <human-panel
                layout="embedded"
                .spread=${this.activeEngineParams.spread}
                .duration=${this.activeEngineParams.duration}
                .humanVariance=${this.activeEngineParams.humanVariance}
                .microTiming=${this.activeEngineParams.microTiming}
                .arpMode=${this.activeEngineParams.arpMode}
                .arpRate=${this.activeEngineParams.arpRate}
                .arpRange=${this.activeEngineParams.arpRange}
                .arpGate=${this.activeEngineParams.arpGate}
                .minVelocity=${this.activeEngineParams.minVelocity}
                .maxVelocity=${this.activeEngineParams.maxVelocity}
                .parameterOverrides=${this.advOverride}
                .sourceLabels=${{
                  spread: 'Spread',
                  duration: 'Pattern + Density',
                  humanVariance: 'Humanise',
                  microTiming: 'Swing + Humanise',
                  arpMode: 'Pattern',
                  arpRate: 'Pattern',
                  arpRange: 'Pattern',
                  arpGate: 'Pattern',
                  minVelocity: 'Genre',
                  maxVelocity: 'Genre',
                }}
                style="--human-bg: transparent; --human-surface: var(--cv-surface, #F6EADB); --human-surface-2: var(--cv-surface-2, #F1E4CC); --human-border: rgba(46,39,31,0.12); --human-text-primary: var(--cv-ink, #2E271F); --human-text-secondary: rgba(46,39,31,0.45); --human-accent: #9E5D53; --human-accent-hover: #804A41; width: 100%; min-width: 0; box-shadow: none;"
                @parameter-override=${this.onParameterOverride}
                @parameter-relink=${this.onParameterRelink}
                @human-change=${this.onHumanChange}
              ></human-panel>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private renderTheoryStrip(theory: ReturnType<typeof this.getTheoryData>) {
    const { keyModeLine, romanFormula, cadences, voiceLinks, setNote } = theory;
    return html`
      <div class="theory-strip-box" style="margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Key</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${keyModeLine}</div>
        </div>
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 9px; padding-top: 9px; border-top: 1px solid rgba(46, 39, 31, 0.08);">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">Formula</div>
          <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink); letter-spacing: 0.3px; text-align: right;">${romanFormula}</div>
        </div>

        ${cadences.length ? html`
          <div>
            <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 9px;">Cadences</div>
            <div style="display: flex; flex-direction: column; gap: 7px;">
              ${cadences.map(c => html`
                <div class="cadence-card-item" style="background: var(--cv-cream); border-radius: 15px; padding: 11px 13px;">
                  <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px;">
                    <div style="font-size: 13px; font-weight: 800; color: var(--cv-ink);">${c.name}</div>
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.5px; color: var(--cv-label); white-space: nowrap;">${c.bars}</div>
                  </div>
                  <div style="display: flex; align-items: baseline; gap: 7px; margin-top: 5px; flex-wrap: wrap;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink-muted);">${c.move}</div>
                    <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.4px; color: rgba(46, 39, 31, 0.45);">${c.degrees}</div>
                  </div>
                  <div style="font-size: 11.5px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 5px; text-wrap: pretty;">${c.why}</div>
                </div>
              `)}
            </div>
          </div>
        ` : ''}

        <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase; margin: 20px 0 4px;">Voice leading</div>
        ${voiceLinks.map(v => html`
          <div class="voice-leading-row" style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 9px 0; border-top: 1px solid rgba(46, 39, 31, 0.08);">
            <div style="min-width: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${v.chords}</div>
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.9px; text-transform: uppercase; color: var(--cv-label); margin-top: 2px;">${v.move}</div>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; color: ${v.hasShared ? 'var(--cv-ink-muted)' : 'rgba(46, 39, 31, 0.4)'}; text-align: right;">${v.link}</div>
          </div>
        `)}

        ${setNote ? html`
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px; text-wrap: pretty;">${setNote}</div>
        ` : ''}
      </div>
    `;
  }

  private renderChordDetailContent(chords: ChordBlock[]) {
    const chord = chords[this.detailIndex];
    const curQuality = this.getChordQualityLabel(chord?.name);
    const curExt = this.getChordExtensionLabel(chord?.name);
    const preferFlat = preferFlatSpelling(this.progression?.key || 'C', this.progression?.scaleType || 'MAJOR');
    const intervalTokens = chord ? getChordIntervalBreakdown(chord.name, preferFlat) : [];

    return html`
      <div class="detail-kicker">Notes</div>
      <div class="detail-notes-pills">
        ${(chord?.notes || []).map(n => html`
          <div class="note-pill">${n.replace(/\d+$/, '')}</div>
        `)}
      </div>

      ${this.showTheory && intervalTokens.length ? html`
        <div class="detail-kicker" style="margin-top: 18px;">Interval Formula &amp; Guide Tones</div>
        <div class="theory-interval-tokens-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 8px; margin-top: 8px;">
          ${intervalTokens.map(tok => html`
            <div class="interval-token-badge ${tok.isGuideTone ? 'guide-tone' : ''}" style="background: ${tok.isGuideTone ? 'rgba(242, 115, 95, 0.16)' : 'var(--cv-surface)'}; border: 1.5px solid ${tok.isGuideTone ? '#F2735F' : 'rgba(46,39,31,0.1)'}; border-radius: 12px; padding: 7px 6px; text-align: center;">
              <div style="font-size: 14px; font-weight: 800; color: #2E271F;">${tok.note}</div>
              <div style="font-size: 11px; font-weight: 800; color: ${tok.isGuideTone ? '#F2735F' : 'var(--cv-label)'}; margin-top: 2px;">${tok.intervalSymbol}</div>
              <div style="font-size: 9.5px; font-weight: 700; color: var(--cv-ink-muted); margin-top: 2px; line-height: 1.1;">${tok.roleName}</div>
            </div>
          `)}
        </div>
      ` : ''}

      <div class="detail-kicker" style="margin-top: 20px;">Quality</div>
      <div class="detail-quality-box">
        <div class="quality-label">${curQuality}</div>
        <div class="quality-sub">${this.getChordQualitySub(chord?.name)}</div>
      </div>
      <div class="quality-chips-grid">
        ${CHORD_QUALITIES.map(q => {
          const isSel = q.label === curQuality;
          return html`
            <button
              class="chord-mod-chip quality-chip ${isSel ? 'selected active' : ''}"
              @click=${() => this.changeChordQuality(q.label)}
              aria-pressed="${isSel}"
              aria-label="Change quality to ${q.label}"
            >
              <div class="chip-title">${q.label}</div>
              <div class="chip-desc">${q.sub}</div>
            </button>
          `;
        })}
      </div>

      <div class="detail-kicker" style="margin-top: 20px;">Extension</div>
      <div class="detail-extension-box">
        <div class="quality-label">${curExt}</div>
        <div class="quality-sub">${this.getChordExtensionSub(chord?.name)}</div>
      </div>
      <div class="ext-chips-grid">
        ${CHORD_EXTENSIONS.map(e => {
          const isSel = e.label === curExt;
          return html`
            <button
              class="chord-mod-chip extension-chip ${isSel ? 'selected active' : ''}"
              @click=${() => this.changeChordExtension(e.label)}
              aria-pressed="${isSel}"
              aria-label="Change extension to ${e.label}"
            >
              <div class="chip-title">${e.label}</div>
              <div class="chip-desc">${e.sub}</div>
            </button>
          `;
        })}
      </div>
    `;
  }

  private renderPianoCard(ch: ChordBlock, i: number) {
    const c = parseChordSymbol(ch.name);
    const rootPc = PC[c.root] ?? 0;
    const intervals = QUAL[c.quality] || QUAL[QFALL[c.quality] || 'maj'] || [0, 4, 7];
    const W = 22, PH = 86, BH = 52, WHITE_ORDER = [0, 2, 4, 5, 7, 9, 11];
    const whites: { x: number; w: number; h: number }[] = [];
    const blacks: { x: number; w: number; h: number }[] = [];
    const marks: { cx: number; cy: number; r: number; fill: string; isRoot: boolean; label: string; lc: string }[] = [];

    for (let o = 0; o < 2; o++) {
      WHITE_ORDER.forEach((_pc, k) => {
        whites.push({ x: (o * 7 + k) * W, w: W - 1.5, h: PH });
      });
    }
    for (let o = 0; o < 2; o++) {
      [0, 1, 3, 4, 5].forEach(k => {
        const idx = o * 7 + k;
        blacks.push({ x: idx * W + W * 0.64, w: W * 0.58, h: BH });
      });
    }

    intervals.forEach(iv => {
      const semi = rootPc + iv;
      const oct = Math.floor(semi / 12);
      const pc = semi % 12;
      const wk = WHITE_ORDER.indexOf(pc);
      const isRoot = iv === 0;
      const onBlack = wk < 0;
      const fill = isRoot ? '#F2735F' : (onBlack ? '#FBF3E6' : '#2E271F');
      const lc = isRoot ? '#FBF3E6' : (onBlack ? '#2E271F' : '#FBF3E6');
      const label = this.showDegrees ? DEG[iv % 12] : '';
      if (wk >= 0) {
        const idx = oct * 7 + wk;
        marks.push({ cx: idx * W + (W - 1.5) / 2, cy: PH - 19, r: 9, fill, isRoot, label, lc });
      } else {
        const idx = oct * 7 + WHITE_ORDER.indexOf(pc - 1);
        const bx = idx * W + W * 0.64;
        const bw = W * 0.58;
        marks.push({ cx: bx + bw / 2, cy: BH - 14, r: 7.5, fill, isRoot, label, lc });
      }
    });

    const pw = 14 * W;
    const notesLine = intervals.map(iv => {
      const nm = PC_NAMES[(rootPc + iv) % 12];
      return this.showDegrees ? `${nm} (${DEG[iv % 12]})` : nm;
    }).join(' · ');

    return html`
      <div
        class="play-card"
        @pointerdown=${(e: PointerEvent) => this.handlePadPointerDown(e, i)}
        @pointerup=${() => this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${ch.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; gap: 9px; position: relative; z-index: 2;">
          <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${ch.name}</div>
          ${this.showTheory && ch.roman ? html`
            <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${ch.roman}</div>
          ` : ''}
        </div>
        <svg width="${pw}" height="${PH}" viewBox="0 0 ${pw} ${PH}" style="display: block; width: 100%; max-width: ${pw}px; height: auto;">
          ${whites.map(k => svg`
            <rect x="${k.x}" y="0" width="${k.w}" height="${k.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
          `)}
          ${blacks.map(b => svg`
            <rect x="${b.x}" y="0" width="${b.w}" height="${b.h}" rx="2" fill="#3A3128"></rect>
          `)}
          ${marks.map(mk => svg`
            <g>
              <circle cx="${mk.cx}" cy="${mk.cy}" r="${mk.r}" fill="${mk.fill}" stroke="${mk.isRoot ? '#2E271F' : 'none'}" stroke-width="${mk.isRoot ? 1.6 : 0}"></circle>
              ${mk.label ? svg`
                <text x="${mk.cx}" y="${mk.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${mk.lc}" font-family="'Plus Jakarta Sans',sans-serif">${mk.label}</text>
              ` : ''}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${notesLine}</div>
      </div>
    `;
  }

  private renderFretCard(ch: ChordBlock, i: number, inst: 'Guitar' | 'Ukulele') {
    const c = parseChordSymbol(ch.name);
    const rootPc = PC[c.root] ?? 0;
    const intervals = QUAL[c.quality] || QUAL[QFALL[c.quality] || 'maj'] || [0, 4, 7];
    const GUITAR_OPEN = [4, 9, 2, 7, 11, 4];
    const UKE_OPEN = [7, 0, 4, 9];
    const isUke = inst === 'Ukulele';
    const openPcs = isUke ? UKE_OPEN : GUITAR_OPEN;
    const frets = isUke
      ? ukeVoicing({ root: c.root, rootPc, q: c.quality, intervals }) || [null, null, null, null]
      : guitarVoicing({ root: c.root, rootPc, q: c.quality, intervals }) || [null, null, null, null, null, null];

    const SP = 18, FR = 24, ROWS = 4, TOP = 16;
    const n = openPcs.length;
    const nz = frets.filter(f => f !== null && f > 0) as number[];
    const base = (nz.length && Math.max(...nz) > 4) ? Math.min(...nz) - 1 : 0;
    const strings: { x: number }[] = [];
    const fretLines: { y: number; sw: number }[] = [];
    const dots: { cx: number; cy: number; fill: string; label: string }[] = [];
    const opens: { x: number }[] = [];
    const mutes: { x: number }[] = [];

    for (let s = 0; s < n; s++) strings.push({ x: s * SP });
    for (let r = 0; r <= ROWS; r++) fretLines.push({ y: TOP + r * FR, sw: (r === 0 && base === 0) ? 3 : 1.2 });
    frets.forEach((f, s) => {
      const x = s * SP;
      if (f === null) { mutes.push({ x }); return; }
      if (f === 0) { opens.push({ x }); return; }
      const iv = ((openPcs[s] + f - rootPc) % 12 + 12) % 12;
      dots.push({
        cx: x,
        cy: TOP + (f - base - 0.5) * FR,
        fill: iv === 0 ? '#F2735F' : '#2E271F',
        label: this.showDegrees ? DEG[((openPcs[s] + f - rootPc) % 12 + 12) % 12] : '',
      });
    });
    const w = (n - 1) * SP;
    const sw = (n - 1) * SP + 26;
    const sh = TOP + ROWS * FR + 12;
    const posLabel = base > 0 ? `${base + 1}fr` : '';
    const showPos = base > 0;

    const notesLine = intervals.map(iv => {
      const nm = PC_NAMES[(rootPc + iv) % 12];
      return this.showDegrees ? `${nm} (${DEG[iv % 12]})` : nm;
    }).join(' · ');

    return html`
      <div
        class="play-card"
        @pointerdown=${(e: PointerEvent) => this.handlePadPointerDown(e, i)}
        @pointerup=${() => this.handlePadPointerUp()}
        role="button"
        tabindex="0"
        aria-label="${ch.name} — press nearer the top for a higher voicing"
      >
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px; position: relative; z-index: 2;">
          <div style="display: flex; align-items: baseline; gap: 7px;">
            <div style="font-size: 17px; font-weight: 800; color: #2E271F;">${ch.name}</div>
            ${this.showTheory && ch.roman ? html`
              <div style="font-size: 11.5px; font-weight: 800; color: var(--cv-label); letter-spacing: 0.5px;">${ch.roman}</div>
            ` : ''}
          </div>
          ${showPos ? html`
            <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">${posLabel}</div>
          ` : ''}
        </div>
        <svg width="${sw}" height="${sh}" viewBox="-13 -2 ${sw} ${sh}" style="display: block; width: 100%; max-width: ${sw * 1.5}px; height: auto;">
          ${fretLines.map(fl => svg`
            <rect x="0" y="${fl.y}" width="${w}" height="${fl.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${strings.map(st => svg`
            <rect x="${st.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${opens.map(op => svg`
            <circle cx="${op.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${mutes.map(mu => svg`
            <text x="${mu.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${dots.map(dt => svg`
            <g>
              <circle cx="${dt.cx}" cy="${dt.cy}" r="${dt.fill === '#F2735F' ? 7.5 : 7}" fill="${dt.fill}"></circle>
              ${dt.label ? svg`
                <text x="${dt.cx}" y="${dt.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${dt.label}</text>
              ` : ''}
            </g>
          `)}
        </svg>
        <div style="font-size: 12px; font-weight: 700; color: var(--cv-ink-muted);">${notesLine}</div>
      </div>
    `;
  }

  private renderChordPad(c: ChordBlock, i: number, moodColor: string, isDesktop: boolean) {
    const role = roleForTension(c.tension || 0.1);
    const isLit = this.activeIndex === i && this.playing;
    const isHeld = this.padFlash === i || this.padHeld === i;
    const isSelected = this.swapIndex === i;

    const lad = this.getChordLadder(c);
    const rung = this.getLadderHome(c);
    const lastHere = this.lastPad?.idx === i;
    const reached = lastHere && typeof this.lastPad?.reach === 'number' ? this.lastPad.reach : rung;
    const showsReach = lastHere && reached >= 0 && reached !== rung && lad[reached];
    const dotAt = showsReach ? reached : rung;
    const metaLabel = lastHere
      ? (showsReach ? ('→ ' + lad[reached]) : (ZONE_NAMES[this.lastPad?.zone ?? 1] || this.lastPad?.voicing || ''))
      : (c.voicing && c.voicing !== '1st inversion' ? c.voicing.toUpperCase() : '');

    return html`
      <div
        class="pad-cell ${isDesktop ? 'chord-item-wrap' : ''} ${isHeld ? 'pad-held' : ''} ${isSelected ? 'selected' : ''} ${isLit ? 'pad-lit' : ''}"
        style="
          background: ${role.color};
          border-radius: ${isSelected && isDesktop ? '20px 20px 5px 5px' : '20px'};
          ${isSelected ? `box-shadow: inset 0 0 0 2.5px ${moodColor}, 0 14px 26px -18px rgba(46,39,31,0.45);` : ''}
        "
        tabindex="0"
        role="button"
        aria-label="${c.name}, ${ROLE_PLAIN[c.functionLabel] || c.functionLabel} — press to play it; press nearer the top for a higher voicing"
        @pointerdown=${(e: PointerEvent) => this.handlePadPointerDown(e, i)}
        @pointermove=${(e: PointerEvent) => this.handlePadPointerMove(e, i)}
        @pointerup=${(e: PointerEvent) => this.handlePadPointerUp(e)}
        @pointercancel=${(e: PointerEvent) => this.handlePadPointerUp(e)}
        @pointerleave=${(e: PointerEvent) => this.handlePadPointerUp(e)}
      >
        <div class="pad-voicing-grid ${this.gridFor === i ? 'active' : ''}">
          ${lad.slice(1).map((_, li) => html`
            <div style="position: absolute; top: 0; bottom: 0; left: ${((li + 1) / lad.length) * 100}%; width: 1px; background: rgba(46,39,31,0.18);"></div>
          `)}
        </div>

        <button
          class="pad-swap-btn"
          @click=${(e: MouseEvent) => { e.stopPropagation(); this.openSwap(i); }}
          @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
          aria-label="Swap ${c.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
        </button>

        <button
          class="pad-detail-btn"
          @click=${(e: MouseEvent) => { e.stopPropagation(); this.openDetail(i); }}
          @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
          aria-label="View voicing for ${c.name}"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <div class="pad-top-row" style="display: flex; align-items: center; gap: 6px;">
          <div class="pad-key-badge" style="display: inline-flex; align-items: flex-start; justify-content: center; width: 20px; height: 20px; padding: 1.5px 1.5px 3.5px; border-radius: 5px; background: rgba(46,39,31,0.16); box-shadow: 0 1px 0 rgba(46,39,31,0.18); flex-shrink: 0;">
            <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12); font-size: 10.5px; font-weight: 800; color: #2E271F;">${(PAD_KEYS[i] || '').toUpperCase()}</span>
          </div>
          ${this.showTheory && c.roman ? html`<span class="pad-roman-badge">${c.roman}</span>` : ''}
        </div>

        <div class="pad-bottom-info">
          <div class="pad-role-label">${ROLE_SHORT[c.functionLabel] || c.functionLabel}</div>
          <div class="pad-chord-name">${(lastHere && showsReach && lad[reached]) ? lad[reached] : c.name}</div>
          ${this.showTheory && c.notes && c.notes.length ? html`
            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
              ${c.notes.join(' · ')}
            </div>
          ` : ''}
          ${metaLabel ? html`<div class="pad-meta-voicing">${metaLabel}</div>` : ''}
          <div style="display: flex; gap: 3px; margin-top: 7px;">
            ${lad.map((_, li) => html`
              <div style="width: ${li === dotAt ? 16 : 6}px; height: 4px; border-radius: 3px; background: ${li === dotAt ? (showsReach ? moodColor : 'rgba(46,39,31,0.55)') : 'rgba(46,39,31,0.16)'}; transition: width 200ms cubic-bezier(0.23,1,0.32,1), background 180ms ease;"></div>
            `)}
          </div>
        </div>
      </div>
    `;
  }


  private renderLibraryPopoverContent(moodColor: string) {
    const q = this.librarySearch.trim().toLowerCase();
    const visible = this.savedSets.filter(s => !q || (s.name + ' ' + s.genre + ' ' + s.mood).toLowerCase().includes(q));
    const visibleIds = visible.map(s => s.id);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => this.librarySelected.includes(id));
    const someVisibleSelected = visibleIds.some(id => this.librarySelected.includes(id));

    return html`
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 6px 8px;">
        <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">
          ${this.librarySelectMode && this.librarySelected.length > 0
            ? `${this.librarySelected.length} of ${this.savedSets.length} selected`
            : `Your loops (${this.savedSets.length})`}
        </div>
        <div class="library-select-toolbar" style="display: flex; align-items: center; gap: 8px;">
          ${this.librarySelectMode && visible.length > 0 ? html`
            <label style="display: inline-flex; align-items: center; gap: 4px; cursor: pointer; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted);">
              <input
                type="checkbox"
                class="library-select-all-checkbox"
                style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px;"
                .checked=${allVisibleSelected}
                .indeterminate=${someVisibleSelected && !allVisibleSelected}
                @change=${this.toggleSelectAllVisible}
                aria-label="Select all loops"
              />
              <button
                type="button"
                class="library-select-all-btn"
                style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted); cursor: pointer; padding: 0;"
                @click=${(e: Event) => { e.stopPropagation(); this.toggleSelectAllVisible(); }}
              >
                ${allVisibleSelected ? 'Deselect all' : 'Select all'}
              </button>
            </label>
          ` : ''}
          ${this.librarySelectMode && this.librarySelected.length > 0 ? html`
            <button
              class="library-delete-btn"
              style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: #C0392B; cursor: pointer; padding: 0;"
              @click=${this.deleteSelectedLoops}
              title="Delete selected loops"
            >
              Delete (${this.librarySelected.length})
            </button>
          ` : ''}
          <button
            class="library-select-btn"
            style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: ${this.librarySelectMode ? 'var(--cv-ink, #2E271F)' : 'var(--cv-ink-muted)'}; cursor: pointer; padding: 0;"
            @click=${this.toggleLibrarySelectMode}
            aria-label="${this.librarySelectMode ? 'Finish selecting loops' : 'Select loops'}"
          >
            ${this.librarySelectMode ? 'Done' : 'Select'}
          </button>
        </div>
      </div>

      <div style="padding: 0 4px 9px;">
        <input
          type="text"
          class="cv-vibe-input"
          style="width: 100%; border: none; background: var(--cv-surface); border-radius: 12px; padding: 9px 12px; font-size: 12.5px; outline: none; box-sizing: border-box;"
          .value=${this.librarySearch}
          @input=${(e: Event) => { this.librarySearch = (e.target as HTMLInputElement).value; }}
          placeholder="Search loops"
        />
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        ${visible.map(set => {
          const isSelected = this.librarySelected.includes(set.id);
          return html`
            <div
              class="library-loop-item ${this.librarySelectMode ? 'select-mode' : ''} ${isSelected ? 'selected' : ''}"
              style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: ${isSelected ? 'var(--cv-surface-2, #F1E4CC)' : 'var(--cv-surface)'}; transition: background 120ms ease;"
              @click=${() => {
                if (this.librarySelectMode) {
                  this.toggleSelectLoop(set.id);
                } else {
                  this.dispatchEvent(new CustomEvent('load-project', { detail: set, bubbles: true, composed: true }));
                  this.setLibraryOpen(false);
                }
              }}
            >
              ${this.librarySelectMode ? html`
                <input
                  type="checkbox"
                  class="loop-item-checkbox"
                  .checked=${isSelected}
                  @click=${(e: Event) => e.stopPropagation()}
                  @change=${() => this.toggleSelectLoop(set.id)}
                  style="accent-color: var(--cv-ink, #2E271F); cursor: pointer; margin: 0; width: 14px; height: 14px; flex-shrink: 0;"
                  aria-label="Select ${set.name}"
                />
              ` : ''}
              <div style="display: flex; gap: 3px; align-items: center; flex-shrink: 0;">
                ${(set.chords || []).map((c: any) => {
                  const role = roleForTension(c.tension ?? 0);
                  return html`<span style="display:inline-block;width:7px;height:7px;border-radius:${Math.round(role.radius * 0.25)}px;background:${role.color};flex-shrink:0;"></span>`;
                })}
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 13.5px; font-weight: 800; color: var(--cv-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${set.name}</div>
                <div style="font-size: 11px; color: var(--cv-ink-muted);">${set.genre} · ${set.mood}</div>
              </div>
            </div>
          `;
        })}
        ${!visible.length ? html`
          <div class="library-empty" style="padding: 16px 12px; font-size: 12.5px; line-height: 1.5; color: var(--cv-ink-muted); text-align: center;">
            ${this.savedSets.length
              ? 'No loops match that.'
              : 'Nothing saved yet — tap the bookmark to keep a loop.'}
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderLibrarySheetMobile(moodColor: string) {
    if (!this.libraryOpen) return '';
    return html`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div
          style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);"
          @click=${() => this.setLibraryOpen(false)}
        ></div>
        <div
          class="library-popover library-sheet-mobile"
          style="position: absolute; left: 0; right: 0; bottom: 0; max-height: 80vh; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; z-index: 81; background: var(--cv-cream, #FBF3E6); border-radius: 26px 26px 0 0; padding: 14px 18px max(24px, calc(14px + env(safe-area-inset-bottom, 0px))); box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); box-sizing: border-box;"
        >
          <div style="position: relative; display: flex; align-items: center; justify-content: center; min-height: 34px; margin-bottom: 8px;">
            <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18);"></div>
            <button
              class="library-sheet-done"
              @click=${() => this.setLibraryOpen(false)}
              style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); border: none; font-family: inherit; background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
              aria-label="Close your loops"
            >Done</button>
          </div>
          ${this.renderLibraryPopoverContent(moodColor)}
        </div>
      </div>
    `;
  }

  render() {
    const chords = this.progression?.chords || [];
    const moodColor = getMoodColor(this.progression?.mood || 'Warm');
    const activeBand = BANDS.find(b => b.name === this.selectedBand);
    const theoryData = this.getTheoryData(chords);

    // Harmonic Arc computation
    const tensions = chords.map(c => c.tension || 0.1);
    const maxTension = Math.max(...tensions, 0.1);
    const minTension = Math.min(...tensions, 0);
    const peakIdx = tensions.indexOf(maxTension);
    const isRising = tensions.every((v, i) => i === 0 || v >= tensions[i - 1]);
    const arcTitle = (maxTension - minTension) < 0.28 ? 'Stays close to home'
      : isRising ? 'A steady climb'
      : (tensions[tensions.length - 1] < 0.25 && peakIdx < tensions.length - 1) ? 'Away, then home'
      : 'Drifts, then settles';

    const arcSentence = `Opens ${ROLE_PLAIN[chords[0]?.functionLabel] || 'home'} and ${
      (maxTension - minTension) < 0.28
        ? 'never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.'
        : isRising
        ? `tightens chord by chord, peaking on ${chords[peakIdx]?.name || 'the peak'}. Looping back does the resolving.`
        : `explores tension up to ${chords[peakIdx]?.name || 'the middle'} before easing back down home.`
    }`;

    // Alternative substitution candidate rows
    let familyRows: { name: string; roman?: string; notes?: string[]; sub: string; chord: ChordBlock; tension: number }[] = [];
    let familyNote = '';
    const isMinor = this.progression?.scaleType?.includes('MINOR') ?? false;

    if (this.swapIndex !== null && this.progression && this.chordData.scales) {
      if (this.activeSwapFamily === 'Borrowed') {
        familyRows = generateBorrowedChords(this.chordData, this.progression, this.swapIndex);
        familyNote = `Four chords from the ${isMinor ? 'major' : 'minor'} version of this key.`;
      } else {
        const groups = generateTheoryGroups(this.chordData, this.progression, this.swapIndex);
        const matchedGroup = groups.find(g => g.name === this.activeSwapFamily) || groups[0];
        familyRows = matchedGroup?.rows || [];
        familyNote = GROUP_NOTES[this.activeSwapFamily] ? GROUP_NOTES[this.activeSwapFamily][this.showTheory ? 1 : 0] : '';
      }

      if (activeBand) {
        const hoisted = familyRows.filter(r => activeBand.hoist.includes(r.name));
        const rest = familyRows.filter(r => !activeBand.hoist.includes(r.name));
        familyRows = [...hoisted, ...rest];
      }
    }

    const currentSwapChord = this.swapIndex !== null ? chords[this.swapIndex] : null;

    if (this.isMobile) {
      return html`
        <div class="mobile-stage-wrap" style="--mood-color: ${moodColor};">
          <!-- Top Vibe Dropdown Button -->
          <div style="padding: 12px 18px 0;">
            <button class="mobile-vibe-toggle" @click=${this.toggleVibe}>
              <div style="text-align: left;">
                <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">The Vibe</div>
                <div style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink); margin-top: 2px;">${this.getVibeSummary()}</div>
              </div>
              <span style="font-size: 16px; font-weight: 800; color: var(--cv-ink-muted);">${this.vibeOpen ? '⌃' : '⌄'}</span>
            </button>

            ${this.vibeOpen ? html`
              <div style="background: var(--cv-surface); border-radius: 20px; padding: 16px 15px; margin-top: 8px;">
                <form class="popover-input-row" @submit=${this.onVibeSubmit}>
                  <input
                    type="text"
                    class="cv-vibe-input"
                    .value=${this.freeText}
                    @input=${(e: Event) => { this.freeText = (e.target as HTMLInputElement).value; }}
                    placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
                  />
                  <button type="submit" class="vibe-submit-btn" style="background: ${moodColor};">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  </button>
                </form>

                <div class="popover-kicker spaced">Genre</div>
                <div class="pills-group">
                  ${GENRE_PRIMARY.map(g => html`
                    <button class="pill ${this.progression?.genre === g ? 'active' : ''}" @click=${() => this.onGenreClick(g)}>${g}</button>
                  `)}
                </div>

                <div class="popover-kicker spaced">Mood</div>
                <div class="pills-group">
                  ${MOOD_PRIMARY.map(m => html`
                    <button class="pill mood-pill ${this.progression?.mood === m ? 'active' : ''}" @click=${() => this.onMoodClick(m)}>${m}</button>
                  `)}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- View Switcher Tabs -->
          <div style="padding: 12px 18px 0;">
            <div class="view-tabs-bar" style="width: 100%; justify-content: center;">
              <button class="view-tab ${this.activeView === 'loop' ? 'active' : ''}" @click=${() => { this.activeView = 'loop'; }}>Chords</button>
              <button class="view-tab ${this.activeView === 'song' ? 'active' : ''}" @click=${() => { this.activeView = 'song'; }}>Song</button>
              <button class="view-tab ${this.activeView === 'play' ? 'active' : ''}" @click=${() => { this.activeView = 'play'; }}>Play it</button>
            </div>
          </div>

          <!-- Main Mobile Canvas -->
          <div style="padding: 14px 18px 24px; flex: 1;">
            ${this.activeView === 'loop' ? html`
              <div class="stage-card" style="padding: 18px 14px;">
                <!-- 2-column pad cells grid -->
                <div class="pad-cells-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${chords.map((chord, idx) => {
                    if (this.swapIndex === idx) {
                      const role = roleForTension(chord.tension || 0.1);
                      const isLit = this.activeIndex === idx && this.playing;
                      return html`
                        <div
                          class="pad-cell pad-cell-cycler ${isLit ? 'pad-lit' : ''}"
                          style="
                            background: ${role.color};
                            border-radius: 20px;
                            padding: 12px;
                            min-height: 220px;
                            box-shadow: inset 0 0 0 2.5px ${moodColor}, 0 14px 26px -18px rgba(46,39,31,0.45);
                          "
                        >
                          <chord-pad-cycler
                            .originalChord=${chord}
                            .barIndex=${idx}
                            .feelings=${this.getSwapFeelings(idx)}
                            .feelIndex=${this.mobileFeelIndex}
                            .chordIndex=${this.mobileChordIndex}
                            @cycler-audition=${(e: CustomEvent) => this.handleSwapAudition(e.detail)}
                            @cycler-keep=${(e: CustomEvent) => this.handleCyclerKeep(e.detail)}
                            @cycler-revert=${() => this.clearSelection()}
                          ></chord-pad-cycler>
                        </div>
                      `;
                    }
                    return this.renderChordPad(chord, idx, moodColor, false);
                  })}
                </div>

                ${this.showTheory ? this.renderScaleChords(theoryData.scaleName, theoryData.scaleHint, theoryData.scaleDegrees, true) : ''}
              </div>

              <!-- Quick chips -->
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;">
                <button class="instrument-chip" @click=${this.toggleInstrumentExpand} aria-label="Change instrument">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${normalizeInstrumentName(this.instrument)} <span style="opacity:0.6;">⌄</span>
                </button>
              </div>

              ${this.expandedInstrument ? html`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${USER_INSTRUMENTS.map(i => html`
                    <button
                      class="pill ${normalizeInstrumentName(this.instrument) === i.name ? 'active' : ''}"
                      @click=${() => {
                        this.instrument = i.name;
                        playbackEngine.setInstrument(i.name);
                        this.dispatchEvent(new CustomEvent('set-instrument', { detail: i.name, bubbles: true, composed: true }));
                        this.expandedInstrument = false;
                        this.requestUpdate();
                      }}
                    >
                      <span style="background:${i.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${i.name}
                    </button>
                  `)}
                </div>
              ` : ''}

              <div style="display: flex; gap: 7px; margin-top: 12px;">
                <button class="mobile-chip-btn" @click=${() => { this.tempoOpen = !this.tempoOpen; if (this.tempoOpen) this.feelOpen = false; }} aria-label="Key, tempo and length">
                  ${this.progression?.key || 'C'} ${this.getCurrentScaleAbbrev()} · ${this.progression?.bpm || 84}
                </button>
                <button class="mobile-chip-btn feel-chip" @click=${() => { this.feelOpen = !this.feelOpen; if (this.feelOpen) this.tempoOpen = false; }} aria-label="Feel">
                  ${this.feelChipLabel}
                </button>
                <button
                  class="mobile-chip-btn mobile-share-btn"
                  @click=${() => { this.shareOpen = true; }}
                  aria-label="Share this loop"
                  style="display: inline-flex; align-items: center; justify-content: center; gap: 6px;"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 15V3"/><path d="M8 7l4-4 4 4"/></svg>
                  Share
                </button>
              </div>

              <div class="mobile-theory-toggle" @click=${this.onTheoryToggle}>
                <div class="toggle-track ${this.showTheory ? 'active' : ''}">
                  <div class="toggle-knob ${this.showTheory ? 'active' : ''}"></div>
                </div>
                <div style="font-size: 13px; font-weight: 700; color: var(--cv-ink-muted);">Show music theory</div>
              </div>

              ${this.showTheory ? html`
                <div class="mobile-theory-panel">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">This loop</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); margin-top: 5px; letter-spacing: -0.015em;">${arcTitle}</div>
                  <div class="mobile-arc-bars" style="display: flex; align-items: flex-end; gap: 6px; height: 132px; margin-top: 14px;">
                    ${chords.map(c => {
                      const h = Math.round(28 + (c.tension || 0.1) * 85);
                      const r = roleForTension(c.tension || 0.1);
                      return html`
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: default;">
                          <div style="width: 100%; height: ${h}px; border-radius: 100px; background: ${r.color};"></div>
                          <div style="font-size: 12px; font-weight: 800; color: #2E271F; margin-top: 7px;">${c.name}</div>
                          <div style="font-size: 10px; font-weight: 700; color: var(--cv-ink-muted);">${ROLE_PLAIN[c.functionLabel] || ''}</div>
                        </div>
                      `;
                    })}
                  </div>
                  <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.2px; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved.</div>
                  <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px;">${arcSentence}</div>
                  ${this.renderTheoryStrip(theoryData)}
                </div>
              ` : ''}
            ` : this.activeView === 'song' ? html`
              <div class="song-track-list" style="display: flex; flex-direction: column; gap: 12px; padding: 4px 0 20px;">
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-bottom: 4px;">
                  Each section reuses the loop, related but never identical. Tap a section to edit its chords, or press play to hear the whole arrangement.
                </div>
                ${this.sections.map((sec, i) => {
                  const isActive = this.activeSectionIdx === i;
                  return html`
                    <div
                      class="song-track-card ${isActive ? 'active' : ''}"
                      style="width: 100%; box-sizing: border-box; cursor: pointer;"
                      @click=${() => { this.activeSectionIdx = i; this.activeView = 'loop'; }}
                    >
                      <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Section ${i + 1}</div>
                      <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); margin-top: 4px;">${sec.name}</div>
                      <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 4px;">${sec.desc}</div>
                      <div class="song-card-chips" style="display: flex; gap: 6px; margin-top: 12px; flex-wrap: wrap;">
                        ${sec.progression.chords.map(c => {
                          const role = roleForTension(c.tension);
                          return html`<div class="song-chord-chip" style="width: 16px; height: 16px; border-radius: ${Math.round(role.radius * 0.4)}px; background: ${role.color}; flex-shrink: 0;" title="${c.name}"></div>`;
                        })}
                      </div>
                    </div>
                  `;
                })}
                <button
                  class="add-section-card"
                  style="width: 100%; min-height: 60px; border: 2px dashed rgba(46,39,31,0.18); border-radius: 20px; background: transparent; color: var(--cv-ink-muted); font-size: 13.5px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: border-color 150ms ease, color 150ms ease;"
                  @click=${() => this.dispatchEvent(new CustomEvent('add-section', { bubbles: true, composed: true }))}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  Add a related section
                </button>
              </div>
            ` : html`
              <div class="play-it-wrap" style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px; margin-bottom: 18px;">
                  <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.4px; color: var(--cv-label); text-transform: uppercase;">Instrument</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px;">
                    ${['Piano', 'Guitar', 'Ukulele'].map(inst => html`
                      <button
                        class="pill ${this.playInstrument === inst ? 'active' : ''}"
                        style="background: ${this.playInstrument === inst ? moodColor : 'var(--cv-cream)'}; color: ${this.playInstrument === inst ? '#2E271F' : 'var(--cv-ink-muted)'}; border: none; min-height: 40px; padding: 0 18px; border-radius: 100px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 180ms ease, color 180ms ease;"
                        @click=${() => { this.playInstrument = inst as PlayInstrument; }}
                      >${inst}</button>
                    `)}
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-top: 15px; padding-top: 14px; border-top: 1px solid rgba(46,39,31,0.09);" @click=${() => { this.showDegrees = !this.showDegrees; }}>
                    <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showDegrees ? moodColor : 'rgba(46,39,31,0.2)'}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                      <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showDegrees ? 'translateX(16px)' : 'translateX(0)'}; transition: transform 150ms ease;"></div>
                    </div>
                    <div style="font-size: 13px; font-weight: 700; color: var(--cv-ink-muted);">Scale degrees</div>
                  </div>
                  <div style="font-size: 12px; line-height: 1.6; color: #8A7C6B; margin-top: 11px;">
                    ${this.playInstrument === 'Piano'
                      ? 'One voicing per chord, root position — the red dot is the root, play left to right.'
                      : 'Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.'}
                  </div>
                </div>

                ${this.playInstrument === 'Piano' ? html`
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${chords.map((ch, i) => this.renderPianoCard(ch, i))}
                  </div>
                ` : html`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    ${chords.map((ch, i) => this.renderFretCard(ch, i, this.playInstrument === 'Ukulele' ? 'Ukulele' : 'Guitar'))}
                  </div>
                `}
              </div>
            `}
          </div>



          <!-- Mobile Detail Sheet -->
          ${this.mobileDetailSheetOpen ? html`
            <div class="sheet-scrim" @click=${() => { this.mobileDetailSheetOpen = false; }}></div>
            <div class="mobile-detail-sheet mobile-swap-sheet">
              <div class="sheet-handle"></div>
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px;">
                <div>
                  <div class="detail-kicker">Chord</div>
                  <div class="detail-chord-name">${chords[this.detailIndex]?.name}</div>
                  <div class="detail-chord-function">${chords[this.detailIndex]?.functionLabel}</div>
                </div>
                <button class="sheet-cancel-btn close-detail-btn" @click=${() => { this.mobileDetailSheetOpen = false; }}>×</button>
              </div>

              ${this.renderChordDetailContent(chords)}
            </div>
          ` : ''}
        </div>

        <!-- Mobile Bottom Transport Bar -->
        <div class="mobile-bottom-transport-bar">
          <button
            class="loop-play-btn"
            @click=${this.activeView === 'song' ? () => this.dispatchEvent(new CustomEvent('toggle-play-song', { bubbles: true, composed: true })) : this.togglePlay}
            style="background: ${this.playing ? '#2E271F' : moodColor}; color: ${this.playing ? '#FBF3E6' : '#2E271F'}; flex-shrink: 0; min-height: 44px; padding: 9px 16px; border-radius: 100px; font-weight: 800; font-size: 12.5px; border: none; cursor: pointer; white-space: nowrap;"
            aria-label="${this.playing ? 'Stop' : (this.activeView === 'song' ? `Play song · ${this.sections.length} sections` : 'Play loop')}"
          >
            ${this.playing ? 'Stop' : (this.activeView === 'song' ? `Play song · ${this.sections.length} sections` : 'Play loop')}
          </button>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button aria-label="Try another progression" class="mobile-circle-btn" @click=${this.onReroll}>
              <svg width="19" height="19" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${moodColor}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
            </button>
            <button aria-label="Keep this loop" class="mobile-circle-btn" @click=${() => this.dispatchEvent(new CustomEvent('save-set', { bubbles: true, composed: true }))}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
            </button>
            <button
              aria-label="Your loops"
              aria-expanded=${this.libraryOpen ? 'true' : 'false'}
              class="mobile-circle-btn library-toggle ${this.libraryOpen ? 'active' : ''}"
              @click=${this.toggleLibrary}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h11M4 12h11M4 18h7"/><path d="M19 4v10l-2.4-1.6L14.2 14V4z" fill="#2E271F" stroke="none"/></svg>
            </button>
            <button aria-label="Share this loop" class="mobile-circle-btn" @click=${() => this.shareOpen = true}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
            </button>
          </div>
        </div>

          ${this.renderTempoSheetMobile()}
          ${this.renderFeelSheetMobile()}
          ${this.renderLibrarySheetMobile(moodColor)}
          <share-modal
            .open=${this.shareOpen}
            .progression=${this.progression}
            .order=${this.order}
            .instrument=${this.instrument}
            .playStyle=${this.playStyle}
            .barsPerChord=${this.barsPerChord}
            .feelSettings=${{ swing: this.swing, spread: this.spread, density: this.density, tone: this.tone }}
            @close=${() => { this.shareOpen = false; }}
            @toast=${(e: CustomEvent<string>) => {
              this.dispatchEvent(new CustomEvent('toast', { detail: e.detail, bubbles: true, composed: true }));
            }}
          ></share-modal>
      `;
    }

    // DESKTOP STUDIO LAYOUT
    return html`
      ${activeBand ? html`
        <div class="band-bar" style="background: ${activeBand.color}33;">
          <div class="band-bar-content">
            <span class="band-bar-kicker">Following Artist DNA</span>
            <span class="band-bar-name" style="font-family: ${activeBand.font}; font-weight: ${activeBand.weight || 800};">
              ${activeBand.name}
            </span>
            <span class="band-bar-trick">— ${this.showTheory ? activeBand.theory : activeBand.plain}</span>
          </div>
          <button class="band-bar-close" @click=${() => this.onBandClick(activeBand.name)} aria-label="Dismiss band DNA">×</button>
        </div>
      ` : ''}

      <div class="studio-container" style="--mood-color: ${moodColor};">
        <!-- 1. Left Narrow Rail (62px) -->
        <nav class="rail-left" role="navigation">
          <div class="rail-top">
            <button
              class="vibe-rail-btn rail-item vibe ${this.vibeOpen ? 'active' : ''}"
              @click=${this.toggleVibe}
              aria-label="Vibe, genre and mood"
              title="Vibe, genre and mood"
              style="background: ${moodColor};"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5"/><circle cx="12" cy="12" r="3.4"/>
              </svg>
            </button>
            <div class="rail-label">Vibe</div>
            <div class="rail-divider"></div>
            <div class="vibe-summary-vertical">${this.getVibeSummary()}</div>
          </div>

          <div class="rail-bottom">
            <button
              class="loops-rail-btn library-toggle rail-item loops ${this.libraryOpen ? 'active' : ''}"
              @click=${this.toggleLibrary}
              aria-label="Your loops"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/>
              </svg>
            </button>
            <div class="rail-label">Loops</div>

            ${this.libraryOpen ? html`
              <div class="loops-popover-desktop library-popover">
                ${this.renderLibraryPopoverContent(moodColor)}
              </div>
            ` : ''}
          </div>
        </nav>

        <!-- Floating Vibe Popover (Desktop) -->
        ${this.vibeOpen ? html`
          <div class="vibe-popover-desktop">
            <div class="popover-header">
              <div class="popover-kicker">The Vibe</div>
              <button class="close-popover-btn" @click=${this.toggleVibe} aria-label="Close">×</button>
            </div>

            <form class="popover-input-row" @submit=${this.onVibeSubmit}>
              <input
                type="text"
                class="cv-vibe-input vibe-text-input"
                .value=${this.freeText}
                @input=${(e: Event) => { this.freeText = (e.target as HTMLInputElement).value; }}
                placeholder=${this.vibeExamples[this.vibePlaceholderIdx]}
              />
              <button type="submit" class="vibe-submit-btn" style="background: ${moodColor};" aria-label="Generate loop from vibe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
              </button>
            </form>

            <div class="popover-kicker spaced">Genre</div>
            <div class="pills-group">
              ${GENRE_PRIMARY.map(g => html`
                <button class="pill ${this.progression?.genre === g ? 'active' : ''}" @click=${() => this.onGenreClick(g)}>${g}</button>
              `)}
            </div>

            <div class="popover-kicker spaced">Mood</div>
            <div class="pills-group">
              ${MOOD_PRIMARY.map(m => {
                const mCol = getMoodColor(m);
                const isActive = this.progression?.mood === m;
                return html`
                  <button class="pill mood-pill ${isActive ? 'active' : ''}" style="${isActive ? `background: ${mCol}; color: #2E271F;` : ''}" @click=${() => this.onMoodClick(m)}>
                    <span class="mood-badge" style="background: ${isActive ? 'rgba(46, 39, 31, 0.12)' : mCol + '33'};">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${isActive ? '#2E271F' : mCol}" stroke-width="2.2" stroke-linecap="round"><path d="${MOOD_ICONS[m] || 'M12 4 a6.5 6.5 0 1 0 6.5 6.5'}"/></svg>
                    </span>
                    ${m}
                  </button>
                `;
              })}
            </div>

            <div class="popover-kicker spaced" style="display:flex;align-items:baseline;gap:7px;">
              <span>Band</span>
              <span style="font-size:11px;font-weight:700;color:rgba(46,39,31,0.38);text-transform:lowercase;">optional</span>
            </div>
            <div class="pills-group">
              ${BANDS.map(b => html`
                <button class="pill ${this.selectedBand === b.name ? 'active' : ''}" style="font-family: ${b.font}; font-weight: ${b.weight || 800};" @click=${() => this.onBandClick(b.name)}>${b.name}</button>
              `)}
            </div>
          </div>
        ` : ''}

        <!-- 2. Center Stage (<main>) -->
        <main class="stage-main">
          <!-- Row 1: View Tabs -->
          <div class="stage-top-bar">
            <div class="view-tabs-bar">
              <button class="view-tab ${this.activeView === 'loop' ? 'active' : ''}" @click=${() => { this.activeView = 'loop'; }}>Chords</button>
              <button class="view-tab ${this.activeView === 'song' ? 'active' : ''}" @click=${() => { this.activeView = 'song'; }}>Song</button>
              <button class="view-tab ${this.activeView === 'play' ? 'active' : ''}" @click=${() => { this.activeView = 'play'; }}>Play it</button>
            </div>
          </div>

          <!-- Row 2: Scrollable Stage Canvas -->
          <div class="stage-scroll-canvas">
            ${this.activeView === 'loop' ? html`
              <div class="stage-card stage-panel">
                <!-- Top Loop Play Button -->
                <div style="position: relative; z-index: 2; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
                  <button
                    class="loop-play-btn"
                    @click=${this.togglePlay}
                    style="background: ${this.playing ? '#2E271F' : moodColor}; color: ${this.playing ? '#FBF3E6' : '#2E271F'}; min-height: 40px; padding: 0 20px; border-radius: 100px; font-weight: 800; font-size: 13px; border: none; cursor: pointer; transition: transform 120ms ease;"
                    aria-label="${this.playing ? 'Stop loop' : 'Play loop'}"
                  >
                    ${this.playing ? 'Stop' : 'Play loop'}
                  </button>
                  <div style="display: flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 700; color: var(--cv-ink-muted); min-width: 0;">
                    <span style="display: inline-flex; align-items: flex-start; justify-content: center; width: 44px; height: 18px; padding: 1.5px 1.5px 3.5px; border-radius: 5px; background: rgba(46,39,31,0.16); box-shadow: 0 1px 0 rgba(46,39,31,0.18); flex-shrink: 0;" aria-hidden="true">
                      <span style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 3.5px; background: rgba(255,255,255,0.62); box-shadow: inset 0 -1px 0 rgba(46,39,31,0.12);">
                        <span style="display: block; width: 20px; height: 1.25px; background: rgba(46,39,31,0.34); border-radius: 1px;"></span>
                      </span>
                    </span>
                    Space plays the loop
                  </div>
                </div>

                <!-- Pad Cells Grid -->
                <div class="pad-cells-grid pad-cells-row cv-padgrid" data-padgrid="1" data-wide="1">
                  ${chords.map((c, i) => {
                    const padColsNow = 4;
                    const laneAfterIdx = Math.min(chords.length - 1, (Math.floor((this.swapIndex ?? 0) / padColsNow) + 1) * padColsNow - 1);
                    return html`
                      ${this.renderChordPad(c, i, moodColor, true)}
                      ${this.swapIndex !== null && i === laneAfterIdx ? html`
                        <chord-swap-lane
                          .swapIndex=${this.swapIndex}
                          .chord=${chords[this.swapIndex]}
                          .feelings=${this.getSwapFeelings(this.swapIndex)}
                          .activeFeel=${this.activeSwapFamily}
                          .pickedChord=${this.abPick}
                          .padCols=${Math.min(chords.length, 4)}
                          .moodColor=${moodColor}
                          @swap-feel-change=${(e: CustomEvent) => { this.activeSwapFamily = e.detail.feel; this.requestUpdate(); }}
                          @swap-audition=${(e: CustomEvent) => this.handleSwapAudition(e.detail)}
                          @swap-confirm=${this.confirmSwap}
                          @swap-close=${this.clearSelection}
                        ></chord-swap-lane>
                      ` : ''}
                    `;
                  })}
                </div>

                ${this.showTheory ? this.renderScaleChords(theoryData.scaleName, theoryData.scaleHint, theoryData.scaleDegrees, false) : ''}

                <!-- Quick Controls Below Pad Cards -->
                <div class="stage-quick-controls" style="display: flex; flex-wrap: wrap; align-items: center; column-gap: 8px; row-gap: 10px; margin-top: 16px;">
                  <button
                    class="instrument-chip ${this.expandedInstrument ? 'open' : ''}"
                    @click=${this.toggleInstrumentExpand}
                    aria-label="Change instrument"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.expandedInstrument ? 'var(--cv-surface)' : 'var(--cv-surface-2)'}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.expandedInstrument ? 'inset 0 0 0 1.5px rgba(46,39,31,0.16)' : 'none'};"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                    ${normalizeInstrumentName(this.instrument)}
                  </button>
                  <div style="width: 1px; align-self: stretch; min-height: 28px; background: rgba(46,39,31,0.12); margin: 0 4px;"></div>
                  <button
                    class="tempo-chip ${this.tempoOpen ? 'open' : ''}"
                    @click=${() => { this.tempoOpen = !this.tempoOpen; if (this.tempoOpen) { this.feelOpen = false; this.expandedInstrument = false; } }}
                    aria-label="Key, tempo and loop length"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.tempoOpen ? 'var(--cv-surface)' : 'var(--cv-surface-2)'}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.tempoOpen ? 'inset 0 0 0 1.5px rgba(46,39,31,0.16)' : 'none'};"
                  >
                    ${this.progression?.key || 'C'} ${this.getCurrentScaleAbbrev()} · ${this.progression?.bpm || 84}
                  </button>
                  <button
                    class="feel-chip ${this.feelOpen ? 'open' : ''}"
                    @click=${() => { this.feelOpen = !this.feelOpen; if (this.feelOpen) { this.tempoOpen = false; this.expandedInstrument = false; } }}
                    aria-label="Feel"
                    style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: ${this.feelOpen ? 'var(--cv-surface)' : 'var(--cv-surface-2)'}; color: #5B5145; min-height: 38px; padding: 0 16px; border-radius: 100px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: background 150ms var(--cv-ease); flex-shrink: 0; white-space: nowrap; box-shadow: ${this.feelOpen ? 'inset 0 0 0 1.5px rgba(46,39,31,0.16)' : 'none'};"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                    ${this.feelChipLabel}
                  </button>
                  <button
                    class="share-btn"
                    @click=${() => { this.shareOpen = true; }}
                    aria-label="Share this loop"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 15V3"/><path d="M8 7l4-4 4 4"/></svg>
                    Share
                  </button>
                </div>

                ${this.renderTempoDrawerDesktop()}
                ${this.renderFeelDrawerDesktop()}

                <!-- Instrument tray if expanded -->
                ${this.expandedInstrument ? html`
                  <div style="animation: cvfv-panel 200ms var(--cv-ease); background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px;">
                    <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Instrument</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
                      ${USER_INSTRUMENTS.map(i => html`
                        <button
                          class="pill ${normalizeInstrumentName(this.instrument) === i.name ? 'active' : ''}"
                          style="border: none; font-family: inherit; display: inline-flex; align-items: center; background: ${(this.instrument || 'Piano') === i.name ? 'var(--cv-ink)' : 'var(--cv-surface)'}; color: ${(this.instrument || 'Piano') === i.name ? 'var(--cv-cream)' : 'var(--cv-ink)'}; border-radius: 100px; min-height: 34px; padding: 0 14px; font-size: 12px; font-weight: 800; cursor: pointer; transition: transform 120ms ease;"
                          @click=${() => {
                            this.instrument = i.name;
                            playbackEngine.setInstrument(i.name);
                            this.dispatchEvent(new CustomEvent('set-instrument', { detail: i.name, bubbles: true, composed: true }));
                            this.expandedInstrument = false;
                            this.requestUpdate();
                          }}
                        >
                          <span style="background:${i.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${i.name}
                        </button>
                      `)}
                    </div>
                  </div>
                ` : ''}
              </div>
            ` : this.activeView === 'song' ? html`
              <div class="song-view-wrap" style="padding: 10px 4px 24px;">
                <!-- Song Play Transport Strip -->
                <div class="loop-strip-header" style="margin-bottom: 20px;">
                  <button
                    class="loop-play-btn"
                    @click=${() => this.dispatchEvent(new CustomEvent('toggle-play-song', { bubbles: true, composed: true }))}
                    style="background: ${this.playing ? '#2E271F' : moodColor}; color: ${this.playing ? '#FBF3E6' : '#2E271F'}; min-height: 42px; padding: 0 18px; border-radius: 100px; font-weight: 800; font-size: 13px; border: none; cursor: pointer; white-space: nowrap;"
                    aria-label="${this.playing ? 'Stop' : `Play song · ${this.sections.length} sections`}"
                  >
                    ${this.playing ? 'Stop' : `Play song · ${this.sections.length} sections`}
                  </button>
                  <div class="strip-timeline-wrap">
                    <div class="strip-cells-bar loop-beat-cells">
                      ${this.sections.map((_, si) => {
                        const isCurrentSec = this.playing && this.activePlayingSectionIdx === si;
                        return html`
                          <div
                            class="strip-cell"
                            style="height: ${isCurrentSec ? 20 : 10}px; border-radius: 3px; background: ${isCurrentSec ? '#F2735F' : 'rgba(46,39,31,0.22)'}; flex: 1;"
                          ></div>
                        `;
                      })}
                    </div>
                    <div class="strip-labels-row">
                      <div class="strip-status-label">
                        ${this.playing
                          ? `Section ${this.activePlayingSectionIdx + 1} of ${this.sections.length} · ${this.sections[this.activePlayingSectionIdx]?.name || ''}`
                          : `${this.sections.length} sections · stopped`}
                      </div>
                      <div class="strip-space-hint">Space plays the song</div>
                    </div>
                  </div>
                </div>

                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); max-width: 600px;">
                  Each section reuses the loop, related but never identical. Tap a section to edit its chords, or press play to hear the whole arrangement.
                </div>

                <!-- Desktop / Wide Horizontal Track -->
                <div class="song-track-container">
                  ${this.sections.map((sec, i) => {
                    const isActive = this.activeSectionIdx === i;
                    return html`
                      <div
                        class="song-track-card ${isActive ? 'active' : ''}"
                        @click=${() => { this.activeSectionIdx = i; this.activeView = 'loop'; }}
                      >
                        <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Section ${i + 1}</div>
                        <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink);">${sec.name}</div>
                        <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); flex: 1;">${sec.desc}</div>
                        <div class="song-card-chips">
                          ${sec.progression.chords.map(c => {
                            const role = roleForTension(c.tension);
                            return html`<div class="song-chord-chip" style="width: 16px; height: 16px; border-radius: ${Math.round(role.radius * 0.4)}px; background: ${role.color}; flex-shrink: 0;" title="${c.name}"></div>`;
                          })}
                        </div>
                      </div>
                    `;
                  })}
                  <div
                    class="add-section-card"
                    @click=${() => this.dispatchEvent(new CustomEvent('add-section', { bubbles: true, composed: true }))}
                    role="button"
                    tabindex="0"
                  >
                    <span style="font-size: 24px; line-height: 1; font-weight: 700;">+</span>
                    <span>Add a related section</span>
                  </div>
                </div>
              </div>
            ` : html`
              <div class="play-it-wrap" style="padding: 18px 24px 32px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
                  <div style="font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; color: var(--cv-label); text-transform: uppercase;">Piano</div>
                  <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" @click=${() => { this.showDegrees = !this.showDegrees; }}>
                    <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showDegrees ? moodColor : 'rgba(46,39,31,0.2)'}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                      <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showDegrees ? 'translateX(16px)' : 'translateX(0)'}; transition: transform 150ms ease;"></div>
                    </div>
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--cv-ink-muted);">Scale degrees</div>
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${chords.map((ch, i) => this.renderPianoCard(ch, i))}
                </div>

                <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; margin-bottom: 14px; flex-wrap: wrap;">
                  <div style="display: flex; gap: 4px; background: var(--cv-surface-2); border-radius: 100px; padding: 4px;">
                    ${['Guitar', 'Ukulele'].map(inst => html`
                      <button
                        style="border: none; font-family: inherit; min-height: 38px; padding: 0 16px; border-radius: 100px; cursor: pointer; font-size: 13px; font-weight: 800; background: ${(this.playInstrument === 'Ukulele' ? 'Ukulele' : 'Guitar') === inst ? moodColor : 'transparent'}; color: ${(this.playInstrument === 'Ukulele' ? 'Ukulele' : 'Guitar') === inst ? '#2E271F' : 'rgba(46,39,31,0.55)'}; transition: background 200ms var(--cv-ease), color 200ms ease;"
                        @click=${() => { this.playInstrument = inst as PlayInstrument; }}
                      >${inst}</button>
                    `)}
                  </div>
                  <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;">
                  ${chords.map((ch, i) => this.renderFretCard(ch, i, this.playInstrument === 'Ukulele' ? 'Ukulele' : 'Guitar'))}
                </div>
              </div>
            `}
          </div>

          <!-- Row 3: Bottom Bar -->
          <div class="stage-bottom-bar">
            <div class="length-stepper">
              <button class="stepper-btn" @click=${this.onDecLength} aria-label="Fewer chords">−</button>
              <span class="stepper-count">${chords.length} chords</span>
              <button class="stepper-btn" @click=${this.onIncLength} aria-label="More chords">+</button>
              <div class="length-presets">
                <button
                  class="preset-btn ${chords.length === 4 ? 'active' : ''}"
                  @click=${() => this.onSetLength(4)}
                  aria-label="4 chords preset"
                  aria-pressed="${chords.length === 4}"
                >4</button>
                <button
                  class="preset-btn ${chords.length === 8 ? 'active' : ''}"
                  @click=${() => this.onSetLength(8)}
                  aria-label="8 chords preset"
                  aria-pressed="${chords.length === 8}"
                >8</button>
              </div>
            </div>
            <button class="try-another-btn dice-reroll-btn" @click=${this.onReroll} aria-label="Try another progression">
              <svg width="15" height="15" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${moodColor}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
              Try another
            </button>
          </div>
        </main>

        <!-- 3. Right Inspector (<aside>) -->
        <aside class="inspector-right sidebar-right">
          ${this.detailOpen ? html`
            <!-- Chord Detail View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; gap: 13px;">
                <div class="chord-shape-badge" style="background: ${roleForTension(chords[this.detailIndex]?.tension || 0.1).color};"></div>
                <div style="flex: 1; min-width: 0;">
                  <div class="detail-kicker">Chord</div>
                  <div class="detail-chord-name">${chords[this.detailIndex]?.name}</div>
                  <div class="detail-chord-function">${chords[this.detailIndex]?.functionLabel}</div>
                </div>
                <button class="close-detail-btn" @click=${this.clearSelection} aria-label="Close chord info">×</button>
              </div>
            </div>

            <div class="inspector-body">
              ${this.renderChordDetailContent(chords)}
            </div>
          ` : this.swapIndex !== null ? html`
            <!-- Chord Swap Harmonic Context View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div class="swap-kicker">Bar ${this.swapIndex + 1} Harmonic Context</div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                    <span class="swap-chord-name">${currentSwapChord?.name || ''}</span>
                    ${this.showTheory && currentSwapChord?.roman ? html`<span class="swap-roman">${currentSwapChord.roman}</span>` : ''}
                    <span class="swap-role">${ROLE_PLAIN[currentSwapChord?.functionLabel || ''] || ''}</span>
                  </div>
                </div>
                <button class="close-swap-btn" @click=${this.clearSelection} aria-label="Close chord inspector">×</button>
              </div>
            </div>

            <div class="inspector-body" style="padding: 16px 20px 22px;">
              ${activeBand ? html`
                <div style="background: var(--cv-cream); border-radius: 14px; padding: 12px 14px; margin-bottom: 14px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: var(--cv-label);">Band DNA · ${activeBand.name}</div>
                  <div style="font-size: 12.5px; font-weight: 700; color: var(--cv-ink); margin-top: 4px;">${this.showTheory ? activeBand.theory : activeBand.plain}</div>
                </div>
              ` : ''}

              ${this.abPick ? html`
                <div style="animation: cvfv-pop 200ms ease-out; background: var(--cv-cream); border-radius: 16px; padding: 16px;">
                  <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
                    Auditioning · ${this.activeSwapFamily || 'Substitution'}
                  </div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 6px; flex-wrap: wrap;">
                    <div style="font-size: 22px; font-weight: 800; color: var(--cv-ink); letter-spacing: -0.02em; line-height: 1.1;">${this.abPick.chord || this.abPick.name}</div>
                    ${this.abPick.roman ? html`<div style="font-size: 12px; font-weight: 800; letter-spacing: 0.6px; color: var(--cv-label);">${this.abPick.roman}</div>` : ''}
                  </div>
                  <div style="font-size: 12.5px; font-weight: 700; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 6px;">
                    ${this.abPick.functionLabel || this.abPick.fn || 'Harmonic substitution that alters the feel of the bar.'}
                  </div>
                  ${this.abPick.notes && this.abPick.notes.length ? html`
                    <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.4px; color: var(--cv-ink); margin-top: 10px;">
                      Notes: ${this.abPick.notes.join(' · ')}
                    </div>
                  ` : ''}
                  <div style="font-size: 11.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 11px; border-top: 1px solid rgba(46,39,31,0.08);">
                    Hear how this chord changes the emotional arc of the progression.
                  </div>
                </div>
              ` : html`
                <div style="font-size: 12.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted); background: var(--cv-cream); border-radius: 14px; padding: 15px;">
                  Pick a feeling in the swap lane under the loop, then tap a candidate chord to audition it. What it does, its notes, and how it voices will show up here.
                </div>
              `}

              ${this.showTheory ? this.renderTheoryStrip(theoryData) : ''}
            </div>
          ` : html`
            <!-- Idle Harmonic Arc View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;">
                <div>
                  <div class="inspector-kicker">This loop</div>
                  <div class="arc-title-text">${arcTitle}</div>
                </div>
                <button class="theory-toggle-btn" @click=${this.onTheoryToggle} aria-label="Show the music theory">
                  <span style="font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted);">Theory</span>
                  <span class="toggle-track ${this.showTheory ? 'active' : ''}">
                    <span class="toggle-knob"></span>
                  </span>
                </button>
              </div>
            </div>

            <div class="inspector-body">
              <div class="arc-bars-row">
                ${chords.map((c, i) => {
                  const r = roleForTension(c.tension || 0.1);
                  const barH = Math.round(18 + (c.tension || 0.1) * 62);
                  return html`
                    <button class="arc-bar-col" @click=${() => this.openSwap(i)} aria-label="${c.name}, ${ROLE_PLAIN[c.functionLabel] || ''}">
                      <div class="arc-bar-fill-wrap">
                        <div class="arc-bar-fill" style="height: ${barH}px; background: ${r.color};"></div>
                      </div>
                      <div class="arc-bar-name">${c.name}</div>
                      <div class="arc-bar-feel">${ROLE_PLAIN[c.functionLabel] || ''}</div>
                    </button>
                  `;
                })}
              </div>
              <div class="arc-caption">Taller means more unresolved.</div>
              <div class="arc-sentence-text">${arcSentence}</div>
              ${this.showTheory && theoryData.setNote ? html`
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(46,39,31,0.08); text-wrap: pretty;">
                  ${theoryData.setNote}
                </div>
              ` : ''}

              <div class="inspector-tip-box" style="margin-top: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${moodColor}" stroke-width="2.4" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                <div>Press a chord to hear it — the arrows on a card show what else could go there.</div>
              </div>
              ${this.showTheory ? this.renderTheoryStrip(theoryData) : ''}
            </div>
          `}
        </aside>
        <share-modal
          .open=${this.shareOpen}
          .progression=${this.progression}
          .order=${this.order}
          .instrument=${this.instrument}
          .playStyle=${this.playStyle}
          .barsPerChord=${this.barsPerChord}
          .feelSettings=${{ swing: this.swing, spread: this.spread, density: this.density, tone: this.tone }}
          @close=${() => { this.shareOpen = false; }}
          @toast=${(e: CustomEvent<string>) => {
            this.dispatchEvent(new CustomEvent('toast', { detail: e.detail, bubbles: true, composed: true }));
          }}
        ></share-modal>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loop-screen': LoopScreen;
  }
}
