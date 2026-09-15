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
}

export interface SwapFeelItem {
  name: string;
  sub: string;
  tension: number;
  rows: SwapFeelRow[];
}

// Helpers for harmonic color interpolation and WCAG contrast
function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

function lerpColor(hexA: string, hexB: string, t: number): string {
  const pa = [1, 3, 5].map(i => parseInt(hexA.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map(i => parseInt(hexB.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => lerp(v, pb[i], t).toString(16).padStart(2, '0')).join('');
}

function relLum(hex: string): number {
  const ch = [1, 3, 5]
    .map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function joinFill(hex: string): string {
  const creamLum = 0.925;
  let t = 0.3;
  let out = hex;
  for (; t <= 0.86; t += 0.03) {
    out = lerpColor(hex, '#2E271F', t);
    if ((creamLum + 0.05) / (relLum(out) + 0.05) >= 4.7) break;
  }
  return out;
}

@customElement('chord-swap-lane')
export class ChordSwapLane extends LitElement {
  @property({ type: Number }) swapIndex = 0;
  @property({ type: Object }) chord?: ChordBlock;
  @property({ type: Array }) feelings: SwapFeelItem[] = [];
  @property({ type: String }) activeFeel = 'Darker';
  @property({ type: Object }) pickedChord: ChordBlock | null = null;
  @property({ type: Number }) padCols = 4;
  @property({ type: String }) moodColor = '#9CC0EC';

  static styles = css`
    :host {
      display: contents;
      font-family: var(--cv-font, sans-serif);
    }

    .lane-shell {
      position: relative;
      grid-column: 1 / -1;
      min-width: 0;
      display: grid;
      grid-template-rows: 1fr;
      animation: cvfv-laneopen 480ms 60ms cubic-bezier(0.16, 1, 0.3, 1) both;
      margin-top: 6px;
      margin-bottom: 8px;
    }

    .lane-neck {
      position: absolute;
      z-index: 1;
      top: -22px;
      height: 36px;
      border-radius: 0 0 3px 3px;
      transform-origin: top center;
      animation: cvfv-laneneck 260ms cubic-bezier(0.16, 1, 0.3, 1) both;
      transition: left 300ms var(--cv-ease, ease), width 300ms var(--cv-ease, ease), background 200ms ease;
    }

    .lane-clip {
      min-height: 0;
      overflow: hidden;
      position: relative;
      z-index: 2;
    }

    .lane-panel {
      border-radius: 14px;
      padding: 15px 16px 16px;
      box-shadow: 0 26px 46px -30px rgba(46, 39, 31, 0.75);
      animation: cvfv-lanepanel 420ms 120ms cubic-bezier(0.16, 1, 0.3, 1) both;
      transition: background 250ms var(--cv-ease, ease);
    }

    .lane-header {
      display: flex;
      align-items: center;
      gap: 10px;
      animation: cvfv-trayitem 300ms 220ms var(--cv-ease, ease) both;
    }

    .lane-kicker {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2E271F;
      min-width: 0;
    }

    .lane-hint {
      font-size: 11px;
      font-weight: 700;
      color: #2E271F;
      opacity: 0.7;
      white-space: nowrap;
    }

    .lane-close-btn {
      border: none;
      font-family: inherit;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.12);
      color: #2E271F;
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 150ms ease, transform 120ms ease;
    }
    .lane-close-btn:hover {
      background: rgba(46, 39, 31, 0.2);
    }
    .lane-close-btn:active {
      transform: scale(0.92);
    }

    .feelings-row {
      display: flex;
      gap: 7px;
      margin-top: 11px;
      animation: cvfv-trayitem 340ms 280ms var(--cv-ease, ease) both;
    }

    .feel-tile {
      border: none;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      padding: 10px 11px 11px;
      flex: 1 1 0;
      min-width: 0;
      transition: box-shadow 200ms ease, border-radius 200ms ease, background 200ms ease, transform 140ms ease;
    }
    .feel-tile:active {
      transform: scale(0.98);
    }

    .feel-tile-name {
      display: block;
      font-size: 13px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.01em;
    }

    .feel-tile-sub {
      display: block;
      font-size: 10.5px;
      font-weight: 700;
      line-height: 1.3;
      opacity: 0.9;
      margin-top: 3px;
    }

    .chords-shell {
      position: relative;
      margin-top: 10px;
      animation: cvfv-trayitem 340ms 350ms var(--cv-ease, ease) both;
    }

    .chords-neck {
      position: absolute;
      z-index: 3;
      top: -11px;
      height: 14px;
      transition: left 300ms var(--cv-ease, ease), width 300ms var(--cv-ease, ease), background 200ms ease;
    }

    .chords-box {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      border-radius: 12px;
      padding: 10px 11px;
      transition: background 200ms ease;
    }

    .chord-pill-btn {
      border: none;
      font-family: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border-radius: 100px;
      padding: 8px 14px;
      transition: background 200ms ease, box-shadow 200ms ease, transform 120ms ease;
    }
    .chord-pill-btn:hover {
      transform: translateY(-1px);
    }
    .chord-pill-btn:active {
      transform: scale(0.96);
    }

    .chord-pill-name {
      font-size: 13px;
      font-weight: 800;
      white-space: nowrap;
    }

    .chord-pill-roman {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }

    .keep-swap-btn {
      border: none;
      font-family: inherit;
      cursor: pointer;
      border-radius: 100px;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
      min-height: 34px;
      background: #FBF6EC;
      color: #2E271F;
      box-shadow: 0 10px 20px -14px rgba(46, 39, 31, 0.6);
      transition: background 180ms ease, transform 120ms ease, box-shadow 180ms ease;
    }
    .keep-swap-btn:hover {
      background: #FFFFFF;
      transform: scale(1.02);
      box-shadow: 0 12px 24px -12px rgba(46, 39, 31, 0.8);
    }
    .keep-swap-btn:active {
      transform: scale(0.97);
    }
  `;

  private onSelectFeel(name: string) {
    this.activeFeel = name;
    this.dispatchEvent(new CustomEvent('swap-feel-change', {
      detail: { feel: name },
      bubbles: true,
      composed: true,
    }));
  }

  private onAudition(row: SwapFeelRow, feel: SwapFeelItem) {
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

  private onConfirm() {
    this.dispatchEvent(new CustomEvent('swap-confirm', {
      bubbles: true,
      composed: true,
    }));
  }

  private onClose() {
    this.dispatchEvent(new CustomEvent('swap-close', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const padColsNow = Math.max(1, this.padCols || 4);
    const laneCol = this.swapIndex % padColsNow;
    const laneTrack = `calc((100% - ${12 * (padColsNow - 1)}px) / ${padColsNow})`;
    const chordTension = this.chord?.tension ?? 0.3;
    const laneBody = roleForTension(chordTension).color;

    const currentFeel = this.feelings.find(f => f.name === this.activeFeel) || this.feelings[0];
    const feelIdx = Math.max(0, this.feelings.findIndex(f => f.name === currentFeel?.name));
    const feelCount = Math.max(1, this.feelings.length);
    const feelTrack = `calc((100% - ${7 * (feelCount - 1)}px) / ${feelCount})`;

    const feelTension = currentFeel?.tension ?? 0.3;
    const feelColor = joinFill(roleForTension(feelTension).color);

    const laneKicker = `Bar ${this.swapIndex + 1} · ${this.chord?.name || 'Chord'} could feel…`;
    const laneHint = this.pickedChord
      ? `hearing swap: ${this.pickedChord.name}`
      : 'tap to audition in the loop';

    return html`
      <div class="lane-shell" data-swap-lane="1">
        <!-- Neck connecting the active chord pad down to the lane -->
        <div
          class="lane-neck"
          style="
            left: calc(${laneTrack} * ${laneCol} + ${12 * laneCol}px);
            width: ${laneTrack};
            background: ${laneBody};
          "
        ></div>

        <div class="lane-clip">
          <div class="lane-panel" style="background: ${laneBody};">
            <!-- Header bar -->
            <div class="lane-header">
              <div class="lane-kicker">${laneKicker}</div>
              <div style="flex: 1; min-width: 0;"></div>
              <div class="lane-hint">${laneHint}</div>
              <button
                class="lane-close-btn"
                @click=${this.onClose}
                aria-label="Close swap lane"
              >×</button>
            </div>

            <!-- Feelings row -->
            <div class="feelings-row">
              ${this.feelings.map((f) => {
                const on = f.name === currentFeel?.name;
                const rc = roleForTension(f.tension);
                const tileBg = on ? joinFill(rc.color) : lerpColor(rc.color, '#FBF6EC', 0.5);
                return html`
                  <button
                    class="feel-tile"
                    data-feel-tile="1"
                    data-sel="${on ? '1' : '0'}"
                    style="
                      background: ${tileBg};
                      border-radius: ${on ? '12px 12px 0 0' : '12px'};
                      box-shadow: ${on ? 'none' : 'inset 0 0 0 1.5px rgba(46,39,31,0.14)'};
                    "
                    @click=${() => this.onSelectFeel(f.name)}
                  >
                    <span class="feel-tile-name" style="color: ${on ? '#FBF6EC' : '#2E271F'};">${f.name}</span>
                    <span class="feel-tile-sub" style="color: ${on ? '#FBF6EC' : '#2E271F'};">${f.sub}</span>
                  </button>
                `;
              })}
            </div>

            <!-- Chords row extruded from active feeling -->
            <div class="chords-shell" data-lane-join="${feelIdx}">
              <div
                class="chords-neck"
                style="
                  left: calc(${feelTrack} * ${feelIdx} + ${7 * feelIdx}px);
                  width: ${feelTrack};
                  background: ${feelColor};
                "
              ></div>

              <div class="chords-box" style="background: ${feelColor};">
                ${(currentFeel?.rows || []).map((row) => {
                  const on = this.pickedChord?.name === row.name;
                  const rowTension = typeof row.tension === 'number' ? row.tension : feelTension;
                  const rowRole = roleForTension(rowTension);

                  return html`
                    <button
                      class="chord-pill-btn"
                      style="
                        background: ${on ? '#2E271F' : 'rgba(251, 246, 236, 0.88)'};
                      "
                      @click=${() => this.onAudition(row, currentFeel)}
                      aria-label="Audition ${row.name}"
                    >
                      <span
                        style="
                          width: 9px;
                          height: 9px;
                          border-radius: ${Math.round(rowRole.radius * 0.25)}px;
                          background: ${rowRole.color};
                          flex-shrink: 0;
                        "
                      ></span>
                      <span
                        class="chord-pill-name"
                        style="color: ${on ? '#FBF6EC' : '#2E271F'};"
                      >${row.name}</span>
                      ${row.roman ? html`
                        <span
                          class="chord-pill-roman"
                          style="color: ${on ? 'rgba(251,246,236,0.7)' : 'var(--cv-label)'};"
                        >${row.roman}</span>
                      ` : ''}
                    </button>
                  `;
                })}

                <div style="flex: 1; min-width: 0;"></div>

                ${this.pickedChord ? html`
                  <button
                    class="keep-swap-btn"
                    @click=${this.onConfirm}
                    aria-label="Keep ${this.pickedChord.name}"
                  >
                    Keep ${this.pickedChord.name}
                  </button>
                ` : html`
                  <div style="font-size: 11px; font-weight: 700; color: #FBF6EC; opacity: 0.85; white-space: nowrap;">
                    tap to hear it in the loop
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
