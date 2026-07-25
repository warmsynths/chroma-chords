import { GENRES, MOODS } from './chord-engine';
import { normalize, NormalizedPrompt } from './freetext-schema';

export type LLMProvider = 'openrouter' | 'anthropic';

const STORAGE_KEY_PROVIDER = 'chroma-chords-llm-provider';

export function getLLMProvider(): LLMProvider {
  const saved = localStorage.getItem(STORAGE_KEY_PROVIDER);
  return saved === 'anthropic' ? 'anthropic' : 'openrouter';
}

export function setLLMProvider(provider: LLMProvider): void {
  localStorage.setItem(STORAGE_KEY_PROVIDER, provider);
}

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

export interface KeyRateLimitInfo {
  limit?: number;
  remaining?: number;
  isFreeTier?: boolean;
}

export async function fetchOpenRouterKeyInfo(): Promise<KeyRateLimitInfo | null> {
  try {
    const res = await fetch(CLASSIFIER_ENDPOINT);
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json.remaining === 'number') {
        return {
          remaining: json.remaining,
          limit: json.limit,
          isFreeTier: json.isFreeTier,
        };
      }
    }
  } catch {
    // ignore
  }
  return null;
}

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

let activeGoogleToken: string | null = null;

export function setGoogleToken(token: string | null): void {
  activeGoogleToken = token;
}

export function getGoogleToken(): string | null {
  return activeGoogleToken;
}

async function llmClassify(text: string, authToken?: string | null): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);
  const token = authToken ?? activeGoogleToken;
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(CLASSIFIER_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, provider: getLLMProvider() }),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || (data && typeof data === 'object' && 'error' in data)) {
      const detail = data && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : `HTTP ${res.status}`;
      const err = new Error(`Classifier request failed: ${detail}`);
      if (data && typeof data === 'object' && '_rateLimit' in data) {
        (err as any)._rateLimit = (data as any)._rateLimit;
      }
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

// Turns free text into a NormalizedPrompt: tries the LLM classifier first (via the Cloudflare
// Worker proxy, sending the selected provider: OpenRouter or Anthropic Claude), and falls back to
// the local keyword heuristic on any network failure, timeout, or invalid response.
export async function classifyFreeText(text: string, authToken?: string | null): Promise<NormalizedPrompt | null> {
  const fallback = heuristicClassify(text);
  try {
    const raw = await llmClassify(text, authToken);
    return normalize(raw, fallback ?? NEUTRAL_FALLBACK);
  } catch (e: any) {
    console.warn('LLM classification failed, falling back to keyword heuristic:', e);
    const result = normalize(fallback ?? NEUTRAL_FALLBACK, NEUTRAL_FALLBACK);
    if (e && typeof e === 'object' && '_rateLimit' in e) {
      result._rateLimit = e._rateLimit;
    }
    return result;
  }
}
