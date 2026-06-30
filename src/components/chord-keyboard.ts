import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Note definitions for visual rendering
const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_KEYS = [
  { name: 'C#', offset: 1 },
  { name: 'D#', offset: 2 },
  { name: 'F#', offset: 4 },
  { name: 'G#', offset: 5 },
  { name: 'A#', offset: 6 }
];

const NOTE_TO_MIDI: Record<string, number> = {
  'C': 60, 'C#': 61, 'Db': 61, 'Cx': 62, 'D': 62, 'D#': 63, 'Eb': 63, 'Dx': 64, 'E': 64, 'E#': 65, 'F': 65, 'F#': 66, 'Gb': 66, 'Fx': 67, 'G': 67, 'G#': 68, 'Ab': 68, 'Gx': 69, 'A': 69, 'A#': 70, 'Bb': 70, 'Ax': 71, 'B': 71, 'B#': 72
};

@customElement('chord-keyboard')
export class ChordKeyboard extends LitElement {
  @property({ type: Array }) activeNotes: (string | number)[] = [];
  @property({ type: String }) rootNoteName: string = '';
  @property({ type: Number }) windowStart = -1;
  @property({ type: Number }) windowSize = 0;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    
    .keyboard-container {
      position: relative;
      width: 100%;
      height: 140px;
      background: var(--bg-card);
      border-radius: 8px;
      border: none;
      padding: 8px;
      box-shadow: var(--neu-pressed);
      box-sizing: border-box;
    }
    
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    
    .white-key {
      fill: #fbf4f0;
      stroke: #736b5c;
      stroke-width: 1;
      rx: 2px;
      transition: fill 0.2s ease, transform 0.1s ease;
    }
    
    .white-key:hover {
      fill: #f5ece5;
    }
    
    .white-key.active {
      fill: url(#white-active-grad);
      stroke: #ab8b61;
    }
    
    .white-key.active.root-key {
      fill: url(#root-active-grad);
      stroke: #c25233;
    }
    
    .black-key {
      fill: #1e1915;
      stroke: #0a0805;
      stroke-width: 1;
      rx: 1px;
      transition: fill 0.2s ease, transform 0.1s ease;
    }
    
    .black-key:hover {
      fill: #2d2620;
    }
    
    .black-key.active {
      fill: url(#black-active-grad);
      stroke: #ab8b61;
    }
    
    .black-key.active.root-key {
      fill: url(#root-active-grad);
      stroke: #c25233;
    }
  `;

  private normalizeNoteName(note: string): string {
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

  private getActiveMidiNumbers(): number[] {
    if (!this.activeNotes || !this.activeNotes.length) return [];
    
    return this.activeNotes.map(note => {
      if (typeof note === 'number') {
        return note;
      }
      const baseMidi = NOTE_TO_MIDI[note.trim()] || 60;
      return baseMidi;
    });
  }

  private isMidiActive(keyMidi: number): boolean {
    const activeMidis = this.getActiveMidiNumbers();
    return activeMidis.includes(keyMidi);
  }

  private isMidiRoot(keyMidi: number): boolean {
    if (!this.rootNoteName) return false;
    const keyName = this.getNoteNameFromMidi(keyMidi);
    const normKey = this.normalizeNoteName(keyName);
    const normRoot = this.normalizeNoteName(this.rootNoteName);
    return normKey === normRoot;
  }

  render() {
    const totalWhiteKeys = 28; // 4 octaves C2 - B5
    const keyWidth = 100 / totalWhiteKeys;
    
    const whiteKeys = [];
    const blackKeys = [];
    
    let highlightMinX = 100;
    let highlightMaxX = 0;
    
    // Draw white keys
    for (let i = 0; i < totalWhiteKeys; i++) {
      const octave = Math.floor(i / 7);
      const keyName = WHITE_KEYS[i % 7];
      const whiteKeyOffsets = [0, 2, 4, 5, 7, 9, 11];
      const keyMidi = 36 + (octave * 12) + whiteKeyOffsets[i % 7];
      
      const isActive = this.isMidiActive(keyMidi);
      const isRoot = isActive && this.isMidiRoot(keyMidi);
      
      const keyX = i * keyWidth;
      const keyW = keyWidth - 0.3;
      
      if (this.windowStart !== -1 && keyMidi >= this.windowStart && keyMidi < this.windowStart + this.windowSize) {
        highlightMinX = Math.min(highlightMinX, keyX);
        highlightMaxX = Math.max(highlightMaxX, keyX + keyWidth);
      }
      
      whiteKeys.push(svg`
        <g>
          <rect
            class="white-key ${isActive ? 'active' : ''} ${isRoot ? 'root-key' : ''}"
            x="${keyX}%"
            y="0"
            width="${keyW}%"
            height="100%"
          />
          <text
            x="${(i + 0.5) * keyWidth}%"
            y="90%"
            text-anchor="middle"
            fill="${isRoot ? '#c25233' : (isActive ? '#ab8b61' : '#736b5c')}"
            font-size="7px"
            font-weight="700"
            font-family="var(--font-mono)"
            style="pointer-events: none; user-select: none;"
          >
            ${keyName}${isRoot ? 'R' : ''}
          </text>
        </g>
      `);
    }
    
    // Draw black keys (overlayed)
    for (let octave = 0; octave < 4; octave++) {
      const baseIndex = octave * 7;
      for (const bk of BLACK_KEYS) {
        const keyIndex = baseIndex + bk.offset;
        const blackKeyOffsets: Record<string, number> = {
          'C#': 1, 'D#': 3, 'F#': 6, 'G#': 8, 'A#': 10
        };
        const keyMidi = 36 + (octave * 12) + blackKeyOffsets[bk.name];
        
        const isActive = this.isMidiActive(keyMidi);
        const isRoot = isActive && this.isMidiRoot(keyMidi);
        const xPos = (keyIndex * keyWidth) - (keyWidth * 0.3);
        const kw = keyWidth * 0.6;
        
        if (this.windowStart !== -1 && keyMidi >= this.windowStart && keyMidi < this.windowStart + this.windowSize) {
          highlightMinX = Math.min(highlightMinX, xPos);
          highlightMaxX = Math.max(highlightMaxX, xPos + kw);
        }
        
        blackKeys.push(svg`
          <g>
            <rect
               class="black-key ${isActive ? 'active' : ''} ${isRoot ? 'root-key' : ''}"
              x="${xPos}%"
              y="0"
              width="${kw}%"
              height="60%"
            />
            ${isActive ? svg`
              <text
                x="${xPos + (kw * 0.5)}%"
                y="45%"
                text-anchor="middle"
                fill="${isRoot ? '#fbf4f0' : '#d5cdba'}"
                font-size="6px"
                font-weight="700"
                font-family="var(--font-mono)"
                style="pointer-events: none; user-select: none;"
              >
                ${bk.name.replace('#', '♯')}${isRoot ? 'R' : ''}
              </text>
            ` : ''}
          </g>
        `);
      }
    }

    return html`
      <div class="keyboard-container">
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <!-- White Active Gradient (Ochre/Gold) -->
            <linearGradient id="white-active-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fbf4f0" />
              <stop offset="100%" stop-color="#ab8b61" />
            </linearGradient>
            
            <!-- Black Active Gradient (Terracotta Red) -->
            <linearGradient id="black-active-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#c25233" />
              <stop offset="100%" stop-color="#87291c" />
            </linearGradient>

            <!-- Root Active Gradient (Bright Terracotta) -->
            <linearGradient id="root-active-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#e05c35" />
              <stop offset="100%" stop-color="#c25233" />
            </linearGradient>
          </defs>
          
          <!-- White Keys -->
          <g>${whiteKeys}</g>
          
          <!-- Highlight Overlay -->
          ${this.windowStart !== -1 && highlightMaxX > highlightMinX ? svg`
            <rect 
              x="${highlightMinX}%" y="0" 
              width="${highlightMaxX - highlightMinX}%" height="100%" 
              fill="rgba(171, 139, 97, 0.12)" 
              stroke="var(--accent-gold)" stroke-width="1.5" 
              rx="2px"
              style="pointer-events: none;"
            />
          ` : ''}
          
          <!-- Black Keys Overlay -->
          <g>${blackKeys}</g>
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chord-keyboard': ChordKeyboard;
  }
}

