declare module '*/human-engine.js' {
  export const HumanPanel: any;
  export type HumanState = any;
  export type SharedChord = any;
  export type SharedProgression = any;
  export const encodeProgression: (state: any) => string;
  export const decodeProgression: (encoded: string) => any;
}

declare module 'human-engine' {
  export const HumanPanel: any;
  export type HumanState = any;
  export type SharedChord = any;
  export type SharedProgression = any;
  export const encodeProgression: (state: any) => string;
  export const decodeProgression: (encoded: string) => any;
  export const CHORD_CORES: any[];
  export const CHORD_MODIFIERS: any[];
  export const getChordSuffix: (core: string, mod: string) => string;
}

declare module 'meyda' {
  const Meyda: {
    createMeydaAnalyzer(options: {
      audioContext: AudioContext;
      source: AudioNode;
      bufferSize: number;
      featureExtractors: string[];
      callback: (features: any) => void;
    }): { start(): void; stop(): void };
  };
  export default Meyda;
  export = Meyda;
}

declare global {
  interface HTMLElementTagNameMap {
    'human-panel': any;
    'onboarding-landing': any;
  }
}
