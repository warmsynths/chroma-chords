# T1: Melody Engine Architectural & Theory Specification

**Label**: `wayfinder:task`
**Type**: AFK
**Assignee**: Antigravity
**Status**: Closed (Resolved)

## Question

What is the precise architecture, data model, music-theory rule set, contour dictionary, guide mode policy, and public API surface for Chroma Chords' new `MelodyEngine`?

## Resolution

Authored the complete architectural and music-theory specification in [spec.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/spec.md):
- Specified data models: `MelodyTrack`, `MelodyNote`, `ChordToneRole`, `GuideMode`, `MelodyFeelSettings`, and `ContourArchetype`.
- Established metric weighting and chord-scale pitch matrix across all 18 chord qualities with avoidance/clash rules.
- Defined 6 contour archetypes (*Arch*, *Ascending Climax*, *Call & Response*, *Descending Sigh*, *Ostinato Riff*, *Anthem Hook*) and the 0–100 density scale.
- Detailed Band DNA signature habits for Oasis, Beatles, Radiohead, Nirvana, Steely Dan, and Mac DeMarco.
- Outlined the public API contract for `MelodyEngine`, guide snapping (`snapNoteToGuide`), live note analysis (`analyzeMelodyNote`), and adaptive chord re-alignment (`alignMelodyToChords`).
- Specified the Tone.js lead synth channel presets and Format 1 2-track MIDI / dual-stem WAV export architecture.

