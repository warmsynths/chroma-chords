# T03: Unified Transport Bar & Mobile Dock Component

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Blocked
**Blocked By**: [T02: Design Tokens, Typography & Unified App Shell Navigation](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/002-app-shell-tokens-and-navigation.md)

## Question

How should the persistent transport controls be extracted into `transport-bar.ts` (desktop dark bar `#2E271F`) and `mobile-dock.ts` (mobile dock with expandable sheets), ensuring identical control order across Chords, Melody, and Song?

## Acceptance Criteria

1. Implement `transport-bar.ts` adhering to `Styleguide.dc.html`:
   - Dark background `#2E271F`, padding 10px 12px, border-radius 20px.
   - Play/Stop pill button with purple background `#C9A9E0` and `#2E271F` text.
   - Section scope selector (`Chorus ▾`).
   - Loop bar chips (e.g. `[1] [2] [3] [4]`) with active step glow.
   - Sound selector popover (`Stage Rhodes ▾`, `Grand Piano`, etc.) with independent state for Chords vs Melody.
   - Feel selector popover (`Block ▾`, `Arp`, `Strum`, etc.) with independent state for Chords vs Melody.
   - Key & Scale popover (`C maj ▾`) with root note picker and scale mode selection.
   - Tempo stepper (`− 84 +`) with Space Mono BPM readout.
   - Share button (circle `#FBF3E6` with upload/share icon).
2. Implement `mobile-dock.ts` and `mobile-settings.ts` for narrow viewports:
   - Compact dock housing Play, Section, Sound/Feel, Tempo, and Export triggers.
   - Bottom sheet modals for Harmony/Mode, Loop, and Tempo.
3. Wire playback events with `playbackEngine` for real-time playhead tracking.
