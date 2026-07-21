import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const GENRES = ['Pop', 'Lo-fi/Chill', 'R&B/Soul', 'Indie/Folk', 'Synthwave', 'Jazz-ish', 'Gospel', 'Cinematic', 'Rock', 'House/Dance'];

const MOODS: { name: string; dot: string }[] = [
  { name: 'Uplifting', dot: 'oklch(0.55 0.12 165)' },
  { name: 'Melancholy', dot: 'oklch(0.42 0.09 245)' },
  { name: 'Dreamy', dot: 'oklch(0.60 0.08 205)' },
  { name: 'Tense', dot: 'oklch(0.45 0.20 35)' },
  { name: 'Warm', dot: 'oklch(0.55 0.15 55)' },
  { name: 'Nostalgic', dot: 'oklch(0.50 0.11 20)' },
];

@customElement('seed-screen')
export class SeedScreen extends LitElement {
  @property({ type: String }) genre = 'Pop';
  @property({ type: String }) mood = 'Uplifting';

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
      padding: 60px 26px 30px;
      box-sizing: border-box;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #C25A3C;
      flex-shrink: 0;
    }
    .wordmark-text {
      font-family: var(--cv-font-grotesk);
      font-size: 12px;
      letter-spacing: 2px;
      color: var(--cv-ink-55);
      text-transform: uppercase;
    }
    h1 {
      font-family: var(--cv-font-serif);
      font-weight: 600;
      font-size: 42px;
      line-height: 1.1;
      color: var(--cv-ink);
      margin: 28px 0 0;
    }
    h1 em {
      font-style: italic;
      color: var(--cv-accent);
    }
    .subcopy {
      font-family: var(--cv-font-body);
      font-size: 15px;
      color: var(--cv-ink-55);
      margin-top: 10px;
      line-height: 1.5;
      max-width: 280px;
    }
    .label-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 32px;
    }
    .label-row.mood {
      margin-top: 26px;
    }
    .section-label {
      font-family: var(--cv-font-grotesk);
      font-size: 11px;
      letter-spacing: 1.5px;
      color: var(--cv-ink-40);
      text-transform: uppercase;
      font-weight: 700;
      white-space: nowrap;
    }
    .rule {
      flex: 1;
      height: 1px;
      background: var(--cv-ink-16);
    }
    .chip-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin-top: 12px;
    }
    .chip {
      padding: 13px 20px;
      border-radius: 999px;
      font-family: var(--cv-font-body);
      font-size: 14.5px;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: all .15s ease;
      background: var(--cv-ink-04);
      color: var(--cv-ink-62);
      border: 1px solid var(--cv-ink-18);
    }
    .chip.selected {
      background: var(--cv-ink);
      color: var(--cv-cream);
      border-color: var(--cv-ink);
    }
    .chip.mood-chip {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 9px 16px 9px 12px;
      border: 1px solid var(--cv-ink-16);
      background: transparent;
    }
    .chip.mood-chip.selected {
      background: var(--cv-ink);
      border-color: var(--cv-ink);
    }
    .mood-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .spacer {
      flex: 1;
    }
    .cta-wrap {
      position: relative;
      height: 60px;
      margin-top: 24px;
    }
    .cta-shadow {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 100%;
      height: 56px;
      background: rgba(32, 26, 19, 0.22);
      border-radius: 8px;
    }
    .cta {
      position: relative;
      width: 100%;
      height: 56px;
      background: var(--cv-ink);
      border: none;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-family: var(--cv-font-grotesk);
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.3px;
      color: var(--cv-cream);
      cursor: pointer;
    }
    .cta-glyph {
      position: relative;
      width: 24px;
      height: 22px;
      flex-shrink: 0;
    }
    .cta-glyph-chord {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-weight: 700;
      font-size: 15px;
    }
    .cta-glyph-chord.c1 { color: oklch(0.65 0.11 187); animation: cv-blur1 4s ease-in-out infinite; }
    .cta-glyph-chord.c2 { color: oklch(0.68 0.13 154); animation: cv-blur2 4s ease-in-out infinite; }
    .cta-glyph-chord.c3 { color: oklch(0.65 0.14 131); animation: cv-blur3 4s ease-in-out infinite; }
    .cta-glyph-chord.c4 { color: oklch(0.65 0.16 88); animation: cv-blur4 4s ease-in-out infinite; }
    @keyframes cv-blur1 { 0%, 4% { opacity: 1; filter: blur(0px); } 18%, 100% { opacity: 0; filter: blur(3px); } }
    @keyframes cv-blur2 { 0%, 24% { opacity: 0; filter: blur(3px); } 28%, 40% { opacity: 1; filter: blur(0px); } 44%, 100% { opacity: 0; filter: blur(3px); } }
    @keyframes cv-blur3 { 0%, 48% { opacity: 0; filter: blur(3px); } 52%, 64% { opacity: 1; filter: blur(0px); } 68%, 100% { opacity: 0; filter: blur(3px); } }
    @keyframes cv-blur4 { 0%, 72% { opacity: 0; filter: blur(3px); } 76%, 88% { opacity: 1; filter: blur(0px); } 92%, 100% { opacity: 0; filter: blur(3px); } }
    .caption {
      text-align: center;
      font-family: var(--cv-font-body);
      font-size: 11.5px;
      color: var(--cv-ink-40);
      margin-top: 10px;
    }
  `;

  private selectGenre(name: string) {
    this.dispatchEvent(new CustomEvent('genre-change', { detail: name, bubbles: true, composed: true }));
  }

  private selectMood(name: string) {
    this.dispatchEvent(new CustomEvent('mood-change', { detail: name, bubbles: true, composed: true }));
  }

  private generate() {
    this.dispatchEvent(new CustomEvent('generate', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="frame">
        <div class="grain"></div>
        <div class="wordmark">
          <div class="dot"></div>
          <div class="wordmark-text">Chord Voyager</div>
        </div>

        <h1>What's the<br /><em>feeling?</em></h1>
        <div class="subcopy">Pick a genre and a mood. We'll build the progression.</div>

        <div class="label-row">
          <div class="section-label">Genre</div>
          <div class="rule"></div>
        </div>
        <div class="chip-grid">
          ${GENRES.map(name => html`
            <div class="chip ${name === this.genre ? 'selected' : ''}" @click=${() => this.selectGenre(name)}>${name}</div>
          `)}
        </div>

        <div class="label-row mood">
          <div class="section-label">Mood</div>
          <div class="rule"></div>
        </div>
        <div class="chip-grid">
          ${MOODS.map(m => html`
            <div class="chip mood-chip ${m.name === this.mood ? 'selected' : ''}" @click=${() => this.selectMood(m.name)}>
              <div class="mood-dot" style="background:${m.dot}"></div>${m.name}
            </div>
          `)}
        </div>

        <div class="spacer"></div>

        <div class="cta-wrap">
          <div class="cta-shadow"></div>
          <button class="cta" @click=${this.generate}>
            <div class="cta-glyph">
              <span class="cta-glyph-chord c1">C</span>
              <span class="cta-glyph-chord c2">Am</span>
              <span class="cta-glyph-chord c3">F</span>
              <span class="cta-glyph-chord c4">G7</span>
            </div>
            <span>Generate loop →</span>
          </button>
        </div>
        <div class="caption">Nothing here is permanent — swap any chord after.</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'seed-screen': SeedScreen;
  }
}
