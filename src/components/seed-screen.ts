import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH, MOODS, getMoodColor, getMoodPath } from '../services/chord-engine';

const GENRES = ['Pop', 'Lo-fi/Chill', 'R&B/Soul', 'Indie/Folk', 'Synthwave', 'Jazz-ish', 'Gospel', 'Cinematic', 'Rock', 'House/Dance'];

@customElement('seed-screen')
export class SeedScreen extends LitElement {
  @property({ type: String }) genre = 'Pop';
  @property({ type: String }) mood = 'Uplifting';
  @property({ type: Number }) length = 4;

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
    .ink-blobs {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }
    .ink-blob {
      position: absolute;
      mix-blend-mode: multiply;
      transition: background .8s ease;
    }
    @keyframes cv-ink-1 {
      0% { transform: translate(0, 0) scale(1) rotate(0deg); }
      50% { transform: translate(20px, -16px) scale(1.15) rotate(8deg); }
      100% { transform: translate(0, 0) scale(1) rotate(0deg); }
    }
    @keyframes cv-ink-2 {
      0% { transform: translate(0, 0) scale(1) rotate(0deg); }
      50% { transform: translate(-14px, 18px) scale(0.88) rotate(-10deg); }
      100% { transform: translate(0, 0) scale(1) rotate(0deg); }
    }
    @keyframes cv-line-draw {
      from { stroke-dashoffset: 1; opacity: 0; }
      15% { opacity: 1; }
      to { stroke-dashoffset: 0; opacity: 1; }
    }
    @keyframes cv-line-float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(1.5deg); }
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
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transition: background .6s ease;
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
      position: relative;
      font-family: var(--cv-font-serif);
      font-weight: 600;
      font-size: 42px;
      line-height: 1.1;
      color: var(--cv-ink);
      margin: 28px 0 0;
    }
    h1 em {
      font-style: italic;
      transition: color .6s ease;
    }
    .subcopy {
      position: relative;
      font-family: var(--cv-font-body);
      font-size: 15px;
      color: var(--cv-ink-55);
      margin-top: 10px;
      line-height: 1.5;
      max-width: 280px;
    }
    .label-row {
      position: relative;
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
      position: relative;
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
    .length-control {
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      border: 1px solid var(--cv-ink-14);
      padding: 12px 14px;
      margin-top: 12px;
    }
    .length-control.dark {
      border: none;
      background: var(--cv-ink);
    }
    .length-btn {
      width: 26px;
      height: 26px;
      border-radius: 7px;
      background: rgba(32, 26, 19, 0.06);
      color: var(--cv-ink);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      cursor: pointer;
      flex-shrink: 0;
    }
    .length-btn.dark {
      background: rgba(241, 232, 217, 0.12);
      color: var(--cv-cream);
    }
    .length-btn.disabled {
      opacity: 0.35;
      cursor: default;
    }
    .length-segments {
      display: flex;
      gap: 4px;
      flex: 1;
    }
    .length-segment {
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: rgba(32, 26, 19, 0.14);
      transition: background .25s ease;
    }
    .length-segment.filled {
      background: var(--cv-ink);
    }
    .length-segment.dark {
      background: rgba(241, 232, 217, 0.18);
    }
    .length-segment.dark.filled {
      background: var(--cv-cream);
    }
    .length-label-text {
      font-family: var(--cv-font-grotesk);
      font-size: 12px;
      font-weight: 600;
      color: rgba(32, 26, 19, 0.6);
      white-space: nowrap;
      min-width: 56px;
      text-align: right;
    }
    .length-label-text.dark {
      color: rgba(241, 232, 217, 0.85);
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
    .cta-dice {
      font-size: 18px;
      flex-shrink: 0;
    }
    .caption {
      position: relative;
      text-align: center;
      font-family: var(--cv-font-body);
      font-size: 11.5px;
      color: var(--cv-ink-40);
      margin-top: 10px;
    }
    .footer {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 16px;
      padding-bottom: 2px;
      font-family: var(--cv-font-body);
      font-size: 12px;
      color: rgba(32, 26, 19, 0.38);
      flex-shrink: 0;
    }
    .footer-link {
      display: flex;
      align-items: center;
      gap: 5px;
      color: inherit;
      text-decoration: none;
      transition: color .15s ease;
    }
    .footer-link:hover {
      color: var(--cv-accent);
    }
    .footer-divider {
      opacity: 0.6;
    }

    .desktop-view {
      display: none;
    }

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
        width: 100%;
      }
      .desktop-sidebar {
        position: relative;
        width: 272px;
        flex-shrink: 0;
        border-right: 1px solid var(--cv-ink-14);
        padding: 32px 26px;
        box-sizing: border-box;
        overflow: auto;
        display: flex;
        flex-direction: column;
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
        transition: background .6s cubic-bezier(0.23, 1, 0.32, 1);
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
      .desktop-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin-top: 12px;
      }
      .desktop-chip {
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
        transition: background .15s ease, color .15s ease;
      }
      .desktop-chip.selected {
        background: var(--cv-ink);
        color: var(--cv-cream);
        border-color: var(--cv-ink);
      }
      .desktop-cta-wrap {
        position: relative;
        height: 54px;
        margin-top: 8px;
      }
      .desktop-cta-shadow {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 100%;
        height: 50px;
        background: rgba(32, 26, 19, 0.22);
        border-radius: 8px;
      }
      .desktop-cta {
        position: relative;
        width: 100%;
        height: 50px;
        background: var(--cv-ink);
        border: none;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-family: var(--cv-font-grotesk);
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0.3px;
        color: var(--cv-cream);
        cursor: pointer;
        transition: transform 160ms ease-out;
      }
      .desktop-cta:active {
        transform: scale(0.97);
      }
      .desktop-caption {
        font-family: var(--cv-font-body);
        font-size: 11.5px;
        color: var(--cv-ink-40);
        line-height: 1.5;
        margin-top: 10px;
      }
      .desktop-footer {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 16px;
        font-family: var(--cv-font-body);
        font-size: 12px;
        color: rgba(32, 26, 19, 0.38);
      }
      .desktop-footer-link {
        display: flex;
        align-items: center;
        gap: 5px;
        color: inherit;
        text-decoration: none;
        transition: color .15s ease;
      }
      .desktop-footer-link:hover {
        color: var(--cv-accent);
      }
      .desktop-footer-divider {
        opacity: 0.6;
      }
      .desktop-main {
        position: relative;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 0;
      }
      .desktop-main-ink-blobs {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
      }
      .desktop-main-blob {
        position: absolute;
        top: 50%;
        left: 50%;
        mix-blend-mode: multiply;
        transition: background .8s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .desktop-genre-label {
        position: relative;
        font-family: var(--cv-font-grotesk);
        font-size: 12px;
        letter-spacing: 3px;
        color: var(--cv-ink-40);
        text-transform: uppercase;
      }
      .mood-doodle {
        position: relative;
        width: 300px;
        height: 300px;
        margin-top: 20px;
        animation: cv-line-float 7s ease-in-out infinite;
      }
      .mood-doodle path {
        animation: cv-line-draw 2.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        transition: stroke .5s ease;
      }
      .desktop-mood-name {
        position: relative;
        font-family: var(--cv-font-serif);
        font-style: italic;
        font-weight: 700;
        font-size: 34px;
        margin-top: 14px;
        transition: color .5s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .desktop-subcopy {
        position: relative;
        font-family: var(--cv-font-body);
        font-size: 15px;
        color: var(--cv-ink-50);
        margin-top: 10px;
        max-width: 380px;
        text-align: center;
        line-height: 1.5;
      }
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

  private setLength(n: number) {
    this.dispatchEvent(new CustomEvent('length-change', { detail: n, bubbles: true, composed: true }));
  }

  private decLength() {
    if (this.length > MIN_PROGRESSION_LENGTH) this.setLength(this.length - 1);
  }

  private incLength() {
    if (this.length < MAX_PROGRESSION_LENGTH) this.setLength(this.length + 1);
  }

  render() {
    const moodColor = getMoodColor(this.mood);
    const moodPath = getMoodPath(this.mood);

    return html`
      <div class="frame">
        <div class="grain"></div>

        <div class="mobile-view">
          <div class="ink-blobs">
            <div class="ink-blob" style="top:-80px;left:-40px;width:340px;height:340px;border-radius:42% 58% 54% 46% / 46% 54% 46% 54%;background:${moodColor};filter:blur(46px);opacity:0.42;animation:cv-ink-1 13s ease-in-out infinite;"></div>
            <div class="ink-blob" style="top:220px;right:-60px;width:220px;height:220px;border-radius:58% 42% 40% 60% / 54% 46% 54% 46%;background:${moodColor};filter:blur(36px);opacity:0.3;animation:cv-ink-2 16s ease-in-out infinite;"></div>
          </div>

          <div class="wordmark">
            <div class="dot" style="background:${moodColor}"></div>
            <div class="wordmark-text">Chroma Chords</div>
          </div>

          <h1>Chords,<br /><em style="color:${moodColor}">by feel.</em></h1>
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

          <div class="label-row mood">
            <div class="section-label">Length</div>
            <div class="rule"></div>
          </div>
          <div class="length-control">
            <div class="length-btn ${this.length <= MIN_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({ length: MAX_PROGRESSION_LENGTH }, (_, i) => html`
                <div class="length-segment ${i < this.length ? 'filled' : ''}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length >= MAX_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length === 1 ? 'chord' : 'chords'}</div>
          </div>

          <div class="spacer"></div>

          <div class="cta-wrap">
            <div class="cta-shadow"></div>
            <button class="cta" @click=${this.generate}>
              <div class="cta-dice">⚄</div>
              <span>Generate loop →</span>
            </button>
          </div>
          <div class="caption">Nothing here is permanent — swap any chord after.</div>

          <div class="footer">
            <a class="footer-link" href="https://github.com/warmsynths/chroma-chords" target="_blank" rel="noopener">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub
            </a>
            <span class="footer-divider">·</span>
            <span>Made with ❤️ by warmsynths</span>
            <span class="footer-divider">·</span>
            <a class="footer-link" href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">Ko-fi</a>
          </div>
        </div>

        <div class="desktop-view">
          <div class="desktop-sidebar">
            <div class="desktop-wordmark">
              <div class="dot" style="background:${moodColor}"></div>
              <div class="wordmark-text">Chroma Chords</div>
            </div>

            <div class="desktop-section-label first">Genre</div>
            <div class="desktop-chips">
              ${GENRES.map(name => html`
                <div class="desktop-chip ${name === this.genre ? 'selected' : ''}" @click=${() => this.selectGenre(name)}>${name}</div>
              `)}
            </div>

            <div class="desktop-section-label">Mood</div>
            <div class="desktop-chips">
              ${MOODS.map(m => html`
                <div class="desktop-chip ${m.name === this.mood ? 'selected' : ''}" @click=${() => this.selectMood(m.name)}>${m.name}</div>
              `)}
            </div>

            <div class="desktop-section-label">Length</div>
            <div class="length-control dark">
              <div class="length-btn dark ${this.length <= MIN_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => this.decLength()}>−</div>
              <div class="length-segments">
                ${Array.from({ length: MAX_PROGRESSION_LENGTH }, (_, i) => html`
                  <div class="length-segment dark ${i < this.length ? 'filled' : ''}"></div>
                `)}
              </div>
              <div class="length-btn dark ${this.length >= MAX_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => this.incLength()}>+</div>
              <div class="length-label-text dark">${this.length} ${this.length === 1 ? 'chord' : 'chords'}</div>
            </div>

            <div class="spacer"></div>
            <div class="desktop-cta-wrap">
              <div class="desktop-cta-shadow"></div>
              <button class="desktop-cta" @click=${this.generate}>
                <div class="cta-dice" style="font-size:17px">⚄</div>
                <span>Generate loop →</span>
              </button>
            </div>
            <div class="desktop-caption">Nothing here is permanent — swap any chord after.</div>
            <div class="desktop-footer">
              <a class="desktop-footer-link" href="https://github.com/warmsynths/chroma-chords" target="_blank" rel="noopener">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                GitHub
              </a>
              <span class="desktop-footer-divider">·</span>
              <a class="desktop-footer-link" href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">Ko-fi</a>
            </div>
          </div>

          <div class="desktop-main">
            <div class="desktop-main-ink-blobs">
              <div class="desktop-main-blob" style="width:640px;height:640px;margin:-320px 0 0 -320px;border-radius:42% 58% 54% 46% / 46% 54% 46% 54%;background:${moodColor};filter:blur(90px);opacity:0.35;animation:cv-ink-1 15s ease-in-out infinite;"></div>
              <div class="desktop-main-blob" style="width:420px;height:420px;margin:-160px 0 0 -260px;border-radius:58% 42% 40% 60% / 54% 46% 54% 46%;background:${moodColor};filter:blur(60px);opacity:0.26;animation:cv-ink-2 18s ease-in-out infinite;"></div>
            </div>
            <div class="desktop-genre-label">${this.genre}</div>
            ${repeat([this.mood], m => m, () => html`
              <div class="mood-doodle">
                <svg width="300" height="300" viewBox="0 0 300 300" style="overflow:visible;">
                  <path d="${moodPath}" fill="none" stroke="${moodColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1"></path>
                </svg>
              </div>
            `)}
            <div class="desktop-mood-name" style="color:${moodColor}">${this.mood}</div>
            <div class="desktop-subcopy">Pick a genre and a mood. We'll build the progression.</div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'seed-screen': SeedScreen;
  }
}
