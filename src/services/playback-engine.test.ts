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

import { PlaybackEngine, quantiseHits } from './playback-engine';
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

  it('applies AB chord override during progression playback', () => {
    engine.setProgression(sampleProgression);
    const playNotesSpy = vi.spyOn(engine, 'playChordNotes');

    const candidateChord = {
      name: 'Abmaj7',
      tag: 'bVI',
      roman: 'bVI',
      color: '#fff',
      functionLabel: 'Borrowed',
      notes: ['Ab', 'C', 'Eb', 'G'],
      scaleLabel: 'Ab Maj',
      desc: '',
      degree: 'b6',
      scaleKey: 'C',
      tension: 0.5,
    };

    // Override index 0 with candidate chord on side 'after'
    engine.setABOverride(0, candidateChord, 'after');
    engine.playActiveChord(); // activeIndex is 0
    expect(playNotesSpy).toHaveBeenCalledWith(['Ab', 'C', 'Eb', 'G'], 1.2);

    // Switch override side to 'before'
    engine.setABOverride(0, candidateChord, 'before');
    engine.playActiveChord();
    expect(playNotesSpy).toHaveBeenCalledWith(['C', 'E', 'G'], 1.2);

    // Clear override
    engine.clearABOverride();
    engine.playActiveChord();
    expect(playNotesSpy).toHaveBeenCalledWith(['C', 'E', 'G'], 1.2);
  });

  it('supports sub-bass accompaniment toggle for perform mode', () => {
    expect(engine.isSubBassEnabled()).toBe(false);
    engine.setSubBassEnabled(true);
    expect(engine.isSubBassEnabled()).toBe(true);
    engine.setSubBassEnabled(false);
    expect(engine.isSubBassEnabled()).toBe(false);
  });

  it('quantizes recorded hit positions non-destructively', () => {
    const rawHits = [
      { pos: 0.04, vel: 90, bar: 0 },
      { pos: 0.28, vel: 95, bar: 1 },
      { pos: 0.52, vel: 85, bar: 2 },
      { pos: 0.77, vel: 100, bar: 3 },
    ];

    // Off: retains original positions
    const offResult = quantiseHits(rawHits, 'Off', 4);
    expect(offResult[0].pos).toBe(0.04);
    expect(offResult[1].pos).toBe(0.28);

    // 1/16: snaps to 16th grid (0, 0.0625, 0.125, 0.1875, 0.25, 0.3125, etc.)
    const sixteenth = quantiseHits(rawHits, '1/16', 4);
    expect(sixteenth[0].pos).toBe(0.0625); // 0.04 * 16 = 0.64 -> 1/16 = 0.0625
    expect(sixteenth[1].pos).toBe(0.25);   // 0.28 * 16 = 4.48 -> 4/16 = 0.25

    // 1/8: snaps to 8th grid (0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875)
    const eighth = quantiseHits(rawHits, '1/8', 4);
    expect(eighth[0].pos).toBe(0); // 0.04 rounds to 0
    expect(eighth[1].pos).toBe(0.25); // 0.28 rounds to 2/8 = 0.25
    expect(eighth[2].pos).toBe(0.5); // 0.52 rounds to 4/8 = 0.5
    expect(eighth[3].pos).toBe(0.75); // 0.77 rounds to 6/8 = 0.75

    // Bar: snaps to bar boundary (0, 0.25, 0.5, 0.75 for 4 bars)
    const barResult = quantiseHits(rawHits, 'Bar', 4);
    expect(barResult[0].pos).toBe(0);
    expect(barResult[1].pos).toBe(0.25);
    expect(barResult[2].pos).toBe(0.5);
    expect(barResult[3].pos).toBe(0.75);
  });
});


