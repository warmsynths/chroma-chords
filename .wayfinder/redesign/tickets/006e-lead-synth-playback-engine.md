# T06e: Tone.js Lead Synth Voice & Synchronized Playback

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Closed
**Blocked By**: None (Completed)

## Question

How do we build and integrate the dedicated Tone.js lead audio voice in `src/services/audio-service.ts` and synchronize it with the `playback-engine.ts` loop?

Specifically:
1. **Lead Synth Voice Architecture**:
   - Create a dedicated Tone.js instrument chain separate from the chord polyphonic synth.
   - Support monophonic legato with portamento/glide and polyphonic modes.
2. **Lead Instrument Presets**:
   - `Lead Synth`: Expressive sawtooth/square synth with filter envelope and subtle chorus.
   - `Warm Pluck`: Soft transient pluck with reverb decay.
   - `Lo-fi Sine`: Pure rounded sine with tape saturation/wobble.
   - `Electric Lead`: Rhodes/Wurlitzer-style upper register with bite.
   - `Reed/Flute`: Breath-style FM synth lead.
3. **Playback Synchronization**:
   - Wire melody playback into `playback-engine.ts` so when loop playback starts, melody notes schedule in exact sync with chord progression bars.
   - Provide independent volume fader (gain), mute, and solo controls.

## Specification Reference

See Section 6.6 ("Tone.js Lead Audio Voice Channel") in [spec.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/spec.md).
