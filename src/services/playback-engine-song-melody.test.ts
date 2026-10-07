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
const playChordForGenre = vi.fn();
vi.mock('./audio-service', async (orig) => ({
  ...(await orig<typeof import('./audio-service')>()),
  playLeadNote: (...a: unknown[]) => playLeadNote(...a),
  playChordForGenre: (...a: unknown[]) => playChordForGenre(...a),
}));

import { PlaybackEngine, withBassNote } from './playback-engine';
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

describe('song loop', () => {
  let engine: PlaybackEngine;
  const sections = (): SongSection[] => [
    { name: 'Verse', desc: '', progression: prog, order: [0, 1] },
    { name: 'Chorus', desc: '', progression: prog, order: [0, 1] },
  ];
  beforeEach(() => { vi.useFakeTimers(); engine = new PlaybackEngine(); });
  afterEach(() => { engine.stopAutoplay(); vi.useRealTimers(); });

  it('wraps to the top by default', async () => {
    engine.setSong(sections());
    engine.togglePlay('song');
    await vi.advanceTimersByTimeAsync(9000);
    expect(engine.isPlaying()).toBe(true);
  });

  it('stops and rewinds after one pass when loop is off', async () => {
    engine.setSongLoop(false);
    engine.setSong(sections());
    engine.togglePlay('song');
    expect(engine.isPlaying()).toBe(true);
    await vi.advanceTimersByTimeAsync(3500); // still inside the last chord
    expect(engine.isPlaying()).toBe(true);
    await vi.advanceTimersByTimeAsync(1000);
    expect(engine.isPlaying()).toBe(false);
    expect(engine.getActiveSectionIndex()).toBe(0);
  });
});

describe('bass note under voicings', () => {
  it('keeps the low root when a voicing is applied, like the plain chord does', () => {
    const engine = new PlaybackEngine();
    engine.setProgression(prog, [0, 1]);
    const played = () => playChordForGenre.mock.calls[playChordForGenre.mock.calls.length - 1][0] as string[];

    engine.playChordNotes(['C', 'E', 'G']);
    expect(played()[0]).toBe('C3');

    for (const voicing of ['low, root position', '1st inversion', 'up an octave']) {
      engine.playChordNotes(['C', 'E', 'G'], 1, voicing);
      expect(played()[0], voicing).toBe('C3');
      expect(played().length, voicing).toBeGreaterThan(3);
    }
  });

  it('does not double the bass if it is already there', () => {
    expect(withBassNote(['C3', 'E4', 'G4'], 'C')).toEqual(['C3', 'E4', 'G4']);
    expect(withBassNote(['E4', 'G4'], 'C4')).toEqual(['C3', 'E4', 'G4']);
  });
});
