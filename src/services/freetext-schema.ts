import { GENRES, MOODS, ROOT_KEYS, SCALE_TYPES, MIN_PROGRESSION_LENGTH, MAX_PROGRESSION_LENGTH } from './chord-engine';

// The normalized shape an LLM classifier (or the keyword-heuristic fallback) is allowed to
// produce. Every field is restricted to Chroma Chords' existing controlled vocabulary — the
// classifier picks tags, it never invents chord names or progressions.
export interface NormalizedPrompt {
  genre: string;
  mood: string;
  key?: string;
  scaleType?: string;
  length?: number;
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

// Validates/fuzzy-matches an arbitrary raw object (typically parsed from an LLM response,
// but works just as well on the keyword-heuristic's output) against the controlled
// vocabulary, filling in `fallback` for any field that doesn't survive the match.
export function normalize(raw: unknown, fallback: NormalizeFallback): NormalizedPrompt {
  const obj = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};

  const genre = fuzzyMatch(obj.genre, GENRES) ?? fallback.genre;
  const mood = fuzzyMatch(obj.mood, MOOD_NAMES) ?? fallback.mood;
  const key = fuzzyMatch(obj.key, ROOT_KEYS) ?? undefined;
  const scaleType = fuzzyMatch(obj.scaleType, SCALE_TYPES) ?? undefined;

  let length: number | undefined;
  if (typeof obj.length === 'number' && Number.isFinite(obj.length)) {
    length = Math.max(MIN_PROGRESSION_LENGTH, Math.min(MAX_PROGRESSION_LENGTH, Math.round(obj.length)));
  }

  return { genre, mood, key, scaleType, length };
}
