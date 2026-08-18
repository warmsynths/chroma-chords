import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ProjectData } from '../services/project-service';
import { SyncStatus, projectStorage } from '../services/project-storage';
import { getMoodColor, displayKeyName, roleForTension } from '../services/chord-engine';
import { rollMascot } from './mascot-character';
import './mascot-character';

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
      padding: 56px 24px;
      background: var(--cv-surface);
      border-radius: 24px;
      border: 1.5px dashed var(--cv-ink-16);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .empty-mascot-wrap {
      margin-bottom: 4px;
    }
    .empty-state-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .empty-state-desc {
      font-size: 14px;
      color: var(--cv-ink-muted);
      max-width: 360px;
      line-height: 1.5;
    }
    .empty-cta-btn {
      margin-top: 8px;
      background: var(--cv-ink);
      color: var(--cv-cream);
      border: none;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .empty-cta-btn:hover {
      transform: scale(1.03);
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
    .card-title-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
      padding-right: 76px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .card-title:hover {
      text-decoration: underline;
      text-decoration-color: var(--cv-ink-30);
    }
    .rename-input {
      font-size: 17px;
      font-weight: 800;
      color: var(--cv-ink);
      font-family: inherit;
      background: #ffffff;
      border: 1.5px solid var(--cv-ink);
      border-radius: 8px;
      padding: 4px 8px;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 0 0 3px rgba(46, 39, 31, 0.08);
    }
    .card-meta {
      font-size: 13px;
      font-weight: 600;
      color: var(--cv-ink-muted);
      margin-bottom: 12px;
    }
    .section-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      flex-shrink: 0;
      margin-bottom: 16px;
    }
    .section-chip {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
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
    .card-actions {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      gap: 2px;
      z-index: 5;
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
      color: var(--cv-ink-35);
      transition: color 0.15s ease, background 0.15s ease;
      touch-action: manipulation;
    }
    .action-btn:hover {
      background: var(--cv-ink-08);
      color: var(--cv-ink);
    }
    .action-btn.delete:hover {
      background: rgba(229, 57, 53, 0.12);
      color: #e53935;
    }
    .delete-confirm-banner {
      background: rgba(229, 57, 53, 0.09);
      border: 1.5px solid rgba(229, 57, 53, 0.28);
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      margin-top: 10px;
      margin-bottom: 4px;
      font-size: 12.5px;
      font-weight: 700;
      color: #c62828;
      animation: cv-banner-in 0.18s ease-out;
    }
    @keyframes cv-banner-in {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .confirm-btn-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .confirm-btn {
      border: none;
      padding: 5px 10px;
      border-radius: 100px;
      font-size: 11.5px;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s ease;
    }
    .confirm-btn.cancel {
      background: var(--cv-surface-2);
      color: var(--cv-ink);
    }
    .confirm-btn.cancel:hover {
      background: var(--cv-ink-14);
    }
    .confirm-btn.delete {
      background: #e53935;
      color: #ffffff;
    }
    .confirm-btn.delete:hover {
      background: #c62828;
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
        <div class="top-bar">
          <button class="back-btn" @click=${this.onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div class="top-bar-actions">
            ${!this.isAuthenticated ? html`
              <button
                class="status-pill status-signin"
                @click=${() => this.dispatchEvent(new CustomEvent('request-login', { bubbles: true, composed: true }))}
                title="Sign in to sync your saved sets across devices"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                </svg>
                Sign in to sync
              </button>
            ` : html`
              ${this.syncStatus === 'syncing' || this.isSyncing ? html`
                <span class="status-pill status-syncing" title="Syncing sets with cloud...">
                  <span class="status-dot"></span>
                  Syncing...
                </span>
              ` : this.syncStatus === 'offline' ? html`
                <span class="status-pill status-offline" title="Working offline. Edits are saved locally and will sync when reconnected.">
                  <span class="status-dot"></span>
                  Offline
                </span>
              ` : html`
                <span class="status-pill status-synced" title="All saved sets are backed up to the cloud">
                  <span class="status-dot"></span>
                  Synced
                </span>
              `}

              <span class="user-badge" title=${this.userEmail || 'Account'}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                ${this.userEmail ? this.userEmail.split('@')[0] : 'Signed in'}
              </span>
              <button class="sign-out-btn" @click=${() => this.dispatchEvent(new CustomEvent('request-logout', { bubbles: true, composed: true }))}>Sign out</button>

              <button
                class="sync-btn"
                @click=${this.onSync}
                ?disabled=${this.isSyncing || this.syncStatus === 'syncing'}
                title="Sync Now"
              >
                <svg class=${this.isSyncing || this.syncStatus === 'syncing' ? 'spin' : ''} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
                ${this.isSyncing || this.syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
              </button>
            `}
          </div>
        </div>
        
        <div class="content">
          <h1>Your saved sets</h1>
          <div class="subcopy">All your progressions, synced and ready to play.</div>

          ${this.projects.length === 0 ? html`
            <div class="empty-state">
              ${this.emptyMascot.show ? html`
                <div class="empty-mascot-wrap">
                  <mascot-character .kind=${this.emptyMascot.kind} .scale=${0.8}></mascot-character>
                </div>
              ` : ''}
              <div class="empty-state-title">No saved sets yet</div>
              <div class="empty-state-desc">When you find a progression you like, tap the bookmark icon on any loop to save it here.</div>
              <button class="empty-cta-btn" @click=${this.onBack}>Start a new loop →</button>
            </div>
          ` : html`
            <div class="grid">
              ${this.projects.map(p => {
                const safeScaleType = p.scaleType || 'MAJOR';
                const safeKey = p.key || 'C';
                const safeBpm = p.bpm || 120;
                const safeName = p.name || 'Untitled Set';
                const safeGenre = p.genre || 'Unknown';
                const safeMood = p.mood || 'Neutral';
                const date = p.lastModified ? new Date(p.lastModified).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date';
                const moodColor = getMoodColor(safeMood);
                const isRenaming = this.renamingId === p.id;
                const isConfirmingDelete = this.confirmDeleteId === p.id;
                
                return html`
                  <div class="card" @click=${() => this.onLoadProject(p.id)}>
                    <div class="color-accent" style="background: ${moodColor}"></div>
                    
                    <div class="card-actions">
                      <button
                        class="action-btn"
                        title="Rename set"
                        aria-label="Rename set"
                        @click=${(e: Event) => this.startRename(e, p.id, safeName)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        class="action-btn delete"
                        title="Delete set"
                        aria-label="Delete set"
                        @click=${(e: Event) => this.askDelete(e, p.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </div>

                    ${isRenaming ? html`
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
                        @blur=${() => this.commitRename(p.id)}
                        @click=${(e: Event) => e.stopPropagation()}
                        autofocus
                      />
                    ` : html`
                      <div class="card-title-row">
                        <div class="card-title" title="Click to rename" @click=${(e: Event) => this.startRename(e, p.id, safeName)}>${safeName}</div>
                      </div>
                    `}

                    <div class="card-meta">${safeGenre} · ${safeMood}</div>
                    
                    <div class="section-chips">
                      ${(p.chords || []).map(c => {
                        const role = roleForTension(c.tension);
                        return html`<div class="section-chip" style="background:${role.color};border-radius:${Math.round(role.radius * 0.35)}px;" title=${c.name}></div>`;
                      })}
                    </div>

                    ${isConfirmingDelete ? html`
                      <div class="delete-confirm-banner" @click=${(e: Event) => e.stopPropagation()}>
                        <span>Delete this set?</span>
                        <div class="confirm-btn-group">
                          <button class="confirm-btn cancel" @click=${(e: Event) => this.cancelDelete(e)}>Cancel</button>
                          <button class="confirm-btn delete" @click=${(e: Event) => this.confirmDelete(e, p.id)}>Delete</button>
                        </div>
                      </div>
                    ` : ''}
                    
                    <div class="card-details">
                      <div class="detail-pill">${displayKeyName(safeKey, safeScaleType)} ${safeScaleType.replace('_', ' ')}</div>
                      <div class="detail-pill">${safeBpm} BPM</div>
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
