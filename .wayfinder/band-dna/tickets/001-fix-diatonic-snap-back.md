# T1: Fix Diatonic Snap-Back in alignChordsToScale

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Open (Unblocked)

## Question

How do we modify `alignChordsToScale()` in `src/services/chord-engine.ts` so that when a non-diatonic chord quality is requested on a diatonic root (e.g., requested `E major` or `E7` when in key of `C major`), the engine preserves the requested quality and generates an appropriate secondary dominant / borrowed chord block, instead of forcibly snapping it to the diatonic scale quality (`Em`)?
