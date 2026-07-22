import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Progression } from '../services/chord-engine';

export interface SongSection {
  name: string;
  progression: Progression;
  order: number[];
}

@customElement('song-screen')
export class SongScreen extends LitElement {
  @property({ type: Array }) sections: SongSection[] = [];
  @property({ type: Number }) activeSectionIdx = 0;
  @property({ type: Boolean }) canAddSection = true;

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
      padding: 60px 24px 30px;
      box-sizing: border-box;
    }
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .top-label {
      font-family: var(--cv-font-grotesk);
      font-size: 11px;
      letter-spacing: 1.8px;
      color: var(--cv-ink-45);
      text-transform: uppercase;
      font-weight: 700;
    }
    .section-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 22px;
    }
    .section-row {
      border-radius: 12px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: background .22s ease, border-color .22s ease, transform .15s ease;
      background: var(--cv-ink-04);
      border: 1px solid var(--cv-ink-14);
    }
    .section-row:hover {
      transform: translateY(-2px);
    }
    .section-row.active {
      background: var(--cv-ink);
      border-color: var(--cv-ink);
    }
    .section-name {
      font-family: var(--cv-font-grotesk);
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink);
      transition: color .22s ease;
    }
    .section-row.active .section-name {
      color: var(--cv-cream);
    }
    .section-chords {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 13px;
      color: var(--cv-ink-55);
      margin-top: 3px;
      transition: color .22s ease;
    }
    .section-row.active .section-chords {
      color: rgba(241, 232, 217, 0.7);
    }
    .section-chips {
      display: flex;
      gap: 3px;
      flex-shrink: 0;
    }
    .section-chip {
      width: 6px;
      height: 20px;
      border-radius: 2px;
      transition: background .3s ease;
    }
    .add-section-row {
      border-radius: 12px;
      background: var(--cv-ink-04);
      border: 1px dashed rgba(32, 26, 19, 0.25);
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--cv-ink-45);
      font-family: var(--cv-font-body);
      font-size: 13px;
      font-weight: 600;
      transition: opacity .2s ease, transform .15s ease;
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
    }
    .spacer {
      flex: 1;
    }
    .caption {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12.5px;
      color: var(--cv-ink-40);
      text-align: center;
    }
  `;

  private selectSection(i: number) {
    this.dispatchEvent(new CustomEvent('select-section', { detail: i, bubbles: true, composed: true }));
  }

  private addSection() {
    if (!this.canAddSection) return;
    this.dispatchEvent(new CustomEvent('add-section', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="frame">
        <div class="grain"></div>
        <div class="top-bar">
          <div class="top-label">Your song</div>
        </div>
        <div class="section-list">
          ${this.sections.map((sec, i) => {
            const active = i === this.activeSectionIdx;
            const chordNames = sec.order.map(idx => sec.progression.chords[idx].name).join(' · ');
            return html`
              <div class="section-row ${active ? 'active' : ''}" @click=${() => this.selectSection(i)}>
                <div>
                  <div class="section-name">${sec.name.toUpperCase()}</div>
                  <div class="section-chords">${chordNames}</div>
                </div>
                <div class="section-chips">
                  ${sec.order.map(idx => html`<div class="section-chip" style="background:${sec.progression.chords[idx].color}"></div>`)}
                </div>
              </div>
            `;
          })}
          <div class="add-section-row ${this.canAddSection ? 'enabled' : 'disabled'}" @click=${() => this.addSection()}>
            <span class="add-icon">+</span>
            <span>${this.canAddSection ? 'Add a related section' : 'All song parts added'}</span>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="caption">Tap a section to open it in the Loop screen.</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'song-screen': SongScreen;
  }
}
