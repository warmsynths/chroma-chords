export interface MidiDevice {
  id: string;
  name: string;
  manufacturer?: string;
}

export type MidiConnectionStatus = 'connected' | 'idle' | 'error' | 'unsupported';

export interface MidiRoutingConfig {
  chordsChannel: number;       // 1 to 16, default 1
  chordsInternalAudio: boolean;// default true
  melodyChannel: number;       // 1 to 16, default 2
  melodyInternalAudio: boolean;// default true
  chordsSend: boolean;         // send chords to the MIDI output, default true
  melodySend: boolean;         // send melody to the MIDI output, default true
  sendClock: boolean;          // send MIDI clock + start/stop to the output, default false
  latencyMs: number;           // -250..250: + delays MIDI, - delays the built-in sound
}

export interface MidiNoteEvent {
  note: string;      // e.g. "C4"
  offsetSec: number; // when to start, relative to now
  durSec: number;
  vel: number;       // 0 to 1
}

export type MidiSendMode = 'both' | 'chords' | 'melody' | 'off';

export type MidiListener = (status: MidiConnectionStatus) => void;

/**
 * Everything sent to a device is stamped this far in the future and scheduled by the browser's
 * MIDI layer rather than by JavaScript timers, so a busy main thread (audio, UI, two parts at
 * once) can't push one note later than another.
 */
export const MIDI_LOOKAHEAD_MS = 40;

export class MidiService {
  private static instance: MidiService;
  private midiAccess: any = null;
  private selectedOutputId: string | null = null;
  private selectedInputId: string | null = null;
  private status: MidiConnectionStatus = 'idle';
  private errorMessage: string = '';
  private listeners: Set<MidiListener> = new Set();

  public routing: MidiRoutingConfig = {
    chordsChannel: 1,
    chordsInternalAudio: true,
    melodyChannel: 2,
    melodyInternalAudio: true,
    chordsSend: true,
    melodySend: true,
    sendClock: false,
    latencyMs: 0,
  };

  private constructor() {
    this.loadSettings();
  }

  public static getInstance(): MidiService {
    if (!MidiService.instance) {
      MidiService.instance = new MidiService();
    }
    return MidiService.instance;
  }

  private loadSettings(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem('chroma-chords-midi-routing');
      if (saved) {
        this.routing = { ...this.routing, ...JSON.parse(saved) };
      }
      this.selectedOutputId = localStorage.getItem('chroma-chords-midi-output') || null;
      this.selectedInputId = localStorage.getItem('chroma-chords-midi-input') || null;
    } catch {
      // Fallback
    }
  }

  public saveSettings(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('chroma-chords-midi-routing', JSON.stringify(this.routing));
      if (this.selectedOutputId) {
        localStorage.setItem('chroma-chords-midi-output', this.selectedOutputId);
      } else {
        localStorage.removeItem('chroma-chords-midi-output');
      }
      if (this.selectedInputId) {
        localStorage.setItem('chroma-chords-midi-input', this.selectedInputId);
      } else {
        localStorage.removeItem('chroma-chords-midi-input');
      }
    } catch {
      // Fallback
    }
  }

  public isSupported(): boolean {
    return typeof navigator !== 'undefined' && typeof (navigator as any).requestMIDIAccess === 'function';
  }

  /**
   * Reconnects quietly on startup when a device was chosen last time, so MIDI output and clock work
   * straight after a reload without opening the dialog. Browsers that already granted access allow
   * this without a prompt; if not, it simply stays idle until Connect is pressed.
   */
  public async autoReconnect(): Promise<boolean> {
    if (!this.selectedOutputId || !this.isSupported() || this.status === 'connected') return false;
    const ok = await this.connect();
    if (!ok) {
      // A quiet retry that fails shouldn't greet the user with an error
      this.status = 'idle';
      this.errorMessage = '';
      this.notify();
    }
    return ok;
  }

  public async connect(): Promise<boolean> {
    if (!this.isSupported()) {
      this.status = 'unsupported';
      this.errorMessage = 'Web MIDI is not supported in this browser.';
      this.notify();
      return false;
    }

    try {
      this.midiAccess = await (navigator as any).requestMIDIAccess({ sysex: false });
      this.status = 'connected';
      this.errorMessage = '';

      // Auto-select first available output if none selected
      const outputs = this.getOutputs();
      if (!this.selectedOutputId && outputs.length > 0) {
        this.selectedOutputId = outputs[0].id;
      }

      this.midiAccess.onstatechange = () => {
        this.notify();
      };

      this.saveSettings();
      this.notify();
      return true;
    } catch (err: any) {
      this.status = 'error';
      this.errorMessage = err?.message || 'Failed to access MIDI devices.';
      this.notify();
      return false;
    }
  }

  public getStatus(): MidiConnectionStatus {
    return this.status;
  }

  public getErrorMessage(): string {
    return this.errorMessage;
  }

  public getOutputs(): MidiDevice[] {
    if (!this.midiAccess) return [];
    const list: MidiDevice[] = [];
    try {
      const outputs = this.midiAccess.outputs.values();
      for (const out of outputs) {
        list.push({
          id: out.id,
          name: out.name || `Output ${out.id}`,
          manufacturer: out.manufacturer,
        });
      }
    } catch {
      // safe fallback
    }
    return list;
  }

  public getInputs(): MidiDevice[] {
    if (!this.midiAccess) return [];
    const list: MidiDevice[] = [];
    try {
      const inputs = this.midiAccess.inputs.values();
      for (const input of inputs) {
        list.push({
          id: input.id,
          name: input.name || `Input ${input.id}`,
          manufacturer: input.manufacturer,
        });
      }
    } catch {
      // safe fallback
    }
    return list;
  }

  public getSelectedOutput(): string | null {
    return this.selectedOutputId;
  }

  public setSelectedOutput(id: string | null): void {
    this.selectedOutputId = id;
    this.saveSettings();
    this.notify();
  }

  public getSelectedInput(): string | null {
    return this.selectedInputId;
  }

  public setSelectedInput(id: string | null): void {
    this.selectedInputId = id;
    this.saveSettings();
    this.notify();
  }

  public setRouting(config: Partial<MidiRoutingConfig>): void {
    this.routing = { ...this.routing, ...config };
    if (typeof config.latencyMs === 'number') {
      this.routing.latencyMs = Math.max(-250, Math.min(250, Math.round(config.latencyMs)));
    }
    this.saveSettings();
    this.notify();
    // Turning clock on/off while the app is already playing takes effect immediately
    this.syncTransport(this.lastTransport.playing, this.lastTransport.bpm);
  }

  /** Which parts currently reach the device: both, only one of them, or neither. */
  public getSendMode(): MidiSendMode {
    const c = this.routing.chordsSend !== false;
    const m = this.routing.melodySend !== false;
    return c && m ? 'both' : c ? 'chords' : m ? 'melody' : 'off';
  }

  public setSendMode(mode: MidiSendMode): void {
    this.setRouting({
      chordsSend: mode === 'both' || mode === 'chords',
      melodySend: mode === 'both' || mode === 'melody',
    });
  }

  /** Next mode when tapping a single quick control: Both, Chords only, Melody only, Off. */
  public static nextSendMode(mode: MidiSendMode): MidiSendMode {
    return ({ both: 'chords', chords: 'melody', melody: 'off', off: 'both' } as const)[mode];
  }

  /** How long to hold back the built-in sound so it lines up with a slower external device. */
  public internalDelayMs(): number {
    if (!this.hasOutput()) return 0;
    // MIDI is stamped LOOKAHEAD ahead, so the app's own sound waits the same, keeping 0 ms = aligned
    return MIDI_LOOKAHEAD_MS + Math.max(0, -(this.routing.latencyMs || 0));
  }

  private gridTimeMs: number | null = null;

  /**
   * The playback engine tells us the ideal (jitter-free) time of the beat/step it is about to play,
   * in performance.now() milliseconds, so notes keep their musical spacing even when a timer fires late.
   */
  public setGridTime(ms: number | null): void {
    this.gridTimeMs = ms;
  }

  private baseTimeMs(): number {
    const now = this.nowMs();
    const g = this.gridTimeMs;
    return g !== null && Math.abs(g - now) < 250 ? g : now;
  }

  private midiDelayMs(): number {
    return Math.max(0, this.routing.latencyMs || 0);
  }

  /* ---- MIDI clock + transport (the app leads) ---- */
  private lastTransport = { playing: false, bpm: 120 };
  private clockRunning = false;
  private clockTimer: ReturnType<typeof setInterval> | null = null;
  private nextPulseAt = 0;

  public isClockRunning(): boolean {
    return this.clockRunning;
  }

  /**
   * Called by the playback engine whenever its state ticks. Idempotent: sends Start once when
   * playback begins, a clock pulse stream (24 per quarter note) at the current BPM while it
   * plays, and Stop when it ends.
   */
  public syncTransport(playing: boolean, bpm: number): void {
    const stopped = this.lastTransport.playing && !playing;
    this.lastTransport = { playing, bpm };
    if (stopped) this.allNotesOff();
    const wanted = this.routing.sendClock && this.hasOutput();
    if (!wanted || !playing) {
      if (this.clockRunning) this.stopClock();
      return;
    }
    if (!this.clockRunning) this.startClock();
  }

  /** Releases anything still sounding on both part channels (called when playback stops). */
  public allNotesOff(): void {
    const output = this.getActiveOutputDevice();
    if (!output) return;
    try { output.clear?.(); } catch { /* not supported in every browser */ }
    const at = this.nowMs() + MIDI_LOOKAHEAD_MS + this.midiDelayMs();
    [this.routing.chordsChannel, this.routing.melodyChannel].forEach(ch => {
      this.sendRaw([0xB0 | Math.max(0, Math.min(15, ch - 1)), 123, 0], at);
    });
  }

  private sendRaw(data: number[], timestamp?: number): void {
    const output = this.getActiveOutputDevice();
    if (!output) return;
    try {
      if (typeof timestamp === 'number') output.send(data, timestamp);
      else output.send(data);
    } catch {
      // Safe fallback
    }
  }

  private nowMs(): number {
    return typeof performance !== 'undefined' ? performance.now() : Date.now();
  }

  private startClock(): void {
    this.clockRunning = true;
    const at = this.baseTimeMs() + MIDI_LOOKAHEAD_MS + this.midiDelayMs();
    this.sendRaw([0xFA], at); // Start
    this.nextPulseAt = at;
    this.pumpClock();
    this.clockTimer = setInterval(() => this.pumpClock(), 20);
  }

  /** Schedules the next ~80 ms of clock pulses with exact timestamps, so timer jitter doesn't reach the device. */
  private pumpClock(): void {
    const horizon = this.nowMs() + 80;
    const pulseMs = 60000 / (Math.max(40, Math.min(300, this.lastTransport.bpm)) * 24);
    while (this.nextPulseAt < horizon) {
      this.sendRaw([0xF8], this.nextPulseAt);
      this.nextPulseAt += pulseMs;
    }
  }

  private stopClock(): void {
    if (this.clockTimer) clearInterval(this.clockTimer);
    this.clockTimer = null;
    this.clockRunning = false;
    this.sendRaw([0xFC], this.nowMs() + MIDI_LOOKAHEAD_MS + this.midiDelayMs()); // Stop
  }

  public subscribe(cb: MidiListener): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify(): void {
    this.listeners.forEach(cb => cb(this.status));
  }

  private getActiveOutputDevice(): any {
    if (!this.midiAccess || !this.selectedOutputId) return null;
    return this.midiAccess.outputs.get(this.selectedOutputId) || null;
  }

  public sendNoteOn(midiNote: number, velocity = 100, channel = 1): void {
    const output = this.getActiveOutputDevice();
    if (!output) return;
    const safeChannel = Math.max(0, Math.min(15, channel - 1));
    const status = 0x90 | safeChannel;
    try {
      output.send([status, Math.max(0, Math.min(127, midiNote)), Math.max(0, Math.min(127, velocity))]);
    } catch {
      // Safe fallback
    }
  }

  public sendNoteOff(midiNote: number, channel = 1): void {
    const output = this.getActiveOutputDevice();
    if (!output) return;
    const safeChannel = Math.max(0, Math.min(15, channel - 1));
    const status = 0x80 | safeChannel;
    try {
      output.send([status, Math.max(0, Math.min(127, midiNote)), 0]);
    } catch {
      // Safe fallback
    }
  }

  /** True when a MIDI output device is connected and picked, so routed notes will really leave the app. */
  public hasOutput(): boolean {
    return this.getActiveOutputDevice() !== null;
  }

  /**
   * Sends timed note events (offsets in seconds from now) to the chosen MIDI output on the channel
   * for that part. Returns whether the built-in sound should ALSO play: it always does when no
   * device is connected, so turning built-in audio off can never silence the app by accident.
   */
  public playEvents(part: 'chords' | 'melody', events: MidiNoteEvent[]): boolean {
    const internal = part === 'chords' ? this.routing.chordsInternalAudio : this.routing.melodyInternalAudio;
    const sendMidi = part === 'chords' ? this.routing.chordsSend !== false : this.routing.melodySend !== false;
    if (!this.hasOutput()) return true;
    // MIDI switched off for this part (e.g. recording the other part alone): the app's own sound still plays
    if (!sendMidi) return true;
    const channel = part === 'chords' ? this.routing.chordsChannel : this.routing.melodyChannel;
    const base = this.baseTimeMs() + MIDI_LOOKAHEAD_MS + this.midiDelayMs();
    const status = (kind: number) => kind | Math.max(0, Math.min(15, channel - 1));
    events.forEach(ev => {
      const midi = noteNameToMidi(ev.note);
      if (midi === null) return;
      const vel = Math.round(Math.max(1, Math.min(127, ev.vel * 127)));
      const on = base + ev.offsetSec * 1000;
      const off = on + Math.max(40, ev.durSec * 1000);
      this.sendRaw([status(0x90), midi, vel], on);
      this.sendRaw([status(0x80), midi, 0], off);
    });
    return internal;
  }

  /** Convenience for simultaneous notes (e.g. a melody note). */
  public playNotes(part: 'chords' | 'melody', noteNames: string[], durationSec: number, velocity01 = 0.8): boolean {
    return this.playEvents(part, noteNames.map(note => ({ note, offsetSec: 0, durSec: durationSec, vel: velocity01 })));
  }

  public sendTestNote(channel = 1): void {
    // Plays Middle C (60) for 400ms
    this.sendNoteOn(60, 100, channel);
    setTimeout(() => {
      this.sendNoteOff(60, channel);
    }, 400);
  }
}

const NOTE_PCS: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export function noteNameToMidi(name: string): number | null {
  const m = /^([A-Ga-g])([#b\u266f\u266d]?)(-?\d+)$/.exec((name || '').trim());
  if (!m) return null;
  const acc = m[2] === '#' || m[2] === '\u266f' ? 1 : m[2] === 'b' || m[2] === '\u266d' ? -1 : 0;
  return 12 * (parseInt(m[3], 10) + 1) + NOTE_PCS[m[1].toUpperCase()] + acc;
}

export const midiService = MidiService.getInstance();
