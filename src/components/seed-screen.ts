import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH, MOODS, GENRES, getMoodColor } from '../services/chord-engine';
import { heuristicClassify, classifyFreeText, getLLMProvider, setLLMProvider, getLLMModel, setLLMModel, LLMProvider, OPENCODE_MODELS, GOOGLE_MODELS, fetchGlobalRateLimit } from '../services/freetext-service';
import { NormalizedPrompt } from '../services/freetext-schema';
import { rollMascot, pickSlot, EasterEggCounter } from './mascot-character';
import { capacityService, CAPACITY_MAX, RECHARGE_INTERVAL_MS, STORAGE_CAPACITY_KEY } from '../services/capacity-service';
import './mascot-character';
import './mascot-parade';
import './app-header';

export { CAPACITY_MAX, RECHARGE_INTERVAL_MS, STORAGE_CAPACITY_KEY };

// Side-gutter slots for the desktop-only background mascot — mobile has zero spare vertical
// room here (the whole picker is tuned to fit one screen), so it only appears once there's
// real gutter space beside the centered content column.
const MASCOT_SLOTS = [
  { side: 'left', top: '20%' },
  { side: 'left', top: '62%' },
  { side: 'right', top: '30%' },
  { side: 'right', top: '68%' },
] as const;

const CLASSIFY_DEBOUNCE_MS = 800;

const GENRE_ICON_PALETTE = ['#F2A79B', '#9CC0EC', '#F6D98B'];
// index % 3 -> corner radius on the genre pill's icon swatch: rounded square, squarer, near-circle.
const GENRE_ICON_RADIUS = [6, 3, 12];

const VIBE_EXAMPLES = ['rainy drive at 2am, first day of summer...', 'Portishead', 'Bohemian Rhapsody'];

// Genre/mood pill grids default to just these, with the rest tucked behind a "+N more" toggle —
// keeps the whole seed screen visible without scrolling on mobile. If the current selection
// falls outside this set (e.g. restored from a saved project) it's swapped into the last slot
// so the active pick is never hidden behind the collapsed toggle.
const GENRE_PRIMARY = ['Lo-fi/Chill', 'R&B/Soul', 'Pop', 'Synthwave'];
const MOOD_PRIMARY = ['Warm', 'Melancholy', 'Nostalgic', 'Dreamy'];

// Shown when classification genuinely fails (LLM errored and the keyword heuristic had no
// signal either) — the real error is logged to console (see freetext-service.ts), this is just
// a gentle nudge toward the manual pickers rather than leaving the box looking broken.
const CLASSIFY_ERROR_MESSAGES = [
  "Drew a total blank on that one — good thing there's a picker right below.",
  'That one stumped us completely. The genre & mood dials still work great, though.',
  "Our ears just short-circuited. Manual mode has never let anyone down.",
  "No idea, honestly — but you clearly do. Pick a genre & mood below.",
];

const CUTE_WAITING_MESSAGES = [
  'Rummaging through crates of old vinyl...',
  'Asking the chord wizards nicely...',
  'Warming up the analog vacuum tubes...',
  'Dusting off the Fender Rhodes...',
  'Consulting the musical oracle...',
  'Polishing major 7th chords...',
  'Tuning the vintage synthesizer...',
  'Translating feelings into frequencies...',
  'Listening to the cosmic frequency...',
  'Channeling 80s synthwave energy...',
  'Humming a secret little melody...',
  'Strumming invisible guitar strings...',
  'Checking the vibe meters...',
  'Brewing a fresh cup of lo-fi beats...',
  'Setting the tape delay to 120ms...',
  'Counting the beats per minute...',
  'Mixing harmonizing magic...',
  'Summoning smooth jazz cats...',
  'Tweaking the resonance knob...',
  'Scanning the musical multiverse...',
];

@customElement('seed-screen')
export class SeedScreen extends LitElement {
  @property({ type: String }) genre = 'Pop';
  @property({ type: String }) mood = 'Dreamy';
  @property({ type: Number }) length = 4;

  @state() private freeText = '';
  @state() private placeholderIdx = 0;
  // Upgraded suggestion from the LLM classifier, once it resolves for the current text — null
  // can mean either "hasn't resolved yet" or "resolved, and there's genuinely no confident
  // answer," which llmResolved disambiguates. Falling back to the instant keyword heuristic in
  // the latter case would show a wrong guess as if it were real signal.
  @state() private llmSuggestion: NormalizedPrompt | null = null;
  @state() private llmResolved = false;
  @state() private classifyError: string | null = null;
  @state() private expandedGenre = false;
  @state() private expandedMood = false;
  @state() private mascot = rollMascot(0.35);
  @state() private mascotSlot = pickSlot(MASCOT_SLOTS);
  // A second, independent roll: very occasionally, a mascot peeks up from behind the vibe-input
  // pill instead — like the pill is a little window it's looking out of. Separate from the
  // gutter mascot above so the two don't always show together.
  @state() private peekMascot = rollMascot(0.18);
  @state() private peekSide: 'left' | 'right' = pickSlot(['left', 'right'] as const);

  @property({ type: Boolean }) isAuthenticated = false;
  @property({ type: String }) userEmail: string | null = null;
  @property({ type: Boolean }) isAdmin = false;
  @property({ type: Boolean }) isGenerating = false;
  @state() private currentProvider: LLMProvider = getLLMProvider();
  @state() private currentModel: string = getLLMModel();
  @state() private showAdminModal = false;
  @state() private isClassifying = false;
  @state() private loadingMsgIdx = 0;
  @state() private googleRemaining = 15;
  @state() private googleLimit = 15;
  @state() private googleCooldownSec = 4;
  @state() private orRemaining = 50;
  @state() private orLimit = 50;

  @state() private capacityCharges = CAPACITY_MAX;
  @state() private rechargeNextSec = 45;
  @state() private showCapacityNote = false;
  private unsubscribeCapacity: (() => void) | null = null;

  private spendCapacityCharge(): boolean {
    const success = capacityService.spendCharge();
    if (!success) {
      this.showCapacityNote = true;
    }
    return success;
  }

  private loadingTimer: ReturnType<typeof setInterval> | null = null;
  private cooldownTimer: ReturnType<typeof setInterval> | null = null;

  private startLoadingTimer() {
    this.stopLoadingTimer();
    this.loadingMsgIdx = Math.floor(Math.random() * CUTE_WAITING_MESSAGES.length);
    this.loadingTimer = setInterval(() => {
      let nextIdx = Math.floor(Math.random() * CUTE_WAITING_MESSAGES.length);
      if (nextIdx === this.loadingMsgIdx) {
        nextIdx = (nextIdx + 1) % CUTE_WAITING_MESSAGES.length;
      }
      this.loadingMsgIdx = nextIdx;
    }, 800);
  }

  private stopLoadingTimer() {
    if (this.loadingTimer) {
      clearInterval(this.loadingTimer);
      this.loadingTimer = null;
    }
  }

  private onLoginClick() {
    this.dispatchEvent(new CustomEvent('request-login', { bubbles: true, composed: true }));
  }

  private onLogoutClick() {
    this.dispatchEvent(new CustomEvent('request-logout', { bubbles: true, composed: true }));
    this.showAdminModal = false;
  }

  // Easter egg: click the wordmark 7 times fast to bring out the whole gang.
  private eggCounter = new EasterEggCounter();
  @state() private paradeTrigger = 0;

  private onWordmarkClick() {
    if (this.eggCounter.click()) this.paradeTrigger++;
  }

  private changeProvider(provider: LLMProvider) {
    this.currentProvider = provider;
    setLLMProvider(provider);
    if (provider === 'google') {
      this.currentModel = GOOGLE_MODELS[0].id;
      setLLMModel(this.currentModel);
    } else if (provider === 'opencodeai') {
      this.currentModel = OPENCODE_MODELS[0].id;
      setLLMModel(this.currentModel);
    }
  }

  private changeModel(modelId: string) {
    this.currentModel = modelId;
    setLLMModel(modelId);
  }

  // Jelly Aquarium 2D Physics Engine
  private jellyBodies: Array<{
    id: number;
    shapeKey: string;
    width: number;
    height: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    maxSpeed: number;
    drag: number;
    driftForce: number;
    restitution: number;
    radius: number;
    mass: number;
    angle: number;
    vRot: number;
    squishX: number;
    squishY: number;
    driftPhaseX: number;
    driftPhaseY: number;
    driftFreqX: number;
    driftFreqY: number;
  }> = [];

  private animFrameId: number | null = null;
  private mouseX: number | null = null;
  private mouseY: number | null = null;

  private initJellyBodies() {
    const rect = this.getBoundingClientRect();
    const width = rect.width > 0 ? rect.width : (typeof window !== 'undefined' ? window.innerWidth : 800);
    let height = rect.height > 0 ? rect.height : (typeof window !== 'undefined' ? window.innerHeight : 600);
    const spawnHeight = Math.min(height, 400);

    // Serene, soft, round jelly shapes
    const SHAPES = [
      { key: 'blob1', r: 20 },
      { key: 'blob2', r: 14 },
      { key: 'blob3', r: 17 },
      { key: 'circle', r: 16 },
      { key: 'pill', r: 16 },
      { key: 'arch', r: 15 },
      { key: 'squircle', r: 16 }
    ];

    // Pruned count (3 shapes) within strict motion budget for serene atmospheric drift
    const count = 3;
    const bodies = [];

    for (let i = 0; i < count; i++) {
      const s = SHAPES[i % SHAPES.length];
      const margin = s.r + 30;
      const x = margin + Math.random() * Math.max(100, width - margin * 2);
      const y = margin + Math.random() * Math.max(50, spawnHeight - margin * 2);

      // Ultra-slow, serene aquarium float speeds (0.08 - 0.25 px/frame)
      const speed = 0.08 + Math.random() * 0.18;
      const maxSpeed = 0.35 + Math.random() * 0.25;
      const drag = 0.985;
      const driftForce = 0.006 + Math.random() * 0.008;
      const restitution = 0.35;

      const angleDir = Math.random() * Math.PI * 2;

      bodies.push({
        id: i,
        shapeKey: s.key,
        width: s.r * 2,
        height: s.r * 2,
        x,
        y,
        vx: Math.cos(angleDir) * speed,
        vy: Math.sin(angleDir) * speed,
        maxSpeed,
        drag,
        driftForce,
        restitution,
        radius: s.r,
        mass: s.r * s.r,
        angle: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 0.05,
        squishX: 1.0,
        squishY: 1.0,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        driftFreqX: 0.6 + Math.random() * 0.5,
        driftFreqY: 0.6 + Math.random() * 0.5,
      });
    }
    this.jellyBodies = bodies;
  }

  private physicsLoop = () => {
    if (!this.isConnected) return;

    const now = performance.now();
    const rect = this.getBoundingClientRect();
    const width = rect.width > 0 ? rect.width : (typeof window !== 'undefined' ? window.innerWidth : 800);
    let height = rect.height > 0 ? rect.height : (typeof window !== 'undefined' ? window.innerHeight : 600);

    const divider = this.shadowRoot?.querySelector('.divider-row');
    if (divider) {
      const dividerRect = divider.getBoundingClientRect();
      if (dividerRect.top > rect.top) {
        height = dividerRect.top - rect.top;
      }
    }

    const bodies = this.jellyBodies;
    const numBodies = bodies.length;

    // 1. Fluid currents, mouse repulsion, & drag integration
    for (let i = 0; i < numBodies; i++) {
      const b = bodies[i];

      // Ultra-gentle ambient water currents
      b.vx += Math.sin(now * 0.0006 * b.driftFreqX + b.driftPhaseX) * b.driftForce;
      b.vy += Math.cos(now * 0.0007 * b.driftFreqY + b.driftPhaseY) * b.driftForce;

      // Soft mouse repulsion (gentle water ripple)
      if (this.mouseX !== null && this.mouseY !== null) {
        const dx = b.x - this.mouseX;
        const dy = b.y - this.mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0) {
          const force = (1 - dist / 140) * 0.12;
          b.vx += (dx / dist) * force;
          b.vy += (dy / dist) * force;
        }
      }

      // Fluid drag damping
      b.vx *= b.drag;
      b.vy *= b.drag;

      // Serene speed cap
      const speed = Math.hypot(b.vx, b.vy);
      if (speed > b.maxSpeed) {
        b.vx = (b.vx / speed) * b.maxSpeed;
        b.vy = (b.vy / speed) * b.maxSpeed;
      }

      // Position & slow rotation step
      b.x += b.vx;
      b.y += b.vy;
      b.angle += b.vRot;

      // Soft boundary wall bounce
      const margin = b.radius;
      if (b.x < margin) {
        b.x = margin;
        b.vx = Math.abs(b.vx) * b.restitution + 0.02;
        b.squishX = 0.88;
        b.squishY = 1.12;
      } else if (b.x > width - margin) {
        b.x = width - margin;
        b.vx = -Math.abs(b.vx) * b.restitution - 0.02;
        b.squishX = 0.88;
        b.squishY = 1.12;
      }

      if (b.y < margin) {
        b.y = margin;
        b.vy = Math.abs(b.vy) * b.restitution + 0.02;
        b.squishX = 1.12;
        b.squishY = 0.88;
      } else if (b.y > height - margin) {
        b.y = height - margin;
        b.vy = -Math.abs(b.vy) * b.restitution - 0.02;
        b.squishX = 1.12;
        b.squishY = 0.88;
      }

      // Gentle spring recovery for jelly squish
      b.squishX += (1.0 - b.squishX) * 0.08;
      b.squishY += (1.0 - b.squishY) * 0.08;
    }

    // 2. Soft, Cushion-like Bubble Collisions (Zero Chaos)
    for (let i = 0; i < numBodies; i++) {
      for (let j = i + 1; j < numBodies; j++) {
        const b1 = bodies[i];
        const b2 = bodies[j];
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.hypot(dx, dy);
        const minDist = b1.radius + b2.radius;

        if (dist < minDist && dist > 0) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;

          // Gently push apart
          b1.x -= nx * overlap * 0.4;
          b1.y -= ny * overlap * 0.4;
          b2.x += nx * overlap * 0.4;
          b2.y += ny * overlap * 0.4;

          // Soft impulse response (bubble nudge)
          const kx = b1.vx - b2.vx;
          const ky = b1.vy - b2.vy;
          const p = (nx * kx + ny * ky) / (b1.mass + b2.mass);
          const restitution = 0.35;

          b1.vx -= p * b2.mass * nx * restitution;
          b1.vy -= p * b2.mass * ny * restitution;
          b2.vx += p * b1.mass * nx * restitution;
          b2.vy += p * b1.mass * ny * restitution;

          // Subtle organic jelly compression
          const squishAmt = 0.12;
          b1.squishX = Math.max(0.85, 1 - squishAmt * Math.abs(nx));
          b1.squishY = Math.max(0.85, 1 - squishAmt * Math.abs(ny));
          b2.squishX = Math.max(0.85, 1 - squishAmt * Math.abs(nx));
          b2.squishY = Math.max(0.85, 1 - squishAmt * Math.abs(ny));
        }
      }
    }

    // 3. Ultra-fast hardware accelerated DOM update
    if (this.shadowRoot) {
      for (let i = 0; i < numBodies; i++) {
        const b = bodies[i];
        const el = this.shadowRoot.getElementById(`jelly-${b.id}`);
        if (el) {
          el.style.transform = `translate3d(${b.x - b.radius}px, ${b.y - b.radius}px, 0) rotate(${b.angle}deg) scale(${b.squishX}, ${b.squishY})`;
        }
      }
    }

    this.animFrameId = requestAnimationFrame(this.physicsLoop);
  };

  private onFrameMouseMove(e: MouseEvent) {
    const rect = this.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  private onFrameMouseLeave() {
    this.mouseX = null;
    this.mouseY = null;
  }

  private placeholderTimer: ReturnType<typeof setInterval> | null = null;
  private classifyDebounce: ReturnType<typeof setTimeout> | null = null;
  private classifyToken = 0;

  get currentLimit() {
    return this.currentProvider === 'openrouter' ? this.orLimit : this.googleLimit;
  }

  get currentRemaining() {
    return this.currentProvider === 'openrouter' ? this.orRemaining : this.googleRemaining;
  }

  private loadKeyInfo() {
    fetchGlobalRateLimit().then(info => {
      if (info) {
        if (info.google) {
          this.googleLimit = info.google.limit;
          this.googleRemaining = info.google.remaining;
          this.googleCooldownSec = info.google.cooldownSeconds;
        }
        if (info.openrouter) {
          this.orLimit = info.openrouter.limit;
          this.orRemaining = info.openrouter.remaining;
        }
        this.startCooldownTimer();
      }
    });
  }

  private startCooldownTimer() {
    if (this.cooldownTimer) clearInterval(this.cooldownTimer);
    this.cooldownTimer = setInterval(() => {
      if (this.googleRemaining < this.googleLimit) {
        this.googleRemaining += 1;
      } else {
        if (this.cooldownTimer) {
          clearInterval(this.cooldownTimer);
          this.cooldownTimer = null;
        }
      }
    }, this.googleCooldownSec * 1000);
  }

  connectedCallback() {
    super.connectedCallback();
    this.placeholderTimer = setInterval(() => {
      this.placeholderIdx = (this.placeholderIdx + 1) % VIBE_EXAMPLES.length;
    }, 2800);
    this.unsubscribeCapacity = capacityService.subscribe((state) => {
      this.capacityCharges = state.charges;
      this.rechargeNextSec = state.rechargeNextSec;
      this.requestUpdate();
    });
    this.loadKeyInfo();
    this.initJellyBodies();
  }

  firstUpdated() {
    this.loadKeyInfo();
    if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.animFrameId = requestAnimationFrame(this.physicsLoop);
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('isAdmin') && this.isAdmin) {
      this.loadKeyInfo();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    if (this.placeholderTimer) clearInterval(this.placeholderTimer);
    if (this.classifyDebounce) clearTimeout(this.classifyDebounce);
    if (this.cooldownTimer) clearInterval(this.cooldownTimer);
    if (this.unsubscribeCapacity) {
      this.unsubscribeCapacity();
      this.unsubscribeCapacity = null;
    }
    this.stopLoadingTimer();
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
      padding: 24px 32px 80px;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .wordmark-text {
      font-size: 15.5px;
      font-weight: 800;
      letter-spacing: 0.2px;
      color: var(--cv-ink);
    }
    .content {
      width: 100%;
      max-width: 520px;
      margin-top: 10px;
    }
    .hero {
      position: relative;
      text-align: center;
      margin-bottom: 28px;
    }
    .aquarium-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    }
    .jelly-shape-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      will-change: transform;
      transform-origin: center;
    }
    .wordmark, .mascot-parade, .content, .admin-modal-backdrop {
      position: relative;
      z-index: 2;
    }
    h1 {
      margin: 0;
      font-size: clamp(30px, 5.5vw, 42px);
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 16px;
      line-height: 1.65;
      color: #6B5F50;
      margin-top: 14px;
    }
    .vibe-input-shell {
      position: relative;
      margin-top: 28px;
    }
    .vibe-input-wrap {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--cv-cream, #FBF3E6);
      border: 1.5px solid rgba(46, 39, 31, 0.1);
      border-radius: 100px;
      padding: 8px 10px 8px 20px;
      box-shadow: 0 14px 30px -20px rgba(46, 39, 31, 0.5);
    }
    .capacity-note {
      text-align: center;
      margin-top: 8px;
      font-size: 12px;
      font-weight: 700;
      color: var(--cv-label);
      cursor: pointer;
      user-select: none;
      transition: opacity 0.2s ease;
    }
    .vibe-capacity-chip {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      font-family: inherit;
      color: #6B5F50;
      background: rgba(46, 39, 31, 0.05);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      border-radius: 100px;
      cursor: pointer;
      user-select: none;
      transition: background 200ms ease, border-color 200ms ease, transform 150ms var(--cv-ease);
    }
    .vibe-capacity-chip:hover {
      background: rgba(46, 39, 31, 0.09);
      border-color: rgba(46, 39, 31, 0.2);
    }
    .vibe-capacity-chip.low {
      border-color: rgba(224, 138, 60, 0.5);
      color: #9E5212;
    }
    .pips-wrap {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .pip {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(46, 39, 31, 0.18);
      transition: background 200ms ease;
    }
    .pip.filled {
      background: #F2735F;
    }
    .pip.filled.low {
      background: #E08A3C;
    }
    @keyframes cv-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .vibe-input-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      color: var(--cv-label);
      animation: cv-spin 1s linear infinite;
    }
    .vibe-submit-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
      color: var(--cv-ink);
      box-shadow: 0 4px 12px -4px rgba(46, 39, 31, 0.25);
      transition: transform 160ms var(--cv-ease), opacity 200ms ease, background 200ms ease;
    }
    .vibe-submit-btn:hover {
      transform: scale(1.06);
    }
    .vibe-submit-btn:active {
      transform: scale(0.95);
    }
    .vibe-submit-btn.disabled {
      opacity: 0.45;
      cursor: default;
      pointer-events: none;
    }
    .vibe-submit-btn.generating {
      cursor: wait;
      pointer-events: none;
    }
    .vibe-spinner {
      animation: cv-spin 0.75s linear infinite;
    }
    .vibe-input-wrap.generating {
      border-color: rgba(46, 39, 31, 0.35);
      box-shadow: 0 0 0 3px rgba(246, 217, 139, 0.35), 0 14px 32px -16px rgba(46, 39, 31, 0.35);
      animation: cv-input-pulse 1.8s ease-in-out infinite;
    }
    @keyframes cv-input-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.008); }
    }
    .cta.generating {
      cursor: wait;
      pointer-events: none;
    }
    .generating-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 10px;
      font-size: 13px;
      font-weight: 600;
      color: #5B5145;
      animation: cv-status-fade 0.25s ease-out;
    }
    @keyframes cv-status-fade {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .generating-dot-pulse {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .generating-dot-pulse span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #8A6B3F;
      animation: cv-bounce 1.2s infinite ease-in-out both;
    }
    .generating-dot-pulse span:nth-child(1) { animation-delay: -0.32s; }
    .generating-dot-pulse span:nth-child(2) { animation-delay: -0.16s; }
    .generating-dot-pulse span:nth-child(3) { animation-delay: 0s; }
    @keyframes cv-bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.35; }
      40% { transform: scale(1.2); opacity: 1; }
    }
    /* Peeks up from behind the pill's top edge — z-index 0 vs. the pill's 1 means the pill's
       own (opaque) background paints over the lower portion, so only the top sliver shows,
       like the character is looking out over the rim of a little window. */
    .vibe-peek {
      position: absolute;
      top: -14px;
      z-index: 0;
      pointer-events: none;
    }
    .vibe-peek.left { left: 22px; }
    .vibe-peek.right { right: 34px; }
    .vibe-input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: 15px;
      font-weight: 600;
      color: var(--cv-ink);
      padding: 10px 0;
      min-width: 0;
    }
    .vibe-input:focus,
    .vibe-input:focus-visible {
      outline: none;
    }
    .vibe-input-wrap:focus-within {
      border-color: rgba(46, 39, 31, 0.28);
      box-shadow: 0 14px 32px -16px rgba(46, 39, 31, 0.45);
    }
    .vibe-input::placeholder {
      color: rgba(46, 39, 31, 0.55);
      opacity: 1;
      transition: color 0.3s ease;
    }
    button:focus-visible {
      outline: 2.5px solid var(--cv-ink);
      outline-offset: 2px;
    }
    .suggestion-wrap {
      text-align: center;
      margin-top: 12px;
    }
    .suggestion-note {
      display: inline-block;
      padding: 9px 18px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-55);
      opacity: 1;
      transform: translateY(0);
      transition: opacity 180ms var(--cv-ease), transform 180ms var(--cv-ease);
    }
    @starting-style {
      .suggestion-note {
        opacity: 0;
        transform: translateY(-4px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      @starting-style {
        .suggestion-note {
          transform: none;
        }
      }
    }
    .suggestion-note.error {
      font-style: italic;
    }
    .suggestion-note.loading {
      color: var(--cv-ink-muted);
      font-style: italic;
      font-weight: 600;
      animation: cv-pulse-fade 1.4s ease-in-out infinite;
    }
    @keyframes cv-pulse-fade {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1.0; }
    }
    .suggestion-highlight {
      font-weight: 800;
    }
    .divider-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 36px 0 8px;
    }
    .divider-rule {
      flex: 1;
      height: 1px;
      background: rgba(46, 39, 31, 0.14);
    }
    .divider-label {
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #8A6B3F;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .section-label {
      margin-top: 26px;
      margin-bottom: 10px;
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #8A6B3F;
      text-transform: uppercase;
      text-align: left;
    }
    .pill-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-start;
    }
    .pill {
      display: flex;
      align-items: center;
      padding: 9px 18px 9px 12px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      background: var(--cv-surface-2);
      color: #5B5145;
      opacity: 1;
      transform: translateY(0);
      transition: transform 150ms var(--cv-ease), background 150ms var(--cv-ease), color 150ms var(--cv-ease), opacity 180ms var(--cv-ease);
    }
    @starting-style {
      .pill {
        opacity: 0;
        transform: translateY(6px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      @starting-style {
        .pill {
          transform: none;
        }
      }
    }
    .pill:active {
      transform: scale(0.96);
    }
    .pill.selected {
      color: var(--cv-ink);
    }
    .genre-icon-wrap {
      width: 22px;
      height: 22px;
      border-radius: 7px;
      background: var(--cv-ink-08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      flex-shrink: 0;
    }
    .pill.toggle {
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      color: var(--cv-label);
      padding: 9px 18px;
    }
    .mood-pill {
      padding: 8px 18px 8px 8px;
    }
    .mood-badge {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 9px;
      flex-shrink: 0;
      transition: background 150ms var(--cv-ease);
    }
    .length-control {
      background: #F1E4CC;
      border-radius: 18px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .length-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--cv-cream);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 150ms var(--cv-ease);
    }
    .length-btn:active {
      transform: scale(0.92);
    }
    .length-btn.disabled {
      opacity: 0.35;
      cursor: default;
    }
    .length-segments {
      display: flex;
      gap: 6px;
      flex: 1;
    }
    .length-segment {
      flex: 1;
      height: 14px;
      border-radius: 6px;
      background: var(--cv-ink-10);
      transition: background 150ms var(--cv-ease);
    }
    .length-segment.filled {
      background: var(--cv-red);
    }
    .length-label-text {
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink-muted);
      white-space: nowrap;
    }
    .cta {
      width: 100%;
      border: none;
      color: var(--cv-ink);
      padding: 18px;
      border-radius: 100px;
      font-family: inherit;
      font-weight: 800;
      font-size: 16px;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      cursor: pointer;
      margin-top: 30px;
      transition: transform 160ms var(--cv-ease);
    }
    .cta:active {
      transform: scale(0.97);
    }
    .caption {
      text-align: center;
      font-size: 13px;
      color: #8A7C6B;
      margin-top: 14px;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 40px;
      font-size: 12px;
      color: rgba(46, 39, 31, 0.4);
    }
    .footer-link {
      display: flex;
      align-items: center;
      gap: 5px;
      color: inherit;
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .footer-link:hover {
      color: var(--cv-red-deep);
    }
    .footer-divider {
      opacity: 0.6;
    }

    .mascot-slot {
      display: none;
      position: absolute;
      z-index: 1;
      opacity: 0.9;
    }
    @media (min-width: 980px) and (min-height: 700px) {
      .mascot-slot { display: block; }
      .mascot-slot.left { left: 40px; }
      .mascot-slot.right { right: 40px; }
    }

    @media (max-width: 600px) {
      .frame { padding: 16px 20px 40px; }
      .content { max-width: 100%; }
      .hero { margin-bottom: 20px; }
      h1 { font-size: 26px; line-height: 1.16; }
      .subcopy { margin-top: 10px; font-size: 13px; line-height: 1.6; }
      .vibe-input-shell { margin-top: 20px; }
      .vibe-input-wrap { padding: 6px 8px 6px 14px; }
      .vibe-submit-btn { width: 38px; height: 38px; }
      .divider-row { margin: 24px 0 12px; }
      .section-label { margin-top: 22px; margin-bottom: 8px; font-size: 11px; }
      .pill-grid { gap: 7px; }
      .pill { padding: 7px 14px 7px 9px; font-size: 12.5px; }
      .genre-icon-wrap { width: 18px; height: 18px; margin-right: 6px; }
      .mood-badge { width: 20px; height: 20px; margin-right: 6px; }
      .length-control { padding: 12px 16px; border-radius: 16px; }
      .cta { margin-top: 24px; padding: 15px; font-size: 15px; }
      .caption { margin-top: 10px; font-size: 12px; }
      .footer { margin-top: 24px; font-size: 11px; }
    }

    .footer-admin-btn {
      background: none;
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-55);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .footer-admin-btn:hover {
      border-color: var(--cv-ink-30);
      color: var(--cv-ink);
      background: rgba(255,255,255,0.4);
    }
    .admin-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(46, 39, 31, 0.4);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 1;
      transition: opacity 220ms ease, backdrop-filter 220ms ease;
    }
    .admin-modal {
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 24px;
      padding: 24px;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 24px 48px -12px rgba(46, 39, 31, 0.35);
      text-align: left;
      opacity: 1;
      transform: scale(1) translateY(0);
      transition: opacity 240ms var(--cv-ease), transform 260ms var(--cv-ease);
    }
    @starting-style {
      .admin-modal-backdrop {
        opacity: 0;
      }
      .admin-modal {
        opacity: 0;
        transform: scale(0.95) translateY(8px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .admin-modal {
        transition: opacity 150ms ease;
        transform: none !important;
      }
    }
    .admin-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-bottom: 6px;
    }
    .admin-desc {
      font-size: 13px;
      color: var(--cv-ink-muted);
      margin-bottom: 18px;
      line-height: 1.45;
    }
    .admin-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    .admin-opt {
      text-align: left;
      background: rgba(255, 255, 255, 0.6);
      border: 1.5px solid var(--cv-ink-12);
      border-radius: 14px;
      padding: 14px 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .admin-opt.active {
      border-color: var(--cv-ink);
      background: #ffffff;
      box-shadow: 0 4px 14px rgba(46, 39, 31, 0.08);
    }
    .admin-opt:hover {
      border-color: var(--cv-ink-30);
    }
    .opt-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--cv-ink);
    }
    .opt-detail {
      font-size: 11.5px;
      color: var(--cv-ink-muted);
      margin-top: 3px;
      line-height: 1.35;
    }
    .model-sub-list {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed var(--cv-ink-14);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .model-sub-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--cv-ink-55);
      margin-bottom: 2px;
    }
    .model-sub-opt {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid var(--cv-ink-14);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      color: var(--cv-ink);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .model-sub-opt:hover {
      border-color: var(--cv-ink-30);
      background: #ffffff;
    }
    .model-sub-opt.selected {
      background: var(--cv-ink);
      color: #ffffff;
      border-color: var(--cv-ink);
    }
    .model-vendor-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.08);
      color: inherit;
    }
    .model-sub-opt.selected .model-vendor-badge {
      background: rgba(255, 255, 255, 0.2);
    }
    .admin-close {
      width: 100%;
      background: var(--cv-ink);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 12px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      font-family: inherit;
      transition: opacity 0.2s ease;
    }
    .admin-close:hover {
      opacity: 0.9;
    }
    .logged-out-box {
      margin-top: 28px;
      background: rgba(255, 255, 255, 0.65);
      border: 1.5px solid var(--cv-ink-12);
      border-radius: 24px;
      padding: 36px 24px;
      text-align: center;
      box-shadow: 0 16px 36px -12px rgba(46, 39, 31, 0.12);
    }
    .logged-out-title {
      font-size: 20px;
      font-weight: 800;
      color: var(--cv-ink);
      margin-bottom: 8px;
    }
    .logged-out-sub {
      font-size: 14px;
      color: var(--cv-ink-muted);
      margin-bottom: 24px;
      line-height: 1.5;
      max-width: 380px;
      margin-left: auto;
      margin-right: auto;
    }
    .cta-google {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #ffffff;
      color: var(--cv-ink);
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 100px;
      padding: 12px 24px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(46, 39, 31, 0.08);
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .cta-google:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(46, 39, 31, 0.14);
      border-color: var(--cv-ink-30);
    }
    .footer-login-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: 1.5px solid var(--cv-ink-14);
      border-radius: 20px;
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-55);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .footer-login-btn:hover {
      border-color: var(--cv-ink-30);
      color: var(--cv-ink);
      background: rgba(255, 255, 255, 0.4);
    }
    .admin-logout {
      margin-top: 12px;
      background: transparent;
      border: 1.5px solid var(--cv-ink-14);
      color: var(--cv-ink-muted);
      border-radius: 12px;
      padding: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      width: 100%;
      font-family: inherit;
      transition: all 0.2s ease;
    }
    .admin-logout:hover {
      border-color: #e53935;
      color: #e53935;
    }
    .your-sets-btn {
      position: absolute;
      top: 24px;
      right: 24px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--cv-surface-2);
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
      cursor: pointer;
      border: 1.5px solid var(--cv-ink-14);
      z-index: 10;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .your-sets-btn:hover {
      background: var(--cv-ink-08);
    }
    .your-sets-btn:active {
      transform: scale(0.96);
    }
    @media (max-width: 600px) {
      .your-sets-btn {
        top: 24px;
        right: 64px;
        padding: 6px 12px;
        font-size: 12px;
      }
    }
  `;

  private selectGenre(name: string) {
    this.dispatchEvent(new CustomEvent('genre-change', { detail: name, bubbles: true, composed: true }));
  }

  private selectMood(name: string) {
    this.dispatchEvent(new CustomEvent('mood-change', { detail: name, bubbles: true, composed: true }));
  }

  private generate = () => {
    if (this.isGenerating) return;
    if (this.capacityCharges <= 0) {
      this.showCapacityNote = true;
      return;
    }
    this.spendCapacityCharge();
    this.dispatchEvent(new CustomEvent('generate', { detail: { promptText: this.freeText.trim() }, bubbles: true, composed: true }));
  };

  private setLength(n: number) {
    this.dispatchEvent(new CustomEvent('length-change', { detail: n, bubbles: true, composed: true }));
  }

  private decLength() {
    if (this.length > MIN_PROGRESSION_LENGTH) this.setLength(this.length - 1);
  }

  private incLength() {
    if (this.length < MAX_PROGRESSION_LENGTH) this.setLength(this.length + 1);
  }

  private onFreeTextChange(e: Event) {
    this.freeText = (e.target as HTMLInputElement).value;
  }

  private applyBest(best: NormalizedPrompt) {
    this.selectGenre(best.genre);
    this.selectMood(best.mood);
    const detail = { ...best, promptText: this.freeText.trim() };
    this.dispatchEvent(new CustomEvent('freetext-suggestion-applied', { detail, bubbles: true, composed: true }));
  }

  private renderJellySvg(key: string) {
    switch (key) {
      case 'blob1':
        return html`<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>`;
      case 'blob2':
        return html`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2C18 2 22 8 22 14C22 20 16 22 10 22C4 22 2 16 2 10C2 4 6 2 12 2Z" fill="#F2A79B" opacity="0.9"/></svg>`;
      case 'blob3':
        return html`<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 2C24 2 30 7 30 16C30 25 22 30 14 30C6 30 2 23 2 14C2 5 8 2 16 2Z" fill="#F2C9A0"/></svg>`;
      case 'circle':
        return html`<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#9CC0EC"/></svg>`;
      case 'dot':
        return html`<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#9CC0EC"/></svg>`;
      case 'ring':
        return html`<svg width="44" height="44" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#9CC0EC" stroke-width="6" opacity="0.6"/></svg>`;
      case 'doubleRing':
        return html`<svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#9CC0EC" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="#9CC0EC"/></svg>`;
      case 'pill':
        return html`<svg width="34" height="20" viewBox="0 0 34 20"><rect x="2" y="2" width="30" height="16" rx="8" fill="#F2C9A0"/></svg>`;
      case 'crescent':
        return html`<svg width="30" height="30" viewBox="0 0 30 30"><path d="M18 4A14 14 0 1 0 28 22 11 11 0 1 1 18 4z" fill="#C9A9E0"/></svg>`;
      case 'arch':
        return html`<svg width="36" height="22" viewBox="0 0 36 20"><path d="M2 18 A 16 16 0 0 1 34 18 Z" fill="#B8CC9E" opacity="0.85"/></svg>`;
      case 'squircle':
        return html`<svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="12" fill="#9CC0EC"/></svg>`;
      case 'oval':
        return html`<svg width="32" height="22" viewBox="0 0 32 22"><ellipse cx="16" cy="11" rx="14" ry="9" fill="#B8CC9E"/></svg>`;
      case 'donut':
        return html`<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#C6564B" stroke-width="6" opacity="0.75"/></svg>`;
      default:
        return html`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#F6D98B"/></svg>`;
    }
  }

  render() {
    const moodColor = getMoodColor(this.mood);

    // Primary set always shown, current selection swapped into the last slot if it falls
    // outside that set (e.g. a restored project), rest tucked behind a "+N more" toggle.
    let primaryGenres = GENRE_PRIMARY.filter(n => GENRES.includes(n));
    if (!primaryGenres.includes(this.genre)) primaryGenres = primaryGenres.slice(0, -1).concat(this.genre);
    const restGenres = GENRES.filter(n => !primaryGenres.includes(n));
    const shownGenres = this.expandedGenre ? primaryGenres.concat(restGenres) : primaryGenres;

    const allMoodNames = MOODS.map(m => m.name);
    let primaryMoodNames = MOOD_PRIMARY.filter(n => allMoodNames.includes(n));
    if (!primaryMoodNames.includes(this.mood)) primaryMoodNames = primaryMoodNames.slice(0, -1).concat(this.mood);
    const restMoodNames = allMoodNames.filter(n => !primaryMoodNames.includes(n));
    const shownMoodNames = this.expandedMood ? primaryMoodNames.concat(restMoodNames) : primaryMoodNames;
    const shownMoods = shownMoodNames.map(n => MOODS.find(m => m.name === n)!);
    const freeTextTrimmed = this.freeText.trim();
    const best: NormalizedPrompt | null = freeTextTrimmed.length > 2 ? heuristicClassify(freeTextTrimmed) : null;

    return html`
      <div class="frame" @mousemove=${this.onFrameMouseMove} @mouseleave=${this.onFrameMouseLeave}>
        <app-header
          hideCapacity
          .isAdmin=${this.isAdmin}
          .capacityCharges=${this.capacityCharges}
          .capacityMax=${CAPACITY_MAX}
          .rechargeNextSec=${this.rechargeNextSec}
          .isAuthenticated=${this.isAuthenticated}
          .userEmail=${this.userEmail}
          @view-sets=${() => this.dispatchEvent(new CustomEvent('view-sets', { bubbles: true, composed: true }))}
          @request-login=${() => this.dispatchEvent(new CustomEvent('request-login', { bubbles: true, composed: true }))}
          @request-logout=${() => this.dispatchEvent(new CustomEvent('request-logout', { bubbles: true, composed: true }))}
          @open-admin-modal=${() => { this.showAdminModal = true; }}
          @wordmark-click=${() => this.onWordmarkClick()}
        ></app-header>

        <div class="aquarium-layer">
          ${this.jellyBodies.map(b => html`
            <div class="jelly-shape-wrapper" id="jelly-${b.id}" style="transform: translate3d(${b.x - b.radius}px, ${b.y - b.radius}px, 0) rotate(${b.angle}deg) scale(${b.squishX}, ${b.squishY})">
              ${this.renderJellySvg(b.shapeKey)}
            </div>
          `)}
        </div>

        ${this.mascot.show ? html`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${0.75}></mascot-character>
          </div>
        ` : ''}

        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        <div class="content">
          <div style="position:relative;text-align:center;margin-bottom:28px;">
            <svg style="position:absolute;top:-34px;left:-6px;animation:cvfv-float1 14s ease-in-out infinite;transform-origin:center;pointer-events:none;" width="46" height="46" viewBox="0 0 38 38"><path d="M19 2C28 2 36 9 36 19C36 29 28 36 18 36C8 36 2 27 2 18C2 9 10 2 19 2Z" fill="#F6D98B"/></svg>
            <svg style="position:absolute;bottom:-22px;right:-30px;animation:cvfv-float2 17s ease-in-out infinite;transform-origin:center;pointer-events:none;" width="38" height="38" viewBox="0 0 30 30"><rect x="2" y="2" width="26" height="26" rx="9" fill="#9CC0EC"/></svg>
            <svg style="position:absolute;top:-16px;right:56px;animation:cvfv-float3 20s ease-in-out infinite;animation-delay:-4s;transform-origin:center;pointer-events:none;" width="54" height="54" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#F2A79B" stroke-width="6" opacity="0.6"/></svg>

            <h1 style="font-size:40px;font-weight:800;line-height:1.14;letter-spacing:-0.02em;color:#2E271F;margin:0;">Describe a vibe,<br />hear it as chords.</h1>
            <div style="font-size:15.5px;line-height:1.65;color:#6B5F50;margin-top:12px;">Type a feeling in your own words — or pick a genre and mood below.</div>
          </div>

          <div class="vibe-input-shell">
            ${this.peekMascot.show ? html`
              <div class="vibe-peek ${this.peekSide}">
                <mascot-character .kind=${this.peekMascot.kind} .scale=${0.4}></mascot-character>
              </div>
            ` : ''}
            <div class="vibe-input-wrap ${this.isGenerating ? 'generating' : ''}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cv-label, #8A6B3F)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>
              </svg>
              <input
                type="text"
                class="vibe-input"
                .value=${this.freeText}
                ?disabled=${this.isGenerating}
                @input=${(e: Event) => this.onFreeTextChange(e)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Enter' && !this.isGenerating) {
                    e.preventDefault();
                    this.generate();
                  }
                }}
                placeholder=${this.isGenerating ? 'Composing your chords...' : VIBE_EXAMPLES[this.placeholderIdx]}
              />
              <button
                class="vibe-capacity-chip ${this.capacityCharges <= 1 ? 'low' : ''}"
                @click=${(e: Event) => { e.stopPropagation(); this.showCapacityNote = !this.showCapacityNote; }}
                title=${this.capacityCharges > 0
                  ? `${this.capacityCharges} of ${CAPACITY_MAX} AI generates left. One comes back every ${this.rechargeNextSec > 0 ? this.rechargeNextSec : 45}s.`
                  : `Cooling down — next one unlocks in ${Math.floor(this.rechargeNextSec / 60)}:${String(this.rechargeNextSec % 60).padStart(2, '0')}`}
                aria-label="AI generates remaining"
                type="button"
              >
                <span class="pips-wrap">
                  ${Array.from({ length: CAPACITY_MAX }, (_, i) => html`
                    <span class="pip ${i < this.capacityCharges ? 'filled' : ''} ${this.capacityCharges <= 1 ? 'low' : ''}"></span>
                  `)}
                </span>
                <span>${this.capacityCharges > 0 ? `${this.capacityCharges} left` : `+1 in ${this.rechargeNextSec}s`}</span>
              </button>
              <button
                class="vibe-submit-btn ${!this.freeText.trim() || this.capacityCharges <= 0 || this.isGenerating ? 'disabled' : ''} ${this.isGenerating ? 'generating' : ''}"
                style="background: ${moodColor}; opacity: ${this.capacityCharges > 0 && !this.isGenerating ? '1' : '0.6'};"
                @click=${(e: Event) => { e.stopPropagation(); this.generate(); }}
                aria-label=${this.isGenerating ? 'Composing chords' : 'Hear this vibe as chords'}
                title=${this.isGenerating ? 'Composing chords...' : 'Generate progression from vibe'}
                ?disabled=${this.isGenerating}
              >
                ${this.isGenerating ? html`
                  <svg class="vibe-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round">
                    <circle cx="12" cy="12" r="9" stroke="rgba(46,39,31,0.2)" stroke-width="2.6"/>
                    <path d="M12 3a9 9 0 0 1 9 9" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"/>
                  </svg>
                ` : html`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                `}
              </button>
            </div>
            ${this.isGenerating ? html`
              <div class="generating-status">
                <div class="generating-dot-pulse">
                  <span></span><span></span><span></span>
                </div>
                <span>Finding chords for <strong>${this.freeText.trim() ? `"${this.freeText.trim()}"` : `${this.genre} · ${this.mood}`}</strong>...</span>
              </div>
            ` : ''}
            ${this.showCapacityNote ? html`
              <div class="capacity-note" @click=${() => { this.showCapacityNote = false; }}>
                ${this.capacityCharges > 0
                  ? `${this.capacityCharges} of ${CAPACITY_MAX} generates left`
                  : `Cooling down — one more in ${this.rechargeNextSec}s`}
              </div>
            ` : ''}
          </div>
          ${best ? html`
            <div style="text-align:center;margin-top:10px;">
              <div style="display:inline-flex;align-items:center;gap:6px;border:1.5px solid ${moodColor};color:#2E271F;padding:8px 16px;border-radius:100px;font-size:12.5px;font-weight:700;cursor:pointer;background:#FBF3E6;transition:transform 150ms ease;" @click=${() => this.applyBest(best!)}>
                Try <span style="font-weight:800;">${best.genre} · ${best.mood}</span> →
              </div>
            </div>
          ` : ''}

          <div class="divider-row">
            <div class="divider-rule"></div>
            <div class="divider-label">or pick it yourself</div>
            <div class="divider-rule"></div>
          </div>

          <div class="section-label">Genre</div>
          <div class="pill-grid">
            ${shownGenres.map(name => {
              const i = GENRES.indexOf(name);
              return html`
                <div class="pill ${name === this.genre ? 'selected' : ''}" style=${name === this.genre ? `background:${moodColor}` : ''} @click=${() => this.selectGenre(name)}>
                  <div class="genre-icon-wrap">
                    <svg width="12" height="12" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx=${GENRE_ICON_RADIUS[i % 3]} fill=${GENRE_ICON_PALETTE[i % 3]} />
                    </svg>
                  </div>
                  ${name}
                </div>
              `;
            })}
            ${restGenres.length ? html`
              <div class="pill toggle" @click=${() => { this.expandedGenre = !this.expandedGenre; }}>
                ${this.expandedGenre ? 'Show less ⌃' : `+${restGenres.length} more ⌄`}
              </div>
            ` : ''}
          </div>

          <div class="section-label">Mood</div>
          <div class="pill-grid">
            ${shownMoods.map(m => html`
              <div class="pill mood-pill ${m.name === this.mood ? 'selected' : ''}" style=${m.name === this.mood ? `background:${m.dot}` : ''} @click=${() => this.selectMood(m.name)}>
                <div class="mood-badge" style="background:${m.name === this.mood ? 'rgba(46,39,31,0.1)' : m.dot + '33'}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke=${m.dot} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d=${m.iconPath} />
                  </svg>
                </div>
                ${m.name}
              </div>
            `)}
            ${restMoodNames.length ? html`
              <div class="pill toggle" @click=${() => { this.expandedMood = !this.expandedMood; }}>
                ${this.expandedMood ? 'Show less ⌃' : `+${restMoodNames.length} more ⌄`}
              </div>
            ` : ''}
          </div>

          <div class="section-label">Length</div>
          <div class="length-control">
            <div class="length-btn ${this.length <= MIN_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => this.decLength()}>−</div>
            <div class="length-segments">
              ${Array.from({ length: MAX_PROGRESSION_LENGTH }, (_, i) => html`
                <div class="length-segment ${i < this.length ? 'filled' : ''}"></div>
              `)}
            </div>
            <div class="length-btn ${this.length >= MAX_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => this.incLength()}>+</div>
            <div class="length-label-text">${this.length} ${this.length === 1 ? 'chord' : 'chords'}</div>
          </div>

          <button
            class="cta ${this.capacityCharges <= 0 || this.isGenerating ? 'disabled' : ''} ${this.isGenerating ? 'generating' : ''}"
            style="background:${moodColor}; opacity: ${this.capacityCharges > 0 && !this.isGenerating ? '1' : '0.6'};"
            @click=${this.generate}
            ?disabled=${this.isGenerating}
          >
            ${this.isGenerating ? html`
              <svg class="vibe-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round">
                <circle cx="12" cy="12" r="9" stroke="rgba(46,39,31,0.2)" stroke-width="2.6"/>
                <path d="M12 3a9 9 0 0 1 9 9" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"/>
              </svg>
              <span>Composing chords...</span>
            ` : html`
              ${best ? "Let's go to your progression" : 'Generate loop'} <span>→</span>
            `}
          </button>
          <div class="caption">Nothing here is permanent — swap any chord after.</div>

          <div class="footer">
            <a class="footer-link" href="https://github.com/warmsynths/chroma-chords" target="_blank" rel="noopener">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
              GitHub
            </a>
            <span class="footer-divider">·</span>
            <span>Made with ❤️ by warmsynths</span>
            <span class="footer-divider">·</span>
            <a class="footer-link" href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">Ko-fi</a>
          </div>
        </div>

        ${this.showAdminModal ? html`
          <div class="admin-modal-backdrop" @click=${() => { this.showAdminModal = false; }}>
            <div class="admin-modal" @click=${(e: Event) => e.stopPropagation()}>
              <div class="admin-title">AI Provider Config</div>
              <div class="admin-desc">Select which backend model service classifies free-text prompts into chord progressions:</div>
              <div class="admin-desc" style="color: var(--cv-ink); font-weight: 700; margin-top: 4px;">
                📊 Daily OpenRouter Quota: ${this.orRemaining} / ${this.orLimit} remaining
              </div>
              <div class="admin-desc" style="color: var(--cv-ink); font-weight: 700; margin-top: 4px;">
                📊 Google AI Quota: ${this.googleRemaining} / ${this.googleLimit} (per min)
              </div>
              <div class="admin-options">
                <button class="admin-opt ${this.currentProvider === 'google' ? 'active' : ''}" @click=${() => this.changeProvider('google')}>
                  <div class="opt-name">🎯 Google AI Studio (Free)</div>
                  <div class="opt-detail">Gemini Flash models directly via free tier (No deposit required)</div>
                  ${this.currentProvider === 'google' ? html`
                    <div class="model-sub-list" @click=${(e: Event) => e.stopPropagation()}>
                      <div class="model-sub-title">Select Model:</div>
                      ${GOOGLE_MODELS.map(m => html`
                        <div class="model-sub-opt ${this.currentModel === m.id ? 'selected' : ''}" @click=${() => this.changeModel(m.id)}>
                          <span>${m.name}</span>
                          <span class="model-vendor-badge" style="background: rgba(66, 133, 244, 0.15); color: #4285F4; border-color: rgba(66, 133, 244, 0.3);">${m.vendor}</span>
                        </div>
                      `)}
                    </div>
                  ` : ''}
                </button>
                <button class="admin-opt ${this.currentProvider === 'openrouter' ? 'active' : ''}" @click=${() => this.changeProvider('openrouter')}>
                  <div class="opt-name">🌐 OpenRouter (Free Tier LLMs)</div>
                  <div class="opt-detail">Google Gemma 4, GPT-OSS, Ling 3.0 (Automatic multi-model fallback)</div>
                </button>
                <button class="admin-opt ${this.currentProvider === 'anthropic' ? 'active' : ''}" @click=${() => this.changeProvider('anthropic')}>
                  <div class="opt-name">🧠 Anthropic (Claude Haiku 4.5)</div>
                  <div class="opt-detail">Direct call to Claude Haiku via Worker (requires ANTHROPIC_API_KEY secret set on Cloudflare)</div>
                </button>
              </div>
              <button class="admin-close" @click=${() => { this.showAdminModal = false; }}>Done</button>
              <button class="admin-logout" @click=${this.onLogoutClick}>Sign Out</button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'seed-screen': SeedScreen;
  }
}
