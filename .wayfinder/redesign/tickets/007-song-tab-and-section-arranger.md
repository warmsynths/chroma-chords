# T07: Song Tab (`tab-song.ts`) & Section Arrangement Arranger

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Closed
**Blocked By**: None

## Question

How should the Song tab be structured to present the Section Library (Verse, Chorus, Bridge, Outro) and the reorderable Song Order timeline with repeat counters, integrating with `song-arranger.ts`?

## Acceptance Criteria

1. Implement `src/components/tabs/tab-song.ts`:
   - Two-column responsive desktop layout:
     - Left Column: **Sections Library** ("Sections · edit once, used everywhere"):
       - Cards for each distinct section (`Verse`, `Chorus`, `Bridge`, `Outro`, etc.).
       - Section tag badge (`A`, `B`, `C`), section name, bar length descriptor.
       - Mini chord chips showing the progression chords.
       - "+ Add to song" button to append a section instance to the song order.
       - "Edit chords" (navigates to Chords tab) and "Edit melody" (navigates to Melody tab) actions.
       - "+ New section from loop" button to branch the current loop into a new section.
     - Right Column: **Song Order Timeline**:
       - Reorderable list of section instances (e.g. `1 A Verse ×2`, `2 B Chorus ×1`, `3 C Bridge ×1`, `4 B Chorus ×2`).
       - Drag handles (`⋮⋮`) for reordering sections.
       - Stepper buttons (`− ×N +`) to adjust repetitions per section.
       - Remove button (`×`) to drop a section from the song timeline.
       - Full-width playback progress highlight bar moving across the active playing section.
   - Transport Bar Integration:
     - When on the Song tab, the Transport Play button labels `Play song · N parts` and runs through all sequenced sections sequentially.
