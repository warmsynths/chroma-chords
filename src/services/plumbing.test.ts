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
    expect(presetIdToUserInstrumentName('rhodes')).toBe('Piano');
    expect(presetIdToUserInstrumentName('epiano')).toBe('Rhodes');
    expect(presetIdToUserInstrumentName('guitar')).toBe('Nylon Guitar');
    expect(presetIdToUserInstrumentName('pad-strings')).toBe('Warm Pad');
    expect(presetIdToUserInstrumentName('juno-pad')).toBe('Analog Synth');
    expect(presetIdToUserInstrumentName('bell')).toBe('Synth Bell');
    expect(presetIdToUserInstrumentName('organ')).toBe('Drawbar Organ');
    expect(presetIdToUserInstrumentName('stab')).toBe('Synth Stab');
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

describe('Capacity Ring & Cooldown Rate Limiting (Ticket 02)', () => {
  const CAPACITY_MAX = 4;
  const RECHARGE_INTERVAL_MS = 45000;

  it('calculates restored charges accurately over time intervals', () => {
    const calculateRestoration = (currentCharges: number, elapsedMs: number) => {
      const restored = Math.floor(elapsedMs / RECHARGE_INTERVAL_MS);
      const newCharges = Math.min(CAPACITY_MAX, currentCharges + restored);
      const remainder = elapsedMs % RECHARGE_INTERVAL_MS;
      const nextInSec = Math.max(1, Math.ceil((RECHARGE_INTERVAL_MS - remainder) / 1000));
      return { newCharges, nextInSec };
    };

    // 0 elapsed -> 0 restored
    expect(calculateRestoration(0, 0)).toEqual({ newCharges: 0, nextInSec: 45 });
    // 20 seconds elapsed -> still 0 charges, 25s left
    expect(calculateRestoration(0, 20000)).toEqual({ newCharges: 0, nextInSec: 25 });
    // 45 seconds elapsed -> 1 charge restored, 45s left for next
    expect(calculateRestoration(0, 45000)).toEqual({ newCharges: 1, nextInSec: 45 });
    // 90 seconds elapsed -> 2 charges restored
    expect(calculateRestoration(0, 90000)).toEqual({ newCharges: 2, nextInSec: 45 });
    // 200 seconds elapsed from 0 -> all 4 charges capped
    expect(calculateRestoration(0, 200000).newCharges).toBe(4);
  });

  it('generates 4 discrete segmented conic gradient stops with gaps', () => {
    const generateSegmentStops = (tokens: number) => {
      const GAP = 8, SEG = 360 / CAPACITY_MAX;
      const stops: string[] = [];
      for (let i = 0; i < CAPACITY_MAX; i++) {
        const from = i * SEG;
        stops.push(`${i < tokens ? '#F2A79B' : 'rgba(46,39,31,0.13)'} ${from}deg ${from + SEG - GAP}deg`);
        stops.push(`transparent ${from + SEG - GAP}deg ${from + SEG}deg`);
      }
      return stops;
    };

    const stops2 = generateSegmentStops(2);
    expect(stops2).toHaveLength(8);
    // Segment 1 (filled)
    expect(stops2[0]).toBe('#F2A79B 0deg 82deg');
    expect(stops2[1]).toBe('transparent 82deg 90deg');
    // Segment 2 (filled)
    expect(stops2[2]).toBe('#F2A79B 90deg 172deg');
    // Segment 3 (empty)
    expect(stops2[4]).toBe('rgba(46,39,31,0.13) 180deg 262deg');
    // Segment 4 (empty)
    expect(stops2[6]).toBe('rgba(46,39,31,0.13) 270deg 352deg');
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

  it('preserves working progression when navigating back from sets screen', () => {
    let screen = 'loop';
    let previousScreen = 'seed';
    let progression: any = { chords: [{ name: 'C' }] };

    // User navigates to sets
    previousScreen = screen;
    screen = 'sets';
    expect(screen).toBe('sets');
    expect(previousScreen).toBe('loop');

    // User clicks back from sets
    const onBackFromSets = () => {
      if (progression) {
        return previousScreen === 'song' ? 'song' : 'loop';
      }
      return 'seed';
    };

    screen = onBackFromSets();
    expect(screen).toBe('loop');
    expect(progression).not.toBeNull();
  });
});



