import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import {
  Alternative,
  ChordBlock,
  TheoryGroup,
  BorrowedChordRow,
  Progression,
  buildVoicingNotes,
  rootOfChordName,
  roleForTension,
} from '../services/chord-engine';

const WHITE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_NOTES = [
  { note: 'C#', flat: 'Db', left: '10%' },
  { note: 'D#', flat: 'Eb', left: '24.2857%' },
  { note: 'F#', flat: 'Gb', left: '52.857%' },
  { note: 'G#', flat: 'Ab', left: '67.1428%' },
  { note: 'A#', flat: 'Bb', left: '81.4285%' },
];

const QUALITIES = [
  { label: 'Major', sub: 'bright' },
  { label: 'Minor', sub: 'warm' },
  { label: 'Suspended (sus)', sub: 'floating' },
  { label: 'Diminished', sub: 'unstable' },
];

const EXTS = [
  { label: 'None', sub: 'triad only' },
  { label: '6th', sub: 'soft lift' },
  { label: '7th (dom / m7)', sub: 'classic tension' },
  { label: 'Major 7th (M7)', sub: 'lush, jazzy' },
  { label: '9th', sub: 'wide, colorful' },
];

const GROUP_NOTES: Record<string, [string, string]> = {
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

@customElement('swap-sheet')
export class SwapSheet extends LitElement {
  @property({ type: Object }) chord!: ChordBlock;
  @property({ type: Number }) swapIndex: number | null = null;
  @property({ type: Object }) progression?: Progression;
  @property({ type: Array }) order: number[] = [0, 1, 2, 3];
  @property({ type: Array }) alternatives: Alternative[] = [];
  @property({ type: Array }) theoryGroups: TheoryGroup[] = [];
  @property({ type: Array }) borrowedChords: BorrowedChordRow[] = [];
  @property({ type: Boolean }) showTheory = false;
  @property({ type: String }) moodColor = '#9B7CA8';
  @property({ type: Number }) position = 1;
  @property({ type: Number }) total = 4;
  @property({ type: String }) mode: 'swap' | 'voicing' = 'swap';
  @property({ type: Boolean }) visible = false;
  @property({ type: Number }) resetKey: number | null = null;

  @state() private drillGroup: string | null = null;
  @state() private abPick: ChordBlock | null = null;
  @state() private abSide: 'before' | 'after' = 'before';
  @state() private abPlaying = false;
  @state() private abStep = 0;
  @state() private auditioningChordName: string | null = null;

  @state() private quality = 'Major';
  @state() private extension = 'None';
  @state() private dragY = 0;
  @state() private dragging = false;
  @state() private snapping = false;

  private dragStartY = 0;
  private dragStartTime = 0;
  private auditionTimer?: number;
  private loopTimer?: number;

  @query('.sheet') private sheetEl?: HTMLElement;

  static styles = css`
    :host {
      display: contents;
      font-family: var(--cv-font);
    }
    .scrim {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0);
      z-index: 40;
      transition: background 0.28s ease;
    }
    .scrim.visible {
      background: rgba(46, 39, 31, 0.5);
    }
    .sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-width: 640px;
      margin: 0 auto;
      height: 84%;
      max-height: 84%;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 26px 26px 0 0;
      z-index: 41;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      box-shadow: 0 -20px 50px -20px rgba(0, 0, 0, 0.5);
      transform: translateY(100%);
      transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1);
      overflow: hidden;
    }
    .sheet.visible {
      transform: translateY(0);
    }
    .grabber-wrap {
      padding: 12px 0 0;
      display: flex;
      justify-content: center;
      flex-shrink: 0;
    }
    .grabber {
      width: 38px;
      height: 4px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      touch-action: none;
      cursor: grab;
    }
    .header-pinned {
      padding: 12px 22px 14px;
      flex-shrink: 0;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      background: var(--cv-cream, #FBF3E6);
    }
    .head-top-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .kicker {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
    }
    .sheet-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      margin-top: 4px;
      letter-spacing: -0.01em;
      line-height: 1.2;
    }
    .sheet-title.drill {
      font-size: 17px;
      margin-top: 2px;
    }
    .circle-icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #F1E4D2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--cv-ink, #2E271F);
      flex-shrink: 0;
      border: none;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      text-decoration: none;
    }
    .circle-icon-btn:hover {
      transform: scale(1.06);
    }
    .circle-icon-btn:active {
      transform: scale(0.95);
    }

    /* A/B Compare Box */
    .ab-box {
      background: #F6EADB;
      border-radius: 16px;
      padding: 12px 13px;
      margin-top: 12px;
    }
    .ab-toggles {
      display: flex;
      gap: 7px;
    }
    .ab-side-btn {
      flex: 1;
      min-width: 0;
      text-align: left;
      border-radius: 14px;
      padding: 10px 12px;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: all 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
      background: #F1E4D2;
      color: #2E271F;
      opacity: 0.72;
    }
    .ab-side-btn.active-now {
      background: #5E5142;
      color: #FBF3E6;
      opacity: 1;
      box-shadow: 0 8px 18px -10px rgba(46, 39, 31, 0.5);
    }
    .ab-side-btn.active-swap {
      opacity: 1;
      color: #2E271F;
      box-shadow: 0 8px 18px -10px rgba(46, 39, 31, 0.5);
    }
    .ab-side-btn.empty-swap {
      background: transparent;
      border: 1.5px dashed rgba(46, 39, 31, 0.22);
      color: rgba(46, 39, 31, 0.45);
      cursor: default;
      opacity: 1;
    }
    .ab-side-label {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      opacity: 0.65;
    }
    .ab-side-val {
      font-size: 14.5px;
      font-weight: 800;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ab-control-row {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-top: 10px;
    }
    .ab-play-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      cursor: pointer;
      border: none;
      background: #E8D9C2;
      color: #2E271F;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .ab-play-btn.playing {
      color: #2E271F;
    }
    .ab-play-btn:hover {
      transform: scale(1.05);
    }
    .ab-play-btn:active {
      transform: scale(0.95);
    }
    .ab-hint-text {
      font-size: 11px;
      color: #6B5F50;
      line-height: 1.45;
    }

    /* Loop Micro-Cells */
    .loop-cells {
      display: flex;
      gap: 5px;
      flex: 1;
      min-width: 0;
    }
    .loop-cell {
      flex: 1;
      min-width: 0;
      height: 40px;
      border-radius: 11px;
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
      background: #F1E4D2;
      color: #2E271F;
      opacity: 0.6;
      border: none;
      font-family: inherit;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease), background 150ms var(--cv-ease);
    }
    .loop-cell:hover {
      opacity: 0.9;
    }
    .loop-cell:active {
      transform: scale(0.96);
    }
    .loop-cell.active-step {
      opacity: 1 !important;
      transform: scale(1.06);
      box-shadow: inset 0 0 0 2.5px #2E271F !important;
      z-index: 2;
    }
    .ab-side-btn.active-step-bar {
      box-shadow: 0 8px 18px -10px rgba(46, 39, 31, 0.5), inset 0 0 0 2.5px #2E271F !important;
      transform: scale(1.02);
    }

    /* Scrollable Body */
    .sheet-scroll-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 16px 22px 20px;
    }
    .section-header-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label, #8A6B3F);
      text-transform: uppercase;
    }
    .l2-note {
      font-size: 11.5px;
      line-height: 1.55;
      color: #6B5F50;
      margin-bottom: 12px;
    }

    /* Cards */
    .feeling-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-top: 10px;
    }
    .feeling-row {
      display: flex;
      align-items: center;
      gap: 13px;
      background: #F6EADB;
      border-radius: 15px;
      padding: 11px 14px;
      cursor: pointer;
      border: none;
      text-align: left;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .feeling-row:hover {
      background: #F0E2D1;
      transform: translateY(-1px);
    }
    .feeling-row:active {
      transform: scale(0.985);
    }
    .feeling-name {
      font-size: 14.5px;
      font-weight: 800;
      color: #2E271F;
    }
    .feeling-sub {
      font-size: 11.5px;
      color: #6B5F50;
      margin-top: 1px;
    }
    .chevron {
      font-size: 15px;
      color: rgba(46, 39, 31, 0.35);
      flex-shrink: 0;
    }

    .borrow-row {
      display: flex;
      align-items: center;
      gap: 13px;
      background: #EFE6D6;
      border-radius: 15px;
      padding: 11px 14px;
      margin-top: 14px;
      cursor: pointer;
      border: none;
      text-align: left;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), transform 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));
    }
    .borrow-row:hover {
      background: #E8DDCA;
      transform: translateY(-1px);
    }
    .borrow-row:active {
      transform: scale(0.985);
    }
    .borrow-swatch {
      display: flex;
      gap: 3px;
      flex-shrink: 0;
    }
    .borrow-bar-1 {
      width: 9px;
      height: 22px;
      border-radius: 3px;
      background: #9CC0EC;
    }
    .borrow-bar-2 {
      width: 9px;
      height: 22px;
      border-radius: 3px;
      background: #C9A9E0;
    }

    /* Level 2 Candidate Cards */
    .candidate-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .candidate-card {
      display: flex;
      align-items: center;
      gap: 13px;
      background: #F6EADB;
      border-radius: 16px;
      padding: 12px 14px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: background 150ms var(--cv-ease), transform 150ms var(--cv-ease);
      border: none;
      text-align: left;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
    }
    .candidate-card:hover {
      background: #F1E2CE;
      transform: translateY(-1px);
    }
    .candidate-card:active {
      transform: scale(0.985);
    }
    .candidate-card.selected {
      background: #F6EDF8;
    }
    .candidate-title-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .candidate-name {
      font-size: 15px;
      font-weight: 800;
      color: #2E271F;
    }
    .candidate-roman {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #7A5C88;
    }
    .candidate-sub {
      font-size: 11.5px;
      color: #6B5F50;
      margin-top: 2px;
    }
    .candidate-notes {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.4px;
      color: var(--cv-label, #8A6B3F);
      margin-top: 4px;
    }
    .card-play-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #2E271F;
      background: #DCEAF9;
      border: none;
      cursor: pointer;
      transition: background 150ms var(--cv-ease), transform 150ms var(--cv-ease);
    }
    .card-play-btn:hover {
      transform: scale(1.1);
    }
    .card-play-btn:active {
      transform: scale(0.92);
    }

    .audition-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(155, 124, 168, 0.2);
      overflow: hidden;
    }
    .audition-progress-bar {
      height: 100%;
      width: 100%;
      background: var(--cv-plum, #9B7CA8);
      transform-origin: left;
      animation: cvfv-progress 2.6s linear infinite;
    }

    @keyframes cvfv-progress {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }

    /* Pinned Bottom Commit Bar */
    .commit-pinned {
      flex-shrink: 0;
      padding: 12px 22px 22px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      background: var(--cv-cream, #FBF3E6);
    }
    .commit-row {
      display: flex;
      gap: 9px;
    }
    .cancel-btn {
      text-align: center;
      border-radius: 100px;
      padding: 14px 18px;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.18);
      color: #6B5F50;
      font-size: 14px;
      font-weight: 700;
      background: transparent;
      border: none;
      cursor: pointer;
      flex-shrink: 0;
      font-family: inherit;
      transition: background 150ms var(--cv-ease);
    }
    .cancel-btn:hover {
      background: rgba(46, 39, 31, 0.04);
    }
    .cancel-btn:active {
      transform: scale(0.98);
    }
    .accept-btn {
      flex: 1;
      text-align: center;
      border-radius: 100px;
      padding: 14px 16px;
      font-size: 14.5px;
      font-weight: 800;
      border: none;
      font-family: inherit;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease), opacity 150ms var(--cv-ease);
    }
    .accept-btn.active {
      color: #2E271F;
      box-shadow: 0 12px 24px -14px rgba(46, 39, 31, 0.55);
    }
    .accept-btn.active:hover {
      transform: translateY(-1px);
    }
    .accept-btn.active:active {
      transform: scale(0.98);
    }
    .accept-btn.disabled {
      background: #EDE0CC;
      color: rgba(46, 39, 31, 0.4);
      cursor: default;
      pointer-events: none;
    }

    /* Voicing Section */
    .voicing-section {
      border-top: 1px solid var(--cv-ink-10, rgba(46,39,31,0.1));
      margin-top: 16px;
      padding-top: 14px;
      flex-shrink: 0;
    }
    .bento {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-top: 10px;
    }
    .bento.ext {
      margin-top: 6px;
    }
    .bento-card {
      padding: 10px 12px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: baseline;
      gap: 6px;
      background: var(--cv-surface, #F6EADB);
      transition: transform 150ms var(--cv-ease), background 150ms var(--cv-ease);
    }
    .bento-card.span {
      grid-column: 1 / -1;
    }
    .bento-card:active {
      transform: scale(0.97);
    }
    .bento-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
    }
    .bento-sub {
      font-size: 10.5px;
      color: var(--cv-ink-45, rgba(46,39,31,0.45));
    }
    .kb-caption {
      font-size: 11px;
      color: var(--cv-ink-45, rgba(46,39,31,0.45));
      margin-top: 10px;
    }
    .keyboard {
      position: relative;
      display: flex;
      margin-top: 6px;
      border-radius: 10px;
      overflow: hidden;
    }
    .white-key {
      flex: 1;
      height: 72px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
      border-right: 1px solid var(--cv-ink-08, rgba(46,39,31,0.08));
      font-size: 10px;
      font-weight: 700;
      background: var(--cv-cream, #FBF3E6);
      color: var(--cv-ink-35, rgba(46,39,31,0.35));
    }
    .white-key.active {
      color: var(--cv-ink, #2E271F);
    }
    .black-key {
      position: absolute;
      top: 0;
      width: 8.5714%;
      height: 44px;
      background: var(--cv-ink, #2E271F);
      border-radius: 0 0 6px 6px;
      z-index: 2;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('pointermove', this.onGrabberMove);
    window.addEventListener('pointerup', this.onGrabberUp);
    window.addEventListener('pointercancel', this.onGrabberUp);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointermove', this.onGrabberMove);
    window.removeEventListener('pointerup', this.onGrabberUp);
    window.removeEventListener('pointercancel', this.onGrabberUp);
    if (this.auditionTimer) clearTimeout(this.auditionTimer);
    this.stopABLoop();
  }

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private close() {
    this.stopABLoop();
    this.drillGroup = null;
    this.abPick = null;
    this.abSide = 'before';
    this.emit('close');
  }

  private onSheetBackgroundClick(e: PointerEvent) {
    if (e.target === e.currentTarget) this.close();
  }

  private onGrabberDown = (e: PointerEvent) => {
    e.preventDefault();
    this.dragStartY = e.clientY;
    this.dragStartTime = performance.now();
    this.dragging = true;
    this.snapping = false;
    this.dragY = 0;
  };

  private onGrabberMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.dragY = Math.max(0, e.clientY - this.dragStartY);
  };

  private onGrabberUp = () => {
    if (!this.dragging) return;
    this.dragging = false;
    const elapsed = Math.max(1, performance.now() - this.dragStartTime);
    const velocity = this.dragY / elapsed;
    const sheetHeight = this.sheetEl?.getBoundingClientRect().height || 400;
    const pastThreshold = this.dragY > sheetHeight * 0.3 || velocity > 0.6;

    this.snapping = true;
    if (pastThreshold) {
      this.dragY = sheetHeight + 80;
      setTimeout(() => {
        this.close();
      }, 260);
    } else {
      this.dragY = 0;
      setTimeout(() => {
        this.snapping = false;
      }, 260);
    }
  };

  private stopABLoop() {
    this.abPlaying = false;
    if (this.loopTimer) {
      clearInterval(this.loopTimer);
      this.loopTimer = undefined;
    }
  }

  private startABLoop() {
    this.stopABLoop();
    this.abPlaying = true;
    this.abStep = 0;
    this.playStepChord(0);
    this.loopTimer = window.setInterval(() => {
      if (!this.abPlaying) return;
      const total = this.order.length || 4;
      this.abStep = (this.abStep + 1) % total;
      this.playStepChord(this.abStep);
    }, 1700);
  }

  private playStepChord(stepIdx: number) {
    if (!this.progression) return;
    const chordIdx = this.order[stepIdx] ?? stepIdx;
    const isTarget = this.swapIndex !== null ? chordIdx === this.swapIndex : stepIdx === (this.position - 1);
    const isSwapped = isTarget && this.abSide === 'after' && this.abPick;
    const chordToPlay = isSwapped && this.abPick
      ? this.abPick
      : (isTarget ? (this.abSide === 'after' && this.abPick ? this.abPick : this.chord) : this.progression.chords[chordIdx]);
    if (chordToPlay) {
      this.auditionChordSolo(chordToPlay);
    }
  }

  private toggleABLoop() {
    if (this.abPlaying) {
      this.stopABLoop();
    } else {
      this.startABLoop();
    }
  }

  private setABSide(side: 'before' | 'after') {
    if (side === 'after' && !this.abPick) return;
    this.abSide = side;
    if (side === 'before') {
      this.auditionChordSolo(this.chord);
    } else if (side === 'after' && this.abPick) {
      this.auditionChordSolo(this.abPick);
    }
  }

  private pickCandidate(chord: ChordBlock) {
    this.stopABLoop();
    this.abPick = chord;
    this.abSide = 'after';
    this.auditionChordSolo(chord);
  }

  private onCandidatePlayClick(chord: ChordBlock) {
    const isSameSelected = this.abPick?.name === chord.name;
    if (isSameSelected && this.abPlaying) {
      this.stopABLoop();
    } else {
      this.abPick = chord;
      this.abSide = 'after';
      this.startABLoop();
    }
  }

  private onCellClick(chordIdx: number, cellChord: ChordBlock, stepIdx: number) {
    this.abStep = stepIdx;
    this.auditionChordSolo(cellChord);
  }

  private auditionChordSolo(chord: ChordBlock) {
    this.auditioningChordName = chord.name;
    if (this.auditionTimer) clearTimeout(this.auditionTimer);
    this.auditionTimer = window.setTimeout(() => {
      this.auditioningChordName = null;
    }, 2600);
    this.emit('audition-chord', chord);
  }

  private commitSwap() {
    if (!this.abPick) return;
    this.stopABLoop();
    this.emit('select-alternative', { chord: this.abPick });
  }

  private setQuality(label: string) {
    this.quality = label;
    this.previewVoicing();
    this.commitVoicing();
  }

  private setExtension(label: string) {
    this.extension = label;
    this.previewVoicing();
    this.commitVoicing();
  }

  private previewVoicing() {
    const root = rootOfChordName(this.chord.name);
    const preferFlat = root.includes('b');
    const notes = buildVoicingNotes(root, this.quality, this.extension, preferFlat);
    this.emit('voicing-preview', notes);
  }

  private commitVoicing() {
    this.emit('voicing-change', { quality: this.quality, extension: this.extension });
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('resetKey')) {
      this.drillGroup = null;
      this.abPick = null;
      this.abSide = 'before';
      this.quality = 'Major';
      this.extension = 'None';
      this.auditioningChordName = null;
    }
  }

  render() {
    const c = this.chord;
    if (!c) return html``;

    const dragStyle = this.dragging || this.snapping
      ? `transform: translateY(${this.dragY}px); transition: ${this.dragging ? 'none' : 'transform .26s cubic-bezier(.32,.72,0,1)'};`
      : '';

    return html`
      <div class="scrim ${this.visible ? 'visible' : ''}" @pointerdown=${this.close}></div>
      <div class="sheet ${this.visible ? 'visible' : ''}" style=${dragStyle} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber-wrap" @pointerdown=${this.onGrabberDown}>
          <div class="grabber"></div>
        </div>

        ${this.mode === 'voicing' ? this.renderVoicingHeader() : this.renderSwapHeader()}

        <div class="sheet-scroll-body">
          ${this.mode === 'voicing' ? this.renderVoicingBody() : (this.drillGroup ? this.renderLevel2Body() : this.renderLevel1Body())}
        </div>

        ${this.renderCommitFooter()}
      </div>
    `;
  }

  private renderSwapHeader() {
    const isL2 = Boolean(this.drillGroup);
    const keyName = this.progression?.key || 'C';
    const isMinor = this.progression?.scaleType?.includes('MINOR') ?? false;

    let l2Title = '';
    if (this.drillGroup === 'Borrowed') {
      l2Title = isMinor ? `Borrowed from ${keyName} major` : `Borrowed from ${keyName} minor`;
    } else if (this.drillGroup) {
      l2Title = `${this.drillGroup} — three chords`;
    }

    return html`
      <div class="header-pinned">
        <div class="head-top-row">
          ${isL2 ? html`
            <div style="display:flex;align-items:center;gap:12px;">
              <button
                class="circle-icon-btn"
                @click=${() => { this.drillGroup = null; }}
                aria-label="Back to feelings"
              >‹</button>
              <div>
                <div class="kicker">Bar ${this.position} · ${this.drillGroup}</div>
                <div class="sheet-title drill">${l2Title}</div>
              </div>
            </div>
          ` : html`
            <div>
              <div class="kicker">Bar ${this.position} of ${this.total}</div>
              <div class="sheet-title">Swap this chord</div>
            </div>
          `}
          <button class="circle-icon-btn" @click=${this.close} aria-label="Close">×</button>
        </div>

        <!-- Pinned A/B Compare Box -->
        <div class="ab-box">
          <div class="ab-toggles">
            ${(() => {
              const isTargetActive = this.abPlaying && (this.swapIndex !== null ? this.order[this.abStep] === this.swapIndex : this.abStep === (this.position - 1));
              return html`
                <button
                  class="ab-side-btn ${this.abSide === 'before' ? 'active-now' : ''} ${isTargetActive && this.abSide === 'before' ? 'active-step-bar' : ''}"
                  @click=${() => this.setABSide('before')}
                >
                  <div class="ab-side-label">Now</div>
                  <div class="ab-side-val">${this.chord.name}</div>
                </button>

                ${this.abPick ? html`
                  <button
                    class="ab-side-btn ${this.abSide === 'after' ? 'active-swap' : ''} ${isTargetActive && this.abSide === 'after' ? 'active-step-bar' : ''}"
                    style=${this.abSide === 'after' ? `background:${this.moodColor};` : ''}
                    @click=${() => this.setABSide('after')}
                  >
                    <div class="ab-side-label">Swap</div>
                    <div class="ab-side-val">${this.abPick.name}</div>
                  </button>
                ` : html`
                  <div class="ab-side-btn empty-swap">
                    <div class="ab-side-label">Swap</div>
                    <div class="ab-side-val">Pick one below</div>
                  </div>
                `}
              `;
            })()}
          </div>

          <div class="ab-control-row">
            <button
              class="ab-play-btn ${this.abPlaying ? 'playing' : ''}"
              style=${this.abPlaying ? `background:${this.moodColor};` : ''}
              @click=${() => this.toggleABLoop()}
              aria-label=${this.abPlaying ? 'Pause loop audition' : 'Play loop audition'}
            >
              ${this.abPlaying ? '❚❚' : '▶'}
            </button>

            ${isL2 ? html`
              <div class="loop-cells">
                ${this.order.map((chordIdx, stepIdx) => {
                  const isTarget = this.swapIndex !== null ? chordIdx === this.swapIndex : stepIdx === (this.position - 1);
                  const isSwapped = isTarget && this.abSide === 'after' && this.abPick;
                  const cellChord = isSwapped && this.abPick
                    ? this.abPick
                    : (isTarget ? this.chord : this.progression?.chords[chordIdx]);
                  const label = cellChord?.name || '';
                  const isActiveStep = this.abPlaying && this.abStep === stepIdx;
                  return html`
                    <button
                      class="loop-cell ${isTarget ? 'target-bar' : ''} ${isSwapped ? 'swapped' : ''} ${isActiveStep ? 'active-step' : ''}"
                      style=${isSwapped ? `background:${this.moodColor};` : ''}
                      @click=${() => { if (cellChord) this.onCellClick(chordIdx, cellChord, stepIdx); }}
                      title="Play ${label}"
                    >
                      ${label}
                    </button>
                  `;
                })}
              </div>
            ` : html`
              <div class="ab-hint-text">
                ${this.abPlaying
                  ? `Loop is running — tap either side to flip bar ${this.position} as it plays.`
                  : `Tap ▶ to hear bar ${this.position} auditioned inside your loop.`}
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  private renderLevel1Body() {
    const isMinor = this.progression?.scaleType?.includes('MINOR') ?? false;

    return html`
      <div class="section-header-label">Choose a feeling</div>
      <div class="feeling-list">
        ${this.theoryGroups.map(g => {
          const role = roleForTension(g.tension);
          return html`
            <button class="feeling-row" @click=${() => { this.drillGroup = g.name; }}>
              <div
                style="width:30px;height:30px;border-radius:${Math.round(role.radius * 0.38)}px;background:${role.color};flex-shrink:0;"
              ></div>
              <div style="flex:1;min-width:0;">
                <div class="feeling-name">${g.name}</div>
                <div class="feeling-sub">${g.sub} · ${g.rows.length} chords</div>
              </div>
              <div class="chevron">›</div>
            </button>
          `;
        })}
      </div>

      <button class="borrow-row" @click=${() => { this.drillGroup = 'Borrowed'; }}>
        <div class="borrow-swatch">
          <div class="borrow-bar-1"></div>
          <div class="borrow-bar-2"></div>
        </div>
        <div style="flex:1;min-width:0;">
          <div class="feeling-name">
            ${isMinor ? 'Borrow a brighter chord' : 'Borrow a sadder chord'}
          </div>
          <div class="feeling-sub">
            4 chords from the ${isMinor ? 'major' : 'minor'} version of this key
          </div>
        </div>
        <div class="chevron">›</div>
      </button>
    `;
  }

  private renderLevel2Body() {
    const isBorrowed = this.drillGroup === 'Borrowed';
    const isMinor = this.progression?.scaleType?.includes('MINOR') ?? false;

    let note = '';
    if (isBorrowed) {
      note = this.showTheory
        ? `Modal interchange — four chords from the parallel ${isMinor ? 'major' : 'minor'}, each matched to the chord it can stand in for.`
        : `Four chords from the ${isMinor ? 'major' : 'minor'} version of this key. Each one swaps in for a chord you already have.`;
    } else if (this.drillGroup && GROUP_NOTES[this.drillGroup]) {
      note = GROUP_NOTES[this.drillGroup][this.showTheory ? 1 : 0];
    }

    const rows: { name: string; roman?: string; notes?: string[]; sub: string; chord: ChordBlock; tension: number }[] = isBorrowed
      ? this.borrowedChords
      : (this.theoryGroups.find(g => g.name === this.drillGroup)?.rows || []);

    return html`
      <div class="l2-note">${note}</div>

      <div class="candidate-list">
        ${rows.map(r => {
          const isSelected = this.abPick?.name === r.name;
          const role = roleForTension(r.tension);
          const isAuditioning = this.auditioningChordName === r.name;

          return html`
            <div
              class="candidate-card ${isSelected ? 'selected' : ''}"
              style=${isSelected ? `box-shadow:inset 0 0 0 1.5px ${this.moodColor};` : ''}
              @click=${() => this.pickCandidate(r.chord)}
            >
              <div
                style="width:28px;height:28px;border-radius:${Math.round(role.radius * 0.35)}px;background:${role.color};flex-shrink:0;"
              ></div>
              <div style="flex:1;min-width:0;">
                <div class="candidate-title-row">
                  <div class="candidate-name">${r.name}</div>
                  ${this.showTheory && r.roman ? html`<div class="candidate-roman">${r.roman}</div>` : ''}
                </div>
                <div class="candidate-sub">${r.sub}</div>
                ${this.showTheory && r.notes && r.notes.length > 0 ? html`
                  <div class="candidate-notes">${r.notes.join(' · ')}</div>
                ` : ''}
              </div>

              <button
                class="card-play-btn"
                style=${isSelected ? `background:${this.moodColor};` : ''}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.onCandidatePlayClick(r.chord);
                }}
                aria-label="Audition ${r.name}"
              >
                ${isSelected && this.abPlaying ? '❚❚' : '▶'}
              </button>

              ${isAuditioning ? html`
                <div class="audition-progress">
                  <div class="audition-progress-bar"></div>
                </div>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }

  private renderVoicingHeader() {
    return html`
      <div class="header-pinned">
        <div class="head-top-row">
          <div>
            <div class="kicker">Chord ${this.position} of ${this.total}</div>
            <div class="sheet-title">Adjust the voicing</div>
          </div>
          <button class="circle-icon-btn" @click=${this.close} aria-label="Close">×</button>
        </div>
      </div>
    `;
  }

  private renderVoicingBody() {
    const root = rootOfChordName(this.chord.name);
    const preferFlat = root.includes('b');
    const voicingNotes = buildVoicingNotes(root, this.quality, this.extension, preferFlat);

    return html`
      <div class="voicing-section">
        <div class="bento">
          ${QUALITIES.map(q => html`
            <div
              class="bento-card"
              style=${q.label === this.quality ? `background:${this.moodColor}` : ''}
              @click=${() => this.setQuality(q.label)}
            >
              <div class="bento-label">${q.label}</div>
              <div class="bento-sub">${q.sub}</div>
            </div>
          `)}
        </div>
        <div class="bento ext">
          ${EXTS.map((e, i) => html`
            <div
              class="bento-card ${i === 0 ? 'span' : ''}"
              style=${e.label === this.extension ? `background:${this.moodColor}` : ''}
              @click=${() => this.setExtension(e.label)}
            >
              <div class="bento-label">${e.label}</div>
              <div class="bento-sub">${e.sub}</div>
            </div>
          `)}
        </div>
        <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
        <div class="keyboard">
          ${WHITE_NOTES.map(n => html`
            <div
              class="white-key ${voicingNotes.includes(n) ? 'active' : ''}"
              style=${voicingNotes.includes(n) ? `background:${this.moodColor}` : ''}
            >${n}</div>
          `)}
          ${BLACK_NOTES.map(b => html`
            <div
              class="black-key"
              style="left:${b.left};${(voicingNotes.includes(b.note) || voicingNotes.includes(b.flat)) ? `background:${this.moodColor}` : ''}"
            ></div>
          `)}
        </div>
      </div>
    `;
  }

  private renderCommitFooter() {
    if (this.mode === 'voicing') {
      return html`
        <div class="commit-pinned">
          <div class="commit-row">
            <button class="accept-btn active" style="background:${this.moodColor};" @click=${this.close}>
              Done
            </button>
          </div>
        </div>
      `;
    }

    return html`
      <div class="commit-pinned">
        <div class="commit-row">
          <button class="cancel-btn" @click=${this.close}>Cancel</button>
          ${this.abPick ? html`
            <button
              class="accept-btn active"
              style="background:${this.moodColor};"
              @click=${() => this.commitSwap()}
            >
              Keep ${this.abPick.name}
            </button>
          ` : html`
            <button class="accept-btn disabled">
              Pick a chord to hear it
            </button>
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swap-sheet': SwapSheet;
  }
}
