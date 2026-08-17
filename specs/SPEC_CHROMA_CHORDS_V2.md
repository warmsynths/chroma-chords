# Chroma Chords v2 & UX Audit Specification

## Problem Statement

Users of Chroma Chords love the mood-driven harmonic aesthetic and playful visual concept, but the underlying application fails to deliver on its primary promises:
1. **Broken Primary Actions**: The core "Generate loop" CTA is not wired to transition into the chord progression view, and the hero prompt ("Describe a vibe, hear it as chords") lacks a direct submit button and Enter key handling.
2. **Untruthful Mechanics**: The capacity ring measures typing keystrokes rather than generation attempts, never enforces an actual cooldown, and reads as a static border line rather than an intuitive resource indicator.
3. **Flawed Persistence**: Progression saving relies on a single global boolean, causing un-saving in one view to wipe saved state across all screens while preventing newly saved sets from populating the library. Furthermore, the library lacks rename, deletion, and empty state controls.
4. **Broken Modals & Interactivity**: Modal close buttons (×) and back links fail to dismiss sheets, and chord tiles lack direct tap-to-preview audio feedback despite interface copy claiming *"Tap a chord to preview it"*.
5. **Visual Clutter & Motion Glitches**: Overly busy hero floaters and continuous border-radius morphing introduce visual noise and read as rendering glitches rather than polished craft.

## Solution

Chroma Chords v2 comprehensively resolves all 19 findings from the UX audit:
1. Fully wire the end-to-end happy path from Seed input to Progression loop playback, Song builder, and Sets library.
2. Replace keystroke counting with a discrete 4-arc segmented capacity ring tracking generation attempts, complete with local cooldown timers, countdown status notices, and graceful heuristic fallback.
3. Overhaul project persistence with immutable, UUID-keyed deep progression snapshots, dynamic bookmarking, a save confirmation toast with Undo support, and full library management (inline rename, inline delete confirmation, and empty states).
4. Provide direct chord preview and visual flash on tile tap, enlarge corner hit targets to 44px minimum, ensure comprehensive keyboard navigation and contrast compliance, and streamline animations to deliver calm, high-end whimsy.

## User Stories

1. As a music creator, I want to type a natural language vibe into the hero input and press Enter or the inline circular arrow button, so that I can immediately generate and hear a matching chord progression.
2. As a music creator, I want to click the "Generate loop" button after configuring genre, mood, and length, so that the application seamlessly opens the progression loop screen with matching mood colors.
3. As a user on a mobile device, I want to see explicit length labels (e.g. "8 bars") alongside step indicators, so that I understand exactly how long my progression is without manually counting ticks.
4. As a user, I want the capacity ring to drain by one discrete segment only when I press Generate, so that typing, editing, and exploring vibes does not penalize my usage.
5. As a user whose generation capacity is depleted, I want to see a clear countdown note (*"Refilling — one more in about 40s"*), so that I understand when my next attempt will become available.
6. As a music creator, I want to tap directly on any chord tile in the progression loop, so that I can immediately audition its specific voicing and pitch notes.
7. As a listener, I want tapping an individual chord tile while loop playback is active to pause the loop and isolate the auditioned chord, so that the audio remains clean and intelligible.
8. As a mobile user, I want the chord swap and voicing corner buttons to provide a minimum 44px hit target, so that I can reliably trigger them without accidental miss-taps.
9. As a music creator, I want to click the save bookmark on any progression to store an immutable snapshot in my library, so that I never lose my custom chord modifications and voicings.
10. As a user, I want to receive an immediate bottom toast notification upon saving with a "View" link and an "Undo" action, so that I have clear confirmation and can quickly reverse accidental saves.
11. As a user in the Sets library screen, I want to rename saved chord sets directly on the card, so that I can organize my ideas with descriptive titles.
12. As a user in the Sets library screen, I want to delete unwanted sets with an inline confirmation state on the card, so that I can curate my collection safely without intrusive modal popups.
13. As a first-time user opening the Sets library, I want to see a clean empty state with a direct CTA back to the Seed screen, so that I am guided to generate my first chord loop.
14. As a user navigating modal sheets (Alternate Chords, Voicings, Share, Save), I want the close button (×), background backdrop, and Escape key to close the modal and return me to my previous screen, so that I am never trapped in a dead-end view.
15. As a keyboard and screen-reader user, I want all buttons, links, inputs, and chips to have accessible tab stops and high-contrast `:focus-visible` outlines, so that I can operate the entire app without a pointer device.
16. As a user with visual sensitivity, I want input placeholder text and labels to meet minimum contrast ratios, so that interface prompts are comfortably legible.
17. As a user exploring different moods, I want the progression container to smoothly ease to its new styling on mood change rather than continuously morphing its border radius, so that reading chord notation is calm and stable.
18. As a music creator, I want subtle rhythmic pulses on active chord tiles during playback, so that the interface visually grooves in time with the music.

## Implementation Decisions

### Domain Vocabulary Alignment
The implementation adheres to the terms defined in the domain glossary (`CONTEXT.md`):
- `Progression`: Sequence of `ChordBlock` elements with key, scale, BPM, genre, and mood parameters.
- `ChordBlock`: Individual chord unit specifying root pitch, quality, extension, voicing, and pitch notes.
- `SongSection`: Formatted section template for song building.
- `ProjectStorageManager`: Deep persistence module managing local storage and cloud synchronization.
- `PlaybackEngine`: Web Audio scheduling and active chord step engine.
- `PromptClassifier`: Heuristic and LLM resolution pipeline.

### Architectural & State Seams
1. **Routing & Screen Navigation**:
   - Synchronize internal Lit application screen state (`seed`, `loop`, `song`, `sets`) with browser hash routes (`#seed`, `#loop`, `#song`, `#sets`).
   - Listen to `hashchange` and `popstate` events to support browser back/forward buttons and modal state dismissal.

2. **Discrete 4-Arc Capacity Mechanism**:
   - Replace continuous stroke-based capacity with a discrete state machine: `charges` (0–4) and `lastChargeTimestamp`.
   - Each Generate submission decrements `charges` by 1.
   - Recharge timer ticks every 1 second, restoring 1 charge every 45,000ms.
   - State persisted in `localStorage` under `chroma_chords_capacity_v2`.
   - When `charges === 0`, disable Generate submission, lower CTA opacity, and render on-demand countdown notice.

3. **Per-Set Storage Model (`ProjectStorageManager`)**:
   - Store saved sets in an indexed collection `savedSets: Record<string, ProjectData>`.
   - Saving creates a deep immutable snapshot containing `id`, `name`, `progression`, `sections`, `tempo`, `genre`, `mood`, and `updatedAt`.
   - `isSaved` checks whether the active progression ID exists in `savedSets`.
   - Deletion removes the key and updates bookmark status reactively.

4. **Toast & Undo Feedback System**:
   - Centralized toast layer in `chroma-chords-app` anchored above the bottom transport.
   - Dispatches a 4500ms auto-dismissing toast on save with `View` and `Undo` callbacks.

5. **Audio Auditioning on Tile Interaction**:
   - Attach click handlers directly to chord tile elements that invoke `audioService.playChordNotes(chord.notes)` and dispatch a brief `tile-flash` animation.
   - When `playbackEngine.isPlaying` is true, pause playback before auditioning.

6. **Motion & Aesthetic Clean-up**:
   - Reduce hero floating shapes to 3 slow, non-distracting drifting SVGs (`cvfv-float1`, `cvfv-float2`, `cvfv-float3`).
   - Eliminate perpetual `panelMotionStyle` border-radius morphing in favor of a one-shot CSS transition on mood change.
   - Enforce 44px min hitboxes across all interactive controls.

## Testing Decisions

### Behavior-First Testing Philosophy
Tests verify public interfaces and observable behaviors rather than internal implementation private fields.

### Module Test Coverage
1. **`project-storage.test.ts`**:
   - Verify multi-set persistence, retrieval, deletion, and reactive bookmark status updates.
   - Verify immutable snapshot preservation across multiple saved sets.
2. **`playback-engine.test.ts`**:
   - Verify play, stop, step advancement, and pause-on-chord-audition behavior.
3. **`freetext-service.test.ts` & Capacity Logic**:
   - Verify capacity ring decrement on generation attempt, 45s timer recharge calculations, and depletion lockouts.
4. **Integration & Plumbing (`plumbing.test.ts`)**:
   - Verify end-to-end event flow: free-text submit -> progression generation -> loop view routing -> tile click audition -> save toast with undo -> sets screen management.

### Prior Art
Builds on existing test fixtures in [project-storage.test.ts](file:///c:/reyn/Projects/chroma-chords/src/services/project-storage.test.ts), [playback-engine.test.ts](file:///c:/reyn/Projects/chroma-chords/src/services/playback-engine.test.ts), and [plumbing.test.ts](file:///c:/reyn/Projects/chroma-chords/src/services/plumbing.test.ts).

## Out of Scope
- Direct DAW MIDI hardware interface export (external MIDI file download remains supported).
- Multi-user real-time collaborative editing sessions.
- Adding third-party CSS utility frameworks (all styling uses vanilla scoped CSS with design tokens).

## Further Notes
- All design tokens match `--cv-cream`, `--cv-surface`, `--cv-ink`, `--cv-red`, `--cv-plum`, and associated color palettes from [Chroma Chords v2.dc.html](file:///c:/reyn/Projects/chroma-chords-design/Chroma%20Chords%20v2.dc.html).
- Reduced-motion media query (`@media (prefers-reduced-motion: reduce)`) is respected across all animation keyframes.
