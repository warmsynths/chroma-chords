declare module 'human-engine' {
  export interface HumanState {
    chordSequence?: string;
    spread?: number;
    duration?: number;
    minVelocity?: number;
    maxVelocity?: number;
    humanVariance?: number;
    microTiming?: number;
    bpm?: number;
    arpMode?: string;
    arpRate?: string;
    arpRange?: number;
    strum?: number;
    swing?: number;
    humanVelocity?: number;
    velocityJitter?: number;
  }

  export interface SharedChord {
    symbol: string;
    root: string;
    quality: string;
    midiNotes: number[];
    inversion?: number;
  }

  export interface SharedProgression {
    chords: SharedChord[];
    bpm: number;
    timeSignature?: [number, number];
    humanState?: Partial<HumanState>;
  }

  export function encodeProgression(state: SharedProgression): string;
  export function decodeProgression(encodedUrlSafe: string): SharedProgression | null;

  export class HumanPanel extends HTMLElement {
    heading: string;
    chordSequence: string;
    hideInput: boolean;
    spread: number;
    duration: number;
    minVelocity: number;
    maxVelocity: number;
    humanVariance: number;
    microTiming: number;
    bpm: number;
    arpMode: string;
    arpRate: string;
    arpRange: number;
    debugExpanded: boolean;
    arpExpanded: boolean;
    showInfo: boolean;
    mode: string;
    humanSlider: number;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'human-panel': import('human-engine').HumanPanel;
  }
  interface HTMLElementEventMap {
    'human-change': CustomEvent<import('human-engine').HumanState>;
    'human-preview': CustomEvent<import('human-engine').HumanState>;
  }
}
