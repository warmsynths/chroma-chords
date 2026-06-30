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
    Tone.start().then(() => {
      sampler.triggerAttackRelease(noteName, duration);
    }).catch((e) => {
      console.warn("Audio playback gesture failed:", e);
    });
  } catch (e) {
    console.warn("Audio playback failed:", e);
  }
}

/**
 * Plays a chord of notes simultaneously using the sampled Rhodes electric piano.
 * Starts Tone.js audio context on user gesture if not already running.
 * 
 * @param noteNames Array of note names with octaves, e.g. ["C4", "E4", "G4"].
 * @param duration Duration in seconds.
 */
export function playChord(noteNames: string[], duration = 0.7, humanState?: any): void {
  try {
    Tone.start().then(() => {
      const count = noteNames.length;
      const densityScaling = count <= 1 ? 1 : Math.max(0.4, 1 / Math.sqrt(count));
      const now = Tone.now();

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

        sampler.triggerAttackRelease(noteName, dur, now + stagger, vel);
      });
    }).catch((e) => {
      console.warn("Audio playback gesture failed:", e);
    });
  } catch (e) {
    console.warn("Audio playback failed:", e);
  }
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
