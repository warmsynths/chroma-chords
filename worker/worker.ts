// Cloudflare Worker: Multi-provider server-side proxy for Chroma Chords.
//
// Supports two routing modes based on the optional `provider` field in the request body:
// 1. "openrouter" (default): Dynamically polls OpenRouter's live /api/v1/models endpoint in
//    the background, filters for active free models (:free / $0 pricing), ranks them for music
//    classification & structured JSON adherence, and iterates with fallback + reasoning tag cleanup.
// 2. "anthropic": Calls Claude Haiku directly using ANTHROPIC_API_KEY.

import { GENRES, MOODS, ROOT_KEYS, SCALE_TYPES, CHORD_QUALITIES } from '../src/services/chord-engine';

export interface Env {
  OPENROUTER_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
}

interface OpenRouterModel {
  id: string;
  name?: string;
  context_length?: number;
  pricing?: { prompt?: string; completion?: string };
}

const DEFAULT_ALLOWED_ORIGIN = 'https://warmsynths.github.io';
const MAX_TEXT_LENGTH = 300;
const ANTHROPIC_MODEL = 'claude-haiku-4-5-20251001';
const OPENROUTER_ATTEMPT_TIMEOUT_MS = 5500; // Allow 5.5s per model attempt so requests don't abort prematurely
const ANTHROPIC_TIMEOUT_MS = 10000;
const CACHE_TTL_MS = 10 * 60 * 1000; // Cache discovered free models for 10 minutes

let cachedModels: { models: string[]; timestamp: number } | null = null;

const STATIC_FALLBACK_MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'openai/gpt-oss-20b:free',
  'inclusionai/ling-3.0-flash:free',
  'nvidia/nemotron-3-nano-30b-a3b:free',
];

async function fetchActiveFreeModelsBackground(): Promise<void> {
  const now = Date.now();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch('https://openrouter.ai/api/v1/models', { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = (await res.json()) as { data?: OpenRouterModel[] };
      if (Array.isArray(data.data)) {
        // Filter for active free models, excluding safety/moderation-only endpoints
        const freeList = data.data.filter(m => {
          if (!m.id) return false;
          const isFreeId = m.id.endsWith(':free');
          const isFreePrice = m.pricing?.prompt === '0' && m.pricing?.completion === '0';
          const isSafety = m.id.includes('content-safety') || m.id.includes('moderation');
          return (isFreeId || isFreePrice) && !isSafety;
        });

        // Rank models for music classification and JSON instruction adherence
        const scored = freeList.map(m => {
          let score = 0;
          const idLower = m.id.toLowerCase();
          const nameLower = (m.name || '').toLowerCase();

          // Prefer top-tier general instruct & reasoning models suitable for music taxonomy
          if (idLower.includes('gemma') || nameLower.includes('gemma')) score += 50;
          if (idLower.includes('gpt') || nameLower.includes('gpt')) score += 40;
          if (idLower.includes('ling') || nameLower.includes('ling')) score += 35;
          if (idLower.includes('llama') || nameLower.includes('llama')) score += 30;
          if (idLower.includes('qwen') || nameLower.includes('qwen')) score += 25;
          if (idLower.includes('mistral') || nameLower.includes('mistral')) score += 20;
          if (idLower.includes('nemotron') || nameLower.includes('nemotron')) score += 15;

          if (m.context_length && m.context_length >= 131072) score += 10;

          return { id: m.id, score };
        });

        scored.sort((a, b) => b.score - a.score);
        const rankedIds = scored.map(s => s.id);

        if (rankedIds.length > 0) {
          cachedModels = { models: rankedIds, timestamp: now };
        }
      }
    }
  } catch {
    // Background fetch failed, static fallback remains active
  }
}

async function getFreeModels(): Promise<string[]> {
  const now = Date.now();
  if (!cachedModels || now - cachedModels.timestamp >= CACHE_TTL_MS) {
    // Trigger background refresh without blocking current request
    fetchActiveFreeModelsBackground().catch(() => {});
  }
  return cachedModels?.models || STATIC_FALLBACK_MODELS;
}

function corsHeaders(request: Request, env: Env): HeadersInit {
  const reqOrigin = request.headers.get('Origin');
  const configuredOrigin = env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGIN;

  let allowOrigin = configuredOrigin;
  if (reqOrigin) {
    if (
      reqOrigin === configuredOrigin ||
      reqOrigin.startsWith('http://localhost') ||
      reqOrigin.startsWith('http://127.0.0.1') ||
      reqOrigin.endsWith('.github.io')
    ) {
      allowOrigin = reqOrigin;
    }
  }

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(body: unknown, status: number, request: Request, env: Env): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' },
  });
}

function systemPrompt(): string {
  const moodNames = MOODS.map(m => m.name);
  return [
    'You are a strict music-taxonomy classifier for the app Chroma Chords.',
    'You output ONLY a single JSON object, no prose, no markdown fences, no reasoning preambles.',
    'Every field must come from the closed lists below — never a raw chord symbol, note name,',
    'or anything outside these lists.',
    '',
    'Fields:',
    `- genre: required, exactly one of ${JSON.stringify(GENRES)}`,
    `- mood: required, exactly one of ${JSON.stringify(moodNames)}`,
    `- key: required, exactly one of ${JSON.stringify(ROOT_KEYS)}`,
    `- scaleType: required, exactly one of ${JSON.stringify(SCALE_TYPES)}`,
    '- length: integer 8 (always generate a full 8-chord progression)',
    '- chords: required array of exactly 8 objects, each { "root": ..., "quality": ... } where',
    `  root is one of ${JSON.stringify(ROOT_KEYS)} and quality is one of ${JSON.stringify(CHORD_QUALITIES)}.`,
    '',
    'Always return a full 8-chord progression, not just genre/mood. If the text names a specific',
    'well-known song, use that song\'s real chords/key (extending or repeating the progression to 8 chords if needed).',
    'Otherwise (a mood, a scene, an artist name, a genre) invent an 8-chord progression that authentically',
    'captures that feel/style.',
    'Never refuse. Never output anything except JSON.',
    '',
    'Example output:',
    '{"genre":"Lo-fi/Chill","mood":"Melancholy","key":"D","scaleType":"DORIAN","length":8,' +
      '"chords":[{"root":"D","quality":"min7"},{"root":"G","quality":"maj"},{"root":"A","quality":"min7"},{"root":"C","quality":"maj"},' +
      '{"root":"D","quality":"min7"},{"root":"F","quality":"maj7"},{"root":"G","quality":"min7"},{"root":"A","quality":"dom7"}]}',
  ].join('\n');
}

// Strips internal reasoning/thinking tags emitted by models like DeepSeek-R1
function stripThinkingTags(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '').trim();
}

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

function parseClassifierJson(rawContent: string): unknown {
  const cleaned = stripThinkingTags(rawContent);
  const fenced = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const candidate = extractJsonObject(fenced ? fenced[1] : cleaned);
  try {
    return JSON.parse(candidate);
  } catch {
    return JSON.parse(repairLooseJson(candidate));
  }
}

// --- Anthropic Call ---
async function classifyAnthropic(text: string, apiKey: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ANTHROPIC_TIMEOUT_MS);

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
      throw new Error(`Anthropic HTTP ${res.status}: ${await res.text()}`);
    }

    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const content = data.content?.find(block => block.type === 'text')?.text;
    if (!content) throw new Error('Empty response from Anthropic');
    return parseClassifierJson(content);
  } finally {
    clearTimeout(timeout);
  }
}

// --- OpenRouter Fallback Calls ---
async function tryOpenRouterModel(text: string, model: string, apiKey: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENROUTER_ATTEMPT_TIMEOUT_MS);

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://warmsynths.github.io/chroma-chords',
        'X-Title': 'Chroma Chords',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        max_tokens: 450,
        messages: [
          { role: 'system', content: systemPrompt() },
          { role: 'user', content: text },
        ],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      if (res.status === 429 && errText.includes('free-models-per-day')) {
        throw new Error('OpenRouter daily free limit reached (50 requests/day). Add credits to your OpenRouter account to unlock 1,000/day, or switch AI to Claude in the footer.');
      }
      throw new Error(`OpenRouter HTTP ${res.status}: ${errText}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty completion content from OpenRouter');

    return parseClassifierJson(content);
  } finally {
    clearTimeout(timeout);
  }
}

async function classifyOpenRouter(text: string, apiKey: string): Promise<unknown> {
  const models = await getFreeModels();
  let lastError: unknown = null;

  for (const model of models) {
    try {
      return await tryOpenRouterModel(text, model, apiKey);
    } catch (err) {
      if (err instanceof Error && err.message.includes('daily free limit reached')) {
        throw err;
      }
      console.warn(`OpenRouter free model ${model} failed, trying next:`, err);
      lastError = err;
    }
  }

  throw new Error(`All OpenRouter free models failed. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, request, env);
    }

    let body: { text?: unknown; provider?: unknown };
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400, request, env);
    }

    const text = typeof body.text === 'string' ? body.text.trim().slice(0, MAX_TEXT_LENGTH) : '';
    if (!text) {
      return jsonResponse({ error: 'Missing "text"' }, 400, request, env);
    }

    const provider = typeof body.provider === 'string' ? body.provider.toLowerCase() : 'openrouter';

    try {
      if (provider === 'anthropic' || provider === 'claude') {
        if (!env.ANTHROPIC_API_KEY) {
          return jsonResponse({ error: 'ANTHROPIC_API_KEY secret is not configured on Cloudflare Worker' }, 500, request, env);
        }
        const result = await classifyAnthropic(text, env.ANTHROPIC_API_KEY);
        return jsonResponse(result, 200, request, env);
      } else {
        if (!env.OPENROUTER_API_KEY) {
          return jsonResponse({ error: 'OPENROUTER_API_KEY secret is not configured on Cloudflare Worker' }, 500, request, env);
        }
        const result = await classifyOpenRouter(text, env.OPENROUTER_API_KEY);
        return jsonResponse(result, 200, request, env);
      }
    } catch (err) {
      return jsonResponse({ error: err instanceof Error ? err.message : 'Classification failed' }, 502, request, env);
    }
  },
};
