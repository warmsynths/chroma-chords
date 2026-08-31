import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { projectStorage } from '../services/project-storage';
import { capacityService } from '../services/capacity-service';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean }) hideCapacity = false;
  @property({ type: Boolean }) isAdmin = false;
  @property({ type: Number }) capacityCharges = 4;
  @property({ type: Number }) capacityMax = 4;
  @property({ type: Number }) rechargeNextSec = 60;
  @property({ type: Boolean }) isAuthenticated = false;
  @property({ type: String }) userEmail: string | null = null;
  @property({ type: Number }) savedCount = 0;
  @property({ type: String }) syncStatus = 'synced';
  @property({ type: String }) title = 'Chroma Chords';

  @state() private accountMenuOpen = false;
  @state() private showCapacityNote = false;

  private unsubscribeProjects: (() => void) | null = null;
  private unsubscribeCapacity: (() => void) | null = null;

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
      gap: 12px;
      padding: 16px 24px;
      box-sizing: border-box;
      width: 100%;
    }
    :host([compact]) .header-wrap {
      padding: 12px 16px;
    }
    @media (max-width: 600px) {
      .header-wrap {
        padding: 12px 16px;
      }
    }

    .branding {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
    }
    .brand-title {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.2px;
      color: var(--cv-ink, #2E271F);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      position: relative;
    }

    .sign-in-btn {
      border: none;
      font-family: inherit;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      font-size: 12.5px;
      font-weight: 800;
      padding: 7px 14px;
      border-radius: 100px;
      cursor: pointer;
      transition: background 150ms ease, transform 100ms ease;
    }
    .sign-in-btn:hover {
      background: var(--cv-surface-2, #F1E4CC);
    }
    .sign-in-btn:active {
      transform: scale(0.96);
    }

    .account-btn {
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
      width: 240px;
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
    .sync-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #7FA968;
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
      transition: background 150ms ease;
    }
    .menu-action-btn:hover {
      background: rgba(46, 39, 31, 0.06);
    }
    .saved-badge {
      margin-left: auto;
      background: rgba(138, 107, 63, 0.18);
      color: var(--cv-label, #8A6B3F);
      border-radius: 100px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 800;
    }
    .menu-divider {
      height: 1px;
      background: rgba(46, 39, 31, 0.08);
      margin: 6px 12px;
    }
    .menu-action-btn.sign-out {
      color: var(--cv-ink-muted, #6B5F50);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribeProjects = projectStorage.subscribeProjects(() => {
      this.savedCount = projectStorage.getProjects().length;
      this.syncStatus = projectStorage.getSyncStatus();
      this.requestUpdate();
    });
    this.unsubscribeCapacity = capacityService.subscribe(state => {
      this.capacityCharges = state.charges;
      this.capacityMax = state.max;
      this.rechargeNextSec = state.rechargeNextSec;
      this.requestUpdate();
    });
    this.savedCount = projectStorage.getProjects().length;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribeProjects) this.unsubscribeProjects();
    if (this.unsubscribeCapacity) this.unsubscribeCapacity();
  }

  private toggleCapacityNote(e: Event) {
    e.stopPropagation();
    this.showCapacityNote = !this.showCapacityNote;
    this.accountMenuOpen = false;
  }

  private toggleAccountMenu(e: Event) {
    e.stopPropagation();
    this.accountMenuOpen = !this.accountMenuOpen;
    this.showCapacityNote = false;
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
    this.accountMenuOpen = false;
    this.dispatchEvent(new CustomEvent('sync-projects', { bubbles: true, composed: true }));
  }

  render() {
    const userInitial = (this.userEmail || 'U')[0].toUpperCase();

    return html`
      <div class="header-wrap">
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
            <button class="account-btn" @click=${this.toggleAccountMenu} aria-haspopup="menu" aria-label="Account and saved sets">${userInitial}</button>
          `}

          ${this.accountMenuOpen ? html`
            <div class="popover-panel account-menu-panel" role="menu">
              <div class="account-header-info">
                <div class="account-email">${this.userEmail || 'Signed in'}</div>
                <div class="sync-status-line">
                  <span class="sync-dot"></span>
                  <span>${this.syncStatus === 'synced' ? 'Synced with cloud' : 'Syncing...'}</span>
                </div>
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
