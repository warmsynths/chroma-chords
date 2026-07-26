import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('tone', () => ({
  Compressor: class { connect() { return this; } toDestination() { return this; } },
  Sampler: class { connect() { return this; } triggerAttackRelease() {} },
  PolySynth: class { connect() { return this; } toDestination() { return this; } triggerAttackRelease() {} },
  Synth: class { triggerAttackRelease() {} },
  MonoSynth: class { triggerAttackRelease() {} },
  FMSynth: class { triggerAttackRelease() {} },
  Reverb: class { connect() { return this; } },
  Chorus: class { start() { return this; } connect() { return this; } },
  loaded: () => Promise.resolve(),
  start: () => Promise.resolve(),
  now: () => 0,
  Offline: (fn: Function) => {
    fn();
    return Promise.resolve({
      get: () => ({
        numberOfChannels: 2,
        sampleRate: 44100,
        length: 44100,
        getChannelData: () => new Float32Array(44100),
      }),
    });
  },
}));

import { noteToMidiNumber, generateMidiBuffer, generateScheduledEvents, downloadMidi, downloadWav } from './export-service';
import { Progression } from './chord-engine';

describe('export-service', () => {
  const sampleProgression: Progression = {
    genre: 'Pop',
    mood: 'Dreamy',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [
      { name: 'C', tag: 'I', roman: 'I', color: '#fff', functionLabel: 'Tonic', notes: ['C4', 'E4', 'G4'], scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 1 },
      { name: 'G', tag: 'V', roman: 'V', color: '#fff', functionLabel: 'Dominant', notes: ['G4', 'B4', 'D5'], scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 2 },
    ],
  };

  beforeEach(() => {
    const fakeAnchor = {
      href: '',
      download: '',
      click: vi.fn(),
    };
    (globalThis as any).document = {
      createElement: vi.fn().mockReturnValue(fakeAnchor),
      body: {
        appendChild: vi.fn(),
        removeChild: vi.fn(),
      },
    };
    (globalThis as any).URL = {
      createObjectURL: vi.fn().mockReturnValue('blob:mock-url'),
      revokeObjectURL: vi.fn(),
    };
  });

  afterEach(() => {
    delete (globalThis as any).document;
  });

  it('correctly maps note names to MIDI numbers', () => {
    expect(noteToMidiNumber('C4')).toBe(60);
    expect(noteToMidiNumber('A4')).toBe(69);
    expect(noteToMidiNumber('F#3')).toBe(54);
    expect(noteToMidiNumber('Db5')).toBe(73);
  });

  it('generates scheduled note events with arpeggiated step timings vs block chord timings', () => {
    const blockEvents = generateScheduledEvents(sampleProgression, undefined, 'Block chords');
    expect(blockEvents.length).toBe(6);
    expect(blockEvents[0].startTime).toBe(0);
    expect(blockEvents[1].startTime).toBe(0.03);

    const arpEvents = generateScheduledEvents(sampleProgression, undefined, 'Arpeggio');
    expect(arpEvents.length).toBe(6);
    expect(arpEvents[0].startTime).toBe(0);
    expect(arpEvents[1].startTime).toBe(0.25);
  });

  it('generates valid Standard MIDI file header and track bytes', () => {
    const buffer = generateMidiBuffer(sampleProgression, undefined, 'Arpeggio');
    expect(buffer).toBeInstanceOf(Uint8Array);
    expect(buffer.length).toBeGreaterThan(30);

    expect(buffer[0]).toBe(0x4D); // 'M'
    expect(buffer[1]).toBe(0x54); // 'T'
    expect(buffer[2]).toBe(0x68); // 'h'
    expect(buffer[3]).toBe(0x64); // 'd'
    expect(buffer[9]).toBe(0x00); // format 0
    expect(buffer[11]).toBe(0x01); // 1 track
  });

  it('handles downloadMidi without crashing', () => {
    downloadMidi(sampleProgression, undefined, 'Synth Bell', 'Arpeggio');
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('handles downloadWav without crashing', async () => {
    await downloadWav(sampleProgression, undefined, 'Synth Bell', 'Strum');
    expect(URL.createObjectURL).toHaveBeenCalled();
  });
});
