import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Progression, ChordBlock, getMoodColor } from '../services/chord-engine';
import './app-header';

type PlayInstrument = 'Piano' | 'Guitar' | 'Ukulele';

const PC: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
  'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
};
const PC_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const QUAL: Record<string, number[]> = {
  '': [0, 4, 7], maj: [0, 4, 7], m: [0, 3, 7], min: [0, 3, 7],
  maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], '7': [0, 4, 7, 10],
  '6': [0, 4, 7, 9], m6: [0, 3, 7, 9], dim: [0, 3, 6], m7b5: [0, 3, 6, 10],
  sus4: [0, 5, 7], sus2: [0, 2, 7], '9': [0, 4, 7, 10], maj9: [0, 4, 7, 11],
  m9: [0, 3, 7, 10], add9: [0, 4, 7],
};

const DEG: Record<number, string> = {
  0: '1', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '4', 6: '♭5', 7: '5', 8: '♭6', 9: '6', 10: '♭7', 11: '7',
};

const QFALL: Record<string, string> = {
  '9': '7', maj9: 'maj7', m9: 'm7', add9: 'maj', sus2: 'sus4', min: 'm', '': 'maj',
};

const SHAPES: Record<number, Record<string, (number | null)[]>> = {
  6: {
    maj: [0, 2, 2, 1, 0, 0],
    m: [0, 2, 2, 0, 0, 0],
    '7': [0, 2, 0, 1, 0, 0],
    maj7: [0, 2, 1, 1, 0, 0],
    m7: [0, 2, 0, 0, 0, 0],
    '6': [0, 2, 2, 1, 2, 0],
    m6: [0, 2, 2, 0, 2, 0],
    sus4: [0, 2, 2, 2, 0, 0],
  },
  5: {
    maj: [null, 0, 2, 2, 2, 0],
    m: [null, 0, 2, 2, 1, 0],
    '7': [null, 0, 2, 0, 2, 0],
    maj7: [null, 0, 2, 1, 2, 0],
    m7: [null, 0, 2, 0, 1, 0],
    '6': [null, 0, 2, 2, 2, 2],
    m6: [null, 0, 2, 2, 1, 2],
    sus4: [null, 0, 2, 2, 3, 0],
    dim: [null, 0, 1, 2, 1, null],
    m7b5: [null, 0, 1, 0, 1, null],
  },
};

const GUITAR_OPEN = [4, 9, 2, 7, 11, 4]; // E2, A2, D3, G3, B3, E4
const UKE_OPEN = [7, 0, 4, 9];          // G4, C4, E4, A4

@customElement('play-along-screen')
export class PlayAlongScreen extends LitElement {
  @property({ type: Object }) progression!: Progression;
  @property({ type: Array }) order: number[] = [0, 1, 2, 3];
  @property({ type: Boolean }) isAuthenticated = false;
  @property({ type: String }) userEmail: string | null = null;
  @property({ type: Number }) savedCount = 0;

  @state() private playInstrument: PlayInstrument = 'Piano';
  @state() private showDegrees = false;
  @state() private activeChordIndex: number | null = null;

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--cv-cream, #FBF3E6);
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      color: var(--cv-ink, #2E271F);
      box-sizing: border-box;
    }

    .container {
      max-width: 1060px;
      margin: 0 auto;
      padding: 10px 48px 90px;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      .container {
        padding: 10px 20px 60px;
      }
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2, #F1E4CC);
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-label, #8A6B3F);
      text-decoration: none;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: background 150ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .back-btn:hover {
      background: #E8DCC0;
      transform: translateX(-2px);
    }

    .page-header {
      margin-top: 22px;
    }
    .page-title {
      font-size: 38px;
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -0.02em;
      color: var(--cv-ink, #2E271F);
      margin: 0;
    }
    @media (max-width: 600px) {
      .page-title {
        font-size: 28px;
      }
    }
    .page-subtitle {
      font-size: 15.5px;
      line-height: 1.7;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 10px;
      max-width: 540px;
    }

    .controls-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-top: 30px;
      flex-wrap: wrap;
    }

    .instrument-tabs {
      display: flex;
      gap: 4px;
      background: var(--cv-surface-2, #F1E4CC);
      border-radius: 100px;
      padding: 4px;
    }
    .tab-btn {
      border: none;
      font-family: inherit;
      min-height: 40px;
      padding: 0 18px;
      border-radius: 100px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      background: transparent;
      color: #6B5F50;
      transition: background 200ms ease, color 200ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .tab-btn.active {
      background: var(--active-mood-color, #F6D98B);
      color: #2E271F;
    }
    .tab-btn:hover:not(.active) {
      color: #2E271F;
    }

    .toggle-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      user-select: none;
    }
    .toggle-track {
      width: 42px;
      height: 24px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      position: relative;
      flex-shrink: 0;
      transition: background 220ms ease;
    }
    .toggle-track.active {
      background: var(--active-mood-color, #F6D98B);
    }
    .toggle-knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #FBF3E6;
      box-shadow: 0 1px 3px rgba(46, 39, 31, 0.3);
      transition: left 220ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .toggle-track.active .toggle-knob {
      left: 21px;
    }
    .toggle-label {
      font-size: 13.5px;
      font-weight: 700;
      color: #6B5F50;
    }

    .hint-text {
      font-size: 13px;
      line-height: 1.6;
      color: #8A7C6B;
      margin-top: 16px;
      max-width: 580px;
    }

    .cards-grid {
      display: grid;
      gap: 16px;
      margin-top: 24px;
    }
    .cards-grid.piano-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .cards-grid.fret-grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .chord-card {
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      cursor: pointer;
      box-shadow: 0 10px 24px -14px rgba(46, 39, 31, 0.2);
      border: 1.5px solid rgba(46, 39, 31, 0.06);
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms ease, border-color 200ms ease;
    }
    .chord-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 32px -16px rgba(46, 39, 31, 0.3);
      border-color: rgba(46, 39, 31, 0.16);
    }
    .chord-card:active,
    .chord-card.lit {
      transform: scale(0.98);
      box-shadow: 0 0 0 4px var(--active-mood-color, #F6D98B);
    }

    .card-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 9px;
    }
    .chord-name {
      font-size: 20px;
      font-weight: 800;
      color: #2E271F;
    }
    .chord-roman {
      font-size: 12.5px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
      letter-spacing: 0.5px;
    }
    .pos-label {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--cv-label, #8A6B3F);
    }

    .notes-line {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      margin-top: 2px;
    }
  `;

  private parseChord(name: string) {
    const m = /^([A-G][b#]?)(.*)$/.exec(name || 'C');
    const root = m ? m[1] : 'C';
    const q = m ? m[2] : '';
    const intervals = QUAL[q] || QUAL[QFALL[q] || 'maj'] || [0, 4, 7];
    return {
      root,
      rootPc: PC[root] === undefined ? 0 : PC[root],
      q,
      intervals,
    };
  }

  private shapeQual(q: string) {
    const key = q === '' ? 'maj' : q;
    if (SHAPES[5][key] || SHAPES[6][key]) return key;
    const f = QFALL[key];
    if (f && (SHAPES[5][f] || SHAPES[6][f])) return f;
    return 'maj';
  }

  private guitarVoicing(name: string): (number | null)[] | null {
    const c = this.parseChord(name);
    const sq = this.shapeQual(c.q);
    const cands: { rootFret: number; frets: (number | null)[] }[] = [];
    ([[6, 4], [5, 9]] as [number, number][]).forEach(([anchor, openPc]) => {
      const shape = SHAPES[anchor][sq];
      if (!shape) return;
      const rootFret = ((c.rootPc - openPc) % 12 + 12) % 12;
      cands.push({ rootFret, frets: shape.map(o => o === null ? null : o + rootFret) });
    });
    if (!cands.length) return null;
    cands.sort((a, b) => a.rootFret - b.rootFret);
    return cands[0].frets;
  }

  private ukeVoicing(name: string): (number | null)[] | null {
    const c = this.parseChord(name);
    const open = UKE_OPEN;
    const want = c.intervals.map(i => (c.rootPc + i) % 12);
    const attempt = (targets: number[]): { frets: number[]; score: number } | null => {
      const set = new Set(targets);
      let best: { frets: number[]; score: number } | null = null;
      const frets: number[] = [];
      const rec = (i: number) => {
        if (i === 4) {
          const pcs = frets.map((f, k) => (open[k] + f) % 12);
          for (const w of set) if (pcs.indexOf(w) < 0) return;
          for (const p of pcs) if (!set.has(p)) return;
          const nz = frets.filter(f => f > 0);
          const span = nz.length ? Math.max(...nz) - Math.min(...nz) : 0;
          if (span > 3) return;
          const score = span * 12 + frets.reduce((a, b) => a + b, 0);
          if (!best || score < best.score) best = { frets: frets.slice(), score };
          return;
        }
        for (let f = 0; f <= 5; f++) {
          frets.push(f);
          rec(i + 1);
          frets.pop();
        }
      };
      rec(0);
      return best;
    };
    const full = attempt(want);
    if (full) return full.frets;
    const noFifth = attempt(c.intervals.filter(i => i !== 7).map(i => (c.rootPc + i) % 12));
    return noFifth ? noFifth.frets : null;
  }

  private degOf(pc: number, rootPc: number) {
    return DEG[((pc - rootPc) % 12 + 12) % 12] || '1';
  }

  private notesLineFor(c: ReturnType<typeof this.parseChord>) {
    return c.intervals.map(i => {
      const nm = PC_NAMES[(c.rootPc + i) % 12];
      return this.showDegrees ? `${nm} (${this.degOf((c.rootPc + i) % 12, c.rootPc)})` : nm;
    }).join(' · ');
  }

  private onChordClick(chIdx: number) {
    this.activeChordIndex = chIdx;
    this.dispatchEvent(new CustomEvent('chord-preview', {
      detail: chIdx,
      bubbles: true,
      composed: true,
    }));
    setTimeout(() => {
      if (this.activeChordIndex === chIdx) {
        this.activeChordIndex = null;
      }
    }, 450);
  }

  private onBackClick(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }

  private renderPianoSvg(chName: string, moodColor: string) {
    const W = 22, PH = 86, BH = 52, WHITE_ORDER = [0, 2, 4, 5, 7, 9, 11];
    const c = this.parseChord(chName);
    const whites: { x: number; w: number; h: number }[] = [];
    const blacks: { x: number; w: number; h: number }[] = [];
    const marks: { cx: number; cy: number; r: number; fill: string; label: string; lc: string }[] = [];

    for (let o = 0; o < 2; o++) {
      WHITE_ORDER.forEach((_, k) => {
        whites.push({ x: (o * 7 + k) * W, w: W - 1.5, h: PH });
      });
    }

    for (let o = 0; o < 2; o++) {
      [0, 1, 3, 4, 5].forEach(k => {
        const idx = o * 7 + k;
        blacks.push({ x: idx * W + W * 0.64, w: W * 0.58, h: BH });
      });
    }

    c.intervals.forEach(iv => {
      const semi = c.rootPc + iv;
      const oct = Math.floor(semi / 12);
      const pc = semi % 12;
      const wk = WHITE_ORDER.indexOf(pc);
      const isRoot = iv === 0;
      const fill = isRoot ? '#F2735F' : moodColor;
      const label = this.showDegrees ? (DEG[iv % 12] || '') : '';

      if (wk >= 0) {
        const idx = oct * 7 + wk;
        marks.push({
          cx: idx * W + (W - 1.5) / 2,
          cy: PH - 19,
          r: 9,
          fill,
          label,
          lc: isRoot ? '#FBF3E6' : '#2E271F',
        });
      } else {
        const idx = oct * 7 + WHITE_ORDER.indexOf(pc - 1);
        const bx = idx * W + W * 0.64;
        const bw = W * 0.58;
        marks.push({
          cx: bx + bw / 2,
          cy: BH - 14,
          r: 7.5,
          fill,
          label,
          lc: isRoot ? '#FBF3E6' : '#2E271F',
        });
      }
    });

    const pw = 14 * W;
    return html`
      <svg width="${pw}" height="${PH}" viewBox="0 0 ${pw} ${PH}" style="display:block;max-width:100%;height:auto;">
        ${whites.map(k => svg`
          <rect x="${k.x}" y="0" width="${k.w}" height="${k.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
        `)}
        ${blacks.map(b => svg`
          <rect x="${b.x}" y="0" width="${b.w}" height="${b.h}" rx="2" fill="#3A3128"></rect>
        `)}
        ${marks.map(mk => svg`
          <circle cx="${mk.cx}" cy="${mk.cy}" r="${mk.r}" fill="${mk.fill}"></circle>
          ${mk.label ? svg`
            <text x="${mk.cx}" y="${mk.cy}" dy="3.4" font-size="9" font-weight="800" text-anchor="middle" fill="${mk.lc}" font-family="'Plus Jakarta Sans',sans-serif">${mk.label}</text>
          ` : ''}
        `)}
      </svg>
    `;
  }

  private renderFretSvg(chName: string, isUke: boolean) {
    const SP = 18, FR = 24, ROWS = 4, TOP = 16;
    const c = this.parseChord(chName);
    const openPcs = isUke ? UKE_OPEN : GUITAR_OPEN;
    const frets = isUke
      ? (this.ukeVoicing(chName) || [null, null, null, null])
      : (this.guitarVoicing(chName) || [null, null, null, null, null, null]);

    const n = openPcs.length;
    const nz = frets.filter((f): f is number => f !== null && f > 0);
    const base = (nz.length && Math.max(...nz) > 4) ? Math.min(...nz) - 1 : 0;

    const strings: { x: number }[] = [];
    const fretLines: { y: number; sw: number }[] = [];
    const dots: { cx: number; cy: number; fill: string; label: string }[] = [];
    const opens: { x: number }[] = [];
    const mutes: { x: number }[] = [];

    for (let s = 0; s < n; s++) strings.push({ x: s * SP });
    for (let r = 0; r <= ROWS; r++) {
      fretLines.push({ y: TOP + r * FR, sw: (r === 0 && base === 0) ? 3 : 1.2 });
    }

    frets.forEach((f, s) => {
      const x = s * SP;
      if (f === null) {
        mutes.push({ x });
        return;
      }
      if (f === 0) {
        opens.push({ x });
        return;
      }
      const iv = ((openPcs[s] + f - c.rootPc) % 12 + 12) % 12;
      dots.push({
        cx: x,
        cy: TOP + (f - base - 0.5) * FR,
        fill: iv === 0 ? '#F2735F' : '#2E271F',
        label: this.showDegrees ? this.degOf((openPcs[s] + f) % 12, c.rootPc) : '',
      });
    });

    const sw = (n - 1) * SP + 26;
    const sh = TOP + ROWS * FR + 12;
    const w = (n - 1) * SP;

    return {
      posLabel: base > 0 ? `${base + 1}fr` : '',
      svg: html`
        <svg width="${sw}" height="${sh}" viewBox="-13 -2 ${sw} ${sh}" style="display:block;">
          ${fretLines.map(fl => svg`
            <rect x="0" y="${fl.y}" width="${w}" height="${fl.sw}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${strings.map(st => svg`
            <rect x="${st.x}" y="16" width="1.2" height="${ROWS * FR}" fill="rgba(46,39,31,0.4)"></rect>
          `)}
          ${opens.map(op => svg`
            <circle cx="${op.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
          `)}
          ${mutes.map(mu => svg`
            <text x="${mu.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
          `)}
          ${dots.map(d => svg`
            <circle cx="${d.cx}" cy="${d.cy}" r="7.5" fill="${d.fill}"></circle>
            ${d.label ? svg`
              <text x="${d.cx}" y="${d.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${d.label}</text>
            ` : ''}
          `)}
        </svg>
      `,
    };
  }

  render() {
    if (!this.progression) return html``;

    const moodColor = getMoodColor(this.progression.mood);
    this.style.setProperty('--active-mood-color', moodColor);

    const chordsList = this.order.map(i => this.progression.chords[i] || this.progression.chords[0]);

    const isPiano = this.playInstrument === 'Piano';
    const hint = isPiano
      ? 'One voicing per chord, root position — the red dot is the root, play left to right.'
      : 'Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.';

    return html`
      <app-header
        .isAuthenticated=${this.isAuthenticated}
        .userEmail=${this.userEmail}
      ></app-header>

      <div class="container">
        <button class="back-btn" @click=${this.onBackClick}>
          ← Back to progression
        </button>

        <div class="page-header">
          <h1 class="page-title">Play it yourself.</h1>
          <div class="page-subtitle">The same loop, laid out for your hands. Tap any chord to hear it.</div>
        </div>

        <div class="controls-bar">
          <div class="instrument-tabs">
            <button
              class="tab-btn ${this.playInstrument === 'Piano' ? 'active' : ''}"
              @click=${() => { this.playInstrument = 'Piano'; }}
            >
              Piano
            </button>
            <button
              class="tab-btn ${this.playInstrument === 'Guitar' ? 'active' : ''}"
              @click=${() => { this.playInstrument = 'Guitar'; }}
            >
              Guitar
            </button>
            <button
              class="tab-btn ${this.playInstrument === 'Ukulele' ? 'active' : ''}"
              @click=${() => { this.playInstrument = 'Ukulele'; }}
            >
              Ukulele
            </button>
          </div>

          <div class="toggle-wrap" @click=${() => { this.showDegrees = !this.showDegrees; }}>
            <div class="toggle-track ${this.showDegrees ? 'active' : ''}">
              <div class="toggle-knob"></div>
            </div>
            <div class="toggle-label">Scale degrees</div>
          </div>
        </div>

        <div class="hint-text">${hint}</div>

        ${isPiano ? html`
          <div class="cards-grid piano-grid">
            ${chordsList.map((ch, idx) => {
              const c = this.parseChord(ch.name);
              const isLit = this.activeChordIndex === idx;
              return html`
                <div
                  class="chord-card ${isLit ? 'lit' : ''}"
                  @click=${() => this.onChordClick(idx)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div class="chord-name">${ch.name}</div>
                    <div class="chord-roman">${ch.roman || ''}</div>
                  </div>
                  ${this.renderPianoSvg(ch.name, moodColor)}
                  <div class="notes-line">${this.notesLineFor(c)}</div>
                </div>
              `;
            })}
          </div>
        ` : html`
          <div class="cards-grid fret-grid">
            ${chordsList.map((ch, idx) => {
              const c = this.parseChord(ch.name);
              const fretRes = this.renderFretSvg(ch.name, this.playInstrument === 'Ukulele');
              const isLit = this.activeChordIndex === idx;
              return html`
                <div
                  class="chord-card ${isLit ? 'lit' : ''}"
                  @click=${() => this.onChordClick(idx)}
                  role="button"
                  tabindex="0"
                >
                  <div class="card-head">
                    <div style="display:flex;align-items:baseline;gap:8px;">
                      <div class="chord-name">${ch.name}</div>
                      <div class="chord-roman">${ch.roman || ''}</div>
                    </div>
                    ${fretRes.posLabel ? html`<div class="pos-label">${fretRes.posLabel}</div>` : ''}
                  </div>
                  ${fretRes.svg}
                  <div class="notes-line">${this.notesLineFor(c)}</div>
                </div>
              `;
            })}
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'play-along-screen': PlayAlongScreen;
  }
}
