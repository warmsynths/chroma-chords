import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock localStorage for node environment
const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, val: string) => { store[key] = val; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
};

(globalThis as any).localStorage = mockLocalStorage;
(globalThis as any).window = globalThis;

import { ProjectStorageManager, AUTHORIZED_HASHES } from './project-storage';
import { ProjectData } from './project-service';

describe('ProjectStorageManager Deep Module', () => {
  let manager: ProjectStorageManager;

  beforeEach(() => {
    localStorage.clear();
    manager = new ProjectStorageManager();
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

  it('hashes emails deterministically for auth verification', async () => {
    const hash = await manager.hashEmail('warmsynthsiloveyou@gmail.com');
    expect(AUTHORIZED_HASHES).toContain(hash);
  });

  it('tracks per-set persistence state and supports undo deletion', () => {
    const setA: ProjectData = {
      id: 'set-a',
      name: 'Summer Groove',
      lastModified: Date.now(),
      genre: 'Pop',
      mood: 'Warm',
      key: 'C',
      scaleType: 'MAJOR',
      bpm: 120,
      chords: [],
    };
    const setB: ProjectData = {
      id: 'set-b',
      name: 'Night Drive',
      lastModified: Date.now(),
      genre: 'Lo-fi/Chill',
      mood: 'Melancholy',
      key: 'Am',
      scaleType: 'MINOR',
      bpm: 85,
      chords: [],
    };

    expect(manager.isProjectSaved('set-a')).toBe(false);
    manager.saveProject(setA);
    manager.saveProject(setB);

    expect(manager.isProjectSaved('set-a')).toBe(true);
    expect(manager.isProjectSaved('set-b')).toBe(true);
    expect(manager.isProjectSaved('set-c')).toBe(false);
    expect(manager.getProjects()).toHaveLength(2);

    // Undo simulation (delete project by ID)
    manager.deleteProject('set-b');
    expect(manager.isProjectSaved('set-b')).toBe(false);
    expect(manager.getProjects()).toHaveLength(1);
    expect(manager.getProjects()[0].id).toBe('set-a');
  });

  it('updates project name on inline rename mutations', () => {
    const set: ProjectData = {
      id: 'set-rename',
      name: 'Old Title',
      lastModified: Date.now(),
      genre: 'Pop',
      mood: 'Dreamy',
      key: 'C',
      scaleType: 'MAJOR',
      bpm: 120,
      chords: [],
    };
    manager.saveProject(set);
    expect(manager.getProjects()[0].name).toBe('Old Title');

    const loaded = manager.getProjects()[0];
    loaded.name = 'New Vibey Title';
    manager.saveProject(loaded);

    expect(manager.getProjects()[0].name).toBe('New Vibey Title');
    expect(manager.getProjects()).toHaveLength(1);
  });
});
