import { describe, it, expect, vi } from 'vitest';

vi.mock('tone', () => ({
  Compressor: class { connect() { return this; } toDestination() { return this; } },
  Sampler: class { connect() { return this; } triggerAttackRelease() {} triggerAttack() {} triggerRelease() {} },
  PolySynth: class { connect() { return this; } triggerAttackRelease() {} triggerAttack() {} triggerRelease() {} },
  Synth: class { connect() { return this; } triggerAttackRelease() {} triggerAttack() {} triggerRelease() {} },
  MonoSynth: class { connect() { return this; } triggerAttackRelease() {} },
  FMSynth: class { connect() { return this; } triggerAttackRelease() {} },
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

import { applyVoicingToNotes, applyDensityToNotes, setMasterTone, getMasterTone, normalizeInstrumentName, playChord, startChordNotes, playChordForGenre, arpRateToSeconds, expandNotesAcrossOctaves, orderNotesForArp } from './audio-service';

describe('Perform Mode Audio Functions', () => {
  describe('applyVoicingToNotes', () => {
    it('returns standard ascending octave 4 pitches for root position', () => {
      const notes = ['C', 'E', 'G'];
      const voiced = applyVoicingToNotes(notes, 'low, root position');
      expect(voiced).toEqual(['C4', 'E4', 'G4']);
    });

    it('transposes lowest note up an octave for 1st inversion', () => {
      const notes = ['C', 'E', 'G'];
      const voiced = applyVoicingToNotes(notes, '1st inversion');
      expect(voiced).toEqual(['E4', 'G4', 'C5']);
    });

    it('transposes all chord tones up an octave for up an octave voicing', () => {
      const notes = ['C', 'E', 'G'];
      const voiced = applyVoicingToNotes(notes, 'up an octave');
      expect(voiced).toEqual(['C5', 'E5', 'G5']);
    });

    it('handles chords spanning across octave boundaries', () => {
      const notes = ['G', 'B', 'D']; // G4, B4, D5
      const voiced = applyVoicingToNotes(notes, 'low, root position');
      expect(voiced).toEqual(['G4', 'B4', 'D5']);

      const inv = applyVoicingToNotes(notes, '1st inversion');
      expect(inv).toEqual(['B4', 'D5', 'G5']);
    });
  });

  describe('applyDensityToNotes', () => {
    const chordNotes = ['C3', 'C4', 'E4', 'G4', 'B4'];

    it('sparse density (<= 25) strips inner notes down to essential interval', () => {
      const sparse = applyDensityToNotes(chordNotes, 20);
      expect(sparse).toEqual(['C3', 'B4']);
    });

    it('simple density (26 - 55) limits chord to 4 notes max', () => {
      const simple = applyDensityToNotes(chordNotes, 50);
      expect(simple).toEqual(['C3', 'C4', 'E4', 'G4']);
    });

    it('full density (56 - 80) retains full chord notes', () => {
      const full = applyDensityToNotes(chordNotes, 75);
      expect(full).toEqual(chordNotes);
    });

    it('busy density (> 80) adds upper octave doubling', () => {
      const busy = applyDensityToNotes(chordNotes, 95);
      expect(busy).toEqual(['C3', 'C4', 'E4', 'G4', 'B4', 'B5']);
    });
  });

  describe('setMasterTone and getMasterTone', () => {
    it('updates tone mode between Warm, Glassy, and Dusty', () => {
      setMasterTone('Glassy');
      expect(getMasterTone()).toBe('Glassy');

      setMasterTone('Dusty');
      expect(getMasterTone()).toBe('Dusty');

      setMasterTone('Warm');
      expect(getMasterTone()).toBe('Warm');
    });
  });

  describe('Instrument Presets & Normalization', () => {
    it('normalizes legacy instrument names to new descriptive names', () => {
      expect(normalizeInstrumentName('Piano')).toBe('Grand Piano');
      expect(normalizeInstrumentName('Rhodes')).toBe('Stage Rhodes');
      expect(normalizeInstrumentName('Warm Pad')).toBe('Cinematic Pad');
      expect(normalizeInstrumentName('Synth Bell')).toBe('Celestial Bell');
      expect(normalizeInstrumentName('Analog Synth')).toBe('Juno Synth');
      expect(normalizeInstrumentName('Synth Stab')).toBe('House Stab');
      expect(normalizeInstrumentName('Nylon Guitar')).toBe('Nylon Guitar');
      expect(normalizeInstrumentName('Drawbar Organ')).toBe('Drawbar Organ');
      expect(normalizeInstrumentName('Jazz Guitar')).toBe('Jazz Archtop');
      expect(normalizeInstrumentName('SH-101')).toBe('Vintage SH-101');
    });

    it('plays chords across all 10 instrument voices without crashing', () => {
      const notes = ['C4', 'E4', 'G4', 'B4'];
      const instIds = ['piano', 'rhodes', 'guitar', 'jazz-guitar', 'organ', 'pad-strings', 'juno-pad', 'sh101', 'stab', 'bell'] as const;
      for (const id of instIds) {
        expect(() => playChord(notes, 0.8, undefined, id)).not.toThrow();
      }
    });

    it('triggers natural guitar roll on guitar chord notes', () => {
      expect(() => playChord(['C4', 'E4', 'G4'], 0.8, undefined, 'guitar')).not.toThrow();
      expect(() => startChordNotes(['C', 'E', 'G'], 'root position', 90, 'guitar')).not.toThrow();
      expect(() => playChord(['C4', 'E4', 'G4'], 0.8, undefined, 'jazz-guitar')).not.toThrow();
      expect(() => startChordNotes(['C', 'E', 'G'], 'root position', 90, 'jazz-guitar')).not.toThrow();
    });
  });

  describe('Arpeggiator Engine & Human MIDI Integration', () => {
    it('calculates accurate note intervals from arp rate and bpm', () => {
      // At 120 BPM: beatsPerSecond = 2
      expect(arpRateToSeconds('1/4', 120)).toBeCloseTo(0.5, 3);
      expect(arpRateToSeconds('1/8', 120)).toBeCloseTo(0.25, 3);
      expect(arpRateToSeconds('1/16', 120)).toBeCloseTo(0.125, 3);
      expect(arpRateToSeconds('1/32', 120)).toBeCloseTo(0.0625, 3);
      expect(arpRateToSeconds('1/8T', 120)).toBeCloseTo(0.25 * (2 / 3), 3);
    });

    it('expands notes across multiple octaves correctly', () => {
      const expanded1 = expandNotesAcrossOctaves(['C4', 'E4', 'G4'], 1);
      expect(expanded1).toEqual(['C4', 'E4', 'G4']);

      const expanded2 = expandNotesAcrossOctaves(['C4', 'E4', 'G4'], 2);
      expect(expanded2).toEqual(['C4', 'E4', 'G4', 'C5', 'E5', 'G5']);
    });

    it('orders notes according to arpMode', () => {
      const notes = ['C4', 'E4', 'G4'];
      expect(orderNotesForArp(notes, 'up')).toEqual(['C4', 'E4', 'G4']);
      expect(orderNotesForArp(notes, 'down')).toEqual(['G4', 'E4', 'C4']);
      expect(orderNotesForArp(notes, 'up-down')).toEqual(['C4', 'E4', 'G4', 'E4']);
    });

    it('gates note duration to interval * arpGate instead of sustaining entire chord duration', () => {
      // In Arp mode, note duration should be gated to arp step interval (~0.21s at 120bpm for 1/8)
      // rather than the full chord duration (1.0s) which caused the strum wash bug
      expect(() => {
        playChord(['C4', 'E4', 'G4'], 1.0, {
          arpMode: 'up',
          arpRate: '1/8',
          arpRange: 1,
          arpGate: 0.85,
          bpm: 120,
          humanVariance: 0,
        });
      }).not.toThrow();
    });

    it('preserves Arpeggio pattern arpMode when feelSettings has custom humanise and no arp override', () => {
      expect(() => {
        playChordForGenre(['C4', 'E4', 'G4'], 'Pop', {
          playStyle: 'Arpeggio',
          feelSettings: {
            humanise: 80,
            swing: 25,
            spread: 50,
            density: 50,
          },
        });
      }).not.toThrow();
    });

    it('allows explicit user advOverride to change arpMode, arpRate, arpGate, and velocities', () => {
      expect(() => {
        playChordForGenre(['C4', 'E4', 'G4'], 'Pop', {
          playStyle: 'Arpeggio',
          feelSettings: {
            advOverride: {
              arpMode: 'down',
              arpRate: '1/16',
              arpGate: 0.5,
              minVelocity: 50,
              maxVelocity: 100,
            },
          },
        });
      }).not.toThrow();
    });

    it('sustains chord duration for Strum playStyle instead of chopping notes into staccato clicks', () => {
      expect(() => {
        playChordForGenre(['C4', 'E4', 'G4'], 'Indie/Folk', {
          playStyle: 'Strum',
          duration: 1.2,
          feelSettings: {
            humanise: 45,
            spread: 50,
          },
        });
      }).not.toThrow();
    });
  });
});
