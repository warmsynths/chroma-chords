declare module '*/human-engine.js' {
  export const HumanPanel: any;
  export type HumanState = any;
}

declare module 'human-engine' {
  export const HumanPanel: any;
  export type HumanState = any;
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
