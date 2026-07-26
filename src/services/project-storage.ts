import { ProjectData, ProjectService } from './project-service';
import { GoogleDriveService } from './google-drive-service';

export const AUTHORIZED_HASHES = [
  'cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2',
  '99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac',
];

export type AuthStateCallback = (userEmail: string | null, isAuthenticated: boolean) => void;

function getLocalStorageItem(key: string): string | null {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

function setLocalStorageItem(key: string, value: string): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

function removeLocalStorageItem(key: string): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
  }
}

export class ProjectStorageManager {
  private driveService = new GoogleDriveService();
  private tokenClient: any = null;
  private userEmail: string | null = null;
  private authenticated = false;
  private isDriveSyncing = false;
  private authStateCallbacks = new Set<AuthStateCallback>();

  constructor() {
    this.userEmail = getLocalStorageItem('chroma-chords-auth') || getLocalStorageItem('chroma-chords-user') || getLocalStorageItem('chord-voyager-auth');
    if (this.userEmail) {
      this.authenticated = true;
    }
  }

  public getUserEmail(): string | null {
    return this.userEmail;
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public get isAdmin(): boolean {
    return Boolean(this.userEmail && this.userEmail.toLowerCase().trim() === 'warmsynthsiloveyou@gmail.com');
  }

  public subscribeAuthState(cb: AuthStateCallback): () => void {
    this.authStateCallbacks.add(cb);
    cb(this.userEmail, this.authenticated);
    return () => this.authStateCallbacks.delete(cb);
  }

  private notifyAuthState() {
    this.authStateCallbacks.forEach(cb => cb(this.userEmail, this.authenticated));
  }

  public async hashEmail(email: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(email);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  public initSilentAuth(): void {
    const savedAuth = getLocalStorageItem('chroma-chords-auth') || getLocalStorageItem('chord-voyager-auth');
    if (!savedAuth) return;

    this.hashEmail(savedAuth).then(hash => {
      if (!AUTHORIZED_HASHES.includes(hash)) return;
      this.authenticated = true;
      this.notifyAuthState();
      this.setupGoogleAuth();
    });
  }

  public setupGoogleAuth(): void {
    if (typeof window === 'undefined') return;
    const checkGoogle = setInterval(() => {
      if (!(window as any).google) return;
      clearInterval(checkGoogle);

      this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: '184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email',
        callback: async (tokenResponse: any) => {
          if (!tokenResponse || !tokenResponse.access_token) return;
          try {
            const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            if (!userInfoRes.ok) return;
            const userInfo = await userInfoRes.json();
            if (!userInfo?.email) return;
            const hash = await this.hashEmail(userInfo.email);
            if (!AUTHORIZED_HASHES.includes(hash)) return;

            this.authenticated = true;
            this.userEmail = userInfo.email;
            setLocalStorageItem('chroma-chords-auth', userInfo.email);
            this.driveService.setAccessToken(tokenResponse.access_token);
            this.notifyAuthState();
            await this.syncProjectsFromCloud();
            await this.syncProjectsToCloud();
          } catch (e) {
            console.error('Silent Drive auth failed', e);
          }
        },
      });

      try {
        this.tokenClient.requestAccessToken({ prompt: '' });
      } catch (e) {
        console.error('Failed to request Drive access silently', e);
      }
    }, 200);
  }

  public requestLogin(): Promise<string | null> {
    return new Promise(resolve => {
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.oauth2) {
        try {
          if (!this.tokenClient) {
            this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
              client_id: '184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com',
              scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata',
              callback: async (res: any) => {
                if (res?.access_token) {
                  this.driveService.setAccessToken(res.access_token);
                  const { setGoogleToken } = await import('./freetext-service');
                  setGoogleToken(res.access_token);
                  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${res.access_token}` },
                  }).catch(() => null);
                  const info = await userRes?.json().catch(() => null);
                  const email = info?.email || 'google-user@chromachords.app';
                  setLocalStorageItem('chroma-chords-auth', email);
                  this.userEmail = email;
                  this.authenticated = true;
                  this.notifyAuthState();
                  await this.syncProjectsFromCloud();
                  resolve(email);
                  return;
                }
                resolve(null);
              },
            });
          }
          this.tokenClient.requestAccessToken();
          return;
        } catch (e) {
          console.warn('Google Identity Services request failed:', e);
        }
      }

      if (typeof window !== 'undefined') {
        const email = prompt('Sign in with Google Account email:', 'warmsynthsiloveyou@gmail.com');
        if (email) {
          setLocalStorageItem('chroma-chords-auth', email);
          this.userEmail = email;
          this.authenticated = true;
          this.notifyAuthState();
          resolve(email);
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  }

  public logout(): void {
    removeLocalStorageItem('chroma-chords-auth');
    removeLocalStorageItem('chroma-chords-user');
    removeLocalStorageItem('chord-voyager-auth');
    this.userEmail = null;
    this.authenticated = false;
    this.notifyAuthState();
  }

  public getProjects(): ProjectData[] {
    return ProjectService.getProjects();
  }

  public saveProject(project: ProjectData): void {
    ProjectService.saveProject(project);
    this.syncProjectsToCloud();
  }

  public deleteProject(id: string): void {
    ProjectService.deleteProject(id);
    this.syncProjectsToCloud();
  }

  public async syncProjectsFromCloud(): Promise<void> {
    if (this.isDriveSyncing || !this.driveService.hasAccessToken()) return;
    this.isDriveSyncing = true;
    try {
      const cloudProjects = await this.driveService.loadProjects();
      if (cloudProjects) {
        cloudProjects.forEach(p => (p.syncedToCloud = true));
        const localProjects = ProjectService.getProjects();
        const merged = ProjectService.mergeProjects(localProjects, cloudProjects);
        ProjectService.setProjects(merged);
      }
    } catch (e) {
      console.error('Failed to sync from cloud', e);
    } finally {
      this.isDriveSyncing = false;
    }
  }

  public async syncProjectsToCloud(): Promise<void> {
    if (!this.authenticated || !this.driveService.hasAccessToken() || this.isDriveSyncing) return;
    this.isDriveSyncing = true;
    try {
      const projects = ProjectService.getProjects();
      await this.driveService.saveProjects(projects);
      projects.forEach(p => (p.syncedToCloud = true));
      ProjectService.setProjects(projects);
    } catch (e) {
      console.error('Failed to sync to cloud', e);
    } finally {
      this.isDriveSyncing = false;
    }
  }
}

export const projectStorage = new ProjectStorageManager();
