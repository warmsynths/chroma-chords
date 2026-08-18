import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SyncEngine, SyncRequestPayload, SyncResponsePayload } from './sync-engine';

describe('SyncEngine', () => {
  let syncEngine: SyncEngine;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    syncEngine = new SyncEngine();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('testConnection', () => {
    it('returns error when worker URL is empty', async () => {
      const result = await syncEngine.testConnection('');
      expect(result.ok).toBe(false);
      expect(result.message).toContain('Worker URL cannot be empty');
    });

    it('returns ok on 200 health response', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => ({ status: 'ok', timestamp: '2026-08-18T10:00:00Z' }),
      } as any);

      const result = await syncEngine.testConnection('https://api.example.com', 'test-token');
      expect(result.ok).toBe(true);
      expect(result.status).toBe(200);
      expect(result.timestamp).toBe('2026-08-18T10:00:00Z');
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/health',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });

    it('handles 401 unauthorized response gracefully', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        status: 401,
        ok: false,
        text: async () => 'Unauthorized',
      } as any);

      const result = await syncEngine.testConnection('https://api.example.com', 'bad-token');
      expect(result.ok).toBe(false);
      expect(result.status).toBe(401);
      expect(result.message).toContain('Unauthorized');
    });
  });

  describe('sync', () => {
    it('throws when workerUrl is missing', async () => {
      await expect(
        syncEngine.sync('', 'token', { sets: [] })
      ).rejects.toThrow('Worker URL is not configured');
    });

    it('sends POST /api/sync with correct headers and payload', async () => {
      const mockResponse: SyncResponsePayload = {
        sets: [
          {
            id: 'set-1',
            name: 'Neon Sunset',
            genre: 'Synthwave',
            mood: 'Euphoric',
            key: 'A',
            scaleType: 'MINOR',
            bpm: 128,
            chords: [],
            lastModified: 1700000000000,
          },
        ],
        lastSyncTime: '2026-08-18T10:00:00Z',
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      } as any);

      const payload: SyncRequestPayload = {
        sets: [
          {
            id: 'set-1',
            name: 'Neon Sunset',
            genre: 'Synthwave',
            mood: 'Euphoric',
            key: 'A',
            scaleType: 'MINOR',
            bpm: 128,
            chords: [],
            lastModified: 1700000000000,
          },
        ],
        lastSyncTime: null,
      };

      const result = await syncEngine.sync('https://api.example.com/', 'my-jwt-token', payload);

      expect(result.sets).toHaveLength(1);
      expect(result.sets[0].name).toBe('Neon Sunset');
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/sync',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer my-jwt-token',
          }),
          body: JSON.stringify(payload),
        })
      );
    });

    it('throws formatted error on failure status', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        status: 500,
        ok: false,
        json: async () => ({ error: 'Database connection timeout' }),
      } as any);

      await expect(
        syncEngine.sync('https://api.example.com', 'token', { sets: [] })
      ).rejects.toThrow('Cloud sync failed (500): Database connection timeout');
    });
  });
});
