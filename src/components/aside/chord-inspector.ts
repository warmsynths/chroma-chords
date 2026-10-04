import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Progression,
  ChordBlock,
  getMoodColor,
  roleForTension,
  preferFlatSpelling,
  applyVoicingToChord,
  getChordIntervalBreakdown,
  detectProgressionCadences,
  analyzeVoiceLeading,
  VoiceLeadingLink,
  CadenceInfo,
  IntervalToken,
  SCALE_LABEL,
  SCALE_ABBREV,
} from '../../services/chord-engine';
import { getBandById } from '../../services/band-dna-service';
import type { ProjectData } from '../../services/project-service';
import '../loops-library';

export const CHORD_QUALITIES = [
  { label: 'Major', sub: 'bright' },
  { label: 'Minor', sub: 'warm' },
  { label: 'Suspended (sus)', sub: 'floating' },
  { label: 'Diminished', sub: 'unstable' },
];

export const CHORD_EXTENSIONS = [
  { label: 'None', sub: 'triad only' },
  { label: '6th', sub: 'soft lift' },
  { label: '7th (dom / m7)', sub: 'classic tension' },
  { label: 'Major 7th (M7)', sub: 'lush, jazzy' },
  { label: '9th', sub: 'wide, colorful' },
];

export const VOICINGS = [
  { label: 'Root', id: 'root' },
  { label: '1st Inv', id: 'inv1' },
  { label: '2nd Inv', id: 'inv2' },
  { label: '+1 Oct', id: 'octUp' },
  { label: '-1 Oct', id: 'octDown' },
];

const ROLE_PLAIN: Record<string, string> = {
  Tonic: 'HOME',
  Submediant: 'DRIFTING',
  Subdominant: 'LIFTING',
  Supertonic: 'STEPPING UP',
  Mediant: 'WISTFUL',
  Dominant: 'PULLING HOME',
  'Dominant 7th': 'PULLING HOME',
};

@customElement('chord-inspector')
export class ChordInspector extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
      background: var(--cv-surface, #F6EADB);
    }

    button, input, select {
      font-family: inherit;
    }

    .inspector-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }

    .inspector-top-row {
      position: relative;
      padding: 18px 22px 14px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      flex-shrink: 0;
      box-sizing: border-box;
    }

    .inspector-body {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px 22px 22px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      /* soft fade where the column scrolls under the edge (design) */
      -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 22px), transparent 100%);
      mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - 22px), transparent 100%);
    }

    /* Header */
    .header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .kicker {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-bottom: 4px;
    }

    .main-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.015em;
      color: var(--cv-ink, #2E271F);
      line-height: 1.2;
    }

    .sub-role {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      margin-top: 2px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .action-btn, .pill-btn {
      flex-shrink: 0;
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 13px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      color: var(--cv-ink, #2E271F);
      background: var(--cv-surface, #F6EADB);
      box-shadow: none;
      transition: background 150ms ease, transform 120ms ease;
    }

    .action-btn:hover, .pill-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }

    .action-btn:active, .pill-btn:active {
      transform: scale(0.96);
    }

    .action-btn.saved, .pill-btn.saved {
      background: var(--mood-color, #F2735F);
      color: #2E271F;
    }

    .action-btn.edited::after {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--mood-color, #F2735F);
      box-shadow: 0 0 0 1.5px #2E271F;
    }

    .action-btn.open, .pill-btn.open {
      background: var(--cv-surface-2, #F1E4CC);
    }

    .close-btn {
      background: transparent;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 800;
      color: rgba(46, 39, 31, 0.55);
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
      flex-shrink: 0;
    }

    .close-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }

    /* Popover */
    .popover-menu {
      position: absolute;
      top: calc(100% - 4px);
      left: 14px;
      right: 14px;
      z-index: 100;
      max-height: calc(100vh - 220px);
      overflow-y: auto;
      overscroll-behavior: contain;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 18px;
      padding: 12px;
      box-shadow: 0 20px 44px -14px rgba(46, 39, 31, 0.35);
      z-index: 100;
      animation: popover-in 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes popover-in {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .popover-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 120ms ease;
    }

    .popover-item:hover {
      background: rgba(46, 39, 31, 0.06);
    }

    /* Tension Arc Chart (Height: 152px) */
    .arc-bars-container {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: 152px;
      padding: 0 2px;
      box-sizing: border-box;
    }

    .arc-bar-col {
      flex: 1;
      min-width: 0;
      border: none;
      background: transparent;
      border-radius: 12px;
      padding: 4px 2px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: background 120ms ease;
    }

    .arc-bar-col:hover {
      background: var(--cv-cream, #FBF3E6);
    }

    .bar-pod {
      height: 80px;
      flex-shrink: 0;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .bar-fill {
      width: 100%;
      max-width: 34px;
      border-radius: 100px;
      transition: height 240ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease, box-shadow 150ms ease, transform 150ms ease;
    }

    .arc-bar-col:hover .bar-fill {
      transform: scaleY(1.03);
      transform-origin: bottom;
    }

    .arc-bar-col.selected .bar-fill {
      box-shadow: 0 0 0 2px #2E271F;
    }

    .bar-meta {
      flex-shrink: 0;
      width: 100%;
      min-height: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding-top: 6px;
    }

    .bar-chord-name {
      font-size: 13px;
      font-weight: 800;
      color: #2E271F;
      white-space: nowrap;
    }

    .bar-role-hint {
      font-size: 10.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.5);
      white-space: nowrap;
    }

    .bar-role-hint {
      font-size: 9px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      white-space: nowrap;
    }

    .arc-hint-text {
      font-size: 10.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.45);
      margin-top: -6px;
    }

    .arc-sentence-text {
      font-size: 13.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #5B5145);
    }

    /* Band card: "How they write" */
    .band-card {
      background: var(--cv-cream, #FBF3E6);
      border-radius: 16px;
      padding: 13px 15px 15px;
    }

    .band-card-head {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .band-swatch {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      flex-shrink: 0;
    }

    .band-card-kicker {
      flex: 1;
      min-width: 0;
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .band-card-name {
      line-height: 1.15;
      color: #2E271F;
      flex-shrink: 0;
    }

    .band-sig-row {
      margin-top: 12px;
    }

    .band-sig-row + .band-sig-row {
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }

    .band-sig-k {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1.1px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .band-sig-v {
      font-size: 11.5px;
      font-weight: 600;
      line-height: 1.5;
      color: var(--cv-ink, #2E271F);
      margin-top: 3px;
    }

    /* Hint card at the bottom of the idle column */
    .hint-card {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 14px;
      padding: 11px 13px;
      margin-top: 2px;
      font-size: 12.5px;
      line-height: 1.55;
      color: var(--cv-ink-muted, #6B5F50);
    }

    .hint-card svg {
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* Chord Detail Elements */
    .badge-icon {
      width: 16px;
      height: 16px;
      border-radius: 6px;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .notes-pill-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .note-pill {
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 8px;
      padding: 4px 10px;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 12px;
      font-weight: 700;
      color: #2E271F;
    }

    .section-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-bottom: 6px;
    }

    /* Interval Breakdown Grid */
    .interval-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
      gap: 6px;
    }

    .interval-token {
      background: rgba(255, 255, 255, 0.6);
      border: 1.5px solid rgba(46, 39, 31, 0.1);
      border-radius: 10px;
      padding: 6px 4px;
      text-align: center;
      transition: border-color 150ms ease, background 150ms ease;
    }

    .interval-token.guide {
      background: rgba(242, 115, 95, 0.14);
      border-color: #F2735F;
    }

    .interval-note {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 13px;
      font-weight: 800;
      color: #2E271F;
    }

    .interval-symbol {
      font-size: 10px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
      margin-top: 1px;
    }

    .interval-token.guide .interval-symbol {
      color: #F2735F;
    }

    .interval-role {
      font-size: 8.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      line-height: 1.1;
      margin-top: 1px;
    }

    /* Chips & Options Grid */
    .chips-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
    }

    .option-chip {
      background: rgba(46, 39, 31, 0.05);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 12px;
      padding: 8px 10px;
      text-align: left;
      cursor: pointer;
      transition: background 140ms ease, border-color 140ms ease, transform 100ms ease;
    }

    .option-chip:hover {
      background: rgba(46, 39, 31, 0.08);
    }

    .option-chip:active {
      transform: scale(0.97);
    }

    .option-chip.active {
      background: #FBF3E6;
      border-color: #2E271F;
      box-shadow: 0 1px 3px rgba(46, 39, 31, 0.15);
    }

    .chip-title {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .chip-desc {
      font-size: 9.5px;
      font-weight: 600;
      color: var(--cv-ink-muted, #5B5145);
      margin-top: 1px;
    }

    /* Theory Details (Matches Chroma Melody prototype lines 795-838) */
    .theory-box {
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }

    .theory-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .theory-row.formula-row {
      margin-top: 9px;
      padding-top: 9px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }

    .theory-key {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      flex-shrink: 0;
    }

    .theory-val {
      font-size: 13px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .formula-val {
      letter-spacing: 0.3px;
      text-align: right;
    }

    .theory-section-kicker {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin: 20px 0 9px;
    }

    .voice-leading-section .theory-section-kicker {
      margin: 20px 0 4px;
    }

    .cadences-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .cadence-card {
      background: var(--cv-cream, #FBF3E6);
      border-radius: 15px;
      padding: 11px 13px;
      border: none;
      box-shadow: none;
    }

    .cadence-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }

    .cadence-name {
      font-size: 13px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .cadence-bars {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: var(--cv-label, #8A6B3F);
      white-space: nowrap;
    }

    .cadence-move-row {
      display: flex;
      align-items: baseline;
      gap: 7px;
      margin-top: 5px;
      flex-wrap: wrap;
    }

    .cadence-move {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-ink-muted, #6B5F50);
    }

    .cadence-degrees {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.4px;
      color: rgba(46, 39, 31, 0.45);
    }

    .cadence-desc {
      font-size: 11.5px;
      line-height: 1.5;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 5px;
      text-wrap: pretty;
    }

    .voice-links-list {
      display: flex;
      flex-direction: column;
    }

    .voice-link-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      padding: 9px 0;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      border-bottom: none;
    }

    .voice-link-left {
      min-width: 0;
    }

    .voice-link-chords {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .voice-link-move {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.9px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-top: 2px;
    }

    .voice-link-right {
      font-size: 11.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.4);
      text-align: right;
      white-space: nowrap;
    }

    .voice-link-right.shared {
      color: var(--cv-ink-muted, #6B5F50);
    }

    .theory-note-text {
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 14px;
      text-wrap: pretty;
    }

    /* Audition State */
    .audition-card {
      background: #FBF3E6;
      border: 1.5px solid var(--mood-color, #F2735F);
      border-radius: 16px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .audition-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #2E271F;
    }
  `;

  @property({ type: Object })
  progression: Progression | null = null;

  @property({ type: Number })
  selectedChordIndex: number | null = null;

  @property({ type: String })
  selectedBand: string | null = null;

  @property({ type: Boolean })
  showTheory = false;

  @property({ type: Boolean })
  isSaved = false;

  /** new: not saved · saved: matches its saved copy · edited: changed since it was saved */
  @property({ type: String })
  saveState: 'new' | 'saved' | 'edited' = 'new';

  @property({ type: Array })
  savedSets: ProjectData[] = [];

  @property({ type: String })
  activeSetId: string | null = null;

  @property({ type: Boolean })
  libraryOpen = false;

  @property({ type: String })
  moodColor = '#F2735F';

  @property({ type: Object })
  abPick: any = null;

  @property({ type: String })
  activeSwapFamily = '';

  @property({ type: Number })
  swapIndex: number | null = null;

  private getChordQualityLabel(name?: string): string {
    if (!name) return 'Major';
    const clean = name.trim().replace(/^[A-G][#b♭♯]?/i, '');
    if (/sus/i.test(clean)) return 'Suspended (sus)';
    if (/(dim|°)/i.test(clean)) return 'Diminished';
    if (/^(m|min)(?!aj)/.test(clean)) return 'Minor';
    return 'Major';
  }

  private getChordExtensionLabel(name?: string): string {
    if (!name) return 'None';
    const clean = name.trim().replace(/^[A-G][#b♭♯]?/i, '');
    if (/9/.test(clean)) return '9th';
    if (/(maj7|\(maj7\)|Δ)/i.test(clean) || /M7/.test(clean)) return 'Major 7th (M7)';
    if (/6/.test(clean)) return '6th';
    if (/(7|11|13)/.test(clean)) return '7th (dom / m7)';
    return 'None';
  }

  private onBarClick(index: number) {
    this.dispatchEvent(new CustomEvent('chord-select', { detail: { index }, bubbles: true, composed: true }));
  }

  private onCloseSwap() {
    this.dispatchEvent(new CustomEvent('swap-close-request', { bubbles: true, composed: true }));
  }

  private onCloseDetail() {
    this.dispatchEvent(new CustomEvent('close-detail', { bubbles: true, composed: true }));
  }

  private onToggleSave() {
    this.dispatchEvent(new CustomEvent('toggle-save', { bubbles: true, composed: true }));
  }

  private onToggleLibrary() {
    this.libraryOpen = !this.libraryOpen;
    this.dispatchEvent(new CustomEvent('toggle-library', { detail: { open: this.libraryOpen }, bubbles: true, composed: true }));
  }

  private onChangeQuality(quality: string) {
    if (this.selectedChordIndex === null) return;
    this.dispatchEvent(new CustomEvent('change-chord-quality', {
      detail: { quality, index: this.selectedChordIndex },
      bubbles: true,
      composed: true,
    }));
  }

  private onChangeExtension(extension: string) {
    if (this.selectedChordIndex === null) return;
    this.dispatchEvent(new CustomEvent('change-chord-extension', {
      detail: { extension, index: this.selectedChordIndex },
      bubbles: true,
      composed: true,
    }));
  }

  private onChangeVoicing(voicing: string) {
    if (this.selectedChordIndex === null) return;
    this.dispatchEvent(new CustomEvent('change-chord-voicing', {
      detail: { voicing, index: this.selectedChordIndex },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const chords = this.progression?.chords || [];
    const moodCol = this.moodColor || getMoodColor(this.progression?.mood || 'Warm');

    return html`
      <div class="inspector-panel" style="--mood-color: ${moodCol};">
        ${this.selectedChordIndex !== null && chords[this.selectedChordIndex]
          ? this.renderChordDetail(chords[this.selectedChordIndex], chords)
          : this.swapIndex !== null && chords[this.swapIndex]
            ? this.renderSwapAudition(chords)
            : this.renderIdleOverview(chords, moodCol)}
      </div>
    `;
  }


  private renderTheory(chords: ChordBlock[]) {
    if (!this.showTheory) return '';
    const cadences = detectProgressionCadences(chords);
    const voiceLinks = analyzeVoiceLeading(chords);
    const key = this.progression?.key || 'C';
    const scale = this.progression?.scaleType || 'MAJOR';
    return html`

          <div class="theory-box">
            <div class="theory-row">
              <span class="theory-key">Key<span style="display: none;"> &amp; Scale</span></span>
              <span class="theory-val">${key.replace('b', '♭')} ${(scale || 'major').toLowerCase() === 'minor' ? 'Minor' : 'Major'}</span>
            </div>
            <div class="theory-row formula-row">
              <span class="theory-key">Formula</span>
              <span class="theory-val formula-val">${chords.map(c => c.roman || '').filter(Boolean).join(' – ')}</span>
            </div>

            ${cadences.length ? html`
              <div class="cadences-section">
                <div class="theory-section-kicker">Cadences</div>
                <div class="cadences-list">
                  ${cadences.map(c => html`
                    <div class="cadence-card">
                      <div class="cadence-head">
                        <span class="cadence-name">${c.name}</span>
                        <span class="cadence-bars">${c.bars}</span>
                      </div>
                      ${c.move ? html`
                        <div class="cadence-move-row">
                          <span class="cadence-move">${c.move}</span>
                          ${c.degrees ? html`<span class="cadence-degrees">${c.degrees}</span>` : ''}
                        </div>
                      ` : ''}
                      <div class="cadence-desc">${c.why}</div>
                    </div>
                  `)}
                </div>
              </div>
            ` : ''}

            ${voiceLinks.length ? html`
              <div class="voice-leading-section">
                <div class="theory-section-kicker">Voice leading</div>
                <div class="voice-links-list">
                  ${voiceLinks.map(v => html`
                    <div class="voice-link-row">
                      <div class="voice-link-left">
                        <div class="voice-link-chords">${v.chords}</div>
                        <div class="voice-link-move">${v.move}</div>
                      </div>
                      <div class="voice-link-right ${v.hasShared ? 'shared' : ''}">${v.link}</div>
                    </div>
                  `)}
                </div>
              </div>
            ` : ''}

            ${this.progression?.note ? html`
              <div class="theory-note-text">${this.progression.note}</div>
            ` : ''}
          </div>
            `;
  }

  private renderIdleOverview(chords: ChordBlock[], moodCol: string) {
    // Tension arc computation
    const tensions = chords.map(c => c.tension || 0.1);
    const maxTension = Math.max(...tensions, 0.1);
    const minTension = Math.min(...tensions, 0);
    const peakIdx = tensions.indexOf(maxTension);
    const isRising = tensions.every((v, i) => i === 0 || v >= tensions[i - 1]);

    const arcTitle = (maxTension - minTension) < 0.28
      ? 'Stays close to home'
      : isRising
        ? 'A steady climb'
        : (tensions[tensions.length - 1] < 0.25 && peakIdx < tensions.length - 1)
          ? 'Away, then home'
          : 'Drifts, then settles';

    const arcSentence = `Opens ${ROLE_PLAIN[chords[0]?.functionLabel] || 'HOME'} and ${(maxTension - minTension) < 0.28
      ? 'never strays far — every chord sits in about the same place, so the loop feels calm and repeatable.'
      : isRising
        ? `tightens chord by chord, peaking on ${chords[peakIdx]?.name || 'the peak'}. Looping back does the resolving.`
        : `explores tension up to ${chords[peakIdx]?.name || 'the middle'} before easing back down home.`
    }`;

    const band = this.selectedBand ? getBandById(this.selectedBand) : null;

    return html`
      <div class="inspector-top-row">
        <div class="header-row">
          <div>
            <div class="kicker">THIS LOOP</div>
            <div class="main-title">${arcTitle}</div>
          </div>
          <div class="header-actions">
            <button
              class="action-btn ${this.isSaved ? 'saved' : ''} ${this.saveState === 'edited' ? 'edited' : ''}"
              @click=${this.onToggleSave}
              aria-label="${this.isSaved ? 'Saved loop' : 'Save loop'}"
              title="${this.saveState === 'edited' ? 'Changed since you saved it' : ''}"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="${this.isSaved ? '#2E271F' : 'none'}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/>
              </svg>
              ${this.isSaved ? 'Saved' : 'Save'}
            </button>
            <button
              class="action-btn ${this.libraryOpen ? 'open' : ''}"
              @click=${this.onToggleLibrary}
              aria-label="Your saved loops"
              aria-expanded=${this.libraryOpen ? 'true' : 'false'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 6h16M4 12h16M4 18h10"/>
              </svg>
              ${this.savedSets.length ? `Loops · ${this.savedSets.length}` : 'Loops'}
            </button>

            ${this.libraryOpen ? html`
              <div class="popover-menu">
                <loops-library
                  .sets=${this.savedSets}
                  .activeId=${this.activeSetId}
                  .moodColor=${this.moodColor}
                ></loops-library>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <div class="inspector-body">
        <!-- Arc Bars Chart (Height: 152px) -->
        <div class="arc-bars-container">
          ${chords.map((c, i) => {
            const r = roleForTension(c.tension ?? 0.1);
            const barH = Math.max(18, Math.round(18 + (c.tension ?? 0.1) * 62));
            return html`
              <button
                class="arc-bar-col ${this.selectedChordIndex === i ? 'selected' : ''}"
                @click=${() => this.onBarClick(i)}
                aria-label="${c.name}, ${ROLE_PLAIN[c.functionLabel] || ''}"
              >
                <div class="bar-pod">
                  <div class="bar-fill" style="height: ${barH}px; background: ${r.color};"></div>
                </div>
                <div class="bar-meta">
                  <div class="bar-chord-name">${c.name}</div>
                  <div class="bar-role-hint">${ROLE_PLAIN[c.functionLabel] || ''}</div>
                </div>
              </button>
            `;
          })}
        </div>
        <div class="arc-hint-text">Taller means more unresolved.</div>
        <div class="arc-sentence-text">${arcSentence}</div>

        ${this.renderTheory(chords)}

        ${band ? html`
          <div class="band-card">
            <div class="band-card-head">
              <div class="band-swatch" style="background: ${band.color};"></div>
              <div class="band-card-kicker">How they write</div>
              <div
                class="band-card-name"
                style="font-family: ${band.font}; font-weight: ${band.weight || 400}; font-style: ${band.italic ? 'italic' : 'normal'}; font-size: ${(band.pillFs || 13) + 1}px; letter-spacing: ${band.pillTrack || 'normal'};"
              >${band.name}</div>
            </div>
            ${band.sig.map(row => html`
              <div class="band-sig-row">
                <div class="band-sig-k">${row.k}</div>
                <div class="band-sig-v">${row.v}</div>
              </div>
            `)}
          </div>
        ` : ''}

        <div class="hint-card">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${moodCol}" stroke-width="2.4" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
          <div>Press a chord to hear it — the arrows on a card show what else could go there.</div>
        </div>
      </div>
    `;
  }

  private renderChordDetail(chord: ChordBlock, chords: ChordBlock[]) {
    const curQuality = this.getChordQualityLabel(chord.name);
    const curExt = this.getChordExtensionLabel(chord.name);
    const preferFlat = preferFlatSpelling(this.progression?.key || 'C', this.progression?.scaleType || 'MAJOR');
    const intervalTokens = getChordIntervalBreakdown(chord.name, preferFlat);
    const r = roleForTension(chord.tension || 0.1);

    return html`
      <div class="inspector-top-row">
        <div class="header-row">
          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <div class="badge-icon" style="background: ${r.color};"></div>
            <div>
              <div class="kicker">CHORD · ${ROLE_PLAIN[chord.functionLabel] || 'HOME'}</div>
              <div class="main-title" style="display: flex; align-items: baseline; gap: 8px;">
                ${chord.name}
                ${chord.roman ? html`<span style="font-size: 13px; font-weight: 700; color: var(--cv-label); font-family: var(--cv-font-mono, monospace);">${chord.roman}</span>` : ''}
              </div>
              <div class="sub-role">${ROLE_PLAIN[chord.functionLabel] || chord.functionLabel}</div>
            </div>
          </div>
          <button class="close-btn" @click=${this.onCloseDetail} aria-label="Close chord details">×</button>
        </div>
      </div>

      <div class="inspector-body">
        <!-- Notes Pills -->
        <div>
          <div class="section-kicker">Notes</div>
          <div class="notes-pill-row">
            ${(chord.notes || []).map(n => html`
              <div class="note-pill">${n.replace(/\d+$/, '')}</div>
            `)}
          </div>
        </div>

      <!-- Interval Breakdown & Guide Tones -->
      ${intervalTokens.length ? html`
        <div>
          <div class="section-kicker">Intervals &amp; Guide Tones</div>
          <div class="interval-grid">
            ${intervalTokens.map(tok => html`
              <div class="interval-token ${tok.isGuideTone ? 'guide' : ''}">
                <div class="interval-note">${tok.note}</div>
                <div class="interval-symbol">${tok.intervalSymbol}</div>
                <div class="interval-role">${tok.roleName}</div>
              </div>
            `)}
          </div>
        </div>
      ` : ''}

      <!-- Quality Selection -->
      <div>
        <div class="section-kicker">Quality</div>
        <div class="chips-grid">
          ${CHORD_QUALITIES.map(q => {
            const isSel = q.label === curQuality;
            return html`
              <button
                class="option-chip ${isSel ? 'active' : ''}"
                @click=${() => this.onChangeQuality(q.label)}
                aria-pressed="${isSel}"
              >
                <div class="chip-title">${q.label}</div>
                <div class="chip-desc">${q.sub}</div>
              </button>
            `;
          })}
        </div>
      </div>

      <!-- Extension Selection -->
      <div>
        <div class="section-kicker">Extension</div>
        <div class="chips-grid">
          ${CHORD_EXTENSIONS.map(e => {
            const isSel = e.label === curExt;
            return html`
              <button
                class="option-chip ${isSel ? 'active' : ''}"
                @click=${() => this.onChangeExtension(e.label)}
                aria-pressed="${isSel}"
              >
                <div class="chip-title">${e.label}</div>
                <div class="chip-desc">${e.sub}</div>
              </button>
            `;
          })}
        </div>
      </div>

      <!-- Voicing / Inversion Selection -->
      <div>
        <div class="section-kicker">Voicing</div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${VOICINGS.map(v => html`
            <button
              class="action-btn"
              @click=${() => this.onChangeVoicing(v.id)}
            >
              ${v.label}
            </button>
          `)}
        </div>
      </div>
    </div>
    `;
  }

  private renderSwapAudition(chords: ChordBlock[]) {
    const idx = this.swapIndex ?? 0;
    const chord = chords[idx];
    const r = roleForTension(chord?.tension ?? 0.1);
    const pick = this.abPick;
    return html`
      <div class="inspector-top-row">
        <div class="header-row">
          <div style="min-width: 0;">
            <div class="kicker" style="font-size: 10px;">Swapping Bar ${idx + 1}</div>
            <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
              <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1;">${chord?.name || ''}</div>
              ${chord?.roman ? html`<div style="font-family: var(--cv-font-mono, 'Space Mono', monospace); font-size: 11px; font-weight: 700; color: #8A6B3F;">${chord.roman}</div>` : ''}
              <div style="font-size: 12px; font-weight: 700; color: rgba(46, 39, 31, 0.45);">${ROLE_PLAIN[chord?.functionLabel || ''] || chord?.functionLabel || ''}</div>
            </div>
          </div>
          <button class="close-btn" style="width: 44px; height: 44px; margin: -8px -10px 0 0;" @click=${this.onCloseSwap} aria-label="Close swap">\u00D7</button>
        </div>
      </div>

      <div class="inspector-body">
        ${pick ? html`
          <div class="audition-block">
            <div class="kicker" style="font-size: 10px; margin: 0;">Auditioning \u00B7 ${this.activeSwapFamily || 'Substitution'}</div>
            <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 5px; flex-wrap: wrap;">
              <div style="font-size: 21px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1;">${pick.name || pick.chord}</div>
              ${pick.roman ? html`<div style="font-size: 11px; font-weight: 800; letter-spacing: 0.6px; color: var(--cv-label, #8A6B3F);">${pick.roman}</div>` : ''}
            </div>
            ${pick.desc || pick.functionLabel ? html`<div style="font-size: 12.5px; font-weight: 700; line-height: 1.5; color: var(--cv-ink-muted); margin-top: 6px;">${pick.desc || ROLE_PLAIN[pick.functionLabel] || pick.functionLabel}</div>` : ''}
            ${pick.notes?.length ? html`<div style="font-size: 12px; font-weight: 800; letter-spacing: 0.4px; margin-top: 10px;">${pick.notes.map((n: string) => n.replace(/\d+$/, '')).join(' \u00B7 ')}</div>` : ''}
          </div>
        ` : html`
          <div style="font-size: 12.5px; font-weight: 700; line-height: 1.55; color: var(--cv-ink-muted);">
            Pick a feeling under the loop, then a chord inside it. What it does and how it voices shows up here.
          </div>
        `}
        <div style="height: 3px; background: ${r.color}; border-radius: 2px; opacity: 0.7;"></div>
        ${this.renderTheory(chords)}
      </div>
    `;
  }

}
