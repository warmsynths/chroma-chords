import { describe, it, expect, beforeAll } from 'vitest';
import {
  RawChordData,
  getDiatonicScaleDegreeList,
  getChordIntervalBreakdown,
  detectProgressionCadences,
  analyzeVoiceLeading,
  ChordBlock,
} from './chord-engine';

describe('Theory Engine 3-Tier Helpers', () => {
  let chordData: RawChordData;

  beforeAll(async () => {
    chordData = {
      chords: {},
      scales: {
        'C_MAJOR': {
          root: 'C',
          type: 'MAJOR',
          degrees: {
            TONIC: { chord_name: 'C', next_chord_options: [] },
            SUPERTONIC: { chord_name: 'Dm', next_chord_options: [] },
            MEDIANT: { chord_name: 'Em', next_chord_options: [] },
            SUBDOMINANT: { chord_name: 'F', next_chord_options: [] },
            DOMINANT: { chord_name: 'G', next_chord_options: [] },
            SUBMEDIANT: { chord_name: 'Am', next_chord_options: [] },
            'LEADING-TONE': { chord_name: 'Bdim', next_chord_options: [] },
          },
        },
      },
    };
  });

  describe('Tier 1: getDiatonicScaleDegreeList', () => {
    it('returns all 7 diatonic scale degrees for C Major', () => {
      const degrees = getDiatonicScaleDegreeList('C', 'MAJOR', chordData);
      expect(degrees.length).toBe(7);
      expect(degrees[0].roman).toBe('I');
      expect(degrees[0].chordName).toBe('C');
      expect(degrees[3].roman).toBe('IV');
      expect(degrees[3].chordName).toBe('F');
      expect(degrees[4].roman).toBe('V');
      expect(degrees[4].chordName).toBe('G');
    });

    it('correctly flags chords used in current progression', () => {
      const mockProgression = {
        genre: 'Pop',
        mood: 'Uplifting',
        key: 'C',
        scaleType: 'MAJOR',
        bpm: 120,
        chords: [
          { name: 'C' } as ChordBlock,
          { name: 'G' } as ChordBlock,
        ],
      };
      const degrees = getDiatonicScaleDegreeList('C', 'MAJOR', chordData, mockProgression);
      const cDegree = degrees.find(d => d.chordName === 'C');
      const gDegree = degrees.find(d => d.chordName === 'G');
      const fDegree = degrees.find(d => d.chordName === 'F');

      expect(cDegree?.isUsedInLoop).toBe(true);
      expect(gDegree?.isUsedInLoop).toBe(true);
      expect(fDegree?.isUsedInLoop).toBe(false);
    });
  });

  describe('Tier 2: getChordIntervalBreakdown', () => {
    it('breaks down Cmaj7 into Root, 3rd, 5th, 7th with guide tones', () => {
      const breakdown = getChordIntervalBreakdown('Cmaj7', false);
      expect(breakdown.length).toBe(4);
      expect(breakdown[0]).toEqual({ note: 'C', intervalSymbol: '1', roleName: 'Root', isGuideTone: false });
      expect(breakdown[1]).toEqual({ note: 'E', intervalSymbol: '3', roleName: 'Major 3rd', isGuideTone: true });
      expect(breakdown[2]).toEqual({ note: 'G', intervalSymbol: '5', roleName: 'Perfect 5th', isGuideTone: false });
      expect(breakdown[3]).toEqual({ note: 'B', intervalSymbol: '7', roleName: 'Major 7th', isGuideTone: true });
    });

    it('breaks down Am7 with Minor 3rd and Minor 7th guide tones', () => {
      const breakdown = getChordIntervalBreakdown('Am7', false);
      expect(breakdown.length).toBe(4);
      expect(breakdown[1]).toEqual({ note: 'C', intervalSymbol: '♭3', roleName: 'Minor 3rd', isGuideTone: true });
      expect(breakdown[3]).toEqual({ note: 'G', intervalSymbol: '♭7', roleName: 'Minor 7th', isGuideTone: true });
    });
  });

  describe('Tier 3: detectProgressionCadences', () => {
    it('detects Authentic Cadence (V -> I)', () => {
      const mockChords = [
        { name: 'C', roman: 'I', tension: 0.04, functionLabel: 'Tonic' } as ChordBlock,
        { name: 'F', roman: 'IV', tension: 0.42, functionLabel: 'Subdominant' } as ChordBlock,
        { name: 'G', roman: 'V', tension: 0.68, functionLabel: 'Dominant' } as ChordBlock,
        { name: 'C', roman: 'I', tension: 0.04, functionLabel: 'Tonic' } as ChordBlock,
      ];
      const cadences = detectProgressionCadences(mockChords);
      const authentic = cadences.find(c => c.type === 'Authentic Cadence');
      expect(authentic).toBeDefined();
      expect(authentic?.shortName).toContain('G → C');
    });

    it('detects Plagal Cadence (IV -> I)', () => {
      const mockChords = [
        { name: 'C', roman: 'I', tension: 0.04, functionLabel: 'Tonic' } as ChordBlock,
        { name: 'Am', roman: 'vi', tension: 0.24, functionLabel: 'Submediant' } as ChordBlock,
        { name: 'F', roman: 'IV', tension: 0.42, functionLabel: 'Subdominant' } as ChordBlock,
        { name: 'C', roman: 'I', tension: 0.04, functionLabel: 'Tonic' } as ChordBlock,
      ];
      const cadences = detectProgressionCadences(mockChords);
      const plagal = cadences.find(c => c.type === 'Plagal Cadence');
      expect(plagal).toBeDefined();
      expect(plagal?.shortName).toContain('F → C');
    });
  });

  describe('Tier 3: analyzeVoiceLeading', () => {
    it('identifies common notes between C major and Am', () => {
      const mockChords = [
        { name: 'C', notes: ['C', 'E', 'G'] } as ChordBlock,
        { name: 'Am', notes: ['A', 'C', 'E'] } as ChordBlock,
      ];
      const links = analyzeVoiceLeading(mockChords);
      expect(links.length).toBe(2);
      expect(links[0].commonNotes.sort()).toEqual(['C', 'E']);
      expect(links[0].motionType).toContain('Strong Common Tones');
    });
  });
});
