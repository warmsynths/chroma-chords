import { ProjectData, ProjectService } from './project-service';
import { authService, AuthState } from './auth-service';
import { syncEngine, ClientSet, Tombstone } from './sync-engine';

export type AuthStateCallback = (userEmail: string | null, isAuthenticated: boolean) => void;
export type ProjectsChangeCallback = (projects: ProjectData[]) => void;

const DELETED_PROJECTS_KEY = 'chroma_chords_deleted_projects';
const LAST_SYNC_KEY = 'chroma_chords_last_sync_time';
const DEFAULT_WORKER_URL = 'https://chroma-chords-api.warmsynths.workers.dev';

function getWorkerUrl(): string {
  try {
    return (import.meta as any).env?.VITE_WORKER_URL || DEFAULT_WORKER_URL;
  } catch {
    return DEFAULT_WORKER_URL;
  }
}

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
  private userEmail: string | null = null;
  private authenticated = false;
  private isCloudSyncing = false;
  private syncTimeout: ReturnType<typeof setTimeout> | null = null;
  private syncQueued = false;
  private authStateCallbacks = new Set<AuthStateCallback>();
  private projectsChangeCallbacks = new Set<ProjectsChangeCallback>();
  private unsubscribeAuth: (() => void) | null = null;

  constructor() {
    this.setupAuthSubscription();
  }

  private setupAuthSubscription() {
    this.unsubscribeAuth = authService.subscribe((state: AuthState) => {
      const wasAuthenticated = this.authenticated;
      this.userEmail = state.user?.email || null;
      this.authenticated = state.isAuthenticated;
      this.notifyAuthState();

      // Trigger automatic initial cloud sync and migration upon logging in
      if (!wasAuthenticated && this.authenticated) {
        this.syncWithCloud().catch((err) => {
          console.warn('Auto cloud sync on sign-in encountered an error:', err);
        });
      }
    });
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
    this.authStateCallbacks.forEach((cb) => {
      try {
        cb(this.userEmail, this.authenticated);
      } catch (e) {
        console.error('Error in AuthState callback:', e);
      }
    });
  }

  public subscribeProjects(cb: ProjectsChangeCallback): () => void {
    this.projectsChangeCallbacks.add(cb);
    cb(this.getProjects());
    return () => this.projectsChangeCallbacks.delete(cb);
  }

  private notifyProjectsChanged() {
    const projects = this.getProjects();
    this.projectsChangeCallbacks.forEach((cb) => {
      try {
        cb(projects);
      } catch (e) {
        console.error('Error in ProjectsChange callback:', e);
      }
    });
  }

  public logout(): void {
    this.userEmail = null;
    this.authenticated = false;
    this.notifyAuthState();
  }

  public getProjects(): ProjectData[] {
    return ProjectService.getProjects();
  }

  public isProjectSaved(id: string | null): boolean {
    if (!id) return false;
    return ProjectService.getProjects().some((p) => p.id === id);
  }

  public saveProject(project: ProjectData): void {
    ProjectService.saveProject(project);
    this.removeTombstone(project.id);
    this.notifyProjectsChanged();
    this.scheduleCloudSync();
  }

  public deleteProject(id: string): void {
    ProjectService.deleteProject(id);
    this.addTombstone(id);
    this.notifyProjectsChanged();
    this.scheduleCloudSync();
  }

  public getTombstones(): Tombstone[] {
    const raw = getLocalStorageItem(DELETED_PROJECTS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Tombstone[];
    } catch {
      return [];
    }
  }

  private setTombstones(tombstones: Tombstone[]): void {
    setLocalStorageItem(DELETED_PROJECTS_KEY, JSON.stringify(tombstones));
  }

  public addTombstone(id: string): void {
    const tombstones = this.getTombstones();
    const existingIdx = tombstones.findIndex((t) => t.id === id);
    const nowIso = new Date().toISOString();
    if (existingIdx >= 0) {
      tombstones[existingIdx].deletedAt = nowIso;
    } else {
      tombstones.push({ id, deletedAt: nowIso });
    }
    this.setTombstones(tombstones);
  }

  public removeTombstone(id: string): void {
    const tombstones = this.getTombstones().filter((t) => t.id !== id);
    this.setTombstones(tombstones);
  }

  public getLastSyncTime(): string | null {
    return getLocalStorageItem(LAST_SYNC_KEY);
  }

  public setLastSyncTime(isoTime: string): void {
    setLocalStorageItem(LAST_SYNC_KEY, isoTime);
  }

  public scheduleCloudSync(): void {
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }
    this.syncTimeout = setTimeout(() => {
      this.syncTimeout = null;
      if (this.isCloudSyncing) {
        this.syncQueued = true;
      } else {
        this.syncWithCloud().catch((err) => {
          console.warn('Scheduled cloud sync failed:', err);
        });
      }
    }, 2000);
  }

  public async syncWithCloud(workerUrlOverride?: string): Promise<void> {
    if (this.isCloudSyncing) {
      this.syncQueued = true;
      return;
    }

    const token = await authService.getAccessToken();
    if (!this.isAuthenticated() || !token) {
      return;
    }

    const workerUrl = workerUrlOverride || getWorkerUrl();
    if (!workerUrl) return;

    this.isCloudSyncing = true;
    try {
      const localProjects = ProjectService.getProjects();
      const tombstones = this.getTombstones();
      const lastSyncTime = this.getLastSyncTime();

      const clientSets: ClientSet[] = localProjects.map((p) => ({
        ...p,
        deletedAt: null,
      }));

      const res = await syncEngine.sync(workerUrl, token, {
        sets: clientSets,
        lastSyncTime,
        tombstones,
      });

      // Merge server sets with local sets
      const mergedMap = new Map<string, ProjectData>();
      localProjects.forEach((p) => {
        mergedMap.set(p.id, { ...p, syncedToCloud: true });
      });

      // Handle soft-deleted sets and incoming active sets from server
      const remoteTombstones = res.tombstones || [];
      const remoteDeletedIds = new Set<string>(
        remoteTombstones.map((t) => t.id)
      );

      (res.sets || []).forEach((s) => {
        if (s.deletedAt) {
          remoteDeletedIds.add(s.id);
        } else {
          const existing = mergedMap.get(s.id);
          const serverModified = s.lastModified || (s.updatedAt ? new Date(s.updatedAt).getTime() : 0);
          const localModified = existing?.lastModified || 0;

          if (!existing || serverModified >= localModified) {
            mergedMap.set(s.id, {
              id: s.id,
              name: s.name,
              lastModified: serverModified,
              genre: s.genre,
              mood: s.mood,
              key: s.key,
              scaleType: s.scaleType,
              bpm: s.bpm,
              showTheory: s.showTheory,
              chords: s.chords,
              syncedToCloud: true,
            });
          }
        }
      });

      // Remove any remote deleted sets
      remoteDeletedIds.forEach((id) => {
        mergedMap.delete(id);
      });

      const mergedList = Array.from(mergedMap.values());
      ProjectService.setProjects(mergedList);

      // Clear tombstones that were successfully synced
      const currentTombstones = this.getTombstones();
      const syncedTombstoneIds = new Set(tombstones.map((t) => t.id));
      const remainingTombstones = currentTombstones.filter(
        (t) => !syncedTombstoneIds.has(t.id)
      );
      this.setTombstones(remainingTombstones);

      if (res.lastSyncTime || res.syncedAt) {
        this.setLastSyncTime(res.lastSyncTime || res.syncedAt!);
      }

      this.notifyProjectsChanged();
    } finally {
      this.isCloudSyncing = false;
      if (this.syncQueued) {
        this.syncQueued = false;
        this.scheduleCloudSync();
      }
    }
  }

  // Legacy compatibility helpers
  public async syncProjectsFromCloud(): Promise<void> {
    return this.syncWithCloud();
  }

  public async syncProjectsToCloud(): Promise<void> {
    return this.syncWithCloud();
  }
}

export const projectStorage = new ProjectStorageManager();
