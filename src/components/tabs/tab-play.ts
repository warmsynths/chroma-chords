import { LitElement, html, css, svg, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ChordBlock, Progression, parseChordSymbol } from '../../services/chord-engine';
import { playbackEngine } from '../../services/playback-engine';

export type PlayInstrument = 'Piano' | 'Guitar' | 'Ukulele';

const PC_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const PC: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
  'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
};
const DEG: Record<number, string> = {
  0: '1', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '4', 6: '♭5',
  7: '5', 8: '♭6', 9: '6', 10: '♭7', 11: '7',
};
const QUAL: Record<string, number[]> = {
  '': [0, 4, 7], maj: [0, 4, 7], m: [0, 3, 7], min: [0, 3, 7],
  maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], '7': [0, 4, 7, 10],
  '6': [0, 4, 7, 9], m6: [0, 3, 7, 9], dim: [0, 3, 6], m7b5: [0, 3, 6, 10],
  sus4: [0, 5, 7], sus2: [0, 2, 7], '9': [0, 4, 7, 10], maj9: [0, 4, 7, 11],
  m9: [0, 3, 7, 10], add9: [0, 4, 7],
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

function shapeQual(q: string): string {
  const key = q === '' ? 'maj' : q;
  if (SHAPES[5][key] || SHAPES[6][key]) return key;
  const f = QFALL[key];
  if (f && (SHAPES[5][f] || SHAPES[6][f])) return f;
  return 'maj';
}

export function guitarVoicing(c: { root: string; rootPc: number; q: string; intervals: number[] }): (number | null)[] | null {
  const sq = shapeQual(c.q);
  const cands: { rootFret: number; frets: (number | null)[] }[] = [];
  ([[6, 4], [5, 9]] as [number, number][]).forEach(([anchor, openPc]) => {
    const shape = SHAPES[anchor][sq];
    if (!shape) return;
    const rootFret = ((c.rootPc - openPc) % 12 + 12) % 12;
    cands.push({ rootFret, frets: shape.map(o => (o === null ? null : o + rootFret)) });
  });
  if (!cands.length) return null;
  cands.sort((a, b) => a.rootFret - b.rootFret);
  return cands[0].frets;
}

export function ukeVoicing(c: { root: string; rootPc: number; q: string; intervals: number[] }): (number | null)[] | null {
  const open = [7, 0, 4, 9];
  const want = c.intervals.map(i => (c.rootPc + i) % 12);
  const attempt = (targets: number[]): { frets: number[]; score: number } | null => {
    const targetSet = new Set(targets);
    let best: { frets: number[]; score: number } | null = null;
    const frets: number[] = [];
    const rec = (i: number) => {
      if (i === 4) {
        const pcs = frets.map((f, k) => (open[k] + f) % 12);
        for (const w of targetSet) if (pcs.indexOf(w) < 0) return;
        for (const p of pcs) if (!targetSet.has(p)) return;
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

@customElement('tab-play')
export class TabPlay extends LitElement {
  @property({ type: Object }) progression: Progression = {
    genre: 'Pop',
    mood: 'Dreamy',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [],
  };
  @property({ type: Array }) order: number[] = [];
  @property({ type: Number }) activeIndex: number = 0;
  @property({ type: Boolean }) playing: boolean = false;
  @property({ type: Boolean }) showTheory: boolean = true;
  @property({ type: String }) playInstrument: PlayInstrument = 'Piano';
  @property({ type: Boolean }) showDegrees: boolean = false;
  @property({ type: String }) mood: string = 'Dreamy';

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #2e271f;
    }

    * {
      box-sizing: border-box;
    }

    .play-panel {
      position: relative;
      border-radius: 26px;
      padding: 16px 20px 24px;
      background: var(--panel-tint-bg, rgba(201, 169, 224, 0.18));
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 24px rgba(46, 39, 31, 0.04);
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 520px;
    }

    @media (max-width: 640px) {
      .play-panel {
        border-radius: 22px;
        padding: 14px 16px 20px;
      }
    }

    /* Panel Header */
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }

    .header-left {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .header-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8a6b3f;
    }

    .header-sub {
      font-size: 12px;
      font-weight: 600;
      color: #6b5f50;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    /* Tier-2 Segmented Control */
    .tier2-control {
      display: flex;
      gap: 2px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 3px;
    }

    .tier2-chip {
      min-height: 32px;
      padding: 0 14px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      background: transparent;
      color: #6b5f50;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
    }

    .tier2-chip.active {
      background: #fbf3e6;
      color: #2e271f;
      box-shadow: inset 0 0 0 1px rgba(46, 39, 31, 0.1), 0 1px 2px rgba(46, 39, 31, 0.12);
    }

    /* Scale degrees switch */
    .degrees-switch {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      font-size: 12px;
      font-weight: 700;
      color: #6b5f50;
      background: rgba(46, 39, 31, 0.04);
      padding: 4px 10px;
      border-radius: 100px;
      border: 1px solid rgba(46, 39, 31, 0.08);
      transition: background 0.15s ease;
    }

    .degrees-switch:hover {
      background: rgba(46, 39, 31, 0.08);
    }

    .toggle-track {
      width: 28px;
      height: 16px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.18);
      padding: 2px;
      display: flex;
      align-items: center;
      transition: background 0.15s ease;
    }

    .toggle-track.active {
      background: #2e271f;
    }

    .toggle-knob {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      transform: translateX(0);
      transition: transform 0.15s ease;
    }

    .toggle-track.active .toggle-knob {
      transform: translateX(12px);
    }

    /* Subtitle Banner */
    .hint-banner {
      font-size: 12.5px;
      line-height: 1.5;
      color: #6b5f50;
      background: rgba(251, 243, 230, 0.6);
      border-radius: 12px;
      padding: 8px 14px;
      border: 1px solid rgba(46, 39, 31, 0.06);
    }

    /* Grid Layouts */
    .piano-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 16px;
    }

    .fret-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 16px;
    }

    /* Play Card */
    .play-card {
      border-radius: 20px;
      padding: 16px;
      background: #fbf3e6;
      border: 1.5px solid rgba(46, 39, 31, 0.08);
      display: flex;
      flex-direction: column;
      gap: 12px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(46, 39, 31, 0.04);
      transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
      user-select: none;
    }

    .play-card:hover {
      border-color: rgba(46, 39, 31, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(46, 39, 31, 0.08);
    }

    .play-card.active-chord {
      border-color: #2e271f;
      box-shadow: 0 0 0 2px #2e271f, 0 6px 18px rgba(46, 39, 31, 0.12);
    }

    .card-top-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }

    .chord-name-group {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .chord-title {
      font-size: 19px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2e271f;
    }

    .chord-rn {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: #8a6b3f;
    }

    .pos-badge {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: #8a6b3f;
      background: rgba(138, 107, 63, 0.12);
      padding: 2px 7px;
      border-radius: 6px;
    }

    /* Notes Line */
    .notes-line {
      font-size: 12px;
      font-weight: 700;
      color: #6b5f50;
      letter-spacing: 0.2px;
    }

    /* SVG Containers */
    .svg-wrap {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 4px 0;
    }

    svg {
      display: block;
      max-width: 100%;
      height: auto;
    }
  `;

  private setInstrument(inst: PlayInstrument) {
    this.playInstrument = inst;
    this.dispatchEvent(
      new CustomEvent('change-instrument', {
        detail: { instrument: inst },
        bubbles: true,
        composed: true,
      })
    );
  }

  private toggleDegrees() {
    this.showDegrees = !this.showDegrees;
  }

  private onCardClick(chord: ChordBlock, index: number) {
    // Audition sound
    try {
      playbackEngine.playChordAtIndex(index);
    } catch {
      // Audio safety
    }
    this.dispatchEvent(
      new CustomEvent('play-chord', {
        detail: { chord, index },
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderPianoCard(ch: ChordBlock, i: number, isActive: boolean) {
    const c = parseChordSymbol(ch.name);
    const rootPc = PC[c.root] ?? 0;
    const intervals = QUAL[c.quality] || QUAL[QFALL[c.quality] || 'maj'] || [0, 4, 7];
    const W = 20, PH = 84, BH = 50, WHITE_ORDER = [0, 2, 4, 5, 7, 9, 11];
    const whites: { x: number; w: number; h: number }[] = [];
    const blacks: { x: number; w: number; h: number }[] = [];
    const marks: { cx: number; cy: number; r: number; fill: string; isRoot: boolean; label: string; lc: string }[] = [];

    // 2-Octave Keyboard
    for (let o = 0; o < 2; o++) {
      WHITE_ORDER.forEach((_pc, k) => {
        whites.push({ x: (o * 7 + k) * W, w: W - 1.5, h: PH });
      });
    }
    for (let o = 0; o < 2; o++) {
      [0, 1, 3, 4, 5].forEach(k => {
        const idx = o * 7 + k;
        blacks.push({ x: idx * W + W * 0.64, w: W * 0.58, h: BH });
      });
    }

    intervals.forEach(iv => {
      const semi = rootPc + iv;
      const oct = Math.floor(semi / 12);
      const pc = semi % 12;
      const wk = WHITE_ORDER.indexOf(pc);
      const isRoot = iv === 0;
      const onBlack = wk < 0;
      const fill = isRoot ? '#F2735F' : (onBlack ? '#FBF3E6' : '#2E271F');
      const lc = isRoot ? '#FBF3E6' : (onBlack ? '#2E271F' : '#FBF3E6');
      const label = this.showDegrees ? DEG[iv % 12] : '';
      if (wk >= 0) {
        const idx = oct * 7 + wk;
        marks.push({ cx: idx * W + (W - 1.5) / 2, cy: PH - 18, r: 8.5, fill, isRoot, label, lc });
      } else {
        const idx = oct * 7 + WHITE_ORDER.indexOf(pc - 1);
        const bx = idx * W + W * 0.64;
        const bw = W * 0.58;
        marks.push({ cx: bx + bw / 2, cy: BH - 14, r: 7, fill, isRoot, label, lc });
      }
    });

    const pw = 14 * W;
    const notesLine = intervals
      .map(iv => {
        const nm = PC_NAMES[(rootPc + iv) % 12];
        return this.showDegrees ? `${nm} (${DEG[iv % 12]})` : nm;
      })
      .join(' · ');

    return html`
      <div
        class="play-card ${isActive ? 'active-chord' : ''}"
        @click=${() => this.onCardClick(ch, i)}
        role="button"
        tabindex="0"
        aria-label="Piano chord ${ch.name}"
      >
        <div class="card-top-row">
          <div class="chord-name-group">
            <span class="chord-title">${ch.name}</span>
            ${this.showTheory && ch.roman ? html`<span class="chord-rn">${ch.roman}</span>` : nothing}
          </div>
        </div>

        <div class="svg-wrap">
          <svg width="${pw}" height="${PH}" viewBox="0 0 ${pw} ${PH}">
            ${whites.map(k => svg`
              <rect x="${k.x}" y="0" width="${k.w}" height="${k.h}" rx="3" fill="#FFFDF8" stroke="rgba(46,39,31,0.22)" stroke-width="1"></rect>
            `)}
            ${blacks.map(b => svg`
              <rect x="${b.x}" y="0" width="${b.w}" height="${b.h}" rx="2" fill="#3A3128"></rect>
            `)}
            ${marks.map(mk => svg`
              <g>
                <circle cx="${mk.cx}" cy="${mk.cy}" r="${mk.r}" fill="${mk.fill}" stroke="${mk.isRoot ? '#2E271F' : 'none'}" stroke-width="${mk.isRoot ? 1.5 : 0}"></circle>
                ${mk.label ? svg`
                  <text x="${mk.cx}" y="${mk.cy}" dy="3.2" font-size="8.5" font-weight="800" text-anchor="middle" fill="${mk.lc}" font-family="'Plus Jakarta Sans',sans-serif">${mk.label}</text>
                ` : nothing}
              </g>
            `)}
          </svg>
        </div>

        <div class="notes-line">${notesLine}</div>
      </div>
    `;
  }

  private renderFretCard(ch: ChordBlock, i: number, inst: 'Guitar' | 'Ukulele', isActive: boolean) {
    const c = parseChordSymbol(ch.name);
    const rootPc = PC[c.root] ?? 0;
    const intervals = QUAL[c.quality] || QUAL[QFALL[c.quality] || 'maj'] || [0, 4, 7];
    const GUITAR_OPEN = [4, 9, 2, 7, 11, 4];
    const UKE_OPEN = [7, 0, 4, 9];
    const isUke = inst === 'Ukulele';
    const openPcs = isUke ? UKE_OPEN : GUITAR_OPEN;
    const frets = isUke
      ? ukeVoicing({ root: c.root, rootPc, q: c.quality, intervals }) || [null, null, null, null]
      : guitarVoicing({ root: c.root, rootPc, q: c.quality, intervals }) || [null, null, null, null, null, null];

    const SP = 18, FR = 24, ROWS = 4, TOP = 16;
    const n = openPcs.length;
    const nz = frets.filter(f => f !== null && f > 0) as number[];
    const base = nz.length && Math.max(...nz) > 4 ? Math.min(...nz) - 1 : 0;
    const strings: { x: number }[] = [];
    const fretLines: { y: number; sw: number }[] = [];
    const dots: { cx: number; cy: number; fill: string; label: string }[] = [];
    const opens: { x: number }[] = [];
    const mutes: { x: number }[] = [];

    for (let s = 0; s < n; s++) strings.push({ x: s * SP });
    for (let r = 0; r <= ROWS; r++) fretLines.push({ y: TOP + r * FR, sw: r === 0 && base === 0 ? 3 : 1.2 });

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
      const iv = ((openPcs[s] + f - rootPc) % 12 + 12) % 12;
      dots.push({
        cx: x,
        cy: TOP + (f - base - 0.5) * FR,
        fill: iv === 0 ? '#F2735F' : '#2E271F',
        label: this.showDegrees ? DEG[((openPcs[s] + f - rootPc) % 12 + 12) % 12] : '',
      });
    });

    const w = (n - 1) * SP;
    const sw = (n - 1) * SP + 26;
    const sh = TOP + ROWS * FR + 12;
    const posLabel = base > 0 ? `${base + 1}fr` : '';
    const showPos = base > 0;

    const notesLine = intervals
      .map(iv => {
        const nm = PC_NAMES[(rootPc + iv) % 12];
        return this.showDegrees ? `${nm} (${DEG[iv % 12]})` : nm;
      })
      .join(' · ');

    return html`
      <div
        class="play-card ${isActive ? 'active-chord' : ''}"
        @click=${() => this.onCardClick(ch, i)}
        role="button"
        tabindex="0"
        aria-label="${inst} chord ${ch.name}"
      >
        <div class="card-top-row">
          <div class="chord-name-group">
            <span class="chord-title">${ch.name}</span>
            ${this.showTheory && ch.roman ? html`<span class="chord-rn">${ch.roman}</span>` : nothing}
          </div>
          ${showPos ? html`<span class="pos-badge">${posLabel}</span>` : nothing}
        </div>

        <div class="svg-wrap">
          <svg width="${sw}" height="${sh}" viewBox="-13 -2 ${sw} ${sh}">
            ${fretLines.map(fl => svg`
              <rect x="0" y="${fl.y}" width="${w}" height="${fl.sw}" fill="rgba(46,39,31,0.4)"></rect>
            `)}
            ${strings.map(st => svg`
              <rect x="${st.x}" y="16" width="1.2" height="96" fill="rgba(46,39,31,0.4)"></rect>
            `)}
            ${opens.map(op => svg`
              <circle cx="${op.x}" cy="7" r="4" fill="none" stroke="#2E271F" stroke-width="1.6"></circle>
            `)}
            ${mutes.map(mu => svg`
              <text x="${mu.x}" y="11" font-size="11" font-weight="800" text-anchor="middle" fill="rgba(46,39,31,0.45)" font-family="'Plus Jakarta Sans',sans-serif">×</text>
            `)}
            ${dots.map(dt => svg`
              <g>
                <circle cx="${dt.cx}" cy="${dt.cy}" r="${dt.fill === '#F2735F' ? 7.5 : 7}" fill="${dt.fill}"></circle>
                ${dt.label ? svg`
                  <text x="${dt.cx}" y="${dt.cy}" dy="3.2" font-size="8" font-weight="800" text-anchor="middle" fill="#FBF3E6" font-family="'Plus Jakarta Sans',sans-serif">${dt.label}</text>
                ` : nothing}
              </g>
            `)}
          </svg>
        </div>

        <div class="notes-line">${notesLine}</div>
      </div>
    `;
  }

  render() {
    const chords = this.progression?.chords || [];
    const instruments: PlayInstrument[] = ['Piano', 'Guitar', 'Ukulele'];

    const hintText =
      this.playInstrument === 'Piano'
        ? 'One voicing per chord, root position — the red dot is the root, play left to right.'
        : this.playInstrument === 'Guitar'
        ? 'Exact voicings including 7ths — the red dot is the root, ○ is an open string, × is muted.'
        : 'Standard G-C-E-A tuning — the red dot is the root, ○ is an open string, × is muted.';

    return html`
      <div class="play-panel">
        <!-- Panel Header -->
        <div class="panel-header">
          <div class="header-left">
            <span class="header-label">PLAY IT</span>
            <span class="header-sub">${this.playInstrument} Voicings</span>
          </div>

          <div class="header-right">
            <!-- Tier-2 Segmented Instrument Control -->
            <div class="tier2-control" role="tablist" aria-label="Instrument selector">
              ${instruments.map(inst => html`
                <button
                  class="tier2-chip ${this.playInstrument === inst ? 'active' : ''}"
                  @click=${() => this.setInstrument(inst)}
                  role="tab"
                  aria-selected=${this.playInstrument === inst}
                >
                  ${inst}
                </button>
              `)}
            </div>

            <!-- Scale Degrees Switch -->
            <div
              class="degrees-switch"
              @click=${this.toggleDegrees}
              role="switch"
              aria-checked=${this.showDegrees}
              title="Toggle scale degree numbers vs note names"
            >
              <div class="toggle-track ${this.showDegrees ? 'active' : ''}">
                <div class="toggle-knob"></div>
              </div>
              <span>Scale degrees</span>
            </div>
          </div>
        </div>

        <!-- Subtitle Hint Banner -->
        <div class="hint-banner">${hintText}</div>

        <!-- Visualizer Content -->
        ${this.playInstrument === 'Piano'
          ? html`
              <div class="piano-grid">
                ${chords.map((ch, i) =>
                  this.renderPianoCard(ch, i, this.playing && this.activeIndex === i)
                )}
              </div>
            `
          : html`
              <div class="fret-grid">
                ${chords.map((ch, i) =>
                  this.renderFretCard(ch, i, this.playInstrument, this.playing && this.activeIndex === i)
                )}
              </div>
            `}
      </div>
    `;
  }
}
