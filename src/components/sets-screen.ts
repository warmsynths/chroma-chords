import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProjectData } from '../services/project-service';
import { getMoodColor, displayKeyName } from '../services/chord-engine';

@customElement('sets-screen')
export class SetsScreen extends LitElement {
  @property({ type: Array }) projects: ProjectData[] = [];

  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100dvh;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 36px 24px 40px;
    }
    .top-bar {
      width: 100%;
      max-width: 680px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-label);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .back-btn:hover {
      background: var(--cv-ink-08);
    }
    .back-btn:active {
      transform: scale(0.96);
    }
    .content {
      width: 100%;
      max-width: 680px;
    }
    h1 {
      margin: 0;
      font-size: clamp(26px, 5vw, 36px);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 15px;
      color: var(--cv-ink-muted);
      margin-top: 8px;
      margin-bottom: 32px;
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      background: var(--cv-surface);
      border-radius: 24px;
      border: 1.5px dashed var(--cv-ink-16);
    }
    .empty-state-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-bottom: 8px;
    }
    .empty-state-desc {
      font-size: 14px;
      color: var(--cv-ink-muted);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .card {
      background: var(--cv-surface);
      border: 1.5px solid var(--cv-ink-10);
      border-radius: 20px;
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 24px -10px rgba(46, 39, 31, 0.15);
      border-color: var(--cv-ink-16);
    }
    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-meta {
      font-size: 13px;
      font-weight: 600;
      color: var(--cv-ink-muted);
      margin-bottom: 16px;
    }
    .card-details {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
    }
    .detail-pill {
      background: var(--cv-surface-2);
      padding: 4px 10px;
      border-radius: 100px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-55);
    }
    .color-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
    }
    .delete-btn {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--cv-ink-30);
      transition: color 0.2s ease, background 0.2s ease;
    }
    .delete-btn:hover {
      background: rgba(229, 57, 53, 0.1);
      color: #e53935;
    }
  `;

  private onBack() {
    this.dispatchEvent(new CustomEvent('back'));
  }

  private onLoadProject(id: string) {
    this.dispatchEvent(new CustomEvent('load-project', { detail: id }));
  }

  private onDeleteProject(e: Event, id: string) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('delete-project', { detail: id }));
  }

  render() {
    return html`
      <div class="frame">
        <div class="top-bar">
          <button class="back-btn" @click=${this.onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        
        <div class="content">
          <h1>Your saved sets</h1>
          <div class="subcopy">All your progressions, synced and ready to play.</div>

          ${this.projects.length === 0 ? html`
            <div class="empty-state">
              <div class="empty-state-title">No sets saved yet</div>
              <div class="empty-state-desc">When you find a progression you like, click the bookmark icon to save it here.</div>
            </div>
          ` : html`
            <div class="grid">
              ${this.projects.map(p => {
                const date = new Date(p.lastModified).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                const moodColor = getMoodColor(p.mood);
                
                return html`
                  <div class="card" @click=${() => this.onLoadProject(p.id)}>
                    <div class="color-accent" style="background: ${moodColor}"></div>
                    <div class="card-title" title=${p.name}>${p.name}</div>
                    <div class="card-meta">${p.genre} · ${p.mood}</div>
                    
                    <button class="delete-btn" title="Delete set" @click=${(e: Event) => this.onDeleteProject(e, p.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                      </svg>
                    </button>
                    
                    <div class="card-details">
                      <div class="detail-pill">${displayKeyName(p.key, p.scaleType)} ${p.scaleType.replace('_', ' ')}</div>
                      <div class="detail-pill">${p.bpm} BPM</div>
                      <div class="detail-pill">${date}</div>
                    </div>
                  </div>
                `;
              })}
            </div>
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sets-screen': SetsScreen;
  }
}
