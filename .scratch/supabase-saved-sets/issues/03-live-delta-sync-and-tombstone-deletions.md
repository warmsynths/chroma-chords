# 03 — Live Delta Sync and Tombstone Deletions

**What to build:** Seamless background delta synchronization for ongoing edits and multi-device deletions. When a user saves, modifies, or renames a progression, the change is instantly saved locally and pushed to the cloud in the background with a 2-second debounce. When a user deletes a progression, a tombstone (`deleted_at`) is created and synced to prevent the deleted set from resurrecting on other devices.

**Blocked by:** 02 — Initial Cloud Sync and Auto-Migration

**Status:** ready-for-agent

- [ ] Saving a new or modified progression queues a debounced (2-second) background sync request to the Worker.
- [ ] Renaming a set in the Sets library view updates the local title immediately and persists the update to Supabase.
- [ ] Deleting a set creates a local tombstone record (`deleted_at` timestamp) in addition to removing the set from active views.
- [ ] The sync payload transmits tombstone records to `POST /api/sync`, setting `deleted_at` on the remote `sets` row and removing child `set_chords`.
- [ ] Incoming delta syncs from other devices soft-delete matching local sets whose remote `deleted_at` is set.
- [ ] Offline edits and deletions are held in local storage buffers and flushed to the server upon the next successful connection.
- [ ] Automated tests verify tombstone creation, delta payload formatting, and deletion propagation.
