import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('tone', () => ({
  Compressor: class { connect() { return this; } toDestination() { return this; } },
  Sampler: class { connect() { return this; } triggerAttackRelease() {} },
  PolySynth: class { connect() { return this; } triggerAttackRelease() {} },
  Synth: class { triggerAttackRelease() {} },
  MonoSynth: class { triggerAttackRelease() {} },
  FMSynth: class { triggerAttackRelease() {} },
  Reverb: class { connect() { return this; } },
  Chorus: class { start() { return this; } connect() { return this; } },
  Gain: class { connect() { return this; } gain = { rampTo: vi.fn(), value: 1 }; },
  Filter: class { connect() { return this; } },
  EQ3: class { connect() { return this; } },
  Vibrato: class { connect() { return this; } },
  Distortion: class { connect() { return this; } },
  loaded: () => Promise.resolve(),
  start: () => Promise.resolve(),
  now: () => 0,
}));

const playLeadNote = vi.fn();
vi.mock('./audio-service', async (orig) => ({
  ...(await orig<typeof import('./audio-service')>()),
  playLeadNote: (...a: unknown[]) => playLeadNote(...a),
  playChordForGenre: vi.fn(),
}));

import { PlaybackEngine } from './playback-engine';
import type { SongSection } from './song-arranger';

const chord = (name: string) => ({ name, tag: 'd', roman: 'I', color: '#fff', functionLabel: 'Tonic', notes: ['C4', 'E4', 'G4'], scaleLabel: '', desc: '', degree: '1', scaleKey: 'C', tension: 0.1 });
const prog = { genre: 'Pop', mood: 'Dreamy', key: 'C', scaleType: 'MAJOR', bpm: 600, chords: [chord('C'), chord('F')] } as any;
const track = (pitch: string) => ({ id: pitch, muted: false, notes: [{ id: 'n', barIndex: 0, stepInBar: 0, beatOffset: 0, durationBeats: 0.25, pitch, midi: 60, velocity: 100 }] }) as any;

describe('song playback uses each section\'s own melody', () => {
  let engine: PlaybackEngine;
  beforeEach(() => { vi.useFakeTimers(); playLeadNote.mockClear(); engine = new PlaybackEngine(); });
  afterEach(() => { engine.stopAutoplay(); vi.useRealTimers(); });

  it('plays the notes of the section that is playing, not the one being edited', async () => {
    const sections: SongSection[] = [
      { name: 'Verse', desc: '', progression: prog, order: [0, 1], melodyTrack: track('E4') },
      { name: 'Chorus', desc: '', progression: prog, order: [0, 1], melodyTrack: track('A5') },
    ];
    // the melody being edited in the Melody tab is the Verse's...
    engine.setMelodyTrack(sections[0].melodyTrack!);
    engine.setSong(sections);
    (engine as any).playing = true;

    // ...but the song is now in the Chorus
    (engine as any).activeSectionIndex = 1;
    (engine as any).activeIndex = 0;
    engine.playActiveChord();
    await vi.advanceTimersByTimeAsync(50);

    const pitches = playLeadNote.mock.calls.map(c => c[0]);
    expect(pitches).toContain('A5');
    expect(pitches).not.toContain('E4');
  });

  it('plays no melody for a section that has none', async () => {
    engine.setMelodyTrack(track('E4'));
    engine.setSong([{ name: 'Verse', desc: '', progression: prog, order: [0, 1] }]);
    (engine as any).playing = true;
    engine.playActiveChord();
    await vi.advanceTimersByTimeAsync(50);
    expect(playLeadNote).not.toHaveBeenCalled();
  });
});
