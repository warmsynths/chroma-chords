import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { midiService, MidiDevice, MidiConnectionStatus } from '../../services/midi-service';

@customElement('midi-modal')
export class MidiModal extends LitElement {
  @property({ type: Boolean }) isOpen = false;

  @state() private status: MidiConnectionStatus = 'idle';
  @state() private outputs: MidiDevice[] = [];
  @state() private inputs: MidiDevice[] = [];
  @state() private selectedOutput: string | null = null;
  @state() private selectedInput: string | null = null;
  @state() private chordsChannel = 1;
  @state() private chordsInternalAudio = true;
  @state() private melodyChannel = 2;
  @state() private melodyInternalAudio = true;
  @state() private errorMessage = '';
  @state() private testNotePlaying = false;

  private unsubscribe?: () => void;

  static styles = css`
    :host {
      display: contents;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #2e271f;
    }

    * {
      box-sizing: border-box;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(46, 39, 31, 0.45);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    .modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-card {
      width: 100%;
      max-width: 460px;
      background: #fbf3e6;
      border-radius: 24px;
      box-shadow: 0 16px 40px rgba(46, 39, 31, 0.18), 0 2px 8px rgba(46, 39, 31, 0.08);
      border: 1px solid rgba(46, 39, 31, 0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(12px) scale(0.98);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-overlay.open .modal-card {
      transform: translateY(0) scale(1);
    }

    /* Header */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px 14px;
      border-bottom: 1px solid rgba(46, 39, 31, 0.08);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-title {
      font-size: 17px;
      font-weight: 800;
      color: #2e271f;
      letter-spacing: -0.01em;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 100px;
      background: rgba(46, 39, 31, 0.06);
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }

    .status-dot.connected {
      background: #6f8f5c;
      box-shadow: 0 0 0 2px rgba(111, 143, 92, 0.3);
    }

    .status-dot.idle {
      background: #f6d98b;
    }

    .status-dot.error,
    .status-dot.unsupported {
      background: #f2735f;
    }

    .close-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: rgba(46, 39, 31, 0.06);
      color: #6b5f50;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .close-btn:hover {
      background: rgba(46, 39, 31, 0.12);
      color: #2e271f;
    }

    /* Body */
    .modal-body {
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      max-height: calc(85vh - 120px);
      overflow-y: auto;
    }

    .section-label {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #8a6b3f;
      margin-bottom: 6px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 12.5px;
      font-weight: 700;
      color: #2e271f;
    }

    .select-control {
      width: 100%;
      height: 38px;
      padding: 0 12px;
      border-radius: 10px;
      border: 1px solid rgba(46, 39, 31, 0.15);
      background: #fffdf8;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      color: #2e271f;
      cursor: pointer;
      transition: border-color 0.15s ease;
    }

    .select-control:focus {
      outline: none;
      border-color: #9b7ca8;
    }

    /* Channel Routing Rows */
    .routing-card {
      border-radius: 14px;
      background: rgba(46, 39, 31, 0.04);
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .routing-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .routing-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .routing-title {
      font-size: 13.5px;
      font-weight: 800;
      color: #2e271f;
    }

    .routing-sub {
      font-size: 11px;
      font-weight: 600;
      color: #6b5f50;
    }

    .routing-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .channel-select {
      height: 32px;
      padding: 0 8px;
      border-radius: 8px;
      border: 1px solid rgba(46, 39, 31, 0.15);
      background: #fbf3e6;
      font-family: 'Space Mono', monospace;
      font-size: 11.5px;
      font-weight: 700;
      color: #2e271f;
    }

    /* Audio Toggle Pill */
    .audio-toggle-btn {
      min-height: 28px;
      padding: 0 10px;
      border-radius: 8px;
      border: 1px solid rgba(46, 39, 31, 0.12);
      background: transparent;
      font-family: inherit;
      font-size: 11px;
      font-weight: 700;
      color: #6b5f50;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .audio-toggle-btn.active {
      background: #2e271f;
      color: #fbf3e6;
      border-color: #2e271f;
    }

    /* Actions Bar */
    .actions-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(46, 39, 31, 0.08);
    }

    .btn {
      min-height: 38px;
      padding: 0 16px;
      border-radius: 10px;
      border: none;
      font-family: inherit;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background 0.15s ease, transform 0.1s ease;
    }

    .btn:active {
      transform: scale(0.97);
    }

    .btn-connect {
      background: #2e271f;
      color: #fbf3e6;
    }

    .btn-connect:hover {
      background: #4a3f33;
    }

    .btn-test {
      background: #c9a9e0;
      color: #2e271f;
    }

    .btn-test:hover {
      background: #bfa1d9;
    }

    .btn-test:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .error-banner {
      padding: 10px 12px;
      border-radius: 10px;
      background: rgba(242, 115, 95, 0.12);
      color: #e85f49;
      font-size: 12px;
      font-weight: 600;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.syncFromService();
    this.unsubscribe = midiService.subscribe(() => {
      this.syncFromService();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  private syncFromService() {
    this.status = midiService.getStatus();
    this.errorMessage = midiService.getErrorMessage();
    this.outputs = midiService.getOutputs();
    this.inputs = midiService.getInputs();
    this.selectedOutput = midiService.getSelectedOutput();
    this.selectedInput = midiService.getSelectedInput();
    this.chordsChannel = midiService.routing.chordsChannel;
    this.chordsInternalAudio = midiService.routing.chordsInternalAudio;
    this.melodyChannel = midiService.routing.melodyChannel;
    this.melodyInternalAudio = midiService.routing.melodyInternalAudio;
  }

  private async onConnect() {
    await midiService.connect();
    this.syncFromService();
  }

  private onSendTest() {
    this.testNotePlaying = true;
    midiService.sendTestNote(this.chordsChannel);
    setTimeout(() => {
      this.testNotePlaying = false;
    }, 450);
  }

  private onOutputChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    midiService.setSelectedOutput(val || null);
  }

  private onInputChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    midiService.setSelectedInput(val || null);
  }

  private onChordsChannelChange(e: Event) {
    const ch = parseInt((e.target as HTMLSelectElement).value, 10);
    this.chordsChannel = ch;
    midiService.setRouting({ chordsChannel: ch });
  }

  private onMelodyChannelChange(e: Event) {
    const ch = parseInt((e.target as HTMLSelectElement).value, 10);
    this.melodyChannel = ch;
    midiService.setRouting({ melodyChannel: ch });
  }

  private toggleChordsAudio() {
    this.chordsInternalAudio = !this.chordsInternalAudio;
    midiService.setRouting({ chordsInternalAudio: this.chordsInternalAudio });
  }

  private toggleMelodyAudio() {
    this.melodyInternalAudio = !this.melodyInternalAudio;
    midiService.setRouting({ melodyInternalAudio: this.melodyInternalAudio });
  }

  private onClose() {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  render() {
    const channels = Array.from({ length: 16 }, (_, i) => i + 1);

    return html`
      <div
        class="modal-overlay ${this.isOpen ? 'open' : ''}"
        @click=${(e: MouseEvent) => {
          if (e.target === e.currentTarget) this.onClose();
        }}
      >
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="midi-title">
          <!-- Header -->
          <div class="modal-header">
            <div class="header-left">
              <span class="header-title" id="midi-title">Web MIDI Routing</span>
              <span class="status-badge">
                <span class="status-dot ${this.status}"></span>
                ${this.status === 'connected' ? 'Connected' : this.status === 'error' ? 'Error' : 'Idle'}
              </span>
            </div>
            <button class="close-btn" @click=${this.onClose} aria-label="Close">×</button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            ${this.errorMessage
              ? html`<div class="error-banner">${this.errorMessage}</div>`
              : nothing}

            <!-- Hardware Devices -->
            <div class="form-group">
              <span class="section-label">HARDWARE OUTPUT</span>
              <select class="select-control" @change=${this.onOutputChange}>
                <option value="">No MIDI output device selected</option>
                ${this.outputs.map(
                  out => html`
                    <option value=${out.id} ?selected=${this.selectedOutput === out.id}>
                      ${out.name}
                    </option>
                  `
                )}
              </select>
            </div>

            <div class="form-group">
              <span class="section-label">HARDWARE INPUT</span>
              <select class="select-control" @change=${this.onInputChange}>
                <option value="">No MIDI input device selected</option>
                ${this.inputs.map(
                  inp => html`
                    <option value=${inp.id} ?selected=${this.selectedInput === inp.id}>
                      ${inp.name}
                    </option>
                  `
                )}
              </select>
            </div>

            <!-- Per-Part Channel Routing -->
            <div class="form-group">
              <span class="section-label">PART ROUTING</span>
              <div class="routing-card">
                <!-- Chords Part -->
                <div class="routing-row">
                  <div class="routing-info">
                    <span class="routing-title">Chords</span>
                    <span class="routing-sub">Harmonic progression</span>
                  </div>
                  <div class="routing-controls">
                    <select class="channel-select" @change=${this.onChordsChannelChange}>
                      ${channels.map(
                        ch => html`
                          <option value=${ch} ?selected=${this.chordsChannel === ch}>
                            Ch ${ch}
                          </option>
                        `
                      )}
                    </select>
                    <button
                      class="audio-toggle-btn ${this.chordsInternalAudio ? 'active' : ''}"
                      @click=${this.toggleChordsAudio}
                      title="Internal synth audio playback"
                    >
                      ${this.chordsInternalAudio ? 'Sound: ON' : 'Muted'}
                    </button>
                  </div>
                </div>

                <!-- Melody Part -->
                <div class="routing-row">
                  <div class="routing-info">
                    <span class="routing-title">Melody</span>
                    <span class="routing-sub">Lead voice sequencer</span>
                  </div>
                  <div class="routing-controls">
                    <select class="channel-select" @change=${this.onMelodyChannelChange}>
                      ${channels.map(
                        ch => html`
                          <option value=${ch} ?selected=${this.melodyChannel === ch}>
                            Ch ${ch}
                          </option>
                        `
                      )}
                    </select>
                    <button
                      class="audio-toggle-btn ${this.melodyInternalAudio ? 'active' : ''}"
                      @click=${this.toggleMelodyAudio}
                      title="Internal lead synth audio playback"
                    >
                      ${this.melodyInternalAudio ? 'Sound: ON' : 'Muted'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="actions-bar">
              <button class="btn btn-connect" @click=${this.onConnect}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/><circle cx="10" cy="15" r="1"/><circle cx="14" cy="15" r="1"/><circle cx="12" cy="8" r="1"/></svg>
                ${this.status === 'connected' ? 'Re-scan devices' : 'Connect MIDI'}
              </button>

              <button
                class="btn btn-test"
                @click=${this.onSendTest}
                ?disabled=${this.status !== 'connected' || !this.selectedOutput}
              >
                ${this.testNotePlaying ? 'Playing note...' : 'Send test note'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
