import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ProjectData } from '../services/project-service';
import { SyncStatus, projectStorage } from '../services/project-storage';
import { getMoodColor, displayKeyName, roleForTension } from '../services/chord-engine';
import { rollMascot } from './mascot-character';
import './mascot-character';
import './app-header';

@customElement('sets-screen')
export class SetsScreen extends LitElement {
  @property({ type: Array }) projects: ProjectData[] = [];
  @property({ type: Boolean }) isAuthenticated = false;
  @property({ type: String }) userEmail: string | null = null;
  @property({ type: String }) syncStatus: SyncStatus = 'sign-in';

  @state() private isSyncing = false;
  @state() private renamingId: string | null = null;
  @state() private draftName = '';
  @state() private confirmDeleteId: string | null = null;
  @state() private emptyMascot = rollMascot(0.9);

  private unsubscribeSyncStatus: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribeSyncStatus = projectStorage.subscribeSyncStatus((status) => {
      this.syncStatus = status;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribeSyncStatus) {
      this.unsubscribeSyncStatus();
      this.unsubscribeSyncStatus = null;
    }
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100%;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 36px 24px 60px;
    }
    .top-bar {
      width: 100%;
      max-width: 680px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 12px;
      flex-wrap: wrap;
    }
    .top-bar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      min-height: 38px;
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
    .back-btn:active, .sync-btn:active, .auth-btn:active, .status-pill.status-signin:active {
      transform: scale(0.96);
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.01em;
      border: 1px solid transparent;
      user-select: none;
      min-height: 32px;
      box-sizing: border-box;
      transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    .status-pill.status-synced {
      background: #E8F5E9;
      color: #2E7D32;
      border-color: #C8E6C9;
    }
    .status-pill.status-synced .status-dot {
      background: #43A047;
    }
    .status-pill.status-syncing {
      background: #E3F2FD;
      color: #1565C0;
      border-color: #BBDEFB;
    }
    .status-pill.status-syncing .status-dot {
      background: #1E88E5;
      animation: pulse-dot 1.2s infinite ease-in-out;
    }
    .status-pill.status-offline {
      background: #FFF3E0;
      color: #E65100;
      border-color: #FFE0B2;
    }
    .status-pill.status-offline .status-dot {
      background: #FB8C00;
    }
    .status-pill.status-signin {
      background: var(--cv-surface-2);
      color: var(--cv-ink);
      cursor: pointer;
      border: 1px solid var(--cv-ink-10);
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .status-pill.status-signin:hover {
      background: var(--cv-ink-08);
      transform: translateY(-1px);
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    @keyframes pulse-dot {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.35;
        transform: scale(1.4);
      }
    }
    .auth-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      min-height: 38px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .auth-btn:hover {
      background: var(--cv-ink-08);
    }
    .user-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(46, 39, 31, 0.06);
      padding: 6px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-ink);
      max-width: 170px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sign-out-btn {
      background: none;
      border: none;
      color: var(--cv-ink-muted);
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: underline;
      font-family: inherit;
      padding: 4px 6px;
    }
    .sign-out-btn:hover {
      color: #F2735F;
    }
    .sync-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      min-height: 38px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-label);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease, opacity 0.15s ease;
    }
    .sync-btn:hover:not([disabled]) {
      background: var(--cv-ink-08);
    }
    .sync-btn[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
    .content {
      width: 100%;
      max-width: 640px;
    }
    h1 {
      margin: 22px 0 0 0;
      font-size: 34px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: var(--cv-ink, #2E271F);
    }
    .subcopy {
      font-size: 15px;
      line-height: 1.7;
      color: #6B5F50;
      margin-top: 10px;
      margin-bottom: 30px;
    }
    .empty-state {
      text-align: center;
      padding: 44px 30px;
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      border: 1.5px dashed rgba(46, 39, 31, 0.18);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .empty-mascot-wrap {
      margin-bottom: 4px;
    }
    .empty-state-title {
      font-size: 17px;
      font-weight: 800;
      color: #2E271F;
    }
    .empty-state-desc {
      font-size: 14px;
      line-height: 1.65;
      color: #6B5F50;
      max-width: 340px;
    }
    .empty-cta-btn {
      margin-top: 22px;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border: none;
      padding: 14px 26px;
      border-radius: 100px;
      font-size: 14.5px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .empty-cta-btn:hover {
      transform: scale(1.02);
    }
    .saved-sets-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 30px;
      width: 100%;
    }
    .card {
      background: var(--cv-surface, #F6EADB);
      border-radius: 20px;
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
      box-sizing: border-box;
      transition: transform 150ms var(--cv-ease, cubic-bezier(0.16, 1, 0.3, 1)), box-shadow 150ms ease;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -8px rgba(46, 39, 31, 0.12);
    }
    .swatch-bar {
      width: 100%;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 14px;
      box-sizing: border-box;
    }
    .chip-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.55);
      display: inline-block;
      flex-shrink: 0;
    }
    .card-content-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .card-info {
      min-width: 0;
      flex: 1;
    }
    .card-title {
      font-size: 17px;
      font-weight: 800;
      color: #2E271F;
    }
    .card-meta-line {
      font-size: 13px;
      color: #6B5F50;
      margin-top: 4px;
    }
    .card-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }
    .action-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #6B5F50;
      transition: background 150ms ease;
      touch-action: manipulation;
    }
    .action-btn:hover {
      background: rgba(46, 39, 31, 0.07);
    }
    .action-btn.delete:hover {
      background: rgba(200, 86, 75, 0.12);
      color: #C6564B;
    }
    .rename-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .rename-input {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      padding: 9px 12px;
      border-radius: 10px;
      border: 2px solid rgba(46, 39, 31, 0.15);
      font-size: 14px;
      font-family: inherit;
      background: #ffffff;
      color: #2E271F;
      outline: none;
    }
    .btn-save-rename {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 14px;
      border-radius: 100px;
      background: #2E271F;
      color: #F4EBDB;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-cancel-rename {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 12px;
      border-radius: 100px;
      background: transparent;
      color: #6B5F50;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
    .delete-confirm-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: rgba(200, 86, 75, 0.1);
      border-radius: 14px;
      padding: 12px 14px;
      flex-wrap: wrap;
    }
    .delete-confirm-text {
      font-size: 13px;
      font-weight: 700;
      color: #A64236;
    }
    .delete-confirm-actions {
      display: flex;
      gap: 8px;
    }
    .btn-keep {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 14px;
      border-radius: 100px;
      background: transparent;
      color: #6B5F50;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-delete-confirm {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 16px;
      border-radius: 100px;
      background: #C6564B;
      color: #FBF3E6;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
  `;

  private onBack() {
    this.dispatchEvent(new CustomEvent('back'));
  }

  private onLoadProject(id: string) {
    if (this.renamingId || this.confirmDeleteId) return;
    this.dispatchEvent(new CustomEvent('load-project', { detail: id }));
  }

  private async onSync() {
    if (this.isSyncing || this.syncStatus === 'syncing') return;
    this.isSyncing = true;
    this.dispatchEvent(new CustomEvent('sync-projects', { bubbles: true, composed: true }));
    try {
      await projectStorage.syncWithCloud();
    } catch (e) {
      console.warn('Manual sync error:', e);
    } finally {
      this.isSyncing = false;
    }
  }

  private startRename(e: Event, id: string, name: string) {
    e.stopPropagation();
    this.renamingId = id;
    this.draftName = name;
    this.confirmDeleteId = null;
  }

  private onDraftChange(e: Event) {
    this.draftName = (e.target as HTMLInputElement).value;
  }

  private commitRename(id: string) {
    if (this.renamingId === id) {
      const trimmed = this.draftName.trim();
      if (trimmed) {
        this.dispatchEvent(new CustomEvent('rename-project', { detail: { id, name: trimmed }, bubbles: true, composed: true }));
      }
      this.renamingId = null;
    }
  }

  private cancelRename() {
    this.renamingId = null;
    this.draftName = '';
  }

  private askDelete(e: Event, id: string) {
    e.stopPropagation();
    this.confirmDeleteId = id;
    this.renamingId = null;
  }

  private confirmDelete(e: Event, id: string) {
    e.stopPropagation();
    this.confirmDeleteId = null;
    this.dispatchEvent(new CustomEvent('delete-project', { detail: id, bubbles: true, composed: true }));
  }

  private cancelDelete(e: Event) {
    e.stopPropagation();
    this.confirmDeleteId = null;
  }

  render() {
    return html`
      <div class="frame">
        <div class="content" style="margin-top: 10px;">
          <button class="back-btn" @click=${this.onBack} style="margin-bottom: 20px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <h1>Your saved sets.</h1>
          <div class="subcopy">Tap one to load it back into the progression player.</div>

          ${this.projects.length === 0 ? html`
            <div class="empty-state">
              ${this.emptyMascot.show ? html`
                <div class="empty-mascot-wrap">
                  <mascot-character .kind=${this.emptyMascot.kind} .scale=${0.8}></mascot-character>
                </div>
              ` : ''}
              <div class="empty-state-title">Nothing saved yet.</div>
              <div class="empty-state-desc">Generate a loop you like, then tap the bookmark to keep it here.</div>
              <button class="empty-cta-btn" @click=${this.onBack}>Make one <span>→</span></button>
            </div>
          ` : html`
            <div class="saved-sets-list">
              ${this.projects.map(p => {
                const safeScaleType = p.scaleType || 'MAJOR';
                const safeKey = p.key || 'C';
                const safeName = p.name || 'Untitled Set';
                const safeGenre = p.genre || 'Unknown';
                const safeMood = p.mood || 'Neutral';
                const moodColor = getMoodColor(safeMood);
                const isRenaming = this.renamingId === p.id;
                const isConfirmingDelete = this.confirmDeleteId === p.id;
                const chordCount = (p.chords && p.chords.length) ? p.chords.length : 4;
                const metaLine = `${safeGenre} · ${safeMood} · ${chordCount} bars`;

                return html`
                  <div class="card" @click=${() => this.onLoadProject(p.id)}>
                    <div class="swatch-bar" style="background: ${moodColor};">
                      ${(p.chords && p.chords.length ? p.chords : [{ tension: 0 }, { tension: 1 }, { tension: 2 }, { tension: 3 }]).map((c: any) => {
                        const tension = typeof c === 'object' && c !== null ? (c.tension ?? 0) : 0;
                        const role = roleForTension(tension);
                        const color = role?.color || 'rgba(46, 39, 31, 0.55)';
                        const name = typeof c === 'object' && c !== null ? (c.name || '') : '';
                        return html`<span class="chip-dot" style="background: ${color};" title=${name}></span>`;
                      })}
                    </div>

                    <div class="card-content-row">
                      <div class="card-info">
                        ${isRenaming ? html`
                          <div class="rename-row">
                            <input
                              class="rename-input"
                              .value=${this.draftName}
                              @input=${this.onDraftChange}
                              @keydown=${(e: KeyboardEvent) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  this.commitRename(p.id);
                                } else if (e.key === 'Escape') {
                                  e.preventDefault();
                                  this.cancelRename();
                                }
                              }}
                              @click=${(e: Event) => e.stopPropagation()}
                              autofocus
                            />
                            <button class="btn-save-rename" @click=${(e: Event) => { e.stopPropagation(); this.commitRename(p.id); }}>Save</button>
                            <button class="btn-cancel-rename" @click=${(e: Event) => { e.stopPropagation(); this.cancelRename(); }}>Cancel</button>
                          </div>
                        ` : html`
                          <div class="card-title">${safeName}</div>
                        `}
                        <div class="card-meta-line">${metaLine}</div>
                      </div>

                      <div class="card-actions">
                        <button
                          class="action-btn"
                          title="Rename set"
                          aria-label="Rename set"
                          @click=${(e: Event) => this.startRename(e, p.id, safeName)}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B5F50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>
                          </svg>
                        </button>
                        <button
                          class="action-btn delete"
                          title="Delete set"
                          aria-label="Delete set"
                          @click=${(e: Event) => this.askDelete(e, p.id)}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B5F50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    ${isConfirmingDelete ? html`
                      <div class="delete-confirm-banner" @click=${(e: Event) => e.stopPropagation()}>
                        <div class="delete-confirm-text">Delete this set for good?</div>
                        <div class="delete-confirm-actions">
                          <button class="btn-keep" @click=${(e: Event) => this.cancelDelete(e)}>Keep</button>
                          <button class="btn-delete-confirm" @click=${(e: Event) => this.confirmDelete(e, p.id)}>Delete</button>
                        </div>
                      </div>
                    ` : ''}
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
