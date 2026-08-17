import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Progression, getMoodColor, roleForTension, AUTOPLAY_INTERVAL_MS } from '../services/chord-engine';
import { USER_INSTRUMENTS, USER_PLAY_STYLES, genreDefaultInstrumentName, genreDefaultPlayStyleName } from '../services/audio-service';

const INSTRUMENT_PRIMARY = ['Piano', 'Rhodes', 'Nylon Guitar', 'Warm Pad'];
const PLAY_STYLE_PRIMARY = ['Block chords', 'Arpeggio', 'Strum', 'Broken (swing)'];
import { rollMascot, pickSlot, EasterEggCounter } from './mascot-character';
import './mascot-character';
import './mascot-parade';
import './save-set-modal';

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
  @property({ type: Number }) activePlayingSectionIdx = 0;
  @property({ type: Boolean }) canAddSection = true;
  @property({ type: Boolean }) playing = false;
  @property({ type: Number }) progressStep = 0;
  @property({ type: Number }) totalSteps = 0;
  @property({ type: String }) instrument: string | null = null;
  @property({ type: String }) playStyle: string | null = null;
  @property({ type: Boolean }) isAuthenticated = false;
  @property({ type: Boolean }) isBookmarked = false;

  @state() private expandedInstrument = false;
  @state() private expandedPlayStyle = false;
  @state() private expandedAllInstruments = false;
  @state() private expandedAllPlayStyles = false;
  @state() private snapProgress = false;
  @state() private saveModalVisible = false;

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

  willUpdate(changed: PropertyValues) {
    if (changed.has('progressStep')) {
      const prevStep = changed.get('progressStep') as number | undefined;
      this.snapProgress = prevStep !== undefined && this.progressStep < prevStep;
    }
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('progressStep') && this.snapProgress) {
      requestAnimationFrame(() => requestAnimationFrame(() => { this.snapProgress = false; }));
    }
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100%;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100%;
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
      margin-top: 20px;
    }
    .divider {
      border: none;
      border-top: 1.5px dashed var(--cv-ink-16);
      margin: 32px 0 28px;
    }
    .whole-song-section {
      width: 100%;
    }
    .whole-song-label {
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label);
      margin-bottom: 16px;
    }
    .transport {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .your-sets-btn {
      position: absolute;
      top: 24px;
      right: 24px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      border: 1.5px solid var(--cv-ink-14);
      z-index: 10;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .your-sets-btn:hover {
      background: var(--cv-ink-08);
    }
    .your-sets-btn:active {
      transform: scale(0.96);
    }
    @media (max-width: 600px) {
      .your-sets-btn {
        top: 24px;
        right: 64px;
        padding: 6px 12px;
        font-size: 12px;
      }
    }
    .play-btn {
      width: 52px;
      height: 52px;
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
    .save-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--cv-surface);
      border: 2px solid var(--cv-ink-12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      box-sizing: border-box;
      transition: transform 0.3s ease, background 0.2s ease;
    }
    .save-btn:hover {
      background: var(--cv-surface-2);
    }
    .progress-track {
      flex: 1;
      min-width: 120px;
      height: 9px;
      border-radius: 6px;
      background: var(--cv-surface);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 6px;
      transition: width var(--progress-duration, 1.7s) linear, background 0.4s ease;
    }
    .progress-fill.snap {
      transition: none;
    }
    .control-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface-2);
      color: #5B5145;
      padding: 9px 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 150ms var(--cv-ease);
    }
    .control-chip:active {
      transform: scale(0.96);
    }
    .control-chevron {
      opacity: 0.6;
    }
    .control-options {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }
    .control-option {
      display: inline-flex;
      align-items: center;
      background: var(--cv-surface-2);
      color: #5B5145;
      padding: 7px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .control-option:active {
      transform: scale(0.96);
    }
    .control-option.toggle {
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      color: var(--cv-label);
    }
    .control-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      flex-shrink: 0;
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
    const firstGenre = this.sections[0]?.progression.genre ?? 'Pop';
    const effectiveInstrument = this.instrument ?? genreDefaultInstrumentName(firstGenre);
    const effectivePlayStyle = this.playStyle ?? genreDefaultPlayStyleName(firstGenre);

    const totalSongSteps = this.totalSteps || this.sections.reduce((acc, s) => acc + s.order.length, 0);
    const progressPct = !this.playing || totalSongSteps <= 0
      ? 0
      : this.snapProgress
        ? (this.progressStep / totalSongSteps) * 100
        : ((this.progressStep + 1) / totalSongSteps) * 100;

    // Instrument and Play Style option filtering
    const availInstruments = USER_INSTRUMENTS.filter(i => i.name !== effectiveInstrument);
    let primaryInst = INSTRUMENT_PRIMARY.filter(name => availInstruments.some(i => i.name === name));
    const restInst = availInstruments.filter(i => !primaryInst.includes(i.name));
    const shownInst = this.expandedAllInstruments ? availInstruments : availInstruments.filter(i => primaryInst.includes(i.name));

    const availPlayStyles = USER_PLAY_STYLES.filter(s => s.name !== effectivePlayStyle);
    let primaryStyles = PLAY_STYLE_PRIMARY.filter(name => availPlayStyles.some(s => s.name === name));
    const restStyles = availPlayStyles.filter(s => !primaryStyles.includes(s.name));
    const shownStyles = this.expandedAllPlayStyles ? availPlayStyles : availPlayStyles.filter(s => primaryStyles.includes(s.name));

    const currentPlayingSec = this.sections[this.playing ? this.activePlayingSectionIdx : 0] || this.sections[0];
    const moodColor = currentPlayingSec ? getMoodColor(currentPlayingSec.progression.mood) : '#C9A9E0';

    return html`
      <div class="frame">
        <div class="wordmark" @click=${() => this.onWordmarkClick()}>
          <svg width="22" height="22" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
          <div class="wordmark-text">Chroma Chords</div>
        </div>

        ${this.isAuthenticated ? html`
          <div class="your-sets-btn" @click=${() => this.dispatchEvent(new CustomEvent('view-sets', { bubbles: true, composed: true }))}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Your sets
          </div>
        ` : ''}

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div class="hero">
            <div class="back-pill" @click=${() => this.backToProgression()}>← Back to progression</div>
            <h1>Build out the song.</h1>
            <div class="subcopy">Each section reuses the loop, related but never identical.</div>
          </div>

          <div class="section-list">
            ${this.sections.map((sec, i) => {
              const active = this.playing ? i === this.activePlayingSectionIdx : i === this.activeSectionIdx;
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

          <hr class="divider" />

          <div class="whole-song-section">
            <div class="whole-song-label">HEAR THE WHOLE SONG</div>
            <div class="transport">
              <button class="play-btn" style="background:${moodColor}" @click=${() => this.dispatchEvent(new CustomEvent('toggle-play-song', { bubbles: true, composed: true }))}>
                ${this.playing
                  ? html`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`
                  : html`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
              </button>
              <div class="progress-track">
                <div
                  class="progress-fill ${this.snapProgress ? 'snap' : ''}"
                  style="width:${progressPct}%;background:${moodColor};--progress-duration:${AUTOPLAY_INTERVAL_MS}ms"
                ></div>
              </div>
              ${this.isAuthenticated ? html`
                <div class="save-btn" title="${this.isBookmarked ? 'Saved in sets' : 'Save set'}" @click=${() => { this.saveModalVisible = true; }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.isBookmarked ? '#2E271F' : 'none'}" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              ` : ''}
              <div class="control-chip" @click=${() => { this.expandedInstrument = !this.expandedInstrument; this.expandedPlayStyle = false; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                ${effectiveInstrument} <span class="control-chevron">${this.expandedInstrument ? '⌃' : '⌄'}</span>
              </div>
              <div class="control-chip" @click=${() => { this.expandedPlayStyle = !this.expandedPlayStyle; this.expandedInstrument = false; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
                ${effectivePlayStyle} <span class="control-chevron">${this.expandedPlayStyle ? '⌃' : '⌄'}</span>
              </div>
            </div>

            ${this.expandedInstrument ? html`
              <div class="control-options">
                ${shownInst.map(i => html`
                  <div class="control-option" @click=${() => { this.dispatchEvent(new CustomEvent('set-instrument', { detail: i.name, bubbles: true, composed: true })); this.expandedInstrument = false; }}>
                    <span class="control-dot" style="background:${i.color}"></span>${i.name}
                  </div>
                `)}
                ${restInst.length ? html`
                  <div class="control-option toggle" @click=${() => { this.expandedAllInstruments = !this.expandedAllInstruments; }}>
                    ${this.expandedAllInstruments ? 'Show less ⌃' : `+${restInst.length} more ⌄`}
                  </div>
                ` : ''}
              </div>
            ` : ''}
            ${this.expandedPlayStyle ? html`
              <div class="control-options">
                ${shownStyles.map(s => html`
                  <div class="control-option" @click=${() => { this.dispatchEvent(new CustomEvent('set-play-style', { detail: s.name, bubbles: true, composed: true })); this.expandedPlayStyle = false; }}>
                    <span class="control-dot" style="background:${s.color}"></span>${s.name}
                  </div>
                `)}
                ${restStyles.length ? html`
                  <div class="control-option toggle" @click=${() => { this.expandedAllPlayStyles = !this.expandedAllPlayStyles; }}>
                    ${this.expandedAllPlayStyles ? 'Show less ⌃' : `+${restStyles.length} more ⌄`}
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>

          ${this.mascot.show ? html`
            <div class="mascot-row" style="justify-content:${this.mascotAlign}">
              <mascot-character .kind=${this.mascot.kind} .scale=${0.8}></mascot-character>
            </div>
          ` : ''}
        </div>
        
        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${firstGenre && currentPlayingSec ? `${firstGenre} · ${currentPlayingSec.progression.mood}` : 'My Set'}
          @close=${() => { this.saveModalVisible = false; }}
          @save=${(e: CustomEvent<string>) => {
            this.dispatchEvent(new CustomEvent('save-set', { detail: e.detail, bubbles: true, composed: true }));
            this.saveModalVisible = false;
          }}
        ></save-set-modal>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'song-screen': SongScreen;
  }
}

