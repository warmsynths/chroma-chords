// Cloudflare Worker: the only place the OpenRouter API key exists. Chroma Chords itself is a
// static site committed straight into docs/ and served from GitHub Pages, so any key baked
// into the client bundle would be public — this Worker exists purely to keep that key server-side.
//
// It does one thing: turn free text ("rainy drive at 2am") into a JSON object built ONLY from
// this app's existing controlled vocabulary (genre/mood/key/scaleType/length). It is a
// classifier, never a composer — it must not be asked for, and must not return, chord names
// or progressions. The client re-validates/fuzzy-matches the response anyway (see
// src/services/freetext-schema.ts) — this Worker's prompt is the first line of defense, not
// the only one.
//
// Free-tier model IDs on OpenRouter get renamed/deprecated over time (e.g.
// meta-llama/llama-3.1-8b-instruct:free was retired in favor of a paid slug), so rather than
// hardcode one, the default model is picked live from OpenRouter's own model list on each
// request (cached briefly per Worker isolate). Free models also vary in whether they support
// the `response_format: json_object` parameter — some providers hard-error if you send it — so
// that's only included when the chosen model actually advertises support for it; either way the
// response is parsed leniently (markdown-fenced JSON is unwrapped) since the system prompt is
// the real enforcement, not the API parameter. GET /models exposes the same filtered list for
// manual inspection/override — it's a public read-only endpoint, no key required to call it.

import { GENRES, MOODS, ROOT_KEYS, SCALE_TYPES } from '../src/services/chord-engine';

export interface Env {
  OPENROUTER_KEY: string;
  ALLOWED_ORIGIN?: string;
}

const DEFAULT_ALLOWED_ORIGIN = 'https://warmsynths.github.io';
const MAX_TEXT_LENGTH = 300;
const UPSTREAM_TIMEOUT_MS = 8000;
const MODEL_LIST_CACHE_MS = 60 * 60 * 1000; // 1 hour

interface OpenRouterModel {
  id: string;
  name?: string;
  pricing?: { prompt?: string; completion?: string };
  architecture?: { modality?: string; input_modalities?: string[]; output_modalities?: string[] };
  supported_parameters?: string[];
}

interface ModelOption {
  id: string;
  name: string;
  supportsJsonMode: boolean;
}

let rawModelListCache: { models: OpenRouterModel[]; fetchedAt: number } | null = null;

function isFreeTextModel(m: OpenRouterModel): boolean {
  const isFree = m.id.endsWith(':free')
    || (parseFloat(m.pricing?.prompt ?? '1') === 0 && parseFloat(m.pricing?.completion ?? '1') === 0);

  const arch = m.architecture;
  const isTextOnly = arch?.modality === 'text->text'
    || ((arch?.input_modalities ?? ['text']).every(x => x === 'text')
      && (arch?.output_modalities ?? ['text']).every(x => x === 'text'));

  return isFree && isTextOnly;
}

function supportsJsonMode(m: OpenRouterModel): boolean {
  return Array.isArray(m.supported_parameters)
    && (m.supported_parameters.includes('response_format') || m.supported_parameters.includes('structured_outputs'));
}

// OpenRouter's model listing is public and needs no API key — safe to call from here without
// the secret, and safe to expose filtered results to the client via GET /models.
async function fetchAllModels(): Promise<OpenRouterModel[]> {
  const now = Date.now();
  if (rawModelListCache && now - rawModelListCache.fetchedAt < MODEL_LIST_CACHE_MS) {
    return rawModelListCache.models;
  }

  const res = await fetch('https://openrouter.ai/api/v1/models');
  if (!res.ok) throw new Error(`Failed to list OpenRouter models: ${res.status}`);
  const data = await res.json() as { data: OpenRouterModel[] };

  rawModelListCache = { models: data.data, fetchedAt: now };
  return data.data;
}

async function listFreeTextModels(): Promise<ModelOption[]> {
  const all = await fetchAllModels();
  return all.filter(isFreeTextModel).map(m => ({ id: m.id, name: m.name || m.id, supportsJsonMode: supportsJsonMode(m) }));
}

// Picks which model to call and whether it's safe to ask it for structured JSON output.
// Prefers a free/text model that advertises json-mode support; falls back to the first free
// text model otherwise (still works, just relies on the prompt alone for JSON formatting).
async function resolveModel(requestedId: string | undefined): Promise<{ id: string; useJsonMode: boolean }> {
  const all = await fetchAllModels();

  if (requestedId) {
    const found = all.find(m => m.id === requestedId);
    return { id: requestedId, useJsonMode: found ? supportsJsonMode(found) : false };
  }

  const freeText = all.filter(isFreeTextModel);
  if (!freeText.length) throw new Error('No free text-only models currently available on OpenRouter');

  const jsonCapable = freeText.filter(supportsJsonMode);
  const chosen = jsonCapable.length ? jsonCapable[0] : freeText[0];
  return { id: chosen.id, useJsonMode: supportsJsonMode(chosen) };
}

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
    'You must never output a chord name, chord symbol, or progression — only the tags below.',
    '',
    'Fields (all optional except genre and mood):',
    `- genre: exactly one of ${JSON.stringify(GENRES)}`,
    `- mood: exactly one of ${JSON.stringify(moodNames)}`,
    `- key: optional, exactly one of ${JSON.stringify(ROOT_KEYS)}`,
    `- scaleType: optional, exactly one of ${JSON.stringify(SCALE_TYPES)}`,
    '- length: optional integer 1-8, number of chords in the progression',
    '',
    'Interpret the user\'s free text (a scene, feeling, artist name, or song title) and pick the',
    'closest matching tags from the lists above. If the text names a real artist or song, infer',
    'genre/mood from that artist or song\'s general style — do not refuse.',
    '',
    'Examples:',
    'Input: "rainy drive at 2am" -> {"genre":"Lo-fi/Chill","mood":"Melancholy"}',
    'Input: "portishead" -> {"genre":"Jazz-ish","mood":"Tense"}',
    'Input: "bohemian rhapsody" -> {"genre":"Rock","mood":"Tense","length":6}',
  ].join('\n');
}

// Some models wrap JSON in a ```json fence even when told not to — unwrap it before parsing
// rather than treating that as a hard failure.
function parseClassifierJson(content: string): unknown {
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return JSON.parse(fenced ? fenced[1] : trimmed);
}

async function classify(text: string, model: string, useJsonMode: boolean, apiKey: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': DEFAULT_ALLOWED_ORIGIN,
        'X-Title': 'Chroma Chords',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt() },
          { role: 'user', content: text },
        ],
        ...(useJsonMode ? { response_format: { type: 'json_object' } } : {}),
        temperature: 0.2,
        max_tokens: 150,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`OpenRouter error: ${res.status} ${await res.text()}`);
    }

    const data = await res.json() as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty completion from OpenRouter');
    return parseClassifierJson(content);
  } finally {
    clearTimeout(timeout);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigin = env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGIN;
    const { pathname } = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(allowedOrigin) });
    }

    if (request.method === 'GET' && pathname === '/models') {
      try {
        const models = await listFreeTextModels();
        return jsonResponse({ models }, 200, allowedOrigin);
      } catch (err) {
        return jsonResponse({ error: err instanceof Error ? err.message : 'Failed to list models' }, 502, allowedOrigin);
      }
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders(allowedOrigin) });
    }

    let body: { text?: unknown; model?: unknown };
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
      const requestedId = typeof body.model === 'string' && body.model.trim() ? body.model.trim() : undefined;
      const { id: model, useJsonMode } = await resolveModel(requestedId);
      const result = await classify(text, model, useJsonMode, env.OPENROUTER_KEY);
      return jsonResponse(result, 200, allowedOrigin);
    } catch (err) {
      return jsonResponse({ error: err instanceof Error ? err.message : 'Classification failed' }, 502, allowedOrigin);
    }
  },
};
