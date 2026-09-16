import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import {
  generateProgression,
  getStartingDegreeWeight,
  generateTheoryGroups,
  generateBorrowedChords,
  injectModes,
  alignChordsToScale,
  transposeProgression,
  shiftProgressionScale,
  buildDeviceShareUrl,
  applyVoicingToChord,
  RawChordData,
  Progression,
  ChordBlock,
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

  describe('generateTheoryGroups and generateBorrowedChords', () => {
    it('generates 4 rich theory groups each with 3 chord substitutions', () => {
      const prog: Progression = generateProgression(chordData, 'Pop', 'Uplifting', { length: 4, key: 'C' });
      const groups = generateTheoryGroups(chordData, prog, 0);
      expect(groups).toHaveLength(4);
      expect(groups.map(g => g.name)).toEqual(['Darker', 'More tension', 'Dreamier', 'Resolve home']);
      for (const g of groups) {
        expect(g.rows).toHaveLength(3);
        for (const r of g.rows) {
          expect(r.name).toBeTruthy();
          expect(r.roman).toBeTruthy();
          expect(r.notes.length).toBeGreaterThanOrEqual(3);
          expect(r.chord).toBeDefined();
        }
      }
    });

    it('generates 4 borrowed chords for major and minor keys', () => {
      const majorProg: Progression = generateProgression(chordData, 'Pop', 'Uplifting', { length: 4, key: 'C' });
      const majorBorrowed = generateBorrowedChords(chordData, majorProg, 0);
      expect(majorBorrowed).toHaveLength(4);
      expect(majorBorrowed[0].roman).toBe('i');

      const minorProg: Progression = generateProgression(chordData, 'Lo-fi/Chill', 'Melancholy', { length: 4, key: 'A', scaleType: 'NATURAL_MINOR' });
      const minorBorrowed = generateBorrowedChords(chordData, minorProg, 0);
      expect(minorBorrowed).toHaveLength(4);
      expect(minorBorrowed[0].roman).toBe('I');
    });
  });

  describe('alignChordsToScale: Diatonic Quality Preservation & Chromatic Modes (T1)', () => {
    it('preserves diatonic chords when qualities match the scale', () => {
      const prog = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj' },
          { root: 'D', quality: 'min' },
          { root: 'E', quality: 'min' },
          { root: 'F', quality: 'maj' },
        ],
        'Pop',
        'Uplifting'
      );

      expect(prog).not.toBeNull();
      expect(prog!.chords[0].name).toBe('C');
      expect(prog!.chords[0].roman).toBe('I');
      expect(prog!.chords[1].name).toBe('Dm');
      expect(prog!.chords[1].roman).toBe('ii');
      expect(prog!.chords[2].name).toBe('Em');
      expect(prog!.chords[2].roman).toBe('iii');
      expect(prog!.chords[3].name).toBe('F');
      expect(prog!.chords[3].roman).toBe('IV');
    });

    it('preserves Major III and III7 in Major key (Oasis / Radiohead trick) without snapping to iii minor', () => {
      const prog = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj' },
          { root: 'G', quality: 'maj' },
          { root: 'A', quality: 'min' },
          { root: 'E', quality: 'dom7' }, // requested E7 instead of Em
          { root: 'F', quality: 'maj' },
        ],
        'Rock',
        'Uplifting'
      );

      expect(prog).not.toBeNull();
      const e7Chord = prog!.chords[3];
      expect(e7Chord.name).toBe('E7');
      expect(e7Chord.roman).toBe('III7');
      expect(e7Chord.notes).toContain('G#');
      expect(e7Chord.functionLabel).toBe('Secondary Dominant');
    });

    it('preserves minor iv in Major key (Beatles trick) without snapping to IV major', () => {
      const prog = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj' },
          { root: 'F', quality: 'maj' },
          { root: 'F', quality: 'min' }, // requested Fm instead of F
          { root: 'C', quality: 'maj' },
        ],
        'Pop',
        'Melancholy'
      );

      expect(prog).not.toBeNull();
      const fmChord = prog!.chords[2];
      expect(fmChord.name).toBe('Fm');
      expect(fmChord.roman).toBe('iv');
      expect(fmChord.notes).toContain('Ab');
      expect(fmChord.functionLabel).toBe('Borrowed (Minor iv)');
    });

    it('preserves secondary dominant II7 in Major key (Beatles trick)', () => {
      const prog = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj' },
          { root: 'D', quality: 'dom7' }, // requested D7 instead of Dm
          { root: 'G', quality: 'dom7' },
          { root: 'C', quality: 'maj' },
        ],
        'Rock',
        'Energetic'
      );

      expect(prog).not.toBeNull();
      const d7Chord = prog!.chords[1];
      expect(d7Chord.name).toBe('D7');
      expect(d7Chord.roman).toBe('II7');
      expect(d7Chord.notes).toContain('F#');
      expect(d7Chord.functionLabel).toBe('Secondary Dominant');
    });

    it('computes accurate modal accidental Roman numerals for borrowed chords', () => {
      const prog = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'Bb', quality: 'maj' }, // ♭VII
          { root: 'Ab', quality: 'maj' }, // ♭VI
          { root: 'Eb', quality: 'maj' }, // ♭III
          { root: 'Db', quality: 'maj' }, // ♭II
        ],
        'Rock',
        'Energetic'
      );

      expect(prog).not.toBeNull();
      expect(prog!.chords[0].roman).toBe('♭VII');
      expect(prog!.chords[0].functionLabel).toBe('Borrowed (Subtonic ♭VII)');

      expect(prog!.chords[1].roman).toBe('♭VI');
      expect(prog!.chords[1].functionLabel).toBe('Borrowed (Submediant ♭VI)');

      expect(prog!.chords[2].roman).toBe('♭III');
      expect(prog!.chords[2].functionLabel).toBe('Borrowed (Mediant ♭III)');

      expect(prog!.chords[3].roman).toBe('♭II');
      expect(prog!.chords[3].functionLabel).toBe('Neapolitan (♭II)');
    });

    it('accurately aligns full 8-chord Oasis signature progression (Don\'t Look Back In Anger)', () => {
      const oasisChords = [
        { root: 'C', quality: 'maj' },
        { root: 'G', quality: 'maj' },
        { root: 'A', quality: 'min' },
        { root: 'E', quality: 'dom7' },
        { root: 'F', quality: 'maj' },
        { root: 'G', quality: 'maj' },
        { root: 'C', quality: 'maj' },
        { root: 'C', quality: 'maj' },
      ];

      const prog = alignChordsToScale(chordData, 'C', 'MAJOR', oasisChords, 'Rock', 'Uplifting');
      expect(prog).not.toBeNull();
      expect(prog!.chords.map(c => c.name)).toEqual(['C', 'G', 'Am', 'E7', 'F', 'G', 'C', 'C']);
      expect(prog!.chords.map(c => c.roman)).toEqual(['I', 'V', 'vi', 'III7', 'IV', 'V', 'I', 'I']);
    });
  });

  describe('transposeProgression: Non-Destructive Key Transposition', () => {
    it('transposes C Major I-vi-ii-V to G Major preserving chord extensions', () => {
      const initialProg = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj7' },
          { root: 'A', quality: 'min7' },
          { root: 'D', quality: 'min7' },
          { root: 'G', quality: 'dom7' },
        ],
        'Jazz-ish',
        'Warm'
      )!;

      const transposed = transposeProgression(initialProg, 'G maj');
      expect(transposed.key).toBe('G');
      expect(transposed.scaleType).toBe('MAJOR');
      expect(transposed.chords.map(c => c.name)).toEqual(['Gmaj7', 'Em7', 'Am7', 'D7']);
      expect(transposed.chords.map(c => c.roman)).toEqual(['Imaj7', 'vi7', 'ii7', 'V7']);
    });

    it('transposes to flat keys with proper flat spelling (e.g. F Major and Eb Major)', () => {
      const initialProg = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj' },
          { root: 'F', quality: 'maj' },
          { root: 'G', quality: 'maj' },
          { root: 'C', quality: 'maj' },
        ],
        'Pop',
        'Uplifting'
      )!;

      const transposedF = transposeProgression(initialProg, 'F maj');
      expect(transposedF.key).toBe('F');
      expect(transposedF.chords.map(c => c.name)).toEqual(['F', 'Bb', 'C', 'F']);

      const transposedEb = transposeProgression(initialProg, 'E♭ maj');
      expect(transposedEb.key).toBe('Eb');
      expect(transposedEb.chords.map(c => c.name)).toEqual(['Eb', 'Ab', 'Bb', 'Eb']);
    });

    it('transposes to minor keys and updates Roman numerals', () => {
      const initialProg = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'min' },
          { root: 'F', quality: 'min' },
          { root: 'G', quality: 'dom7' },
          { root: 'C', quality: 'min' },
        ],
        'R&B/Soul',
        'Melancholy'
      )!;

      const transposedA = transposeProgression(initialProg, 'A min');
      expect(transposedA.key).toBe('A');
      expect(transposedA.scaleType).toBe('NATURAL_MINOR');
      expect(transposedA.chords.map(c => c.name)).toEqual(['Am', 'Dm', 'E7', 'Am']);
    });
  });

  describe('shiftProgressionScale: Parallel Mode Shifting', () => {
    it('shifts C Major (I-vi-IV-V) to C Natural Minor (i-bVI-iv-v)', () => {
      const initialProg = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj' },
          { root: 'A', quality: 'min' },
          { root: 'F', quality: 'maj' },
          { root: 'G', quality: 'maj' },
        ],
        'Pop',
        'Warm'
      )!;

      const shifted = shiftProgressionScale(initialProg, 'NATURAL_MINOR');
      expect(shifted.key).toBe('C');
      expect(shifted.scaleType).toBe('NATURAL_MINOR');
      expect(shifted.chords.map(c => c.name)).toEqual(['Cm', 'Ab', 'Fm', 'Gm']);
      expect(shifted.chords.map(c => c.roman)).toEqual(['i', '♭VI', 'iv', 'v']);
    });

    it('shifts C Major to C Dorian and adapts diatonic degrees', () => {
      const initialProg = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj' },
          { root: 'A', quality: 'min' },
          { root: 'F', quality: 'maj' },
          { root: 'G', quality: 'maj' },
        ],
        'Lo-fi/Chill',
        'Chill'
      )!;

      const shifted = shiftProgressionScale(initialProg, 'DORIAN');
      expect(shifted.key).toBe('C');
      expect(shifted.scaleType).toBe('DORIAN');
      expect(shifted.chords.map(c => c.name)).toEqual(['Cm', 'Adim', 'F', 'Gm']);
      expect(shifted.chords.map(c => c.roman)).toEqual(['i', 'vi°', 'IV', 'v']);
    });

    it('preserves 7th extensions during parallel mode shifts', () => {
      const initialProg = alignChordsToScale(
        chordData,
        'C',
        'MAJOR',
        [
          { root: 'C', quality: 'maj7' },
          { root: 'A', quality: 'min7' },
          { root: 'F', quality: 'maj7' },
          { root: 'G', quality: 'dom7' },
        ],
        'Jazz-ish',
        'Warm'
      )!;

      const shifted = shiftProgressionScale(initialProg, 'NATURAL_MINOR');
      expect(shifted.chords.map(c => c.name)).toEqual(['Cm7', 'Abmaj7', 'Fm7', 'Gm7']);
    });
  });

  describe('buildDeviceShareUrl', () => {
    const testProg: Progression = {
      genre: 'Neo-Soul',
      mood: 'Dreamy',
      key: 'Eb',
      scaleType: 'MAJOR',
      bpm: 90,
      chords: [
        { name: 'Ebmaj9', notes: ['Eb', 'G', 'Bb', 'D', 'F'], voicing: '1st inversion' },
        { name: 'Cm7', notes: ['C', 'Eb', 'G', 'Bb'], voicing: 'up an octave' },
        { name: 'Fm9', notes: ['F', 'Ab', 'C', 'Eb', 'G'], voicing: 'root position' },
        { name: 'Bb7', notes: ['Bb', 'D', 'F', 'Ab'] },
      ] as unknown as ChordBlock[],
    };

    it('encodes chord names, voicings, key, and scale for Circuit Tracks', () => {
      const url = buildDeviceShareUrl(testProg, 'circuit');
      expect(url).toContain('circuit-chords');
      expect(url).toContain('p=Ebmaj9+Cm7+Fm9+Bb7');
      expect(url).toContain('v=1st+octave+root+root');
      expect(url).toContain('key=Eb');
      expect(url).toContain('scale=major');
    });

    it('preserves clean m8 link format without extra params', () => {
      const url = buildDeviceShareUrl(testProg, 'm8');
      expect(url).toContain('m8hyper');
      expect(url).toContain('?p=Ebmaj9+Cm7+Fm9+Bb7');
      expect(url).not.toContain('v=');
      expect(url).not.toContain('key=');
    });
  });

  describe('applyVoicingToChord: Preserving Harmonic Tension & Color', () => {
    const baseChord: ChordBlock = {
      name: 'C',
      degree: 'TONIC',
      roman: 'I',
      tension: 0.04,
      color: '#9cc0ec',
      functionLabel: 'Tonic',
      notes: ['C4', 'E4', 'G4'],
      scaleKey: 'C',
      scaleLabel: 'C Major',
      desc: 'Tonic',
      tag: 'home',
    };

    it('updates name and notes for 7th extension while preserving tonic tension and color', () => {
      const extended = applyVoicingToChord(baseChord, 'Major', '7th (dom / m7)');
      expect(extended.name).toBe('C7');
      expect(extended.roman).toBe('I7');
      expect(extended.notes).toEqual(['C', 'E', 'G', 'A#']);
      expect(extended.tension).toBe(0.04);
      expect(extended.color).toBe('#9cc0ec');
    });

    it('updates name and notes for Major 7th extension while preserving tonic tension and color', () => {
      const extended = applyVoicingToChord(baseChord, 'Major', 'Major 7th (M7)');
      expect(extended.name).toBe('Cmaj7');
      expect(extended.roman).toBe('Imaj7');
      expect(extended.notes).toEqual(['C', 'E', 'G', 'B']);
      expect(extended.tension).toBe(0.04);
      expect(extended.color).toBe('#9cc0ec');
    });

    it('updates name and notes for 9th extension while preserving tonic tension and color', () => {
      const extended = applyVoicingToChord(baseChord, 'Major', '9th');
      expect(extended.name).toBe('C9');
      expect(extended.notes).toEqual(['C', 'E', 'G', 'A#', 'D']);
      expect(extended.tension).toBe(0.04);
      expect(extended.color).toBe('#9cc0ec');
    });

    it('retains baseline tension and color when resetting extension to None', () => {
      const extended = applyVoicingToChord(baseChord, 'Major', '9th');
      const resetChord = applyVoicingToChord(extended, 'Major', 'None');
      expect(resetChord.name).toBe('C');
      expect(resetChord.roman).toBe('I');
      expect(resetChord.tension).toBe(0.04);
      expect(resetChord.color).toBe('#9cc0ec');
    });

    it('recovers pristine tension from initialChord if previous chord was mutated', () => {
      const corruptedChord: ChordBlock = {
        ...baseChord,
        name: 'Cmaj9',
        tension: 2.5,
        color: '#f2735f',
        initialChord: baseChord,
      };

      const fixed = applyVoicingToChord(corruptedChord, 'Major', 'None');
      expect(fixed.tension).toBe(0.04);
      expect(fixed.color).toBe('#9cc0ec');
    });
  });
});




