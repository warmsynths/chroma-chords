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
}

export type MidiListener = (status: MidiConnectionStatus) => void;

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
    this.saveSettings();
    this.notify();
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

  public sendTestNote(channel = 1): void {
    // Plays Middle C (60) for 400ms
    this.sendNoteOn(60, 100, channel);
    setTimeout(() => {
      this.sendNoteOff(60, channel);
    }, 400);
  }
}

export const midiService = MidiService.getInstance();
