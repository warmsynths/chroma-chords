# T5: Melody Human MIDI Feel Engine

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Open (Ready for Implementation)

## Question

How do we design and implement human MIDI feel parameters for melody that hook into Chroma Chords' humanization architecture while providing dedicated melody controls?

Specifically:
1. **`MelodyFeelSettings` Model**:
   - `humanVariance`: Microtiming jitter and push/pull behind or ahead of the beat (0.0 to 1.0).
   - `swing`: 16th/8th shuffle timing offset (0 to 100%).
   - `velocityDrift`: Dynamic contour variation (downbeat accents, peak note emphasis, subtle human touch variance).
   - `gateRatio`: Articulation control (0.2 = crisp staccato, 0.8 = normal, 1.2 = tenuto/legato overlap).
   - `glide`: Portamento time between adjacent stepwise notes.
2. **Genre-Informed Default Profiles**:
   - Establish default `MelodyFeelSettings` per genre (e.g. Lo-fi: high drag variance, gentle swing; Pop: tight timing, punchy accents; Rock: aggressive velocity variance).
3. **Integration with `audio-service.ts`**:
   - Provide a processing pipeline that transforms raw `MelodyNote` events into humanized scheduled playback events with jittered timestamps, dynamic velocities, and articulation durations.

## Specification Reference

See Section 9 ("Melody Human MIDI Feel Engine") in [spec.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/spec.md).
