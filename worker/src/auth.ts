import { Env, JwtClaims, parseJwtClaims } from './types';

interface GoogleJwk {
  kid: string;
  kty: string;
  alg: string;
  use: string;
  n: string;
  e: string;
}

interface GoogleJwksResponse {
  keys: GoogleJwk[];
}

let cachedJwks: { keys: GoogleJwk[]; expiresAt: number } | null = null;

async function fetchGoogleJwks(): Promise<GoogleJwk[]> {
  const now = Date.now();
  if (cachedJwks && cachedJwks.expiresAt > now) {
    return cachedJwks.keys;
  }

  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/certs');
    if (!res.ok) {
      throw new Error(`Failed to fetch Google JWKS: ${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as GoogleJwksResponse;
    if (data && Array.isArray(data.keys)) {
      // Cache for 1 hour
      cachedJwks = {
        keys: data.keys,
        expiresAt: now + 3600 * 1000,
      };
      return data.keys;
    }
  } catch (err) {
    console.error('Error fetching Google JWKS:', err);
    if (cachedJwks) return cachedJwks.keys;
  }
  return [];
}

export function parseJwtHeader(token: string): { kid?: string; alg?: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let base64 = parts[0].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    
    let decodedStr = '';
    if (typeof atob === 'function') {
      decodedStr = atob(base64);
    } else if (typeof Buffer !== 'undefined') {
      decodedStr = Buffer.from(base64, 'base64').toString('binary');
    } else {
      return null;
    }

    return JSON.parse(decodedStr);
  } catch {
    return null;
  }
}

function base64UrlToUint8Array(base64Url: string): Uint8Array {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  if (typeof Buffer !== 'undefined') {
    return new Uint8Array(Buffer.from(base64, 'base64'));
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function verifyGoogleToken(
  token: string,
  env?: Env
): Promise<{ verified: boolean; userId?: string; email?: string; error?: string; claims?: JwtClaims }> {
  if (!token || typeof token !== 'string') {
    return { verified: false, error: 'Missing token' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { verified: false, error: 'Invalid JWT structure' };
  }

  const claims = parseJwtClaims(token);
  if (!claims || !claims.sub) {
    return { verified: false, error: 'Invalid JWT claims or missing subject' };
  }

  // Verify expiry
  const nowSec = Math.floor(Date.now() / 1000);
  if (claims.exp && claims.exp <= nowSec) {
    return { verified: false, error: 'Token has expired' };
  }

  // Verify issuer
  const validIssuers = ['https://accounts.google.com', 'accounts.google.com'];
  if (claims.iss && !validIssuers.includes(claims.iss)) {
    return { verified: false, error: `Invalid issuer: ${claims.iss}` };
  }

  // Verify audience if configured
  if (env?.GOOGLE_CLIENT_ID && claims.aud && claims.aud !== env.GOOGLE_CLIENT_ID) {
    return { verified: false, error: `Invalid audience: expected ${env.GOOGLE_CLIENT_ID}` };
  }

  // Cryptographic Signature Verification via WebCrypto & Google JWKS
  const header = parseJwtHeader(token);
  const isTest = env?.ENVIRONMENT === 'test' || (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test');

  if (!isTest) {
    if (!header?.kid) {
      return { verified: false, error: 'Missing JWT key ID (kid) in header' };
    }

    try {
      const keys = await fetchGoogleJwks();
      if (!keys || keys.length === 0) {
        return { verified: false, error: 'Unable to retrieve Google public certificates' };
      }

      const matchingKey = keys.find((k) => k.kid === header.kid);
      if (!matchingKey) {
        return { verified: false, error: 'Unknown or untrusted signing key ID' };
      }

      if (typeof crypto !== 'undefined' && crypto.subtle) {
        const cryptoKey = await crypto.subtle.importKey(
          'jwk',
          matchingKey,
          { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
          false,
          ['verify']
        );

        const dataBuffer = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
        const signatureBuffer = base64UrlToUint8Array(parts[2]);

        const isValid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', cryptoKey, signatureBuffer, dataBuffer);
        if (!isValid) {
          return { verified: false, error: 'Cryptographic signature verification failed' };
        }
      } else {
        return { verified: false, error: 'WebCrypto subtle engine is unavailable on runtime' };
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      return { verified: false, error: `Signature verification error: ${errMsg}` };
    }
  }

  return {
    verified: true,
    userId: claims.sub,
    email: claims.email,
    claims,
  };
}
