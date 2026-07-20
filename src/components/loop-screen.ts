import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Progression, ChordBlock, Alternative } from '../services/chord-engine';
import './swap-sheet';

const MENU_GENRES = ['Pop', 'Lo-fi/Chill', 'R&B/Soul', 'Indie/Folk', 'Synthwave', 'Jazz-ish', 'Gospel', 'Cinematic', 'Rock', 'House/Dance'];
const MENU_MOODS = ['Uplifting', 'Melancholy', 'Dreamy', 'Tense', 'Warm', 'Nostalgic'];
const MENU_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const MENU_SCALES: { label: string; value: string }[] = [
  { label: 'Major', value: 'MAJOR' },
  { label: 'Minor', value: 'NATURAL_MINOR' },
];

@customElement('loop-screen')
export class LoopScreen extends LitElement {
  @property({ type: Object }) progression!: Progression;
  @property({ type: Number }) activeIndex = 0;
  @property({ type: Array }) order: number[] = [0, 1, 2, 3, 4];
  @property({ type: Boolean }) playing = true;
  @property({ type: Boolean }) showTheory = false;
  @property({ type: Boolean }) sheetOpen = false;
  @property({ type: Object }) swapChord: ChordBlock | null = null;
  @property({ type: Array }) alternatives: Alternative[] = [];

  @state() private menuOpen = false;
  @state() private spinning = false;

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
      gap: 9px;
      flex: 1;
      margin-top: 16px;
      min-height: 0;
    }
    .chord-block {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      flex: 1;
      min-height: 0;
      box-shadow: 2px 2px 0 rgba(32, 26, 19, 0.12);
      transform: scale(1);
      transition: box-shadow .3s ease, transform .3s ease;
    }
    .chord-block.active {
      box-shadow: inset 0 0 0 2px rgba(241, 232, 217, 0.85), 4px 4px 0 rgba(32, 26, 19, 0.22);
      transform: scale(1.01);
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
    .play-bars {
      display: flex;
      gap: 4px;
    }
    .play-bar {
      width: 4px;
      height: 14px;
      background: #F1E8D9;
      border-radius: 1px;
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
    .loop-icon {
      font-size: 17px;
      color: var(--cv-ink-40);
      cursor: pointer;
      transition: transform .3s ease;
    }
    .loop-icon.spinning {
      transform: rotate(360deg);
    }
    .menu-scrim {
      position: absolute;
      inset: 0;
      z-index: 48;
    }
    .menu {
      position: absolute;
      top: 96px;
      right: 20px;
      width: 230px;
      background: var(--cv-paper);
      border: 1px solid var(--cv-ink-18);
      border-radius: 10px;
      box-shadow: 4px 4px 0 rgba(32, 26, 19, 0.15);
      z-index: 49;
      padding: 14px;
      box-sizing: border-box;
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
    }
    .menu-chip.selected {
      background: var(--cv-ink);
      color: var(--cv-cream);
      border-color: var(--cv-ink);
    }
  `;

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  private closeMenu() {
    this.menuOpen = false;
  }

  private shuffle() {
    this.spinning = true;
    setTimeout(() => { this.spinning = false; }, 400);
    this.emit('shuffle');
  }

  render() {
    const p = this.progression;
    const activeChordIndex = this.order[this.activeIndex] ?? 0;
    const active = p.chords[activeChordIndex];
    return html`
      <div class="frame">
        <div class="grain"></div>
        <div class="top-bar">
          <div class="icon-btn" @click=${() => this.emit('back')}>‹</div>
          <div class="top-label">${p.genre} · ${p.mood}</div>
          <div class="icon-btn" @click=${() => this.toggleMenu()}>…</div>
        </div>

        ${this.menuOpen ? html`
          <div class="menu-scrim" @click=${() => this.closeMenu()}></div>
          <div class="menu">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${MENU_KEYS.map(k => html`
                <div class="menu-chip ${k === p.key ? 'selected' : ''}" @click=${() => this.emit('set-key', k)}>${k}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${MENU_SCALES.map(s => html`
                <div class="menu-chip ${s.value === p.scaleType ? 'selected' : ''}" @click=${() => this.emit('set-scale', s.value)}>${s.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${MENU_GENRES.map(g => html`
                <div class="menu-chip ${g === p.genre ? 'selected' : ''}" @click=${() => this.emit('set-genre', g)}>${g}</div>
              `)}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${MENU_MOODS.map(m => html`
                <div class="menu-chip ${m === p.mood ? 'selected' : ''}" @click=${() => this.emit('set-mood', m)}>${m}</div>
              `)}
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
              <div class="chord-block ${isActive ? 'active' : ''}" style="background:${c.color}" @click=${() => this.emit('chord-tap', chordIndex)}>
                <div class="chord-grain" style="opacity:${c.grain}"></div>
                ${isActive ? html`
                  <div class="now-marker">
                    <div class="now-dot"></div>
                    <div class="now-text">now</div>
                  </div>
                ` : ''}
                <div class="chord-name">${c.name}</div>
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
            ${this.playing ? html`
              <div class="play-bars">
                <div class="play-bar"></div>
                <div class="play-bar"></div>
              </div>
            ` : html`<div class="play-triangle"></div>`}
          </button>
          <div class="transport-label">${p.key.toUpperCase()} ${p.scaleType.replace('_', ' ')} · ${p.bpm} BPM</div>
          <div class="loop-icon ${this.spinning ? 'spinning' : ''}" @click=${() => this.shuffle()}>↻</div>
        </div>

        ${this.sheetOpen && this.swapChord ? html`
          <swap-sheet
            .chord=${this.swapChord}
            .alternatives=${this.alternatives}
            .showTheory=${this.showTheory}
          ></swap-sheet>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loop-screen': LoopScreen;
  }
}
