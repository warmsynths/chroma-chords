import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// ─── Scale definitions (pitch-class sets) ────────────────────────────────────
// Each array lists the 7 semitone offsets from the root (0 = root).
// These are used to rotate against detected pitch classes to find the best fit.
const SCALE_INTERVALS: Record<string, number[]> = {
  'MAJOR':          [0, 2, 4, 5, 7, 9, 11],
  'MIXOLYDIAN':     [0, 2, 4, 5, 7, 9, 10],
  'DORIAN':         [0, 2, 3, 5, 7, 9, 10],
  'LYDIAN':         [0, 2, 4, 6, 7, 9, 11],
  'NATURAL MINOR':  [0, 2, 3, 5, 7, 8, 10],
  'HARMONIC MINOR': [0, 2, 3, 5, 7, 8, 11],
};

// Note names (chroma index 0 = C)
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Scale metadata for display
const SCALE_META: Record<string, { emoji: string; title: string; subtitle: string }> = {
  'MAJOR':          { emoji: '☀️', title: 'Sunlit Harbor',    subtitle: 'Major / Ionian' },
  'MIXOLYDIAN':     { emoji: '🌊', title: 'The Warm Current', subtitle: 'Mixolydian Mode' },
  'DORIAN':         { emoji: '🌆', title: 'The Twilight Hour', subtitle: 'Dorian Mode' },
  'LYDIAN':         { emoji: '🌫️', title: 'The Floating Mist', subtitle: 'Lydian Mode' },
  'NATURAL MINOR':  { emoji: '🌌', title: 'Clear Night',       subtitle: 'Natural Minor / Aeolian' },
  'HARMONIC MINOR': { emoji: '⛈️', title: 'The Storm',         subtitle: 'Harmonic Minor' },
};

// Scale types with phases (for manual grid)
const SCALE_TYPES = [
  { id: 'MAJOR',          emoji: '☀️', title: 'Sunlit Harbor',     subtitle: 'Major / Ionian',           desc: 'A clear, optimistic vibe of home and sanctuary. Excellent for open, joyous landscapes and peaceful resolution.',  phase: 1 },
  { id: 'MIXOLYDIAN',     emoji: '🌊', title: 'The Warm Current',   subtitle: 'Mixolydian Mode',           desc: 'A sun-drenched, fluid breeze. Mixolydian introduces a mellow, flattened 7th degree, delivering classic neo-soul warmth and smooth electronic movement.', phase: 1 },
  { id: 'DORIAN',         emoji: '🌆', title: 'The Twilight Hour',  subtitle: 'Dorian Mode',               desc: 'A smooth, cinematic dusk. The Dorian Mode blends a minor foundation with a bright major twist, perfect for sophisticated, driving lofi tracks.', phase: 2 },
  { id: 'LYDIAN',         emoji: '🌫️', title: 'The Floating Mist', subtitle: 'Lydian Mode',               desc: 'An ethereal, weightless drift. With its raised 4th degree, Lydian creates a suspended, dreamlike atmosphere.', phase: 2 },
  { id: 'NATURAL MINOR',  emoji: '🌌', title: 'Clear Night',        subtitle: 'Natural Minor / Aeolian',  desc: 'A midnight journey into shadow and solitude. Charts introspective, melancholic vibes, capturing deep emotional groundings and quiet nostalgia.', phase: 3 },
  { id: 'HARMONIC MINOR', emoji: '⛈️', title: 'The Storm',          subtitle: 'Harmonic Minor',            desc: 'A dramatic crossing filled with gravitational friction. The Harmonic Minor Scale introduces exotic mystery and heightened tension.', phase: 3 },
];

const MAJOR_KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const MINOR_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Thresholds for pitch detection
const RMS_THRESHOLD    = 0.012; // silence gate — ignore very quiet frames
const CHROMA_THRESHOLD = 0.25;  // minimum chroma energy to register a pitch

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewState = 'choose' | 'scanning' | 'results' | 'manual' | 'key-select';

interface ScaleMatch {
  scaleType: string;
  root: string;        // e.g. "D" — resolved after matching
  rootIndex: number;   // 0–11
  score: number;       // 0–1 Jaccard
}

// ─── Component ───────────────────────────────────────────────────────────────
@customElement('onboarding-landing')
export class OnboardingLanding extends LitElement {

  @property({ type: Boolean }) compactMode = false;
  @property({ type: Boolean }) chordDataLoaded = false;

  @state() private viewState: ViewState = 'choose';
  @state() private selectedScaleType: string | null = null;
  @state() private scanProgress = 0;          // 0–100
  @state() private scanTimeLeft = 5;          // countdown seconds
  @state() private liveChroma: number[] = new Array(12).fill(0);
  @state() private scanResults: ScaleMatch[] = [];
  @state() private micError = '';
  @state() private isScanActive = false;

  // Audio infrastructure (not reactive state — no need to re-render on change)
  private audioContext: AudioContext | null = null;
  private meydaAnalyzer: any = null;
  private micStream: MediaStream | null = null;
  private scanTimer: ReturnType<typeof setTimeout> | null = null;
  private progressTimer: ReturnType<typeof setInterval> | null = null;

  // Accumulated chroma energy over scan window
  private chromaAccumulator: number[] = new Array(12).fill(0);
  private detectedPitches: Set<number> = new Set();
  private frameCount = 0;

  // ── Lifecycle ────────────────────────────────────────────────────────────────
  disconnectedCallback() {
    super.disconnectedCallback();
    this.teardownAudio();
  }

  // ── Audio setup / teardown ───────────────────────────────────────────────────
  private async startScan() {
    this.micError = '';
    this.chromaAccumulator = new Array(12).fill(0);
    this.detectedPitches = new Set();
    this.liveChroma = new Array(12).fill(0);
    this.frameCount = 0;
    this.scanProgress = 0;
    this.scanTimeLeft = 5;
    this.isScanActive = true;
    this.viewState = 'scanning';

    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch (err: any) {
      this.micError = err.name === 'NotAllowedError'
        ? 'Microphone access was denied. Please allow mic access and try again.'
        : 'Could not access microphone. Please check your device settings.';
      this.isScanActive = false;
      this.viewState = 'choose';
      return;
    }

    // Dynamically import Meyda to keep the initial bundle lighter
    let Meyda: any;
    try {
      const mod = await import('meyda');
      Meyda = mod.default ?? mod;
    } catch {
      this.micError = 'Audio analysis library failed to load. Please refresh the page.';
      this.teardownAudio();
      this.viewState = 'choose';
      return;
    }

    // Use a *dedicated* AudioContext — never touching the Tone.js graph
    this.audioContext = new AudioContext();
    const source = this.audioContext.createMediaStreamSource(this.micStream);

    this.meydaAnalyzer = Meyda.createMeydaAnalyzer({
      audioContext: this.audioContext,
      source,
      bufferSize: 2048,
      featureExtractors: ['chroma', 'rms'],
      callback: (features: { chroma: number[]; rms: number }) => {
        if (!features || !features.chroma) return;
        // Silence gate — skip very quiet frames to avoid noise accumulation
        if (features.rms < RMS_THRESHOLD) return;

        this.frameCount++;
        features.chroma.forEach((val, i) => {
          // Accumulate raw chroma energy across all frames — detection
          // is deferred to computeScaleMatches() so transient noise
          // frames cannot pollute the final pitch set.
          this.chromaAccumulator[i] += val;
        });

        // Normalise for live display (0–1 range relative to strongest bin)
        const max = Math.max(...this.chromaAccumulator, 0.0001);
        this.liveChroma = this.chromaAccumulator.map(v => v / max);
      }
    });

    this.meydaAnalyzer.start();

    // Progress bar & countdown
    const SCAN_MS = 5000;
    const tickMs = 50;
    let elapsed = 0;
    this.progressTimer = setInterval(() => {
      elapsed += tickMs;
      this.scanProgress = Math.min(100, (elapsed / SCAN_MS) * 100);
      this.scanTimeLeft = Math.max(0, Math.ceil((SCAN_MS - elapsed) / 1000));
    }, tickMs);

    // Auto-stop after 5 s
    this.scanTimer = setTimeout(() => this.stopScan(), SCAN_MS);
  }

  private stopScan() {
    if (this.scanTimer) { clearTimeout(this.scanTimer); this.scanTimer = null; }
    if (this.progressTimer) { clearInterval(this.progressTimer); this.progressTimer = null; }
    if (this.meydaAnalyzer) { try { this.meydaAnalyzer.stop(); } catch {} }

    this.isScanActive = false;
    this.scanProgress = 100;
    this.scanTimeLeft = 0;

    const results = this.computeScaleMatches();
    this.teardownAudio();

    this.scanResults = results;
    this.viewState = results.length > 0 ? 'results' : 'choose';
    if (results.length === 0) {
      this.micError = 'No clear pitches detected. Try playing a riff or melody and scan again.';
    }
  }

  private teardownAudio() {
    if (this.meydaAnalyzer) { try { this.meydaAnalyzer.stop(); } catch {} this.meydaAnalyzer = null; }
    if (this.micStream) { this.micStream.getTracks().forEach(t => t.stop()); this.micStream = null; }
    if (this.audioContext) { try { this.audioContext.close(); } catch {} this.audioContext = null; }
  }

  // ── Scale matching logic ──────────────────────────────────────────────────────
  private computeScaleMatches(): ScaleMatch[] {
    if (this.frameCount === 0) return [];

    // Average accumulated chroma energy per frame
    const avgChroma = this.chromaAccumulator.map(v => v / this.frameCount);
    const maxEnergy = Math.max(...avgChroma);

    // Bail if recording was essentially silent throughout
    if (maxEnergy < 0.01) return [];

    // Derive the detected pitch set from the accumulated average rather than
    // per-frame binary threshold. Any pitch class whose average energy is
    // ≥ 30 % of the strongest pitch class is considered detected.
    // This filters out noise that occasionally crosses a per-frame threshold
    // but never accumulates significant energy.
    const RELATIVE_ENERGY_THRESHOLD = 0.30;
    const detected = new Set<number>(
      avgChroma.reduce<number[]>((acc, v, i) => {
        if (v / maxEnergy >= RELATIVE_ENERGY_THRESHOLD) acc.push(i);
        return acc;
      }, [])
    );

    if (detected.size === 0) return [];

    // Find the single strongest pitch class detected to use for tonic boosting
    let strongestPitchIndex = -1;
    let strongestPitchVal = -1;
    detected.forEach(p => {
      if (avgChroma[p] > strongestPitchVal) {
        strongestPitchVal = avgChroma[p];
        strongestPitchIndex = p;
      }
    });

    const results: ScaleMatch[] = [];

    // Lower the Jaccard threshold if the user only sang 1 or 2 notes
    const minThreshold = detected.size <= 2 ? 0.10 : 0.28;

    for (const [scaleType, intervals] of Object.entries(SCALE_INTERVALS)) {
      // Test all 12 roots (rotations)
      for (let root = 0; root < 12; root++) {
        const scalePitches = new Set(intervals.map(iv => (iv + root) % 12));

        // Jaccard similarity: |A ∩ B| / |A ∪ B|
        let intersection = 0;
        for (const p of detected) { if (scalePitches.has(p)) intersection++; }
        const union = scalePitches.size + detected.size - intersection;
        let score = union > 0 ? intersection / union : 0;

        // Boost score if the root of the scale matches our absolute strongest sung pitch
        if (root === strongestPitchIndex) {
          score += 0.25; // Significant boost to favor starting on the sung key center
        }

        // Only surface matches that cross the threshold
        if (score >= minThreshold) {
          results.push({ scaleType, root: NOTE_NAMES[root], rootIndex: root, score: Math.min(1.0, score) });
        }
      }
    }

    // Sort by score descending, de-duplicate by (root, scaleType), keep top 5
    results.sort((a, b) => b.score - a.score);

    const seen = new Set<string>();
    const deduped: ScaleMatch[] = [];
    for (const r of results) {
      const key = `${r.root}_${r.scaleType}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(r);
        if (deduped.length >= 5) break;
      }
    }

    return deduped;
  }

  // ── Event dispatchers ─────────────────────────────────────────────────────────
  private dispatchScaleSelected(key: string, scaleType: string) {
    this.dispatchEvent(new CustomEvent('scale-selected', {
      detail: { key, scaleType },
      bubbles: true,
      composed: true
    }));
  }

  private handleManualScaleTypeSelect(scaleId: string) {
    this.selectedScaleType = scaleId;
    this.viewState = 'key-select';
  }

  private handleKeySelect(key: string) {
    if (!this.selectedScaleType) return;
    this.dispatchScaleSelected(key, this.selectedScaleType);
  }

  private handleResultClick(match: ScaleMatch) {
    this.selectedScaleType = match.scaleType;
    this.dispatchScaleSelected(match.root, match.scaleType);
  }

  // ── Render helpers ────────────────────────────────────────────────────────────
  private renderChooseView() {
    return html`
      <div class="choose-view">
        <div class="hero-heading">
          <div class="hero-title">Start Your Voyage</div>
          <div class="hero-sub">Choose how you want to set sail</div>
        </div>

        ${this.micError ? html`
          <div class="error-banner">${this.micError}</div>
        ` : ''}

        <div class="dual-pane">
          <!-- Path A: Audio Scan -->
          <div class="path-card path-a" @click="${() => this.startScan()}" role="button" tabindex="0"
               @keydown="${(e: KeyboardEvent) => e.key === 'Enter' && this.startScan()}">
            <div class="path-icon">
              <div class="sonar-ring"></div>
              <div class="sonar-ring ring-2"></div>
              <span class="path-emoji">🎙️</span>
            </div>
            <div class="path-label">Listen to My Studio</div>
            <div class="path-desc">
              Point your microphone at your instrument. We'll analyse the pitches in your riff and suggest the perfect scale context.
            </div>
            <div class="path-cta">
              <span class="cta-dot"></span> Auto-detect my key
            </div>
          </div>

          <!-- Divider -->
          <div class="path-divider">
            <div class="divider-line"></div>
            <span class="divider-or">or</span>
            <div class="divider-line"></div>
          </div>

          <!-- Path B: Manual -->
          <div class="path-card path-b" @click="${() => { this.viewState = 'manual'; }}" role="button" tabindex="0"
               @keydown="${(e: KeyboardEvent) => e.key === 'Enter' && (this.viewState = 'manual')}">
            <div class="path-icon">
              <span class="path-emoji">🗺️</span>
            </div>
            <div class="path-label">Manual Deck</div>
            <div class="path-desc">
              Browse all six weather-themed scale landscapes and hand-pick your key. Full control, zero guesswork.
            </div>
            <div class="path-cta">
              <span class="cta-dot cta-dot-b"></span> Pick my own scale
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderScanningView() {
    return html`
      <div class="scanning-view">
        <div class="scan-header">
          <div class="scan-title">Listening…</div>
          <div class="scan-sub">Play a brief riff or melody on your instrument now</div>
        </div>

        <!-- Pulsing sonar animation -->
        <div class="sonar-container">
          <div class="sonar-outer ring-pulse ring-1"></div>
          <div class="sonar-outer ring-pulse ring-2"></div>
          <div class="sonar-outer ring-pulse ring-3"></div>
          <div class="sonar-core">
            <span class="sonar-icon">🎙️</span>
          </div>
        </div>

        <!-- 12 note indicators -->
        <div class="note-indicators" aria-label="Live pitch indicators">
          ${NOTE_NAMES.map((note, i) => {
            const energy = Math.min(1, this.liveChroma[i] ?? 0);
            // "active" = currently spiking strongly (terracotta flash)
            const isActive = energy > 0.5;
            // "detected" = has significant accumulated energy vs peak (gold hold)
            const isDetected = energy >= 0.30;
            return html`
              <div
                class="note-pip ${isActive ? 'note-active' : ''} ${isDetected && !isActive ? 'note-detected' : ''}"
                style="--energy: ${energy};"
                title="${note}"
              >
                <span class="note-label">${note}</span>
              </div>
            `;
          })}
        </div>


        <!-- Progress bar -->
        <div class="scan-progress-bar" role="progressbar" aria-valuenow="${this.scanProgress}" aria-valuemax="100">
          <div class="scan-progress-fill" style="width: ${this.scanProgress}%"></div>
        </div>
        <div class="scan-timer">${this.scanTimeLeft}s remaining</div>

        <button class="btn-stop" @click="${() => this.stopScan()}">
          ⬛ Stop Scanning
        </button>
      </div>
    `;
  }

  private renderResultsView() {
    const top = this.scanResults;
    return html`
      <div class="results-view">
        <div class="results-header">
          <div class="results-title">🌐 Weather Forecast</div>
          <div class="results-sub">Your melody best matches these harmonic climates</div>
        </div>

        <div class="results-list">
          ${top.map((match, idx) => {
            const meta = SCALE_META[match.scaleType];
            const pct = Math.round(match.score * 100);
            const isBest = idx === 0;
            return html`
              <div
                class="result-card ${isBest ? 'result-best' : ''}"
                @click="${() => this.handleResultClick(match)}"
                role="button"
                tabindex="0"
                @keydown="${(e: KeyboardEvent) => e.key === 'Enter' && this.handleResultClick(match)}"
              >
                <div class="result-rank">${isBest ? '🏆' : `#${idx + 1}`}</div>
                <div class="result-emoji">${meta?.emoji ?? '🎵'}</div>
                <div class="result-body">
                  <div class="result-name">${match.root} ${meta?.title ?? match.scaleType}</div>
                  <div class="result-subtitle">${match.root} ${meta?.subtitle ?? match.scaleType}</div>
                </div>
                <div class="result-score-wrap">
                  <div class="result-score-bar">
                    <div class="result-score-fill ${isBest ? 'fill-best' : ''}" style="width: ${pct}%"></div>
                  </div>
                  <div class="result-pct">${pct}%</div>
                </div>
              </div>
            `;
          })}
        </div>

        <div class="results-actions">
          <button class="btn-rescan" @click="${() => { this.scanResults = []; this.micError = ''; this.viewState = 'choose'; }}">
            ← Try Again
          </button>
          <button class="btn-rescan btn-manual-fallback" @click="${() => { this.viewState = 'manual'; }}">
            Browse Manually
          </button>
        </div>
      </div>
    `;
  }

  private renderManualView() {
    return html`
      <div class="manual-view">
        <button class="btn-back" @click="${() => this.viewState = 'choose'}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>

        <div class="setup-title">Start your journey</div>
        ${!this.compactMode ? html`
          <div class="setup-desc">
            Select an emotional scale landscape to begin writing. These define the general moods of transitions and determine your composition's starting pitch context.
          </div>
        ` : ''}

        <div class="phases-container">
          <div class="phase-section">
            <div class="phase-header">Phase 1: Bright / Day Navigation</div>
            <div class="scale-grid">${SCALE_TYPES.filter(s => s.phase === 1).map(s => this.renderScaleCard(s))}</div>
          </div>
          <div class="phase-section">
            <div class="phase-header">Phase 2: Deepening Waters / Transition</div>
            <div class="scale-grid">${SCALE_TYPES.filter(s => s.phase === 2).map(s => this.renderScaleCard(s))}</div>
          </div>
          <div class="phase-section">
            <div class="phase-header">Phase 3: Dark / Night Exploration &amp; Turbulence</div>
            <div class="scale-grid">${SCALE_TYPES.filter(s => s.phase === 3).map(s => this.renderScaleCard(s))}</div>
          </div>
        </div>
      </div>
    `;
  }

  private renderScaleCard(sc: typeof SCALE_TYPES[0]) {
    return html`
      <div class="scale-card" @click="${() => this.handleManualScaleTypeSelect(sc.id)}" role="button" tabindex="0"
           @keydown="${(e: KeyboardEvent) => e.key === 'Enter' && this.handleManualScaleTypeSelect(sc.id)}">
        <div class="scale-card-header">
          <div class="scale-emoji">${sc.emoji}</div>
          <div class="scale-header-text">
            <div class="scale-name">${sc.title}</div>
            <div class="scale-subtitle">${sc.subtitle}</div>
          </div>
        </div>
        ${!this.compactMode ? html`<div class="scale-desc">${sc.desc}</div>` : ''}
      </div>
    `;
  }

  private renderKeySelectView() {
    const isMinorType = this.selectedScaleType === 'NATURAL MINOR' || this.selectedScaleType === 'HARMONIC MINOR' || this.selectedScaleType === 'DORIAN';
    const keys = isMinorType ? MINOR_KEYS : MAJOR_KEYS;
    const suffix = isMinorType ? 'Min' : 'Maj';
    const meta = this.selectedScaleType ? SCALE_META[this.selectedScaleType] : null;

    return html`
      <div class="key-select-view">
        <button class="btn-back" @click="${() => this.viewState = this.scanResults.length > 0 ? 'results' : 'manual'}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>

        ${meta ? html`
          <div class="key-select-context">
            <span class="key-select-emoji">${meta.emoji}</span>
            <div>
              <div class="setup-title">${meta.title}</div>
              <div class="scale-subtitle">${meta.subtitle}</div>
            </div>
          </div>
        ` : html`<div class="setup-title">Choose a Tonic Key</div>`}

        ${!this.compactMode ? html`
          <div class="setup-desc">
            Select the starting tonic key root. This sets the pitch registers and vocal limits for your composition.
          </div>
        ` : ''}

        <div class="key-grid">
          ${keys.map(key => html`
            <button class="btn-key" @click="${() => this.handleKeySelect(key)}">
              ${key} ${suffix}
            </button>
          `)}
        </div>
      </div>
    `;
  }

  // ── Main render ───────────────────────────────────────────────────────────────
  render() {
    return html`
      <div class="onboarding-root">
        ${this.viewState === 'choose'     ? this.renderChooseView()    : ''}
        ${this.viewState === 'scanning'   ? this.renderScanningView()  : ''}
        ${this.viewState === 'results'    ? this.renderResultsView()   : ''}
        ${this.viewState === 'manual'     ? this.renderManualView()    : ''}
        ${this.viewState === 'key-select' ? this.renderKeySelectView() : ''}
      </div>
    `;
  }

  // ── Styles ────────────────────────────────────────────────────────────────────
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      width: 100%;
    }

    .onboarding-root {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 40px 24px;
      gap: 24px;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      text-align: center;
      min-height: 400px;
    }

    /* ── Shared typography ── */
    .setup-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      font-family: var(--font-heading);
    }

    .setup-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 640px;
    }

    /* ── Error banner ── */
    .error-banner {
      background: rgba(194, 82, 51, 0.15);
      border: 1px solid rgba(194, 82, 51, 0.4);
      color: var(--accent-terracotta);
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 0.88rem;
      font-weight: 600;
      max-width: 600px;
      text-align: center;
    }

    /* ─────────────────── CHOOSE VIEW ─────────────────── */
    .choose-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
      width: 100%;
    }

    .hero-heading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .hero-title {
      font-size: 2.4rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      font-family: var(--font-heading);
      background: linear-gradient(135deg, var(--text-primary) 30%, var(--accent-terracotta));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-sub {
      font-size: 1rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .dual-pane {
      display: flex;
      align-items: stretch;
      gap: 0;
      width: 100%;
      max-width: 780px;
    }

    .path-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 36px 28px;
      background: var(--bg-card);
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: var(--neu-flat);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .path-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .path-a::before {
      background: radial-gradient(ellipse at top, rgba(194, 82, 51, 0.06) 0%, transparent 70%);
    }

    .path-b::before {
      background: radial-gradient(ellipse at top, rgba(196, 157, 80, 0.06) 0%, transparent 70%);
    }

    .path-card:hover::before { opacity: 1; }

    .path-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--neu-flat-sm), 0 12px 40px rgba(0,0,0,0.15);
    }

    .path-card:focus-visible {
      outline: 2px solid var(--accent-terracotta);
      outline-offset: 3px;
    }

    /* Sonar rings on the icon area */
    .path-icon {
      position: relative;
      width: 88px;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sonar-ring {
      position: absolute;
      border-radius: 50%;
      border: 1.5px solid rgba(194, 82, 51, 0.25);
      animation: sonarPulse 2.4s ease-out infinite;
    }

    .sonar-ring:nth-child(1) { width: 88px; height: 88px; animation-delay: 0s; }
    .sonar-ring.ring-2       { width: 64px; height: 64px; animation-delay: 0.6s; }

    .path-a:hover .sonar-ring {
      border-color: rgba(194, 82, 51, 0.5);
    }

    @keyframes sonarPulse {
      0%   { transform: scale(0.7); opacity: 0.8; }
      100% { transform: scale(1.35); opacity: 0; }
    }

    .path-emoji {
      font-size: 2.6rem;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 0 8px rgba(194, 82, 51, 0));
      transition: filter 0.3s ease;
    }

    .path-a:hover .path-emoji { filter: drop-shadow(0 0 12px rgba(194, 82, 51, 0.4)); }
    .path-b:hover .path-emoji { filter: drop-shadow(0 0 12px rgba(196, 157, 80, 0.4)); }

    .path-label {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-primary);
      font-family: var(--font-heading);
      letter-spacing: 0.01em;
    }

    .path-desc {
      font-size: 0.87rem;
      color: var(--text-secondary);
      line-height: 1.55;
      max-width: 260px;
    }

    .path-cta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--accent-terracotta);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: auto;
    }

    .path-b .path-cta { color: var(--accent-gold); }

    .cta-dot {
      width: 7px;
      height: 7px;
      background: var(--accent-terracotta);
      border-radius: 50%;
      animation: ctaBlink 1.4s ease-in-out infinite;
    }

    .cta-dot-b {
      background: var(--accent-gold);
      animation: none;
    }

    @keyframes ctaBlink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }

    /* Divider between two paths */
    .path-divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      gap: 8px;
      flex-shrink: 0;
    }

    .divider-line {
      width: 1px;
      flex: 1;
      background: var(--border-color);
    }

    .divider-or {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    @media (max-width: 620px) {
      .dual-pane {
        flex-direction: column;
        gap: 0;
      }
      .path-divider {
        flex-direction: row;
        padding: 12px 0;
      }
      .divider-line {
        width: auto;
        height: 1px;
        flex: 1;
      }
    }

    /* ─────────────────── SCANNING VIEW ─────────────────── */
    .scanning-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      width: 100%;
    }

    .scan-header { display: flex; flex-direction: column; align-items: center; gap: 6px; }

    .scan-title {
      font-size: 2rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .scan-sub {
      font-size: 0.92rem;
      color: var(--text-secondary);
      max-width: 420px;
    }

    /* Sonar animation */
    .sonar-container {
      position: relative;
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sonar-outer {
      position: absolute;
      border-radius: 50%;
      border: 1.5px solid var(--accent-terracotta);
    }

    .ring-pulse {
      animation: ringExpand 2s ease-out infinite;
    }

    .ring-pulse.ring-1 { width: 140px; height: 140px; animation-delay: 0s; }
    .ring-pulse.ring-2 { width: 140px; height: 140px; animation-delay: 0.6s; }
    .ring-pulse.ring-3 { width: 140px; height: 140px; animation-delay: 1.2s; }

    @keyframes ringExpand {
      0%   { transform: scale(0.3); opacity: 0.9; border-color: rgba(194, 82, 51, 0.9); }
      80%  { opacity: 0.1; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .sonar-core {
      width: 70px;
      height: 70px;
      background: var(--bg-card);
      border-radius: 50%;
      box-shadow: var(--neu-flat-sm), 0 0 20px rgba(194, 82, 51, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      animation: corePulse 1.5s ease-in-out infinite;
    }

    @keyframes corePulse {
      0%, 100% { box-shadow: var(--neu-flat-sm), 0 0 15px rgba(194, 82, 51, 0.15); }
      50%       { box-shadow: var(--neu-flat-sm), 0 0 30px rgba(194, 82, 51, 0.35); }
    }

    .sonar-icon { font-size: 2rem; }

    /* 12 note indicators */
    .note-indicators {
      display: flex;
      gap: 6px;
      align-items: flex-end;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 600px;
    }

    .note-pip {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.1s ease;
    }

    .note-label {
      font-size: 0.68rem;
      font-weight: 700;
      font-family: var(--font-mono);
      color: var(--text-muted);
      transition: color 0.15s ease;
      min-width: 22px;
      text-align: center;
    }

    .note-pip::before {
      content: '';
      display: block;
      width: 28px;
      height: calc(6px + var(--energy, 0) * 50px);
      background: var(--bg-card);
      border-radius: 4px 4px 2px 2px;
      box-shadow: var(--neu-pressed-sm);
      transition: height 0.1s ease, background 0.15s ease, box-shadow 0.15s ease;
      min-height: 6px;
    }

    .note-pip.note-active .note-label { color: var(--accent-terracotta); }
    .note-pip.note-active::before {
      background: linear-gradient(180deg, var(--accent-terracotta) 0%, rgba(194,82,51,0.4) 100%);
      box-shadow: 0 0 8px rgba(194, 82, 51, 0.4);
    }

    .note-pip.note-detected .note-label { color: var(--accent-gold); }
    .note-pip.note-detected:not(.note-active)::before {
      background: rgba(196, 157, 80, 0.25);
      box-shadow: 0 0 4px rgba(196, 157, 80, 0.2);
    }

    /* Progress bar */
    .scan-progress-bar {
      width: 100%;
      max-width: 440px;
      height: 4px;
      background: var(--bg-card);
      box-shadow: var(--neu-pressed-sm);
      border-radius: 2px;
      overflow: hidden;
    }

    .scan-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-terracotta), var(--accent-gold));
      border-radius: 2px;
      transition: width 0.05s linear;
    }

    .scan-timer {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .btn-stop {
      padding: 12px 28px;
      background: var(--bg-card);
      border: none;
      border-radius: 8px;
      color: var(--accent-terracotta);
      font-weight: 700;
      font-size: 0.9rem;
      font-family: var(--font-heading);
      cursor: pointer;
      box-shadow: var(--neu-flat-sm);
      transition: all 0.2s ease;
      letter-spacing: 0.03em;
    }

    .btn-stop:hover {
      box-shadow: var(--neu-pressed-sm);
      color: var(--text-primary);
    }

    /* ─────────────────── RESULTS VIEW ─────────────────── */
    .results-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      width: 100%;
    }

    .results-header { display: flex; flex-direction: column; align-items: center; gap: 6px; }

    .results-title {
      font-size: 2rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .results-sub {
      font-size: 0.92rem;
      color: var(--text-secondary);
    }

    .results-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-width: 640px;
    }

    .result-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 20px;
      background: var(--bg-card);
      border-radius: 12px;
      cursor: pointer;
      box-shadow: var(--neu-flat-sm);
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      border: 1.5px solid transparent;
      text-align: left;
    }

    .result-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent-gold);
      box-shadow: var(--neu-flat-sm), 0 6px 24px rgba(0,0,0,0.12);
    }

    .result-card:focus-visible {
      outline: 2px solid var(--accent-terracotta);
      outline-offset: 3px;
    }

    .result-best {
      border-color: var(--accent-terracotta) !important;
      box-shadow: var(--neu-flat), 0 0 18px rgba(194, 82, 51, 0.15);
    }

    .result-rank {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text-muted);
      min-width: 32px;
      text-align: center;
      font-family: var(--font-mono);
    }

    .result-best .result-rank { color: var(--accent-gold); }

    .result-emoji { font-size: 1.8rem; }

    .result-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .result-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
      font-family: var(--font-heading);
    }

    .result-subtitle {
      font-size: 0.78rem;
      color: var(--text-secondary);
      opacity: 0.75;
    }

    .result-score-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
      min-width: 80px;
    }

    .result-score-bar {
      width: 72px;
      height: 5px;
      background: rgba(255,255,255,0.06);
      border-radius: 3px;
      overflow: hidden;
    }

    .result-score-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-gold), var(--accent-terracotta));
      border-radius: 3px;
      transition: width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .result-score-fill.fill-best {
      background: linear-gradient(90deg, var(--accent-terracotta), #ff8f5e);
    }

    .result-pct {
      font-size: 0.82rem;
      font-weight: 700;
      font-family: var(--font-mono);
      color: var(--text-secondary);
    }

    .result-best .result-pct { color: var(--accent-terracotta); }

    .results-actions {
      display: flex;
      gap: 12px;
      margin-top: 4px;
    }

    .btn-rescan {
      padding: 10px 20px;
      background: var(--bg-card);
      border: none;
      border-radius: 8px;
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.88rem;
      cursor: pointer;
      box-shadow: var(--neu-flat-sm);
      transition: all 0.2s ease;
    }

    .btn-rescan:hover {
      box-shadow: var(--neu-pressed-sm);
      color: var(--text-primary);
    }

    .btn-manual-fallback { color: var(--text-muted); }

    /* ─────────────────── MANUAL VIEW ─────────────────── */
    .manual-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      text-align: center;
    }

    .phases-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;
      margin-top: 8px;
    }

    .phase-section { display: flex; flex-direction: column; gap: 12px; }

    .phase-header {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-secondary);
      opacity: 0.6;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding-bottom: 6px;
      text-align: left;
    }

    .scale-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
    }

    .scale-card {
      background: var(--bg-card);
      border-radius: 12px;
      padding: 22px;
      cursor: pointer;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: var(--neu-flat);
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      width: calc(50% - 8px);
      box-sizing: border-box;
      border: 1.5px solid transparent;
    }

    .scale-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--neu-flat-sm);
      border-color: var(--accent-gold);
    }

    .scale-card:focus-visible {
      outline: 2px solid var(--accent-terracotta);
      outline-offset: 3px;
    }

    @media (max-width: 600px) { .scale-card { width: 100%; } }

    .scale-card-header { display: flex; align-items: center; gap: 12px; }

    .scale-emoji {
      font-size: 1.9rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-card);
      border-radius: 8px;
      box-shadow: var(--neu-pressed-sm);
    }

    .scale-header-text { display: flex; flex-direction: column; gap: 3px; }

    .scale-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      font-family: var(--font-heading);
    }

    .scale-subtitle {
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--text-secondary);
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .scale-desc {
      font-size: 0.83rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    /* ─────────────────── KEY SELECT VIEW ─────────────────── */
    .key-select-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
    }

    .key-select-context {
      display: flex;
      align-items: center;
      gap: 16px;
      justify-content: center;
    }

    .key-select-emoji { font-size: 2.5rem; }

    .key-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: 10px;
      width: 100%;
      max-width: 560px;
    }

    .btn-key {
      padding: 16px 10px;
      background: var(--bg-card);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1rem;
      color: var(--text-primary);
      font-family: var(--font-heading);
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
      border: 1.5px solid transparent;
    }

    .btn-key:hover {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed-sm);
      border-color: rgba(194, 82, 51, 0.3);
    }

    /* ─────────────────── BACK BUTTON ─────────────────── */
    .btn-back {
      padding: 8px 16px;
      background: var(--bg-card);
      border: none;
      border-radius: 6px;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
      font-family: var(--font-heading);
    }

    .btn-back:hover {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed-sm);
    }

    @media (max-width: 500px) {
      .key-select-context {
        flex-direction: column;
        gap: 8px;
        text-align: center;
      }
      .key-select-emoji {
        font-size: 2.2rem;
      }
      .setup-title {
        font-size: 1.5rem !important;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'onboarding-landing': OnboardingLanding;
  }
}
