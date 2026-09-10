import { LitElement, html, svg, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Progression, ChordBlock, Alternative, TheoryGroup, BorrowedChordRow,
  MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH, getMoodColor, roleForTension,
  RawChordData, AUTOPLAY_INTERVAL_MS, preferFlatSpelling, notesForSymbol, parseChordSymbol,
  generateTheoryGroups, generateBorrowedChords, applyVoicingToChord,
  getDiatonicScaleDegreeList, ScaleDegreeItem,
  getChordIntervalBreakdown, IntervalToken,
  detectProgressionCadences, CadenceInfo,
  analyzeVoiceLeading, VoiceLeadingLink,
  PITCH_CLASS,
  transposeProgression,
} from '../services/chord-engine';
import { playbackEngine } from '../services/playback-engine';
import { projectStorage } from '../services/project-storage';
import { ProjectData } from '../services/project-service';
import { SongArranger } from '../services/song-arranger';
import { SongSection } from './song-screen';
import { USER_INSTRUMENTS, USER_PLAY_STYLES, setMasterTone } from '../services/audio-service';
import { bounceLoop } from '../services/export-service';
import 'human-engine';
import type { HumanState } from 'human-engine';
import './share-modal';

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

const PAD_KEYS = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'];
const ZONE_NAMES = ['Octave up', '1st inversion', 'Low root'];

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

export const FEEL_DEFS = [
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
];

export const FEEL_DEFAULTS = { swing: 0, spread: 50, density: 50, tone: 'Warm' };
export const TONES = ['Warm', 'Glassy', 'Dusty'];
export const KEYS = ['C min', 'A min', 'F min', 'D min', 'G min', 'E♭ maj', 'C maj', 'G maj', 'F maj'];
export const SCALE_NOTE_NAMES = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];

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
  @property({ type: String }) playStyle: string | null = null;
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
  @state() private abPick: { chord: string; tension: number; roman: string; fn: string; label?: string } | null = null;
  @state() private abSide: 'before' | 'after' = 'before';
  @state() private abPlaying = false;
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
  @state() lastPad: { idx: number; voicing: string; vel: number; zone: number } | null = null;
  @state() tempoOpen = false;
  @state() feelOpen = false;
  @state() bounceOpen = false;
  @state() bounceFormat: 'wav' | 'midi' | 'stems' = 'wav';
  @state() shareOpen = false;
  @state() private expandedInstrument = false;
  @state() private expandedPlayStyle = false;
  @state() barsPerChord = 1;
  @state() keyIdx = 0;
  @state() swing = 0;
  @state() spread = 50;
  @state() density = 50;
  @state() tone = 'Warm';
  @state() private showAdvancedFeel = false;
  @state() private humanEngineState: any = null;
  @state() auditionDeg: number | null = null;
  @state() auditionName: string | null = null;
  @state() auditionBar: number = 0;

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
      min-height: 118px;
      outline-offset: 4px;
      touch-action: none;
      transition: box-shadow 140ms ease, transform 120ms ease;
      box-shadow: 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }
    .pad-cell:hover {
      transform: translateY(-1px);
    }
    .pad-cell.pad-held {
      transform: scale(0.985);
      box-shadow: inset 0 0 0 2.5px #2E271F;
    }
    .pad-cell.selected {
      box-shadow: inset 0 0 0 2.5px #2E271F, 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }
    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 2px rgba(46, 39, 31, 0.3);
    }
    .zone-line-a {
      position: absolute;
      left: 9px;
      right: 9px;
      top: 34%;
      height: 1px;
      border-radius: 2px;
      background: rgba(46, 39, 31, 0.075);
      pointer-events: none;
      transition: background 180ms ease, height 180ms ease;
    }
    .zone-line-a.active {
      height: 2px;
      background: rgba(46, 39, 31, 0.34);
    }
    .zone-line-b {
      position: absolute;
      left: 9px;
      right: 9px;
      top: 67%;
      height: 1px;
      border-radius: 2px;
      background: rgba(46, 39, 31, 0.075);
      pointer-events: none;
      transition: background 180ms ease, height 180ms ease;
    }
    .zone-line-b.active {
      height: 2px;
      background: rgba(46, 39, 31, 0.34);
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
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.82);
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
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.82);
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
      padding-right: 64px;
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
      font-size: clamp(20px, 2.1vw, 30px);
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.02em;
      line-height: 1.05;
      overflow-wrap: anywhere;
    }
    .pad-meta-voicing {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.62);
      margin-top: 5px;
      height: 13px;
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
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      flex-shrink: 0;
      white-space: nowrap;
    }
    .instrument-chip:hover, .play-style-chip:hover, .tempo-chip:hover, .feel-chip:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .quick-divider {
      width: 1px;
      align-self: stretch;
      min-height: 28px;
      background: rgba(46, 39, 31, 0.12);
      margin: 0 4px;
    }
    .bounce-btn {
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
      transition: transform 120ms ease;
    }
    .bounce-btn:active {
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
      transition: background 150ms ease;
    }
    .stepper-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .stepper-count {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      min-width: 58px;
      text-align: center;
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
      padding: 16px 20px 24px;
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
      position: sticky;
      bottom: 0;
      flex-shrink: 0;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream, #FBF3E6);
      padding: 11px 14px 26px;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 50;
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
    .mobile-bounce-btn {
      border: none;
      font-family: inherit;
      flex: 0.9;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border-radius: 14px;
      min-height: 46px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      transition: opacity 150ms ease;
    }
    .mobile-bounce-btn:hover {
      opacity: 0.92;
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

    playbackEngine.setFeelSettings({ swing: this.swing, spread: this.spread, density: this.density, tone: this.tone });
    playbackEngine.setBarsPerChord(this.barsPerChord);
    setMasterTone(this.tone);
  }

  updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('swing') || changed.has('spread') || changed.has('density') || changed.has('tone') || changed.has('humanEngineState')) {
      playbackEngine.setFeelSettings({
        swing: this.swing,
        spread: this.spread,
        density: this.density,
        tone: this.tone,
        humanState: this.humanEngineState,
      });
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

  private handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      this.togglePlay();
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      if (this.tempoOpen || this.feelOpen || this.bounceOpen) {
        this.tempoOpen = false;
        this.feelOpen = false;
        this.bounceOpen = false;
        this.requestUpdate();
      }
      return;
    }
    const idx = PAD_KEYS.map(k => k.toLowerCase()).indexOf((e.key || '').toLowerCase());
    const chords = this.progression?.chords || [];
    if (idx >= 0 && idx < chords.length) {
      e.preventDefault();
      const vel = 88 + (idx % 3) * 6;
      this.padFlash = idx;
      this.lastPad = { idx, voicing: '1st inversion', vel, zone: 1 };
      playbackEngine.playChordAtIndex(idx, 0.85, '1st inversion', vel);
      this.requestUpdate();
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
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

  private toggleLibrary = () => {
    this.libraryOpen = !this.libraryOpen;
    this.dispatchEvent(new CustomEvent('library-open-change', { detail: this.libraryOpen, bubbles: true, composed: true }));
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

  private handlePadPointerDown(e: PointerEvent, index: number) {
    let voicing = '1st inversion';
    let zone = 1;
    if (e.currentTarget && typeof (e.currentTarget as HTMLElement).getBoundingClientRect === 'function') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const ratio = (e.clientY - rect.top) / (rect.height || 1);
      if (ratio < 0.34) {
        zone = 0;
        voicing = 'up an octave';
      } else if (ratio > 0.67) {
        zone = 2;
        voicing = 'low, root position';
      } else {
        zone = 1;
        voicing = '1st inversion';
      }
    }
    const vel = 88 + (index % 3) * 6;
    this.padFlash = index;
    this.lastPad = { idx: index, voicing, vel, zone };
    playbackEngine.playChordAtIndex(index, 0.85, voicing, vel);
    this.requestUpdate();
  }

  private handlePadPointerUp() {
    this.padFlash = -1;
    this.requestUpdate();
  }

  private openSwap(index: number) {
    this.swapIndex = index;
    this.detailOpen = false;
    this.isInspectorOpen = true;
    this.abPick = null;
    this.abSide = 'before';
    this.abPlaying = false;
    playbackEngine.setABOverride(null);
    if (this.isMobile) {
      this.mobileSheetOpen = true;
    }
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
    const newNotes = notesForSymbol(this.abPick.chord, preferFlat);

    const updatedChords = [...this.progression.chords];
    updatedChords[this.swapIndex] = {
      ...updatedChords[this.swapIndex],
      name: this.abPick.chord,
      roman: this.abPick.roman,
      tension: this.abPick.tension,
      notes: newNotes,
    };

    const newProg = { ...this.progression, chords: updatedChords };
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
    this.expandedPlayStyle = false;
    this.requestUpdate();
  };

  private togglePlayStyleExpand = () => {
    this.expandedPlayStyle = !this.expandedPlayStyle;
    this.expandedInstrument = false;
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
    return this.swing !== FEEL_DEFAULTS.swing ||
           this.spread !== FEEL_DEFAULTS.spread ||
           this.density !== FEEL_DEFAULTS.density ||
           this.tone !== FEEL_DEFAULTS.tone;
  }

  private resetFeel() {
    this.swing = FEEL_DEFAULTS.swing;
    this.spread = FEEL_DEFAULTS.spread;
    this.density = FEEL_DEFAULTS.density;
    this.tone = FEEL_DEFAULTS.tone;
    this.humanEngineState = null;
    playbackEngine.setFeelSettings({
      swing: this.swing,
      spread: this.spread,
      density: this.density,
      tone: this.tone,
      humanState: undefined,
    });
    setMasterTone(this.tone);
    this.requestUpdate();
  }

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

  private selectKey(keyStr: string) {
    this.keyIdx = KEYS.indexOf(keyStr);
    if (!this.progression) return;
    const transposed = transposeProgression(this.progression, keyStr);
    this.progression = transposed;
    playbackEngine.setProgression(transposed);
    this.dispatchEvent(new CustomEvent('progression-change', { detail: transposed, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', { detail: `Transposed to ${transposed.key} ${transposed.scaleType === 'NATURAL_MINOR' ? 'minor' : 'major'}`, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private onHumanChange = (e: CustomEvent<HumanState>) => {
    if (e.detail) {
      this.humanEngineState = e.detail;
      playbackEngine.setFeelSettings({
        swing: this.swing,
        spread: this.spread,
        density: this.density,
        tone: this.tone,
        humanState: e.detail,
      });
    }
  };

  private onHumanPreview = (e: CustomEvent<HumanState>) => {
    if (e.detail) {
      this.humanEngineState = e.detail;
      playbackEngine.setFeelSettings({
        swing: this.swing,
        spread: this.spread,
        density: this.density,
        tone: this.tone,
        humanState: e.detail,
      });
    }
  };

  private async executeBounce(format: 'wav' | 'midi') {
    if (!this.progression) return;
    try {
      this.dispatchEvent(new CustomEvent('toast', { detail: `Bouncing ${format.toUpperCase()}...`, bubbles: true, composed: true }));
      await bounceLoop({
        progression: this.progression,
        instrumentName: this.instrument,
        playStyleName: this.playStyle,
        format,
        barsPerChord: this.barsPerChord,
        feelSettings: {
          swing: this.swing,
          spread: this.spread,
          density: this.density,
          tone: this.tone,
          humanState: this.humanEngineState,
        },
      });
      this.bounceOpen = false;
      this.dispatchEvent(new CustomEvent('toast', { detail: `Bounced loop as ${format.toUpperCase()}`, bubbles: true, composed: true }));
    } catch (err) {
      console.error('Failed to bounce loop:', err);
      this.dispatchEvent(new CustomEvent('toast', { detail: 'Bounce failed. See console.', bubbles: true, composed: true }));
    }
  }

  private renderBounceModal() {
    if (!this.bounceOpen) return '';
    return html`
      <div style="position: fixed; inset: 0; z-index: 120; display: flex; align-items: center; justify-content: center; background: rgba(46, 39, 31, 0.45); backdrop-filter: blur(4px);">
        <div style="background: var(--cv-surface, #F6EADB); border-radius: 20px; padding: 22px; width: 90%; max-width: 380px; box-shadow: 0 16px 36px rgba(46,39,31,0.25); border: 1px solid rgba(46,39,31,0.12);">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="font-size: 17px; font-weight: 800; color: var(--cv-ink);">Export Loop</div>
            <button
              @click=${() => { this.bounceOpen = false; }}
              style="border: none; background: transparent; font-size: 18px; font-weight: 800; cursor: pointer; color: var(--cv-ink-muted);"
            >×</button>
          </div>
          <div style="font-size: 12.5px; color: var(--cv-ink-muted); margin-top: 6px; line-height: 1.4;">
            Export with current key (${this.progression?.key || 'C'}), tempo (${this.progression?.bpm || 84} BPM, ${this.barsPerChord} bar${this.barsPerChord > 1 ? 's' : ''}/chord), and feel (${this.tone} tone, ${this.swing}% swing).
          </div>
          <div style="display: flex; gap: 10px; margin-top: 18px;">
            <button
              @click=${() => this.executeBounce('wav')}
              style="flex: 1; min-height: 44px; border-radius: 12px; border: none; background: var(--cv-ink, #2E271F); color: var(--cv-cream, #FBF3E6); font-family: inherit; font-size: 13px; font-weight: 800; cursor: pointer; transition: opacity 150ms ease;"
            >
              Bounce WAV
            </button>
            <button
              @click=${() => this.executeBounce('midi')}
              style="flex: 1; min-height: 44px; border-radius: 12px; border: 1.5px solid rgba(46,39,31,0.2); background: var(--cv-cream, #FBF3E6); color: var(--cv-ink, #2E271F); font-family: inherit; font-size: 13px; font-weight: 800; cursor: pointer; transition: opacity 150ms ease;"
            >
              Export MIDI
            </button>
          </div>
        </div>
      </div>
    `;
  }

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
    const keyIsMinor = (this.progression?.scaleType || '').toUpperCase().includes('MINOR') || (this.progression?.key || '').includes('m');
    const keyTonicName = this.progression?.key || 'C';
    const keyTonicPc = PITCH_CLASS[keyTonicName.replace('b', 'b').replace('♭', 'b')] ?? 0;

    const SCALE = keyIsMinor
      ? { steps: [0, 2, 3, 5, 7, 8, 10], romans: ['i', 'ii°', '♭III', 'iv', 'v', '♭VI', '♭VII'], quals: ['m', 'dim', '', 'm', 'm', '', ''],
          fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic'], name: 'natural minor' }
      : { steps: [0, 2, 4, 5, 7, 9, 11], romans: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'], quals: ['', 'm', 'm', '', '', 'm', 'dim'],
          fns: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone'], name: 'major' };

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
    const keyModeLine = keyTonicName.replace('b', '♭') + ' ' + (keyIsMinor ? 'minor' : 'major');
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
      <div class="tempo-popover-desktop" style="background: var(--cv-cream); border-radius: 16px; padding: 14px 16px; margin-top: 11px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 18px;">
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
        <div style="flex: 1; min-width: 240px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">Key</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
            ${KEYS.map((k, i) => {
              const active = this.keyIdx === i || this.progression?.key === k.replace(' min', '').replace(' maj', '').replace('♭', 'b');
              return html`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${active ? 'var(--cv-ink, #2E271F)' : 'var(--cv-cream, #FBF3E6)'}; color: ${active ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                  @click=${() => this.selectKey(k)}
                >
                  ${k}
                </button>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  private renderFeelDrawerDesktop() {
    if (!this.feelOpen) return '';
    return html`
      <div class="feel-popover-desktop" style="background: var(--cv-cream); border-radius: 18px; padding: 14px 16px 16px; margin-top: 11px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); flex: 1; min-width: 0;">Feel &amp; tone</div>
          ${this.feelChanged ? html`
            <button
              @click=${this.resetFeel}
              style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted); font-size: 11.5px; font-weight: 800; cursor: pointer; padding: 6px 8px; border-radius: 9px;"
            >Reset</button>
          ` : ''}
          <button
            @click=${() => { this.feelOpen = false; }}
            aria-label="Close feel and tone"
            style="border: none; font-family: inherit; background: transparent; color: rgba(46,39,31,0.5); width: 30px; height: 30px; border-radius: 50%; font-size: 16px; font-weight: 800; cursor: pointer; flex-shrink: 0;"
          >×</button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 8px 22px; margin-top: 8px;">
          ${FEEL_DEFS.map(d => {
            const curVal = this[d.k];
            let nearest = d.steps[0];
            d.steps.forEach(s => {
              if (Math.abs(s.v - curVal) < Math.abs(nearest.v - curVal)) nearest = s;
            });
            return html`
              <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                <div style="width: 104px; flex-shrink: 0;">
                  <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">${d.label}</div>
                  <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${d.hint}</div>
                </div>
                <div style="display: flex; gap: 5px; flex: 1; min-width: 0;">
                  ${d.steps.map(s => {
                    const on = s === nearest;
                    return html`
                      <button
                        style="border: none; font-family: inherit; flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${on ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${on ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                        @click=${() => {
                          this[d.k] = s.v;
                          playbackEngine.setFeelSettings({ [d.k]: s.v });
                          this.requestUpdate();
                        }}
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
          <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
            <div style="width: 104px; flex-shrink: 0;">
              <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink);">Tone</div>
              <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px;">The colour of the instrument</div>
            </div>
            <div style="display: flex; gap: 5px; flex: 1; min-width: 0;">
              ${TONES.map(t => html`
                <button
                  style="flex: 1; min-width: 0; min-height: 44px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; border: none; font-family: inherit; transition: background 150ms ease, color 150ms ease; background: ${this.tone === t ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${this.tone === t ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                  @click=${() => {
                    this.tone = t;
                    playbackEngine.setFeelSettings({ tone: t });
                    setMasterTone(t);
                    this.requestUpdate();
                  }}
                >
                  ${t}
                </button>
              `)}
            </div>
          </div>
          <div style="grid-column: 1 / -1; margin-top: 10px; padding-top: 12px; border-top: 1px dashed rgba(46, 39, 31, 0.18);">
            <button
              @click=${() => { this.showAdvancedFeel = !this.showAdvancedFeel; }}
              style="border: 1px solid rgba(46, 39, 31, 0.18); background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-family: inherit; font-size: 11.5px; font-weight: 800; padding: 7px 14px; border-radius: 9px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 150ms ease;"
            >
              <span>${this.showAdvancedFeel ? '▲ Hide Advanced Fine-Tuning' : '▼ Advanced Fine-Tuning…'}</span>
            </button>
            ${this.showAdvancedFeel ? html`
              <div class="advanced-feel-wrap" style="margin-top: 10px; max-height: 480px; overflow-y: auto; border-radius: 12px; padding: 4px;">
                <human-panel
                  .chordSequence=${this.progression?.chords?.map(c => c.name).join(' ') || 'Cmaj7 Dm7 G7 Cmaj'}
                  .bpm=${this.progression?.bpm || 80}
                  ?hideInput=${true}
                  heading="Human Expression Engine"
                  style="--human-bg: var(--cv-cream, #FBF3E6); --human-surface: var(--cv-surface, #F6EADB); --human-border: rgba(46,39,31,0.15); --human-text-primary: var(--cv-ink, #2E271F); --human-text-secondary: var(--cv-ink-muted, #6B5F50); --human-accent: var(--cv-action, #9B7CA8); --human-accent-hover: var(--cv-action-hover, #84698F); max-width: 100%; min-width: 0; box-shadow: none;"
                  @human-change=${this.onHumanChange}
                  @human-preview=${this.onHumanPreview}
                ></human-panel>
              </div>
            ` : ''}
          </div>
        </div>
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
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 15px;">Key</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${KEYS.map((k, i) => {
              const active = this.keyIdx === i || this.progression?.key === k.replace(' min', '').replace(' maj', '').replace('♭', 'b');
              return html`
                <button
                  style="border: none; font-family: inherit; padding: 8px 12px; border-radius: 100px; font-size: 12px; font-weight: 800; cursor: pointer; transition: background 150ms ease; background: ${active ? 'var(--cv-ink, #2E271F)' : 'var(--cv-cream, #FBF3E6)'}; color: ${active ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                  @click=${() => this.selectKey(k)}
                >
                  ${k}
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
    return html`
      <div style="position: fixed; inset: 0; z-index: 80;">
        <div style="position: absolute; inset: 0; background: rgba(46, 39, 31, 0.5);" @click=${() => { this.feelOpen = false; }}></div>
        <div style="position: absolute; left: 0; right: 0; bottom: 0; z-index: 81; background: var(--cv-surface); border-radius: 26px 26px 0 0; padding: 14px 18px 24px; box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5); animation: cvfv-sheet-up 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
          <div style="width: 38px; height: 4px; border-radius: 3px; background: rgba(46, 39, 31, 0.18); margin: 0 auto 13px;"></div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 15.5px; font-weight: 800; letter-spacing: -0.01em; color: var(--cv-ink); flex: 1; min-width: 0;">Feel &amp; tone</div>
            ${this.feelChanged ? html`
              <button
                @click=${this.resetFeel}
                style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted); font-size: 12px; font-weight: 800; cursor: pointer; padding: 8px 10px; border-radius: 10px;"
              >Reset</button>
            ` : ''}
            <button
              @click=${() => { this.feelOpen = false; }}
              style="border: none; font-family: inherit; background: var(--cv-surface-2); color: var(--cv-ink); border-radius: 100px; padding: 8px 14px; font-size: 12px; font-weight: 800; cursor: pointer;"
            >Done</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 13px; margin-top: 14px;">
            ${FEEL_DEFS.map(d => {
              const curVal = this[d.k];
              let nearest = d.steps[0];
              d.steps.forEach(s => {
                if (Math.abs(s.v - curVal) < Math.abs(nearest.v - curVal)) nearest = s;
              });
              return html`
                <div>
                  <div style="display: flex; align-items: baseline; gap: 9px;">
                    <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink); flex: 1; min-width: 0;">${d.label}</div>
                    <div style="font-size: 11px; font-weight: 700; color: rgba(46,39,31,0.45); text-align: right;">${d.hint}</div>
                  </div>
                  <div style="display: flex; gap: 5px; margin-top: 7px;">
                    ${d.steps.map(s => {
                      const on = s === nearest;
                      return html`
                        <button
                          style="border: none; font-family: inherit; flex: 1; min-width: 0; min-height: 44px; padding: 0 6px; border-radius: 12px; cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: -0.005em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${on ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${on ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                          @click=${() => {
                            this[d.k] = s.v;
                            playbackEngine.setFeelSettings({ [d.k]: s.v });
                            this.requestUpdate();
                          }}
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
          <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label); margin-top: 16px;">Tone</div>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            ${TONES.map(t => html`
              <button
                style="flex: 1; min-width: 0; min-height: 44px; display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; border: none; font-family: inherit; transition: background 150ms ease, color 150ms ease; background: ${this.tone === t ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${this.tone === t ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                @click=${() => {
                  this.tone = t;
                  playbackEngine.setFeelSettings({ tone: t });
                  setMasterTone(t);
                  this.requestUpdate();
                }}
              >
                ${t}
              </button>
            `)}
          </div>
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed rgba(46, 39, 31, 0.18);">
            <button
              @click=${() => { this.showAdvancedFeel = !this.showAdvancedFeel; }}
              style="border: 1px solid rgba(46, 39, 31, 0.18); background: var(--cv-surface-2, #F1E4CC); color: var(--cv-ink); font-family: inherit; font-size: 11.5px; font-weight: 800; padding: 7px 14px; border-radius: 9px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 150ms ease;"
            >
              <span>${this.showAdvancedFeel ? '▲ Hide Advanced Fine-Tuning' : '▼ Advanced Fine-Tuning…'}</span>
            </button>
            ${this.showAdvancedFeel ? html`
              <div class="advanced-feel-wrap" style="margin-top: 10px; max-height: 400px; overflow-y: auto; border-radius: 12px; padding: 4px;">
                <human-panel
                  .chordSequence=${this.progression?.chords?.map(c => c.name).join(' ') || 'Cmaj7 Dm7 G7 Cmaj'}
                  .bpm=${this.progression?.bpm || 80}
                  ?hideInput=${true}
                  heading="Human Expression Engine"
                  style="--human-bg: var(--cv-cream, #FBF3E6); --human-surface: var(--cv-surface, #F6EADB); --human-border: rgba(46,39,31,0.15); --human-text-primary: var(--cv-ink, #2E271F); --human-text-secondary: var(--cv-ink-muted, #6B5F50); --human-accent: var(--cv-action, #9B7CA8); --human-accent-hover: var(--cv-action-hover, #84698F); max-width: 100%; min-width: 0; box-shadow: none;"
                  @human-change=${this.onHumanChange}
                  @human-preview=${this.onHumanPreview}
                ></human-panel>
              </div>
            ` : ''}
          </div>
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
        <div class="zone-line-a ${this.lastPad?.idx === i && this.lastPad?.zone === 0 ? 'active' : ''}"></div>
        <div class="zone-line-b ${this.lastPad?.idx === i && this.lastPad?.zone === 2 ? 'active' : ''}"></div>
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
        <div class="zone-line-a ${this.lastPad?.idx === i && this.lastPad?.zone === 0 ? 'active' : ''}"></div>
        <div class="zone-line-b ${this.lastPad?.idx === i && this.lastPad?.zone === 2 ? 'active' : ''}"></div>
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

  private renderLibraryPopoverContent(moodColor: string) {
    const q = this.librarySearch.trim().toLowerCase();
    const visible = this.savedSets.filter(s => !q || (s.name + ' ' + s.genre + ' ' + s.mood).toLowerCase().includes(q));

    return html`
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 2px 6px 8px;">
        <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">
          Your loops (${this.savedSets.length})
        </div>
        <button
          style="border: none; background: transparent; font-size: 11.5px; font-weight: 800; color: var(--cv-ink-muted); cursor: pointer;"
          @click=${() => { this.librarySelectMode = !this.librarySelectMode; this.requestUpdate(); }}
        >
          ${this.librarySelectMode ? 'Done' : 'Select'}
        </button>
      </div>

      <div style="padding: 0 4px 9px;">
        <input
          type="text"
          class="cv-vibe-input"
          style="width: 100%; border: none; background: var(--cv-surface); border-radius: 12px; padding: 9px 12px; font-size: 12.5px; outline: none;"
          .value=${this.librarySearch}
          @input=${(e: Event) => { this.librarySearch = (e.target as HTMLInputElement).value; }}
          placeholder="Search loops"
        />
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        ${visible.map(set => html`
          <div
            style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 12px; cursor: pointer; background: var(--cv-surface);"
            @click=${() => {
              this.dispatchEvent(new CustomEvent('load-project', { detail: set, bubbles: true, composed: true }));
              this.libraryOpen = false;
            }}
          >
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
        `)}
        ${!visible.length ? html`
          <div style="padding: 12px; font-size: 12px; color: var(--cv-ink-muted); text-align: center;">No loops match that.</div>
        ` : ''}
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
                    const role = roleForTension(chord.tension || 0.1);
                    const isHeld = this.padFlash === idx;
                    const isLit = this.playing && idx === this.progressStep;

                    return html`
                      <div
                        class="pad-cell ${isHeld ? 'pad-held' : ''} ${isLit ? 'pad-lit' : ''}"
                        style="background: ${role.color}; min-height: 108px;"
                        tabindex="0"
                        role="button"
                        aria-label="${chord.name}, ${ROLE_PLAIN[chord.functionLabel] || chord.functionLabel} — press to play it; press nearer the top for a higher voicing"
                        @pointerdown=${(e: PointerEvent) => this.handlePadPointerDown(e, idx)}
                        @pointerup=${() => this.handlePadPointerUp()}
                        @pointercancel=${() => this.handlePadPointerUp()}
                        @pointerleave=${() => this.handlePadPointerUp()}
                      >
                        <div class="zone-line-a ${this.lastPad?.idx === idx && this.lastPad?.zone === 0 ? 'active' : ''}"></div>
                        <div class="zone-line-b ${this.lastPad?.idx === idx && this.lastPad?.zone === 2 ? 'active' : ''}"></div>

                        <button
                          class="pad-swap-btn"
                          @click=${(e: MouseEvent) => { e.stopPropagation(); this.openSwap(idx); }}
                          @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
                          aria-label="Swap ${chord.name}"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                        </button>

                        <button
                          class="pad-detail-btn"
                          @click=${(e: MouseEvent) => { e.stopPropagation(); this.openDetail(idx); }}
                          @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
                          aria-label="View voicing for ${chord.name}"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>

                        <div class="pad-top-row">
                          <span class="pad-key-badge">${PAD_KEYS[idx] || ''}</span>
                          ${this.showTheory && chord.roman ? html`<span class="pad-roman-badge">${chord.roman}</span>` : ''}
                        </div>

                        <div class="pad-bottom-info">
                          <div class="pad-role-label">${ROLE_SHORT[chord.functionLabel] || chord.functionLabel}</div>
                          <div class="pad-chord-name" style="font-size: 20px;">${chord.name}</div>
                          ${this.showTheory && chord.notes && chord.notes.length ? html`
                            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
                              ${chord.notes.join(' · ')}
                            </div>
                          ` : ''}
                          <div class="pad-meta-voicing">${this.lastPad?.idx === idx ? (ZONE_NAMES[this.lastPad.zone] || this.lastPad.voicing) : ''}</div>
                        </div>
                      </div>
                    `;
                  })}
                </div>

                ${this.showTheory ? this.renderScaleChords(theoryData.scaleName, theoryData.scaleHint, theoryData.scaleDegrees, true) : ''}

                <div class="playing-now-row">
                  <div class="playing-now-kicker">Playing now</div>
                  <div class="playing-now-chord">${this.lastPad ? chords[this.lastPad.idx]?.name : '—'}</div>
                  <div class="playing-now-desc">
                    ${this.lastPad ? `${this.lastPad.voicing} · velocity ${this.lastPad.vel}` : 'Press a chord — nearer the top of a card plays a higher voicing. Home-row keys A S D F play them too.'}
                  </div>
                </div>
              </div>

              <!-- Quick chips -->
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px;">
                <button class="instrument-chip" @click=${this.toggleInstrumentExpand} aria-label="Change instrument">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${this.instrument || 'Piano'} <span style="opacity:0.6;">⌄</span>
                </button>
                <button class="play-style-chip" @click=${this.togglePlayStyleExpand} aria-label="Change playing style">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle || 'Block chords'} <span style="opacity:0.6;">⌄</span>
                </button>
              </div>

              ${this.expandedInstrument ? html`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${USER_INSTRUMENTS.map(i => html`
                    <button
                      class="pill ${(this.instrument || 'Piano') === i.name ? 'active' : ''}"
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

              ${this.expandedPlayStyle ? html`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${USER_PLAY_STYLES.map(s => html`
                    <button
                      class="pill ${(this.playStyle || 'Block chords') === s.name ? 'active' : ''}"
                      @click=${() => {
                        this.playStyle = s.name;
                        playbackEngine.setPlayStyle(s.name);
                        this.dispatchEvent(new CustomEvent('set-play-style', { detail: s.name, bubbles: true, composed: true }));
                        this.expandedPlayStyle = false;
                        this.requestUpdate();
                      }}
                    >
                      <span style="background:${s.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${s.name}
                    </button>
                  `)}
                </div>
              ` : ''}

              <div style="display: flex; gap: 7px; margin-top: 12px;">
                <button class="mobile-chip-btn" @click=${() => { this.tempoOpen = !this.tempoOpen; if (this.tempoOpen) this.feelOpen = false; }} aria-label="Key, tempo and length">
                  ${this.progression?.key || 'C'} · ${this.progression?.bpm || 84}
                </button>
                <button class="mobile-chip-btn" @click=${() => { this.feelOpen = !this.feelOpen; if (this.feelOpen) this.tempoOpen = false; }}>Feel &amp; tone</button>
                <button class="mobile-bounce-btn" @click=${() => { this.bounceOpen = true; }}>Bounce</button>
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
              <div class="song-track-list">
                ${this.sections.map((sec, i) => html`
                  <div class="song-card" @click=${() => { this.activeSectionIdx = i; this.activeView = 'loop'; }}>
                    <div style="display: flex; gap: 5px; margin-bottom: 6px;">
                      ${sec.progression.chords.map(c => {
                        const role = roleForTension(c.tension);
                        return html`<span style="display:inline-block;width:8px;height:8px;border-radius:${Math.round(role.radius * 0.3)}px;background:${role.color};flex-shrink:0;"></span>`;
                      })}
                    </div>
                    <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">${sec.name}</div>
                    <div style="font-size: 12px; color: var(--cv-ink-muted);">${sec.desc}</div>
                  </div>
                `)}
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

          <!-- Mobile Swap Sheet -->
          ${this.mobileSheetOpen && this.swapIndex !== null ? html`
            <div class="sheet-scrim" @click=${() => { this.mobileSheetOpen = false; }}></div>
            <div class="mobile-swap-sheet mobile-sheet">
              <div class="sheet-handle"></div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div class="sheet-title" style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">Swap Chord ${this.swapIndex + 1} (${currentSwapChord?.name})</div>
                <button class="sheet-cancel-btn" style="padding: 4px 10px;" @click=${() => { this.mobileSheetOpen = false; }}>×</button>
              </div>

              <div class="ab-compare-box ab-box">
                <div class="ab-compare-row">
                  <button
                    class="ab-card-half ${this.abSide === 'before' ? 'active-now' : ''}"
                    style="background: ${this.abSide === 'before' ? '#5E5142' : '#F1E4D2'}; color: ${this.abSide === 'before' ? '#FBF3E6' : '#2E271F'};"
                    @click=${() => this.setABSide('before')}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Now</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${currentSwapChord?.name || ''}</div>
                  </button>
                  <button
                    class="ab-card-half ${this.abSide === 'after' ? 'active-swap' : ''}"
                    style="background: ${this.abPick ? (this.abSide === 'after' ? moodColor : '#F1E4D2') : 'transparent'}; color: #2E271F; border: ${this.abPick ? 'none' : '1.5px dashed rgba(46,39,31,0.22)'};"
                    @click=${() => this.setABSide('after')}
                    ?disabled=${!this.abPick}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Swap to</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px; color: ${this.abPick ? '#2E271F' : 'rgba(46,39,31,0.45)'};"> ${this.abPick?.chord || 'Pick one below'}</div>
                  </button>
                </div>
                <div class="ab-loop-player-row">
                  <button
                    class="ab-play-toggle-btn"
                    style="background: ${this.abPlaying ? moodColor : '#E8D9C2'};"
                    @click=${this.toggleABPlayback}
                    aria-label="${this.abPlaying ? 'Pause loop' : 'Play loop with swap preview'}"
                  >
                    ${this.abPlaying ? html`<svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>` : html`<svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>`}
                  </button>
                  <div class="ab-cells-track">
                    ${chords.map((c, i) => {
                      const isSwapBar = i === this.swapIndex;
                      const cellLabel = isSwapBar && this.abSide === 'after' && this.abPick ? this.abPick.chord : c.name;
                      const isCellActive = this.abPlaying && Math.floor(this.progressStep / 4) === i;
                      return html`
                        <button
                          class="ab-cell-item ${isCellActive ? 'active-step' : ''}"
                          style="background: ${isSwapBar && this.abSide === 'after' && this.abPick ? moodColor : '#F1E4D2'}; opacity: ${isSwapBar ? 1 : 0.65};"
                          @click=${() => this.onAbCellClick(i)}
                          aria-label="Preview ${cellLabel} in bar ${i + 1}"
                        >
                          ${cellLabel}
                        </button>
                      `;
                    })}
                  </div>
                </div>
              </div>

              <div class="swap-family-tabs swap-tab-nav" style="margin-top: 14px;">
                ${SWAP_FAMILIES.map(fam => {
                  const on = this.activeSwapFamily === fam.key;
                  const rr = roleForTension(fam.tension);
                  const d = Math.round(rr.size * 0.34);
                  const radius = Math.round(rr.radius * (d / rr.size));
                  return html`
                    <button
                      class="swap-family-tab ${on ? 'active' : ''}"
                      @click=${() => {
                        this.activeSwapFamily = fam.key;
                        this.requestUpdate();
                      }}
                    >
                      ${fam.twoTone ? html`
                        <span class="two-tone-swatch" style="box-shadow: ${on ? `0 0 0 3px ${moodColor}` : 'none'};">
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                        </span>
                      ` : html`
                        <span
                          class="family-shape"
                          style="width: ${d}px; height: ${d}px; border-radius: ${radius}px; background: ${rr.color}; box-shadow: ${on ? `0 0 0 3px ${moodColor}` : 'none'};"
                        ></span>
                      `}
                      <span class="family-label ${on ? 'active' : ''}">${fam.label}</span>
                    </button>
                  `;
                })}
              </div>

              ${activeBand ? html`
                <div class="band-note-banner" style="background: ${activeBand.color}22; margin-top: 10px;">
                  <span>${this.showTheory ? `${activeBand.name}: ${activeBand.theory}` : `Sorted for ${activeBand.name} — their moves first`}</span>
                </div>
              ` : ''}

              <div class="alt-candidates-list" style="margin-top: 10px;">
                ${familyRows.map(row => {
                  const isBandTagged = !!activeBand && activeBand.hoist.includes(row.name);
                  const rRole = roleForTension(row.tension);
                  const shapeSize = Math.max(26, Math.min(36, Math.round(rRole.size * 0.32)));
                  const shapeRadius = Math.round(rRole.radius * (shapeSize / rRole.size));
                  return html`
                    <div class="alt-chord-row alt-item-row ${this.abPick?.chord === row.name ? 'selected' : ''}" @click=${() => this.selectAlternative(row)}>
                      <div class="alt-shape" style="width: ${shapeSize}px; height: ${shapeSize}px; border-radius: ${shapeRadius}px; background: ${rRole.color}; box-shadow: ${this.abPick?.chord === row.name ? `0 0 0 2px ${moodColor}` : 'none'}; flex-shrink: 0;"></div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${row.name}</span>
                          ${this.showTheory && row.roman ? html`<span style="font-size: 11px; font-weight: 800; color: #7A5C88;">${row.roman}</span>` : ''}
                          ${isBandTagged ? html`<span class="band-move-tag" style="background: ${activeBand.color};">${activeBand.name} move</span>` : ''}
                        </div>
                        <div style="font-size: 11.5px; color: var(--cv-ink-muted);">${row.sub}</div>
                        ${this.showTheory && row.notes && row.notes.length ? html`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${row.notes.join(' · ')}
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `;
                })}
              </div>

              <div style="display: flex; gap: 10px; margin-top: 18px;">
                <button class="sheet-cancel-btn" style="flex: 1;" @click=${() => { this.mobileSheetOpen = false; }}>Cancel</button>
                <button class="accept-swap-btn" style="flex: 1; margin-top: 0;" @click=${this.confirmSwap} ?disabled=${!this.abPick}>
                  ${this.abPick ? `Keep ${this.abPick.chord}` : 'Pick a chord'}
                </button>
              </div>
            </div>
          ` : ''}

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

          <!-- Mobile Bottom Transport Bar -->
          <div class="mobile-bottom-transport-bar">
            <button class="loop-play-btn" @click=${this.togglePlay} style="background: ${this.playing ? '#2E271F' : moodColor}; color: ${this.playing ? '#FBF3E6' : '#2E271F'}; flex-shrink: 0; min-height: 44px; padding: 9px 16px; border-radius: 100px; font-weight: 800; font-size: 12.5px; border: none; cursor: pointer;">
              ${this.playing ? 'Stop' : 'Play loop'}
            </button>
            <div style="flex: 1 1 30px; min-width: 24px;">
              <div style="display: flex; gap: 2px; align-items: flex-end; height: 16px;">
                ${Array.from({ length: 16 }).map((_, i) => {
                  const step = Math.floor(this.progressStep % (chords.length * 4));
                  const isHead = this.playing && Math.floor((step / (chords.length * 4)) * 16) === i;
                  const isBarStart = i % 4 === 0;
                  return html`
                    <div style="flex: 1; height: ${isHead ? 16 : (isBarStart ? 11 : 7)}px; border-radius: 2px; background: ${isHead ? '#F2735F' : (isBarStart ? 'rgba(46,39,31,0.3)' : 'rgba(46,39,31,0.14)')};"></div>
                  `;
                })}
              </div>
              <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--cv-label); margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${this.playing ? `Bar ${Math.floor(this.progressStep / 4) + 1} · beat ${(this.progressStep % 4) + 1}` : `${chords.length} bars · stopped`}
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button aria-label="Try another progression" class="mobile-circle-btn" @click=${this.onReroll}>
                <svg width="19" height="19" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${moodColor}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
              </button>
              <button aria-label="Keep this loop" class="mobile-circle-btn" @click=${() => this.dispatchEvent(new CustomEvent('save-set', { bubbles: true, composed: true }))}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
              </button>
              <button aria-label="Loops library" class="mobile-circle-btn" @click=${() => this.libraryOpen = !this.libraryOpen}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h11M4 12h11M4 18h7"/><path d="M19 4v10l-2.4-1.6L14.2 14V4z" fill="#2E271F" stroke="none"/></svg>
              </button>
              <button aria-label="Share this loop" class="mobile-circle-btn" @click=${() => this.shareOpen = true}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
              </button>
            </div>
          </div>

          ${this.renderTempoSheetMobile()}
          ${this.renderFeelSheetMobile()}
          ${this.renderBounceModal()}
        </div>
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
                <!-- Top Loop Play Strip -->
                <div class="loop-strip-header">
                  <button class="loop-play-btn play-circle-btn" @click=${this.togglePlay} style="background: ${this.playing ? '#2E271F' : moodColor}; color: ${this.playing ? '#FBF3E6' : '#2E271F'};">
                    ${this.playing ? 'Stop' : 'Play loop'}
                  </button>

                  <div class="strip-timeline-wrap">
                    <div class="strip-cells-bar loop-beat-cells">
                      ${Array.from({ length: 16 }).map((_, i) => {
                        const step = Math.floor(this.progressStep % (chords.length * 4));
                        const isHead = this.playing && Math.floor((step / (chords.length * 4)) * 16) === i;
                        const isBarStart = i % 4 === 0;
                        return html`
                          <div
                            class="strip-cell beat-cell"
                            style="height: ${isHead ? 20 : (isBarStart ? 13 : 8)}px; background: ${isHead ? '#F2735F' : (isBarStart ? 'rgba(46,39,31,0.3)' : 'rgba(46,39,31,0.14)')};"
                          ></div>
                        `;
                      })}
                    </div>
                    <div class="strip-labels-row">
                      <div class="strip-status-label">${this.playing ? `Bar ${Math.floor(this.progressStep / 4) + 1} · beat ${(this.progressStep % 4) + 1} of ${chords.length} bars` : `${chords.length} bars · stopped`}</div>
                      <div class="strip-space-hint">Space plays the loop</div>
                    </div>
                  </div>

                  <div class="loop-bar-chips-group">
                    <div class="from-bar-label">From bar</div>
                    <div class="loop-bar-chips">
                      ${chords.map((_, i) => {
                        const isCurrent = this.playing && Math.floor(this.progressStep / 4) === i;
                        return html`
                          <button
                            class="strip-jump-chip"
                            style="background: ${isCurrent ? moodColor : 'var(--cv-surface-2)'};"
                            @click=${() => this.onJumpBar(i)}
                            aria-label="Play loop from bar ${i + 1}"
                          >${i + 1}</button>
                        `;
                      })}
                    </div>
                  </div>
                </div>

                <!-- Pad Cells Grid -->
                <div class="pad-cells-grid pad-cells-row">
                  ${chords.map((c, i) => {
                    const role = roleForTension(c.tension || 0.1);
                    const isLit = this.activeIndex === i && this.playing;
                    const isHeld = this.padFlash === i;
                    const isSelected = this.swapIndex === i;

                    return html`
                      <div
                        class="pad-cell chord-item-wrap ${isHeld ? 'pad-held' : ''} ${isSelected ? 'selected' : ''} ${isLit ? 'pad-lit' : ''}"
                        style="background: ${role.color};"
                        @pointerdown=${(e: PointerEvent) => this.handlePadPointerDown(e, i)}
                        @pointerup=${() => this.handlePadPointerUp()}
                        @pointercancel=${() => this.handlePadPointerUp()}
                        @pointerleave=${() => this.handlePadPointerUp()}
                        tabindex="0"
                        role="button"
                        aria-label="${c.name}, ${ROLE_PLAIN[c.functionLabel] || c.functionLabel} — press to play it; press nearer the top for a higher voicing"
                      >
                        <div class="zone-line-a ${this.lastPad?.idx === i && this.lastPad?.zone === 0 ? 'active' : ''}"></div>
                        <div class="zone-line-b ${this.lastPad?.idx === i && this.lastPad?.zone === 2 ? 'active' : ''}"></div>

                        <button
                          class="pad-swap-btn quick-action-btn swap"
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

                        <div class="pad-top-row">
                          <div class="pad-key-badge">${PAD_KEYS[i] || ''}</div>
                          ${this.showTheory && c.roman ? html`<div class="pad-roman-badge">${c.roman}</div>` : ''}
                        </div>

                        <div class="pad-bottom-info">
                          <div class="pad-role-label">${ROLE_SHORT[c.functionLabel] || c.functionLabel}</div>
                          <div class="pad-chord-name">${c.name}</div>
                          ${this.showTheory && c.notes && c.notes.length ? html`
                            <div class="pad-notes-theory" style="font-size: 10px; font-weight: 800; letter-spacing: 0.3px; color: var(--cv-label); margin-top: 2px;">
                              ${c.notes.join(' · ')}
                            </div>
                          ` : ''}
                          <div class="pad-meta-voicing">${this.lastPad?.idx === i ? (ZONE_NAMES[this.lastPad.zone] || this.lastPad.voicing) : ''}</div>
                        </div>
                      </div>
                    `;
                  })}
                </div>

                ${this.showTheory ? this.renderScaleChords(theoryData.scaleName, theoryData.scaleHint, theoryData.scaleDegrees, false) : ''}

                <!-- Playing Now Row -->
                <div class="playing-now-row playing-now-banner">
                  <div class="playing-now-kicker">Playing now</div>
                  <div class="playing-now-chord">${this.lastPad ? chords[this.lastPad.idx]?.name : '—'}</div>
                  <div class="playing-now-desc">
                    ${this.lastPad ? `${this.lastPad.voicing} · velocity ${this.lastPad.vel}` : 'Press a chord — nearer the top of a card plays a higher voicing. Home-row keys A S D F play them too.'}
                  </div>
                </div>
              </div>

              <!-- Quick Controls Below Stage Card -->
              <div class="stage-quick-controls">
                <button class="instrument-chip" @click=${this.toggleInstrumentExpand}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${this.instrument || 'Piano'} <span style="opacity:0.6;">⌄</span>
                </button>
                <button class="play-style-chip" @click=${this.togglePlayStyleExpand}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle || 'Block chords'} <span style="opacity:0.6;">⌄</span>
                </button>
                <div class="quick-divider"></div>
                <button class="tempo-chip" @click=${() => { this.tempoOpen = !this.tempoOpen; if (this.tempoOpen) this.feelOpen = false; }}>${this.progression?.key || 'C'} · ${this.progression?.bpm || 84}</button>
                <button class="feel-chip" @click=${() => { this.feelOpen = !this.feelOpen; if (this.feelOpen) this.tempoOpen = false; }}>Feel &amp; tone</button>
                <button class="bounce-btn" @click=${() => { this.bounceOpen = true; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 20h16"/></svg>
                  Bounce
                </button>
              </div>

              ${this.renderTempoDrawerDesktop()}
              ${this.renderFeelDrawerDesktop()}

              <!-- Instrument tray if expanded -->
              ${this.expandedInstrument ? html`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${USER_INSTRUMENTS.map(i => html`
                    <button
                      class="pill ${(this.instrument || 'Piano') === i.name ? 'active' : ''}"
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

              <!-- Play style tray if expanded -->
              ${this.expandedPlayStyle ? html`
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${USER_PLAY_STYLES.map(s => html`
                    <button
                      class="pill ${(this.playStyle || 'Block chords') === s.name ? 'active' : ''}"
                      @click=${() => {
                        this.playStyle = s.name;
                        playbackEngine.setPlayStyle(s.name);
                        this.dispatchEvent(new CustomEvent('set-play-style', { detail: s.name, bubbles: true, composed: true }));
                        this.expandedPlayStyle = false;
                        this.requestUpdate();
                      }}
                    >
                      <span style="background:${s.color}; display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px;"></span>${s.name}
                    </button>
                  `)}
                </div>
              ` : ''}
            ` : this.activeView === 'song' ? html`
              <div class="song-track-list">
                <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); max-width: 560px;">
                  Each section reuses the loop, related but never identical. Press play below to hear the whole thing.
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 18px; max-width: 620px;">
                  ${this.sections.map((sec, i) => html`
                    <div
                      class="song-card"
                      style="display: flex; align-items: center; gap: 16px; background: var(--cv-surface); border-radius: 16px; padding: 14px 18px; cursor: pointer;"
                      @click=${() => { this.activeSectionIdx = i; this.activeView = 'loop'; }}
                    >
                      <div style="font-size: 11px; font-weight: 800; color: var(--cv-label);">Section ${i + 1}</div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">${sec.name}</div>
                        <div style="font-size: 12px; color: var(--cv-ink-muted);">${sec.desc}</div>
                      </div>
                      <div style="display: flex; gap: 4px; flex-shrink: 0;">
                        ${sec.progression.chords.map(c => {
                          const role = roleForTension(c.tension);
                          return html`<span style="display:inline-block;width:10px;height:10px;border-radius:${Math.round(role.radius * 0.35)}px;background:${role.color};flex-shrink:0;"></span>`;
                        })}
                      </div>
                    </div>
                  `)}
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
            <!-- Chord Swap View -->
            <div class="inspector-header">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                <div>
                  <div class="swap-kicker">Swapping Bar ${this.swapIndex + 1}</div>
                  <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                    <span class="swap-chord-name">${currentSwapChord?.name || ''}</span>
                    ${this.showTheory && currentSwapChord?.roman ? html`<span class="swap-roman">${currentSwapChord.roman}</span>` : ''}
                    <span class="swap-role">${ROLE_PLAIN[currentSwapChord?.functionLabel || ''] || ''}</span>
                  </div>
                </div>
                <button class="close-swap-btn" @click=${this.clearSelection} aria-label="Close chord inspector">×</button>
              </div>

              <div class="ab-compare-box ab-box">
                <div class="ab-compare-row">
                  <button
                    class="ab-card-half ${this.abSide === 'before' ? 'active-now' : ''}"
                    style="background: ${this.abSide === 'before' ? '#5E5142' : '#F1E4D2'}; color: ${this.abSide === 'before' ? '#FBF3E6' : '#2E271F'};"
                    @click=${() => this.setABSide('before')}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Now</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px;">${currentSwapChord?.name || ''}</div>
                  </button>
                  <button
                    class="ab-card-half ${this.abSide === 'after' ? 'active-swap' : ''}"
                    style="background: ${this.abPick ? (this.abSide === 'after' ? moodColor : '#F1E4D2') : 'transparent'}; color: #2E271F; border: ${this.abPick ? 'none' : '1.5px dashed rgba(46,39,31,0.22)'};"
                    @click=${() => this.setABSide('after')}
                    ?disabled=${!this.abPick}
                  >
                    <div style="font-size: 9px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65;">Swap to</div>
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px; color: ${this.abPick ? '#2E271F' : 'rgba(46,39,31,0.45)'};"> ${this.abPick?.chord || 'Pick one below'}</div>
                  </button>
                </div>
                <div class="ab-loop-player-row">
                  <button
                    class="ab-play-toggle-btn"
                    style="background: ${this.abPlaying ? moodColor : '#E8D9C2'};"
                    @click=${this.toggleABPlayback}
                    aria-label="${this.abPlaying ? 'Pause loop' : 'Play loop with swap preview'}"
                  >
                    ${this.abPlaying ? html`<svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>` : html`<svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>`}
                  </button>
                  <div class="ab-cells-track">
                    ${chords.map((c, idx) => {
                      const isSwapBar = idx === this.swapIndex;
                      const cellLabel = isSwapBar && this.abSide === 'after' && this.abPick ? this.abPick.chord : c.name;
                      const isCellActive = this.abPlaying && Math.floor(this.progressStep / 4) === idx;
                      return html`
                        <button
                          class="ab-cell-item ${isCellActive ? 'active-step' : ''}"
                          style="background: ${isSwapBar && this.abSide === 'after' && this.abPick ? moodColor : '#F1E4D2'}; opacity: ${isSwapBar ? 1 : 0.65};"
                          @click=${() => this.onAbCellClick(idx)}
                          aria-label="Preview ${cellLabel} in bar ${idx + 1}"
                        >
                          ${cellLabel}
                        </button>
                      `;
                    })}
                  </div>
                </div>
              </div>

              <button class="accept-swap-btn" @click=${this.confirmSwap} ?disabled=${!this.abPick}>
                ${this.abPick ? `Keep ${this.abPick.chord}` : 'Pick a chord below'}
              </button>
            </div>

            <div class="inspector-body">
              <div class="swap-family-tabs swap-tab-nav">
                ${SWAP_FAMILIES.map(fam => {
                  const on = this.activeSwapFamily === fam.key;
                  const rr = roleForTension(fam.tension);
                  const d = Math.round(rr.size * 0.34);
                  const radius = Math.round(rr.radius * (d / rr.size));
                  return html`
                    <button
                      class="swap-family-tab ${on ? 'active' : ''}"
                      @click=${() => {
                        this.activeSwapFamily = fam.key;
                        this.requestUpdate();
                      }}
                    >
                      ${fam.twoTone ? html`
                        <span class="two-tone-swatch" style="box-shadow: ${on ? `0 0 0 3px ${moodColor}` : 'none'};">
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #9CC0EC;"></span>
                          <span style="width: 8px; height: 24px; border-radius: 3px; background: #C9A9E0;"></span>
                        </span>
                      ` : html`
                        <span
                          class="family-shape"
                          style="width: ${d}px; height: ${d}px; border-radius: ${radius}px; background: ${rr.color}; box-shadow: ${on ? `0 0 0 3px ${moodColor}` : 'none'};"
                        ></span>
                      `}
                      <span class="family-label ${on ? 'active' : ''}">${fam.label}</span>
                    </button>
                  `;
                })}
              </div>

              ${activeBand ? html`
                <div class="band-note-banner" style="background: ${activeBand.color}22;">
                  <span>${this.showTheory ? `${activeBand.name}: ${activeBand.theory}` : `Sorted for ${activeBand.name} — their moves first`}</span>
                </div>
              ` : ''}

              ${familyNote ? html`
                <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px;">
                  ${familyNote}
                </div>
              ` : ''}

              <div class="alt-candidates-list">
                ${familyRows.map(row => {
                  const isBandTagged = !!activeBand && activeBand.hoist.includes(row.name);
                  const rRole = roleForTension(row.tension);
                  const shapeSize = Math.max(28, Math.min(38, Math.round(rRole.size * 0.32)));
                  const shapeRadius = Math.round(rRole.radius * (shapeSize / rRole.size));
                  return html`
                    <div class="alt-chord-row alt-item-row ${this.abPick?.chord === row.name ? 'selected' : ''}" @click=${() => this.selectAlternative(row)}>
                      <div class="alt-shape" style="width: ${shapeSize}px; height: ${shapeSize}px; border-radius: ${shapeRadius}px; background: ${rRole.color}; box-shadow: ${this.abPick?.chord === row.name ? `0 0 0 2px ${moodColor}` : 'none'}; flex-shrink: 0;"></div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 15px; font-weight: 800; color: #2E271F;">${row.name}</span>
                          ${this.showTheory && row.roman ? html`<span style="font-size: 11px; font-weight: 800; color: #7A5C88;">${row.roman}</span>` : ''}
                          ${isBandTagged ? html`<span class="band-move-tag" style="background: ${activeBand.color};">${activeBand.name} move</span>` : ''}
                        </div>
                        <div style="font-size: 11.5px; color: var(--cv-ink-muted); margin-top: 2px;">${row.sub}</div>
                        ${this.showTheory && row.notes && row.notes.length ? html`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${row.notes.join(' · ')}
                          </div>
                        ` : ''}
                      </div>
                      <button class="alt-play-chip alt-play-btn" @click=${(e: MouseEvent) => { e.stopPropagation(); this.previewAlternative(row.name); }}>Hear</button>
                    </div>
                  `;
                })}
              </div>
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
        ${this.renderBounceModal()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loop-screen': LoopScreen;
  }
}
