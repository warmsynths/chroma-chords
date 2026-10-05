import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { BAND_LIST, BAND_GRAMMAR, expandBandPattern, generateBandProgression, getBandGrammar } from './band-dna-service';
import { BAND_MELODY_PROFILES, getBandMelodyProfile, getBandRhythmCells, pickBandContour, biasAdjustment } from './band-melody-dna';
import { melodyEngine } from './melody-engine';
import { injectModes, type RawChordData, type Progression } from './chord-engine';

let chordData: RawChordData;
beforeAll(() => {
  chordData = JSON.parse(readFileSync(resolve(__dirname, '../../public/chroma_chords_data.json'), 'utf-8')) as RawChordData;
  injectModes(chordData);
});

describe('Band DNA roster', () => {
  it('includes Oasis, The Beatles, Nirvana, Khruangbin and Daft Punk', () => {
    const names = BAND_LIST.map(b => b.name);
    ['Oasis', 'The Beatles', 'Nirvana', 'Khruangbin', 'Daft Punk', 'Radiohead', 'Steely Dan', 'Mac DeMarco'].forEach(n => expect(names).toContain(n));
  });

  it('gives every band chord patterns, a cadence, a melody profile and a Melody signature row', () => {
    BAND_LIST.forEach(b => {
      const g = BAND_GRAMMAR[b.id];
      expect(g, b.id).toBeDefined();
      expect(g.patterns.length).toBeGreaterThanOrEqual(3);
      expect(g.cadence.length).toBe(2);
      expect(BAND_MELODY_PROFILES[b.id], b.id).toBeDefined();
      expect(b.sig.some(s => s.k === 'Melody')).toBe(true);
    });
  });
});

describe('chord grammar', () => {
  it('expands a four-chord pattern to eight bars with the cadence on the second pass', () => {
    const g = getBandGrammar('oasis')!;
    const steps = expandBandPattern(g.patterns[2], g);
    expect(steps).toHaveLength(8);
    expect(steps.slice(6, 8)).toEqual(g.cadence.map(s => ({ ...s })));
  });

  it('writes Nirvana as power chords, Steely Dan with extended qualities', () => {
    let nirvanaPow = false;
    let danExt = false;
    for (let i = 0; i < 40; i++) {
      const n = generateBandProgression(chordData, 'nirvana', 'E', 'NATURAL_MINOR')!;
      if (n.chords.some(c => /^[A-G][#b]?5$/.test(c.name))) nirvanaPow = true;
      const d = generateBandProgression(chordData, 'steely-dan', 'C', 'MAJOR')!;
      if (d.chords.some(c => /add2|m7b5|7#9|maj9|9$/.test(c.name))) danExt = true;
    }
    expect(nirvanaPow).toBe(true);
    expect(danExt).toBe(true);
  });

  it('generates 8 chords for every band in a locked key', () => {
    BAND_LIST.forEach(b => {
      for (let i = 0; i < 10; i++) {
        const p = generateBandProgression(chordData, b.id, 'A', 'NATURAL_MINOR');
        expect(p, b.id).not.toBeNull();
        expect(p!.chords).toHaveLength(8);
      }
    });
  });
});

describe('melody profiles', () => {
  it('resolves ids, names and The Beatles', () => {
    expect(getBandMelodyProfile('oasis')?.id).toBe('oasis');
    expect(getBandMelodyProfile('The Beatles')?.id).toBe('beatles');
    expect(getBandMelodyProfile('Steely Dan')?.id).toBe('steely-dan');
    expect(getBandMelodyProfile('nobody')).toBeUndefined();
  });

  it('picks only contours the band favours', () => {
    const allowed = Object.keys(BAND_MELODY_PROFILES.nirvana.contourWeights);
    for (let i = 0; i < 30; i++) expect(allowed).toContain(pickBandContour('nirvana'));
    expect(pickBandContour('nobody')).toBeUndefined();
  });

  it('writes Radiohead rhythm in a 3+3+4+3+3 grouping', () => {
    const cells = getBandRhythmCells(BAND_MELODY_PROFILES.radiohead, 45, 0, 8)!;
    expect(cells.map(c => c.step)).toEqual([0, 3, 6, 10, 13]);
  });

  it('rewards repeats for Oasis and chromatic neighbours for Radiohead', () => {
    const base = { tonicPc: 0, isMinor: false, isTension: false, isChordTone: false };
    expect(biasAdjustment(BAND_MELODY_PROFILES.oasis, { ...base, previousMidi: 67, midi: 67 }))
      .toBeLessThan(biasAdjustment(BAND_MELODY_PROFILES.oasis, { ...base, previousMidi: 67, midi: 66 }));
    expect(biasAdjustment(BAND_MELODY_PROFILES.radiohead, { ...base, previousMidi: 67, midi: 66 }))
      .toBeLessThan(biasAdjustment(BAND_MELODY_PROFILES.radiohead, { ...base, previousMidi: 67, midi: 65 }));
  });
});

describe('melody engine with band DNA', () => {
  const prog = (): Progression => generateBandProgression(chordData, 'oasis', 'C', 'MAJOR')!;

  it('every band yields a non-empty, ordered melody', () => {
    BAND_LIST.forEach(b => {
      const p = generateBandProgression(chordData, b.id, 'C', 'MAJOR')!;
      const t = melodyEngine.generateMelody(p, { bandId: b.id, density: 45, seed: 7 });
      expect(t.notes.length, b.id).toBeGreaterThan(4);
      for (let i = 1; i < t.notes.length; i++) expect(t.notes[i].beatOffset).toBeGreaterThanOrEqual(t.notes[i - 1].beatOffset);
    });
  });

  it('Radiohead melody uses the odd grouping on its middle bars', () => {
    const t = melodyEngine.generateMelody(prog(), { bandId: 'radiohead', density: 45, seed: 3 });
    const steps = t.notes.filter(n => n.barIndex === 2 && !n.tag).map(n => n.stepInBar);
    expect(steps).toEqual([0, 3, 6, 10, 13]);
  });

  it('Nirvana accents hit harder than the rest, and carry a scoop grace note', () => {
    const t = melodyEngine.generateMelody(prog(), { bandId: 'nirvana', density: 45, seed: 3 });
    expect(Math.max(...t.notes.map(n => n.velocity))).toBeGreaterThanOrEqual(120);
    expect(t.notes.some(n => n.tag === 'band-ornament-scoop')).toBe(true);
  });

  it('echoing bands answer bar 1 at the midpoint', () => {
    const t = melodyEngine.generateMelody(prog(), { bandId: 'daft-punk', density: 45, seed: 3 });
    const start = t.notes.filter(n => n.barIndex === 0 && !n.tag).map(n => n.stepInBar);
    const answer = t.notes.filter(n => n.barIndex === 4 && !n.tag && !n.id.startsWith('orn')).map(n => n.stepInBar);
    expect(answer.length).toBeGreaterThan(0);
    start.slice(0, 2).forEach(s => expect(answer).toContain(s));
  });

  it('Khruangbin and Daft Punk add their signature moves', () => {
    const k = melodyEngine.generateMelody(prog(), { bandId: 'khruangbin', seed: 2 });
    expect(k.notes.some(n => n.tag === 'band-khruangbin-slide')).toBe(true);
    const d = melodyEngine.generateMelody(prog(), { bandId: 'daft-punk', seed: 2 });
    expect(d.notes.some(n => n.tag === 'band-daft-riff')).toBe(true);
  });
});
