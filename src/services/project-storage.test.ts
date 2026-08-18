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
});
