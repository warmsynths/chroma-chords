import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

@customElement('save-set-modal')
export class SaveSetModal extends LitElement {
  @property({ type: Boolean }) visible = false;
  @property({ type: String }) defaultName = '';
  
  @state() private mounted = false;
  @state() private name = '';

  @query('.name-input') private inputEl!: HTMLInputElement;

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  static styles = css`
    :host {
      display: block;
    }
    .scrim {
      position: fixed;
      inset: -2px;
      z-index: 100;
      background: rgba(46, 39, 31, 0);
      transition: background 0.22s ease, backdrop-filter 0.22s ease;
      pointer-events: none;
    }
    .scrim.visible {
      background: rgba(46, 39, 31, 0.4);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      pointer-events: auto;
    }
    .modal-wrap {
      position: fixed;
      inset: 0;
      z-index: 101;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      pointer-events: none;
    }
    .modal {
      background: var(--cv-cream);
      border-radius: 24px;
      padding: 28px 32px;
      width: 100%;
      max-width: 420px;
      box-sizing: border-box;
      box-shadow: 0 24px 44px -18px rgba(46, 39, 31, 0.35);
      opacity: 0;
      transform: translateY(8px) scale(0.96);
      transition: opacity 0.24s cubic-bezier(.16,1,.3,1), transform 0.26s cubic-bezier(.16,1,.3,1);
      pointer-events: none;
    }
    .modal.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    h2 {
      margin: 0 0 6px 0;
      font-size: 22px;
      font-weight: 800;
      color: var(--cv-ink);
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-size: 14.5px;
      color: var(--cv-ink-muted);
      margin-bottom: 24px;
    }
    .input-wrap {
      margin-bottom: 24px;
    }
    .name-input {
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 12px;
      padding: 14px 16px;
      font-size: 15px;
      font-family: var(--cv-font);
      color: var(--cv-ink);
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .name-input:focus {
      border-color: var(--cv-ink);
      box-shadow: 0 0 0 4px rgba(46, 39, 31, 0.08);
    }
    .name-input::placeholder {
      color: var(--cv-ink-30);
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn {
      border: none;
      background: none;
      font-family: inherit;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      padding: 12px 24px;
      border-radius: 100px;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }
    .btn:active {
      transform: scale(0.96);
    }
    .btn.cancel {
      color: var(--cv-ink-muted);
    }
    .btn.cancel:hover {
      color: var(--cv-ink);
    }
    .btn.save {
      background: var(--cv-ink);
      color: var(--cv-cream);
    }
    .btn.save:hover {
      opacity: 0.9;
    }
    .btn.save:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  `;

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('visible')) {
      if (this.visible) {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer);
          this.closeTimer = null;
        }
        this.mounted = true;
        this.name = this.defaultName;
        // Focus input shortly after mounting so the animation can start smoothly
        setTimeout(() => {
          if (this.inputEl) {
            this.inputEl.focus();
            this.inputEl.select();
          }
        }, 100);
      } else if (this.mounted) {
        this.closeTimer = setTimeout(() => {
          this.mounted = false;
        }, 300); // Wait for transition
      }
    }
  }

  private close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  private save() {
    const trimmed = this.name.trim();
    if (!trimmed) return;
    this.dispatchEvent(new CustomEvent('save', { detail: trimmed }));
    this.close();
  }

  private onInput(e: Event) {
    this.name = (e.target as HTMLInputElement).value;
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.close();
    } else if (e.key === 'Enter' && this.name.trim()) {
      this.save();
    }
  }

  render() {
    if (!this.mounted) return html``;

    return html`
      <div class="scrim ${this.visible ? 'visible' : ''}" @click=${this.close}></div>
      <div class="modal-wrap">
        <div class="modal ${this.visible ? 'visible' : ''}" role="dialog" aria-modal="true">
          <h2>Name this set</h2>
          <div class="subtitle">Give it a name so you can find it later.</div>
          
          <div class="input-wrap">
            <input
              type="text"
              class="name-input"
              .value=${this.name}
              @input=${this.onInput}
              @keydown=${this.onKeyDown}
              placeholder="e.g. 2am drive"
              maxlength="50"
            />
          </div>
          
          <div class="actions">
            <button class="btn cancel" @click=${this.close}>Cancel</button>
            <button class="btn save" @click=${this.save} ?disabled=${!this.name.trim()}>Save</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'save-set-modal': SaveSetModal;
  }
}
