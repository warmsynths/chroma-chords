import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SongSection } from '../services/song-arranger';
import { FeelSettings, setMasterTone } from '../services/audio-service';
import { playbackEngine } from '../services/playback-engine';

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

export const FEEL_AXES = [
  {
    k: 'playStyle',
    label: 'Pattern',
    hint: 'How the notes are laid out in time',
    steps: [
      { v: 'Block chords', name: 'Block' },
      { v: 'Arpeggio', name: 'Arp' },
      { v: 'Strum', name: 'Strum' },
      { v: 'Broken (swing)', name: 'Broken' },
      { v: 'Half-time', name: 'Half-time' },
    ],
  },
  {
    k: 'swing',
    label: 'Swing',
    hint: 'How far behind the beat the notes land',
    steps: [
      { v: 0, name: 'Straight' },
      { v: 25, name: 'Light' },
      { v: 55, name: 'Loose' },
      { v: 85, name: 'Heavy' },
    ],
  },
  {
    k: 'spread',
    label: 'Spread',
    hint: 'How far apart the notes sit',
    steps: [
      { v: 15, name: 'Tight' },
      { v: 50, name: 'Close' },
      { v: 75, name: 'Open' },
      { v: 95, name: 'Wide' },
    ],
  },
  {
    k: 'density',
    label: 'Density',
    hint: 'How many notes per chord',
    steps: [
      { v: 20, name: 'Sparse' },
      { v: 50, name: 'Simple' },
      { v: 75, name: 'Full' },
      { v: 95, name: 'Busy' },
    ],
  },
  {
    k: 'humanise',
    label: 'Humanise',
    hint: 'How loose the timing and touch are',
    steps: [
      { v: 0, name: 'Machine' },
      { v: 45, name: 'Natural' },
      { v: 80, name: 'Loose' },
    ],
  },
  {
    k: 'tone',
    label: 'Tone',
    hint: 'The colour of the instrument',
    steps: [
      { v: 'Warm', name: 'Warm' },
      { v: 'Glassy', name: 'Glassy' },
      { v: 'Dusty', name: 'Dusty' },
    ],
  },
];

export const FEEL_DEFAULTS = {
  playStyle: 'Block chords',
  swing: 0,
  spread: 50,
  density: 50,
  humanise: 45,
  tone: 'Warm',
};

export const ADV_DEFS = [
  { k: 'spread', label: 'Spread', from: 'Spread', max: 1, step: 0.01 },
  { k: 'duration', label: 'Duration', from: 'Pattern + Density', max: 2, step: 0.01 },
  { k: 'variance', label: 'Human variance', from: 'Humanise', max: 1, step: 0.01 },
  { k: 'micro', label: 'Micro-timing', from: 'Swing + Humanise', max: 1, step: 0.01 },
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
  @property({ type: Boolean }) backingEnabled = true;
  @property({ type: Object }) feelSettings: FeelSettings = { swing: 0, spread: 50, density: 50, tone: 'Warm' };
  @property({ type: String }) keyRoot = 'C';
  @property({ type: String }) scaleMode = 'Major';
  @property({ type: Number }) bpm = 84;
  @property({ type: Number }) barsPerChord = 1;
  @property({ type: String }) songTotal = '';
  @property({ type: Array }) chords: Array<{ name: string; roman?: string }> = [];

  @state() private openMenu: TransportMenuType = null;
  @state() private feelScope: number | null = null;
  @state() private advOpen = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: #FBF3E6;
    }

    button, input, select {
      font-family: inherit;
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
      container-type: inline-size;
    }

    /* Compact only when the bar would otherwise wrap: drop the Sound / Feel kickers and shorten Play.
       Melody carries two extra buttons (Loop, Chords), so it needs more room. */
    @container (max-width: 760px) {
      .tb-btn .kicker,
      .play-rest {
        display: none;
      }
      .tb-btn {
        padding: 0 10px;
      }
    }

    /* Very tight (Chords with the right-hand column open at ~900px): shed carets and the BPM word */
    @container (max-width: 640px) {
      .tb-btn .caret,
      .bpm-word {
        display: none;
      }
      .tb-btn {
        padding: 0 8px;
        gap: 5px;
      }
    }

    @container (max-width: 940px) {
      .transport-container.melody .tb-btn .kicker,
      .transport-container.melody .play-rest {
        display: none;
      }
      .transport-container.melody .tb-btn {
        padding: 0 10px;
      }
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
      width: min(480px, calc(100vw - 40px));
      max-height: none;
      overflow-y: visible;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .sound-popover::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }

    .sound-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px;
      margin-top: 4px;
    }

    .sound-item {
      width: 100%;
      border: none;
      font-family: inherit;
      border-radius: 12px;
      background: rgba(46, 39, 31, 0.05);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      text-align: left;
      color: #2E271F;
      transition: background 120ms ease, transform 120ms ease;
    }

    .sound-item:hover {
      background: #F1E4CC;
      transform: translateY(-1px);
    }

    .sound-item.selected {
      background: #2E271F;
      color: #FBF3E6;
    }

    .sound-item.selected .sound-desc {
      color: rgba(251, 243, 230, 0.65);
    }

    .sound-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
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

    .docked-panel {
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 10px);
      z-index: 50;
      max-height: min(72vh, 640px);
      overflow-y: auto;
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.08), 0 22px 48px rgba(46, 39, 31, 0.22);
      background: var(--cv-cream, #FBF3E6);
      color: #2E271F;
      box-sizing: border-box;
    }

    .feel-panel {
      padding: 16px 18px 18px;
    }

    @keyframes cvfv-panel {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .feel-step-btn {
      border: none;
      font-family: inherit;
      flex: 1 1 auto;
      min-width: fit-content;
      min-height: 44px;
      padding: 0 11px;
      border-radius: 12px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: -0.005em;
      white-space: nowrap;
      transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease;
      background: var(--cv-surface-2, #F1E4CC);
      color: var(--cv-ink-muted, #6B5F50);
    }

    .feel-step-btn:hover {
      background: var(--cv-surface, #F6EADB);
    }

    .feel-step-btn.selected {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
    }

    .feel-step-btn:active {
      transform: scale(0.97);
    }

    .tempo-popover {
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 10px);
      z-index: 50;
      max-height: min(72vh, 640px);
      overflow-y: auto;
      border-radius: 20px;
      box-shadow: 0 0 0 1px rgba(46, 39, 31, 0.08), 0 22px 48px rgba(46, 39, 31, 0.22);
      background: var(--cv-cream, #FBF3E6);
      color: #2E271F;
      padding: 16px 18px 16px;
      box-sizing: border-box;
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
    const isMelody = this.activeTab === 'melody';
    const isSong = this.activeTab === 'song';
    this.dispatchEvent(new CustomEvent('toggle-play', {
      detail: { isPlaying: !this.isPlaying, target: isMelody ? 'melody' : (isSong ? 'song' : 'chords') },
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
    const modes = ['Section', 'Chord', 'Span'];
    const next = modes[(modes.indexOf(this.melodyLoop) + 1) % 3];
    this.melodyLoop = next;
    this.dispatchEvent(new CustomEvent('loop-cycle', {
      detail: { melodyLoop: next },
      bubbles: true,
      composed: true,
    }));
  }

  private onSelectSound(soundName: string) {
    this.closeMenu();
    const isMelody = this.activeTab === 'melody';
    if (isMelody) {
      this.melodySound = soundName;
      playbackEngine.setMelodySound(soundName);
      this.dispatchEvent(new CustomEvent('set-melody-sound', {
        detail: { sound: soundName },
        bubbles: true,
        composed: true,
      }));
    } else {
      this.chordSound = soundName;
      this.dispatchEvent(new CustomEvent('set-chord-sound', {
        detail: { sound: soundName },
        bubbles: true,
        composed: true,
      }));
    }
    this.requestUpdate();
  }

  private get feelChanged(): boolean {
    const fs = this.feelSettings || {};
    const allBarFeel = fs.barFeel || {};
    const advOv = fs.advOverride || {};
    return (
      (fs.playStyle && fs.playStyle !== FEEL_DEFAULTS.playStyle) ||
      (fs.swing !== undefined && fs.swing !== FEEL_DEFAULTS.swing) ||
      (fs.spread !== undefined && fs.spread !== FEEL_DEFAULTS.spread) ||
      (fs.density !== undefined && fs.density !== FEEL_DEFAULTS.density) ||
      (fs.humanise !== undefined && fs.humanise !== FEEL_DEFAULTS.humanise) ||
      (fs.tone && fs.tone !== FEEL_DEFAULTS.tone) ||
      Object.keys(allBarFeel).length > 0 ||
      Object.keys(advOv).length > 0
    );
  }

  private resetFeel() {
    const isMelody = this.activeTab === 'melody';
    this.feelSettings = {
      ...FEEL_DEFAULTS,
      barFeel: {},
      advOverride: {},
    };
    this.feelScope = null;
    if (isMelody) {
      this.melodyFeel = 'Smooth';
      playbackEngine.setMelodyFeelSettings(this.feelSettings);
      this.dispatchEvent(new CustomEvent('set-melody-feel', {
        detail: { feel: 'Smooth' },
        bubbles: true,
        composed: true,
      }));
    } else {
      this.chordFeel = FEEL_DEFAULTS.playStyle;
      playbackEngine.setPlayStyle(FEEL_DEFAULTS.playStyle);
      playbackEngine.setFeelSettings(this.feelSettings);
      setMasterTone(FEEL_DEFAULTS.tone);

      this.dispatchEvent(new CustomEvent('feel-change', {
        detail: { feel: FEEL_DEFAULTS.playStyle, playStyle: FEEL_DEFAULTS.playStyle },
        bubbles: true,
        composed: true,
      }));
      this.dispatchEvent(new CustomEvent('set-chord-feel', {
        detail: { feel: FEEL_DEFAULTS.playStyle },
        bubbles: true,
        composed: true,
      }));
    }

    this.dispatchEvent(new CustomEvent('feel-settings-change', {
      detail: { feelSettings: { ...this.feelSettings } },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  private fget(k: string): any {
    const fs = this.feelSettings || {};
    const bar = this.feelScope;
    if (bar !== null && fs.barFeel && fs.barFeel[bar] && (fs.barFeel[bar] as any)[k] !== undefined) {
      return (fs.barFeel[bar] as any)[k];
    }
    if (k === 'playStyle') {
      return fs.playStyle || this.chordFeel || 'Block chords';
    }
    return (fs as any)[k] ?? (FEEL_DEFAULTS as any)[k];
  }

  private getNearestStep(d: typeof FEEL_AXES[0]) {
    const cur = this.fget(d.k);
    if (typeof cur !== 'number') {
      return d.steps.find(s => s.v === cur) || d.steps[0];
    }
    let nearest = d.steps[0];
    d.steps.forEach(s => {
      if (Math.abs(Number(s.v) - Number(cur)) < Math.abs(Number(nearest.v) - Number(cur))) {
        nearest = s;
      }
    });
    return nearest;
  }

  private onSelectFeelStep(key: string, value: any) {
    const isMelody = this.activeTab === 'melody';
    const nextFs = { ...this.feelSettings };
    if (this.feelScope === null) {
      (nextFs as any)[key] = value;
      if (key === 'playStyle') {
        if (isMelody) {
          this.melodyFeel = value;
          playbackEngine.setMelodyFeel(value);
          this.dispatchEvent(new CustomEvent('set-melody-feel', {
            detail: { feel: value, playStyle: value },
            bubbles: true,
            composed: true,
          }));
        } else {
          this.chordFeel = value;
          playbackEngine.setPlayStyle(value);
          this.dispatchEvent(new CustomEvent('set-chord-feel', {
            detail: { feel: value, playStyle: value },
            bubbles: true,
            composed: true,
          }));
          this.dispatchEvent(new CustomEvent('feel-change', {
            detail: { feel: value, playStyle: value },
            bubbles: true,
            composed: true,
          }));
        }
      } else if (key === 'tone') {
        setMasterTone(value);
      }
    } else {
      const bar = this.feelScope;
      const bf = { ...(nextFs.barFeel || {}) };
      bf[bar] = { ...(bf[bar] || {}), [key]: value };
      nextFs.barFeel = bf;
    }

    this.feelSettings = nextFs;
    if (isMelody) {
      playbackEngine.setMelodyFeelSettings(this.feelSettings);
    } else {
      playbackEngine.setFeelSettings(this.feelSettings);
    }

    this.dispatchEvent(new CustomEvent(isMelody ? 'melody-feel-settings-change' : 'feel-settings-change', {
      detail: { feelSettings: { ...this.feelSettings }, key, value, chordIndex: this.feelScope },
      bubbles: true,
      composed: true,
    }));
    this.dispatchEvent(new CustomEvent('set-feel-settings', {
      detail: { [key.toLowerCase()]: value, isMelody },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  private getDerivedParams() {
    const numOf = (k: string) => {
      const v = this.fget(k);
      return typeof v === 'number' ? v : 0;
    };
    const pattern = this.fget('playStyle');
    const spreadVal = +(numOf('spread') / 100).toFixed(2);
    const durationVal = +(pattern === 'Half-time' ? 1.6 : (numOf('density') > 70 ? 0.65 : 1)).toFixed(2);
    const varianceVal = +(numOf('humanise') / 100).toFixed(2);
    const microVal = +((numOf('swing') / 100) * 0.5 + (numOf('humanise') / 100) * 0.3).toFixed(2);
    return {
      spread: spreadVal,
      duration: durationVal,
      variance: varianceVal,
      micro: microVal,
    };
  }

  private onAdvInput(param: string, value: number) {
    const nextFs = { ...this.feelSettings };
    nextFs.advOverride = { ...(nextFs.advOverride || {}), [param]: value };
    this.feelSettings = nextFs;
    playbackEngine.setFeelSettings(this.feelSettings);
    this.dispatchEvent(new CustomEvent('feel-settings-change', {
      detail: { feelSettings: { ...this.feelSettings }, advOverride: nextFs.advOverride },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  private onAdvRelink(param: string) {
    const nextFs = { ...this.feelSettings };
    if (nextFs.advOverride) {
      const adv = { ...nextFs.advOverride };
      delete adv[param];
      nextFs.advOverride = adv;
    }
    this.feelSettings = nextFs;
    playbackEngine.setFeelSettings(this.feelSettings);
    this.dispatchEvent(new CustomEvent('feel-settings-change', {
      detail: { feelSettings: { ...this.feelSettings }, advOverride: nextFs.advOverride },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
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
    const currentPattern = this.fget('playStyle');
    const patternStep = FEEL_AXES[0].steps.find(s => s.v === currentPattern) || FEEL_AXES[0].steps[0];
    const currentFeelShort = patternStep.name;

    const effectiveChords = this.chords && this.chords.length > 0
      ? this.chords
      : (activeSection?.progression?.chords?.length
        ? activeSection.progression.chords
        : [{ name: 'Chord 1' }, { name: 'Chord 2' }, { name: 'Chord 3' }, { name: 'Chord 4' }]);

    const playBg = this.isPlaying ? '#FBF3E6' : this.moodColor;
    const playIcon = this.isPlaying ? '■' : '▶';

    return html`
      <div class="transport-container ${isMelody ? 'melody' : ''}" data-screen-label="Transport">
        ${this.openMenu ? html`<div class="backdrop" @click=${this.closeMenu}></div>` : ''}

        <!-- Play / Stop Button -->
        <button
          class="play-btn"
          style="background: ${playBg};"
          @click=${this.onPlayClick}
          aria-label=${this.playLabel}
        >
          <span class="play-icon">${playIcon}</span>
          <span class="play-first">${this.playLabel.split(' ')[0]}</span><span class="play-rest">${this.playLabel.includes(' ') ? ' ' + this.playLabel.split(' ').slice(1).join(' ') : ''}</span>
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

          <!-- Backing Chords Toggle (Melody Tab Only) -->
          <button
            class="tb-btn ${this.backingEnabled ? '' : 'muted'}"
            @click=${() => {
              this.backingEnabled = !this.backingEnabled;
              playbackEngine.setMelodyBackingEnabled(this.backingEnabled);
              this.dispatchEvent(new CustomEvent('toggle-melody-backing', {
                detail: { backingEnabled: this.backingEnabled },
                bubbles: true,
                composed: true,
              }));
              this.requestUpdate();
            }}
            aria-label="Toggle backing chords"
            title="${this.backingEnabled ? 'Backing chords on. Click to hear solo melody.' : 'Backing chords muted. Click to hear chords with melody.'}"
          >
            <span>Chords</span>
            <span class="highlight">${this.backingEnabled ? 'On' : 'Muted'}</span>
          </button>
        ` : ''}

        <!-- Sound Selector -->
        ${!isSong ? html`
          <button
            class="tb-btn ${this.openMenu === 'sound' ? 'active' : ''}"
            @click=${() => this.toggleMenu('sound')}
            aria-label="Select instrument sound"
          >
            <span class="kicker">Sound</span>
            <span class="highlight">${currentSound}</span>
            <span class="caret">▾</span>
          </button>

          <!-- Feel Selector -->
          <button
            class="tb-btn ${this.openMenu === 'feel' ? 'active' : ''}"
            @click=${() => this.toggleMenu('feel')}
            aria-label="Select rhythmic feel"
          >
            <span class="kicker">Feel</span>
            <span class="highlight">${currentFeelShort}</span>
            <span class="caret">▾</span>
          </button>
        ` : ''}

        <!-- Sound Popover -->
        ${this.openMenu === 'sound' ? html`
          <div class="popover-shell sound-popover">
            <div class="popover-title">${isMelody ? 'Melody sound' : 'Chord sound'}</div>
            <div class="sound-grid">
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
          </div>
        ` : ''}

        <!-- Feel Docked Panel -->
        ${this.openMenu === 'feel' ? html`
          <div class="docked-panel feel-panel" style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1));">
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <div style="font-size: 10px; font-weight: 800; letter-spacing: 1.3px; text-transform: uppercase; color: var(--cv-label, #8A6B3F); flex-shrink: 0;">
                ${isMelody ? 'Melody feel' : 'Chord feel'}
              </div>
              <div style="display: flex; gap: 4px; flex-wrap: wrap; flex: 1; min-width: 0;">
                <button
                  type="button"
                  style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${this.feelScope === null ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${this.feelScope === null ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                  @click=${() => { this.feelScope = null; }}
                  aria-label="Whole section, editing"
                >
                  Whole section
                </button>
                ${effectiveChords.map((c, ci) => {
                  const on = this.feelScope === ci;
                  const dirty = !!(this.feelSettings?.barFeel && this.feelSettings.barFeel[ci] && Object.keys(this.feelSettings.barFeel[ci]).length > 0);
                  const chordName = c.name || ('Chord ' + (ci + 1));
                  return html`
                    <button
                      type="button"
                      style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 5px; min-height: 30px; padding: 0 11px; border-radius: 100px; cursor: pointer; font-size: 11.5px; font-weight: 800; white-space: nowrap; transition: background 150ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)), color 150ms ease; background: ${on ? 'var(--cv-ink, #2E271F)' : 'var(--cv-surface-2, #F1E4CC)'}; color: ${on ? 'var(--cv-cream, #FBF3E6)' : 'var(--cv-ink-muted, #6B5F50)'};"
                      @click=${() => { this.feelScope = ci; }}
                      aria-label="${chordName}, ${on ? 'editing' : 'edit feel'}"
                    >
                      ${chordName}
                      <span style="width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; background: ${on ? 'var(--cv-cream, #FBF3E6)' : '#9E5D53'}; opacity: ${dirty ? 1 : 0}; transition: opacity 150ms ease;"></span>
                    </button>
                  `;
                })}
              </div>
              ${this.feelChanged ? html`
                <button
                  type="button"
                  @click=${this.resetFeel}
                  style="border: none; font-family: inherit; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11.5px; font-weight: 800; cursor: pointer; padding: 6px 8px; border-radius: 9px;"
                >Reset</button>
              ` : ''}
              <button
                type="button"
                @click=${() => this.closeMenu()}
                aria-label="Close feel and tone"
                style="border: none; font-family: inherit; background: transparent; color: rgba(46,39,31,0.5); width: 30px; height: 30px; border-radius: 50%; font-size: 16px; font-weight: 800; cursor: pointer; flex-shrink: 0;"
              >×</button>
            </div>
            <div style="font-size: 11.5px; font-weight: 700; line-height: 1.45; color: rgba(46,39,31,0.5); margin-top: 7px; text-wrap: pretty;">
              ${this.feelScope === null
                ? 'Everything below applies to every chord in this section.'
                : `Only ${effectiveChords[this.feelScope]?.name || ('Chord ' + (this.feelScope + 1))} plays this way. The rest keep the section feel.`}
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 8px 22px; margin-top: 10px;">
              ${FEEL_AXES.map(d => {
                const nearest = this.getNearestStep(d);
                return html`
                  <div style="display: flex; align-items: center; gap: 14px; padding: 5px 0; min-width: 0;">
                    <div style="width: 104px; flex-shrink: 0;">
                      <div style="font-size: 12.5px; font-weight: 800; color: var(--cv-ink, #2E271F);">${d.label}</div>
                      <div style="font-size: 10.5px; font-weight: 700; line-height: 1.35; color: rgba(46,39,31,0.45); margin-top: 1px; text-wrap: pretty;">${d.hint}</div>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0;">
                      ${d.steps.map(s => {
                        const on = s.v === nearest.v;
                        return html`
                          <button
                            type="button"
                            class="feel-step-btn ${on ? 'selected' : ''}"
                            @click=${() => this.onSelectFeelStep(d.k, s.v)}
                            aria-label="${d.label}: ${s.name}"
                          >
                            ${s.name}
                          </button>
                        `;
                      })}
                    </div>
                  </div>
                `;
              })}
            </div>
            <button
              type="button"
              @click=${() => { this.advOpen = !this.advOpen; }}
              style="border: none; font-family: inherit; display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--cv-ink-muted, #6B5F50); font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; padding: 8px 10px; margin: 10px 0 0 -10px; border-radius: 9px;"
              aria-label="Show the engine parameters these choices set"
            >
              Engine parameters <span style="font-size: 9px;">${this.advOpen ? '▲' : '▼'}</span>
            </button>
            ${this.advOpen ? html`
              <div style="animation: cvfv-panel 200ms var(--cv-ease, cubic-bezier(0.23, 1, 0.32, 1)); border-top: 1px solid rgba(46,39,31,0.1); padding-top: 13px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px 26px;">
                ${ADV_DEFS.map(p => {
                  const advOv = this.feelSettings?.advOverride || {};
                  const derived = this.getDerivedParams();
                  const detached = advOv[p.k] !== undefined;
                  const val = detached ? advOv[p.k] : derived[p.k as keyof typeof derived];
                  return html`
                    <div style="min-width: 0;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="font-size: 12px; font-weight: 800; color: var(--cv-ink, #2E271F); flex: 1; min-width: 0;">${p.label}</div>
                        <button
                          type="button"
                          @click=${() => this.onAdvRelink(p.k)}
                          style="border: none; font-family: inherit; background: transparent; color: #9E5D53; font-size: 10.5px; font-weight: 800; cursor: pointer; padding: 4px 6px; border-radius: 7px; ${detached ? '' : 'opacity: 0; pointer-events: none;'}"
                          aria-label="Re-link to the feel axis"
                        >Re-link</button>
                        <div style="font-size: 11.5px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--cv-ink, #2E271F); background: var(--cv-surface-2, #F1E4CC); border-radius: 6px; padding: 2px 7px;">
                          ${typeof val === 'number' ? val.toFixed(2) : val}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="${p.max}"
                        step="${p.step}"
                        .value="${String(val)}"
                        @input=${(e: Event) => this.onAdvInput(p.k, +(e.target as HTMLInputElement).value)}
                        aria-label="${p.label}"
                        style="width: 100%; margin-top: 7px; accent-color: #9E5D53; cursor: pointer;"
                      />
                      <div style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; color: ${detached ? '#9E5D53' : 'rgba(46,39,31,0.36)'}; margin-top: 3px;">
                        ${detached ? 'Set by hand' : 'From ' + p.from}
                      </div>
                    </div>
                  `;
                })}
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
          <span class="bpm-word" style="font-size: 11px;">BPM</span>
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
