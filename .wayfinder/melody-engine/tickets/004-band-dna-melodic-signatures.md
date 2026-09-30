# T4: Band DNA Melodic Signatures & Mutation Actions

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Open (Ready for Implementation)

## Question

How do we implement artist-specific Band DNA melodic rules and surgical mutation actions in `melody-engine.ts`?

Specifically:
1. **Band DNA Melodic Rules**:
   - **Oasis**: Soaring vocal pentatonic chants, high tonic/fifth drone anchors, major 3rd lifts.
   - **The Beatles**: Descending chromatic inner-line motion, stepwise counterpoint, expressive major-sixth and octave leaps.
   - **Radiohead**: Haunting falsetto leaps, eerie semitone oscillations, sparse modal color tones.
   - **Nirvana**: Dissonant semitone vocal slides, raw 3-note minor motifs, aggressive downbeat octave unisons.
   - **Steely Dan**: Syncopated jazz-inflected phrasing, landing on 9ths/13ths, sharp chromatic enclosures.
   - **Mac DeMarco**: Lazy syncopated slides, simple sweet major/lydian motifs, gentle descending stepdowns.
2. **Interactive Mutation Functions**:
   - `regenerateBar(melody, barIndex, progression)`: Surgical single-bar re-roll preserving phrase continuity.
   - `mutateMelody(melody, intensity)`: Drift pitch/rhythm slightly without destroying the hook.
   - `spiceWithBandTrick(melody, bandId, barIndex)`: Injects the artist's signature move at the designated bar.
   - `shiftOctave(melody, delta)` & `invertMelody(melody)`: Quick transform utilities.

## Specification Reference

See Section 6 ("Band DNA Melodic Signatures") in [spec.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/spec.md).
