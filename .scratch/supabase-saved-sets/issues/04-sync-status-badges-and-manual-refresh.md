# 04 — Sync Status Badges and Manual Refresh

**What to build:** Real-time visual sync indicators and manual sync controls on the Sets library screen. Users can see their current cloud status at a glance ("Synced", "Syncing...", "Offline", or "Sign In to Sync") and tap a manual refresh button to trigger an immediate pull/push with spinning animation feedback and retry error resilience.

**Blocked by:** 03 — Live Delta Sync and Tombstone Deletions

**Status:** ready-for-agent

- [ ] Cloudflare Worker provides a `GET /api/health` endpoint returning server timestamp for connectivity testing.
- [ ] Sets screen header displays a dynamic sync status pill badge reflecting active state (Synced, Syncing, Offline, Sign In).
- [ ] Users can click a "Sync Now" button to force an immediate bi-directional sync cycle.
- [ ] The sync button renders a smooth spinning CSS animation during active network requests and disables duplicate clicks.
- [ ] Transient network drops or 5xx server responses gracefully transition the status badge to "Offline" without crashing or showing intrusive alerts.
- [ ] When network connectivity is regained, the status updates back to "Synced" upon the next sync attempt.
- [ ] Automated tests verify status state machine transitions and error recovery handling.
