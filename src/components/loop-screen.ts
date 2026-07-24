import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Progression, ChordBlock, Alternative, ShareDevice, buildDeviceShareUrl,
  MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH, getMoodColor, roleForTension, MOODS,
} from '../services/chord-engine';
import './swap-sheet';
import './share-modal';

const MENU_GENRES = ['Pop', 'Lo-fi/Chill', 'R&B/Soul', 'Indie/Folk', 'Synthwave', 'Jazz-ish', 'Gospel', 'Cinematic', 'Rock', 'House/Dance'];
const MENU_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const MENU_SCALES: { label: string; value: string }[] = [
  { label: 'Major', value: 'MAJOR' },
  { label: 'Minor', value: 'NATURAL_MINOR' },
  { label: 'Harmonic Minor', value: 'HARMONIC_MINOR' },
  { label: 'Dorian', value: 'DORIAN' },
  { label: 'Mixolydian', value: 'MIXOLYDIAN' },
  { label: 'Lydian', value: 'LYDIAN' },
];

// The design animates the menu popover/backdrop in on mount and out before unmount:
// set the `mounted` flag immediately, flip `visible` a frame later so the CSS transition
// runs, and reverse that order on close so the fade-out plays before the DOM is removed.
const MENU_CLOSE_MS = 220;
const SHEET_CLOSE_MS = 280;

// Container-level "alive" motion per mood — the whole progression panel sways/ripples,
// while each chord's own shape/size/color stays fixed to its harmonic role.
const PANEL_ANIM: Record<string, { anim: string; dur: number; ease: string }> = {
  Uplifting: { anim: 'cv-panel-uplifting', dur: 2.4, ease: 'ease-out' },
  Melancholy: { anim: 'cv-panel-melancholy', dur: 6, ease: 'ease-in-out' },
  Dreamy: { anim: 'cv-panel-dreamy', dur: 7, ease: 'ease-in-out' },
  Tense: { anim: 'cv-panel-tense', dur: 0.9, ease: 'ease-in-out' },
  Warm: { anim: 'cv-panel-warm', dur: 4.2, ease: 'ease-in-out' },
  Nostalgic: { anim: 'cv-panel-nostalgic', dur: 5.4, ease: 'ease-in-out' },
};

@customElement('loop-screen')
export class LoopScreen extends LitElement {
  @property({ type: Object }) progression!: Progression;
  @property({ type: Number }) activeIndex = 0;
  @property({ type: Array }) order: number[] = [0, 1, 2, 3];
  @property({ type: Boolean }) playing = true;
  @property({ type: Boolean }) showTheory = false;
  @property({ type: Boolean }) sheetOpen = false;
  @property({ type: Object }) swapChord: ChordBlock | null = null;
  @property({ type: Number }) swapIndex: number | null = null;
  @property({ type: Array }) alternatives: Alternative[] = [];

  @state() private menuMounted = false;
  @state() private menuVisible = false;
  @state() private shareMounted = false;
  @state() private shareVisible = false;
  @state() private sheetMounted = false;
  @state() private sheetVisible = false;
  @state() private toast: string | null = null;
  @state() private spinning = false;
  @state() private drag: { pos: number; offsetX: number; offsetY: number } | null = null;

  private menuCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private shareCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private sheetCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  // Drag-to-reorder: press-and-hold (150ms, without moving >8px) starts a drag instead of a
  // tap, so a quick tap still previews the chord. On release, the dragged chip drops into
  // whichever chip's measured center it's now closest to — simple nearest-neighbor placement
  // that works regardless of how the flex-wrap panel has reflowed the (variably-sized, by
  // tension) chips.
  private pressTimer: ReturnType<typeof setTimeout> | null = null;
  private pressTapFn: (() => void) | null = null;
  private pressStartX = 0;
  private pressStartY = 0;
  private lastPointerX = 0;
  private lastPointerY = 0;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('pointermove', this.onDragMove);
    window.addEventListener('pointerup', this.onDragEnd);
    window.addEventListener('pointercancel', this.onDragEnd);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.menuCloseTimer) clearTimeout(this.menuCloseTimer);
    if (this.shareCloseTimer) clearTimeout(this.shareCloseTimer);
    if (this.sheetCloseTimer) clearTimeout(this.sheetCloseTimer);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    if (this.pressTimer) clearTimeout(this.pressTimer);
    window.removeEventListener('pointermove', this.onDragMove);
    window.removeEventListener('pointerup', this.onDragEnd);
    window.removeEventListener('pointercancel', this.onDragEnd);
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    @keyframes cv-panel-uplifting {
      0%, 100% { border-radius: 32px; transform: scale(1); }
      50% { border-radius: 44px 24px 40px 26px; transform: scale(1.008); }
    }
    @keyframes cv-panel-melancholy {
      0%, 100% { border-radius: 32px; transform: rotate(0deg); }
      50% { border-radius: 22px 34px 46px 28px; transform: rotate(-0.4deg); }
    }
    @keyframes cv-panel-dreamy {
      0%, 100% { border-radius: 32px; }
      33% { border-radius: 44px 24px 42px 22px; }
      66% { border-radius: 22px 42px 24px 44px; }
    }
    @keyframes cv-panel-tense {
      0%, 100% { border-radius: 32px; transform: translateX(0); }
      20% { border-radius: 38px 22px 28px 34px; transform: translateX(-1px); }
      40% { border-radius: 22px 34px 38px 24px; transform: translateX(1px); }
      60% { border-radius: 34px 24px 22px 38px; transform: translateX(-1px); }
      80% { border-radius: 24px 38px 34px 22px; transform: translateX(1px); }
    }
    @keyframes cv-panel-warm {
      0%, 100% { border-radius: 32px; transform: scale(1); }
      50% { border-radius: 40px 34px 40px 34px; transform: scale(1.006); }
    }
    @keyframes cv-panel-nostalgic {
      0%, 100% { border-radius: 32px; transform: rotate(0deg); }
      50% { border-radius: 24px 40px 26px 38px; transform: rotate(-0.3deg); }
    }
    @keyframes cv-bg-drift-a {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(0, -7px) rotate(1.5deg); }
    }
    @keyframes cv-bg-drift-b {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(0, 6px) rotate(-1.5deg); }
    }
    @keyframes cv-now-pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 24px 20px 40px;
    }
    .top-bar {
      width: 100%;
      max-width: 640px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: var(--cv-surface-2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--cv-ink);
      cursor: pointer;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .wordmark-text {
      font-size: 14px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .content {
      width: 100%;
      max-width: 640px;
      margin-top: 24px;
    }
    .step-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface);
      border: 1.5px solid var(--cv-ink-10);
      padding: 6px 15px;
      border-radius: 100px;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 1px;
      color: var(--cv-label);
      text-transform: uppercase;
      margin-bottom: 18px;
    }
    .step-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      transition: background 0.4s ease;
    }
    h1 {
      margin: 0;
      font-size: clamp(24px, 5vw, 36px);
      font-weight: 800;
      line-height: 1.16;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted);
      margin-top: 10px;
    }
    .panel {
      position: relative;
      background: var(--cv-surface);
      border: 1.5px solid var(--cv-ink-08);
      padding: 34px 22px;
      margin-top: 26px;
      overflow: hidden;
      min-height: 180px;
      box-shadow: 0 30px 60px -30px rgba(46, 39, 31, 0.22);
    }
    .panel-blob {
      position: absolute;
      opacity: 0.9;
      pointer-events: none;
    }
    .panel-blob.a {
      left: -40px;
      top: -40px;
      animation: cv-bg-drift-a 11s ease-in-out infinite;
    }
    .panel-blob.b {
      right: -30px;
      bottom: -30px;
      animation: cv-bg-drift-b 13s ease-in-out infinite;
    }
    .chip-row {
      position: relative;
      display: flex;
      gap: 14px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      z-index: 2;
    }
    .chord-chip {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
      touch-action: none;
      user-select: none;
      box-shadow: 0 14px 28px -14px rgba(46, 39, 31, 0.2);
      transition: transform 150ms var(--cv-ease), box-shadow 150ms var(--cv-ease);
    }
    .chord-chip.active {
      transform: scale(1.06);
      box-shadow: 0 18px 34px -14px rgba(46, 39, 31, 0.32);
    }
    .chord-name {
      font-weight: 800;
      color: var(--cv-ink);
      line-height: 1;
    }
    .chord-role {
      font-size: 10.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.55);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 6px;
    }
    .now-marker {
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .now-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--cv-ink);
      animation: cv-now-pulse 1.6s ease-in-out infinite;
    }
    .now-text {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.55);
    }
    .swap-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
      touch-action: manipulation;
    }
    .swap-badge:hover {
      transform: scale(1.12);
    }
    .transport {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-top: 26px;
    }
    .play-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }
    .play-btn:hover {
      transform: scale(1.06);
    }
    .progress-track {
      flex: 1;
      height: 9px;
      border-radius: 6px;
      background: var(--cv-surface);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 6px;
      transition: width 0.3s var(--cv-ease), background 0.4s ease;
    }
    .dice-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--cv-surface-2);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.3s ease, background 0.2s ease;
    }
    .dice-btn:hover {
      background: var(--cv-surface);
    }
    .dice-btn.spinning {
      transform: rotate(360deg);
    }
    .transport-meta {
      text-align: center;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-muted);
      margin-top: 12px;
    }
    .menu-scrim {
      position: fixed;
      inset: -2px;
      z-index: 48;
      background: rgba(46, 39, 31, 0);
      transition: background 0.22s ease, backdrop-filter 0.22s ease;
    }
    .menu-scrim.visible {
      background: rgba(46, 39, 31, 0.06);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
    }
    .menu {
      position: absolute;
      top: 68px;
      right: max(20px, calc(50% - 320px));
      width: 250px;
      background: var(--cv-cream);
      border-radius: 18px;
      box-shadow: 0 24px 44px -18px rgba(46, 39, 31, 0.35);
      z-index: 49;
      padding: 16px;
      box-sizing: border-box;
      transform-origin: top right;
      opacity: 0;
      transform: translateY(-6px) scale(0.94);
      transition: opacity 0.22s cubic-bezier(.16,1,.3,1), transform 0.26s cubic-bezier(.16,1,.3,1);
    }
    .menu.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .menu-label {
      font-size: 10.5px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label);
      font-weight: 800;
    }
    .menu-label.spaced {
      margin-top: 14px;
    }
    .menu-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .menu-chip {
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      background: var(--cv-surface-2);
      color: var(--cv-ink-muted);
      transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
    }
    .menu-chip:active {
      transform: scale(0.95);
    }
    .menu-chip.selected {
      color: var(--cv-ink);
    }
    .menu-nav-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--cv-ink-10);
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }
    .menu-nav-row.first {
      border-top: none;
      padding-top: 0;
    }
    .menu-nav-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
    }
    .menu-nav-arrow {
      font-size: 13px;
      color: var(--cv-label);
    }
    .length-control {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      background: var(--cv-surface-2);
      padding: 10px 12px;
      margin-top: 8px;
    }
    .length-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--cv-cream);
      color: var(--cv-ink);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      flex-shrink: 0;
    }
    .length-btn.disabled {
      opacity: 0.35;
      cursor: default;
    }
    .length-segments {
      display: flex;
      gap: 3px;
      flex: 1;
    }
    .length-segment {
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background: var(--cv-ink-10);
      transition: background 0.25s ease;
    }
    .length-segment.filled {
      background: var(--cv-red);
    }
    .length-label-text {
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted);
      white-space: nowrap;
    }
    .toast {
      position: fixed;
      left: 50%;
      bottom: 40px;
      transform: translateX(-50%);
      background: var(--cv-ink);
      color: var(--cv-cream);
      font-size: 12.5px;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 999px;
      z-index: 70;
      box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.35);
      animation: cv-toast-in 0.3s cubic-bezier(.16,1,.3,1);
      white-space: nowrap;
    }
    @keyframes cv-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(8px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    @media (min-width: 720px) {
      .content { max-width: 760px; }
      .panel { padding: 48px 40px; }
    }
  `;

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('sheetOpen')) {
      if (this.sheetOpen) {
        if (this.sheetCloseTimer) { clearTimeout(this.sheetCloseTimer); this.sheetCloseTimer = null; }
        this.sheetMounted = true;
        requestAnimationFrame(() => requestAnimationFrame(() => { this.sheetVisible = true; }));
      } else {
        this.sheetVisible = false;
        this.sheetCloseTimer = setTimeout(() => { this.sheetMounted = false; }, SHEET_CLOSE_MS);
      }
    }
  }

  private toggleMenu() {
    if (this.menuMounted) this.closeMenu();
    else this.openMenu();
  }

  private openMenu() {
    if (this.menuCloseTimer) { clearTimeout(this.menuCloseTimer); this.menuCloseTimer = null; }
    this.menuMounted = true;
    requestAnimationFrame(() => requestAnimationFrame(() => { this.menuVisible = true; }));
  }

  private closeMenu() {
    this.menuVisible = false;
    this.menuCloseTimer = setTimeout(() => { this.menuMounted = false; }, MENU_CLOSE_MS);
  }

  private openShare() {
    this.closeMenu();
    if (this.shareCloseTimer) { clearTimeout(this.shareCloseTimer); this.shareCloseTimer = null; }
    this.shareMounted = true;
    requestAnimationFrame(() => requestAnimationFrame(() => { this.shareVisible = true; }));
  }

  private closeShare() {
    this.shareVisible = false;
    this.shareCloseTimer = setTimeout(() => { this.shareMounted = false; }, MENU_CLOSE_MS);
  }

  private exportDevice(device: ShareDevice, name: string) {
    this.closeShare();
    const url = buildDeviceShareUrl(this.progression, device);
    window.open(url, '_blank');
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast = name;
    this.toastTimer = setTimeout(() => { this.toast = null; }, 2000);
  }

  private reroll() {
    this.spinning = true;
    setTimeout(() => { this.spinning = false; }, 400);
    this.emit('reroll');
  }

  private pressStart(pos: number, tapFn: () => void, e: PointerEvent) {
    e.preventDefault();
    this.pressTapFn = tapFn;
    this.pressStartX = e.clientX;
    this.pressStartY = e.clientY;
    if (this.pressTimer) clearTimeout(this.pressTimer);
    this.pressTimer = setTimeout(() => {
      this.pressTimer = null;
      this.drag = { pos, offsetX: 0, offsetY: 0 };
    }, 150);
  }

  private onDragMove = (e: PointerEvent) => {
    this.lastPointerX = e.clientX;
    this.lastPointerY = e.clientY;
    if (this.pressTimer && !this.drag) {
      if (Math.abs(e.clientY - this.pressStartY) > 8 || Math.abs(e.clientX - this.pressStartX) > 8) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
      }
      return;
    }
    if (!this.drag) return;
    this.drag = { ...this.drag, offsetX: e.clientX - this.pressStartX, offsetY: e.clientY - this.pressStartY };
  };

  private onDragEnd = () => {
    if (this.pressTimer) { clearTimeout(this.pressTimer); this.pressTimer = null; }
    if (!this.drag) {
      if (this.pressTapFn) this.pressTapFn();
      this.pressTapFn = null;
      return;
    }
    const fromPos = this.drag.pos;
    this.drag = null;
    this.pressTapFn = null;

    const chips = Array.from(this.renderRoot.querySelectorAll('.chord-chip')) as HTMLElement[];
    let targetPos = fromPos;
    let best = Infinity;
    chips.forEach((el, i) => {
      if (i === fromPos) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const d = (this.lastPointerX - cx) ** 2 + (this.lastPointerY - cy) ** 2;
      if (d < best) { best = d; targetPos = i; }
    });

    if (targetPos !== fromPos) {
      const newOrder = [...this.order];
      const [moved] = newOrder.splice(fromPos, 1);
      newOrder.splice(targetPos, 0, moved);
      this.emit('reorder', newOrder);
    }
  };

  private dragStyleFor(pos: number): string {
    const d = this.drag;
    if (d && d.pos === pos) {
      return `transform:translate(${d.offsetX}px, ${d.offsetY}px) scale(1.08) rotate(-1deg);transition:none;z-index:20;box-shadow:0 20px 40px rgba(46,39,31,0.35);cursor:grabbing;`;
    }
    return `cursor:grab;`;
  }

  private renderLengthControl() {
    const len = this.progression.chords.length;
    return html`
      <div class="length-control">
        <div class="length-btn ${len <= MIN_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => len > MIN_PROGRESSION_LENGTH && this.emit('set-length', len - 1)}>−</div>
        <div class="length-segments">
          ${Array.from({ length: MAX_PROGRESSION_LENGTH }, (_, i) => html`<div class="length-segment ${i < len ? 'filled' : ''}"></div>`)}
        </div>
        <div class="length-btn ${len >= MAX_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => len < MAX_PROGRESSION_LENGTH && this.emit('set-length', len + 1)}>+</div>
        <div class="length-label-text">${len}</div>
      </div>
    `;
  }

  render() {
    const p = this.progression;
    const moodColor = getMoodColor(p.mood);
    const progressPct = ((this.activeIndex + 1) / Math.max(1, this.order.length)) * 100;
    const panelAnim = PANEL_ANIM[p.mood] || PANEL_ANIM.Dreamy;

    return html`
      <div class="frame">
        <div class="top-bar">
          <div class="icon-btn" @click=${() => this.emit('back')}>‹</div>
          <div class="wordmark">
            <svg width="18" height="18" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
            <div class="wordmark-text">Chroma Chords</div>
          </div>
          <div class="icon-btn" @click=${() => this.toggleMenu()}>…</div>
        </div>

        ${this.menuMounted ? html`
          <div class="menu-scrim ${this.menuVisible ? 'visible' : ''}" @click=${() => this.closeMenu()}></div>
          <div class="menu ${this.menuVisible ? 'visible' : ''}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${MENU_KEYS.map(k => html`
                <div class="menu-chip ${k === p.key ? 'selected' : ''}" style=${k === p.key ? `background:${moodColor}` : ''} @click=${() => this.emit('set-key', k)}>${k}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${MENU_SCALES.map(s => html`
                <div class="menu-chip ${s.value === p.scaleType ? 'selected' : ''}" style=${s.value === p.scaleType ? `background:${moodColor}` : ''} @click=${() => this.emit('set-scale', s.value)}>${s.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${MENU_GENRES.map(g => html`
                <div class="menu-chip ${g === p.genre ? 'selected' : ''}" style=${g === p.genre ? `background:${moodColor}` : ''} @click=${() => this.emit('set-genre', g)}>${g}</div>
              `)}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${MOODS.map(m => html`
                <div class="menu-chip ${m.name === p.mood ? 'selected' : ''}" style=${m.name === p.mood ? `background:${m.dot}` : ''} @click=${() => this.emit('set-mood', m.name)}>${m.name}</div>
              `)}
            </div>
            <div class="menu-label spaced">Length</div>
            ${this.renderLengthControl()}
            <div class="menu-nav-row" @click=${() => this.emit('view-song')}>
              <div class="menu-nav-label">View song</div>
              <div class="menu-nav-arrow">↗</div>
            </div>
            <div class="menu-nav-row" @click=${() => this.openShare()}>
              <div class="menu-nav-label">Share progression</div>
              <div class="menu-nav-arrow">↗</div>
            </div>
          </div>
        ` : ''}

        <div class="content">
          <div class="step-badge">
            <div class="step-dot" style="background:${moodColor}"></div>
            Step 2 of 3
          </div>
          <h1>Your progression, feeling <span style="color:${moodColor}">${p.mood.toLowerCase()}.</span></h1>
          <div class="subcopy">${p.genre} · ${p.chords.length} ${p.chords.length === 1 ? 'chord' : 'chords'} · tap a chord to preview, tap the swap icon to change it.</div>

          <div class="panel" style="animation:${panelAnim.anim} ${panelAnim.dur}s ${panelAnim.ease} infinite;">
            <svg class="panel-blob a" width="140" height="140" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B" /></svg>
            <svg class="panel-blob b" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC" /></svg>
            <div class="chip-row">
              ${this.order.map((chordIndex, pos) => {
                const c = p.chords[chordIndex];
                const role = roleForTension(c.tension);
                const isActive = pos === this.activeIndex;
                return html`
                  <div
                    class="chord-chip ${isActive ? 'active' : ''}"
                    style="width:${role.size}px;height:${role.size}px;border-radius:${role.radius}px;background:${role.color};${this.dragStyleFor(pos)}"
                    @pointerdown=${(e: PointerEvent) => this.pressStart(pos, () => this.emit('chord-preview', chordIndex), e)}
                  >
                    ${isActive ? html`<div class="now-marker"><div class="now-dot"></div><div class="now-text">now</div></div>` : ''}
                    <div class="chord-name" style="font-size:${role.fontSize}px;">${c.name}</div>
                    <div class="chord-role">${c.functionLabel}</div>
                    <div
                      class="swap-badge"
                      @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
                      @click=${(e: MouseEvent) => { e.stopPropagation(); this.emit('chord-tap', chordIndex); }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4" /><path d="M20 16H7M11 12l-4 4 4 4" /></svg>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>

          <div class="transport">
            <button class="play-btn" style="background:${moodColor}" @click=${() => this.emit('toggle-play')}>
              ${this.playing
                ? html`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`
                : html`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
            </button>
            <div class="progress-track">
              <div class="progress-fill" style="width:${progressPct}%;background:${moodColor}"></div>
            </div>
            <div class="dice-btn ${this.spinning ? 'spinning' : ''}" @click=${() => this.reroll()}>⚄</div>
          </div>
          <div class="transport-meta">${p.key.toUpperCase()} ${p.scaleType.replace('_', ' ')} · ${p.bpm} BPM</div>
        </div>

        ${this.sheetMounted && this.swapChord ? html`
          <swap-sheet
            .chord=${this.swapChord}
            .alternatives=${this.alternatives}
            .showTheory=${this.showTheory}
            .moodColor=${moodColor}
            .position=${(this.swapIndex ?? 0) + 1}
            .total=${this.order.length}
            .visible=${this.sheetVisible}
            .resetKey=${this.swapIndex}
          ></swap-sheet>
        ` : ''}

        ${this.shareMounted ? html`
          <share-modal
            .visible=${this.shareVisible}
            @close=${() => this.closeShare()}
            @export=${(e: CustomEvent<{ device: ShareDevice; name: string }>) => this.exportDevice(e.detail.device, e.detail.name)}
          ></share-modal>
        ` : ''}

        ${this.toast ? html`<div class="toast">Sent to ${this.toast}</div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loop-screen': LoopScreen;
  }
}
