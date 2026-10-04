import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Progression,
  ChordBlock,
  getMoodColor,
  roleForTension,
  notesForSymbol,
  preferFlatSpelling,
} from '../../services/chord-engine';
import {
  MelodyTrack,
  MelodyNote,
  GuideMode,
  ContourArchetype,
  melodyEngine,
  getHarmonicChordMatrix,
  classifyPitch,
  snapNoteToGuide,
  HarmonicChordMatrix,
  NoteAnalysis,
} from '../../services/melody-engine';
import { midiToNoteName, playLeadNote } from '../../services/audio-service';
import { noteToMidiNumber } from '../../services/export-service';

const ROLE_PLAIN: Record<string, string> = {
  Tonic: 'HOME',
  Submediant: 'DRIFTING',
  Subdominant: 'LIFTING',
  Supertonic: 'STEPPING UP',
  Mediant: 'WISTFUL',
  Dominant: 'PULLING HOME',
  'Dominant 7th': 'PULLING HOME',
};

interface PianoKeySpec {
  name: string;
  pc: number;
  left: number;
}

const WHITE_KEYS: PianoKeySpec[] = [
  { name: 'C', pc: 0, left: 12 },
  { name: 'D', pc: 2, left: 53 },
  { name: 'E', pc: 4, left: 94 },
  { name: 'F', pc: 5, left: 135 },
  { name: 'G', pc: 7, left: 176 },
  { name: 'A', pc: 9, left: 217 },
  { name: 'B', pc: 11, left: 258 },
];

const BLACK_KEYS: PianoKeySpec[] = [
  { name: 'C#', pc: 1, left: 38 },
  { name: 'D#', pc: 3, left: 79 },
  { name: 'F#', pc: 6, left: 161 },
  { name: 'G#', pc: 8, left: 202 },
  { name: 'A#', pc: 10, left: 243 },
];

@customElement('tab-melody')
export class TabMelody extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    .melody-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      position: relative;
    }

    /* Panel Header Row */
    .panel-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .small-caps-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .note-count {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }

    /* Quick Action Controls */
    .quick-actions-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .quick-chip {
      background: rgba(251, 243, 230, 0.72);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 100px;
      padding: 5px 12px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 150ms ease, transform 120ms ease;
    }

    .quick-chip:hover {
      background: #FBF3E6;
    }

    .quick-chip:active {
      transform: scale(0.96);
    }


    .try-another-btn {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-cream, #FBF3E6);
      color: var(--cv-ink, #2E271F);
      min-height: 32px;
      padding: 0 13px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 150ms ease, transform 120ms ease;
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.06);
    }


    .try-another-btn:hover {
      background: #FFFFFF;
      box-shadow: 0 2px 4px rgba(46, 39, 31, 0.08);
    }

    .try-another-btn:active {
      transform: scale(0.97);
    }

    .clear-text-btn {
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #7A6F62);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: color 150ms ease, background 150ms ease;
    }

    .clear-text-btn:hover {
      color: #A34848;
      background: rgba(163, 72, 72, 0.08);
    }

    /* Tier-2 Segmented Control */
    .segmented-control {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 3px;
    }

    .segment-btn {
      min-height: 28px;
      padding: 0 12px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      background: transparent;
      color: var(--cv-ink-muted, #5B5145);
      transition: background 150ms ease, color 150ms ease, box-shadow 150ms ease;
    }

    .segment-btn:hover {
      color: var(--cv-ink, #2E271F);
    }

    .segment-btn.active {
      background: #FBF3E6;
      color: #2E271F;
      font-weight: 800;
      box-shadow: inset 0 0 0 1px rgba(46, 39, 31, 0.1), 0 1px 2px rgba(46, 39, 31, 0.12);
    }


    /* Loop Span Bar Underline on Step Cells */
    .loop-span-bar {
      position: absolute;
      left: -2px;
      right: -2px;
      bottom: 2px;
      height: 4px;
      background: var(--span-accent, #9B7CA8);
      pointer-events: none;
      z-index: 3;
    }

    .loop-span-bar.span-start {
      left: 6px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .loop-span-bar.span-end {
      right: 6px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    /* Melody Grid Sequencer Stage (Matches MelodyGrid.dc.html) */
    .melody-grid-stage {
      position: relative;
      background: transparent;
      border: none;
      padding: 0 0 160px;
      width: 100%;
      box-sizing: border-box;
      overflow: visible;
    }

    .melody-grid-inner {
      min-width: 680px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* Step numbers header 1..16 */
    .step-numbers-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 0 16px;
    }

    .lane-spacer {
      width: 140px;
      flex-shrink: 0;
    }

    .step-numbers-track {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(16, minmax(0, 1fr));
      gap: 4px;
    }

    .step-num-col {
      text-align: center;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10.5px;
      font-weight: 700;
      color: #B3A590;
      user-select: none;
      transition: color 100ms ease;
    }

    .step-num-col.active {
      color: #9B7CA8;
      font-weight: 800;
    }

    /* 4-Bar Chord Lanes (tinted with tension color per MelodyGrid.dc.html) */
    .bars-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .chord-lane.bar-column {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 16px;
      border-radius: 22px;
      background: var(--chord-bg, #9CC0EC);
      box-shadow: 0 10px 22px -14px rgba(46, 39, 31, 0.4);
      transition: background 150ms ease, box-shadow 150ms ease, transform 120ms ease;
    }

    .chord-lane.bar-column.playing-bar {
      box-shadow: inset 0 0 0 2.5px #2E271F, 0 10px 22px -14px rgba(46, 39, 31, 0.4);
    }

    /* Chord Badge (Left column of lane) */
    .lane-chord-badge {
      width: 140px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: transparent;
      user-select: none;
    }

    .bar-role {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.62);
      line-height: 1.2;
    }

    .bar-chord-info {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    .bar-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.01em;
      line-height: 1.1;
    }

    .bar-chord-roman {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: #8A6B3F;
    }

    /* Step number (invisible or subtle for screen readers & tests) */
    .step-number {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
    }

    /* 16 Steps Row Across the Lane */
    .steps-16-grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(16, minmax(0, 1fr));
      gap: 4px;
      align-items: center;
      position: relative;
    }

    /* Step Cell (circular pad) */
    .step-cell {
      position: relative;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      border-radius: 50%;
      background: transparent;
      transition: transform 120ms ease;
      touch-action: none;
    }

    .step-cell:hover {
      transform: scale(1.08);
    }

    .step-cell:active {
      transform: scale(0.95);
    }

    .step-cell.is-tail-step {
      cursor: grab;
    }

    .step-cell.is-tail-step:active {
      cursor: grabbing;
    }

    /* Empty dot placeholder (Matches MelodyGrid.dc.html:189,532 & Image 1) */
    .empty-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.35);
      transition: background 150ms ease, transform 120ms ease;
    }

    .step-cell:hover .empty-dot {
      background: rgba(251, 243, 230, 0.7);
      transform: scale(1.2);
    }

    /* Active Note Chip / Circle (Matches MelodyGrid.dc.html:530-552 & Image 1) */
    .note-pad {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 13px;
      font-weight: 700;
      line-height: 1;
      box-sizing: border-box;
      transition: transform 120ms ease, box-shadow 120ms ease;
      background: #FFFFFF;
      color: #2E271F;
      border: none;
      box-shadow: 0 1px 3px rgba(46, 39, 31, 0.15);
    }

    /* Sustained / Tied Step (Mini dot connector per MelodyGrid.dc.html:547 & Image 1) */
    .note-pad.tied-step {
      width: 14px;
      height: 14px;
      background: rgba(251, 243, 230, 0.95);
      border: none;
      box-shadow: none;
      z-index: 2;
      transition: transform 120ms ease, background 120ms ease;
    }

    .step-cell.is-tail-step:hover .note-pad.tied-step {
      transform: scale(1.2);
    }

    .note-badge {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 13px;
      font-weight: 700;
      line-height: 1;
      user-select: none;
      color: #2E271F;
    }

    /* Tie duration line connecting sustained steps (Matches MelodyGrid.dc.html:83, 548) */
    .tie-bar {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 8px;
      border-radius: 4px;
      background: rgba(251, 243, 230, 0.95);
      z-index: 1;
      pointer-events: none;
    }

    .tie-bar.tie-start {
      left: 50%;
      width: calc(50% + 4px);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .tie-bar.tie-mid {
      left: -2px;
      width: calc(100% + 4px);
      border-radius: 0;
    }

    .tie-bar.tie-end {
      left: -2px;
      width: calc(50% + 2px);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    /* Tail Grip Handle at end of note - Invisible hit area, NO vertical divider bar (Image 1 parity) */
    .tail-grip {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 18px;
      cursor: grab;
      z-index: 5;
      touch-action: none;
    }

    .tail-grip:active {
      cursor: grabbing;
    }

    /* Host dragging state */
    :host([dragging-tail]) {
      cursor: grabbing !important;
      user-select: none !important;
    }

    :host([dragging-tail]) .step-cell,
    :host([dragging-tail]) .tail-grip {
      cursor: grabbing !important;
    }

    /* Active Playhead Ring */
    .step-cell.active-step .empty-dot {
      background: #9B7CA8;
      box-shadow: 0 0 0 2.5px #9B7CA8;
      transform: scale(1.3);
    }

    .step-cell.active-step .note-pad {
      box-shadow: 0 0 0 3px #9B7CA8, 0 3px 10px rgba(155, 124, 168, 0.35);
      transform: scale(1.12);
    }

    /* Note Bloom Popover Overlay (Matches MelodyGrid.dc.html:92-105 & Image 1) */
    .bloom-overlay {
      position: absolute;
      top: -12px;
      left: -12px;
      right: -12px;
      bottom: -12px;
      z-index: 30;
      background: rgba(251, 243, 230, 0.35);
      border-radius: 28px;
      animation: bloom-fade-in 140ms ease-out;
    }

    @keyframes bloom-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .bloom-popover {
      position: absolute;
      width: 308px;
      height: 144px;
      background: #FBF3E6;
      border-radius: 18px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.12), 0 24px 60px rgba(46, 39, 31, 0.24);
      z-index: 35;
      box-sizing: border-box;
      user-select: none;
      animation: bloom-scale-in 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes bloom-scale-in {
      from { transform: scale(0.94); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .bloom-stem {
      position: absolute;
      width: 12px;
      height: 12px;
      background: #FBF3E6;
      transform: rotate(45deg);
      border-radius: 2px;
      z-index: 34;
      pointer-events: none;
    }

    /* Bloomed step ring & elevation (Matches MelodyGrid.dc.html:538,544) */
    .step-cell.is-bloomed {
      z-index: 32;
    }

    .empty-dot.bloomed-empty-ring {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent !important;
      box-shadow: 0 0 0 2.5px #2E271F;
      transform: none !important;
    }

    .step-cell.is-bloomed .note-pad {
      box-shadow: 0 0 0 2.5px #2E271F;
    }

    /* Dim other cells when bloom is active (Matches MelodyGrid.dc.html:547) */
    .melody-grid-stage.has-active-bloom .step-cell:not(.is-bloomed) {
      opacity: 0.25;
      transition: opacity 150ms ease;
    }

    .melody-grid-stage.has-active-bloom .step-cell.is-bloomed {
      opacity: 1;
    }

    .bloom-header {
      position: absolute;
      left: 12px;
      right: 12px;
      top: 10px;
      height: 30px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .bloom-nav-btn {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      color: #9A8B78;
      padding: 6px 8px;
      border-radius: 8px;
      transition: color 100ms ease, background 100ms ease;
    }

    .bloom-nav-btn:hover:not(:disabled) {
      color: #2E271F;
      background: #F1E4CC;
    }

    .bloom-nav-btn:disabled {
      opacity: 0;
      pointer-events: none;
    }

    .bloom-center-info {
      flex: 1;
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
      min-width: 0;
    }

    .bloom-pitch-title {
      font-size: 17px;
      font-weight: 600;
      color: #2E271F;
    }

    .bloom-role-label {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      color: #4A3F33;
      white-space: nowrap;
    }

    .bloom-clear-btn {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      color: #9A8B78;
      padding: 6px 7px;
      border-radius: 8px;
      transition: color 100ms ease, background 100ms ease;
    }

    .bloom-clear-btn:hover {
      color: #9B7CA8;
      background: #F1E4CC;
    }

    /* 7 White Keys (Matches MelodyGrid.dc.html:101, 594-595 & Image 1) */
    .white-key {
      position: absolute;
      top: 48px;
      width: 38px;
      height: 84px;
      border-radius: 5px 5px 9px 9px;
      background: #FFFAF2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
      padding-bottom: 7px;
      box-sizing: border-box;
      cursor: pointer;
      transition: background 100ms ease, color 100ms ease;
    }

    .white-key:hover:not(.disabled),
    .white-key.hovered:not(.disabled) {
      background: #2E271F !important;
      color: #FBF3E6 !important;
    }

    .white-key:hover:not(.disabled) .key-text,
    .white-key.hovered:not(.disabled) .key-text {
      color: #FBF3E6 !important;
    }

    .white-key.disabled {
      background: #E6DCCB !important;
      color: #A89A85 !important;
      cursor: not-allowed;
    }

    .white-key.disabled .key-text {
      color: #A89A85 !important;
    }

    /* 5 Black Keys (Matches MelodyGrid.dc.html:102, 596-597 & Image 1) */
    .black-key {
      position: absolute;
      top: 48px;
      width: 27px;
      height: 50px;
      border-radius: 3px 3px 6px 6px;
      background: #2E271F;
      box-shadow: 0 0 0 2px #FBF3E6;
      cursor: pointer;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
      box-sizing: border-box;
      z-index: 2;
      transition: background 100ms ease;
    }

    .black-key:hover:not(.disabled),
    .black-key.hovered:not(.disabled) {
      background: #4E4237 !important;
    }

    .black-key.disabled {
      background: #CDBFA9 !important;
      cursor: not-allowed;
    }

    /* 5px Purple Dot Indicator for Active Note (Matches MelodyGrid.dc.html:101-102 & Image 1) */
    .key-mark {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #9B7CA8;
      opacity: 0;
      transition: opacity 80ms ease;
      flex-shrink: 0;
    }

    .key-mark.visible {
      opacity: 1;
    }

    .key-text {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: #2E271F;
      line-height: 1;
    }
    /* ===== Mobile (Chroma Melody MelodyGrid device="mobile") ===== */
    :host([mobile]) {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      height: 100%;
    }

    .m-root {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .m-head {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 4px;
    }

    .m-head-left {
      display: flex;
      align-items: baseline;
      gap: 8px;
      min-width: 0;
    }

    .m-head .segment-btn {
      min-height: 32px;
      padding: 0 10px;
    }

    .m-tools {
      flex: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 4px;
    }

    .m-tools .try-another-btn {
      min-height: 38px;
    }

    .m-tools .clear-text-btn {
      min-height: 38px;
      padding: 0 10px;
    }

    .m-tools-spacer {
      flex: 1;
    }

    .m-view-toggle {
      display: flex;
      gap: 2px;
      background: rgba(46, 39, 31, 0.07);
      border-radius: 22px;
      padding: 3px;
      flex: none;
    }

    .m-view-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      background: transparent;
      display: grid;
      place-items: center;
      padding: 0;
      transition: background 150ms ease, transform 120ms ease;
    }

    .m-view-btn:hover {
      background: rgba(46, 39, 31, 0.08);
    }

    .m-view-btn:active {
      transform: scale(0.94);
    }

    .m-view-btn.active {
      background: #2E271F;
    }

    .m-view-btn.active:hover {
      background: #2E271F;
    }

    .m-ov-icon {
      display: grid;
      grid-template-columns: repeat(2, 7px);
      gap: 3px;
    }

    .m-ov-icon i {
      width: 7px;
      height: 7px;
      border-radius: 2px;
      background: #6B5F50;
    }

    .m-fc-icon {
      width: 17px;
      height: 17px;
      border-radius: 4px;
      background: #6B5F50;
    }

    .m-view-btn.active i,
    .m-view-btn.active .m-fc-icon {
      background: #FBF3E6;
    }

    .m-span-chip {
      flex: 0 1 auto;
      min-width: 0;
      height: 38px;
      padding: 0 5px 0 12px;
      border-radius: 19px;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      background: #F1E4CC;
      color: #2E271F;
    }

    .m-span-chip.editing {
      background: #9B7CA8;
      color: #FBF3E6;
    }

    .m-span-chip .mono {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
    }

    .m-span-chip .act {
      height: 28px;
      padding: 0 10px;
      border-radius: 14px;
      background: #FBF3E6;
      color: #2E271F;
      display: grid;
      place-items: center;
    }

    /* Overview: chord tiles, 2 per row, each a 4x4 dot grid */
    .m-overview {
      flex: 1 1 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 10px;
      padding: 0 4px;
    }

    .m-tile {
      min-height: 0;
      min-width: 0;
      overflow: hidden;
      border-radius: 22px;
      padding: 6px 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--chord-bg, #9CC0EC);
    }

    .m-tile.active {
      box-shadow: 0 0 0 1px #E4D6C0;
    }

    .m-tile.playing-bar {
      box-shadow: inset 0 0 0 2.5px #2E271F;
    }

    .m-tile-head {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .m-tile-name {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 4px 8px;
      border-radius: 12px;
    }

    .m-tile-name .bar-role {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .m-tile-name .name-line {
      display: flex;
      align-items: baseline;
      gap: 5px;
      min-width: 0;
    }

    .m-chord-name {
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2E271F;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .m-chord-roman {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      color: #6B5F50;
    }

    .m-expand {
      width: 34px;
      height: 30px;
      border-radius: 12px;
      border: none;
      background: transparent;
      color: rgba(46, 39, 31, 0.55);
      font-size: 15px;
      cursor: pointer;
      flex: none;
      transition: background 150ms ease, color 150ms ease;
    }

    .m-expand:hover {
      background: rgba(251, 243, 230, 0.6);
      color: #2E271F;
    }

    .m-cells {
      flex: 1 1 0;
      height: 0;
      min-height: 0;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-template-rows: repeat(4, minmax(0, 1fr));
      padding: 0 4px;
    }

    .m-cell {
      position: relative;
      min-height: 0;
      min-width: 0;
      container-type: size;
      display: grid;
      place-items: center;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    /* .step-cell is shared with the desktop lanes for drag hit-testing; neutralise its sizing here */
    .step-cell.m-cell {
      height: 100%;
      width: 100%;
      align-self: stretch;
      border-radius: 0;
      transform: none;
    }

    .m-cell .m-tie {
      position: absolute;
      top: 50%;
      height: 8px;
      margin-top: -4px;
      background: rgba(251, 243, 230, 0.95);
      pointer-events: none;
    }

    .m-cell .m-span {
      position: absolute;
      bottom: 1px;
      height: 3px;
      border-radius: 4px;
      background: #9B7CA8;
      pointer-events: none;
    }

    .m-dot {
      position: relative;
      z-index: 1;
      height: min(var(--dot, 28px), 84cqh);
      max-width: 90cqw;
      aspect-ratio: 1;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.35);
      display: grid;
      place-items: center;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: #2E271F;
      transition: background 120ms ease, box-shadow 120ms ease;
    }

    .m-cell:hover .m-dot.empty {
      background: rgba(251, 243, 230, 0.7);
    }

    .m-dot.note {
      background: #FFFAF2;
    }

    .m-dot.tail {
      background: rgba(251, 243, 230, 0.95);
    }

    .m-dot.playhead {
      background: #9B7CA8;
      color: #FBF3E6;
    }

    .m-dot.selected {
      box-shadow: 0 0 0 3px #F6EADB, 0 0 0 5px #9B7CA8;
    }

    /* Focus: chord tabs + one big 4x4 grid */
    .m-tabs {
      flex: none;
      display: flex;
      gap: 7px;
      overflow-x: auto;
      padding: 2px 4px;
      scrollbar-width: none;
    }

    .m-tabs::-webkit-scrollbar {
      display: none;
    }

    .m-tab {
      flex: 1 0 76px;
      height: 76px;
      border-radius: 18px;
      border: none;
      font-family: inherit;
      cursor: pointer;
      background: #F6EADB;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-width: 0;
      transition: background 150ms ease, transform 120ms ease;
    }

    .m-tab:active {
      transform: scale(0.97);
    }

    .m-tab.active {
      background: #F1E4CC;
      box-shadow: 0 0 0 1px #E4D6C0;
    }

    .m-tab .t-name {
      display: flex;
      align-items: baseline;
      gap: 4px;
      max-width: calc(100% - 8px);
      font-size: 12.5px;
      font-weight: 700;
      color: #6B5F50;
    }

    .m-tab.active .t-name {
      color: #2E271F;
    }

    .m-tab .t-name span:first-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .m-tab .t-name .roman {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 9px;
      font-weight: 400;
      color: #8A6B3F;
    }

    .m-mini {
      display: grid;
      grid-template-columns: repeat(4, 6px);
      gap: 3px;
    }

    .m-mini i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #E4D6C0;
    }

    .m-mini i.on {
      background: #6B5F50;
    }

    .m-mini i.head {
      background: #2E271F;
    }

    .m-mini i.now {
      background: #9B7CA8;
    }

    .m-focus-wrap {
      flex: 1;
      min-height: 0;
      container-type: size;
      display: flex;
      justify-content: center;
    }

    .m-focus-grid {
      width: 100cqmin;
      height: 100cqmin;
      border-radius: 26px;
      background: var(--chord-bg, #9CC0EC);
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-template-rows: repeat(4, minmax(0, 1fr));
    }

    .m-focus-grid .m-dot {
      font-size: 15px;
    }

    .m-focus-grid .m-tie {
      height: 14px;
      margin-top: -7px;
    }

    .m-focus-grid .m-span {
      bottom: 6px;
      height: 4px;
    }

    .m-step-no {
      position: absolute;
      left: 10px;
      top: 8px;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 9px;
      color: rgba(46, 39, 31, 0.4);
      pointer-events: none;
    }

    /* Note dock: micro keyboard (MobileDock.dc.html, embedded) */
    .m-dock {
      flex: none;
      position: relative;
      height: 124px;
      border-radius: 22px;
      background: #F6EADB;
      overflow: hidden;
    }

    .m-dock-bar {
      position: absolute;
      left: 6px;
      right: 6px;
      top: 6px;
      height: 36px;
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .m-dock-nav {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 12px;
      color: #6B5F50;
      height: 36px;
      min-width: 44px;
      padding: 0 8px;
      border-radius: 10px;
    }

    .m-dock-nav:active {
      background: #F1E4CC;
    }

    .m-dock-nav:disabled {
      opacity: 0;
      pointer-events: none;
    }

    .m-dock-note {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
    }

    .m-dock-note .pitch {
      font-size: 17px;
      font-weight: 600;
      color: #2E271F;
    }

    .m-dock-note .role {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      color: #6B5F50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .m-len {
      display: flex;
      align-items: center;
      height: 32px;
      border-radius: 16px;
      background: #F1E4CC;
      flex: none;
    }

    .m-len button {
      border: none;
      background: transparent;
      cursor: pointer;
      width: 30px;
      height: 32px;
      color: #2E271F;
      font-size: 14px;
      font-family: inherit;
    }

    .m-len button:active {
      color: #9B7CA8;
    }

    .m-len span {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      color: #2E271F;
      min-width: 24px;
      text-align: center;
    }

    .m-dock-clear {
      border: none;
      background: transparent;
      cursor: pointer;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      color: #6B5F50;
      height: 36px;
      padding: 0 8px;
      border-radius: 10px;
    }

    .m-dock-clear:active {
      color: #9B7CA8;
      background: #F1E4CC;
    }

    .m-keys {
      position: absolute;
      left: 8px;
      right: 8px;
      top: 46px;
      height: 72px;
    }

    .m-wk {
      position: absolute;
      top: 0;
      height: 72px;
      border: none;
      border-radius: 6px 6px 12px 12px;
      background: #FFFAF2;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      padding: 0 0 10px;
      box-sizing: border-box;
      font-family: inherit;
      transition: filter 100ms ease, transform 100ms ease;
    }

    .m-wk:active:not(:disabled) {
      transform: scale(0.97);
      filter: brightness(0.94);
    }

    .m-wk:disabled {
      background: #E6DCCB;
      cursor: not-allowed;
    }

    .m-wk .lbl {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 600;
      color: #2E271F;
    }

    .m-wk:disabled .lbl {
      color: #A89A85;
    }

    .m-bk {
      position: absolute;
      top: 0;
      width: 30px;
      height: 42px;
      border: none;
      border-radius: 4px 4px 8px 8px;
      background: #2E271F;
      box-shadow: 0 0 0 3px #F6EADB;
      cursor: pointer;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 0 0 8px;
      box-sizing: border-box;
      z-index: 2;
      transition: filter 100ms ease;
    }

    .m-bk:active:not(:disabled) {
      filter: brightness(1.4);
    }

    .m-bk:disabled {
      background: #CDBFA9;
      cursor: not-allowed;
    }

    .m-key-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #9B7CA8;
    }

    .m-toast {
      position: absolute;
      left: 50%;
      bottom: 136px;
      transform: translateX(-50%);
      z-index: 30;
      height: 44px;
      padding: 0 6px 0 18px;
      border-radius: 22px;
      background: #2E271F;
      color: #FBF3E6;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 10px 28px rgba(46, 39, 31, 0.25);
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
    }

    .m-toast button {
      height: 32px;
      padding: 0 14px;
      border-radius: 16px;
      border: none;
      background: #9B7CA8;
      color: #FBF3E6;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
    }
  `;

  @property({ type: Object })
  progression: Progression | null = null;

  @property({ type: Object })
  melodyTrack: MelodyTrack | null = null;

  @property({ type: Number })
  activeStepIndex: number | null = null;

  @property({ type: String })
  guideMode: GuideMode = 'scale-key';

  @property({ type: String })
  contour: ContourArchetype = 'Arch';

  @property({ type: Number })
  density = 50;

  @property({ type: Number })
  octave = 4;

  @property({ type: Boolean })
  playing = false;

  @property({ type: Boolean })
  backingEnabled = true;

  @property({ type: Boolean })
  isMobile = false;

  @property({ type: Boolean })
  showTheory = false;

  @property({ type: String })
  melodyLoop: 'Section' | 'Chord' | 'Span' = 'Section';

  @property({ type: String })
  melodySound = 'Stage Rhodes';

  @property({ type: Array })
  span: [number, number] = [0, 16];

  @property({ type: Boolean, reflect: true, attribute: 'dragging-tail' })
  isDraggingTail = false;

  @state()
  private selectedGlobalStep: number | null = null;

  @state()
  private bloomOctave = 4;

  @state()
  private hoverPitchClass: number | null = null;

  @state()
  private popoverPos = { left: 12, top: 80, isAbove: false, stemL: 154, stemT: 75 };

  @state()
  private strictBy: 'scale' | 'chord' = 'scale';

  @state()
  private dragStartStep: number | null = null;

  /** True on phone-width viewports: swaps the 64-step lanes for the overview/focus grids + note dock. */
  @property({ type: Boolean, reflect: true })
  mobile = false;

  @state()
  private mview: 'overview' | 'focus' = 'overview';

  @state()
  private mpage = 0;

  @state()
  private spanEdit = false;

  @state()
  private spanA: number | null = null;

  @state()
  private removedNote: MelodyNote | null = null;

  private _removedTimer: ReturnType<typeof setTimeout> | null = null;
  private _mq: MediaQueryList | null = null;
  private _onMq = () => this.syncMobile();

  private _didDrag = false;
  private _boundPointerMove: (e: PointerEvent) => void;
  private _boundPointerUp: (e: PointerEvent) => void;

  constructor() {
    super();
    this._boundPointerMove = this.onTailPointerMove.bind(this);
    this._boundPointerUp = this.onTailPointerUp.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.onKeyDown);
    if (typeof window.matchMedia === 'function') {
      this._mq = window.matchMedia('(max-width: 899px)');
      this._mq.addEventListener?.('change', this._onMq);
    }
    try {
      const saved = localStorage.getItem('chroma-melody-mview');
      if (saved === 'focus' || saved === 'overview') this.mview = saved;
    } catch { /* storage unavailable */ }
    this.syncMobile();
  }

  private syncMobile() {
    this.mobile = this.isMobile || !!this._mq?.matches;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._mq?.removeEventListener?.('change', this._onMq);
    if (this._removedTimer) clearTimeout(this._removedTimer);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('pointermove', this._boundPointerMove);
    window.removeEventListener('pointerup', this._boundPointerUp);
    window.removeEventListener('pointercancel', this._boundPointerUp);
    document.body.style.cursor = '';
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.selectedGlobalStep !== null) {
      this.closeBloom();
    }
  };

  protected override updated(changed: PropertyValues) {
    if (changed.has('isMobile')) this.syncMobile();
    if (this.mobile && changed.has('melodyLoop') && this.melodyLoop === 'Span' && changed.get('melodyLoop') !== undefined && changed.get('melodyLoop') !== 'Span') {
      this.spanEdit = true;
      this.spanA = null;
    }
    if (this.melodyLoop !== 'Span' && this.spanEdit) {
      this.spanEdit = false;
      this.spanA = null;
    }
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('progression') && this.progression) {
      if (!this.melodyTrack) {
        this.melodyTrack = melodyEngine.createEmptyTrack(this.progression, {
          contour: this.contour,
          density: this.density,
          octave: this.octave,
          guideMode: this.guideMode,
        });
      }
    }
  }

  private generateDefaultMelody() {
    if (!this.progression) return;
    const track = melodyEngine.generateMelody(this.progression, {
      contour: this.contour,
      density: this.density,
      octave: this.octave,
      guideMode: this.guideMode,
      strictBy: this.strictBy,
    });
    this.melodyTrack = track;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track }, bubbles: true, composed: true }));
  }

  private onSetStrictBy(by: 'scale' | 'chord') {
    this.strictBy = by;
    this.requestUpdate();
  }

  private onToggleBacking = () => {
    this.backingEnabled = !this.backingEnabled;
    this.dispatchEvent(new CustomEvent('toggle-backing', {
      detail: { backingEnabled: this.backingEnabled },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  };

  private onSetGuideMode(mode: GuideMode) {
    this.guideMode = mode;
    if (this.melodyTrack && this.progression) {
      const updatedTrack: MelodyTrack = {
        ...this.melodyTrack,
        guideMode: mode,
      };
      this.melodyTrack = updatedTrack;
      this.dispatchEvent(new CustomEvent('guide-mode-change', { detail: { mode }, bubbles: true, composed: true }));
      this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updatedTrack }, bubbles: true, composed: true }));
    }
  }

  private onRerollMelody = () => {
    if (!this.progression) return;
    const CONTOURS: ContourArchetype[] = ['Arch', 'AscendingClimax', 'DescendingSigh', 'CallAndResponse', 'OstinatoRiff', 'AnthemHook'];
    const currentIdx = CONTOURS.indexOf(this.contour);
    const nextIdx = (currentIdx + 1 + Math.floor(Math.random() * (CONTOURS.length - 1))) % CONTOURS.length;
    this.contour = CONTOURS[nextIdx];

    const seed = Math.floor(Math.random() * 100000) + 1;
    const track = melodyEngine.generateMelody(this.progression, {
      contour: this.contour,
      density: this.density,
      octave: this.octave,
      guideMode: this.guideMode,
      strictBy: this.strictBy,
      seed,
    });
    this.melodyTrack = track;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', { detail: `Generated ${this.contour} melody`, bubbles: true, composed: true }));
  };

  private onClearMelody = () => {
    if (!this.progression && !this.melodyTrack) return;
    const track = melodyEngine.createEmptyTrack(this.progression, {
      contour: this.contour,
      density: this.density,
      octave: this.octave,
      guideMode: this.guideMode,
    });
    this.melodyTrack = track;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', { detail: 'Cleared melody notes', bubbles: true, composed: true }));
  };

  private getHarmonicClass(note: MelodyNote, chord: ChordBlock): 'chord' | 'scale' | 'out' {
    if (note.isClash) return 'out';
    const role = note.chordToneRole;
    if (role === 'root' || role === '3rd' || role === '5th' || role === '7th') {
      return 'chord';
    }
    if (role === 'tension' || role === 'passing') {
      return 'scale';
    }
    if (role === 'chromatic') {
      return 'out';
    }
    if (this.progression) {
      const res = classifyPitch(note.midi, chord, this.progression.key, this.progression.scaleType);
      if (res.isClash || res.role === 'chromatic') return 'out';
      if (res.role === 'root' || res.role === '3rd' || res.role === '5th' || res.role === '7th') return 'chord';
      return 'scale';
    }
    return 'chord';
  }

  private getStepCoverMap(chords: ChordBlock[]): Map<number, {
    note: MelodyNote;
    isStart: boolean;
    isEnd: boolean;
    lengthInSteps: number;
    harmonicClass: 'chord' | 'scale' | 'out';
  }> {
    const map = new Map<number, {
      note: MelodyNote;
      isStart: boolean;
      isEnd: boolean;
      lengthInSteps: number;
      harmonicClass: 'chord' | 'scale' | 'out';
    }>();
    if (!this.melodyTrack?.notes) return map;

    for (const note of this.melodyTrack.notes) {
      const startStep = note.barIndex * 16 + note.stepInBar;
      const lengthInSteps = Math.max(1, Math.round((note.durationBeats || 0.25) * 4));
      const barEndStep = (note.barIndex + 1) * 16;
      const maxSteps = Math.min(lengthInSteps, barEndStep - startStep);
      const chord = chords[note.barIndex] || chords[0];
      const harmonicClass = this.getHarmonicClass(note, chord);

      for (let offset = 0; offset < maxSteps; offset++) {
        const step = startStep + offset;
        map.set(step, {
          note,
          isStart: offset === 0,
          isEnd: offset === maxSteps - 1,
          lengthInSteps: maxSteps,
          harmonicClass,
        });
      }
    }
    return map;
  }

  private onStartLen(noteStartGlobalStep: number, e: PointerEvent) {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();

    this.isDraggingTail = true;
    this.dragStartStep = noteStartGlobalStep;
    this._didDrag = false;
    this.closeBloom();

    document.body.style.cursor = 'grabbing';
    window.addEventListener('pointermove', this._boundPointerMove);
    window.addEventListener('pointerup', this._boundPointerUp);
    window.addEventListener('pointercancel', this._boundPointerUp);

    this.onTailPointerMove(e);
  }

  private onTailPointerMove(ev: PointerEvent) {
    if (!this.isDraggingTail || this.dragStartStep === null || !this.melodyTrack) return;

    const startStep = this.dragStartStep;
    const barIdx = Math.floor(startStep / 16);
    const startStepInBar = startStep % 16;
    const note = this.melodyTrack.notes.find(
      n => n.barIndex === barIdx && n.stepInBar === startStepInBar
    );
    if (!note) return;

    // Calculate max allowable length in steps (capped at next note onset in this bar, or bar end 16)
    const barEnd = 16;
    const otherNotesInBar = this.melodyTrack.notes.filter(
      n => n.barIndex === barIdx && n.stepInBar > startStepInBar
    );
    const nextNoteStep = otherNotesInBar.length > 0
      ? Math.min(...otherNotesInBar.map(n => n.stepInBar))
      : barEnd;
    const maxCapSteps = nextNoteStep - startStepInBar;

    // Determine target step in bar
    let targetStepInBar: number | null = null;

    // 1. Try elementFromPoint through shadowRoot or document
    let el: Element | null = null;
    const sr = this.shadowRoot as any;
    if (sr && typeof sr.elementFromPoint === 'function') {
      el = sr.elementFromPoint(ev.clientX, ev.clientY);
    } else if (typeof document.elementFromPoint === 'function') {
      el = document.elementFromPoint(ev.clientX, ev.clientY);
    }
    const cell = el?.closest('.step-cell') as HTMLElement | null;
    if (cell && cell.dataset.step !== undefined) {
      const s = parseInt(cell.dataset.step, 10);
      if (Math.floor(s / 16) === barIdx) {
        targetStepInBar = s % 16;
      }
    }

    // 2. Fallback to coordinate geometry of the bar lane
    if (targetStepInBar === null) {
      const lane = this.shadowRoot?.querySelector(`.chord-lane[data-bar="${barIdx}"] .steps-16-grid`) as HTMLElement | null;
      if (lane) {
        const rect = lane.getBoundingClientRect();
        if (rect.width > 0) {
          const relX = ev.clientX - rect.left;
          const stepWidth = rect.width / 16;
          targetStepInBar = Math.floor(relX / stepWidth);
          targetStepInBar = Math.max(0, Math.min(15, targetStepInBar));
        }
      }
    }

    if (targetStepInBar === null) return;

    // Calculate new length in steps: from startStepInBar to targetStepInBar inclusive
    const newLengthInSteps = Math.max(1, Math.min(maxCapSteps, targetStepInBar - startStepInBar + 1));
    const newDurationBeats = newLengthInSteps * 0.25;

    const currentLengthInSteps = Math.max(1, Math.round((note.durationBeats || 0.25) * 4));
    if (newLengthInSteps !== currentLengthInSteps) {
      this._didDrag = true;
      const updatedNotes = this.melodyTrack.notes.map(n =>
        n.id === note.id ? { ...n, durationBeats: newDurationBeats } : n
      );
      this.melodyTrack = { ...this.melodyTrack, notes: updatedNotes };
      this.requestUpdate();
      playLeadNote(note.pitch, 0.15);
    }
  }

  private onTailPointerUp(_ev: PointerEvent) {
    if (!this.isDraggingTail) return;

    this.isDraggingTail = false;
    this.dragStartStep = null;
    document.body.style.cursor = '';

    window.removeEventListener('pointermove', this._boundPointerMove);
    window.removeEventListener('pointerup', this._boundPointerUp);
    window.removeEventListener('pointercancel', this._boundPointerUp);

    if (this._didDrag) {
      setTimeout(() => {
        this._didDrag = false;
      }, 80);
    }

    if (this.melodyTrack) {
      this.dispatchEvent(
        new CustomEvent('melody-change', {
          detail: { track: this.melodyTrack },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private getLoopRange(): [number, number] {
    if (this.melodyLoop === 'Chord') {
      const sel = this.selectedGlobalStep ?? 0;
      const r = Math.floor(sel / 16) * 16;
      return [r, r + 16];
    }
    if (this.melodyLoop === 'Span') {
      return this.span && this.span[1] > this.span[0] ? this.span : [0, 16];
    }
    return [0, (this.progression?.chords.length || 4) * 16];
  }


  private onStepClick(globalStep: number, e?: MouseEvent) {
    if (this._didDrag) {
      return;
    }
    if (e && e.shiftKey) {
      const anchor = this.selectedGlobalStep !== null ? this.selectedGlobalStep : 0;
      const a = Math.min(anchor, globalStep);
      const b = Math.max(anchor, globalStep) + 1;
      this.span = [a, b];
      this.melodyLoop = 'Span';
      this.dispatchEvent(new CustomEvent('span-change', {
        detail: { span: this.span },
        bubbles: true,
        composed: true,
      }));
      this.dispatchEvent(new CustomEvent('melody-loop-change', {
        detail: { melodyLoop: 'Span', loop: 'Span' },
        bubbles: true,
        composed: true,
      }));
      this.dispatchEvent(new CustomEvent('toast', {
        detail: `Loop span: steps ${a + 1}–${b}`,
        bubbles: true,
        composed: true,
      }));
      this.requestUpdate();
      return;
    }
    const chords = this.progression?.chords || [];
    const coverMap = this.getStepCoverMap(chords);
    const cover = coverMap.get(globalStep);
    if (cover && !cover.isStart) {
      // Tail clicks are handled by onStartLen
      return;
    }

    // Calculate popover positioning relative to the melody-grid-stage
    const stage = this.shadowRoot?.querySelector('.melody-grid-stage') as HTMLElement | null;
    const cell = this.shadowRoot?.querySelector(`.step-cell[data-step="${globalStep}"]`) as HTMLElement | null;
    const barIdx = Math.floor(globalStep / 16);
    const stepInBar = globalStep % 16;
    const W = 308;
    const H = 144;

    if (stage && cell) {
      const stageRect = stage.getBoundingClientRect();
      const cellRect = cell.getBoundingClientRect();
      const ax = cellRect.left - stageRect.left + cellRect.width / 2 + 12;
      const ay = cellRect.top - stageRect.top + cellRect.height / 2 + 12;
      const OW = stageRect.width + 24;
      const OH = stageRect.height + 24;
      const isAbove = barIdx >= 2;
      const top = isAbove ? Math.max(4, ay - 22 - H) : ay + 22;
      const left = Math.max(8, Math.min(OW - W - 8, ax - W / 2));
      const stemL = ax - 6;
      const stemT = isAbove ? top + H - 7 : top - 5;
      this.popoverPos = { left, top, isAbove, stemL, stemT };
    } else {
      const isAbove = barIdx >= 2;
      const top = isAbove ? Math.max(8, barIdx * 74 - 150) : barIdx * 74 + 70;
      const left = Math.max(8, Math.min(600, 140 + stepInBar * 36 - 154));
      const ax = left + 154;
      this.popoverPos = { left, top, isAbove, stemL: ax - 6, stemT: isAbove ? top + H - 7 : top - 5 };
    }

    this.hoverPitchClass = null;

    const existing = this.getNoteAtStep(globalStep);
    if (existing) {
      this.selectedGlobalStep = existing.barIndex * 16 + existing.stepInBar;
      const parsedMidi = existing.midi;
      this.bloomOctave = Math.floor(parsedMidi / 12) - 1;
      playLeadNote(existing.pitch, 0.4);
    } else {
      this.selectedGlobalStep = globalStep;
      this.bloomOctave = this.octave;
    }
  }

  private closeBloom() {
    this.selectedGlobalStep = null;
    this.hoverPitchClass = null;
  }

  private onBloomWheel = (e: WheelEvent) => {
    e.stopPropagation();
    if (Math.abs(e.deltaY) > 40) {
      if (e.deltaY < 0 && this.bloomOctave < 7) {
        this.bloomOctave += 1;
      } else if (e.deltaY > 0 && this.bloomOctave > 2) {
        this.bloomOctave -= 1;
      }
    }
  };

  private getNoteAtStep(globalStep: number): MelodyNote | undefined {
    if (!this.melodyTrack) return undefined;
    const barIndex = Math.floor(globalStep / 16);
    const stepInBar = globalStep % 16;
    // Direct onset match
    const direct = this.melodyTrack.notes.find(n => n.barIndex === barIndex && n.stepInBar === stepInBar);
    if (direct) return direct;
    // Covered match for sustained note duration
    return this.melodyTrack.notes.find(n => {
      const start = n.barIndex * 16 + n.stepInBar;
      const length = Math.max(1, Math.round((n.durationBeats || 0.25) * 4));
      return globalStep >= start && globalStep < start + length;
    });
  }

  private onSelectPitch(pitchNameWithoutOct: string) {
    if (this.selectedGlobalStep === null) return;
    if (this.placeNote(this.selectedGlobalStep, pitchNameWithoutOct, this.bloomOctave)) {
      this.closeBloom();
    }
  }

  /** Places (or replaces) a note at a global step. Returns false when guide mode rejects it. */
  private placeNote(globalStep: number, pitchNameWithoutOct: string, octave: number): boolean {
    if (!this.progression) return false;

    const barIndex = Math.floor(globalStep / 16);
    const stepInBar = globalStep % 16;
    const chord = this.progression.chords[barIndex] || this.progression.chords[0];
    const pitch = `${pitchNameWithoutOct}${octave}`;
    const midi = noteToMidiNumber(pitch);

    // Guide mode enforcement
    if (this.guideMode === 'strict-chord') {
      const matrix = getHarmonicChordMatrix(chord, this.progression.key, this.progression.scaleType);
      const pc = midi % 12;
      const allowed = this.strictBy === 'chord' ? matrix.chordTonePcs : matrix.scalePcs.filter(p => !matrix.avoidPcs.includes(p));
      if (!allowed.includes(pc)) {
        this.dispatchEvent(new CustomEvent('toast', { detail: `Strict ${this.strictBy} mode: pick an allowed tone`, bubbles: true, composed: true }));
        return false;
      }
    }

    const classification = classifyPitch(midi, chord, this.progression.key, this.progression.scaleType);
    playLeadNote(pitch, 0.4, undefined, 0.85, this.melodySound);

    const otherNotes = (this.melodyTrack?.notes || []).filter(
      n => !(n.barIndex === barIndex && n.stepInBar === stepInBar)
    );

    // Keep the length of a note being replaced; otherwise default to 2 steps (capped by next note / bar end)
    const existing = (this.melodyTrack?.notes || []).find(n => n.barIndex === barIndex && n.stepInBar === stepInBar);
    const otherNotesInBar = otherNotes.filter(n => n.barIndex === barIndex && n.stepInBar > stepInBar);
    const nextOnset = otherNotesInBar.length > 0
      ? Math.min(...otherNotesInBar.map(n => n.stepInBar))
      : 16;
    const availableSteps = nextOnset - stepInBar;
    const wanted = existing ? Math.max(1, Math.round((existing.durationBeats || 0.25) * 4)) : 2;
    const initialSteps = Math.max(1, Math.min(wanted, availableSteps));

    const newNote: MelodyNote = {
      id: `m-note-${barIndex}-${stepInBar}-${Date.now()}`,
      barIndex,
      stepInBar,
      beatOffset: barIndex * 4 + (stepInBar / 4),
      durationBeats: initialSteps * 0.25,
      pitch,
      midi,
      velocity: 100,
      chordToneRole: classification.role,
      isClash: classification.isClash,
    };

    const updatedTrack: MelodyTrack = {
      ...this.melodyTrack!,
      notes: [...otherNotes, newNote].sort((a, b) => a.beatOffset - b.beatOffset),
    };

    this.melodyTrack = updatedTrack;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updatedTrack }, bubbles: true, composed: true }));
    return true;
  }

  private onClearCurrentNote() {
    if (this.selectedGlobalStep === null || !this.melodyTrack) return;
    const note = this.getNoteAtStep(this.selectedGlobalStep);
    if (!note) return;

    const filtered = this.melodyTrack.notes.filter(n => n.id !== note.id);
    const updatedTrack: MelodyTrack = {
      ...this.melodyTrack,
      notes: filtered,
    };

    this.melodyTrack = updatedTrack;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updatedTrack }, bubbles: true, composed: true }));
    this.closeBloom();
  }

  private onPrevStep() {
    if (this.selectedGlobalStep !== null) {
      this.selectedGlobalStep = (this.selectedGlobalStep - 1 + 64) % 64;
    }
  }

  private onNextStep() {
    if (this.selectedGlobalStep !== null) {
      this.selectedGlobalStep = (this.selectedGlobalStep + 1) % 64;
    }
  }

  private onOctaveDown() {
    if (this.bloomOctave > 2) {
      this.bloomOctave -= 1;
    }
  }

  private onOctaveUp() {
    if (this.bloomOctave < 7) {
      this.bloomOctave += 1;
    }
  }

  private getRoleString(pitchClass: number, chord: ChordBlock): string {
    const rootPcs: Record<string, number> = {
      'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
      'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
    };
    const chordRootName = chord.name.match(/^[A-G][b#]?/)?.[0] || 'C';
    const rootPc = rootPcs[chordRootName] ?? 0;
    const diff = (pitchClass - rootPc + 12) % 12;
    const ivMap: Record<number, string> = {
      0: 'root', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '11', 6: '♯11', 7: '5', 8: '♭13', 9: '13', 10: '♭7', 11: 'maj7'
    };
    const matrix = getHarmonicChordMatrix(chord, this.progression?.key || 'C', this.progression?.scaleType || 'MAJOR');
    if (matrix.chordTonePcs.includes(pitchClass)) {
      return `${ivMap[diff] || diff} of ${chordRootName}`;
    }
    if (matrix.tensionPcs.includes(pitchClass) || matrix.scalePcs.includes(pitchClass)) {
      return 'passing';
    }
    return 'chromatic';
  }

  render() {
    if (this.mobile) return this.renderMobile();
    const chords = this.progression?.chords || [];
    const moodColor = getMoodColor(this.progression?.mood || 'Warm');
    const noteCount = this.melodyTrack?.notes.length || 0;
    const activeCol = this.playing && this.activeStepIndex !== null ? this.activeStepIndex % 16 : null;

    return html`
      <div class="melody-container" style="--mood-color: ${moodColor};">
        <!-- Panel Header -->
        <div class="panel-header-row">
          <div class="header-left">
            <span class="small-caps-label">MELODY</span>
            <span class="note-count">${noteCount} notes</span>

            <button class="try-another-btn quick-chip random-melody-btn" @click=${this.onRerollMelody} aria-label="Randomize melody">
              <svg width="15" height="15" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="${moodColor}"/>
                <circle cx="8" cy="8" r="1.7" fill="#2E271F"/>
                <circle cx="16" cy="8" r="1.7" fill="#2E271F"/>
                <circle cx="12" cy="12" r="1.7" fill="#2E271F"/>
                <circle cx="8" cy="16" r="1.7" fill="#2E271F"/>
                <circle cx="16" cy="16" r="1.7" fill="#2E271F"/>
              </svg>
              <span>${noteCount === 0 ? 'Randomize' : 'Try another'}</span>
            </button>
            <button class="clear-text-btn clear-melody-btn" @click=${this.onClearMelody} aria-label="Clear melody" title="Clear all notes">
              Clear
            </button>
          </div>

          <div class="quick-actions-bar">
            ${this.guideMode === 'strict-chord' ? html`
              <div class="segmented-control" role="radiogroup" aria-label="Strict filter by">
                <button
                  class="segment-btn ${this.strictBy === 'scale' ? 'active' : ''}"
                  @click=${() => this.onSetStrictBy('scale')}
                  role="radio"
                  aria-checked="${this.strictBy === 'scale'}"
                >
                  Scale
                </button>
                <button
                  class="segment-btn ${this.strictBy === 'chord' ? 'active' : ''}"
                  @click=${() => this.onSetStrictBy('chord')}
                  role="radio"
                  aria-checked="${this.strictBy === 'chord'}"
                >
                  Chord
                </button>
              </div>
            ` : ''}

            <!-- Tier-2 Segmented Control: Strict / Guide / Free -->
            <div class="segmented-control" role="radiogroup" aria-label="Melody guide mode">
              <button
                class="segment-btn ${this.guideMode === 'strict-chord' ? 'active' : ''}"
                @click=${() => this.onSetGuideMode('strict-chord')}
                role="radio"
                aria-checked="${this.guideMode === 'strict-chord'}"
              >
                Strict
              </button>
              <button
                class="segment-btn ${this.guideMode === 'scale-key' ? 'active' : ''}"
                @click=${() => this.onSetGuideMode('scale-key')}
                role="radio"
                aria-checked="${this.guideMode === 'scale-key'}"
              >
                Guide
              </button>
              <button
                class="segment-btn ${this.guideMode === 'free' ? 'active' : ''}"
                @click=${() => this.onSetGuideMode('free')}
                role="radio"
                aria-checked="${this.guideMode === 'free'}"
              >
                Free
              </button>
            </div>
          </div>
        </div>

        <!-- Horizontal Chord-Lane Sequencer Stage (Matches MelodyGrid.dc.html & Image 1) -->
        <div class="melody-grid-stage ${this.selectedGlobalStep !== null ? 'has-active-bloom' : ''}">
          <div class="melody-grid-inner">
            <!-- Step numbers header 1..16 (Unpadded per Image 1 benchmark) -->
            <div class="step-numbers-header">
              <div class="lane-spacer"></div>
              <div class="step-numbers-track">
                ${Array.from({ length: 16 }, (_, i) => html`
                  <span class="step-num-col ${activeCol === i ? 'active' : ''}">
                    ${i + 1}
                  </span>
                `)}
              </div>
            </div>

            <!-- 4-Bar Chord Lanes (bar-column for test & layout) -->
            <div class="bars-grid">
              ${(() => {
                const coverMap = this.getStepCoverMap(chords);
                return chords.map((chord, barIdx) => {
                  const isPlayingBar = this.playing && this.activeStepIndex !== null && Math.floor(this.activeStepIndex / 16) === barIdx;
                  const role = roleForTension(chord.tension ?? 0.1);
                  const chordBg = role.color;

                  return html`
                    <div
                      class="chord-lane bar-column ${isPlayingBar ? 'playing-bar' : ''}"
                      data-bar="${barIdx}"
                      style="--chord-bg: ${chordBg};"
                    >
                      <!-- Chord Badge on Left -->
                      <div class="lane-chord-badge">
                        <span class="bar-role">${ROLE_PLAIN[chord.functionLabel] || chord.functionLabel}</span>
                        <div class="bar-chord-info">
                          <span class="bar-chord-name">${chord.name}</span>
                          <span class="bar-chord-roman">${chord.roman || ''}</span>
                        </div>
                      </div>

                      <!-- 16 Steps Row Across the Lane (Clean ties, no vertical divider pipes) -->
                      <div class="steps-16-grid">
                        ${Array.from({ length: 16 }, (_, stepInBar) => {
                          const globalStep = barIdx * 16 + stepInBar;
                          const cover = coverMap.get(globalStep);
                          const isActivePlayhead = this.playing && this.activeStepIndex === globalStep;
                          const isBloomed = this.selectedGlobalStep === globalStep;
                          const isTail = !!(cover && !cover.isStart);
                          const isStart = !!(cover && cover.isStart);
                          const isEnd = !!(cover && cover.isEnd);
                          const noteStartStep = cover ? cover.note.barIndex * 16 + cover.note.stepInBar : globalStep;

                          const [la, lb] = this.getLoopRange();
                          const inLoop = this.melodyLoop !== 'Section' && globalStep >= la && globalStep < lb;
                          const isLoopStart = inLoop && globalStep === la;
                          const isLoopEnd = inLoop && globalStep === lb - 1;

                          return html`
                            <div
                              class="step-cell ${cover ? 'has-note' : ''} ${isTail ? 'is-tail-step' : ''} ${isStart ? 'is-note-start' : ''} ${isEnd ? 'is-note-end' : ''} ${isActivePlayhead ? 'active-step' : ''} ${isBloomed ? 'is-bloomed' : ''}"
                              data-step="${globalStep}"
                              @click=${(e: MouseEvent) => this.onStepClick(globalStep, e)}
                              @pointerdown=${(e: PointerEvent) => {
                                if (isTail) {
                                  this.onStartLen(noteStartStep, e);
                                }
                              }}
                              aria-label="Bar ${barIdx + 1}, Step ${stepInBar + 1}: ${cover ? `${cover.note.pitch} (${cover.lengthInSteps} steps)` : 'empty'}"
                            >
                              <span class="step-number">${String(stepInBar + 1).padStart(2, '0')}</span>
                              ${cover ? (isStart ? html`
                                ${cover.lengthInSteps > 1 ? html`<span class="tie-bar tie-start"></span>` : ''}
                                <div class="note-pad">
                                  <span class="note-badge">${cover.note.pitch.replace(/\d+$/, '')}</span>
                                </div>
                                ${isEnd ? html`
                                  <div
                                    class="tail-grip"
                                    @pointerdown=${(e: PointerEvent) => this.onStartLen(noteStartStep, e)}
                                    title="Drag tail to adjust note duration"
                                  ></div>
                                ` : ''}
                              ` : html`
                                <span class="tie-bar ${isEnd ? 'tie-end' : 'tie-mid'}"></span>
                                <div class="note-pad tied-step"></div>
                                ${isEnd ? html`
                                  <div
                                    class="tail-grip"
                                    @pointerdown=${(e: PointerEvent) => this.onStartLen(noteStartStep, e)}
                                    title="Drag tail to adjust note duration"
                                  ></div>
                                ` : ''}
                              `) : html`
                                <span class="empty-dot ${isBloomed ? 'bloomed-empty-ring' : ''}"></span>
                              `}
                              ${inLoop ? html`
                                <div
                                  class="loop-span-bar ${isLoopStart ? 'span-start' : ''} ${isLoopEnd ? 'span-end' : ''}"
                                  style="--span-accent: #9B7CA8;"
                                ></div>
                              ` : ''}
                            </div>
                          `;
                        })}
                      </div>
                    </div>
                  `;
                });
              })()}
            </div>
          </div>

          <!-- Note Blooming Micro-Keyboard Popover (Anchored inside grid stage) -->
          ${this.selectedGlobalStep !== null ? this.renderBloomPopover(moodColor) : ''}
        </div>
      </div>
    `;
  }

  // ───────────────────────── Mobile ─────────────────────────

  /** Currently selected step on mobile (defaults to the first step so the keyboard is always live). */
  private get msel(): number {
    return this.selectedGlobalStep ?? 0;
  }

  private setMView(v: 'overview' | 'focus', row?: number) {
    this.mview = v;
    if (row !== undefined) this.mpage = row;
    else if (v === 'focus') this.mpage = Math.min(Math.floor(this.msel / 16), Math.max(0, (this.progression?.chords.length || 1) - 1));
    try { localStorage.setItem('chroma-melody-mview', v); } catch { /* storage unavailable */ }
  }

  private mFocusRow(row: number) {
    this.setMView('focus', row);
    if (Math.floor(this.msel / 16) !== row) this.selectedGlobalStep = row * 16;
  }

  private noteStartOf(globalStep: number): MelodyNote | undefined {
    return this.getNoteAtStep(globalStep);
  }

  private mTap(globalStep: number) {
    if (this._didDrag) return;
    if (this.spanEdit) {
      this.mSpanTap(globalStep);
      return;
    }
    const note = this.noteStartOf(globalStep);
    const start = note ? note.barIndex * 16 + note.stepInBar : globalStep;
    if (note && this.msel === start) {
      this.mRemove(note);
      return;
    }
    this.selectedGlobalStep = start;
    this.bloomOctave = note ? Math.floor(note.midi / 12) - 1 : this.bloomOctave;
    if (note) playLeadNote(note.pitch, 0.4, undefined, 0.85, this.melodySound);
  }

  private mRemove(note: MelodyNote) {
    if (!this.melodyTrack) return;
    const updated: MelodyTrack = { ...this.melodyTrack, notes: this.melodyTrack.notes.filter(n => n.id !== note.id) };
    this.melodyTrack = updated;
    this.removedNote = note;
    if (this._removedTimer) clearTimeout(this._removedTimer);
    this._removedTimer = setTimeout(() => { this.removedNote = null; }, 4000);
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updated }, bubbles: true, composed: true }));
  }

  private mUndoRemove() {
    const note = this.removedNote;
    if (!note || !this.melodyTrack) return;
    const taken = this.melodyTrack.notes.some(n => n.barIndex === note.barIndex && n.stepInBar === note.stepInBar);
    if (!taken) {
      const updated: MelodyTrack = {
        ...this.melodyTrack,
        notes: [...this.melodyTrack.notes, note].sort((a, b) => a.beatOffset - b.beatOffset),
      };
      this.melodyTrack = updated;
      this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updated }, bubbles: true, composed: true }));
    }
    this.removedNote = null;
    if (this._removedTimer) clearTimeout(this._removedTimer);
  }

  private mSpanTap(globalStep: number) {
    if (this.spanA === null) {
      this.spanA = globalStep;
      return;
    }
    const a = Math.min(this.spanA, globalStep);
    const b = Math.max(this.spanA, globalStep) + 1;
    this.span = [a, b];
    this.spanEdit = false;
    this.spanA = null;
    this.dispatchEvent(new CustomEvent('span-change', { detail: { span: this.span }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('melody-loop-change', { detail: { melodyLoop: 'Span', loop: 'Span' }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', { detail: `Loop span: steps ${a + 1}–${b}`, bubbles: true, composed: true }));
  }

  private mSpanChip() {
    if (this.spanEdit) {
      this.spanEdit = false;
      this.spanA = null;
    } else {
      this.spanEdit = true;
      this.spanA = null;
    }
  }

  private mPlace(pitchName: string) {
    const note = this.getNoteAtStep(this.msel);
    const start = note ? note.barIndex * 16 + note.stepInBar : this.msel;
    const octave = note ? Math.floor(note.midi / 12) - 1 : this.bloomOctave;
    this.placeNote(start, pitchName, octave);
    this.selectedGlobalStep = start;
  }

  private mSetOctave(o: number) {
    o = Math.max(2, Math.min(7, o));
    const note = this.getNoteAtStep(this.msel);
    this.bloomOctave = o;
    if (note) {
      const name = note.pitch.replace(/\d+$/, '');
      const start = note.barIndex * 16 + note.stepInBar;
      this.placeNote(start, name, o);
      this.selectedGlobalStep = start;
    }
  }

  private mLen(delta: number) {
    const note = this.getNoteAtStep(this.msel);
    if (!note || !this.melodyTrack) return;
    const startInBar = note.stepInBar;
    const later = this.melodyTrack.notes.filter(n => n.barIndex === note.barIndex && n.stepInBar > startInBar);
    const cap = (later.length ? Math.min(...later.map(n => n.stepInBar)) : 16) - startInBar;
    const cur = Math.max(1, Math.round((note.durationBeats || 0.25) * 4));
    const next = Math.max(1, Math.min(cap, cur + delta));
    if (next === cur) return;
    const updated: MelodyTrack = {
      ...this.melodyTrack,
      notes: this.melodyTrack.notes.map(n => n.id === note.id ? { ...n, durationBeats: next * 0.25 } : n),
    };
    this.melodyTrack = updated;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updated }, bubbles: true, composed: true }));
  }

  private mClear() {
    const note = this.getNoteAtStep(this.msel);
    if (note) this.mRemove(note);
  }

  private pcDisabled(pc: number, chordTonePcs: number[], scalePcs: number[]): boolean {
    return this.guideMode === 'strict-chord'
      && !chordTonePcs.includes(pc)
      && (this.strictBy === 'chord' || !scalePcs.includes(pc));
  }

  private renderMobileCell(
    globalStep: number,
    coverMap: ReturnType<TabMelody['getStepCoverMap']>,
    big: boolean,
    stepNo?: number,
  ) {
    const cover = coverMap.get(globalStep);
    const isPlayhead = this.playing && this.activeStepIndex === globalStep;
    const sel = this.msel === globalStep || (!!cover && this.msel === cover.note.barIndex * 16 + cover.note.stepInBar && cover.isStart);
    const [la, lb] = this.getLoopRange();
    const inLoop = this.melodyLoop !== 'Section' && globalStep >= la && globalStep < lb;
    const spanPick = this.spanEdit && this.spanA === globalStep;
    const base = big ? 50 : 28;
    const isTail = !!cover && !cover.isStart;
    const size = isTail ? (cover!.isEnd ? Math.round(base * 0.42) : 0) : base;
    const noteStart = cover ? cover.note.barIndex * 16 + cover.note.stepInBar : globalStep;
    const label = cover?.isStart ? cover.note.pitch.replace(/\d+$/, '') : '';
    const cls = [
      'm-dot',
      cover ? (cover.isStart ? 'note' : 'tail') : 'empty',
      isPlayhead ? 'playhead' : '',
      (sel && !this.spanEdit) || spanPick ? 'selected' : '',
    ].join(' ');

    return html`
      <div
        class="step-cell m-cell"
        data-step=${globalStep}
        @click=${() => this.mTap(globalStep)}
        @pointerdown=${(e: PointerEvent) => {
          if (!this.spanEdit && cover && cover.isEnd) this.onStartLen(noteStart, e);
        }}
        aria-label="Step ${(globalStep % 16) + 1}: ${cover ? cover.note.pitch : 'empty'}"
      >
        ${inLoop ? html`<div class="m-span" style="left:${globalStep === la ? '8px' : '0'};right:${globalStep === lb - 1 ? '8px' : '0'};${this.spanEdit && this.spanA !== null ? 'height:7px;' : ''}"></div>` : ''}
        ${cover && cover.lengthInSteps > 1 ? html`<div class="m-tie" style="left:${cover.isStart ? '50%' : '0'};right:${cover.isEnd ? '50%' : '0'};"></div>` : ''}
        <div class="${cls}" style="--dot:${size}px;${size === 0 ? 'display:none;' : ''}">${label}</div>
        ${stepNo !== undefined ? html`<span class="m-step-no">${stepNo}</span>` : ''}
      </div>
    `;
  }

  private renderMobileDock() {
    const chords = this.progression?.chords || [];
    if (!this.progression || !chords.length) return html`<div class="m-dock"></div>`;
    const step = this.msel;
    const row = Math.min(Math.floor(step / 16), chords.length - 1);
    const chord = chords[row];
    const chordBg = roleForTension(chord.tension ?? 0.1).color;
    const deep = `color-mix(in srgb, ${chordBg} 78%, #2E271F)`;
    const matrix = getHarmonicChordMatrix(chord, this.progression.key, this.progression.scaleType);
    const note = this.getNoteAtStep(step);
    const pc = note ? note.midi % 12 : null;
    const octave = note ? Math.floor(note.midi / 12) - 1 : this.bloomOctave;
    const len = note ? Math.max(1, Math.round((note.durationBeats || 0.25) * 4)) : 0;
    const noteLabel = note ? note.pitch : '—';
    const role = note ? this.getRoleString(note.midi % 12, chord) : `step ${(step % 16) + 1}`;

    return html`
      <div class="m-dock" data-testid="melody-note-dock">
        <div class="m-dock-bar">
          <button class="m-dock-nav oct-down" ?disabled=${octave <= 2} @click=${() => this.mSetOctave(octave - 1)} aria-label="Lower octave">‹ ${octave - 1}</button>
          <div class="m-dock-note">
            <span class="pitch">${noteLabel}</span>
            <span class="role">${role} · ${chord.name}</span>
          </div>
          ${note ? html`
            <div class="m-len">
              <button @click=${() => this.mLen(-1)} aria-label="Shorter">−</button>
              <span title="length in steps">↔${len}</span>
              <button @click=${() => this.mLen(1)} aria-label="Longer">+</button>
            </div>
            <button class="m-dock-clear" @click=${() => this.mClear()} aria-label="Clear note">clear</button>
          ` : ''}
          <button class="m-dock-nav oct-up" ?disabled=${octave >= 7} @click=${() => this.mSetOctave(octave + 1)} aria-label="Higher octave">${octave + 1} ›</button>
        </div>
        <div class="m-keys">
          ${WHITE_KEYS.map((k, i) => {
            const disabled = this.pcDisabled(k.pc, matrix.chordTonePcs, matrix.scalePcs);
            const isChordTone = matrix.chordTonePcs.includes(k.pc);
            return html`
              <button
                class="m-wk"
                ?disabled=${disabled}
                style="left:${(i * 100) / 7}%;width:calc(${100 / 7}% - 3px);${isChordTone && !disabled ? `background:${chordBg};` : ''}"
                @click=${() => this.mPlace(k.name)}
                aria-label="${k.name}"
              >
                ${pc === k.pc ? html`<span class="m-key-dot"></span>` : ''}
                <span class="lbl">${k.name}</span>
              </button>
            `;
          })}
          ${[[1, 'C#', 1], [3, 'D#', 2], [6, 'F#', 4], [8, 'G#', 5], [10, 'A#', 6]].map(([bpc, name, boundary]) => {
            const disabled = this.pcDisabled(bpc as number, matrix.chordTonePcs, matrix.scalePcs);
            const isChordTone = matrix.chordTonePcs.includes(bpc as number);
            return html`
              <button
                class="m-bk"
                ?disabled=${disabled}
                style="left:calc(${((boundary as number) * 100) / 7}% - 16.5px);${isChordTone && !disabled ? `background:${deep};` : ''}"
                @click=${() => this.mPlace(name as string)}
                aria-label="${name}"
              >
                ${pc === bpc ? html`<span class="m-key-dot"></span>` : ''}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderMobile() {
    const chords = this.progression?.chords || [];
    const moodColor = getMoodColor(this.progression?.mood || 'Warm');
    const noteCount = this.melodyTrack?.notes.length || 0;
    const coverMap = this.getStepCoverMap(chords);
    const activeRow = Math.min(Math.floor(this.msel / 16), Math.max(0, chords.length - 1));
    const page = Math.min(this.mpage, Math.max(0, chords.length - 1));
    const playingRow = this.playing && this.activeStepIndex !== null ? Math.floor(this.activeStepIndex / 16) : -1;
    const [la, lb] = this.getLoopRange();
    const spanLabel = `${(la % 16) + 1}–${((lb - 1) % 16) + 1}`;
    const bgOf = (c: ChordBlock) => roleForTension(c.tension ?? 0.1).color;
    const head = (c: ChordBlock) => ROLE_PLAIN[c.functionLabel] || c.functionLabel;

    return html`
      <div class="m-root" style="--mood-color: ${moodColor};">
        <div class="m-head">
          <div class="m-head-left">
            <span class="small-caps-label">MELODY</span>
            <span class="note-count">${noteCount} notes</span>
          </div>
          <div class="segmented-control" role="radiogroup" aria-label="Melody guide mode">
            ${([['strict-chord', 'Strict'], ['scale-key', 'Guide'], ['free', 'Free']] as const).map(([mode, label]) => html`
              <button
                class="segment-btn ${this.guideMode === mode ? 'active' : ''}"
                role="radio"
                aria-checked="${this.guideMode === mode}"
                @click=${() => this.onSetGuideMode(mode)}
              >${label}</button>
            `)}
          </div>
        </div>

        <div class="m-tools">
          <button class="try-another-btn quick-chip random-melody-btn" @click=${this.onRerollMelody} aria-label="Randomize melody">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="6" fill="${moodColor}"/>
              <circle cx="8" cy="8" r="1.7" fill="#2E271F"/>
              <circle cx="16" cy="8" r="1.7" fill="#2E271F"/>
              <circle cx="12" cy="12" r="1.7" fill="#2E271F"/>
              <circle cx="8" cy="16" r="1.7" fill="#2E271F"/>
              <circle cx="16" cy="16" r="1.7" fill="#2E271F"/>
            </svg>
            <span>${noteCount === 0 ? 'Randomize' : 'Try another'}</span>
          </button>
          <button class="clear-text-btn clear-melody-btn" @click=${this.onClearMelody} aria-label="Clear melody" title="Clear all notes">Clear</button>
          <div class="m-tools-spacer"></div>
          ${this.melodyLoop === 'Span' ? html`
            <button class="m-span-chip ${this.spanEdit ? 'editing' : ''}" @click=${() => this.mSpanChip()} aria-label="Edit loop span">
              ${this.spanEdit
                ? html`<span class="mono">${this.spanA === null ? 'First step' : 'Last step'}</span>`
                : html`<span class="mono">${spanLabel}</span>`}
              <span class="act">${this.spanEdit ? 'Cancel' : 'Set'}</span>
            </button>
          ` : html`
            <div class="m-view-toggle" role="group" aria-label="Melody view">
              <button class="m-view-btn ${this.mview === 'overview' ? 'active' : ''}" @click=${() => this.setMView('overview')} aria-label="Overview" aria-pressed="${this.mview === 'overview'}">
                <span class="m-ov-icon"><i></i><i></i><i></i><i></i></span>
              </button>
              <button class="m-view-btn ${this.mview === 'focus' ? 'active' : ''}" @click=${() => this.setMView('focus')} aria-label="Focus" aria-pressed="${this.mview === 'focus'}">
                <span class="m-fc-icon"></span>
              </button>
            </div>
          `}
        </div>

        ${this.mview === 'overview' ? html`
          <div class="m-overview" style="grid-template-rows: repeat(${Math.max(1, Math.ceil(chords.length / 2))}, minmax(0, 1fr));">
            ${chords.map((chord, r) => html`
              <div
                class="m-tile bar-column ${r === activeRow ? 'active' : ''} ${r === playingRow ? 'playing-bar' : ''}"
                data-bar=${r}
                style="--chord-bg: ${bgOf(chord)};"
                @dblclick=${() => this.mFocusRow(r)}
              >
                <div class="m-tile-head">
                  <div class="m-tile-name" @click=${() => this.mFocusRow(r)}>
                    <span class="bar-role">${head(chord)}</span>
                    <span class="name-line">
                      <span class="m-chord-name">${chord.name}</span>
                      <span class="m-chord-roman">${this.showTheory ? (chord.roman || '') : ''}</span>
                    </span>
                  </div>
                  <button class="m-expand" @click=${() => this.mFocusRow(r)} aria-label="Focus ${chord.name}">⤢</button>
                </div>
                <div class="m-cells steps-16-grid">
                  ${Array.from({ length: 16 }, (_, i) => this.renderMobileCell(r * 16 + i, coverMap, false))}
                </div>
              </div>
            `)}
          </div>
        ` : html`
          <div class="m-tabs" role="tablist" aria-label="Chord">
            ${chords.map((chord, r) => html`
              <button class="m-tab ${r === page ? 'active' : ''}" role="tab" aria-selected="${r === page}" @click=${() => { this.mpage = r; if (Math.floor(this.msel / 16) !== r) this.selectedGlobalStep = r * 16; }}>
                <span class="t-name"><span>${chord.name}</span><span class="roman">${this.showTheory ? (chord.roman || '') : ''}</span></span>
                <span class="m-mini">
                  ${Array.from({ length: 16 }, (_, i) => {
                    const s = r * 16 + i;
                    const cv = coverMap.get(s);
                    const cls = this.playing && this.activeStepIndex === s ? 'now' : cv ? (cv.isStart ? 'head' : 'on') : '';
                    return html`<i class="${cls}"></i>`;
                  })}
                </span>
              </button>
            `)}
          </div>
          <div class="m-focus-wrap">
            <div class="m-focus-grid bar-column steps-16-grid" data-bar=${page} style="--chord-bg: ${chords[page] ? bgOf(chords[page]) : '#9CC0EC'};">
              ${Array.from({ length: 16 }, (_, i) => this.renderMobileCell(page * 16 + i, coverMap, true, i + 1))}
            </div>
          </div>
        `}

        ${this.renderMobileDock()}

        ${this.removedNote ? html`
          <div class="m-toast" role="status">Note removed<button @click=${() => this.mUndoRemove()}>Undo</button></div>
        ` : ''}
      </div>
    `;
  }

  private renderBloomPopover(_moodColor: string) {
    if (this.selectedGlobalStep === null || !this.progression) return '';

    const barIdx = Math.floor(this.selectedGlobalStep / 16);
    const chord = this.progression.chords[barIdx] || this.progression.chords[0];
    const roleObj = roleForTension(chord.tension ?? 0.1);
    const chordBg = roleObj.color;
    const existingNote = this.getNoteAtStep(this.selectedGlobalStep);
    const matrix = getHarmonicChordMatrix(chord, this.progression.key, this.progression.scaleType);

    const activePitchClass = this.hoverPitchClass !== null
      ? this.hoverPitchClass
      : (existingNote ? existingNote.midi % 12 : null);

    const activePitchName = activePitchClass !== null
      ? (WHITE_KEYS.find(k => k.pc === activePitchClass)?.name || BLACK_KEYS.find(k => k.pc === activePitchClass)?.name || '')
      : null;

    const currentPitch = activePitchName !== null
      ? `${activePitchName}${this.bloomOctave}`
      : '\u2014';

    const currentRole = activePitchClass !== null
      ? this.getRoleString(activePitchClass, chord)
      : `empty \u00B7 ${chord.name}`;

    return html`
      <div class="bloom-overlay" @click=${this.closeBloom}>
        <!-- Stem Diamond pointing directly at the cell center (MelodyGrid.dc.html:93) -->
        <div
          class="bloom-stem"
          style="left: ${this.popoverPos.stemL}px; top: ${this.popoverPos.stemT}px;"
        ></div>

        <!-- 308px × 144px Bloom Card (Exact MelodyGrid.dc.html & Image 1 parity) -->
        <div
          class="bloom-popover"
          style="left: ${this.popoverPos.left}px; top: ${this.popoverPos.top}px;"
          @click=${(e: Event) => e.stopPropagation()}
          @wheel=${this.onBloomWheel}
        >
          <!-- Header (‹ 4   E5 3 of C   clear   6 ›) -->
          <div class="bloom-header">
            <button
              class="bloom-nav-btn oct-down"
              @click=${this.onOctaveDown}
              ?disabled=${this.bloomOctave <= 2}
              aria-label="Lower octave"
            >
              ‹ ${this.bloomOctave - 1}
            </button>
            <div class="bloom-center-info">
              <span class="bloom-pitch-title">${currentPitch}</span>
              <span class="bloom-role-label">${currentRole}</span>
            </div>
            ${existingNote ? html`
              <button class="bloom-clear-btn" @click=${this.onClearCurrentNote} aria-label="Clear note">clear</button>
            ` : ''}
            <button
              class="bloom-nav-btn oct-up"
              @click=${this.onOctaveUp}
              ?disabled=${this.bloomOctave >= 7}
              aria-label="Higher octave"
            >
              ${this.bloomOctave + 1} ›
            </button>
          </div>

          <!-- 7 White Keys (Positions: 12, 53, 94, 135, 176, 217, 258) -->
          ${WHITE_KEYS.map((k) => {
            const isChordTone = matrix.chordTonePcs.includes(k.pc);
            const isMarked = activePitchClass === k.pc;
            const isHovered = this.hoverPitchClass === k.pc;
            const isDisabled = this.guideMode === 'strict-chord' && !isChordTone && (this.strictBy === 'chord' || !matrix.scalePcs.includes(k.pc));

            return html`
              <div
                class="white-key ${isChordTone ? 'chord-tone-key' : ''} ${isDisabled ? 'disabled' : ''} ${isHovered ? 'hovered' : ''}"
                style="left: ${k.left}px; ${isChordTone && !isHovered ? `background: ${chordBg};` : ''}"
                @click=${() => { if (!isDisabled) this.onSelectPitch(k.name); }}
                @pointerenter=${() => {
                  if (!isDisabled) {
                    this.hoverPitchClass = k.pc;
                    playLeadNote(`${k.name}${this.bloomOctave}`, 0.18);
                  }
                }}
                @pointerleave=${() => { if (this.hoverPitchClass === k.pc) this.hoverPitchClass = null; }}
              >
                <span class="key-mark ${isMarked ? 'visible' : ''}"></span>
                <span class="key-text">${k.name}</span>
              </div>
            `;
          })}

          <!-- 5 Black Keys (Positions: 38, 79, 161, 202, 243) -->
          ${BLACK_KEYS.map((k) => {
            const isChordTone = matrix.chordTonePcs.includes(k.pc);
            const isMarked = activePitchClass === k.pc;
            const isHovered = this.hoverPitchClass === k.pc;
            const isDisabled = this.guideMode === 'strict-chord' && !isChordTone && (this.strictBy === 'chord' || !matrix.scalePcs.includes(k.pc));

            return html`
              <div
                class="black-key ${isChordTone ? 'chord-tone-key' : ''} ${isDisabled ? 'disabled' : ''} ${isHovered ? 'hovered' : ''}"
                style="left: ${k.left}px; ${isChordTone && !isHovered ? `background: ${chordBg};` : ''}"
                @click=${() => { if (!isDisabled) this.onSelectPitch(k.name); }}
                @pointerenter=${() => {
                  if (!isDisabled) {
                    this.hoverPitchClass = k.pc;
                    playLeadNote(`${k.name}${this.bloomOctave}`, 0.18);
                  }
                }}
                @pointerleave=${() => { if (this.hoverPitchClass === k.pc) this.hoverPitchClass = null; }}
              >
                <span class="key-mark ${isMarked ? 'visible' : ''}"></span>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
