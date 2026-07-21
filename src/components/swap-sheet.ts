import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { Alternative, ChordBlock, buildVoicingNotes, rootOfChordName } from '../services/chord-engine';

const WHITE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
// Chord notes come back flat-spelled for flat-rooted chords (e.g. Eb, Bb) but these keys
// were only ever matched against their sharp name, so flat chord tones never highlighted.
const BLACK_NOTES = [
  { note: 'C#', flat: 'Db', left: '10%' },
  { note: 'D#', flat: 'Eb', left: '24.2857%' },
  { note: 'F#', flat: 'Gb', left: '52.857%' },
  { note: 'G#', flat: 'Ab', left: '67.1428%' },
  { note: 'A#', flat: 'Bb', left: '81.4285%' },
];

const QUALITIES = [
  { label: 'Major', sub: 'bright' },
  { label: 'Minor', sub: 'warm' },
  { label: 'Suspended (sus)', sub: 'floating' },
  { label: 'Diminished', sub: 'unstable' },
];

const EXTS = [
  { label: 'None', sub: 'triad only' },
  { label: '6th', sub: 'soft lift' },
  { label: '7th (dom / m7)', sub: 'classic tension' },
  { label: 'Major 7th (M7)', sub: 'lush, jazzy' },
  { label: '9th', sub: 'wide, colorful' },
];

// Each alternative's size/weight encodes how far it pulls from the current chord — the
// biggest, boldest label ("More tension") reads as the most dramatic option, the smallest,
// lightest one ("Resolve home") reads as the gentlest. Color still comes from the actual
// generated chord so it stays tied to the real harmony, not a fixed palette.
const VERSE_STYLE: Record<string, { size: number; weight: number }> = {
  'Darker': { size: 22, weight: 600 },
  'More tension': { size: 27, weight: 700 },
  'Dreamier': { size: 21, weight: 500 },
  'Resolve home': { size: 19, weight: 400 },
};

@customElement('swap-sheet')
export class SwapSheet extends LitElement {
  @property({ type: Object }) chord!: ChordBlock;
  @property({ type: Array }) alternatives: Alternative[] = [];
  @property({ type: Boolean }) showTheory = false;
  // 'sheet' (default): mobile bottom sheet with scrim. 'panel': inline, for the desktop
  // right-hand column — same content, no overlay/scrim/grabber.
  @property({ type: String }) variant: 'sheet' | 'panel' = 'sheet';
  // Drives the slide-in/out transition. The parent mounts this component slightly before
  // flipping this true (and unmounts it slightly after flipping it false) so the CSS
  // transition has time to play — see loop-screen's sheetMounted/sheetVisible.
  @property({ type: Boolean }) visible = false;
  // Identifies which chord slot is being edited (the progression index). Quality/extension
  // reset only when this changes — not whenever `chord` changes, since applying a voicing
  // itself updates `chord` (new name/notes round-tripped back down) and that must NOT wipe
  // out the very selection that just caused it.
  @property({ type: Number }) resetKey: number | null = null;

  @state() private voicingOpen = false;
  @state() private quality = 'Major';
  @state() private extension = 'None';
  // Grabber drag-to-dismiss: tracks live finger position while dragging (1:1, no
  // transition) and, on release, either eases back to open or finishes the slide shut before
  // telling the parent to close — so the sheet is already off-screen by the time it unmounts.
  @state() private dragY = 0;
  @state() private dragging = false;
  @state() private snapping = false;

  private dragStartY = 0;
  private dragStartTime = 0;

  @query('.sheet') private sheetEl?: HTMLElement;

  static styles = css`
    :host {
      display: contents;
    }
    .scrim {
      position: absolute;
      inset: 0;
      background: rgba(32, 26, 19, 0);
      z-index: 40;
      transition: background .28s ease;
    }
    .scrim.visible {
      background: rgba(32, 26, 19, 0.55);
    }
    .sheet {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: auto;
      max-height: 74%;
      background: var(--cv-paper);
      border-radius: 14px 14px 0 0;
      z-index: 41;
      padding: 14px 22px 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--cv-ink-20);
      box-shadow: 0 -2px 0 rgba(32, 26, 19, 0.06);
      transform: translateY(100%);
      transition: transform .32s cubic-bezier(.32,.72,0,1);
    }
    .sheet.visible {
      transform: translateY(0);
    }
    .grabber {
      width: 36px;
      height: 3px;
      background: rgba(32, 26, 19, 0.25);
      align-self: center;
      margin-bottom: 16px;
      flex-shrink: 0;
      border-radius: 2px;
      touch-action: none;
      cursor: grab;
    }
    .sheet.panel {
      position: static;
      height: auto;
      transform: none !important;
      transition: none !important;
      border-radius: 0;
      border: none;
      box-shadow: none;
      padding: 0;
    }
    .sheet.panel .grabber {
      display: none;
    }
    .sheet.panel .sheet-title {
      font-size: 20px;
    }
    .head-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .sheet-title {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-weight: 700;
      font-size: 22px;
      color: var(--cv-ink);
    }
    .close-btn {
      font-size: 20px;
      color: var(--cv-ink-40);
      cursor: pointer;
      background: none;
      border: none;
    }
    .helper {
      font-family: var(--cv-font-body);
      font-size: 13px;
      color: var(--cv-ink-45);
      margin-top: 4px;
      margin-bottom: 18px;
      flex-shrink: 0;
    }
    .alt-list {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .alt-row {
      padding: 9px 0;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform .2s ease;
    }
    .alt-row:hover {
      transform: translateX(4px);
    }
    .alt-label {
      font-family: var(--cv-font-serif);
      font-style: italic;
      letter-spacing: -0.2px;
    }
    .alt-sub {
      font-family: var(--cv-font-body);
      font-size: 12px;
      color: var(--cv-ink-45);
      margin-top: 2px;
    }
    .alt-function {
      font-family: var(--cv-font-grotesk);
      font-size: 10px;
      letter-spacing: 0.4px;
      color: var(--cv-accent);
      margin-top: 5px;
      text-transform: uppercase;
      font-weight: 700;
    }
    .alt-rationale {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 12px;
      line-height: 1.4;
      color: var(--cv-ink-55);
      margin-top: 3px;
      margin-bottom: 2px;
    }
    .voicing-section {
      border-top: 1px solid var(--cv-ink-14);
      margin-top: 14px;
      padding-top: 12px;
      flex-shrink: 0;
    }
    .voicing-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .voicing-chevron {
      font-family: var(--cv-font-grotesk);
      font-size: 11px;
      color: var(--cv-ink-40);
      transition: transform .2s ease;
      display: inline-block;
    }
    .voicing-chevron.open {
      transform: rotate(90deg);
    }
    .voicing-label {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 13px;
      color: rgba(32, 26, 19, 0.6);
    }
    .bento {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-top: 10px;
    }
    .bento.ext {
      margin-top: 6px;
    }
    .bento-card {
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: baseline;
      gap: 6px;
      background: rgba(32, 26, 19, 0.03);
      border: 1px solid var(--cv-ink-12);
    }
    .bento-card.span {
      grid-column: 1 / -1;
    }
    .bento-card.selected {
      background: var(--cv-ink);
      border-color: var(--cv-ink);
    }
    .bento-label {
      font-family: var(--cv-font-grotesk);
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink);
    }
    .bento-card.selected .bento-label {
      color: var(--cv-cream);
    }
    .bento-sub {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 10.5px;
      color: rgba(32, 26, 19, 0.42);
    }
    .bento-card.selected .bento-sub {
      color: rgba(241, 232, 217, 0.6);
    }
    .kb-caption {
      font-family: var(--cv-font-serif);
      font-style: italic;
      font-size: 11px;
      color: var(--cv-ink-40);
      margin-top: 10px;
    }
    .keyboard {
      position: relative;
      display: flex;
      margin-top: 6px;
      border: 1px solid var(--cv-ink-18);
      border-radius: 8px;
      overflow: hidden;
    }
    .white-key {
      flex: 1;
      height: 72px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 6px;
      border-right: 1px solid rgba(32, 26, 19, 0.15);
      font-family: var(--cv-font-grotesk);
      font-size: 10px;
      font-weight: 600;
      background: var(--cv-key-white);
      color: rgba(32, 26, 19, 0.35);
    }
    .white-key.active {
      background: var(--cv-accent);
      color: #F1E8D9;
    }
    .black-key {
      position: absolute;
      top: 0;
      width: 8.5714%;
      height: 44px;
      background: var(--cv-ink);
      border-radius: 0 0 3px 3px;
      z-index: 2;
    }
    .black-key.active {
      background: var(--cv-accent);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('pointermove', this.onGrabberMove);
    window.addEventListener('pointerup', this.onGrabberUp);
    window.addEventListener('pointercancel', this.onGrabberUp);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointermove', this.onGrabberMove);
    window.removeEventListener('pointerup', this.onGrabberUp);
    window.removeEventListener('pointercancel', this.onGrabberUp);
  }

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private close() {
    this.emit('close');
  }

  // Tapping empty sheet padding (not an alt row, button, or bento card) dismisses the sheet
  // instead of silently swallowing the tap — otherwise a mis-tap there does nothing and the
  // next tap lands on whatever's now underneath, which can read as the wrong chord's drawer
  // opening or, worse, an accidental alternative selection.
  //
  // This (and the scrim's dismiss) listens on `pointerdown`, not `click`: on touch devices the
  // chord card's own tap handling already resolves — and opens this sheet — on the raw
  // pointerdown/pointerup pair, well before the browser's compatibility `click` event fires for
  // that same touch. By the time that ghost click lands, the scrim/sheet-background are already
  // sitting right where the finger is, so a `click` listener here would close the sheet an
  // instant after it opened — every single tap, since the scrim covers the whole screen. Only a
  // genuinely new pointerdown (a real, separate tap) should be able to dismiss it.
  private onSheetBackgroundClick(e: PointerEvent) {
    if (e.target === e.currentTarget) this.close();
  }

  private onGrabberDown = (e: PointerEvent) => {
    if (this.variant !== 'sheet') return;
    e.preventDefault();
    this.dragStartY = e.clientY;
    this.dragStartTime = performance.now();
    this.dragging = true;
    this.snapping = false;
    this.dragY = 0;
  };

  private onGrabberMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    // Only allow dragging down (toward closed) — resist upward drag rather than let it
    // pull the sheet above its resting position.
    this.dragY = Math.max(0, e.clientY - this.dragStartY);
  };

  private onGrabberUp = () => {
    if (!this.dragging) return;
    this.dragging = false;
    const elapsed = Math.max(1, performance.now() - this.dragStartTime);
    const velocity = this.dragY / elapsed; // px/ms
    const sheetHeight = this.sheetEl?.getBoundingClientRect().height || 400;
    const pastThreshold = this.dragY > sheetHeight * 0.3 || velocity > 0.6;

    this.snapping = true;
    if (pastThreshold) {
      this.dragY = sheetHeight + 80;
      setTimeout(() => { this.close(); }, 260);
    } else {
      this.dragY = 0;
      setTimeout(() => { this.snapping = false; }, 260);
    }
  };

  private toggleVoicing() {
    this.voicingOpen = !this.voicingOpen;
  }

  private setQuality(label: string) {
    this.quality = label;
    this.previewVoicing();
    this.commitVoicing();
  }

  private setExtension(label: string) {
    this.extension = label;
    this.previewVoicing();
    this.commitVoicing();
  }

  private previewVoicing() {
    const root = rootOfChordName(this.chord.name);
    const preferFlat = root.includes('b');
    const notes = buildVoicingNotes(root, this.quality, this.extension, preferFlat);
    this.emit('voicing-preview', notes);
  }

  // Bakes the picked quality/extension into the actual chord, not just the audio preview —
  // otherwise the change only ever lived in this component's local state and evaporated the
  // moment the sheet closed or the loop moved on.
  private commitVoicing() {
    this.emit('voicing-change', { quality: this.quality, extension: this.extension });
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('resetKey')) {
      this.voicingOpen = false;
      this.quality = 'Major';
      this.extension = 'None';
    }
  }

  render() {
    const c = this.chord;
    const root = rootOfChordName(c.name);
    const preferFlat = root.includes('b');
    const voicingNotes = this.voicingOpen ? buildVoicingNotes(root, this.quality, this.extension, preferFlat) : c.notes;

    const dragStyle = this.dragging || this.snapping
      ? `transform: translateY(${this.dragY}px); transition: ${this.dragging ? 'none' : 'transform .26s cubic-bezier(.32,.72,0,1)'};`
      : '';

    return html`
      ${this.variant === 'sheet' ? html`<div class="scrim ${this.visible ? 'visible' : ''}" @pointerdown=${this.close}></div>` : ''}
      <div class="sheet ${this.variant} ${this.visible ? 'visible' : ''}" style=${dragStyle} @pointerdown=${this.onSheetBackgroundClick}>
        <div class="grabber" @pointerdown=${this.onGrabberDown}></div>
        <div class="head-row">
          <div class="sheet-title">Swap ${c.name}</div>
          <button class="close-btn" @click=${this.close}>×</button>
        </div>
        <div class="helper">Choose the feeling you want instead.</div>
        <div class="alt-list">
          ${this.alternatives.map(alt => {
            const style = VERSE_STYLE[alt.label] || { size: 20, weight: 500 };
            return html`
              <div class="alt-row" @click=${() => this.emit('select-alternative', alt)}>
                <div class="alt-label" style="font-size:${style.size}px;font-weight:${style.weight};color:${alt.chord.color}">${alt.label}</div>
                <div class="alt-sub">${alt.sub}</div>
                ${this.showTheory ? html`
                  <div class="alt-function">${alt.functionCaption}</div>
                  <div class="alt-rationale">${alt.rationale}</div>
                ` : ''}
              </div>
            `;
          })}
        </div>

        ${this.showTheory ? html`
          <div class="voicing-section">
            <div class="voicing-toggle" @click=${this.toggleVoicing}>
              <div class="voicing-chevron ${this.voicingOpen ? 'open' : ''}">›</div>
              <div class="voicing-label">Adjust voicing</div>
            </div>
            ${this.voicingOpen ? html`
              <div>
                <div class="bento">
                  ${QUALITIES.map(q => html`
                    <div class="bento-card ${q.label === this.quality ? 'selected' : ''}" @click=${() => this.setQuality(q.label)}>
                      <div class="bento-label">${q.label}</div>
                      <div class="bento-sub">${q.sub}</div>
                    </div>
                  `)}
                </div>
                <div class="bento ext">
                  ${EXTS.map((e, i) => html`
                    <div class="bento-card ${i === 0 ? 'span' : ''} ${e.label === this.extension ? 'selected' : ''}" @click=${() => this.setExtension(e.label)}>
                      <div class="bento-label">${e.label}</div>
                      <div class="bento-sub">${e.sub}</div>
                    </div>
                  `)}
                </div>
                <div class="kb-caption">A visual guide — the notes to play, left to right.</div>
                <div class="keyboard">
                  ${WHITE_NOTES.map(n => html`
                    <div class="white-key ${voicingNotes.includes(n) ? 'active' : ''}">${n}</div>
                  `)}
                  ${BLACK_NOTES.map(b => html`
                    <div class="black-key ${(voicingNotes.includes(b.note) || voicingNotes.includes(b.flat)) ? 'active' : ''}" style="left:${b.left}"></div>
                  `)}
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swap-sheet': SwapSheet;
  }
}
