// Cloudflare Worker: Multi-provider server-side proxy for Chroma Chords.
//
// Supports two routing modes based on the optional `provider` field in the request body:
// 1. "openrouter" (default): Dynamically polls OpenRouter's live /api/v1/models endpoint in
//    the background, filters for active free models (:free / $0 pricing), ranks them for music
//    classification & structured JSON adherence, and iterates with fallback + reasoning tag cleanup.
// 2. "anthropic": Calls Claude Haiku directly using ANTHROPIC_API_KEY.

import { GENRES, MOODS, ROOT_KEYS, SCALE_TYPES, CHORD_QUALITIES } from '../src/services/chord-engine';

export interface Env {
  OPENCODE_API_KEY?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_KEY?: string;
  GOOGLE_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
  ALLOWED_EMAILS?: string;
  RATE_LIMIT_KV?: any;
}

async function verifyGoogleAccount(token: string): Promise<{ email?: string; verified: boolean }> {
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { verified: false };
    const info = (await res.json()) as { email?: string; email_verified?: boolean };
    if (info && info.email && info.email_verified !== false) {
      return { email: info.email.toLowerCase(), verified: true };
    }
    return { verified: false };
  } catch {
    return { verified: false };
  }
}

async function isAdminRequest(request: Request, env: Env): Promise<boolean> {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7).trim() : null;
  if (!token) return false;

  const userAccount = await verifyGoogleAccount(token);
  if (!userAccount.verified || !userAccount.email) return false;

  const allowedEmails = (env.ALLOWED_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(userAccount.email);
}

const GOOGLE_RPM = 15;
const GOOGLE_RPD = 1500;

interface GoogleRateLimit {
  allowed: boolean;
  rpmLimit: number;
  rpmRemaining: number;
  rpmCooldownSeconds: number;
  rpdLimit: number;
  rpdRemaining: number;
}

async function checkGoogleRateLimit(env: Env, consume = true): Promise<GoogleRateLimit> {
  const defaultRes = { allowed: true, rpmLimit: GOOGLE_RPM, rpmRemaining: consume ? GOOGLE_RPM - 1 : GOOGLE_RPM, rpmCooldownSeconds: 4, rpdLimit: GOOGLE_RPD, rpdRemaining: consume ? GOOGLE_RPD - 1 : GOOGLE_RPD };
  if (!env.RATE_LIMIT_KV) return defaultRes;

  const now = Date.now();
  const dayString = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const key = `google_bucket_${dayString}`;
  
  const raw = await env.RATE_LIMIT_KV.get(key, 'json').catch(() => null) as { rpmTokens: number, rpmLastUpdated: number, rpdTokens: number } | null;
  
  let rpmTokens = GOOGLE_RPM;
  let rpmLastUpdated = now;
  let rpdTokens = GOOGLE_RPD;

  if (raw && typeof raw.rpmTokens === 'number' && typeof raw.rpmLastUpdated === 'number' && typeof raw.rpdTokens === 'number') {
    const elapsed = now - raw.rpmLastUpdated;
    // 15 requests per minute = 1 request every 4 seconds (4000ms)
    const regenerated = Math.floor(elapsed / 4000);
    
    rpmTokens = Math.min(GOOGLE_RPM, raw.rpmTokens + regenerated);
    if (regenerated > 0) {
      rpmLastUpdated = raw.rpmLastUpdated + (regenerated * 4000);
    } else {
      rpmLastUpdated = raw.rpmLastUpdated;
    }
    rpdTokens = raw.rpdTokens;
  }

  if (!consume) {
    return { allowed: true, rpmLimit: GOOGLE_RPM, rpmRemaining: rpmTokens, rpmCooldownSeconds: 4, rpdLimit: GOOGLE_RPD, rpdRemaining: rpdTokens };
  }

  if (rpmTokens > 0 && rpdTokens > 0) {
    rpmTokens -= 1;
    rpdTokens -= 1;
    rpmLastUpdated = now;
    await env.RATE_LIMIT_KV.put(key, JSON.stringify({ rpmTokens, rpmLastUpdated, rpdTokens }));
    return { allowed: true, rpmLimit: GOOGLE_RPM, rpmRemaining: rpmTokens, rpmCooldownSeconds: 4, rpdLimit: GOOGLE_RPD, rpdRemaining: rpdTokens };
  }

  return { allowed: false, rpmLimit: GOOGLE_RPM, rpmRemaining: rpmTokens, rpmCooldownSeconds: 4, rpdLimit: GOOGLE_RPD, rpdRemaining: rpdTokens };
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
const GOOGLE_TIMEOUT_MS = 10000;
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
    try {
      const parsedOrigin = new URL(reqOrigin);
      const hostname = parsedOrigin.hostname.toLowerCase();
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
      const isAllowedDomain = reqOrigin === configuredOrigin || hostname === 'warmsynths.github.io';

      if (isLocalhost || isAllowedDomain) {
        allowOrigin = reqOrigin;
      }
    } catch {
      // Invalid Origin header format, default back to configured origin
    }
  }

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Title, HTTP-Referer, x-api-key',
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
  const baselineInstruments = ['rhodes', 'epiano', 'guitar', 'pad-strings', 'bell', 'organ', 'juno-pad', 'stab'];
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
    '- rhythmStyle: required string defining the rhythmic playback feel (e.g., "syncopated_16ths", "slow_arpeggio", "trip_hop_groove", "straight_8ths", "strum").',
    '- instrumentConfig: required object defining the Tone.js instrument state containing:',
    `  * presetId: required string, closest match from baseline library keys: ${JSON.stringify(baselineInstruments)}`,
    '  * customConfig: optional nested JSON object containing valid Tone.js parameters to override the base preset and match requested aesthetic.',
    '    CRITICAL: Only use standard, valid Tone.js properties in customConfig (e.g. envelope, oscillator, filterEnvelope, harmonicity, modulationIndex) to prevent audio context errors.',
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
      '{"root":"D","quality":"min7"},{"root":"F","quality":"maj7"},{"root":"G","quality":"min7"},{"root":"A","quality":"dom7"}],' +
      '"rhythmStyle":"slow_arpeggio",' +
      '"instrumentConfig":{"presetId":"rhodes","customConfig":{"envelope":{"attack":0.02,"decay":0.8,"sustain":0.3,"release":1.2}}}}',
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
  } catch (e1: any) {
    try {
      return JSON.parse(repairLooseJson(candidate));
    } catch (e2: any) {
      throw new Error(`${e2.message} (raw partial: ${JSON.stringify(rawContent).slice(0, 150)}...)`);
    }
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
        max_tokens: 2048,
        system: systemPrompt(),
        messages: [{ role: 'user', content: text }],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Anthropic API error (status ${res.status})`);
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
        max_tokens: 2048,
        messages: [
          { role: 'system', content: systemPrompt() },
          { role: 'user', content: text },
        ],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      if (res.status === 429) {
        const rateErr = new Error('OpenRouter daily free limit reached (50 requests/day). Add credits to your OpenRouter account to unlock 1,000/day, or switch AI to Claude.');
        (rateErr as any)._rateLimit = { limit: 50, remaining: 0 };
        throw rateErr;
      }
      throw new Error(`OpenRouter API error (status ${res.status})`);
    }

    const limitHeader = res.headers.get('x-ratelimit-limit');
    const remainingHeader = res.headers.get('x-ratelimit-remaining');

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty completion content from OpenRouter');

    const parsed = parseClassifierJson(content);
    if (parsed && typeof parsed === 'object') {
      const rateLimit: Record<string, any> = {
        limit: limitHeader ? parseInt(limitHeader, 10) : 50,
        remaining: remainingHeader ? parseInt(remainingHeader, 10) : 0,
        provider: 'openrouter',
      };
      (parsed as any)._rateLimit = rateLimit;
    }
    return parsed;
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
      if (err && typeof err === 'object' && ('_rateLimit' in err || (err instanceof Error && err.message.includes('daily free limit reached')))) {
        throw err;
      }
      console.warn(`OpenRouter free model ${model} failed, trying next:`, err);
      lastError = err;
    }
  }

  throw new Error(`All OpenRouter free models failed. Last status: ${lastError instanceof Error ? lastError.message : 'Unavailable'}`);
}

async function classifyOpenCode(text: string, rawModel: string, apiKey: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENROUTER_ATTEMPT_TIMEOUT_MS);
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  const baseModel = rawModel || 'deepseek-v4-flash-free';

  if (!cleanKey) {
    throw new Error('OPENCODE_API_KEY secret is missing. Upload your key to Cloudflare using: wrangler secret put OPENCODE_API_KEY');
  }

  let sanitizedModel = baseModel;
  if (sanitizedModel.includes('/')) {
    sanitizedModel = sanitizedModel.split('/')[1];
  }
  sanitizedModel = sanitizedModel.replace(':free', '-free');

  const modelCandidates = Array.from(new Set([
    sanitizedModel,
    sanitizedModel.replace(/-free$/, ''),
  ]));

  const endpoints = [
    'https://opencode.ai/zen/v1/chat/completions',
    'https://opencode.ai/zen/go/v1/chat/completions',
  ];

  let lastErrorMsg = '';

  try {
    for (const endpoint of endpoints) {
      for (const targetModel of modelCandidates) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${cleanKey}`,
              'x-api-key': cleanKey,
              'HTTP-Referer': 'https://warmsynths.github.io/chroma-chords',
              'X-Title': 'Chroma Chords',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: targetModel,
              temperature: 0.1,
              max_tokens: 2048,
              messages: [
                { role: 'system', content: systemPrompt() },
                { role: 'user', content: text },
              ],
            }),
            signal: controller.signal,
          });

          const responseText = await res.text();
          let jsonBody: any = null;
          try {
            jsonBody = JSON.parse(responseText);
          } catch {
            lastErrorMsg = `OpenCode AI (${endpoint} with model "${targetModel}"): HTTP ${res.status} - ${responseText.slice(0, 80).trim()}`;
            continue;
          }

          if (!res.ok) {
            let detail = `HTTP ${res.status}`;
            if (jsonBody && typeof jsonBody === 'object') {
              if ('error' in jsonBody) {
                detail = typeof jsonBody.error === 'string' ? jsonBody.error : JSON.stringify(jsonBody.error);
              } else if ('message' in jsonBody) {
                detail = String(jsonBody.message);
              }
            }
            lastErrorMsg = `OpenCode AI (${endpoint} with model "${targetModel}"): ${detail}`;
            continue;
          }

          const content = jsonBody.choices?.[0]?.message?.content;
          if (!content) {
            lastErrorMsg = `Empty response content from OpenCode AI (${endpoint})`;
            continue;
          }

          return parseClassifierJson(content);
        } catch (err) {
          lastErrorMsg = err instanceof Error ? err.message : String(err);
        }
      }
    }
  } finally {
    clearTimeout(timeout);
  }

  throw new Error(lastErrorMsg || 'OpenCode AI request failed. Please check your OPENCODE_API_KEY.');
}

async function classifyGoogle(text: string, rawModel: string, apiKey: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GOOGLE_TIMEOUT_MS);
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  let model = rawModel || 'gemini-3.1-flash-lite';
  if (model === 'gemini-1.5-flash' || model === 'gemini-2.0-flash' || model === 'gemini-2.5-flash' || model === 'gemini-3.5-flash') {
    model = 'gemini-3.1-flash-lite';
  } else if (model === 'gemini-1.5-pro') {
    model = 'gemini-3.1-flash-lite';
  }

  if (!cleanKey) {
    throw new Error('GOOGLE_API_KEY secret is missing. Upload your key to Cloudflare using: wrangler secret put GOOGLE_API_KEY');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt() }],
        },
        contents: [{
          role: 'user',
          parts: [{ text }],
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
      signal: controller.signal,
    });

    const responseText = await res.text();
    let jsonBody: any = null;
    try {
      jsonBody = JSON.parse(responseText);
    } catch {
      throw new Error(`Google AI Studio HTTP ${res.status} - ${responseText.slice(0, 80).trim()}`);
    }

    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      if (jsonBody && typeof jsonBody === 'object') {
        if (jsonBody.error && typeof jsonBody.error.message === 'string') {
          detail = jsonBody.error.message;
        } else if (jsonBody.error) {
          detail = JSON.stringify(jsonBody.error);
        }
      }
      throw new Error(`Google AI Studio error: ${detail}`);
    }

    const candidate = jsonBody.candidates?.[0];
    const finishReason = candidate?.finishReason;
    const content = candidate?.content?.parts?.[0]?.text;
    
    if (finishReason && finishReason !== 'STOP') {
      throw new Error(`Google AI aborted (finishReason: ${finishReason}). Output: ${content}`);
    }
    
    if (!content) {
      throw new Error(`Empty response content from Google AI Studio`);
    }

    return parseClassifierJson(content);
  } finally {
    clearTimeout(timeout);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (request.method === 'GET') {
      const googleRl = await checkGoogleRateLimit(env, false);
      let orLimit = 50, orRemaining = 50;

      const apiKey = env.OPENROUTER_API_KEY || env.OPENCODE_API_KEY;
      if (apiKey) {
        try {
          const testRes = await fetch('https://openrouter.ai/api/v1/auth/key', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': 'https://warmsynths.github.io/chroma-chords',
            },
          });
          const remHeader = testRes.headers.get('x-ratelimit-remaining');
          const limHeader = testRes.headers.get('x-ratelimit-limit');
          if (remHeader) orRemaining = parseInt(remHeader, 10);
          if (limHeader) orLimit = parseInt(limHeader, 10);
        } catch {
          // ignore
        }
      }

      return jsonResponse({
        google: {
          limit: googleRl.rpmLimit,
          remaining: googleRl.rpmRemaining,
          cooldownSeconds: googleRl.rpmCooldownSeconds
        },
        openrouter: {
          limit: orLimit,
          remaining: orRemaining,
        },
        totalRemaining: googleRl.rpdRemaining + orRemaining
      }, 200, request, env);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, request, env);
    }

    let body: { text?: unknown; provider?: unknown; model?: unknown };
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400, request, env);
    }

    const text = typeof body.text === 'string' ? body.text.trim().slice(0, MAX_TEXT_LENGTH) : '';
    if (!text) {
      return jsonResponse({ error: 'Missing "text"' }, 400, request, env);
    }

    const provider = typeof body.provider === 'string' ? body.provider.toLowerCase() : 'google';
    const model = typeof body.model === 'string' ? body.model : '';

    try {
      const isAdmin = await isAdminRequest(request, env);

      if (provider === 'google') {
        const rl = await checkGoogleRateLimit(env, !isAdmin);
        if (!isAdmin && !rl.allowed) {
          return jsonResponse({
            error: 'Google rate limit reached. Please try again in a few seconds.',
            _rateLimit: { limit: rl.rpmLimit, remaining: rl.rpmRemaining, cooldownSeconds: rl.rpmCooldownSeconds, provider: 'google' }
          }, 429, request, env);
        }

        if (!env.GOOGLE_API_KEY) {
          return jsonResponse({ error: 'GOOGLE_API_KEY secret is not set on Cloudflare Worker. Please upload your key using: wrangler secret put GOOGLE_API_KEY' }, 500, request, env);
        }
        const result = await classifyGoogle(text, model, env.GOOGLE_API_KEY);
        
        if (typeof result === 'object' && result !== null) {
          (result as any)._rateLimit = { limit: rl.rpmLimit, remaining: rl.rpmRemaining, cooldownSeconds: rl.rpmCooldownSeconds, provider: 'google' };
        }
        return jsonResponse(result, 200, request, env);
      } else if (provider === 'opencodeai' || provider === 'opencode') {
        if (!env.OPENCODE_API_KEY) {
          return jsonResponse({ error: 'OPENCODE_API_KEY secret is not set on Cloudflare Worker. Please upload your key using: wrangler secret put OPENCODE_API_KEY' }, 500, request, env);
        }
        const result = await classifyOpenCode(text, model, env.OPENCODE_API_KEY);
        return jsonResponse(result, 200, request, env);
      } else if (provider === 'anthropic' || provider === 'claude') {
        if (!env.ANTHROPIC_API_KEY) {
          return jsonResponse({ error: 'ANTHROPIC_API_KEY secret is not configured on Cloudflare Worker' }, 500, request, env);
        }

        if (!isAdmin) {
          return jsonResponse({ error: 'Account is not authorized to use Claude' }, 403, request, env);
        }

        const result = await classifyAnthropic(text, env.ANTHROPIC_API_KEY);
        return jsonResponse(result, 200, request, env);
      } else {
        if (!env.OPENROUTER_API_KEY && !env.OPENCODE_API_KEY) {
          return jsonResponse({ error: 'OPENROUTER_API_KEY secret is not configured on Cloudflare Worker' }, 500, request, env);
        }
        const apiKey = env.OPENROUTER_API_KEY || env.OPENCODE_API_KEY!;
        const result = await classifyOpenRouter(text, apiKey);
        return jsonResponse(result, 200, request, env);
      }
    } catch (err: any) {
      const errRes: Record<string, unknown> = {
        error: err instanceof Error ? err.message : 'Classification failed'
      };
      if (err && typeof err === 'object' && '_rateLimit' in err) {
        errRes._rateLimit = err._rateLimit;
      }
      return jsonResponse(errRes, 502, request, env);
    }
  },
};
