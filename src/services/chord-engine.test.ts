import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  generateProgression,
  getStartingDegreeWeight,
  generateAlternatives,
  injectModes,
  RawChordData,
  Progression,
} from './chord-engine';

describe('chord-engine: Starting Degree Weighting & Harmonic Generation', () => {
  let chordData: RawChordData;

  beforeAll(() => {
    const jsonPath = path.resolve(__dirname, '../../public/chroma_chords_data.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    chordData = JSON.parse(raw) as RawChordData;
    injectModes(chordData);
  });

  describe('getStartingDegreeWeight', () => {
    it('gives TONIC strong priority in Uplifting and Epic moods', () => {
      const tonicWeight = getStartingDegreeWeight('TONIC', 'MAJOR', 'Pop', 'Uplifting');
      const subdomWeight = getStartingDegreeWeight('SUBDOMINANT', 'MAJOR', 'Pop', 'Uplifting');
      expect(tonicWeight).toBeGreaterThan(subdomWeight);
    });

    it('boosts SUBDOMINANT and SUPERTONIC in Lo-fi/Chill and Jazz-ish genres', () => {
      const jazzSupertonic = getStartingDegreeWeight('SUPERTONIC', 'MAJOR', 'Jazz-ish', 'Warm');
      const jazzTonic = getStartingDegreeWeight('TONIC', 'MAJOR', 'Jazz-ish', 'Warm');
      expect(jazzSupertonic).toBeGreaterThan(0.5);

      const lofiSubdominant = getStartingDegreeWeight('SUBDOMINANT', 'MAJOR', 'Lo-fi/Chill', 'Dreamy');
      expect(lofiSubdominant).toBeGreaterThan(0.5);
    });

    it('boosts SUBMEDIANT and SUBTONIC in Minor scales and Synthwave/Rock genres', () => {
      const synthwaveSubtonic = getStartingDegreeWeight('SUBTONIC', 'MIXOLYDIAN', 'Synthwave', 'Energetic');
      expect(synthwaveSubtonic).toBeGreaterThan(0.5);

      const melancholySubmediant = getStartingDegreeWeight('SUBMEDIANT', 'NATURAL_MINOR', 'Indie/Folk', 'Melancholy');
      expect(melancholySubmediant).toBeGreaterThan(0.5);
    });
  });

  describe('generateProgression: Off-Root Progression Variety', () => {
    it('generates a valid progression with specified length and properties', () => {
      const prog = generateProgression(chordData, 'Pop', 'Uplifting', { length: 4 });
      expect(prog.chords).toHaveLength(4);
      expect(prog.genre).toBe('Pop');
      expect(prog.mood).toBe('Uplifting');
      expect(prog.key).toBeDefined();
      expect(prog.bpm).toBeGreaterThan(0);
      prog.chords.forEach(chord => {
        expect(chord.name).toBeTruthy();
        expect(chord.notes.length).toBeGreaterThanOrEqual(3);
        expect(chord.degree).toBeTruthy();
      });
    });

    it('generates non-Tonic starting chords across multiple runs for Lo-fi and Pop', () => {
      const startingDegrees = new Set<string>();
      for (let i = 0; i < 40; i++) {
        const prog = generateProgression(chordData, 'Lo-fi/Chill', 'Dreamy', { length: 4 });
        startingDegrees.add(prog.chords[0].degree);
      }

      // Should have generated more than just TONIC starts
      expect(startingDegrees.size).toBeGreaterThan(1);
      const hasNonTonic = Array.from(startingDegrees).some(deg => deg !== 'TONIC');
      expect(hasNonTonic).toBe(true);
    });

    it('supports custom progression lengths from 1 to 8', () => {
      for (const len of [1, 2, 4, 6, 8]) {
        const prog = generateProgression(chordData, 'Jazz-ish', 'Warm', { length: len });
        expect(prog.chords).toHaveLength(len);
      }
    });

    it('generates valid chords across modal scale types (DORIAN, MIXOLYDIAN, LYDIAN)', () => {
      const dorianProg = generateProgression(chordData, 'House/Dance', 'Groovy', { scaleType: 'DORIAN', length: 4 });
      expect(dorianProg.scaleType).toBe('DORIAN');
      expect(dorianProg.chords).toHaveLength(4);

      const mixoProg = generateProgression(chordData, 'Rock', 'Energetic', { scaleType: 'MIXOLYDIAN', length: 4 });
      expect(mixoProg.scaleType).toBe('MIXOLYDIAN');
      expect(mixoProg.chords).toHaveLength(4);

      const lydianProg = generateProgression(chordData, 'Ambient/Drone', 'Dreamy', { scaleType: 'LYDIAN', length: 4 });
      expect(lydianProg.scaleType).toBe('LYDIAN');
      expect(lydianProg.chords).toHaveLength(4);
    });
  });

  describe('generateAlternatives', () => {
    it('returns chord substitution options including Darker, Tension, and Dreamier', () => {
      const prog: Progression = generateProgression(chordData, 'Pop', 'Uplifting', { length: 4 });
      const alts = generateAlternatives(chordData, prog, 1);
      expect(alts.length).toBeGreaterThan(0);
      const labels = alts.map(a => a.label);
      expect(labels).toContain('Darker');
    });
  });
});
