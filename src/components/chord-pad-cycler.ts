import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ChordBlock, roleForTension } from '../services/chord-engine';
import { SwapFeelItem, SwapFeelRow } from './chord-swap-lane';

@customElement('chord-pad-cycler')
export class ChordPadCycler extends LitElement {
  @property({ type: Object }) originalChord!: ChordBlock;
  @property({ type: Number }) barIndex = 0;
  @property({ type: Array }) feelings: SwapFeelItem[] = [];
  @property({ type: Number }) feelIndex = 0;
  @property({ type: Number }) chordIndex = 0;

  static styles = css`
    :host {
      display: block;
      position: relative;
      font-family: var(--cv-font, sans-serif);
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      padding: 4px 2px;
      user-select: none;
    }

    .cycler-was {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #4A4034;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cycler-feel-header {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 6px;
    }

    .cycler-feel-name {
      font-size: 15.5px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.015em;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cycler-feel-sub {
      font-size: 10.5px;
      font-weight: 700;
      line-height: 1.35;
      color: #2E271F;
      opacity: 0.72;
      margin-top: 3px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .cycler-nav-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
    }

    .cycler-chev-btn {
      border: none;
      font-family: inherit;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.12);
      color: #2E271F;
      font-size: 17px;
      font-weight: 800;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 150ms ease, transform 100ms ease;
    }
    .cycler-chev-btn:active {
      transform: scale(0.9);
      background: rgba(46, 39, 31, 0.22);
    }

    .cycler-dots-track {
      flex: 1;
      min-width: 0;
      display: flex;
      gap: 3px;
    }

    .cycler-dot {
      flex: 1;
      height: 3px;
      border-radius: 100px;
      transition: background 200ms ease;
    }

    .cycler-chord-btn {
      width: 100%;
      border: none;
      font-family: inherit;
      text-align: left;
      background: rgba(251, 246, 236, 0.9);
      border-radius: 14px;
      padding: 10px 12px;
      margin-top: 10px;
      cursor: pointer;
      box-shadow: 0 4px 12px -4px rgba(46, 39, 31, 0.15);
      transition: transform 120ms ease, background 150ms ease;
      box-sizing: border-box;
    }
    .cycler-chord-btn:hover {
      background: #FFFFFF;
    }
    .cycler-chord-btn:active {
      transform: scale(0.98);
    }

    .chord-top-row {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    .chord-main-name {
      font-size: 19px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.02em;
      line-height: 1.05;
      flex: 1;
      min-width: 0;
    }

    .chord-count-hint {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: rgba(46, 39, 31, 0.55);
      white-space: nowrap;
    }

    .chord-meta-row {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-top: 4px;
    }

    .chord-roman {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #6B5F50;
    }

    .chord-sub-note {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.3px;
      color: #6B5F50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }

    .keep-btn {
      width: 100%;
      border: none;
      font-family: inherit;
      background: #2E271F;
      color: #F4EBDB;
      border-radius: 100px;
      min-height: 44px;
      margin-top: 8px;
      font-size: 12.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 150ms ease, transform 120ms ease;
    }
    .keep-btn:active {
      transform: scale(0.97);
    }

    .revert-btn {
      width: 100%;
      border: none;
      font-family: inherit;
      background: transparent;
      color: #2E271F;
      min-height: 38px;
      margin-top: 2px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.3px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 150ms ease;
    }
    .revert-btn:hover {
      text-decoration: underline;
    }
    .revert-btn:active {
      opacity: 0.6;
    }
  `;

  private getCurrentFeel(): SwapFeelItem {
    const len = this.feelings.length;
    if (!len) return { name: 'Darker', sub: '', tension: 0.5, rows: [] };
    const idx = ((this.feelIndex % len) + len) % len;
    return this.feelings[idx];
  }

  private getCurrentRow(): SwapFeelRow | null {
    const feel = this.getCurrentFeel();
    const rows = feel.rows;
    if (!rows || rows.length === 0) return null;
    const idx = ((this.chordIndex % rows.length) + rows.length) % rows.length;
    return rows[idx];
  }

  private emitAudition(row: SwapFeelRow, feel: SwapFeelItem) {
    this.dispatchEvent(new CustomEvent('cycler-audition', {
      detail: {
        chordName: row.name,
        roman: row.roman || '',
        notes: row.notes || (row.chord?.notes ?? []),
        sub: row.sub,
        tension: row.tension,
        feel: feel.name,
        chord: row.chord,
      },
      bubbles: true,
      composed: true,
    }));
  }

  private onPrevFeel(e: Event) {
    e.stopPropagation();
    const len = this.feelings.length;
    if (!len) return;
    this.feelIndex = (this.feelIndex - 1 + len) % len;
    this.chordIndex = 0;
    const feel = this.getCurrentFeel();
    const row = this.getCurrentRow();
    if (row) this.emitAudition(row, feel);
    this.requestUpdate();
  }

  private onNextFeel(e: Event) {
    e.stopPropagation();
    const len = this.feelings.length;
    if (!len) return;
    this.feelIndex = (this.feelIndex + 1) % len;
    this.chordIndex = 0;
    const feel = this.getCurrentFeel();
    const row = this.getCurrentRow();
    if (row) this.emitAudition(row, feel);
    this.requestUpdate();
  }

  private onCycleChord(e: Event) {
    e.stopPropagation();
    const feel = this.getCurrentFeel();
    const rows = feel.rows;
    if (!rows || rows.length === 0) return;
    this.chordIndex = (this.chordIndex + 1) % rows.length;
    const row = this.getCurrentRow();
    if (row) this.emitAudition(row, feel);
    this.requestUpdate();
  }

  private onKeep(e: Event) {
    e.stopPropagation();
    const row = this.getCurrentRow();
    const feel = this.getCurrentFeel();
    if (!row) return;
    this.dispatchEvent(new CustomEvent('cycler-keep', {
      detail: {
        chordName: row.name,
        chord: row.chord,
        feel: feel.name,
        roman: row.roman || '',
        tension: row.tension,
        sub: row.sub,
      },
      bubbles: true,
      composed: true,
    }));
  }

  private onRevert(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('cycler-revert', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const feel = this.getCurrentFeel();
    const row = this.getCurrentRow();
    const totalRows = feel.rows ? feel.rows.length : 0;
    const curChordNum = totalRows > 0 ? (this.chordIndex % totalRows + 1) : 0;
    const feelRole = roleForTension(feel.tension);

    return html`
      <div class="cycler-was">was ${this.originalChord?.name || 'Chord'}</div>

      <div class="cycler-feel-header">
        <div
          style="
            width: 14px;
            height: 14px;
            border-radius: ${Math.round(feelRole.radius * 0.3)}px;
            background: ${feelRole.color};
            flex-shrink: 0;
          "
        ></div>
        <div class="cycler-feel-name">${feel.name}</div>
      </div>

      <div class="cycler-feel-sub">${feel.sub}</div>

      <div class="cycler-nav-row">
        <button
          class="cycler-chev-btn"
          @click=${this.onPrevFeel}
          @pointerdown=${(e: Event) => e.stopPropagation()}
          aria-label="Previous feeling"
        >‹</button>

        <div class="cycler-dots-track">
          ${this.feelings.map((_, i) => html`
            <div
              class="cycler-dot"
              style="background: ${i === this.feelIndex ? '#2E271F' : 'rgba(46,39,31,0.22)'};"
            ></div>
          `)}
        </div>

        <button
          class="cycler-chev-btn"
          @click=${this.onNextFeel}
          @pointerdown=${(e: Event) => e.stopPropagation()}
          aria-label="Next feeling"
        >›</button>
      </div>

      ${row ? html`
        <button
          class="cycler-chord-btn"
          @click=${this.onCycleChord}
          @pointerdown=${(e: Event) => e.stopPropagation()}
          aria-label="Next chord for this feeling"
        >
          <div class="chord-top-row">
            <span class="chord-main-name">${row.name}</span>
            <span class="chord-count-hint">${curChordNum} of ${totalRows} ↻</span>
          </div>
          <div class="chord-meta-row">
            ${row.roman ? html`<span class="chord-roman">${row.roman}</span>` : ''}
            <span class="chord-sub-note">${row.sub}</span>
          </div>
        </button>
      ` : ''}

      <button
        class="keep-btn"
        @click=${this.onKeep}
        @pointerdown=${(e: Event) => e.stopPropagation()}
        aria-label="Keep ${row?.name || 'chord'}"
      >
        Keep
      </button>

      <button
        class="revert-btn"
        @click=${this.onRevert}
        @pointerdown=${(e: Event) => e.stopPropagation()}
        aria-label="Revert swap"
      >
        Revert
      </button>
    `;
  }
}
