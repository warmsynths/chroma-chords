# Chroma Chords: Supabase Saved Sets & BFF Cloud Sync Specification

## Problem Statement

Currently, Chroma Chords relies on Google Drive App Data (`google-drive-service.ts`) for cloud backup of saved chord sets. This setup presents critical usability and architectural flaws:
1. **High Friction Google Auth Dependency**: Users must authenticate exclusively via Google Identity Services (GIS), which fails or blocks users without Google accounts and requires heavy third-party client script loading (`accounts.google.com/gsi/client`).
2. **Hardcoded Whitelist Barrier**: Sign-in is restricted by client-side SHA-256 email hashes (`AUTHORIZED_HASHES`), preventing everyday creators from backing up their progressions to the cloud.
3. **Monolithic Unstructured Storage**: All projects are stored as a single monolithic JSON blob inside Google Drive App Data. This makes multi-device concurrent editing vulnerable to full overwrite race conditions and prevents relational querying or filtering.
4. **Tight Coupling with AI Services**: Google authentication tokens are tangled with LLM free-text prompt classification rate limits, creating coupled failure modes between audio generation and storage.

## Solution

Migrate Chroma Chords' saved sets persistence layer to a dedicated **Supabase PostgreSQL** instance with a **Backend-For-Frontend (BFF)** architecture hosted on Cloudflare Workers, mirroring the proven offline-first sync engine in Practice Tracker:
1. **Dedicated Supabase Project & Open Auth**: Provide a clean authentication experience supporting Email/Password and Google OAuth via `@supabase/supabase-js`, removing all hardcoded email hash whitelist checks.
2. **BFF Cloudflare Worker Proxy**: All cloud synchronization requests (`POST /api/sync`) pass through Chroma Chords' Cloudflare Worker. The worker validates the incoming Supabase JWT and forwards authenticated requests to Supabase PostgREST with user-isolated Row Level Security (RLS).
3. **Normalized Relational Schema**: Split chord sets into relational `sets` (parent metadata) and `set_chords` (ordered chord rows with voicings and tags) tables with cascade deletes, enabling atomic updates and relational integrity.
4. **Offline-First Delta Sync with Tombstones**: Cache all sets locally in `localStorage` for instantaneous UI loading. Sync bidirectionally using `updated_at` timestamps and soft-delete tombstones (`deleted_at`) to propagate additions, edits, and deletions seamlessly across devices.
5. **Seamless First-Time Auto-Merge**: Automatically preserve and merge existing local sets into Supabase when a user signs in for the first time, ensuring zero data loss.
6. **Unified Aesthetic Auth UI**: Introduce a lightweight, accessible Lit Auth Modal styled with Chroma Chords' warm cream/ink aesthetic and playful micro-interactions.

---

## User Stories

1. As a music creator, I want to create and modify chord sets locally without signing in, so that I can immediately start writing music with zero onboarding barrier.
2. As an authenticated user, I want my saved sets to sync automatically to the cloud in the background, so that my progressions are safely backed up across all my devices.
3. As a music creator, I want to sign up or sign in using my email and password in a custom modal, so that I have a straightforward, privacy-conscious account option.
4. As a creator on mobile, I want a "Continue with Google" one-click sign-in button, so that I can quickly authenticate on my phone without typing credentials.
5. As an existing Chroma Chords user with saved sets in my browser, I want my local sets to automatically upload to my account upon first sign-in, so that I never lose previously created progressions.
6. As a user working offline or on unstable internet, I want to continue creating, renaming, and deleting sets without errors, so that network drops do not disrupt my creative flow.
7. As a user reconnecting after working offline, I want the app to automatically sync queued changes to the cloud when a connection is restored, so that my remote library stays up to date.
8. As a user deleting a saved set on one device, I want the deletion to propagate to my other devices on their next sync, so that deleted sets do not resurrect.
9. As a creator renaming a chord progression, I want the title change to persist to the database without overwriting individual chord voicings or arrangement data, so that my edits remain intact.
10. As a user on the Sets library screen, I want to see a clear sync status badge (e.g. "Synced", "Syncing...", "Offline", or "Sign In to Sync"), so that I always understand the state of my cloud backup.
11. As a user on the Sets library screen, I want a manual "Sync Now" button with an animated spinner, so that I can trigger an immediate refresh whenever I want.
12. As a user sharing a device, I want to sign out easily from the Sets screen or settings, so that my saved progressions are not accessible or modified by others.
13. As a creator with large progressions, I want each chord's full voicing details (notes, roman numeral, tension, scale degree, function label, custom tags) stored faithfully, so that loading a set reproduces the exact original harmonic voice leading.
14. As a user, I want the application to load instantly from local storage before any network sync requests complete, so that the app always feels responsive and snappy.
15. As a privacy-conscious user, I want my saved progressions to be protected by database Row Level Security, so that other users cannot read or modify my chord sets.

---

## Implementation Decisions

### 1. Database Schema (`worker/schema.sql`)
A normalized PostgreSQL schema hosted on a dedicated Supabase project:
- **`sets` table**:
  - `user_id`: `UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE`
  - `id`: `TEXT NOT NULL` (UUID generated on client)
  - `name`: `TEXT NOT NULL`
  - `genre`: `TEXT NOT NULL`
  - `mood`: `TEXT NOT NULL`
  - `key`: `TEXT NOT NULL`
  - `scale_type`: `TEXT NOT NULL`
  - `bpm`: `INTEGER NOT NULL DEFAULT 120`
  - `show_theory`: `BOOLEAN NOT NULL DEFAULT true`
  - `deleted_at`: `TIMESTAMPTZ NULL`
  - `updated_at`: `TIMESTAMPTZ NOT NULL DEFAULT now()`
  - Primary Key: `(user_id, id)`
- **`set_chords` table**:
  - `user_id`: `UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE`
  - `set_id`: `TEXT NOT NULL`
  - `position`: `INTEGER NOT NULL`
  - `name`: `TEXT NOT NULL`
  - `tag`: `TEXT NOT NULL DEFAULT ''`
  - `roman`: `TEXT NOT NULL DEFAULT ''`
  - `color`: `TEXT NOT NULL DEFAULT ''`
  - `function_label`: `TEXT NOT NULL DEFAULT ''`
  - `notes`: `TEXT[] NOT NULL`
  - `scale_label`: `TEXT NOT NULL DEFAULT ''`
  - `desc`: `TEXT NOT NULL DEFAULT ''`
  - `degree`: `TEXT NOT NULL DEFAULT ''`
  - `scale_key`: `TEXT NOT NULL DEFAULT ''`
  - `tension`: `NUMERIC NOT NULL DEFAULT 0`
  - Primary Key: `(user_id, set_id, position)`
  - Foreign Key: `(user_id, set_id)` references `sets(user_id, id)` with `ON DELETE CASCADE`
- **Indexes & RLS**:
  - Indexes on `sets(user_id, updated_at)` and `set_chords(user_id, set_id)`.
  - Row Level Security enabled on both tables with `auth.uid() = user_id` for all CRUD operations.

### 2. Backend-For-Frontend Worker Architecture
- The Cloudflare Worker (`worker/worker.ts` or modularized with `worker/src/supabase.ts`) serves as the secure proxy.
- **JWT Verification**: Worker parses claims from the `Authorization: Bearer <token>` header, verifying token expiry and user identity (`claims.sub`).
- **Endpoints**:
  - `GET /api/health`: Returns server status and timestamp.
  - `POST /api/sync`: Receives `{ sets: ClientSet[], lastSyncTime?: string }`.
    1. Upserts modified sets to `sets` table.
    2. Synchronizes corresponding rows in `set_chords`.
    3. Fetches sets modified since `lastSyncTime` (including soft-deleted sets with `deleted_at IS NOT NULL`).
    4. Fetches active chord rows for updated sets.
    5. Returns `{ sets: ServerSet[], lastSyncTime: string }`.
- **Security**: The worker passes `Authorization: Bearer <user_token>` to Supabase PostgREST, ensuring database-level RLS enforcement.

### 3. Frontend Architecture & Services
- **`AuthService` (`src/services/auth-service.ts`)**:
  - Encapsulates `@supabase/supabase-js` client instance.
  - Manages session lifecycle (`onAuthStateChange`), email/password sign-up, sign-in, OAuth sign-in, sign-out, and access token retrieval.
  - Exposes observable auth state with listener callbacks for reactive UI updates.
- **`SyncEngine` (`src/services/sync-engine.ts`)**:
  - Manages network communication with Worker `/api/sync`.
  - Implements exponential backoff retry and 8s request timeouts.
- **`ProjectStorageManager` (`src/services/project-storage.ts`)**:
  - Acts as the single source of truth for progression saving, loading, renaming, and deleting.
  - Syncs with `localStorage` (`chroma_chords_projects`) synchronously for instantaneous UI responsiveness.
  - Tracks deleted project IDs in a local tombstone buffer (`chroma_chords_deleted_projects`).
  - Implements auto-merge on login: merges local and cloud sets by `lastModified` timestamp and schedules a cloud push.
  - Triggers debounced cloud sync (2s delay) after any local mutations.

### 4. UI Components
- **`AuthModal` (`src/components/auth-modal.ts`)**:
  - Accessible Lit web component with backdrop blur and smooth entrance animation.
  - Segmented control to switch between "Sign In" and "Create Account".
  - Clean input fields with email/password validation and error banner feedback.
  - "Continue with Google" OAuth button.
- **`SetsScreen` (`src/components/sets-screen.ts`)**:
  - Header displays cloud sync status badge and account email.
  - Replaces legacy Google Drive auth prompt with "Sign In to Sync" button that opens `AuthModal`.
  - Manual sync trigger with spinning icon feedback.

### 5. Legacy Code Cleanup
- Remove `src/services/google-drive-service.ts`.
- Remove Google Identity Services script loader and GIS token client initialization from `project-storage.ts` and `index.html`.
- Decouple `freetext-service.ts` and `prompt-classifier.ts` from Google OAuth tokens.

---

## Testing Decisions

### What Makes a Good Test
Tests should verify external domain behavior rather than private implementation details:
- Correct conversion and normalization between local `ProjectData` domain models and relational database row structures.
- Local storage merge logic (e.g. newest timestamp wins, tombstones accurately suppress resurrected sets).
- Auth state change handling and sync triggering without unhandled promise rejections.
- Graceful offline fallback when worker endpoints return 5xx or timeout.

### Modules Tested
- `src/services/project-storage.test.ts`: Test project serialization, merge algorithms, and tombstone tracking.
- `src/services/sync-engine.test.ts`: Mock Worker API responses to verify delta sync payloads, headers, and error handling.
- `worker/src/supabase.test.ts` / `worker/worker.test.ts`: Verify JWT claims extraction and relational query construction.

### Prior Art
- `c:/reyn/Projects/practice-tracker/src/services/sync-engine.test.ts`
- `c:/reyn/Projects/practice-tracker/worker/src/index.test.ts`
- `c:/reyn/Projects/chroma-chords/src/services/project-storage.test.ts`

---

## Out of Scope

- Real-time collaborative live jam sessions (WebSockets/Supabase Realtime channels).
- Public progression sharing links via Supabase (social sharing continues to use compact URL hash state).
- Multi-user team workspace / shared library folders.

---

## Further Notes

- **Environment Setup**: The frontend will read `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for client session management, and `VITE_WORKER_URL` for the backend endpoint.
- **Worker Configuration**: The Cloudflare Worker requires `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `wrangler.toml` / Cloudflare Secrets.
