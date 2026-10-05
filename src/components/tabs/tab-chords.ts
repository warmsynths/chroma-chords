import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ChordBlock,
  Progression,
  roleForTension,
  generateTheoryGroups,
  generateBorrowedChords,
  notesForSymbol,
  preferFlatSpelling,
  RawChordData,
  getDiatonicScaleDegreeList,
} from '../../services/chord-engine';
import {
  getBandById,
  getBandMoveForChord,
  getBandTrickCandidates,
} from '../../services/band-dna-service';
import { playbackEngine } from '../../services/playback-engine';
import '../chord-swap-lane';
import type { SwapFeelItem } from '../chord-swap-lane';

const ROLE_PLAIN: Record<string, string> = {
  Tonic: 'HOME',
  Submediant: 'DRIFTING',
  Subdominant: 'LIFTING',
  Supertonic: 'STEPPING UP',
  Mediant: 'WISTFUL',
  Dominant: 'PULLING HOME',
  'Dominant 7th': 'PULLING HOME',
};

const PAD_KEYS = ['A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];
const ZONE_NAMES = ['OCTAVE UP', '1ST INVERSION', 'LOW ROOT'];

export function voicingToZone(voicing?: string): number {
  if (!voicing) return -1;
  const v = voicing.toLowerCase();
  if (v.includes('octave') || v.includes('high')) return 0;
  if (v.includes('inversion') || v.includes('1st')) return 1;
  if (v.includes('root') || v.includes('low')) return 2;
  return -1;
}

@customElement('tab-chords')
export class TabChords extends LitElement {
  @property({ type: Object }) progression: Progression = {
    genre: 'Pop',
    mood: 'Emotional',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 84,
    chords: [],
  };

  @property({ type: Object }) chordData: RawChordData = { chords: {}, scales: {} };
  @property({ type: String }) moodColor = '#C9A9E0';
  @property({ type: String }) selectedBand: string | null = null;
  @property({ type: Boolean }) isPlaying = false;
  @property({ type: Number }) activeIndex = -1;
  @property({ type: Boolean }) showTheory = false;
  /** Bumped by the app when the right-hand column's × asks to close the open swap. */
  @property({ type: Number }) closeSwapSignal = 0;

  @state() private swapIndex: number | null = null;
  @state() private activeSwapFamily = 'Darker';
  @state() private abPick: ChordBlock | null = null;
  @state() private padHeld: number | null = null;
  @state() private gridFor: number | null = null;
  @state() private baseChords: ChordBlock[] = [];
  @state() private lastPad: { idx: number; voicing: string; vel: number; zone: number; reach: number | null } | null = null;
  @state() private padVoice: Record<string, number> = {};
  @state() private auditionDeg: number | null = null;
  @state() private auditionName: string | null = null;
  @state() private auditionBar: number | null = null;
  /** Pad columns: 2 on phones (matches the app's 899px mobile breakpoint), 4 otherwise. */
  @state() private padCols = 4;
  private padTimer: any = null;
  private gridTimer: any = null;
  private _mq: MediaQueryList | null = null;
  private _onMq = () => { this.padCols = this._mq?.matches ? 2 : 4; };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--font-body, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: #2E271F;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    /* 1. Header Context Row */
    .tab-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .vibe-pill-btn {
      border: none;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 40px;
      padding: 0 12px 0 10px;
      border-radius: 100px;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: none;
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms ease;
    }

    .vibe-pill-btn:hover {
      background: #FFFAF2;
    }

    .vibe-dot {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .vibe-summary-text {
      color: var(--cv-ink, #2E271F);
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    .vibe-arrow {
      opacity: 0.6;
      font-size: 10px;
      color: var(--cv-ink, #2E271F);
      margin-left: -2px;
    }

    .header-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    /* Chord Count Stepper (Matches Chroma Melody prototype) */
    .chord-count-stepper {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: transparent;
      border: none;
      padding: 0;
    }

    .stepper-btn {
      border: none;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-cream, #FBF3E6);
      color: var(--cv-ink, #2E271F);
      font-size: 15px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 150ms ease;
    }

    .stepper-btn:hover:not(:disabled) {
      background: #FFFAF2;
    }

    .stepper-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .chord-count-label {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      min-width: 58px;
      text-align: center;
    }

    /* Try Another Button (Matches Chroma Melody prototype) */
    .try-another-btn {
      border: none;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-cream, #FBF3E6);
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
      box-shadow: none;
    }

    .try-another-btn:hover {
      background: #FFFAF2;
    }

    /* 2. Band DNA Banner */
    .band-legend-banner {
      background: rgba(251, 243, 230, 0.88);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 10px 14px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      backdrop-filter: blur(8px);
    }

    .band-legend-info {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .band-swatch {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .band-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #2E271F;
    }

    .band-tagline {
      font-size: 11.5px;
      font-weight: 500;
      color: #7A6F62;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .band-dismiss-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      font-weight: 700;
      color: #7A6F62;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
      transition: all 150ms ease;
    }

    .band-dismiss-btn:hover {
      color: #2E271F;
      background: rgba(46, 39, 31, 0.08);
    }

    /* 3. Chord Pads Grid */
    /* 3. Chord Pads Grid */
    .pad-cells-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      width: 100%;
      position: relative;
    }

    @media (max-width: 899px) {
      .pad-cells-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      /* Phones: chord count + "try another" live in the dock / under the grid (design) */
      .header-actions {
        display: none;
      }
      .tab-header-row {
        margin: -2px 0 14px;
      }
      /* Keyboard shortcut caps mean nothing on touch */
      .pad-cell .pad-key-badge {
        display: none;
      }
      .pad-cells-grid .add-chord-row {
        display: flex;
      }
    }

    /* Playing now footer (Chroma Melody: last pad pressed) */
    .now-playing-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 6px 10px;
      margin-top: 16px;
      padding-top: 13px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }

    .now-kicker {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .now-label {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink, #2E271F);
    }

    .now-sub {
      flex: 1 1 140px;
      min-width: 0;
      font-size: 11.5px;
      font-weight: 700;
      line-height: 1.45;
      color: var(--cv-ink-muted, #6B5F50);
    }

    @media (min-width: 900px) {
      .now-label { font-size: 15px; }
      .now-sub { flex-basis: 200px; font-size: 12px; }
    }

    /* Add / remove chord (phones only) */
    .add-chord-row {
      display: none;
      grid-column: 1 / -1;
      gap: 7px;
      min-width: 0;
    }

    .add-chord-btn,
    .remove-chord-btn {
      border: 1.5px dashed rgba(46, 39, 31, 0.3);
      font-family: inherit;
      background: transparent;
      color: var(--cv-ink, #2E271F);
      border-radius: 16px;
      min-height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
    }

    .add-chord-btn {
      flex: 1;
      min-width: 0;
      gap: 8px;
      font-size: 12.5px;
      letter-spacing: 0.2px;
    }

    .remove-chord-btn {
      flex: 0 0 52px;
      font-size: 18px;
      line-height: 1;
    }

    .add-chord-btn:hover:not(:disabled),
    .remove-chord-btn:hover:not(:disabled) {
      background: rgba(251, 243, 230, 0.6);
    }

    .add-chord-btn:active:not(:disabled),
    .remove-chord-btn:active:not(:disabled) {
      transform: scale(0.99);
    }

    .add-chord-btn:disabled,
    .remove-chord-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .add-chord-btn .plus {
      font-size: 18px;
      line-height: 1;
    }

    .add-chord-btn .count {
      font-size: 10px;
      letter-spacing: 0.4px;
      color: var(--cv-label, #8A6B3F);
    }

    /* Chord Pad Column */
    .pad-cell-column {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
      width: 100%;
    }

    /* Chord Pad Card */
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
      user-select: none;
      min-height: 124px;
      outline-offset: 4px;
      touch-action: none;
      transition: box-shadow 140ms ease, transform 120ms ease;
      box-shadow: 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }

    .pad-cell:hover {
      transform: translateY(-1px);
      box-shadow: 0 18px 28px -16px rgba(46, 39, 31, 0.55);
    }

    .pad-cell:active, .pad-cell.pad-held {
      transform: scale(0.985) !important;
      box-shadow: inset 0 0 0 2.5px #2E271F !important;
    }

    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 2.5px #2E271F, 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }

    .pad-cell.selected {
      box-shadow: 0 0 0 2.5px #2E271F, 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }

    /* Top Row in Pad */
    .pad-top-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }

    .pad-key-badge {
      display: inline-flex;
      align-items: flex-start;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 1.5px 1.5px 3.5px;
      border-radius: 5px;
      background: rgba(46, 39, 31, 0.16);
      box-shadow: 0 1px 0 rgba(46, 39, 31, 0.18);
      flex-shrink: 0;
      box-sizing: border-box;
    }

    .pad-key-badge span, .pad-key-cap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 3.5px;
      background: rgba(255, 255, 255, 0.62);
      box-shadow: inset 0 -1px 0 rgba(46, 39, 31, 0.12);
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 9.5px;
      font-weight: 800;
      line-height: 1;
      color: rgba(46, 39, 31, 0.62);
    }

    .pad-roman-badge {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.6px;
      color: rgba(46, 39, 31, 0.55);
    }

    /* Bottom Info in Pad */
    .pad-bottom-info {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .pad-role-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.9px;
      text-transform: uppercase;
      color: #2E271F;
      opacity: 0.9;
      line-height: 1.2;
    }

    .pad-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.02em;
      line-height: 1.05;
      overflow-wrap: anywhere;
    }

    .pad-notes-theory {
      font-size: 11px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.62);
      margin-top: 2px;
      letter-spacing: 0.2px;
    }

    /* 2D Voicing & Extension Grid Visualizer */
    .pad-grid-visualizer {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .grid-col {
      position: absolute;
      top: 6px;
      bottom: 6px;
      border-radius: 10px;
      background: transparent;
      transition: background 160ms ease;
    }

    .grid-col.visible {
      background: rgba(251, 243, 230, 0.08);
    }

    .grid-col.active-col {
      background: rgba(251, 243, 230, 0.24);
    }

    .grid-hit-pill {
      position: absolute;
      border-radius: 8px;
      background: rgba(251, 243, 230, 0.62);
      box-shadow: 0 4px 12px rgba(46, 39, 31, 0.18);
      transition: top 120ms ease, left 120ms ease;
      z-index: 1;
      pointer-events: none;
    }

    .pad-meta-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: rgba(46, 39, 31, 0.5);
      height: 12px;
      white-space: nowrap;
      margin-top: 2px;
      transition: color 140ms ease;
    }

    .pad-meta-label.reach-active {
      color: #2E271F;
      font-weight: 800;
    }

    /* Rung Dots & Extension Ladder */
    .rung-dots {
      display: flex;
      gap: 4px;
      margin-top: 7px;
      width: 100%;
    }

    .rung-step-col {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }

    .rung-step-label {
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      line-height: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      color: rgba(46, 39, 31, 0.3);
      transition: color 180ms ease;
    }

    .rung-step-label.active {
      color: rgba(46, 39, 31, 0.78);
    }

    .rung-step-bar, .rung-dot {
      width: 100%;
      height: 4px;
      border-radius: 3px;
      background: rgba(46, 39, 31, 0.16);
      transition: width 200ms cubic-bezier(0.23, 1, 0.32, 1), background 180ms ease;
    }

    .rung-step-bar.active, .rung-dot.filled {
      background: rgba(46, 39, 31, 0.5);
    }

    .band-move-pill {
      border: none;
      font-family: inherit;
      cursor: pointer;
      margin-top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
      min-height: 26px;
      padding: 0 10px;
      border-radius: 100px;
      background: rgba(251, 243, 230, 0.85);
      color: #2E271F;
      font-size: 10.5px;
      font-weight: 800;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.1);
    }

    .band-move-pill:hover { background: #FFFFFF; }
    .band-move-pill:active { transform: scale(0.97); }
    .band-move-use { font-size: 9.5px; letter-spacing: 0.6px; text-transform: uppercase; color: var(--cv-label, #8A6B3F); }

    /* Swap Button beneath pad card */
    .pad-tray-btn {
      border: none;
      font-family: inherit;
      width: 100%;
      min-height: 34px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 120ms ease, transform 120ms ease;
      background: rgba(46, 39, 31, 0.05);
      color: #4A3F33;
      user-select: none;
    }

    .pad-tray-btn:hover {
      background: rgba(46, 39, 31, 0.08);
    }

    .pad-tray-btn:active {
      transform: scale(0.98);
    }

    .pad-tray-btn.active {
      background: #2E271F;
      color: #FBF3E6;
    }

    .pad-role-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.65);
    }

    .pad-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.3px;
      line-height: 1.1;
    }

    @media (max-width: 600px) {
      .pad-chord-name {
        font-size: 18px;
      }
    }

    .pad-notes-theory {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.7);
      margin-top: 2px;
    }

    /* Band Move Pill inside Pad */
    .band-move-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255, 255, 255, 0.75);
      border-radius: 999px;
      padding: 3px 8px;
      font-size: 9.5px;
      font-weight: 800;
      color: #2E271F;
      margin-top: 6px;
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.08);
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* 4. Diatonic Scale Strip (Theory Mode) */
    .scale-diatonic-strip {
      position: relative;
      z-index: 2;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 20px;
      padding: 13px 15px 15px;
      margin-top: 18px;
      flex-shrink: 0;
    }

    .scale-strip-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .scale-strip-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .scale-strip-hint {
      font-size: 11px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.45);
    }

    .scale-degrees-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
      gap: 6px;
      margin-top: 10px;
      min-width: 0;
    }

    .scale-degree-btn {
      border: none;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      min-width: 0;
      min-height: 46px;
      padding: 7px 10px 8px;
      border-radius: 13px;
      display: flex;
      flex-direction: column;
      background: transparent;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.13);
      transition: background 160ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms cubic-bezier(0.16, 1, 0.3, 1), transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .scale-degree-btn:hover {
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.22);
    }

    .scale-degree-btn:active {
      transform: scale(0.97);
    }

    .scale-degree-btn.in-loop {
      background: var(--cv-surface-2, #F1E4CC);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
    }

    .scale-degree-btn.active {
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.22);
    }

    .degree-head-row {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .degree-roman {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.9px;
      color: var(--cv-label, #8A6B3F);
    }

    .degree-in-loop-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.42);
      flex-shrink: 0;
    }

    .degree-name {
      font-size: 14.5px;
      font-weight: 800;
      letter-spacing: -0.015em;
      line-height: 1.1;
      color: var(--cv-ink, #2E271F);
    }

    @media (max-width: 899px) {
      /* Phones: two columns so "Subdominant" / "Leading tone" fit whole at a readable size */
      .scale-degrees-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .degree-fn {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.2px;
      margin-top: 1px;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  private getChordLadder(c: ChordBlock): string[] {
    if (!c) return [];
    const n = String(c.name);
    const root = (n.match(/^[A-G][#b]?/) || ['C'])[0];
    const suf = /sus/.test(n)
      ? ['sus4', '7sus4', '9sus4', 'maj7sus4', '13sus4']
      : (/dim/.test(n)
        ? ['dim', 'dim7', 'dim9', 'm7b5', 'alt']
        : (/^[A-G][#b]?m(?!aj)/.test(n)
          ? ['m', 'm6', 'm7', 'm9', 'mMaj7']
          : ['', '6', '7', 'maj7', 'maj9']));
    return suf.map(s => root + s);
  }

  private ladderHome(c: ChordBlock): number {
    const lad = this.getChordLadder(c);
    const idx = lad.indexOf(c ? c.name : '');
    return idx >= 0 ? idx : 0;
  }

  private getRungLabels(lad: string[]): string[] {
    const sfx = lad.map(nm => String(nm).replace(/^[A-G][#b]?/, ''));
    const stem = sfx[0];
    let rungLabels = sfx.slice();
    if (stem && sfx.every((s, i) => i === 0 || s.indexOf(stem) === 0)) {
      rungLabels = sfx.map((s, i) => i ? s.slice(stem.length) : s);
    } else if (stem && sfx.every((s, i) => i === 0 || s.slice(-stem.length) === stem)) {
      rungLabels = sfx.map((s, i) => i ? s.slice(0, s.length - stem.length) : s);
    }
    return rungLabels.map(s => (s === '' ? 'maj' : s).replace(/maj/gi, '△'));
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleWindowKeyDown);
    if (typeof window.matchMedia === 'function') {
      this._mq = window.matchMedia('(max-width: 899px)');
      this._mq.addEventListener?.('change', this._onMq);
      this._onMq();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleWindowKeyDown);
    this._mq?.removeEventListener?.('change', this._onMq);
    if (this.padTimer) clearTimeout(this.padTimer);
    if (this.gridTimer) clearTimeout(this.gridTimer);
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('closeSwapSignal') && changedProperties.get('closeSwapSignal') !== undefined) {
      this.swapIndex = null;
      this.abPick = null;
    }
    if (changedProperties.has('swapIndex') || changedProperties.has('abPick') || changedProperties.has('activeSwapFamily')) {
      // Tell the right-hand column what is being swapped / auditioned
      this.dispatchEvent(new CustomEvent('swap-state', {
        detail: { swapIndex: this.swapIndex, abPick: this.abPick, feel: this.activeSwapFamily },
        bubbles: true,
        composed: true,
      }));
    }
    if (changedProperties.has('progression') && this.progression?.chords) {
      let changed = false;
      const nextVoice = { ...this.padVoice };
      this.progression.chords.forEach((c, i) => {
        if (c.voicing && typeof nextVoice[`${i}`] !== 'number') {
          const z = voicingToZone(c.voicing);
          if (z >= 0) {
            nextVoice[`${i}`] = z;
            changed = true;
          }
        }
      });
      if (changed) {
        this.padVoice = nextVoice;
      }
    }
  }

  private handleWindowKeyDown = (e: KeyboardEvent) => {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || (active as HTMLElement).isContentEditable)) {
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const key = e.key.toUpperCase();
    const idx = PAD_KEYS.indexOf(key);
    if (idx >= 0 && this.progression?.chords?.[idx]) {
      e.preventDefault();
      this.handlePadKey(e, idx);
    }
  };

  private handlePadDown(e: PointerEvent, index: number) {
    const chord = this.progression?.chords?.[index];
    if (!chord) return;

    let voicing = 'low, root position';
    let zone = 2; // 0 = Octave Up, 1 = 1st Inversion, 2 = Low Root
    let reach: number | null = null;

    const target = e.currentTarget as HTMLElement;
    if (target) {
      try { target.setPointerCapture(e.pointerId); } catch {}
      if (target.getBoundingClientRect && typeof e.clientY === 'number') {
        const r = target.getBoundingClientRect();
        const y = Math.min(0.999, Math.max(0, (e.clientY - r.top) / (r.height || 1)));
        zone = y < 0.34 ? 0 : (y < 0.67 ? 1 : 2);
        voicing = zone === 0 ? 'up an octave' : (zone === 1 ? '1st inversion' : 'low, root position');

        const lad = this.getChordLadder(chord);
        const pl = parseFloat(getComputedStyle(target).paddingLeft) || 14;
        const x = Math.min(0.999, Math.max(0, (e.clientX - r.left - pl) / ((r.width - 2 * pl) || 1)));
        reach = Math.min(lad.length - 1, Math.max(0, Math.floor(x * lad.length)));
      }
    }

    const vel = 88 + (index % 3) * 6;
    clearTimeout(this.padTimer);
    clearTimeout(this.gridTimer);

    this.padHeld = index;
    this.gridFor = index;
    this.lastPad = { idx: index, voicing, vel, zone, reach };

    const lad = this.getChordLadder(chord);
    const activeChordName = (reach !== null && lad[reach]) ? lad[reach] : chord.name;
    const key = this.progression?.key || 'C';
    const scaleType = this.progression?.scaleType || 'MAJOR';
    const notes = notesForSymbol(activeChordName, preferFlatSpelling(key, scaleType));

    playbackEngine.playChordNotes(notes, 0.85, voicing, vel);

    this.dispatchEvent(new CustomEvent('chord-play', {
      detail: { index, chord, voicing, activeChordName },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  private handlePadMove(e: PointerEvent, index: number) {
    if (this.padHeld !== index) return;
    const chord = this.progression?.chords?.[index];
    if (!chord) return;

    const target = e.currentTarget as HTMLElement;
    if (target && target.getBoundingClientRect && typeof e.clientY === 'number') {
      const r = target.getBoundingClientRect();
      const y = Math.min(0.999, Math.max(0, (e.clientY - r.top) / (r.height || 1)));
      const zone = y < 0.34 ? 0 : (y < 0.67 ? 1 : 2);
      const voicing = zone === 0 ? 'up an octave' : (zone === 1 ? '1st inversion' : 'low, root position');

      const lad = this.getChordLadder(chord);
      const pl = parseFloat(getComputedStyle(target).paddingLeft) || 14;
      const x = Math.min(0.999, Math.max(0, (e.clientX - r.left - pl) / ((r.width - 2 * pl) || 1)));
      const reach = Math.min(lad.length - 1, Math.max(0, Math.floor(x * lad.length)));

      if (this.lastPad?.zone !== zone || this.lastPad?.reach !== reach) {
        this.lastPad = { idx: index, voicing, vel: this.lastPad?.vel || 90, zone, reach };
        const activeChordName = (reach !== null && lad[reach]) ? lad[reach] : chord.name;
        const key = this.progression?.key || 'C';
        const scaleType = this.progression?.scaleType || 'MAJOR';
        const notes = notesForSymbol(activeChordName, preferFlatSpelling(key, scaleType));
        playbackEngine.playChordNotes(notes, 0.5, voicing, 85);
        this.requestUpdate();
      }
    }
  }

  private handlePadUp(e?: PointerEvent, index?: number) {
    const target = e?.currentTarget as HTMLElement;
    if (target && e?.pointerId !== undefined) {
      try { target.releasePointerCapture(e.pointerId); } catch {}
    }

    if (this.padHeld === null) return;
    const heldIdx = this.padHeld;
    const lp = this.lastPad;
    this.padHeld = null;

    clearTimeout(this.gridTimer);
    this.gridTimer = setTimeout(() => {
      if (this.padHeld === null) {
        this.gridFor = null;
        this.requestUpdate();
      }
    }, 600);

    if (lp && lp.idx === heldIdx && this.progression && this.progression.chords[heldIdx]) {
      const chord = this.progression.chords[heldIdx];
      this.padVoice = { ...this.padVoice, [`${heldIdx}`]: lp.zone };

      let updatedChord: ChordBlock = { ...chord, voicing: lp.voicing };

      if (typeof lp.reach === 'number') {
        const lad = this.getChordLadder(chord);
        const reachedName = lad[lp.reach];
        if (reachedName) {
          const key = this.progression.key || 'C';
          const scaleType = this.progression.scaleType || 'MAJOR';
          const notes = notesForSymbol(reachedName, preferFlatSpelling(key, scaleType));
          updatedChord = {
            ...updatedChord,
            name: reachedName,
            notes,
          };
        }
      }

      const chords = [...this.progression.chords];
      chords[heldIdx] = updatedChord;
      this.progression = { ...this.progression, chords };

      this.lastPad = { ...lp, reach: null };

      playbackEngine.setProgression(this.progression);

      this.dispatchEvent(new CustomEvent('progression-update', {
        detail: { chords },
        bubbles: true,
        composed: true,
      }));
      this.dispatchEvent(new CustomEvent('progression-change', {
        detail: this.progression,
        bubbles: true,
        composed: true,
      }));
    }
    this.requestUpdate();
  }

  private handlePadKey(e: KeyboardEvent, index: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const chord = this.progression?.chords?.[index];
      if (!chord) return;
      this.padHeld = index;
      setTimeout(() => {
        if (this.padHeld === index) this.padHeld = null;
        this.requestUpdate();
      }, 200);
      const key = this.progression?.key || 'C';
      const scaleType = this.progression?.scaleType || 'MAJOR';
      const notes = chord.notes && chord.notes.length > 0
        ? chord.notes
        : notesForSymbol(chord.name, preferFlatSpelling(key, scaleType));
      playbackEngine.playChordNotes(notes, 0.85, chord.voicing || '1st inversion', 90);
      this.dispatchEvent(new CustomEvent('chord-play', {
        detail: { index, chord },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private openSwap(index: number) {
    if (this.swapIndex === index) {
      this.swapIndex = null;
    } else {
      this.swapIndex = index;
      this.abPick = null;
    }
    this.requestUpdate();
  }

  private openDetail(index: number) {
    const chord = this.progression?.chords?.[index];
    this.dispatchEvent(new CustomEvent('chord-detail-open', {
      detail: { index, chord },
      bubbles: true,
      composed: true,
    }));
  }

  private getSwapFeelings(swapIndex: number): SwapFeelItem[] {
    if (!this.progression || !this.chordData.scales) return [];
    const isMinor = this.progression.scaleType?.includes('MINOR') ?? false;
    const groups = generateTheoryGroups(this.chordData, this.progression, swapIndex);
    const borrowedRows = generateBorrowedChords(this.chordData, this.progression, swapIndex);

    const feels: SwapFeelItem[] = groups.map(g => ({
      name: g.name,
      sub: g.sub || '',
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
    const allGroups = [...ordered, ...borrowed];

    const activeBand = this.selectedBand ? getBandById(this.selectedBand) : null;
    if (activeBand) {
      const candidates = getBandTrickCandidates(
        this.progression.key || 'C',
        this.progression.scaleType || 'MAJOR',
        activeBand.name
      );
      const trickMap = new Map(candidates.map(c => [c.chordName, c]));

      allGroups.forEach(group => {
        const rows = group.rows.map(r => {
          const trick = trickMap.get(r.name);
          if (trick) {
            return {
              ...r,
              bandTag: `${activeBand.name} move`,
              bandColor: activeBand.color,
              sub: this.showTheory ? trick.theory : trick.plain,
            };
          }
          return r;
        });
        group.rows = rows;
      });
    }

    return allGroups;
  }

  willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('progression')) {
      const chords = this.progression?.chords || [];
      if (!this.baseChords.length || this.baseChords.length !== chords.length) {
        this.baseChords = [...chords];
      }
    }
  }

  private handleSwapAudition(detail: { chordName?: string; roman?: string; notes?: string[]; sub?: string; tension?: number; feel?: string; chord?: ChordBlock }) {
    if (this.swapIndex === null) return;
    const swapIdx = this.swapIndex;
    const current = this.progression.chords[swapIdx];
    const key = this.progression?.key || 'C';
    const scaleType = this.progression?.scaleType || 'MAJOR';
    const name = detail.chordName || detail.chord?.name || current?.name || 'C';
    const notes = detail.notes && detail.notes.length > 0
      ? detail.notes
      : (detail.chord?.notes && detail.chord.notes.length > 0
        ? detail.chord.notes
        : notesForSymbol(name, preferFlatSpelling(key, scaleType)));

    const newChord: ChordBlock = detail.chord || {
      ...current,
      name,
      roman: detail.roman || current?.roman || '',
      functionLabel: detail.sub || current?.functionLabel || 'LIFTING',
      tension: detail.tension ?? current?.tension ?? 0.3,
      voicing: current?.voicing || '1st inversion',
      notes,
    };

    this.abPick = newChord;
    const updatedChords = [...this.progression.chords];
    updatedChords[swapIdx] = newChord;

    this.dispatchEvent(new CustomEvent('progression-update', {
      detail: { chords: updatedChords },
      bubbles: true,
      composed: true,
    }));

    playbackEngine.playChordNotes(notes, 0.85, newChord.voicing || '1st inversion', 92);
    this.requestUpdate();
  }

  /** Replaces a bar's chord with the active band's suggested move for it. */
  private applyBandMove(index: number, move: { name: string; chord: string; roman: string; role: string }) {
    const current = this.progression.chords[index];
    if (!current) return;
    const key = this.progression?.key || 'C';
    const scaleType = this.progression?.scaleType || 'MAJOR';
    const notes = notesForSymbol(move.chord, preferFlatSpelling(key, scaleType));
    const newChord: ChordBlock = {
      ...current,
      name: move.chord,
      roman: move.roman,
      functionLabel: move.role,
      tag: 'borrowed',
      notes,
      desc: `${move.chord} is ${move.name}.`,
    };
    const updated = [...this.progression.chords];
    updated[index] = newChord;
    this.dispatchEvent(new CustomEvent('progression-update', { detail: { chords: updated }, bubbles: true, composed: true }));
    playbackEngine.playChordNotes(notes, 0.85, newChord.voicing || '1st inversion', 92);
  }

  private confirmSwap(e: CustomEvent<{ chord: ChordBlock; index: number }>) {
    const swapIdx = this.swapIndex;
    if (swapIdx === null) return;
    const newChord = e.detail.chord;
    const updatedChords = [...this.progression.chords];
    updatedChords[swapIdx] = newChord;

    this.dispatchEvent(new CustomEvent('progression-update', {
      detail: { chords: updatedChords },
      bubbles: true,
      composed: true,
    }));

    this.swapIndex = null;
    this.abPick = null;
    this.requestUpdate();
  }

  private updateChordCount(delta: number) {
    const current = this.progression.chords.length;
    const next = Math.max(4, Math.min(8, current + delta));
    if (next === current) return;
    this.dispatchEvent(new CustomEvent('set-chord-count', {
      detail: { count: next },
      bubbles: true,
      composed: true,
    }));
  }

  private onReroll() {
    this.baseChords = [];
    this.swapIndex = null;
    this.dispatchEvent(new CustomEvent('reroll', { bubbles: true, composed: true }));
  }

  private onVibeClick() {
    this.baseChords = [];
    this.swapIndex = null;
    this.dispatchEvent(new CustomEvent('open-vibe-picker', { bubbles: true, composed: true }));
  }

  render() {
    const chords = this.progression.chords || [];
    const activeBand = this.selectedBand ? getBandById(this.selectedBand) : null;
    const padCols = this.padCols;

    const lp = this.lastPad;
    const nowLabel = lp ? (chords[Math.min(lp.idx, chords.length - 1)]?.name ?? '\u2014') : '\u2014';
    const nowSub = lp
      ? `${lp.voicing} \u00B7 velocity ${lp.vel}`
      : `Press a chord. Nearer the top of a card plays a higher voicing.${padCols === 4 ? ' Home-row keys A S D F play them too.' : ''}`;

    const diatonicList = this.showTheory
      ? getDiatonicScaleDegreeList(this.progression.key || 'C', this.progression.scaleType || 'MAJOR', this.chordData, this.progression)
      : [];

    return html`
      <!-- 1. Header Context Row -->
      <div class="tab-header-row">
        <button class="vibe-pill-btn" @click=${this.onVibeClick} title="Vibe, genre and mood" aria-label="Select vibe and style">
          <span class="vibe-dot" style="background: ${this.moodColor};"></span>
          <span class="vibe-summary-text">${this.progression.genre || 'Pop'} · ${(this.progression.mood || 'Emotional').toLowerCase()}${activeBand ? ` · ${activeBand.name}` : ''}</span>
          <span style="display: none;">${this.progression.mood} ${this.progression.genre} ${this.progression.bpm} BPM</span>
          <span class="vibe-arrow">▾</span>
        </button>

        <div class="header-actions">
          <div class="chord-count-stepper">
            <button
              class="stepper-btn"
              @click=${() => this.updateChordCount(-1)}
              ?disabled=${chords.length <= 4}
              aria-label="Decrease chord count"
            >−</button>
            <span class="chord-count-label">${chords.length} chords</span>
            <button
              class="stepper-btn"
              @click=${() => this.updateChordCount(1)}
              ?disabled=${chords.length >= 8}
              aria-label="Increase chord count"
            >+</button>
          </div>

          <button class="try-another-btn" @click=${this.onReroll} aria-label="Try another progression">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="6" fill="${this.moodColor}"/>
              <circle cx="8" cy="8" r="1.7" fill="#2E271F"/>
              <circle cx="16" cy="8" r="1.7" fill="#2E271F"/>
              <circle cx="12" cy="12" r="1.7" fill="#2E271F"/>
              <circle cx="8" cy="16" r="1.7" fill="#2E271F"/>
              <circle cx="16" cy="16" r="1.7" fill="#2E271F"/>
            </svg>
            <span>Try another</span>
          </button>
        </div>
      </div>

      <!-- 2. Band DNA Legend Banner -->
      ${activeBand ? html`
        <div class="band-legend-banner">
          <div class="band-legend-info">
            <div class="band-swatch" style="background: ${activeBand.color};"></div>
            <div>
              <div class="band-title">${activeBand.name}</div>
              <div class="band-tagline">${activeBand.tagline || activeBand.plain}</div>
            </div>
          </div>
          <button
            class="band-dismiss-btn"
            @click=${() => this.dispatchEvent(new CustomEvent('clear-band', { bubbles: true, composed: true }))}
            aria-label="Dismiss band archetype"
          >×</button>
        </div>
      ` : ''}

      <!-- 3. Chord Pads Grid -->
      <div class="pad-cells-grid" style="--mood-tint: ${this.moodColor};">
        ${chords.map((c, i) => {
          const role = roleForTension(c.tension || 0.1);
          const isLit = this.activeIndex === i && this.isPlaying;
          const isHeld = this.padHeld === i;
          const isSelected = this.swapIndex === i;
          const bandMove = activeBand ? getBandMoveForChord(c, activeBand.name, this.progression.key || 'C', this.progression.scaleType || 'MAJOR') : null;
          const laneAfterIdx = Math.min(chords.length - 1, (Math.floor((this.swapIndex ?? 0) / padCols) + 1) * padCols - 1);

          const lad = this.getChordLadder(c);
          const rung = this.ladderHome(c);
          const lp = this.lastPad;
          const lastHere = lp !== null && lp.idx === i;
          const zone = lastHere && lp ? lp.zone : -1;
          const reached = lastHere && lp && typeof lp.reach === 'number' ? lp.reach : rung;
          const showsReach = Boolean(lastHere && reached >= 0 && reached !== rung && lad[reached]);
          const gridOn = this.gridFor === i && lad.length > 1;
          const chordZone = voicingToZone(c.voicing);
          const vz = typeof this.padVoice[`${i}`] === 'number'
            ? this.padVoice[`${i}`]
            : (chordZone >= 0 ? chordZone : -1);
          const zoneSet = isHeld && zone >= 0 ? zone : vz;
          const hitCol = isHeld && lastHere && lp && typeof lp.reach === 'number'
            ? lp.reach
            : (zoneSet >= 0 ? rung : -1);

          const L = Math.max(1, lad.length);
          const colW = `calc((100% - 28px - ${4 * (L - 1)}px) / ${L})`;
          const colLeft = (k: number) => `calc(14px + ${k} * (((100% - 28px - ${4 * (L - 1)}px) / ${L}) + 4px))`;

          const rungLabels = this.getRungLabels(lad);
          const dotAt = showsReach ? reached : rung;
          const metaText = isHeld && showsReach
            ? `→ ${lad[reached]}`
            : (zoneSet >= 0 ? ZONE_NAMES[zoneSet] : (c.voicing ? c.voicing.toUpperCase() : ''));

          return html`
            <div class="pad-cell-column">
              <div
                class="pad-cell ${isHeld ? 'pad-held' : ''} ${isSelected ? 'selected' : ''} ${isLit ? 'pad-lit' : ''}"
                style="background: ${role.color};"
                role="button"
                tabindex="0"
                @pointerdown=${(e: PointerEvent) => this.handlePadDown(e, i)}
                @pointermove=${(e: PointerEvent) => this.handlePadMove(e, i)}
                @pointerup=${(e: PointerEvent) => this.handlePadUp(e, i)}
                @pointerleave=${(e: PointerEvent) => this.handlePadUp(e, i)}
                @pointercancel=${(e: PointerEvent) => this.handlePadUp(e, i)}
                @keydown=${(e: KeyboardEvent) => this.handlePadKey(e, i)}
                aria-label="${c.name}, ${ROLE_PLAIN[c.functionLabel] || 'in this loop'} — press to play; press nearer the top for a higher voicing"
              >
                <!-- 2D Voicing & Extension Grid Visualizer -->
                <div class="pad-grid-visualizer">
                  ${lad.map((_, li) => html`
                    <div
                      class="grid-col ${li === hitCol ? 'active-col' : ''} ${gridOn ? 'visible' : ''}"
                      style="left: ${colLeft(li)}; width: ${colW};"
                    ></div>
                  `)}
                  ${hitCol >= 0 && zoneSet >= 0 ? html`
                    <div
                      class="grid-hit-pill"
                      style="
                        left: ${colLeft(hitCol)};
                        width: ${colW};
                        top: calc(6px + ${zoneSet} * ((100% - 12px) / 3));
                        height: calc((100% - 12px) / 3 - 3px);
                      "
                    ></div>
                  ` : ''}
                </div>

                <div class="pad-top-row">
                  <div class="pad-key-badge">
                    <span class="pad-key-cap">${PAD_KEYS[i] || ''}</span>
                  </div>
                  ${this.showTheory && c.roman ? html`<span class="pad-roman-badge">${c.roman}</span>` : ''}
                </div>

                <div class="pad-bottom-info">
                  <div class="pad-role-label">${ROLE_PLAIN[c.functionLabel] || c.functionLabel}</div>
                  <div class="pad-chord-name">${c.name}</div>
                  <div class="pad-meta-label ${showsReach ? 'reach-active' : ''}">${metaText}</div>

                  <div class="rung-dots">
                    ${lad.map((_, li) => html`
                      <div class="rung-step-col">
                        <div
                          class="rung-step-label ${li === dotAt ? 'active' : ''}"
                          style="${li === dotAt && showsReach ? `color: ${this.moodColor};` : ''}"
                        >
                          ${rungLabels[li]}
                        </div>
                        <div
                          class="rung-dot rung-step-bar ${li === dotAt ? 'filled active' : ''}"
                          style="${li === dotAt && showsReach ? `background: ${this.moodColor};` : ''}"
                        ></div>
                      </div>
                    `)}
                  </div>

                  ${bandMove ? html`
                    <button
                      class="band-move-pill"
                      style="border-left: 3px solid ${activeBand?.color || '#2E271F'};"
                      title="Play ${bandMove.chord} here: ${bandMove.name}"
                      aria-label="Use ${activeBand?.name} move ${bandMove.name}: ${bandMove.chord} in bar ${i + 1}"
                      @click=${(e: MouseEvent) => { e.stopPropagation(); this.applyBandMove(i, bandMove); }}
                      @pointerdown=${(e: Event) => e.stopPropagation()}
                    >
                      <span>${bandMove.name}: ${bandMove.chord}</span>
                      <span class="band-move-use">Use</span>
                    </button>
                  ` : ''}
                </div>
              </div>

              <button
                class="pad-tray-btn pad-swap-btn ${isSelected ? 'active' : ''}"
                @click=${(e: MouseEvent) => { e.stopPropagation(); this.openSwap(i); }}
                aria-label="${isSelected ? 'Close' : 'Swap'} swaps for ${c.name}"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>
                </svg>
                <span>${isSelected ? 'Close' : 'Swap'}</span>
              </button>
            </div>

            <!-- Swap Lane extrusion below the row containing the selected pad -->
            ${this.swapIndex !== null && i === laneAfterIdx ? html`
              <chord-swap-lane
                .swapIndex=${this.swapIndex}
                .chord=${chords[this.swapIndex]}
                .baseChord=${this.baseChords[this.swapIndex] || chords[this.swapIndex]}
                .feelings=${this.getSwapFeelings(this.swapIndex)}
                .activeFeel=${this.activeSwapFamily}
                .pickedChord=${this.abPick}
                .padCols=${Math.min(chords.length, padCols)}
                .moodColor=${this.moodColor}
                .band=${activeBand ? { name: activeBand.name, color: activeBand.color, plain: activeBand.plain } : null}
                @swap-feel-change=${(e: CustomEvent) => { this.activeSwapFamily = e.detail.feel; this.requestUpdate(); }}
                @swap-audition=${(e: CustomEvent) => this.handleSwapAudition(e.detail)}
                @swap-confirm=${this.confirmSwap}
                @swap-close=${() => { this.swapIndex = null; this.requestUpdate(); }}
              ></chord-swap-lane>
            ` : ''}
          `;
        })}

        <div class="add-chord-row">
          <button class="add-chord-btn" @click=${() => this.updateChordCount(1)} ?disabled=${chords.length >= 8} aria-label="Add a chord to the loop">
            <span class="plus">+</span>
            <span>Add chord</span>
            <span class="count">${chords.length} of 8</span>
          </button>
          ${chords.length > 4 ? html`
            <button class="remove-chord-btn" @click=${() => this.updateChordCount(-1)} aria-label="Remove the last chord">−</button>
          ` : ''}
        </div>
      </div>

      <!-- 4. Diatonic Scale Strip (Theory Mode) -->
      ${this.showTheory && diatonicList.length ? html`
        <div class="scale-diatonic-strip">
          <div class="scale-strip-header-row">
            <div class="scale-strip-kicker">Scale · ${(this.progression.key || 'C').replace('b', '♭')} ${(this.progression.scaleType || 'MAJOR').toLowerCase() === 'minor' ? 'natural minor' : 'major'}</div>
            <div class="scale-strip-hint">
              ${this.auditionDeg === null || this.auditionDeg < 0
                ? 'Tap a degree to hear it'
                : (this.auditionBar ? `${this.auditionName} · bar ${this.auditionBar} of the loop` : `${this.auditionName} · not in this loop`)}
            </div>
          </div>
          <div class="scale-degrees-grid">
            ${diatonicList.map((d, di) => {
              const chordNamesInLoop = (this.progression.chords || []).map(c => c.name.toUpperCase());
              const loopBarIdx = chordNamesInLoop.indexOf(d.chordName.toUpperCase());
              const inLoop = loopBarIdx >= 0;
              const isAuditioned = this.auditionDeg === di;

              return html`
                <button
                  class="scale-degree-btn scale-degree-chip ${inLoop ? 'in-loop' : ''} ${isAuditioned ? 'active' : ''}"
                  style="${isAuditioned ? `background: ${this.moodColor};` : ''}"
                  @click=${() => {
                    this.auditionDeg = di;
                    this.auditionName = d.chordName;
                    this.auditionBar = inLoop ? loopBarIdx + 1 : 0;
                    const key = this.progression.key || 'C';
                    const scaleType = this.progression.scaleType || 'MAJOR';
                    const notes = d.notes && d.notes.length ? d.notes : notesForSymbol(d.chordName, preferFlatSpelling(key, scaleType));
                    playbackEngine.playChordNotes(notes, 0.8, '1st inversion', 88);
                    this.dispatchEvent(new CustomEvent('chord-play', {
                      detail: { chord: { name: d.chordName, notes }, index: inLoop ? loopBarIdx : 0 },
                      bubbles: true,
                      composed: true,
                    }));
                  }}
                  aria-label="Hear ${d.chordName}, the ${d.functionLabel.toLowerCase()}"
                >
                  <div class="degree-head-row">
                    <span class="degree-roman">${d.roman}</span>
                    ${inLoop ? html`<div class="degree-in-loop-dot"></div>` : ''}
                  </div>
                  <div class="degree-name">${d.chordName}</div>
                  <div class="degree-fn">${d.functionLabel}</div>
                </button>
              `;
            })}
          </div>
        </div>
      ` : ''}

      <!-- 5. Playing now (last pad pressed) -->
      <div class="now-playing-row" aria-live="polite">
        <span class="now-kicker">Playing now</span>
        <span class="now-label">${nowLabel}</span>
        <span class="now-sub">${nowSub}</span>
      </div>
    `;
  }
}

