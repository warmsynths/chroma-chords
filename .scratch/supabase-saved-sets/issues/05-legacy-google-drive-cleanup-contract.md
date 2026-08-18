# 05 — Legacy Google Drive Cleanup Contract

**What to build:** Complete removal of obsolete Google Drive App Data services, Google Identity Services (GIS) script loaders, and hardcoded email hash whitelist checks. Ensures the codebase is clean, performant, and fully migrated to Supabase with zero remaining Google Drive dependencies.

**Blocked by:** 04 — Sync Status Badges and Manual Refresh

**Status:** closed

- [x] Remove `src/services/google-drive-service.ts` from the project.
- [x] Remove Google Identity Services (`accounts.google.com/gsi/client`) dynamic script injection and token client setup from `project-storage.ts` and HTML templates.
- [x] Remove `AUTHORIZED_HASHES` whitelist logic and SHA-256 client hashing routines.
- [x] Decouple `freetext-service.ts` and `prompt-classifier.ts` from `setGoogleToken` and Google OAuth storage tokens.
- [x] Ensure all existing tests pass (`npm run test`) and production bundle builds cleanly (`npm run build`).
