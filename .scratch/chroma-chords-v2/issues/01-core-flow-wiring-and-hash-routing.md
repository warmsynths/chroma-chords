# 01 — Core Flow Wiring, Vibe Submit & Hash Routing

**What to build:** Full end-to-end user path from entering a vibe or selecting seed parameters to generating a chord progression and viewing it in the loop screen. Includes an inline circular arrow submit button and Enter key handling inside the vibe input, "Generate loop" CTA button wiring on mobile and desktop seed screens that carries mood color into the progression view, synchronization of application screens with browser hash routes (`#seed`, `#loop`, `#song`, `#sets`), and clean modal dismissal via the close button (×), dimmed backdrop click, and Escape key.

**Blocked by:** None — can start immediately

**Status:** ready-for-agent

- [ ] Typing a vibe text into the hero input and pressing Enter generates the progression and routes to the loop screen.
- [ ] An inline circular arrow button appears active inside the vibe input pill when text is present, clicking it generates the progression and routes to the loop screen.
- [ ] Clicking "Generate loop" on both desktop and mobile seed screens generates the progression with the selected genre, mood, and length, routing to `#loop` with matching mood color theme.
- [ ] Browser hash routes (`#seed`, `#loop`, `#song`, `#sets`) stay in sync with the active screen and respond to browser back/forward navigation.
- [ ] All modals (Alternate Chords, Voicings, Share, Save) close cleanly when clicking the × button, clicking the dimmed backdrop, or pressing Escape.
- [ ] Navigation and flow integration tests verify route transitions and submission paths.
