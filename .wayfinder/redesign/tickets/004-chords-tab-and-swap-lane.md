# T04: Chords Tab (`tab-chords.ts`) & Redesigned Swap Lane

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Closed
**Blocked By**: None (Completed)

## Question

How should the chord progression generator, pads grid, Vibe selector pill, Band DNA moves, and the new 5-feeling swap lane with 3-shade tension pills be implemented inside `tab-chords.ts`?

## Acceptance Criteria

1. Create `src/components/tabs/tab-chords.ts`:
   - Panel Header Row: Left: Vibe pill button showing mood dot, current vibe summary, and dropdown chevron. Center/Right: Chord count stepper (`− 4 chords +`) and "Try another" dice button.
   - Band DNA Legend: Top banner when following an artist archetype, displaying color swatch, band name, "Build from this band" button, and dismiss (×).
   - Chord Pad Cards:
     - 4 to 8 chord pads arranged in a responsive grid.
     - Role kicker (e.g. `HOME`, `DRIFTING`, `LIFTING`, `PULLING HOME`) in 10px uppercase 800 weight.
     - Chord symbol in 22px 800 weight (desktop) / 17–22px (mobile).
     - Roman numeral in Space Mono 10px (visible when Theory is on).
     - Background dynamically tinted according to `roleForTension(tension)` on `#9CC0EC` → `#F2735F`.
     - Active playhead step highlighting and keyboard trigger cues (A, S, D, F, Z, X, C, V).
     - Band Move badge pill (e.g. `OASIS MOVE: Cadd9`) when chord matches active band trick.
   - Redesigned Swap Lane (Extrusion Join):
     - Opens under the selected chord pad with animated neck extrusion.
     - 5 Feeling tiles (e.g. "Warm & settled", "Lifting up", "Darker shadow", "Bright surprise", "Moody drift").
     - 3-Shade Tension Pills: Family chords arranged in 3 progressive tension shades (52%, 76%, 100% color-mix with cream).
     - Selected pill shown in ink `#2E271F` with checkmark `✓`.
     - Contextual "why" explanation row and "Keep swap" / "Undo" action.
   - Scale & Mode Diatonic Strip:
     - Expandable panel showing diatonic scale degrees, scale name, and Roman numerals.
