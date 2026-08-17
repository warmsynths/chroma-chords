# 05 — Sets Library Management & Empty State

**What to build:** Full CRUD management on the Sets screen (`sets-screen`). Enables users to rename saved progression sets inline directly on the card and delete sets with an inline card confirmation state (*"Delete this set? [Cancel] [Delete]"*) without modal popups. When no sets are saved, renders a guided empty state that points users back to the Seed screen to generate their first loop.

**Blocked by:** 04 — Per-Set Storage Model, Save Toast & Undo

**Status:** ready-for-agent

- [ ] Sets screen renders all items from `savedSets` dynamically with proper metadata (name, key, mood, length, date).
- [ ] Each set card has an action menu providing **[Rename]** and **[Delete]** options.
- [ ] Selecting **[Rename]** converts the title into an inline input field, committing changes on Enter or blur.
- [ ] Selecting **[Delete]** reveals an inline confirmation on the card (*"Delete this set? [Cancel] [Delete]"*) without modal dialogs.
- [ ] Deleting a set removes it from `savedSets` and updates the header saved count immediately.
- [ ] When `savedSets` is empty, displays an empty state illustration with a button routing back to Seed generation.
- [ ] Component and storage integration tests verify rename, deletion, and empty state rendering.
