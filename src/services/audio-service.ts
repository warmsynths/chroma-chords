import * as Tone from 'tone';

// Limiter/compressor to prevent clipping when multiple notes play simultaneously.
// Tuned to act transparently — fast attack/release catches peaks without audible pumping.
const limiter = new Tone.Compressor({
  threshold: -6,   // Start compressing when summed signal nears 0 dBFS
  ratio: 20,       // High ratio makes it behave like a limiter
  attack: 0.002,   // 2ms attack — fast enough to catch transient peaks
  release: 0.1,    // 100ms release — quick recovery without pumping artifacts
  knee: 3,         // Slight soft knee for transparent sound
}).toDestination();

// High-quality sampled 1977 Rhodes Mark I Stage 73 electric piano
// Sourced from J. Learman open-source CC0 samples hosted via GitHub Pages
const sampler = new Tone.Sampler({
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
  volume: -12, // Adjusted for clear presence with headroom before limiter
  onload: () => {
    console.log("Rhodes piano sampler loaded successfully!");
  },
  onerror: (err) => {
    console.warn("Failed to load Rhodes piano sampler:", err);
  }
}).connect(limiter);

// Additional voices for genres that shouldn't just be the Rhodes — all synthesized via
// Tone.js primitives (no extra samples/network requests) so they're available instantly.

// Gospel: drawbar-organ approximation — a few detuned square partials, fast percussive attack.
const organ = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'fatsquare', count: 3, spread: 20 },
  envelope: { attack: 0.015, decay: 0.1, sustain: 0.9, release: 0.35 },
  volume: -16,
}).connect(limiter);

// Cinematic: soft sustained strings/pad, long attack/release through reverb.
const cinematicReverb = new Tone.Reverb({ decay: 4.5, wet: 0.35 }).connect(limiter);
const padStrings = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'sine' },
  envelope: { attack: 0.9, decay: 0.4, sustain: 0.8, release: 2.8 },
  volume: -15,
}).connect(cinematicReverb);

// Synthwave: Juno-60 style pad — detuned unison sawtooths through a slow chorus.
const junoChorus = new Tone.Chorus({ frequency: 0.8, delayTime: 3.5, depth: 0.7, wet: 0.5 }).start().connect(limiter);
const junoPad = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'fatsawtooth', count: 3, spread: 25 },
  envelope: { attack: 0.35, decay: 0.4, sustain: 0.85, release: 1.6 },
  volume: -16,
}).connect(junoChorus);

// House/Dance: short percussive filter-swept stab.
const stab = new Tone.PolySynth(Tone.MonoSynth, {
  oscillator: { type: 'square' },
  envelope: { attack: 0.004, decay: 0.14, sustain: 0.12, release: 0.15 },
  filterEnvelope: { attack: 0.004, decay: 0.15, sustain: 0.1, release: 0.2, baseFrequency: 300, octaves: 4 },
  volume: -14,
}).connect(limiter);

export type InstrumentId = 'rhodes' | 'organ' | 'pad-strings' | 'juno-pad' | 'stab';

function getVoice(instrument: InstrumentId): Tone.Sampler | Tone.PolySynth {
  switch (instrument) {
    case 'organ': return organ;
    case 'pad-strings': return padStrings;
    case 'juno-pad': return junoPad;
    case 'stab': return stab;
    case 'rhodes':
    default: return sampler;
  }
}

const GENRE_INSTRUMENT: Record<string, InstrumentId> = {
  'Pop': 'rhodes',
  'Rock': 'rhodes',
  'Indie/Folk': 'rhodes',
  'Lo-fi/Chill': 'rhodes',
  'Jazz-ish': 'rhodes',
  'R&B/Soul': 'rhodes',
  'Gospel': 'organ',
  'Cinematic': 'pad-strings',
  'Synthwave': 'juno-pad',
  'House/Dance': 'stab',
};

// Per-genre humanize profile: velocity range, timing looseness, note duration, and
// (for Lo-fi/Jazz) a gentle arpeggiation instead of a flat hit.
const GENRE_HUMANIZE: Record<string, any> = {
  'Pop': { minVelocity: 90, maxVelocity: 110, spread: 0.5, microTiming: 0.3, humanVariance: 0.3, duration: 1.0 },
  'Rock': { minVelocity: 105, maxVelocity: 127, spread: 0.2, microTiming: 0.1, humanVariance: 0.15, duration: 0.9 },
  'Indie/Folk': { minVelocity: 80, maxVelocity: 105, spread: 1, microTiming: 0.5, humanVariance: 0.4, duration: 1.1 },
  'Lo-fi/Chill': { minVelocity: 55, maxVelocity: 85, spread: 2.5, microTiming: 1.2, humanVariance: 0.8, duration: 1.4, arpMode: 'up', arpRate: '1/8', arpRange: 1 },
  'Jazz-ish': { minVelocity: 70, maxVelocity: 100, spread: 1.8, microTiming: 1, humanVariance: 0.6, duration: 1.2, arpMode: 'up', arpRate: '1/8T', arpRange: 1 },
  'R&B/Soul': { minVelocity: 75, maxVelocity: 105, spread: 1.2, microTiming: 0.6, humanVariance: 0.5, duration: 1.3 },
  'Gospel': { minVelocity: 95, maxVelocity: 120, spread: 0.4, microTiming: 0.2, humanVariance: 0.2, duration: 1.5 },
  'Cinematic': { minVelocity: 60, maxVelocity: 90, spread: 0, microTiming: 0, humanVariance: 0.1, duration: 2.2 },
  'Synthwave': { minVelocity: 70, maxVelocity: 95, spread: 0, microTiming: 0, humanVariance: 0.1, duration: 1.8 },
  'House/Dance': { minVelocity: 100, maxVelocity: 127, spread: 0, microTiming: 0.1, humanVariance: 0.15, duration: 0.5 },
};

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
 * Plays a single note using the sampled Rhodes electric piano.
 * Starts Tone.js audio context on user gesture if not already running.
 * 
 * @param noteName Note name with octave, e.g. "C4" or "D#5".
 * @param duration Duration in seconds.
 */
export function playNote(noteName: string, duration = 0.35): void {
  try {
    Promise.all([Tone.start(), Tone.loaded()]).then(() => {
      sampler.triggerAttackRelease(noteName, duration);
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
function arpRateToSeconds(arpRate: string, bpm: number): number {
  const beatsPerSecond = bpm / 60;
  switch (arpRate) {
    case '1/4':  return 1 / beatsPerSecond;           // 1 beat
    case '1/8':  return 0.5 / beatsPerSecond;         // half beat
    case '1/8T': return (0.5 / beatsPerSecond) * (2 / 3); // triplet eighth
    case '1/16': return 0.25 / beatsPerSecond;        // quarter beat
    default:     return 0.25 / beatsPerSecond;
  }
}

/**
 * Expands a set of note names across multiple octaves for arp range.
 * Returns a flat array of note names spanning `arpRange` octaves.
 */
function expandNotesAcrossOctaves(noteNames: string[], arpRange: number): string[] {
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
function orderNotesForArp(notes: string[], arpMode: string): string[] {
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
 * Plays a chord of notes simultaneously using the sampled Rhodes electric piano.
 * Starts Tone.js audio context on user gesture if not already running.
 * When humanState.arpMode is set (not 'off'), plays notes in an arpeggio pattern.
 * 
 * @param noteNames Array of note names with octaves, e.g. ["C4", "E4", "G4"].
 * @param duration Duration in seconds.
 * @param humanState Optional HumanState including bpm, arpMode, arpRate, arpRange.
 */
export function playChord(noteNames: string[], duration = 0.7, humanState?: any, instrument: InstrumentId = 'rhodes'): void {
  try {
    Promise.all([Tone.start(), Tone.loaded()]).then(() => {
      const voice = getVoice(instrument);
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
export function playChordForGenre(noteNames: string[], genre: string, opts?: { bpm?: number; duration?: number }): void {
  const instrument = GENRE_INSTRUMENT[genre] || 'rhodes';
  const profile = GENRE_HUMANIZE[genre] || {};
  const humanState = { ...profile, bpm: opts?.bpm ?? profile.bpm ?? 90 };
  playChord(noteNames, opts?.duration ?? profile.duration ?? 0.9, humanState, instrument);
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
