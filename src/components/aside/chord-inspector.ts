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
      width: clamp(304px, 26vw, 384px);
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    .inspector-card {
      background: var(--cv-surface-card, rgba(251, 243, 230, 0.85));
      backdrop-filter: blur(12px);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 10px 28px -12px rgba(46, 39, 31, 0.15);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 18px;
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
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
      margin-bottom: 3px;
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
      position: relative;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(46, 39, 31, 0.06);
      border: none;
      border-radius: 100px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      transition: background 160ms ease, transform 120ms ease;
    }

    .action-btn:hover {
      background: rgba(46, 39, 31, 0.1);
    }

    .action-btn:active {
      transform: scale(0.96);
    }

    .action-btn.saved {
      background: var(--mood-color, #F2735F);
      color: #2E271F;
    }

    .close-btn {
      background: rgba(46, 39, 31, 0.08);
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
    }

    .close-btn:hover {
      background: rgba(46, 39, 31, 0.15);
    }

    /* Popover */
    .popover-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 250px;
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 12px;
      box-shadow: 0 14px 32px -8px rgba(46, 39, 31, 0.25);
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

    /* Tension Arc Chart */
    .arc-bars-container {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      height: 110px;
      padding: 12px 10px 6px;
      background: rgba(46, 39, 31, 0.03);
      border-radius: 16px;
      box-sizing: border-box;
    }

    .arc-bar-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: transform 140ms ease;
    }

    .arc-bar-col:hover {
      transform: translateY(-2px);
    }

    .arc-bar-col.selected .bar-fill {
      box-shadow: inset 0 0 0 2px #2E271F;
    }

    .bar-fill {
      width: 100%;
      border-radius: 100px;
      transition: height 240ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease;
    }

    .bar-chord-name {
      font-size: 11px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      margin-top: 6px;
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
      font-size: 13px;
      line-height: 1.55;
      color: var(--cv-ink-muted, #5B5145);
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

    /* Theory Details */
    .theory-box {
      border-top: 1px solid rgba(46, 39, 31, 0.08);
      padding-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .theory-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .theory-key {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .theory-val {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .cadence-card {
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 12px;
      padding: 10px 12px;
      margin-top: 4px;
    }

    .cadence-title {
      font-size: 12px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      display: flex;
      justify-content: space-between;
    }

    .cadence-desc {
      font-size: 11px;
      line-height: 1.45;
      color: var(--cv-ink-muted, #5B5145);
      margin-top: 3px;
    }

    .voice-link-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      font-size: 11.5px;
      padding: 4px 0;
      border-bottom: 1px solid rgba(46, 39, 31, 0.05);
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

  @property({ type: Array })
  savedSets: Array<{ id: string; name: string; date?: string }> = [];

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

  private onSelectSavedSet(set: any) {
    this.libraryOpen = false;
    this.dispatchEvent(new CustomEvent('select-saved-set', { detail: { set }, bubbles: true, composed: true }));
  }

  private onDeleteSavedSet(id: string, e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('delete-saved-set', { detail: { id }, bubbles: true, composed: true }));
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
      <aside class="chord-inspector cv-aside" style="--mood-color: ${moodCol};">
        <div class="inspector-card">
          ${this.selectedChordIndex !== null && chords[this.selectedChordIndex]
            ? this.renderChordDetail(chords[this.selectedChordIndex], chords)
            : this.swapIndex !== null && this.abPick
              ? this.renderSwapAudition()
              : this.renderIdleOverview(chords, moodCol)}
        </div>
      </aside>
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

    const cadences = detectProgressionCadences(chords);
    const voiceLinks = analyzeVoiceLeading(chords);
    const key = this.progression?.key || 'C';
    const scale = this.progression?.scaleType || 'MAJOR';
    const scaleName = SCALE_LABEL[scale] || 'Major';

    return html`
      <div class="header-row">
        <div>
          <div class="kicker">THIS LOOP</div>
          <div class="main-title">${arcTitle}</div>
        </div>
        <div class="header-actions">
          <button
            class="action-btn ${this.isSaved ? 'saved' : ''}"
            @click=${this.onToggleSave}
            aria-label="${this.isSaved ? 'Saved loop' : 'Save loop'}"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="${this.isSaved ? '#2E271F' : 'none'}" stroke="#2E271F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/>
            </svg>
            ${this.isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            class="action-btn"
            @click=${this.onToggleLibrary}
            aria-label="Your saved loops"
            aria-expanded=${this.libraryOpen ? 'true' : 'false'}
          >
            Loops${this.savedSets.length ? ` (${this.savedSets.length})` : ''}
          </button>

          ${this.libraryOpen ? html`
            <div class="popover-menu">
              <div class="kicker" style="margin-bottom: 8px;">SAVED LOOPS</div>
              ${this.savedSets.length === 0 ? html`
                <div style="font-size: 12px; color: var(--cv-ink-muted); padding: 8px 4px;">No saved loops yet. Click "Save" to store your favorite progressions.</div>
              ` : this.savedSets.map(s => html`
                <div class="popover-item" @click=${() => this.onSelectSavedSet(s)}>
                  <span style="font-size: 12.5px; font-weight: 700; color: #2E271F;">${s.name}</span>
                  <button
                    style="border: none; background: none; color: #8A6B3F; font-size: 14px; cursor: pointer;"
                    @click=${(e: Event) => this.onDeleteSavedSet(s.id, e)}
                    aria-label="Delete ${s.name}"
                  >×</button>
                </div>
              `)}
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Arc Bars Chart -->
      <div class="arc-bars-container">
        ${chords.map((c, i) => {
          const r = roleForTension(c.tension || 0.1);
          const barH = Math.round(18 + (c.tension || 0.1) * 60);
          return html`
            <button
              class="arc-bar-col ${this.selectedChordIndex === i ? 'selected' : ''}"
              @click=${() => this.onBarClick(i)}
              aria-label="${c.name}, ${ROLE_PLAIN[c.functionLabel] || ''}"
            >
              <div class="bar-fill" style="height: ${barH}px; background: ${r.color};"></div>
              <div class="bar-chord-name">${c.name}</div>
              <div class="bar-role-hint">${ROLE_PLAIN[c.functionLabel] || ''}</div>
            </button>
          `;
        })}
      </div>
      <div class="arc-hint-text">Taller means more unresolved.</div>
      <div class="arc-sentence-text">${arcSentence}</div>

      ${this.showTheory ? html`
        <div class="theory-box">
          <div class="theory-row">
            <span class="theory-key">Key &amp; Scale</span>
            <span class="theory-val">${key} ${scaleName}</span>
          </div>
          <div class="theory-row">
            <span class="theory-key">Formula</span>
            <span class="theory-val">${chords.map(c => c.roman || '').filter(Boolean).join(' – ')}</span>
          </div>

          ${cadences.length ? html`
            <div>
              <div class="section-kicker" style="margin-top: 6px;">Detected Cadences</div>
              ${cadences.map(c => html`
                <div class="cadence-card">
                  <div class="cadence-title">
                    <span>${c.name}</span>
                    <span style="font-size: 10px; color: var(--cv-label);">${c.bars}</span>
                  </div>
                  <div class="cadence-desc">${c.why}</div>
                </div>
              `)}
            </div>
          ` : ''}

          ${voiceLinks.length ? html`
            <div>
              <div class="section-kicker" style="margin-top: 6px;">Voice Leading</div>
              ${voiceLinks.map(v => html`
                <div class="voice-link-row">
                  <span style="font-weight: 700; color: #2E271F;">${v.chords}</span>
                  <span style="color: var(--cv-ink-muted);">${v.move} (${v.link})</span>
                </div>
              `)}
            </div>
          ` : ''}
        </div>
      ` : ''}
    `;
  }

  private renderChordDetail(chord: ChordBlock, chords: ChordBlock[]) {
    const curQuality = this.getChordQualityLabel(chord.name);
    const curExt = this.getChordExtensionLabel(chord.name);
    const preferFlat = preferFlatSpelling(this.progression?.key || 'C', this.progression?.scaleType || 'MAJOR');
    const intervalTokens = getChordIntervalBreakdown(chord.name, preferFlat);
    const r = roleForTension(chord.tension || 0.1);

    return html`
      <div class="header-row">
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <div class="badge-icon" style="background: ${r.color};"></div>
          <div>
            <div class="kicker">CHORD</div>
            <div class="main-title" style="display: flex; align-items: baseline; gap: 8px;">
              ${chord.name}
              ${chord.roman ? html`<span style="font-size: 13px; font-weight: 700; color: var(--cv-label); font-family: var(--cv-font-mono, monospace);">${chord.roman}</span>` : ''}
            </div>
            <div class="sub-role">${ROLE_PLAIN[chord.functionLabel] || chord.functionLabel}</div>
          </div>
        </div>
        <button class="close-btn" @click=${this.onCloseDetail} aria-label="Close chord details">×</button>
      </div>

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
    `;
  }

  private renderSwapAudition() {
    return html`
      <div class="header-row">
        <div>
          <div class="kicker">BAR ${(this.swapIndex ?? 0) + 1} HARMONIC CONTEXT</div>
          <div class="main-title">Auditioning Swap</div>
        </div>
        <button class="close-btn" @click=${this.onCloseDetail} aria-label="Close audition">×</button>
      </div>

      <div class="audition-card">
        <div class="kicker" style="color: #2E271F;">${this.activeSwapFamily || 'Substitution'}</div>
        <div class="audition-title">${this.abPick.chord || this.abPick.name}</div>
        <div style="font-size: 12.5px; color: var(--cv-ink-muted); line-height: 1.5;">
          ${this.abPick.functionLabel || this.abPick.fn || 'Alters the emotional color of this bar.'}
        </div>
        ${this.abPick.notes ? html`
          <div style="font-size: 12px; font-weight: 700; color: #2E271F;">
            Notes: ${this.abPick.notes.join(' · ')}
          </div>
        ` : ''}
      </div>
    `;
  }
}
