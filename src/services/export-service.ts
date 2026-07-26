import * as Tone from 'tone';
import { Progression, ChordBlock } from './chord-engine';
import {
  USER_INSTRUMENTS, USER_PLAY_STYLES, GENRE_HUMANIZE, GENRE_INSTRUMENT, InstrumentId,
  arpRateToSeconds, expandNotesAcrossOctaves, orderNotesForArp
} from './audio-service';

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
  playStyleName?: string | null
): ScheduledNoteEvent[] {
  const chordsToExport: ChordBlock[] = (order && order.length > 0)
    ? order.map(i => progression.chords[i]).filter((c): c is ChordBlock => Boolean(c))
    : progression.chords;

  const bpm = progression.bpm || 120;
  // Chord step pace in app: AUTOPLAY_INTERVAL_MS = 1.7s
  const stepDuration = 1.7;

  const userPlayStyle = playStyleName
    ? USER_PLAY_STYLES.find(p => p.name.toLowerCase() === playStyleName.toLowerCase())
    : undefined;

  const profile = GENRE_HUMANIZE[progression.genre] || {};
  const stylePatch = (userPlayStyle?.patch ?? {}) as Record<string, any>;
  const humanState = { ...profile, ...stylePatch, bpm };

  const baseDuration = profile.duration ?? 0.9;
  const duration = stylePatch.durationMultiplier ? baseDuration * stylePatch.durationMultiplier : baseDuration;

  const events: ScheduledNoteEvent[] = [];

  chordsToExport.forEach((chord, barIdx) => {
    const barStartTime = barIdx * stepDuration;
    const rawNotes = chord.notes && chord.notes.length > 0 ? chord.notes : ['C', 'E', 'G'];
    const pitchedNotes = rawNotes.map(n => `${n}4`);

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
      const spread = humanState.spread ?? 0;
      pitchedNotes.forEach((noteName, index) => {
        const stagger = index * spread * 0.1;
        const startTime = barStartTime + stagger;
        events.push({
          note: noteName,
          midi: noteToMidiNumber(noteName),
          startTime,
          duration,
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
}

/**
 * Generates a Standard MIDI File (.mid) binary buffer matching live playback note pitch registers and timings.
 */
export function generateMidiBuffer(
  progression: Progression,
  order?: number[],
  playStyleName?: string | null
): Uint8Array {
  const bpm = progression.bpm || 120;
  const ticksPerQuarter = 480;

  const scheduledEvents = generateScheduledEvents(progression, order, playStyleName);

  const rawEvents: MidiRawEvent[] = [];
  scheduledEvents.forEach(evt => {
    const startTick = Math.round((evt.startTime / (60 / bpm)) * ticksPerQuarter);
    const durTicks = Math.max(1, Math.round((evt.duration / (60 / bpm)) * ticksPerQuarter));
    rawEvents.push({ tick: startTick, type: 'on', midi: evt.midi });
    rawEvents.push({ tick: startTick + durTicks, type: 'off', midi: evt.midi });
  });

  rawEvents.sort((a, b) => {
    if (a.tick !== b.tick) return a.tick - b.tick;
    if (a.type !== b.type) return a.type === 'off' ? -1 : 1;
    return a.midi - b.midi;
  });

  const trackEvents: number[] = [];

  // Set Tempo Meta Event: Delta 0, 0xFF 0x51 0x03
  const mpqn = Math.round(60_000_000 / bpm);
  trackEvents.push(0x00);
  trackEvents.push(0xFF, 0x51, 0x03);
  trackEvents.push((mpqn >> 16) & 0xFF, (mpqn >> 8) & 0xFF, mpqn & 0xFF);

  // Track Name Meta Event
  const trackName = 'Chroma Chords';
  trackEvents.push(0x00);
  trackEvents.push(0xFF, 0x03, trackName.length);
  for (let i = 0; i < trackName.length; i++) {
    trackEvents.push(trackName.charCodeAt(i));
  }

  let lastTick = 0;
  rawEvents.forEach(evt => {
    const delta = evt.tick - lastTick;
    lastTick = evt.tick;
    trackEvents.push(...encodeVLQ(delta));
    if (evt.type === 'on') {
      trackEvents.push(0x90, evt.midi, 0x50);
    } else {
      trackEvents.push(0x80, evt.midi, 0x00);
    }
  });

  // End of Track Meta Event
  trackEvents.push(0x00);
  trackEvents.push(0xFF, 0x2F, 0x00);

  // Header Chunk (14 bytes)
  const headerChunk = [
    0x4D, 0x54, 0x68, 0x64,
    0x00, 0x00, 0x00, 0x06,
    0x00, 0x00,
    0x00, 0x01,
    (ticksPerQuarter >> 8) & 0xFF, ticksPerQuarter & 0xFF
  ];

  // Track Chunk Header (8 bytes)
  const trackLen = trackEvents.length;
  const trackChunkHeader = [
    0x4D, 0x54, 0x72, 0x6B,
    (trackLen >> 24) & 0xFF,
    (trackLen >> 16) & 0xFF,
    (trackLen >> 8) & 0xFF,
    trackLen & 0xFF
  ];

  const result = new Uint8Array(headerChunk.length + trackChunkHeader.length + trackEvents.length);
  result.set(headerChunk, 0);
  result.set(trackChunkHeader, headerChunk.length);
  result.set(trackEvents, headerChunk.length + trackChunkHeader.length);

  return result;
}

/**
 * Downloads a Standard MIDI (.mid) file for the given progression.
 */
export function downloadMidi(
  progression: Progression,
  order?: number[],
  _instrumentName?: string | null,
  playStyleName?: string | null
): void {
  const buffer = generateMidiBuffer(progression, order, playStyleName);
  const blob = new Blob([buffer as unknown as BlobPart], { type: 'audio/midi' });
  const key = (progression.key || 'C').toLowerCase();
  const mood = (progression.mood || 'progression').toLowerCase().replace(/\s+/g, '-');
  const bpm = progression.bpm || 120;
  const filename = `chroma-chords-${key}-${mood}-${bpm}bpm.mid`;
  triggerDownload(blob, filename);
}

/**
 * Creates Tone.js synth voice matching selected user instrument with exact audio-service parameters.
 */
function createOfflineVoice(
  instrumentName?: string | null,
  genre?: string
): Tone.ToneAudioNode {
  const limiter = new Tone.Compressor({
    threshold: -6,
    ratio: 20,
    attack: 0.002,
    release: 0.1,
    knee: 3,
  }).toDestination();

  const userInstrument = instrumentName
    ? USER_INSTRUMENTS.find(i => i.name.toLowerCase() === instrumentName.toLowerCase())
    : undefined;

  const instId: InstrumentId = userInstrument?.instrument ?? (genre ? GENRE_INSTRUMENT[genre] : undefined) ?? 'rhodes';

  switch (instId) {
    case 'bell':
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 5.5,
        modulationIndex: 12,
        envelope: { attack: 0.002, decay: 1.1, sustain: 0.05, release: 0.8 },
        modulationEnvelope: { attack: 0.002, decay: 0.5, sustain: 0, release: 0.4 },
        volume: -16,
      }).connect(limiter);

    case 'epiano':
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 2,
        modulationIndex: 3.5,
        envelope: { attack: 0.008, decay: 0.6, sustain: 0.25, release: 1.2 },
        modulationEnvelope: { attack: 0.008, decay: 0.4, sustain: 0.1, release: 0.6 },
        volume: -14,
      }).connect(limiter);

    case 'guitar':
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.004, decay: 0.5, sustain: 0.05, release: 0.6 },
        volume: -13,
      }).connect(limiter);

    case 'organ':
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsquare', count: 3, spread: 20 },
        envelope: { attack: 0.015, decay: 0.1, sustain: 0.9, release: 0.35 },
        volume: -16,
      }).connect(limiter);

    case 'pad-strings': {
      const reverb = new Tone.Reverb({ decay: 4.5, wet: 0.35 }).connect(limiter);
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.9, decay: 0.4, sustain: 0.8, release: 2.8 },
        volume: -15,
      }).connect(reverb);
    }

    case 'juno-pad': {
      const chorus = new Tone.Chorus({ frequency: 0.8, delayTime: 3.5, depth: 0.7, wet: 0.5 }).start().connect(limiter);
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsawtooth', count: 3, spread: 25 },
        envelope: { attack: 0.35, decay: 0.4, sustain: 0.85, release: 1.6 },
        volume: -16,
      }).connect(chorus);
    }

    case 'stab':
      return new Tone.PolySynth(Tone.MonoSynth, {
        oscillator: { type: 'square' },
        envelope: { attack: 0.004, decay: 0.14, sustain: 0.12, release: 0.15 },
        filterEnvelope: { attack: 0.004, decay: 0.15, sustain: 0.1, release: 0.2, baseFrequency: 300, octaves: 4 },
        volume: -14,
      }).connect(limiter);

    case 'rhodes':
    default:
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 2,
        modulationIndex: 3.5,
        envelope: { attack: 0.008, decay: 0.6, sustain: 0.25, release: 1.2 },
        modulationEnvelope: { attack: 0.008, decay: 0.4, sustain: 0.1, release: 0.6 },
        volume: -12,
      }).connect(limiter);
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
  playStyleName?: string | null
): Promise<void> {
  const events = generateScheduledEvents(progression, order, playStyleName);
  if (!events.length) return;

  const maxTime = events.reduce((max, e) => Math.max(max, e.startTime + e.duration), 0);
  const totalDuration = maxTime + 1.2;

  const renderedBuffer = await Tone.Offline(async () => {
    const voice = createOfflineVoice(instrumentName, progression.genre);
    events.forEach(evt => {
      (voice as any).triggerAttackRelease(evt.note, evt.duration, evt.startTime);
    });
  }, totalDuration);

  const wavBlob = audioBufferToWavBlob(renderedBuffer.get()!);
  const key = (progression.key || 'C').toLowerCase();
  const mood = (progression.mood || 'progression').toLowerCase().replace(/\s+/g, '-');
  const bpm = progression.bpm || 120;
  const filename = `chroma-chords-${key}-${mood}-${bpm}bpm.wav`;
  triggerDownload(wavBlob, filename);
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
