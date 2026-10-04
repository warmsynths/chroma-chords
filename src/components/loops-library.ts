import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ProjectData } from '../services/project-service';
import { roleForTension } from '../services/chord-engine';

/**
 * Saved loops list (Chroma Melody "Your loops" popover): chord dots, genre · mood, search once
 * there are a few, select-and-delete, rename in place, and a two-step delete.
 *
 * Events (all composed, so they bubble out of any parent shadow root):
 *  - select-set    detail: ProjectData
 *  - delete-set    detail: string (project id)
 *  - rename-set    detail: { id, name }
 */
@customElement('loops-library')
export class LoopsLibrary extends LitElement {
  @property({ type: Array }) sets: ProjectData[] = [];
  @property({ type: String }) activeId: string | null = null;
  @property({ type: String }) moodColor = '#C9A9E0';

  @state() private query = '';
  @state() private selectMode = false;
  @state() private selected: string[] = [];
  @state() private renamingId: string | null = null;
  @state() private draftName = '';
  @state() private confirmId: string | null = null;

  static styles = css`
    :host {
      display: block;
      font-family: var(--cv-font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
      color: var(--cv-ink, #2E271F);
    }

    * { box-sizing: border-box; }

    button, input { font-family: inherit; }

    .head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 6px 8px;
    }

    .title {
      flex: 1;
      min-width: 0;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.3px;
      text-transform: uppercase;
      color: var(--cv-label, #8A6B3F);
    }

    .select-btn {
      border: none;
      background: var(--cv-surface, #F6EADB);
      color: var(--cv-ink, #2E271F);
      font-size: 11.5px;
      font-weight: 800;
      min-height: 32px;
      padding: 0 12px;
      border-radius: 100px;
      cursor: pointer;
      transition: background 140ms ease;
    }

    .select-btn:hover { background: var(--cv-surface-2, #F1E4CC); }

    .search {
      padding: 0 4px 9px;
    }

    .search input {
      width: 100%;
      border: none;
      outline: none;
      background: var(--cv-surface, #F6EADB);
      border-radius: 12px;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--cv-ink, #2E271F);
    }

    .search input:focus-visible { box-shadow: 0 0 0 2px #9B7CA8; }

    .list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 0 7px 6px;
      border-radius: 14px;
      min-height: 44px;
      transition: background 140ms ease;
    }

    .row:hover { background: var(--cv-surface, #F6EADB); }
    .row.active { background: var(--cv-surface-2, #F1E4CC); }
    .row.checked { background: var(--cv-surface, #F6EADB); }

    .check {
      width: 22px;
      height: 22px;
      border: none;
      border-radius: 7px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      color: #2E271F;
      cursor: pointer;
      background: transparent;
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.22);
    }

    .check.on {
      background: var(--mood, #C9A9E0);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.14);
    }

    .main {
      flex: 1;
      min-width: 0;
      cursor: pointer;
      background: none;
      border: none;
      text-align: left;
      padding: 0;
      color: inherit;
    }

    .name-line {
      display: flex;
      gap: 7px;
      align-items: center;
      min-width: 0;
    }

    .dots {
      display: flex;
      gap: 3px;
      align-items: center;
      flex-shrink: 0;
    }

    .dots span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }

    .dots span:nth-child(even) { border-radius: 2px; }

    .name {
      flex: 1;
      min-width: 0;
      font-size: 13.5px;
      font-weight: 800;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      display: block;
      font-size: 11.5px;
      color: var(--cv-ink-muted, #6B5F50);
      line-height: 1.35;
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rename-input {
      width: 100%;
      border: none;
      background: var(--cv-cream, #FBF3E6);
      box-shadow: inset 0 0 0 1.5px rgba(46, 39, 31, 0.16);
      border-radius: 11px;
      outline: none;
      font-size: 13.5px;
      font-weight: 800;
      color: var(--cv-ink, #2E271F);
      padding: 9px 11px;
    }

    .actions {
      display: flex;
      gap: 1px;
      flex-shrink: 0;
      align-items: center;
    }

    .icon-btn {
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      color: #5B5145;
      font-size: 17px;
      transition: background 140ms ease;
    }

    .icon-btn:hover { background: var(--cv-cream, #FBF3E6); }

    .confirm-btn {
      border: none;
      background: #D8624C;
      color: #FBF3E6;
      font-size: 11.5px;
      font-weight: 800;
      padding: 9px 12px;
      border-radius: 100px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .confirm-btn:hover { background: #C6564B; }

    .empty {
      font-size: 12.5px;
      line-height: 1.6;
      color: var(--cv-ink-muted, #6B5F50);
      padding: 8px 6px;
    }

    .bulk-delete {
      width: 100%;
      margin-top: 8px;
      border: none;
      background: #D8624C;
      color: #FBF3E6;
      font-size: 12.5px;
      font-weight: 800;
      min-height: 44px;
      border-radius: 100px;
      cursor: pointer;
    }

    .bulk-delete:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `;

  private emit<T>(name: string, detail: T) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private get visible(): ProjectData[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.sets;
    return this.sets.filter(s =>
      `${s.name} ${s.genre} ${s.mood} ${(s.chords || []).map(c => c.name).join(' ')}`.toLowerCase().includes(q)
    );
  }

  private toggleSelectMode() {
    this.selectMode = !this.selectMode;
    this.selected = [];
    this.confirmId = null;
    this.renamingId = null;
  }

  private toggleSelected(id: string) {
    this.selected = this.selected.includes(id) ? this.selected.filter(x => x !== id) : [...this.selected, id];
  }

  private startRename(s: ProjectData, e: Event) {
    e.stopPropagation();
    this.renamingId = s.id;
    this.draftName = s.name;
    this.confirmId = null;
    this.updateComplete.then(() => (this.shadowRoot?.querySelector('.rename-input') as HTMLInputElement | null)?.select());
  }

  private commitRename() {
    const id = this.renamingId;
    const name = this.draftName.trim();
    this.renamingId = null;
    if (id && name) {
      const cur = this.sets.find(s => s.id === id);
      if (cur && cur.name !== name) this.emit('rename-set', { id, name });
    }
  }

  private deleteSelected() {
    this.selected.forEach(id => this.emit('delete-set', id));
    this.selected = [];
    this.selectMode = false;
  }

  private onPrimary(s: ProjectData) {
    if (this.selectMode) this.toggleSelected(s.id);
    else this.emit('select-set', s);
  }

  render() {
    if (!this.sets.length) {
      return html`<div class="empty">Nothing saved yet. Use Save to keep the loop you’re on.</div>`;
    }
    const rows = this.visible;
    const label = `Your loops · ${this.sets.length}`;

    return html`
      <div style="--mood: ${this.moodColor};">
        <div class="head">
          <div class="title">${label}</div>
          <button class="select-btn" @click=${this.toggleSelectMode}>${this.selectMode ? 'Done' : 'Select'}</button>
        </div>

        ${this.sets.length > 2 ? html`
          <div class="search">
            <input
              type="text"
              placeholder="Search loops"
              aria-label="Search loops"
              .value=${this.query}
              @input=${(e: Event) => { this.query = (e.target as HTMLInputElement).value; }}
            />
          </div>
        ` : nothing}

        <div class="list">
          ${rows.map(s => {
            const checked = this.selected.includes(s.id);
            const renaming = this.renamingId === s.id;
            const confirming = this.confirmId === s.id;
            return html`
              <div class="row ${s.id === this.activeId ? 'active' : ''} ${checked ? 'checked' : ''}">
                ${this.selectMode ? html`
                  <button class="check ${checked ? 'on' : ''}" role="checkbox" aria-checked=${checked} aria-label="Select ${s.name}" @click=${() => this.toggleSelected(s.id)}>${checked ? '✓' : ''}</button>
                ` : nothing}

                ${renaming ? html`
                  <div class="main">
                    <input
                      class="rename-input"
                      .value=${this.draftName}
                      aria-label="Rename loop"
                      @input=${(e: Event) => { this.draftName = (e.target as HTMLInputElement).value; }}
                      @keydown=${(e: KeyboardEvent) => {
                        if (e.key === 'Enter') this.commitRename();
                        if (e.key === 'Escape') this.renamingId = null;
                      }}
                      @blur=${() => this.commitRename()}
                    />
                  </div>
                ` : html`
                  <button class="main" @click=${() => this.onPrimary(s)}>
                    <span class="name-line">
                      <span class="dots">
                        ${(s.chords || []).map(c => html`<span style="background: ${c.color || roleForTension(c.tension ?? 0.2).color};"></span>`)}
                      </span>
                      <span class="name">${s.name}</span>
                    </span>
                    <span class="meta">${s.genre} · ${s.mood}</span>
                  </button>
                `}

                ${!this.selectMode && !confirming && !renaming ? html`
                  <div class="actions">
                    <button class="icon-btn" aria-label="Rename loop" @click=${(e: Event) => this.startRename(s, e)}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
                    </button>
                    <button class="icon-btn" aria-label="Delete loop" @click=${(e: Event) => { e.stopPropagation(); this.confirmId = s.id; }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>
                    </button>
                  </div>
                ` : nothing}

                ${confirming ? html`
                  <div class="actions">
                    <button class="confirm-btn" @click=${(e: Event) => { e.stopPropagation(); this.confirmId = null; this.emit('delete-set', s.id); }}>Delete</button>
                    <button class="icon-btn" aria-label="Cancel" @click=${(e: Event) => { e.stopPropagation(); this.confirmId = null; }}>×</button>
                  </div>
                ` : nothing}
              </div>
            `;
          })}
        </div>

        ${rows.length === 0 ? html`<div class="empty">No loops match that.</div>` : nothing}

        ${this.selectMode ? html`
          <button class="bulk-delete" ?disabled=${!this.selected.length} @click=${this.deleteSelected}>
            ${this.selected.length ? `Delete ${this.selected.length}` : 'Pick loops to delete'}
          </button>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loops-library': LoopsLibrary;
  }
}
