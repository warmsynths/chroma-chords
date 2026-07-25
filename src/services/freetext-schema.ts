import { GENRES, MOODS, ROOT_KEYS, SCALE_TYPES, CHORD_QUALITIES, MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH } from './chord-engine';

export interface RequestedChordTag {
  root: string;
  quality: string;
}

// The normalized shape an LLM classifier (or the keyword-heuristic fallback) is allowed to
// produce. Every field is restricted to Chroma Chords' existing controlled vocabulary — the
// classifier picks tags, never raw/free-text chord symbols. `chords`, when present, is still
// just root+quality pairs drawn from the same closed enums (ROOT_KEYS/CHORD_QUALITIES) — the
// theory engine (see chord-engine.ts's alignChordsToScale) is what turns those into real
// ChordBlocks, snapping each one onto whatever your actual per-key data has at that scale degree.
export interface NormalizedPrompt {
  genre: string;
  mood: string;
  key?: string;
  scaleType?: string;
  length?: number;
  chords?: RequestedChordTag[];
  _rateLimit?: { limit?: number; remaining?: number };
}

const MOOD_NAMES = MOODS.map(m => m.name);

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i++) dp[i][0] = i;
  for (let j = 0; j < cols; j++) dp[0][j] = j;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[rows - 1][cols - 1];
}

// Exact match first; otherwise nearest candidate by edit distance, but only if it's close
// enough that it's plausibly a typo/paraphrase of a real vocab entry rather than an
// unrelated value the LLM hallucinated (e.g. a raw chord name).
function fuzzyMatch(value: unknown, candidates: string[]): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.toLowerCase();

  const exact = candidates.find(c => c.toLowerCase() === normalized);
  if (exact) return exact;

  let best: string | null = null;
  let bestDist = Infinity;
  for (const candidate of candidates) {
    const dist = levenshtein(normalized, candidate.toLowerCase());
    if (dist < bestDist) {
      bestDist = dist;
      best = candidate;
    }
  }
  const maxAllowedDist = Math.max(2, Math.floor(normalized.length * 0.4));
  return bestDist <= maxAllowedDist ? best : null;
}

export interface NormalizeFallback {
  genre: string;
  mood: string;
}

// A chord only survives if BOTH root and quality fuzzy-match — a partial/malformed entry is
// dropped rather than guessed at, since a wrong chord in a specific progression is worse than a
// shorter one.
function normalizeChords(raw: unknown): RequestedChordTag[] | undefined {
  if (!Array.isArray(raw)) return undefined;

  const result: RequestedChordTag[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const obj = item as Record<string, unknown>;
    const root = fuzzyMatch(obj.root, ROOT_KEYS);
    const quality = fuzzyMatch(obj.quality, CHORD_QUALITIES);
    if (root && quality) result.push({ root, quality });
  }

  if (!result.length) return undefined;
  return result.slice(0, MAX_PROGRESSION_LENGTH);
}

// Validates/fuzzy-matches an arbitrary raw object (typically parsed from an LLM response,
// but works just as well on the keyword-heuristic's output) against the controlled
// vocabulary, filling in `fallback` for any field that doesn't survive the match.
export function normalize(raw: unknown, fallback: NormalizeFallback): NormalizedPrompt {
  const obj = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};

  const genre = fuzzyMatch(obj.genre, GENRES) ?? fallback.genre;
  const mood = fuzzyMatch(obj.mood, MOOD_NAMES) ?? fallback.mood;
  const key = fuzzyMatch(obj.key, ROOT_KEYS) ?? undefined;
  const scaleType = fuzzyMatch(obj.scaleType, SCALE_TYPES) ?? undefined;
  const chords = key && scaleType ? normalizeChords(obj.chords) : undefined;

  let length: number | undefined;
  if (typeof obj.length === 'number' && Number.isFinite(obj.length)) {
    length = Math.max(MIN_PROGRESSION_LENGTH, Math.min(MAX_PROGRESSION_LENGTH, Math.round(obj.length)));
  }

  const _rateLimit = obj._rateLimit && typeof obj._rateLimit === 'object' ? (obj._rateLimit as { limit?: number; remaining?: number }) : undefined;

  return { genre, mood, key, scaleType, length, chords, _rateLimit };
}
