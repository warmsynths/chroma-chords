import { LitElement, html, svg, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Progression, ChordBlock, Alternative, TheoryGroup, BorrowedChordRow,
  MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH, getMoodColor, roleForTension,
  generateProgression, generateAlternatives, generateTheoryGroups, generateBorrowedChords,
  RawChordData, AUTOPLAY_INTERVAL_MS, preferFlatSpelling, notesForSymbol,
} from '../services/chord-engine';
import { playbackEngine, quantiseHits } from '../services/playback-engine';
import { projectStorage } from '../services/project-storage';
import { ProjectData, LoopLane, LoopLaneHit } from '../services/project-service';
import { SongArranger } from '../services/song-arranger';
import { SongSection } from './song-screen';
import { startChordNotes, stopChordNotes, playMetronomeClick, USER_INSTRUMENTS } from '../services/audio-service';
import { bounceLoop } from '../services/export-service';
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
const MOOD_PRIMARY = ['Warm', 'Melancholy', 'Dreamy', 'Uplifting', 'Tense', 'Nostalgic'];

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
};

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

  @state() private isMobile = window.innerWidth < 900;
  @state() private activeView: ViewTab = 'loop';
  @state() private soundOpen = false;
  @state() private shareOpen = false;
  @state() private vibeOpen = false;
  @state() private selectedBand: string | null = null;
  @state() private freeText = '';
  @state() private vibePlaceholderIdx = 0;
  @state() private expandedGenre = false;
  @state() private activeSwapFamily = 'Darker';
  @state() private swapIndex: number | null = null;
  @state() private isInspectorOpen = false;
  @state() private abPick: { label: string; tension: number; chord: string; roman: string; fn: string } | null = null;
  @state() private abSide: 'before' | 'after' = 'before';
  @state() private savedSets: ProjectData[] = [];
  @state() private renamingId: string | null = null;
  @state() private draftName = '';
  @state() private confirmDeleteId: string | null = null;
  @state() private librarySearch = '';
  @state() private librarySelectMode = false;
  @state() private librarySelected: string[] = [];
  @state() private previewIndex = -1;
  @state() private playInstrument: PlayInstrument = 'Piano';
  @state() private showDegrees = false;
  @state() private mobileSheetOpen = false;
  @state() private snapProgress = false;
  @state() private abPlaying = false;
  @property({ type: Boolean }) performMode = false;
  @state() armedLane = 'l1';
  @state() private recording = false;
  @state() private recStartStep = 0;
  @state() private stepsRecorded = 0;
  @state() private takeHits: LoopLaneHit[] = [];
  @state() takeOffered: { laneId: string; hits: LoopLaneHit[] } | null = null;
  @state() padFlash = -1;
  @state() lastPad: { idx: number; voicing: string; vel: number } | null = null;
  @property({ type: Array }) lanes: LoopLane[] = [
    { id: 'l1', name: 'Rhodes · chords', color: '#F2A79B', quantise: 'Off', hits: [], kept: false, muted: false },
    { id: 'l2', name: 'Sub · root notes', color: '#9CC0EC', quantise: 'Bar', hits: [], kept: true, muted: false },
  ];
  @property({ type: String }) countInSetting: 'Off' | '1 bar' | '2 bars' = '1 bar';
  @state() isCountingIn = false;
  @state() countInBeat = 0;
  @state() countInTotalBeats = 0;
  private countInInterval: ReturnType<typeof setInterval> | null = null;
  private lastTickAt = Date.now();

  private vibeExamples = ['Rainy drive at 2am, first day of summer...', 'Portishead trip-hop', 'Bohemian Rhapsody', 'Tame Impala neo-psychedelia', 'Warm acoustic fireplace'];
  private placeholderTimer: ReturnType<typeof setInterval> | null = null;
  private previewTimer: ReturnType<typeof setTimeout> | null = null;
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

    /* Top Band DNA Banner */
    .band-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 24px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      flex-shrink: 0;
      animation: cvfv-sheet-up 180ms var(--cv-ease);
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
      color: var(--cv-ink);
    }
    .band-bar-trick {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-muted);
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
      color: var(--cv-ink);
      transition: background 150ms ease;
    }
    .band-bar-close:hover {
      background: var(--cv-cream);
    }

    /* Desktop 3-Column Grid */
    .studio-grid {
      flex: 1;
      min-height: 0;
      width: 100%;
      display: grid;
      grid-template-columns: clamp(238px, 19vw, 296px) minmax(0, 1fr) clamp(304px, 26vw, 384px);
    }

    /* Left Sidebar */
    .sidebar-left {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr) auto;
      border-right: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream, #FBF3E6);
      min-height: 0;
      min-width: 0;
    }
    .sidebar-scroll {
      overflow-y: auto;
      padding: 20px 18px 24px;
    }
    .kicker-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.4px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      margin-bottom: 9px;
    }
    .kicker-label.spaced {
      margin-top: 22px;
    }

    .vibe-input-row {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-cream);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      padding: 5px 5px 5px 12px;
      margin-top: 9px;
      transition: border-color 180ms ease, box-shadow 180ms ease;
    }
    .vibe-input-row.generating {
      border-color: rgba(46, 39, 31, 0.35);
      background: rgba(251, 243, 230, 0.75);
      animation: cvfv-vibe-pulse 1.2s ease-in-out infinite alternate;
    }
    @keyframes cvfv-vibe-pulse {
      0% { box-shadow: 0 0 0 0 rgba(46, 39, 31, 0); }
      100% { box-shadow: 0 0 0 3px rgba(46, 39, 31, 0.1); }
    }
    .vibe-text-input {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--cv-ink);
      padding: 8px 0;
    }
    .vibe-text-input:disabled {
      opacity: 0.7;
      cursor: not-allowed;
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
      transition: transform 120ms ease, opacity 150ms ease;
    }
    .vibe-submit-btn:disabled {
      opacity: 0.75;
      cursor: not-allowed;
    }
    .vibe-submit-btn:active {
      transform: scale(0.94);
    }
    .vibe-generating-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      margin-top: 7px;
      padding: 4px 10px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      animation: cv-toast-in 200ms ease;
    }
    .vibe-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(46, 39, 31, 0.25);
      border-top-color: var(--cv-ink, #2E271F);
      border-radius: 50%;
      animation: cv-spin 0.7s linear infinite;
    }
    @keyframes cv-spin {
      to { transform: rotate(360deg); }
    }

    .pills-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 9px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: none;
      border-radius: 100px;
      padding: 8px 16px;
      font-size: 12.5px;
      font-weight: 700;
      font-family: inherit;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink-muted, #5B5145);
      cursor: pointer;
      transition: background 150ms ease, transform 100ms ease, color 150ms ease;
    }
    .pill:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .pill:active {
      transform: scale(0.96);
    }
    .pill.active {
      background: var(--mood-color, #F6D98B);
      color: var(--cv-ink, #2E271F);
    }
    .pill.more-toggle {
      border: 1.5px dashed rgba(46, 39, 31, 0.3);
      background: transparent;
      color: var(--cv-label);
    }
    .mood-badge {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .band-trick-text {
      font-size: 12px;
      line-height: 1.5;
      color: var(--cv-ink-muted);
      margin-top: 10px;
      padding: 10px 12px;
      background: var(--cv-surface);
      border-radius: 12px;
      border-left: 3px solid var(--cv-plum);
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }

    .sidebar-footer {
      position: relative;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      padding: 10px 12px 12px;
      background: var(--cv-cream);
    }
    .library-toggle {
      width: 100%;
      border: none;
      font-family: inherit;
      background: transparent;
      color: var(--cv-ink);
      min-height: 44px;
      padding: 0 12px;
      border-radius: 12px;
      font-size: 12.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      transition: background 150ms ease;
    }
    .library-toggle.open {
      background: var(--cv-surface);
    }
    .library-toggle:hover {
      background: var(--cv-surface);
    }

    /* Library Popover Panel (Desktop) */
    .library-popover {
      position: absolute;
      left: 8px;
      width: 300px;
      bottom: 62px;
      z-index: 30;
      max-height: calc(100vh - 150px);
      overflow-y: auto;
      overscroll-behavior: contain;
      mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%);
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 10px;
      box-shadow: 0 22px 44px -20px rgba(46, 39, 31, 0.5);
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }

    /* Library Popover Panel (Mobile) */
    .library-popover-mobile {
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 82px;
      z-index: 40;
      max-height: calc(100vh - 190px);
      overflow-y: auto;
      overscroll-behavior: contain;
      mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 14px), transparent 100%);
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 18px;
      padding: 10px;
      box-shadow: 0 22px 44px -18px rgba(46, 39, 31, 0.55);
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }

    /* Library Popover Header */
    .lib-pop-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 6px 8px;
    }
    .lib-pop-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
      flex: 1;
      min-width: 0;
    }
    .lib-pop-select-btn {
      border: none;
      font-family: inherit;
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 11.5px;
      font-weight: 800;
      padding: 6px 11px;
      border-radius: 100px;
      cursor: pointer;
      flex-shrink: 0;
    }

    /* Library Search */
    .lib-pop-search {
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: var(--cv-surface, #F6EADB);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.1);
      border-radius: 12px;
      outline: none;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink, #2E271F);
      padding: 9px 12px;
    }
    .lib-pop-search::placeholder {
      color: rgba(46, 39, 31, 0.52);
    }

    /* Library Row Items */
    .lib-rows {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .lib-row {
      width: 100%;
      box-sizing: border-box;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 0 7px 6px;
      border-radius: 14px;
      min-height: 44px;
      transition: background 140ms ease;
      cursor: pointer;
    }
    .lib-row:hover {
      background: var(--cv-surface, #F6EADB);
    }
    .lib-row.active {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .lib-row.checked {
      background: var(--cv-surface, #F6EADB);
    }
    .lib-row-info {
      flex: 1;
      min-width: 0;
    }
    .lib-row-name-line {
      display: flex;
      gap: 7px;
      align-items: center;
      min-width: 0;
    }
    .lib-row-dots {
      display: flex;
      gap: 3px;
      align-items: center;
      flex-shrink: 0;
    }
    .lib-row-name {
      flex: 1;
      min-width: 0;
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lib-row-meta {
      display: block;
      font-size: 11.5px;
      color: var(--cv-ink-muted, #6B5F50);
      line-height: 1.35;
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lib-row-actions {
      display: flex;
      gap: 1px;
      flex-shrink: 0;
    }
    .lib-icon-btn {
      border: none;
      font-family: inherit;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 140ms ease;
    }
    .lib-icon-btn:hover {
      background: var(--cv-cream, #FBF3E6);
    }
    .lib-confirm-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .lib-confirm-delete-btn {
      border: none;
      font-family: inherit;
      background: #D8624C;
      color: #FBF3E6;
      font-size: 11.5px;
      font-weight: 800;
      padding: 7px 11px;
      border-radius: 100px;
      cursor: pointer;
      flex-shrink: 0;
    }
    .lib-rename-input {
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
      border-radius: 11px;
      outline: none;
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      padding: 9px 11px;
    }
    .lib-check {
      width: 22px;
      height: 22px;
      border-radius: 7px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      color: #2E271F;
      cursor: pointer;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.22);
    }
    .lib-check.checked {
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
    }
    .lib-no-match {
      font-size: 12.5px;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 10px 6px;
    }
    .lib-empty-text {
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 8px 6px;
      text-wrap: pretty;
    }
    .lib-batch-delete-btn {
      border: none;
      font-family: inherit;
      width: 100%;
      font-size: 12.5px;
      font-weight: 800;
      min-height: 40px;
      border-radius: 100px;
      cursor: pointer;
      margin-top: 8px;
    }

    .mobile-loops-toggle-btn {
      width: 100%;
      border: none;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink);
      min-height: 44px;
      padding: 0 14px;
      border-radius: 14px;
      font-size: 13px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      margin-top: 10px;
      transition: background 150ms ease;
    }
    .mobile-loops-toggle-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }

    /* Center Main Stage */
    .stage-main {
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto;
      background: var(--cv-cream);
    }
    .stage-header {
      min-width: 0;
      padding: 14px 24px 10px;
    }
    .stage-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .stage-title {
      font-size: 19px;
      font-weight: 800;
      letter-spacing: -0.015em;
      color: var(--cv-ink);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .stage-action-btns {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .round-btn {
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--cv-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 150ms ease, transform 100ms ease;
    }
    .round-btn:hover {
      background: var(--cv-surface-2);
    }
    .round-btn:active {
      transform: scale(0.96);
    }
    .round-btn.active {
      background: var(--mood-color, #F6D98B);
    }

    /* View Switcher Tabs: Chords | Song | Play it */
    .view-tabs-bar {
      display: flex;
      gap: 2px;
      background: var(--cv-surface);
      border-radius: 100px;
      padding: 4px;
      margin-top: 10px;
      width: fit-content;
    }
    .view-tab {
      border: none;
      min-height: 38px;
      padding: 0 18px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      font-family: inherit;
      white-space: nowrap;
      cursor: pointer;
      background: transparent;
      color: var(--cv-ink-muted);
      transition: background 160ms ease, color 160ms ease;
    }
    .view-tab.active {
      background: #2E271F;
      color: #FBF3E6;
    }

    /* Stage Canvas Area */
    .stage-canvas {
      min-width: 0;
      overflow-y: auto;
      padding: 6px 26px 26px;
      display: flex;
      flex-direction: column;
    }
    .stage-panel {
      position: relative;
      min-height: 280px;
      background: var(--cv-surface);
      border-radius: 26px;
      padding: 26px 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
      flex: 1;
    }
    .drift-shape {
      position: absolute;
      pointer-events: none;
      opacity: 0.45;
    }
    .drift-shape.a {
      left: -64px;
      top: -64px;
      animation: cvfv-bg-drift-a 11s ease-in-out infinite;
    }
    .drift-shape.b {
      right: -58px;
      bottom: -58px;
      animation: cvfv-bg-drift-b 13s ease-in-out infinite;
    }

    /* Geometric Chord Cards Grid */
    .chords-flex-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
      width: 100%;
    }
    .chord-item-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: transform 160ms var(--cv-ease);
      outline: none;
      position: relative;
    }
    .chord-item-wrap:hover {
      transform: translateY(-3px);
    }
    .chord-block-shape {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: box-shadow 200ms ease, transform 160ms var(--cv-ease);
    }
    .chord-block-shape.active-pulse {
      box-shadow: 0 0 0 5px var(--mood-color, #F6D98B), 0 18px 32px -14px rgba(46, 39, 31, 0.32);
    }
    .chord-block-shape.selected-inspector {
      box-shadow: 0 0 0 3.5px var(--cv-plum), 0 16px 28px -12px rgba(46, 39, 31, 0.4);
    }
    .roman-pill-badge {
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      background: #2E271F;
      color: #FBF3E6;
      font-size: 10.5px;
      font-weight: 800;
      padding: 2px 9px;
      border-radius: 100px;
      white-space: nowrap;
    }
    .chord-title-text {
      font-weight: 800;
      color: #2E271F;
      line-height: 1;
      white-space: nowrap;
    }
    .chord-role-label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.1px;
      color: rgba(46, 39, 31, 0.55);
      text-align: center;
    }

    /* Sound Settings Drawer */
    .sound-drawer {
      margin-top: 14px;
      padding: 14px 18px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }
    .sound-options-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 9px;
    }

    /* Song View inside Stage */
    .song-track-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 640px;
      width: 100%;
    }
    .song-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--cv-surface);
      border-radius: 18px;
      padding: 18px 20px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .song-card:hover {
      transform: translateY(-1px);
    }
    .song-card.active-sec {
      box-shadow: inset 0 0 0 2px var(--mood-color, #F6D98B);
    }
    .add-sec-card {
      border-radius: 16px;
      border: 1.5px dashed rgba(46, 39, 31, 0.25);
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #8A6B3F;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .add-sec-card:hover {
      background: rgba(46, 39, 31, 0.04);
    }

    /* Play It View inside Stage */
    .play-it-wrap {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      max-width: 720px;
    }
    .play-cards-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
    @media (max-width: 640px) {
      .play-cards-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .play-card {
      background: var(--cv-surface);
      border-radius: 20px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .play-card:hover {
      transform: translateY(-2px);
    }

    /* Bottom Transport Bar */
    .transport-footer {
      min-width: 0;
      border-top: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-cream);
      padding: 11px 22px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .play-circle-btn {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 150ms ease;
    }
    .play-circle-btn:active {
      transform: scale(0.96);
    }
    .progress-line-track {
      flex: 1;
      height: 9px;
      border-radius: 6px;
      background: var(--cv-surface-2, #F1E4CC);
      overflow: hidden;
      position: relative;
    }
    .progress-line-fill {
      height: 100%;
      transform-origin: left;
      border-radius: 6px;
      transition: transform var(--progress-duration, 1700ms) linear, background 0.4s ease;
      will-change: transform;
    }
    .progress-line-fill.snap {
      transition: none !important;
    }
    .stepper-wrap {
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
      background: var(--cv-surface);
      color: var(--cv-ink);
      font-size: 15px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .stepper-btn:hover {
      background: var(--cv-surface-2);
    }
    .stepper-text {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted);
      min-width: 58px;
      text-align: center;
    }
    .dice-reroll-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface);
      color: var(--cv-ink);
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
    .dice-reroll-btn:hover {
      background: var(--cv-surface-2);
    }

    /* Right Sidebar (Desktop only) */
    .sidebar-right {
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr);
      border-left: 1px solid rgba(46, 39, 31, 0.09);
      background: var(--cv-surface, #F6EADB);
    }
    .right-header {
      padding: 18px 22px 14px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }
    .right-scroll {
      min-width: 0;
      overflow-y: auto;
      padding: 16px 22px 22px;
    }

    /* Tension Arc */
    .arc-bars-box {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: 148px;
      padding: 0 2px;
    }
    .arc-bar-col {
      flex: 1;
      border: none;
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
      background: var(--cv-cream);
    }
    .arc-bar-pillar {
      width: 100%;
      max-width: 34px;
      border-radius: 8px;
      transition: height 280ms var(--cv-ease), background 280ms ease;
    }

    /* A/B Compare Box & Loop Progression Player */
    @keyframes cvfv-abcell {
      0%, 24% {
        box-shadow: inset 0 0 0 2px #2E271F;
      }
      25%, 100% {
        box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
      }
    }

    .ab-box {
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
      transition: background 160ms ease, opacity 160ms ease, transform 100ms ease, box-shadow 160ms ease;
    }
    .ab-cell-item:hover {
      opacity: 1 !important;
      filter: brightness(0.96);
    }
    .ab-cell-item:active {
      transform: scale(0.94);
    }
    .ab-cell-item.active-step {
      box-shadow: inset 0 0 0 2px #2E271F;
    }

    .accept-swap-btn {
      border: none;
      cursor: pointer;
      width: 100%;
      padding: 13px 16px;
      font-size: 14px;
      font-weight: 800;
      border-radius: 100px;
      margin-top: 10px;
      transition: opacity 150ms ease, transform 100ms ease;
    }
    .accept-swap-btn:hover {
      opacity: 0.92;
    }
    .accept-swap-btn:active {
      transform: scale(0.98);
    }

    .swap-tab-nav {
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
      background: var(--cv-cream);
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
      white-space: normal;
      line-height: 1.1;
      text-align: center;
      max-width: 100%;
      transition: color 150ms ease;
    }
    .family-label.active {
      color: var(--cv-ink);
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
      flex-shrink: 0;
    }
    .alt-item-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 14px;
      background: var(--cv-cream);
      margin-bottom: 7px;
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease, background 140ms ease;
    }
    .alt-item-row:hover {
      background: #FFFBF5;
      transform: translateY(-1px);
    }
    .alt-item-row.selected {
      box-shadow: inset 0 0 0 2px var(--cv-plum);
      background: #FDF9F2;
    }
    .alt-play-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #2E271F;
      transition: background 150ms var(--cv-ease), transform 120ms ease;
    }
    .alt-play-btn:active {
      transform: scale(0.92);
    }

    /* Dedicated Mobile Layout */
    .mobile-stage-wrap {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .mobile-vibe-bar {
      width: 100%;
      border: none;
      background: var(--cv-surface, #F6EADB);
      border-radius: 18px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      text-align: left;
    }
    .quick-action-btn {
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1.5px solid rgba(46, 39, 31, 0.14);
      background: var(--cv-cream);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      transition: transform 100ms ease;
    }
    .quick-action-btn:active {
      transform: scale(0.92);
    }
    .quick-action-btn.swap {
      top: -10px;
      right: -10px;
    }
    .quick-action-btn.detail {
      bottom: -10px;
      left: -10px;
    }

    /* Mobile Slide-Up Sheet Modal */
    .sheet-scrim {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.4);
      z-index: 100;
      backdrop-filter: blur(4px);
      animation: cvfv-sheet-up 180ms ease;
    }
    .mobile-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 80vh;
      background: var(--cv-surface, #F6EADB);
      border-radius: 24px 24px 0 0;
      z-index: 101;
      display: flex;
      flex-direction: column;
      padding: 20px 20px 30px;
      box-shadow: 0 -12px 32px rgba(46, 39, 31, 0.25);
      animation: cvfv-sheet-up 220ms var(--cv-ease);
      overflow-y: auto;
    }

    /* ------------------------------------------------------------------ */
    /* Perform Mode Styles: Pads & Loop Deck                              */
    /* ------------------------------------------------------------------ */
    .mode-toggle-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 10px;
      margin-bottom: 8px;
    }
    .perform-mode-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      padding: 10px 17px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms var(--cv-ease, ease), color 150ms ease;
    }
    .perform-mode-btn:hover {
      opacity: 0.92;
    }
    .perform-mode-btn.exit {
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
    }
    .mode-pills-bar {
      display: inline-flex;
      background: var(--cv-surface-2, #F1E4CC);
      padding: 3px;
      border-radius: 100px;
      gap: 2px;
    }
    .mode-pill {
      border: none;
      background: transparent;
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      color: var(--cv-ink-muted, #6B5F50);
      transition: all 150ms var(--cv-ease, ease);
      font-family: inherit;
    }
    .mode-pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .perform-hint {
      font-size: 11.5px;
      font-weight: 700;
      line-height: 1.45;
      color: var(--cv-ink-muted, #6B5F50);
      flex: 1;
      min-width: 0;
    }
    .perform-banner {
      display: flex;
      align-items: baseline;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 4px;
      padding: 0 4px;
      position: relative;
      z-index: 2;
      width: 100%;
    }
    .perform-banner-kicker {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }
    .perform-banner-now {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .perform-banner-sub {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }

    .quick-chips-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
    }
    .quick-chip-btn {
      border: none;
      font-family: inherit;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      border-radius: 100px;
      padding: 9px 16px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms var(--cv-ease, ease);
    }
    .quick-chip-btn:hover {
      filter: brightness(0.97);
    }

    /* Pads Container - Desktop & Mobile */
    .pad-cells-row {
      position: relative;
      z-index: 2;
      flex: 1;
      min-height: 240px;
      display: flex;
      align-items: stretch;
      gap: 12px;
      min-width: 0;
      width: 100%;
    }
    .pad-cell {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 18px 18px 20px;
      border-radius: 20px;
      cursor: pointer;
      user-select: none;
      touch-action: none;
      min-height: 230px;
      box-shadow: 0 14px 26px -18px rgba(46, 39, 31, 0.45);
      transform: none;
      transition: opacity 120ms ease, box-shadow 140ms ease, transform 120ms ease;
      outline-offset: 4px;
      position: relative;
      overflow: hidden;
    }
    .pad-cell:hover {
      filter: brightness(1.02);
    }
    .pad-cell.pad-held {
      box-shadow: inset 0 0 0 2.5px #2E271F !important;
      transform: scale(0.985);
    }
    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 2px rgba(46, 39, 31, 0.3);
    }
    .pad-key-label {
      font-size: 11px;
      font-weight: 800;
      color: rgba(46, 39, 31, 0.5);
      font-family: inherit;
    }
    .pad-name {
      font-size: 19px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.01em;
      line-height: 1.1;
    }
    .pad-meta {
      font-size: 11.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.6);
      margin-top: 3px;
      line-height: 1.2;
    }
    .pad-cells-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
      flex: 1;
      min-height: 0;
      position: relative;
      z-index: 2;
    }

    /* Loop Deck Container */
    .loop-deck {
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      padding: 14px 16px 16px;
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      border: 1px solid rgba(46, 39, 31, 0.08);
      animation: cvfv-sheet-up 200ms var(--cv-ease);
    }
    .deck-top-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .rec-btn {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: var(--cv-surface-2, #F1E4CC);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      border: none;
      transition: background 150ms ease, box-shadow 150ms ease;
    }
    .rec-btn.is-recording {
      background: #F2735F;
      box-shadow: 0 8px 18px -10px rgba(242, 115, 95, 0.9);
    }
    .rec-btn.is-counting-in {
      background: var(--cv-yellow, #F6D98B);
      box-shadow: 0 0 0 3px rgba(246, 217, 139, 0.5);
      animation: cvfv-count-pulse 500ms infinite alternate;
    }
    @keyframes cvfv-count-pulse {
      0% { transform: scale(1); }
      100% { transform: scale(1.06); }
    }
    .count-in-number {
      font-size: 19px;
      font-weight: 900;
      color: #2E271F;
      font-family: inherit;
    }
    .rec-glyph {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #F2735F;
      transition: all 150ms ease;
    }
    .rec-btn.is-recording .rec-glyph {
      width: 15px;
      height: 15px;
      border-radius: 4px;
      background: #FBF3E6;
      animation: cvfv-rec-pulse 1s infinite alternate;
    }
    @keyframes cvfv-rec-pulse {
      0% { opacity: 1; }
      100% { opacity: 0.35; }
    }
    .deck-meta-col {
      flex: 1;
      min-width: 0;
    }
    .deck-rec-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .deck-rec-sub {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 2px;
    }
    .deck-count-in-wrap {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-left: auto;
      flex-shrink: 0;
    }
    .deck-count-in-label {
      font-size: 11px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .deck-count-in-pills {
      display: inline-flex;
      background: var(--cv-surface-2, #F1E4CC);
      padding: 2px;
      border-radius: 8px;
      gap: 2px;
    }
    .deck-count-pill {
      border: none;
      font-family: inherit;
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 10.5px;
      font-weight: 800;
      padding: 4px 9px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 120ms ease;
    }
    .deck-count-pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .deck-timeline {
      display: flex;
      gap: 2px;
      height: 10px;
      align-items: stretch;
      margin-top: 13px;
    }
    .timeline-bar-seg {
      flex: 1;
      background: rgba(46, 39, 31, 0.09);
      border-radius: 3px;
      transition: background 120ms ease;
    }
    .timeline-bar-seg.active-step {
      background: var(--cv-ink, #2E271F);
    }
    .timeline-bar-seg.count-step {
      background: var(--cv-yellow, #F6D98B) !important;
    }
    .deck-lanes-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-top: 9px;
    }
    .deck-lane-row {
      display: flex;
      align-items: center;
      gap: 11px;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 12px;
      padding: 9px 12px;
      cursor: pointer;
      box-shadow: none;
      transition: box-shadow 150ms ease;
    }
    .deck-lane-row.is-armed {
      box-shadow: inset 0 0 0 2px rgba(46, 39, 31, 0.28);
    }
    .deck-lane-row.is-recording-lane {
      box-shadow: inset 0 0 0 2px #F2735F;
    }
    .deck-lane-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .deck-lane-name {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      width: 128px;
      flex-shrink: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .deck-hit-bars-track {
      flex: 1;
      min-width: 0;
      display: flex;
      gap: 2px;
      height: 24px;
      align-items: flex-end;
    }
    .deck-hit-slot {
      flex: 1;
      min-width: 0;
      border-radius: 2px;
    }
    .deck-hit-slot.empty {
      height: 3px !important;
      background: rgba(46, 39, 31, 0.13) !important;
    }
    .deck-lane-status {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      flex-shrink: 0;
      width: 50px;
      text-align: right;
    }
    .deck-lane-quant-pills {
      display: flex;
      gap: 3px;
      flex-shrink: 0;
    }
    .deck-quant-pill {
      padding: 5px 8px;
      border-radius: 8px;
      font-size: 10.5px;
      font-weight: 800;
      cursor: pointer;
      border: none;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink-muted, #6B5F50);
      transition: all 120ms ease;
      font-family: inherit;
    }
    .deck-quant-pill.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }
    .deck-mute-btn {
      display: none;
    }

    /* Take Review Drawer */
    .take-review-card {
      background: var(--cv-cream, #FBF3E6);
      border-radius: 16px;
      padding: 13px 15px 14px;
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      display: flex;
      flex-direction: column;
      gap: 10px;
      animation: cvfv-sheet-up 180ms var(--cv-ease);
    }
    .take-review-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .take-review-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }
    .take-review-actions {
      display: flex;
      gap: 7px;
    }
    .take-btn-try-again {
      border: none;
      font-family: inherit;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink, #2E271F);
      border-radius: 100px;
      padding: 8px 15px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }
    .take-btn-keep {
      border: none;
      font-family: inherit;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border-radius: 100px;
      padding: 8px 15px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }
    .take-note {
      font-size: 11.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
    }

    /* Bounce Bar */
    .bounce-row {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border-radius: 14px;
      padding: 10px 14px;
      margin-top: 4px;
    }
    .bounce-meta {
      flex: 1;
      min-width: 0;
    }
    .bounce-title {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-cream, #FBF3E6);
    }
    .bounce-filename {
      font-family: 'Space Mono', monospace;
      font-size: 10.5px;
      color: rgba(251, 243, 230, 0.6);
      margin-top: 2px;
    }
    .bounce-btn {
      border: none;
      font-family: inherit;
      padding: 6px 12px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      background: var(--cv-yellow, #F6D98B);
      color: #2E271F;
      transition: opacity 120ms ease;
    }
    .bounce-btn.sec {
      background: rgba(251, 243, 230, 0.14);
      color: rgba(251, 243, 230, 0.85);
    }
  `;

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('playing')) {
      if (!this.playing) {
        this.snapProgress = true;
      } else {
        this.snapProgress = true;
        requestAnimationFrame(() => {
          this.snapProgress = false;
          this.requestUpdate();
        });
      }
    }
    if (changedProperties.has('progressStep')) {
      this.lastTickAt = Date.now();
      if (this.recording) {
        this.stepsRecorded++;
        const loopBars = this.progression?.chords?.length || 4;
        if (this.stepsRecorded >= loopBars) {
          this.recording = false;
          this.takeOffered = {
            laneId: this.armedLane,
            hits: [...this.takeHits],
          };
          this.dispatchEvent(new CustomEvent('toast', {
            detail: `Captured take with ${this.takeHits.length} chords`,
            bubbles: true,
            composed: true,
          }));
        }
      }
      const prev = changedProperties.get('progressStep') as number;
      if (this.progressStep === 0 && prev !== undefined && prev > 0) {
        this.snapProgress = true;
        requestAnimationFrame(() => {
          this.snapProgress = false;
          this.requestUpdate();
        });
      }
    }
    if (changedProperties.has('progression') || changedProperties.has('instrument')) {
      this.syncSubLaneHits();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.isMobile = typeof window !== 'undefined' ? window.innerWidth < 900 : false;
    this.refreshSavedSets();
    this.syncSubLaneHits();
    window.addEventListener('resize', this.onResizeHandler);
    window.addEventListener('keydown', this.onKeyHandler);
    window.addEventListener('keyup', this.onKeyUpHandler);
    this.unsubscribeProjects = projectStorage.subscribeProjects(() => {
      this.refreshSavedSets();
    });
    this.placeholderTimer = setInterval(() => {
      this.vibePlaceholderIdx = (this.vibePlaceholderIdx + 1) % this.vibeExamples.length;
    }, 3200);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.onResizeHandler);
    window.removeEventListener('keydown', this.onKeyHandler);
    window.removeEventListener('keyup', this.onKeyUpHandler);
    this.cancelCountIn();
    if (this.placeholderTimer) clearInterval(this.placeholderTimer);
    if (this.previewTimer) clearTimeout(this.previewTimer);
    if (this.unsubscribeProjects) this.unsubscribeProjects();
  }

  private refreshSavedSets() {
    this.savedSets = projectStorage.getProjects();
    this.requestUpdate();
  }

  private syncSubLaneHits() {
    const chords = this.progression?.chords || [];
    const len = chords.length || 4;
    const subHits: LoopLaneHit[] = chords.map((chord, i) => ({
      pos: Math.round((i / len) * 100) / 100,
      vel: 104,
      bar: i,
      voicing: 'sub root',
    }));
    this.lanes = this.lanes.map(l => {
      if (l.id === 'l2') {
        return { ...l, hits: subHits };
      }
      if (l.id === 'l1') {
        return { ...l, name: `${this.instrument || 'Rhodes'} · chords` };
      }
      return l;
    });
  }

  private togglePerform(on: boolean) {
    this.performMode = on;
    this.isInspectorOpen = false;
    this.swapIndex = null;
    this.cancelCountIn();
    this.recording = false;
    this.takeOffered = null;
    this.padFlash = -1;
    const subLane = this.lanes.find(l => l.id === 'l2');
    playbackEngine.setSubBassEnabled(on && !subLane?.muted);
    this.requestUpdate();
  }

  public setCountIn(setting: 'Off' | '1 bar' | '2 bars') {
    this.countInSetting = setting;
    this.cancelCountIn();
    this.requestUpdate();
  }

  private startCountIn() {
    this.cancelCountIn();
    const bars = this.countInSetting === '2 bars' ? 2 : 1;
    const totalBeats = bars * 4;
    this.countInTotalBeats = totalBeats;
    this.countInBeat = 1;
    this.isCountingIn = true;
    this.recording = false;
    this.takeOffered = null;
    this.takeHits = [];

    const bpm = this.progression?.bpm || 84;
    const beatDurationMs = Math.round(60000 / bpm);

    playMetronomeClick(true);
    this.requestUpdate();

    this.countInInterval = setInterval(() => {
      if (!this.isCountingIn) {
        if (this.countInInterval) clearInterval(this.countInInterval);
        return;
      }
      this.countInBeat++;
      if (this.countInBeat <= this.countInTotalBeats) {
        const isAccent = (this.countInBeat - 1) % 4 === 0;
        playMetronomeClick(isAccent);
        this.requestUpdate();
      } else {
        if (this.countInInterval) clearInterval(this.countInInterval);
        this.countInInterval = null;
        this.isCountingIn = false;
        playMetronomeClick(true);
        this.startActualRecording();
      }
    }, beatDurationMs);
  }

  private cancelCountIn() {
    if (this.countInInterval) {
      clearInterval(this.countInInterval);
      this.countInInterval = null;
    }
    this.isCountingIn = false;
    this.countInBeat = 0;
  }

  private startActualRecording() {
    this.recording = true;
    this.takeHits = [];
    this.takeOffered = null;
    this.recStartStep = this.progressStep;
    this.stepsRecorded = 0;
    if (!this.playing) {
      playbackEngine.startAutoplay();
    }
    this.requestUpdate();
  }

  private armLane(id: string) {
    this.armedLane = id;
    this.requestUpdate();
  }

  private setLaneQuantise(id: string, q: 'Off' | '1/16' | '1/8' | 'Bar') {
    const loopBars = this.progression?.chords?.length || 4;
    this.lanes = this.lanes.map(l => {
      if (l.id === id) {
        const hits = l.kept && l.hits.length ? quantiseHits(l.hits, q, loopBars) : l.hits;
        return { ...l, quantise: q, hits };
      }
      return l;
    });
    this.requestUpdate();
  }

  private toggleLaneMute(id: string) {
    this.lanes = this.lanes.map(l => {
      if (l.id === id) {
        const muted = !l.muted;
        if (id === 'l2') {
          playbackEngine.setSubBassEnabled(this.performMode && !muted);
        }
        return { ...l, muted };
      }
      return l;
    });
    this.requestUpdate();
  }

  private toggleRecord() {
    if (this.recording) {
      this.recording = false;
      if (this.takeHits.length > 0) {
        this.takeOffered = { laneId: this.armedLane, hits: [...this.takeHits] };
      }
      this.requestUpdate();
      return;
    }
    if (this.isCountingIn) {
      this.cancelCountIn();
      this.requestUpdate();
      return;
    }
    if (this.countInSetting === 'Off') {
      this.startActualRecording();
    } else {
      this.startCountIn();
    }
  }

  private keepTake() {
    if (!this.takeOffered) return;
    const { laneId, hits } = this.takeOffered;
    const loopBars = this.progression?.chords?.length || 4;
    this.lanes = this.lanes.map(l => {
      if (l.id === laneId) {
        const quantized = quantiseHits(hits, l.quantise, loopBars);
        return { ...l, kept: true, hits: quantized };
      }
      return l;
    });
    const targetLane = this.lanes.find(l => l.id === laneId);
    this.dispatchEvent(new CustomEvent('toast', {
      detail: `Take saved to ${targetLane?.name || 'lane'}`,
      bubbles: true,
      composed: true,
    }));
    this.takeOffered = null;
    this.takeHits = [];
    this.requestUpdate();
  }

  private discardTake() {
    this.takeOffered = null;
    this.takeHits = [];
    this.requestUpdate();
  }

  private getInstrumentId(): any {
    const found = USER_INSTRUMENTS.find(i => i.name.toLowerCase() === (this.instrument || '').toLowerCase());
    return found?.instrument ?? 'rhodes';
  }

  private onPadDown(idx: number, e?: MouseEvent | TouchEvent) {
    const chords = this.progression?.chords || [];
    if (idx < 0 || idx >= chords.length) return;
    const chord = chords[idx];
    let voicing = 'low, root position';

    if (e && e.currentTarget && typeof (e.currentTarget as HTMLElement).getBoundingClientRect === 'function') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const clientY = (e as TouchEvent).touches && (e as TouchEvent).touches.length > 0
        ? (e as TouchEvent).touches[0].clientY
        : (e as MouseEvent).clientY;
      if (typeof clientY === 'number') {
        const y = (clientY - rect.top) / (rect.height || 1);
        voicing = y < 0.34 ? 'up an octave' : (y < 0.67 ? '1st inversion' : 'low, root position');
      }
    }

    const vel = 88 + (idx % 3) * 8;
    this.padFlash = idx;
    this.lastPad = { idx, voicing, vel };

    let notes = Array.isArray(chord.notes) ? chord.notes : [];
    if (notes.length === 0 || !notes.every(n => typeof n === 'string' && n.trim().length > 0)) {
      const safeName = chord.name || 'CMAJ';
      const key = this.progression?.key || 'C';
      const scaleType = this.progression?.scaleType || 'MAJOR';
      notes = notesForSymbol(safeName, preferFlatSpelling(key, scaleType));
    }

    startChordNotes(notes, voicing, vel, this.getInstrumentId());

    if (this.recording) {
      const loopLen = this.progression?.chords?.length || 4;
      const frac = Math.min(0.96, Math.max(0, (Date.now() - this.lastTickAt) / AUTOPLAY_INTERVAL_MS));
      const pos = Math.min(0.99, Math.max(0, (this.progressStep + frac) / loopLen));
      this.takeHits = [...this.takeHits, { pos, vel, bar: idx, voicing }];
    }
    this.requestUpdate();
  }

  private onPadUp(idx: number) {
    stopChordNotes();
    setTimeout(() => {
      if (this.padFlash === idx) {
        this.padFlash = -1;
        this.requestUpdate();
      }
    }, 120);
  }

  private onKeyHandler = (e: KeyboardEvent) => {
    if (!this.performMode || this.activeView !== 'loop') return;
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

    if (e.key === ' ' && !e.repeat) {
      e.preventDefault();
      playbackEngine.togglePlay();
      return;
    }
    if ((e.key === 'r' || e.key === 'R') && !e.repeat) {
      e.preventDefault();
      this.toggleRecord();
      return;
    }
    const n = parseInt(e.key, 10);
    const loopLen = this.progression?.chords?.length || 4;
    if (n >= 1 && n <= loopLen && !e.repeat) {
      e.preventDefault();
      this.onPadDown(n - 1);
    }
  };

  private onKeyUpHandler = (e: KeyboardEvent) => {
    if (!this.performMode || this.activeView !== 'loop') return;
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
    const n = parseInt(e.key, 10);
    const loopLen = this.progression?.chords?.length || 4;
    if (n >= 1 && n <= loopLen) {
      e.preventDefault();
      this.onPadUp(n - 1);
    }
  };

  private async onBounce(format: 'wav' | 'midi') {
    if (!this.progression) return;
    try {
      this.dispatchEvent(new CustomEvent('toast', {
        detail: `Exporting loop as ${format.toUpperCase()}...`,
        bubbles: true,
        composed: true,
      }));
      await bounceLoop({
        progression: this.progression,
        setName: this.progression.mood,
        instrumentName: this.instrument,
        playStyleName: this.playStyle,
        format,
      });
      this.dispatchEvent(new CustomEvent('toast', {
        detail: `Loop exported successfully (${format.toUpperCase()})`,
        bubbles: true,
        composed: true,
      }));
    } catch (e) {
      console.error('Bounce export failed:', e);
      this.dispatchEvent(new CustomEvent('toast', {
        detail: 'Export failed, please try again',
        bubbles: true,
        composed: true,
      }));
    }
  }

  private renderHitBars(hits: LoopLaneHit[], color: string) {
    const slots = 16;
    const bars = [];
    for (let s = 0; s < slots; s++) {
      const slotHits = (hits || []).filter(x => x.pos >= s / slots && x.pos < (s + 1) / slots);
      const h = slotHits[0];
      if (h) {
        const height = Math.round(9 + ((h.vel || 100) / 127) * 15);
        bars.push(html`<div class="deck-hit-slot" style="height: ${height}px; background: ${color};"></div>`);
      } else {
        bars.push(html`<div class="deck-hit-slot empty" style="height: 3px; background: rgba(46, 39, 31, 0.13);"></div>`);
      }
    }
    return bars;
  }

  private renderLoopDeck(loopBars: number) {
    const armedLaneObj = this.lanes.find(l => l.id === this.armedLane);
    const armedName = armedLaneObj ? armedLaneObj.name.split(' · ')[0] : 'a lane';
    const targetLane = this.takeOffered ? this.lanes.find(l => l.id === this.takeOffered!.laneId) : null;

    return html`
      <div class="loop-deck">
        <div class="deck-top-row">
          <button
            class="rec-btn ${this.recording ? 'is-recording' : ''} ${this.isCountingIn ? 'is-counting-in' : ''}"
            @click=${() => this.toggleRecord()}
            aria-label="${this.recording ? 'Stop recording' : (this.isCountingIn ? 'Cancel count-in' : `Record into ${armedName}`)}"
          >
            ${this.isCountingIn ? html`
              <div class="count-in-number">${this.countInBeat}</div>
            ` : html`
              <div class="rec-glyph"></div>
            `}
          </button>
          <div class="deck-meta-col">
            <div class="deck-rec-title">
              ${this.isCountingIn
                ? `Counting in... ${this.countInBeat}`
                : (this.recording ? `Recording into ${armedName}` : `Record into ${armedName}`)}
            </div>
            <div class="deck-rec-sub">
              ${this.isCountingIn
                ? 'Get ready — recording starts on downbeat'
                : (this.recording ? `Play the pads — stops itself after ${loopBars} bars` : 'Tap a lane to arm it, R to record. Other lanes keep playing.')}
            </div>
          </div>
          <div class="deck-count-in-wrap">
            <span class="deck-count-in-label">Count-in</span>
            <div class="deck-count-in-pills">
              ${(['Off', '1 bar', '2 bars'] as const).map(opt => html`
                <button
                  class="deck-count-pill ${this.countInSetting === opt ? 'active' : ''}"
                  @click=${() => this.setCountIn(opt)}
                >${opt}</button>
              `)}
            </div>
          </div>
        </div>

        <div class="deck-timeline">
          ${Array.from({ length: loopBars }, (_, i) => html`
            <div class="timeline-bar-seg ${this.isCountingIn ? (i === 0 ? 'count-step' : '') : (this.playing && this.progressStep === i ? 'active-step' : '')}"></div>
          `)}
        </div>

        <div class="deck-lanes-list">
          ${this.lanes.map(l => {
            const isArmed = l.id === this.armedLane;
            const liveHits = isArmed && this.recording ? this.takeHits : l.hits;
            const status = isArmed && this.recording ? 'Writing' : (l.kept && l.hits.length ? 'Kept' : (isArmed ? 'Armed' : 'Empty'));
            return html`
              <div
                class="deck-lane-row ${isArmed ? 'is-armed' : ''} ${isArmed && this.recording ? 'is-recording-lane' : ''}"
                @click=${() => this.armLane(l.id)}
              >
                <div class="deck-lane-dot" style="background: ${l.color};"></div>
                <div class="deck-lane-name">${l.name}</div>
                <div class="deck-hit-bars-track">
                  ${this.renderHitBars(liveHits, l.color)}
                </div>
                <div class="deck-lane-status" style="color: ${isArmed && this.recording ? '#F2735F' : 'var(--cv-ink-muted)'};">
                  ${status}
                </div>
                <div class="deck-lane-quant-pills" @click=${(e: Event) => e.stopPropagation()}>
                  ${(['Off', '1/16', '1/8', 'Bar'] as const).map(q => html`
                    <button
                      class="deck-quant-pill ${l.quantise === q ? 'active' : ''}"
                      @click=${() => this.setLaneQuantise(l.id, q)}
                    >${q}</button>
                  `)}
                </div>
                <button
                  class="deck-mute-btn ${l.muted ? 'muted' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this.toggleLaneMute(l.id); }}
                  aria-label="${l.muted ? 'Unmute' : 'Mute'} lane"
                >${l.muted ? 'Muted' : 'Mute'}</button>
              </div>
            `;
          })}
        </div>

        ${this.takeOffered ? html`
          <div class="take-review-card">
            <div class="take-review-header">
              <div class="take-review-title">${this.takeOffered.hits.length} chords played — keep this take?</div>
              <div class="take-review-actions">
                <button class="take-btn-try-again" @click=${() => this.discardTake()}>Try again</button>
                <button class="take-btn-keep" @click=${() => this.keepTake()}>Keep take</button>
              </div>
            </div>
            <div class="deck-hit-bars-track" style="height: 28px;">
              ${this.renderHitBars(this.takeOffered.hits, '#F2735F')}
            </div>
            <div class="take-note">
              ${targetLane && targetLane.quantise === 'Off'
                ? 'Quantise is Off, so this is your timing exactly. The raw take is kept either way.'
                : 'Snapped to this lane\u2019s grid. The raw timing is kept, so you can change it after.'}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderStageTitle(moodColor: string) {
    if (this.progression?.searchTerm) {
      const raw = this.progression.searchTerm.trim();
      const cleaned = raw.endsWith('.') ? raw.slice(0, -1) : raw;
      const words = cleaned.split(/\s+/);
      if (words.length === 1) {
        return html`<span style="color: ${moodColor}">${words[0]}.</span>`;
      }
      const leading = words.slice(0, -1).join(' ');
      const lastWord = words[words.length - 1];
      return html`${leading} <span style="color: ${moodColor}">${lastWord}.</span>`;
    }
    return html`${this.progression?.genre || 'Pop'}, <span style="color: ${moodColor}">${(this.progression?.mood || 'Warm').toLowerCase()}.</span>`;
  }

  private onVibeSubmit(e: Event) {
    e.preventDefault();
    if (this.isGenerating || !this.freeText.trim()) return;
    this.dispatchEvent(new CustomEvent('freetext-generate', {
      detail: { promptText: this.freeText.trim() },
      bubbles: true,
      composed: true,
    }));
  }

  private onGenreClick(genre: string) {
    this.dispatchEvent(new CustomEvent('set-genre', { detail: genre, bubbles: true, composed: true }));
  }

  private onMoodClick(mood: string) {
    this.dispatchEvent(new CustomEvent('set-mood', { detail: mood, bubbles: true, composed: true }));
  }

  private onBandClick(bandName: string) {
    this.selectedBand = this.selectedBand === bandName ? null : bandName;
    const band = BANDS.find(b => b.name === this.selectedBand);
    if (band) {
      this.dispatchEvent(new CustomEvent('toast', { detail: `Active artist DNA: ${band.name}`, bubbles: true, composed: true }));
    }
    this.requestUpdate();
  }

  private onChordSelect(index: number) {
    this.previewIndex = index;
    if (this.previewTimer) clearTimeout(this.previewTimer);
    this.previewTimer = setTimeout(() => { this.previewIndex = -1; }, 500);

    this.swapIndex = index;
    this.isInspectorOpen = true;
    this.abPick = null;
    this.abSide = 'before';
    this.abPlaying = false;
    playbackEngine.setABOverride(null);

    this.isMobile = typeof window !== 'undefined' ? window.innerWidth < 900 : false;
    if (this.isMobile) {
      this.mobileSheetOpen = true;
    }

    if (this.progression) {
      playbackEngine.playChordAtIndex(index, 0.8);
    }
    this.requestUpdate();
  }

  private setABSide(side: 'before' | 'after') {
    this.abSide = side;
    if (this.swapIndex !== null && this.progression) {
      if (side === 'before') {
        playbackEngine.setABOverride({
          index: this.swapIndex,
          side: 'before',
          chord: this.progression.chords[this.swapIndex],
        });
        playbackEngine.playChordAtIndex(this.swapIndex, 0.8);
      } else if (this.abPick) {
        const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);
        const candidateNotes = notesForSymbol(this.abPick.chord, preferFlat);
        const pickedChord: ChordBlock = {
          ...this.progression.chords[this.swapIndex],
          name: this.abPick.chord,
          roman: this.abPick.roman,
          tension: this.abPick.tension,
          notes: candidateNotes,
        };
        playbackEngine.setABOverride({
          index: this.swapIndex,
          side: 'after',
          chord: pickedChord,
        });
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
      const candidateNotes = notesForSymbol(this.abPick.chord, preferFlat);
      const pickedChord: ChordBlock = {
        ...this.progression.chords[index],
        name: this.abPick.chord,
        roman: this.abPick.roman,
        tension: this.abPick.tension,
        notes: candidateNotes,
      };
      playbackEngine.auditionChord(pickedChord, 0.8);
    } else {
      playbackEngine.playChordAtIndex(index, 0.8);
    }
  }

  private toggleAB() {
    if (!this.progression) return;
    this.abPlaying = !this.abPlaying;
    if (this.abPlaying) {
      if (this.swapIndex !== null) {
        const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);
        const candidateNotes = (this.abSide === 'after' && this.abPick)
          ? notesForSymbol(this.abPick.chord, preferFlat)
          : (this.progression.chords[this.swapIndex]?.notes || []);
        const chordOverride: ChordBlock = (this.abSide === 'after' && this.abPick) ? {
          ...this.progression.chords[this.swapIndex],
          name: this.abPick.chord,
          roman: this.abPick.roman,
          tension: this.abPick.tension,
          notes: candidateNotes,
        } : this.progression.chords[this.swapIndex];
        playbackEngine.setABOverride({
          index: this.swapIndex,
          side: this.abSide,
          chord: chordOverride,
        });
      }
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
  }

  private onAltAudition(alt: Alternative | { name: string; chord: ChordBlock; sub?: string; functionCaption?: string }) {
    const chordBlock = 'chord' in alt ? alt.chord : alt;
    const preferFlat = this.progression ? preferFlatSpelling(this.progression.key, this.progression.scaleType) : false;
    const chordNotes = (chordBlock.notes && chordBlock.notes.length > 0)
      ? chordBlock.notes
      : notesForSymbol(chordBlock.name, preferFlat);

    this.abPick = {
      label: 'label' in alt ? alt.label : alt.name,
      tension: chordBlock.tension || 0.5,
      chord: chordBlock.name,
      roman: chordBlock.roman || '',
      fn: 'functionCaption' in alt && alt.functionCaption ? alt.functionCaption : 'Swapped chord',
    };
    this.abSide = 'after';
    if (this.swapIndex !== null && this.progression) {
      playbackEngine.setABOverride({
        index: this.swapIndex,
        side: 'after',
        chord: {
          ...this.progression.chords[this.swapIndex],
          name: this.abPick.chord,
          roman: this.abPick.roman,
          tension: this.abPick.tension,
          notes: chordNotes,
        },
      });
    }
    playbackEngine.auditionChord({ ...chordBlock, notes: chordNotes }, 0.8);
    this.requestUpdate();
  }

  private onConfirmSwap() {
    if (!this.abPick || this.swapIndex === null || !this.progression) return;
    const oldChords = this.progression.chords;
    const newChords = [...oldChords];
    const original = oldChords[this.swapIndex];
    const preferFlat = preferFlatSpelling(this.progression.key, this.progression.scaleType);

    newChords[this.swapIndex] = {
      ...original,
      name: this.abPick.chord,
      roman: this.abPick.roman || original.roman,
      tension: this.abPick.tension,
      notes: notesForSymbol(this.abPick.chord, preferFlat),
    };

    const swappedName = this.abPick.chord;
    this.progression = {
      ...this.progression,
      chords: newChords,
    };
    playbackEngine.setProgression(this.progression, this.order);
    playbackEngine.setABOverride(null);
    this.isInspectorOpen = false;
    this.mobileSheetOpen = false;
    this.swapIndex = null;
    this.abPick = null;
    this.abPlaying = false;
    this.dispatchEvent(new CustomEvent('progression-change', { detail: this.progression, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', { detail: `Swapped in ${swappedName}`, bubbles: true, composed: true }));
    this.requestUpdate();
  }

  private onStepLength(delta: number) {
    if (!this.progression) return;
    const nextLen = Math.max(MIN_PROGRESSION_LENGTH, Math.min(MAX_PROGRESSION_LENGTH, this.progression.chords.length + delta));
    this.dispatchEvent(new CustomEvent('set-length', { detail: nextLen, bubbles: true, composed: true }));
  }

  private onReroll() {
    this.dispatchEvent(new CustomEvent('reroll', { bubbles: true, composed: true }));
  }

  private onBookmark() {
    if (!this.progression) return;
    this.dispatchEvent(new CustomEvent('save-set', {
      detail: `${this.progression.genre} · ${this.progression.mood}`,
      bubbles: true,
      composed: true,
    }));
  }

  private toggleLibrary(open?: boolean) {
    this.libraryOpen = open !== undefined ? open : !this.libraryOpen;
    this.librarySelectMode = false;
    this.librarySelected = [];
    this.renamingId = null;
    this.confirmDeleteId = null;
    this.dispatchEvent(new CustomEvent('library-open-change', {
      detail: this.libraryOpen,
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  private startRename(e: Event, id: string, name: string) {
    e.stopPropagation();
    this.renamingId = id;
    this.draftName = name;
    this.confirmDeleteId = null;
  }

  private onDraftChange(e: Event) {
    this.draftName = (e.target as HTMLInputElement).value;
  }

  private commitRename(id: string) {
    const trimmed = this.draftName.trim();
    if (!trimmed) {
      this.cancelRename();
      return;
    }
    const projects = projectStorage.getProjects();
    const existing = projects.find(p => p.id === id);
    if (existing) {
      const updated: ProjectData = {
        ...existing,
        name: trimmed,
        lastModified: Date.now(),
      };
      projectStorage.saveProject(updated);
      this.refreshSavedSets();
      this.dispatchEvent(new CustomEvent('toast', {
        detail: `Renamed to "${trimmed}"`,
        bubbles: true,
        composed: true,
      }));
    }
    this.renamingId = null;
    this.draftName = '';
  }

  private cancelRename() {
    this.renamingId = null;
    this.draftName = '';
  }

  private askDelete(e: Event, id: string) {
    e.stopPropagation();
    this.confirmDeleteId = id;
    this.renamingId = null;
  }

  private confirmDelete(id: string) {
    projectStorage.deleteProject(id);
    this.confirmDeleteId = null;
    this.refreshSavedSets();
    this.dispatchEvent(new CustomEvent('toast', {
      detail: 'Deleted loop from library',
      bubbles: true,
      composed: true,
    }));
  }

  private cancelDelete() {
    this.confirmDeleteId = null;
  }

  private onLoadSavedProject(p: ProjectData) {
    this.dispatchEvent(new CustomEvent('load-project', {
      detail: p,
      bubbles: true,
      composed: true,
    }));
    this.toggleLibrary(false);
    this.dispatchEvent(new CustomEvent('toast', {
      detail: `Loaded "${p.name}"`,
      bubbles: true,
      composed: true,
    }));
  }

  private renderLibraryPopoverContent(moodColor: string) {
    const libQ = this.librarySearch.trim().toLowerCase();
    const allSaved = this.savedSets;
    const libVisible = allSaved.filter(s => {
      if (!libQ) return true;
      const searchable = `${s.name} ${s.genre} ${s.mood} ${(s.chords || []).map(c => typeof c === 'object' ? c.name : c).join(' ')}`.toLowerCase();
      return searchable.indexOf(libQ) >= 0;
    });
    const hasMany = allSaved.length > 2;
    const selectMode = this.librarySelectMode;
    const selected = this.librarySelected;
    const toggleLabel = allSaved.length ? `Your loops · ${allSaved.length}` : 'Your loops';

    if (allSaved.length === 0) {
      return html`<div class="lib-empty-text">Nothing kept yet. Use the bookmark to keep a loop here.</div>`;
    }

    return html`
      <div class="lib-pop-header">
        <div class="lib-pop-title">${toggleLabel}</div>
        <button class="lib-pop-select-btn" style="background: ${selectMode ? moodColor : 'transparent'};" @click=${() => { this.librarySelectMode = !this.librarySelectMode; this.librarySelected = []; this.confirmDeleteId = null; this.renamingId = null; }}>${selectMode ? 'Done' : 'Select'}</button>
      </div>
      ${hasMany ? html`
        <div style="padding: 0 4px 9px;">
          <input type="text" class="lib-pop-search" placeholder="Search loops" .value=${this.librarySearch} @input=${(e: Event) => { this.librarySearch = (e.target as HTMLInputElement).value; }} />
        </div>
      ` : ''}
      <div class="lib-rows">
        ${libVisible.map(p => {
          const isRenaming = this.renamingId === p.id;
          const isConfirming = this.confirmDeleteId === p.id;
          const checked = selected.indexOf(p.id) >= 0;
          const chordsList = p.chords || [];
          const cardMoodColor = getMoodColor(p.mood || 'Warm');

          return html`
            <div class="lib-row ${checked ? 'checked' : ''}" @click=${() => selectMode ? this.toggleLibrarySelected(p.id) : this.onLoadSavedProject(p)}>
              ${selectMode ? html`
                <div class="lib-check ${checked ? 'checked' : ''}" style="background: ${checked ? moodColor : 'transparent'};" @click=${(e: Event) => { e.stopPropagation(); this.toggleLibrarySelected(p.id); }}>${checked ? '✓' : ''}</div>
              ` : ''}
              <div class="lib-row-info" style="cursor: pointer;">
                ${isRenaming ? html`
                  <input
                    type="text"
                    class="lib-rename-input"
                    .value=${this.draftName}
                    @input=${this.onDraftChange}
                    @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this.commitRename(p.id); if (e.key === 'Escape') this.cancelRename(); }}
                    @blur=${() => this.commitRename(p.id)}
                    @click=${(e: Event) => e.stopPropagation()}
                    autofocus
                  />
                ` : html`
                  <div>
                    <span class="lib-row-name-line">
                      <span class="lib-row-dots">
                        ${chordsList.map((c, i) => {
                          const tension = typeof c === 'object' && c !== null ? (c.tension ?? 0.1) : 0.1;
                          const role = roleForTension(tension);
                          const d = 7;
                          const radius = i % 2 ? '2px' : '50%';
                          return html`<span style="width:${d}px;height:${d}px;border-radius:${radius};background:${cardMoodColor};"></span>`;
                        })}
                      </span>
                      <span class="lib-row-name">${p.name || 'Untitled Loop'}</span>
                    </span>
                    <span class="lib-row-meta">${p.genre || 'Pop'} · ${p.mood || 'Warm'}</span>
                  </div>
                `}
              </div>
              ${!selectMode && !isConfirming && !isRenaming ? html`
                <div class="lib-row-actions">
                  <button class="lib-icon-btn" @click=${(e: Event) => { e.stopPropagation(); this.startRename(e, p.id, p.name || 'Untitled Loop'); }} aria-label="Rename loop">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
                  </button>
                  <button class="lib-icon-btn" @click=${(e: Event) => { e.stopPropagation(); this.askDelete(e, p.id); }} aria-label="Delete loop">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>
                  </button>
                </div>
              ` : ''}
              ${isConfirming ? html`
                <div class="lib-confirm-actions">
                  <button class="lib-confirm-delete-btn" @click=${(e: Event) => { e.stopPropagation(); this.confirmDelete(p.id); }}>Delete</button>
                  <button class="lib-icon-btn" @click=${(e: Event) => { e.stopPropagation(); this.cancelDelete(); }} aria-label="Cancel">×</button>
                </div>
              ` : ''}
            </div>
          `;
        })}
      </div>
      ${allSaved.length > 0 && libVisible.length === 0 ? html`
        <div class="lib-no-match">No loops match that.</div>
      ` : ''}
      ${selectMode ? html`
        <button class="lib-batch-delete-btn" style="background: ${selected.length ? '#D8624C' : 'var(--cv-surface)'}; color: ${selected.length ? '#FBF3E6' : 'rgba(46,39,31,0.35)'}; cursor: ${selected.length ? 'pointer' : 'default'};" @click=${() => this.deleteLibrarySelected()}>Delete ${selected.length} loop${selected.length === 1 ? '' : 's'}</button>
      ` : ''}
    `;
  }

  private toggleLibrarySelected(id: string) {
    const idx = this.librarySelected.indexOf(id);
    if (idx >= 0) {
      this.librarySelected = this.librarySelected.filter(x => x !== id);
    } else {
      this.librarySelected = [...this.librarySelected, id];
    }
  }

  private deleteLibrarySelected() {
    if (this.librarySelected.length === 0) return;
    const toDelete = new Set(this.librarySelected);
    for (const id of toDelete) {
      projectStorage.deleteProject(id);
    }
    this.refreshSavedSets();
    this.librarySelected = [];
    this.librarySelectMode = false;
  }

  private renderLoopsDrawer(moodColor: string) {
    // The library is now rendered inline as a popover in the sidebar footer (desktop)
    // and inside the mobile toolbar area (mobile). This method is kept for the
    // global floating render call but is now a no-op since the popover is rendered
    // inside the sidebar-footer and mobile-toolbar containers directly.
    return '';
  }

  private parseChord(name: string) {
    const m = /^([A-G][b#]?)(.*)$/.exec(name || 'C');
    const root = m ? m[1] : 'C';
    const q = m ? m[2] : '';
    const intervals = QUAL[q] || QUAL[QFALL[q] || 'maj'] || [0, 4, 7];
    return { root, rootPc: PC[root] === undefined ? 0 : PC[root], q, intervals };
  }

  private renderPianoCard(ch: ChordBlock, i: number) {
    const c = this.parseChord(ch.name);
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

    c.intervals.forEach(iv => {
      const semi = c.rootPc + iv;
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
    const notesLine = c.intervals.map(iv => {
      const nm = PC_NAMES[(c.rootPc + iv) % 12];
      return this.showDegrees ? `${nm} (${DEG[iv % 12]})` : nm;
    }).join(' · ');

    return html`
      <div class="play-card" @click=${() => playbackEngine.playChordAtIndex(i, 0.8)} role="button" tabindex="0">
        <div style="display: flex; align-items: baseline; gap: 9px;">
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

  private renderFretCard(ch: ChordBlock, i: number, instrument: 'Guitar' | 'Ukulele') {
    const c = this.parseChord(ch.name);
    const GUITAR_OPEN = [4, 9, 2, 7, 11, 4];
    const UKE_OPEN = [7, 0, 4, 9];
    const isUke = instrument === 'Ukulele';
    const openPcs = isUke ? UKE_OPEN : GUITAR_OPEN;
    const frets = isUke ? ukeVoicing(c) || [null, null, null, null] : guitarVoicing(c) || [null, null, null, null, null, null];

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
      const iv = ((openPcs[s] + f - c.rootPc) % 12 + 12) % 12;
      dots.push({
        cx: x,
        cy: TOP + (f - base - 0.5) * FR,
        fill: iv === 0 ? '#F2735F' : '#2E271F',
        label: this.showDegrees ? DEG[((openPcs[s] + f - c.rootPc) % 12 + 12) % 12] : '',
      });
    });
    const w = (n - 1) * SP;
    const sw = (n - 1) * SP + 26;
    const sh = TOP + ROWS * FR + 12;
    const posLabel = base > 0 ? `${base + 1}fr` : '';
    const showPos = base > 0;

    const notesLine = c.intervals.map(iv => {
      const nm = PC_NAMES[(c.rootPc + iv) % 12];
      return this.showDegrees ? `${nm} (${DEG[iv % 12]})` : nm;
    }).join(' · ');

    return html`
      <div class="play-card" @click=${() => playbackEngine.playChordAtIndex(i, 0.8)} role="button" tabindex="0">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 8px;">
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

  render() {
    const chords = this.progression?.chords || [];
    const moodColor = getMoodColor(this.progression?.mood || 'Warm');
    const activeBand = BANDS.find(b => b.name === this.selectedBand);
    const shownGenres = this.expandedGenre ? GENRE_ALL : GENRE_PRIMARY;

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
        ? 'never strays far — every chord sits in about the same harmonic neighborhood.'
        : isRising
        ? `tightens bar by bar, reaching peak tension on ${chords[peakIdx]?.name || 'the peak'}.`
        : `explores tension up to ${chords[peakIdx]?.name || 'the middle'} before resolving back down.`
    }`;

    // Theory groups & substitutions for the active chord
    let familyRows: { name: string; roman?: string; notes?: string[]; sub: string; chord: ChordBlock; tension: number }[] = [];
    let familyNote = '';
    const isMinor = this.progression?.scaleType?.includes('MINOR') ?? false;

    if (this.swapIndex !== null && this.progression && this.chordData.scales) {
      if (this.activeSwapFamily === 'Borrowed') {
        familyRows = generateBorrowedChords(this.chordData, this.progression, this.swapIndex);
        familyNote = this.showTheory
          ? `Modal interchange — four chords from the parallel ${isMinor ? 'major' : 'minor'}, each matched to the chord it can stand in for.`
          : `Four chords from the ${isMinor ? 'major' : 'minor'} version of this key. Each one swaps in for a chord you already have.`;
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

    return html`
      <!-- Top Band DNA Banner -->
      ${activeBand ? html`
        <div class="band-bar" style="background: ${activeBand.color}33;">
          <div class="band-bar-content">
            <span class="band-bar-kicker">Following Artist DNA</span>
            <span class="band-bar-name" style="font-family: ${activeBand.font}; font-weight: ${activeBand.weight || 800}; font-style: ${activeBand.italic ? 'italic' : 'normal'}; letter-spacing: ${activeBand.pillTrack};">
              ${activeBand.name}
            </span>
            <span class="band-bar-trick">— ${this.showTheory ? activeBand.theory : activeBand.plain}</span>
          </div>
          <button class="band-bar-close" @click=${() => this.onBandClick(activeBand.name)} aria-label="Dismiss band DNA">×</button>
        </div>
      ` : ''}

      ${!this.isMobile ? html`
        <!-- DESKTOP 3-COLUMN STUDIO LAYOUT -->
        <div class="studio-grid" style="--mood-color: ${moodColor};">

          <!-- 1. LEFT SIDEBAR -->
          <aside class="sidebar-left">
            <div class="sidebar-scroll">
              <div class="kicker-label">The Vibe</div>
              <form class="vibe-input-row ${this.isGenerating ? 'generating' : ''}" @submit=${this.onVibeSubmit}>
                <input
                  type="text"
                  class="vibe-text-input"
                  .value=${this.freeText}
                  @input=${(e: Event) => { this.freeText = (e.target as HTMLInputElement).value; }}
                  placeholder=${this.isGenerating ? 'Composing your chords...' : this.vibeExamples[this.vibePlaceholderIdx]}
                  ?disabled=${this.isGenerating}
                />
                <button
                  type="submit"
                  class="vibe-submit-btn ${this.isGenerating ? 'generating' : ''}"
                  style="background: ${moodColor};"
                  aria-label="${this.isGenerating ? 'Composing chords' : 'Generate loop from vibe'}"
                  ?disabled=${this.isGenerating || !this.freeText.trim()}
                >
                  ${this.isGenerating ? html`
                    <div class="vibe-spinner"></div>
                  ` : html`
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                  `}
                </button>
              </form>
              ${this.isGenerating ? html`
                <div class="vibe-generating-pill">
                  <span class="vibe-spinner"></span>
                  <span>Composing chords...</span>
                </div>
              ` : ''}

              <div class="kicker-label spaced">Genre</div>
              <div class="pills-group">
                ${shownGenres.map(g => html`
                  <button
                    class="pill ${this.progression?.genre === g ? 'active' : ''}"
                    @click=${() => this.onGenreClick(g)}
                  >${g}</button>
                `)}
                <button class="pill more-toggle" @click=${() => { this.expandedGenre = !this.expandedGenre; }}>
                  ${this.expandedGenre ? 'Show less ⌃' : '+more ⌄'}
                </button>
              </div>

              <div class="kicker-label spaced">Mood</div>
              <div class="pills-group">
                ${MOOD_PRIMARY.map(m => {
                  const mCol = getMoodColor(m);
                  return html`
                    <button
                      class="pill ${this.progression?.mood === m ? 'active' : ''}"
                      @click=${() => this.onMoodClick(m)}
                    >
                      <span class="mood-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${mCol}" stroke-width="2.2" stroke-linecap="round">
                          <path d="${MOOD_ICONS[m] || 'M12 4 a6.5 6.5 0 1 0 6.5 6.5'}"/>
                        </svg>
                      </span>
                      ${m}
                    </button>
                  `;
                })}
              </div>

              <div class="kicker-label spaced" style="display: flex; align-items: baseline; gap: 6px;">
                <span>Band</span>
                <span style="font-size: 10px; font-weight: 700; color: rgba(46, 39, 31, 0.4); text-transform: lowercase;">optional</span>
              </div>
              <div class="pills-group">
                ${BANDS.map(b => html`
                  <button
                    class="pill ${this.selectedBand === b.name ? 'active' : ''}"
                    style="font-family: ${b.font}; font-weight: ${b.weight || 800}; font-style: ${b.italic ? 'italic' : 'normal'}; letter-spacing: ${b.pillTrack};"
                    @click=${() => this.onBandClick(b.name)}
                  >${b.name}</button>
                `)}
              </div>
              ${activeBand ? html`
                <div class="band-trick-text">
                  ${this.showTheory ? activeBand.theory : activeBand.plain}
                </div>
              ` : ''}
            </div>

            <div class="sidebar-footer">
              <button class="library-toggle ${this.libraryOpen ? 'open' : ''}" @click=${() => this.toggleLibrary()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                <span style="flex: 1; min-width: 0; text-align: left;">${this.savedSets.length ? `Your loops · ${this.savedSets.length}` : 'Your loops'}</span>
                <span style="opacity: 0.55;">${this.libraryOpen ? '⌄' : '⌃'}</span>
              </button>
              ${this.libraryOpen ? html`
                <div class="library-popover">
                  ${this.renderLibraryPopoverContent(moodColor)}
                </div>
              ` : ''}
            </div>
          </aside>

          <!-- 2. CENTER STAGE -->
          <main class="stage-main">
            <div class="stage-header">
              <div class="stage-title-row">
                <div class="stage-title">${this.renderStageTitle(moodColor)}</div>
                <div class="stage-action-btns">
                  <button class="round-btn" @click=${this.onBookmark} aria-label="Bookmark loop">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                  </button>
                  <button class="round-btn ${this.soundOpen ? 'active' : ''}" @click=${() => { this.soundOpen = !this.soundOpen; }} aria-label="Sound settings">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  </button>
                  <button class="round-btn" @click=${() => { this.shareOpen = true; }} aria-label="Share loop">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
                  </button>
                </div>
              </div>

              <!-- VIEW TABS: Chords | Song | Play it -->
              <div class="view-tabs-bar">
                <button class="view-tab ${this.activeView === 'loop' ? 'active' : ''}" @click=${() => { this.activeView = 'loop'; }}>Chords</button>
                <button class="view-tab ${this.activeView === 'song' ? 'active' : ''}" @click=${() => { this.activeView = 'song'; }}>Song</button>
                <button class="view-tab ${this.activeView === 'play' ? 'active' : ''}" @click=${() => { this.activeView = 'play'; }}>Play it</button>
              </div>

              ${this.activeView === 'loop' ? html`
                <div class="mode-toggle-row">
                  <button
                    class="perform-mode-btn ${this.performMode ? 'exit' : ''}"
                    @click=${() => this.togglePerform(!this.performMode)}
                    aria-label="${this.performMode ? 'Exit perform' : 'Perform'}"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;">
                      <rect x="3" y="3" width="8" height="8" rx="2.4"/>
                      <rect x="13" y="3" width="8" height="8" rx="2.4"/>
                      <rect x="3" y="13" width="8" height="8" rx="2.4"/>
                      <rect x="13" y="13" width="8" height="8" rx="2.4"/>
                    </svg>
                    ${this.performMode ? 'Exit perform' : 'Perform'}
                  </button>
                  <div class="perform-hint">
                    ${this.performMode ? 'Press a pad — higher on the pad, higher the voicing. Keys 1–4 and R to record.' : 'Build the progression here, then Perform plays it in.'}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Canvas -->
            <div class="stage-canvas">
              ${this.activeView === 'loop' ? html`
                <div class="stage-panel">
                  <svg class="drift-shape a" width="128" height="128" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B"/></svg>
                  <svg class="drift-shape b" width="112" height="112" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC"/></svg>

                  ${this.performMode ? html`
                    <div class="pad-cells-row">
                      ${chords.map((chord, idx) => {
                        const r = roleForTension(chord.tension || 0.1);
                        const isHeld = this.padFlash === idx;
                        const isLit = this.playing && idx === this.progressStep;
                        const keyLabel = String(idx + 1);
                        const meta = isHeld && this.lastPad ? this.lastPad.voicing : (ROLE_PLAIN[chord.functionLabel] || chord.functionLabel || '');

                        return html`
                          <div
                            class="pad-cell ${isHeld ? 'pad-held' : ''} ${isLit ? 'pad-lit' : ''}"
                            style="background: ${r.color};"
                            @mousedown=${(e: MouseEvent) => this.onPadDown(idx, e)}
                            @mouseup=${() => this.onPadUp(idx)}
                            @touchstart=${(e: TouchEvent) => { e.preventDefault(); this.onPadDown(idx, e); }}
                            @touchend=${(e: TouchEvent) => { e.preventDefault(); this.onPadUp(idx); }}
                            tabindex="0"
                            role="button"
                            aria-label="Play ${chord.name}"
                          >
                            <div class="pad-key-label">${keyLabel}</div>
                            <div>
                              <div class="pad-name">${chord.name}</div>
                              <div class="pad-meta">${meta}</div>
                            </div>
                          </div>
                        `;
                      })}
                    </div>
                    <div class="perform-banner">
                      <span class="perform-banner-kicker">Playing now</span>
                      <span class="perform-banner-now">${this.lastPad ? chords[Math.min(this.lastPad.idx, chords.length - 1)]?.name : '—'}</span>
                      <span class="perform-banner-sub">${this.lastPad ? `${this.lastPad.voicing} · velocity ${this.lastPad.vel}` : 'Press a pad, or hit 1–4'}</span>
                    </div>
                  ` : html`
                    <div class="chords-flex-row">
                      ${chords.map((chord, idx) => {
                        const r = roleForTension(chord.tension || 0.1);
                        const isLit = this.playing && idx === this.progressStep;
                        const isInspected = this.isInspectorOpen && idx === this.swapIndex;
                        const isPreview = idx === this.previewIndex;
                        const size = Math.max(84, Math.min(130, r.size));
                        const radius = Math.round(r.radius * (size / r.size));

                        return html`
                          <div
                            class="chord-item-wrap"
                            @click=${() => this.onChordSelect(idx)}
                            tabindex="0"
                            role="button"
                            aria-label="${chord.name}, ${chord.functionLabel || 'Chord'}"
                          >
                            <div
                              class="chord-block-shape ${isLit ? 'active-pulse' : ''} ${isInspected ? 'selected-inspector' : ''}"
                              style="width: ${size}px; height: ${size}px; border-radius: ${radius}px; background: ${r.color}; transform: ${isPreview ? 'scale(0.94)' : 'none'};"
                            >
                              ${this.showTheory && chord.roman ? html`
                                <div class="roman-pill-badge">${chord.roman}</div>
                              ` : ''}
                              <div class="chord-title-text" style="font-size: ${Math.round(r.fontSize * 0.92)}px;">${chord.name}</div>
                            </div>
                            <div class="chord-role-label">${ROLE_PLAIN[chord.functionLabel] || chord.functionLabel || ''}</div>
                          </div>
                        `;
                      })}
                    </div>
                  `}
                </div>

                <div class="quick-chips-row">
                  <button
                    class="quick-chip-btn"
                    @click=${() => { this.soundOpen = !this.soundOpen; }}
                    aria-label="Change instrument"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                      <rect x="2.5" y="7" width="19" height="10" rx="2"/>
                      <path d="M8 7v10M13 7v10M18 7v10"/>
                    </svg>
                    ${this.instrument || 'Nylon Guitar'} <span style="opacity:0.6;">${this.soundOpen ? '▴' : '▾'}</span>
                  </button>
                  <button
                    class="quick-chip-btn"
                    @click=${() => { this.soundOpen = !this.soundOpen; }}
                    aria-label="Change playing style"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                      <path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/>
                    </svg>
                    ${this.playStyle || 'Block chords'} <span style="opacity:0.6;">${this.soundOpen ? '▴' : '▾'}</span>
                  </button>
                </div>

                ${this.soundOpen ? html`
                  <div class="sound-drawer">
                    <div class="kicker-label">Instrument</div>
                    <div class="sound-options-flex">
                      ${['Piano', 'Rhodes', 'Nylon Guitar', 'Warm Pad', 'Synth Bell'].map(inst => html`
                        <button
                          class="pill ${(this.instrument || 'Piano') === inst ? 'active' : ''}"
                          @click=${() => {
                            this.instrument = inst;
                            playbackEngine.setInstrument(inst);
                            this.requestUpdate();
                          }}
                        >${inst}</button>
                      `)}
                    </div>
                    <div class="kicker-label spaced">Playing Style</div>
                    <div class="sound-options-flex">
                      ${['Block chords', 'Arpeggio', 'Strum', 'Broken (swing)', 'Half-time'].map(st => html`
                        <button
                          class="pill ${(this.playStyle || 'Block chords') === st ? 'active' : ''}"
                          @click=${() => {
                            this.playStyle = st;
                            playbackEngine.setPlayStyle(st);
                            this.requestUpdate();
                          }}
                        >${st}</button>
                      `)}
                    </div>
                  </div>
                ` : ''}

                ${this.performMode ? this.renderLoopDeck(chords.length) : ''}
              ` : this.activeView === 'song' ? html`
                <div class="song-track-list">
                  <div style="font-size: 13px; line-height: 1.6; color: var(--cv-ink-muted); margin-bottom: 8px;">
                    Each section reuses the loop, related but never identical. Press play in the transport bar to hear the whole thing.
                  </div>
                  ${this.sections.map((sec, i) => html`
                    <div
                      class="song-card ${this.activeSectionIdx === i ? 'active-sec' : ''}"
                      @click=${() => {
                        this.activeSectionIdx = i;
                        this.requestUpdate();
                      }}
                    >
                      <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label);">
                        Section ${i + 1}
                      </div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">${sec.name}</div>
                        <div style="font-size: 12px; color: var(--cv-ink-muted); margin-top: 2px;">${sec.desc}</div>
                      </div>
                      <div style="display: flex; gap: 4px;">
                        ${sec.progression.chords.map(c => {
                          const r = roleForTension(c.tension || 0.1);
                          return html`<span style="width: 14px; height: 14px; border-radius: 4px; background: ${r.color};"></span>`;
                        })}
                      </div>
                    </div>
                  `)}
                  <div
                    class="add-sec-card"
                    @click=${() => {
                      if (this.progression) {
                        const res = SongArranger.addSection(this.sections, this.progression);
                        this.sections = res.sections;
                        this.activeSectionIdx = res.activeIndex;
                        this.requestUpdate();
                      }
                    }}
                  >
                    <span style="font-size: 20px; line-height: 1;">+</span>
                    <span>Add a related section</span>
                  </div>
                </div>
              ` : html`
                <div class="play-it-wrap">
                  <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" @click=${() => { this.showDegrees = !this.showDegrees; }}>
                      <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showDegrees ? moodColor : 'rgba(46,39,31,0.2)'}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                        <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showDegrees ? 'translateX(16px)' : 'translateX(0)'}; transition: transform 150ms ease;"></div>
                      </div>
                      <div style="font-size: 13.5px; font-weight: 700; color: var(--cv-ink-muted);">Scale degrees</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: baseline; gap: 14px; margin-top: 10px; flex-wrap: wrap;">
                    <div style="font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; color: var(--cv-label); text-transform: uppercase;">Piano</div>
                    <div style="font-size: 12.5px; line-height: 1.6; color: #8A7C6B; flex: 1; min-width: 200px;">One voicing per chord, root position — the red dot is the root, play left to right.</div>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 4px;">
                    ${chords.map((ch, i) => this.renderPianoCard(ch, i))}
                  </div>

                  <div style="display: flex; align-items: center; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
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
                  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 4px;">
                    ${chords.map((ch, i) => this.renderFretCard(ch, i, this.playInstrument === 'Ukulele' ? 'Ukulele' : 'Guitar'))}
                  </div>
                </div>
              `}
            </div>

            <!-- Transport Bar -->
            <div class="transport-footer">
              <button
                class="play-circle-btn"
                style="background: ${moodColor};"
                @click=${() => this.dispatchEvent(new CustomEvent('toggle-play', { bubbles: true, composed: true }))}
                aria-label="${this.playing ? 'Pause' : 'Play'}"
              >
                ${this.playing ? html`
                  <svg width="15" height="17" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>
                ` : html`
                  <svg width="17" height="19" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>
                `}
              </button>

              <div class="progress-line-track">
                <div
                  class="progress-line-fill ${this.snapProgress ? 'snap' : ''}"
                  style="width: 100%; transform: scaleX(${this.playing && chords.length ? (this.progressStep + 1) / chords.length : 0}); background: ${moodColor}; --progress-duration: ${AUTOPLAY_INTERVAL_MS}ms;"
                ></div>
              </div>

              <div class="stepper-wrap">
                <button class="stepper-btn" @click=${() => this.onStepLength(-1)} aria-label="Fewer chords">−</button>
                <div class="stepper-text">${chords.length} chords</div>
                <button class="stepper-btn" @click=${() => this.onStepLength(1)} aria-label="More chords">+</button>
              </div>

              <button class="dice-reroll-btn" @click=${this.onReroll}>
                <svg width="15" height="15" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${moodColor}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
                Try another
              </button>
            </div>
          </main>

          <!-- 3. RIGHT SIDEBAR -->
          <aside class="sidebar-right">
            <div class="right-header">
              ${!this.isInspectorOpen ? html`
                <div class="kicker-label">Harmonic Arc</div>
                <div style="font-size: 18px; font-weight: 800; color: var(--cv-ink); letter-spacing: -0.015em; margin-top: 4px;">
                  ${arcTitle}
                </div>
              ` : html`
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                  <div>
                    <div class="kicker-label">Swapping Bar ${(this.swapIndex || 0) + 1}</div>
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                      <span style="font-size: 22px; font-weight: 800; color: var(--cv-ink);">${currentSwapChord?.name || ''}</span>
                      ${this.showTheory && currentSwapChord?.roman ? html`
                        <span style="font-size: 12px; font-weight: 800; color: var(--cv-label);">${currentSwapChord.roman}</span>
                      ` : ''}
                    </div>
                  </div>
                  <button
                    class="round-btn"
                    style="width: 36px; height: 36px; font-size: 18px;"
                    @click=${() => {
                      this.isInspectorOpen = false;
                      this.swapIndex = null;
                      this.abPick = null;
                      this.requestUpdate();
                    }}
                    aria-label="Close chord inspector"
                  >×</button>
                </div>

                <div class="ab-box">
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
                      <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px; color: ${this.abPick ? '#2E271F' : 'rgba(46,39,31,0.45)'};">
                        ${this.abPick?.chord || 'Pick one below'}
                      </div>
                    </button>
                  </div>

                  <!-- Loop Progression Player Strip -->
                  <div class="ab-loop-player-row">
                    <button
                      class="ab-play-toggle-btn"
                      style="background: ${this.abPlaying ? moodColor : '#E8D9C2'};"
                      @click=${this.toggleAB}
                      aria-label="${this.abPlaying ? 'Pause loop' : 'Play loop with swap preview'}"
                    >
                      ${this.abPlaying ? html`
                        <svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>
                      ` : html`
                        <svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>
                      `}
                    </button>
                    <div class="ab-cells-track">
                      ${chords.map((c, i) => {
                        const isSwapBar = i === this.swapIndex;
                        const cellLabel = isSwapBar && this.abSide === 'after' && this.abPick ? this.abPick.chord : c.name;
                        const isCellActive = this.abPlaying && this.progressStep === i;
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

                <button
                  class="accept-swap-btn"
                  style="background: ${this.abPick ? moodColor : '#EDE0CC'}; color: ${this.abPick ? '#2E271F' : 'rgba(46,39,31,0.4)'}; cursor: ${this.abPick ? 'pointer' : 'default'};"
                  @click=${this.onConfirmSwap}
                  ?disabled=${!this.abPick}
                >
                  ${this.abPick ? `Keep ${this.abPick.chord}` : 'Pick a swap to compare'}
                </button>
              `}
            </div>

            <div class="right-scroll">
              ${!this.isInspectorOpen ? html`
                <div class="arc-bars-box">
                  ${chords.map((chord, idx) => {
                    const r = roleForTension(chord.tension || 0.1);
                    const h = Math.round(20 + (chord.tension || 0.1) * 75);
                    return html`
                      <button class="arc-bar-col" @click=${() => this.onChordSelect(idx)}>
                        <div class="arc-bar-pillar" style="height: ${h}px; background: ${r.color};"></div>
                        <div style="font-size: 11px; font-weight: 800; color: var(--cv-ink); margin-top: 6px;">${chord.name}</div>
                        <div style="font-size: 9.5px; font-weight: 700; color: rgba(46, 39, 31, 0.45);">${ROLE_PLAIN[chord.functionLabel] || ''}</div>
                      </button>
                    `;
                  })}
                </div>
                <div style="font-size: 11px; font-weight: 700; color: rgba(46, 39, 31, 0.42); margin-top: 8px;">Taller means more unresolved harmonic tension.</div>
                <div style="font-size: 13.5px; line-height: 1.6; color: var(--cv-ink-muted); margin-top: 14px;">${arcSentence}</div>
                <div style="display: flex; align-items: flex-start; gap: 9px; margin-top: 16px; background: var(--cv-cream); border-radius: 14px; padding: 11px 13px; font-size: 12.5px; line-height: 1.5; color: var(--cv-ink-muted);">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${moodColor}" stroke-width="2.4" stroke-linecap="round" style="flex-shrink: 0; margin-top: 1px;"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                  Tap any chord block to swap it or explore substitutions.
                </div>
              ` : html`
                <!-- Custom Geometric Substitution Family Tabs -->
                <div class="swap-tab-nav">
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
                    <span>Sorted for ${activeBand.name} — their moves first</span>
                  </div>
                ` : ''}

                ${familyNote ? html`
                  <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px; padding: 0 4px;">
                    ${familyNote}
                  </div>
                ` : ''}

                <div>
                  ${familyRows.length ? familyRows.map(r => {
                    const isSelected = this.abPick?.chord === r.name;
                    const rRole = roleForTension(r.tension);
                    const shapeSize = Math.max(28, Math.min(38, Math.round(rRole.size * 0.32)));
                    const shapeRadius = Math.round(rRole.radius * (shapeSize / rRole.size));
                    const isBandTagged = !!activeBand && activeBand.hoist.includes(r.name);

                    return html`
                      <div
                        class="alt-item-row ${isSelected ? 'selected' : ''}"
                        @click=${() => this.onAltAudition({
                          name: r.name,
                          chord: r.chord,
                          sub: r.sub,
                          functionCaption: r.sub,
                        })}
                      >
                        <div style="width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                          <div
                            style="width: ${shapeSize}px; height: ${shapeSize}px; border-radius: ${shapeRadius}px; background: ${rRole.color}; box-shadow: ${isSelected ? `0 0 0 2px ${moodColor}` : 'none'};"
                          ></div>
                        </div>

                        <div style="flex: 1; min-width: 0;">
                          <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                            <span style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${r.name}</span>
                            ${this.showTheory && r.roman ? html`
                              <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.8px; color: #7A5C88;">${r.roman}</span>
                            ` : ''}
                            ${isBandTagged ? html`
                              <span class="band-move-tag" style="background: ${activeBand.color};">${activeBand.name} move</span>
                            ` : ''}
                          </div>
                          <div style="font-size: 11.5px; color: var(--cv-ink-muted); margin-top: 2px;">${r.sub}</div>
                          ${this.showTheory && r.notes && r.notes.length ? html`
                            <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 3px;">
                              ${r.notes.join(' · ')}
                            </div>
                          ` : ''}
                        </div>

                        <button
                          class="alt-play-btn"
                          style="background: ${isSelected && this.abSide === 'after' ? moodColor : '#DCEAF9'};"
                          aria-label="Audition ${r.name}"
                        >
                          ${isSelected && this.abSide === 'after' ? '❚❚' : '▶'}
                        </button>
                      </div>
                    `;
                  }) : html`
                    <div style="padding: 14px 8px; font-size: 12.5px; color: var(--cv-ink-muted);">Loading substitutions...</div>
                  `}
                </div>
              `}
            </div>
          </aside>

        </div>
      ` : html`
        <!-- DEDICATED MOBILE LAYOUT -->
        <div class="mobile-stage-wrap" style="--mood-color: ${moodColor};">
          <!-- Collapsible Vibe Selector Drawer -->
          <div style="padding: 12px 18px 0;">
            <button class="mobile-vibe-bar" @click=${() => { this.vibeOpen = !this.vibeOpen; }}>
              <div>
                <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; color: var(--cv-label); text-transform: uppercase;">The Vibe</div>
                <div style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink); margin-top: 2px;">
                  ${this.progression?.searchTerm ? html`
                    ${this.renderStageTitle(moodColor)}
                  ` : `${this.progression?.genre || 'Pop'} · ${this.progression?.mood || 'Warm'}`}
                </div>
              </div>
              <span>${this.vibeOpen ? '⌃' : '⌄'}</span>
            </button>

            ${this.vibeOpen ? html`
              <div style="background: var(--cv-surface); border-radius: 20px; padding: 16px 15px; margin-top: 8px;">
                <form class="vibe-input-row ${this.isGenerating ? 'generating' : ''}" @submit=${this.onVibeSubmit} style="margin-top: 0;">
                  <input
                    type="text"
                    class="vibe-text-input"
                    .value=${this.freeText}
                    @input=${(e: Event) => { this.freeText = (e.target as HTMLInputElement).value; }}
                    placeholder=${this.isGenerating ? 'Composing your chords...' : this.vibeExamples[this.vibePlaceholderIdx]}
                    ?disabled=${this.isGenerating}
                  />
                  <button
                    type="submit"
                    class="vibe-submit-btn ${this.isGenerating ? 'generating' : ''}"
                    style="background: ${moodColor};"
                    aria-label="${this.isGenerating ? 'Composing chords' : 'Generate loop from vibe'}"
                    ?disabled=${this.isGenerating || !this.freeText.trim()}
                  >
                    ${this.isGenerating ? html`
                      <div class="vibe-spinner"></div>
                    ` : html`
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
                    `}
                  </button>
                </form>
                ${this.isGenerating ? html`
                  <div class="vibe-generating-pill">
                    <span class="vibe-spinner"></span>
                    <span>Composing chords...</span>
                  </div>
                ` : ''}

                <div class="kicker-label spaced">Genre</div>
                <div class="pills-group">
                  ${shownGenres.map(g => html`
                    <button class="pill ${this.progression?.genre === g ? 'active' : ''}" @click=${() => this.onGenreClick(g)}>${g}</button>
                  `)}
                </div>

                <div class="kicker-label spaced">Mood</div>
                <div class="pills-group">
                  ${MOOD_PRIMARY.map(m => html`
                    <button class="pill ${this.progression?.mood === m ? 'active' : ''}" @click=${() => this.onMoodClick(m)}>${m}</button>
                  `)}
                </div>

                <div class="kicker-label spaced">Band</div>
                <div class="pills-group">
                  ${BANDS.map(b => html`
                    <button class="pill ${this.selectedBand === b.name ? 'active' : ''}" @click=${() => this.onBandClick(b.name)}>${b.name}</button>
                  `)}
                </div>

                <button class="mobile-loops-toggle-btn" @click=${() => this.toggleLibrary(true)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                  <span style="flex: 1; text-align: left;">Your saved loops (${this.savedSets.length})</span>
                  <span style="font-weight: 800;">→</span>
                </button>
              </div>
            ` : ''}
          </div>

          <!-- View Switcher Tabs: Chords | Song | Play it -->
          <div style="padding: 12px 18px 0;">
            <div class="view-tabs-bar" style="width: 100%; justify-content: center;">
              <button class="view-tab ${this.activeView === 'loop' ? 'active' : ''}" @click=${() => { this.activeView = 'loop'; }}>Chords</button>
              <button class="view-tab ${this.activeView === 'song' ? 'active' : ''}" @click=${() => { this.activeView = 'song'; }}>Song</button>
              <button class="view-tab ${this.activeView === 'play' ? 'active' : ''}" @click=${() => { this.activeView = 'play'; }}>Play it</button>
            </div>

            ${this.activeView === 'loop' ? html`
              <div class="mode-toggle-row" style="justify-content: center; margin: 10px 0 6px;">
                <button
                  class="perform-mode-btn ${this.performMode ? 'exit' : ''}"
                  @click=${() => this.togglePerform(!this.performMode)}
                  aria-label="${this.performMode ? 'Exit perform' : 'Perform'}"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;">
                    <rect x="3" y="3" width="8" height="8" rx="2.4"/>
                    <rect x="13" y="3" width="8" height="8" rx="2.4"/>
                    <rect x="3" y="13" width="8" height="8" rx="2.4"/>
                    <rect x="13" y="13" width="8" height="8" rx="2.4"/>
                  </svg>
                  ${this.performMode ? 'Exit perform' : 'Perform'}
                </button>
              </div>
            ` : ''}
          </div>

          <!-- Mobile Center View -->
          <div style="padding: 14px 18px 24px; flex: 1;">
            ${this.activeView === 'loop' ? html`
              ${this.performMode ? html`
                <div class="stage-panel" style="min-height: 220px; padding: 18px 12px; display: flex; flex-direction: column;">
                  <svg class="drift-shape a" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B"/></svg>
                  <svg class="drift-shape b" width="90" height="90" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC"/></svg>

                  <div class="pad-cells-grid">
                    ${chords.map((chord, idx) => {
                      const r = roleForTension(chord.tension || 0.1);
                      const isHeld = this.padFlash === idx;
                      const isLit = this.playing && idx === this.progressStep;
                      const keyLabel = String(idx + 1);
                      const meta = isHeld && this.lastPad ? this.lastPad.voicing : (ROLE_PLAIN[chord.functionLabel] || chord.functionLabel || '');

                      return html`
                        <div
                          class="pad-cell ${isHeld ? 'pad-held' : ''} ${isLit ? 'pad-lit' : ''}"
                          style="background: ${r.color}; min-height: 108px;"
                          @mousedown=${(e: MouseEvent) => this.onPadDown(idx, e)}
                          @mouseup=${() => this.onPadUp(idx)}
                          @touchstart=${(e: TouchEvent) => { e.preventDefault(); this.onPadDown(idx, e); }}
                          @touchend=${(e: TouchEvent) => { e.preventDefault(); this.onPadUp(idx); }}
                          tabindex="0"
                          role="button"
                          aria-label="Play ${chord.name}"
                        >
                          <div class="pad-key-label">${keyLabel}</div>
                          <div>
                            <div class="pad-name" style="font-size: 18px;">${chord.name}</div>
                            <div class="pad-meta">${meta}</div>
                          </div>
                        </div>
                      `;
                    })}
                  </div>
                  <div class="perform-banner" style="margin-top: 10px;">
                    <span class="perform-banner-kicker">Playing now</span>
                    <span class="perform-banner-now" style="font-size: 14px;">${this.lastPad ? chords[Math.min(this.lastPad.idx, chords.length - 1)]?.name : '—'}</span>
                    <span class="perform-banner-sub" style="font-size: 11px;">${this.lastPad ? `${this.lastPad.voicing} · velocity ${this.lastPad.vel}` : 'Tap a pad to play'}</span>
                  </div>
                </div>
              ` : html`
                <div class="stage-panel" style="min-height: 200px; padding: 24px 12px;">
                  <svg class="drift-shape a" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B"/></svg>
                  <svg class="drift-shape b" width="90" height="90" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC"/></svg>

                  <div class="chords-flex-row" style="gap: 16px;">
                    ${chords.map((chord, idx) => {
                      const r = roleForTension(chord.tension || 0.1);
                      const isLit = this.playing && idx === this.progressStep;
                      const size = Math.max(76, Math.min(100, r.size * 0.8));
                      const radius = Math.round(r.radius * (size / r.size));

                      return html`
                        <div class="chord-item-wrap" @click=${() => this.onChordSelect(idx)}>
                          <div
                            class="chord-block-shape ${isLit ? 'active-pulse' : ''}"
                            style="width: ${size}px; height: ${size}px; border-radius: ${radius}px; background: ${r.color};"
                          >
                            ${this.showTheory && chord.roman ? html`
                              <div class="roman-pill-badge">${chord.roman}</div>
                            ` : ''}
                            <div class="chord-title-text" style="font-size: ${Math.round(r.fontSize * 0.76)}px;">${chord.name}</div>

                            <!-- Quick Mobile Action Buttons -->
                            <button class="quick-action-btn swap" @click=${(e: Event) => { e.stopPropagation(); this.onChordSelect(idx); }} aria-label="Swap chord">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                            </button>
                          </div>
                          <div class="chord-role-label">${ROLE_PLAIN[chord.functionLabel] || ''}</div>
                        </div>
                      `;
                    })}
                  </div>
                </div>
              `}

              <!-- Quick Instrument & Play Style Chips -->
              <div class="quick-chips-row" style="margin-top: 14px;">
                <button class="quick-chip-btn" @click=${() => { this.soundOpen = !this.soundOpen; }} aria-label="Change instrument">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="7" width="19" height="10" rx="2"/><path d="M8 7v10M13 7v10M18 7v10"/></svg>
                  ${this.instrument || 'Nylon Guitar'} <span style="opacity:0.6;">${this.soundOpen ? '▴' : '▾'}</span>
                </button>
                <button class="quick-chip-btn" @click=${() => { this.soundOpen = !this.soundOpen; }} aria-label="Change playing style">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><path d="M4 15V9M9 18V6M14 14v-4M19 17V7"/></svg>
                  ${this.playStyle || 'Block chords'} <span style="opacity:0.6;">${this.soundOpen ? '▴' : '▾'}</span>
                </button>
              </div>

              ${this.soundOpen ? html`
                <div class="sound-drawer">
                  <div class="kicker-label">Instrument</div>
                  <div class="sound-options-flex">
                    ${['Piano', 'Rhodes', 'Nylon Guitar', 'Warm Pad', 'Synth Bell'].map(inst => html`
                      <button class="pill ${(this.instrument || 'Piano') === inst ? 'active' : ''}" @click=${() => { this.instrument = inst; playbackEngine.setInstrument(inst); this.requestUpdate(); }}>${inst}</button>
                    `)}
                  </div>
                  <div class="kicker-label spaced">Playing Style</div>
                  <div class="sound-options-flex">
                    ${['Block chords', 'Arpeggio', 'Strum', 'Broken (swing)', 'Half-time'].map(st => html`
                      <button class="pill ${(this.playStyle || 'Block chords') === st ? 'active' : ''}" @click=${() => { this.playStyle = st; playbackEngine.setPlayStyle(st); this.requestUpdate(); }}>${st}</button>
                    `)}
                  </div>
                </div>
              ` : ''}

              ${this.performMode ? this.renderLoopDeck(chords.length) : ''}

              <!-- Music Theory & Harmonic Arc -->
              <div style="display: flex; align-items: center; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(46,39,31,0.09); cursor: pointer;" @click=${() => { this.showTheory = !this.showTheory; }}>
                <div style="width: 36px; height: 20px; border-radius: 100px; background: ${this.showTheory ? moodColor : 'rgba(46,39,31,0.2)'}; padding: 2px; display: flex; align-items: center; transition: background 150ms ease;">
                  <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFF; transform: ${this.showTheory ? 'translateX(16px)' : 'translateX(0)'}; transition: transform 150ms ease;"></div>
                </div>
                <span style="font-size: 13px; font-weight: 700; color: var(--cv-ink-muted);">Show music theory & tension arc</span>
              </div>

              ${this.showTheory ? html`
                <div style="margin-top: 14px; background: var(--cv-surface); border-radius: 18px; padding: 14px;">
                  <div class="arc-bars-box" style="height: 100px;">
                    ${chords.map((chord, idx) => {
                      const r = roleForTension(chord.tension || 0.1);
                      const h = Math.round(16 + (chord.tension || 0.1) * 50);
                      return html`
                        <div class="arc-bar-col" @click=${() => this.onChordSelect(idx)}>
                          <div class="arc-bar-pillar" style="height: ${h}px; background: ${r.color};"></div>
                          <div style="font-size: 10px; font-weight: 800; color: var(--cv-ink); margin-top: 4px;">${chord.name}</div>
                        </div>
                      `;
                    })}
                  </div>
                  <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 10px;">${arcSentence}</div>
                </div>
              ` : ''}
            ` : this.activeView === 'song' ? html`
              <div class="song-track-list">
                ${this.sections.map((sec, i) => html`
                  <div class="song-card ${this.activeSectionIdx === i ? 'active-sec' : ''}" @click=${() => { this.activeSectionIdx = i; this.requestUpdate(); }}>
                    <div style="flex: 1;">
                      <div style="font-size: 15px; font-weight: 800; color: var(--cv-ink);">${sec.name}</div>
                      <div style="font-size: 11.5px; color: var(--cv-ink-muted);">${sec.desc}</div>
                    </div>
                  </div>
                `)}
                <div class="add-sec-card" @click=${() => {
                  if (this.progression) {
                    const res = SongArranger.addSection(this.sections, this.progression);
                    this.sections = res.sections;
                    this.activeSectionIdx = res.activeIndex;
                    this.requestUpdate();
                  }
                }}>
                  + Add a related section
                </div>
              </div>
            ` : html`
              <div style="padding: 16px 4px 26px;">
                <div style="background: var(--cv-surface); border-radius: 20px; padding: 15px 15px 17px;">
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
                  <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 18px;">
                    ${chords.map((ch, i) => this.renderPianoCard(ch, i))}
                  </div>
                ` : html`
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 18px;">
                    ${chords.map((ch, i) => this.renderFretCard(ch, i, this.playInstrument === 'Ukulele' ? 'Ukulele' : 'Guitar'))}
                  </div>
                `}
              </div>
            `}
          </div>

          <!-- Bottom Mobile Transport Bar -->
          <div class="transport-footer" style="padding: 10px 16px;">
            <button
              class="play-circle-btn"
              style="background: ${moodColor}; width: 42px; height: 42px;"
              @click=${() => this.dispatchEvent(new CustomEvent('toggle-play', { bubbles: true, composed: true }))}
              aria-label="${this.playing ? 'Pause' : 'Play'}"
            >
              ${this.playing ? html`
                <svg width="14" height="16" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>
              ` : html`
                <svg width="15" height="17" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>
              `}
            </button>

            <div class="progress-line-track">
              <div
                class="progress-line-fill ${this.snapProgress ? 'snap' : ''}"
                style="width: 100%; transform: scaleX(${this.playing && chords.length ? (this.progressStep + 1) / chords.length : 0}); background: ${moodColor}; --progress-duration: ${AUTOPLAY_INTERVAL_MS}ms;"
              ></div>
            </div>

            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${this.onReroll} aria-label="Try another progression">
              <svg width="19" height="19" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="${moodColor}"/><circle cx="8" cy="8" r="1.7" fill="#2E271F"/><circle cx="16" cy="8" r="1.7" fill="#2E271F"/><circle cx="12" cy="12" r="1.7" fill="#2E271F"/><circle cx="8" cy="16" r="1.7" fill="#2E271F"/><circle cx="16" cy="16" r="1.7" fill="#2E271F"/></svg>
            </button>
            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${this.onBookmark} aria-label="Keep this loop">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
            </button>
            <button class="mobile-loops-toggle-btn" style="background: ${this.libraryOpen ? moodColor : 'var(--cv-surface)'};" @click=${() => this.toggleLibrary()} aria-label="Your saved loops">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 6h11M4 12h11M4 18h7"/><path d="M19 4v10l-2.4-1.6L14.2 14V4z" fill="#2E271F" stroke="none"/></svg>
            </button>
            <button class="round-btn" style="width: 42px; height: 42px; flex-shrink: 0;" @click=${() => { this.shareOpen = true; }} aria-label="Share this loop">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 16V3M7 8l5-5 5 5"/></svg>
            </button>

            ${this.libraryOpen ? html`
              <div class="library-popover-mobile">
                ${this.renderLibraryPopoverContent(moodColor)}
              </div>
            ` : ''}
          </div>

          <!-- Mobile Slide-Up Substitution Sheet -->
          ${this.mobileSheetOpen && this.swapIndex !== null ? html`
            <div class="sheet-scrim" @click=${() => { this.mobileSheetOpen = false; }}></div>
            <div class="mobile-sheet">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div style="font-size: 16px; font-weight: 800; color: var(--cv-ink);">Swap Bar ${this.swapIndex + 1} (${currentSwapChord?.name})</div>
                <button class="round-btn" style="width: 32px; height: 32px;" @click=${() => { this.mobileSheetOpen = false; }}>×</button>
              </div>

              <div class="ab-box" style="margin-top: 0; margin-bottom: 14px;">
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
                    <div style="font-size: 14.5px; font-weight: 800; margin-top: 2px; color: ${this.abPick ? '#2E271F' : 'rgba(46,39,31,0.45)'};">
                      ${this.abPick?.chord || 'Pick one below'}
                    </div>
                  </button>
                </div>

                <!-- Loop Progression Player Strip -->
                <div class="ab-loop-player-row">
                  <button
                    class="ab-play-toggle-btn"
                    style="background: ${this.abPlaying ? moodColor : '#E8D9C2'};"
                    @click=${this.toggleAB}
                    aria-label="${this.abPlaying ? 'Pause loop' : 'Play loop with swap preview'}"
                  >
                    ${this.abPlaying ? html`
                      <svg width="13" height="15" viewBox="0 0 16 18" fill="#2E271F"><rect x="1" y="0" width="5" height="18" rx="1.5"/><rect x="10" y="0" width="5" height="18" rx="1.5"/></svg>
                    ` : html`
                      <svg width="14" height="16" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z"/></svg>
                    `}
                  </button>
                  <div class="ab-cells-track">
                    ${chords.map((c, i) => {
                      const isSwapBar = i === this.swapIndex;
                      const cellLabel = isSwapBar && this.abSide === 'after' && this.abPick ? this.abPick.chord : c.name;
                      const isCellActive = this.abPlaying && this.progressStep === i;
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

              <!-- Custom Geometric Substitution Family Tabs -->
              <div class="swap-tab-nav">
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
                  <span>Sorted for ${activeBand.name} — their moves first</span>
                </div>
              ` : ''}

              ${familyNote ? html`
                <div style="font-size: 12px; line-height: 1.5; color: var(--cv-ink-muted); margin-bottom: 12px; padding: 0 4px;">
                  ${familyNote}
                </div>
              ` : ''}

              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${familyRows.length ? familyRows.map(r => {
                  const isSelected = this.abPick?.chord === r.name;
                  const rRole = roleForTension(r.tension);
                  const shapeSize = Math.max(28, Math.min(38, Math.round(rRole.size * 0.32)));
                  const shapeRadius = Math.round(rRole.radius * (shapeSize / rRole.size));
                  const isBandTagged = !!activeBand && activeBand.hoist.includes(r.name);

                  return html`
                    <div
                      class="alt-item-row ${isSelected ? 'selected' : ''}"
                      @click=${() => this.onAltAudition({
                        name: r.name,
                        chord: r.chord,
                        sub: r.sub,
                        functionCaption: r.sub,
                      })}
                    >
                      <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <div
                          style="width: ${shapeSize}px; height: ${shapeSize}px; border-radius: ${shapeRadius}px; background: ${rRole.color}; box-shadow: ${isSelected ? `0 0 0 2px ${moodColor}` : 'none'};"
                        ></div>
                      </div>

                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                          <span style="font-size: 14.5px; font-weight: 800; color: var(--cv-ink);">${r.name}</span>
                          ${this.showTheory && r.roman ? html`
                            <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.8px; color: #7A5C88;">${r.roman}</span>
                          ` : ''}
                          ${isBandTagged ? html`
                            <span class="band-move-tag" style="background: ${activeBand.color};">${activeBand.name} move</span>
                          ` : ''}
                        </div>
                        <div style="font-size: 11px; color: var(--cv-ink-muted); margin-top: 2px;">${r.sub}</div>
                        ${this.showTheory && r.notes && r.notes.length ? html`
                          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.4px; color: var(--cv-label); margin-top: 2px;">
                            ${r.notes.join(' · ')}
                          </div>
                        ` : ''}
                      </div>

                      <button
                        class="alt-play-btn"
                        style="background: ${isSelected && this.abSide === 'after' ? moodColor : '#DCEAF9'}; width: 30px; height: 30px;"
                        aria-label="Audition ${r.name}"
                      >
                        ${isSelected && this.abSide === 'after' ? '❚❚' : '▶'}
                      </button>
                    </div>
                  `;
                }) : html`
                  <div style="padding: 12px; font-size: 12.5px; color: var(--cv-ink-muted);">Loading substitutions...</div>
                `}
              </div>

              ${this.abPick ? html`
                <button class="accept-swap-btn" style="background: ${moodColor}; margin-top: 14px;" @click=${this.onConfirmSwap}>
                  Keep ${this.abPick.chord}
                </button>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `}

      <!-- Share Modal -->
      <share-modal
        .open=${this.shareOpen}
        .progression=${this.progression}
        @close=${() => { this.shareOpen = false; }}
      ></share-modal>

      <!-- Upgraded Loops Drawer (Desktop slide-over & Mobile bottom sheet) -->
      ${this.renderLoopsDrawer(moodColor)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loop-screen': LoopScreen;
  }
}
