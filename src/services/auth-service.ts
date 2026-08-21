import { createClient, SupabaseClient, User, Session as SupabaseSession, Provider } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email?: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AuthStateListener = (state: AuthState) => void;

const DEFAULT_SUPABASE_URL = 'https://nfinswlsukomnworyfbj.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_EyU-FxgU_9GRE5RVl1MFug_B4t_C3aU';

function getEnvSupabaseUrl(): string | undefined {
  try {
    return (import.meta as any).env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  } catch {
    return DEFAULT_SUPABASE_URL;
  }
}

function getEnvSupabaseAnonKey(): string | undefined {
  try {
    return (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
  } catch {
    return DEFAULT_SUPABASE_ANON_KEY;
  }
}

export class AuthService {
  private client: SupabaseClient | null = null;
  private currentUser: AuthUser | null = null;
  private currentAccessToken: string | null = null;
  private isLoading = true;
  private listeners: Set<AuthStateListener> = new Set();

  constructor(supabaseUrl?: string, supabaseAnonKey?: string, clientOverride?: SupabaseClient) {
    if (clientOverride) {
      this.client = clientOverride;
      this.initClientSession();
      return;
    }

    const url = supabaseUrl !== undefined ? supabaseUrl : getEnvSupabaseUrl();
    const key = supabaseAnonKey !== undefined ? supabaseAnonKey : getEnvSupabaseAnonKey();

    if (url && key) {
      try {
        this.client = createClient(url, key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        });
        this.initClientSession();
      } catch (err) {
        console.error('Failed to initialize Supabase Auth client:', err);
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
    }
  }

  private initClientSession() {
    if (!this.client) return;

    this.client.auth.getSession().then(({ data }) => {
      this.handleSession(data.session);
      this.isLoading = false;
      this.notify();
    }).catch(() => {
      this.isLoading = false;
      this.notify();
    });

    this.client.auth.onAuthStateChange((_event, session) => {
      this.handleSession(session);
      this.isLoading = false;
      this.notify();
    });
  }

  private handleSession(session: SupabaseSession | null) {
    if (session && session.user) {
      this.currentUser = {
        id: session.user.id,
        email: session.user.email,
      };
      this.currentAccessToken = session.access_token;
    } else {
      this.currentUser = null;
      this.currentAccessToken = null;
    }
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

  public subscribe(listener: AuthStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getAuthState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public isConfigured(): boolean {
    return this.client !== null;
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
    if (!this.client) return null;
    try {
      const { data } = await this.client.auth.getSession();
      if (data.session) {
        this.currentAccessToken = data.session.access_token;
        return data.session.access_token;
      }
    } catch {
      // fallback to stored access token
    }
    return this.currentAccessToken;
  }

  public async signUp(email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> {
    if (!this.client) {
      return { success: false, message: 'Supabase credentials are not configured.' };
    }
    try {
      const { data, error } = await this.client.auth.signUp({
        email: email.trim(),
        password,
      });
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, user: data.user || undefined };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, message: msg };
    }
  }

  public async signInWithPassword(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    if (!this.client) {
      return { success: false, message: 'Supabase credentials are not configured.' };
    }
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        return { success: false, message: error.message };
      }
      this.handleSession(data.session);
      this.notify();
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, message: msg };
    }
  }

  public async signInWithOAuth(provider: Provider = 'google'): Promise<{ success: boolean; message?: string }> {
    if (!this.client) {
      return { success: false, message: 'Supabase credentials are not configured.' };
    }
    try {
      const { error } = await this.client.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, message: msg };
    }
  }

  public async signInWithOtp(email: string): Promise<{ success: boolean; message?: string }> {
    if (!this.client) {
      return { success: false, message: 'Supabase credentials are not configured.' };
    }
    try {
      const { error } = await this.client.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: 'Check your email for the magic login link!' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, message: msg };
    }
  }

  public async signOut(): Promise<{ success: boolean; message?: string }> {
    if (!this.client) {
      this.currentUser = null;
      this.currentAccessToken = null;
      this.notify();
      return { success: true };
    }
    try {
      const { error } = await this.client.auth.signOut();
      if (error) {
        return { success: false, message: error.message };
      }
      this.currentUser = null;
      this.currentAccessToken = null;
      this.notify();
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, message: msg };
    }
  }
}

export const authService = new AuthService();
