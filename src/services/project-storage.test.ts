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

  it('triggers setupGoogleAuth with prompt: none during silent auth without throwing', async () => {
    localStorage.setItem('chroma-chords-auth', 'warmsynthsiloveyou@gmail.com');
    const requestAccessTokenMock = vi.fn();
    (globalThis as any).google = {
      accounts: {
        oauth2: {
          initTokenClient: vi.fn().mockReturnValue({
            requestAccessToken: requestAccessTokenMock,
          }),
        },
      },
    };

    manager.initSilentAuth();

    // Allow promise microtask to resolve
    await new Promise(r => setTimeout(r, 250));

    expect((globalThis as any).google.accounts.oauth2.initTokenClient).toHaveBeenCalled();
    expect(requestAccessTokenMock).toHaveBeenCalledWith({ prompt: 'none' });
  });

  it('skips requestAccessToken prompt: none during silent auth on mobile devices', async () => {
    localStorage.setItem('chroma-chords-auth', 'warmsynthsiloveyou@gmail.com');
    const requestAccessTokenMock = vi.fn();
    (globalThis as any).google = {
      accounts: {
        oauth2: {
          initTokenClient: vi.fn().mockReturnValue({
            requestAccessToken: requestAccessTokenMock,
          }),
        },
      },
    };

    vi.spyOn(manager, 'isMobileDevice').mockReturnValue(true);

    manager.initSilentAuth();

    await new Promise(r => setTimeout(r, 250));

    expect((globalThis as any).google.accounts.oauth2.initTokenClient).toHaveBeenCalled();
    expect(requestAccessTokenMock).not.toHaveBeenCalled();
  });
});
