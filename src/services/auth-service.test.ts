import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock localStorage for node environment
const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, val: string) => {
    store[key] = val;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    Object.keys(store).forEach((k) => delete store[k]);
  },
};

(globalThis as any).localStorage = mockLocalStorage;
(globalThis as any).window = globalThis;

import { AuthService, parseJwtPayload, AUTH_STORAGE_TOKEN_KEY, AUTH_STORAGE_USER_KEY } from './auth-service';

function createMockGoogleJwt(sub: string, email: string, expSecondsFromNow = 3600): string {
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + expSecondsFromNow;
  const payload = Buffer.from(
    JSON.stringify({
      iss: 'https://accounts.google.com',
      sub,
      email,
      name: 'Test Musician',
      picture: 'https://lh3.googleusercontent.com/a/mock-pic',
      exp,
    })
  ).toString('base64url');
  return `${header}.${payload}.mockSignature123`;
}

describe('AuthService (Google OAuth / JWT)', () => {
  let authService: AuthService;

  beforeEach(() => {
    vi.restoreAllMocks();
    mockLocalStorage.clear();
    authService = new AuthService('mock-client-id.apps.googleusercontent.com');
  });

  describe('parseJwtPayload', () => {
    it('correctly decodes claims from valid JWT structure', () => {
      const token = createMockGoogleJwt('user-google-123', 'creator@example.com');
      const payload = parseJwtPayload(token);
      expect(payload).not.toBeNull();
      expect(payload?.sub).toBe('user-google-123');
      expect(payload?.email).toBe('creator@example.com');
      expect(payload?.name).toBe('Test Musician');
    });

    it('returns null for malformed tokens', () => {
      expect(parseJwtPayload('')).toBeNull();
      expect(parseJwtPayload('invalid.token')).toBeNull();
      expect(parseJwtPayload('not-a-jwt')).toBeNull();
    });
  });

  describe('Session Lifecycle & State', () => {
    it('initializes with unauthenticated state when no stored session exists', () => {
      const state = authService.getAuthState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
    });

    it('successfully handles and stores valid Google credential response', () => {
      const token = createMockGoogleJwt('google-999', 'jam@chromachords.io');
      const res = authService.handleCredentialResponse(token);

      expect(res.success).toBe(true);
      expect(res.user?.id).toBe('google-999');
      expect(res.user?.email).toBe('jam@chromachords.io');

      const state = authService.getAuthState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.id).toBe('google-999');
      expect(state.accessToken).toBe(token);

      // Verify localStorage persistence
      expect(mockLocalStorage.getItem(AUTH_STORAGE_TOKEN_KEY)).toBe(token);
    });

    it('rejects expired Google credentials', () => {
      const expiredToken = createMockGoogleJwt('google-old', 'old@example.com', -60); // expired 60s ago
      const res = authService.handleCredentialResponse(expiredToken);

      expect(res.success).toBe(false);
      expect(res.message).toContain('expired');
      expect(authService.getAuthState().isAuthenticated).toBe(false);
    });

    it('restores valid session from localStorage on initialization', () => {
      const validToken = createMockGoogleJwt('google-restored', 'restored@example.com', 7200);
      mockLocalStorage.setItem(AUTH_STORAGE_TOKEN_KEY, validToken);
      mockLocalStorage.setItem(
        AUTH_STORAGE_USER_KEY,
        JSON.stringify({ id: 'google-restored', email: 'restored@example.com' })
      );

      const newService = new AuthService('mock-client-id.apps.googleusercontent.com');
      const state = newService.getAuthState();

      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.id).toBe('google-restored');
      expect(state.user?.email).toBe('restored@example.com');
      expect(state.accessToken).toBe(validToken);
    });

    it('clears expired session from localStorage on initialization', () => {
      const expiredToken = createMockGoogleJwt('google-expired', 'expired@example.com', -120);
      mockLocalStorage.setItem(AUTH_STORAGE_TOKEN_KEY, expiredToken);

      const newService = new AuthService('mock-client-id.apps.googleusercontent.com');
      const state = newService.getAuthState();

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(mockLocalStorage.getItem(AUTH_STORAGE_TOKEN_KEY)).toBeNull();
    });

    it('notifies subscribers on auth state change and supports clean unsubscription', () => {
      const listener = vi.fn();
      const unsubscribe = authService.subscribe(listener);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          isAuthenticated: false,
          user: null,
          accessToken: null,
        })
      );

      const token = createMockGoogleJwt('google-sub-user', 'sub@example.com');
      authService.handleCredentialResponse(token);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          isAuthenticated: true,
          user: expect.objectContaining({ id: 'google-sub-user' }),
        })
      );

      unsubscribe();
      authService.signOut();
      expect(listener).toHaveBeenCalledTimes(2); // No more calls after unsubscribe
    });

    it('signs out and purges storage cleanly', async () => {
      const token = createMockGoogleJwt('google-logout', 'logout@example.com');
      authService.handleCredentialResponse(token);
      expect(authService.getAuthState().isAuthenticated).toBe(true);

      const res = await authService.signOut();
      expect(res.success).toBe(true);

      const state = authService.getAuthState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(mockLocalStorage.getItem(AUTH_STORAGE_TOKEN_KEY)).toBeNull();
    });

    it('automatically signs out when getAccessToken is called with expired token', async () => {
      const token = createMockGoogleJwt('google-exp-check', 'check@example.com', -5);
      (authService as any).currentAccessToken = token;
      (authService as any).currentUser = { id: 'google-exp-check', email: 'check@example.com' };

      const tokenRes = await authService.getAccessToken();
      expect(tokenRes).toBeNull();
      expect(authService.getAuthState().isAuthenticated).toBe(false);
    });
  });
});
