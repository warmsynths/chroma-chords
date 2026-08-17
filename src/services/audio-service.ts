import * as Tone from 'tone';

let limiter: Tone.Compressor | null = null;
let sampler: Tone.Sampler | null = null;
let organ: Tone.PolySynth | null = null;
let cinematicReverb: Tone.Reverb | null = null;
let padStrings: Tone.PolySynth | null = null;
let junoChorus: Tone.Chorus | null = null;
let junoPad: Tone.PolySynth | null = null;
let stab: Tone.PolySynth | null = null;
let epiano: Tone.PolySynth | null = null;
let guitar: Tone.PolySynth | null = null;
let bell: Tone.PolySynth | null = null;

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

function getSampler(): Tone.Sampler {
  if (!sampler) {
    sampler = new Tone.Sampler({
      urls: {
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
      },
      baseUrl: "https://danigb.github.io/samples/jlearman/rhodes-mki/jRhodes3d-mono/",
      volume: -12,
      onload: () => {
        console.log("Rhodes piano sampler loaded successfully!");
      },
      onerror: (err) => {
        console.warn("Failed to load Rhodes piano sampler:", err);
      }
    }).connect(getLimiter());
  }
  return sampler;
}

export type InstrumentId = 'rhodes' | 'organ' | 'pad-strings' | 'juno-pad' | 'stab' | 'epiano' | 'guitar' | 'bell';

function getVoice(instrument: InstrumentId): Tone.Sampler | Tone.PolySynth {
  const l = getLimiter();
  switch (instrument) {
    case 'organ':
      if (!organ) {
        organ = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'fatsquare', count: 3, spread: 20 },
          envelope: { attack: 0.015, decay: 0.1, sustain: 0.9, release: 0.35 },
          volume: -16,
        }).connect(l);
      }
      return organ;
    case 'pad-strings':
      if (!padStrings) {
        cinematicReverb = new Tone.Reverb({ decay: 4.5, wet: 0.35 }).connect(l);
        padStrings = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' },
          envelope: { attack: 0.9, decay: 0.4, sustain: 0.8, release: 2.8 },
          volume: -15,
        }).connect(cinematicReverb);
      }
      return padStrings;
    case 'juno-pad':
      if (!junoPad) {
        junoChorus = new Tone.Chorus({ frequency: 0.8, delayTime: 3.5, depth: 0.7, wet: 0.5 }).connect(l);
        try { junoChorus.start(); } catch {}
        junoPad = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'fatsawtooth', count: 3, spread: 25 },
          envelope: { attack: 0.35, decay: 0.4, sustain: 0.85, release: 1.6 },
          volume: -16,
        }).connect(junoChorus);
      }
      return junoPad;
    case 'stab':
      if (!stab) {
        stab = new Tone.PolySynth(Tone.MonoSynth, {
          oscillator: { type: 'square' },
          envelope: { attack: 0.004, decay: 0.14, sustain: 0.12, release: 0.15 },
          filterEnvelope: { attack: 0.004, decay: 0.15, sustain: 0.1, release: 0.2, baseFrequency: 300, octaves: 4 },
          volume: -14,
        }).connect(l);
      }
      return stab;
    case 'epiano':
      if (!epiano) {
        epiano = new Tone.PolySynth(Tone.FMSynth, {
          harmonicity: 2,
          modulationIndex: 3.5,
          envelope: { attack: 0.008, decay: 0.6, sustain: 0.25, release: 1.2 },
          modulationEnvelope: { attack: 0.008, decay: 0.4, sustain: 0.1, release: 0.6 },
          volume: -14,
        }).connect(l);
      }
      return epiano;
    case 'guitar':
      if (!guitar) {
        guitar = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.004, decay: 0.5, sustain: 0.05, release: 0.6 },
          volume: -13,
        }).connect(l);
      }
      return guitar;
    case 'bell':
      if (!bell) {
        bell = new Tone.PolySynth(Tone.FMSynth, {
          harmonicity: 5.5,
          modulationIndex: 12,
          envelope: { attack: 0.002, decay: 1.1, sustain: 0.05, release: 0.8 },
          modulationEnvelope: { attack: 0.002, decay: 0.5, sustain: 0, release: 0.4 },
          volume: -16,
        }).connect(l);
      }
      return bell;
    case 'rhodes':
    default:
      return getSampler();
  }
}

// The instrument picker's five user-facing options (design: "Instrument" chip) — each maps to
// one of the voices above. Colors match the dots used in the picker's option pills.
export const USER_INSTRUMENTS: { name: string; instrument: InstrumentId; color: string }[] = [
  {
    "name": "Piano",
    "instrument": "rhodes",
    "color": "#9CC0EC"
  },
  {
    "name": "Rhodes",
    "instrument": "epiano",
    "color": "#F2A79B"
  },
  {
    "name": "Nylon Guitar",
    "instrument": "guitar",
    "color": "#F6D98B"
  },
  {
    "name": "Warm Pad",
    "instrument": "pad-strings",
    "color": "#C9A9E0"
  },
  {
    "name": "Synth Bell",
    "instrument": "bell",
    "color": "#B8CC9E"
  },
  {
    "name": "Drawbar Organ",
    "instrument": "organ",
    "color": "#E8609A"
  },
  {
    "name": "Analog Synth",
    "instrument": "juno-pad",
    "color": "#7B61FF"
  },
  {
    "name": "Synth Stab",
    "instrument": "stab",
    "color": "#FF8C42"
  }
];

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
      "arpRange": 1
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
  "Pop": "rhodes",
  "Rock": "rhodes",
  "Indie/Folk": "rhodes",
  "Lo-fi/Chill": "rhodes",
  "Jazz-ish": "rhodes",
  "R&B/Soul": "rhodes",
  "Gospel": "organ",
  "Cinematic": "pad-strings",
  "Synthwave": "juno-pad",
  "House/Dance": "stab",
  "Blues": "rhodes",
  "Funk/Disco": "epiano",
  "Country/Bluegrass": "guitar",
  "Reggae/Dub": "organ",
  "Metal": "stab",
  "Punk": "stab",
  "Ambient/Drone": "pad-strings",
  "Trap/Hip-Hop": "epiano",
  "Bossa Nova/Latin": "guitar",
  "Classical/Orchestral": "pad-strings",
  "EDM/Trance": "juno-pad",
  "Afrobeats": "epiano",
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
const INSTRUMENT_ID_TO_USER_NAME: Record<InstrumentId, string> = {
  rhodes: 'Piano',
  epiano: 'Rhodes',
  guitar: 'Nylon Guitar',
  'pad-strings': 'Warm Pad',
  'juno-pad': 'Warm Pad',
  bell: 'Synth Bell',
  organ: 'Piano',
  stab: 'Nylon Guitar',
};

/** The instrument name (one of USER_INSTRUMENTS) this genre plays with by default. */
export function genreDefaultInstrumentName(genre: string): string {
  const id = GENRE_INSTRUMENT[genre] ?? 'rhodes';
  return INSTRUMENT_ID_TO_USER_NAME[id] ?? 'Piano';
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
    new Promise<void>((resolve) => setTimeout(resolve, 3000)),
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
  'rhodes': 'Piano',
  'epiano': 'Rhodes',
  'guitar': 'Nylon Guitar',
  'pad-strings': 'Warm Pad',
  'juno-pad': 'Analog Synth',
  'bell': 'Synth Bell',
  'organ': 'Drawbar Organ',
  'stab': 'Synth Stab',
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
  instrument: InstrumentId = 'rhodes',
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

      // --- Arpeggiator mode ---
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

        // Note duration: slightly shorter than interval for a crisp arp feel
        const noteDur = humanState.duration
          ? humanState.duration * (1.0 + (Math.random() - 0.5) * 0.1 * (humanState.humanVariance ?? 0))
          : Math.max(0.05, interval * 0.9);

        ordered.forEach((noteName, index) => {
          // Optional micro-timing jitter on each arp step
          const jitter = humanState.microTiming
            ? (Math.random() - 0.5) * humanState.microTiming * 0.02
            : 0;
          voice.triggerAttackRelease(noteName, noteDur, now + index * interval + jitter, getVel());
        });

        return;
      }

      // --- Standard humanized chord playback ---
      noteNames.forEach((noteName, index) => {
        let stagger = 0;
        let vel = densityScaling;
        let dur = duration;

        if (humanState) {
          const { minVelocity, maxVelocity, spread, microTiming, humanVariance, duration: hDuration } = humanState;

          // Random velocity between minVelocity and maxVelocity (0 to 127) scaled to 0-1 range
          const rawVel = (minVelocity + Math.random() * (maxVelocity - minVelocity)) / 127;
          vel = rawVel * densityScaling;

          // Spread/microtiming/variance offset in seconds
          const spreadOffset = index * spread * 0.1;
          const microTimingOffset = (Math.random() - 0.5) * microTiming * 0.05;
          const varianceOffset = (Math.random() - 0.5) * humanVariance * 0.03;

          stagger = Math.max(0, spreadOffset + microTimingOffset + varianceOffset);

          // Calculate duration scaled by human settings duration and randomized by humanVariance
          dur = hDuration * (1.0 + (Math.random() - 0.5) * 0.2 * humanVariance);
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

/**
 * Plays a chord using the voice and humanize feel mapped to the given genre
 * (see GENRE_INSTRUMENT/GENRE_HUMANIZE) instead of always using the flat Rhodes hit.
 */
export function playChordForGenre(
  noteNames: string[],
  genre: string,
  opts?: { bpm?: number; duration?: number; instrument?: string; playStyle?: string; customConfig?: Record<string, unknown> }
): void {
  const safeGenre = (genre === 'Unknown' || !genre) ? 'Pop' : genre;
  // User overrides (from the Instrument/Play style pickers) win over the genre's defaults —
  // when unset, playback falls back to the existing per-genre auto-selection untouched.
  const userInstrument = opts?.instrument ? USER_INSTRUMENTS.find(i => i.name === opts.instrument) : undefined;
  const userPlayStyle = opts?.playStyle ? USER_PLAY_STYLES.find(p => p.name === opts.playStyle) : undefined;

  const instrument = userInstrument?.instrument ?? GENRE_INSTRUMENT[safeGenre] ?? 'rhodes';
  const profile = GENRE_HUMANIZE[safeGenre] || {};
  const stylePatch = (userPlayStyle?.patch ?? {}) as { durationMultiplier?: number; [k: string]: unknown };
  const humanState = { ...profile, ...stylePatch, bpm: opts?.bpm ?? profile.bpm ?? 90 };

  const baseDuration = opts?.duration ?? profile.duration ?? 0.9;
  const duration = stylePatch.durationMultiplier ? baseDuration * stylePatch.durationMultiplier : baseDuration;

  playChord(noteNames, duration, humanState, instrument, opts?.customConfig);
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
