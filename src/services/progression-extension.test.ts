import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  generateProgression,
  extendProgression,
  injectModes,
  RawChordData,
  Progression,
  ChordBlock,
} from './chord-engine';

describe('extendProgression: Non-destructive progression extension & caching', () => {
  let chordData: RawChordData;

  beforeAll(() => {
    const jsonPath = path.resolve(__dirname, '../../public/chroma_chords_data.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    chordData = JSON.parse(raw) as RawChordData;
    injectModes(chordData);
  });

  it('preserves existing 4 chords when extending from 4 to 8', () => {
    const initial = generateProgression(chordData, 'Pop', 'Uplifting', { length: 4 });
    expect(initial.chords.length).toBe(4);

    const initialChordsSnapshot = initial.chords.map(c => ({
      name: c.name,
      roman: c.roman,
      degree: c.degree,
      notes: [...c.notes],
    }));

    const { progression: extended, cachedTailChords } = extendProgression(
      initial,
      8,
      chordData,
      []
    );

    expect(extended.chords.length).toBe(8);
    expect(cachedTailChords).toHaveLength(0);

    // Chords 0..3 must match exactly
    for (let i = 0; i < 4; i++) {
      expect(extended.chords[i].name).toBe(initialChordsSnapshot[i].name);
      expect(extended.chords[i].roman).toBe(initialChordsSnapshot[i].roman);
      expect(extended.chords[i].degree).toBe(initialChordsSnapshot[i].degree);
      expect(extended.chords[i].notes).toEqual(initialChordsSnapshot[i].notes);
    }

    // Chords 4..7 must be valid chords
    for (let i = 4; i < 8; i++) {
      expect(extended.chords[i].name).toBeTruthy();
      expect(extended.chords[i].notes.length).toBeGreaterThanOrEqual(3);
      expect(extended.chords[i].functionLabel).toBeTruthy();
    }
  });

  it('preserves custom chord overrides and latched voicings when extending', () => {
    const initial = generateProgression(chordData, 'Pop', 'Dreamy', { length: 4 });
    // Simulate user customization on chord 1
    initial.chords[1] = {
      ...initial.chords[1],
      name: 'Fmaj9#11',
      voicing: 'spread-9',
      tension: 0.88,
    };

    const { progression: extended } = extendProgression(initial, 8, chordData, []);

    expect(extended.chords[1].name).toBe('Fmaj9#11');
    expect(extended.chords[1].voicing).toBe('spread-9');
    expect(extended.chords[1].tension).toBe(0.88);
  });

  it('truncates from tail and caches truncated chords when decreasing length', () => {
    const p8 = generateProgression(chordData, 'Lo-fi/Chill', 'Warm', { length: 8 });
    expect(p8.chords.length).toBe(8);

    const tailBeforeTruncation = p8.chords.slice(4).map(c => c.name);

    const { progression: p4, cachedTailChords } = extendProgression(p8, 4, chordData, []);

    expect(p4.chords.length).toBe(4);
    expect(cachedTailChords.length).toBe(4);
    expect(cachedTailChords.map(c => c.name)).toEqual(tailBeforeTruncation);

    // First 4 chords are identical
    for (let i = 0; i < 4; i++) {
      expect(p4.chords[i].name).toBe(p8.chords[i].name);
    }
  });

  it('restores cached tail chords in exact order when stepping back up', () => {
    const p8 = generateProgression(chordData, 'R&B/Soul', 'Moody', { length: 8 });
    const originalNames = p8.chords.map(c => c.name);

    // Reduce 8 -> 4
    const { progression: p4, cachedTailChords: cache1 } = extendProgression(p8, 4, chordData, []);
    expect(p4.chords.length).toBe(4);
    expect(cache1.length).toBe(4);

    // Re-extend 4 -> 8 using cache
    const { progression: restored, cachedTailChords: cache2 } = extendProgression(
      p4,
      8,
      chordData,
      cache1
    );

    expect(restored.chords.length).toBe(8);
    expect(restored.chords.map(c => c.name)).toEqual(originalNames);
    expect(cache2.length).toBe(0);
  });

  it('handles step-by-step reduction and step-by-step restoration (8 -> 7 -> 6 -> 7 -> 8)', () => {
    const p8 = generateProgression(chordData, 'Pop', 'Uplifting', { length: 8 });
    const originalNames = p8.chords.map(c => c.name);

    // 8 -> 7
    const step7 = extendProgression(p8, 7, chordData, []);
    expect(step7.progression.chords.length).toBe(7);
    expect(step7.cachedTailChords.length).toBe(1);

    // 7 -> 6
    const step6 = extendProgression(step7.progression, 6, chordData, step7.cachedTailChords);
    expect(step6.progression.chords.length).toBe(6);
    expect(step6.cachedTailChords.length).toBe(2);

    // 6 -> 7
    const step7Restored = extendProgression(step6.progression, 7, chordData, step6.cachedTailChords);
    expect(step7Restored.progression.chords.length).toBe(7);
    expect(step7Restored.progression.chords.map(c => c.name)).toEqual(originalNames.slice(0, 7));
    expect(step7Restored.cachedTailChords.length).toBe(1);

    // 7 -> 8
    const step8Restored = extendProgression(
      step7Restored.progression,
      8,
      chordData,
      step7Restored.cachedTailChords
    );
    expect(step8Restored.progression.chords.length).toBe(8);
    expect(step8Restored.progression.chords.map(c => c.name)).toEqual(originalNames);
    expect(step8Restored.cachedTailChords.length).toBe(0);
  });

  it('clamps lengths within [1, 8]', () => {
    const initial = generateProgression(chordData, 'Pop', 'Uplifting', { length: 4 });

    const underflow = extendProgression(initial, 0, chordData, []);
    expect(underflow.progression.chords.length).toBe(1);

    const overflow = extendProgression(initial, 20, chordData, []);
    expect(overflow.progression.chords.length).toBe(8);
  });

  it('no-ops when target length equals current length', () => {
    const initial = generateProgression(chordData, 'Pop', 'Uplifting', { length: 4 });
    const dummyCache: ChordBlock[] = [{ name: 'G' } as ChordBlock];

    const res = extendProgression(initial, 4, chordData, dummyCache);
    expect(res.progression).toBe(initial);
    expect(res.cachedTailChords).toEqual(dummyCache);
  });
});
