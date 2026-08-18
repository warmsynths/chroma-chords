import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { authService } from '../services/auth-service';

type AuthTab = 'signin' | 'signup' | 'magic';

@customElement('auth-modal')
export class AuthModal extends LitElement {
  @property({ type: Boolean }) open = false;

  @state() private mounted = false;
  @state() private activeTab: AuthTab = 'signin';
  @state() private email = '';
  @state() private password = '';
  @state() private confirmPassword = '';
  @state() private isLoading = false;
  @state() private isOAuthLoading = false;
  @state() private errorMessage: string | null = null;
  @state() private successMessage: string | null = null;

  @query('.email-input') private emailInputEl!: HTMLInputElement;

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  static styles = css`
    :host {
      display: block;
      font-family: var(--cv-font, 'Plus Jakarta Sans', sans-serif);
      color: var(--cv-ink, #2E271F);
    }
    .scrim {
      position: fixed;
      inset: -2px;
      z-index: 120;
      background: rgba(46, 39, 31, 0);
      transition: background 0.22s ease, backdrop-filter 0.22s ease;
      pointer-events: none;
    }
    .scrim.visible {
      background: rgba(46, 39, 31, 0.45);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      pointer-events: auto;
    }
    .modal-wrap {
      position: fixed;
      inset: 0;
      z-index: 121;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      pointer-events: none;
      box-sizing: border-box;
    }
    .modal {
      background: var(--cv-cream, #FBF3E6);
      border-radius: 24px;
      padding: 28px 30px;
      width: 100%;
      max-width: 420px;
      box-sizing: border-box;
      box-shadow: 0 24px 48px -12px rgba(46, 39, 31, 0.35), 0 0 0 1px rgba(46, 39, 31, 0.06);
      opacity: 0;
      transform: translateY(12px) scale(0.96);
      transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: auto;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .modal-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--cv-ink, #2E271F);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .close-btn {
      background: rgba(46, 39, 31, 0.06);
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--cv-ink-muted, #6B5F50);
      font-size: 18px;
      line-height: 1;
      padding: 0;
      transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
    }
    .close-btn:hover {
      background: rgba(46, 39, 31, 0.12);
      color: var(--cv-ink, #2E271F);
    }
    .close-btn:active {
      transform: scale(0.92);
    }
    .tabs-row {
      display: flex;
      background: var(--cv-surface-2, #EFE3D0);
      border-radius: 12px;
      padding: 3px;
      margin-bottom: 20px;
      gap: 4px;
    }
    .tab-btn {
      flex: 1;
      background: none;
      border: none;
      padding: 8px 6px;
      border-radius: 9px;
      font-size: 12.5px;
      font-weight: 700;
      font-family: inherit;
      color: var(--cv-ink-muted, #6B5F50);
      cursor: pointer;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      text-align: center;
    }
    .tab-btn.active {
      background: #FFFFFF;
      color: var(--cv-ink, #2E271F);
      box-shadow: 0 1.5px 4px rgba(46, 39, 31, 0.08);
    }
    .oauth-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #FFFFFF;
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 100px;
      padding: 11px 16px;
      font-size: 14px;
      font-weight: 700;
      font-family: inherit;
      color: var(--cv-ink, #2E271F);
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      box-sizing: border-box;
      margin-bottom: 16px;
    }
    .oauth-btn:hover:not(:disabled) {
      background: #FAF8F5;
      border-color: rgba(46, 39, 31, 0.22);
    }
    .oauth-btn:active:not(:disabled) {
      transform: scale(0.97);
    }
    .oauth-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 16px 0 18px;
      color: var(--cv-ink-muted, #8A6B3F);
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid rgba(46, 39, 31, 0.12);
    }
    .divider:not(:empty)::before {
      margin-right: 12px;
    }
    .divider:not(:empty)::after {
      margin-left: 12px;
    }
    .form-group {
      margin-bottom: 14px;
    }
    .form-label {
      display: block;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink, #2E271F);
      margin-bottom: 6px;
    }
    .form-input {
      width: 100%;
      box-sizing: border-box;
      background: #FFFFFF;
      border: 1.5px solid rgba(46, 39, 31, 0.14);
      border-radius: 12px;
      padding: 11px 14px;
      font-size: 14px;
      font-family: inherit;
      color: var(--cv-ink, #2E271F);
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .form-input:focus {
      border-color: var(--cv-ink, #2E271F);
      box-shadow: 0 0 0 3.5px rgba(46, 39, 31, 0.08);
    }
    .form-input::placeholder {
      color: rgba(46, 39, 31, 0.35);
    }
    .alert-box {
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 12.5px;
      line-height: 1.45;
      margin-bottom: 16px;
    }
    .alert-error {
      background: #FBEAE8;
      border: 1px solid #F2B8B5;
      color: #B3261E;
    }
    .alert-success {
      background: #EBF3EC;
      border: 1px solid #B8DCBE;
      color: #2E6930;
    }
    .helper-text {
      font-size: 11.5px;
      color: var(--cv-ink-muted, #6B5F50);
      line-height: 1.45;
      margin-top: -4px;
      margin-bottom: 16px;
    }
    .submit-btn {
      width: 100%;
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      border: none;
      padding: 13px 20px;
      border-radius: 100px;
      font-size: 14.5px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      transition: transform 0.15s ease, opacity 0.15s ease, background 0.15s ease;
      margin-top: 6px;
    }
    .submit-btn:hover:not(:disabled) {
      opacity: 0.92;
    }
    .submit-btn:active:not(:disabled) {
      transform: scale(0.97);
    }
    .submit-btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      transform: none;
    }
    .switch-hint {
      font-size: 12.5px;
      color: var(--cv-ink-muted, #6B5F50);
      text-align: center;
      margin-top: 18px;
    }
    .link-btn {
      background: none;
      border: none;
      color: var(--cv-ink, #2E271F);
      font-weight: 800;
      cursor: pointer;
      text-decoration: underline;
      font-size: 12.5px;
      font-family: inherit;
      padding: 0 0 0 4px;
    }
    .link-btn:hover {
      color: #F2735F;
    }
  `;

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      if (this.open) {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer);
          this.closeTimer = null;
        }
        this.mounted = true;
        this.errorMessage = null;
        this.successMessage = null;
        setTimeout(() => {
          if (this.emailInputEl) {
            this.emailInputEl.focus();
          }
        }, 120);
      } else if (this.mounted) {
        this.closeTimer = setTimeout(() => {
          this.mounted = false;
        }, 280);
      }
    }
  }

  private close() {
    this.errorMessage = null;
    this.successMessage = null;
    this.password = '';
    this.confirmPassword = '';
    this.dispatchEvent(new CustomEvent('close-modal', { bubbles: true, composed: true }));
  }

  private setTab(tab: AuthTab) {
    this.activeTab = tab;
    this.errorMessage = null;
    this.successMessage = null;
  }

  private async handleGoogleSignIn() {
    this.errorMessage = null;
    this.successMessage = null;
    this.isOAuthLoading = true;
    try {
      const res = await authService.signInWithOAuth('google');
      if (!res.success) {
        this.errorMessage = res.message || 'Google sign-in failed. Please try again.';
      }
    } finally {
      this.isOAuthLoading = false;
    }
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    this.errorMessage = null;
    this.successMessage = null;

    const trimmedEmail = this.email.trim();
    if (!trimmedEmail) {
      this.errorMessage = 'Please enter your email address.';
      return;
    }

    if (this.activeTab === 'magic') {
      this.isLoading = true;
      try {
        const res = await authService.signInWithOtp(trimmedEmail);
        if (res.success) {
          this.successMessage = res.message || 'Magic login link sent! Check your inbox.';
        } else {
          this.errorMessage = res.message || 'Failed to send magic link.';
        }
      } finally {
        this.isLoading = false;
      }
      return;
    }

    if (!this.password) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    if (this.activeTab === 'signup') {
      if (this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters long.';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.isLoading = true;
      try {
        const res = await authService.signUp(trimmedEmail, this.password);
        if (res.success) {
          if (res.user && !res.user.confirmed_at && authService.getUser() === null) {
            this.successMessage = 'Account created! Please check your email to confirm your account.';
          } else {
            this.close();
          }
        } else {
          this.errorMessage = res.message || 'Sign up failed.';
        }
      } finally {
        this.isLoading = false;
      }
      return;
    }

    if (this.activeTab === 'signin') {
      this.isLoading = true;
      try {
        const res = await authService.signInWithPassword(trimmedEmail, this.password);
        if (res.success) {
          this.close();
        } else {
          this.errorMessage = res.message || 'Invalid email or password.';
        }
      } finally {
        this.isLoading = false;
      }
    }
  }

  render() {
    if (!this.mounted) return html``;

    return html`
      <div class="scrim ${this.open ? 'visible' : ''}" @click=${this.close}></div>
      <div class="modal-wrap">
        <div class="modal ${this.open ? 'visible' : ''}" role="dialog" aria-modal="true" @keydown=${(e: KeyboardEvent) => e.key === 'Escape' && this.close()}>
          <div class="header-row">
            <h2 class="modal-title">
              <svg width="20" height="20" viewBox="0 0 30 30">
                <circle cx="11" cy="11" r="9" fill="#F2A79B" />
                <circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" />
              </svg>
              <span>Chroma Chords</span>
            </h2>
            <button class="close-btn" @click=${this.close} aria-label="Close modal">&times;</button>
          </div>

          <div class="tabs-row">
            <button
              type="button"
              class="tab-btn ${this.activeTab === 'signin' ? 'active' : ''}"
              @click=${() => this.setTab('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              class="tab-btn ${this.activeTab === 'signup' ? 'active' : ''}"
              @click=${() => this.setTab('signup')}
            >
              Create Account
            </button>
            <button
              type="button"
              class="tab-btn ${this.activeTab === 'magic' ? 'active' : ''}"
              @click=${() => this.setTab('magic')}
            >
              Magic Link
            </button>
          </div>

          <button
            type="button"
            class="oauth-btn"
            ?disabled=${this.isOAuthLoading || this.isLoading}
            @click=${this.handleGoogleSignIn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.3s.7 5.6 1.9 8l3.7-2.9z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
            </svg>
            ${this.isOAuthLoading ? 'Connecting...' : 'Continue with Google'}
          </button>

          <div class="divider">or with email</div>

          ${this.errorMessage
            ? html`<div class="alert-box alert-error">${this.errorMessage}</div>`
            : html``}
          ${this.successMessage
            ? html`<div class="alert-box alert-success">${this.successMessage}</div>`
            : html``}

          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input
                type="email"
                class="form-input email-input"
                required
                autocomplete="email"
                placeholder="creator@example.com"
                .value=${this.email}
                @input=${(e: Event) => (this.email = (e.target as HTMLInputElement).value)}
              />
            </div>

            ${this.activeTab === 'magic'
              ? html`
                  <div class="helper-text">
                    We'll email you a passwordless one-time login link to sign in instantly on any device.
                  </div>
                  <button type="submit" class="submit-btn" ?disabled=${this.isLoading}>
                    ${this.isLoading ? 'Sending Link...' : 'Send Magic Link'}
                  </button>
                `
              : html`
                  <div class="form-group">
                    <label class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-input"
                      required
                      autocomplete=${this.activeTab === 'signup' ? 'new-password' : 'current-password'}
                      placeholder="••••••••"
                      .value=${this.password}
                      @input=${(e: Event) => (this.password = (e.target as HTMLInputElement).value)}
                    />
                  </div>

                  ${this.activeTab === 'signup'
                    ? html`
                        <div class="form-group">
                          <label class="form-label">Confirm Password</label>
                          <input
                            type="password"
                            class="form-input"
                            required
                            autocomplete="new-password"
                            placeholder="••••••••"
                            .value=${this.confirmPassword}
                            @input=${(e: Event) =>
                              (this.confirmPassword = (e.target as HTMLInputElement).value)}
                          />
                        </div>
                        <div class="helper-text">
                          Your saved chord progressions from this browser will be safely backed up to your account.
                        </div>
                        <button type="submit" class="submit-btn" ?disabled=${this.isLoading}>
                          ${this.isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                      `
                    : html`
                        <button type="submit" class="submit-btn" ?disabled=${this.isLoading}>
                          ${this.isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                      `}
                `}
          </form>

          ${this.activeTab === 'signin'
            ? html`
                <div class="switch-hint">
                  Don't have an account?
                  <button type="button" class="link-btn" @click=${() => this.setTab('signup')}>
                    Create one
                  </button>
                </div>
              `
            : this.activeTab === 'signup'
            ? html`
                <div class="switch-hint">
                  Already have an account?
                  <button type="button" class="link-btn" @click=${() => this.setTab('signin')}>
                    Sign in
                  </button>
                </div>
              `
            : html`
                <div class="switch-hint">
                  Prefer password?
                  <button type="button" class="link-btn" @click=${() => this.setTab('signin')}>
                    Sign in with password
                  </button>
                </div>
              `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auth-modal': AuthModal;
  }
}
