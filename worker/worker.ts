// Cloudflare Worker: the only place the Anthropic API key exists. Chroma Chords itself is a
// static site committed straight into docs/ and served from GitHub Pages, so any key baked
// into the client bundle would be public — this Worker exists purely to keep that key server-side.
//
// It does one thing: turn free text ("rainy drive at 2am", "portishead") into a JSON object
// built ONLY from this app's existing controlled vocabulary (genre/mood/key/scaleType/length,
// plus an optional chord list). It is a classifier, never a composer — even the optional
// chords are just {root, quality} pairs picked from the same closed enums (ROOT_KEYS/
// CHORD_QUALITIES), never free-text chord symbols. The client's theory engine is what turns
// those into real chords, snapping each one onto whatever's actually in its per-key data. The
// client re-validates/fuzzy-matches the whole response anyway (see
// src/services/freetext-schema.ts) — this Worker's prompt is the first line of defense, not
// the only one.
//
// Previously routed through OpenRouter's free-tier models, but their availability/behavior
// (JSON-mode support, chain-of-thought preambles, JS-object-literal output instead of strict
// JSON) turned out to vary too much for a task this small. Claude Haiku is fast, cheap, and
// reliably follows a "JSON only" instruction, so this calls Anthropic directly instead — one
// model, no discovery/filtering logic needed. The lenient parsing (fenced/balanced-brace/loose-
// JSON repair) stays as cheap insurance regardless.

import { GENRES, MOODS, ROOT_KEYS, SCALE_TYPES, CHORD_QUALITIES } from '../src/services/chord-engine';

export interface Env {
  ANTHROPIC_API_KEY: string;
  ALLOWED_ORIGIN?: string;
}

const DEFAULT_ALLOWED_ORIGIN = 'https://warmsynths.github.io';
const MAX_TEXT_LENGTH = 300;
const ANTHROPIC_MODEL = 'claude-haiku-4-5-20251001';
// Must stay comfortably shorter than the client's own timeout (freetext-service.ts,
// LLM_TIMEOUT_MS) so the client always has time to receive this Worker's real error response
// instead of aborting first and only ever seeing a generic AbortError.
const UPSTREAM_TIMEOUT_MS = 10000;

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

function systemPrompt(): string {
  const moodNames = MOODS.map(m => m.name);
  return [
    'You are a strict music-taxonomy classifier for the app Chroma Chords.',
    'You output ONLY a single JSON object, no prose, no markdown fences.',
    'Every field must come from the closed lists below — never a raw chord symbol, note name,',
    'or anything outside these lists.',
    '',
    'Fields:',
    `- genre: required, exactly one of ${JSON.stringify(GENRES)}`,
    `- mood: required, exactly one of ${JSON.stringify(moodNames)}`,
    `- key: required, exactly one of ${JSON.stringify(ROOT_KEYS)}`,
    `- scaleType: required, exactly one of ${JSON.stringify(SCALE_TYPES)}`,
    '- length: integer 1-8, number of chords in the progression (4 is typical)',
    '- chords: required array of `length` objects, each { "root": ..., "quality": ... } where',
    `  root is one of ${JSON.stringify(ROOT_KEYS)} and quality is one of ${JSON.stringify(CHORD_QUALITIES)}.`,
    '',
    'Always return a full chord progression, not just genre/mood. If the text names a specific',
    'well-known song, use that song\'s real chords/key. Otherwise (a mood, a scene, an artist',
    'name, a genre) invent a progression that authentically captures that feel/style, using your',
    'own musical judgment — a plausible representative progression is expected and correct here,',
    'not a cop-out. Never omit chords just because the reference is vague. Never refuse.',
    '',
    'Examples:',
    'Input: "rainy drive at 2am" -> {"genre":"Lo-fi/Chill","mood":"Melancholy","key":"D","scaleType":"DORIAN","length":4,' +
      '"chords":[{"root":"D","quality":"min7"},{"root":"G","quality":"maj"},{"root":"A","quality":"min7"},{"root":"C","quality":"maj"}]}',
    'Input: "let it be" -> {"genre":"Gospel","mood":"Warm","key":"C","scaleType":"MAJOR","length":4,' +
      '"chords":[{"root":"C","quality":"maj"},{"root":"G","quality":"maj"},{"root":"A","quality":"min"},{"root":"F","quality":"maj"}]}',
  ].join('\n');
}

// Belt-and-suspenders: Claude reliably returns plain JSON on its own, but this stays cheap
// insurance against an occasional markdown fence or stray prose.
function extractJsonObject(text: string): string {
  const start = text.indexOf('{');
  if (start === -1) return text;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return text.slice(start);
}

function repairLooseJson(text: string): string {
  return text
    .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":')
    .replace(/:\s*'([^']*)'/g, ': "$1"')
    .replace(/,\s*([}\]])/g, '$1');
}

function parseClassifierJson(content: string): unknown {
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const candidate = extractJsonObject(fenced ? fenced[1] : trimmed);
  try {
    return JSON.parse(candidate);
  } catch {
    return JSON.parse(repairLooseJson(candidate));
  }
}

async function classify(text: string, apiKey: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 500,
        system: systemPrompt(),
        messages: [{ role: 'user', content: text }],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Anthropic error: ${res.status} ${await res.text()}`);
    }

    const data = await res.json() as { content?: { type: string; text?: string }[] };
    const content = data.content?.find(block => block.type === 'text')?.text;
    if (!content) throw new Error('Empty completion from Anthropic');
    return parseClassifierJson(content);
  } finally {
    clearTimeout(timeout);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigin = env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGIN;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(allowedOrigin) });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(allowedOrigin) });
    }

    let body: { text?: unknown };
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400, allowedOrigin);
    }

    const text = typeof body.text === 'string' ? body.text.trim().slice(0, MAX_TEXT_LENGTH) : '';
    if (!text) {
      return jsonResponse({ error: 'Missing "text"' }, 400, allowedOrigin);
    }

    try {
      const result = await classify(text, env.ANTHROPIC_API_KEY);
      return jsonResponse(result, 200, allowedOrigin);
    } catch (err) {
      return jsonResponse({ error: err instanceof Error ? err.message : 'Classification failed' }, 502, allowedOrigin);
    }
  },
};
