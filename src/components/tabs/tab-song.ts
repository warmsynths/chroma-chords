import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  SongSection,
  SongTimelineItem,
  SongArranger,
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

  @state() private draggingIdx: number | null = null;
  @state() private dragOverIdx: number | null = null;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #2e271f;
    }

    * {
      box-sizing: border-box;
    }

    .song-panel {
      position: relative;
      border-radius: 26px;
      padding: 16px 20px 24px;
      background: var(--panel-tint-bg, rgba(201, 169, 224, 0.18));
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 24px rgba(46, 39, 31, 0.04);
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 520px;
    }

    @media (max-width: 640px) {
      .song-panel {
        border-radius: 22px;
        padding: 14px 16px 20px;
      }
    }

    /* Panel Header */
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8a6b3f;
    }

    .header-count {
      font-size: 12px;
      font-weight: 700;
      color: #6b5f50;
      background: rgba(46, 39, 31, 0.06);
      padding: 2px 10px;
      border-radius: 100px;
      font-family: 'Space Mono', monospace;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .play-song-btn {
      min-height: 34px;
      padding: 0 16px;
      border: none;
      border-radius: 100px;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 800;
      background: #c9a9e0;
      color: #2e271f;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(46, 39, 31, 0.1);
      transition: transform 0.15s ease, background 0.15s ease;
    }

    .play-song-btn:hover {
      background: #bfa1d9;
      transform: translateY(-1px);
    }

    .play-song-btn.playing {
      background: #2e271f;
      color: #fbf3e6;
    }

    /* 2-Column Responsive Layout */
    .song-columns {
      display: grid;
      grid-template-columns: minmax(320px, 390px) 1fr;
      gap: 20px;
      align-items: start;
    }

    @media (max-width: 860px) {
      .song-columns {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    /* Column Headers */
    .col-header {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 10px;
    }

    .col-title {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8a6b3f;
    }

    .col-sub {
      font-size: 12px;
      font-weight: 600;
      color: #6b5f50;
    }

    /* Left Column: Sections Library */
    .sections-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .section-card {
      border-radius: 18px;
      padding: 14px;
      background: #fbf3e6;
      border: 1.5px solid rgba(46, 39, 31, 0.08);
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 2px 8px rgba(46, 39, 31, 0.04);
      transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
    }

    .section-card:hover {
      border-color: rgba(46, 39, 31, 0.2);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(46, 39, 31, 0.07);
    }

    .section-card.active {
      border-color: #2e271f;
      box-shadow: 0 0 0 2px #2e271f, 0 4px 16px rgba(46, 39, 31, 0.08);
    }

    .section-card-top {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-badge {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #2e271f;
      flex-shrink: 0;
    }

    .section-name {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2e271f;
    }

    .section-bars {
      font-family: 'Space Mono', monospace;
      font-size: 10.5px;
      font-weight: 700;
      color: #6b5f50;
      background: rgba(46, 39, 31, 0.06);
      padding: 2px 7px;
      border-radius: 6px;
      margin-left: auto;
    }

    .section-desc {
      font-size: 12px;
      line-height: 1.4;
      color: #6b5f50;
      margin: 0;
    }

    /* Mini Chord Chips */
    .chord-chips-row {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      align-items: center;
      padding: 2px 0;
    }

    .chord-chip {
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: #2e271f;
      border: 1px solid rgba(46, 39, 31, 0.08);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .chord-chip-rn {
      font-family: 'Space Mono', monospace;
      font-size: 9px;
      color: #6b5f50;
    }

    /* Section Actions */
    .section-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      padding-top: 6px;
      border-top: 1px solid rgba(46, 39, 31, 0.06);
    }

    .action-btn {
      min-height: 28px;
      padding: 0 10px;
      border-radius: 8px;
      border: 1px solid rgba(46, 39, 31, 0.12);
      background: #fbf3e6;
      font-family: inherit;
      font-size: 11.5px;
      font-weight: 700;
      color: #2e271f;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
    }

    .action-btn:hover {
      background: #f1e4cc;
      border-color: rgba(46, 39, 31, 0.25);
    }

    .action-btn.primary {
      background: #2e271f;
      color: #fbf3e6;
      border-color: #2e271f;
    }

    .action-btn.primary:hover {
      background: #4a3f33;
    }

    .new-section-btn {
      width: 100%;
      min-height: 44px;
      border-radius: 16px;
      border: 1.5px dashed rgba(46, 39, 31, 0.25);
      background: rgba(251, 243, 230, 0.6);
      font-family: inherit;
      font-size: 13px;
      font-weight: 800;
      color: #2e271f;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      margin-top: 4px;
      transition: background 0.15s ease, border-color 0.15s ease;
    }

    .new-section-btn:hover {
      background: #fbf3e6;
      border-color: #2e271f;
    }

    /* Right Column: Song Order Timeline */
    .timeline-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .timeline-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 200px;
    }

    .timeline-card {
      position: relative;
      border-radius: 16px;
      padding: 12px 14px;
      background: #fbf3e6;
      border: 1.5px solid rgba(46, 39, 31, 0.08);
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 1px 4px rgba(46, 39, 31, 0.03);
      transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
      overflow: hidden;
    }

    .timeline-card:hover {
      border-color: rgba(46, 39, 31, 0.22);
    }

    .timeline-card.active-playing {
      border-color: #9b7ca8;
      box-shadow: 0 0 0 2px #9b7ca8, 0 4px 14px rgba(155, 124, 168, 0.2);
    }

    .timeline-card.dragging {
      opacity: 0.4;
      border: 1.5px dashed #2e271f;
    }

    .timeline-card.drag-over {
      border-top: 3px solid #2e271f;
    }

    /* Full-width playback highlight bar */
    .playback-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: #9b7ca8;
      width: 0%;
      transition: width 0.1s linear;
      border-radius: 0 2px 2px 0;
    }

    .timeline-card.active-playing .playback-bar {
      width: 100%;
    }

    .drag-handle {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #6b5f50;
      cursor: grab;
      font-size: 13px;
      user-select: none;
    }

    .step-idx {
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #8a6b3f;
      min-width: 18px;
    }

    .timeline-card-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }

    .timeline-card-title-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .timeline-card-name {
      font-size: 14.5px;
      font-weight: 800;
      color: #2e271f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .timeline-chords-summary {
      font-size: 11.5px;
      font-weight: 600;
      color: #6b5f50;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Repeat Counter Stepper */
    .repeat-stepper {
      display: flex;
      align-items: center;
      gap: 2px;
      background: rgba(46, 39, 31, 0.06);
      border-radius: 100px;
      padding: 2px;
      flex-shrink: 0;
    }

    .stepper-btn {
      width: 26px;
      height: 26px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: #2e271f;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease;
    }

    .stepper-btn:hover:not(:disabled) {
      background: #fbf3e6;
    }

    .stepper-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .repeat-label {
      font-family: 'Space Mono', monospace;
      font-size: 11.5px;
      font-weight: 700;
      color: #2e271f;
      min-width: 24px;
      text-align: center;
    }

    /* Move / Remove actions */
    .timeline-actions {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .icon-action-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: #6b5f50;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: background 0.15s ease, color 0.15s ease;
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
      font-size: 16px;
      font-weight: 700;
      color: #f2735f;
    }

    .delete-item-btn:hover:not(:disabled) {
      background: rgba(242, 115, 95, 0.12);
      color: #e85f49;
    }

    /* Empty state */
    .timeline-empty {
      padding: 32px 16px;
      border-radius: 16px;
      border: 1.5px dashed rgba(46, 39, 31, 0.2);
      text-align: center;
      color: #6b5f50;
      font-size: 13px;
      font-weight: 600;
    }

    /* Timeline Footer */
    .timeline-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 14px;
      background: rgba(251, 243, 230, 0.5);
      border: 1px solid rgba(46, 39, 31, 0.06);
    }

    .timeline-summary {
      font-family: 'Space Mono', monospace;
      font-size: 11.5px;
      font-weight: 700;
      color: #6b5f50;
    }
  `;

  private getEffectiveTimeline(): SongTimelineItem[] {
    if (this.timeline && this.timeline.length > 0) {
      return this.timeline;
    }
    if (this.sections && this.sections.length > 0) {
      return SongArranger.createDefaultTimeline(this.sections);
    }
    return [];
  }

  private getTotalBars(): number {
    const timeline = this.getEffectiveTimeline();
    let total = 0;
    for (const item of timeline) {
      const sec = this.sections[item.sectionIndex];
      const count = sec?.progression?.chords?.length || 4;
      total += count * Math.max(1, item.repeats);
    }
    return total;
  }

  private getEstimatedDuration(): string {
    const bars = this.getTotalBars();
    const beats = bars * 4;
    const seconds = Math.round((beats / (this.bpm || 120)) * 60);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins > 0 ? `${mins}m ` : ''}${secs}s`;
  }

  private onSelectSectionCard(index: number) {
    this.activeSectionIdx = index;
    this.dispatchEvent(
      new CustomEvent('select-section', {
        detail: { sectionIndex: index },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onEditChords(index: number, e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('edit-chords', {
        detail: { sectionIndex: index },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onEditMelody(index: number, e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('edit-melody', {
        detail: { sectionIndex: index },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onAddToSong(sectionIndex: number, e: Event) {
    e.stopPropagation();
    const timeline = this.getEffectiveTimeline();
    const updated = SongArranger.addTimelineItem(timeline, sectionIndex);
    this.timeline = updated;
    this.dispatchEvent(
      new CustomEvent('reorder-timeline', {
        detail: { timeline: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onUpdateRepeat(index: number, delta: number, e: Event) {
    e.stopPropagation();
    const timeline = this.getEffectiveTimeline();
    const updated = SongArranger.updateTimelineRepeat(timeline, index, delta);
    this.timeline = updated;
    this.dispatchEvent(
      new CustomEvent('reorder-timeline', {
        detail: { timeline: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onMoveTimelineItem(index: number, delta: number, e: Event) {
    e.stopPropagation();
    const timeline = this.getEffectiveTimeline();
    const target = index + delta;
    if (target < 0 || target >= timeline.length) return;
    const updated = SongArranger.reorderTimeline(timeline, index, target);
    this.timeline = updated;
    this.dispatchEvent(
      new CustomEvent('reorder-timeline', {
        detail: { timeline: updated },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onRemoveTimelineItem(index: number, e: Event) {
    e.stopPropagation();
    const timeline = this.getEffectiveTimeline();
    const updated = SongArranger.removeTimelineItem(timeline, index);
    this.timeline = updated;
    this.dispatchEvent(
      new CustomEvent('reorder-timeline', {
        detail: { timeline: updated },
        bubbles: true,
        composed: true,
      })
    );
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

  render() {
    const timeline = this.getEffectiveTimeline();
    const totalBars = this.getTotalBars();
    const estDuration = this.getEstimatedDuration();

    return html`
      <div class="song-panel">
        <!-- Panel Header -->
        <div class="panel-header">
          <div class="header-left">
            <span class="header-label">SONG</span>
            <span class="header-count">${timeline.length} parts · ${totalBars} bars</span>
          </div>

          <div class="header-right">
            <button
              class="play-song-btn ${this.playing ? 'playing' : ''}"
              @click=${this.onTogglePlaySong}
              aria-label="Toggle song playback"
            >
              ${this.playing
                ? html`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg> Stop song`
                : html`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Play song · ${timeline.length} parts`}
            </button>
          </div>
        </div>

        <!-- 2-Column Responsive Layout -->
        <div class="song-columns">
          <!-- Left Column: Sections Library -->
          <div class="sections-library">
            <div class="col-header">
              <span class="col-title">SECTIONS</span>
              <span class="col-sub">Edit once, used everywhere</span>
            </div>

            <div class="sections-list">
              ${this.sections.map((section, idx) => {
                const badge = SECTION_BADGES[idx % SECTION_BADGES.length];
                const badgeColor = SECTION_COLORS[idx % SECTION_COLORS.length];
                const chords = section.progression?.chords || [];
                const isActive = this.activeSectionIdx === idx;

                return html`
                  <div
                    class="section-card ${isActive ? 'active' : ''}"
                    @click=${() => this.onSelectSectionCard(idx)}
                    role="button"
                    tabindex="0"
                  >
                    <div class="section-card-top">
                      <span class="section-badge" style="background: ${badgeColor};">
                        ${badge}
                      </span>
                      <span class="section-name">${section.name}</span>
                      <span class="section-bars">${chords.length} bars</span>
                    </div>

                    ${section.desc
                      ? html`<p class="section-desc">${section.desc}</p>`
                      : nothing}

                    <!-- Chord Chips Row -->
                    <div class="chord-chips-row">
                      ${chords.map(c => {
                        const tensionColor = roleForTension(c.tension ?? 0.2);
                        return html`
                          <span
                            class="chord-chip"
                            style="background: color-mix(in srgb, ${tensionColor} 30%, #FBF3E6);"
                          >
                            <span>${c.name}</span>
                            ${c.roman ? html`<span class="chord-chip-rn">${c.roman}</span>` : nothing}
                          </span>
                        `;
                      })}
                    </div>

                    <!-- Section Actions -->
                    <div class="section-actions">
                      <button
                        class="action-btn primary"
                        @click=${(e: Event) => this.onAddToSong(idx, e)}
                        title="Append instance to Song timeline"
                      >
                        + Add to song
                      </button>
                      <button
                        class="action-btn"
                        @click=${(e: Event) => this.onEditChords(idx, e)}
                        title="Edit chords in Chords tab"
                      >
                        Edit chords
                      </button>
                      <button
                        class="action-btn"
                        @click=${(e: Event) => this.onEditMelody(idx, e)}
                        title="Edit melody in Melody tab"
                      >
                        Edit melody
                      </button>
                    </div>
                  </div>
                `;
              })}

              <button
                class="new-section-btn"
                @click=${this.onNewSectionFromLoop}
                title="Branch current progression into a new section"
              >
                + New section from loop
              </button>
            </div>
          </div>

          <!-- Right Column: Song Order Timeline -->
          <div class="timeline-container">
            <div class="col-header">
              <span class="col-title">SONG ORDER</span>
              <span class="col-sub">Drag to arrange, set repeats</span>
            </div>

            <div class="timeline-list">
              ${timeline.length === 0
                ? html`<div class="timeline-empty">No sections in timeline. Add one from the library!</div>`
                : timeline.map((item, idx) => {
                    const sec = this.sections[item.sectionIndex];
                    if (!sec) return nothing;
                    const badge = SECTION_BADGES[item.sectionIndex % SECTION_BADGES.length];
                    const badgeColor = SECTION_COLORS[item.sectionIndex % SECTION_COLORS.length];
                    const chordsSummary = (sec.progression?.chords || []).map(c => c.name).join(' – ');
                    const isPlayingItem = this.playing && this.activeTimelineIdx === idx;
                    const isDragging = this.draggingIdx === idx;
                    const isDragOver = this.dragOverIdx === idx;

                    return html`
                      <div
                        class="timeline-card ${isPlayingItem ? 'active-playing' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}"
                        draggable="true"
                        @dragstart=${(e: DragEvent) => this.onDragStart(idx, e)}
                        @dragover=${(e: DragEvent) => this.onDragOver(idx, e)}
                        @dragend=${this.onDragEnd}
                        @drop=${(e: DragEvent) => this.onDrop(idx, e)}
                      >
                        <div class="drag-handle" title="Drag to reorder">
                          ⋮⋮ <span class="step-idx">${idx + 1}</span>
                        </div>

                        <span class="section-badge" style="background: ${badgeColor};">
                          ${badge}
                        </span>

                        <div class="timeline-card-info">
                          <div class="timeline-card-title-row">
                            <span class="timeline-card-name">${sec.name}</span>
                          </div>
                          <div class="timeline-chords-summary">${chordsSummary}</div>
                        </div>

                        <!-- Repeat Counter Stepper -->
                        <div class="repeat-stepper" title="Repeat count">
                          <button
                            class="stepper-btn"
                            @click=${(e: Event) => this.onUpdateRepeat(idx, -1, e)}
                            ?disabled=${item.repeats <= 1}
                            aria-label="Decrease repeat"
                          >
                            −
                          </button>
                          <span class="repeat-label">×${item.repeats}</span>
                          <button
                            class="stepper-btn"
                            @click=${(e: Event) => this.onUpdateRepeat(idx, 1, e)}
                            ?disabled=${item.repeats >= 8}
                            aria-label="Increase repeat"
                          >
                            +
                          </button>
                        </div>

                        <!-- Move Up / Down Buttons -->
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

                        <!-- Active playback progress bar -->
                        <div class="playback-bar"></div>
                      </div>
                    `;
                  })}
            </div>

            <!-- Timeline Footer Summary -->
            <div class="timeline-footer">
              <span class="timeline-summary">
                Total: ${totalBars} bars · ~${estDuration} at ${this.bpm} BPM
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
