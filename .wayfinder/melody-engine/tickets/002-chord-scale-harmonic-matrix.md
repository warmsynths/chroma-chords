# T2: Chord-Scale Harmonic Matrix & Note Guide Resolver

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Open (Ready for Implementation)

## Question

How do we implement the core music-theory foundation for melody in `melody-engine.ts`:
1. **Chord-Tone & Tension Resolver**:
   - Given a `ChordBlock` (with its root, quality, and scale context), extract its chord tones (`root`, `3rd`, `5th`, `7th`), valid color tensions (`9th`, `11th`, `#11`, `13th`), and diatonic scale tones.
2. **Note Analysis (`analyzeMelodyNote`)**:
   - Classify any incoming pitch against the active chord/beat as `'root' | '3rd' | '5th' | '7th' | 'tension' | 'passing' | 'chromatic'`, detecting undesirable harsh dissonances.
3. **Guide Snapper (`snapNoteToGuide`)**:
   - Provide snapping for user plotting under `'strict-chord'`, `'scale-key'`, and `'free'` modes.
4. **Adaptive Chord-Change Aligner (`alignMelodyToChords`)**:
   - When a chord changes in the progression, smoothly adapt pegged chord tones to the new chord while preserving the contour and rhythm.
5. **Unit Test Coverage**: Comprehensive Vitest tests verifying theory mappings across all chord qualities and modes.

## Specification Reference

See Section 4 ("Music Theory & Chord-Scale Harmonic Matrix"), Section 7 ("Interactive Note Guidance & Snapping"), and Section 8 ("Adaptive Chord-Change Re-harmonization") in [spec.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/spec.md).
