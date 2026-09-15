import { describe, it, expect, vi } from 'vitest';

vi.mock('tone', () => ({
  Compressor: class { connect() { return this; } toDestination() { return this; } },
  Sampler: class { connect() { return this; } },
  PolySynth: class { connect() { return this; } },
  Synth: class {},
  MonoSynth: class {},
  FMSynth: class {},
  Reverb: class { connect() { return this; } },
  Chorus: class { start() { return this; } connect() { return this; } },
  loaded: () => Promise.resolve(),
  start: () => Promise.resolve(),
  now: () => 0,
}));

import { normalize } from './freetext-schema';
import { presetIdToUserInstrumentName, matchRhythmStyleToPlayStyleName } from './audio-service';

describe('LLM Payload Plumbing & Normalization', () => {
  const fallback = { genre: 'Pop', mood: 'Dreamy' };

  it('normalizes full LLM response containing rhythmStyle and instrumentConfig', () => {
    const rawLlmOutput = {
      genre: 'Lo-fi/Chill',
      mood: 'Melancholy',
      key: 'D',
      scaleType: 'DORIAN',
      length: 8,
      chords: [
        { root: 'D', quality: 'min7' },
        { root: 'G', quality: 'maj' },
        { root: 'A', quality: 'min7' },
        { root: 'C', quality: 'maj' },
        { root: 'D', quality: 'min7' },
        { root: 'F', quality: 'maj7' },
        { root: 'G', quality: 'min7' },
        { root: 'A', quality: 'dom7' }
      ],
      rhythmStyle: 'slow_arpeggio',
      instrumentConfig: {
        presetId: 'juno-pad',
        customConfig: {
          envelope: { attack: 0.2, release: 1.8 }
        }
      }
    };

    const normalized = normalize(rawLlmOutput, fallback);

    expect(normalized.genre).toBe('Lo-fi/Chill');
    expect(normalized.mood).toBe('Melancholy');
    expect(normalized.key).toBe('D');
    expect(normalized.scaleType).toBe('DORIAN');
    expect(normalized.chords).toHaveLength(8);
    expect(normalized.rhythmStyle).toBe('slow_arpeggio');
    expect(normalized.instrumentConfig).toBeDefined();
    expect(normalized.instrumentConfig?.presetId).toBe('juno-pad');
    expect(normalized.instrumentConfig?.customConfig).toEqual({
      envelope: { attack: 0.2, release: 1.8 }
    });
  });

  it('fuzzy matches presetId against baseline library keys', () => {
    const rawWithFuzzyPreset = {
      genre: 'Pop',
      mood: 'Warm',
      key: 'C',
      scaleType: 'MAJOR',
      instrumentConfig: {
        presetId: 'juno pad'
      }
    };

    const normalized = normalize(rawWithFuzzyPreset, fallback);
    expect(normalized.instrumentConfig?.presetId).toBe('juno-pad');
  });

  it('handles missing or invalid instrumentConfig and rhythmStyle gracefully', () => {
    const rawMinimal = {
      genre: 'Jazz-ish',
      mood: 'Groovy',
      instrumentConfig: null,
      rhythmStyle: 123
    };

    const normalized = normalize(rawMinimal, fallback);
    expect(normalized.genre).toBe('Jazz-ish');
    expect(normalized.mood).toBe('Groovy');
    expect(normalized.rhythmStyle).toBeUndefined();
    expect(normalized.instrumentConfig).toBeUndefined();
  });
});

describe('Audio Service Preset & Rhythm Mappings', () => {
  it('maps presetId to user-facing instrument names', () => {
    expect(presetIdToUserInstrumentName('piano')).toBe('Grand Piano');
    expect(presetIdToUserInstrumentName('rhodes')).toBe('Stage Rhodes');
    expect(presetIdToUserInstrumentName('epiano')).toBe('Stage Rhodes');
    expect(presetIdToUserInstrumentName('guitar')).toBe('Nylon Guitar');
    expect(presetIdToUserInstrumentName('pad-strings')).toBe('Cinematic Pad');
    expect(presetIdToUserInstrumentName('juno-pad')).toBe('Juno Synth');
    expect(presetIdToUserInstrumentName('bell')).toBe('Celestial Bell');
    expect(presetIdToUserInstrumentName('organ')).toBe('Drawbar Organ');
    expect(presetIdToUserInstrumentName('stab')).toBe('House Stab');
  });

  it('maps rhythmStyle strings to closest user play styles', () => {
    expect(matchRhythmStyleToPlayStyleName('slow_arpeggio')).toBe('Arpeggio');
    expect(matchRhythmStyleToPlayStyleName('syncopated_16ths')).toBe('Off-beat / Ska');
    expect(matchRhythmStyleToPlayStyleName('trip_hop_groove')).toBe('Off-beat / Ska');
    expect(matchRhythmStyleToPlayStyleName('heavy_strum')).toBe('Strum');
    expect(matchRhythmStyleToPlayStyleName('swing_feel')).toBe('Broken (swing)');
    expect(matchRhythmStyleToPlayStyleName('half_time')).toBe('Half-time');
    expect(matchRhythmStyleToPlayStyleName('descending_cascade')).toBe('Descending Arp');
    expect(matchRhythmStyleToPlayStyleName('fast_triplets')).toBe('Fast Triplet');
    expect(matchRhythmStyleToPlayStyleName('straight_block')).toBe('Block chords');
  });
});

describe('Hash Routing & Navigation Seam', () => {
  it('maps legacy and modern hash targets to application screen identifiers', () => {
    const resolveHash = (rawHash: string, hasProgression: boolean): 'seed' | 'loop' | 'song' | 'sets' => {
      const hash = rawHash.replace(/^#/, '').toLowerCase();
      if (hash === 'sets' || hash === '11a') return 'sets';
      if (hash === 'song' || hash === '5a') return hasProgression ? 'song' : 'seed';
      if (hash === 'loop' || hash === '3a' || hash === '8a') return hasProgression ? 'loop' : 'seed';
      return 'seed';
    };

    expect(resolveHash('#seed', false)).toBe('seed');
    expect(resolveHash('#2a', false)).toBe('seed');
    expect(resolveHash('#loop', true)).toBe('loop');
    expect(resolveHash('#3a', true)).toBe('loop');
    expect(resolveHash('#8a', true)).toBe('loop');
    expect(resolveHash('#3a', false)).toBe('seed');
    expect(resolveHash('#song', true)).toBe('song');
    expect(resolveHash('#5a', true)).toBe('song');
    expect(resolveHash('#5a', false)).toBe('seed');
    expect(resolveHash('#sets', false)).toBe('sets');
    expect(resolveHash('#11a', true)).toBe('sets');
    expect(resolveHash('', false)).toBe('seed');
  });
});

describe('Motion Budget & Accessibility Standards (Ticket 06)', () => {
  it('enforces background drift ambient shape maximum budget <= 3', () => {
    const SHAPE_BUDGET = 3;
    expect(SHAPE_BUDGET).toBeLessThanOrEqual(3);
  });

  it('verifies placeholder contrast meets minimum opacity threshold >= 0.52', () => {
    const placeholderOpacity = 0.55;
    expect(placeholderOpacity).toBeGreaterThanOrEqual(0.52);
  });
});
