# Wayfinder Map: Melody Engine & Mechanics

## Destination

Formulate the comprehensive architectural and music-theory specification for Chroma Chords' **Melody Engine & Mechanics**, mapping the data structures, chord-scale harmonic matrix, contour archetypes, guide modes, Band DNA melodic habits, human MIDI feel profiles, and public programmatic API to guide future implementation and UI design alignment.

## Notes

- **Domain**: Music Theory, Melodic Contour, Chord-Scale Theory, Voice Leading, Human MIDI Dynamics, Tone.js Audio Voicing, Type 1 MIDI Serialization.
- **Skills consulted**: `domain-modeling`, `codebase-design`.
- **Standing Preferences**:
  - Plan, don't do: chart decisions, theory definitions, and API specifications.
  - UI decoupling: UI presentation is owned by user in designs; engine and audio services provide typed APIs, event hooks, and data models.
  - Non-destructive companion tracking: chords can be modified or swapped while preserving melodic intent, rhythm, and contour.

## Decisions so far

- [T1: Melody Engine Architectural & Theory Specification](file:///e:/work/chroma-chords/.wayfinder/melody-engine/tickets/001-melody-engine-spec.md) — Comprehensive technical spec authored in [spec.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/spec.md) defining data models, chord-scale theory, 6 contour archetypes, 3 guide modes, 6 Band DNA melodic profiles, human feel settings, Tone.js lead audio, and public API contracts.

## Implementation Tickets (Ready / Unblocked)

The specification in [spec.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/spec.md) provides complete blueprints for each implementation stage:

- [T2: Chord-Scale Harmonic Matrix & Note Guide Resolver](file:///e:/work/chroma-chords/.wayfinder/melody-engine/tickets/002-chord-scale-harmonic-matrix.md) — Implements chord-tone/tension resolver, clash detection, guide snapping (`snapNoteToGuide`), and adaptive chord-change re-alignment (`alignMelodyToChords`).
- [T3: Contour Archetypes & Markov Rhythmic Cell Generator](file:///e:/work/chroma-chords/.wayfinder/melody-engine/tickets/003-contour-and-rhythm-generator.md) — Implements 6 contour archetypes (*Arch*, *AscendingClimax*, *DescendingSigh*, *CallAndResponse*, *OstinatoRiff*, *AnthemHook*) and 16th-note density-scaled rhythmic cells.
- [T4: Band DNA Melodic Signatures & Mutation Actions](file:///e:/work/chroma-chords/.wayfinder/melody-engine/tickets/004-band-dna-melodic-signatures.md) — Implements Band DNA habits (Oasis, Beatles, Radiohead, Nirvana, Steely Dan, Mac DeMarco) and surgical mutation functions (`regenerateBar`, `mutateMelody`, `shiftOctave`, `invertMelody`).
- [T5: Melody Human MIDI Feel Engine](file:///e:/work/chroma-chords/.wayfinder/melody-engine/tickets/005-melody-human-feel-engine.md) — Implements `MelodyFeelSettings` with microtiming jitter, swing offsets, velocity drift, and articulation gate dynamics.
- [T6: Tone.js Lead Synth Voice & Synchronized Playback](file:///e:/work/chroma-chords/.wayfinder/melody-engine/tickets/006-lead-synth-playback-engine.md) — Builds dedicated Tone.js lead audio channel with 5 instrument presets, volume/mute/solo controls, and playback engine loop synchronization.
- [T7: Multi-Track MIDI & Audio Stem Export](file:///e:/work/chroma-chords/.wayfinder/melody-engine/tickets/007-multitrack-midi-and-export.md) — Implements Format 1 Multi-Track Standard MIDI export (Track 1 = Chords, Track 2 = Melody) and dual-stem offline WAV rendering.

## Not yet specified

- **Real-Time MIDI Controller Live Recording**: Direct hardware keyboard/pad recording into `MelodyTrack` with post-quantization.
- **Polyphonic Harmony / Counter-Melody Generator**: Dual-lead or vocal harmony generator (3rds/6ths above/below).
- **Pitch-Bend & Microtonal Expressivity**: Pitch-wheel slides and blues quarter-tone inflection curves.

## Out of scope

- UI component markup and visual CSS styling in `src/components/` (handled by user in designs).
- Vocal formant AI audio generation (speech-to-singing synthesis).
