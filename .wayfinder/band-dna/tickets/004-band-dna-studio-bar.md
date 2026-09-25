# T4: Prominent Band DNA Studio Bar & Interactive Trick Strip

**Label**: `wayfinder:prototype`
**Type**: HITL
**Status**: Completed

## Question

How should Band DNA be surfaced directly on the main Loop Screen studio canvas so that it is instantly discoverable, attractive, and gives immediate value?
1. Where does the artist selection bar sit (above the chord pads vs in the top controls)?
2. What happens immediately when an artist is selected (active banner with "Generate Progression" and 1-click "Spice with Trick" mutator buttons)?
3. How are trick badges rendered on chord pads?

## Resolution

1. **Main Stage Surfacing**: Created `.band-dna-studio-strip` directly on center stage above the chord pads in `loop-screen.ts`. Displays all 6 archetypes (Oasis, The Beatles, Radiohead, Nirvana, Steely Dan, Mac DeMarco) with authentic brand typography, weights, and palette colors.
2. **Interactive Active Tray**: Selecting an artist expands an active tray that summarizes the band's aesthetic, displays a 1-click `🚀 Generate [Band] Loop` button, and surfaces quick `Spice with Trick` chips.
3. **1-Click Generation & Spicing**: Users can generate a full authentic 8-bar progression in any key, or click a trick chip to surgically inject the trick into the progression.
4. **Verified**: End-to-end verified with unit tests (`band-dna-interactions.test.ts`) and browser automation (`band_dna_stage_test_1789794078863.webp`).
