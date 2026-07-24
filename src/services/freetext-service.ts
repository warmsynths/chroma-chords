import { GENRES, MOODS } from './chord-engine';
import { normalize, NormalizedPrompt } from './freetext-schema';

// Last-resort filler for normalize()'s per-field substitution — only used when the LLM's
// response has a single malformed field (e.g. a garbled mood) and the keyword heuristic also
// had no signal to substitute instead. Never used to represent "the" answer on its own.
const NEUTRAL_FALLBACK = { genre: GENRES[0], mood: MOODS[0].name };

// Deployed Worker URL (see worker/README.md) — override in dev via VITE_CLASSIFIER_ENDPOINT
// without needing to edit source.
const CLASSIFIER_ENDPOINT =
  import.meta.env.VITE_CLASSIFIER_ENDPOINT || 'https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev';
// Must stay comfortably longer than the Worker's own upstream timeout (worker/worker.ts,
// UPSTREAM_TIMEOUT_MS) — otherwise the client aborts before the Worker can even return its
// real error, and every slow-but-working model call looks like a generic AbortError instead.
const LLM_TIMEOUT_MS = 12000;

// Local, offline classifier — no network involved. Used both as the always-on instant
// suggestion while the user is still typing, and as the fallback when the LLM call fails,
// times out, or returns something that doesn't survive validation.
const MOOD_KEYWORDS: Record<string, string[]> = {
  Uplifting: ['happy', 'joy', 'bright', 'hope', 'celebrat', 'win', 'sun', 'morning', 'triumph'],
  Melancholy: ['sad', 'rain', 'lonely', 'grief', 'loss', 'blue', 'tear', 'goodbye'],
  Dreamy: ['dream', 'float', 'cloud', 'soft', 'sleep', 'hazy', 'ethereal', 'stars'],
  Tense: ['fear', 'anxious', 'dark', 'storm', 'fight', 'chase', 'danger', 'thriller'],
  Warm: ['cozy', 'home', 'fire', 'love', 'autumn', 'familiar', 'fireplace'],
  Nostalgic: ['memory', 'childhood', 'old', 'faded', 'remember', 'summer', 'photo', 'yearbook'],
};

const GENRE_KEYWORDS: Record<string, string[]> = {
  'Pop': ['pop', 'radio', 'dance', 'catchy', 'hit'],
  'Lo-fi/Chill': ['lofi', 'lo-fi', 'study', 'bedroom', 'tape', 'chill', 'relax'],
  'R&B/Soul': ['rnb', 'r&b', 'soul', 'smooth', 'slow jam', 'sultry'],
  'Indie/Folk': ['folk', 'acoustic', 'campfire', 'porch', 'story', 'indie'],
  'Synthwave': ['synth', '80s', 'neon', 'retro', 'synthwave', 'arcade'],
  'Jazz-ish': ['jazz', 'smoky', 'bar', 'lounge', 'late night', 'saxophone'],
  'Gospel': ['gospel', 'church', 'choir', 'soulful', 'worship'],
  'Cinematic': ['movie', 'film', 'epic', 'trailer', 'scene', 'cinematic'],
  'Rock': ['rock', 'guitar', 'drive', 'loud', 'energy', 'highway'],
  'House/Dance': ['house', 'edm', 'club', 'rave', 'four on the floor', 'dance floor'],
};

// Returns null on zero keyword hits rather than guessing — a hash-of-the-string pick used to
// fill this gap, which reads as a confident answer while actually being arbitrary (e.g. "Metallica"
// hits no keyword and would land on a random genre like Synthwave). No signal should mean no
// suggestion, not a fabricated one.
function matchFromText(text: string, map: Record<string, string[]>): string | null {
  const lower = text.toLowerCase();
  let best: string | null = null;
  let bestScore = 0;
  Object.keys(map).forEach(key => {
    const score = map[key].reduce((s, k) => s + (lower.includes(k) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = key; }
  });
  return best;
}

// Null means "no real signal" — both genre and mood need an actual keyword hit, otherwise the
// caller should show no suggestion rather than a half-guessed one.
export function heuristicClassify(text: string): NormalizedPrompt | null {
  const genre = matchFromText(text, GENRE_KEYWORDS);
  const mood = matchFromText(text, MOOD_KEYWORDS);
  if (!genre || !mood) return null;
  return { genre, mood };
}

async function llmClassify(text: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);
  try {
    const res = await fetch(CLASSIFIER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || (data && typeof data === 'object' && 'error' in data)) {
      const detail = data && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : `HTTP ${res.status}`;
      throw new Error(`Classifier request failed: ${detail}`);
    }
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

// Turns free text into a NormalizedPrompt: tries the LLM classifier first (via the Cloudflare
// Worker proxy, so the Anthropic key never reaches the client), and falls back to the local
// keyword heuristic on any network failure, timeout, or invalid response. The LLM's raw
// response is always re-validated/fuzzy-matched against the controlled vocabulary before use.
//
// Returns null when there's genuinely no confident answer (LLM failed and the keyword
// heuristic had no real signal either) — callers should treat that as "show no suggestion,"
// never substitute a guess of their own, since an unrelated guess reads as flatly wrong to
// anyone who typed something specific (an artist name, a song title) it didn't recognize.
export async function classifyFreeText(text: string): Promise<NormalizedPrompt | null> {
  const fallback = heuristicClassify(text);
  try {
    const raw = await llmClassify(text);
    return normalize(raw, fallback ?? NEUTRAL_FALLBACK);
  } catch (e) {
    console.warn('LLM classification failed, falling back to keyword heuristic:', e);
    return fallback;
  }
}
