import { aiCapacity } from '../services/ai-capacity';
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { projectStorage } from '../services/project-storage';

export type NavTabId = 'loop' | 'melody' | 'song' | 'play';

interface NavTabDef {
  id: NavTabId;
  name: string;
}

const NAV_TABS: NavTabDef[] = [
  { id: 'loop', name: 'Chords' },
  { id: 'melody', name: 'Melody' },
  { id: 'song', name: 'Song' },
  { id: 'play', name: 'Play it' },
];

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
  @property({ type: String }) activeTab: NavTabId = 'loop';
  @property({ type: Boolean }) showNav = true;
  @property({ type: Number }) aiTokens = 4;
  @property({ type: Number }) aiNextIn = 60;
  @property({ type: String }) midiStatus = 'Idle';

  @state() private accountMenuOpen = false;
  @state() private showCapacityNote = false;

  private unsubscribeProjects: (() => void) | null = null;
  private unsubscribeSyncStatus: (() => void) | null = null;
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
      min-height: 58px;
      padding: 0 20px;
      background: var(--cv-cream, #FBF3E6);
      border-bottom: 1.5px solid rgba(46, 39, 31, 0.09);
      box-sizing: border-box;
      gap: 12px;
    }
    .header-wrap.compact {
      min-height: 48px;
      padding: 0 12px;
    }
    .branding {
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
      user-select: none;
      flex-shrink: 0;
    }
    .brand-title {
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      font-size: 15.5px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--cv-ink, #2E271F);
      line-height: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .header-wrap.compact .brand-title {
      font-size: 13.5px;
    }

    /* Tier-1 Nav Tabs */
    .nav-tabs-wrap {
      display: flex;
      align-items: center;
      gap: 2px;
      background: var(--cv-surface-2, #F1E4CC);
      border-radius: 100px;
      padding: 3px 4px;
      box-sizing: border-box;
    }
    .nav-tab-btn {
      border: none;
      font-family: inherit;
      min-height: 36px;
      padding: 0 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      background: transparent;
      cursor: pointer;
      white-space: nowrap;
      transition: background 150ms ease, color 150ms ease, transform 100ms ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .nav-tab-btn:hover {
      color: var(--cv-ink, #2E271F);
    }
    .nav-tab-btn.active {
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      font-weight: 800;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
    }
    .header-wrap.compact .nav-tab-btn {
      min-height: 30px;
      padding: 0 10px;
      font-size: 11.5px;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      flex-shrink: 0;
    }

    /* AI Capacity Chip */
    .capacity-chip {
      border: none;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 0 10px;
      min-height: 32px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6B5F50);
      cursor: pointer;
      transition: background 150ms ease;
    }
    .capacity-chip:hover {
      background: rgba(46, 39, 31, 0.1);
      color: var(--cv-ink, #2E271F);
    }
    .capacity-pips {
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .pip-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.18);
      transition: background 200ms ease;
    }
    .pip-dot.filled {
      background: #9E5D53;
    }

    @media (max-width: 899px) {
      /* On phones the AI capacity lives in the dock's ⋯ menu (design: avatar only in the header) */
      .capacity-chip,
      .capacity-panel {
        display: none;
      }
      .header-wrap {
        padding: 0 18px;
      }
    }

    /* Popover Panels */
    .popover-panel {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      z-index: 100;
      background: var(--cv-cream, #FBF3E6);
      border: 1px solid rgba(46, 39, 31, 0.1);
      border-radius: 18px;
      box-shadow: 0 18px 40px -10px rgba(46, 39, 31, 0.3);
      animation: cvfv-sheet-up 180ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .capacity-panel {
      width: 252px;
      padding: 14px 12px 14px 16px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 12px;
      line-height: 1.55;
      font-weight: 600;
      color: var(--cv-ink-muted, #6B5F50);
    }
    .panel-close-btn {
      border: none;
      background: transparent;
      font-size: 18px;
      line-height: 1;
      color: rgba(46, 39, 31, 0.5);
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .panel-close-btn:hover {
      background: rgba(46, 39, 31, 0.08);
      color: var(--cv-ink, #2E271F);
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
      width: 34px;
      height: 34px;
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

    // AI capacity (shared with the mobile dock)
    this.aiTokens = aiCapacity.tokens;
    this.aiNextIn = aiCapacity.nextIn;
    this.unsubscribeCapacity = aiCapacity.subscribe(() => {
      this.aiTokens = aiCapacity.tokens;
      this.aiNextIn = aiCapacity.nextIn;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribeProjects) this.unsubscribeProjects();
    if (this.unsubscribeSyncStatus) this.unsubscribeSyncStatus();
    if (this.unsubscribeCapacity) this.unsubscribeCapacity();
  }

  private setTab(id: NavTabId) {
    this.activeTab = id;
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: id,
      bubbles: true,
      composed: true,
    }));
  }

  private toggleCapacityNote(e: Event) {
    e.stopPropagation();
    this.showCapacityNote = !this.showCapacityNote;
    if (this.showCapacityNote) this.accountMenuOpen = false;
  }

  private toggleAccountMenu(e: Event) {
    e.stopPropagation();
    this.accountMenuOpen = !this.accountMenuOpen;
    if (this.accountMenuOpen) this.showCapacityNote = false;
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

  private onOpenMidi() {
    this.accountMenuOpen = false;
    this.dispatchEvent(new CustomEvent('open-midi', { bubbles: true, composed: true }));
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
        <!-- Branding Logo & Title -->
        <div class="branding" @click=${() => this.dispatchEvent(new CustomEvent('brand-click', { bubbles: true, composed: true }))}>
          <svg width="26" height="26" viewBox="0 0 30 30" style="flex-shrink:0;">
            <circle cx="11" cy="11" r="9" fill="#F2A79B"/>
            <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9"/>
          </svg>
          <span class="brand-title">${this.title}</span>
        </div>

        <!-- Tier-1 Navigation Tabs (if showNav is enabled) -->
        ${this.showNav ? html`
          <nav class="nav-tabs-wrap" aria-label="Main Navigation">
            ${NAV_TABS.map(t => html`
              <button
                class="nav-tab-btn ${this.activeTab === t.id ? 'active' : ''}"
                role="tab"
                aria-selected=${this.activeTab === t.id}
                @click=${() => this.setTab(t.id)}
              >
                ${t.name}
              </button>
            `)}
          </nav>
        ` : ''}

        <!-- Right Actions: AI Tokens, Sign in / Account -->
        <div class="right-actions">
          <button
            class="capacity-chip"
            @click=${this.toggleCapacityNote}
            aria-label="AI generates remaining"
            title="AI tokens"
          >
            <span class="capacity-pips">
              ${[0, 1, 2, 3].map(i => html`
                <span class="pip-dot ${i < this.aiTokens ? 'filled' : ''}"></span>
              `)}
            </span>
            <span>${this.aiTokens >= 4 ? 'AI ready' : `Refill ${this.aiNextIn}s`}</span>
          </button>

          ${this.showCapacityNote ? html`
            <div class="popover-panel capacity-panel" role="note">
              <span style="flex:1;">
                AI generates remaining chords & top-line melodies. Refills 1 token every 60 seconds.
              </span>
              <button class="panel-close-btn" @click=${this.toggleCapacityNote} aria-label="Dismiss">×</button>
            </div>
          ` : ''}

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
              <button class="menu-action-btn" role="menuitem" @click=${this.onOpenMidi}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A6B3F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="9"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/><circle cx="10" cy="15" r="1"/><circle cx="14" cy="15" r="1"/><circle cx="12" cy="8" r="1"/></svg>
                <span>MIDI</span>
                <span class="saved-badge">${this.midiStatus}</span>
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
