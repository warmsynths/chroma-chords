import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SongSection } from '../services/song-arranger';
import { FeelSettings } from '../services/audio-service';
import { TRANSPORT_SOUNDS, ROOT_KEYS, SCALE_MODES } from './transport-bar';

export type MobileSheetType = 'key' | 'feel' | 'sound' | 'section' | 'more' | null;

@customElement('mobile-dock')
export class MobileDock extends LitElement {
  @property({ type: String }) activeTab: 'loop' | 'melody' | 'song' | 'play' = 'loop';
  @property({ type: Boolean }) isPlaying = false;
  @property({ type: String }) playLabel = 'Play';
  @property({ type: String }) moodColor = '#C9A9E0';
  @property({ type: Array }) sections: SongSection[] = [];
  @property({ type: String }) activeSectionId = 'A';
  @property({ type: String }) chordSound = 'Stage Rhodes';
  @property({ type: String }) melodySound = 'Stage Rhodes';
  @property({ type: String }) chordFeel = 'Block chords';
  @property({ type: String }) melodyFeel = 'Smooth';
  @property({ type: Object }) feelSettings: FeelSettings = { swing: 0, spread: 50, density: 50, tone: 'Warm' };
  @property({ type: String }) keyRoot = 'C';
  @property({ type: String }) scaleMode = 'Major';
  @property({ type: Number }) bpm = 84;
  @property({ type: Number }) barsPerChord = 1;
  @property({ type: Boolean }) isSaved = false;

  @state() private activeSheet: MobileSheetType = null;
  @state() private feelMoreOpen = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .dock-container {
      position: relative;
      margin: 6px 10px 18px;
      border-radius: 20px;
      background: #2E271F;
      color: #FBF3E6;
      padding: 7px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-sizing: border-box;
      z-index: 30;
    }

    .play-btn {
      border: none;
      font-family: inherit;
      width: 48px;
      height: 44px;
      border-radius: 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #2E271F;
      font-size: 15px;
      transition: transform 120ms ease;
    }

    .play-btn:active {
      transform: scale(0.94);
    }

    .divider {
      width: 1px;
      height: 26px;
      background: rgba(251, 243, 230, 0.14);
      flex-shrink: 0;
    }

    .dock-btn {
      border: none;
      font-family: inherit;
      min-width: 44px;
      height: 44px;
      padding: 0 10px;
      border-radius: 14px;
      background: rgba(251, 243, 230, 0.1);
      color: #FBF3E6;
      cursor: pointer;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 120ms ease, transform 120ms ease;
    }

    .dock-btn:hover {
      background: rgba(251, 243, 230, 0.16);
    }

    .dock-btn:active {
      transform: scale(0.94);
    }

    .dock-btn.active {
      background: rgba(251, 243, 230, 0.18);
    }

    .sec-letter-badge {
      width: 20px;
      height: 20px;
      border-radius: 6px;
      color: #2E271F;
      font-size: 11px;
      font-weight: 800;
      display: grid;
      place-items: center;
    }

    .caret-mini {
      font-size: 10px;
      opacity: 0.7;
    }

    .key-badge-text {
      font-size: 12.5px;
      font-weight: 800;
      white-space: nowrap;
    }

    .spacer {
      flex: 1 1 0;
      min-width: 0;
    }

    .more-btn {
      border: none;
      font-family: inherit;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(251, 243, 230, 0.1);
      color: #FBF3E6;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
    }

    .more-btn:active {
      transform: scale(0.94);
    }

    /* Bottom Sheets */
    .sheet-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.45);
      z-index: 60;
      animation: sheet-fade-in 180ms ease;
    }

    @keyframes sheet-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .bottom-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 62;
      max-height: calc(100% - 24px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: #F6EADB;
      border-radius: 26px 26px 0 0;
      padding: 14px 18px 26px;
      box-shadow: 0 -20px 44px -26px rgba(46, 39, 31, 0.5);
      animation: sheet-slide-up 200ms cubic-bezier(0.23, 1, 0.32, 1);
      color: #2E271F;
    }

    @keyframes sheet-slide-up {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .sheet-handle {
      width: 38px;
      height: 4px;
      border-radius: 3px;
      background: rgba(46, 39, 31, 0.18);
      margin: 0 auto 13px;
    }

    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 12px;
    }

    .sheet-title {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2E271F;
    }

    .sheet-close-btn {
      border: none;
      font-family: inherit;
      background: #F1E4CC;
      color: #2E271F;
      border-radius: 100px;
      width: 32px;
      height: 32px;
      font-size: 16px;
      font-weight: 800;
      cursor: pointer;
      display: grid;
      place-items: center;
    }

    .popover-up {
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 8px);
      z-index: 40;
      background: #FBF3E6;
      color: #2E271F;
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.08), 0 18px 40px rgba(46, 39, 31, 0.24);
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      animation: sheet-fade-in 140ms ease;
    }

    .popover-menu-item {
      border: none;
      font-family: inherit;
      border-radius: 14px;
      background: transparent;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 11px 12px;
      text-align: left;
      color: #2E271F;
      min-height: 44px;
    }

    .popover-menu-item:hover, .popover-menu-item:active {
      background: #F1E4CC;
    }

    .popover-menu-item .label {
      font-size: 13.5px;
      font-weight: 800;
    }

    .popover-menu-item .desc {
      font-size: 12px;
      font-weight: 600;
      color: #6B5F50;
    }

    .sheet-section-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8A6B3F;
      margin-top: 14px;
      margin-bottom: 6px;
    }

    .pill-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .pill-btn {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 12px;
      border-radius: 11px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      background: #FBF3E6;
      color: #6B5F50;
      transition: background 120ms ease, color 120ms ease;
    }

    .pill-btn.selected {
      background: #2E271F;
      color: #FBF3E6;
    }

    .bpm-stepper {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 6px;
    }

    .bpm-stepper button {
      border: none;
      font-family: inherit;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #FBF3E6;
      color: #2E271F;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
    }

    .bpm-val {
      font-family: 'Space Mono', monospace;
      font-size: 22px;
      font-weight: 700;
      color: #2E271F;
      min-width: 60px;
      text-align: center;
    }
  `;

  private toggleSheet(sheet: MobileSheetType) {
    this.activeSheet = this.activeSheet === sheet ? null : sheet;
  }

  private closeSheet() {
    this.activeSheet = null;
  }

  private onPlayClick() {
    this.dispatchEvent(new CustomEvent('toggle-play', {
      detail: { isPlaying: !this.isPlaying },
      bubbles: true,
      composed: true,
    }));
  }

  private onSelectSection(id: string) {
    this.closeSheet();
    this.dispatchEvent(new CustomEvent('select-section', {
      detail: { id },
      bubbles: true,
      composed: true,
    }));
  }

  private onNewSection() {
    this.closeSheet();
    this.dispatchEvent(new CustomEvent('new-section', {
      bubbles: true,
      composed: true,
    }));
  }

  private onSelectSound(soundName: string) {
    this.closeSheet();
    const isMelody = this.activeTab === 'melody';
    this.dispatchEvent(new CustomEvent(isMelody ? 'set-melody-sound' : 'set-chord-sound', {
      detail: { sound: soundName },
      bubbles: true,
      composed: true,
    }));
  }

  private onSelectFeelStep(axis: string, stepName: string, value: any) {
    const isMelody = this.activeTab === 'melody';
    if (axis === 'Pattern') {
      this.dispatchEvent(new CustomEvent(isMelody ? 'set-melody-feel' : 'set-chord-feel', {
        detail: { feel: stepName },
        bubbles: true,
        composed: true,
      }));
    } else {
      this.dispatchEvent(new CustomEvent('set-feel-settings', {
        detail: { [axis.toLowerCase()]: value },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private onBpmChange(delta: number) {
    const next = Math.max(40, Math.min(240, this.bpm + delta));
    this.dispatchEvent(new CustomEvent('set-bpm', {
      detail: { bpm: next },
      bubbles: true,
      composed: true,
    }));
  }

  private onBarsChange(bars: number) {
    this.dispatchEvent(new CustomEvent('set-bars-per-chord', {
      detail: { bars },
      bubbles: true,
      composed: true,
    }));
  }

  private onKeyRootChange(root: string) {
    this.dispatchEvent(new CustomEvent('set-key', {
      detail: { root, mode: this.scaleMode },
      bubbles: true,
      composed: true,
    }));
  }

  private onScaleModeChange(mode: string) {
    this.dispatchEvent(new CustomEvent('set-key', {
      detail: { root: this.keyRoot, mode },
      bubbles: true,
      composed: true,
    }));
  }

  private onRerollProgression() {
    this.closeSheet();
    this.dispatchEvent(new CustomEvent('reroll', {
      bubbles: true,
      composed: true,
    }));
  }

  private onToggleSaved() {
    this.closeSheet();
    this.dispatchEvent(new CustomEvent(this.isSaved ? 'unsave-set' : 'save-set', {
      bubbles: true,
      composed: true,
    }));
  }

  private onViewSavedLoops() {
    this.closeSheet();
    this.dispatchEvent(new CustomEvent('view-sets', {
      bubbles: true,
      composed: true,
    }));
  }

  private onOpenShare() {
    this.closeSheet();
    this.dispatchEvent(new CustomEvent('open-share', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const isMelody = this.activeTab === 'melody';
    const isSong = this.activeTab === 'song';
    const activeSection = this.sections.find((s, i) => (s.id || String.fromCharCode(65 + i)) === this.activeSectionId) || this.sections[0] || {
      id: 'A',
      name: 'Chorus',
      desc: '',
      tint: '#F1E4CC',
      order: [0, 1, 2, 3],
      progression: null as any,
    };
    const secLetter = activeSection.id || activeSection.name.charAt(0);
    const playBg = this.isPlaying ? '#FBF3E6' : this.moodColor;
    const playIcon = this.isPlaying ? '■' : '▶';
    const currentSound = isMelody ? this.melodySound : this.chordSound;
    const currentFeel = isMelody ? this.melodyFeel : this.chordFeel;

    return html`
      <div class="dock-container" data-screen-label="MobileDock">
        <!-- Play / Stop -->
        <button
          class="play-btn"
          style="background: ${playBg};"
          @click=${this.onPlayClick}
          aria-label=${this.playLabel}
        >
          ${playIcon}
        </button>

        <div class="divider"></div>

        <!-- Section Badge -->
        <button
          class="dock-btn ${this.activeSheet === 'section' ? 'active' : ''}"
          @click=${() => this.toggleSheet('section')}
          aria-label="Choose section"
        >
          <span class="sec-letter-badge" style="background: ${activeSection.tint || '#F1E4CC'};">
            ${secLetter}
          </span>
          <span class="caret-mini">▾</span>
        </button>

        <!-- Sound Button -->
        ${!isSong ? html`
          <button
            class="dock-btn ${this.activeSheet === 'sound' ? 'active' : ''}"
            @click=${() => this.toggleSheet('sound')}
            aria-label="Sound settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 9v6h4l5 4V5L8 9H4z"></path>
              <path d="M16.5 8.5a5 5 0 0 1 0 7"></path>
              <path d="M19 6a8.5 8.5 0 0 1 0 12"></path>
            </svg>
          </button>

          <!-- Feel Button -->
          <button
            class="dock-btn ${this.activeSheet === 'feel' ? 'active' : ''}"
            @click=${() => this.toggleSheet('feel')}
            aria-label="Feel settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8"></path>
              <circle cx="16" cy="7" r="2"></circle>
              <circle cx="10" cy="17" r="2"></circle>
            </svg>
          </button>
        ` : ''}

        <!-- Key & Tempo Button -->
        <button
          class="dock-btn ${this.activeSheet === 'key' ? 'active' : ''}"
          @click=${() => this.toggleSheet('key')}
          aria-label="Key and tempo settings"
        >
          <span class="key-badge-text">${this.keyRoot} ${this.scaleMode ? this.scaleMode.slice(0, 3) : 'maj'}</span>
        </button>

        <div class="spacer"></div>

        <!-- More Actions (⋯) -->
        <button
          class="more-btn"
          @click=${() => this.toggleSheet('more')}
          aria-label="More actions"
        >
          ⋯
        </button>

        <!-- More Popover (Upwards) -->
        ${this.activeSheet === 'more' ? html`
          <div class="popover-up">
            <button class="popover-menu-item" @click=${this.onRerollProgression}>
              <span class="label">Try another progression</span>
              <span class="desc">New chords for this section, with undo</span>
            </button>
            <button class="popover-menu-item" @click=${this.onToggleSaved}>
              <span class="label">${this.isSaved ? 'Kept' : 'Keep this loop'}</span>
              <span class="desc">Save it to your loops</span>
            </button>
            <button class="popover-menu-item" @click=${this.onViewSavedLoops}>
              <span class="label">Saved loops</span>
              <span class="desc">Load a loop into this section</span>
            </button>
            <button class="popover-menu-item" @click=${this.onOpenShare}>
              <span class="label">Share and export</span>
              <span class="desc">MIDI, WAV, M8, Circuit</span>
            </button>
          </div>
        ` : ''}

        <!-- Section Popover (Upwards) -->
        ${this.activeSheet === 'section' ? html`
          <div class="popover-up" style="max-height: 320px; overflow-y: auto;">
            <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #8A6B3F; padding: 6px 10px 4px;">
              Section
            </div>
            ${this.sections.map((s, i) => {
              const sid = s.id || String.fromCharCode(65 + i);
              return html`
                <button
                  class="popover-menu-item"
                  style="flex-direction: row; align-items: center; gap: 10px; background: ${sid === this.activeSectionId ? '#F1E4CC' : 'transparent'};"
                  @click=${() => this.onSelectSection(sid)}
                >
                  <span class="sec-letter-badge" style="background: ${s.tint || '#F1E4CC'};">${sid}</span>
                  <span class="label" style="flex: 1;">${s.name}</span>
                  <span class="desc">${s.order ? s.order.length : 4} bars</span>
                </button>
              `;
            })}
            <div style="height: 1px; background: rgba(46, 39, 31, 0.08); margin: 4px 6px;"></div>
            <button class="popover-menu-item" style="color: #8A6B3F;" @click=${this.onNewSection}>
              <span class="label">+ New section</span>
            </button>
          </div>
        ` : ''}
      </div>

      <!-- Backdrop for bottom sheets -->
      ${this.activeSheet === 'key' || this.activeSheet === 'feel' || this.activeSheet === 'sound' ? html`
        <div class="sheet-backdrop" @click=${this.closeSheet}></div>
      ` : ''}

      <!-- Key & Tempo Bottom Sheet -->
      ${this.activeSheet === 'key' ? html`
        <div class="bottom-sheet">
          <div class="sheet-handle"></div>
          <div class="sheet-header">
            <span class="sheet-title">Key & Tempo</span>
            <button class="sheet-close-btn" @click=${this.closeSheet}>×</button>
          </div>

          <div class="sheet-section-title">Tempo (BPM)</div>
          <div class="bpm-stepper">
            <button @click=${() => this.onBpmChange(-1)}>−</button>
            <span class="bpm-val">${this.bpm}</span>
            <button @click=${() => this.onBpmChange(1)}>+</button>
          </div>

          <div class="sheet-section-title">Bars per chord</div>
          <div class="pill-group">
            ${[1, 2, 4].map(b => html`
              <button
                class="pill-btn ${this.barsPerChord === b ? 'selected' : ''}"
                @click=${() => this.onBarsChange(b)}
              >
                ${b} bar${b > 1 ? 's' : ''}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Key Root</div>
          <div class="pill-group">
            ${ROOT_KEYS.map(k => html`
              <button
                class="pill-btn ${this.keyRoot === k ? 'selected' : ''}"
                @click=${() => this.onKeyRootChange(k)}
              >
                ${k}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Scale / Mode</div>
          <div class="pill-group">
            ${SCALE_MODES.map(m => html`
              <button
                class="pill-btn ${this.scaleMode === m ? 'selected' : ''}"
                @click=${() => this.onScaleModeChange(m)}
              >
                ${m}
              </button>
            `)}
          </div>
        </div>
      ` : ''}

      <!-- Feel Bottom Sheet -->
      ${this.activeSheet === 'feel' ? html`
        <div class="bottom-sheet">
          <div class="sheet-handle"></div>
          <div class="sheet-header">
            <span class="sheet-title">${isMelody ? 'Melody feel' : 'Chord feel'}</span>
            <button class="sheet-close-btn" @click=${this.closeSheet}>×</button>
          </div>

          <div class="sheet-section-title">Pattern</div>
          <div class="pill-group">
            ${['Block chords', 'Arpeggio', 'Strum', 'Broken (swing)', 'Half-time'].map(step => html`
              <button
                class="pill-btn ${step === currentFeel ? 'selected' : ''}"
                @click=${() => this.onSelectFeelStep('Pattern', step, step)}
              >
                ${step.replace(/ chords|\(swing\)/g, '')}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Swing</div>
          <div class="pill-group">
            ${[
              { name: 'Straight', val: 0 },
              { name: 'Light', val: 20 },
              { name: 'Medium', val: 45 },
              { name: 'Hard', val: 70 },
            ].map(s => html`
              <button
                class="pill-btn ${(this.feelSettings.swing || 0) === s.val ? 'selected' : ''}"
                @click=${() => this.onSelectFeelStep('Swing', s.name, s.val)}
              >
                ${s.name}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Humanise</div>
          <div class="pill-group">
            ${[
              { name: 'Off', val: 0 },
              { name: 'Subtle', val: 25 },
              { name: 'Natural', val: 50 },
              { name: 'Loose', val: 80 },
            ].map(s => html`
              <button
                class="pill-btn ${(this.feelSettings.humanise || 0) === s.val ? 'selected' : ''}"
                @click=${() => this.onSelectFeelStep('Humanise', s.name, s.val)}
              >
                ${s.name}
              </button>
            `)}
          </div>

          <div class="sheet-section-title">Tone</div>
          <div class="pill-group">
            ${['Warm', 'Glassy', 'Dusty'].map(t => html`
              <button
                class="pill-btn ${this.feelSettings.tone === t ? 'selected' : ''}"
                @click=${() => this.onSelectFeelStep('Tone', t, t)}
              >
                ${t}
              </button>
            `)}
          </div>
        </div>
      ` : ''}

      <!-- Sound Bottom Sheet -->
      ${this.activeSheet === 'sound' ? html`
        <div class="bottom-sheet">
          <div class="sheet-handle"></div>
          <div class="sheet-header">
            <span class="sheet-title">${isMelody ? 'Melody sound' : 'Chord sound'}</span>
            <button class="sheet-close-btn" @click=${this.closeSheet}>×</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${TRANSPORT_SOUNDS.map(inst => html`
              <button
                class="popover-menu-item"
                style="flex-direction: row; align-items: flex-start; gap: 12px; background: ${inst.name === currentSound ? '#F1E4CC' : 'transparent'};"
                @click=${() => this.onSelectSound(inst.name)}
              >
                <span style="width: 12px; height: 12px; border-radius: 4px; background: ${inst.color}; flex-shrink: 0; margin-top: 3px;"></span>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <span class="label">${inst.name}</span>
                  <span class="desc">${inst.desc}</span>
                </div>
              </button>
            `)}
          </div>
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mobile-dock': MobileDock;
  }
}
