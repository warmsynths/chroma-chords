export interface Env {
  OPENCODE_API_KEY?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_KEY?: string;
  GOOGLE_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
  ALLOWED_EMAILS?: string;
  RATE_LIMIT_KV?: any;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_SECRET_KEY?: string;
  ENVIRONMENT?: string;
}

export interface ClientChord {
  name: string;
  tag?: string;
  roman?: string;
  color?: string;
  functionLabel?: string;
  notes: string[];
  scaleLabel?: string;
  desc?: string;
  degree?: string;
  scaleKey?: string;
  tension?: number;
}

export interface ClientSet {
  id: string;
  name: string;
  genre: string;
  mood: string;
  key: string;
  scaleType: string;
  bpm: number;
  showTheory?: boolean;
  chords: ClientChord[];
  lastModified?: number;
  updatedAt?: string;
  deletedAt?: string | null;
  syncedToCloud?: boolean;
}

export interface Tombstone {
  id: string;
  deletedAt: string;
}

export interface SyncRequestPayload {
  sets?: ClientSet[];
  lastSyncTime?: string | null;
  lastSyncedAt?: string | null;
  tombstones?: Tombstone[];
}

export interface SyncResponsePayload {
  sets: ClientSet[];
  lastSyncTime: string;
  syncedAt?: string;
  tombstones?: Tombstone[];
}

export interface SupabaseSetRow {
  user_id?: string;
  id: string;
  name: string;
  genre: string;
  mood: string;
  key: string;
  scale_type: string;
  bpm: number;
  show_theory: boolean;
  deleted_at: string | null;
  updated_at: string;
}

export interface SupabaseSetChordRow {
  user_id?: string;
  set_id: string;
  position: number;
  name: string;
  tag: string;
  roman: string;
  color: string;
  function_label: string;
  notes: string[];
  scale_label: string;
  desc: string;
  degree: string;
  scale_key: string;
  tension: number;
}

export interface JwtClaims {
  sub?: string;
  email?: string;
  exp?: number;
  role?: string;
  aud?: string;
}

export function parseJwtClaims(token: string): JwtClaims | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as JwtClaims;
  } catch {
    return null;
  }
}
