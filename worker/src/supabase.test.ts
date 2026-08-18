import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SupabaseClient } from './supabase';
import { parseJwtClaims, ClientSet } from './types';

describe('worker/src/supabase', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('parseJwtClaims', () => {
    it('returns null for invalid JWT format', () => {
      expect(parseJwtClaims('')).toBeNull();
      expect(parseJwtClaims('invalid.token')).toBeNull();
      expect(parseJwtClaims('a.b.c.d')).toBeNull();
    });

    it('decodes valid payload claims properly', () => {
      const payload = {
        sub: 'usr-12345',
        email: 'musician@example.com',
        exp: 1893456000,
        role: 'authenticated',
      };
      const base64Payload = btoa(JSON.stringify(payload));
      const token = `header.${base64Payload}.signature`;

      const claims = parseJwtClaims(token);
      expect(claims).not.toBeNull();
      expect(claims?.sub).toBe('usr-12345');
      expect(claims?.email).toBe('musician@example.com');
      expect(claims?.exp).toBe(1893456000);
      expect(claims?.role).toBe('authenticated');
    });
  });

  describe('SupabaseClient', () => {
    const supabaseUrl = 'https://supabase.example.co';
    const apiKey = 'test-anon-key';
    const userToken = 'user-jwt-token';
    const userId = 'usr-999';

    let client: SupabaseClient;

    beforeEach(() => {
      client = new SupabaseClient(supabaseUrl, apiKey, userToken, userId);
    });

    it('throws when user_id is missing on upsertSets', async () => {
      const unauthClient = new SupabaseClient(supabaseUrl, apiKey);
      const sets: ClientSet[] = [
        {
          id: 'set-1',
          name: 'Test Set',
          genre: 'Pop',
          mood: 'Happy',
          key: 'C',
          scaleType: 'MAJOR',
          bpm: 120,
          chords: [],
        },
      ];
      await expect(unauthClient.upsertSets(sets)).rejects.toThrow('user_id is required');
    });

    it('upserts parent sets and reconciles child chord rows', async () => {
      const fetchMock = vi.fn().mockImplementation((url: string, init: RequestInit) => {
        if (url.includes('/rest/v1/sets')) {
          return Promise.resolve({
            ok: true,
            status: 201,
          });
        }
        if (url.includes('/rest/v1/set_chords')) {
          return Promise.resolve({
            ok: true,
            status: 201,
          });
        }
        return Promise.resolve({ ok: true, status: 200 });
      });
      globalThis.fetch = fetchMock as any;

      const sets: ClientSet[] = [
        {
          id: 'set-1',
          name: 'Midnight Funk',
          genre: 'Funk',
          mood: 'Groovy',
          key: 'E',
          scaleType: 'DORIAN',
          bpm: 115,
          showTheory: true,
          chords: [
            {
              name: 'Em7',
              tag: 'i7',
              roman: 'i7',
              color: '#F2735F',
              functionLabel: 'Tonic',
              notes: ['E4', 'G4', 'B4', 'D5'],
              scaleLabel: 'Dorian',
              desc: 'Minor 7th',
              degree: '1',
              scaleKey: 'E',
              tension: 0.2,
            },
          ],
          lastModified: 1700000000000,
        },
      ];

      await client.upsertSets(sets);

      // Verify sets POST request
      expect(fetchMock).toHaveBeenCalledWith(
        'https://supabase.example.co/rest/v1/sets?on_conflict=user_id,id',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            apikey: 'test-anon-key',
            Authorization: 'Bearer user-jwt-token',
          }),
        })
      );

      // Verify child chord reconciliation DELETE and POST
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/rest/v1/set_chords?user_id=eq.usr-999&set_id=eq.set-1'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );

      expect(fetchMock).toHaveBeenCalledWith(
        'https://supabase.example.co/rest/v1/set_chords',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    it('fetches delta sets and groups child chord rows correctly', async () => {
      const mockSetRows = [
        {
          id: 'set-alpha',
          user_id: 'usr-999',
          name: 'Alpha Progression',
          genre: 'Ambient',
          mood: 'Spacious',
          key: 'D',
          scale_type: 'LYDIAN',
          bpm: 70,
          show_theory: true,
          deleted_at: null,
          updated_at: '2026-08-18T08:00:00Z',
        },
      ];

      const mockChordRows = [
        {
          user_id: 'usr-999',
          set_id: 'set-alpha',
          position: 0,
          name: 'Dmaj7',
          tag: 'Imaj7',
          roman: 'Imaj7',
          color: '#9CC0EC',
          function_label: 'Tonic',
          notes: ['D4', 'F#4', 'A4', 'C#5'],
          scale_label: 'Lydian',
          desc: 'Major 7th',
          degree: '1',
          scale_key: 'D',
          tension: 0.1,
        },
      ];

      globalThis.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('/rest/v1/sets')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => mockSetRows,
          });
        }
        if (url.includes('/rest/v1/set_chords')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => mockChordRows,
          });
        }
        return Promise.resolve({ ok: true, status: 200, json: async () => [] });
      }) as any;

      const delta = await client.getDeltaSets('2026-08-18T00:00:00Z');

      expect(delta.sets).toHaveLength(1);
      expect(delta.sets[0].id).toBe('set-alpha');
      expect(delta.sets[0].name).toBe('Alpha Progression');
      expect(delta.sets[0].chords).toHaveLength(1);
      expect(delta.sets[0].chords[0].name).toBe('Dmaj7');
      expect(delta.sets[0].chords[0].notes).toEqual(['D4', 'F#4', 'A4', 'C#5']);
      expect(delta.tombstones).toHaveLength(0);
    });

    it('applies tombstones using PATCH on sets table', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
      });
      globalThis.fetch = fetchMock as any;

      await client.applyTombstones([{ id: 'set-deleted', deletedAt: '2026-08-18T09:00:00Z' }]);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://supabase.example.co/rest/v1/sets?id=eq.set-deleted&user_id=eq.usr-999',
        expect.objectContaining({
          method: 'PATCH',
          body: expect.stringContaining('"deleted_at":"2026-08-18T09:00:00Z"'),
        })
      );
    });
  });
});
