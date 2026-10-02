import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Progression,
  ChordBlock,
  getMoodColor,
  roleForTension,
  notesForSymbol,
  preferFlatSpelling,
} from '../../services/chord-engine';
import {
  MelodyTrack,
  MelodyNote,
  GuideMode,
  ContourArchetype,
  melodyEngine,
  getHarmonicChordMatrix,
  classifyPitch,
  snapNoteToGuide,
  HarmonicChordMatrix,
  NoteAnalysis,
} from '../../services/melody-engine';
import { midiToNoteName, playLeadNote } from '../../services/audio-service';
import { noteToMidiNumber } from '../../services/export-service';

const ROLE_PLAIN: Record<string, string> = {
  Tonic: 'HOME',
  Submediant: 'DRIFTING',
  Subdominant: 'LIFTING',
  Supertonic: 'STEPPING UP',
  Mediant: 'WISTFUL',
  Dominant: 'PULLING HOME',
  'Dominant 7th': 'PULLING HOME',
};

const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_KEYS = [
  { name: 'C#', offsetLeftPct: 10.5 },
  { name: 'D#', offsetLeftPct: 24.8 },
  { name: 'F#', offsetLeftPct: 53.5 },
  { name: 'G#', offsetLeftPct: 67.8 },
  { name: 'A#', offsetLeftPct: 82.1 },
];

@customElement('tab-melody')
export class TabMelody extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    .melody-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }

    /* Panel Header Row */
    .panel-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .header-left {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .small-caps-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .note-count {
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
    }

    /* Tier-2 Segmented Control */
    .segmented-control {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 3px;
    }

    .segment-btn {
      min-height: 28px;
      padding: 0 12px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      background: transparent;
      color: var(--cv-ink-muted, #5B5145);
      transition: background 150ms ease, color 150ms ease, box-shadow 150ms ease;
    }

    .segment-btn:hover {
      color: var(--cv-ink, #2E271F);
    }

    .segment-btn.active {
      background: #FBF3E6;
      color: #2E271F;
      font-weight: 800;
      box-shadow: inset 0 0 0 1px rgba(46, 39, 31, 0.1), 0 1px 2px rgba(46, 39, 31, 0.12);
    }

    /* Quick Action Controls */
    .quick-actions-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .quick-chip {
      background: rgba(251, 243, 230, 0.72);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 100px;
      padding: 5px 12px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 150ms ease, transform 120ms ease;
    }

    .quick-chip:hover {
      background: #FBF3E6;
    }

    .quick-chip:active {
      transform: scale(0.96);
    }

    /* 4-Bar Melody Grid Sequencer */
    .bars-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      width: 100%;
      position: relative;
    }

    @media (max-width: 900px) {
      .bars-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 520px) {
      .bars-grid {
        grid-template-columns: 1fr;
      }
    }

    .bar-column {
      background: rgba(251, 243, 230, 0.72);
      border: 1px solid rgba(46, 39, 31, 0.08);
      border-radius: 20px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-sizing: border-box;
      position: relative;
    }

    .bar-column.playing-bar {
      box-shadow: inset 0 0 0 2px var(--mood-color, #F2735F);
    }

    /* Bar Header */
    .bar-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.06);
    }

    .bar-role {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .bar-chord-info {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    .bar-chord-name {
      font-size: 16px;
      font-weight: 800;
      color: #2E271F;
      letter-spacing: -0.01em;
    }

    .bar-chord-roman {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
      color: var(--cv-label, #8A6B3F);
    }

    /* 16-Step Grid Inside Each Bar */
    .steps-16-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 6px;
      width: 100%;
      aspect-ratio: 1;
    }

    .step-cell {
      position: relative;
      background: rgba(46, 39, 31, 0.03);
      border: 1px solid rgba(46, 39, 31, 0.06);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      transition: background 120ms ease, transform 100ms ease, border-color 120ms ease;
    }

    .step-cell:hover {
      background: rgba(46, 39, 31, 0.07);
    }

    .step-cell:active {
      transform: scale(0.94);
    }

    .step-cell.active-step {
      box-shadow: 0 0 0 2px var(--mood-color, #F2735F);
    }

    .step-cell.has-note {
      background: #FBF3E6;
      border-color: rgba(46, 39, 31, 0.15);
      box-shadow: 0 2px 5px rgba(46, 39, 31, 0.08);
    }

    .step-number {
      position: absolute;
      top: 3px;
      left: 4px;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 8px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.35);
    }

    .note-badge {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 800;
      color: #2E271F;
      line-height: 1;
    }

    .role-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-top: 3px;
    }

    .role-dot.root { background: #F2735F; }
    .role-dot.third { background: #9CC0EC; }
    .role-dot.fifth { background: #F6C85F; }
    .role-dot.seventh { background: #C38D9E; }
    .role-dot.tension { background: #41B3A3; }
    .role-dot.clash { background: #E74C3C; }

    /* Tie duration line */
    .tie-bar {
      position: absolute;
      bottom: 2px;
      left: 4px;
      right: 4px;
      height: 2.5px;
      border-radius: 2px;
      background: var(--mood-color, #F2735F);
      opacity: 0.75;
    }

    /* Note Bloom Popover */
    .bloom-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      background: rgba(46, 39, 31, 0.2);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: bloom-fade-in 140ms ease-out;
    }

    @keyframes bloom-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .bloom-popover {
      width: 320px;
      background: #FBF3E6;
      border: 1px solid rgba(46, 39, 31, 0.12);
      border-radius: 22px;
      padding: 16px;
      box-shadow: 0 20px 48px -12px rgba(46, 39, 31, 0.35);
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-sizing: border-box;
      animation: bloom-scale-in 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes bloom-scale-in {
      from { transform: scale(0.92); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .bloom-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .bloom-nav-btn {
      background: transparent;
      border: none;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #5B5145);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .bloom-nav-btn:hover {
      background: rgba(46, 39, 31, 0.08);
      color: #2E271F;
    }

    .bloom-center-info {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .bloom-pitch-title {
      font-size: 18px;
      font-weight: 800;
      color: #2E271F;
    }

    .bloom-role-label {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-label, #8A6B3F);
    }

    .bloom-clear-btn {
      background: transparent;
      border: none;
      font-size: 11px;
      font-weight: 700;
      color: #E74C3C;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 6px;
    }

    .bloom-clear-btn:hover {
      background: rgba(231, 76, 60, 0.1);
    }

    /* Micro Keyboard */
    .micro-keyboard-wrapper {
      position: relative;
      width: 100%;
      height: 90px;
      border-radius: 8px;
      overflow: hidden;
      user-select: none;
    }

    .white-keys-row {
      display: flex;
      width: 100%;
      height: 100%;
    }

    .white-key {
      flex: 1;
      height: 100%;
      background: #FFFFFF;
      border-right: 1px solid rgba(46, 39, 31, 0.15);
      border-radius: 0 0 6px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 6px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      transition: background 100ms ease;
    }

    .white-key:last-child {
      border-right: none;
    }

    .white-key:hover {
      background: #F4EBE0;
    }

    .white-key.active {
      background: var(--mood-color, #F2735F);
      color: #FFFFFF;
    }

    .white-key.disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .black-key {
      position: absolute;
      top: 0;
      width: 12%;
      height: 58%;
      background: #2E271F;
      border-radius: 0 0 4px 4px;
      z-index: 10;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 4px;
      box-sizing: border-box;
      cursor: pointer;
      transition: background 100ms ease;
    }

    .black-key:hover {
      background: #4A3F33;
    }

    .black-key.active {
      background: var(--mood-color, #F2735F);
    }

    .black-key.disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .key-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--mood-color, #F2735F);
      margin-bottom: 4px;
    }

    .white-key.active .key-dot {
      background: #FFFFFF;
    }

    .key-text {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 10px;
      font-weight: 700;
    }

    /* Duration Stepper */
    .duration-control {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 6px;
      background: rgba(46, 39, 31, 0.04);
      border-radius: 12px;
    }

    .duration-stepper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .step-btn {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: none;
      background: rgba(46, 39, 31, 0.08);
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2E271F;
    }

    .step-btn:hover {
      background: rgba(46, 39, 31, 0.15);
    }
  `;

  @property({ type: Object })
  progression: Progression | null = null;

  @property({ type: Object })
  melodyTrack: MelodyTrack | null = null;

  @property({ type: Number })
  activeStepIndex: number | null = null;

  @property({ type: String })
  guideMode: GuideMode = 'strict-chord';

  @property({ type: String })
  contour: ContourArchetype = 'Arch';

  @property({ type: Number })
  density = 50;

  @property({ type: Number })
  octave = 4;

  @property({ type: Boolean })
  playing = false;

  @property({ type: Boolean })
  isMobile = false;

  @state()
  private selectedGlobalStep: number | null = null;

  @state()
  private bloomOctave = 4;

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('progression') && this.progression) {
      if (!this.melodyTrack || this.melodyTrack.notes.length === 0) {
        this.generateDefaultMelody();
      }
    }
  }

  private generateDefaultMelody() {
    if (!this.progression) return;
    const track = melodyEngine.generateMelody(this.progression, {
      contour: this.contour,
      density: this.density,
      octave: this.octave,
      guideMode: this.guideMode,
    });
    this.melodyTrack = track;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track }, bubbles: true, composed: true }));
  }

  private onSetGuideMode(mode: GuideMode) {
    this.guideMode = mode;
    if (this.melodyTrack && this.progression) {
      const updatedTrack: MelodyTrack = {
        ...this.melodyTrack,
        guideMode: mode,
      };
      this.melodyTrack = updatedTrack;
      this.dispatchEvent(new CustomEvent('guide-mode-change', { detail: { mode }, bubbles: true, composed: true }));
      this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updatedTrack }, bubbles: true, composed: true }));
    }
  }

  private onRerollMelody() {
    if (!this.progression) return;
    const track = melodyEngine.generateMelody(this.progression, {
      contour: this.contour,
      density: this.density,
      octave: this.octave,
      guideMode: this.guideMode,
    });
    this.melodyTrack = track;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('toast', { detail: 'Generated fresh melody', bubbles: true, composed: true }));
  }

  private onStepClick(globalStep: number) {
    this.selectedGlobalStep = globalStep;
    const existing = this.getNoteAtStep(globalStep);
    if (existing) {
      const parsedMidi = existing.midi;
      this.bloomOctave = Math.floor(parsedMidi / 12) - 1;
      playLeadNote(existing.pitch, 0.4);
    } else {
      this.bloomOctave = this.octave;
    }
  }

  private closeBloom() {
    this.selectedGlobalStep = null;
  }

  private getNoteAtStep(globalStep: number): MelodyNote | undefined {
    if (!this.melodyTrack) return undefined;
    const barIndex = Math.floor(globalStep / 16);
    const stepInBar = globalStep % 16;
    return this.melodyTrack.notes.find(n => n.barIndex === barIndex && n.stepInBar === stepInBar);
  }

  private onSelectPitch(pitchNameWithoutOct: string) {
    if (this.selectedGlobalStep === null || !this.progression) return;

    const barIndex = Math.floor(this.selectedGlobalStep / 16);
    const stepInBar = this.selectedGlobalStep % 16;
    const chord = this.progression.chords[barIndex] || this.progression.chords[0];
    const pitch = `${pitchNameWithoutOct}${this.bloomOctave}`;
    const midi = noteToMidiNumber(pitch);

    // Guide mode enforcement
    if (this.guideMode === 'strict-chord') {
      const matrix = getHarmonicChordMatrix(chord, this.progression.key, this.progression.scaleType);
      const pc = midi % 12;
      const allowed = [...matrix.chordTonePcs, ...matrix.tensionPcs];
      if (!allowed.includes(pc)) {
        this.dispatchEvent(new CustomEvent('toast', { detail: 'Strict mode: pick a chord tone', bubbles: true, composed: true }));
        return;
      }
    }

    const classification = classifyPitch(midi, chord, this.progression.key, this.progression.scaleType);
    playLeadNote(pitch, 0.4);

    const otherNotes = (this.melodyTrack?.notes || []).filter(
      n => !(n.barIndex === barIndex && n.stepInBar === stepInBar)
    );

    const newNote: MelodyNote = {
      id: `m-note-${barIndex}-${stepInBar}-${Date.now()}`,
      barIndex,
      stepInBar,
      beatOffset: barIndex * 4 + (stepInBar / 4),
      durationBeats: 1.0,
      pitch,
      midi,
      velocity: 100,
      chordToneRole: classification.role,
      isClash: classification.isClash,
    };

    const updatedTrack: MelodyTrack = {
      ...this.melodyTrack!,
      notes: [...otherNotes, newNote].sort((a, b) => a.beatOffset - b.beatOffset),
    };

    this.melodyTrack = updatedTrack;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updatedTrack }, bubbles: true, composed: true }));
  }

  private onClearCurrentNote() {
    if (this.selectedGlobalStep === null || !this.melodyTrack) return;
    const barIndex = Math.floor(this.selectedGlobalStep / 16);
    const stepInBar = this.selectedGlobalStep % 16;

    const filtered = this.melodyTrack.notes.filter(
      n => !(n.barIndex === barIndex && n.stepInBar === stepInBar)
    );

    const updatedTrack: MelodyTrack = {
      ...this.melodyTrack,
      notes: filtered,
    };

    this.melodyTrack = updatedTrack;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updatedTrack }, bubbles: true, composed: true }));
    this.closeBloom();
  }

  private onChangeNoteDuration(delta: number) {
    const note = this.selectedGlobalStep !== null ? this.getNoteAtStep(this.selectedGlobalStep) : null;
    if (!note || !this.melodyTrack) return;

    const newDuration = Math.max(0.25, Math.min(4.0, note.durationBeats + delta * 0.25));
    const updatedNotes = this.melodyTrack.notes.map(n => n.id === note.id ? { ...n, durationBeats: newDuration } : n);
    const updatedTrack = { ...this.melodyTrack, notes: updatedNotes };
    this.melodyTrack = updatedTrack;
    this.dispatchEvent(new CustomEvent('melody-change', { detail: { track: updatedTrack }, bubbles: true, composed: true }));
  }

  private onPrevStep() {
    if (this.selectedGlobalStep !== null) {
      this.selectedGlobalStep = (this.selectedGlobalStep - 1 + 64) % 64;
    }
  }

  private onNextStep() {
    if (this.selectedGlobalStep !== null) {
      this.selectedGlobalStep = (this.selectedGlobalStep + 1) % 64;
    }
  }

  render() {
    const chords = this.progression?.chords || [];
    const moodColor = getMoodColor(this.progression?.mood || 'Warm');
    const noteCount = this.melodyTrack?.notes.length || 0;

    return html`
      <div class="melody-container" style="--mood-color: ${moodColor};">
        <!-- Panel Header -->
        <div class="panel-header-row">
          <div class="header-left">
            <span class="small-caps-label">MELODY</span>
            <span class="note-count">${noteCount} notes</span>
          </div>

          <div class="quick-actions-bar">
            <button class="quick-chip" @click=${this.onRerollMelody} aria-label="Reroll melody">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              Reroll
            </button>

            <!-- Tier-2 Segmented Control: Strict / Guide / Free -->
            <div class="segmented-control" role="radiogroup" aria-label="Melody guide mode">
              <button
                class="segment-btn ${this.guideMode === 'strict-chord' ? 'active' : ''}"
                @click=${() => this.onSetGuideMode('strict-chord')}
                role="radio"
                aria-checked="${this.guideMode === 'strict-chord'}"
              >
                Strict
              </button>
              <button
                class="segment-btn ${this.guideMode === 'scale-key' ? 'active' : ''}"
                @click=${() => this.onSetGuideMode('scale-key')}
                role="radio"
                aria-checked="${this.guideMode === 'scale-key'}"
              >
                Guide
              </button>
              <button
                class="segment-btn ${this.guideMode === 'free' ? 'active' : ''}"
                @click=${() => this.onSetGuideMode('free')}
                role="radio"
                aria-checked="${this.guideMode === 'free'}"
              >
                Free
              </button>
            </div>
          </div>
        </div>

        <!-- 4-Bar Melody Grid Sequencer -->
        <div class="bars-grid">
          ${chords.map((chord, barIdx) => {
            const isPlayingBar = this.playing && this.activeStepIndex !== null && Math.floor(this.activeStepIndex / 16) === barIdx;
            return html`
              <div class="bar-column ${isPlayingBar ? 'playing-bar' : ''}">
                <div class="bar-header">
                  <span class="bar-role">${ROLE_PLAIN[chord.functionLabel] || chord.functionLabel}</span>
                  <div class="bar-chord-info">
                    <span class="bar-chord-name">${chord.name}</span>
                    <span class="bar-chord-roman">${chord.roman || ''}</span>
                  </div>
                </div>

                <div class="steps-16-grid">
                  ${Array.from({ length: 16 }, (_, stepInBar) => {
                    const globalStep = barIdx * 16 + stepInBar;
                    const note = this.getNoteAtStep(globalStep);
                    const isActivePlayhead = this.playing && this.activeStepIndex === globalStep;

                    let roleClass = 'root';
                    if (note?.chordToneRole === '3rd') roleClass = 'third';
                    else if (note?.chordToneRole === '5th') roleClass = 'fifth';
                    else if (note?.chordToneRole === '7th') roleClass = 'seventh';
                    else if (note?.chordToneRole === 'tension') roleClass = 'tension';
                    if (note?.isClash) roleClass = 'clash';

                    return html`
                      <div
                        class="step-cell ${note ? 'has-note' : ''} ${isActivePlayhead ? 'active-step' : ''}"
                        @click=${() => this.onStepClick(globalStep)}
                        aria-label="Bar ${barIdx + 1}, Step ${stepInBar + 1}: ${note ? note.pitch : 'empty'}"
                      >
                        <span class="step-number">${String(stepInBar + 1).padStart(2, '0')}</span>
                        ${note ? html`
                          <span class="note-badge">${note.pitch}</span>
                          <span class="role-dot ${roleClass}"></span>
                          ${note.durationBeats > 0.5 ? html`<span class="tie-bar"></span>` : ''}
                        ` : ''}
                      </div>
                    `;
                  })}
                </div>
              </div>
            `;
          })}
        </div>

        <!-- Note Blooming Micro-Keyboard Popover -->
        ${this.selectedGlobalStep !== null ? this.renderBloomPopover(moodColor) : ''}
      </div>
    `;
  }

  private renderBloomPopover(moodColor: string) {
    if (this.selectedGlobalStep === null || !this.progression) return '';

    const barIdx = Math.floor(this.selectedGlobalStep / 16);
    const stepInBar = this.selectedGlobalStep % 16;
    const chord = this.progression.chords[barIdx] || this.progression.chords[0];
    const existingNote = this.getNoteAtStep(this.selectedGlobalStep);
    const matrix = getHarmonicChordMatrix(chord, this.progression.key, this.progression.scaleType);

    return html`
      <div class="bloom-overlay" @click=${this.closeBloom}>
        <div class="bloom-popover" @click=${(e: Event) => e.stopPropagation()}>
          <!-- Header -->
          <div class="bloom-header">
            <button class="bloom-nav-btn" @click=${this.onPrevStep}>‹ Prev</button>
            <div class="bloom-center-info">
              <span class="bloom-pitch-title">${existingNote ? existingNote.pitch : 'Select pitch'}</span>
              <span class="bloom-role-label">${existingNote ? existingNote.chordToneRole : `Bar ${barIdx + 1} · Step ${stepInBar + 1}`}</span>
            </div>
            ${existingNote ? html`
              <button class="bloom-clear-btn" @click=${this.onClearCurrentNote}>Clear</button>
            ` : ''}
            <button class="bloom-nav-btn" @click=${this.onNextStep}>Next ›</button>
          </div>

          <!-- Micro Keyboard -->
          <div class="micro-keyboard-wrapper">
            <!-- White Keys -->
            <div class="white-keys-row">
              ${WHITE_KEYS.map(keyName => {
                const midi = noteToMidiNumber(`${keyName}${this.bloomOctave}`);
                const pc = midi % 12;
                const isChordTone = matrix.chordTonePcs.includes(pc);
                const isSelected = existingNote && existingNote.pitch === `${keyName}${this.bloomOctave}`;
                const isDisabled = this.guideMode === 'strict-chord' && !isChordTone && !matrix.tensionPcs.includes(pc);

                return html`
                  <div
                    class="white-key ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}"
                    @click=${() => this.onSelectPitch(keyName)}
                  >
                    ${isChordTone ? html`<span class="key-dot"></span>` : ''}
                    <span class="key-text">${keyName}</span>
                  </div>
                `;
              })}
            </div>

            <!-- Black Keys -->
            ${BLACK_KEYS.map(bKey => {
              const midi = noteToMidiNumber(`${bKey.name}${this.bloomOctave}`);
              const pc = midi % 12;
              const isChordTone = matrix.chordTonePcs.includes(pc);
              const isSelected = existingNote && existingNote.pitch === `${bKey.name}${this.bloomOctave}`;
              const isDisabled = this.guideMode === 'strict-chord' && !isChordTone && !matrix.tensionPcs.includes(pc);

              return html`
                <div
                  class="black-key ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}"
                  style="left: ${bKey.offsetLeftPct}%;"
                  @click=${() => this.onSelectPitch(bKey.name)}
                >
                  ${isChordTone ? html`<span class="key-dot" style="margin-bottom: 2px;"></span>` : ''}
                </div>
              `;
            })}
          </div>

          <!-- Note Duration Stepper -->
          ${existingNote ? html`
            <div class="duration-control">
              <span style="font-size: 11px; font-weight: 700; color: var(--cv-ink-muted);">Duration: ${existingNote.durationBeats} beats</span>
              <div class="duration-stepper">
                <button class="step-btn" @click=${() => this.onChangeNoteDuration(-1)}>−</button>
                <button class="step-btn" @click=${() => this.onChangeNoteDuration(1)}>+</button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}
