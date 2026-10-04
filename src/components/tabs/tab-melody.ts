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

    /* Loop Mode Toggle */
    .loop-mode-toggle {
      display: inline-flex;
      align-items: center;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 3px;
      gap: 2px;
    }

    .loop-mode-btn {
      border: none;
      font-family: inherit;
      background: transparent;
      padding: 4px 10px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease;
      white-space: nowrap;
    }

    .loop-mode-btn:hover {
      color: var(--cv-ink, #2E271F);
    }

    .loop-mode-btn.active {
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
  isMobile = false;

  @property({ type: String })
  melodyLoop: 'Section' | 'Chord' | 'Span' = 'Section';

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
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
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
    });
    this.melodyTrack = track;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track }, bubbles: true, composed: true }));
  }

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

  private onSetLoopMode(mode: 'Section' | 'Chord' | 'Span') {
    this.melodyLoop = mode;
    this.dispatchEvent(new CustomEvent('melody-loop-change', {
      detail: { melodyLoop: mode, loop: mode },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
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
    if (this.selectedGlobalStep === null || !this.progression) return;

    const barIndex = Math.floor(this.selectedGlobalStep / 16);
    const stepInBar = this.selectedGlobalStep % 16;
    const chord = this.progression.chords[barIndex] || this.progression.chords[0];
    const pitch = `${pitchNameWithoutOct}${this.bloomOctave}`;
    const midi = noteToMidiNumber(pitch);

    // Guide mode enforcement
    if (this.guideMode === 'strict-chord') {
      const matrix = getHarmonicChordMatrix(chord, this.progression.key, this.progression.scaleType);
      const pc = midi % 12;
      const allowed = this.strictBy === 'chord' ? matrix.chordTonePcs : [...matrix.chordTonePcs, ...matrix.tensionPcs];
      if (!allowed.includes(pc)) {
        this.dispatchEvent(new CustomEvent('toast', { detail: 'Strict mode: pick an allowed tone', bubbles: true, composed: true }));
        return;
      }
    }

    const classification = classifyPitch(midi, chord, this.progression.key, this.progression.scaleType);
    playLeadNote(pitch, 0.4);

    const otherNotes = (this.melodyTrack?.notes || []).filter(
      n => !(n.barIndex === barIndex && n.stepInBar === stepInBar)
    );

    // Safe duration calculation capped by next note or bar end
    const otherNotesInBar = otherNotes.filter(n => n.barIndex === barIndex && n.stepInBar > stepInBar);
    const nextOnset = otherNotesInBar.length > 0
      ? Math.min(...otherNotesInBar.map(n => n.stepInBar))
      : 16;
    const availableSteps = nextOnset - stepInBar;
    const initialSteps = Math.max(1, Math.min(2, availableSteps));

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
    this.closeBloom();
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

            ${noteCount > 0 ? html`
              <button class="clear-text-btn clear-melody-btn" @click=${this.onClearMelody} aria-label="Clear melody" title="Clear all notes">
                Clear
              </button>
            ` : ''}
          </div>

          <div class="quick-actions-bar">
            ${this.guideMode === 'strict-chord' ? html`
              <div class="segmented-control" role="radiogroup" aria-label="Strict filter by">
                <button
                  class="segment-btn ${this.strictBy === 'scale' ? 'active' : ''}"
                  @click=${() => this.strictBy = 'scale'}
                  role="radio"
                  aria-checked="${this.strictBy === 'scale'}"
                >
                  Scale
                </button>
                <button
                  class="segment-btn ${this.strictBy === 'chord' ? 'active' : ''}"
                  @click=${() => this.strictBy = 'chord'}
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

            <!-- Loop Mode Control: Section / Chord / Span -->
            <div class="loop-mode-toggle" role="radiogroup" aria-label="Melody loop mode">
              <button
                class="loop-mode-btn ${this.melodyLoop === 'Section' ? 'active' : ''}"
                @click=${() => this.onSetLoopMode('Section')}
                title="Loop whole section"
              >
                Section
              </button>
              <button
                class="loop-mode-btn ${this.melodyLoop === 'Chord' ? 'active' : ''}"
                @click=${() => this.onSetLoopMode('Chord')}
                title="Loop active chord row"
              >
                Chord
              </button>
              <button
                class="loop-mode-btn ${this.melodyLoop === 'Span' ? 'active' : ''}"
                @click=${() => this.onSetLoopMode('Span')}
                title="Loop custom span (Shift-click steps to set)"
              >
                ${this.melodyLoop === 'Span' ? `Span ${this.span[0] + 1}–${this.span[1]}` : 'Span'}
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
