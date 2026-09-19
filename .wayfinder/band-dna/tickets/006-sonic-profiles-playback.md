# T6: Sonic Profiles & Playback Preset Integration

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Completed

## Question

How do we wire active Band DNA selection to automatic Tone.js instrument preset switching (e.g. guitar for Oasis, rhodes/epiano for Beatles/Steely Dan, stab/crunch for Nirvana, juno-pad for Mac DeMarco), tempo calibration, and playback style?

## Resolution

1. **Instrument & Style Mapping**: In `audio-service.ts`, `presetIdToUserInstrumentName` and `matchRhythmStyleToPlayStyleName` bridge band archetypes to application sound presets (`guitar` -> `Nylon Guitar`, `rhodes` -> `Vintage Rhodes`, `epiano` -> `Electric Piano`, `stab` -> `Lo-Fi Keys`, `juno-pad` -> `Juno Pad`).
2. **Immediate Sonic Switch**: In `LoopScreen.onBandClick` and `onGenerateBandProgression`, selecting or generating a band profile immediately applies:
   - `playbackEngine.setInstrument(...)`
   - `playbackEngine.setPlayStyle(...)`
   - `playbackEngine.setBpm(band.defaultBpm)`
   - Dispatches corresponding events (`set-instrument`, `set-play-style`, `set-bpm`) to update host state and transport HUD.
3. **Verified**: Validated with tests in `band-dna-interactions.test.ts`.
