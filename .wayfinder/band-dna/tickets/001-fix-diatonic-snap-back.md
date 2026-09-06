# T1: Fix Diatonic Snap-Back in alignChordsToScale

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Closed (Resolved)

## Question

How do we modify `alignChordsToScale()` in `src/services/chord-engine.ts` so that when a non-diatonic chord quality is requested on a diatonic root (e.g., requested `E major` or `E7` when in key of `C major`), the engine preserves the requested quality and generates an appropriate secondary dominant / borrowed chord block, instead of forcibly snapping it to the diatonic scale quality (`Em`)?

## Resolution

- Implemented `buildChromaticDegreeBlock()`, `formatDegreeRoman()`, `formatBorrowedRoman()`, and `preferChordFlatSpelling()` in `src/services/chord-engine.ts`.
- Updated `alignChordsToScale()` to compare requested qualities with diatonic degree profiles and preserve chromatic variations ($III$, $III^7$, $II^7$, $iv$, $iv^7$, $\flat VII$, $\flat VI$, $\flat III$, $\flat II$) with accurate Roman numeral analysis, notes, function labels, and tension.
- Verified with comprehensive test suite in `src/services/chord-engine.test.ts` across Oasis ($C \to G \to Am \to E7 \to F$), Beatles ($C \to E7 \to Am \to Fm$), secondary dominants ($D7$), and modal borrowings ($\flat VII, \flat VI, \flat III, \flat II$).

