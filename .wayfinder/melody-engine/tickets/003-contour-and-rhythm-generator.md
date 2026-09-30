# T3: Contour Archetypes & Markov Rhythmic Cell Generator

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Open (Ready for Implementation)

## Question

How do we generate dynamic, musically engaging melodic phrases that follow structural contours and genre-authentic rhythms?

Specifically:
1. **Contour Archetype Generators**:
   - Implement geometric/pitch trajectory shapers:
     - `Arch`: Rises toward a climax on bar 3, then descends to resolution.
     - `Ascending Climax`: Low register start, stepwise ascent with tension build.
     - `Call & Response`: 2-bar question (ending on unstable degree) followed by 2-bar answer (landing on tonic/3rd).
     - `Descending Sigh`: Expressive high-register start descending in gentle steps.
     - `Ostinato Riff`: Repetitive 1-bar or 2-bar rhythmic hook with slight harmonic pitch shifts.
     - `Anthem Hook`: Soaring high-energy vocal hook with syncopated downbeat anticipations.
2. **16th-Note Rhythmic Cell Matrix & Density Scaling**:
   - Assemble rhythmic cells (quarter notes, 8ths, syncopated 16ths, dotted rhythms, rests) conditioned on the 0–100 density slider.
   - Low density (0–25) produces sustained, spaced phrases; medium (26–60) produces lyrical hooks; high (61–100) produces driving riffs.
3. **Stepwise Voice-Leading & Leap Recovery**:
   - Prioritize stepwise conjunct motion (65–80%), allow expressive leaps (thirds, fifths, octaves), and enforce leap recovery in the opposite direction.
4. **Full Progression Melody Generation (`generateMelody`)**:
   - Combine contour, rhythm cells, and chord-scale harmonic matrix to output a complete `MelodyTrack`.

## Specification Reference

See Section 5 ("Contour Archetypes & Rhythmic Vocabulary") in [spec.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/spec.md).
