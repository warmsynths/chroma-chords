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
  loaded: () => Promise.resolve(),
  start: () => Promise.resolve(),
  now: () => 0,
}));

import { applyVoicingToNotes } from './audio-service';

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
});
