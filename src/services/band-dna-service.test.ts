import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { RawChordData, injectModes } from './chord-engine';
import {
  BAND_ARCHETYPES,
  getBandById,
  generateBandProgression,
  resolveBandTrickForScale,
  matchChordToBandTrick,
  getBandTrickCandidates,
} from './band-dna-service';

describe('Band DNA Service: Universal Key-Agnostic Harmonic Engine', () => {
  let chordData: RawChordData;

  beforeAll(() => {
    const jsonPath = path.resolve(__dirname, '../../public/chroma_chords_data.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    chordData = JSON.parse(raw) as RawChordData;
    injectModes(chordData);
  });
  it('loads all 6 band archetypes with complete configurations', () => {
    const bandIds = ['oasis', 'beatles', 'radiohead', 'nirvana', 'steely-dan', 'mac-demarco'];
    bandIds.forEach(id => {
      const band = getBandById(id);
      expect(band).toBeDefined();
      expect(band!.signatureTricks.length).toBeGreaterThanOrEqual(3);
      expect(band!.cMajorBasisChords.length).toBe(8);
      expect(band!.presetId).toBeDefined();
      expect(band!.rhythmStyle).toBeDefined();
    });
  });

  describe('resolveBandTrickForScale: Key Generalization', () => {
    it('resolves Oasis Major III and ♭VII in C Major', () => {
      const oasis = getBandById('oasis')!;
      const major3Trick = oasis.signatureTricks.find(t => t.id === 'oasis-major-iii')!;
      const b7Trick = oasis.signatureTricks.find(t => t.id === 'oasis-bvii')!;

      const resMaj3 = resolveBandTrickForScale(major3Trick, 'C', 'MAJOR');
      expect(resMaj3.chordName).toBe('E7');
      expect(resMaj3.root).toBe('E');

      const resB7 = resolveBandTrickForScale(b7Trick, 'C', 'MAJOR');
      expect(resB7.chordName).toBe('Bb');
      expect(resB7.root).toBe('Bb');
    });

    it('resolves Oasis Major III and ♭VII in G Major', () => {
      const oasis = getBandById('oasis')!;
      const major3Trick = oasis.signatureTricks.find(t => t.id === 'oasis-major-iii')!;
      const b7Trick = oasis.signatureTricks.find(t => t.id === 'oasis-bvii')!;

      const resMaj3 = resolveBandTrickForScale(major3Trick, 'G', 'MAJOR');
      expect(resMaj3.chordName).toBe('B7');
      expect(resMaj3.root).toBe('B');

      const resB7 = resolveBandTrickForScale(b7Trick, 'G', 'MAJOR');
      expect(resB7.chordName).toBe('F');
      expect(resB7.root).toBe('F');
    });

    it('resolves Beatles minor iv in C Major and D Major', () => {
      const beatles = getBandById('beatles')!;
      const minor4 = beatles.signatureTricks.find(t => t.id === 'beatles-minor-iv')!;

      const resC = resolveBandTrickForScale(minor4, 'C', 'MAJOR');
      expect(resC.chordName).toBe('Fm');

      const resD = resolveBandTrickForScale(minor4, 'D', 'MAJOR');
      expect(resD.chordName).toBe('Gm');
    });

    it('resolves Steely Dan tritone substitution in C Major and F Major', () => {
      const steely = getBandById('steely-dan')!;
      const tritone = steely.signatureTricks.find(t => t.id === 'steely-tritone-sub')!;

      const resC = resolveBandTrickForScale(tritone, 'C', 'MAJOR');
      expect(resC.chordName).toBe('Db7');

      const resF = resolveBandTrickForScale(tritone, 'F', 'MAJOR');
      expect(resF.chordName).toBe('Gb7');
    });
  });

  describe('generateBandProgression: Dynamic Progression Generation', () => {
    it('generates an 8-chord progression with authentic band BPM and genre', () => {
      const prog = generateBandProgression(chordData, 'oasis', 'C', 'MAJOR');
      expect(prog).not.toBeNull();
      expect(prog!.chords.length).toBe(8);
      expect(prog!.bpm).toBe(116);
      expect(prog!.genre).toBe('Rock');
    });

    it('generates variety across multiple calls (non-deterministic dynamic engine)', () => {
      const prog1 = generateBandProgression(chordData, 'oasis', 'C', 'MAJOR')!;
      const names1 = prog1.chords.map(c => c.name).join(',');

      // Run multiple times and ensure we get at least 2 distinct progressions
      let sawVariation = false;
      for (let i = 0; i < 15; i++) {
        const progNext = generateBandProgression(chordData, 'oasis', 'C', 'MAJOR')!;
        const namesNext = progNext.chords.map(c => c.name).join(',');
        if (namesNext !== names1) {
          sawVariation = true;
          break;
        }
      }
      expect(sawVariation).toBe(true);
    });

    it('stays within band favored keys and scales when no key is pre-locked', () => {
      const prog = generateBandProgression(chordData, 'radiohead')!;
      expect(prog).not.toBeNull();
      expect(prog.chords.length).toBe(8);
      const band = getBandById('radiohead')!;
      expect(band.favoredKeys).toContain(prog.key);
      expect(band.favoredScales).toContain(prog.scaleType);
    });

    it('weaves signature band tricks into generated progressions', () => {
      // Oasis in C has tricks E7, Bb, Eb, Fm
      const oasisTricksInC = ['E7', 'Bb', 'Eb', 'Fm', 'Fmaj7'];
      let foundOasisTrick = false;
      for (let i = 0; i < 10; i++) {
        const prog = generateBandProgression(chordData, 'oasis', 'C', 'MAJOR')!;
        const names = prog.chords.map(c => c.name);
        if (names.some(n => oasisTricksInC.includes(n))) {
          foundOasisTrick = true;
          break;
        }
      }
      expect(foundOasisTrick).toBe(true);
    });

    it('generates a Radiohead progression in G with authentic dark/melancholic feel', () => {
      const prog = generateBandProgression(chordData, 'radiohead', 'G', 'NATURAL_MINOR');
      expect(prog).not.toBeNull();
      expect(prog!.chords.length).toBe(8);
      expect(prog!.bpm).toBe(84);
    });
  });

  describe('matchChordToBandTrick: Visual Badge Detection', () => {
    it('detects Oasis Major III when E7 is in C Major', () => {
      const e7Chord = {
        name: 'E7',
        roman: 'III7',
        tag: 'III7',
        color: '#fff',
        functionLabel: 'Dominant',
        notes: ['E', 'G#', 'B', 'D'],
        scaleLabel: 'C',
        desc: '',
        degree: '3',
        scaleKey: 'C',
        tension: 0.8,
      };

      const match = matchChordToBandTrick(e7Chord, 'C', 'MAJOR', 'oasis');
      expect(match).not.toBeNull();
      expect(match!.bandName).toBe('Oasis');
      expect(match!.trickName).toBe('Major III Lift');
    });

    it('detects Beatles minor iv when Fm is in C Major', () => {
      const fmChord = {
        name: 'Fm',
        roman: 'iv',
        tag: 'iv',
        color: '#fff',
        functionLabel: 'Subdominant',
        notes: ['F', 'Ab', 'C'],
        scaleLabel: 'C',
        desc: '',
        degree: '4',
        scaleKey: 'C',
        tension: 0.6,
      };

      const match = matchChordToBandTrick(fmChord, 'C', 'MAJOR', 'beatles');
      expect(match).not.toBeNull();
      expect(match!.bandName).toBe('The Beatles');
      expect(match!.trickName).toBe('Minor iv Cadence');
    });
  });

  describe('getBandTrickCandidates: Swap Lane Alternatives', () => {
    it('returns dynamic trick candidates with notes and roman numerals for any key', () => {
      const candidates = getBandTrickCandidates('C', 'MAJOR', 'oasis');
      expect(candidates.length).toBe(4);
      expect(candidates.map(c => c.chordName)).toEqual(['E7', 'Bb', 'Eb', 'Fm']);
      expect(candidates[0].roman).toBe('III7');
      expect(candidates[0].notes).toEqual(['E', 'G#', 'B', 'D']);
    });
  });
});
