# Wayfinder Map: Chroma Chords Complete UI/UX Redesign & Melody Engine Integration

## Destination

Fully implement the **Chroma Melody** design system and UI overhaul across the entire Chroma Chords application, replacing the monolithic `loop-screen.ts` with a modular Lit component architecture supporting all 4 unified tabs (`Chords`, `Melody`, `Song`, `Play it`) sharing "One skeleton for every tab" (Nav Row → One Mood-Tinted Panel → Transport Bar / Mobile Dock) per `Styleguide.dc.html` and `CLAUDE.md`, and fully integrating the **Melody Engine & Mechanics** theory, synthesis, and export services.

## Notes

- **Domain**: UI/UX Architecture, Music Theory, CSS Tokens & Layout Skeleton, Lit Component Hierarchy, Web Audio / Tone.js, Melodic Sequencer & Note Blooming, Piano & Fretboard SVG Rendering, Song Arrangement & Reordering, Type 1 Multi-Track MIDI.
- **Design Reference Files**:
  - `c:/reyn/Projects/chroma-chords-design/Chroma Melody.dc.html` (Interactive Prototype Reference)
  - `c:/reyn/Projects/chroma-chords-design/Styleguide.dc.html` (Design System Contract)
  - `c:/reyn/Projects/chroma-chords-design/CLAUDE.md` (Strict UI Rules & Verification Checklist)
  - `c:/reyn/Projects/chroma-chords-design/MelodyGrid.dc.html` (Melody Sequencer Blueprint)
  - `c:/reyn/Projects/chroma-chords-design/AppHeader.dc.html`, `MobileDock.dc.html`, `MobileSettings.dc.html`
- **Engine Reference Files**:
  - `c:/reyn/Projects/chroma-chords/.wayfinder/melody-engine/spec.md` (Melody Engine Specification)
  - `c:/reyn/Projects/chroma-chords/.wayfinder/band-dna/spec.md` (Band DNA Specification)
- **Skills Consulted**: `wayfinder`, `domain-modeling`, `codebase-design`.
- **Standing Preferences**:
  - **Plan, don't do**: Chart the route, dependencies, and decisions so sessions can work unblocked tickets systematically.
  - **Strict UI Contract**: Nav-to-panel gap identical on every tab (`padding: 14px 18px 26px` on mobile wrapper), panel background is mood color at 18% alpha, radius is 26px desktop / 22px mobile.
  - **No stray titles**: Panel headers use small-caps label (10.5px / 800 / `#8A6B3F`) + Tier-2 segmented control (sunken track, cream chip selected).
  - **Engine Decoupling**: UI components consume clean typed APIs from `melody-engine.ts`, `chord-engine.ts`, and `audio-service.ts`.
  - **Out of Scope**: Performance recording lanes / takes (ruled out of scope per user).

## Decisions so far

- [T01: Redesign Architecture & Modular Component Specification](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/001-redesign-architecture-spec.md) — Comprehensive technical spec authored in [spec.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/spec.md) defining modular component hierarchy (`chroma-chords-app`, `app-header`, `transport-bar`, `mobile-dock`, `tab-chords`, `tab-melody`, `tab-song`, `tab-play`, `chord-inspector`), feature mapping matrix, theory features integration into the desktop aside, and dropping legacy performance recording.
- [T02: Design Tokens, Typography & Unified App Shell Navigation](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/002-app-shell-tokens-and-navigation.md) — Implemented design tokens, Google Fonts (`Plus Jakarta Sans`, `Space Mono`), Tier-1 nav tabs in `app-header.ts`, AI capacity token indicator, and the responsive single-panel wrapper with 18% alpha mood background.
- [T03: Unified Transport Bar & Mobile Dock Component](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/003-unified-transport-and-mobile-dock.md) — Implemented desktop dark transport bar (`#2E271F`) and `mobile-dock.ts` with Play/Stop, Section selector, Loop chips, Sound/Feel popovers, Key/Scale popover, BPM stepper, and Share trigger.
- [T06a: Chord-Scale Harmonic Matrix & Note Guide Resolver](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006a-chord-scale-harmonic-matrix.md) — Implemented core theory matrix in `melody-engine.ts`: chord-tone/tension resolver, clash detection, guide snapping (`snapNoteToGuide`), and adaptive chord-change re-alignment (`alignMelodyToChords`).
- [T04: Chords Tab (`tab-chords.ts`) & Redesigned Swap Lane](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/004-chords-tab-and-swap-lane.md) — Implemented chord pads grid, top Vibe pill, Band DNA moves, and extruded chord swap lane in `tab-chords.ts`.
- [T05: Desktop Right-Hand Aside & Chord Detail Inspector](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/005-desktop-aside-and-chord-inspector.md) — Implemented desktop right-hand sidebar with Tension Arc chart, Saved Sets popover, and Chord Detail Inspector in `chord-inspector.ts`.
- [T06b: Contour Archetypes & Markov Rhythmic Cell Generator](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006b-contour-and-rhythm-generator.md) — Implemented 6 contour archetypes (*Arch*, *AscendingClimax*, *DescendingSigh*, *CallAndResponse*, *OstinatoRiff*, *AnthemHook*) and 16th-note density-scaled rhythmic cells in `melody-engine.ts`.
- [T06c: Band DNA Melodic Signatures & Mutation Actions](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006c-band-dna-melodic-signatures.md) — Implemented artist-specific melodic rules for Oasis, Beatles, Radiohead, Nirvana, Steely Dan, and Mac DeMarco, plus surgical mutation actions (`regenerateBar`, `mutateMelody`, `invertMelody`).
- [T06d: Melody Human MIDI Feel Engine](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006d-melody-human-feel-engine.md) — Implemented `MelodyFeelSettings` with microtiming jitter, swing offsets, velocity drift, articulation gate dynamics, and genre defaults.
- [T06e: Tone.js Lead Synth Voice & Synchronized Playback](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006e-lead-synth-playback-engine.md) — Built dedicated Tone.js lead audio voice with 5 presets, volume/mute/solo controls, and playback engine loop sync.
- [T06: Melody Tab (`tab-melody.ts`) & MelodyGrid Sequencer Integration](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006-melody-tab-and-grid-sequencer.md) — Built dedicated 64-step melody grid sequencer tab, Tier-2 `Strict`/`Guide`/`Free` mode toggle, note bloom micro-keyboard popovers, chord-tone guide dots, and playback sync with lead synth voice.

## Frontier Tickets (Ready / Unblocked)

- [T07: Song Tab (`tab-song.ts`) & Section Arrangement Arranger](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/007-song-tab-and-section-arranger.md) — Implements the 2-column Song tab (Sections Library + reorderable Song Order timeline with drag handles and repeat counters). *(Unblocked by T02, T03)*
- [T08: Play It Tab (`tab-play.ts`) & Interactive Instrument Visualizers](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/008-play-it-tab-instrument-visualizers.md) — Implements interactive 2-octave piano keyboard SVGs, guitar fretboard chord diagrams, ukulele fretboards, scale degrees toggle, and click-to-play audio. *(Unblocked by T02, T04)*

## Blocked Tickets
- [T09: Multi-Track Export & Web MIDI Routing Modal](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/009-multitrack-export-and-midi-modal.md) — Implements Type 1 Multi-Track Standard MIDI export (Track 1 = Chords, Track 2 = Melody), dual-stem WAV export, and dedicated MIDI modal with per-part channel routing. *(Blocked by T03, T06)*
- [T10: End-to-End Visual Audit, Mobile Verification & Design Checklist](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/010-visual-audit-and-qa-verification.md) — Executes the 8-screen desktop/mobile audit and validates all items in the CLAUDE.md checklist. *(Blocked by T04, T05, T06, T07, T08, T09)*

## Not yet specified

- **Real-Time MIDI Hardware Live Recording**: Direct hardware keyboard/pad input recording directly into MelodyGrid steps.
- **Polyphonic Melodic Harmonies**: Multi-voice or vocal harmony generation (3rds/6ths above/below).
- **Pitch-Bend & Microtonal Inflection Curves**: Continuous pitch glides and blues notes.

## Out of scope

- Legacy lane overdubbing / performance recording in the chord loop screen (ruled out of scope per user).
- Backend database schema redesign (using existing `project-storage.ts` and `auth-service.ts`).
