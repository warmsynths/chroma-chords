import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    vi.restoreAllMocks();
    authService = new AuthService('https://mock.supabase.co', 'mock-anon-key');
  });

  it('initializes with unauthenticated state when no session exists', () => {
    const state = authService.getAuthState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });

  it('returns false and error message when trying to sign in without credentials', async () => {
    const unconfigured = new AuthService('', '');
    expect(unconfigured.isConfigured()).toBe(false);
    const res = await unconfigured.signInWithPassword('test@example.com', 'password123');
    expect(res.success).toBe(false);
    expect(res.message).toContain('not configured');
  });

  it('returns false when trying to sign up, sign out, or use magic link without credentials', async () => {
    const unconfigured = new AuthService('', '');
    const upRes = await unconfigured.signUp('test@example.com', 'password123');
    expect(upRes.success).toBe(false);

    const otpRes = await unconfigured.signInWithOtp('test@example.com');
    expect(otpRes.success).toBe(false);

    const oauthRes = await unconfigured.signInWithOAuth('google');
    expect(oauthRes.success).toBe(false);

    const outRes = await unconfigured.signOut();
    expect(outRes.success).toBe(true);
  });

  it('notifies subscribers on subscribe and handles unsubscribe cleanly', () => {
    const listener = vi.fn();
    const unsubscribe = authService.subscribe(listener);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    }));

    unsubscribe();
  });

  it('handles client session and authentication lifecycle using client mock', async () => {
    let authStateCallback: ((event: string, session: any) => void) | null = null;
    const mockSession = {
      user: { id: 'user-123', email: 'creator@example.com' },
      access_token: 'fake-jwt-token',
    };

    const mockClient: any = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
        onAuthStateChange: vi.fn().mockImplementation((cb: any) => {
          authStateCallback = cb;
          return { data: { subscription: { unsubscribe: vi.fn() } } };
        }),
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { session: mockSession, user: mockSession.user },
          error: null,
        }),
        signUp: vi.fn().mockResolvedValue({
          data: { session: null, user: { id: 'user-456', email: 'new@example.com' } },
          error: null,
        }),
        signInWithOAuth: vi.fn().mockResolvedValue({
          data: {},
          error: null,
        }),
        signInWithOtp: vi.fn().mockResolvedValue({
          data: {},
          error: null,
        }),
        signOut: vi.fn().mockResolvedValue({
          error: null,
        }),
      },
    };

    const serviceWithMock = new AuthService(undefined, undefined, mockClient);
    expect(serviceWithMock.isConfigured()).toBe(true);

    const listener = vi.fn();
    serviceWithMock.subscribe(listener);

    // Simulate login
    const loginRes = await serviceWithMock.signInWithPassword('creator@example.com', 'secret123');
    expect(loginRes.success).toBe(true);
    expect(serviceWithMock.getUser()?.email).toBe('creator@example.com');
    expect(serviceWithMock.getAuthState().isAuthenticated).toBe(true);

    // Simulate auth state change event from Supabase
    if (authStateCallback) {
      (authStateCallback as any)('SIGNED_OUT', null);
      expect(serviceWithMock.getAuthState().isAuthenticated).toBe(false);
      expect(serviceWithMock.getUser()).toBeNull();
    }

    // Simulate signup
    const signupRes = await serviceWithMock.signUp('new@example.com', 'secret123');
    expect(signupRes.success).toBe(true);
    expect(signupRes.user?.email).toBe('new@example.com');

    // Simulate OAuth
    const oauthRes = await serviceWithMock.signInWithOAuth('google');
    expect(oauthRes.success).toBe(true);

    // Simulate OTP
    const otpRes = await serviceWithMock.signInWithOtp('creator@example.com');
    expect(otpRes.success).toBe(true);

    // Simulate sign out
    const logoutRes = await serviceWithMock.signOut();
    expect(logoutRes.success).toBe(true);
    expect(serviceWithMock.getAuthState().isAuthenticated).toBe(false);
  });

  it('handles client errors gracefully during sign in, sign up, and sign out', async () => {
    const mockErrorClient: any = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: new Error('Session error') }),
        onAuthStateChange: vi.fn(),
        signInWithPassword: vi.fn().mockResolvedValue({
          data: { session: null, user: null },
          error: { message: 'Invalid login credentials' },
        }),
        signUp: vi.fn().mockResolvedValue({
          data: { session: null, user: null },
          error: { message: 'User already registered' },
        }),
        signInWithOAuth: vi.fn().mockResolvedValue({
          data: {},
          error: { message: 'OAuth failed' },
        }),
        signInWithOtp: vi.fn().mockResolvedValue({
          data: {},
          error: { message: 'Rate limited' },
        }),
        signOut: vi.fn().mockResolvedValue({
          error: { message: 'Network error' },
        }),
      },
    };

    const serviceWithError = new AuthService(undefined, undefined, mockErrorClient);

    const signin = await serviceWithError.signInWithPassword('bad@example.com', 'wrong');
    expect(signin.success).toBe(false);
    expect(signin.message).toBe('Invalid login credentials');

    const signup = await serviceWithError.signUp('bad@example.com', 'wrong');
    expect(signup.success).toBe(false);
    expect(signup.message).toBe('User already registered');

    const oauth = await serviceWithError.signInWithOAuth('google');
    expect(oauth.success).toBe(false);
    expect(oauth.message).toBe('OAuth failed');

    const otp = await serviceWithError.signInWithOtp('bad@example.com');
    expect(otp.success).toBe(false);
    expect(otp.message).toBe('Rate limited');

    const signout = await serviceWithError.signOut();
    expect(signout.success).toBe(false);
    expect(signout.message).toBe('Network error');
  });
});
