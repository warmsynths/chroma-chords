import { GENRES, MOODS } from './chord-engine';
import { normalize, NormalizedPrompt } from './freetext-schema';
import { getPreferredModel } from './model-picker';

// Deployed Worker URL (see worker/README.md) — override in dev via VITE_CLASSIFIER_ENDPOINT
// without needing to edit source.
const CLASSIFIER_ENDPOINT =
  import.meta.env.VITE_CLASSIFIER_ENDPOINT || 'https://chroma-chords-classifier.warmsynthsiloveyou.workers.dev';
const LLM_TIMEOUT_MS = 6000;

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

function matchFromText(text: string, map: Record<string, string[]>, fallbackList: string[]): string {
  const lower = text.toLowerCase();
  let best: string | null = null;
  let bestScore = 0;
  Object.keys(map).forEach(key => {
    const score = map[key].reduce((s, k) => s + (lower.includes(k) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = key; }
  });
  if (best) return best;
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
  return fallbackList[h % fallbackList.length];
}

export function heuristicClassify(text: string): NormalizedPrompt {
  const genre = matchFromText(text, GENRE_KEYWORDS, GENRES);
  const mood = matchFromText(text, MOOD_KEYWORDS, MOODS.map(m => m.name));
  return { genre, mood };
}

async function llmClassify(text: string, model: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);
  try {
    const res = await fetch(CLASSIFIER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Classifier request failed: ${res.status}`);
    const data = await res.json();
    if (data && typeof data === 'object' && 'error' in data) {
      throw new Error(String((data as { error: unknown }).error));
    }
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

// Turns free text into a NormalizedPrompt: tries the LLM classifier first (via the Cloudflare
// Worker proxy, so the OpenRouter key never reaches the client), and falls back to the local
// keyword heuristic on any network failure, timeout, or invalid response. The LLM's raw
// response is always re-validated/fuzzy-matched against the controlled vocabulary before use.
export async function classifyFreeText(text: string, model: string = getPreferredModel()): Promise<NormalizedPrompt> {
  const fallback = heuristicClassify(text);
  try {
    const raw = await llmClassify(text, model);
    return normalize(raw, fallback);
  } catch (e) {
    console.warn('LLM classification failed, falling back to keyword heuristic:', e);
    return fallback;
  }
}
