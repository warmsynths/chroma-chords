# T06a: Chord-Scale Harmonic Matrix & Note Guide Resolver

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Blocked
**Blocked By**: [T01: Redesign Architecture & Modular Component Specification](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/001-redesign-architecture-spec.md)

## Question

How do we implement the core music-theory foundation for melody in `src/services/melody-engine.ts`:
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

See Section 6.1 ("Chord-Scale Harmonic Matrix") and Section 6.4 ("Guide Modes & Snapping") in [spec.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/spec.md).
