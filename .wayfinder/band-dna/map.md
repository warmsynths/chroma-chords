# Wayfinder Map: Band DNA & Songwriting Trick Modes

## Destination

Transform Band DNA from an obscure, passive swap-lane list-hoister into a prominent, intuitive, and immediate songwriting feature in Chroma Chords:
- **Prominent Main-Stage Surfacing**: Moved out of the Vibe popover into an active artist bar right on the main loop canvas.
- **Immediate Generation & Mutation**: Users can 1-click generate an authentic signature band progression or use "Spice with Band Tricks" to inject iconic moves into their existing loop.
- **Key-Agnostic Harmonic Trick Engine**: Dynamically evaluates and applies band tricks across all 12 keys (Major $III$, minor $iv$, $\flat VII$, chromatic mediants, $\mu$-majors) with clear visual badges on chord cards.
- **Audible Sonic Alignment**: Connects band profiles to Tone.js instrument presets, tempo defaults, and signature playback styles.

## Notes

- **Domain**: Music Theory, Harmonic Substitution, Modal Interchange, Tone.js Audio Voicing, Web Components / TypeScript UI.
- **Skills consulted**: `domain-modeling`, `codebase-design`, `high-end-visual-design`, `impeccable`.
- **Standing Preferences**:
  - Carry execution into the map itself: resolve tickets to concrete, verified implementation in-tree.
  - Authentic visual branding: retain styled band badges with custom typography and colors.
  - Non-destructive workflow: user can generate a full band progression or surgically spice their current loop.

## Decisions so far

- [T1: Fix Diatonic Snap-Back in alignChordsToScale](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/001-fix-diatonic-snap-back.md) — Preserved requested chromatic qualities on diatonic roots ($III$, $III^7$, $II^7$, $iv$, $iv^7$, $\flat VII$, $\flat VI$, $\flat III$, $\flat II$) with accurate Roman numerals, notes, tension, and function labels.
- [T2: Band DNA Harmonic & Sonic Taxonomy Specification](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/002-band-dna-taxonomy-spec.md) — Specified exact harmonic rules, few-shot progressions, Tone.js instrument params, and strum patterns for Oasis, Beatles, Radiohead, Nirvana, Steely Dan, and Mac DeMarco.
- [T3: Key-Agnostic Band Harmonic Engine & Archetype Progression Generators](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/003-key-agnostic-band-engine.md) — Implemented `band-dna-service.ts` with typed archetypes, progression generation in all keys, dynamic trick evaluations, and test coverage.
- [T4: Prominent Band DNA Studio Bar & Interactive Trick Strip](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/004-band-dna-studio-bar.md) — Surfaced Band DNA directly on center stage with an interactive tray, 1-click generation, and quick "Spice with Trick" injection.
- [T5: Dynamic Band Tricks in Chord Inspector & Card Badges](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/005-inspector-tricks-and-badges.md) — Rendered visual star trick badges on matching chord pads and made the active artist tricks group appear as the default top group in the Chord Swap Lane.
- [T6: Sonic Profiles & Playback Preset Integration](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/006-sonic-profiles-playback.md) — Automatically synchronized instrument selection, tempo BPM, and rhythm playback style when an artist profile is engaged.

## Frontier (Open & Active Tickets)

None. All destination tickets are completed and verified!

## Not yet specified

- **Custom User Band Profile Builder**: UI & localStorage schema allowing users to define and save their own band harmonic recipes and share them.
- **Multi-Band Hybrid Fusion**: Blending two band signatures into a hybrid prompt/engine output (e.g. 50% Beatles + 50% Tame Impala).

## Out of scope

- Full multi-track MIDI song arrangement generation beyond the progression / playback engine.
