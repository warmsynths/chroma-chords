import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH, MOODS, getMoodColor } from '../services/chord-engine';

const GENRES = ['Pop', 'Lo-fi/Chill', 'R&B/Soul', 'Indie/Folk', 'Synthwave', 'Jazz-ish', 'Gospel', 'Cinematic', 'Rock', 'House/Dance'];
const GENRE_ICON_PALETTE = ['#F2A79B', '#9CC0EC', '#F6D98B'];
// index % 3 -> corner radius on the genre pill's icon swatch: rounded square, squarer, near-circle.
const GENRE_ICON_RADIUS = [6, 3, 12];

const VIBE_EXAMPLES = ['rainy drive at 2am, first day of summer...', 'Portishead', 'Bohemian Rhapsody'];

const MOOD_KEYWORDS: Record<string, string[]> = {
  Uplifting: ['happy', 'joy', 'bright', 'hope', 'celebrat', 'win', 'sun', 'morning', 'triumph'],
  Melancholy: ['sad', 'rain', 'lonely', 'grief', 'loss', 'blue', 'tear', 'goodbye'],
  Dreamy: ['dream', 'float', 'cloud', 'soft', 'sleep', 'hazy', 'ethereal', 'stars'],
  Tense: ['fear', 'anxious', 'dark', 'storm', 'fight', 'chase', 'danger', 'thriller'],
  Warm: ['cozy', 'home', 'fire', 'love', 'autumn', 'familiar', 'fireplace'],
  Nostalgic: ['memory', 'childhood', 'old', 'faded', 'remember', 'summer', 'photo', 'yearbook'],
};

const GENRE_KEYWORDS: Record<string, string[]> = {
  'Pop': ['pop', 'radio', 'dance', 'catchy', 'hit'],
  'Lo-fi/Chill': ['lofi', 'lo-fi', 'study', 'bedroom', 'tape', 'chill', 'relax'],
  'R&B/Soul': ['rnb', 'r&b', 'soul', 'smooth', 'slow jam', 'sultry'],
  'Indie/Folk': ['folk', 'acoustic', 'campfire', 'porch', 'story', 'indie'],
  'Synthwave': ['synth', '80s', 'neon', 'retro', 'synthwave', 'arcade'],
  'Jazz-ish': ['jazz', 'smoky', 'bar', 'lounge', 'late night', 'saxophone'],
  'Gospel': ['gospel', 'church', 'choir', 'soulful', 'worship'],
  'Cinematic': ['movie', 'film', 'epic', 'trailer', 'scene', 'cinematic'],
  'Rock': ['rock', 'guitar', 'drive', 'loud', 'energy', 'highway'],
  'House/Dance': ['house', 'edm', 'club', 'rave', 'four on the floor', 'dance floor'],
};

function matchFromText(text: string, map: Record<string, string[]>, fallbackList: string[]): string {
  const lower = text.toLowerCase();
  let best: string | null = null;
  let bestScore = 0;
  Object.keys(map).forEach(key => {
    const score = map[key].reduce((s, k) => s + (lower.includes(k) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = key; }
  });
  if (best) return best;
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return fallbackList[h % fallbackList.length];
}

@customElement('seed-screen')
export class SeedScreen extends LitElement {
  @property({ type: String }) genre = 'Pop';
  @property({ type: String }) mood = 'Uplifting';
  @property({ type: Number }) length = 4;

  @state() private freeText = '';
  @state() private placeholderIdx = 0;

  private placeholderTimer: ReturnType<typeof setInterval> | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.placeholderTimer = setInterval(() => {
      this.placeholderIdx = (this.placeholderIdx + 1) % VIBE_EXAMPLES.length;
    }, 2800);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.placeholderTimer) clearInterval(this.placeholderTimer);
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
    }
    .wordmark-text {
      font-size: 15.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      color: var(--cv-ink);
    }
    .content {
      width: 100%;
      max-width: 520px;
      margin-top: 20px;
    }
    .hero {
      position: relative;
      text-align: center;
      margin-bottom: 24px;
    }
    .float-shape {
      position: absolute;
      pointer-events: none;
    }
    .float-shape.a {
      top: -22px;
      left: 4px;
      animation: cv-float-1 7s ease-in-out infinite;
    }
    .float-shape.b {
      bottom: -26px;
      right: -18px;
      animation: cv-float-2 6.5s ease-in-out infinite;
    }
    @keyframes cv-float-1 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(0, -14px) rotate(4deg); }
    }
    @keyframes cv-float-2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(10px, -8px) rotate(-5deg); }
    }
    .step-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface-2);
      padding: 6px 15px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      color: var(--cv-label);
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .step-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      transition: background 0.35s var(--cv-ease);
    }
    h1 {
      margin: 0;
      font-size: clamp(28px, 6vw, 42px);
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 15px;
      line-height: 1.6;
      color: var(--cv-ink-muted);
      margin-top: 12px;
    }
    .vibe-input-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-12);
      border-radius: 100px;
      padding: 8px 10px 8px 20px;
      box-shadow: 0 14px 30px -20px rgba(46, 39, 31, 0.5);
      margin-top: 28px;
    }
    .vibe-input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 15px;
      font-weight: 600;
      color: var(--cv-ink);
      padding: 10px 0;
      min-width: 0;
    }
    .vibe-input::placeholder {
      color: rgba(46, 39, 31, 0.34);
      opacity: 1;
      transition: color 0.3s ease;
    }
    .suggestion-wrap {
      text-align: center;
      margin-top: 12px;
    }
    .suggestion {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 100px;
      padding: 9px 18px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      background: transparent;
      transition: transform 150ms var(--cv-ease);
    }
    .suggestion:active {
      transform: scale(0.96);
    }
    .divider-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 32px 0 8px;
    }
    .divider-rule {
      flex: 1;
      height: 1px;
      background: var(--cv-ink-14);
    }
    .divider-label {
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--cv-label);
      text-transform: uppercase;
      white-space: nowrap;
    }
    .section-label {
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: var(--cv-label);
      text-transform: uppercase;
      text-align: center;
    }
    .pill-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      justify-content: center;
    }
    .pill {
      display: flex;
      align-items: center;
      padding: 9px 18px 9px 12px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      background: var(--cv-surface-2);
      color: #5B5145;
      transition: transform 150ms var(--cv-ease), background 150ms var(--cv-ease), color 150ms var(--cv-ease);
    }
    .pill:active {
      transform: scale(0.96);
    }
    .pill.selected {
      color: var(--cv-ink);
    }
    .genre-icon-wrap {
      width: 22px;
      height: 22px;
      border-radius: 7px;
      background: var(--cv-ink-08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      flex-shrink: 0;
    }
    .mood-pill {
      padding: 8px 18px 8px 8px;
    }
    .mood-badge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 9px;
      flex-shrink: 0;
      transition: background 150ms var(--cv-ease);
    }
    .length-control {
      background: var(--cv-surface-2);
      border-radius: 20px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .length-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-cream);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 150ms var(--cv-ease);
    }
    .length-btn:active {
      transform: scale(0.92);
    }
    .length-btn.disabled {
      opacity: 0.35;
      cursor: default;
    }
    .length-segments {
      display: flex;
      gap: 6px;
      flex: 1;
    }
    .length-segment {
      flex: 1;
      height: 14px;
      border-radius: 6px;
      background: var(--cv-ink-10);
      transition: background 150ms var(--cv-ease);
    }
    .length-segment.filled {
      background: var(--cv-red);
    }
    .length-label-text {
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink-muted);
      white-space: nowrap;
    }
    .cta {
      width: 100%;
      border: none;
      color: var(--cv-ink);
      padding: 18px;
      border-radius: 100px;
      font-family: inherit;
      font-weight: 800;
      font-size: 16px;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      margin-top: 36px;
      transition: transform 160ms var(--cv-ease);
    }
    .cta:active {
      transform: scale(0.97);
    }
    .caption {
      text-align: center;
      font-size: 11.5px;
      color: var(--cv-ink-45);
      margin-top: 12px;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 28px;
      font-size: 12px;
      color: rgba(46, 39, 31, 0.4);
    }
    .footer-link {
      display: flex;
      align-items: center;
      gap: 5px;
      color: inherit;
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .footer-link:hover {
      color: var(--cv-red-deep);
    }
    .footer-divider {
      opacity: 0.6;
    }

    @media (min-width: 640px) {
      .content { max-width: 620px; }
      .frame { padding-top: 56px; }
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

  private onFreeTextChange(e: Event) {
    this.freeText = (e.target as HTMLInputElement).value;
  }

  private applyFreeTextSuggestion(genre: string, mood: string) {
    this.selectGenre(genre);
    this.selectMood(mood);
  }

  render() {
    const moodColor = getMoodColor(this.mood);
    const freeTextTrimmed = this.freeText.trim();
    let suggestion: { genre: string; mood: string; color: string } | null = null;
    if (freeTextTrimmed.length > 2) {
      const sMood = matchFromText(freeTextTrimmed, MOOD_KEYWORDS, MOODS.map(m => m.name));
      const sGenre = matchFromText(freeTextTrimmed, GENRE_KEYWORDS, GENRES);
      suggestion = { genre: sGenre, mood: sMood, color: getMoodColor(sMood) };
    }

    return html`
      <div class="frame">
        <div class="wordmark">
          <svg width="22" height="22" viewBox="0 0 30 30">
            <circle cx="11" cy="11" r="9" fill="#F2A79B" />
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" />
          </svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>

        <div class="content">
          <div class="hero">
            <svg class="float-shape a" width="34" height="34" viewBox="0 0 38 38"><circle cx="19" cy="19" r="17" fill="#F6D98B" /></svg>
            <svg class="float-shape b" width="26" height="26" viewBox="0 0 30 30"><rect x="2" y="2" width="26" height="26" rx="9" fill="#9CC0EC" /></svg>

            <div class="step-badge">
              <div class="step-dot" style="background:${moodColor}"></div>
              Step 1 of 3
            </div>
            <h1>Describe a vibe,<br />hear it as chords.</h1>
            <div class="subcopy">Type a feeling in your own words — or pick a genre and mood below.</div>
          </div>

          <div class="vibe-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cv-label)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
            </svg>
            <input
              type="text"
              class="vibe-input"
              .value=${this.freeText}
              @input=${(e: Event) => this.onFreeTextChange(e)}
              placeholder=${VIBE_EXAMPLES[this.placeholderIdx]}
            />
          </div>
          ${suggestion ? html`
            <div class="suggestion-wrap">
              <div class="suggestion" style="border:1.5px solid ${suggestion.color}" @click=${() => this.applyFreeTextSuggestion(suggestion!.genre, suggestion!.mood)}>
                Try <span>${suggestion.genre} · ${suggestion.mood}</span> →
              </div>
            </div>
          ` : ''}

          <div class="divider-row">
            <div class="divider-rule"></div>
            <div class="divider-label">or pick it yourself</div>
            <div class="divider-rule"></div>
          </div>

          <div class="section-label">Genre</div>
          <div class="pill-grid">
            ${GENRES.map((name, i) => html`
              <div class="pill ${name === this.genre ? 'selected' : ''}" style=${name === this.genre ? `background:${moodColor}` : ''} @click=${() => this.selectGenre(name)}>
                <div class="genre-icon-wrap">
                  <svg width="12" height="12" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx=${GENRE_ICON_RADIUS[i % 3]} fill=${GENRE_ICON_PALETTE[i % 3]} />
                  </svg>
                </div>
                ${name}
              </div>
            `)}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${MOODS.map(m => html`
              <div class="pill mood-pill ${m.name === this.mood ? 'selected' : ''}" style=${m.name === this.mood ? `background:${m.dot}` : ''} @click=${() => this.selectMood(m.name)}>
                <div class="mood-badge" style="background:${m.name === this.mood ? 'rgba(46,39,31,0.1)' : m.dot + '33'}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${m.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${m.iconPath} />
                  </svg>
                </div>
                ${m.name}
              </div>
            `)}
          </div>

          <div class="section-label">Length</div>
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

          <button class="cta" style="background:${moodColor}" @click=${this.generate}>
            Generate loop <span>→</span>
          </button>
          <div class="caption">Nothing here is permanent — swap any chord after.</div>

          <div class="footer">
            <a class="footer-link" href="https://github.com/warmsynths/chroma-chords" target="_blank" rel="noopener">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
              GitHub
            </a>
            <span class="footer-divider">·</span>
            <span>Made with ❤️ by warmsynths</span>
            <span class="footer-divider">·</span>
            <a class="footer-link" href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">Ko-fi</a>
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
