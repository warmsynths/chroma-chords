# T05: Desktop Right-Hand Aside & Chord Detail Inspector

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Closed
**Blocked By**: None (Completed)

## Question

How should the desktop right-hand sidebar be structured to display the Tension Arc narrative, Save/Saved sets library, and the Chord Detail Inspector (with Voice Leading analysis, Cadences, Voicings, and Intervals)?

## Acceptance Criteria

1. Implement `src/components/aside/chord-inspector.ts`:
   - Visible on Desktop when in `Chords` or `Play it` tab (`width: clamp(304px, 26vw, 384px)`).
   - Top Header:
     - Small-caps header `THIS LOOP`.
     - Save button (bookmark icon + label).
     - Loops Library button (e.g. `Loops (4)`) with popover list of saved sets.
   - Idle State (`selClosed`):
     - Tension arc title (e.g. `Stays close to home`, `A steady climb`, `Away, then home`, `Drifts, then settles`).
     - Tension arc descriptive sentence.
     - Interactive Tension Bar Chart: Vertical bars for each chord in the progression, height and color mapped to tension, clicking a bar selects that chord.
   - Chord Detail Inspector (`selOpen`):
     - Chord name and Roman numeral.
     - Voicing / Inversion selector (Root position, 1st inversion, 2nd inversion, Octave up/down).
     - Scale degrees and chord tones breakdown tokens (Root, 3rd, 5th, 7th, 9th).
     - Voice leading delta link to preceding and subsequent chords (smooth semitone transitions).
     - Cadence indicator badge (e.g. Authentic / Perfect, Plagal, Deceptive, Half) when a cadence occurs.
