import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface NextChordOption {
  name: string;
  description: string;
  tension: string;
  vibe: 'tonic-major' | 'tonic-minor' | 'subdominant' | 'dominant' | 'modal-interchange';
  nodeId: string;
  targetChordId: string;
}

const VIBE_MAP: Record<string, { label: string; emoji: string; class: string }> = {
  'MAJOR': { label: 'Sunlit Harbor', emoji: '☀️', class: 'vibe-major' },
  'MIXOLYDIAN': { label: 'The Warm Current', emoji: '🌊', class: 'vibe-mixolydian' },
  'DORIAN': { label: 'The Twilight Hour', emoji: '🌆', class: 'vibe-dorian' },
  'LYDIAN': { label: 'The Floating Mist', emoji: '🌫️', class: 'vibe-lydian' },
  'NATURAL MINOR': { label: 'Clear Night', emoji: '🌌', class: 'vibe-natural-minor' },
  'HARMONIC MINOR': { label: 'The Storm', emoji: '⛈️', class: 'vibe-harmonic-minor' },
  'MELODIC MINOR': { label: 'Mystic Sea', emoji: '✨', class: 'vibe-melodic-minor' }
};

@customElement('next-options-table')
export class NextOptionsTable extends LitElement {
  @property({ type: Array }) options: NextChordOption[] = [];
  @property({ type: Boolean }) compactMode = false;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      box-sizing: border-box;
      padding-bottom: 40px;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    
    .options-header {
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .option-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      background: var(--bg-card);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: var(--neu-flat);
      transition: all 0.25s ease;
      height: 100%;
      box-sizing: border-box;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      margin-top: auto;
    }
    
    .option-card:hover {
      box-shadow: var(--neu-flat-sm);
    }
    
    .chord-pill-container {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .chord-pill {
      font-size: 0.95rem;
      font-weight: 700;
      font-family: var(--font-heading);
      padding: 8px 14px;
      border-radius: 6px;
      background: linear-gradient(180deg, #1f1b18 0%, #12100e 100%);
      border: 1px solid #2d2621;
      color: var(--text-secondary);
      min-width: 72px;
      text-align: center;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.6);
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
    
    :host-context(.light-theme) .chord-pill {
      background: linear-gradient(180deg, #fbfaf7 0%, #dedad0 100%);
      border: 1px solid #c8c2b7;
      color: var(--text-primary);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.08);
    }

    /* Class-specific vibe highlights on hover (backlit hardware switch style) */
    .option-card.vibe-major:hover .chord-pill { 
      background: linear-gradient(180deg, #c2a173 0%, #ab8b61 100%); 
      color: #171513; 
      border-color: #d9b88c;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(171, 139, 97, 0.6);
    }

    .option-card.vibe-natural-minor:hover .chord-pill { 
      background: linear-gradient(180deg, #e3dac9 0%, #c4baa7 100%); 
      color: #171513; 
      border-color: #eadecc;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 0 8px rgba(213, 205, 186, 0.6);
    }

    .option-card.vibe-mixolydian:hover .chord-pill { 
      background: linear-gradient(180deg, #4f9da6 0%, #31707d 100%); 
      color: #ffffff; 
      border-color: #63b2bd;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(79, 157, 166, 0.6);
    }

    .option-card.vibe-dorian:hover .chord-pill { 
      background: linear-gradient(180deg, #7a66cc 0%, #5945a8 100%); 
      color: #ffffff; 
      border-color: #9884e8;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(122, 102, 204, 0.6);
    }

    .option-card.vibe-lydian:hover .chord-pill { 
      background: linear-gradient(180deg, #9bbecf 0%, #7da2b5 100%); 
      color: #171513; 
      border-color: #b4d4e6;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 0 8px rgba(155, 190, 207, 0.6);
    }

    .option-card.vibe-harmonic-minor:hover .chord-pill { 
      background: linear-gradient(180deg, #a83d2e 0%, #87291c 100%); 
      color: #ffffff; 
      border-color: #c25244;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(135, 41, 28, 0.6);
    }

    .option-card.vibe-melodic-minor:hover .chord-pill { 
      background: linear-gradient(180deg, #4a9b75 0%, #337254 100%); 
      color: #ffffff; 
      border-color: #60c196;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 8px rgba(74, 155, 117, 0.6);
    }
    
    .btn-preview {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(180deg, #1f1b18 0%, #12100e 100%);
      border: 1px solid #2d2621;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-secondary);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.6);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-preview:hover {
      color: var(--text-primary);
      background: linear-gradient(180deg, #2d2621 0%, #1f1b18 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.4);
      transform: translateY(0.5px);
    }

    .btn-preview:active {
      background: #110f0d;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.8);
      transform: translateY(1.5px);
    }
    
    :host-context(.light-theme) .btn-preview {
      background: linear-gradient(180deg, #fbfaf7 0%, #dedad0 100%);
      border: 1px solid #c8c2b7;
      color: var(--text-secondary);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.08);
    }

    :host-context(.light-theme) .btn-preview:hover {
      color: var(--text-primary);
      background: linear-gradient(180deg, #dedad0 0%, #c8c2b7 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.1);
    }

    :host-context(.light-theme) .btn-preview:active {
      background: #dedad0;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
    }
    
    .btn-preview svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
    }
    
    .desc-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .desc-text {
      font-size: 0.85rem;
      line-height: 1.4;
      color: var(--text-secondary);
    }
    
    .meta-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 2px;
    }
    
    .meta-label {
      font-size: 0.7rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    
    .tag-section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }
    
    /* Tension Dots rendering */
    .tension-dots {
      display: flex;
      gap: 4px;
    }
    
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--border-color);
    }
    
    .dot.t1-fill { background: var(--tension-1); }
    .dot.t2-fill { background: var(--tension-2); }
    .dot.t3-fill { background: var(--tension-3); }
    .dot.t4-fill { 
      background: var(--tension-4); 
      animation: pulse-dot 1.5s infinite;
    }
    
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }
    
    .mood-badge {
      font-size: 0.7rem;
      font-weight: 700;
      font-family: var(--font-heading);
      padding: 4px 10px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.25s ease;
    }

    .mood-badge.large-mode {
      font-size: 1.1rem;
      padding: 8px 16px;
      border-radius: 8px;
      margin-top: 4px;
    }

    .mood-badge.large-mode .emoji-icon {
      font-size: 1.5rem;
    }
    
    .vibe-major { background: var(--bg-card); color: var(--accent-gold); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-natural-minor { background: var(--bg-card); color: var(--text-secondary); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-mixolydian { background: var(--bg-card); color: var(--accent-cyan); border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-dorian { background: var(--bg-card); color: #a892ee; border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-lydian { background: var(--bg-card); color: #b3d3e6; border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-harmonic-minor { background: var(--bg-card); color: #c25244; border: none; box-shadow: var(--neu-pressed-sm); }
    .vibe-melodic-minor { background: var(--bg-card); color: #60bb92; border: none; box-shadow: var(--neu-pressed-sm); }
    
    .tension-lbl {
      font-size: 0.65rem;
      color: var(--text-muted);
      font-weight: 700;
    }

    @media (max-width: 600px) {
      .cards-grid {
        grid-template-columns: 1fr;
      }
      .option-card {
        padding: 12px;
      }
      .tag-section {
        display: none;
      }
      
      /* Compact mode horizontal layout for mobile */
      .is-compact .option-card {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        height: auto;
      }
      
      .is-compact .card-header {
        width: auto;
      }
      
      .is-compact .desc-section {
        display: none;
      }
      
      .is-compact .card-footer {
        width: auto;
        margin-top: 0;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
      }
      
      .is-compact .mood-badge.large-mode {
        font-size: 0.75rem;
        padding: 4px 8px;
        margin-top: 0;
      }
      
      .is-compact .mood-badge.large-mode .emoji-icon {
        font-size: 1rem;
      }
      .mood-badge.large-mode {
        font-size: 0.95rem;
        padding: 6px 10px;
        gap: 4px;
        min-width: 0;
        max-width: 100%;
      }
      .mood-badge.large-mode .emoji-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }
      .desc-section, .meta-row {
        min-width: 0;
      }
      .mood-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `;

  private getVibeConfig(vibeKey: string) {
    return VIBE_MAP[vibeKey] || { label: 'Unknown Vibe', emoji: '❓', class: 'vibe-tonic-major' };
  }

  private handleOptionSelect(option: NextChordOption) {
    this.dispatchEvent(new CustomEvent('select-next-chord', {
      detail: { option },
      bubbles: true,
      composed: true
    }));
  }

  private handlePreviewClick(e: Event, option: NextChordOption) {
    e.stopPropagation(); // Avoid triggering page jump
    this.dispatchEvent(new CustomEvent('preview-chord-name', {
      detail: { name: option.name },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="options-container ${this.compactMode ? 'is-compact' : ''}">
        <div class="options-header">
          <span>Next Transition Options</span>
          <span style="font-size: 0.7rem; font-weight: 400; text-transform: none;">Click card to transition</span>
        </div>
        
        <div class="cards-grid">
          ${this.options.map(opt => {
      const vibe = this.getVibeConfig(opt.vibe);
      const tensionPct = parseInt(opt.tension) || 50;
      const tensionNum = Math.min(4, Math.max(1, Math.ceil(tensionPct / 25)));
      const dots = [];

      for (let i = 1; i <= 4; i++) {
        const isActive = i <= tensionNum;
        dots.push(html`
              <span class="dot ${isActive ? `t${tensionNum}-fill` : ''}"></span>
            `);
      }

      return html`
            <div class="option-card ${vibe.class}" @click="${() => this.handleOptionSelect(opt)}">
              <div class="card-header">
                <div class="chord-pill-container">
                  <div class="chord-pill">${opt.name}</div>
                </div>
                <div class="tag-section">
                  <div class="tension-dots">
                    ${dots}
                  </div>
                  <span class="tension-lbl">${opt.tension}</span>
                </div>
              </div>
              
              <div class="desc-section">
                ${!this.compactMode ? html`<div class="desc-text">${opt.description}</div>` : ''}
              </div>
              
              <div class="card-footer">
                <div class="meta-row" style="margin-top: 0;">
                  <span class="mood-badge ${vibe.class} ${this.compactMode ? 'large-mode' : ''}">
                    <span class="emoji-icon">${vibe.emoji}</span> 
                    <span class="mood-text">${vibe.label}</span>
                  </span>
                </div>
                <button class="btn-preview" @click="${(e: Event) => this.handlePreviewClick(e, opt)}" title="Preview Sound">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </button>
              </div>
            </div>
          `;
    })}
        </div>
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'next-options-table': NextOptionsTable;
  }
}
