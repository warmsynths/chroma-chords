import { LitElement, html, css, svg, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Progression, ChordBlock, Alternative, ShareDevice, buildDeviceShareUrl,
  MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH, getMoodColor, roleForTension, MOODS,
  AUTOPLAY_INTERVAL_MS, displayKeyName, ROOT_KEYS, buildProgressionStaff, getKeySignature,
} from '../services/chord-engine';
import './swap-sheet';
import './share-modal';
import { rollMascot, pickSlot, EasterEggCounter } from './mascot-character';
import './mascot-character';
import './mascot-parade';
import { USER_INSTRUMENTS, USER_PLAY_STYLES, genreDefaultInstrumentName, genreDefaultPlayStyleName } from '../services/audio-service';
import { downloadWav, downloadMidi } from '../services/export-service';
import './save-set-modal';

// Side-gutter slots for the desktop-only background mascot — only shows once there's real
// gutter space beside the centered .content column (see the min-width:900px media query below).
const MASCOT_SLOTS = [
  { side: 'left', top: '18%' },
  { side: 'left', top: '58%' },
  { side: 'right', top: '24%' },
  { side: 'right', top: '64%' },
] as const;

const MENU_GENRES = [
  "Pop",
  "Lo-fi/Chill",
  "R&B/Soul",
  "Indie/Folk",
  "Synthwave",
  "Jazz-ish",
  "Gospel",
  "Cinematic",
  "Rock",
  "House/Dance",
  "Blues",
  "Funk/Disco",
  "Country/Bluegrass",
  "Reggae/Dub",
  "Metal",
  "Punk",
  "Ambient/Drone",
  "Trap/Hip-Hop",
  "Bossa Nova/Latin",
  "Classical/Orchestral",
  "EDM/Trance",
  "Afrobeats",
  "Shoegaze"
];
const GENRE_PRIMARY = ['Lo-fi/Chill', 'R&B/Soul', 'Pop', 'Synthwave'];
const MOOD_PRIMARY = ['Warm', 'Melancholy', 'Nostalgic', 'Dreamy'];
const INSTRUMENT_PRIMARY = ['Piano', 'Rhodes', 'Nylon Guitar', 'Warm Pad'];
const PLAY_STYLE_PRIMARY = ['Block chords', 'Arpeggio', 'Strum', 'Broken (swing)'];
const MENU_SCALES: { label: string; value: string }[] = [
  { label: 'Major', value: 'MAJOR' },
  { label: 'Minor', value: 'NATURAL_MINOR' },
  { label: 'Harmonic Minor', value: 'HARMONIC_MINOR' },
  { label: 'Dorian', value: 'DORIAN' },
  { label: 'Mixolydian', value: 'MIXOLYDIAN' },
  { label: 'Lydian', value: 'LYDIAN' },
];

// The design animates the menu popover/backdrop in on mount and out before unmount:
// set the `mounted` flag immediately, flip `visible` a frame later so the CSS transition
// runs, and reverse that order on close so the fade-out plays before the DOM is removed.
const MENU_CLOSE_MS = 220;
const SHEET_CLOSE_MS = 280;

// Container-level "alive" motion per mood — the whole progression panel sways/ripples,
// while each chord's own shape/size/color stays fixed to its harmonic role.
const PANEL_ANIM: Record<string, { anim: string; dur: number; ease: string }> = {
  Uplifting: { anim: 'cv-panel-uplifting', dur: 2.4, ease: 'ease-out' },
  Melancholy: { anim: 'cv-panel-melancholy', dur: 6, ease: 'ease-in-out' },
  Dreamy: { anim: 'cv-panel-dreamy', dur: 7, ease: 'ease-in-out' },
  Tense: { anim: 'cv-panel-tense', dur: 0.9, ease: 'ease-in-out' },
  Warm: { anim: 'cv-panel-warm', dur: 4.2, ease: 'ease-in-out' },
  Nostalgic: { anim: 'cv-panel-nostalgic', dur: 5.4, ease: 'ease-in-out' },
};

@customElement('loop-screen')
export class LoopScreen extends LitElement {
  @property({ type: Object }) progression!: Progression;
  @property({ type: Number }) activeIndex = 0;
  // Drives the progress bar specifically — kept separate from activeIndex because a
  // drag-to-reorder remaps activeIndex to preserve which chord's sound stays "active," which
  // isn't playback advancing and shouldn't move the bar.
  @property({ type: Number }) progressStep = 0;
  @property({ type: Array }) order: number[] = [0, 1, 2, 3];
  @property({ type: Boolean }) playing = true;
  @property({ type: Boolean }) showTheory = false;
  // null = no explicit user override — the chip displays (and playback uses) the current
  // genre's existing default instead of a fixed value.
  @property({ type: String }) instrument: string | null = null;
  @property({ type: String }) playStyle: string | null = null;
  @property({ type: Boolean }) sheetOpen = false;
  @property({ type: Boolean }) isAuthenticated = false;
  @property({ type: Boolean }) isBookmarked = false;
  @property({ type: String }) sheetMode: 'swap' | 'voicing' = 'swap';
  @property({ type: Object }) swapChord: ChordBlock | null = null;
  @property({ type: Number }) swapIndex: number | null = null;
  @property({ type: Array }) alternatives: Alternative[] = [];

  @state() private menuMounted = false;
  @state() private menuVisible = false;
  @state() private flashedIndex: number | null = null;
  @state() private expandedMenuGenre = false;
  @state() private expandedMenuMood = false;
  @state() private expandedAllInstruments = false;
  @state() private expandedAllPlayStyles = false;
  @state() private saveModalVisible = false;
  @state() private shareMounted = false;
  @state() private shareVisible = false;
  @state() private sheetMounted = false;
  @state() private sheetVisible = false;
  @state() private toast: string | null = null;
  @state() private spinning = false;
  @state() private drag: { pos: number; offsetX: number; offsetY: number } | null = null;
  // True only on the single update where activeIndex wraps back to 0 from the last chord —
  // disables the progress-fill transition for that one render so the bar resets instantly
  // instead of visibly sliding backward, then clears itself on the very next forward step.
  @state() private snapProgress = false;
  @state() private expandedInstrument = false;
  @state() private expandedPlayStyle = false;
  // Rolled fresh every time this screen mounts — a small background critter in the desktop
  // side gutter, shown roughly a third of the time so it's a rare, subtle surprise rather than
  // a fixture. Mobile has no reliable empty space here, so it's desktop-only (see CSS).
  @state() private mascot = rollMascot(0.35);
  @state() private mascotSlot = pickSlot(MASCOT_SLOTS);
  // A second, independent, very-occasional roll: a mascot peeking up from behind the chord
  // panel's top edge, like the panel is a little window it's looking in through. Unlike the
  // side-gutter mascot above, this doesn't need spare width, so it shows on every screen size.
  @state() private panelPeekMascot = rollMascot(0.18);
  @state() private panelPeekSide: 'left' | 'right' = pickSlot(['left', 'right'] as const);

  // Easter egg: click the wordmark 7 times fast to bring out the whole gang.
  private eggCounter = new EasterEggCounter();
  @state() private paradeTrigger = 0;

  private onWordmarkClick() {
    if (this.eggCounter.click()) this.paradeTrigger++;
  }

  private menuCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private shareCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private sheetCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  // Drag-to-reorder: press-and-hold (150ms, without moving >8px) starts a drag instead of a
  // tap, so a quick tap still previews the chord. On release, the dragged chip drops into
  // whichever chip's measured center it's now closest to — simple nearest-neighbor placement
  // that works regardless of how the flex-wrap panel has reflowed the (variably-sized, by
  // tension) chips.
  private pressTimer: ReturnType<typeof setTimeout> | null = null;
  private pressTapFn: (() => void) | null = null;
  private pressStartX = 0;
  private pressStartY = 0;
  private lastPointerX = 0;
  private lastPointerY = 0;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('pointermove', this.onDragMove);
    window.addEventListener('pointerup', this.onDragEnd);
    window.addEventListener('pointercancel', this.onDragEnd);
  }

  willUpdate(changed: PropertyValues) {
    if (changed.has('progressStep')) {
      const prevStep = changed.get('progressStep') as number | undefined;
      this.snapProgress = prevStep !== undefined && this.progressStep < prevStep;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.menuCloseTimer) clearTimeout(this.menuCloseTimer);
    if (this.shareCloseTimer) clearTimeout(this.shareCloseTimer);
    if (this.sheetCloseTimer) clearTimeout(this.sheetCloseTimer);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    if (this.pressTimer) clearTimeout(this.pressTimer);
    window.removeEventListener('pointermove', this.onDragMove);
    window.removeEventListener('pointerup', this.onDragEnd);
    window.removeEventListener('pointercancel', this.onDragEnd);
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100%;
      background: var(--cv-cream);
      font-family: var(--cv-font);
    }
    @keyframes cv-panel-uplifting {
      0%, 100% { border-radius: 32px; transform: scale(1); }
      50% { border-radius: 44px 24px 40px 26px; transform: scale(1.008); }
    }
    @keyframes cv-panel-melancholy {
      0%, 100% { border-radius: 32px; transform: rotate(0deg); }
      50% { border-radius: 22px 34px 46px 28px; transform: rotate(-0.4deg); }
    }
    @keyframes cv-panel-dreamy {
      0%, 100% { border-radius: 32px; }
      33% { border-radius: 44px 24px 42px 22px; }
      66% { border-radius: 22px 42px 24px 44px; }
    }
    @keyframes cv-panel-tense {
      0%, 100% { border-radius: 32px; transform: translateX(0); }
      20% { border-radius: 38px 22px 28px 34px; transform: translateX(-1px); }
      40% { border-radius: 22px 34px 38px 24px; transform: translateX(1px); }
      60% { border-radius: 34px 24px 22px 38px; transform: translateX(-1px); }
      80% { border-radius: 24px 38px 34px 22px; transform: translateX(1px); }
    }
    @keyframes cv-panel-warm {
      0%, 100% { border-radius: 32px; transform: scale(1); }
      50% { border-radius: 40px 34px 40px 34px; transform: scale(1.006); }
    }
    @keyframes cv-panel-nostalgic {
      0%, 100% { border-radius: 32px; transform: rotate(0deg); }
      50% { border-radius: 24px 40px 26px 38px; transform: rotate(-0.3deg); }
    }
    @keyframes cv-bg-drift-a {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(0, -7px) rotate(1.5deg); }
    }
    @keyframes cv-bg-drift-b {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(0, 6px) rotate(-1.5deg); }
    }
    @keyframes cv-now-pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    .frame {
      position: relative;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 24px 20px 40px;
    }
    .top-bar {
      width: 100%;
      max-width: 640px;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
    }
    .top-bar > *:first-child {
      justify-self: start;
    }
    .top-bar > *:last-child {
      justify-self: end;
    }
    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: var(--cv-surface-2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--cv-ink);
      cursor: pointer;
    }
    .wordmark {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .wordmark-text {
      font-size: 14px;
      font-weight: 800;
      color: var(--cv-ink);
    }
    .content {
      width: 100%;
      max-width: 640px;
      margin-top: 24px;
    }
    h1 {
      margin: 0;
      font-size: clamp(24px, 5vw, 36px);
      font-weight: 800;
      line-height: 1.16;
      letter-spacing: -0.02em;
      color: var(--cv-ink);
    }
    .subcopy {
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted);
      margin-top: 10px;
    }
    .panel-shell {
      position: relative;
      margin-top: 26px;
    }
    .panel {
      position: relative;
      z-index: 1;
      background: var(--cv-surface);
      border: 1.5px solid var(--cv-ink-08);
      border-radius: 28px;
      padding: 34px 22px;
      overflow: hidden;
      min-height: 180px;
      box-shadow: 0 30px 60px -30px rgba(46, 39, 31, 0.22);
      transition: border-radius 240ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    :focus-visible {
      outline: 2.5px solid var(--cv-ink);
      outline-offset: 2px;
    }
    /* Peeks up from behind the panel's top edge — z-index 0 vs. the panel's 1 means the
       panel's own (opaque) background paints over the lower portion, so only a small sliver
       shows above the rim, like the character is looking in through a little window. */
    .panel-peek {
      position: absolute;
      top: -16px;
      z-index: 0;
      pointer-events: none;
    }
    .panel-peek.left { left: 26px; }
    .panel-peek.right { right: 26px; }
    .panel-blob {
      position: absolute;
      opacity: 0.9;
      pointer-events: none;
    }
    .panel-blob.a {
      left: -40px;
      top: -40px;
      animation: cv-bg-drift-a 11s ease-in-out infinite;
    }
    .panel-blob.b {
      right: -30px;
      bottom: -30px;
      animation: cv-bg-drift-b 13s ease-in-out infinite;
    }
    .chip-row {
      position: relative;
      display: grid;
      grid-template-columns: repeat(4, auto);
      justify-content: center;
      justify-items: center;
      align-items: center;
      gap: 30px 14px; /* row-gap column-gap */
      z-index: 2;
    }
    .chord-chip {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
      touch-action: none;
      user-select: none;
      box-shadow: 0 14px 28px -14px rgba(46, 39, 31, 0.2);
      transition: transform 150ms var(--cv-ease), box-shadow 150ms var(--cv-ease);
      width: var(--chip-size, 80px);
      height: var(--chip-size, 80px);
      border-radius: var(--chip-radius, 24px);
    }
    .chord-chip.active {
      transform: scale(1.06);
      box-shadow: 0 18px 34px -14px rgba(46, 39, 31, 0.32);
    }
    .chord-chip.flashed {
      transform: scale(1.08);
      filter: brightness(1.18);
      box-shadow: 0 0 0 4px var(--cv-cream), 0 0 0 8px var(--cv-plum, #9B7CA8), 0 20px 36px -12px rgba(46, 39, 31, 0.4);
    }
    .chord-name {
      font-weight: 800;
      color: var(--cv-ink);
      line-height: 1;
      font-size: var(--chip-font, 24px);
    }
    .chord-role {
      font-size: 10.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.55);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 6px;
    }
    .roman-badge {
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--cv-ink);
      color: var(--cv-cream);
      font-size: 11px;
      font-weight: 800;
      padding: 2px 9px;
      border-radius: 100px;
      white-space: nowrap;
      box-shadow: 0 3px 8px -2px rgba(46, 39, 31, 0.4);
      z-index: 3;
    }
    .now-marker {
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .now-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--cv-ink);
      animation: cv-now-pulse 1.6s ease-in-out infinite;
    }
    .now-text {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.55);
    }
    .swap-badge {
      position: absolute;
      top: -12px;
      right: -12px;
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 4;
      touch-action: manipulation;
    }
    .swap-badge-inner {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      transition: transform 150ms var(--cv-ease);
    }
    .swap-badge:hover .swap-badge-inner {
      transform: scale(1.15);
    }
    .voicing-badge {
      position: absolute;
      bottom: -12px;
      left: -12px;
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 4;
      touch-action: manipulation;
    }
    .voicing-badge-inner {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--cv-cream);
      border: 1.5px solid var(--cv-ink-14);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.15);
      transition: transform 150ms var(--cv-ease);
    }
    .voicing-badge:hover .voicing-badge-inner {
      transform: scale(1.15);
    }
    .transport {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-top: 26px;
    }
    .play-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }
    .play-btn:hover {
      transform: scale(1.06);
    }
    .progress-track {
      flex: 1;
      height: 9px;
      border-radius: 6px;
      background: var(--cv-surface);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 6px;
      /* Duration set inline to match AUTOPLAY_INTERVAL_MS so the fill sweeps continuously
         across each chord's actual hold time instead of jumping there quickly and sitting
         still — linear timing so the motion reads as constant, not eased/stepped. */
      transition: width var(--progress-duration, 1.7s) linear, background 0.4s ease;
    }
    .progress-fill.snap {
      transition: none;
    }
    .dice-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--cv-surface);
      border: 2px solid var(--cv-ink-12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      box-sizing: border-box;
      transition: transform 0.3s ease, background 0.2s ease;
    }
    .dice-btn:hover {
      background: var(--cv-surface-2);
    }
    .dice-btn.spinning {
      transform: rotate(360deg);
    }
    .transport-meta {
      text-align: center;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--cv-ink-muted);
      margin-top: 12px;
    }
    .build-song-btn {
      width: 100%;
      border: none;
      color: var(--cv-ink);
      padding: 16px;
      border-radius: 100px;
      font-family: inherit;
      font-weight: 800;
      font-size: 15px;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      margin-top: 24px;
      transition: transform 160ms var(--cv-ease);
    }
    .build-song-btn:active {
      transform: scale(0.98);
    }
    .back-to-seed-row {
      margin-top: 24px;
      text-align: center;
    }
    .back-to-seed-link {
      display: inline-block;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--cv-ink-muted);
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 4px;
      transition: color 0.15s ease;
    }
    .back-to-seed-link:hover {
      color: var(--cv-ink);
    }
    .your-sets-btn {
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
    .your-sets-text {
      display: inline;
    }
    @media (max-width: 600px) {
      .your-sets-btn {
        padding: 6px 12px;
        font-size: 12px;
      }
    }
    @media (max-width: 380px) {
      .your-sets-text {
        display: none;
      }
    }
    .control-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
    }
    /* Mobile shows the compact icon-only buttons next to the dice instead of this text row —
       see .control-icon-btn below. */
    @media (max-width: 600px) {
      .control-row { display: none; }
    }
    .control-icon-btn {
      display: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--cv-surface);
      border: 2px solid var(--cv-ink-12);
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      box-sizing: border-box;
      transition: transform 0.2s ease;
    }
    .control-icon-btn:active {
      transform: scale(0.92);
    }
    @media (max-width: 600px) {
      .control-icon-btn { display: flex; }
      /* Two extra fixed-width buttons join the transport row here — tighten gap/sizes so the
         progress bar keeps a comfortable width instead of getting squeezed to a sliver. */
      .transport { gap: 10px; }
      .play-btn { width: 48px; height: 48px; }
      .dice-btn { width: 44px; height: 44px; }
    }
    .control-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--cv-surface-2);
      color: #5B5145;
      padding: 9px 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 150ms var(--cv-ease);
    }
    .control-chip:active {
      transform: scale(0.96);
    }
    .control-chevron {
      opacity: 0.6;
    }
    .control-options {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }
    .control-option {
      display: inline-flex;
      align-items: center;
      background: var(--cv-surface-2);
      color: #5B5145;
      padding: 7px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 150ms var(--cv-ease);
    }
    .control-option:active {
      transform: scale(0.96);
    }
    .control-option.toggle {
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      color: var(--cv-label);
    }
    .control-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      flex-shrink: 0;
    }
    .theory-toggle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 22px;
      cursor: pointer;
    }
    .theory-track {
      width: 40px;
      height: 23px;
      border-radius: 100px;
      background: var(--cv-ink-16);
      position: relative;
      transition: background 150ms var(--cv-ease);
      flex-shrink: 0;
    }
    .theory-track.on {
      background: var(--cv-plum);
    }
    .theory-knob {
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: var(--cv-cream);
      position: absolute;
      top: 3px;
      left: 3px;
      transition: left 150ms var(--cv-ease);
    }
    .theory-knob.on {
      left: 20px;
    }
    .theory-label {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--cv-ink-muted);
    }
    .theory-strip {
      background: var(--cv-surface-2);
      border: 1.5px solid var(--cv-ink-10);
      border-radius: 18px;
      padding: 18px 22px;
      margin-top: 22px;
    }
    .theory-key-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: var(--cv-label);
      text-transform: uppercase;
    }
    .theory-staff-scroll {
      overflow-x: auto;
      margin-top: 12px;
    }
    .menu-scrim {
      position: fixed;
      inset: -2px;
      z-index: 48;
      background: rgba(46, 39, 31, 0);
      transition: background 0.22s ease, backdrop-filter 0.22s ease;
    }
    .menu-scrim.visible {
      background: rgba(46, 39, 31, 0.06);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
    }
    .menu {
      position: absolute;
      top: 68px;
      right: max(20px, calc(50% - 320px));
      width: 250px;
      background: var(--cv-cream);
      border-radius: 18px;
      box-shadow: 0 24px 44px -18px rgba(46, 39, 31, 0.35);
      z-index: 49;
      padding: 16px;
      box-sizing: border-box;
      transform-origin: top right;
      opacity: 0;
      transform: translateY(-6px) scale(0.94);
      transition: opacity 0.22s cubic-bezier(.16,1,.3,1), transform 0.26s cubic-bezier(.16,1,.3,1);
    }
    .menu.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .menu-label {
      font-size: 10.5px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label);
      font-weight: 800;
    }
    .menu-label.spaced {
      margin-top: 14px;
    }
    .menu-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .menu-chip {
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      background: var(--cv-surface-2);
      color: var(--cv-ink-muted);
      transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
    }
    .menu-chip:active {
      transform: scale(0.95);
    }
    .menu-chip.selected {
      color: var(--cv-ink);
    }
    .menu-chip.toggle {
      background: transparent;
      border: 1.5px dashed var(--cv-ink-25);
      color: var(--cv-label);
      padding: 5px 11px;
    }
    .menu-nav-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--cv-ink-10);
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }
    .menu-nav-row.first {
      border-top: none;
      padding-top: 0;
    }
    .menu-nav-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-ink);
    }
    .menu-nav-arrow {
      font-size: 13px;
      color: var(--cv-label);
    }
    .length-control {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      background: var(--cv-surface-2);
      padding: 10px 12px;
      margin-top: 8px;
    }
    .length-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--cv-cream);
      color: var(--cv-ink);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      flex-shrink: 0;
    }
    .length-btn.disabled {
      opacity: 0.35;
      cursor: default;
    }
    .length-segments {
      display: flex;
      gap: 3px;
      flex: 1;
    }
    .length-segment {
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background: var(--cv-ink-10);
      transition: background 0.25s ease;
    }
    .length-segment.filled {
      background: var(--cv-red);
    }
    .length-label-text {
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted);
      white-space: nowrap;
    }
    .toast {
      position: fixed;
      left: 50%;
      bottom: 40px;
      transform: translateX(-50%);
      background: var(--cv-ink);
      color: var(--cv-cream);
      font-size: 12.5px;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 999px;
      z-index: 70;
      box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.35);
      animation: cv-toast-in 0.3s cubic-bezier(.16,1,.3,1);
      white-space: nowrap;
    }
    @keyframes cv-toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(8px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    @media (min-width: 720px) {
      .content { max-width: 760px; }
      .panel { padding: 48px 40px; }
    }

    .mascot-slot {
      display: none;
      position: absolute;
      z-index: 1;
      opacity: 0.9;
    }
    /* Only once the frame is wide enough to leave real gutter space beside the centered
       .content column (760px content + generous margin) does the background mascot appear. */
    @media (min-width: 980px) {
      .mascot-slot { display: block; }
      .mascot-slot.left { left: 36px; }
      .mascot-slot.right { right: 36px; }
    }

    /* CSS grid natively forces a strict 4-column layout that evenly drops to the next row
       without centering uneven rows (e.g. 6 items = 4 on row 1, 2 on row 2 left-aligned). */
    @media (max-width: 600px) {
      .chip-row {
        grid-template-columns: repeat(2, auto);
        gap: 30px 18px;
      }
      .chord-chip {
        /* Increase chip size to fill the wider 2-col layout better */
        --chip-size-mobile: calc(var(--chip-size) * 1.15);
        --chip-radius-mobile: calc(var(--chip-radius) * 1.15);
        width: var(--chip-size-mobile);
        height: var(--chip-size-mobile);
        border-radius: var(--chip-radius-mobile);
        margin: 8px; /* breathing room for active state pop */
      }
      .chord-name {
        font-size: calc(var(--chip-font) * 1.15);
      }
    }
  `;

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  updated(changed: Map<string, unknown>) {
    // On a wrap (progressStep drops back to 0), that render paints the bar snapped instantly
    // to 0% with no transition. Clear the snap flag on the next frame so the very next paint
    // (still progressStep 0, sweep target 1/length) picks up the transition again and sweeps
    // forward for the new loop's first chord, instead of leaving the bar frozen at 0% for a
    // whole interval or jumping straight to the target with no motion.
    if (changed.has('progressStep') && this.snapProgress) {
      // Double rAF: the snapped (transition:none, width:0%) frame must actually paint before
      // transitions are re-enabled, or the browser never commits that intermediate state and
      // instead animates straight from the old (near-100%) width down to the new target.
      requestAnimationFrame(() => requestAnimationFrame(() => { this.snapProgress = false; }));
    }
    if (changed.has('sheetOpen')) {
      if (this.sheetOpen) {
        if (this.sheetCloseTimer) { clearTimeout(this.sheetCloseTimer); this.sheetCloseTimer = null; }
        this.sheetMounted = true;
        requestAnimationFrame(() => requestAnimationFrame(() => { this.sheetVisible = true; }));
      } else {
        this.sheetVisible = false;
        this.sheetCloseTimer = setTimeout(() => { this.sheetMounted = false; }, SHEET_CLOSE_MS);
      }
    }
  }

  private toggleMenu() {
    if (this.menuMounted) this.closeMenu();
    else this.openMenu();
  }

  private openMenu() {
    if (this.menuCloseTimer) { clearTimeout(this.menuCloseTimer); this.menuCloseTimer = null; }
    this.menuMounted = true;
    requestAnimationFrame(() => requestAnimationFrame(() => { this.menuVisible = true; }));
  }

  private closeMenu() {
    this.menuVisible = false;
    if (this.menuCloseTimer) clearTimeout(this.menuCloseTimer);
    this.menuCloseTimer = setTimeout(() => {
      this.menuMounted = false;
      this.expandedMenuGenre = false;
      this.expandedMenuMood = false;
    }, MENU_CLOSE_MS);
  }

  private openShare() {
    this.closeMenu();
    if (this.shareCloseTimer) { clearTimeout(this.shareCloseTimer); this.shareCloseTimer = null; }
    this.shareMounted = true;
    requestAnimationFrame(() => requestAnimationFrame(() => { this.shareVisible = true; }));
  }

  private closeShare() {
    this.shareVisible = false;
    this.shareCloseTimer = setTimeout(() => { this.shareMounted = false; }, MENU_CLOSE_MS);
  }

  private exportDevice(device: ShareDevice, name: string) {
    this.closeShare();
    const url = buildDeviceShareUrl(this.progression, device, this.order);
    window.open(url, '_blank');
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast = `Sent to ${name}`;
    this.toastTimer = setTimeout(() => { this.toast = null; }, 2000);
  }

  private async handleExportWav() {
    this.closeShare();
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast = 'Rendering WAV audio...';
    try {
      const p = this.progression;
      const effectiveInst = this.instrument ?? genreDefaultInstrumentName(p.genre);
      const effectiveStyle = this.playStyle ?? genreDefaultPlayStyleName(p.genre);
      await downloadWav(p, this.order, effectiveInst, effectiveStyle);
      this.toast = 'Saved WAV audio file';
    } catch (err) {
      console.error('WAV export error:', err);
      this.toast = 'Failed to export WAV';
    }
    this.toastTimer = setTimeout(() => { this.toast = null; }, 2500);
  }

  private handleExportMidi() {
    this.closeShare();
    if (this.toastTimer) clearTimeout(this.toastTimer);
    try {
      const p = this.progression;
      const effectiveInst = this.instrument ?? genreDefaultInstrumentName(p.genre);
      const effectiveStyle = this.playStyle ?? genreDefaultPlayStyleName(p.genre);
      downloadMidi(p, this.order, effectiveInst, effectiveStyle);
      this.toast = 'Saved MIDI file';
    } catch (err) {
      console.error('MIDI export error:', err);
      this.toast = 'Failed to export MIDI';
    }
    this.toastTimer = setTimeout(() => { this.toast = null; }, 2500);
  }

  private reroll() {
    this.spinning = true;
    setTimeout(() => { this.spinning = false; }, 400);
    this.emit('reroll');
  }

  private pressStart(pos: number, tapFn: () => void, e: PointerEvent) {
    e.preventDefault();
    this.pressTapFn = tapFn;
    this.pressStartX = e.clientX;
    this.pressStartY = e.clientY;
    if (this.pressTimer) clearTimeout(this.pressTimer);
    this.pressTimer = setTimeout(() => {
      this.pressTimer = null;
      this.drag = { pos, offsetX: 0, offsetY: 0 };
    }, 150);
  }

  private onDragMove = (e: PointerEvent) => {
    this.lastPointerX = e.clientX;
    this.lastPointerY = e.clientY;
    if (this.pressTimer && !this.drag) {
      if (Math.abs(e.clientY - this.pressStartY) > 8 || Math.abs(e.clientX - this.pressStartX) > 8) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
      }
      return;
    }
    if (!this.drag) return;
    this.drag = { ...this.drag, offsetX: e.clientX - this.pressStartX, offsetY: e.clientY - this.pressStartY };
  };

  private onDragEnd = () => {
    if (this.pressTimer) { clearTimeout(this.pressTimer); this.pressTimer = null; }
    if (!this.drag) {
      if (this.pressTapFn) this.pressTapFn();
      this.pressTapFn = null;
      return;
    }
    const fromPos = this.drag.pos;
    this.drag = null;
    this.pressTapFn = null;

    const chips = Array.from(this.renderRoot.querySelectorAll('.chord-chip')) as HTMLElement[];
    let targetPos = fromPos;
    let best = Infinity;
    chips.forEach((el, i) => {
      if (i === fromPos) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const d = (this.lastPointerX - cx) ** 2 + (this.lastPointerY - cy) ** 2;
      if (d < best) { best = d; targetPos = i; }
    });

    if (targetPos !== fromPos) {
      const newOrder = [...this.order];
      const [moved] = newOrder.splice(fromPos, 1);
      newOrder.splice(targetPos, 0, moved);
      this.emit('reorder', newOrder);
    }
  };

  private previewChordTile(chordIndex: number) {
    this.flashedIndex = chordIndex;
    setTimeout(() => {
      if (this.flashedIndex === chordIndex) {
        this.flashedIndex = null;
      }
    }, 320);
    this.emit('chord-preview', chordIndex);
  }

  private dragStyleFor(pos: number): string {
    const d = this.drag;
    if (d && d.pos === pos) {
      return `transform:translate(${d.offsetX}px, ${d.offsetY}px) scale(1.08) rotate(-1deg);transition:none;z-index:20;box-shadow:0 20px 40px rgba(46,39,31,0.35);cursor:grabbing;`;
    }
    return `cursor:grab;`;
  }

  private renderHeaderTitle(p: Progression, moodColor: string) {
    if (p.searchTerm) {
      const raw = p.searchTerm.trim();
      const cleaned = raw.endsWith('.') ? raw.slice(0, -1) : raw;
      const words = cleaned.split(/\s+/);
      if (words.length === 1) {
        return html`<h1><span style="color:${moodColor}">${words[0]}.</span></h1>`;
      }
      const leading = words.slice(0, -1).join(' ');
      const lastWord = words[words.length - 1];
      return html`<h1>${leading} <span style="color:${moodColor}">${lastWord}.</span></h1>`;
    }

    return html`<h1>Your progression, feeling <span style="color:${moodColor}">${p.mood.toLowerCase()}.</span></h1>`;
  }

  private renderLengthControl() {
    const len = this.progression.chords.length;
    return html`
      <div class="length-control">
        <div class="length-btn ${len <= MIN_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => len > MIN_PROGRESSION_LENGTH && this.emit('set-length', len - 1)}>−</div>
        <div class="length-segments">
          ${Array.from({ length: MAX_PROGRESSION_LENGTH }, (_, i) => html`<div class="length-segment ${i < len ? 'filled' : ''}"></div>`)}
        </div>
        <div class="length-btn ${len >= MAX_PROGRESSION_LENGTH ? 'disabled' : ''}" @click=${() => len < MAX_PROGRESSION_LENGTH && this.emit('set-length', len + 1)}>+</div>
        <div class="length-label-text">${len} ${len === 1 ? 'bar' : 'bars'}</div>
      </div>
    `;
  }

  render() {
    const p = this.progression;
    const moodColor = getMoodColor(p.mood);
    // No explicit override yet → show (and, via app.ts, play with) this genre's existing
    // default instead of a fixed value that would flatten every genre onto the same voice.
    const effectiveInstrument = this.instrument ?? genreDefaultInstrumentName(p.genre);
    const effectivePlayStyle = this.playStyle ?? genreDefaultPlayStyleName(p.genre);
    // While playing, the fill sweeps toward the END of the chord currently sounding — i.e.
    // chord N (progressStep N) sweeps toward (N+1)/length, landing exactly on that mark right
    // as chord N finishes — so a 4-chord loop's bar reaches 100% precisely when the last chord
    // ends, not 75%. At rest (never started, or just stopped) there's nothing to show yet. The
    // one exception is the snap render right after a loop wrap: that frame must paint the bar
    // at its pre-sweep baseline (N/length, i.e. 0% for the new loop's first chord) instead of
    // the sweep target, or there's nothing for the following transition to visibly sweep from.
    const staffLength = Math.max(1, this.order.length);
    const progressPct = !this.playing
      ? 0
      : this.snapProgress
        ? (this.progressStep / staffLength) * 100
        : Math.min(100, ((this.progressStep + 1) / staffLength) * 100);
    const panelAnim = PANEL_ANIM[p.mood] || PANEL_ANIM.Dreamy;
    // Staff mirrors the same left-to-right order the chip row shows (post drag-reorder), not
    // the progression's original array order, so the two views always read the same sequence.
    const staff = this.showTheory ? buildProgressionStaff(this.order.map(i => p.chords[i]), p.key, p.scaleType) : null;
    const sigCount = getKeySignature(p.key, p.scaleType).length;
    const sigLabel = sigCount === 0 ? 'no sharps or flats' : `${sigCount} ${sigCount === 1 ? 'sharp/flat' : 'sharps/flats'}`;

    // Configure popup menu option filtering (primary vs rest with less/more toggle)
    let primaryMenuGenres = GENRE_PRIMARY.filter(n => MENU_GENRES.includes(n));
    if (!primaryMenuGenres.includes(p.genre)) primaryMenuGenres = primaryMenuGenres.slice(0, -1).concat(p.genre);
    const restMenuGenres = MENU_GENRES.filter(n => !primaryMenuGenres.includes(n));
    const shownMenuGenres = this.expandedMenuGenre ? MENU_GENRES : primaryMenuGenres;

    const allMoodNames = MOODS.map(m => m.name);
    let primaryMenuMoodNames = MOOD_PRIMARY.filter(n => allMoodNames.includes(n));
    if (!primaryMenuMoodNames.includes(p.mood)) primaryMenuMoodNames = primaryMenuMoodNames.slice(0, -1).concat(p.mood);
    const restMenuMoodNames = allMoodNames.filter(n => !primaryMenuMoodNames.includes(n));
    const shownMenuMoodNames = this.expandedMenuMood ? allMoodNames : primaryMenuMoodNames;
    const shownMenuMoods = shownMenuMoodNames.map(n => MOODS.find(m => m.name === n)!);

    // Instrument and Play Style option filtering
    const availInstruments = USER_INSTRUMENTS.filter(i => i.name !== effectiveInstrument);
    let primaryInst = INSTRUMENT_PRIMARY.filter(name => availInstruments.some(i => i.name === name));
    const restInst = availInstruments.filter(i => !primaryInst.includes(i.name));
    const shownInst = this.expandedAllInstruments ? availInstruments : availInstruments.filter(i => primaryInst.includes(i.name));

    const availPlayStyles = USER_PLAY_STYLES.filter(s => s.name !== effectivePlayStyle);
    let primaryStyles = PLAY_STYLE_PRIMARY.filter(name => availPlayStyles.some(s => s.name === name));
    const restStyles = availPlayStyles.filter(s => !primaryStyles.includes(s.name));
    const shownStyles = this.expandedAllPlayStyles ? availPlayStyles : availPlayStyles.filter(s => primaryStyles.includes(s.name));

    return html`
      <div class="frame">
        ${this.mascot.show ? html`
          <div class="mascot-slot ${this.mascotSlot.side}" style="top:${this.mascotSlot.top}">
            <mascot-character .kind=${this.mascot.kind} .scale=${0.75}></mascot-character>
          </div>
        ` : ''}

        <div class="top-bar">
          <div class="icon-btn" @click=${() => this.emit('back')}>‹</div>
          <div class="wordmark" @click=${() => this.onWordmarkClick()}>
            <svg width="18" height="18" viewBox="0 0 30 30"><circle cx="11" cy="11" r="9" fill="#F2A79B" /><circle cx="19" cy="19" r="9" fill="#9CC0EC" opacity="0.9" /></svg>
            <div class="wordmark-text">Chroma Chords</div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            ${this.isAuthenticated ? html`
              <div class="your-sets-btn" @click=${() => this.emit('view-sets')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span class="your-sets-text">Your sets</span>
              </div>
            ` : ''}
            <div class="icon-btn" @click=${() => this.toggleMenu()}>…</div>
          </div>
        </div>
        <mascot-parade .trigger=${this.paradeTrigger}></mascot-parade>

        ${this.menuMounted ? html`
          <div class="menu-scrim ${this.menuVisible ? 'visible' : ''}" @click=${() => this.closeMenu()}></div>
          <div class="menu ${this.menuVisible ? 'visible' : ''}">
            <div class="menu-label">Key &amp; scale</div>
            <div class="menu-chips">
              ${ROOT_KEYS.map(k => html`
                <div class="menu-chip ${k === p.key ? 'selected' : ''}" style=${k === p.key ? `background:${moodColor}` : ''} @click=${() => this.emit('set-key', k)}>${displayKeyName(k, p.scaleType)}</div>
              `)}
            </div>
            <div class="menu-chips">
              ${MENU_SCALES.map(s => html`
                <div class="menu-chip ${s.value === p.scaleType ? 'selected' : ''}" style=${s.value === p.scaleType ? `background:${moodColor}` : ''} @click=${() => this.emit('set-scale', s.value)}>${s.label}</div>
              `)}
            </div>
            <div class="menu-label spaced">Genre</div>
            <div class="menu-chips">
              ${shownMenuGenres.map(g => html`
                <div class="menu-chip ${g === p.genre ? 'selected' : ''}" style=${g === p.genre ? `background:${moodColor}` : ''} @click=${() => this.emit('set-genre', g)}>${g}</div>
              `)}
              ${restMenuGenres.length ? html`
                <div class="menu-chip toggle" @click=${() => { this.expandedMenuGenre = !this.expandedMenuGenre; }}>
                  ${this.expandedMenuGenre ? 'Show less ⌃' : `+${restMenuGenres.length} more ⌄`}
                </div>
              ` : ''}
            </div>
            <div class="menu-label spaced">Mood</div>
            <div class="menu-chips">
              ${shownMenuMoods.map(m => html`
                <div class="menu-chip ${m.name === p.mood ? 'selected' : ''}" style=${m.name === p.mood ? `background:${m.dot}` : ''} @click=${() => this.emit('set-mood', m.name)}>${m.name}</div>
              `)}
              ${restMenuMoodNames.length ? html`
                <div class="menu-chip toggle" @click=${() => { this.expandedMenuMood = !this.expandedMenuMood; }}>
                  ${this.expandedMenuMood ? 'Show less ⌃' : `+${restMenuMoodNames.length} more ⌄`}
                </div>
              ` : ''}
            </div>
            <div class="menu-label spaced">Length</div>
            ${this.renderLengthControl()}
            <div class="menu-nav-row" @click=${() => this.openShare()}>
              <div class="menu-nav-label">Share progression</div>
              <div class="menu-nav-arrow">↗</div>
            </div>
          </div>
        ` : ''}

        <div class="content">
          ${this.renderHeaderTitle(p, moodColor)}
          <div class="subcopy">Tap a chord to hear it.</div>

          <div class="panel-shell">
            ${this.panelPeekMascot.show ? html`
              <div class="panel-peek ${this.panelPeekSide}">
                <mascot-character .kind=${this.panelPeekMascot.kind} .scale=${0.45}></mascot-character>
              </div>
            ` : ''}
            <div class="panel">
              <svg class="panel-blob a" width="140" height="140" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#F2A79B" /></svg>
              <svg class="panel-blob b" width="120" height="120" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#9CC0EC" /></svg>
              <div class="chip-row">
              ${this.order.map((chordIndex, pos) => {
                const c = p.chords[chordIndex];
                const role = roleForTension(c.tension);
                const isActive = pos === this.activeIndex;
                const isFlashed = this.flashedIndex === chordIndex;
                return html`
                  <div
                    class="chord-chip ${isActive ? 'active' : ''} ${isFlashed ? 'flashed' : ''}"
                    style="--chip-size:${role.size}px;--chip-radius:${role.radius}px;background:${role.color};${this.dragStyleFor(pos)}"
                    @click=${() => this.previewChordTile(chordIndex)}
                    @pointerdown=${(e: PointerEvent) => this.pressStart(pos, () => this.previewChordTile(chordIndex), e)}
                  >
                    ${this.showTheory ? html`<div class="roman-badge">${c.roman}</div>` : ''}
                    ${isActive ? html`<div class="now-marker"><div class="now-dot"></div><div class="now-text">now</div></div>` : ''}
                    <div class="chord-name" style="--chip-font:${role.fontSize}px;">${c.name}</div>
                    <div class="chord-role">${c.functionLabel}</div>
                    <button
                      class="swap-badge"
                      aria-label="Swap chord ${c.name}"
                      @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
                      @click=${(e: MouseEvent) => { e.stopPropagation(); this.emit('chord-tap', chordIndex); }}
                    >
                      <div class="swap-badge-inner">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2.6" stroke-linecap="round"><path d="M4 8h13M13 4l4 4-4 4" /><path d="M20 16H7M11 12l-4 4 4 4" /></svg>
                      </div>
                    </button>
                    <button
                      class="voicing-badge"
                      aria-label="View voicing for ${c.name}"
                      @pointerdown=${(e: PointerEvent) => e.stopPropagation()}
                      @click=${(e: MouseEvent) => { e.stopPropagation(); this.emit('chord-voicing-tap', chordIndex); }}
                    >
                      <div class="voicing-badge-inner">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-6.2 10-6.2 10 6.2 10 6.2-3.6 6.2-10 6.2-10-6.2-10-6.2z" /><circle cx="12" cy="12" r="2.6" /></svg>
                      </div>
                    </button>
                  </div>
                `;
              })}
            </div>
            </div>
          </div>

          <div class="theory-toggle-row" @click=${() => this.emit('theory-toggle')}>
            <div class="theory-track ${this.showTheory ? 'on' : ''}"><div class="theory-knob ${this.showTheory ? 'on' : ''}"></div></div>
            <div class="theory-label">Show music theory</div>
          </div>
          ${staff ? html`
            <div class="theory-strip">
              <div class="theory-key-label">${displayKeyName(p.key, p.scaleType)} ${p.scaleType.replace('_', ' ')} · ${sigLabel}</div>
              <div class="theory-staff-scroll">
                ${svg`
                  <svg width="${staff.width}" height="${staff.height}" viewBox="0 0 ${staff.width} ${staff.height}">
                    ${staff.lines.map(y => svg`<rect x="6" y="${y}" width="${staff.width - 12}" height="1.4" fill="rgba(46,39,31,0.35)" />`)}
                    <text x="8" y="${staff.lines[3] + 14}" font-size="46" font-family="Georgia, 'Times New Roman', serif" fill="var(--cv-ink)">𝄞</text>
                    ${staff.keySignature.map(sig => svg`<text x="${sig.x}" y="${sig.y + 6}" font-size="20" fill="var(--cv-ink)">${sig.sign === 'sharp' ? '♯' : '♭'}</text>`)}
                    ${staff.chords.map(ch => svg`
                      <text x="${ch.cx}" y="${ch.labelY}" font-size="11" font-weight="800" fill="var(--cv-ink)" text-anchor="middle">${ch.name}</text>
                      ${ch.ledgers.map(lg => svg`<rect x="${lg.x}" y="${lg.y}" width="18" height="1.6" fill="rgba(46,39,31,0.5)" />`)}
                      ${ch.notes.map(n => svg`<ellipse cx="${n.x}" cy="${n.y}" rx="6" ry="5.2" fill="var(--cv-ink)" />`)}
                      <text x="${ch.cx}" y="${staff.height - 4}" font-size="12" font-weight="800" fill="${moodColor}" text-anchor="middle">${ch.roman}</text>
                    `)}
                  </svg>
                `}
              </div>
            </div>
          ` : ''}

          <div class="transport">
            <button class="play-btn" style="background:${moodColor}" @click=${() => this.emit('toggle-play')}>
              ${this.playing
                ? html`<svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="3" fill="#2E271F" /></svg>`
                : html`<svg width="20" height="22" viewBox="0 0 18 20" fill="#2E271F"><path d="M0 0L18 10L0 20Z" /></svg>`}
            </button>
            <div class="progress-track">
              <div
                class="progress-fill ${this.snapProgress ? 'snap' : ''}"
                style="width:${progressPct}%;background:${moodColor};--progress-duration:${AUTOPLAY_INTERVAL_MS}ms"
              ></div>
            </div>
            <div class="dice-btn ${this.spinning ? 'spinning' : ''}" @click=${() => this.reroll()}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="${moodColor}" />
                <circle cx="8" cy="8" r="1.7" fill="#2E271F" />
                <circle cx="16" cy="8" r="1.7" fill="#2E271F" />
                <circle cx="12" cy="12" r="1.7" fill="#2E271F" />
                <circle cx="8" cy="16" r="1.7" fill="#2E271F" />
                <circle cx="16" cy="16" r="1.7" fill="#2E271F" />
              </svg>
            </div>
            ${this.isAuthenticated ? html`
              <div class="dice-btn" title="${this.isBookmarked ? 'Saved in sets' : 'Save set'}" @click=${() => { this.saveModalVisible = true; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.isBookmarked ? '#2E271F' : 'none'}" stroke="#2E271F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            ` : ''}
            <div class="control-icon-btn" aria-label="Instrument: ${effectiveInstrument}" @click=${() => { this.expandedInstrument = !this.expandedInstrument; this.expandedPlayStyle = false; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            </div>
            <div class="control-icon-btn" aria-label="Play style: ${effectivePlayStyle}" @click=${() => { this.expandedPlayStyle = !this.expandedPlayStyle; this.expandedInstrument = false; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
            </div>
          </div>
          <div class="transport-meta">${displayKeyName(p.key, p.scaleType).toUpperCase()} ${p.scaleType.replace('_', ' ')} · ${p.bpm} BPM</div>

          <div class="control-row">
            <div class="control-chip" @click=${() => { this.expandedInstrument = !this.expandedInstrument; this.expandedPlayStyle = false; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
              ${effectiveInstrument} <span class="control-chevron">${this.expandedInstrument ? '⌃' : '⌄'}</span>
            </div>
            <div class="control-chip" @click=${() => { this.expandedPlayStyle = !this.expandedPlayStyle; this.expandedInstrument = false; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B5145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h13M3 12h9M3 18h13" /></svg>
              ${effectivePlayStyle} <span class="control-chevron">${this.expandedPlayStyle ? '⌃' : '⌄'}</span>
            </div>
          </div>
          ${this.expandedInstrument ? html`
            <div class="control-options">
              ${shownInst.map(i => html`
                <div class="control-option" @click=${() => { this.emit('set-instrument', i.name); this.expandedInstrument = false; }}>
                  <span class="control-dot" style="background:${i.color}"></span>${i.name}
                </div>
              `)}
              ${restInst.length ? html`
                <div class="control-option toggle" @click=${() => { this.expandedAllInstruments = !this.expandedAllInstruments; }}>
                  ${this.expandedAllInstruments ? 'Show less ⌃' : `+${restInst.length} more ⌄`}
                </div>
              ` : ''}
            </div>
          ` : ''}
          ${this.expandedPlayStyle ? html`
            <div class="control-options">
              ${shownStyles.map(s => html`
                <div class="control-option" @click=${() => { this.emit('set-play-style', s.name); this.expandedPlayStyle = false; }}>
                  <span class="control-dot" style="background:${s.color}"></span>${s.name}
                </div>
              `)}
              ${restStyles.length ? html`
                <div class="control-option toggle" @click=${() => { this.expandedAllPlayStyles = !this.expandedAllPlayStyles; }}>
                  ${this.expandedAllPlayStyles ? 'Show less ⌃' : `+${restStyles.length} more ⌄`}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <button class="build-song-btn" style="background:${moodColor}" @click=${() => this.emit('view-song')}>
            Build the full song <span>→</span>
          </button>
          <div class="back-to-seed-row">
            <div class="back-to-seed-link" @click=${() => this.emit('back')}>← Back to seed</div>
          </div>
        </div>

        ${this.sheetMounted && this.swapChord ? html`
          <swap-sheet
            .chord=${this.swapChord}
            .alternatives=${this.alternatives}
            .showTheory=${this.showTheory}
            .mode=${this.sheetMode}
            .moodColor=${moodColor}
            .position=${(this.swapIndex ?? 0) + 1}
            .total=${this.order.length}
            .visible=${this.sheetVisible}
            .resetKey=${this.swapIndex}
          ></swap-sheet>
        ` : ''}

        ${this.shareMounted ? html`
          <share-modal
            .visible=${this.shareVisible}
            @close=${() => this.closeShare()}
            @export=${(e: CustomEvent<{ device: ShareDevice; name: string }>) => this.exportDevice(e.detail.device, e.detail.name)}
            @export-wav=${() => this.handleExportWav()}
            @export-midi=${() => this.handleExportMidi()}
          ></share-modal>
        ` : ''}

        <save-set-modal
          .visible=${this.saveModalVisible}
          .defaultName=${`${p.genre} · ${p.mood}`}
          @close=${() => { this.saveModalVisible = false; }}
          @save=${(e: CustomEvent<string>) => {
            this.emit('save-set', e.detail);
            this.saveModalVisible = false;
          }}
        ></save-set-modal>

        ${this.toast ? html`<div class="toast">${this.toast.startsWith('Sent to') || this.toast.startsWith('Saved') || this.toast.startsWith('Rendering') || this.toast.startsWith('Failed') ? this.toast : `Sent to ${this.toast}`}</div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loop-screen': LoopScreen;
  }
}
