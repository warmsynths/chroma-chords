# Wayfinder Map: Band DNA & Songwriting Trick Modes

## Destination

Ship "Band DNA / Songwriting Trick Profiles" in Chroma Chords: enable users to compose and generate progressions infused with signature band harmonic tricks (e.g. Oasis Major III & bVII, Beatles minor iv, Radiohead chromatic mediants, Steely Dan mu-majors), featuring visual band logo badges in the UI, NLP prompt recognition, audio playback voicings/tones, and fix the diatonic quality snap-back in `alignChordsToScale`.

## Notes

- **Domain**: Music Theory, Harmonic Substitution, Modal Interchange, Tone.js Audio Voicing, Web Components / TypeScript UI.
- **Skills to consult**: `domain-modeling`, `codebase-design`, `high-end-visual-design`, `impeccable`.
- **Standing Preferences**:
  - Hybrid Architecture: Support both Cloud LLM prompts and deterministic local offline fallbacks.
  - Visual Badges: Use authentic, high-polish band logo badges/pills.
  - Audio Authenticity: Band modes must affect chords, voicings (e.g. pedal notes), instrument presets, and strum rhythm.

## Decisions so far

- [T1: Fix Diatonic Snap-Back in alignChordsToScale](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/001-fix-diatonic-snap-back.md) — Preserved requested chromatic qualities on diatonic roots ($III$, $III^7$, $II^7$, $iv$, $iv^7$, $\flat VII$, $\flat VI$, $\flat III$, $\flat II$) with accurate Roman numerals, notes, tension, and function labels.
- [T2: Band DNA Harmonic & Sonic Taxonomy Specification](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/002-band-dna-taxonomy-spec.md) — Specified exact harmonic rules, few-shot progressions, Tone.js instrument params, and strum patterns for Oasis, Beatles, Radiohead, Nirvana, Steely Dan, and Mac DeMarco.

## Frontier (Open & Unblocked Tickets)

- [T3: Band Logos & Visual Icon Assets](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/003-band-logos-assets.md) (`wayfinder:task`)
- [T4: Worker & LLM Prompt Injection for Band Modes](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/004-worker-llm-band-prompt.md) (`wayfinder:task`)
- [T5: Offline Engine Band Transforms & Voicing Bias](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/005-offline-engine-band-transforms.md) (`wayfinder:task`)

## Blocked Tickets

- [T6: Band DNA UI Selector & Quick-Pills Component](file:///e:/work/chroma-chords/.wayfinder/band-dna/tickets/006-band-dna-ui-selector.md) (`wayfinder:prototype`, blocked by T3, T5)

## Not yet specified

- **Custom User Band Profile Builder**: UI & localStorage schema allowing users to define and save their own band harmonic recipes and share them.
- **Multi-Band Hybrid Fusion**: Blending two band signatures into a hybrid prompt/engine output (e.g. 50% Beatles + 50% Tame Impala).
- **Interactive Trick Inspector Tooltip**: Hovering over a chord block in the UI highlights which band songwriting trick generated it (e.g., "Oasis Trick: Major III substituted for minor iii").

## Out of scope

- Full multi-track MIDI song arrangement generation beyond the progression / playback engine.
