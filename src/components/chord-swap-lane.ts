import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChordBlock, roleForTension } from '../services/chord-engine';

export interface SwapFeelRow {
  name: string;
  roman?: string;
  notes?: string[];
  sub: string;
  tension: number;
  chord?: ChordBlock;
  bandTag?: string;
  bandColor?: string;
}

export interface SwapFeelItem {
  name: string;
  sub: string;
  tension: number;
  rows: SwapFeelRow[];
}

const SHADES = [52, 76, 100];

@customElement('chord-swap-lane')
export class ChordSwapLane extends LitElement {
  @property({ type: Number }) swapIndex = 0;
  @property({ type: Object }) chord?: ChordBlock;
  @property({ type: Object }) baseChord?: ChordBlock;
  @property({ type: Array }) feelings: SwapFeelItem[] = [];
  @property({ type: String }) activeFeel = 'Darker';
  @property({ type: Object }) pickedChord: ChordBlock | null = null;
  @property({ type: Number }) padCols = 4;
  @property({ type: String }) moodColor = '#9CC0EC';
  @property({ type: Object }) band?: { name: string; color: string; tagline?: string; plain?: string; theory?: string } | null = null;

  static styles = css`
    :host {
      display: block;
      grid-column: 1 / -1;
      width: 100%;
      min-width: 0;
      font-family: var(--cv-font, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .tray-wrapper {
      width: 100%;
      min-width: 0;
      position: relative;
      padding-top: 7px;
      margin-top: -4px;
      margin-bottom: 8px;
      animation: cvfv-tray 260ms cubic-bezier(0.23, 1, 0.32, 1) both;
    }

    @keyframes cvfv-tray {
      0% { opacity: 0; transform: translateY(-8px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .tray-pointer {
      position: absolute;
      top: 0;
      width: 16px;
      height: 16px;
      background: var(--cv-cream, #FBF3E6);
      transform: rotate(45deg);
      border-radius: 3px;
      z-index: 1;
      transition: left 240ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    .tray-card {
      position: relative;
      z-index: 2;
      background: var(--cv-cream, #FBF3E6);
      border-radius: 18px;
      padding: 14px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 16px 36px -12px rgba(46, 39, 31, 0.35);
      border: 1px solid rgba(46, 39, 31, 0.08);
    }

    .tray-header {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .tray-swatch {
      width: 12px;
      height: 12px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .tray-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
    }

    .tray-sub {
      font-size: 12px;
      font-weight: 600;
      color: var(--cv-ink-muted, #6B5F50);
    }

    .tray-spacer {
      flex: 1;
      min-width: 0;
    }

    .tray-revert-btn {
      border: none;
      font-family: inherit;
      min-height: 32px;
      padding: 0 12px;
      border-radius: 100px;
      color: #2E271F;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: transform 120ms ease, opacity 120ms ease;
    }

    .tray-revert-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .tray-close-btn {
      border: none;
      font-family: inherit;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: transparent;
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 18px;
      font-weight: 800;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease;
    }

    .tray-close-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
      color: #2E271F;
    }

    .tray-groups-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 12px;
    }

    .tray-group-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    .tray-group-header {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .tray-group-name {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .tray-group-sub {
      font-size: 11px;
      font-weight: 600;
      color: var(--cv-ink-muted, #6B5F50);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tray-chips-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .tray-chip {
      flex: 1 1 0;
      min-width: 56px;
      border: none;
      font-family: inherit;
      min-height: 38px;
      padding: 0 8px;
      border-radius: 12px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 120ms ease, box-shadow 120ms ease, background 150ms ease;
    }

    .tray-chip:hover {
      box-shadow: inset 0 0 0 2px #2E271F;
      transform: translateY(-1px);
    }

    .tray-chip:active {
      transform: scale(0.96);
    }

    .tray-chip.selected {
      background: #2E271F !important;
      color: #FBF3E6 !important;
    }

    /* Phones: one-line header (swatch, title, revert, close) and 44px touch chips */
    @media (max-width: 899px) {
      .tray-card {
        padding: 10px 12px 12px;
        border-radius: 16px;
        gap: 9px;
      }
      .tray-header {
        flex-wrap: nowrap;
        gap: 7px;
      }
      .tray-title {
        flex: 1;
        min-width: 0;
        font-size: 12.5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tray-sub,
      .tray-spacer {
        display: none;
      }
      .tray-revert-btn {
        min-height: 36px;
        flex: none;
      }
      .tray-close-btn {
        width: 36px;
        height: 36px;
        flex: none;
      }
      .tray-groups-grid {
        grid-template-columns: 1fr;
        gap: 9px;
      }
      .tray-chips-row {
        flex-wrap: nowrap;
        gap: 5px;
      }
      .tray-chip {
        min-width: 0;
        min-height: 44px;
        padding: 0 4px;
        border-radius: 12px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `;

  private onPick(row: SwapFeelRow, feel: SwapFeelItem) {
    this.dispatchEvent(new CustomEvent('swap-audition', {
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

  private onRevert() {
    if (this.baseChord) {
      this.dispatchEvent(new CustomEvent('swap-audition', {
        detail: {
          chordName: this.baseChord.name,
          roman: this.baseChord.roman || '',
          notes: this.baseChord.notes || [],
          sub: this.baseChord.functionLabel || '',
          tension: this.baseChord.tension || 0.3,
          feel: 'Original',
          chord: this.baseChord,
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private onClose() {
    this.dispatchEvent(new CustomEvent('swap-close', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const padColsNow = Math.max(1, this.padCols || 4);
    const colIndex = this.swapIndex % padColsNow;
    const colWidthPct = 100 / padColsNow;
    const pointerLeft = `calc(${colIndex * colWidthPct}% + ${colWidthPct / 2}% - 8px)`;

    const cur = this.chord;
    const curName = cur?.name || '';
    const curTension = cur?.tension ?? 0.3;
    const curColor = roleForTension(curTension).color;

    const baseName = this.baseChord?.name || curName;
    const baseColor = roleForTension(this.baseChord?.tension ?? curTension).color;
    const isSwapped = Boolean(this.baseChord && this.baseChord.name !== curName);

    const title = isSwapped
      ? `Bar ${this.swapIndex + 1} is now ${curName}`
      : `Bar ${this.swapIndex + 1} · swap ${curName} for…`;
    const sub = isSwapped
      ? `Was ${baseName}.`
      : 'Tap one to hear it in place. Undo puts it back.';

    return html`
      <div class="tray-wrapper" data-swap-lane="1">
        <div class="tray-pointer" style="left: ${pointerLeft};"></div>
        <div class="tray-card">
          <!-- Tray Header Row -->
          <div class="tray-header">
            <span class="tray-swatch" style="background: ${curColor};"></span>
            <span class="tray-title">${title}</span>
            <span class="tray-sub">${sub}</span>
            <div class="tray-spacer"></div>

            ${isSwapped ? html`
              <button
                class="tray-revert-btn"
                style="background: ${baseColor};"
                @click=${this.onRevert}
                aria-label="Revert to ${baseName}"
              >
                Back to ${baseName}
              </button>
            ` : ''}

            <button
              class="tray-close-btn"
              @click=${this.onClose}
              aria-label="Close swaps drawer"
            >
              ×
            </button>
          </div>

          <!-- Groups Grid (Feel Families) -->
          <div class="tray-groups-grid">
            ${this.feelings.map(feel => {
              const famColor = roleForTension(feel.tension).color;
              const rows = (feel.rows || []).slice(0, 3);

              return html`
                <div class="tray-group-col">
                  <div class="tray-group-header">
                    <span class="tray-group-name">${feel.name}</span>
                    <span class="tray-group-sub">${feel.sub}</span>
                  </div>

                  <div class="tray-chips-row">
                    ${rows.map((row, i) => {
                      const isSelected = row.name === curName;
                      const shade = SHADES[i] || 100;
                      const chipBg = `color-mix(in srgb, ${famColor} ${shade}%, #FBF3E6)`;

                      return html`
                        <button
                          class="tray-chip ${isSelected ? 'selected' : ''}"
                          style="${isSelected
                            ? `box-shadow: 0 0 0 2px ${famColor};`
                            : `background: ${chipBg}; color: #2E271F;`}"
                          @click=${() => this.onPick(row, feel)}
                          aria-label="Swap to ${row.name}"
                        >
                          ${isSelected ? `✓ ${row.name}` : row.name}
                        </button>
                      `;
                    })}
                  </div>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chord-swap-lane': ChordSwapLane;
  }
}
