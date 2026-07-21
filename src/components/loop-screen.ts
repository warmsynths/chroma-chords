import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { Progression, ChordBlock, Alternative, ShareDevice, buildDeviceShareUrl } from '../services/chord-engine';
import './swap-sheet';
import './share-modal';

const MENU_GENRES = ['Pop', 'Lo-fi/Chill', 'R&B/Soul', 'Indie/Folk', 'Synthwave', 'Jazz-ish', 'Gospel', 'Cinematic', 'Rock', 'House/Dance'];
const MENU_MOODS = ['Uplifting', 'Melancholy', 'Dreamy', 'Tense', 'Warm', 'Nostalgic'];
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

@customElement('loop-screen')
export class LoopScreen extends LitElement {
  @property({ type: Object }) progression!: Progression;
  @property({ type: Number }) activeIndex = 0;
  @property({ type: Array }) order: number[] = [0, 1, 2, 3];
  @property({ type: Boolean }) playing = true;
  @property({ type: Boolean }) showTheory = false;
  @property({ type: Boolean }) sheetOpen = false;
  @property({ type: Object }) swapChord: ChordBlock | null = null;
  @property({ type: Array }) alternatives: Alternative[] = [];

  @state() private menuMounted = false;
  @state() private menuVisible = false;
  @state() private shareMounted = false;
  @state() private shareVisible = false;
  @state() private toast: string | null = null;
  @state() private spinning = false;
  @state() private drag: { screen: 'mobile' | 'desktop'; pos: number; offsetX: number; offsetY: number } | null = null;

  private menuCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private shareCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  // Drag-to-reorder: press-and-hold (150ms, without moving >8px) starts a drag instead of a
  // tap, so a quick tap still opens the swap sheet. itemHeight/cellSize are measured from the
  // container at drag-start so the reorder math works regardless of viewport size.
  private pressTimer: ReturnType<typeof setTimeout> | null = null;
  private pressTapFn: (() => void) | null = null;
  private pressStartX = 0;
  private pressStartY = 0;
  private itemHeight = 0;
  private cellSize = { w: 0, h: 0 };

  @query('.chord-stack') private stackEl?: HTMLElement;
  @query('.desktop-chord-grid') private gridEl?: HTMLElement;

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
      background: var(--cv-paper);
      overflow: hidden;
    }
    .grain {
      position: absolute;
      inset: 0;
      background-image: var(--cv-noise);
      background-size: 120px 120px;
      mix-blend-mode: multiply;
      opacity: 0.035;
      pointer-events: none;
    }
    .frame {
      position: relative;
      max-width: 402px;
      margin: 0 auto;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      padding: 58px 20px 26px;
      box-sizing: border-box;
    }
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1.5px solid var(--cv-ink-20);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: var(--cv-ink-55);
      cursor: pointer;
      background: transparent;
    }
    .top-label {
      font-family: var(--cv-font-grotesk);
      font-size: 11px;
      letter-spacing: 1.8px;
      color: var(--cv-ink-45);
      text-transform: uppercase;
      font-weight: 700;
    }
    .theory-toggle {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      flex-shrink: 0;
    }
    .theory-inner {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .theory-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      transition: background .2s ease;
    }
    .theory-text {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 11.5px;
      transition: color .2s ease;
    }
    .chord-stack {
      display: flex;
      flex-direction: column;
      gap: 0;
      flex: 1;
      margin-top: 16px;
      min-height: 0;
      border-radius: 14px;
      overflow: hidden;
    }
    .chord-block {
      position: relative;
      overflow: hidden;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      flex: 1;
      min-height: 0;
    }
    .chord-grain {
      position: absolute;
      inset: 0;
      background-image: var(--cv-noise);
      background-size: 80px 80px;
      mix-blend-mode: multiply;
      pointer-events: none;
      border-radius: inherit;
    }
    .now-marker {
      position: absolute;
      top: 16px;
      right: 18px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .now-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #F1E8D9;
      animation: cv-pulse 1.6s ease-in-out infinite;
    }
    @keyframes cv-pulse {
      0% { opacity: .45; }
      50% { opacity: 1; }
      100% { opacity: .45; }
    }
    .now-text {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12px;
      color: rgba(241, 232, 217, 0.75);
    }
    .chord-name {
      position: relative;
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-weight: 700;
      font-size: 32px;
      color: #F1E8D9;
      display: inline-block;
      transform-origin: left center;
    }
    @keyframes cv-breathe {
      0% { transform: scale(1) skewX(0deg); letter-spacing: 0em; }
      50% { transform: scale(calc(1 + 0.05 * var(--amp))) skewX(calc(-3deg * var(--amp))); letter-spacing: calc(-0.012em * var(--amp)); }
      100% { transform: scale(1) skewX(0deg); letter-spacing: 0em; }
    }
    .chord-meta {
      position: relative;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .chord-tag {
      font-family: var(--cv-font-grotesk);
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: rgba(241, 232, 217, 0.72);
    }
    .chord-roman {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12.5px;
      color: rgba(241, 232, 217, 0.55);
    }
    .theory-panel {
      padding-top: 14px;
      margin-top: 6px;
      border-top: 1px solid var(--cv-ink-14);
      flex-shrink: 0;
    }
    .theory-row {
      display: flex;
      align-items: baseline;
      gap: 10px;
      flex-wrap: wrap;
    }
    .theory-function {
      font-family: var(--cv-font-grotesk);
      font-size: 10.5px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--cv-accent);
    }
    .theory-notes {
      font-family: var(--cv-font-grotesk);
      font-size: 10.5px;
      letter-spacing: 0.4px;
      color: var(--cv-ink-40);
    }
    .theory-scale {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12px;
      color: var(--cv-ink-40);
    }
    .theory-desc {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 13.5px;
      line-height: 1.5;
      color: rgba(32, 26, 19, 0.68);
      margin-top: 8px;
    }
    .transport {
      height: 62px;
      border-radius: 10px;
      background: var(--cv-paper-deep);
      border: 1px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      margin-top: 12px;
      flex-shrink: 0;
    }
    .play-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--cv-ink);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
    }
    .play-square {
      width: 13px;
      height: 13px;
      background: #F1E8D9;
      border-radius: 2px;
    }
    .play-triangle {
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-left: 11px solid #F1E8D9;
      margin-left: 2px;
    }
    .transport-label {
      font-family: var(--cv-font-grotesk);
      font-size: 12.5px;
      color: var(--cv-ink-55);
      font-weight: 600;
      letter-spacing: 0.4px;
    }
    .dice-icon {
      font-size: 16px;
      color: var(--cv-ink-40);
      cursor: pointer;
      transition: transform .3s ease;
    }
    .dice-icon.spinning {
      transform: rotate(360deg);
    }
    .menu-scrim {
      position: absolute;
      inset: 0;
      z-index: 48;
      background: rgba(32, 26, 19, 0);
      transition: background .22s ease, backdrop-filter .22s ease;
    }
    .menu-scrim.visible {
      background: rgba(32, 26, 19, 0.06);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
    }
    .menu {
      position: absolute;
      top: 96px;
      right: 20px;
      width: 230px;
      background: var(--cv-paper);
      border: 1px solid var(--cv-ink-18);
      border-radius: 10px;
      box-shadow: 4px 4px 0 rgba(32, 26, 19, 0.15), 0 24px 44px -18px rgba(32, 26, 19, 0.4);
      z-index: 49;
      padding: 14px;
      box-sizing: border-box;
      transform-origin: top right;
      opacity: 0;
      transform: translateY(-6px) scale(0.94);
      transition: opacity .22s cubic-bezier(.16,1,.3,1), transform .26s cubic-bezier(.16,1,.3,1);
    }
    .menu.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .menu-label {
      font-family: var(--cv-font-grotesk);
      font-size: 10px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-ink-40);
      font-weight: 700;
    }
    .menu-label.spaced {
      margin-top: 14px;
    }
    .menu-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 8px;
    }
    .menu-chip {
      padding: 5px 10px;
      border-radius: 999px;
      font-family: var(--cv-font-body);
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      background: var(--cv-ink-04);
      color: var(--cv-ink-62);
      border: 1px solid var(--cv-ink-18);
      opacity: 0;
      transform: translateY(5px);
      transition: opacity .3s ease, transform .3s cubic-bezier(.2,.8,.2,1), background .15s ease, color .15s ease;
    }
    .menu-chip.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .menu-chip.selected {
      background: var(--cv-ink);
      color: var(--cv-cream);
      border-color: var(--cv-ink);
    }
    .menu-share-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--cv-ink-14);
      cursor: pointer;
    }
    .menu-share-label {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 13px;
      color: rgba(32, 26, 19, 0.65);
    }
    .menu-share-arrow {
      font-size: 13px;
      color: var(--cv-ink-40);
    }
    .toast {
      position: absolute;
      left: 50%;
      bottom: 90px;
      transform: translateX(-50%);
      background: var(--cv-ink);
      color: var(--cv-cream);
      font-family: var(--cv-font-body);
      font-size: 12.5px;
      font-weight: 600;
      padding: 10px 16px;
      border-radius: 999px;
      z-index: 70;
      box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.4);
      animation: cv-toast-in .3s cubic-bezier(.16,1,.3,1);
      white-space: nowrap;
    }
    @keyframes cv-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(8px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    .desktop-view {
      display: none;
    }

    /* Below this width the mobile single-column frame (bottom-sheet swap, popover
       settings) is used as-is; above it, a 3-column workspace layout takes over. */
    @media (min-width: 900px) {
      .frame {
        max-width: 1180px;
        min-height: 0;
        padding: 0;
      }
      .mobile-view {
        display: none;
      }
      .desktop-view {
        display: flex;
        min-height: 100dvh;
      }
      .desktop-sidebar {
        position: relative;
        width: 272px;
        flex-shrink: 0;
        border-right: 1px solid var(--cv-ink-14);
        padding: 32px 26px;
        box-sizing: border-box;
        overflow: auto;
      }
      .desktop-wordmark {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .desktop-wordmark .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #C25A3C;
        flex-shrink: 0;
      }
      .desktop-wordmark .wordmark-text {
        font-family: var(--cv-font-grotesk);
        font-size: 12px;
        letter-spacing: 2px;
        color: var(--cv-ink-55);
        text-transform: uppercase;
      }
      .desktop-section-label {
        font-family: var(--cv-font-grotesk);
        font-size: 11px;
        letter-spacing: 1.5px;
        color: var(--cv-ink-40);
        text-transform: uppercase;
        font-weight: 700;
        margin-top: 24px;
      }
      .desktop-section-label.first {
        margin-top: 30px;
      }
      .desktop-main {
        position: relative;
        flex: 1;
        padding: 36px 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .desktop-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }
      .desktop-chord-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 0;
        flex: 1;
        margin-top: 24px;
        min-height: 0;
        max-height: 420px;
        border-radius: 14px;
        overflow: hidden;
      }
      .desktop-transport-hint {
        font-family: var(--cv-font-serif);
        font-style: italic;
        font-size: 13px;
        color: rgba(32, 26, 19, 0.5);
      }
      .desktop-swap-panel {
        position: relative;
        width: 340px;
        flex-shrink: 0;
        border-left: 1px solid var(--cv-ink-14);
        padding: 32px 26px;
        box-sizing: border-box;
        overflow: auto;
      }
      .desktop-swap-empty {
        height: 100%;
        display: flex;
        align-items: center;
        font-family: var(--cv-font-serif);
        font-style: italic;
        font-size: 15px;
        line-height: 1.5;
        color: var(--cv-ink-40);
      }
    }
  `;

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
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

  private chipClass(idx: number, selected: boolean): string {
    return `menu-chip ${selected ? 'selected' : ''} ${this.menuVisible ? 'visible' : ''}`;
  }

  private chipStyle(idx: number): string {
    return `transition-delay: ${idx * 0.025}s`;
  }

  private pressStart(screen: 'mobile' | 'desktop', pos: number, tapFn: () => void, e: PointerEvent) {
    e.preventDefault();
    this.pressTapFn = tapFn;
    this.pressStartX = e.clientX;
    this.pressStartY = e.clientY;
    if (this.pressTimer) clearTimeout(this.pressTimer);
    this.pressTimer = setTimeout(() => {
      this.pressTimer = null;
      if (screen === 'mobile') {
        this.itemHeight = this.stackEl ? this.stackEl.offsetHeight / this.order.length : 60;
      } else {
        this.cellSize = {
          w: this.gridEl ? this.gridEl.offsetWidth / 2 : 100,
          h: this.gridEl ? this.gridEl.offsetHeight / 2 : 100,
        };
      }
      this.drag = { screen, pos, offsetX: 0, offsetY: 0 };
    }, 150);
  }

  private onDragMove = (e: PointerEvent) => {
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
    const { screen, pos, offsetX, offsetY } = this.drag;
    let targetPos = pos;
    if (screen === 'mobile') {
      const itemH = this.itemHeight || 1;
      targetPos = Math.max(0, Math.min(this.order.length - 1, pos + Math.round(offsetY / itemH)));
    } else {
      const cellW = this.cellSize.w || 1, cellH = this.cellSize.h || 1;
      const fromRow = Math.floor(pos / 2), fromCol = pos % 2;
      const newRow = Math.max(0, Math.min(1, fromRow + Math.round(offsetY / cellH)));
      const newCol = Math.max(0, Math.min(1, fromCol + Math.round(offsetX / cellW)));
      targetPos = newRow * 2 + newCol;
    }
    this.drag = null;
    this.pressTapFn = null;
    if (targetPos !== pos) {
      const newOrder = [...this.order];
      const [moved] = newOrder.splice(pos, 1);
      newOrder.splice(targetPos, 0, moved);
      this.emit('reorder', newOrder);
    }
  };

  private dragStyleFor(pos: number, screen: 'mobile' | 'desktop'): string {
    let tx = 0, ty = 0, transition = 'transform .22s cubic-bezier(.2,.8,.2,1)', scale = 1, rotate = 0, shadow = 'none', z = 1, opacity = 1;
    const d = this.drag;
    if (d && d.screen === screen) {
      if (screen === 'mobile') {
        const itemH = this.itemHeight || 1;
        const targetPos = Math.max(0, Math.min(this.order.length - 1, d.pos + Math.round(d.offsetY / itemH)));
        if (pos === d.pos) {
          ty = d.offsetY; transition = 'none'; scale = 1.035; rotate = -0.6; shadow = '0 16px 32px rgba(0,0,0,0.35)'; z = 20;
        } else {
          const from = d.pos;
          if (from < targetPos && pos > from && pos <= targetPos) ty = -itemH;
          else if (from > targetPos && pos >= targetPos && pos < from) ty = itemH;
          opacity = 0.86;
        }
      } else {
        const cellW = this.cellSize.w || 1, cellH = this.cellSize.h || 1;
        const fromRow = Math.floor(d.pos / 2), fromCol = d.pos % 2;
        const newRow = Math.max(0, Math.min(1, fromRow + Math.round(d.offsetY / cellH)));
        const newCol = Math.max(0, Math.min(1, fromCol + Math.round(d.offsetX / cellW)));
        const targetPos = newRow * 2 + newCol;
        if (pos === d.pos) {
          tx = d.offsetX; ty = d.offsetY; transition = 'none'; scale = 1.045; rotate = -0.8; shadow = '0 20px 40px rgba(0,0,0,0.38)'; z = 20;
        } else {
          const arr = [0, 1, 2, 3];
          const [moved] = arr.splice(d.pos, 1);
          arr.splice(targetPos, 0, moved);
          const newPos = arr.indexOf(pos);
          if (newPos !== pos) {
            const oldRow = Math.floor(pos / 2), oldCol = pos % 2, nr = Math.floor(newPos / 2), nc = newPos % 2;
            tx = (nc - oldCol) * cellW;
            ty = (nr - oldRow) * cellH;
          }
          opacity = 0.86;
        }
      }
    }
    const cursor = d && d.screen === screen && pos === d.pos ? 'grabbing' : 'grab';
    return `transform:translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rotate}deg);transition:${transition};box-shadow:${shadow};z-index:${z};opacity:${opacity};touch-action:none;user-select:none;cursor:${cursor};`;
  }

  render() {
    const p = this.progression;
    const activeChordIndex = this.order[this.activeIndex] ?? 0;
    const active = p.chords[activeChordIndex];
    return html`
      <div class="frame">
        <div class="grain"></div>
        <div class="mobile-view">
        <div class="top-bar">
          <div class="icon-btn" @click=${() => this.emit('back')}>‹</div>
          <div class="top-label">${p.genre} · ${p.mood}</div>
          <div class="icon-btn" @click=${() => this.toggleMenu()}>…</div>
        </div>

        ${this.menuMounted ? html`
          <div class="menu-scrim ${this.menuVisible ? 'visible' : ''}" @click=${() => this.closeMenu()}></div>
          <div class="menu ${this.menuVisible ? 'visible' : ''}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${MENU_KEYS.map((k, i) => html`
                <div class="${this.chipClass(i, k === p.key)}" style=${this.chipStyle(i)} @click=${() => this.emit('set-key', k)}>${k}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${MENU_SCALES.map((s, i) => html`
                <div class="${this.chipClass(i + 7, s.value === p.scaleType)}" style=${this.chipStyle(i + 7)} @click=${() => this.emit('set-scale', s.value)}>${s.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${MENU_GENRES.map((g, i) => html`
                <div class="${this.chipClass(i + 13, g === p.genre)}" style=${this.chipStyle(i + 13)} @click=${() => this.emit('set-genre', g)}>${g}</div>
              `)}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${MENU_MOODS.map((m, i) => html`
                <div class="${this.chipClass(i + 23, m === p.mood)}" style=${this.chipStyle(i + 23)} @click=${() => this.emit('set-mood', m)}>${m}</div>
              `)}
            </div>
            <div class="menu-share-row" @click=${() => this.openShare()}>
              <div class="menu-share-label">Share progression</div>
              <div class="menu-share-arrow">↗</div>
            </div>
          </div>
        ` : ''}

        <div class="theory-toggle">
          <div class="theory-inner" @click=${() => this.emit('theory-toggle')}>
            <div class="theory-dot" style="background:${this.showTheory ? 'var(--cv-accent)' : 'var(--cv-ink-20)'}"></div>
            <div class="theory-text" style="color:${this.showTheory ? 'rgba(32,26,19,0.65)' : 'rgba(32,26,19,0.32)'}">show music theory</div>
          </div>
        </div>

        <div class="chord-stack">
          ${this.order.map((chordIndex, pos) => {
            const c = p.chords[chordIndex];
            const isActive = pos === this.activeIndex;
            return html`
              <div
                class="chord-block"
                style="background:${c.color};${this.dragStyleFor(pos, 'mobile')}"
                @pointerdown=${(e: PointerEvent) => this.pressStart('mobile', pos, () => this.emit('chord-tap', chordIndex), e)}
              >
                <div class="chord-grain" style="opacity:${c.grain}"></div>
                ${isActive ? html`
                  <div class="now-marker">
                    <div class="now-dot"></div>
                    <div class="now-text">now</div>
                  </div>
                ` : ''}
                <div class="chord-name" style="--amp:${c.tension};${isActive ? `animation: cv-breathe ${2.6 - c.tension * 1.1}s ease-in-out infinite;` : ''}">${c.name}</div>
                <div class="chord-meta">
                  <div class="chord-tag">${c.tag}</div>
                  ${this.showTheory ? html`<div class="chord-roman">${c.roman}</div>` : ''}
                </div>
              </div>
            `;
          })}
        </div>

        ${this.showTheory ? html`
          <div class="theory-panel">
            <div class="theory-row">
              <div class="theory-function">${active.functionLabel}</div>
              <div class="theory-notes">${active.notes.join(' · ')}</div>
              <div class="theory-scale">${active.scaleLabel}</div>
            </div>
            <div class="theory-desc">${active.desc}</div>
          </div>
        ` : ''}

        <div class="transport">
          <button class="play-btn" @click=${() => this.emit('toggle-play')}>
            ${this.playing ? html`<div class="play-square"></div>` : html`<div class="play-triangle"></div>`}
          </button>
          <div class="transport-label">${p.key.toUpperCase()} ${p.scaleType.replace('_', ' ')} · ${p.bpm} BPM</div>
          <div class="dice-icon ${this.spinning ? 'spinning' : ''}" @click=${() => this.reroll()}>⚄</div>
        </div>

        ${this.sheetOpen && this.swapChord ? html`
          <swap-sheet
            .chord=${this.swapChord}
            .alternatives=${this.alternatives}
            .showTheory=${this.showTheory}
          ></swap-sheet>
        ` : ''}
        </div>

        <div class="desktop-view">
          <div class="desktop-sidebar">
            <div class="desktop-wordmark">
              <div class="dot"></div>
              <div class="wordmark-text">Chord Voyager</div>
            </div>

            <div class="desktop-section-label first">Genre</div>
            <div class="menu-chips">
              ${MENU_GENRES.map(g => html`
                <div class="menu-chip visible ${g === p.genre ? 'selected' : ''}" @click=${() => this.emit('set-genre', g)}>${g}</div>
              `)}
            </div>

            <div class="desktop-section-label">Mood</div>
            <div class="menu-chips">
              ${MENU_MOODS.map(m => html`
                <div class="menu-chip visible ${m === p.mood ? 'selected' : ''}" @click=${() => this.emit('set-mood', m)}>${m}</div>
              `)}
            </div>

            <div class="desktop-section-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${MENU_KEYS.map(k => html`
                <div class="menu-chip visible ${k === p.key ? 'selected' : ''}" @click=${() => this.emit('set-key', k)}>${k}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${MENU_SCALES.map(s => html`
                <div class="menu-chip visible ${s.value === p.scaleType ? 'selected' : ''}" @click=${() => this.emit('set-scale', s.value)}>${s.label}</div>
              `)}
            </div>

            <div class="theory-toggle" style="justify-content:flex-start;margin-top:30px;">
              <div class="theory-inner" @click=${() => this.emit('theory-toggle')}>
                <div class="theory-dot" style="background:${this.showTheory ? 'var(--cv-accent)' : 'var(--cv-ink-20)'}"></div>
                <div class="theory-text" style="color:${this.showTheory ? 'rgba(32,26,19,0.65)' : 'rgba(32,26,19,0.32)'}">show music theory</div>
              </div>
            </div>

            <div class="menu-share-row" style="margin-top:24px;" @click=${() => this.openShare()}>
              <div class="menu-share-label">Share progression</div>
              <div class="menu-share-arrow">↗</div>
            </div>
          </div>

          <div class="desktop-main">
            <div class="desktop-top">
              <div class="top-label">${p.genre} · ${p.mood}</div>
              <div class="transport-label">${p.key.toUpperCase()} ${p.scaleType.replace('_', ' ')} · ${p.bpm} BPM</div>
            </div>

            <div class="desktop-chord-grid">
              ${this.order.map((chordIndex, pos) => {
                const c = p.chords[chordIndex];
                const isActive = pos === this.activeIndex;
                return html`
                  <div
                    class="chord-block"
                    style="background:${c.color};${this.dragStyleFor(pos, 'desktop')}"
                    @pointerdown=${(e: PointerEvent) => this.pressStart('desktop', pos, () => this.emit('chord-tap', chordIndex), e)}
                  >
                    <div class="chord-grain" style="opacity:${c.grain}"></div>
                    ${isActive ? html`
                      <div class="now-marker">
                        <div class="now-dot"></div>
                        <div class="now-text">now</div>
                      </div>
                    ` : ''}
                    <div class="chord-name" style="--amp:${c.tension};${isActive ? `animation: cv-breathe ${2.6 - c.tension * 1.1}s ease-in-out infinite;` : ''}">${c.name}</div>
                    <div class="chord-meta">
                      <div class="chord-tag">${c.tag}</div>
                      ${this.showTheory ? html`<div class="chord-roman">${c.roman}</div>` : ''}
                    </div>
                  </div>
                `;
              })}
            </div>

            <div class="transport">
              <button class="play-btn" @click=${() => this.emit('toggle-play')}>
                ${this.playing ? html`<div class="play-square"></div>` : html`<div class="play-triangle"></div>`}
              </button>
              <div class="desktop-transport-hint">Click a chord to explore a swap, on the right.</div>
              <div class="dice-icon ${this.spinning ? 'spinning' : ''}" @click=${() => this.reroll()}>⚄</div>
            </div>
          </div>

          <div class="desktop-swap-panel">
            ${this.sheetOpen && this.swapChord ? html`
              <swap-sheet
                variant="panel"
                .chord=${this.swapChord}
                .alternatives=${this.alternatives}
                .showTheory=${this.showTheory}
              ></swap-sheet>
            ` : html`
              <div class="desktop-swap-empty">Click a chord to hear it differently.</div>
            `}
          </div>
        </div>

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
