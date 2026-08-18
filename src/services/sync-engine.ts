import { ProjectChord, ProjectData } from './project-service';

export interface ClientSet extends ProjectData {
  deletedAt?: string | null;
  updatedAt?: string;
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

export interface TestConnectionResult {
  ok: boolean;
  status: number;
  message: string;
  timestamp?: string;
}

export class SyncEngine {
  private formatUrl(url: string): string {
    let cleaned = url.trim().replace(/\/+$/, '');
    if (cleaned && !cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = 'https://' + cleaned;
    }
    return cleaned;
  }

  private applyAuthHeaders(headers: Record<string, string>, auth?: string) {
    if (!auth) return;
    const trimmed = auth.trim();
    if (trimmed.toLowerCase().startsWith('bearer ')) {
      headers['Authorization'] = trimmed;
    } else {
      headers['Authorization'] = `Bearer ${trimmed}`;
    }
  }

  public async testConnection(
    workerUrl: string,
    authToken?: string
  ): Promise<TestConnectionResult> {
    const formatted = this.formatUrl(workerUrl);
    if (!formatted) {
      return { ok: false, status: 0, message: 'Worker URL cannot be empty' };
    }

    try {
      const headers: Record<string, string> = {};
      this.applyAuthHeaders(headers, authToken);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`${formatted}/api/health`, {
        method: 'GET',
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.status === 200) {
        const data = await res.json().catch(() => ({}));
        return {
          ok: true,
          status: 200,
          message: 'Connected to Cloudflare Worker',
          timestamp: data.timestamp,
        };
      }

      if (res.status === 401) {
        return {
          ok: false,
          status: 401,
          message: 'Unauthorized: Invalid or missing authorization token',
        };
      }

      const errorText = await res.text().catch(() => '');
      return {
        ok: false,
        status: res.status,
        message: `Connection error (${res.status}): ${errorText || res.statusText}`,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return { ok: false, status: 0, message: 'Connection timed out (8s limit)' };
      }
      return {
        ok: false,
        status: 0,
        message: 'Network error: Unable to reach worker endpoint',
      };
    }
  }

  public async sync(
    workerUrl: string,
    authToken: string | undefined,
    payload: SyncRequestPayload
  ): Promise<SyncResponsePayload> {
    const formatted = this.formatUrl(workerUrl);
    if (!formatted) {
      throw new Error('Worker URL is not configured');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    this.applyAuthHeaders(headers, authToken);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(`${formatted}/api/sync`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      let errDetail = '';
      try {
        const errJson = await res.json();
        errDetail = errJson.error || errJson.message || '';
      } catch {
        errDetail = await res.text().catch(() => '');
      }
      throw new Error(
        `Cloud sync failed (${res.status}): ${errDetail || res.statusText || 'Unknown error'}`
      );
    }

    return (await res.json()) as SyncResponsePayload;
  }
}

export const syncEngine = new SyncEngine();
