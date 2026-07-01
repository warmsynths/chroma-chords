import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const NOTE_TO_MIDI: Record<string, number> = {
  'C': 60, 'C#': 61, 'Db': 61, 'Cx': 62, 'D': 62, 'D#': 63, 'Eb': 63, 'Dx': 64, 'E': 64, 'E#': 65, 'F': 65, 'F#': 66, 'Gb': 66, 'Fx': 67, 'G': 67, 'G#': 68, 'Ab': 68, 'Gx': 69, 'A': 69, 'A#': 70, 'Bb': 70, 'Ax': 71, 'B': 71, 'B#': 72
};

@customElement('chord-profile-card')
export class ChordProfileCard extends LitElement {
  @property({ type: String }) header = '';
  @property({ type: String }) chordName = '';
  @property({ type: String }) chordNotes = '';
  @property({ type: String }) scale = '';
  @property({ type: String }) functionText = '';
  @property({ type: Array }) voicingsListed: string[] = [];
  @property({ type: Boolean }) compactMode = false;
  @property({ type: String }) extension: 'triad' | '7th' | '9th' | '6th' = '7th';

  @property({ type: Number }) windowStartMidi = 60; // default to C4
  private orchidWindowSize = 13; // 13 keys window

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
    }
    
    .profile-card {
      padding: 24px;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .profile-card.compact {
      padding: 16px 20px;
      gap: 12px;
    }
    
    .card-header {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    
    .title-area {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
    }

    .chord-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .chord-name-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chord-notes-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-card);
      padding: 6px 12px;
      border-radius: 8px;
      box-shadow: var(--neu-pressed-sm);
    }

    .chord-notes-label {
      font-size: 0.65rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .chord-notes-value {
      font-size: 0.95rem;
      font-family: var(--font-mono);
      font-weight: 600;
      color: var(--accent-cyan);
      letter-spacing: 0.05em;
    }
    
    .header-pill {
      font-size: 0.75rem;
      font-weight: 700;
      font-family: var(--font-heading);
      padding: 6px 12px;
      border-radius: 6px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: var(--bg-card);
      border: none;
      color: var(--text-secondary);
      box-shadow: var(--neu-pressed-sm);
      transition: all 0.3s ease;
    }
    
    /* Dynamically style header badges based on harmonic functions */
    .header-tonic { color: var(--accent-gold); }
    .header-dominant { color: var(--accent-terracotta); }
    .header-subdominant { color: var(--bg-card); background: var(--accent-gold); box-shadow: var(--neu-flat-sm); }
    
    .chord-info {
      margin-top: -5px;
    }
    
    .chord-title {
      font-size: 2.5rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
      line-height: 1.1;
      letter-spacing: -0.03em;
    }
    
    .profile-card.compact .chord-title {
      font-size: 1.8rem;
    }
    
    .scale-text {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
      margin-top: 4px;
      letter-spacing: 0.02em;
    }
    
    .profile-card.compact .title-area {
      gap: 8px;
    }

    .profile-card.compact .chord-notes-badge {
      padding: 4px 8px;
      border-radius: 6px;
    }
    
    .function-box {
      background: var(--bg-card);
      border-left: 3px solid var(--accent-terracotta);
      border-top: none;
      border-right: none;
      border-bottom: none;
      padding: 14px 18px;
      border-radius: 8px;
      box-shadow: var(--neu-pressed-sm);
      font-size: 0.85rem;
      line-height: 1.5;
      color: var(--text-secondary);
      font-family: var(--font-body);
      font-style: italic;
    }
    
    @media (max-width: 768px) {
      .chord-title-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  `;

  updated(changedProperties: Map<string, any>) {
    // We no longer need to auto-select a voicing string since it's controlled by the slider.
  }

  private normalizeNote(note: string): string {
    const map: Record<string, string> = {
      'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
      'db': 'C#', 'eb': 'D#', 'gb': 'F#', 'ab': 'G#', 'bb': 'A#'
    };
    return map[note] || note;
  }

  private getNoteNameFromMidi(midi: number): string {
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return names[midi % 12];
  }

  private getVoicedMidiNotes(): number[] {
    const baseNotes = this.chordNotes ? this.chordNotes.split(' ') : [];
    if (!baseNotes.length) return [];

    const rootMidi = NOTE_TO_MIDI[baseNotes[0]] || 60;
    const rootPc = rootMidi % 12;

    let relativePcs = baseNotes.map(n => ((NOTE_TO_MIDI[n] || 60) - rootMidi + 24) % 12);

    const hasSeventh = relativePcs.some(pc => pc >= 9);
    const isDiminished = relativePcs.includes(3) && relativePcs.includes(6);
    const isAugmented = relativePcs.includes(4) && relativePcs.includes(8);
    const isMinor = relativePcs.includes(3) && !isDiminished;
    const isMajor = relativePcs.includes(4) && !isAugmented;

    let modifiedPcs: number[] = [];

    if (this.extension === 'triad') {
      modifiedPcs = relativePcs.filter(pc => pc < 9);
    } else if (this.extension === '7th') {
      modifiedPcs = [...relativePcs];
      if (!hasSeventh) {
        if (isDiminished) modifiedPcs.push(9);
        else if (isMinor) modifiedPcs.push(10);
        else if (isMajor) modifiedPcs.push(11);
        else if (isAugmented) modifiedPcs.push(10);
        else modifiedPcs.push(10);
      }
    } else if (this.extension === '9th') {
      modifiedPcs = [...relativePcs];
      if (!hasSeventh) {
        if (isDiminished) modifiedPcs.push(9);
        else if (isMinor) modifiedPcs.push(10);
        else if (isMajor) modifiedPcs.push(11);
        else if (isAugmented) modifiedPcs.push(10);
        else modifiedPcs.push(10);
      }
      if (!modifiedPcs.includes(2)) {
        modifiedPcs.push(2);
      }
    } else if (this.extension === '6th') {
      modifiedPcs = relativePcs.filter(pc => pc < 9);
      if (!modifiedPcs.includes(9)) {
        modifiedPcs.push(9);
      }
    }

    const midiNotes: number[] = [];
    for (const pc of modifiedPcs) {
      const absPc = (rootPc + pc) % 12;
      let targetMidi = absPc;
      while (targetMidi < this.windowStartMidi) {
        targetMidi += 12;
      }
      while (targetMidi < this.windowStartMidi + this.orchidWindowSize) {
        if (!midiNotes.includes(targetMidi)) {
          midiNotes.push(targetMidi);
        }
        targetMidi += 12;
      }
    }

    return midiNotes.sort((a, b) => a - b);
  }

  private getHeaderClass(): string {
    const h = this.header.toUpperCase();
    if (h.includes('TONIC')) return 'header-tonic';
    if (h.includes('DOMINANT')) return 'header-dominant';
    if (h.includes('SUBDOMINANT') || h.includes('SUPERTONIC') || h.includes('LEADING')) return 'header-subdominant';
    return '';
  }

  private handlePlayClick() {
    this.dispatchEvent(new CustomEvent('play-chord', {
      detail: { notes: this.getVoicedMidiNotes() },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const baseNotes = this.chordNotes ? this.chordNotes.split(' ') : [];
    const rootName = baseNotes[0] || '';
    const voicedMidiNotes = this.getVoicedMidiNotes();
    const voicedNotesNames = voicedMidiNotes.map(m => this.getNoteNameFromMidi(m)).join(' ');

    return html`
      <div class="profile-card ${this.compactMode ? 'compact' : ''}">
        <!-- Card Header with title, pill tag and Notes Set inline -->
        <div class="card-header">
          <div class="title-area">
            <div class="chord-title-row">
              <div class="chord-name-group">
                <div class="chord-title">${this.chordName || '...'}</div>
                <span class="header-pill ${this.getHeaderClass()}">${this.header || 'Chord Profile'}</span>
              </div>
              <div class="chord-notes-badge">
                <span class="chord-notes-label">Notes Set</span>
                <span class="chord-notes-value">${voicedNotesNames || '-'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Scale context (hidden in compactMode) -->
        ${!this.compactMode ? html`
          <div class="chord-info" style="margin-top: -10px;">
            <div class="scale-text">${this.scale || 'Chord Scale Context'}</div>
          </div>
        ` : ''}
        
        <!-- Functional description (hidden in compactMode) -->
        ${!this.compactMode ? html`
          <div class="function-box">
            ${this.functionText ? this.functionText.replace('FUNCTION:', '').trim() : 'Select a starting key to load chord descriptions.'}
          </div>
        ` : ''}
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'chord-profile-card': ChordProfileCard;
  }
}
