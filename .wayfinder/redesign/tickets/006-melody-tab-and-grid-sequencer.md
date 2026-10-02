# T06: Melody Tab (`tab-melody.ts`) & MelodyGrid Sequencer Integration

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Blocked
**Blocked By**: [T02: Design Tokens, Typography & Unified App Shell Navigation](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/002-app-shell-tokens-and-navigation.md), [T03: Unified Transport Bar & Mobile Dock Component](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/003-unified-transport-and-mobile-dock.md), [T06a: Chord-Scale Harmonic Matrix & Note Guide Resolver](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006a-chord-scale-harmonic-matrix.md), [T06b: Contour Archetypes & Markov Rhythmic Cell Generator](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006b-contour-and-rhythm-generator.md), [T06c: Band DNA Melodic Signatures & Mutation Actions](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006c-band-dna-melodic-signatures.md), [T06d: Melody Human MIDI Feel Engine](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006d-melody-human-feel-engine.md), [T06e: Tone.js Lead Synth Voice & Synchronized Playback](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006e-lead-synth-playback-engine.md)

## Question

How should the dedicated Melody Sequencer tab be built to support 16-step per chord grid editing, Tier-2 Guide Mode (`Strict` | `Guide` | `Free`), note bloom micro-keyboard popovers, and playback synchronization with the progression, backed by the fully integrated Melody Engine?

## Acceptance Criteria

1. Implement `src/components/tabs/tab-melody.ts` embedding the `MelodyGrid` interface from `MelodyGrid.dc.html`:
   - Panel Header: Left: small-caps label `MELODY` + note count (`X notes`). Right: Tier-2 sunken segmented control for Guide Mode:
     - `Strict`: Snaps notes exclusively to chord tones (1, 3, 5, 7) using `snapNoteToGuide`.
     - `Guide`: Highlights chord tones and diatonic extensions, warns on clashes via `analyzeMelodyNote`.
     - `Free`: Unconstrained chromatic pitch selection.
   - 64-Step Grid Sequencer (4 bars x 16 16th-note steps):
     - Displays underlying chord header blocks above each bar.
     - Step cells showing plotted note pitch, octave, chord-tone role badge, and tie-duration line.
     - Drag handle on notes to adjust duration (1 step to 16 steps).
   - Note Blooming Micro-Keyboard Popover:
     - Clicking an empty or active step opens a bloom keyboard centered on the step.
     - Displays 1-octave chromatic keys (white keys and black keys).
     - Dots indicate chord tones and guide tones for the active underlying chord.
     - Role label for the selected pitch (e.g. `root`, `3rd`, `5th`, `7th`, `9th`, `passing`).
     - Previous / Next step navigation buttons and Clear note button.
   - Lead Voice Playback & Feel:
     - Dedicated lead synth channel in `audio-service.ts` playing plotted notes in lockstep with progression chords.
     - Transport bar Sound & Feel menus independently manage lead sound presets (e.g. Sine Lead, Warm Pluck, Square Lead) and feel parameters (`MelodyFeelSettings`).
   - Adaptive Chord-Change Integration:
     - When chords change on the Chords tab, `alignMelodyToChords` automatically realigns melody notes to preserve the musical contour and harmonic safety.
