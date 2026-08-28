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
    }
    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 24px 36px 8px;
      box-sizing: border-box;
    }
    :host([compact]) .header-wrap {
      padding: 16px 16px 6px;
    }
    @media (max-width: 600px) {
      .header-wrap {
        padding: 16px 16px 6px;
      }
    }

    .branding {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
    }
    .brand-title {
      font-size: 15.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      color: #2E271F;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host([compact]) .brand-title,
    @media (max-width: 600px) {
      .brand-title {
        font-size: 13.5px;
      }
    }

    .actions-group {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .capacity-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 34px;
      padding: 0 13px;
      border-radius: 100px;
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      background: #F1E4CC;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      color: #6B5F50;
      cursor: pointer;
      white-space: nowrap;
      transition: background 300ms ease, border-color 300ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .capacity-chip:hover {
      background: #EADBBE;
    }
    .capacity-chip.low {
      border-color: rgba(224, 138, 60, 0.5);
      background: rgba(224, 138, 60, 0.14);
      color: #A0632A;
    }
    .pips-wrap {
      display: flex;
      gap: 3px;
      align-items: center;
    }
    .pip {
      width: 6px;
      height: 6px;
      border-radius: 2px;
      background: rgba(46, 39, 31, 0.18);
      transition: background 300ms ease;
    }
    .pip.filled {
      background: #F2735F;
    }
    .pip.filled.low {
      background: #E08A3C;
    }

    .btn-sign-in {
      display: inline-flex;
      align-items: center;
      height: 34px;
      padding: 0 16px;
      border-radius: 100px;
      border: none;
      background: #2E271F;
      color: #F4EBDB;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), background 150ms ease;
    }
    .btn-sign-in:hover {
      background: #42382D;
    }
    .btn-sign-in:active {
      transform: scale(0.96);
    }

    .btn-account {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1.5px solid rgba(46, 39, 31, 0.14);
      background: #F2A79B;
      font-family: inherit;
      font-size: 13px;
      font-weight: 800;
      color: #2E271F;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: border-color 200ms ease, transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .btn-account.active {
      border-color: rgba(46, 39, 31, 0.4);
    }
    .btn-account:hover {
      transform: scale(1.05);
    }
    .btn-account:active {
      transform: scale(0.96);
    }

    .popover-panel {
      position: absolute;
      right: 36px;
      top: 66px;
      z-index: 60;
      box-sizing: border-box;
      background: #FBF6EC;
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 16px;
      box-shadow: 0 22px 46px -24px rgba(46, 39, 31, 0.7);
      text-align: left;
      animation: popover-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    :host([compact]) .popover-panel,
    @media (max-width: 600px) {
      .popover-panel {
        right: 16px;
        top: 56px;
      }
    }

    @keyframes popover-in {
      from { opacity: 0; transform: translateY(-6px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .capacity-note-panel {
      width: 256px;
      padding: 14px 16px;
      font-size: 12.5px;
      line-height: 1.55;
      font-weight: 600;
      color: #6B5F50;
    }

    .account-menu {
      width: 240px;
      padding: 8px;
    }
    .account-header {
      padding: 10px 12px 12px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
      margin-bottom: 6px;
    }
    .account-name {
      font-size: 13.5px;
      font-weight: 800;
      color: #2E271F;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sync-status {
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
    .menu-item {
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
      color: #2E271F;
      text-align: left;
      cursor: pointer;
      text-decoration: none;
      transition: background 150ms ease;
    }
    .menu-item:hover {
      background: rgba(46, 39, 31, 0.06);
    }
    .menu-item.muted {
      color: #6B5F50;
    }
    .menu-badge {
      background: rgba(138, 107, 63, 0.18);
      color: #8A6B3F;
      border-radius: 100px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 800;
      margin-left: auto;
    }
    .menu-divider {
      height: 1px;
      background: rgba(46, 39, 31, 0.08);
      margin: 6px 12px;
    }
    .backdrop-overlay {
      position: fixed;
      inset: 0;
      z-index: 55;
      background: transparent;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.onKeyDown);
    this.unsubscribeProjects = projectStorage.subscribeProjects((projects) => {
      this.savedCount = projects.length;
      this.requestUpdate();
    });
    this.unsubscribeCapacity = capacityService.subscribe((state) => {
      this.capacityCharges = state.charges;
      this.capacityMax = state.max;
      this.rechargeNextSec = state.rechargeNextSec;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.onKeyDown);
    if (this.unsubscribeProjects) {
      this.unsubscribeProjects();
      this.unsubscribeProjects = null;
    }
    if (this.unsubscribeCapacity) {
      this.unsubscribeCapacity();
      this.unsubscribeCapacity = null;
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.closeOverlays();
    }
  };

  private closeOverlays() {
    this.accountMenuOpen = false;
    this.showCapacityNote = false;
  }

  private toggleCapacityNote() {
    this.accountMenuOpen = false;
    this.showCapacityNote = !this.showCapacityNote;
  }

  private toggleAccountMenu() {
    this.showCapacityNote = false;
    this.accountMenuOpen = !this.accountMenuOpen;
  }

  private onSignInClick() {
    this.closeOverlays();
    this.dispatchEvent(new CustomEvent('request-login', { bubbles: true, composed: true }));
  }

  private onSignOutClick() {
    this.closeOverlays();
    this.dispatchEvent(new CustomEvent('request-logout', { bubbles: true, composed: true }));
  }

  private onViewSetsClick(e: Event) {
    e.preventDefault();
    this.closeOverlays();
    this.dispatchEvent(new CustomEvent('view-sets', { bubbles: true, composed: true }));
  }

  private onSyncNowClick() {
    this.closeOverlays();
    this.dispatchEvent(new CustomEvent('sync-projects', { bubbles: true, composed: true }));
  }

  private onOpenAdminModal() {
    this.closeOverlays();
    this.dispatchEvent(new CustomEvent('open-admin-modal', { bubbles: true, composed: true }));
  }

  private onBrandingClick() {
    this.dispatchEvent(new CustomEvent('wordmark-click', { bubbles: true, composed: true }));
  }

  get isUserAdmin(): boolean {
    return Boolean(this.isAdmin || projectStorage.isAdmin);
  }

  render() {
    const isLow = this.capacityCharges <= 1;
    const mins = Math.floor(this.rechargeNextSec / 60);
    const secs = String(this.rechargeNextSec % 60).padStart(2, '0');
    const clock = `${mins}:${secs}`;
    const capacityLabel = this.capacityCharges > 0
      ? `${this.capacityCharges} left`
      : `+1 in ${clock}`;

    const capacityNote = this.capacityCharges > 0
      ? `${this.capacityCharges} of ${this.capacityMax} AI generates left. One comes back every ${this.rechargeNextSec > 0 ? this.rechargeNextSec : 60}s.`
      : `You've used all ${this.capacityMax} AI generates. The next one unlocks in ${clock}.`;

    const userInitial = (this.userEmail ? this.userEmail.charAt(0) : 'U').toUpperCase();
    const displayName = this.userEmail ? this.userEmail.split('@')[0] : 'Signed in';

    return html`
      <div class="header-wrap">
        <div class="branding" @click=${this.onBrandingClick}>
          <svg width="${this.compact ? 20 : 24}" height="${this.compact ? 20 : 24}" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <div class="brand-title">${this.title}</div>
        </div>

        <div class="actions-group">
          ${!this.hideCapacity ? html`
            <button
              class="capacity-chip ${isLow ? 'low' : ''}"
              @click=${this.toggleCapacityNote}
              aria-label="AI generates remaining"
            >
              <span class="pips-wrap">
                ${Array.from({ length: this.capacityMax }, (_, i) => html`
                  <span class="pip ${i < this.capacityCharges ? 'filled' : ''} ${isLow ? 'low' : ''}"></span>
                `)}
              </span>
              <span>${capacityLabel}</span>
            </button>
          ` : ''}

          ${!this.isAuthenticated ? html`
            <button class="btn-sign-in" @click=${this.onSignInClick}>Sign in</button>
          ` : html`
            <button
              class="btn-account ${this.accountMenuOpen ? 'active' : ''}"
              @click=${this.toggleAccountMenu}
              aria-haspopup="menu"
              aria-label="Account and saved sets"
            >
              ${userInitial}
            </button>
          `}
        </div>

        ${(this.showCapacityNote || this.accountMenuOpen) ? html`
          <div class="backdrop-overlay" @click=${this.closeOverlays}></div>
        ` : ''}

        ${this.showCapacityNote ? html`
          <div class="popover-panel capacity-note-panel">
            ${capacityNote}
          </div>
        ` : ''}

        ${this.accountMenuOpen ? html`
          <div class="popover-panel account-menu" role="menu">
            <div class="account-header">
              <div class="account-name">${displayName}</div>
              <div class="sync-status">
                <span class="sync-dot"></span>
                ${this.syncStatus === 'syncing' ? 'Syncing...' : 'Synced just now'}
              </div>
            </div>
            <button class="menu-item" @click=${this.onViewSetsClick} role="menuitem">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#8A6B3F" style="flex-shrink:0;">
                <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4.5L5 21V3a1 1 0 0 1 1-1z"/>
              </svg>
              <span>Your sets</span>
              <span class="menu-badge">${this.savedCount}</span>
            </button>
            <button class="menu-item" @click=${this.onSyncNowClick} role="menuitem">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6B3F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                <path d="M20 11a8 8 0 0 0-13.7-5.6L3 8"/>
                <path d="M3 4v4h4"/>
                <path d="M4 13a8 8 0 0 0 13.7 5.6L21 16"/>
                <path d="M21 20v-4h-4"/>
              </svg>
              <span>Sync now</span>
            </button>
            ${this.isUserAdmin ? html`
              <button class="menu-item" @click=${this.onOpenAdminModal} role="menuitem">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6B3F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>AI model config</span>
              </button>
            ` : ''}
            <div class="menu-divider"></div>
            <button class="menu-item muted" @click=${this.onSignOutClick} role="menuitem">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B5F50" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <path d="M16 17l5-5-5-5"/>
                <path d="M21 12H9"/>
              </svg>
              <span>Sign out</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
