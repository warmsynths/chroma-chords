# 0001: Supabase Saved Sets with BFF Cloudflare Worker Proxy

## Context
Chroma Chords previously backed up saved progressions as a monolithic JSON blob in Google Drive AppData, requiring Google Identity Services authentication with hardcoded email whitelisting. This introduced high authentication friction, overwrite race conditions on concurrent devices, and tight coupling between auth tokens and AI rate limiting.

## Decision
We migrated cloud persistence to a dedicated Supabase PostgreSQL instance using an offline-first architecture fronted by a Cloudflare Worker Backend-For-Frontend (BFF):
1. **BFF Proxy**: All sync requests go through `POST /api/sync` on the Cloudflare Worker, which validates the Supabase user JWT and forwards requests to PostgREST under Row Level Security (`auth.uid() = user_id`).
2. **Normalized Schema**: Saved progressions are split into relational `sets` (metadata) and `set_chords` (ordered chord voicings) tables with `ON DELETE CASCADE`.
3. **Offline-First Delta Sync**: The client uses `localStorage` as the synchronous source of truth for immediate UI responsiveness, syncing bidirectionally via `updated_at` timestamps and soft-delete tombstones (`deleted_at`).
4. **Open Auth**: Authentication uses `@supabase/supabase-js` supporting email/password and Google OAuth without whitelist barriers.

## Consequences
- The client does not query Supabase database tables directly; all mutations and delta queries pass through the `/api/sync` worker contract.
- Deleted projects require tombstone tracking in local storage to prevent remote sets from resurrecting on sync.
