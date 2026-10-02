# T10: End-to-End Visual Audit, Mobile Verification & Design Checklist

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Blocked
**Blocked By**: [T04: Chords Tab & Redesigned Swap Lane](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/004-chords-tab-and-swap-lane.md), [T05: Desktop Right-Hand Aside & Chord Detail Inspector](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/005-desktop-aside-and-chord-inspector.md), [T06: Melody Tab & MelodyGrid Sequencer](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006-melody-tab-and-grid-sequencer.md), [T07: Song Tab & Section Arrangement Arranger](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/007-song-tab-and-section-arranger.md), [T08: Play It Tab & Interactive Instrument Visualizers](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/008-play-it-tab-instrument-visualizers.md), [T09: Multi-Track Export & Web MIDI Routing Modal](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/009-multitrack-export-and-midi-modal.md)

## Question

How do we systematically verify that all four tabs across desktop and mobile viewports satisfy the design contract outlined in `Styleguide.dc.html` and `CLAUDE.md`?

## Acceptance Criteria

1. Execute the 8-Screen Visual Audit:
   - Capture side-by-side screenshots of all 4 tabs (`Chords`, `Melody`, `Song`, `Play it`) on Phone (390px) and Desktop (1280px).
2. Complete CLAUDE.md Pre-Handback Checklist:
   - [ ] Gap from Nav → Panel is exactly identical on every tab (`padding: 14px 18px 26px` on mobile wrapper).
   - [ ] Panel background color is current mood color at 18% alpha (`rgba(..., 0.18)`), radius is 26px desktop / 22px mobile.
   - [ ] Panel header row follows the standard (small-caps uppercase label + count or primary context pill on left, Tier-2 segmented control on right; no large title).
   - [ ] Segmented controls strictly adhere to Tier 2 styling (sunken track, cream chip selected; never ink fill).
   - [ ] Chord-name typography matches across all tabs (800 weight, Plus Jakarta Sans, Space Mono Roman numeral when Theory is on).
   - [ ] Hover and press feedback present on every interactive button, chip, and tile (`cursor: pointer`).
   - [ ] No fixed heights anywhere; layout wraps cleanly on narrow desktop viewports (~900px).
3. Validate Playwright automated e2e test suite passing for navigation, chord swapping, melody sequencing, and song arrangement.
