export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<{ success: boolean; meta?: unknown; results?: T[] }>;
  all<T = unknown>(): Promise<{ success: boolean; meta?: unknown; results?: T[] }>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<{ success: boolean; meta?: unknown; results?: T[] }[]>;
  exec<T = unknown>(query: string): Promise<{ count: number; duration: number }>;
}

export interface Env {
  OPENCODE_API_KEY?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_KEY?: string;
  GOOGLE_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
  ALLOWED_EMAILS?: string;
  RATE_LIMIT_KV?: any;
  DB?: D1Database;
  GOOGLE_CLIENT_ID?: string;
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

export interface D1SetRow {
  user_id: string;
  id: string;
  name: string;
  genre: string;
  mood: string;
  key: string;
  scale_type: string;
  bpm: number;
  show_theory: number;
  deleted_at: string | null;
  updated_at: string;
}

export interface D1SetChordRow {
  user_id: string;
  set_id: string;
  position: number;
  name: string;
  tag: string;
  roman: string;
  color: string;
  function_label: string;
  notes: string;
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
  iss?: string;
  aud?: string;
  name?: string;
  picture?: string;
  role?: string;
}

export function parseJwtClaims(token: string): JwtClaims | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    
    let decodedStr = '';
    if (typeof atob === 'function') {
      decodedStr = atob(base64);
    } else if (typeof Buffer !== 'undefined') {
      decodedStr = Buffer.from(base64, 'base64').toString('binary');
    } else {
      return null;
    }

    const jsonPayload = decodeURIComponent(
      decodedStr
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as JwtClaims;
  } catch {
    return null;
  }
}
