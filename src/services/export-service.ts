import * as Tone from 'tone';
import { Progression, ChordBlock } from './chord-engine';
import {
  USER_INSTRUMENTS, USER_PLAY_STYLES, GENRE_HUMANIZE, GENRE_INSTRUMENT, InstrumentId,
  arpRateToSeconds, expandNotesAcrossOctaves, orderNotesForArp,
  FeelSettings, applyDensityToNotes, normalizeInstrumentName,
  createOfflineToneRack, getLoadedSamplerBuffers, ensureSamplerLoaded,
} from './audio-service';
import { pitchNotesAscending } from './playback-engine';
import { MelodyTrack, melodyEngine } from './melody-engine';

export interface ScheduledNoteEvent {
  note: string;
  midi: number;
  startTime: number; // in seconds
  duration: number;  // in seconds
}

export function noteToMidiNumber(noteStr: string): number {
  const pitchClassMap: Record<string, number> = {
    'C': 0, 'B#': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4, 'Fb': 4, 'E#': 5, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7,
    'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11, 'Cb': 11,
  };
  const match = noteStr.match(/^([A-Ga-g][#b]?)(-?\d+)?$/);
  if (!match) return 60;
  const pcStr = match[1].charAt(0).toUpperCase() + match[1].slice(1);
  const pc = pitchClassMap[pcStr] ?? 0;
  const octave = match[2] !== undefined ? parseInt(match[2], 10) : 4;
  return Math.min(127, Math.max(0, (octave + 1) * 12 + pc));
}

/**
 * Generates exact scheduled note events for a progression, matching live app playback 1-to-1.
 */
export function generateScheduledEvents(
  progression: Progression,
  order?: number[],
  playStyleName?: string | null,
  barsPerChord = 1,
  feelSettings?: FeelSettings
): ScheduledNoteEvent[] {
  const chordsToExport: ChordBlock[] = (order && order.length > 0)
    ? order.map(i => progression.chords[i]).filter((c): c is ChordBlock => Boolean(c))
    : progression.chords;

  const bpm = progression.bpm || 120;
  const stepDuration = (barsPerChord * 240) / bpm;

  const userPlayStyle = playStyleName
    ? USER_PLAY_STYLES.find(p => p.name.toLowerCase() === playStyleName.toLowerCase())
    : undefined;

  const profile = GENRE_HUMANIZE[progression.genre] || {};
  const stylePatch = (userPlayStyle?.patch ?? {}) as Record<string, any>;
  const humanState = { ...profile, ...stylePatch, bpm, ...(feelSettings?.humanState ?? {}) };

  const baseDuration = profile.duration ?? 0.9;
  const duration = stylePatch.durationMultiplier ? baseDuration * stylePatch.durationMultiplier : baseDuration;

  const effectiveSpread = feelSettings?.humanState?.strum !== undefined
    ? (feelSettings.humanState.strum / 100) * 1.5
    : (feelSettings?.spread !== undefined
        ? (feelSettings.spread / 100) * 1.5
        : (profile.spread ?? 0.3));

  const effectiveSwing = feelSettings?.humanState?.swing !== undefined
    ? feelSettings.humanState.swing
    : (feelSettings?.swing ?? 0);

  const density = feelSettings?.density ?? 50;

  const events: ScheduledNoteEvent[] = [];

  chordsToExport.forEach((chord, barIdx) => {
    const swingSec = (effectiveSwing / 100) * 0.04 * (barIdx % 2 === 1 ? 1 : 0);
    const barStartTime = barIdx * stepDuration + swingSec;
    const rawNotes = chord.notes && chord.notes.length > 0 ? chord.notes : ['C', 'E', 'G'];
    
    // Exact 1-to-1 voicing with lower root bass note (e.g. C3) and ascending registers (C4, E4, G4, D5)
    let pitchedNotes = pitchNotesAscending(rawNotes, 4);
    pitchedNotes = applyDensityToNotes(pitchedNotes, density);

    if (humanState.arpMode && humanState.arpMode !== 'off') {
      const arpRate = humanState.arpRate ?? '1/16';
      const arpRange = humanState.arpRange ?? 1;
      const arpMode = humanState.arpMode;

      const interval = arpRateToSeconds(arpRate, bpm);
      const expanded = expandNotesAcrossOctaves(pitchedNotes, arpRange);
      const ordered = orderNotesForArp(expanded, arpMode);

      const noteDur = humanState.duration ? humanState.duration : Math.max(0.6, duration);

      ordered.forEach((noteName, index) => {
        const startTime = barStartTime + index * interval;
        events.push({
          note: noteName,
          midi: noteToMidiNumber(noteName),
          startTime,
          duration: noteDur,
        });
      });
    } else {
      const userInstName = feelSettings?.humanState?.instrument || undefined;
      const cleanName = userInstName ? normalizeInstrumentName(userInstName) : undefined;
      const resolvedInstId = cleanName
        ? (USER_INSTRUMENTS.find(i => i.name.toLowerCase() === cleanName.toLowerCase())?.instrument ?? 'piano')
        : (GENRE_INSTRUMENT[progression.genre] ?? 'piano');
      const isGuitar = resolvedInstId === 'guitar' || resolvedInstId === 'jazz-guitar';
      const isJazzGuitar = resolvedInstId === 'jazz-guitar';

      pitchedNotes.forEach((noteName, index) => {
        const guitarDelay = isGuitar ? index * (isJazzGuitar ? 0.018 : 0.024) : 0;
        const stagger = guitarDelay + index * effectiveSpread * 0.1;
        const startTime = barStartTime + stagger;
        events.push({
          note: noteName,
          midi: noteToMidiNumber(noteName),
          startTime,
          duration: isGuitar ? Math.max(duration, 1.2) : duration,
        });
      });
    }
  });

  return events;
}

/**
 * Encodes an integer into Variable-Length Quantity (VLQ) bytes for MIDI format.
 */
function encodeVLQ(num: number): number[] {
  const bytes: number[] = [];
  let value = Math.max(0, Math.floor(num));
  bytes.push(value & 0x7F);
  while ((value >>= 7) > 0) {
    bytes.unshift((value & 0x7F) | 0x80);
  }
  return bytes;
}

interface MidiRawEvent {
  tick: number;
  type: 'on' | 'off';
  midi: number;
  velocity?: number;
}

export interface MultiTrackMidiOptions {
  target?: 'chords' | 'melody' | 'both';
  order?: number[];
  playStyleName?: string | null;
  barsPerChord?: number;
  feelSettings?: FeelSettings;
}

function buildTrackBytes(
  trackName: string,
  events: MidiRawEvent[],
  channel: number,
  bpm?: number,
  ticksPerQuarter = 480
): number[] {
  const trackEvents: number[] = [];

  // Set Tempo Meta Event (if bpm provided)
  if (bpm) {
    const mpqn = Math.round(60_000_000 / bpm);
    trackEvents.push(0x00);
    trackEvents.push(0xFF, 0x51, 0x03);
    trackEvents.push((mpqn >> 16) & 0xFF, (mpqn >> 8) & 0xFF, mpqn & 0xFF);
  }

  // Track Name Meta Event
  trackEvents.push(0x00);
  trackEvents.push(0xFF, 0x03, trackName.length);
  for (let i = 0; i < trackName.length; i++) {
    trackEvents.push(trackName.charCodeAt(i));
  }

  const safeChannel = Math.max(0, Math.min(15, channel));
  const noteOnStatus = 0x90 | safeChannel;
  const noteOffStatus = 0x80 | safeChannel;

  let lastTick = 0;
  events.forEach(evt => {
    const delta = Math.max(0, evt.tick - lastTick);
    lastTick = evt.tick;
    trackEvents.push(...encodeVLQ(delta));
    if (evt.type === 'on') {
      trackEvents.push(noteOnStatus, evt.midi, evt.velocity ?? 0x50);
    } else {
      trackEvents.push(noteOffStatus, evt.midi, 0x00);
    }
  });

  // End of Track Meta Event
  trackEvents.push(0x00);
  trackEvents.push(0xFF, 0x2F, 0x00);

  // Track Chunk Header: 'MTrk' + 4-byte length
  const trackLen = trackEvents.length;
  const trackChunkHeader = [
    0x4D, 0x54, 0x72, 0x6B,
    (trackLen >> 24) & 0xFF,
    (trackLen >> 16) & 0xFF,
    (trackLen >> 8) & 0xFF,
    trackLen & 0xFF,
  ];

  return [...trackChunkHeader, ...trackEvents];
}

function assembleMidiFile(trackChunks: number[][], isType1: boolean, ticksPerQuarter = 480): Uint8Array {
  const numTracks = trackChunks.length;
  const format = isType1 && numTracks > 1 ? 1 : 0;

  const headerChunk = [
    0x4D, 0x54, 0x68, 0x64, // 'MThd'
    0x00, 0x00, 0x00, 0x06, // length 6
    0x00, format,           // format 0 or 1
    (numTracks >> 8) & 0xFF, numTracks & 0xFF, // num tracks
    (ticksPerQuarter >> 8) & 0xFF, ticksPerQuarter & 0xFF, // division
  ];

  const totalLength = headerChunk.length + trackChunks.reduce((acc, t) => acc + t.length, 0);
  const result = new Uint8Array(totalLength);
  result.set(headerChunk, 0);

  let offset = headerChunk.length;
  for (const track of trackChunks) {
    result.set(track, offset);
    offset += track.length;
  }

  return result;
}

export function generateMelodyMidiEvents(
  melodyTrack: MelodyTrack,
  bpm: number,
  ticksPerQuarter = 480,
  stepDurationSeconds: number
): MidiRawEvent[] {
  const events: MidiRawEvent[] = [];
  if (!melodyTrack || !melodyTrack.notes || melodyTrack.notes.length === 0) {
    return events;
  }

  const maxBar = melodyTrack.notes.reduce((max, n) => Math.max(max, n.barIndex), 0);
  for (let b = 0; b <= maxBar; b++) {
    const barNotes = melodyTrack.notes.filter(n => n.barIndex === b);
    if (!barNotes.length) continue;
    const barStartTime = b * stepDurationSeconds;
    const scheduled = melodyEngine.applyHumanFeel(barNotes, melodyTrack.feelSettings, bpm);
    scheduled.forEach(evt => {
      const noteStartTime = barStartTime + evt.time;
      const startTick = Math.round((noteStartTime / (60 / bpm)) * ticksPerQuarter);
      const durTicks = Math.max(1, Math.round((evt.duration / (60 / bpm)) * ticksPerQuarter));
      const midiNum = noteToMidiNumber(evt.note);
      events.push({ tick: startTick, type: 'on', midi: midiNum, velocity: evt.velocity });
      events.push({ tick: startTick + durTicks, type: 'off', midi: midiNum });
    });
  }

  events.sort((a, b) => {
    if (a.tick !== b.tick) return a.tick - b.tick;
    if (a.type !== b.type) return a.type === 'off' ? -1 : 1;
    return a.midi - b.midi;
  });

  return events;
}

/**
 * Generates a multi-track Type 1 Standard MIDI buffer (Track 1 = Chords, Track 2 = Melody).
 */
export function generateMultiTrackMidiBuffer(
  progression: Progression,
  melodyTrack?: MelodyTrack | null,
  options: MultiTrackMidiOptions = {}
): Uint8Array {
  const {
    target = (melodyTrack && melodyTrack.notes?.length ? 'both' : 'chords'),
    order,
    playStyleName,
    barsPerChord = 1,
    feelSettings,
  } = options;

  const bpm = progression.bpm || 120;
  const ticksPerQuarter = 480;
  const stepDuration = (barsPerChord * 240) / bpm;
  const trackChunks: number[][] = [];

  const includeChords = target === 'chords' || target === 'both';
  const includeMelody = (target === 'melody' || target === 'both') && melodyTrack && melodyTrack.notes?.length;

  if (includeChords) {
    const scheduledEvents = generateScheduledEvents(progression, order, playStyleName, barsPerChord, feelSettings);
    const chordRawEvents: MidiRawEvent[] = [];
    scheduledEvents.forEach(evt => {
      const startTick = Math.round((evt.startTime / (60 / bpm)) * ticksPerQuarter);
      const durTicks = Math.max(1, Math.round((evt.duration / (60 / bpm)) * ticksPerQuarter));
      chordRawEvents.push({ tick: startTick, type: 'on', midi: evt.midi, velocity: 0x50 });
      chordRawEvents.push({ tick: startTick + durTicks, type: 'off', midi: evt.midi });
    });
    chordRawEvents.sort((a, b) => {
      if (a.tick !== b.tick) return a.tick - b.tick;
      if (a.type !== b.type) return a.type === 'off' ? -1 : 1;
      return a.midi - b.midi;
    });

    trackChunks.push(buildTrackBytes('Chords', chordRawEvents, 0, bpm, ticksPerQuarter));
  }

  if (includeMelody && melodyTrack) {
    const melodyRawEvents = generateMelodyMidiEvents(melodyTrack, bpm, ticksPerQuarter, stepDuration);
    trackChunks.push(buildTrackBytes('Melody', melodyRawEvents, 1, includeChords ? undefined : bpm, ticksPerQuarter));
  }

  if (trackChunks.length === 0) {
    trackChunks.push(buildTrackBytes('Chroma Chords', [], 0, bpm, ticksPerQuarter));
  }

  return assembleMidiFile(trackChunks, target === 'both');
}

/**
 * Generates a Standard MIDI File (.mid) binary buffer matching live playback note pitch registers and timings.
 */
export function generateMidiBuffer(
  progression: Progression,
  order?: number[],
  playStyleName?: string | null,
  barsPerChord = 1,
  feelSettings?: FeelSettings
): Uint8Array {
  return generateMultiTrackMidiBuffer(progression, null, {
    target: 'chords',
    order,
    playStyleName,
    barsPerChord,
    feelSettings,
  });
}

/**
 * Downloads a Standard MIDI (.mid) file for the given progression and optional melody track.
 */
export function downloadMultiTrackMidi(
  progression: Progression,
  melodyTrack?: MelodyTrack | null,
  options: MultiTrackMidiOptions = {}
): void {
  const buffer = generateMultiTrackMidiBuffer(progression, melodyTrack, options);
  const blob = new Blob([buffer as unknown as BlobPart], { type: 'audio/midi' });
  const key = (progression.key || 'C').toLowerCase();
  const mood = (progression.mood || 'progression').toLowerCase().replace(/\s+/g, '-');
  const bpm = progression.bpm || 120;
  const targetTag = options.target || (melodyTrack && melodyTrack.notes?.length ? 'both' : 'chords');
  const filename = `chroma-${targetTag}-${key}-${mood}-${bpm}bpm.mid`;
  triggerDownload(blob, filename);
}

/**
 * Downloads a Standard MIDI (.mid) file for the given progression (legacy chords export).
 */
export function downloadMidi(
  progression: Progression,
  order?: number[],
  _instrumentName?: string | null,
  playStyleName?: string | null,
  barsPerChord = 1,
  feelSettings?: FeelSettings
): void {
  downloadMultiTrackMidi(progression, null, {
    target: 'chords',
    order,
    playStyleName,
    barsPerChord,
    feelSettings,
  });
}

/**
 * Creates Tone.js synth voice matching selected user instrument with exact audio-service parameters.
 */
function createOfflineVoice(
  instrumentName?: string | null,
  genre?: string,
  tone = 'Warm',
  loadedBuffers?: Record<string, AudioBuffer> | null
): Tone.ToneAudioNode {
  const limiter = new Tone.Compressor({
    threshold: -6,
    ratio: 20,
    attack: 0.002,
    release: 0.1,
    knee: 3,
  }).toDestination();

  const toneRack = createOfflineToneRack(tone, limiter);

  const cleanName = instrumentName ? normalizeInstrumentName(instrumentName) : undefined;
  const userInstrument = cleanName
    ? USER_INSTRUMENTS.find(i => i.name.toLowerCase() === cleanName.toLowerCase())
    : undefined;

  const instId: InstrumentId = userInstrument?.instrument ?? (genre ? GENRE_INSTRUMENT[genre] : undefined) ?? 'piano';

  switch (instId) {
    case 'bell': {
      const bellEq = new Tone.EQ3({ high: 3.5, mid: -0.5, low: -2.0, highFrequency: 4800 }).connect(toneRack);
      const bellReverb = new Tone.Reverb({ decay: 3.2, wet: 0.32 }).connect(bellEq);
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3.5,
        modulationIndex: 12,
        envelope: { attack: 0.002, decay: 1.2, sustain: 0.04, release: 1.4 },
        modulationEnvelope: { attack: 0.002, decay: 0.6, sustain: 0.01, release: 0.5 },
        volume: -12,
      }).connect(bellReverb);
    }

    case 'organ': {
      const filter = new Tone.Filter({ frequency: 4500, type: 'lowpass', rolloff: -12 }).connect(toneRack);
      const dist = new Tone.Distortion({ distortion: 0.08, wet: 0.15 }).connect(filter);
      const vibrato = new Tone.Vibrato({ frequency: 5.8, depth: 0.12, wet: 0.55 }).connect(dist);
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsine', count: 3, spread: 15 },
        envelope: { attack: 0.008, decay: 0.15, sustain: 0.9, release: 0.25 },
        volume: -12,
      }).connect(vibrato);
    }

    case 'pad-strings': {
      const reverb = new Tone.Reverb({ decay: 5.5, preDelay: 0.03, wet: 0.45 }).connect(toneRack);
      const chorus = new Tone.Chorus({ frequency: 0.45, delayTime: 4.0, depth: 0.5, wet: 0.4 }).start(0).connect(reverb);
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsawtooth', count: 3, spread: 22 },
        envelope: { attack: 0.65, decay: 0.8, sustain: 0.85, release: 2.5 },
        volume: -13,
      }).connect(chorus);
    }

    case 'juno-pad': {
      const chorus = new Tone.Chorus({ frequency: 0.85, delayTime: 3.5, depth: 0.72, wet: 0.55 }).start(0).connect(toneRack);
      return new Tone.PolySynth(Tone.MonoSynth, {
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
      }).connect(chorus);
    }

    case 'stab': {
      const dist = new Tone.Distortion({ distortion: 0.1, wet: 0.12 }).connect(toneRack);
      const reverb = new Tone.Reverb({ decay: 1.0, wet: 0.22 }).connect(dist);
      return new Tone.PolySynth(Tone.MonoSynth, {
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
      }).connect(reverb);
    }

    case 'jazz-guitar': {
      const jazzEq = new Tone.EQ3({
        low: -1.0,
        mid: 2.0,
        high: -3.5,
        lowFrequency: 480,
        highFrequency: 2800,
      }).connect(toneRack);
      const jazzFilter = new Tone.Filter({
        frequency: 2800,
        type: 'lowpass',
        rolloff: -12,
      }).connect(jazzEq);
      const jazzReverb = new Tone.Reverb({
        decay: 1.8,
        preDelay: 0.02,
        wet: 0.18,
      }).connect(jazzFilter);

      if (loadedBuffers && Object.keys(loadedBuffers).length > 0) {
        return new Tone.Sampler({
          urls: loadedBuffers,
          volume: -8,
        }).connect(jazzReverb);
      }
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.005, decay: 0.7, sustain: 0.08, release: 0.9 },
        volume: -8,
      }).connect(jazzReverb);
    }

    case 'sh101': {
      const chorus = new Tone.Chorus({
        frequency: 0.25,
        delayTime: 4.2,
        depth: 0.6,
        wet: 0.35,
      }).start(0).connect(toneRack);
      const filter = new Tone.Filter({
        frequency: 3400,
        type: 'lowpass',
        rolloff: -12,
      }).connect(chorus);
      const dist = new Tone.Distortion({
        distortion: 0.12,
        wet: 0.18,
      }).connect(filter);
      const vibrato = new Tone.Vibrato({
        frequency: 0.45,
        depth: 0.18,
        wet: 0.65,
      }).connect(dist);

      return new Tone.PolySynth(Tone.MonoSynth, {
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
      }).connect(vibrato);
    }

    case 'guitar':
      if (loadedBuffers && Object.keys(loadedBuffers).length > 0) {
        return new Tone.Sampler({
          urls: loadedBuffers,
          volume: -8,
        }).connect(toneRack);
      }
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.004, decay: 0.6, sustain: 0.05, release: 0.8 },
        volume: -8,
      }).connect(toneRack);

    case 'rhodes':
    case 'epiano':
      if (loadedBuffers && Object.keys(loadedBuffers).length > 0) {
        return new Tone.Sampler({
          urls: loadedBuffers,
          volume: -10,
        }).connect(toneRack);
      }
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 2,
        modulationIndex: 3.5,
        envelope: { attack: 0.008, decay: 0.6, sustain: 0.25, release: 1.2 },
        modulationEnvelope: { attack: 0.008, decay: 0.4, sustain: 0.1, release: 0.6 },
        volume: -10,
      }).connect(toneRack);

    case 'piano':
    default:
      if (loadedBuffers && Object.keys(loadedBuffers).length > 0) {
        return new Tone.Sampler({
          urls: loadedBuffers,
          volume: -9,
        }).connect(toneRack);
      }
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.005, decay: 0.8, sustain: 0.15, release: 1.0 },
        volume: -9,
      }).connect(toneRack);
  }
}

/**
 * Encodes an AudioBuffer into 16-bit PCM WAV Blob.
 */
function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  const length = buffer.length * numChannels * bytesPerSample;
  const wavBuffer = new ArrayBuffer(44 + length);
  const view = new DataView(wavBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, length, true);

  const channels: Float32Array[] = [];
  for (let i = 0; i < numChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([new Uint8Array(wavBuffer) as unknown as BlobPart], { type: 'audio/wav' });
}

/**
 * Offline renders audio for the progression matching configured instrument & play style and triggers a WAV download.
 */
export async function downloadWav(
  progression: Progression,
  order?: number[],
  instrumentName?: string | null,
  playStyleName?: string | null,
  barsPerChord = 1,
  feelSettings?: FeelSettings
): Promise<void> {
  const events = generateScheduledEvents(progression, order, playStyleName, barsPerChord, feelSettings);
  if (!events.length) return;

  const chordsToExport: ChordBlock[] = (order && order.length > 0)
    ? order.map(i => progression.chords[i]).filter((c): c is ChordBlock => Boolean(c))
    : progression.chords;

  const bpm = progression.bpm || 120;
  const stepDuration = (barsPerChord * 240) / bpm;
  // 1 full loop cycle trimmed strictly to the bar grid (seamless loop for DAWs, no tail)
  const totalDuration = Math.max(0.1, chordsToExport.length * stepDuration);

  const cleanName = instrumentName ? normalizeInstrumentName(instrumentName) : undefined;
  const userInst = cleanName
    ? USER_INSTRUMENTS.find(i => i.name.toLowerCase() === cleanName.toLowerCase())
    : undefined;
  const instId: InstrumentId = userInst?.instrument ?? (progression.genre ? GENRE_INSTRUMENT[progression.genre] : undefined) ?? 'piano';

  await ensureSamplerLoaded(instId);
  const loadedBuffers = getLoadedSamplerBuffers(instId);
  const toneName = feelSettings?.tone || 'Warm';

  const renderedBuffer = await Tone.Offline(async () => {
    const voice = createOfflineVoice(cleanName || instrumentName, progression.genre, toneName, loadedBuffers);
    events.forEach(evt => {
      if (evt.startTime < totalDuration) {
        (voice as any).triggerAttackRelease(evt.note, evt.duration, evt.startTime);
      }
    });
  }, totalDuration);

  const wavBlob = audioBufferToWavBlob(renderedBuffer.get()!);
  const key = (progression.key || 'C').toLowerCase();
  const mood = (progression.mood || 'progression').toLowerCase().replace(/\s+/g, '-');
  const filename = `chroma-chords-${key}-${mood}-${bpm}bpm.wav`;
  triggerDownload(wavBlob, filename);
}

/**
 * Renders individual or combined stems (Chords, Melody, Both) to WAV files.
 */
export async function downloadStemWav(
  target: 'chords' | 'melody' | 'both',
  progression: Progression,
  melodyTrack?: MelodyTrack | null,
  options: {
    order?: number[];
    instrumentName?: string | null;
    playStyleName?: string | null;
    barsPerChord?: number;
    feelSettings?: FeelSettings;
  } = {}
): Promise<void> {
  const { order, instrumentName, playStyleName, barsPerChord = 1, feelSettings } = options;
  const bpm = progression.bpm || 120;
  const key = (progression.key || 'C').toLowerCase();
  const mood = (progression.mood || 'progression').toLowerCase().replace(/\s+/g, '-');

  if (target === 'chords' || target === 'both') {
    await downloadWav(progression, order, instrumentName, playStyleName, barsPerChord, feelSettings);
  }

  if ((target === 'melody' || target === 'both') && melodyTrack && melodyTrack.notes?.length) {
    const chordsToExport = (order && order.length > 0)
      ? order.map(i => progression.chords[i]).filter((c): c is ChordBlock => Boolean(c))
      : progression.chords;
    const stepDuration = (barsPerChord * 240) / bpm;
    const totalDuration = Math.max(0.1, chordsToExport.length * stepDuration);

    const renderedBuffer = await Tone.Offline(async () => {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.15, sustain: 0.6, release: 0.2 },
      }).toDestination();

      const maxBar = melodyTrack.notes.reduce((max, n) => Math.max(max, n.barIndex), 0);
      for (let b = 0; b <= maxBar; b++) {
        const barNotes = melodyTrack.notes.filter(n => n.barIndex === b);
        if (!barNotes.length) continue;
        const barStartTime = b * stepDuration;
        const scheduled = melodyEngine.applyHumanFeel(barNotes, melodyTrack.feelSettings, bpm);
        scheduled.forEach(evt => {
          const noteTime = barStartTime + evt.time;
          if (noteTime < totalDuration) {
            synth.triggerAttackRelease(evt.note, evt.duration, noteTime, evt.velocity / 127);
          }
        });
      }
    }, totalDuration);

    const wavBlob = audioBufferToWavBlob(renderedBuffer.get()!);
    const filename = `chroma-melody-${key}-${mood}-${bpm}bpm.wav`;
    triggerDownload(wavBlob, filename);
  }
}

function triggerDownload(blob: Blob, filename: string): void {
  if (typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') return;
  const url = URL.createObjectURL(blob);
  if (typeof document === 'undefined') return;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export interface BounceLoopOptions {
  progression: Progression;
  setName?: string;
  instrumentName?: string | null;
  playStyleName?: string | null;
  format?: 'wav' | 'midi';
  barsPerChord?: number;
  feelSettings?: FeelSettings;
}

/**
 * Bounces the active loop into a named file with chords and sub-bass stem (with 2-bar tail).
 */
export async function bounceLoop(options: BounceLoopOptions): Promise<void> {
  const { progression, setName, instrumentName, playStyleName, format = 'wav', barsPerChord = 1, feelSettings } = options;
  const bpm = progression.bpm || 84;
  const key = progression.key || 'C';
  const scale = (progression.scaleType || 'maj').toLowerCase().includes('min') ? 'min' : 'maj';
  const rawName = setName || progression.mood || 'loop';
  const slug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'loop';
  const ext = format === 'midi' ? 'mid' : 'wav';
  const filename = `${slug}_${bpm}bpm_${key}${scale}.${ext}`;

  if (format === 'midi') {
    const buffer = generateMidiBuffer(progression, undefined, playStyleName, barsPerChord, feelSettings);
    const blob = new Blob([buffer as unknown as BlobPart], { type: 'audio/midi' });
    triggerDownload(blob, filename);
    return;
  }

  // Render WAV with tail
  const events = generateScheduledEvents(progression, undefined, playStyleName, barsPerChord, feelSettings);
  const maxTime = events.reduce((max, e) => Math.max(max, e.startTime + e.duration), 0);
  const stepDuration = (barsPerChord * 240) / bpm;
  const totalDuration = Math.max(4, maxTime + stepDuration * 2); // 2-chord tail

  const cleanName = instrumentName ? normalizeInstrumentName(instrumentName) : undefined;
  const userInst = cleanName
    ? USER_INSTRUMENTS.find(i => i.name.toLowerCase() === cleanName.toLowerCase())
    : undefined;
  const instId: InstrumentId = userInst?.instrument ?? (progression.genre ? GENRE_INSTRUMENT[progression.genre] : undefined) ?? 'piano';

  await ensureSamplerLoaded(instId);
  const loadedBuffers = getLoadedSamplerBuffers(instId);

  const renderedBuffer = await Tone.Offline(async () => {
    const voice = createOfflineVoice(cleanName || instrumentName, progression.genre, 'Warm', loadedBuffers);
    events.forEach(evt => {
      (voice as any).triggerAttackRelease(evt.note, evt.duration, evt.startTime);
    });

    // Sub-bass layer
    const subVoice = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.02, decay: 0.25, sustain: 0.85, release: 0.4 },
      volume: -7,
    }).toDestination();

    progression.chords.forEach((chord, i) => {
      const root = (chord.notes && chord.notes[0]) || chord.name.match(/^[A-Ga-g][#b]?/)?.[0] || 'C';
      const clean = root.replace(/\d+$/, '');
      subVoice.triggerAttackRelease(`${clean}1`, stepDuration * 0.9, i * stepDuration);
    });
  }, totalDuration);

  const wavBlob = audioBufferToWavBlob(renderedBuffer.get()!);
  triggerDownload(wavBlob, filename);
}

