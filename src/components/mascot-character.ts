import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Four small CSS-only critters (bean, bird, cat, note) adapted from a design mockup — used as
// subtle, occasional background decoration scattered around the app, never as primary content.
export type MascotKind = 'bean' | 'bird' | 'cat' | 'note';

export const MASCOT_KINDS: MascotKind[] = ['bean', 'bird', 'cat', 'note'];

// Rolled once per screen mount (each screen component is freshly created every time the app
// navigates to it, so this naturally re-rolls on every visit) — picks whether a mascot shows at
// all this time, which one, and (via the caller's own slot list) where.
export function rollMascot(showChance = 0.45): { show: boolean; kind: MascotKind } {
  return { show: Math.random() < showChance, kind: MASCOT_KINDS[Math.floor(Math.random() * MASCOT_KINDS.length)] };
}

export function pickSlot<T>(slots: readonly T[]): T {
  return slots[Math.floor(Math.random() * slots.length)];
}

// Easter egg: click the wordmark this many times in a row, each within `windowMs` of the last,
// to bring out the whole gang. A pause longer than the window resets the count, so it has to be
// a real rapid-fire click streak, not just idly clicking the logo a handful of times over a
// session.
export class EasterEggCounter {
  private count = 0;
  private lastClickAt = 0;

  constructor(private threshold = 7, private windowMs = 1800) {}

  // Returns true the instant the streak reaches the threshold (and resets for the next one).
  click(): boolean {
    const now = Date.now();
    if (now - this.lastClickAt > this.windowMs) this.count = 0;
    this.lastClickAt = now;
    this.count += 1;
    if (this.count >= this.threshold) {
      this.count = 0;
      return true;
    }
    return false;
  }
}

// Natural (unscaled) footprint of each character — callers that position a mascot with `right`
// (rather than `left`) need this to size their wrapper accurately, since the element's layout
// box stays at natural size even when the visible content is scaled down (see the top-left
// transform-origin below): without an explicit matching size, `right:Npx` would measure from
// the wrong edge — the far side of the unscaled box, not the visible scaled content.
export const MASCOT_NATURAL_SIZE: Record<MascotKind, { width: number; height: number }> = {
  bean: { width: 92, height: 86 },
  bird: { width: 88, height: 88 },
  cat: { width: 90, height: 88 },
  note: { width: 74, height: 67 },
};

@customElement('mascot-character')
export class MascotCharacter extends LitElement {
  @property({ type: String }) kind: MascotKind = 'bean';
  // Natural size is ~74-92px (see per-kind widths below) — scale down/up for tighter slots
  // instead of a pixel prop, so each character's internal proportions stay correct.
  @property({ type: Number }) scale = 1;

  // The host's own box is sized to the SCALED visual footprint (not the natural, pre-transform
  // size) — so a caller positioning this element with `right`/`bottom` gets the edge of what's
  // actually visible, not the edge of an invisible, larger unscaled box.
  willUpdate(changed: PropertyValues) {
    if (changed.has('kind') || changed.has('scale')) {
      const { width, height } = MASCOT_NATURAL_SIZE[this.kind];
      this.style.width = `${width * this.scale}px`;
      this.style.height = `${height * this.scale}px`;
    }
  }

  static styles = css`
    :host {
      display: block;
      pointer-events: none;
      user-select: none;
      overflow: visible;
    }
    @keyframes mascot-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
    @keyframes mascot-sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    @keyframes mascot-arm-rest { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(2deg); } }
    @keyframes mascot-arm-hang { 0%, 100% { transform: rotate(6deg); } 50% { transform: rotate(-6deg); } }
    @keyframes mascot-foot-l { 0%, 78%, 100% { transform: translateY(0) rotate(0deg); } 88% { transform: translateY(5px) rotate(-8deg); } }
    @keyframes mascot-foot-r { 0%, 38%, 100% { transform: translateY(0) rotate(0deg); } 48% { transform: translateY(5px) rotate(8deg); } }
    @keyframes mascot-blink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.12); } }
    @keyframes mascot-ear-wiggle { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
    @keyframes mascot-note-float { 0% { opacity: 0; transform: translate(0, 0) scale(0.6); } 15% { opacity: 1; } 100% { opacity: 0; transform: translate(10px, -34px) scale(1); } }
    @keyframes mascot-wing-flap { 0%, 100% { transform: rotate(-18deg); } 50% { transform: rotate(6deg); } }
    @keyframes mascot-tuft-bob { 0%, 100% { transform: rotate(-10deg) translateY(0); } 50% { transform: rotate(10deg) translateY(-3px); } }
    @keyframes mascot-tail-wag { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
    @keyframes mascot-whisker { 0%, 85%, 100% { transform: rotate(0deg); } 92% { transform: rotate(-4deg); } }
    @keyframes mascot-stem-sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
    @keyframes mascot-flag-flutter { 0%, 100% { transform: rotate(0deg) scaleY(1); } 50% { transform: rotate(8deg) scaleY(0.9); } }

    .root {
      position: relative;
      animation: mascot-bob 2.4s ease-in-out infinite;
    }
    .note-emoji {
      position: absolute;
      left: 6%;
      top: -10%;
      color: #9C6B35;
      opacity: 0.8;
      animation: mascot-note-float 3.6s ease-out infinite;
    }
    .body {
      position: relative;
      width: 100%;
      border-radius: 48% 48% 44% 44% / 54% 54% 40% 40%;
      transform-origin: 50% 85%;
      animation: mascot-sway 2.4s ease-in-out infinite;
    }
    .ear {
      position: absolute;
      top: -6%;
      width: 22%;
      height: 26%;
      border-radius: 50%;
      transform-origin: 50% 100%;
      animation: mascot-ear-wiggle 2.4s ease-in-out infinite;
    }
    .ear.l { left: 6%; }
    .ear.r { right: 6%; animation-delay: 0.15s; animation-direction: reverse; }
    .face {
      position: absolute;
      left: 50%;
      top: 46%;
      transform: translate(-50%, -50%);
      width: 58%;
      height: 40%;
      background: #F7E9D0;
      border-radius: 50%;
      opacity: 0.9;
    }
    .eye {
      position: absolute;
      top: 42%;
      width: 11%;
      height: 11%;
      background: #3A2B20;
      border-radius: 50%;
      animation: mascot-blink 4s ease-in-out infinite;
    }
    .eye.l { left: 32%; }
    .eye.r { right: 32%; }
    .cheek {
      position: absolute;
      top: 56%;
      width: 13%;
      height: 9%;
      background: #EFB9A0;
      border-radius: 50%;
      opacity: 0.85;
    }
    .cheek.l { left: 22%; }
    .cheek.r { right: 22%; }
    .smile {
      position: absolute;
      left: 50%;
      top: 62%;
      transform: translateX(-50%);
      width: 20%;
      height: 10%;
      border-bottom: 3px solid #3A2B20;
      border-radius: 0 0 50% 50%;
    }
    .foot {
      position: absolute;
      bottom: -8%;
      width: 20%;
      height: 18%;
      border-radius: 40%;
      transform-origin: 50% 0%;
    }
    .foot.l { left: 24%; animation: mascot-foot-l 2.6s ease-in-out infinite; }
    .foot.r { right: 24%; animation: mascot-foot-r 2.6s ease-in-out infinite 0.5s; }
    .arm-rest {
      position: relative;
      width: 62%;
      transform-origin: 50% 78%;
      animation: mascot-arm-rest 2.4s ease-in-out infinite;
    }
    .arm-rest-fore {
      position: absolute;
      right: -6%;
      top: 6%;
      width: 68%;
      height: 22%;
      border-radius: 40px;
      transform: rotate(-46deg);
      transform-origin: 100% 50%;
    }
    .arm-rest-hand {
      position: absolute;
      right: 34%;
      top: -6%;
      width: 22%;
      height: 22%;
      border-radius: 50%;
    }
    .arm-hang {
      position: absolute;
      left: 4%;
      top: 30%;
      width: 26%;
      height: 30%;
      transform-origin: 50% 10%;
      animation: mascot-arm-hang 2.6s ease-in-out infinite 0.3s;
    }
    .arm-hang-inner {
      width: 92%;
      height: 100%;
      border-radius: 30px;
    }
  `;

  private renderBean() {
    const c = '#D98A54';
    return html`
      <div class="root" style="width:92px;">
        <div class="note-emoji" style="font-size:13px;">♪</div>
        <div class="arm-rest" style="background:transparent;">
          <div class="arm-rest-fore" style="background:${c};"></div>
          <div class="arm-rest-hand" style="background:${c};"></div>
        </div>
        <div class="arm-hang">
          <div class="arm-hang-inner" style="background:${c};"></div>
        </div>
        <div class="body" style="aspect-ratio:1/0.94;background:${c};">
          <div class="ear l" style="background:${c};"></div>
          <div class="ear r" style="background:${c};"></div>
          <div class="face"></div>
          <div class="eye l"></div>
          <div class="eye r"></div>
          <div class="cheek l"></div>
          <div class="cheek r"></div>
          <div class="smile"></div>
          <div class="foot l" style="background:${c};"></div>
          <div class="foot r" style="background:${c};"></div>
        </div>
      </div>
    `;
  }

  private renderBird() {
    const c = '#7C93A8';
    const beakColor = '#E8A24A';
    return html`
      <div class="root" style="width:88px;">
        <div class="note-emoji" style="font-size:12px; left:8%; top:-6%;">♪</div>
        <div style="position:absolute; left:-8%; top:22%; width:46%; height:30%; background:${c}; border-radius:50% 60% 60% 50%; transform-origin:100% 30%; animation: mascot-wing-flap 2.3s ease-in-out infinite;"></div>
        <div style="position:absolute; right:-8%; top:22%; width:46%; height:30%; background:${c}; border-radius:60% 50% 50% 60%; transform-origin:0% 30%; animation: mascot-wing-flap 2.3s ease-in-out infinite 0.2s;"></div>
        <div class="body" style="aspect-ratio:1/1; background:${c}; border-radius:50% 50% 46% 46%;">
          <div style="position:absolute; left:50%; top:-20%; width:3px; height:26%; background:#5F7286; transform-origin:50% 100%; animation: mascot-tuft-bob 2.3s ease-in-out infinite;"></div>
          <div style="position:absolute; left:50%; top:42%; transform:translate(-50%,-50%); width:60%; height:42%; background:#F3EDE0; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:40%; background:#2B2420;"></div>
          <div class="eye r" style="top:40%; background:#2B2420;"></div>
          <div style="position:absolute; left:50%; top:54%; transform:translateX(-50%); width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:10px solid ${beakColor};"></div>
          <div class="foot l" style="bottom:-6%; height:14%; background:${beakColor};"></div>
          <div class="foot r" style="bottom:-6%; height:14%; background:${beakColor};"></div>
        </div>
      </div>
    `;
  }

  private renderCat() {
    const c = '#8FA888';
    return html`
      <div class="root" style="width:90px;">
        <div style="position:absolute; left:55%; top:30%; width:30%; height:8%; background:${c}; border-radius:30px; transform-origin:0% 50%; animation: mascot-tail-wag 2.2s ease-in-out infinite;"></div>
        <div class="body" style="aspect-ratio:1/0.98; background:${c}; border-radius:46% 46% 44% 44%;">
          <div style="position:absolute; left:10%; top:-18%; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid ${c}; transform-origin:50% 100%; animation: mascot-ear-wiggle 2.5s ease-in-out infinite;"></div>
          <div style="position:absolute; right:10%; top:-18%; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid ${c}; transform-origin:50% 100%; animation: mascot-ear-wiggle 2.5s ease-in-out infinite 0.15s reverse;"></div>
          <div style="position:absolute; left:50%; top:48%; transform:translate(-50%,-50%); width:56%; height:38%; background:#F3EEE1; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:44%; background:#2B2420;"></div>
          <div class="eye r" style="top:44%; background:#2B2420;"></div>
          <div style="position:absolute; left:8%; top:58%; width:26%; height:1.5px; background:#6C7F67; transform-origin:100% 50%; animation: mascot-whisker 3s ease-in-out infinite;"></div>
          <div style="position:absolute; right:8%; top:58%; width:26%; height:1.5px; background:#6C7F67; transform-origin:0% 50%; animation: mascot-whisker 3s ease-in-out infinite 0.3s;"></div>
          <div class="smile" style="top:66%; width:16%;"></div>
          <div class="foot l" style="height:16%; background:${c};"></div>
          <div class="foot r" style="height:16%; background:${c};"></div>
        </div>
      </div>
    `;
  }

  private renderNote() {
    const c = '#B7A6DE';
    const stem = '#8672B0';
    return html`
      <div class="root" style="width:74px;">
        <div style="position:absolute; right:6%; top:-46%; width:5px; height:62%; background:${stem}; transform-origin:50% 100%; animation: mascot-stem-sway 2.6s ease-in-out infinite;">
          <div style="position:absolute; top:-6px; left:4px; width:16px; height:20px; background:${stem}; border-radius:0 60% 40% 60%; transform-origin:0% 100%; animation: mascot-flag-flutter 2.6s ease-in-out infinite;"></div>
        </div>
        <div class="body" style="aspect-ratio:1/0.9; background:${c}; border-radius:50% 50% 46% 46%;">
          <div style="position:absolute; left:4%; top:32%; width:22%; height:26%; transform-origin:100% 50%; animation: mascot-arm-rest 2.6s ease-in-out infinite;"><div style="width:100%; height:30%; background:${c}; border-radius:30px;"></div></div>
          <div style="position:absolute; right:4%; top:32%; width:22%; height:26%; transform-origin:0% 50%; animation: mascot-arm-hang 2.6s ease-in-out infinite 0.2s;"><div style="width:100%; height:30%; background:${c}; border-radius:30px;"></div></div>
          <div style="position:absolute; left:50%; top:40%; transform:translate(-50%,-50%); width:58%; height:40%; background:#F3EFF9; border-radius:50%; opacity:0.9;"></div>
          <div class="eye l" style="top:38%;"></div>
          <div class="eye r" style="top:38%;"></div>
          <div class="smile" style="top:54%; width:18%;"></div>
          <div class="foot l" style="height:15%; background:${stem};"></div>
          <div class="foot r" style="height:15%; background:${stem};"></div>
        </div>
      </div>
    `;
  }

  render() {
    const inner = this.kind === 'bird' ? this.renderBird()
      : this.kind === 'cat' ? this.renderCat()
      : this.kind === 'note' ? this.renderNote()
      : this.renderBean();
    if (!inner) return nothing;
    // transform-origin top-left, not center — so a caller positioning this element via
    // top/left CSS gets a predictable visual top-left corner regardless of scale, instead of
    // the scaled content floating in the middle of its unscaled (pre-transform) layout box.
    return html`<div style="transform:scale(${this.scale}); transform-origin:top left;">${inner}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mascot-character': MascotCharacter;
  }
}
