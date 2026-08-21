import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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

import { ProjectStorageManager } from './project-storage';
import { ProjectData, ProjectService } from './project-service';
import { authService } from './auth-service';
import { syncEngine } from './sync-engine';

describe('ProjectStorageManager', () => {
  let manager: ProjectStorageManager;

  beforeEach(() => {
    localStorage.clear();
    manager = new ProjectStorageManager();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('manages local project persistence cleanly', () => {
    const sampleProject: ProjectData = {
      id: 'proj-123',
      name: 'Pop · Dreamy',
      lastModified: Date.now(),
      genre: 'Pop',
      mood: 'Dreamy',
      key: 'C',
      scaleType: 'MAJOR',
      bpm: 120,
      chords: [],
    };

    manager.saveProject(sampleProject);
    const projects = manager.getProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].id).toBe('proj-123');

    manager.deleteProject('proj-123');
    expect(manager.getProjects()).toHaveLength(0);
  });

  it('sanitizes projects with missing or undefined chords on getProjects', () => {
    const rawProjects = [
      {
        id: 'proj-no-chords',
        name: 'Legacy Project',
        lastModified: Date.now(),
        genre: 'Pop',
        mood: 'Upbeat',
        key: 'G',
        scaleType: 'MAJOR',
        bpm: 120,
      },
    ];
    localStorage.setItem('chroma_chords_projects', JSON.stringify(rawProjects));
    const projects = manager.getProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].id).toBe('proj-no-chords');
    expect(Array.isArray(projects[0].chords)).toBe(true);
    expect(projects[0].chords).toHaveLength(0);
  });

  it('records tombstones on delete and clears on save', () => {
    const sampleProject: ProjectData = {
      id: 'proj-tombstone',
      name: 'Test Tombstone',
      lastModified: Date.now(),
      genre: 'Pop',
      mood: 'Dreamy',
      key: 'C',
      scaleType: 'MAJOR',
      bpm: 120,
      chords: [],
    };

    manager.saveProject(sampleProject);
    expect(manager.getTombstones()).toHaveLength(0);

    manager.deleteProject('proj-tombstone');
    expect(manager.getTombstones()).toHaveLength(1);
    expect(manager.getTombstones()[0].id).toBe('proj-tombstone');

    // Re-saving removes the tombstone
    manager.saveProject(sampleProject);
    expect(manager.getTombstones()).toHaveLength(0);
  });

  it('notifies subscribers on project list changes', () => {
    const listener = vi.fn();
    const unsubscribe = manager.subscribeProjects(listener);

    // Initial call
    expect(listener).toHaveBeenCalledTimes(1);

    const project: ProjectData = {
      id: 'proj-sub',
      name: 'Sub Test',
      lastModified: Date.now(),
      genre: 'Rock',
      mood: 'Energetic',
      key: 'E',
      scaleType: 'MINOR',
      bpm: 140,
      chords: [],
    };

    manager.saveProject(project);
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    manager.deleteProject('proj-sub');
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('performs bi-directional cloud sync and auto-merges remote sets', async () => {
    const localProject: ProjectData = {
      id: 'local-set',
      name: 'Local Progression',
      lastModified: 1000,
      genre: 'Jazz',
      mood: 'Smooth',
      key: 'F',
      scaleType: 'DORIAN',
      bpm: 90,
      chords: [],
    };
    manager.saveProject(localProject);

    // Mock authenticated user
    vi.spyOn(authService, 'getAccessToken').mockResolvedValue('valid-access-token');
    vi.spyOn(manager, 'isAuthenticated').mockReturnValue(true);

    const remoteSet: ProjectData = {
      id: 'remote-set',
      name: 'Cloud Progression',
      lastModified: 2000,
      genre: 'Neo-Soul',
      mood: 'Warm',
      key: 'Eb',
      scaleType: 'MAJOR',
      bpm: 85,
      chords: [],
    };

    const syncSpy = vi.spyOn(syncEngine, 'sync').mockResolvedValue({
      sets: [remoteSet as any],
      lastSyncTime: '2026-08-18T10:00:00Z',
      tombstones: [],
    });

    await manager.syncWithCloud('https://api.example.com');

    expect(syncSpy).toHaveBeenCalled();
    const projects = manager.getProjects();
    expect(projects).toHaveLength(2);
    expect(projects.map((p) => p.id)).toContain('local-set');
    expect(projects.map((p) => p.id)).toContain('remote-set');
    expect(manager.getLastSyncTime()).toBe('2026-08-18T10:00:00Z');
  });

  it('resolves conflicts using newest lastModified timestamp', () => {
    const localSets: ProjectData[] = [
      {
        id: 'set-conflict',
        name: 'Local Older Name',
        lastModified: 1000,
        genre: 'Pop',
        mood: 'Happy',
        key: 'C',
        scaleType: 'MAJOR',
        bpm: 120,
        chords: [],
      },
    ];

    const cloudSets: ProjectData[] = [
      {
        id: 'set-conflict',
        name: 'Cloud Newer Name',
        lastModified: 2000,
        genre: 'Pop',
        mood: 'Happy',
        key: 'C',
        scaleType: 'MAJOR',
        bpm: 120,
        chords: [],
      },
    ];

    const merged = ProjectService.mergeProjects(localSets, cloudSets);
    expect(merged).toHaveLength(1);
    expect(merged[0].name).toBe('Cloud Newer Name');
    expect(merged[0].lastModified).toBe(2000);
  });

  it('queues a debounced 2-second cloud sync when saving or deleting', async () => {
    vi.useFakeTimers();
    vi.spyOn(authService, 'getAccessToken').mockResolvedValue('valid-access-token');
    vi.spyOn(manager, 'isAuthenticated').mockReturnValue(true);
    const syncSpy = vi.spyOn(syncEngine, 'sync').mockResolvedValue({
      sets: [],
      lastSyncTime: '2026-08-18T11:00:00Z',
      tombstones: [],
    });

    const sample: ProjectData = {
      id: 'proj-debounce',
      name: 'Debounce Test',
      lastModified: Date.now(),
      genre: 'Lo-Fi',
      mood: 'Chill',
      key: 'D',
      scaleType: 'DORIAN',
      bpm: 80,
      chords: [],
    };

    manager.saveProject(sample);
    // Not executed immediately
    expect(syncSpy).not.toHaveBeenCalled();

    // Advance 1.5s - still debouncing
    await vi.advanceTimersByTimeAsync(1500);
    expect(syncSpy).not.toHaveBeenCalled();

    // Advance past 2s
    await vi.advanceTimersByTimeAsync(600);
    expect(syncSpy).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('transmits tombstones on sync and purges synced tombstones from local buffer', async () => {
    vi.spyOn(authService, 'getAccessToken').mockResolvedValue('valid-access-token');
    vi.spyOn(manager, 'isAuthenticated').mockReturnValue(true);

    const sample: ProjectData = {
      id: 'proj-to-delete',
      name: 'Delete Me',
      lastModified: Date.now(),
      genre: 'Pop',
      mood: 'Bright',
      key: 'G',
      scaleType: 'MAJOR',
      bpm: 120,
      chords: [],
    };

    manager.saveProject(sample);
    manager.deleteProject('proj-to-delete');

    expect(manager.getTombstones()).toHaveLength(1);
    expect(manager.getTombstones()[0].id).toBe('proj-to-delete');

    const syncSpy = vi.spyOn(syncEngine, 'sync').mockResolvedValue({
      sets: [],
      lastSyncTime: '2026-08-18T11:00:00Z',
      tombstones: [],
    });

    await manager.syncWithCloud('https://api.example.com');

    expect(syncSpy).toHaveBeenCalledWith(
      'https://api.example.com',
      'valid-access-token',
      expect.objectContaining({
        tombstones: expect.arrayContaining([
          expect.objectContaining({ id: 'proj-to-delete' }),
        ]),
      })
    );

    // Synced tombstones should be cleared from local storage buffer
    expect(manager.getTombstones()).toHaveLength(0);
  });

  it('soft-deletes local sets matching incoming remote tombstones and deletedAt flags', async () => {
    const local1: ProjectData = {
      id: 'local-kept',
      name: 'Keep Me',
      lastModified: 1000,
      genre: 'Ambient',
      mood: 'Calm',
      key: 'C',
      scaleType: 'MAJOR',
      bpm: 60,
      chords: [],
    };
    const local2: ProjectData = {
      id: 'local-deleted-remote',
      name: 'Remote Deleted',
      lastModified: 1000,
      genre: 'Rock',
      mood: 'Heavy',
      key: 'E',
      scaleType: 'MINOR',
      bpm: 130,
      chords: [],
    };
    const local3: ProjectData = {
      id: 'local-soft-deleted',
      name: 'Soft Deleted in Sets',
      lastModified: 1000,
      genre: 'Jazz',
      mood: 'Smooth',
      key: 'Bb',
      scaleType: 'DORIAN',
      bpm: 100,
      chords: [],
    };

    manager.saveProject(local1);
    manager.saveProject(local2);
    manager.saveProject(local3);

    expect(manager.getProjects()).toHaveLength(3);

    vi.spyOn(authService, 'getAccessToken').mockResolvedValue('valid-access-token');
    vi.spyOn(manager, 'isAuthenticated').mockReturnValue(true);

    vi.spyOn(syncEngine, 'sync').mockResolvedValue({
      sets: [
        {
          id: 'local-soft-deleted',
          name: 'Soft Deleted in Sets',
          genre: 'Jazz',
          mood: 'Smooth',
          key: 'Bb',
          scaleType: 'DORIAN',
          bpm: 100,
          chords: [],
          deletedAt: '2026-08-18T10:00:00Z',
        } as any,
      ],
      tombstones: [
        {
          id: 'local-deleted-remote',
          deletedAt: '2026-08-18T10:00:00Z',
        },
      ],
      lastSyncTime: '2026-08-18T10:00:00Z',
    });

    await manager.syncWithCloud('https://api.example.com');

    const remaining = manager.getProjects();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe('local-kept');
  });

  it('retains local projects and tombstones in buffer and sets offline status when sync fails', async () => {
    vi.spyOn(authService, 'getAccessToken').mockResolvedValue('valid-access-token');
    vi.spyOn(manager, 'isAuthenticated').mockReturnValue(true);

    const project: ProjectData = {
      id: 'offline-proj',
      name: 'Offline Song',
      lastModified: Date.now(),
      genre: 'Pop',
      mood: 'Happy',
      key: 'G',
      scaleType: 'MAJOR',
      bpm: 120,
      chords: [],
    };

    manager.saveProject(project);
    manager.addTombstone('offline-deleted-id');

    // Simulate network error
    vi.spyOn(syncEngine, 'sync').mockRejectedValue(new Error('Network error'));

    // syncWithCloud should gracefully catch and transition to offline without crashing
    await manager.syncWithCloud('https://api.example.com');

    expect(manager.getSyncStatus()).toBe('offline');

    // Data must remain intact in local storage
    expect(manager.getProjects()).toHaveLength(1);
    expect(manager.getProjects()[0].id).toBe('offline-proj');
    expect(manager.getTombstones()).toHaveLength(1);
    expect(manager.getTombstones()[0].id).toBe('offline-deleted-id');
  });

  it('tracks sync status state machine through sign-in, syncing, synced, and offline', async () => {
    const statusHistory: string[] = [];
    const unsubscribe = manager.subscribeSyncStatus((status) => {
      statusHistory.push(status);
    });

    expect(manager.getSyncStatus()).toBe('sign-in');

    // Mock authentication
    vi.spyOn(manager, 'isAuthenticated').mockReturnValue(true);
    vi.spyOn(authService, 'getAccessToken').mockResolvedValue('token-abc');

    vi.spyOn(syncEngine, 'sync').mockImplementation(async () => {
      expect(manager.getSyncStatus()).toBe('syncing');
      return {
        sets: [],
        lastSyncTime: '2026-08-18T10:00:00Z',
      };
    });

    await manager.syncWithCloud('https://api.example.com');
    expect(manager.getSyncStatus()).toBe('synced');

    // Simulate failure
    vi.spyOn(syncEngine, 'sync').mockRejectedValue(new Error('500 Internal Server Error'));
    await manager.syncWithCloud('https://api.example.com');
    expect(manager.getSyncStatus()).toBe('offline');

    // Simulate recovery
    vi.spyOn(syncEngine, 'sync').mockResolvedValue({
      sets: [],
      lastSyncTime: '2026-08-18T10:05:00Z',
    });
    await manager.syncWithCloud('https://api.example.com');
    expect(manager.getSyncStatus()).toBe('synced');

    // Log out transitions back to sign-in
    manager.logout();
    expect(manager.getSyncStatus()).toBe('sign-in');

    unsubscribe();
  });
});

