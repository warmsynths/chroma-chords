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
  loaded: () => Promise.resolve(),
  start: () => Promise.resolve(),
  now: () => 0,
}));

import { PlaybackEngine } from './playback-engine';
import { Progression } from './chord-engine';

describe('PlaybackEngine Deep Module', () => {
  let engine: PlaybackEngine;

  const sampleProgression: Progression = {
    genre: 'Pop',
    mood: 'Dreamy',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [
      { name: 'C', tag: 'I', roman: 'I', color: '#fff', functionLabel: 'Tonic', notes: ['C', 'E', 'G'], scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 1 },
      { name: 'G', tag: 'V', roman: 'V', color: '#fff', functionLabel: 'Dominant', notes: ['G', 'B', 'D'], scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 2 },
    ],
  };

  beforeEach(() => {
    vi.useFakeTimers();
    engine = new PlaybackEngine();
  });

  afterEach(() => {
    engine.stopAutoplay();
    vi.useRealTimers();
  });

  it('initializes in stopped state with zero active index', () => {
    expect(engine.isPlaying()).toBe(false);
    expect(engine.getActiveIndex()).toBe(0);
    expect(engine.getProgressStep()).toBe(0);
  });

  it('starts and stops autoplay loop cleanly', () => {
    engine.setProgression(sampleProgression);
    const tickSpy = vi.fn();
    engine.subscribeTick(tickSpy);

    const playing = engine.togglePlay();
    expect(playing).toBe(true);
    expect(engine.isPlaying()).toBe(true);

    vi.advanceTimersByTime(2000);
    expect(tickSpy).toHaveBeenCalled();

    engine.togglePlay();
    expect(engine.isPlaying()).toBe(false);
  });

  it('updates order and active index position', () => {
    engine.setProgression(sampleProgression, [1, 0]);
    engine.setOrder([1, 0], 1);
    expect(engine.getActiveIndex()).toBe(1);
  });

  it('handles song mode and loops whole song across sections', () => {
    const sections = [
      { name: 'Verse', desc: '', progression: sampleProgression, order: [0, 1] },
      { name: 'Chorus', desc: '', progression: sampleProgression, order: [1, 0] },
    ];
    engine.setSong(sections);
    expect(engine.isSongMode()).toBe(true);
    expect(engine.getTotalSteps()).toBe(4);

    const tickSpy = vi.fn();
    engine.subscribeTick(tickSpy);

    engine.togglePlay();
    expect(engine.isPlaying()).toBe(true);

    vi.advanceTimersByTime(2000); // Step 1
    expect(tickSpy).toHaveBeenCalledWith(expect.any(Number), 1, 0, 4, true);

    vi.advanceTimersByTime(2000); // Step 2 (moves to section 1, index 0)
    expect(tickSpy).toHaveBeenCalledWith(expect.any(Number), 2, 1, 4, true);
  });

  it('auditions individual chords directly without requiring continuous autoplay', () => {
    engine.setProgression(sampleProgression);
    expect(engine.isPlaying()).toBe(false);

    // Can audition specific chord index or specific chord notes directly
    engine.playChordAtIndex(0, 0.8);
    engine.playChordNotes(['C4', 'E4', 'G4'], 0.8);
    expect(engine.isPlaying()).toBe(false);
  });
});

