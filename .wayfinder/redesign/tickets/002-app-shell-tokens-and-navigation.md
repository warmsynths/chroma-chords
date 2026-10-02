# T02: Design Tokens, Typography & Unified App Shell Navigation

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Ready / Frontier
**Blocked By**: [T01: Redesign Architecture & Modular Component Specification](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/001-redesign-architecture-spec.md)

## Question

How do we establish the foundational design tokens, Google Fonts (`Plus Jakarta Sans`, `Space Mono`), Tier-1 navigation tabs in `app-header.ts`, AI capacity token indicator, and the single tinted panel layout wrapper?

## Acceptance Criteria

1. Update `index.html` and `index.css` / `design-tokens.css` with Google Fonts (`Plus Jakarta Sans` 400/500/600/700/800, `Space Mono` 400/700) and color tokens (`--cv-cream: #FBF3E6`, `--cv-surface: #F6EADB`, `--cv-surface-2: #F1E4CC`, `--cv-ink: #2E271F`, `--cv-label: #8A6B3F`, etc.).
2. Refactor `app-header.ts` to include:
   - Chroma Chords logo (overlapping coral & blue circles).
   - Tier-1 navigation pills (`Chords`, `Melody`, `Song`, `Play it`) with ink fill `#2E271F` on selected, cream text, on sunken surface `#F1E4CC`.
   - AI capacity chip with 4 pips and tooltip/popover ("AI generates remaining · Refills in 60s").
   - Sign in button / User initial circle with account menu popover (Your sets, MIDI modal, Sync now, Sign out).
3. Create the responsive single-panel shell layout in `chroma-chords-app.ts`:
   - Mobile panel wrapper with exact padding `14px 18px 26px`.
   - Main panel background set to `color-mix(in oklab, [moodColor] 18%, transparent)` or `rgba(mood, 0.18)`.
   - Desktop corner radius 26px, mobile corner radius 22px.
   - Smooth panel motion transitions when switching moods.
