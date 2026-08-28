import { ClientSet, ClientChord, D1Database, D1PreparedStatement, D1SetRow, D1SetChordRow, Tombstone } from './types';

export class D1Client {
  private db: D1Database;
  private userId: string;

  constructor(db: D1Database, userId: string) {
    if (!db) {
      throw new Error('D1Database binding is required.');
    }
    if (!userId || typeof userId !== 'string') {
      throw new Error('Authenticated user_id is required.');
    }
    this.db = db;
    this.userId = userId;
  }

  public async upsertSets(sets: ClientSet[]): Promise<void> {
    if (!sets || sets.length === 0) return;

    const statements: D1PreparedStatement[] = [];

    for (const set of sets) {
      const showTheoryVal = set.showTheory === false ? 0 : 1;
      const deletedAtVal = set.deletedAt || null;

      // 1. Upsert parent set row
      const upsertSetStmt = this.db
        .prepare(
          `INSERT INTO sets (
            user_id, id, name, genre, mood, key, scale_type, bpm, show_theory, deleted_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
          ON CONFLICT(user_id, id) DO UPDATE SET
            name = excluded.name,
            genre = excluded.genre,
            mood = excluded.mood,
            key = excluded.key,
            scale_type = excluded.scale_type,
            bpm = excluded.bpm,
            show_theory = excluded.show_theory,
            deleted_at = excluded.deleted_at,
            updated_at = excluded.updated_at`
        )
        .bind(
          this.userId,
          set.id,
          set.name,
          set.genre || 'Pop',
          set.mood || 'Uplifting',
          set.key || 'C',
          set.scaleType || 'major',
          set.bpm || 120,
          showTheoryVal,
          deletedAtVal
        );

      statements.push(upsertSetStmt);

      // 2. Clear old chords for this set
      const deleteChordsStmt = this.db
        .prepare('DELETE FROM set_chords WHERE user_id = ? AND set_id = ?')
        .bind(this.userId, set.id);
      statements.push(deleteChordsStmt);

      // 3. Insert fresh chords
      if (Array.isArray(set.chords) && set.chords.length > 0) {
        set.chords.forEach((chord: ClientChord, idx: number) => {
          const notesJson = JSON.stringify(chord.notes || []);
          const insertChordStmt = this.db
            .prepare(
              `INSERT INTO set_chords (
                user_id, set_id, position, name, tag, roman, color, function_label, notes, scale_label, desc, degree, scale_key, tension
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
              this.userId,
              set.id,
              idx,
              chord.name || 'C',
              chord.tag || '',
              chord.roman || '',
              chord.color || '',
              chord.functionLabel || '',
              notesJson,
              chord.scaleLabel || '',
              chord.desc || '',
              chord.degree || '',
              chord.scaleKey || '',
              chord.tension || 0
            );

          statements.push(insertChordStmt);
        });
      }
    }

    if (statements.length > 0) {
      await this.db.batch(statements);
    }
  }

  public async applyTombstones(tombstones: Tombstone[]): Promise<void> {
    if (!tombstones || tombstones.length === 0) return;

    const statements: D1PreparedStatement[] = [];

    for (const tomb of tombstones) {
      const updateSetStmt = this.db
        .prepare(`UPDATE sets SET deleted_at = ?, updated_at = datetime('now') WHERE user_id = ? AND id = ?`)
        .bind(tomb.deletedAt, this.userId, tomb.id);
      statements.push(updateSetStmt);

      const deleteChordsStmt = this.db
        .prepare('DELETE FROM set_chords WHERE user_id = ? AND set_id = ?')
        .bind(this.userId, tomb.id);
      statements.push(deleteChordsStmt);
    }

    if (statements.length > 0) {
      await this.db.batch(statements);
    }
  }

  public async getDeltaSets(
    lastSyncTime: string | null
  ): Promise<{ sets: ClientSet[]; tombstones: Tombstone[]; lastSyncTime: string }> {
    let setRows: D1SetRow[] = [];

    if (lastSyncTime) {
      const query = `SELECT * FROM sets WHERE user_id = ? AND updated_at > ? ORDER BY updated_at ASC`;
      const result = await this.db.prepare(query).bind(this.userId, lastSyncTime).all<D1SetRow>();
      setRows = result.results || [];
    } else {
      const query = `SELECT * FROM sets WHERE user_id = ? ORDER BY updated_at ASC`;
      const result = await this.db.prepare(query).bind(this.userId).all<D1SetRow>();
      setRows = result.results || [];
    }

    const activeSetRows = setRows.filter((r) => !r.deleted_at);
    const softDeletedRows = setRows.filter((r) => !!r.deleted_at);

    const tombstones: Tombstone[] = softDeletedRows.map((r) => ({
      id: r.id,
      deletedAt: r.deleted_at!,
    }));

    if (activeSetRows.length === 0) {
      return {
        sets: [],
        tombstones,
        lastSyncTime: new Date().toISOString(),
      };
    }

    const activeSetIds = activeSetRows.map((r) => r.id);
    const placeholders = activeSetIds.map(() => '?').join(',');
    const chordsQuery = `SELECT * FROM set_chords WHERE user_id = ? AND set_id IN (${placeholders}) ORDER BY set_id, position ASC`;
    
    const chordsResult = await this.db
      .prepare(chordsQuery)
      .bind(this.userId, ...activeSetIds)
      .all<D1SetChordRow>();

    const chordRows = chordsResult.results || [];

    // Group chords by set_id
    const chordsBySet = new Map<string, ClientChord[]>();
    for (const row of chordRows) {
      if (!chordsBySet.has(row.set_id)) {
        chordsBySet.set(row.set_id, []);
      }
      let parsedNotes: string[] = [];
      try {
        parsedNotes = JSON.parse(row.notes);
      } catch {
        parsedNotes = [];
      }

      chordsBySet.get(row.set_id)!.push({
        name: row.name,
        tag: row.tag,
        roman: row.roman,
        color: row.color,
        functionLabel: row.function_label,
        notes: parsedNotes,
        scaleLabel: row.scale_label,
        desc: row.desc,
        degree: row.degree,
        scaleKey: row.scale_key,
        tension: row.tension,
      });
    }

    const clientSets: ClientSet[] = activeSetRows.map((row) => ({
      id: row.id,
      name: row.name,
      genre: row.genre,
      mood: row.mood,
      key: row.key,
      scaleType: row.scale_type,
      bpm: row.bpm,
      showTheory: row.show_theory === 1,
      chords: chordsBySet.get(row.id) || [],
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
      syncedToCloud: true,
    }));

    return {
      sets: clientSets,
      tombstones,
      lastSyncTime: new Date().toISOString(),
    };
  }
}
