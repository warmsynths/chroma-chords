import { describe, it, expect } from 'vitest';
import {
  melodyEngine,
  getHarmonicChordMatrix,
  classifyPitch,
  snapNoteToGuide,
  alignMelodyToChords,
  MelodyTrack,
  MelodyNote,
} from './melody-engine';
import { ChordBlock, Progression } from './chord-engine';

describe('Melody Engine - Harmonic Matrix & Theory', () => {
  const dummyChord = (name: string, notes: string[] = ['C', 'E', 'G']): ChordBlock => ({
    name,
    tag: 'home',
    roman: 'I',
    color: '#9CC0EC',
    functionLabel: 'Tonic',
    notes,
    scaleLabel: 'Major',
    desc: 'Test Chord',
    degree: 'TONIC',
    scaleKey: 'C_MAJOR',
    tension: 0,
  });

  const dummyProgression: Progression = {
    genre: 'Pop',
    mood: 'Happy',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [
      dummyChord('C', ['C', 'E', 'G']),
      dummyChord('G', ['G', 'B', 'D']),
      dummyChord('Am', ['A', 'C', 'E']),
      dummyChord('F', ['F', 'A', 'C']),
    ],
  };

  describe('Harmonic Chord Matrix extraction', () => {
    it('extracts chord tones, tensions and avoid tones for Major triad', () => {
      const matrix = getHarmonicChordMatrix(dummyChord('C'));
      expect(matrix.rootPc).toBe(0); // C
      expect(matrix.thirdPc).toBe(4); // E
      expect(matrix.fifthPc).toBe(7); // G
      expect(matrix.chordTonePcs).toContain(0);
      expect(matrix.chordTonePcs).toContain(4);
      expect(matrix.chordTonePcs).toContain(7);
      expect(matrix.tensionPcs).toContain(2); // D (9th)
      expect(matrix.avoidPcs).toContain(5); // F (natural 11)
    });

    it('extracts chord tones and avoid tones for Dominant 7th', () => {
      const matrix = getHarmonicChordMatrix(dummyChord('G7', ['G', 'B', 'D', 'F']));
      expect(matrix.rootPc).toBe(7); // G
      expect(matrix.thirdPc).toBe(11); // B
      expect(matrix.fifthPc).toBe(2); // D
      expect(matrix.seventhPc).toBe(5); // F (b7)
      expect(matrix.avoidPcs).toContain(6); // F# (Major 7th clashes with b7)
    });

    it('identifies suspended 4th avoiding major 3rd', () => {
      const matrix = getHarmonicChordMatrix(dummyChord('Csus4', ['C', 'F', 'G']));
      expect(matrix.thirdPc).toBe(5); // F acts as 3rd
      expect(matrix.avoidPcs).toContain(4); // E (Major 3rd negates suspension)
    });

    it('identifies diminished 5th avoiding natural 5th', () => {
      const matrix = getHarmonicChordMatrix(dummyChord('Bdim', ['B', 'D', 'F']));
      expect(matrix.rootPc).toBe(11); // B
      expect(matrix.fifthPc).toBe(5); // F (dim 5)
      expect(matrix.avoidPcs).toContain(6); // F# (Natural 5th clashes with dim 5)
    });
  });

  describe('Pitch Classification & Clash Analysis', () => {
    it('classifies root, 3rd, 5th, and 7th correctly', () => {
      const cChord = dummyChord('Cmaj7', ['C', 'E', 'G', 'B']);
      expect(classifyPitch('C4', cChord).role).toBe('root');
      expect(classifyPitch('E4', cChord).role).toBe('3rd');
      expect(classifyPitch('G4', cChord).role).toBe('5th');
      expect(classifyPitch('B4', cChord).role).toBe('7th');
    });

    it('classifies 9th as tension', () => {
      const cChord = dummyChord('C');
      const analysis = classifyPitch('D4', cChord);
      expect(analysis.role).toBe('tension');
      expect(analysis.intervalFromRoot).toBe('M2');
      expect(analysis.isClash).toBe(false);
    });

    it('flags natural 4th over major 3rd as a clash with resolution suggestion', () => {
      const cChord = dummyChord('C');
      const analysis = classifyPitch('F4', cChord);
      expect(analysis.isClash).toBe(true);
      expect(analysis.clashReason).toContain('Natural 4th clashes with Major 3rd');
      expect(analysis.suggestion).toBe('E4');
    });

    it('flags major 7th over dominant 7th as clash', () => {
      const g7Chord = dummyChord('G7');
      const analysis = classifyPitch('F#4', g7Chord);
      expect(analysis.isClash).toBe(true);
      expect(analysis.clashReason).toContain('Major 7th clashes with Dominant ♭7');
    });
  });

  describe('Guide Snapper (snapNoteToGuide)', () => {
    it('returns exact pitch under free mode', () => {
      const res = snapNoteToGuide('F#4', 0, 'free', dummyProgression);
      expect(res).toBe('F#4');
    });

    it('snaps clash note to safe chord tone or extension in strict-chord mode', () => {
      // In Bar 0 (C chord), F4 is natural 4th (clash). Strict-chord mode snaps to E4 or G4 or D4
      const res = snapNoteToGuide('F4', 0, 'strict-chord', dummyProgression);
      expect(['E4', 'G4', 'D4']).toContain(res);
    });

    it('snaps non-diatonic pitch to key scale in scale-key mode', () => {
      // In C Major, F#4 snaps to F4 or G4
      const res = snapNoteToGuide('F#4', 0, 'scale-key', dummyProgression);
      expect(['F4', 'G4']).toContain(res);
    });
  });

  describe('Adaptive Chord-Change Aligner (alignMelodyToChords)', () => {
    it('shifts chord tones when chord progression changes', () => {
      const initialMelody: MelodyTrack = {
        id: 'track-1',
        notes: [
          {
            id: 'n1',
            barIndex: 0,
            stepInBar: 0,
            beatOffset: 0,
            durationBeats: 1.0,
            pitch: 'C4',
            midi: 60,
            velocity: 100,
            chordToneRole: 'root',
          },
          {
            id: 'n2',
            barIndex: 0,
            stepInBar: 4,
            beatOffset: 1,
            durationBeats: 1.0,
            pitch: 'E4',
            midi: 64,
            velocity: 100,
            chordToneRole: '3rd',
          },
        ],
        contour: 'Arch',
        density: 50,
        octave: 4,
        guideMode: 'strict-chord',
        feelSettings: {
          humanVariance: 0.2,
          swing: 0,
          velocityDrift: 0.2,
          gateRatio: 0.9,
          glide: 0,
        },
        presetId: 'lead-synth',
        volume: 85,
        muted: false,
        solo: false,
      };

      // Change Bar 0 from C to Am
      const newProgression: Progression = {
        ...dummyProgression,
        chords: [
          dummyChord('Am', ['A', 'C', 'E']),
          ...dummyProgression.chords.slice(1),
        ],
      };

      const aligned = alignMelodyToChords(initialMelody, newProgression);
      expect(aligned.notes[0].pitch).toBe('A3'); // Root shifted to nearest A (A3, 3 semitones down)
      expect(aligned.notes[0].chordToneRole).toBe('root');
      expect(aligned.notes[1].pitch).toBe('C4'); // 3rd shifted to C (minor 3rd of Am)
      expect(aligned.notes[1].chordToneRole).toBe('3rd');
    });
  });

  describe('MelodyEngine Service Generation & Methods', () => {
    it('generates coherent melody track with correct note counts based on density', () => {
      const sparseTrack = melodyEngine.generateMelody(dummyProgression, { density: 15 });
      expect(sparseTrack.notes.length).toBeLessThanOrEqual(8);

      const denseTrack = melodyEngine.generateMelody(dummyProgression, { density: 90 });
      expect(denseTrack.notes.length).toBeGreaterThan(sparseTrack.notes.length);
    });

    it('shifts octave accurately', () => {
      const track = melodyEngine.generateMelody(dummyProgression, { octave: 4 });
      const originalMidi = track.notes[0].midi;
      const shifted = melodyEngine.shiftOctave(track, 1);
      expect(shifted.notes[0].midi).toBe(originalMidi + 12);
      expect(shifted.octave).toBe(5);
    });

    it('injects Band DNA Oasis drone trick', () => {
      const track = melodyEngine.generateMelody(dummyProgression);
      const spruced = melodyEngine.spiceWithBandTrick(track, 'Oasis', 0, dummyProgression);
      const droneNote = spruced.notes.find(n => n.chordToneRole === 'drone');
      expect(droneNote).toBeDefined();
      expect(droneNote?.pitch).toBe('G4');
      expect(droneNote?.tag).toBe('band-oasis-drone');
    });

    it('applies human feel with timing jitter and dynamics', () => {
      const track = melodyEngine.generateMelody(dummyProgression);
      const scheduled = melodyEngine.applyHumanFeel(
        track.notes,
        { humanVariance: 0.5, swing: 20, velocityDrift: 0.4, gateRatio: 0.8, glide: 0 },
        120
      );
      expect(scheduled.length).toBe(track.notes.length);
      expect(scheduled[0].time).toBeGreaterThanOrEqual(0);
      expect(scheduled[0].velocity).toBeGreaterThan(0);
    });
  });
});
