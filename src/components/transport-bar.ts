import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SongSection } from '../services/song-arranger';
import { FeelSettings } from '../services/audio-service';

export interface TransportSoundItem {
  name: string;
  desc: string;
  color: string;
}

export const TRANSPORT_SOUNDS: TransportSoundItem[] = [
  { name: 'Grand Piano', desc: 'Clear and even. Easy to hear the harmony.', color: '#9CC0EC' },
  { name: 'Stage Rhodes', desc: 'Warm electric piano with a soft bell.', color: '#F2A79B' },
  { name: 'Nylon Guitar', desc: 'Plucked and intimate.', color: '#F6D98B' },
  { name: 'Jazz Archtop', desc: 'Round, woody jazz guitar.', color: '#D89047' },
  { name: 'Drawbar Organ', desc: 'Held, breathy organ tone.', color: '#E8609A' },
  { name: 'Cinematic Pad', desc: 'Long, soft swells that hold each chord.', color: '#C9A9E0' },
  { name: 'Celestial Bell', desc: 'Glassy and bright. Rings out.', color: '#B8CC9E' },
  { name: 'Juno Synth', desc: 'Lush analog chorus synth.', color: '#7B61FF' },
  { name: 'Vintage SH-101', desc: 'Squelchy mono synth. Great for lines.', color: '#4EA598' },
  { name: 'House Stab', desc: 'Short, punchy chord hits.', color: '#FF8C42' },
];

export const ROOT_KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export const SCALE_MODES = [
  'Major', 'Minor', 'Dorian', 'Mixolydian', 'Lydian', 'Phrygian', 'Locrian', 'Harmonic minor', 'Melodic minor'
];

export type TransportMenuType = 'section' | 'sound' | 'feel' | 'tempo' | null;

@customElement('transport-bar')
export class TransportBar extends LitElement {
  @property({ type: String }) activeTab: 'loop' | 'melody' | 'song' | 'play' = 'loop';
  @property({ type: Boolean }) isPlaying = false;
  @property({ type: String }) playLabel = 'Play section';
  @property({ type: String }) moodColor = '#C9A9E0';
  @property({ type: Array }) sections: SongSection[] = [];
  @property({ type: String }) activeSectionId = 'A';
  @property({ type: String }) melodyLoop = 'Section'; // 'Section' | 'Chord' | 'Span'
  @property({ type: String }) chordSound = 'Stage Rhodes';
  @property({ type: String }) melodySound = 'Stage Rhodes';
  @property({ type: String }) chordFeel = 'Block chords';
  @property({ type: String }) melodyFeel = 'Smooth';
  @property({ type: Object }) feelSettings: FeelSettings = { swing: 0, spread: 50, density: 50, tone: 'Warm' };
  @property({ type: String }) keyRoot = 'C';
  @property({ type: String }) scaleMode = 'Major';
  @property({ type: Number }) bpm = 84;
  @property({ type: Number }) barsPerChord = 1;
  @property({ type: String }) songTotal = '';

  @state() private openMenu: TransportMenuType = null;
  @state() private feelMoreOpen = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .transport-container {
      position: relative;
      min-height: 60px;
      border-radius: 20px;
      background: #2E271F;
      color: #FBF3E6;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      row-gap: 6px;
      column-gap: 4px;
      padding: 9px 10px;
      box-sizing: border-box;
    }

    .play-btn {
      border: none;
      font-family: inherit;
      min-height: 42px;
      padding: 0 18px 0 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      white-space: nowrap;
      color: #2E271F;
      transition: transform 120ms ease, opacity 120ms ease;
    }

    .play-btn:hover {
      opacity: 0.95;
    }

    .play-btn:active {
      transform: scale(0.97);
    }

    .play-icon {
      font-size: 10px;
      line-height: 1;
    }

    .divider {
      width: 1px;
      height: 26px;
      background: rgba(251, 243, 230, 0.16);
      margin: 0 4px;
      flex-shrink: 0;
    }

    .tb-btn {
      border: none;
      font-family: inherit;
      min-height: 40px;
      padding: 0 13px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
      white-space: nowrap;
      background: transparent;
      color: rgba(251, 243, 230, 0.72);
      transition: background 120ms ease, color 120ms ease;
    }

    .tb-btn:hover {
      background: rgba(251, 243, 230, 0.1);
      color: #FBF3E6;
    }

    .tb-btn.active {
      background: rgba(251, 243, 230, 0.16);
      color: #FBF3E6;
    }

    .tb-btn .highlight {
      color: #FBF3E6;
    }

    .tb-btn .caret {
      opacity: 0.7;
      font-size: 10px;
    }

    .sec-badge {
      width: 10px;
      height: 10px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .sec-full-group {
      display: flex;
      gap: 2px;
      flex-shrink: 0;
    }

    @media (max-width: 1319px) {
      .sec-full-group {
        display: none !important;
      }
    }

    @media (min-width: 1320px) {
      .sec-compact-btn {
        display: none !important;
      }
    }

    .popover-shell {
      position: absolute;
      bottom: calc(100% + 12px);
      z-index: 50;
      box-sizing: border-box;
      background: #FBF3E6;
      color: #2E271F;
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.08), 0 20px 48px rgba(46, 39, 31, 0.24);
      padding: 14px 16px 16px;
      animation: popover-fade-in 160ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    @keyframes popover-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .popover-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: #8A6B3F;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .sound-popover {
      left: 120px;
      width: 320px;
      max-height: min(68vh, 520px);
      overflow-y: auto;
    }

    .sound-item {
      width: 100%;
      border: none;
      font-family: inherit;
      border-radius: 12px;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 9px 10px;
      text-align: left;
      color: #2E271F;
      transition: background 120ms ease;
    }

    .sound-item:hover {
      background: #F1E4CC;
    }

    .sound-item.selected {
      background: #F1E4CC;
    }

    .sound-dot {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      flex-shrink: 0;
      margin-top: 3px;
    }

    .sound-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .sound-name {
      font-size: 13px;
      font-weight: 800;
    }

    .sound-desc {
      font-size: 11.5px;
      font-weight: 600;
      color: #6B5F50;
      line-height: 1.35;
    }

    .feel-popover {
      left: 180px;
      width: 360px;
      max-height: min(72vh, 560px);
      overflow-y: auto;
    }

    .feel-axis {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 12px;
    }

    .feel-axis-header {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .feel-axis-label {
      font-size: 12.5px;
      font-weight: 800;
    }

    .feel-axis-hint {
      font-size: 11px;
      font-weight: 600;
      color: #6B5F50;
    }

    .feel-track {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      background: #F6EADB;
      border-radius: 14px;
      padding: 3px;
    }

    .feel-step-btn {
      flex: 1 1 auto;
      border: none;
      font-family: inherit;
      min-height: 34px;
      padding: 0 10px;
      border-radius: 11px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      background: transparent;
      color: #6B5F50;
      transition: background 120ms ease, color 120ms ease;
    }

    .feel-step-btn.selected {
      background: #2E271F;
      color: #FBF3E6;
    }

    .more-toggle {
      border: none;
      background: transparent;
      padding: 4px 0;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      color: #8A6B3F;
      cursor: pointer;
    }

    .tempo-popover {
      right: 50px;
      width: 420px;
      max-height: min(72vh, 560px);
      overflow-y: auto;
    }

    .tempo-row {
      display: flex;
      gap: 18px;
      align-items: flex-end;
      flex-wrap: wrap;
    }

    .bpm-stepper {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }

    .bpm-stepper button {
      border: none;
      font-family: inherit;
      width: 36px;
      height: 36px;
      border-radius: 11px;
      background: #F1E4CC;
      color: #2E271F;
      font-size: 17px;
      font-weight: 800;
      cursor: pointer;
    }

    .bpm-stepper button:hover {
      background: #E8D6B8;
    }

    .bpm-val {
      font-family: 'Space Mono', monospace;
      font-size: 20px;
      font-weight: 700;
      color: #2E271F;
      min-width: 56px;
      text-align: center;
    }

    .pill-group {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 6px;
    }

    .pill-btn {
      border: none;
      font-family: inherit;
      min-height: 32px;
      padding: 0 10px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      background: #F6EADB;
      color: #6B5F50;
      transition: background 120ms ease, color 120ms ease;
    }

    .pill-btn:hover {
      background: #F1E4CC;
      color: #2E271F;
    }

    .pill-btn.selected {
      background: #2E271F;
      color: #FBF3E6;
    }

    .sec-popover {
      left: 100px;
      width: 260px;
      padding: 8px;
    }

    .sec-item {
      border: none;
      font-family: inherit;
      min-height: 42px;
      border-radius: 12px;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 12px;
      color: #2E271F;
      width: 100%;
      text-align: left;
    }

    .sec-item:hover, .sec-item.selected {
      background: #F1E4CC;
    }

    .sec-item-name {
      flex: 1;
      font-size: 13.5px;
      font-weight: 800;
    }

    .sec-item-meta {
      font-size: 11.5px;
      font-weight: 700;
      color: #6B5F50;
    }

    .share-btn {
      border: none;
      font-family: inherit;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      margin-left: 4px;
      background: #FBF3E6;
      color: #2E271F;
      transition: transform 120ms ease;
    }

    .share-btn:hover {
      transform: scale(1.04);
    }

    .share-btn:active {
      transform: scale(0.96);
    }

    .spacer {
      flex: 1 1 0;
      min-width: 4px;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 40;
    }
  `;

  private toggleMenu(menu: TransportMenuType) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  private closeMenu() {
    this.openMenu = null;
  }

  private onPlayClick() {
    this.dispatchEvent(new CustomEvent('toggle-play', {
      detail: { isPlaying: !this.isPlaying },
      bubbles: true,
      composed: true,
    }));
  }

  private onSelectSection(id: string) {
    this.closeMenu();
    this.dispatchEvent(new CustomEvent('select-section', {
      detail: { id },
      bubbles: true,
      composed: true,
    }));
  }

  private onNewSection() {
    this.closeMenu();
    this.dispatchEvent(new CustomEvent('new-section', {
      bubbles: true,
      composed: true,
    }));
  }

  private onLoopCycle() {
    this.dispatchEvent(new CustomEvent('loop-cycle', {
      bubbles: true,
      composed: true,
    }));
  }

  private onSelectSound(soundName: string) {
    this.closeMenu();
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

  private onShareClick() {
    this.closeMenu();
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

    const currentSound = isMelody ? this.melodySound : this.chordSound;
    const currentFeel = isMelody ? this.melodyFeel : this.chordFeel;
    const playBg = this.isPlaying ? '#FBF3E6' : this.moodColor;
    const playIcon = this.isPlaying ? '■' : '▶';

    return html`
      <div class="transport-container" data-screen-label="Transport">
        ${this.openMenu ? html`<div class="backdrop" @click=${this.closeMenu}></div>` : ''}

        <!-- Play / Stop Button -->
        <button
          class="play-btn"
          style="background: ${playBg};"
          @click=${this.onPlayClick}
          aria-label=${this.playLabel}
        >
          <span class="play-icon">${playIcon}</span>
          ${this.playLabel}
        </button>

        <div class="divider"></div>

        <!-- Section Selector -->
        <button
          class="tb-btn sec-compact-btn ${this.openMenu === 'section' ? 'active' : ''}"
          @click=${() => this.toggleMenu('section')}
          aria-label="Choose section"
        >
          <span class="sec-badge" style="background: ${activeSection.tint || '#F1E4CC'};"></span>
          <span class="highlight">${activeSection.name}</span>
          <span class="caret">▾</span>
        </button>

        <!-- Wide viewport sections group -->
        <div class="sec-full-group">
          ${this.sections.map((s, i) => {
            const sid = s.id || String.fromCharCode(65 + i);
            return html`
              <button
                class="tb-btn ${sid === this.activeSectionId ? 'active' : ''}"
                @click=${() => this.onSelectSection(sid)}
              >
                <span class="sec-badge" style="background: ${s.tint || '#F1E4CC'};"></span>
                <span>${s.name}</span>
              </button>
            `;
          })}
        </div>

        <!-- Section Dropdown Popover -->
        ${this.openMenu === 'section' ? html`
          <div class="popover-shell sec-popover">
            <div class="popover-title">Section</div>
            ${this.sections.map((s, i) => {
              const sid = s.id || String.fromCharCode(65 + i);
              return html`
                <button
                  class="sec-item ${sid === this.activeSectionId ? 'selected' : ''}"
                  @click=${() => this.onSelectSection(sid)}
                >
                  <span class="sec-badge" style="background: ${s.tint || '#F1E4CC'}; width: 12px; height: 12px;"></span>
                  <span class="sec-item-name">${s.name}</span>
                  <span class="sec-item-meta">${s.order ? s.order.length : 4} bars</span>
                </button>
              `;
            })}
            <div style="height: 1px; background: rgba(46, 39, 31, 0.08); margin: 4px 6px;"></div>
            <button class="sec-item" style="color: #8A6B3F;" @click=${this.onNewSection}>
              + New section
            </button>
          </div>
        ` : ''}

        <div class="divider"></div>

        <!-- Melody Loop Selector (Melody Tab Only) -->
        ${isMelody ? html`
          <button
            class="tb-btn"
            @click=${this.onLoopCycle}
            aria-label="Change what loops"
          >
            <span>Loop</span>
            <span class="highlight">${this.melodyLoop}</span>
          </button>
        ` : ''}

        <!-- Sound Selector -->
        ${!isSong ? html`
          <button
            class="tb-btn ${this.openMenu === 'sound' ? 'active' : ''}"
            @click=${() => this.toggleMenu('sound')}
            aria-label="Select instrument sound"
          >
            <span>Sound</span>
            <span class="highlight">${currentSound}</span>
            <span class="caret">▾</span>
          </button>

          <!-- Feel Selector -->
          <button
            class="tb-btn ${this.openMenu === 'feel' ? 'active' : ''}"
            @click=${() => this.toggleMenu('feel')}
            aria-label="Select rhythmic feel"
          >
            <span>Feel</span>
            <span class="highlight">${currentFeel}</span>
            <span class="caret">▾</span>
          </button>
        ` : ''}

        <!-- Sound Popover -->
        ${this.openMenu === 'sound' ? html`
          <div class="popover-shell sound-popover">
            <div class="popover-title">${isMelody ? 'Melody sound' : 'Chord sound'}</div>
            ${TRANSPORT_SOUNDS.map(inst => html`
              <button
                class="sound-item ${inst.name === currentSound ? 'selected' : ''}"
                @click=${() => this.onSelectSound(inst.name)}
              >
                <span class="sound-dot" style="background: ${inst.color};"></span>
                <div class="sound-meta">
                  <span class="sound-name">${inst.name}</span>
                  <span class="sound-desc">${inst.desc}</span>
                </div>
              </button>
            `)}
          </div>
        ` : ''}

        <!-- Feel Popover -->
        ${this.openMenu === 'feel' ? html`
          <div class="popover-shell feel-popover">
            <div class="popover-title">${isMelody ? 'Melody feel' : 'Chord feel'}</div>
            
            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Pattern</span>
                <span class="feel-axis-hint">Rhythmic motion</span>
              </div>
              <div class="feel-track">
                ${['Block chords', 'Arpeggio', 'Strum', 'Broken (swing)', 'Half-time'].map(step => html`
                  <button
                    class="feel-step-btn ${step === currentFeel ? 'selected' : ''}"
                    @click=${() => this.onSelectFeelStep('Pattern', step, step)}
                  >
                    ${step.replace(/ chords|\(swing\)/g, '')}
                  </button>
                `)}
              </div>
            </div>

            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Swing</span>
                <span class="feel-axis-hint">Timing offset</span>
              </div>
              <div class="feel-track">
                ${[
                  { name: 'Straight', val: 0 },
                  { name: 'Light', val: 20 },
                  { name: 'Medium', val: 45 },
                  { name: 'Hard', val: 70 },
                ].map(s => html`
                  <button
                    class="feel-step-btn ${(this.feelSettings.swing || 0) === s.val ? 'selected' : ''}"
                    @click=${() => this.onSelectFeelStep('Swing', s.name, s.val)}
                  >
                    ${s.name}
                  </button>
                `)}
              </div>
            </div>

            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Humanise</span>
                <span class="feel-axis-hint">Velocity & time micro-drift</span>
              </div>
              <div class="feel-track">
                ${[
                  { name: 'Off', val: 0 },
                  { name: 'Subtle', val: 25 },
                  { name: 'Natural', val: 50 },
                  { name: 'Loose', val: 80 },
                ].map(s => html`
                  <button
                    class="feel-step-btn ${(this.feelSettings.humanise || 0) === s.val ? 'selected' : ''}"
                    @click=${() => this.onSelectFeelStep('Humanise', s.name, s.val)}
                  >
                    ${s.name}
                  </button>
                `)}
              </div>
            </div>

            <div class="feel-axis">
              <div class="feel-axis-header">
                <span class="feel-axis-label">Tone</span>
                <span class="feel-axis-hint">Harmonic filter coloring</span>
              </div>
              <div class="feel-track">
                ${['Warm', 'Glassy', 'Dusty'].map(t => html`
                  <button
                    class="feel-step-btn ${this.feelSettings.tone === t ? 'selected' : ''}"
                    @click=${() => this.onSelectFeelStep('Tone', t, t)}
                  >
                    ${t}
                  </button>
                `)}
              </div>
            </div>

            <button class="more-toggle" @click=${() => { this.feelMoreOpen = !this.feelMoreOpen; }}>
              ${this.feelMoreOpen ? 'Less ▴' : 'More · Spread, Density ▾'}
            </button>

            ${this.feelMoreOpen ? html`
              <div class="feel-axis" style="margin-top: 8px;">
                <div class="feel-axis-header">
                  <span class="feel-axis-label">Spread</span>
                  <span class="feel-axis-hint">Stereo width</span>
                </div>
                <div class="feel-track">
                  ${[
                    { name: 'Tight', val: 20 },
                    { name: 'Wide', val: 50 },
                    { name: 'Huge', val: 90 },
                  ].map(s => html`
                    <button
                      class="feel-step-btn ${(this.feelSettings.spread || 50) === s.val ? 'selected' : ''}"
                      @click=${() => this.onSelectFeelStep('Spread', s.name, s.val)}
                    >
                      ${s.name}
                    </button>
                  `)}
                </div>
              </div>

              <div class="feel-axis">
                <div class="feel-axis-header">
                  <span class="feel-axis-label">Density</span>
                  <span class="feel-axis-hint">Rhythm subdivision</span>
                </div>
                <div class="feel-track">
                  ${[
                    { name: 'Sparse', val: 25 },
                    { name: 'Full', val: 50 },
                    { name: 'Dense', val: 80 },
                  ].map(s => html`
                    <button
                      class="feel-step-btn ${(this.feelSettings.density || 50) === s.val ? 'selected' : ''}"
                      @click=${() => this.onSelectFeelStep('Density', s.name, s.val)}
                    >
                      ${s.name}
                    </button>
                  `)}
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}

        ${isSong && this.songTotal ? html`
          <span style="font-size: 12.5px; font-weight: 800; color: rgba(251, 243, 230, 0.72); padding: 0 8px;">
            ${this.songTotal}
          </span>
        ` : ''}

        <div class="spacer"></div>

        <!-- Key & Tempo Popover Trigger -->
        <button
          class="tb-btn ${this.openMenu === 'tempo' ? 'active' : ''}"
          @click=${() => this.toggleMenu('tempo')}
          aria-label="Key and tempo settings"
        >
          <span class="highlight">${this.keyRoot} ${this.scaleMode}</span>
          <span>·</span>
          <span style="font-family: 'Space Mono', monospace;">${this.bpm}</span>
          <span style="font-size: 11px;">BPM</span>
          <span class="caret">▾</span>
        </button>

        <!-- Tempo / Key / Scale Popover -->
        ${this.openMenu === 'tempo' ? html`
          <div class="popover-shell tempo-popover">
            <div class="tempo-row">
              <div>
                <div class="popover-title">Tempo</div>
                <div class="bpm-stepper">
                  <button @click=${() => this.onBpmChange(-1)} aria-label="Decrease BPM">−</button>
                  <span class="bpm-val">${this.bpm}</span>
                  <button @click=${() => this.onBpmChange(1)} aria-label="Increase BPM">+</button>
                </div>
              </div>

              <div>
                <div class="popover-title">Bars per chord</div>
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
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div class="popover-title">Key root</div>
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
            </div>

            <div style="margin-top: 14px;">
              <div class="popover-title">Scale / Mode</div>
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
          </div>
        ` : ''}

        <!-- Share Trigger -->
        <button
          class="share-btn"
          @click=${this.onShareClick}
          aria-label="Share and export"
          title="Share and export"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"></path>
            <path d="M12 15V3"></path>
            <path d="M8 7l4-4 4 4"></path>
          </svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'transport-bar': TransportBar;
  }
}
