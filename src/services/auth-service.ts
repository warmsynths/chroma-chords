export interface AuthUser {
  id: string; // Google User ID (sub)
  email?: string;
  name?: string;
  picture?: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AuthStateListener = (state: AuthState) => void;

export interface GoogleJwtPayload {
  iss?: string;
  sub: string;
  aud?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  exp: number;
  iat?: number;
  [key: string]: unknown;
}

export const AUTH_STORAGE_TOKEN_KEY = 'chroma_chords_auth_token';
export const AUTH_STORAGE_USER_KEY = 'chroma_chords_auth_user';
export const DEFAULT_GOOGLE_CLIENT_ID = '184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com';

export function parseJwtPayload(token: string): GoogleJwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    
    // Cross-environment base64 decode (Browser + Node/Vitest)
    let decodedStr = '';
    if (typeof atob === 'function') {
      decodedStr = atob(base64);
    } else if (typeof Buffer !== 'undefined') {
      decodedStr = Buffer.from(base64, 'base64').toString('binary');
    } else {
      return null;
    }

    const jsonPayload = decodeURIComponent(
      decodedStr
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as GoogleJwtPayload;
  } catch {
    return null;
  }
}

function getEnvGoogleClientId(): string {
  try {
    return (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID;
  } catch {
    return DEFAULT_GOOGLE_CLIENT_ID;
  }
}

export class AuthService {
  private clientId: string;
  private currentUser: AuthUser | null = null;
  private currentAccessToken: string | null = null;
  private isLoading = true;
  private listeners: Set<AuthStateListener> = new Set();
  private gisLoaded = false;

  constructor(clientId?: string) {
    this.clientId = clientId !== undefined ? clientId : getEnvGoogleClientId();
    this.initSession();
  }

  private initSession() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') {
      this.isLoading = false;
      return;
    }

    try {
      const storedToken = localStorage.getItem(AUTH_STORAGE_TOKEN_KEY);
      if (storedToken) {
        const payload = parseJwtPayload(storedToken);
        // Verify expiry: payload.exp is in seconds
        if (payload && payload.exp && payload.exp * 1000 > Date.now()) {
          this.currentAccessToken = storedToken;
          this.currentUser = {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
          };
        } else {
          // Stored token is expired, clean it up
          localStorage.removeItem(AUTH_STORAGE_TOKEN_KEY);
          localStorage.removeItem(AUTH_STORAGE_USER_KEY);
          this.currentAccessToken = null;
          this.currentUser = null;
        }
      }
    } catch (e) {
      console.warn('Failed to restore auth session from localStorage:', e);
    } finally {
      this.isLoading = false;
    }
  }

  public isConfigured(): boolean {
    return !!this.clientId;
  }

  public getAuthState(): AuthState {
    return {
      user: this.currentUser,
      accessToken: this.currentAccessToken,
      isAuthenticated: !!this.currentUser && !!this.currentAccessToken,
      isLoading: this.isLoading,
    };
  }

  public getUser(): AuthUser | null {
    return this.currentUser;
  }

  public async getAccessToken(): Promise<string | null> {
    if (this.currentAccessToken) {
      const payload = parseJwtPayload(this.currentAccessToken);
      if (payload && payload.exp && payload.exp * 1000 <= Date.now()) {
        await this.signOut();
        return null;
      }
    }
    return this.currentAccessToken;
  }

  public subscribe(listener: AuthStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getAuthState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getAuthState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (e) {
        console.error('Error in AuthState listener:', e);
      }
    });
  }

  /**
   * Directly ingest and validate a Google ID token (JWT)
   */
  public handleCredentialResponse(idToken: string): { success: boolean; message?: string; user?: AuthUser } {
    if (!idToken || typeof idToken !== 'string') {
      return { success: false, message: 'Invalid credential provided.' };
    }

    const payload = parseJwtPayload(idToken);
    if (!payload || !payload.sub) {
      return { success: false, message: 'Failed to decode Google user token.' };
    }

    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      return { success: false, message: 'Google session token has expired.' };
    }

    this.currentAccessToken = idToken;
    this.currentUser = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(AUTH_STORAGE_TOKEN_KEY, idToken);
        localStorage.setItem(AUTH_STORAGE_USER_KEY, JSON.stringify(this.currentUser));
      }
    } catch (e) {
      console.warn('Failed to persist auth session to localStorage:', e);
    }

    this.notify();
    return { success: true, user: this.currentUser };
  }

  /**
   * Load Google Identity Services (GIS) client script if not already on window
   */
  public async loadGisScript(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    if ((window as any).google?.accounts?.id) {
      this.gisLoaded = true;
      return true;
    }

    return new Promise((resolve) => {
      const existing = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
      if (existing) {
        existing.addEventListener('load', () => {
          this.gisLoaded = true;
          resolve(true);
        });
        existing.addEventListener('error', () => resolve(false));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.gisLoaded = true;
        resolve(true);
      };
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  /**
   * Render official Google button into target element
   */
  public async renderGoogleButton(
    container: HTMLElement,
    onDone?: (res: { success: boolean; message?: string }) => void
  ): Promise<void> {
    if (!this.clientId || typeof window === 'undefined' || !container) return;
    await this.loadGisScript();
    const google = (window as any).google;
    if (google?.accounts?.id) {
      try {
        google.accounts.id.initialize({
          client_id: this.clientId,
          callback: (response: { credential?: string }) => {
            if (response.credential) {
              const res = this.handleCredentialResponse(response.credential);
              onDone?.({ success: res.success, message: res.message });
            } else {
              onDone?.({ success: false, message: 'No credential returned from Google.' });
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        container.innerHTML = '';
        google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
          width: 320,
        });
      } catch (err) {
        console.warn('Failed to render Google button:', err);
      }
    }
  }

  /**
   * Trigger Google Sign-In popup or prompt
   */
  public async signInWithGoogle(): Promise<{ success: boolean; message?: string }> {
    if (!this.clientId) {
      return { success: false, message: 'Google Client ID is not configured.' };
    }

    if (typeof window === 'undefined') {
      return { success: false, message: 'Window is not available in current environment.' };
    }

    await this.loadGisScript();

    const google = (window as any).google;
    if (!google?.accounts?.id) {
      return { success: false, message: 'Google Sign-In script failed to load.' };
    }

    return new Promise((resolve) => {
      try {
        google.accounts.id.initialize({
          client_id: this.clientId,
          callback: (response: { credential?: string }) => {
            if (response.credential) {
              const res = this.handleCredentialResponse(response.credential);
              resolve({ success: res.success, message: res.message });
            } else {
              resolve({ success: false, message: 'No credential returned from Google.' });
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
            console.info('Google prompt skipped or not displayed.');
          }
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        resolve({ success: false, message: msg });
      }
    });
  }

  /**
   * Backward-compatible alias for OAuth login
   */
  public async signInWithOAuth(provider = 'google'): Promise<{ success: boolean; message?: string }> {
    if (provider !== 'google') {
      return { success: false, message: `Unsupported auth provider: ${provider}. Only Google is supported.` };
    }
    return this.signInWithGoogle();
  }

  public async signOut(): Promise<{ success: boolean; message?: string }> {
    this.currentUser = null;
    this.currentAccessToken = null;

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(AUTH_STORAGE_TOKEN_KEY);
        localStorage.removeItem(AUTH_STORAGE_USER_KEY);
      }
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
        (window as any).google.accounts.id.disableAutoSelect?.();
      }
    } catch (e) {
      console.warn('Error during sign out storage cleanup:', e);
    }

    this.notify();
    return { success: true };
  }
}

export const authService = new AuthService();
