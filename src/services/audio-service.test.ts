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

import { applyVoicingToNotes, applyDensityToNotes, setMasterTone, getMasterTone } from './audio-service';

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
});
