import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { projectStorage } from '../services/project-storage';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean }) isAdmin = false;
  @property({ type: Boolean }) isAuthenticated = false;
  @property({ type: String }) userEmail: string | null = null;
  @property({ type: Number }) savedCount = 0;
  @property({ type: String }) syncStatus = 'synced';
  @property({ type: String }) syncError: string | null = null;
  @property({ type: String }) title = 'Chroma Chords';

  @state() private accountMenuOpen = false;

  private unsubscribeProjects: (() => void) | null = null;
  private unsubscribeSyncStatus: (() => void) | null = null;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      position: relative;
      z-index: 50;
      box-sizing: border-box;
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
    }
    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 52px;
      padding: 0 16px;
      background: var(--cv-cream, #FBF3E6);
      border-bottom: 1.5px solid rgba(46, 39, 31, 0.12);
      box-sizing: border-box;
      gap: 12px;
    }
    .header-wrap.compact {
      height: 46px;
      padding: 0 12px;
    }
    .branding {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .brand-title {
      font-family: 'Anton', sans-serif;
      font-size: 20px;
      letter-spacing: 0.04em;
      color: var(--cv-ink, #2E271F);
      text-transform: uppercase;
      line-height: 1;
    }
    .right-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
    }

    .sign-in-btn {
      border: 1.5px solid var(--cv-ink, #2E271F);
      background: transparent;
      color: var(--cv-ink, #2E271F);
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease;
    }
    .sign-in-btn:hover {
      background: var(--cv-ink, #2E271F);
      color: #FBF3E6;
    }

    .account-btn {
      position: relative;
      border: none;
      font-family: inherit;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--cv-plum, #9B7CA8);
      color: #FBF3E6;
      font-size: 13px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 150ms ease;
    }
    .account-btn:hover {
      transform: scale(1.05);
    }
    .account-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-shadow: 0 0 0 2px var(--cv-cream, #FBF3E6);
    }
    .account-badge.offline {
      background: #E07A5F;
    }
    .account-badge.syncing {
      background: #D4A346;
      animation: cv-pulse-dot 1.2s infinite ease-in-out;
    }

    .popover-panel {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      z-index: 100;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 16px;
      box-shadow: 0 16px 36px -12px rgba(46, 39, 31, 0.35);
      animation: cvfv-sheet-up 180ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .panel-close-btn {
      border: none;
      background: transparent;
      font-size: 18px;
      line-height: 1;
      color: rgba(46, 39, 31, 0.5);
      cursor: pointer;
      padding: 0;
      margin-left: auto;
    }

    .account-menu-panel {
      width: 250px;
      padding: 8px;
    }
    .account-header-info {
      padding: 10px 12px 12px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      margin-bottom: 6px;
    }
    .account-email {
      font-size: 13px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sync-status-line {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 5px;
      font-size: 11.5px;
      font-weight: 700;
      color: #6F8F5C;
    }
    .sync-status-line.syncing {
      color: #B27B2B;
    }
    .sync-status-line.offline {
      color: #C0392B;
    }
    .sync-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #7FA968;
      flex-shrink: 0;
    }
    .sync-dot.syncing {
      background: #D4A346;
      animation: cv-pulse-dot 1.2s infinite ease-in-out;
    }
    .sync-dot.offline {
      background: #E07A5F;
    }
    .sync-error-detail {
      margin-top: 4px;
      font-size: 10.5px;
      font-weight: 600;
      color: #C0392B;
      line-height: 1.3;
      word-break: break-word;
    }
    @keyframes cv-pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(0.75); }
    }
    .menu-action-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 10px;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      text-align: left;
      cursor: pointer;
      transition: background 120ms ease;
    }
    .menu-action-btn:hover {
      background: rgba(46, 39, 31, 0.06);
    }
    .menu-action-btn.sign-out {
      color: #8C4035;
    }
    .menu-action-btn.sign-out:hover {
      background: rgba(140, 64, 53, 0.08);
    }
    .saved-badge {
      margin-left: auto;
      font-size: 11px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(46, 39, 31, 0.08);
      color: var(--cv-ink, #2E271F);
    }
    .menu-divider {
      height: 1px;
      background: rgba(46, 39, 31, 0.08);
      margin: 4px 6px;
    }

    @keyframes cvfv-sheet-up {
      from { opacity: 0; transform: translateY(-4px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribeProjects = projectStorage.subscribeProjects(() => {
      this.savedCount = projectStorage.getProjects().length;
      this.requestUpdate();
    });
    this.unsubscribeSyncStatus = projectStorage.subscribeSyncStatus((status) => {
      this.syncStatus = status;
      this.syncError = projectStorage.getLastSyncError();
      this.requestUpdate();
    });
    this.savedCount = projectStorage.getProjects().length;
    this.syncStatus = projectStorage.getSyncStatus();
    this.syncError = projectStorage.getLastSyncError();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribeProjects) this.unsubscribeProjects();
    if (this.unsubscribeSyncStatus) this.unsubscribeSyncStatus();
  }

  private toggleAccountMenu(e: Event) {
    e.stopPropagation();
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  private onSignIn() {
    this.dispatchEvent(new CustomEvent('request-login', { bubbles: true, composed: true }));
  }

  private onSignOut() {
    this.accountMenuOpen = false;
    this.dispatchEvent(new CustomEvent('request-logout', { bubbles: true, composed: true }));
  }

  private onViewSets() {
    this.accountMenuOpen = false;
    this.dispatchEvent(new CustomEvent('view-sets', { bubbles: true, composed: true }));
  }

  private onSyncNow() {
    this.dispatchEvent(new CustomEvent('sync-projects', { bubbles: true, composed: true }));
  }

  private renderSyncStatusText(): string {
    if (this.syncStatus === 'synced') return 'Synced with cloud';
    if (this.syncStatus === 'syncing') return 'Syncing with cloud...';
    if (this.syncStatus === 'offline') return 'Sync failed (offline)';
    return 'Sign in to sync';
  }

  render() {
    const userInitial = this.userEmail ? this.userEmail.charAt(0).toUpperCase() : 'U';

    return html`
      <div class="header-wrap ${this.compact ? 'compact' : ''}">
        <div class="branding" @click=${() => this.dispatchEvent(new CustomEvent('brand-click', { bubbles: true, composed: true }))}>
          <svg width="24" height="24" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <span class="brand-title">${this.title}</span>
        </div>

        <div class="right-actions">
          ${!this.isAuthenticated ? html`
            <button class="sign-in-btn" @click=${this.onSignIn}>Sign in</button>
          ` : html`
            <button class="account-btn" @click=${this.toggleAccountMenu} aria-haspopup="menu" aria-label="Account and saved sets">
              ${userInitial}
              ${this.syncStatus === 'offline' ? html`<span class="account-badge offline" title="Cloud sync offline"></span>` : ''}
              ${this.syncStatus === 'syncing' ? html`<span class="account-badge syncing" title="Syncing..."></span>` : ''}
            </button>
          `}

          ${this.accountMenuOpen ? html`
            <div class="popover-panel account-menu-panel" role="menu">
              <div class="account-header-info">
                <div class="account-email">${this.userEmail || 'Signed in'}</div>
                <div class="sync-status-line ${this.syncStatus}">
                  <span class="sync-dot ${this.syncStatus}"></span>
                  <span>${this.renderSyncStatusText()}</span>
                </div>
                ${this.syncStatus === 'offline' && this.syncError ? html`
                  <div class="sync-error-detail">${this.syncError}</div>
                ` : ''}
              </div>
              <button class="menu-action-btn" role="menuitem" @click=${this.onViewSets}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#8A6B3F" style="flex-shrink:0;"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/></svg>
                <span>Your sets</span>
                <span class="saved-badge">${this.savedCount}</span>
              </button>
              <button class="menu-action-btn" role="menuitem" @click=${this.onSyncNow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6B3F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M20 11a8 8 0 0 0-13.7-5.6L3 8"/><path d="M3 4v4h4"/><path d="M4 13a8 8 0 0 0 13.7 5.6L21 16"/><path d="M21 20v-4h-4"/></svg>
                <span>Sync now</span>
              </button>
              <div class="menu-divider"></div>
              <button class="menu-action-btn sign-out" role="menuitem" @click=${this.onSignOut}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B5F50" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
                <span>Sign out</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
