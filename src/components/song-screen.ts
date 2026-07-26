import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Progression, getMoodColor, roleForTension } from '../services/chord-engine';
import { rollMascot, pickSlot, EasterEggCounter } from './mascot-character';
import './mascot-character';
import './mascot-parade';

const MASCOT_ALIGN = ['flex-start', 'center', 'flex-end'] as const;

export interface SongSection {
  name: string;
  desc: string;
  progression: Progression;
  order: number[];
}

@customElement('song-screen')
export class SongScreen extends LitElement {
  @property({ type: Array }) sections: SongSection[] = [];
  @property({ type: Number }) activeSectionIdx = 0;
  @property({ type: Boolean }) canAddSection = true;

  // Rolled fresh every time this screen mounts (see rollMascot) — a small decorative critter,
  // shown roughly half the time, in one of a few horizontal positions below the section list
  // where there's reliably empty space, so it never competes with real content.
  @state() private mascot = rollMascot(0.5);
  @state() private mascotAlign: (typeof MASCOT_ALIGN)[number] = pickSlot([...MASCOT_ALIGN]);

  // Easter egg: click the wordmark 7 times fast to bring out the whole gang.
  private eggCounter = new EasterEggCounter();
  @state() private paradeTrigger = 0;

  private onWordmarkClick() {
    if (this.eggCounter.click()) this.paradeTrigger++;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 36px 22px 40px;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .wordmark-text {
      font-size: 15.5px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .content {
      width: 100%;
      max-width: 560px;
      margin-top: 20px;
    }
    .hero {
      text-align: center;
      margin-bottom: 32px;
    }
    .back-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 7px 16px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.3px;
      color: var(--cv-label);
      cursor: pointer;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0;
      font-size: clamp(26px, 5vw, 36px);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 15px;
      line-height: 1.7;
      color: var(--cv-ink-muted);
      margin-top: 12px;
    }
    .section-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .section-row {
      border-radius: 18px;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      background: var(--cv-surface);
      opacity: 1;
      transform: translateY(0) scale(1);
      transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 200ms var(--cv-ease);
    }
    @starting-style {
      .section-row {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      @starting-style {
        .section-row {
          transform: none;
        }
      }
    }
    .section-row:hover {
      transform: translateY(-2px);
    }
    .section-row.active {
      box-shadow: 0 0 0 2px var(--ring-color, var(--cv-plum));
    }
    .section-name {
      font-size: 15px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .section-chords {
      font-size: 12.5px;
      color: var(--cv-ink-muted);
      margin-top: 3px;
    }
    .section-chips {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }
    .section-chip {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
    .add-section-row {
      border-radius: 18px;
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--cv-label);
      font-size: 14px;
      font-weight: 700;
      transition: transform 0.15s ease, opacity 0.2s ease;
    }
    .add-section-row.enabled {
      cursor: pointer;
    }
    .add-section-row.enabled:hover {
      transform: translateY(-2px);
    }
    .add-section-row.disabled {
      opacity: 0.5;
    }
    .add-icon {
      font-size: 18px;
      line-height: 1;
    }
    .caption {
      font-size: 12.5px;
      color: var(--cv-ink-45);
      text-align: center;
      margin-top: 24px;
    }
    .mascot-row {
      display: flex;
      margin-top: 40px;
      padding: 0 4px;
      opacity: 0.9;
    }
  `;

  private selectSection(i: number) {
    this.dispatchEvent(new CustomEvent('select-section', { detail: i, bubbles: true, composed: true }));
  }

  private addSection() {
    if (!this.canAddSection) return;
    this.dispatchEvent(new CustomEvent('add-section', { bubbles: true, composed: true }));
  }

  private backToProgression() {
    this.dispatchEvent(new CustomEvent('back-to-progression', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="frame">
        <div class="wordmark" @click=${() => this.onWordmarkClick()}>
          <svg width="22" height="22" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div class="hero">
            <div class="back-pill" @click=${() => this.backToProgression()}>← Back to progression</div>
            <h1>Build out the song.</h1>
            <div class="subcopy">Each section reuses the loop, related but never identical.</div>
          </div>

          <div class="section-list">
            ${this.sections.map((sec, i) => {
              const active = i === this.activeSectionIdx;
              const ringColor = getMoodColor(sec.progression.mood);
              return html`
                <div class="section-row ${active ? 'active' : ''}" style=${active ? `--ring-color:${ringColor}` : ''} @click=${() => this.selectSection(i)}>
                  <div>
                    <div class="section-name">${sec.name.toUpperCase()}</div>
                    <div class="section-chords">${sec.desc}</div>
                  </div>
                  <div class="section-chips">
                    ${sec.order.map(idx => {
                      const c = sec.progression.chords[idx];
                      const role = roleForTension(c.tension);
                      return html`<div class="section-chip" style="background:${role.color};border-radius:${Math.round(role.radius * 0.35)}px;"></div>`;
                    })}
                  </div>
                </div>
              `;
            })}
            <div class="add-section-row ${this.canAddSection ? 'enabled' : 'disabled'}" @click=${() => this.addSection()}>
              <span class="add-icon">+</span>
              <span>${this.canAddSection ? 'Add a related section' : 'All song parts added'}</span>
            </div>
          </div>

          <div class="caption">Tap a section to open it in the Loop screen.</div>

          ${this.mascot.show ? html`
            <div class="mascot-row" style="justify-content:${this.mascotAlign}">
              <mascot-character .kind=${this.mascot.kind} .scale=${0.8}></mascot-character>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'song-screen': SongScreen;
  }
}
