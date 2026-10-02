# T08: Play It Tab (`tab-play.ts`) & Interactive Instrument Visualizers

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Closed
**Blocked By**: None

## Question

How should the Play It tab be built to render interactive 2-octave piano keyboard SVGs, guitar fretboard chord diagrams, and ukulele fretboard chord diagrams, with scale degrees toggle and click-to-play audio triggering?

## Acceptance Criteria

1. Implement `src/components/tabs/tab-play.ts`:
   - Panel Header:
     - Tier-2 sunken segmented control: `Piano` | `Guitar` | `Ukulele`.
     - "Scale degrees" toggle switch (toggles degree numbers 1..7 vs pitch names on keys/frets).
     - Subtitle hint explaining fingering or voicing characteristics.
   - Piano Visualizer Grid:
     - Renders a 2-octave mini piano SVG keyboard card for each chord in the progression.
     - White keys and black keys with highlighted note dots corresponding to the chord's voicing.
     - Note names / scale degree labels positioned above keys.
     - Tapping the piano card triggers Web Audio / Tone.js playback of that chord voicing.
   - Guitar & Ukulele Fretboard Grid:
     - Computes open/barre chord voicings using `guitarVoicing(name)` and `ukeVoicing(name)`.
     - Renders standard chord box SVG diagrams:
       - 6 strings for Guitar, 4 strings for Ukulele.
       - Frets 1 to 5 with starting fret position indicator when above fret 1.
       - Finger marker circles with optional scale degree numbers.
       - Open string `○` and muted string `×` badges above the nut.
     - Tapping any fretboard card triggers that chord's audio playback.
