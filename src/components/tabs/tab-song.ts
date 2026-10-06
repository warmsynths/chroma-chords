import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  SongSection,
  SongTimelineItem,
  SongArranger,
  SECTION_TYPES,
  MAX_SECTIONS,
} from '../../services/song-arranger';
import { roleForTension } from '../../services/chord-engine';

const SECTION_BADGES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SECTION_COLORS = [
  '#9CC0EC', // A: Soft Blue
  '#C9A9E0', // B: Soft Purple
  '#F2A79B', // C: Soft Coral
  '#F6D98B', // D: Warm Gold
  '#B8CC9E', // E: Sage Green
  '#D9A9C9', // F: Dusty Rose
  '#A0D4D9', // G: Aqua
  '#E6B89C', // H: Sand
];

const SECTION_TINTS = [
  '#DFEAF8', // A: Soft tinted blue
  '#F4E2DE', // B: Soft tinted coral
  '#E6EDDA', // C: Soft tinted sage
  '#FAF0D7', // D: Warm gold tint
  '#ECE3F2', // E: Soft tinted purple
  '#F7DFE7', // F: Dusty rose tint
  '#DCF0F2', // G: Soft aqua tint
  '#F5E8DC', // H: Sand tint
];

@customElement('tab-song')
export class TabSong extends LitElement {
  @property({ type: Array }) sections: SongSection[] = [];
  @property({ type: Array }) timeline: SongTimelineItem[] = [];
  @property({ type: Number }) activeSectionIdx: number = 0;
  @property({ type: Number }) activeTimelineIdx: number = 0;
  @property({ type: Number }) currentStep: number = 0;
  @property({ type: Boolean }) playing: boolean = false;
  @property({ type: String }) mood: string = 'Dreamy';
  @property({ type: Number }) bpm: number = 120;

  @state() private pickerOpen = false;
  @state() private draggingIdx: number | null = null;
  @state() private dragOverIdx: number | null = null;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2e271f);
    }

    * {
      box-sizing: border-box;
    }

    /* 2-Column Responsive Layout (Matches Chroma Melody.dc.html:409) */
    .song-columns {
      display: grid;
      grid-template-columns: minmax(320px, 400px) minmax(0, 1fr);
      gap: 18px;
      align-items: start;
      width: 100%;
      color: #2E271F;
    }

    @media (max-width: 860px) {
      .song-columns {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

    /* Left Sticky Order Column (order: -1 per Chroma Melody.dc.html:432) */
    .timeline-container {
      order: -1;
      position: sticky;
      top: 0;
      min-width: 0;
      border-radius: 26px;
      background: var(--panel-tint-bg, rgba(201, 169, 224, 0.18));
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .timeline-header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 2px 4px 6px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.06);
    }

    .col-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--cv-label, #8a6b3f);
    }

    .col-sub {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6b5f50);
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
    }

    .timeline-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-height: 120px;
    }

    /* Timeline Row Item (Matches Chroma Melody.dc.html:435) */
    .timeline-card {
      position: relative;
      min-height: 42px;
      border-radius: 14px;
      background: rgba(251, 243, 230, 0.5);
      border: none;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 6px 0 10px;
      cursor: pointer;
      overflow: hidden;
      transition: background 150ms ease, box-shadow 150ms ease, transform 120ms ease;
    }

    .timeline-card:hover {
      background: rgba(251, 243, 230, 0.82);
    }

    .timeline-card.selected {
      box-shadow: inset 0 0 0 2px #2e271f;
      background: var(--cv-cream, #fbf3e6);
    }

    .timeline-card.active-playing {
      box-shadow: inset 0 0 0 2px #f2735f;
    }

    .timeline-card.dragging {
      opacity: 0.4;
      border: 1.5px dashed #2e271f;
    }

    .timeline-card.drag-over {
      border-top: 3px solid #2e271f;
    }

    /* Playback Progress Highlight Bar across the row */
    .playback-bar {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0%;
      background: rgba(242, 115, 95, 0.16);
      pointer-events: none;
      transition: width 0.15s linear;
    }

    .timeline-card.active-playing .playback-bar {
      width: 100%;
    }

    .drag-handle {
      position: relative;
      align-self: stretch;
      width: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      touch-action: none;
      color: #b3a590;
      font-size: 14px;
      letter-spacing: -2px;
      flex-shrink: 0;
      user-select: none;
    }

    .step-idx {
      position: relative;
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 11px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6b5f50);
      width: 20px;
      text-align: right;
    }

    .timeline-badge {
      position: relative;
      width: 24px;
      height: 24px;
      border-radius: 7px;
      font-size: 11px;
      font-weight: 800;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      color: #2e271f;
    }

    .timeline-card-info {
      position: relative;
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .timeline-card-name {
      font-size: 13.5px;
      font-weight: 800;
      color: #2e271f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .timeline-chords-summary {
      font-size: 10.5px;
      font-weight: 600;
      color: #6b5f50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Repeat Counter Stepper */
    .repeat-stepper {
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
      border-radius: 100px;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
      flex-shrink: 0;
      background: rgba(251, 243, 230, 0.5);
    }

    .stepper-btn {
      width: 26px;
      height: 26px;
      border: none;
      background: transparent;
      border-radius: 50%;
      cursor: pointer;
      font-family: inherit;
      font-weight: 800;
      font-size: 13px;
      color: #2e271f;
      display: grid;
      place-items: center;
      transition: background 120ms ease;
    }

    .stepper-btn:hover:not(:disabled) {
      background: rgba(46, 39, 31, 0.08);
    }

    .stepper-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .repeat-label {
      font-size: 12px;
      font-weight: 800;
      min-width: 24px;
      text-align: center;
      color: #2e271f;
      user-select: none;
    }

    /* Row Action Buttons (Move & Delete) */
    .timeline-actions {
      position: relative;
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .icon-action-btn {
      width: 26px;
      height: 26px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: #6b5f50;
      cursor: pointer;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 12px;
      transition: background 120ms ease, color 120ms ease;
    }

    .icon-action-btn:hover:not(:disabled) {
      background: rgba(46, 39, 31, 0.08);
      color: #2e271f;
    }

    .icon-action-btn:disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }

    .delete-item-btn {
      font-size: 15px;
      color: #6b5f50;
    }

    .delete-item-btn:hover:not(:disabled) {
      background: rgba(231, 76, 60, 0.12);
      color: #e74c3c;
    }

    /* Phones (design: Song mobile): 48px rows, grip drag, repeat stepper + delete only */
    @media (max-width: 899px) {
      .timeline-container {
        position: static;
        border-radius: 22px;
        padding: 12px;
      }
      .timeline-list {
        gap: 5px;
        min-height: 0;
      }
      .timeline-card {
        min-height: 48px;
      }
      .drag-handle {
        width: 26px;
        margin-left: -6px;
        font-size: 15px;
        letter-spacing: -3px;
      }
      .timeline-chords-summary {
        display: none;
      }
      .repeat-stepper {
        height: 36px;
      }
      .repeat-stepper .stepper-btn {
        width: 34px;
        height: 34px;
      }
      .icon-action-btn {
        width: 36px;
        height: 36px;
      }
      .timeline-actions .icon-action-btn:not(.delete-item-btn) {
        display: none;
      }
      .timeline-card:not(.selected) .delete-item-btn {
        display: none;
      }
    }

    .timeline-empty {
      padding: 24px 12px;
      text-align: center;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--cv-ink-muted, #6b5f50);
      border-radius: 14px;
      border: 1.5px dashed rgba(46, 39, 31, 0.2);
    }

    /* Right Column: Sections Library */
    .sections-library {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sections-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Section Card (Matches Chroma Melody.dc.html:413-428) */
    .section-card {
      border-radius: 20px;
      background: var(--section-tint, rgba(156, 192, 236, 0.22));
      border: none;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      box-shadow: none;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .section-card:hover {
      transform: translateY(-1px);
    }

    .section-card.active {
      box-shadow: inset 0 0 0 2px #2e271f;
    }

    .section-card-top {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .section-badge {
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background: #2e271f;
      color: #fbf3e6;
      font-size: 12px;
      font-weight: 800;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    .section-name {
      font-size: 16px;
      font-weight: 800;
      color: #2e271f;
    }

    .section-bars {
      font-size: 11.5px;
      font-weight: 700;
      color: rgba(46, 39, 31, 0.62);
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
    }

    .section-desc {
      font-size: 12px;
      line-height: 1.4;
      color: #6b5f50;
      margin: 0;
    }

    /* Chord Chips Grid with 8-dot rhythm matrices */
    .chord-chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chord-chip {
      flex: 1 1 92px;
      min-width: 0;
      border-radius: 12px;
      padding: 9px 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      border: none;
      user-select: none;
      background: var(--chord-col, #9cc0ec);
    }

    .chord-chip-text {
      display: flex;
      flex-direction: column;
    }

    .chord-chip-role {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(46, 39, 31, 0.62);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .chord-chip-name {
      font-size: 13px;
      font-weight: 800;
      color: #2e271f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chord-chip-rn {
      font-family: var(--cv-font-mono, 'Space Mono', monospace);
      font-size: 9.5px;
      font-weight: 700;
      color: var(--cv-label, #8a6b3f);
    }

    .rhythm-dots-matrix {
      display: grid;
      grid-template-columns: repeat(8, minmax(0, 1fr));
      row-gap: 3px;
      column-gap: 2px;
      align-items: center;
      justify-items: center;
    }

    .rhythm-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.35);
    }

    .rhythm-dot.active {
      width: 7px;
      height: 7px;
      background: #fbf3e6;
    }

    /* Section Actions (Chroma Melody.dc.html:424-427) */
    .section-actions {
      display: flex;
      gap: 6px;
      margin-top: 4px;
    }

    .section-card:not(.active) .section-actions {
      display: none;
    }

    .action-btn.section-edit-btn {
      flex: 1;
      min-height: 38px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 14px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      background: rgba(46, 39, 31, 0.08);
      color: #2e271f;
      transition: background 150ms ease, transform 100ms ease;
    }

    .action-btn.section-edit-btn:hover {
      background: rgba(46, 39, 31, 0.14);
    }

    .action-btn.section-edit-btn:active {
      transform: scale(0.98);
    }

    .action-btn.primary {
      margin-left: auto;
      min-height: 32px;
      display: inline-flex;
      align-items: center;
      padding: 0 12px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      background: #2e271f;
      color: #fbf3e6;
    }

    .action-btn.primary:hover {
      background: #463c31;
    }

    .new-section-btn {
      width: 100%;
      min-height: 44px;
      border-radius: 16px;
      border: 1.5px dashed rgba(46, 39, 31, 0.25);
      background: transparent;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 800;
      color: #8a6b3f;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: background 150ms ease, border-color 150ms ease;
    }

    .type-picker {
      border-radius: 16px;
      background: rgba(251, 243, 230, 0.8);
      border: 1.5px solid rgba(46, 39, 31, 0.12);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .type-picker-head { display: flex; align-items: center; justify-content: space-between; }
    .type-picker-close { border: none; background: none; font-size: 18px; cursor: pointer; color: #6b5f50; min-width: 32px; min-height: 32px; }
    .type-picker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
    .type-chip {
      border: none;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      min-height: 52px;
      padding: 9px 12px;
      border-radius: 13px;
      background: #f6eadb;
      color: #2e271f;
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: background 140ms ease, transform 120ms ease;
    }
    .type-chip:hover { background: #f1e4cc; }
    .type-chip:active { transform: scale(0.98); }
    .type-chip-name { font-size: 13px; font-weight: 800; }
    .type-chip-desc { font-size: 11px; font-weight: 600; opacity: 0.7; line-height: 1.3; }
    .picker-note { font-size: 11.5px; font-weight: 600; color: #6b5f50; line-height: 1.4; text-align: center; }

    .new-section-btn:hover {
      background: rgba(251, 243, 230, 0.6);
      border-color: #8a6b3f;
    }
  `;

  private getEffectiveTimeline(): SongTimelineItem[] {
    if (this.timeline && this.timeline.length > 0) {
      return this.timeline;
    }
    return this.sections.map((_, idx) => ({
      id: `timeline-item-${idx}`,
      sectionIndex: idx,
      repeats: 1,
    }));
  }

  private getTotalBars(): number {
    const timeline = this.getEffectiveTimeline();
    return timeline.reduce((total, item) => {
      const sec = this.sections[item.sectionIndex];
      const bars = sec?.progression?.chords?.length || 4;
      return total + bars * item.repeats;
    }, 0);
  }

  private getEstimatedDuration(): string {
    const totalBars = this.getTotalBars();
    const beats = totalBars * 4;
    const seconds = Math.round((beats / this.bpm) * 60);
    const mins = Math.floor(seconds / 60);
    const remSecs = seconds % 60;
    return `${mins}:${String(remSecs).padStart(2, '0')}`;
  }

  private onSelectSectionCard(idx: number) {
    this.activeSectionIdx = idx;
    this.dispatchEvent(
      new CustomEvent('select-section', {
        detail: { sectionIndex: idx },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onAddToSong(sectionIndex: number, e: Event) {
    e.stopPropagation();
    const timeline = this.getEffectiveTimeline();
    const newItem: SongTimelineItem = {
      id: `timeline-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sectionIndex,
      repeats: 1,
    };
    const updated = [...timeline, newItem];
    this.timeline = updated;
    this.dispatchEvent(
      new CustomEvent('reorder-timeline', {
        detail: { timeline: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onEditChords(sectionIndex: number, e: Event) {
    e.stopPropagation();
    this.activeSectionIdx = sectionIndex;
    this.dispatchEvent(
      new CustomEvent('edit-chords', {
        detail: { sectionIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onDuplicateSection(sectionIndex: number, e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('duplicate-section', { detail: { sectionIndex }, bubbles: true, composed: true }));
  }

  private onEditMelody(sectionIndex: number, e: Event) {
    e.stopPropagation();
    this.activeSectionIdx = sectionIndex;
    this.dispatchEvent(
      new CustomEvent('edit-melody', {
        detail: { sectionIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onUpdateRepeat(timelineIdx: number, delta: number, e: Event) {
    e.stopPropagation();
    const timeline = this.getEffectiveTimeline();
    const item = timeline[timelineIdx];
    if (!item) return;

    const newRepeats = Math.max(1, Math.min(8, item.repeats + delta));
    if (newRepeats === item.repeats) return;

    const updated = timeline.map((it, idx) =>
      idx === timelineIdx ? { ...it, repeats: newRepeats } : it
    );
    this.timeline = updated;
    this.dispatchEvent(
      new CustomEvent('reorder-timeline', {
        detail: { timeline: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onMoveTimelineItem(idx: number, delta: number, e: Event) {
    e.stopPropagation();
    const timeline = this.getEffectiveTimeline();
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= timeline.length) return;

    const updated = SongArranger.reorderTimeline(timeline, idx, targetIdx);
    this.timeline = updated;
    this.dispatchEvent(
      new CustomEvent('reorder-timeline', {
        detail: { timeline: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onRemoveTimelineItem(idx: number, e: Event) {
    e.stopPropagation();
    const timeline = this.getEffectiveTimeline();
    if (timeline.length <= 1) return;

    const updated = timeline.filter((_, i) => i !== idx);
    this.timeline = updated;
    this.dispatchEvent(
      new CustomEvent('reorder-timeline', {
        detail: { timeline: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onPickType(type: string) {
    this.pickerOpen = false;
    this.dispatchEvent(new CustomEvent('add-section', { detail: { type }, bubbles: true, composed: true }));
  }

  private onNewSectionFromLoop() {
    this.dispatchEvent(
      new CustomEvent('new-section-from-loop', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private onTogglePlaySong() {
    this.dispatchEvent(
      new CustomEvent('toggle-play-song', {
        bubbles: true,
        composed: true,
      })
    );
  }

  // Drag and drop handlers
  private onDragStart(index: number, e: DragEvent) {
    this.draggingIdx = index;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
    }
  }

  private onDragOver(index: number, e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    this.dragOverIdx = index;
  }

  private onDragEnd() {
    this.draggingIdx = null;
    this.dragOverIdx = null;
  }

  private onDrop(targetIndex: number, e: DragEvent) {
    e.preventDefault();
    if (this.draggingIdx !== null && this.draggingIdx !== targetIndex) {
      const timeline = this.getEffectiveTimeline();
      const updated = SongArranger.reorderTimeline(timeline, this.draggingIdx, targetIndex);
      this.timeline = updated;
      this.dispatchEvent(
        new CustomEvent('reorder-timeline', {
          detail: { timeline: updated },
          bubbles: true,
          composed: true,
        })
      );
    }
    this.draggingIdx = null;
    this.dragOverIdx = null;
  }

  // Touch / pen reordering: HTML5 drag-and-drop doesn't fire on touch screens, so the grip drives it with pointer events.
  private onGripPointerDown(index: number, e: PointerEvent) {
    if (e.pointerType === 'mouse') return; // mouse keeps native drag-and-drop
    e.preventDefault();
    e.stopPropagation();
    this.draggingIdx = index;
    this.dragOverIdx = index;
    const move = (ev: PointerEvent) => {
      const el = this.shadowRoot?.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      const row = el?.closest('.timeline-card') as HTMLElement | null;
      if (row?.dataset.idx !== undefined) this.dragOverIdx = parseInt(row.dataset.idx, 10);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      const target = this.dragOverIdx;
      if (this.draggingIdx !== null && target !== null && target !== this.draggingIdx) {
        const updated = SongArranger.reorderTimeline(this.getEffectiveTimeline(), this.draggingIdx, target);
        this.timeline = updated;
        this.dispatchEvent(new CustomEvent('reorder-timeline', { detail: { timeline: updated }, bubbles: true, composed: true }));
      }
      this.draggingIdx = null;
      this.dragOverIdx = null;
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  }

  render() {
    const timeline = this.getEffectiveTimeline();
    const totalBars = this.getTotalBars();
    const estDuration = this.getEstimatedDuration();

    return html`
      <!-- 2-Column Responsive Layout (Song order on left, Sections on right per Chroma Melody design) -->
      <div class="song-columns" data-screen-label="Song">
        <!-- Left Column: Song Order Timeline (Sticky) -->
        <div class="timeline-container">
            <div class="timeline-header-row">
              <span class="col-title">SONG ORDER</span>
              <span class="col-sub">${totalBars} bars · ${estDuration}</span>
            </div>

            <div class="timeline-list">
              ${timeline.length === 0
                ? html`<div class="timeline-empty">Add a section to start the song.</div>`
                : timeline.map((item, idx) => {
                    const sec = this.sections[item.sectionIndex];
                    if (!sec) return nothing;
                    const badge = SECTION_BADGES[item.sectionIndex % SECTION_BADGES.length];
                    const badgeColor = SECTION_TINTS[item.sectionIndex % SECTION_TINTS.length];
                    const chordsSummary = (sec.progression?.chords || []).map(c => c.name).join(' – ');
                    const isPlayingItem = this.playing && this.activeTimelineIdx === idx;
                    const isSelected = item.sectionIndex === this.activeSectionIdx;
                    const isDragging = this.draggingIdx === idx;
                    const isDragOver = this.dragOverIdx === idx;

                    return html`
                      <div
                        class="timeline-card ${isPlayingItem ? 'active-playing' : ''} ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}"
                        draggable="true"
                        data-idx=${idx}
                        @click=${() => this.onSelectSectionCard(item.sectionIndex)}
                        @dragstart=${(e: DragEvent) => this.onDragStart(idx, e)}
                        @dragover=${(e: DragEvent) => this.onDragOver(idx, e)}
                        @dragend=${this.onDragEnd}
                        @drop=${(e: DragEvent) => this.onDrop(idx, e)}
                      >
                        <!-- Active playback progress bar -->
                        <div class="playback-bar"></div>

                        <span class="drag-handle" title="Drag to reorder" aria-label="Drag to reorder" @pointerdown=${(e: PointerEvent) => this.onGripPointerDown(idx, e)}>⋮⋮</span>
                        <span class="step-idx">${String(idx + 1).padStart(2, '0')}</span>

                        <span class="timeline-badge" style="background: ${badgeColor};">
                          ${badge}
                        </span>

                        <div class="timeline-card-info">
                          <span class="timeline-card-name">${sec.name}</span>
                          <span class="timeline-chords-summary">${chordsSummary}</span>
                        </div>

                        <!-- Repeat Counter Stepper -->
                        <div class="repeat-stepper" title="Repeat count">
                          <button
                            class="stepper-btn"
                            @click=${(e: Event) => this.onUpdateRepeat(idx, -1, e)}
                            ?disabled=${item.repeats <= 1}
                            aria-label="Fewer repeats"
                          >
                            −
                          </button>
                          <span class="repeat-label">×${item.repeats}</span>
                          <button
                            class="stepper-btn"
                            @click=${(e: Event) => this.onUpdateRepeat(idx, 1, e)}
                            ?disabled=${item.repeats >= 8}
                            aria-label="More repeats"
                          >
                            +
                          </button>
                        </div>

                        <!-- Move Up / Down Buttons & Remove -->
                        <div class="timeline-actions">
                          <button
                            class="icon-action-btn"
                            @click=${(e: Event) => this.onMoveTimelineItem(idx, -1, e)}
                            ?disabled=${idx === 0}
                            title="Move section up"
                            aria-label="Move up"
                          >
                            ↑
                          </button>
                          <button
                            class="icon-action-btn"
                            @click=${(e: Event) => this.onMoveTimelineItem(idx, 1, e)}
                            ?disabled=${idx === timeline.length - 1}
                            title="Move section down"
                            aria-label="Move down"
                          >
                            ↓
                          </button>
                          <button
                            class="icon-action-btn delete-item-btn"
                            @click=${(e: Event) => this.onRemoveTimelineItem(idx, e)}
                            ?disabled=${timeline.length <= 1}
                            title="Remove section instance"
                            aria-label="Remove"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    `;
                  })}
            </div>
          </div>

          <!-- Right Column: Sections Library (Edit once, used everywhere) -->
          <div class="sections-library">
            <div class="col-title" style="margin-bottom: 2px;">
              SECTIONS · EDIT ONCE, USED EVERYWHERE
            </div>

            <div class="sections-list">
              ${this.sections.map((section, idx) => {
                const badge = SECTION_BADGES[idx % SECTION_BADGES.length];
                const sectionTint = SECTION_TINTS[idx % SECTION_TINTS.length];
                const chords = section.progression?.chords || [];
                const isActive = this.activeSectionIdx === idx;

                return html`
                  <div
                    class="section-card ${isActive ? 'active' : ''}"
                    style="--section-tint: ${sectionTint};"
                    @click=${() => this.onSelectSectionCard(idx)}
                    role="button"
                    tabindex="0"
                  >
                    <div class="section-card-top">
                      <span class="section-badge">
                        ${badge}
                      </span>
                      <span class="section-name">${section.name}</span>
                      <span class="section-bars">${chords.length} bars · ${this.bpm} BPM</span>
                      <button
                        class="action-btn primary"
                        @click=${(e: Event) => this.onAddToSong(idx, e)}
                        title="Append instance to Song timeline"
                      >
                        + Add to song
                      </button>
                    </div>

                    ${section.desc
                      ? html`<p class="section-desc">${section.desc}</p>`
                      : nothing}

                    <!-- Chord Chips Row with 8-dot Rhythm Matrices (Chroma Melody.dc.html:422) -->
                    <div class="chord-chips-row">
                      ${chords.map((c, chordIndex) => {
                        const tensionRole = roleForTension(c.tension ?? 0.2);
                        return html`
                          <div
                            class="chord-chip"
                            style="--chord-col: ${tensionRole.color};"
                          >
                            <div class="chord-chip-text">
                              <span class="chord-chip-role">${c.functionLabel || 'CHORD'}</span>
                              <div style="display: flex; align-items: baseline; gap: 4px;">
                                <span class="chord-chip-name">${c.name}</span>
                                ${c.roman ? html`<span class="chord-chip-rn">${c.roman}</span>` : nothing}
                              </div>
                            </div>
                            <!-- 8-dot rhythm matrix per Chroma Melody design -->
                            <div class="rhythm-dots-matrix">
                              ${Array.from({ length: 8 }, (_, dIdx) => html`
                                <span class="rhythm-dot ${dIdx === 0 || dIdx === 4 ? 'active' : ''}"></span>
                              `)}
                            </div>
                          </div>
                        `;
                      })}
                    </div>

                    <!-- Section Actions (Shown on active section per Chroma Melody.dc.html:424-427) -->
                    <div class="section-actions">
                      <button
                        class="action-btn section-edit-btn"
                        @click=${(e: Event) => this.onEditChords(idx, e)}
                        title="Edit chords in Chords tab"
                      >
                        Edit chords
                      </button>
                      <button
                        class="action-btn section-edit-btn"
                        @click=${(e: Event) => this.onEditMelody(idx, e)}
                        title="Edit melody in Melody tab"
                      >
                        Edit melody
                      </button>
                      <button
                        class="action-btn section-edit-btn"
                        @click=${(e: Event) => this.onDuplicateSection(idx, e)}
                        title="Copy this section: same chords, a fresh melody"
                      >
                        Duplicate
                      </button>
                    </div>
                  </div>
                `;
              })}

              ${this.sections.length >= MAX_SECTIONS
                ? html`<div class="picker-note">A song can hold ${MAX_SECTIONS} sections.</div>`
                : this.pickerOpen
                  ? html`
                    <div class="type-picker" role="group" aria-label="Choose a section to add">
                      <div class="type-picker-head">
                        <span class="col-title">ADD A SECTION</span>
                        <button class="type-picker-close" @click=${() => { this.pickerOpen = false; }} aria-label="Close">×</button>
                      </div>
                      <div class="type-picker-grid">
                        ${SECTION_TYPES.map(t => html`
                          <button class="type-chip" @click=${() => this.onPickType(t.name)}>
                            <span class="type-chip-name">${t.name}</span>
                            <span class="type-chip-desc">${t.desc}</span>
                          </button>
                        `)}
                      </div>
                      <div class="picker-note">New chords in the same key, plus its own melody, added to the end of the song.</div>
                    </div>`
                  : html`
                    <button
                      class="new-section-btn"
                      @click=${() => { this.pickerOpen = true; }}
                      title="Pick which kind of section to add next"
                    >
                      + Add a section
                    </button>`}
            </div>
          </div>
        </div>
    `;
  }
}
