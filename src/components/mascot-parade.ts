import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MASCOT_KINDS } from './mascot-character';
import './mascot-character';

const DISPLAY_MS = 3200;

// The easter-egg payoff: the whole gang shows up at once, bounces in, and wanders off a few
// seconds later. `trigger` is a pulse counter, not a boolean — the caller increments it on
// every activation (even back-to-back), which guarantees a real property change each time, so
// the display re-triggers even if it's already showing. A boolean would silently no-op on a
// second trigger while still true.
@customElement('mascot-parade')
export class MascotParade extends LitElement {
  @property({ type: Number }) trigger = 0;
  @state() private visible = false;

  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  updated(changed: PropertyValues) {
    if (changed.has('trigger') && this.trigger > 0) {
      this.visible = true;
      if (this.hideTimer) clearTimeout(this.hideTimer);
      this.hideTimer = setTimeout(() => { this.visible = false; }, DISPLAY_MS);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }

  static styles = css`
    :host {
      display: contents;
    }
    @keyframes egg-pop {
      0% { opacity: 0; transform: translate(-50%, 24px) scale(0.7); }
      12% { opacity: 1; transform: translate(-50%, 0) scale(1.04); }
      18% { transform: translate(-50%, 0) scale(1); }
      88% { opacity: 1; transform: translate(-50%, 0) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -14px) scale(0.94); }
    }
    @keyframes egg-caption-pop {
      0%, 15% { opacity: 0; transform: translate(-50%, 6px); }
      25%, 85% { opacity: 1; transform: translate(-50%, 0); }
      100% { opacity: 0; transform: translate(-50%, 0); }
    }
    .overlay {
      position: fixed;
      left: 50%;
      bottom: 26px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      pointer-events: none;
      animation: egg-pop ${DISPLAY_MS}ms ease forwards;
    }
    .caption {
      position: fixed;
      left: 50%;
      bottom: 108px;
      transform: translateX(-50%);
      background: var(--cv-ink, #2E271F);
      color: var(--cv-cream, #FBF3E6);
      font-family: var(--cv-font, inherit);
      font-size: 12.5px;
      font-weight: 700;
      letter-spacing: 0.2px;
      padding: 8px 16px;
      border-radius: 100px;
      white-space: nowrap;
      pointer-events: none;
      animation: egg-caption-pop ${DISPLAY_MS}ms ease forwards;
    }
    .row {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      background: var(--cv-surface, #F1E4CC);
      border: 1.5px solid var(--cv-ink-12, rgba(46,39,31,0.12));
      border-radius: 100px;
      padding: 10px 16px 6px;
      box-shadow: 0 20px 40px -18px rgba(46, 39, 31, 0.35);
    }
  `;

  render() {
    if (!this.visible) return nothing;
    return html`
      <div class="caption">✨ you found the whole gang! ✨</div>
      <div class="overlay">
        <div class="row">
          ${MASCOT_KINDS.map(kind => html`<mascot-character .kind=${kind} .scale=${0.5}></mascot-character>`)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mascot-parade': MascotParade;
  }
}
