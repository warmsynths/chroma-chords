# T01: Redesign Architecture & Modular Component Specification

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Closed / Complete
**Blocked By**: None

## Question

How should the monolithic `loop-screen.ts` (~6,400 lines) be structured into modular Web Components (`LitElement`) to support the 4-tab redesign (`Chords`, `Melody`, `Song`, `Play it`) while adhering strictly to `Styleguide.dc.html` and `CLAUDE.md`?

## Resolution

Defined comprehensive specification in [spec.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/spec.md):
- Established root component `chroma-chords-app.ts` as the central state holder and store synchronizer.
- Defined sub-components under `src/components/tabs/` (`tab-chords.ts`, `tab-melody.ts`, `tab-song.ts`, `tab-play.ts`).
- Defined shell components (`app-header.ts`, `transport-bar.ts`, `mobile-dock.ts`, `chord-inspector.ts`).
- Confirmed design rules: Mood-tinted main panel (18% alpha), 26px/22px radius, identical mobile padding `14px 18px 26px`, Tier 1 ink tabs, Tier 2 sunken segmented controls.
- Confirmed legacy performance recording lanes are out of scope (no recording in design).
- Confirmed voice leading links, cadences, and chord intervals are integrated into the desktop Chord Detail Inspector aside.
