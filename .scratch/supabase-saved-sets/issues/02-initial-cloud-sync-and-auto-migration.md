# 02 — Initial Cloud Sync and Auto-Migration

**What to build:** First-time cloud backup and bi-directional progression synchronization upon logging in. When a user authenticates, any chord progressions currently stored in their browser's local storage are automatically uploaded to Supabase via the Cloudflare Worker BFF, while any existing progressions in their Supabase account are pulled down and merged into their local Sets library without data loss.

**Blocked by:** 01 — User Auth Lifecycle and Modal

**Status:** completed

- [x] PostgreSQL DDL schema defines relational `sets` and `set_chords` tables with cascade deletes, composite primary keys, and RLS policies in `worker/schema.sql`.
- [x] Cloudflare Worker validates incoming Supabase JWTs (`Authorization: Bearer <token>`) and forwards authenticated PostgREST queries with user-scoped RLS.
- [x] Cloudflare Worker `POST /api/sync` handles upserting chord sets and their ordered child chord rows (`set_chords`).
- [x] Signing into the app initiates an automatic sync: local unsynced progressions are uploaded, and remote cloud progressions are pulled.
- [x] Merge algorithm resolves timestamp conflicts (newest `lastModified` wins) and marks sets as synced.
- [x] Sets library view instantly reflects the merged set collection.
- [x] Unit tests verify schema relational mapping, JSON-to-row transformation, and auto-merge algorithm.
