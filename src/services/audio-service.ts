import * as Tone from 'tone';

let limiter: Tone.Compressor | null = null;
let pianoSampler: Tone.Sampler | null = null;
let rhodesSampler: Tone.Sampler | null = null;
let guitarSampler: Tone.Sampler | null = null;
let jazzGuitarSampler: Tone.Sampler | null = null;
let jazzGuitarEq: Tone.EQ3 | null = null;
let jazzGuitarFilter: Tone.Filter | null = null;
let jazzGuitarReverb: Tone.Reverb | null = null;

let organ: Tone.PolySynth | null = null;
let organLeslieVibrato: Tone.Vibrato | null = null;
let organDrive: Tone.Distortion | null = null;
let organFilter: Tone.Filter | null = null;

let cinematicReverb: Tone.Reverb | null = null;
let padChorus: Tone.Chorus | null = null;
let padStrings: Tone.PolySynth | null = null;

let junoChorus: Tone.Chorus | null = null;
let junoPad: Tone.PolySynth | null = null;

let sh101Pad: Tone.PolySynth | null = null;
let sh101Vibrato: Tone.Vibrato | null = null;
let sh101Dist: Tone.Distortion | null = null;
let sh101Filter: Tone.Filter | null = null;
let sh101Chorus: Tone.Chorus | null = null;

let stab: Tone.PolySynth | null = null;
let stabDist: Tone.Distortion | null = null;
let stabReverb: Tone.Reverb | null = null;

let bell: Tone.PolySynth | null = null;
let bellEq: Tone.EQ3 | null = null;
let bellReverb: Tone.Reverb | null = null;

function getLimiter(): Tone.Compressor {
  if (!limiter) {
    limiter = new Tone.Compressor({
      threshold: -6,
      ratio: 20,
      attack: 0.002,
      release: 0.1,
      knee: 3,
    }).toDestination();
  }
  return limiter;
}

export interface FeelSettings {
  playStyle?: string;
  swing?: number;
  spread?: number;
  density?: number;
  humanise?: number;
  tone?: string;
  humanState?: any;
  barFeel?: Record<number, Partial<FeelSettings>>;
  advOverride?: Record<string, any>;
}

let activeToneName = 'Warm';
let masterInputGain: Tone.Gain | null = null;
let warmFilter: Tone.Filter | null = null;
let warmGain: Tone.Gain | null = null;
let glassyEq: Tone.EQ3 | null = null;
let glassyChorus: Tone.Chorus | null = null;
let glassyGain: Tone.Gain | null = null;
let dustyFilter: Tone.Filter | null = null;
let dustyVibrato: Tone.Vibrato | null = null;
let dustyDist: Tone.Distortion | null = null;
let dustyGain: Tone.Gain | null = null;

export function initToneRack(): Tone.Gain {
  if (!masterInputGain) {
    masterInputGain = new Tone.Gain(1);
    const dest = getLimiter();

    // 1. Warm Chain: Low-pass filter (3200Hz) -> warm gain
    warmFilter = new Tone.Filter({
      frequency: 3200,
      type: 'lowpass',
      rolloff: -12,
    });
    warmGain = new Tone.Gain(1);
    warmFilter.connect(warmGain);
    warmGain.connect(dest);
    masterInputGain.connect(warmFilter);

    // 2. Glassy Chain: High shelf EQ boost + subtle Chorus shimmer -> glassy gain
    glassyEq = new Tone.EQ3({
      high: 3.5,
      mid: 0,
      low: -0.5,
      highFrequency: 4500,
    });
    glassyChorus = new Tone.Chorus({
      frequency: 1.5,
      delayTime: 3.0,
      depth: 0.35,
      wet: 0.3,
    });
    try { glassyChorus.start(); } catch {}
    glassyGain = new Tone.Gain(0);
    glassyEq.connect(glassyChorus);
    glassyChorus.connect(glassyGain);
    glassyGain.connect(dest);
    masterInputGain.connect(glassyEq);

    // 3. Dusty Chain: Band-pass (1800Hz) + Tape wow/flutter Vibrato + subtle Saturation -> dusty gain
    dustyFilter = new Tone.Filter({
      frequency: 1800,
      type: 'bandpass',
      Q: 0.8,
    });
    dustyVibrato = new Tone.Vibrato({
      frequency: 0.5,
      depth: 0.1,
      wet: 0.4,
    });
    dustyDist = new Tone.Distortion({
      distortion: 0.1,
      wet: 0.15,
    });
    dustyGain = new Tone.Gain(0);
    dustyFilter.connect(dustyVibrato);
    dustyVibrato.connect(dustyDist);
    dustyDist.connect(dustyGain);
    dustyGain.connect(dest);
    masterInputGain.connect(dustyFilter);
  }
  return masterInputGain;
}

export function setMasterTone(tone: string): void {
  initToneRack();
  const clean = tone ? tone.toLowerCase().trim() : 'warm';
  activeToneName = clean === 'glassy' ? 'Glassy' : clean === 'dusty' ? 'Dusty' : 'Warm';

  const rampTime = 0.05;
  const now = Tone.now();

  try {
    if (warmGain && glassyGain && dustyGain) {
      if (activeToneName === 'Warm') {
        warmGain.gain.rampTo(1, rampTime, now);
        glassyGain.gain.rampTo(0, rampTime, now);
        dustyGain.gain.rampTo(0, rampTime, now);
      } else if (activeToneName === 'Glassy') {
        warmGain.gain.rampTo(0, rampTime, now);
        glassyGain.gain.rampTo(1, rampTime, now);
        dustyGain.gain.rampTo(0, rampTime, now);
      } else if (activeToneName === 'Dusty') {
        warmGain.gain.rampTo(0, rampTime, now);
        glassyGain.gain.rampTo(0, rampTime, now);
        dustyGain.gain.rampTo(1, rampTime, now);
      }
    }
  } catch (e) {
    console.warn('Failed to ramp master tone:', e);
  }
}

export function getMasterTone(): string {
  return activeToneName;
}

export function createOfflineToneRack(tone = 'Warm', dest?: Tone.ToneAudioNode): Tone.ToneAudioNode {
  const clean = tone ? tone.toLowerCase().trim() : 'warm';
  const target = dest ?? Tone.getDestination();

  if (clean === 'glassy') {
    const eq = new Tone.EQ3({
      high: 3.5,
      mid: 0,
      low: -0.5,
      highFrequency: 4500,
    });
    const chorus = new Tone.Chorus({
      frequency: 1.5,
      delayTime: 3.0,
      depth: 0.35,
      wet: 0.3,
    });
    try { chorus.start(0); } catch {}
    eq.connect(chorus);
    chorus.connect(target);
    return eq;
  }

  if (clean === 'dusty') {
    const filter = new Tone.Filter({
      frequency: 1800,
      type: 'bandpass',
      Q: 0.8,
    });
    const vibrato = new Tone.Vibrato({
      frequency: 0.5,
      depth: 0.1,
      wet: 0.4,
    });
    const dist = new Tone.Distortion({
      distortion: 0.1,
      wet: 0.15,
    });
    filter.connect(vibrato);
    vibrato.connect(dist);
    dist.connect(target);
    return filter;
  }

  // Default 'Warm':
  const warmFilter = new Tone.Filter({
    frequency: 3200,
    type: 'lowpass',
    rolloff: -12,
  });
  warmFilter.connect(target);
  return warmFilter;
}

const envBase = (typeof import.meta !== 'undefined' && (import.meta as any).env?.BASE_URL) || './';
const cleanBase = envBase.endsWith('/') ? envBase : `${envBase}/`;

export const PIANO_SAMPLE_URLS: Record<string, string> = {
  "A1": "A1.mp3",
  "C2": "C2.mp3",
  "F#2": "Fs2.mp3",
  "C3": "C3.mp3",
  "F#3": "Fs3.mp3",
  "C4": "C4.mp3",
  "F#4": "Fs4.mp3",
  "C5": "C5.mp3",
  "F#5": "Fs5.mp3",
  "C6": "C6.mp3",
  "F#6": "Fs6.mp3",
  "C7": "C7.mp3"
};

export const PIANO_SAMPLE_BASE_URL = `${cleanBase}audio/samples/grand-piano/`;

export const RHODES_SAMPLE_URLS: Record<string, string> = {
  "F1": "A_029__F1_5.m4a",
  "B1": "A_035__B1_5.m4a",
  "E2": "A_040__E2_5.m4a",
  "A2": "A_045__A2_5.m4a",
  "D3": "A_050__D3_5.m4a",
  "G3": "A_055__G3_5.m4a",
  "B3": "A_059__B3_5.m4a",
  "D4": "A_062__D4_5.m4a",
  "F4": "A_065__F4_5.m4a",
  "B4": "A_071__B4_5.m4a",
  "E5": "A_076__E5_5.m4a",
  "A5": "A_081__A5_5.m4a",
  "D6": "A_086__D6_5.m4a",
  "G6": "A_091__G6_5.m4a"
};

export const RHODES_SAMPLE_BASE_URL = `${cleanBase}audio/samples/stage-rhodes/`;

export const GUITAR_SAMPLE_URLS: Record<string, string> = {
  "B1": "B1.mp3",
  "E2": "E2.mp3",
  "A2": "A2.mp3",
  "D3": "D3.mp3",
  "G3": "G3.mp3",
  "B3": "B3.mp3",
  "E4": "E4.mp3",
  "A4": "A4.mp3",
  "E5": "E5.mp3",
  "A5": "A5.mp3"
};

export const GUITAR_SAMPLE_BASE_URL = `${cleanBase}audio/samples/nylon-guitar/`;

export const JAZZ_GUITAR_SAMPLE_URLS: Record<string, string> = {
  "E2": "E2.mp3",
  "A2": "A2.mp3",
  "C3": "C3.mp3",
  "D#3": "Ds3.mp3",
  "F#3": "Fs3.mp3",
  "A3": "A3.mp3",
  "C4": "C4.mp3",
  "D#4": "Ds4.mp3",
  "F#4": "Fs4.mp3",
  "A4": "A4.mp3",
  "C5": "C5.mp3",
  "F#5": "Fs5.mp3",
  "A5": "A5.mp3"
};

export const JAZZ_GUITAR_SAMPLE_BASE_URL = `${cleanBase}audio/samples/jazz-guitar/`;

export type InstrumentId = 'piano' | 'rhodes' | 'guitar' | 'organ' | 'pad-strings' | 'juno-pad' | 'stab' | 'bell' | 'jazz-guitar' | 'sh101' | 'epiano';

export function getLoadedSamplerBuffers(instrument: InstrumentId = 'piano'): Record<string, AudioBuffer> | null {
  let s: Tone.Sampler | null = null;
  let urls: Record<string, string> = {};
  if (instrument === 'jazz-guitar') {
    s = jazzGuitarSampler;
    urls = JAZZ_GUITAR_SAMPLE_URLS;
  } else if (instrument === 'guitar') {
    s = guitarSampler;
    urls = GUITAR_SAMPLE_URLS;
  } else if (instrument === 'rhodes' || instrument === 'epiano') {
    s = rhodesSampler;
    urls = RHODES_SAMPLE_URLS;
  } else {
    s = pianoSampler;
    urls = PIANO_SAMPLE_URLS;
  }
  if (!s || !s.loaded) return null;
  const toneBuffers = (s as any)._buffers;
  if (!toneBuffers) return null;
  const result: Record<string, AudioBuffer> = {};
  for (const note of Object.keys(urls)) {
    try {
      const midi = Tone.Frequency(note).toMidi();
      const buf = toneBuffers.has(midi) ? toneBuffers.get(midi) : (toneBuffers.has(note) ? toneBuffers.get(note) : null);
      if (buf && typeof buf.get === 'function' && buf.get()) {
        result[note] = buf.get()!;
      }
    } catch {}
  }
  return Object.keys(result).length > 0 ? result : null;
}

export async function ensureSamplerLoaded(instrument: InstrumentId = 'piano'): Promise<Tone.Sampler | null> {
  const s = getSamplerVoice(instrument);
  if (s.loaded) return s;
  try {
    await Promise.race([
      Tone.loaded(),
      new Promise<void>((_, reject) => setTimeout(() => reject(new Error('Sample load timeout')), 3000))
    ]);
    return s;
  } catch (err) {
    console.warn(`ensureSamplerLoaded(${instrument}) timed out or failed:`, err);
    return null;
  }
}

function getPianoSampler(): Tone.Sampler {
  if (!pianoSampler) {
    pianoSampler = new Tone.Sampler({
      urls: PIANO_SAMPLE_URLS,
      baseUrl: PIANO_SAMPLE_BASE_URL,
      volume: -9,
      onload: () => console.log("Grand Piano sampler loaded successfully!"),
      onerror: (err) => console.warn("Failed to load Grand Piano sampler:", err),
    }).connect(initToneRack());
  }
  return pianoSampler;
}

function getRhodesSampler(): Tone.Sampler {
  if (!rhodesSampler) {
    rhodesSampler = new Tone.Sampler({
      urls: RHODES_SAMPLE_URLS,
      baseUrl: RHODES_SAMPLE_BASE_URL,
      volume: -10,
      onload: () => console.log("Stage Rhodes sampler loaded successfully!"),
      onerror: (err) => console.warn("Failed to load Stage Rhodes sampler:", err),
    }).connect(initToneRack());
  }
  return rhodesSampler;
}

function getGuitarSampler(): Tone.Sampler {
  if (!guitarSampler) {
    guitarSampler = new Tone.Sampler({
      urls: GUITAR_SAMPLE_URLS,
      baseUrl: GUITAR_SAMPLE_BASE_URL,
      volume: -8,
      onload: () => console.log("Nylon Guitar sampler loaded successfully!"),
      onerror: (err) => console.warn("Failed to load Nylon Guitar sampler:", err),
    }).connect(initToneRack());
  }
  return guitarSampler;
}

function getJazzGuitarSampler(): Tone.Sampler {
  if (!jazzGuitarSampler) {
    const l = initToneRack();
    jazzGuitarEq = new Tone.EQ3({
      low: 1.5,
      mid: 2.0,
      high: -3.5,
      lowFrequency: 480,
      highFrequency: 2800,
    });
    jazzGuitarFilter = new Tone.Filter({
      frequency: 2800,
      type: 'lowpass',
      rolloff: -12,
    });
    jazzGuitarReverb = new Tone.Reverb({
      decay: 1.8,
      preDelay: 0.02,
      wet: 0.18,
    });

    jazzGuitarSampler = new Tone.Sampler({
      urls: JAZZ_GUITAR_SAMPLE_URLS,
      baseUrl: JAZZ_GUITAR_SAMPLE_BASE_URL,
      volume: -8,
      onload: () => console.log("Jazz Archtop sampler loaded successfully!"),
      onerror: (err) => console.warn("Failed to load Jazz Archtop sampler:", err),
    });

    jazzGuitarSampler.connect(jazzGuitarEq);
    jazzGuitarEq.connect(jazzGuitarFilter);
    jazzGuitarFilter.connect(jazzGuitarReverb);
    jazzGuitarReverb.connect(l);
  }
  return jazzGuitarSampler;
}

function getSh101Voice(): Tone.PolySynth {
  if (!sh101Pad) {
    const l = initToneRack();
    sh101Vibrato = new Tone.Vibrato({
      frequency: 0.45,
      depth: 0.18,
      wet: 0.65,
    });

    sh101Dist = new Tone.Distortion({
      distortion: 0.12,
      wet: 0.18,
    });

    sh101Filter = new Tone.Filter({
      frequency: 3400,
      type: 'lowpass',
      rolloff: -12,
    });

    sh101Chorus = new Tone.Chorus({
      frequency: 0.25,
      delayTime: 4.2,
      depth: 0.6,
      wet: 0.35,
    });
    try { sh101Chorus.start(); } catch {}

    sh101Pad = new Tone.PolySynth(Tone.MonoSynth, {
      oscillator: { type: 'fatsawtooth', count: 2, spread: 14 },
      envelope: { attack: 0.03, decay: 0.6, sustain: 0.75, release: 1.4 },
      filterEnvelope: {
        attack: 0.04,
        decay: 0.8,
        sustain: 0.4,
        release: 1.2,
        baseFrequency: 450,
        octaves: 2.6,
        exponent: 2,
      },
      filter: {
        type: 'lowpass',
        rolloff: -24,
        Q: 2.8,
      },
      volume: -11,
    });

    sh101Pad.connect(sh101Vibrato);
    sh101Vibrato.connect(sh101Dist);
    sh101Dist.connect(sh101Filter);
    sh101Filter.connect(sh101Chorus);
    sh101Chorus.connect(l);
  }
  return sh101Pad;
}

function getSamplerVoice(instrument: InstrumentId): Tone.Sampler {
  if (instrument === 'jazz-guitar') return getJazzGuitarSampler();
  if (instrument === 'guitar') return getGuitarSampler();
  if (instrument === 'rhodes' || instrument === 'epiano') return getRhodesSampler();
  return getPianoSampler();
}

/** Legacy alias for backwards compatibility */
export function getSampler(): Tone.Sampler {
  return getPianoSampler();
}

export function preloadAllSamplers(): void {
  try {
    getPianoSampler();
    getRhodesSampler();
    getGuitarSampler();
    getJazzGuitarSampler();
  } catch (e) {
    console.warn("Preloading samplers failed:", e);
  }
}

function getVoice(instrument: InstrumentId): Tone.Sampler | Tone.PolySynth {
  const l = initToneRack();
  switch (instrument) {
    case 'organ':
      if (!organ) {
        organLeslieVibrato = new Tone.Vibrato({
          frequency: 5.8,
          depth: 0.12,
          wet: 0.55,
        });
        organDrive = new Tone.Distortion({
          distortion: 0.08,
          wet: 0.15,
        });
        organFilter = new Tone.Filter({
          frequency: 4500,
          type: 'lowpass',
          rolloff: -12,
        });
        organ = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'fatsine', count: 3, spread: 15 },
          envelope: { attack: 0.008, decay: 0.15, sustain: 0.9, release: 0.25 },
          volume: -12,
        });
        organ.connect(organLeslieVibrato);
        organLeslieVibrato.connect(organDrive);
        organDrive.connect(organFilter);
        organFilter.connect(l);
      }
      return organ;

    case 'pad-strings':
      if (!padStrings) {
        cinematicReverb = new Tone.Reverb({ decay: 5.5, preDelay: 0.03, wet: 0.45 });
        padChorus = new Tone.Chorus({ frequency: 0.45, delayTime: 4.0, depth: 0.5, wet: 0.4 });
        try { padChorus.start(); } catch {}
        padStrings = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'fatsawtooth', count: 3, spread: 22 },
          envelope: { attack: 0.65, decay: 0.8, sustain: 0.85, release: 2.5 },
          volume: -13,
        });
        padStrings.connect(padChorus);
        padChorus.connect(cinematicReverb);
        cinematicReverb.connect(l);
      }
      return padStrings;

    case 'juno-pad':
      if (!junoPad) {
        junoChorus = new Tone.Chorus({ frequency: 0.85, delayTime: 3.5, depth: 0.72, wet: 0.55 });
        try { junoChorus.start(); } catch {}
        junoPad = new Tone.PolySynth(Tone.MonoSynth, {
          oscillator: { type: 'fatsawtooth', count: 3, spread: 20 },
          envelope: { attack: 0.02, decay: 0.45, sustain: 0.65, release: 0.85 },
          filterEnvelope: {
            attack: 0.02,
            decay: 0.5,
            sustain: 0.35,
            release: 0.8,
            baseFrequency: 750,
            octaves: 3.2,
            exponent: 2,
          },
          filter: {
            type: 'lowpass',
            rolloff: -24,
            Q: 2.5,
          },
          volume: -12,
        });
        junoPad.connect(junoChorus);
        junoChorus.connect(l);
      }
      return junoPad;

    case 'stab':
      if (!stab) {
        stabDist = new Tone.Distortion({ distortion: 0.1, wet: 0.12 });
        stabReverb = new Tone.Reverb({ decay: 1.0, wet: 0.22 });
        stab = new Tone.PolySynth(Tone.MonoSynth, {
          oscillator: { type: 'fatsawtooth', count: 2, spread: 12 },
          envelope: { attack: 0.003, decay: 0.16, sustain: 0.08, release: 0.18 },
          filterEnvelope: {
            attack: 0.003,
            decay: 0.14,
            sustain: 0.05,
            release: 0.16,
            baseFrequency: 420,
            octaves: 3.5,
            exponent: 2,
          },
          filter: {
            type: 'lowpass',
            rolloff: -24,
            Q: 2.0,
          },
          volume: -10,
        });
        stab.connect(stabDist);
        stabDist.connect(stabReverb);
        stabReverb.connect(l);
      }
      return stab;

    case 'bell':
      if (!bell) {
        bellEq = new Tone.EQ3({ high: 3.5, mid: -0.5, low: -2.0, highFrequency: 4800 });
        bellReverb = new Tone.Reverb({ decay: 3.2, wet: 0.32 });
        bell = new Tone.PolySynth(Tone.FMSynth, {
          harmonicity: 3.5,
          modulationIndex: 12,
          envelope: { attack: 0.002, decay: 1.2, sustain: 0.04, release: 1.4 },
          modulationEnvelope: { attack: 0.002, decay: 0.6, sustain: 0.01, release: 0.5 },
          volume: -12,
        });
        bell.connect(bellEq);
        bellEq.connect(bellReverb);
        bellReverb.connect(l);
      }
      return bell;

    case 'guitar':
      return getGuitarSampler();

    case 'jazz-guitar':
      return getJazzGuitarSampler();

    case 'sh101':
      return getSh101Voice();

    case 'rhodes':
    case 'epiano':
      return getRhodesSampler();

    case 'piano':
    default:
      return getPianoSampler();
  }
}

// The instrument picker's ten user-facing options — each maps to
// one of the pristine hybrid voices above. Colors match option pills.
export const USER_INSTRUMENTS: { name: string; instrument: InstrumentId; color: string }[] = [
  {
    "name": "Grand Piano",
    "instrument": "piano",
    "color": "#9CC0EC"
  },
  {
    "name": "Stage Rhodes",
    "instrument": "rhodes",
    "color": "#F2A79B"
  },
  {
    "name": "Nylon Guitar",
    "instrument": "guitar",
    "color": "#F6D98B"
  },
  {
    "name": "Jazz Archtop",
    "instrument": "jazz-guitar",
    "color": "#D89047"
  },
  {
    "name": "Drawbar Organ",
    "instrument": "organ",
    "color": "#E8609A"
  },
  {
    "name": "Cinematic Pad",
    "instrument": "pad-strings",
    "color": "#C9A9E0"
  },
  {
    "name": "Celestial Bell",
    "instrument": "bell",
    "color": "#B8CC9E"
  },
  {
    "name": "Juno Synth",
    "instrument": "juno-pad",
    "color": "#7B61FF"
  },
  {
    "name": "Vintage SH-101",
    "instrument": "sh101",
    "color": "#4EA598"
  },
  {
    "name": "House Stab",
    "instrument": "stab",
    "color": "#FF8C42"
  }
];

export const LEGACY_INSTRUMENT_NAME_MAP: Record<string, string> = {
  'piano': 'Grand Piano',
  'grand piano': 'Grand Piano',
  'rhodes': 'Stage Rhodes',
  'stage rhodes': 'Stage Rhodes',
  'epiano': 'Stage Rhodes',
  'nylon guitar': 'Nylon Guitar',
  'guitar': 'Nylon Guitar',
  'jazz archtop': 'Jazz Archtop',
  'jazz guitar': 'Jazz Archtop',
  'archtop': 'Jazz Archtop',
  'hollowbody': 'Jazz Archtop',
  'jazz-guitar': 'Jazz Archtop',
  'vintage sh-101': 'Vintage SH-101',
  'sh-101': 'Vintage SH-101',
  'sh101': 'Vintage SH-101',
  'boc synth': 'Vintage SH-101',
  'warm pad': 'Cinematic Pad',
  'cinematic pad': 'Cinematic Pad',
  'pad-strings': 'Cinematic Pad',
  'synth bell': 'Celestial Bell',
  'celestial bell': 'Celestial Bell',
  'bell': 'Celestial Bell',
  'drawbar organ': 'Drawbar Organ',
  'organ': 'Drawbar Organ',
  'analog synth': 'Juno Synth',
  'juno synth': 'Juno Synth',
  'juno-pad': 'Juno Synth',
  'synth stab': 'House Stab',
  'house stab': 'House Stab',
  'stab': 'House Stab'
};

export function normalizeInstrumentName(name?: string | null): string {
  if (!name) return 'Grand Piano';
  const clean = name.trim().toLowerCase();
  if (LEGACY_INSTRUMENT_NAME_MAP[clean]) {
    return LEGACY_INSTRUMENT_NAME_MAP[clean];
  }
  const match = USER_INSTRUMENTS.find(i => i.name.toLowerCase() === clean);
  return match ? match.name : 'Grand Piano';
}

// The play-style picker's five options (design: "Play style" chip) — each is a humanState
// override applied on top of the genre's normal humanize profile. Colors match USER_INSTRUMENTS'
// pattern (arbitrary per-option accent, not tied to genre/mood).
export const USER_PLAY_STYLES: { name: string; color: string; patch: Record<string, unknown> }[] = [
  {
    "name": "Block chords",
    "color": "#F2A79B",
    "patch": {
      "arpMode": "off",
      "spread": 0.3
    }
  },
  {
    "name": "Arpeggio",
    "color": "#9CC0EC",
    "patch": {
      "arpMode": "up",
      "arpRate": "1/8",
      "arpRange": 1
    }
  },
  {
    "name": "Strum",
    "color": "#F6D98B",
    "patch": {
      "arpMode": "up",
      "arpRate": "1/32",
      "arpRange": 1,
      "isStrum": true
    }
  },
  {
    "name": "Broken (swing)",
    "color": "#C9A9E0",
    "patch": {
      "arpMode": "up",
      "arpRate": "1/8T",
      "arpRange": 1
    }
  },
  {
    "name": "Half-time",
    "color": "#B8CC9E",
    "patch": {
      "arpMode": "off",
      "spread": 0.1,
      "durationMultiplier": 1.8
    }
  },
  {
    "name": "Descending Arp",
    "color": "#7B61FF",
    "patch": {
      "arpMode": "down",
      "arpRate": "1/8",
      "arpRange": 1
    }
  },
  {
    "name": "Off-beat / Ska",
    "color": "#FF8C42",
    "patch": {
      "arpMode": "off",
      "spread": 0.1,
      "microTiming": 0.8
    }
  },
  {
    "name": "Fast Triplet",
    "color": "#7CD9B6",
    "patch": {
      "arpMode": "up",
      "arpRate": "1/16T",
      "arpRange": 1
    }
  }
];

export const GENRE_INSTRUMENT: Record<string, InstrumentId> = {
  "Pop": "piano",
  "Rock": "piano",
  "Indie/Folk": "guitar",
  "Lo-fi/Chill": "rhodes",
  "Jazz-ish": "rhodes",
  "R&B/Soul": "rhodes",
  "Gospel": "organ",
  "Cinematic": "pad-strings",
  "Synthwave": "juno-pad",
  "House/Dance": "stab",
  "Blues": "rhodes",
  "Funk/Disco": "rhodes",
  "Country/Bluegrass": "guitar",
  "Reggae/Dub": "organ",
  "Metal": "stab",
  "Punk": "stab",
  "Ambient/Drone": "pad-strings",
  "Trap/Hip-Hop": "bell",
  "Bossa Nova/Latin": "guitar",
  "Classical/Orchestral": "piano",
  "EDM/Trance": "juno-pad",
  "Afrobeats": "guitar",
  "Shoegaze": "pad-strings"
};

// Per-genre humanize profile: velocity range, timing looseness, note duration, and
// (for Lo-fi/Jazz) a gentle arpeggiation instead of a flat hit.
export const GENRE_HUMANIZE: Record<string, any> = {
  "Pop": {
    "minVelocity": 90,
    "maxVelocity": 110,
    "spread": 0.5,
    "microTiming": 0.3,
    "humanVariance": 0.3,
    "duration": 1
  },
  "Rock": {
    "minVelocity": 105,
    "maxVelocity": 127,
    "spread": 0.2,
    "microTiming": 0.1,
    "humanVariance": 0.15,
    "duration": 0.9
  },
  "Indie/Folk": {
    "minVelocity": 80,
    "maxVelocity": 105,
    "spread": 1,
    "microTiming": 0.5,
    "humanVariance": 0.4,
    "duration": 1.1
  },
  "Lo-fi/Chill": {
    "minVelocity": 55,
    "maxVelocity": 85,
    "spread": 2.5,
    "microTiming": 1.2,
    "humanVariance": 0.8,
    "duration": 1.4,
    "arpMode": "up",
    "arpRate": "1/8",
    "arpRange": 1
  },
  "Jazz-ish": {
    "minVelocity": 70,
    "maxVelocity": 100,
    "spread": 1.8,
    "microTiming": 1,
    "humanVariance": 0.6,
    "duration": 1.2,
    "arpMode": "up",
    "arpRate": "1/8T",
    "arpRange": 1
  },
  "R&B/Soul": {
    "minVelocity": 75,
    "maxVelocity": 105,
    "spread": 1.2,
    "microTiming": 0.6,
    "humanVariance": 0.5,
    "duration": 1.3
  },
  "Gospel": {
    "minVelocity": 95,
    "maxVelocity": 120,
    "spread": 0.4,
    "microTiming": 0.2,
    "humanVariance": 0.2,
    "duration": 1.5
  },
  "Cinematic": {
    "minVelocity": 60,
    "maxVelocity": 90,
    "spread": 0,
    "microTiming": 0,
    "humanVariance": 0.1,
    "duration": 2.2
  },
  "Synthwave": {
    "minVelocity": 70,
    "maxVelocity": 95,
    "spread": 0,
    "microTiming": 0,
    "humanVariance": 0.1,
    "duration": 1.8
  },
  "House/Dance": {
    "minVelocity": 100,
    "maxVelocity": 127,
    "spread": 0,
    "microTiming": 0.1,
    "humanVariance": 0.15,
    "duration": 0.5
  },
  "Blues": {
    "minVelocity": 80,
    "maxVelocity": 110,
    "spread": 1.4,
    "microTiming": 0.7,
    "humanVariance": 0.5,
    "duration": 1.2
  },
  "Funk/Disco": {
    "minVelocity": 95,
    "maxVelocity": 125,
    "spread": 0.3,
    "microTiming": 0.2,
    "humanVariance": 0.2,
    "duration": 0.8
  },
  "Country/Bluegrass": {
    "minVelocity": 85,
    "maxVelocity": 115,
    "spread": 1,
    "microTiming": 0.4,
    "humanVariance": 0.3,
    "duration": 1
  },
  "Reggae/Dub": {
    "minVelocity": 70,
    "maxVelocity": 100,
    "spread": 2,
    "microTiming": 1,
    "humanVariance": 0.6,
    "duration": 1.3
  },
  "Metal": {
    "minVelocity": 110,
    "maxVelocity": 127,
    "spread": 0.1,
    "microTiming": 0.05,
    "humanVariance": 0.1,
    "duration": 0.8
  },
  "Punk": {
    "minVelocity": 115,
    "maxVelocity": 127,
    "spread": 0.1,
    "microTiming": 0.1,
    "humanVariance": 0.1,
    "duration": 0.7
  },
  "Ambient/Drone": {
    "minVelocity": 45,
    "maxVelocity": 75,
    "spread": 0,
    "microTiming": 0,
    "humanVariance": 0.05,
    "duration": 3
  },
  "Trap/Hip-Hop": {
    "minVelocity": 90,
    "maxVelocity": 120,
    "spread": 0.2,
    "microTiming": 0.2,
    "humanVariance": 0.2,
    "duration": 1
  },
  "Bossa Nova/Latin": {
    "minVelocity": 75,
    "maxVelocity": 105,
    "spread": 1.5,
    "microTiming": 0.8,
    "humanVariance": 0.5,
    "duration": 1.1,
    "arpMode": "up",
    "arpRate": "1/8T",
    "arpRange": 1
  },
  "Classical/Orchestral": {
    "minVelocity": 50,
    "maxVelocity": 115,
    "spread": 0.5,
    "microTiming": 0.3,
    "humanVariance": 0.3,
    "duration": 2
  },
  "EDM/Trance": {
    "minVelocity": 95,
    "maxVelocity": 127,
    "spread": 0.1,
    "microTiming": 0.05,
    "humanVariance": 0.1,
    "duration": 1.2
  },
  "Afrobeats": {
    "minVelocity": 85,
    "maxVelocity": 115,
    "spread": 1,
    "microTiming": 0.5,
    "humanVariance": 0.4,
    "duration": 1.1
  },
  "Shoegaze": {
    "minVelocity": 65,
    "maxVelocity": 95,
    "spread": 0.8,
    "microTiming": 0.4,
    "humanVariance": 0.3,
    "duration": 2.5
  }
};

// Maps each internal auto-selected instrument voice to the closest of the 5 user-facing
// picker names, for display purposes — several genres (Gospel/organ, Synthwave/juno-pad,
// House-Dance/stab) use a voice that isn't one of the 5 selectable options at all, so those
// fall back to the nearest sonic category rather than a literal match.
export const INSTRUMENT_ID_TO_USER_NAME: Record<InstrumentId, string> = {
  piano: 'Grand Piano',
  rhodes: 'Stage Rhodes',
  epiano: 'Stage Rhodes',
  guitar: 'Nylon Guitar',
  'jazz-guitar': 'Jazz Archtop',
  'pad-strings': 'Cinematic Pad',
  bell: 'Celestial Bell',
  organ: 'Drawbar Organ',
  'juno-pad': 'Juno Synth',
  sh101: 'Vintage SH-101',
  stab: 'House Stab',
};

/** The instrument name (one of USER_INSTRUMENTS) this genre plays with by default. */
export function genreDefaultInstrumentName(genre: string): string {
  const id = GENRE_INSTRUMENT[genre] ?? 'piano';
  return INSTRUMENT_ID_TO_USER_NAME[id] ?? 'Grand Piano';
}

/** The play style name (one of USER_PLAY_STYLES) this genre plays with by default. */
export function genreDefaultPlayStyleName(genre: string): string {
  return (GENRE_HUMANIZE[genre]?.arpMode ?? 'off') === 'off' ? 'Block chords' : 'Arpeggio';
}

// Note names for MIDI-to-note conversion
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Converts a MIDI note number to a Tone.js note name with octave.
 * e.g. 60 → "C4", 69 → "A4"
 */
export function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${NOTE_NAMES[noteIndex]}${octave}`;
}

/**
 * Resolves once pending sample downloads settle, same as Tone.loaded() — but with a timeout.
 * A stalled connection (drops mid-download rather than failing outright, common on flaky
 * mobile networks) never lets Tone.loaded() settle, which would otherwise block every future
 * playNote/playChord call forever — the first chord plays, then silence for good. Capping the
 * wait means a stuck download only delays that one attempt instead of wedging playback
 * permanently.
 */
function waitForSamplesReady(): Promise<void> {
  return Promise.race([
    Tone.loaded(),
    new Promise<void>((resolve) => setTimeout(resolve, 80)),
  ]);
}

/**
 * Plays a single note using the sampled Rhodes electric piano.
 * Starts Tone.js audio context on user gesture if not already running.
 *
 * @param noteName Note name with octave, e.g. "C4" or "D#5".
 * @param duration Duration in seconds.
 */
export function playNote(noteName: string, duration = 0.35): void {
  try {
    Promise.all([Tone.start(), waitForSamplesReady()]).then(() => {
      getSampler().triggerAttackRelease(noteName, duration);
    }).catch((e) => {
      console.warn("Audio playback gesture failed:", e);
    });
  } catch (e) {
    console.warn("Audio playback failed:", e);
  }
}

/**
 * Converts an arp rate string + bpm to a note interval in seconds.
 */
export function arpRateToSeconds(arpRate: string, bpm: number): number {
  const beatsPerSecond = bpm / 60;
  switch (arpRate) {
    case '1/4':  return 1 / beatsPerSecond;           // 1 beat
    case '1/8':  return 0.5 / beatsPerSecond;         // half beat
    case '1/8T': return (0.5 / beatsPerSecond) * (2 / 3); // triplet eighth
    case '1/16': return 0.25 / beatsPerSecond;        // quarter beat
    case '1/32': return 0.125 / beatsPerSecond;       // eighth beat — fast cascade, strum feel
    default:     return 0.25 / beatsPerSecond;
  }
}

/**
 * Expands a set of note names across multiple octaves for arp range.
 * Returns a flat array of note names spanning `arpRange` octaves.
 */
export function expandNotesAcrossOctaves(noteNames: string[], arpRange: number): string[] {
  const expanded: string[] = [];
  for (let oct = 0; oct < arpRange; oct++) {
    for (const note of noteNames) {
      // Parse note name and octave, e.g. "C4" -> name="C", octave=4
      const match = note.match(/^([A-G]#?)(-?\d+)$/);
      if (match) {
        const name = match[1];
        const octave = parseInt(match[2], 10) + oct;
        expanded.push(`${name}${octave}`);
      } else {
        expanded.push(note);
      }
    }
  }
  return expanded;
}

/**
 * Orders notes according to arpeggiator mode.
 */
export function orderNotesForArp(notes: string[], arpMode: string): string[] {
  const sorted = [...notes]; // assume already sorted ascending
  switch (arpMode) {
    case 'up':      return sorted;
    case 'down':    return [...sorted].reverse();
    case 'up-down': return [...sorted, ...[...sorted].reverse().slice(1, -1)];
    case 'random':  return sorted.sort(() => Math.random() - 0.5);
    default:        return sorted;
  }
}

/**
 * Maps an LLM instrument preset ID (e.g. "rhodes", "epiano", "juno-pad") or display name
 * to the closest matching user-facing instrument name in USER_INSTRUMENTS.
 */
const PRESET_ID_TO_USER_NAME: Record<string, string> = {
  'piano': 'Grand Piano',
  'rhodes': 'Stage Rhodes',
  'epiano': 'Stage Rhodes',
  'guitar': 'Nylon Guitar',
  'pad-strings': 'Cinematic Pad',
  'juno-pad': 'Juno Synth',
  'bell': 'Celestial Bell',
  'organ': 'Drawbar Organ',
  'stab': 'House Stab',
};

export function presetIdToUserInstrumentName(presetId?: string): string | undefined {
  if (!presetId) return undefined;
  const lower = presetId.toLowerCase().trim();
  if (PRESET_ID_TO_USER_NAME[lower]) return PRESET_ID_TO_USER_NAME[lower];
  const matched = USER_INSTRUMENTS.find(i => i.name.toLowerCase() === lower || i.instrument.toLowerCase() === lower);
  return matched?.name;
}

/**
 * Maps an LLM rhythm style string (e.g. "slow_arpeggio", "syncopated_16ths", "trip_hop_groove")
 * to the closest matching play style name in USER_PLAY_STYLES.
 */
export function matchRhythmStyleToPlayStyleName(rhythmStyle?: string): string | undefined {
  if (!rhythmStyle) return undefined;
  const style = rhythmStyle.toLowerCase().trim();
  if (style.includes('strum')) return 'Strum';
  if (style.includes('descend')) return 'Descending Arp';
  if (style.includes('half')) return 'Half-time';
  if (style.includes('swing') || style.includes('broken')) return 'Broken (swing)';
  if (style.includes('offbeat') || style.includes('ska') || style.includes('syncopat') || style.includes('groove')) return 'Off-beat / Ska';
  if (style.includes('triplet') || style.includes('fast')) return 'Fast Triplet';
  if (style.includes('arp') || style.includes('cascade')) return 'Arpeggio';
  if (style.includes('block') || style.includes('pad') || style.includes('sustained')) return 'Block chords';

  const matched = USER_PLAY_STYLES.find(p => p.name.toLowerCase() === style);
  return matched?.name ?? 'Block chords';
}

/**
 * Plays a chord of notes simultaneously using the sampled Rhodes electric piano or synth voice.
 * Starts Tone.js audio context on user gesture if not already running.
 * When humanState.arpMode is set (not 'off'), plays notes in an arpeggio pattern.
 * Safely applies customConfig to the Tone.js instrument if provided.
 * 
 * @param noteNames Array of note names with octaves, e.g. ["C4", "E4", "G4"].
 * @param duration Duration in seconds.
 * @param humanState Optional HumanState including bpm, arpMode, arpRate, arpRange.
 * @param instrument Selected InstrumentId.
 * @param customConfig Optional valid Tone.js parameter overrides.
 */
export function playChord(
  noteNames: string[],
  duration = 0.7,
  humanState?: any,
  instrument: InstrumentId = 'piano',
  customConfig?: Record<string, unknown>
): void {
  try {
    Promise.all([Tone.start(), waitForSamplesReady()]).then(() => {
      const voice = getVoice(instrument);

      // Safely apply custom Tone.js configuration if provided
      if (customConfig && typeof customConfig === 'object' && Object.keys(customConfig).length > 0) {
        try {
          if (typeof (voice as any).set === 'function') {
            (voice as any).set(customConfig);
          }
        } catch (e) {
          console.warn("Failed to apply customConfig to Tone.js instrument:", e);
        }
      }

      const count = noteNames.length;
      const densityScaling = count <= 1 ? 1 : Math.max(0.4, 1 / Math.sqrt(count));
      const now = Tone.now();
      const isGuitar = instrument === 'guitar' || instrument === 'jazz-guitar';
      const isJazzGuitar = instrument === 'jazz-guitar';

      // --- Arpeggiator / Strum mode ---
      if (humanState && humanState.arpMode && humanState.arpMode !== 'off') {
        const bpm = humanState.bpm ?? 80;
        const arpRate = humanState.arpRate ?? '1/16';
        const arpRange = humanState.arpRange ?? 1;
        const arpMode = humanState.arpMode;

        const interval = arpRateToSeconds(arpRate, bpm);
        const expanded = expandNotesAcrossOctaves(noteNames, arpRange);
        const ordered = orderNotesForArp(expanded, arpMode);

        // Velocity from humanState if available
        const getVel = () => {
          if (humanState.minVelocity !== undefined && humanState.maxVelocity !== undefined) {
            const rawVel = (humanState.minVelocity + Math.random() * (humanState.maxVelocity - humanState.minVelocity)) / 127;
            return rawVel * densityScaling;
          }
          return densityScaling;
        };

        // Check if this is a strum feel (rapid roll with sustained chord ring-out)
        // versus a running rhythmic arpeggio (step-gated pulses)
        const isStrum = (humanState.isStrum === true ||
          humanState.playStyle === 'Strum' ||
          arpRate === '1/32') && (arpRate === '1/32' || humanState.isStrum === true);

        // Note duration:
        // - For strums: notes sustain for the full chord duration so the rolled chord rings out naturally.
        // - For running arps: notes gate to the step interval (interval * gateRatio) for crisp, distinct pulses.
        const gateRatio = typeof humanState.arpGate === 'number'
          ? Math.max(0.1, Math.min(2.0, humanState.arpGate))
          : 0.85;
        const varianceFactor = 1.0 + (Math.random() - 0.5) * 0.1 * (humanState.humanVariance ?? 0);

        const chordDur = (typeof humanState.duration === 'number' && humanState.duration > 0)
          ? humanState.duration
          : duration;

        // Natural strum roll interval: 20ms - 45ms per note depending on spread,
        // or standard rhythmic interval for running arpeggios
        const strumStep = typeof humanState.spread === 'number' && humanState.spread > 0
          ? Math.min(0.045, Math.max(0.02, humanState.spread * 0.04))
          : 0.028;
        const stepInterval = isStrum ? strumStep : interval;

        // Note sustain length:
        // Strum notes ring out across the full chord (at least 1.4s on audition, or full chord duration)
        const strumDur = Math.max(1.4, chordDur) * (1.0 + (Math.random() - 0.5) * 0.1 * (humanState.humanVariance ?? 0));
        const arpDur = Math.max(0.04, interval * gateRatio * varianceFactor);

        ordered.forEach((noteName, index) => {
          // Micro-timing jitter: subtle on strum to preserve clean roll direction, normal on arp
          const jitter = humanState.microTiming
            ? (Math.random() - 0.5) * humanState.microTiming * (isStrum ? 0.005 : 0.02)
            : 0;

          const noteDur = isStrum ? strumDur : arpDur;
          let vel = getVel();
          if (isStrum && isGuitar && index === 0) {
            vel = Math.min(1, vel * (isJazzGuitar ? 1.05 : 1.1));
          }

          voice.triggerAttackRelease(noteName, noteDur, now + index * stepInterval + jitter, vel);
        });

        return;
      }

      // --- Standard humanized chord playback ---
      // If guitar, sort notes lowest to highest for natural down-strum roll
      const sortedNotes = isGuitar
        ? [...noteNames].sort((a, b) => {
            try { return Tone.Frequency(a).toMidi() - Tone.Frequency(b).toMidi(); } catch { return 0; }
          })
        : noteNames;

      sortedNotes.forEach((noteName, index) => {
        let stagger = 0;
        let vel = densityScaling;
        let dur = duration;

        if (humanState) {
          const { minVelocity, maxVelocity, spread, microTiming, humanVariance, duration: hDuration } = humanState;

          // Random velocity between minVelocity and maxVelocity (0 to 127) scaled to 0-1 range, or explicit velocity
          const rawVel = typeof humanState.velocity === 'number'
            ? Math.min(1, Math.max(0.1, humanState.velocity / 127))
            : (minVelocity + Math.random() * (maxVelocity - minVelocity)) / 127;
          vel = rawVel * densityScaling;

          // If guitar, add natural roll delay (18ms for jazz, 24ms for nylon)
          const guitarStrumDelay = isGuitar ? index * (isJazzGuitar ? 0.018 : 0.024) : 0;
          const spreadOffset = index * (spread ?? 0.3) * 0.1;
          const microTimingOffset = (Math.random() - 0.5) * (microTiming ?? 0) * 0.05;
          const varianceOffset = (Math.random() - 0.5) * (humanVariance ?? 0) * 0.03;

          stagger = Math.max(0, guitarStrumDelay + spreadOffset + microTimingOffset + varianceOffset);
          dur = (hDuration || duration) * (1.0 + (Math.random() - 0.5) * 0.2 * (humanVariance ?? 0));
        } else if (isGuitar) {
          stagger = index * (isJazzGuitar ? 0.018 : 0.024);
        }

        if (isGuitar && index === 0) {
          vel = Math.min(1, vel * (isJazzGuitar ? 1.05 : 1.1));
        }

        voice.triggerAttackRelease(noteName, dur, now + stagger, vel);
      });
    }).catch((e) => {
      console.warn("Audio playback gesture failed:", e);
    });
  } catch (e) {
    console.warn("Audio playback failed:", e);
  }
}

export function applyDensityToNotes(noteNames: string[], density: number): string[] {
  if (!Array.isArray(noteNames) || noteNames.length === 0) return [];
  if (noteNames.length <= 1) return noteNames;

  // Sparse (<= 25): Root + 5th / 3rd essential interval
  if (density <= 25) {
    if (noteNames.length <= 2) return noteNames;
    return [noteNames[0], noteNames[noteNames.length - 1]];
  }

  // Simple (26 - 55): Standard 3-4 note voicing
  if (density <= 55) {
    if (noteNames.length <= 4) return noteNames;
    return noteNames.slice(0, 4);
  }

  // Full (56 - 80): Full voicing with extensions and bass root
  if (density <= 80) {
    return noteNames;
  }

  // Busy (> 80): Multi-octave spread with upper doubling
  const doubled = [...noteNames];
  const topNote = noteNames[noteNames.length - 1];
  const match = topNote.match(/^([A-G]#?)(-?\d+)$/);
  if (match) {
    const oct = parseInt(match[2], 10);
    doubled.push(`${match[1]}${oct + 1}`);
  }
  return doubled;
}

/**
 * Plays a chord using the voice and humanize feel mapped to the given genre
 * (see GENRE_INSTRUMENT/GENRE_HUMANIZE) instead of always using the flat Rhodes hit.
 */
export function playChordForGenre(
  noteNames: string[],
  genre: string,
  opts?: {
    bpm?: number;
    duration?: number;
    instrument?: string;
    playStyle?: string;
    customConfig?: Record<string, unknown>;
    velocity?: number;
    feelSettings?: FeelSettings;
  }
): void {
  const safeGenre = (genre === 'Unknown' || !genre) ? 'Pop' : genre;
  // User overrides (from the Instrument/Play style pickers) win over the genre's defaults —
  // when unset, playback falls back to the existing per-genre auto-selection untouched.
  const normalized = opts?.instrument ? normalizeInstrumentName(opts.instrument) : undefined;
  const userInstrument = normalized ? USER_INSTRUMENTS.find(i => i.name.toLowerCase() === normalized.toLowerCase()) : undefined;
  const effectivePlayStyle = opts?.playStyle || opts?.feelSettings?.playStyle;
  const userPlayStyle = effectivePlayStyle ? USER_PLAY_STYLES.find(p => p.name === effectivePlayStyle) : undefined;

  const instrument = userInstrument?.instrument ?? GENRE_INSTRUMENT[safeGenre] ?? 'piano';
  const profile = GENRE_HUMANIZE[safeGenre] || {};
  const stylePatch = (userPlayStyle?.patch ?? {}) as { durationMultiplier?: number; [k: string]: unknown };

  // Apply tone if provided
  if (opts?.feelSettings?.tone) {
    setMasterTone(opts.feelSettings.tone);
  }

  // Calculate feel overrides
  const feelPatch: Record<string, unknown> = {};
  if (opts?.feelSettings) {
    const { spread, swing, humanise, humanState: customHuman, advOverride } = opts.feelSettings;
    if (customHuman) {
      Object.assign(feelPatch, customHuman);
    } else {
      if (typeof spread === 'number') {
        feelPatch.spread = parseFloat((spread / 100).toFixed(2));
      }
      if (typeof humanise === 'number') {
        feelPatch.humanVariance = parseFloat((humanise / 100).toFixed(2));
      }
      if (typeof swing === 'number' || typeof humanise === 'number') {
        const sw = typeof swing === 'number' ? swing : 0;
        const hu = typeof humanise === 'number' ? humanise : 45;
        feelPatch.microTiming = parseFloat(((sw / 100) * 0.5 + (hu / 100) * 0.3).toFixed(2));
      }
    }
    if (advOverride) {
      if (typeof advOverride.spread === 'number') feelPatch.spread = advOverride.spread;
      if (typeof advOverride.duration === 'number') feelPatch.duration = advOverride.duration;
      if (typeof advOverride.humanVariance === 'number') feelPatch.humanVariance = advOverride.humanVariance;
      if (typeof advOverride.variance === 'number') feelPatch.humanVariance = advOverride.variance;
      if (typeof advOverride.microTiming === 'number') feelPatch.microTiming = advOverride.microTiming;
      if (typeof advOverride.micro === 'number') feelPatch.microTiming = advOverride.micro;
      if (typeof advOverride.arpMode === 'string') feelPatch.arpMode = advOverride.arpMode;
      if (typeof advOverride.arpRate === 'string') feelPatch.arpRate = advOverride.arpRate;
      if (typeof advOverride.arpRange === 'number') feelPatch.arpRange = advOverride.arpRange;
      if (typeof advOverride.arpGate === 'number') feelPatch.arpGate = advOverride.arpGate;
      if (typeof advOverride.minVelocity === 'number') feelPatch.minVelocity = advOverride.minVelocity;
      if (typeof advOverride.maxVelocity === 'number') feelPatch.maxVelocity = advOverride.maxVelocity;
    }
  }

  // Protect pattern arp settings if no explicit user override was placed on arpMode
  if (stylePatch.arpMode && stylePatch.arpMode !== 'off') {
    const hasManualArpMode = opts?.feelSettings?.advOverride && opts.feelSettings.advOverride.arpMode !== undefined;
    if (!hasManualArpMode) {
      feelPatch.arpMode = stylePatch.arpMode;
      if (stylePatch.arpRate && (!opts?.feelSettings?.advOverride || opts.feelSettings.advOverride.arpRate === undefined)) {
        feelPatch.arpRate = stylePatch.arpRate;
      }
      if (stylePatch.arpRange !== undefined && (!opts?.feelSettings?.advOverride || opts.feelSettings.advOverride.arpRange === undefined)) {
        feelPatch.arpRange = stylePatch.arpRange;
      }
    }
  }

  if (stylePatch.isStrum !== undefined && (!opts?.feelSettings?.advOverride || opts.feelSettings.advOverride.isStrum === undefined)) {
    feelPatch.isStrum = stylePatch.isStrum;
  }

  const humanState = {
    ...profile,
    ...stylePatch,
    ...feelPatch,
    bpm: opts?.bpm ?? profile.bpm ?? 90,
    playStyle: effectivePlayStyle,
    ...(typeof opts?.velocity === 'number' ? { velocity: opts.velocity } : {}),
  };

  const baseDuration = opts?.duration ?? profile.duration ?? 0.9;
  const duration = (typeof feelPatch.duration === 'number')
    ? (feelPatch.duration as number)
    : (stylePatch.durationMultiplier ? baseDuration * stylePatch.durationMultiplier : baseDuration);

  // Apply density filtering to notes
  const density = opts?.feelSettings?.density ?? 50;
  const processedNotes = applyDensityToNotes(noteNames, density);

  playChord(processedNotes, duration, humanState, instrument, opts?.customConfig);
}

/**
 * Plays chord notes given either a space-separated string of note names (without octaves)
 * or an array of MIDI note numbers. Handles octave assignment for string input
 * and MIDI-to-note conversion for numeric input.
 * 
 * @param notesInput Space-separated note names (e.g. "C E G") or MIDI number array.
 * @param noteToMidi Mapping of note names to base MIDI values for octave resolution.
 * @param humanState Optional settings to humanize velocities, timing stagger, and duration.
 */
export function playChordFromInput(
  notesInput: string | number[],
  noteToMidi: Record<string, number>,
  humanState?: any
): void {
  const noteNames: string[] = [];

  if (typeof notesInput === 'string') {
    const notes = notesInput.split(' ').map(n => n.trim()).filter(Boolean);
    if (!notes.length) return;

    const rootName = notes[0];
    const rootBaseMidi = noteToMidi[rootName] || 60;

    notes.forEach((note, index) => {
      let midi = noteToMidi[note] || 60;
      if (index === 0) {
        // Root goes one octave lower
        midi -= 12;
      } else {
        if (midi < rootBaseMidi) {
          midi += 12;
        }
      }
      noteNames.push(midiToNoteName(midi));
    });
  } else {
    notesInput.forEach(midi => {
      noteNames.push(midiToNoteName(midi));
    });
  }

  playChord(noteNames, 0.7, humanState);
}

// --- Audio Track Player ---

let audioTrackPlayer: Tone.Player | null = null;

/**
 * Loads an audio file from an object URL into a Tone.Player.
 * Resolves when fully loaded.
 */
export function loadAudioTrack(url: string, volumeDb = 0): Promise<void> {
  return new Promise((resolve, reject) => {
    unloadAudioTrack(); // Cleanup existing

    audioTrackPlayer = new Tone.Player({
      url: url,
      volume: volumeDb,
      onload: () => {
        resolve();
      },
      onerror: (err) => {
        reject(err);
      }
    }).toDestination(); // Or connect to limiter if desired: .connect(limiter);
  });
}

/**
 * Starts playing the loaded audio track.
 */
export function playAudioTrack(timeOffset = 0): void {
  if (audioTrackPlayer && audioTrackPlayer.loaded) {
    audioTrackPlayer.start(undefined, timeOffset);
  }
}

/**
 * Stops the audio track playback.
 */
export function stopAudioTrack(): void {
  if (audioTrackPlayer && audioTrackPlayer.state === 'started') {
    audioTrackPlayer.stop();
  }
}

/**
 * Sets the volume of the audio track (in Decibels, e.g. 0 is normal, -12 is quiet).
 */
export function setAudioTrackVolume(volumeDb: number): void {
  if (audioTrackPlayer) {
    audioTrackPlayer.volume.value = volumeDb;
  }
}

/**
 * Disposes the current audio player to free memory.
 */
export function unloadAudioTrack(): void {
  if (audioTrackPlayer) {
    audioTrackPlayer.dispose();
    audioTrackPlayer = null;
  }
}

// ---------------------------------------------------------------------------
// Perform Mode: Sub-Bass Synthesis & Real-Time Performance Pad Voicing
// ---------------------------------------------------------------------------

let subBass: Tone.Synth | null = null;
let activeHeldChordNotes: string[] = [];
let activeHeldVoice: Tone.Sampler | Tone.PolySynth | null = null;

export function getSubBassSynth(): Tone.Synth {
  if (!subBass) {
    const l = getLimiter();
    subBass = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.02, decay: 0.25, sustain: 0.85, release: 0.4 },
      volume: -7,
    }).connect(l);
  }
  return subBass;
}

/**
 * Plays a deep sub-bass root note (octave 1/2) for a given duration.
 */
export function playSubNote(rootNote: string, duration = 0.8, time?: number, velocity = 0.85): void {
  try {
    Promise.all([Tone.start(), waitForSamplesReady()]).then(() => {
      const synth = getSubBassSynth();
      const clean = rootNote.replace(/\d+$/, '');
      const subPitch = `${clean}1`;
      const atTime = typeof time === 'number' ? time : Tone.now();
      synth.triggerAttackRelease(subPitch, duration, atTime, velocity);
    }).catch((e) => console.warn("Sub bass audio failed:", e));
  } catch (e) {
    console.warn("Sub bass audio failed:", e);
  }
}

/**
 * Starts playing a sub-bass note (hold-to-sustain).
 */
export function startSubNote(rootNote: string, velocity = 0.85): void {
  try {
    Promise.all([Tone.start(), waitForSamplesReady()]).then(() => {
      const synth = getSubBassSynth();
      const clean = rootNote.replace(/\d+$/, '');
      const subPitch = `${clean}1`;
      synth.triggerAttack(subPitch, undefined, velocity);
    }).catch((e) => console.warn("Sub note start failed:", e));
  } catch (e) {
    console.warn("Sub note start failed:", e);
  }
}

/**
 * Releases any held sub-bass note.
 */
export function stopSubNote(): void {
  try {
    if (subBass) {
      subBass.triggerRelease();
    }
  } catch (e) {
    console.warn("Sub note stop failed:", e);
  }
}

/**
 * Transforms an array of note strings into voiced pitches according to pad voicing selection.
 * e.g. 'up an octave', '1st inversion', 'low, root position'.
 */
export function applyVoicingToNotes(notes: string[], voicing = 'root position'): string[] {
  const noteToPc: Record<string, number> = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
    'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11,
  };
  const baseOctave = 4;
  const clean = (Array.isArray(notes) ? notes : [])
    .filter(n => typeof n === 'string' && n.trim().length > 0)
    .map(n => n.replace(/\d+$/, ''));

  if (clean.length === 0) return ['C4', 'E4', 'G4'];

  let currentOct = baseOctave;
  let lastPc = noteToPc[clean[0]] ?? 0;
  const pitched: Array<{ name: string; oct: number }> = [];

  clean.forEach((n, idx) => {
    const pc = noteToPc[n] ?? 0;
    if (idx > 0 && pc <= lastPc) {
      currentOct++;
    }
    pitched.push({ name: n, oct: currentOct });
    lastPc = pc;
  });

  const vNorm = (voicing || '').toLowerCase();
  if (vNorm.includes('octave') || vNorm.includes('high')) {
    return pitched.map(p => `${p.name}${p.oct + 1}`);
  } else if (vNorm.includes('inversion') || vNorm.includes('1st')) {
    if (pitched.length > 1) {
      const [lowest, ...rest] = pitched;
      return [...rest.map(p => `${p.name}${p.oct}`), `${lowest.name}${lowest.oct + 1}`];
    }
    return pitched.map(p => `${p.name}${p.oct}`);
  } else {
    // 'low, root position' or default
    return pitched.map(p => `${p.name}${p.oct}`);
  }
}

/**
 * Starts playing a chord on performance pads with real-time hold-to-sustain.
 */
export function startChordNotes(
  notes: string[],
  voicing = 'root position',
  velocity = 96,
  instrument: InstrumentId = 'piano'
): void {
  try {
    Promise.all([Tone.start(), waitForSamplesReady()]).then(() => {
      const voice = getVoice(instrument);
      if (activeHeldVoice && activeHeldChordNotes.length > 0) {
        try { activeHeldVoice.triggerRelease(activeHeldChordNotes); } catch {}
      }
      const pitched = applyVoicingToNotes(notes, voicing);
      const velNorm = Math.min(1, Math.max(0.1, velocity / 127));
      if (instrument === 'guitar' || instrument === 'jazz-guitar') {
        const isJazz = instrument === 'jazz-guitar';
        const sorted = [...pitched].sort((a, b) => {
          try { return Tone.Frequency(a).toMidi() - Tone.Frequency(b).toMidi(); } catch { return 0; }
        });
        sorted.forEach((n, idx) => {
          setTimeout(() => {
            if (activeHeldVoice === voice) {
              (voice as any).triggerAttack?.(n, Tone.now(), velNorm * (idx === 0 ? 1.08 : 0.95));
            }
          }, idx * (isJazz ? 18 : 24));
        });
      } else {
        if (typeof (voice as any)?.triggerAttack === 'function') {
          (voice as any).triggerAttack(pitched, Tone.now(), velNorm);
        }
      }
      activeHeldChordNotes = pitched;
      activeHeldVoice = voice;
    }).catch((e) => console.warn("Start chord notes failed:", e));
  } catch (e) {
    console.warn("Start chord notes failed:", e);
  }
}

/**
 * Releases currently held performance pad chord notes.
 */
export function stopChordNotes(): void {
  try {
    if (activeHeldVoice && activeHeldChordNotes.length > 0) {
      if (typeof (activeHeldVoice as any)?.triggerRelease === 'function') {
        (activeHeldVoice as any).triggerRelease(activeHeldChordNotes);
      }
      activeHeldChordNotes = [];
      activeHeldVoice = null;
    }
  } catch (e) {
    console.warn("Stop chord notes failed:", e);
  }
}

let metronomeVoice: Tone.Synth | null = null;
function getMetronomeVoice(): Tone.Synth {
  if (!metronomeVoice) {
    metronomeVoice = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 },
      volume: -4,
    }).toDestination();
  }
  return metronomeVoice;
}

/**
 * Plays a metronome click tone for count-in.
 * High frequency (1200Hz) on accent / beat 1, lower (800Hz) on other beats.
 */
export function playMetronomeClick(accent = false): void {
  try {
    Tone.start().then(() => {
      const voice = getMetronomeVoice();
      const freq = accent ? 1200 : 800;
      if (typeof (voice as any)?.triggerAttackRelease === 'function') {
        (voice as any).triggerAttackRelease(freq, 0.035, Tone.now(), accent ? 0.95 : 0.7);
      }
    }).catch(() => {});
  } catch {}
}


