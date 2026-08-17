# 04 — Per-Set Storage Model, Save Toast & Undo

**What to build:** Complete persistence overhaul saving progressions as immutable, UUID-keyed snapshots in `ProjectStorageManager`. Replaces the single global boolean with a dynamic lookup against `savedSets` to reflect real bookmark states across screens. When saving a progression, an animated bottom toast appears above the transport stating *"Saved to your sets"* with a **[View]** link to the library and an **[Undo]** button that immediately reverses the save and removes the record within 4.5 seconds.

**Blocked by:** 01 — Core Flow Wiring, Vibe Submit & Hash Routing

**Status:** ready-for-agent

- [ ] `ProjectStorageManager` stores individual named progression sets in `savedSets` keyed by unique ID.
- [ ] Bookmark icon state dynamically reflects whether the active progression ID is present in `savedSets`.
- [ ] Saving a progression triggers an animated floating toast anchored above the transport.
- [ ] The save toast contains a **[View]** link that opens the Sets screen (`#sets`).
- [ ] The save toast contains an **[Undo]** button that immediately un-saves the set and restores unbookmarked state.
- [ ] Toast automatically dismisses after 4.5 seconds.
- [ ] Storage tests verify multi-set saving, retrieval, and undo rollback functionality.
