# 0002: Cloudflare D1 Serverless SQLite and Google OAuth JWT Sync

## Context
Chroma Chords previously backed up saved progressions to a dedicated Supabase PostgreSQL instance. Supabase's free tier policy enforces a maximum of 2 active projects per account, automatically pausing inactive databases and introducing external network latency (Worker-to-PostgREST roundtrips) and heavy client bundle overhead (`@supabase/supabase-js`).

## Decision
We migrated all cloud persistence and user authentication natively into Cloudflare edge infrastructure and Google Identity Services:
1. **Cloudflare D1 Database**: Replaced external PostgreSQL with Cloudflare D1 (Serverless SQLite at the edge), providing 5M reads/day, 100k writes/day, 10GB storage, and zero project-pause limits.
2. **Google OAuth ID Token Authentication**: Switched client auth to Google Identity Services (GIS) / Google ID Tokens (JWTs), removing third-party SDK dependencies.
3. **Cryptographic Worker Verification**: The Cloudflare Worker `/api/sync` endpoint cryptographically verifies Google RSA signatures against Google's public JWKS certificates using WebCrypto, using the verified `sub` claim as the immutable `user_id`.
4. **Atomic Edge Transactions**: Sync mutations and delta queries execute directly within the Cloudflare Worker using atomic `env.DB.batch(...)` prepared statements.
5. **Offline-First Delta Sync**: Retained local storage as the synchronous source of truth for immediate UI responsiveness, syncing bidirectionally via `updated_at` timestamps and soft-delete tombstones (`deleted_at`).

## Consequences
- Completely eliminated external database hosting costs, quotas, and cold-start latency.
- Client bundle size was significantly reduced by removing `@supabase/supabase-js`.
- Progression sync and AI classification now run in a single unified Cloudflare Worker deployment.
