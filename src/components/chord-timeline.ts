import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './chord-keyboard.ts';

export type ChordStep = {
  name: string;
  tension: string;
  mood: string;
  notes?: string;
  core?: string;
  modifier?: string;
} | null;

export type ProgressionSection = {
  id: string;
  name: string;
  steps: ChordStep[];
};

@customElement('chord-timeline')
export class ChordTimeline extends LitElement {
  @property({ type: Array }) sections: ProgressionSection[] = [];
  @property({ type: Object }) activeLocation: { sectionId: string, stepIndex: number } | null = null;
  @property({ type: Boolean }) isPlaying = false;
  @property({ type: Boolean }) isLooping = false;
  @property({ type: Boolean }) collapsed = false;
  @property({ type: Array }) activeNotes: number[] = [];
  @property({ type: String }) rootNoteName = '';
  @property({ type: Number }) windowStartMidi = 60;
  @property({ type: Number }) bpm = 80;

  @state() viewedSectionId: string | null = null;
  @state() private humanLoaded = false;
  @state() private showHuman = false;
  @state() private isEditing = false;
  @state() private showHumanInsideEditor = false;

  @state() private chordCores: any[] = [];
  @state() private chordModifiers: any[] = [];

  connectedCallback() {
    super.connectedCallback();
    const engineUrl = import.meta.env.VITE_HUMAN_ENGINE_URL;
    const loadEngine = engineUrl
      ? import(/* @vite-ignore */ engineUrl)
      : import('human-engine');

    loadEngine
      .then((engine) => {
        this.humanLoaded = true;
        this.chordCores = engine.CHORD_CORES || [];
        this.chordModifiers = engine.CHORD_MODIFIERS || [];
      })
      .catch((err) => {
        console.warn('Could not load human panel:', err);
      });
  }

  private dragStartX = 0;
  private dragStartWin = 0;
  private isDraggingVoicing = false;

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      --accent-cyan: var(--accent-terracotta, #c25233);
      --accent-purple: var(--accent-gold, #ab8b61);
      --accent-blue: #87291c;
      font-family: var(--font-body, 'Space Grotesk', sans-serif);
    }
    
    /* ── Collapsed state ── */
    .collapsed-container {
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
      background: var(--bg-card);
      border-radius: 16px;
    }
    
    .collapsed-container:hover {
      background: rgba(255, 255, 255, 0.02);
    }
    
    .collapsed-left {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    
    .collapsed-title {
      font-family: var(--font-heading);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    
    .collapsed-preview {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    
    .collapsed-chip {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 3px 8px;
      font-weight: 700;
      font-size: 0.75rem;
      color: var(--text-secondary);
      box-shadow: var(--neu-flat-sm);
    }
    
    /* ── Toolbar ── */
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-color);
      background: transparent;
    }

    .toolbar-left, .toolbar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .toolbar-center {
      text-align: center;
    }

    .toolbar-title {
      font-family: var(--font-heading);
      font-size: 1rem;
      font-weight: 800;
      color: var(--text-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .toolbar-title .count {
      color: var(--text-muted);
      font-size: 0.8rem;
      font-weight: 600;
      font-family: var(--font-mono);
      margin-left: 4px;
    }

    /* ── Hardware Buttons ── */
    button {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
      font-family: var(--font-heading);
      cursor: pointer;
      border: none;
      background: var(--bg-card);
      color: var(--text-primary);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: var(--neu-flat-sm);
      white-space: nowrap;
      user-select: none;
    }
    
    button:hover:not(:disabled) {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed-sm);
      transform: translateY(-1px);
    }
    
    button:active:not(:disabled) {
      box-shadow: var(--neu-pressed);
      transform: translateY(0);
    }
    
    button:disabled {
      opacity: 0.25;
      cursor: not-allowed;
      box-shadow: none;
    }
    
    .btn-primary {
      color: var(--accent-terracotta);
    }
    
    .btn-primary:hover:not(:disabled) {
      color: var(--text-primary);
      background: var(--accent-terracotta);
      box-shadow: 0 4px 12px rgba(194, 82, 51, 0.2);
    }
    
    .btn-loop.active {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed);
      background: rgba(171, 139, 97, 0.05);
    }

    .btn-danger {
      color: var(--accent-terracotta);
    }
    
    .btn-danger:hover:not(:disabled) {
      background: #87291c;
      color: #fff;
    }

    .btn-icon {
      padding: 8px;
      width: 32px;
      height: 32px;
      justify-content: center;
      border-radius: 50%;
    }
    
    /* ── Section tabs row ── */
    .section-tabs-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 20px;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
    }
    
    .tabs-list {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .section-tab {
      padding: 6px 14px;
      border-radius: 20px;
      background: var(--bg-card);
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-weight: 700;
      font-family: var(--font-heading);
      cursor: pointer;
      box-shadow: var(--neu-flat-sm);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid transparent;
    }
    
    .section-tab:hover {
      color: var(--text-primary);
      box-shadow: var(--neu-pressed-sm);
    }
    
    .section-tab.active {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed);
      background: var(--bg-primary);
      border-color: rgba(171, 139, 97, 0.15);
    }

    .tab-input {
      background: transparent;
      border: none;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      outline: none;
      padding: 0;
      margin: 0;
      cursor: text;
      border-bottom: 1px dashed var(--accent-gold);
    }
    
    .icon-rename {
      opacity: 0.5;
      flex-shrink: 0;
    }

    .btn-add-section-inline {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--neu-flat-sm);
      background: var(--bg-card);
      color: var(--text-muted);
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-add-section-inline:hover {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed-sm);
      transform: scale(1.05);
    }

    .tab-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-tab-action {
      padding: 6px 12px;
      font-size: 0.72rem;
      border-radius: 6px;
      box-shadow: var(--neu-flat-sm);
    }
    
    /* ── Content area ── */
    .timeline-content {
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .progression-content-wrap {
      width: 100%;
    }

    /* ── Sequencer Track ── */
    .timeline-scroll-container {
      width: 100%;
      overflow-x: auto;
      padding: 12px 4px;
      border-radius: 12px;
      background: var(--bg-card);
      box-shadow: var(--neu-pressed);
    }

    .timeline-track {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 12px;
      min-width: max-content;
    }

    .empty-timeline-box {
      width: 100%;
      padding: 30px 20px;
      text-align: center;
      background: var(--bg-card);
      border-radius: 12px;
      box-shadow: var(--neu-pressed);
      font-size: 0.85rem;
      color: var(--text-muted);
      font-style: italic;
      line-height: 1.4;
    }

    .step-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .step-connector {
      color: var(--text-muted);
      opacity: 0.35;
      font-size: 0.75rem;
      font-weight: 800;
      user-select: none;
    }
    
    /* ── Tactile Step Pad ── */
    .chord-chip {
      width: 106px;
      height: 72px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: var(--bg-card);
      box-shadow: var(--neu-flat-sm);
      cursor: pointer;
      user-select: none;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.01);
      padding: 8px 6px;
    }
    
    .chord-chip:hover {
      transform: translateY(-2px);
      box-shadow: var(--neu-flat);
      border-color: rgba(171, 139, 97, 0.1);
      cursor: cell;
    }
    
    .chord-chip.active {
      box-shadow: var(--neu-pressed);
      transform: translateY(0);
      border-color: rgba(194, 82, 51, 0.25);
      background: rgba(194, 82, 51, 0.02);
    }

    .chord-chip.empty-slot {
      background: rgba(255, 255, 255, 0.01);
      border: 1px dashed var(--border-color);
      box-shadow: var(--neu-pressed-sm);
    }

    .chord-chip.empty-slot:hover {
      box-shadow: var(--neu-pressed);
      border-color: var(--accent-gold);
    }
    
    /* Step LED Dot */
    .chip-led {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      position: absolute;
      top: 6px;
      left: 8px;
      transition: all 0.2s ease;
      box-shadow: inset 1px 1px 2px rgba(0,0,0,0.5);
    }

    .chord-chip.active .chip-led {
      background: var(--accent-terracotta);
      box-shadow: 0 0 8px var(--accent-terracotta), 0 0 12px var(--accent-terracotta);
    }

    /* Step Index */
    .chip-index {
      font-size: 0.62rem;
      font-family: var(--font-mono);
      font-weight: 700;
      color: var(--text-muted);
      position: absolute;
      top: 4px;
      right: 8px;
    }

    .chord-chip.active .chip-index {
      color: var(--accent-gold);
    }
    
    .chip-name {
      font-size: 0.88rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin-top: 6px;
      text-align: center;
      letter-spacing: -0.01em;
    }

    .empty-text {
      color: var(--text-muted) !important;
      font-weight: 500;
      font-size: 0.8rem;
    }
    
    .chip-tension-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 6px;
    }

    .chip-tension-badge {
      font-size: 0.6rem;
      font-weight: 700;
      font-family: var(--font-mono);
      padding: 1px 4px;
      border-radius: 3px;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-secondary);
    }

    .chip-tension-badge.tension-1 { color: var(--tension-1); background: rgba(171, 139, 97, 0.08); }
    .chip-tension-badge.tension-2 { color: var(--tension-1); background: rgba(171, 139, 97, 0.08); }
    .chip-tension-badge.tension-3 { color: var(--tension-3); background: rgba(194, 82, 51, 0.08); }
    .chip-tension-badge.tension-4 { color: var(--tension-4); background: rgba(135, 41, 28, 0.12); }

    .chip-ext-badge {
      font-size: 0.58rem;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
      background: rgba(171, 139, 97, 0.1);
      color: var(--accent-gold);
    }

    /* Remove Step Hover Button */
    .btn-remove-step {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--bg-card);
      color: var(--text-muted);
      border: 1px solid var(--border-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.2s ease;
      box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      z-index: 10;
      padding: 0;
    }
    
    .chord-chip:hover .btn-remove-step {
      opacity: 1;
    }
    
    .btn-remove-step:hover {
      color: var(--accent-terracotta);
      border-color: var(--accent-terracotta);
      transform: scale(1.1);
    }

    /* ── Double-click edit hint ── */
    .chip-edit-hint {
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
      user-select: none;
    }

    .chip-edit-hint-text {
      font-size: 0.52rem;
      font-family: var(--font-mono);
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .chip-edit-hint-icon {
      color: var(--text-muted);
      display: flex;
      align-items: center;
    }

    .chord-chip:hover:not(.empty-slot) .chip-edit-hint {
      opacity: 1;
    }

    /* ── Chord Editor Drawer ── */
    .chord-editor-drawer {
      margin-top: 8px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--neu-pressed-sm);
      animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chord-editor-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
    }

    .editor-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .editor-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .editor-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .editor-info .chord-name-badge {
      color: var(--accent-terracotta);
      font-weight: 800;
      font-size: 0.95rem;
      background: rgba(194, 82, 51, 0.08);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid rgba(194, 82, 51, 0.15);
      letter-spacing: 0.02em;
    }

    .editor-info .step-index-badge {
      color: var(--text-secondary);
      font-size: 0.75rem;
      font-family: var(--font-mono);
      font-weight: 600;
      background: rgba(255, 255, 255, 0.02);
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
    }

    .editor-actions-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .editor-nav-group {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--bg-primary);
      padding: 3px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .btn-nav-step {
      padding: 5px 10px;
      font-size: 0.7rem;
      font-weight: 700;
      background: transparent;
      box-shadow: none;
      border-radius: 6px;
    }

    .btn-nav-step:hover:not(:disabled) {
      color: var(--accent-gold);
      background: rgba(255,255,255,0.03);
      box-shadow: none;
    }

    .btn-nav-step:disabled {
      opacity: 0.2;
    }

    .btn-close-editor {
      padding: 6px 10px;
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .btn-close-editor:hover {
      color: var(--accent-terracotta);
    }

    .keyboard-guide-text {
      font-size: 0.65rem;
      color: var(--text-muted);
      text-align: center;
      margin-top: 4px;
      font-family: var(--font-mono);
      letter-spacing: 0.02em;
    }

    .editor-controls-row {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      flex-wrap: wrap;
      margin-top: 8px;
      border-top: 1px solid var(--border-color);
      padding-top: 14px;
    }

    .extension-group {
      display: flex;
      gap: 6px;
      flex: 1;
      min-width: 260px;
    }

    .btn-extension {
      flex: 1;
      padding: 8px 10px;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: 6px;
    }

    .btn-extension.active {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed);
      background: rgba(194, 82, 51, 0.05);
    }

    .btn-humanize-toggle {
      padding: 8px 14px;
      font-size: 0.75rem;
      border: 1px solid transparent;
    }

    .btn-humanize-toggle.active {
      color: var(--accent-terracotta);
      border-color: rgba(194, 82, 51, 0.15);
      background: rgba(194, 82, 51, 0.04);
      box-shadow: var(--neu-pressed);
    }

    .human-panel-container {
      margin-top: 8px;
      border-top: 1px solid var(--border-color);
      padding-top: 14px;
      width: 100%;
      overflow-x: auto;
      box-sizing: border-box;
    }

    human-panel {
      --human-bg: transparent;
      --human-surface: var(--bg-primary);
      --human-border: var(--border-color);
      --human-text-primary: var(--text-primary);
      --human-text-secondary: var(--text-secondary);
      --human-accent: var(--accent-terracotta);
      --human-accent-hover: var(--accent-gold);
      display: block;
      width: 100%;
      min-width: 280px;
    }

    /* ── Mobile Responsive ── */
    @media (max-width: 768px) {
      .toolbar {
        padding: 10px 16px;
        gap: 8px;
      }
      .toolbar-title {
        font-size: 0.85rem;
      }
      .toolbar-title .count {
        font-size: 0.72rem;
      }
      .section-tabs-row {
        padding: 10px 16px;
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      .tabs-list {
        justify-content: flex-start;
      }
      .tab-actions {
        justify-content: flex-end;
      }
      .chord-editor-container {
        gap: 12px;
      }
      .editor-header {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      .editor-actions-wrap {
        justify-content: space-between;
      }
      .editor-controls-row {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      .extension-group {
        min-width: 0;
      }
    }

    @media (max-width: 500px) {
      .btn-text {
        display: none;
      }
      .btn-primary {
        padding: 8px;
        min-width: 32px;
        width: 32px;
        height: 32px;
        justify-content: center;
        border-radius: 50%;
      }
      .btn-tab-action {
        padding: 8px;
        min-width: 32px;
        width: 32px;
        height: 32px;
        justify-content: center;
        border-radius: 50%;
      }
      .btn-tab-action svg {
        margin: 0 !important;
      }
      .btn-primary svg {
        margin: 0 !important;
      }
    }
  `;

  private handlePlayToggle() {
    this.dispatchEvent(new CustomEvent('toggle-play', { bubbles: true, composed: true }));
  }

  private handleLoopToggle() {
    this.dispatchEvent(new CustomEvent('toggle-loop', { bubbles: true, composed: true }));
  }

  private handleClear() {
    this.dispatchEvent(new CustomEvent('clear-timeline', { bubbles: true, composed: true }));
  }

  private handleHumanChange(e: CustomEvent<any>) {
    this.dispatchEvent(new CustomEvent('human-state-change', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  private handleHumanPreview(e: CustomEvent<any>) {
    this.dispatchEvent(new CustomEvent('human-preview', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  private handleStepClick(sectionId: string, index: number) {
    this.dispatchEvent(new CustomEvent('select-step', {
      detail: { sectionId, index },
      bubbles: true,
      composed: true
    }));
  }

  private handleStepDblClick(sectionId: string, index: number) {
    this.isEditing = true;
  }

  private exitEditMode() {
    this.isEditing = false;
    this.dispatchEvent(new CustomEvent('select-step', {
      detail: null,
      bubbles: true,
      composed: true
    }));
  }

  private navigateStep(dir: number) {
    if (!this.activeLocation) return;
    const activeSecIndex = this.sections.findIndex(s => s.id === this.activeLocation!.sectionId);
    if (activeSecIndex === -1) return;
    
    let nextSecIndex = activeSecIndex;
    let nextStepIndex = this.activeLocation!.stepIndex + dir;
    
    if (nextStepIndex < 0) {
      if (nextSecIndex > 0) {
        nextSecIndex--;
        nextStepIndex = this.sections[nextSecIndex].steps.length - 1;
      } else {
        return;
      }
    } else if (nextStepIndex >= this.sections[nextSecIndex].steps.length) {
      if (nextSecIndex < this.sections.length - 1) {
        nextSecIndex++;
        nextStepIndex = 0;
      } else {
        return;
      }
    }
    
    const nextSec = this.sections[nextSecIndex];
    this.handleStepClick(nextSec.id, nextStepIndex);
  }

  private handleRemoveStep(e: Event, sectionId: string, index: number) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('remove-step', {
      detail: { sectionId, index },
      bubbles: true,
      composed: true
    }));
  }

  private handleToggleCollapse() {
    this.dispatchEvent(new CustomEvent('toggle-collapse', { bubbles: true, composed: true }));
  }

  private handleDuplicateSection(sectionId: string) {
    this.dispatchEvent(new CustomEvent('duplicate-section', {
      detail: { sectionId },
      bubbles: true,
      composed: true
    }));
  }

  private handleDeleteSection(sectionId: string) {
    this.dispatchEvent(new CustomEvent('delete-section', {
      detail: { sectionId },
      bubbles: true,
      composed: true
    }));
  }

  private handleRenameSection(e: Event, sectionId: string) {
    const target = e.target as HTMLInputElement;
    this.dispatchEvent(new CustomEvent('rename-section', {
      detail: { sectionId, name: target.value },
      bubbles: true,
      composed: true
    }));
  }

  private handleAddSection() {
    this.dispatchEvent(new CustomEvent('add-section', { bubbles: true, composed: true }));
  }

  private handleKeyboardPointerDown(e: PointerEvent) {
    const wrap = e.currentTarget as HTMLElement;
    this.dragStartX = e.clientX;
    this.dragStartWin = this.windowStartMidi;
    this.isDraggingVoicing = true;
    wrap.setPointerCapture(e.pointerId);
  }

  private getNextWhiteKey(midi: number, dir: 1 | -1): number {
    const whiteKeys = [0, 2, 4, 5, 7, 9, 11];
    let next = midi;
    for (let i = 0; i < 12; i++) {
      next += dir;
      if (whiteKeys.includes(next % 12)) {
        return next;
      }
    }
    return midi + dir; // fallback
  }

  private handleKeyboardPointerMove(e: PointerEvent) {
    if (!this.isDraggingVoicing) return;
    const delta = e.clientX - this.dragStartX;
    const steps = Math.round(delta / 15);

    let next = this.dragStartWin;
    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        next = this.getNextWhiteKey(next, 1);
      }
    } else if (steps < 0) {
      for (let i = 0; i < Math.abs(steps); i++) {
        next = this.getNextWhiteKey(next, -1);
      }
    }

    next = Math.max(36, Math.min(84 - 13, next));
    if (next !== this.windowStartMidi) {
      this.dispatchEvent(new CustomEvent('change-voicing-window', {
        detail: { windowStartMidi: next },
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleKeyboardPointerUp() {
    if (this.isDraggingVoicing) {
      this.isDraggingVoicing = false;
      this.dispatchEvent(new CustomEvent('play-active-chord', {
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleCoreChange(core: string) {
    this.dispatchEvent(new CustomEvent('change-core', {
      detail: { core },
      bubbles: true,
      composed: true
    }));
  }

  private handleModifierChange(modifier: string) {
    this.dispatchEvent(new CustomEvent('change-modifier', {
      detail: { modifier },
      bubbles: true,
      composed: true
    }));
  }

  private handleKeyboardWheel(e: WheelEvent) {
    e.preventDefault();
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const dir = raw > 0 ? 1 : -1;
    let next = this.getNextWhiteKey(this.windowStartMidi, dir as 1 | -1);
    next = Math.max(36, Math.min(84 - 13, next));
    if (next !== this.windowStartMidi) {
      this.dispatchEvent(new CustomEvent('change-voicing-window', {
        detail: { windowStartMidi: next },
        bubbles: true,
        composed: true
      }));
    }
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('activeLocation')) {
      if (this.activeLocation) {
        this.viewedSectionId = this.activeLocation.sectionId;
      } else {
        this.isEditing = false;
      }
    }
    if (changedProperties.has('sections')) {
      if (this.sections.length > 0) {
        if (!this.viewedSectionId || !this.sections.find(s => s.id === this.viewedSectionId)) {
          this.viewedSectionId = this.sections[0].id;
        }
      } else {
        this.viewedSectionId = null;
      }
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('activeLocation') && this.activeLocation) {
      setTimeout(() => this.scrollActiveStepIntoView(), 50);
    }
  }

  private scrollActiveStepIntoView() {
    const activeChip = this.renderRoot.querySelector('.chord-chip.active') as HTMLElement;
    const scrollContainer = this.renderRoot.querySelector('.timeline-scroll-container') as HTMLElement;
    if (activeChip && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const chipRect = activeChip.getBoundingClientRect();
      const relativeLeft = chipRect.left - containerRect.left + scrollContainer.scrollLeft;
      const targetScrollLeft = relativeLeft - (containerRect.width / 2) + (chipRect.width / 2);
      
      scrollContainer.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }

  private getTensionClass(tension: string): string {
    if (!tension) return '1';
    if (tension.includes('%')) {
      const val = parseInt(tension, 10);
      if (isNaN(val)) return '1';
      if (val <= 25) return '1';
      if (val <= 50) return '2';
      if (val <= 75) return '3';
      return '4';
    }
    if (tension.startsWith('T')) {
      const char = tension.charAt(1);
      if (['1', '2', '3', '4'].includes(char)) return char;
    }
    return '1';
  }

  render() {
    const hasSections = this.sections.length > 0;
    const totalSteps = this.sections.reduce((acc, sec) => acc + sec.steps.length, 0);

    if (this.collapsed) {
      return html`
        <div class="collapsed-container" @click="${this.handleToggleCollapse}">
          <div class="collapsed-left">
            <span class="collapsed-title">
              Progression <span style="color: var(--text-muted); font-size: 0.8rem; font-family: var(--font-mono);">(${totalSteps} Chords, ${this.sections.length} Sections)</span>
            </span>
            ${hasSections ? html`
              <span class="collapsed-preview">
                ${this.sections[0].steps.slice(0, 4).map((step, idx) => html`
                  <span class="collapsed-chip">${step ? step.name : 'Empty'}</span>
                  ${idx < Math.min(3, this.sections[0].steps.length - 1) ? html`
                    <span style="opacity: 0.4;">➔</span>
                  ` : ''}
                `)}
                ${totalSteps > 4 ? '...' : ''}
              </span>
            ` : html`
              <span class="empty-msg" style="margin-left: 10px; color: var(--text-muted); font-size: 0.8rem;">Empty progression. Expand to configure.</span>
            `}
          </div>
          <button class="btn-icon" title="Reveal Deck">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      `;
    }

    const activeSec = this.sections.find(s => s.id === this.viewedSectionId) || this.sections[0];

    return html`
      <!-- Global Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn-primary" ?disabled="${!hasSections}" @click="${this.handlePlayToggle}">
            ${this.isPlaying ? html`
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg> <span class="btn-text">Pause</span>
            ` : html`
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg> <span class="btn-text">Play</span>
            `}
          </button>
          
          <button class="btn-loop btn-icon ${this.isLooping ? 'active' : ''}" @click="${this.handleLoopToggle}" title="Toggle Loop">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </button>
        </div>
        
        <div class="toolbar-center">
          <span class="toolbar-title">
            Progression Builder <span class="count">(${this.sections.length} ${this.sections.length === 1 ? 'Section' : 'Sections'})</span>
          </span>
        </div>
        
        <div class="toolbar-right">
          <button class="btn-danger btn-icon" ?disabled="${!hasSections}" @click="${this.handleClear}" title="Clear All">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
          <button class="btn-icon" @click="${this.handleToggleCollapse}" title="Hide Deck">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <!-- Section Tabs & Operations -->
      ${hasSections ? html`
        <div class="section-tabs-row">
          <div class="tabs-list">
            ${this.sections.map(sec => html`
              <div class="section-tab ${this.viewedSectionId === sec.id ? 'active' : ''}" @click="${() => this.viewedSectionId = sec.id}">
                ${this.viewedSectionId === sec.id ? html`
                  <input 
                    class="tab-input" 
                    size="${Math.max(5, sec.name.length)}"
                    .value="${sec.name}" 
                    @change="${(e: Event) => this.handleRenameSection(e, sec.id)}"
                    @click="${(e: Event) => e.stopPropagation()}"
                    title="Rename Section"
                    placeholder="Section Name"
                  />
                  <svg class="icon-rename" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                ` : html`
                  <span>${sec.name}</span>
                `}
              </div>
            `)}
            
            <button class="btn-add-section-inline" @click="${this.handleAddSection}" title="Add New Section">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          
          <div class="tab-actions">
            ${(() => {
              if (!activeSec) return '';
              const isOnlySection = this.sections.length <= 1;
              return html`
                <button class="btn-tab-action" @click="${() => this.handleDuplicateSection(activeSec.id)}" title="Duplicate Section">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span class="btn-text">Duplicate</span>
                </button>
                
                <button class="btn-tab-action btn-danger" ?disabled="${isOnlySection}" @click="${() => this.handleDeleteSection(activeSec.id)}" title="Delete Section">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span class="btn-text">Delete</span>
                </button>
              `;
            })()}
          </div>
        </div>
      ` : ''}

      <!-- Main Content Area -->
      <div class="timeline-content">
        <div class="progression-content-wrap">
          ${hasSections ? this.renderSection(activeSec) : html`
            <div class="empty-timeline-box">
              No chords added yet. Explore options in the next options panel to begin building your progression.
            </div>
          `}
        </div>
        
        <!-- Inline Chord Editor Drawer -->
        ${hasSections && this.activeLocation && this.isEditing ? html`
          <div class="chord-editor-drawer">
            ${this.renderChordEditor()}
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderChordEditor() {
    if (!this.activeLocation) return '';
    const activeSec = this.sections.find(s => s.id === this.activeLocation!.sectionId);
    if (!activeSec) return '';
    
    const step = activeSec.steps[this.activeLocation!.stepIndex];
    const totalSteps = this.sections.reduce((acc, sec) => acc + sec.steps.length, 0);
    
    // Find flat step index for display
    let flatIndex = 0;
    for (const sec of this.sections) {
      if (sec.id === this.activeLocation!.sectionId) {
        flatIndex += this.activeLocation!.stepIndex;
        break;
      }
      flatIndex += sec.steps.length;
    }
    
    const isFirstStep = flatIndex === 0;
    const isLastStep = flatIndex === totalSteps - 1;
    const chordName = step ? step.name : 'Empty Slot';
    const currentCore = step?.core || 'maj';
    const currentModifier = step?.modifier !== undefined ? step?.modifier : '7';

    return html`
      <div class="chord-editor-container">
        <!-- Editor Header -->
        <div class="editor-header">
          <div class="editor-title-wrap">
            <span class="editor-label">Chord Voice</span>
            <div class="editor-info">
              <span class="chord-name-badge">${chordName}</span>
              <span class="step-index-badge">Step ${flatIndex + 1} of ${totalSteps}</span>
            </div>
          </div>
          
          <div class="editor-actions-wrap">
            <div class="editor-nav-group">
              <button class="btn-nav-step" ?disabled="${isFirstStep}" @click="${() => this.navigateStep(-1)}" title="Previous Step">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Prev
              </button>
              <button class="btn-nav-step" ?disabled="${isLastStep}" @click="${() => this.navigateStep(1)}" title="Next Step">
                Next
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            <button class="btn-close-editor" @click="${this.exitEditMode}" title="Close Editor">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Close
            </button>
          </div>
        </div>

        <!-- Editor Keyboard and Extension controls -->
        ${this.activeNotes.length > 0 ? html`
          <div style="width: 100%; position: relative;">
            <div class="keyboard-drag-wrap"
                 title="Drag left/right or scroll to shift voicing octave position"
                 @pointerdown=${this.handleKeyboardPointerDown}
                 @pointermove=${this.handleKeyboardPointerMove}
                 @pointerup=${this.handleKeyboardPointerUp}
                 @pointercancel=${this.handleKeyboardPointerUp}
                 @wheel=${this.handleKeyboardWheel}>
              <chord-keyboard 
                .activeNotes=${this.activeNotes} 
                .rootNoteName=${this.rootNoteName}
                .windowStart=${this.windowStartMidi}
                .windowSize=${13}
              ></chord-keyboard>
            </div>
            <div class="keyboard-guide-text">
              ← Drag horizontally or scroll on keyboard to shift octave position →
            </div>
          </div>

            <!-- Core & Modifier Buttons -->
            <div class="extension-group" style="flex-direction: column; gap: 8px;">
              <div class="core-group" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px;">
                ${this.chordCores.map(c => html`
                  <button 
                    class="btn-extension ${currentCore === c.value ? 'active' : ''}" 
                    @click=${() => this.handleCoreChange(c.value)}
                  >
                    ${c.label}
                  </button>
                `)}
              </div>
              <div class="modifier-group" style="display: flex; gap: 8px; overflow-x: auto;">
                ${this.chordModifiers.map(m => html`
                  <button 
                    class="btn-extension ${currentModifier === m.value ? 'active' : ''}" 
                    @click=${() => this.handleModifierChange(m.value)}
                  >
                    ${m.label}
                  </button>
                `)}
              </div>
            </div>

            <!-- Humanize Toggle -->
            ${this.humanLoaded ? html`
              <button 
                class="btn-humanize-toggle ${this.showHumanInsideEditor ? 'active' : ''}" 
                @click=${() => this.showHumanInsideEditor = !this.showHumanInsideEditor}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                MIDI Humanize
              </button>
            ` : null}
          </div>

          <!-- Humanize Sub-panel -->
          ${this.humanLoaded && this.showHumanInsideEditor ? html`
            <div class="human-panel-container">
              <human-panel 
                .heading=${"MIDI Humanization Settings"}
                .hideInput=${true} 
                .debugExpanded=${false}
                @human-change=${this.handleHumanChange}
                @human-preview=${this.handleHumanPreview}
              ></human-panel>
            </div>
          ` : null}
        ` : html`
          <div class="empty-timeline-box" style="height: 100px; padding: 20px;">
            Voicing configuration is loaded when a valid chord is selected.
          </div>
        `}
      </div>
    `;
  }

  private renderSection(sec: ProgressionSection) {
    if (!sec) return '';
    return html`
      <div class="timeline-scroll-container">
        <div class="timeline-track">
          ${sec.steps.map((step, idx) => {
            const isActive = this.activeLocation?.sectionId === sec.id && this.activeLocation?.stepIndex === idx;
            const isFirstStep = this.sections[0]?.id === sec.id && idx === 0;
            return html`
              <div class="step-wrapper">
                <div class="chord-chip ${isActive ? 'active' : ''} ${!step ? 'empty-slot' : ''}" 
                     title="${step ? 'Double-click to edit' : ''}"
                     @click="${() => this.handleStepClick(sec.id, idx)}"
                     @dblclick="${() => this.handleStepDblClick(sec.id, idx)}">
                  
                  <div class="chip-led ${isActive ? 'led-active' : ''}"></div>
                  <div class="chip-index">${String(idx + 1).padStart(2, '0')}</div>
                  
                  ${step ? html`
                    <div class="chip-name">${step.name}</div>
                    <div class="chip-tension-row">
                      <span class="chip-tension-badge tension-${this.getTensionClass(step.tension)}">${step.tension}</span>
                      ${(step.core !== 'maj' || step.modifier !== '7') ? html`
                        <span class="chip-ext-badge">${step.core === 'maj' ? '' : step.core}${step.modifier}</span>
                      ` : ''}
                    </div>

                    <div class="chip-edit-hint" aria-hidden="true">
                      <span class="chip-edit-hint-icon">
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </span>
                      <span class="chip-edit-hint-text">edit</span>
                    </div>
                    
                    <button class="btn-remove-step" @click="${(e: Event) => this.handleRemoveStep(e, sec.id, idx)}" title="Remove step">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  ` : html`
                    <div class="chip-name empty-text">Empty</div>
                    ${!isFirstStep ? html`
                      <button class="btn-remove-step" @click="${(e: Event) => this.handleRemoveStep(e, sec.id, idx)}" title="Remove empty slot">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    ` : ''}
                  `}
                </div>

                ${idx < sec.steps.length - 1 ? html`
                  <div class="step-connector">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                ` : ''}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chord-timeline': ChordTimeline;
  }
}
