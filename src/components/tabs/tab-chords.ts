import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ChordBlock,
  Progression,
  roleForTension,
  generateTheoryGroups,
  generateBorrowedChords,
  notesForSymbol,
  preferFlatSpelling,
  RawChordData,
  getDiatonicScaleDegreeList,
} from '../../services/chord-engine';
import {
  getBandById,
  getBandMoveForChord,
  getBandTrickCandidates,
} from '../../services/band-dna-service';
import { playbackEngine } from '../../services/playback-engine';
import '../chord-swap-lane';
import type { SwapFeelItem } from '../chord-swap-lane';

const ROLE_PLAIN: Record<string, string> = {
  Tonic: 'HOME',
  Submediant: 'DRIFTING',
  Subdominant: 'LIFTING',
  Supertonic: 'STEPPING UP',
  Mediant: 'WISTFUL',
  Dominant: 'PULLING HOME',
  'Dominant 7th': 'PULLING HOME',
};

const PAD_KEYS = ['A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];

@customElement('tab-chords')
export class TabChords extends LitElement {
  @property({ type: Object }) progression: Progression = {
    genre: 'Pop',
    mood: 'Emotional',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 84,
    chords: [],
  };

  @property({ type: Object }) chordData: RawChordData = { chords: {}, scales: {} };
  @property({ type: String }) moodColor = '#C9A9E0';
  @property({ type: String }) selectedBand: string | null = null;
  @property({ type: Boolean }) isPlaying = false;
  @property({ type: Number }) activeIndex = -1;
  @property({ type: Boolean }) showTheory = false;

  @state() private swapIndex: number | null = null;
  @state() private activeSwapFamily = 'Darker';
  @state() private abPick: ChordBlock | null = null;
  @state() private padHeld: number | null = null;
  @state() private gridFor: number | null = null;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--font-body, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: #2E271F;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    /* 1. Header Context Row */
    .tab-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .vibe-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 999px;
      padding: 6px 14px 6px 10px;
      font-size: 13px;
      font-weight: 700;
      color: #2E271F;
      cursor: pointer;
      transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.06);
    }

    .vibe-pill-btn:hover {
      background: #FFFFFF;
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(46, 39, 31, 0.09);
    }

    .vibe-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
    }

    .header-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    /* Chord Count Stepper */
    .chord-count-stepper {
      display: inline-flex;
      align-items: center;
      background: rgba(251, 243, 230, 0.85);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 999px;
      padding: 3px 8px;
      font-size: 12px;
      font-weight: 700;
      color: #2E271F;
      gap: 6px;
    }

    .stepper-btn {
      background: transparent;
      border: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: 800;
      color: #2E271F;
      cursor: pointer;
      transition: background 150ms ease;
    }

    .stepper-btn:hover:not(:disabled) {
      background: rgba(46, 39, 31, 0.08);
    }

    .stepper-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    /* Try Another Button */
    .try-another-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      color: #2E271F;
      cursor: pointer;
      transition: all 180ms ease;
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.06);
    }

    .try-another-btn:hover {
      background: #FFFFFF;
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(46, 39, 31, 0.09);
    }

    /* 2. Band DNA Banner */
    .band-legend-banner {
      background: rgba(251, 243, 230, 0.88);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      padding: 10px 14px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      backdrop-filter: blur(8px);
    }

    .band-legend-info {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .band-swatch {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .band-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #2E271F;
    }

    .band-tagline {
      font-size: 11.5px;
      font-weight: 500;
      color: #7A6F62;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .band-dismiss-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      font-weight: 700;
      color: #7A6F62;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
      transition: all 150ms ease;
    }

    .band-dismiss-btn:hover {
      color: #2E271F;
      background: rgba(46, 39, 31, 0.08);
    }

    /* 3. Chord Pads Grid */
    .pad-cells-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      width: 100%;
      position: relative;
    }

    @media (max-width: 768px) {
      .pad-cells-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
    }

    /* Chord Pad Card */
    .pad-cell {
      position: relative;
      border-radius: 20px;
      padding: 14px 14px 12px;
      min-height: 142px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
      transition: transform 140ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms ease, border-radius 160ms ease;
      box-shadow: 0 4px 12px -4px rgba(46, 39, 31, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6);
      overflow: hidden;
    }

    .pad-cell:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 18px -4px rgba(46, 39, 31, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    }

    .pad-cell:active, .pad-cell.pad-held {
      transform: translateY(1px);
      box-shadow: 0 2px 6px -2px rgba(46, 39, 31, 0.2);
    }

    .pad-cell.pad-lit {
      box-shadow: inset 0 0 0 3px #2E271F, 0 10px 24px -6px rgba(46, 39, 31, 0.35);
      animation: pulse-lit 1.2s infinite alternate;
    }

    @keyframes pulse-lit {
      from { transform: scale(1); }
      to { transform: scale(1.015); }
    }

    .pad-cell.selected {
      border-radius: 20px 20px 4px 4px;
      box-shadow: inset 0 0 0 2.5px var(--mood-tint, #C9A9E0), 0 14px 26px -18px rgba(46, 39, 31, 0.45);
    }

    /* Top Row in Pad */
    .pad-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .pad-key-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 5px;
      background: rgba(46, 39, 31, 0.14);
      box-shadow: 0 1px 0 rgba(46, 39, 31, 0.15);
      flex-shrink: 0;
    }

    .pad-key-badge span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.65);
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10.5px;
      font-weight: 800;
      color: #2E271F;
    }

    .pad-roman-badge {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.65);
      letter-spacing: 0.5px;
    }

    .pad-actions {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-left: auto;
    }

    .pad-icon-btn {
      background: rgba(255, 255, 255, 0.5);
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #2E271F;
      transition: all 140ms ease;
    }

    .pad-icon-btn:hover {
      background: #FFFFFF;
      transform: scale(1.08);
    }

    /* Bottom Info in Pad */
    .pad-bottom-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-top: 10px;
    }

    .pad-role-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.65);
    }

    .pad-chord-name {
      font-size: 22px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.3px;
      line-height: 1.1;
    }

    @media (max-width: 600px) {
      .pad-chord-name {
        font-size: 18px;
      }
    }

    .pad-notes-theory {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.7);
      margin-top: 2px;
    }

    /* Band Move Pill inside Pad */
    .band-move-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255, 255, 255, 0.75);
      border-radius: 999px;
      padding: 3px 8px;
      font-size: 9.5px;
      font-weight: 800;
      color: #2E271F;
      margin-top: 6px;
      box-shadow: 0 1px 2px rgba(46, 39, 31, 0.08);
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* 4. Diatonic Scale Strip */
    .scale-diatonic-strip {
      background: rgba(251, 243, 230, 0.75);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 18px;
      padding: 12px 16px;
      margin-top: 18px;
      backdrop-filter: blur(6px);
    }

    .scale-strip-header {
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #8A6B3F;
      margin-bottom: 8px;
    }

    .scale-degrees-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .scale-degree-chip {
      background: #FFFFFF;
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 10px;
      padding: 6px 10px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: all 140ms ease;
    }

    .scale-degree-chip:hover {
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(46, 39, 31, 0.1);
    }

    .degree-roman {
      font-family: var(--font-mono, 'Space Mono', monospace);
      font-size: 9px;
      font-weight: 700;
      color: #7A6F62;
    }

    .degree-name {
      font-size: 12.5px;
      font-weight: 800;
      color: #2E271F;
    }
  `;

  private getChordLadder(c: ChordBlock): string[] {
    if (!c) return [];
    const n = String(c.name);
    const root = (n.match(/^[A-G][#b]?/) || ['C'])[0];
    const suf = /sus/.test(n)
      ? ['sus4', '7sus4', '9sus4', 'maj7sus4']
      : (/dim/.test(n)
        ? ['dim', 'dim7', 'dim9']
        : (/^[A-G][#b]?m(?!aj)/.test(n)
          ? ['m', 'm6', 'm7', 'm9', 'mMaj7']
          : ['', '6', '7', 'maj7', 'maj9']));
    return suf.map(s => root + s);
  }

  private handlePadClick(e: PointerEvent, index: number) {
    const chord = this.progression?.chords?.[index];
    if (!chord) return;

    this.padHeld = index;
    setTimeout(() => {
      if (this.padHeld === index) this.padHeld = null;
      this.requestUpdate();
    }, 180);

    // Play chord audio
    const key = this.progression?.key || 'C';
    const scaleType = this.progression?.scaleType || 'MAJOR';
    const notes = chord.notes && chord.notes.length > 0
      ? chord.notes
      : notesForSymbol(chord.name, preferFlatSpelling(key, scaleType));

    playbackEngine.playChordNotes(notes, 0.85, chord.voicing || '1st inversion', 90);

    this.dispatchEvent(new CustomEvent('chord-play', {
      detail: { index, chord },
      bubbles: true,
      composed: true,
    }));
  }

  private openSwap(index: number) {
    if (this.swapIndex === index) {
      this.swapIndex = null;
    } else {
      this.swapIndex = index;
      this.abPick = null;
    }
    this.requestUpdate();
  }

  private openDetail(index: number) {
    const chord = this.progression?.chords?.[index];
    this.dispatchEvent(new CustomEvent('chord-detail-open', {
      detail: { index, chord },
      bubbles: true,
      composed: true,
    }));
  }

  private getSwapFeelings(swapIndex: number): SwapFeelItem[] {
    if (!this.progression || !this.chordData.scales) return [];
    const isMinor = this.progression.scaleType?.includes('MINOR') ?? false;
    const groups = generateTheoryGroups(this.chordData, this.progression, swapIndex);
    const borrowedRows = generateBorrowedChords(this.chordData, this.progression, swapIndex);

    const feels: SwapFeelItem[] = groups.map(g => ({
      name: g.name,
      sub: g.sub || '',
      tension: g.tension,
      rows: g.rows.map(r => ({
        name: r.name,
        roman: r.roman || '',
        notes: r.notes || r.chord?.notes,
        sub: r.sub,
        tension: r.tension,
        chord: r.chord,
      })),
    }));

    feels.push({
      name: 'Borrowed',
      sub: `Four chords from the ${isMinor ? 'major' : 'minor'} version of this key`,
      tension: 0.45,
      rows: borrowedRows.map(r => ({
        name: r.name,
        roman: r.roman || '',
        notes: r.notes || r.chord?.notes,
        sub: r.sub,
        tension: r.tension,
        chord: r.chord,
      })),
    });

    const ordered = feels.filter(f => f.name !== 'Borrowed').sort((a, b) => a.tension - b.tension);
    const borrowed = feels.filter(f => f.name === 'Borrowed');
    const allGroups = [...ordered, ...borrowed];

    const activeBand = this.selectedBand ? getBandById(this.selectedBand) : null;
    if (activeBand) {
      const candidates = getBandTrickCandidates(
        this.progression.key || 'C',
        this.progression.scaleType || 'MAJOR',
        activeBand.name
      );
      const trickMap = new Map(candidates.map(c => [c.chordName, c]));

      allGroups.forEach(group => {
        const rows = group.rows.map(r => {
          const trick = trickMap.get(r.name);
          if (trick) {
            return {
              ...r,
              bandTag: `${activeBand.name} move`,
              bandColor: activeBand.color,
              sub: this.showTheory ? trick.theory : trick.plain,
            };
          }
          return r;
        });
        group.rows = rows;
      });
    }

    return allGroups;
  }

  private handleSwapAudition(detail: { chord: ChordBlock }) {
    this.abPick = detail.chord;
    const key = this.progression?.key || 'C';
    const scaleType = this.progression?.scaleType || 'MAJOR';
    const notes = detail.chord.notes && detail.chord.notes.length > 0
      ? detail.chord.notes
      : notesForSymbol(detail.chord.name, preferFlatSpelling(key, scaleType));
    playbackEngine.playChordNotes(notes, 0.8, detail.chord.voicing || '1st inversion', 92);
    this.requestUpdate();
  }

  private confirmSwap(e: CustomEvent<{ chord: ChordBlock; index: number }>) {
    const swapIdx = this.swapIndex;
    if (swapIdx === null) return;
    const newChord = e.detail.chord;
    const updatedChords = [...this.progression.chords];
    updatedChords[swapIdx] = newChord;

    this.dispatchEvent(new CustomEvent('progression-update', {
      detail: { chords: updatedChords },
      bubbles: true,
      composed: true,
    }));

    this.swapIndex = null;
    this.abPick = null;
    this.requestUpdate();
  }

  private updateChordCount(delta: number) {
    const current = this.progression.chords.length;
    const next = Math.max(4, Math.min(8, current + delta));
    if (next === current) return;
    this.dispatchEvent(new CustomEvent('set-chord-count', {
      detail: { count: next },
      bubbles: true,
      composed: true,
    }));
  }

  private onReroll() {
    this.dispatchEvent(new CustomEvent('reroll', { bubbles: true, composed: true }));
  }

  private onVibeClick() {
    this.dispatchEvent(new CustomEvent('open-vibe-picker', { bubbles: true, composed: true }));
  }

  render() {
    const chords = this.progression.chords || [];
    const activeBand = this.selectedBand ? getBandById(this.selectedBand) : null;
    const padCols = 4;

    const diatonicList = this.showTheory
      ? getDiatonicScaleDegreeList(this.progression.key || 'C', this.progression.scaleType || 'MAJOR', this.chordData, this.progression)
      : [];

    return html`
      <!-- 1. Header Context Row -->
      <div class="tab-header-row">
        <button class="vibe-pill-btn" @click=${this.onVibeClick} aria-label="Select vibe and style">
          <span class="vibe-dot" style="background: ${this.moodColor};"></span>
          <span>${this.progression.mood || 'Emotional'} · ${this.progression.genre || 'Pop'} · ${this.progression.bpm || 84} BPM</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>

        <div class="header-actions">
          <div class="chord-count-stepper">
            <button
              class="stepper-btn"
              @click=${() => this.updateChordCount(-1)}
              ?disabled=${chords.length <= 4}
              aria-label="Decrease chord count"
            >−</button>
            <span>${chords.length} chords</span>
            <button
              class="stepper-btn"
              @click=${() => this.updateChordCount(1)}
              ?disabled=${chords.length >= 8}
              aria-label="Increase chord count"
            >+</button>
          </div>

          <button class="try-another-btn" @click=${this.onReroll} aria-label="Generate new progression">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
            <span>Try another</span>
          </button>
        </div>
      </div>

      <!-- 2. Band DNA Legend Banner -->
      ${activeBand ? html`
        <div class="band-legend-banner">
          <div class="band-legend-info">
            <div class="band-swatch" style="background: ${activeBand.color};"></div>
            <div>
              <div class="band-title">${activeBand.name}</div>
              <div class="band-tagline">${activeBand.tagline || activeBand.plain}</div>
            </div>
          </div>
          <button
            class="band-dismiss-btn"
            @click=${() => this.dispatchEvent(new CustomEvent('clear-band', { bubbles: true, composed: true }))}
            aria-label="Dismiss band archetype"
          >×</button>
        </div>
      ` : ''}

      <!-- 3. Chord Pads Grid -->
      <div class="pad-cells-grid" style="--mood-tint: ${this.moodColor};">
        ${chords.map((c, i) => {
          const role = roleForTension(c.tension || 0.1);
          const isLit = this.activeIndex === i && this.isPlaying;
          const isHeld = this.padHeld === i;
          const isSelected = this.swapIndex === i;
          const bandMove = activeBand ? getBandMoveForChord(c, activeBand.name, this.progression.key || 'C', this.progression.scaleType || 'MAJOR') : null;
          const laneAfterIdx = Math.min(chords.length - 1, (Math.floor((this.swapIndex ?? 0) / padCols) + 1) * padCols - 1);

          return html`
            <div
              class="pad-cell ${isHeld ? 'pad-held' : ''} ${isSelected ? 'selected' : ''} ${isLit ? 'pad-lit' : ''}"
              style="background: ${role.color};"
              role="button"
              tabindex="0"
              @pointerdown=${(e: PointerEvent) => this.handlePadClick(e, i)}
              aria-label="${c.name} chord"
            >
              <div class="pad-top-row">
                <div class="pad-key-badge">
                  <span>${PAD_KEYS[i] || ''}</span>
                </div>
                ${this.showTheory && c.roman ? html`<span class="pad-roman-badge">${c.roman}</span>` : ''}
                
                <div class="pad-actions">
                  <button
                    class="pad-icon-btn"
                    @click=${(e: MouseEvent) => { e.stopPropagation(); this.openSwap(i); }}
                    aria-label="Swap chord"
                    title="Swap chord"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4"/><path d="M20 16H7M11 12l-4 4 4 4"/></svg>
                  </button>
                  <button
                    class="pad-icon-btn"
                    @click=${(e: MouseEvent) => { e.stopPropagation(); this.openDetail(i); }}
                    aria-label="View voicing"
                    title="View voicing"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>

              <div class="pad-bottom-info">
                <div class="pad-role-label">${ROLE_PLAIN[c.functionLabel] || c.functionLabel}</div>
                <div class="pad-chord-name">${c.name}</div>
                ${this.showTheory && c.notes && c.notes.length ? html`
                  <div class="pad-notes-theory">${c.notes.join(' · ')}</div>
                ` : ''}
                ${bandMove ? html`
                  <div class="band-move-pill" style="border-left: 3px solid ${activeBand?.color || '#2E271F'};">
                    <span>${bandMove.name}: ${bandMove.chord}</span>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Swap Lane extrusion below the row containing the selected pad -->
            ${this.swapIndex !== null && i === laneAfterIdx ? html`
              <chord-swap-lane
                .swapIndex=${this.swapIndex}
                .chord=${chords[this.swapIndex]}
                .feelings=${this.getSwapFeelings(this.swapIndex)}
                .activeFeel=${this.activeSwapFamily}
                .pickedChord=${this.abPick}
                .padCols=${Math.min(chords.length, 4)}
                .moodColor=${this.moodColor}
                .band=${activeBand ? { name: activeBand.name, color: activeBand.color, plain: activeBand.plain } : null}
                @swap-feel-change=${(e: CustomEvent) => { this.activeSwapFamily = e.detail.feel; this.requestUpdate(); }}
                @swap-audition=${(e: CustomEvent) => this.handleSwapAudition(e.detail)}
                @swap-confirm=${this.confirmSwap}
                @swap-close=${() => { this.swapIndex = null; this.requestUpdate(); }}
              ></chord-swap-lane>
            ` : ''}
          `;
        })}
      </div>

      <!-- 4. Diatonic Scale Strip -->
      ${this.showTheory && diatonicList.length ? html`
        <div class="scale-diatonic-strip">
          <div class="scale-strip-header">Diatonic scale degrees (${this.progression.key} ${this.progression.scaleType})</div>
          <div class="scale-degrees-row">
            ${diatonicList.map(d => html`
              <div
                class="scale-degree-chip"
                @click=${() => {
                  const key = this.progression.key || 'C';
                  const scaleType = this.progression.scaleType || 'MAJOR';
                  const notes = notesForSymbol(d.chordName, preferFlatSpelling(key, scaleType));
                  playbackEngine.playChordNotes(notes, 0.8, '1st inversion', 88);
                }}
                title="Degree ${d.roman}: ${d.functionLabel}"
              >
                <span class="degree-roman">${d.roman}</span>
                <span class="degree-name">${d.chordName}</span>
              </div>
            `)}
          </div>
        </div>
      ` : ''}
    `;
  }
}
