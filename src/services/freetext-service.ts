import { GENRES, MOODS } from './chord-engine';
import { normalize, NormalizedPrompt } from './freetext-schema';

export type LLMProvider = 'opencodeai' | 'openrouter' | 'anthropic' | 'google';

export interface LLMModelOption {
  id: string;
  name: string;
  provider: LLMProvider;
  vendor: string;
}

export const OPENCODE_MODELS: LLMModelOption[] = [
  { id: 'deepseek-v4-flash-free', name: 'DeepSeek V4 Flash Free', provider: 'opencodeai', vendor: 'DeepSeek' },
  { id: 'mimo-v2.5-free', name: 'MiMo V2.5 Free', provider: 'opencodeai', vendor: 'Xiaomi' },
  { id: 'laguna-s-2.1-free', name: 'Laguna S 2.1 Free', provider: 'opencodeai', vendor: 'Stealth' },
  { id: 'ling-3.0-flash-free', name: 'Ling-3.0-flash Free', provider: 'opencodeai', vendor: 'Stealth' },
  { id: 'nemotron-3-ultra-free', name: 'Nemotron 3 Ultra Free', provider: 'opencodeai', vendor: 'NVIDIA' },
  { id: 'north-mini-code-free', name: 'North Mini Code Free', provider: 'opencodeai', vendor: 'Stealth' },
];

export const GOOGLE_MODELS: LLMModelOption[] = [
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'google', vendor: 'Google' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'google', vendor: 'Google' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'google', vendor: 'Google' },
];

const STORAGE_KEY_PROVIDER = 'chroma-chords-llm-provider';
const STORAGE_KEY_MODEL = 'chroma-chords-llm-model';

export function getLLMProvider(): LLMProvider {
  const saved = localStorage.getItem(STORAGE_KEY_PROVIDER);
  if (saved === 'opencodeai' || saved === 'anthropic' || saved === 'openrouter' || saved === 'google') {
    return saved;
  }
  return 'google';
}

export function setLLMProvider(provider: LLMProvider): void {
  localStorage.setItem(STORAGE_KEY_PROVIDER, provider);
}

export function getLLMModel(): string {
  const saved = localStorage.getItem(STORAGE_KEY_MODEL);
  if (saved) return saved;
  return GOOGLE_MODELS[0].id;
}

export function setLLMModel(modelId: string): void {
  localStorage.setItem(STORAGE_KEY_MODEL, modelId);
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
  "Uplifting": [
    "happy",
    "joy",
    "bright",
    "hope",
    "celebrat",
    "win",
    "sun",
    "morning",
    "triumph"
  ],
  "Melancholy": [
    "sad",
    "rain",
    "lonely",
    "grief",
    "loss",
    "blue",
    "tear",
    "goodbye"
  ],
  "Dreamy": [
    "dream",
    "float",
    "cloud",
    "soft",
    "sleep",
    "hazy",
    "ethereal",
    "stars"
  ],
  "Tense": [
    "fear",
    "anxious",
    "dark",
    "storm",
    "fight",
    "chase",
    "danger",
    "thriller"
  ],
  "Warm": [
    "cozy",
    "home",
    "fire",
    "love",
    "autumn",
    "familiar",
    "fireplace"
  ],
  "Nostalgic": [
    "memory",
    "childhood",
    "old",
    "faded",
    "remember",
    "summer",
    "photo",
    "yearbook"
  ],
  "Energetic": [
    "energetic",
    "pumped",
    "hype",
    "fast",
    "running",
    "workout",
    "power",
    "fire"
  ],
  "Dark": [
    "dark",
    "creepy",
    "night",
    "evil",
    "shadow",
    "gothic",
    "gloomy"
  ],
  "Peaceful": [
    "peaceful",
    "calm",
    "quiet",
    "zen",
    "relax",
    "nature",
    "gentle",
    "still"
  ],
  "Groovy": [
    "groovy",
    "funky",
    "danceable",
    "rhythm",
    "swing",
    "bounce",
    "jam"
  ],
  "Epic": [
    "epic",
    "heroic",
    "grand",
    "triumphant",
    "majestic",
    "legendary",
    "glory"
  ]
};

const GENRE_KEYWORDS: Record<string, string[]> = {
  "Pop": [
    "pop",
    "radio",
    "dance",
    "catchy",
    "hit"
  ],
  "Lo-fi/Chill": [
    "lofi",
    "lo-fi",
    "study",
    "bedroom",
    "tape",
    "chill",
    "relax"
  ],
  "R&B/Soul": [
    "rnb",
    "r&b",
    "soul",
    "smooth",
    "slow jam",
    "sultry"
  ],
  "Indie/Folk": [
    "folk",
    "acoustic",
    "campfire",
    "porch",
    "story",
    "indie"
  ],
  "Synthwave": [
    "synth",
    "80s",
    "neon",
    "retro",
    "synthwave",
    "arcade"
  ],
  "Jazz-ish": [
    "jazz",
    "smoky",
    "bar",
    "lounge",
    "late night",
    "saxophone"
  ],
  "Gospel": [
    "gospel",
    "church",
    "choir",
    "soulful",
    "worship"
  ],
  "Cinematic": [
    "movie",
    "film",
    "epic",
    "trailer",
    "scene",
    "cinematic"
  ],
  "Rock": [
    "rock",
    "guitar",
    "drive",
    "loud",
    "energy",
    "highway"
  ],
  "House/Dance": [
    "house",
    "edm",
    "club",
    "rave",
    "four on the floor",
    "dance floor"
  ],
  "Blues": [
    "blues",
    "12 bar",
    "delta",
    "chicago blues",
    "harmonica"
  ],
  "Funk/Disco": [
    "funk",
    "funky",
    "groovy",
    "disco",
    "slap bass",
    "boogie"
  ],
  "Country/Bluegrass": [
    "country",
    "bluegrass",
    "nashville",
    "banjo",
    "twang"
  ],
  "Reggae/Dub": [
    "reggae",
    "dub",
    "jamaica",
    "ska",
    "offbeat",
    "roots"
  ],
  "Metal": [
    "metal",
    "heavy metal",
    "thrash",
    "riff",
    "shred",
    "headbang",
    "metallica",
    "megadeth",
    "slayer",
    "iron maiden"
  ],
  "Punk": [
    "punk",
    "garage",
    "mosh",
    "rebel",
    "skate"
  ],
  "Ambient/Drone": [
    "ambient",
    "drone",
    "atmospheric",
    "soundscape",
    "meditation",
    "space"
  ],
  "Trap/Hip-Hop": [
    "trap",
    "hiphop",
    "hip-hop",
    "rap",
    "808",
    "beat"
  ],
  "Bossa Nova/Latin": [
    "bossa",
    "bossa nova",
    "samba",
    "latin",
    "rio",
    "habanera"
  ],
  "Classical/Orchestral": [
    "classical",
    "orchestra",
    "symphony",
    "concerto",
    "violin",
    "chamber"
  ],
  "EDM/Trance": [
    "trance",
    "techno",
    "buildup",
    "drop",
    "festival"
  ],
  "Afrobeats": [
    "afrobeats",
    "afropop",
    "lagos",
    "highlife",
    "afro"
  ],
  "Shoegaze": [
    "shoegaze",
    "fuzz",
    "wall of sound",
    "dream pop",
    "gazer"
  ]
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
      body: JSON.stringify({ text, provider: getLLMProvider(), model: getLLMModel() }),
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
// Supports 'mock:' or 'test:' prefix for testing full plumbing locally with 0 LLM API calls.
export async function classifyFreeText(text: string, authToken?: string | null): Promise<NormalizedPrompt | null> {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('mock') || lower.startsWith('test')) {
    const query = trimmed.replace(/^(mock|test)\s*:?\s*/i, '').trim();
    const matchedGenre = matchFromText(query, GENRE_KEYWORDS) ?? 'Synthwave';
    const matchedMood = matchFromText(query, MOOD_KEYWORDS) ?? 'Dreamy';

    const presetIdByGenre: Record<string, string> = {
      "Metal": "stab",
      "Rock": "guitar",
      "Punk": "stab",
      "Lo-fi/Chill": "epiano",
      "Synthwave": "juno-pad",
      "EDM/Trance": "juno-pad",
      "Gospel": "organ",
      "Reggae/Dub": "organ",
      "Country/Bluegrass": "guitar",
      "Bossa Nova/Latin": "guitar",
      "Ambient/Drone": "pad-strings",
      "Cinematic": "pad-strings",
      "Classical/Orchestral": "pad-strings",
      "Jazz-ish": "rhodes",
      "Pop": "rhodes",
      "R&B/Soul": "epiano",
    };

    const rhythmByGenre: Record<string, string> = {
      "Metal": "heavy_strum",
      "Rock": "driving_strum",
      "Punk": "fast_power_strum",
      "Lo-fi/Chill": "slow_arpeggio",
      "Synthwave": "retro_16th_arp",
      "EDM/Trance": "fast_triplets",
      "Gospel": "block_chords",
      "Reggae/Dub": "offbeat_ska",
      "Jazz-ish": "swing_feel",
      "Bossa Nova/Latin": "syncopated_bossa",
      "Ambient/Drone": "sustained_pad",
      "Classical/Orchestral": "slow_arpeggio",
      "Pop": "straight_8ths",
    };

    const keyByGenre: Record<string, { key: string; scaleType: string; chords: Array<{ root: string; quality: string }> }> = {
      "Metal": {
        key: "E", scaleType: "NATURAL_MINOR",
        chords: [
          { root: "E", quality: "min" }, { root: "G", quality: "maj" },
          { root: "D", quality: "maj" }, { root: "C", quality: "maj" },
          { root: "E", quality: "min" }, { root: "A", quality: "min" },
          { root: "B", quality: "dom7" }, { root: "E", quality: "min" }
        ]
      },
      "Rock": {
        key: "A", scaleType: "MAJOR",
        chords: [
          { root: "A", quality: "maj" }, { root: "D", quality: "maj" },
          { root: "E", quality: "dom7" }, { root: "F#", quality: "min" },
          { root: "D", quality: "maj" }, { root: "A", quality: "maj" },
          { root: "E", quality: "dom7" }, { root: "A", quality: "maj" }
        ]
      },
      "Jazz-ish": {
        key: "F", scaleType: "DORIAN",
        chords: [
          { root: "F", quality: "min7" }, { root: "A#", quality: "dom7" },
          { root: "D#", quality: "maj7" }, { root: "G#", quality: "maj7" },
          { root: "D", quality: "min7" }, { root: "G", quality: "dom7" },
          { root: "C", quality: "min7" }, { root: "F", quality: "dom7" }
        ]
      },
      "Lo-fi/Chill": {
        key: "C", scaleType: "DORIAN",
        chords: [
          { root: "C", quality: "min7" }, { root: "F", quality: "maj7" },
          { root: "A#", quality: "maj7" }, { root: "D#", quality: "maj7" },
          { root: "C", quality: "min7" }, { root: "D#", quality: "maj7" },
          { root: "F", quality: "min7" }, { root: "G", quality: "min7" }
        ]
      },
      "Gospel": {
        key: "C", scaleType: "MAJOR",
        chords: [
          { root: "C", quality: "maj" }, { root: "E", quality: "min7" },
          { root: "F", quality: "maj7" }, { root: "G", quality: "dom7" },
          { root: "A", quality: "min7" }, { root: "D", quality: "min7" },
          { root: "G", quality: "dom7" }, { root: "C", quality: "maj" }
        ]
      },
      "_default": {
        key: "F#", scaleType: "DORIAN",
        chords: [
          { root: "F#", quality: "min7" }, { root: "B", quality: "maj" },
          { root: "C#", quality: "min7" }, { root: "E", quality: "maj" },
          { root: "F#", quality: "min7" }, { root: "A", quality: "maj7" },
          { root: "B", quality: "min7" }, { root: "C#", quality: "dom7" }
        ]
      }
    };

    const keyData = keyByGenre[matchedGenre] || keyByGenre["_default"];
    const presetId = presetIdByGenre[matchedGenre] || "rhodes";
    const rhythmStyle = rhythmByGenre[matchedGenre] || "slow_arpeggio";

    const rawMock = {
      genre: matchedGenre,
      mood: matchedMood,
      key: keyData.key,
      scaleType: keyData.scaleType,
      length: 8,
      chords: keyData.chords,
      rhythmStyle,
      instrumentConfig: {
        presetId,
        customConfig: {
          envelope: { attack: 0.05, decay: 0.5, sustain: 0.6, release: 1.2 }
        }
      }
    };
    return normalize(rawMock, { genre: matchedGenre, mood: matchedMood });
  }

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
