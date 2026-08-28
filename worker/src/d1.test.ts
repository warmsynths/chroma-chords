import { describe, it, expect, vi, beforeEach } from 'vitest';
import { D1Client } from './d1';
import { verifyGoogleToken } from './auth';
import { ClientSet, Tombstone, D1Database, D1PreparedStatement } from './types';

function createMockD1Database() {
  const preparedStatements: { query: string; bindings: unknown[] }[] = [];
  const mockAllResults: Record<string, unknown[]> = {};

  const mockDb: D1Database = {
    prepare: vi.fn().mockImplementation((query: string) => {
      const stmt: D1PreparedStatement = {
        bind: vi.fn().mockImplementation((...bindings: unknown[]) => {
          preparedStatements.push({ query, bindings });
          return stmt;
        }),
        first: vi.fn().mockResolvedValue(null),
        run: vi.fn().mockResolvedValue({ success: true }),
        all: vi.fn().mockImplementation(async () => {
          // match query
          for (const [key, val] of Object.entries(mockAllResults)) {
            if (query.includes(key)) {
              return { success: true, results: val };
            }
          }
          return { success: true, results: [] };
        }),
      };
      return stmt;
    }),
    dump: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
    batch: vi.fn().mockImplementation(async (stmts: D1PreparedStatement[]) => {
      return stmts.map(() => ({ success: true }));
    }),
    exec: vi.fn().mockResolvedValue({ count: 1, duration: 1 }),
  };

  return {
    mockDb,
    preparedStatements,
    mockAllResults,
  };
}

describe('worker/src/d1 - D1Client', () => {
  let mockDbHelper: ReturnType<typeof createMockD1Database>;
  const userId = 'google-user-123';

  beforeEach(() => {
    mockDbHelper = createMockD1Database();
  });

  it('throws error if db or userId is missing', () => {
    expect(() => new D1Client(null as any, userId)).toThrow('D1Database binding is required');
    expect(() => new D1Client(mockDbHelper.mockDb, '')).toThrow('Authenticated user_id is required');
  });

  it('upserts parent sets and creates chord rows in atomic batch', async () => {
    const d1 = new D1Client(mockDbHelper.mockDb, userId);

    const testSets: ClientSet[] = [
      {
        id: 'set-abc',
        name: 'Oasis Anthem',
        genre: 'Rock',
        mood: 'Anthemic',
        key: 'A',
        scaleType: 'major',
        bpm: 124,
        showTheory: true,
        chords: [
          {
            name: 'A',
            roman: 'I',
            notes: ['A3', 'C#4', 'E4'],
            color: '#F2A79B',
          },
          {
            name: 'E',
            roman: 'V',
            notes: ['E3', 'G#3', 'B3'],
            color: '#B4D7B3',
          },
        ],
      },
    ];

    await d1.upsertSets(testSets);

    expect(mockDbHelper.mockDb.batch).toHaveBeenCalledTimes(1);
    expect(mockDbHelper.preparedStatements.length).toBe(4); // 1 set + 1 delete chords + 2 insert chords

    // Check set insert binding
    const setInsert = mockDbHelper.preparedStatements[0];
    expect(setInsert.query).toContain('INSERT INTO sets');
    expect(setInsert.bindings[0]).toBe(userId);
    expect(setInsert.bindings[1]).toBe('set-abc');
    expect(setInsert.bindings[2]).toBe('Oasis Anthem');

    // Check chord insert bindings
    const chord1 = mockDbHelper.preparedStatements[2];
    expect(chord1.query).toContain('INSERT INTO set_chords');
    expect(chord1.bindings[0]).toBe(userId);
    expect(chord1.bindings[1]).toBe('set-abc');
    expect(chord1.bindings[2]).toBe(0); // position 0
    expect(chord1.bindings[3]).toBe('A');
    expect(chord1.bindings[8]).toBe(JSON.stringify(['A3', 'C#4', 'E4']));
  });

  it('applies tombstones by soft-deleting sets and deleting chord rows', async () => {
    const d1 = new D1Client(mockDbHelper.mockDb, userId);
    const tombstones: Tombstone[] = [
      { id: 'set-deleted-1', deletedAt: '2026-08-28T10:00:00Z' },
    ];

    await d1.applyTombstones(tombstones);

    expect(mockDbHelper.mockDb.batch).toHaveBeenCalledTimes(1);
    expect(mockDbHelper.preparedStatements.length).toBe(2); // 1 update sets + 1 delete chords

    const updateSet = mockDbHelper.preparedStatements[0];
    expect(updateSet.query).toContain('UPDATE sets SET deleted_at');
    expect(updateSet.bindings).toEqual(['2026-08-28T10:00:00Z', userId, 'set-deleted-1']);
  });

  it('queries delta sets and groups chords correctly', async () => {
    const d1 = new D1Client(mockDbHelper.mockDb, userId);

    mockDbHelper.mockAllResults['SELECT * FROM sets'] = [
      {
        user_id: userId,
        id: 'set-active-1',
        name: 'Beatles Progression',
        genre: 'Pop',
        mood: 'Nostalgic',
        key: 'C',
        scale_type: 'major',
        bpm: 110,
        show_theory: 1,
        deleted_at: null,
        updated_at: '2026-08-28T11:00:00Z',
      },
      {
        user_id: userId,
        id: 'set-tomb-1',
        name: 'Old Idea',
        genre: 'Jazz',
        mood: 'Chill',
        key: 'F',
        scale_type: 'major',
        bpm: 90,
        show_theory: 1,
        deleted_at: '2026-08-28T11:05:00Z',
        updated_at: '2026-08-28T11:05:00Z',
      },
    ];

    mockDbHelper.mockAllResults['SELECT * FROM set_chords'] = [
      {
        user_id: userId,
        set_id: 'set-active-1',
        position: 0,
        name: 'C',
        tag: 'tonic',
        roman: 'I',
        color: '#F2A79B',
        function_label: 'Tonic',
        notes: JSON.stringify(['C4', 'E4', 'G4']),
        scale_label: 'C Major',
        desc: 'Root chord',
        degree: '1',
        scale_key: 'C',
        tension: 0,
      },
      {
        user_id: userId,
        set_id: 'set-active-1',
        position: 1,
        name: 'Fm',
        tag: 'minor iv',
        roman: 'iv',
        color: '#D4B8E2',
        function_label: 'Subdominant Minor',
        notes: JSON.stringify(['F3', 'Ab3', 'C4']),
        scale_label: 'Parallel Minor',
        desc: 'Borrowed chord',
        degree: '4',
        scale_key: 'C',
        tension: 0.6,
      },
    ];

    const delta = await d1.getDeltaSets('2026-08-28T09:00:00Z');

    expect(delta.sets.length).toBe(1);
    expect(delta.sets[0].id).toBe('set-active-1');
    expect(delta.sets[0].name).toBe('Beatles Progression');
    expect(delta.sets[0].showTheory).toBe(true);
    expect(delta.sets[0].chords.length).toBe(2);
    expect(delta.sets[0].chords[0].notes).toEqual(['C4', 'E4', 'G4']);
    expect(delta.sets[0].chords[1].name).toBe('Fm');

    expect(delta.tombstones.length).toBe(1);
    expect(delta.tombstones[0].id).toBe('set-tomb-1');
    expect(delta.tombstones[0].deletedAt).toBe('2026-08-28T11:05:00Z');
  });
});

describe('worker/src/auth - verifyGoogleToken', () => {
  it('rejects missing or empty tokens', async () => {
    const res = await verifyGoogleToken('');
    expect(res.verified).toBe(false);
    expect(res.error).toContain('Missing token');
  });

  it('rejects malformed tokens', async () => {
    const res = await verifyGoogleToken('not-a-jwt');
    expect(res.verified).toBe(false);
    expect(res.error).toContain('Invalid JWT structure');
  });

  it('validates claims and extracts userId (sub)', async () => {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const payload = Buffer.from(
      JSON.stringify({
        iss: 'https://accounts.google.com',
        sub: 'google-sub-987',
        email: 'musician@gmail.com',
        exp,
      })
    ).toString('base64url');
    const token = `${header}.${payload}.mockSignature`;

    const res = await verifyGoogleToken(token);
    expect(res.verified).toBe(true);
    expect(res.userId).toBe('google-sub-987');
    expect(res.email).toBe('musician@gmail.com');
  });

  it('rejects expired tokens', async () => {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const exp = Math.floor(Date.now() / 1000) - 100; // expired
    const payload = Buffer.from(
      JSON.stringify({
        iss: 'https://accounts.google.com',
        sub: 'google-sub-expired',
        email: 'expired@gmail.com',
        exp,
      })
    ).toString('base64url');
    const token = `${header}.${payload}.mockSignature`;

    const res = await verifyGoogleToken(token);
    expect(res.verified).toBe(false);
    expect(res.error).toContain('expired');
  });
});
