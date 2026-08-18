import {
  ClientChord,
  ClientSet,
  SupabaseSetChordRow,
  SupabaseSetRow,
  Tombstone,
} from './types';

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class SupabaseClient {
  private url: string;
  private apiKey: string;
  private userToken?: string;
  private userId?: string;

  constructor(url: string, apiKey: string, userToken?: string, userId?: string) {
    this.url = url.replace(/\/+$/, '');
    this.apiKey = apiKey;
    this.userToken = userToken;
    this.userId = userId;
  }

  private get headers(): HeadersInit {
    const authHeader = this.userToken ? `Bearer ${this.userToken}` : `Bearer ${this.apiKey}`;
    return {
      apikey: this.apiKey,
      Authorization: authHeader,
      'Content-Type': 'application/json',
    };
  }

  private async fetchWithRetry(
    input: string,
    init: RequestInit,
    retries = 2
  ): Promise<Response> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(input, init);
        if (res.status >= 500 && attempt < retries) {
          await sleep((attempt + 1) * 300);
          continue;
        }
        return res;
      } catch (err) {
        lastError = err;
        if (attempt < retries) {
          await sleep((attempt + 1) * 300);
        }
      }
    }
    throw lastError || new Error('Request failed after retries');
  }

  public async upsertSets(sets: ClientSet[]): Promise<void> {
    if (!sets || sets.length === 0) return;
    if (!this.userId) {
      throw new Error('SupabaseClient: user_id is required to upsert sets');
    }

    const nowIso = new Date().toISOString();
    const setRows: SupabaseSetRow[] = sets.map((s) => {
      let updatedAt = s.updatedAt;
      if (!updatedAt && s.lastModified) {
        updatedAt = new Date(s.lastModified).toISOString();
      }
      return {
        id: s.id,
        user_id: this.userId,
        name: s.name || 'Untitled Set',
        genre: s.genre || 'Pop',
        mood: s.mood || 'Neutral',
        key: s.key || 'C',
        scale_type: s.scaleType || 'MAJOR',
        bpm: typeof s.bpm === 'number' ? s.bpm : 120,
        show_theory: s.showTheory !== undefined ? !!s.showTheory : true,
        deleted_at: s.deletedAt || null,
        updated_at: updatedAt || nowIso,
      };
    });

    const setRes = await this.fetchWithRetry(
      `${this.url}/rest/v1/sets?on_conflict=user_id,id`,
      {
        method: 'POST',
        headers: {
          ...this.headers,
          Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify(setRows),
      }
    );

    if (!setRes.ok) {
      const errorText = await setRes.text();
      throw new Error(`Failed to upsert sets: ${setRes.status} ${errorText}`);
    }

    // Reconcile child chords for active (non-deleted) sets
    for (const set of sets) {
      if (set.deletedAt) continue;

      // Delete prior chord rows for this set
      const deleteUrl = `${this.url}/rest/v1/set_chords?user_id=eq.${encodeURIComponent(
        this.userId
      )}&set_id=eq.${encodeURIComponent(set.id)}`;

      await this.fetchWithRetry(deleteUrl, {
        method: 'DELETE',
        headers: {
          ...this.headers,
          Prefer: 'return=minimal',
        },
      });

      // Insert current chord rows if any
      if (set.chords && set.chords.length > 0) {
        const chordRows: SupabaseSetChordRow[] = set.chords.map((c, index) => ({
          user_id: this.userId,
          set_id: set.id,
          position: index,
          name: c.name || '',
          tag: c.tag || '',
          roman: c.roman || '',
          color: c.color || '',
          function_label: c.functionLabel || '',
          notes: Array.isArray(c.notes) ? c.notes : [],
          scale_label: c.scaleLabel || '',
          desc: c.desc || '',
          degree: c.degree || '',
          scale_key: c.scaleKey || '',
          tension: typeof c.tension === 'number' ? c.tension : 0,
        }));

        const chordRes = await this.fetchWithRetry(
          `${this.url}/rest/v1/set_chords`,
          {
            method: 'POST',
            headers: {
              ...this.headers,
              Prefer: 'return=minimal',
            },
            body: JSON.stringify(chordRows),
          }
        );

        if (!chordRes.ok) {
          const chordErrorText = await chordRes.text();
          throw new Error(
            `Failed to upsert child chords for set ${set.id}: ${chordRes.status} ${chordErrorText}`
          );
        }
      }
    }
  }

  public async applyTombstones(tombstones: Tombstone[]): Promise<void> {
    if (!tombstones || tombstones.length === 0) return;
    if (!this.userId) {
      throw new Error('SupabaseClient: user_id is required to apply tombstones');
    }

    const nowIso = new Date().toISOString();
    for (const t of tombstones) {
      const patchUrl = `${this.url}/rest/v1/sets?id=eq.${encodeURIComponent(
        t.id
      )}&user_id=eq.${encodeURIComponent(this.userId)}`;

      const res = await this.fetchWithRetry(patchUrl, {
        method: 'PATCH',
        headers: {
          ...this.headers,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          deleted_at: t.deletedAt || nowIso,
          updated_at: nowIso,
        }),
      });

      if (!res.ok && res.status !== 404) {
        const errorText = await res.text();
        console.warn(`Failed to apply tombstone for set ${t.id}: ${res.status} ${errorText}`);
      }

      // Reconcile and delete child chords for soft-deleted set
      const deleteChordsUrl = `${this.url}/rest/v1/set_chords?user_id=eq.${encodeURIComponent(
        this.userId
      )}&set_id=eq.${encodeURIComponent(t.id)}`;

      await this.fetchWithRetry(deleteChordsUrl, {
        method: 'DELETE',
        headers: {
          ...this.headers,
          Prefer: 'return=minimal',
        },
      });
    }
  }

  public async getDeltaSets(lastSyncTime: string | null): Promise<{
    sets: ClientSet[];
    tombstones: Tombstone[];
  }> {
    if (!this.userId) {
      throw new Error('SupabaseClient: user_id is required to fetch delta sets');
    }

    let queryUrl = `${this.url}/rest/v1/sets?select=*&user_id=eq.${encodeURIComponent(
      this.userId
    )}&order=updated_at.asc`;

    if (lastSyncTime) {
      queryUrl += `&updated_at=gt.${encodeURIComponent(lastSyncTime)}`;
    }

    const res = await this.fetchWithRetry(queryUrl, {
      method: 'GET',
      headers: this.headers,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch delta sets: ${res.status} ${errorText}`);
    }

    const rows = (await res.json()) as SupabaseSetRow[];
    const activeRows = rows.filter((r) => !r.deleted_at);
    const deletedRows = rows.filter((r) => !!r.deleted_at);

    const tombstones: Tombstone[] = deletedRows.map((r) => ({
      id: r.id,
      deletedAt: r.deleted_at!,
    }));

    // Fetch chords for active sets
    const chordsBySetId = new Map<string, ClientChord[]>();

    if (activeRows.length > 0) {
      const setIds = activeRows.map((r) => r.id);
      const inQuery = `in.(${setIds.map((id) => `"${id.replace(/"/g, '""')}"`).join(',')})`;
      const chordsUrl = `${this.url}/rest/v1/set_chords?select=*&user_id=eq.${encodeURIComponent(
        this.userId
      )}&set_id=${encodeURIComponent(inQuery)}&order=position.asc`;

      const chordsRes = await this.fetchWithRetry(chordsUrl, {
        method: 'GET',
        headers: this.headers,
      });

      if (chordsRes.ok) {
        const chordRows = (await chordsRes.json()) as SupabaseSetChordRow[];
        for (const crow of chordRows) {
          const chord: ClientChord = {
            name: crow.name,
            tag: crow.tag,
            roman: crow.roman,
            color: crow.color,
            functionLabel: crow.function_label,
            notes: crow.notes || [],
            scaleLabel: crow.scale_label,
            desc: crow.desc,
            degree: crow.degree,
            scaleKey: crow.scale_key,
            tension: typeof crow.tension === 'number' ? crow.tension : parseFloat(crow.tension as any) || 0,
          };
          const list = chordsBySetId.get(crow.set_id) || [];
          list.push(chord);
          chordsBySetId.set(crow.set_id, list);
        }
      }
    }

    const resultSets: ClientSet[] = [];

    for (const row of activeRows) {
      const lastModified = new Date(row.updated_at).getTime();
      resultSets.push({
        id: row.id,
        name: row.name,
        genre: row.genre,
        mood: row.mood,
        key: row.key,
        scaleType: row.scale_type,
        bpm: row.bpm,
        showTheory: row.show_theory,
        chords: chordsBySetId.get(row.id) || [],
        lastModified: isNaN(lastModified) ? Date.now() : lastModified,
        updatedAt: row.updated_at,
        deletedAt: null,
        syncedToCloud: true,
      });
    }

    for (const row of deletedRows) {
      const lastModified = new Date(row.updated_at).getTime();
      resultSets.push({
        id: row.id,
        name: row.name,
        genre: row.genre,
        mood: row.mood,
        key: row.key,
        scaleType: row.scale_type,
        bpm: row.bpm,
        showTheory: row.show_theory,
        chords: [],
        lastModified: isNaN(lastModified) ? Date.now() : lastModified,
        updatedAt: row.updated_at,
        deletedAt: row.deleted_at,
        syncedToCloud: true,
      });
    }

    return { sets: resultSets, tombstones };
  }
}
