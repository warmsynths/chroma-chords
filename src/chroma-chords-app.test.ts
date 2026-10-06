// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { playbackEngine } from './services/playback-engine';

vi.mock('tone', () => ({
  Compressor: class { connect() { return this; } toDestination() { return this; } },
  Sampler: class { connect() { return this; } triggerAttackRelease() { } triggerAttack() { } triggerRelease() { } },
  PolySynth: class { connect() { return this; } triggerAttackRelease() { } triggerAttack() { } triggerRelease() { } set() { } },
  Synth: class { triggerAttackRelease() { } },
  MonoSynth: class { triggerAttackRelease() { } },
  FMSynth: class { triggerAttackRelease() { } },
  Reverb: class { connect() { return this; } },
  Chorus: class { start() { return this; } connect() { return this; } },
  Gain: class {
    gain = { rampTo: vi.fn(), value: 1 };
    connect() { return this; }
    toDestination() { return this; }
  },
  Filter: class {
    frequency = { value: 1000 };
    connect() { return this; }
  },
  EQ3: class {
    high = { value: 0 };
    mid = { value: 0 };
    low = { value: 0 };
    connect() { return this; }
  },
  Vibrato: class {
    connect() { return this; }
  },
  Distortion: class {
    connect() { return this; }
  },
  Limiter: class {
    connect() { return this; }
    toDestination() { return this; }
  },
  loaded: () => Promise.resolve(),
  start: () => Promise.resolve(),
  now: () => 0,
}));

vi.mock('./services/chord-engine', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./services/chord-engine')>();
  return {
    ...mod,
    loadChordData: vi.fn().mockResolvedValue({ chords: {}, scales: {} }),
  };
});

import './chroma-chords-app';
import { ChromaChordsApp } from './chroma-chords-app';

describe('ChromaChordsApp Integration', () => {
  let app: ChromaChordsApp;

  beforeEach(async () => {
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store[k] || null,
      setItem: (k: string, v: string) => { store[k] = v; },
      removeItem: (k: string) => { delete store[k]; },
      clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    });
    app = document.createElement('chroma-chords-app') as ChromaChordsApp;
    (app as any).progression = {
      genre: 'Pop',
      mood: 'Warm',
      key: 'C',
      scaleType: 'MAJOR',
      bpm: 84,
      chords: [
        { name: 'C', tag: 'I', roman: 'I', color: '#fff', scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 0.1, functionLabel: 'Tonic', notes: ['C4', 'E4', 'G4'] },
      ],
    };
    document.body.appendChild(app);
    await app.updateComplete;
  });

  it('renders app-header and transport controls', () => {
    const header = app.shadowRoot?.querySelector('app-header');
    expect(header).toBeTruthy();

    const transportBar = app.shadowRoot?.querySelector('transport-bar');
    expect(transportBar).toBeTruthy();

    const mobileDock = app.shadowRoot?.querySelector('mobile-dock');
    expect(mobileDock).toBeTruthy();
  });

  it('renders modals in closed state initially', () => {
    const midiModal = app.shadowRoot?.querySelector('midi-modal');
    expect(midiModal).toBeTruthy();

    const shareModal = app.shadowRoot?.querySelector('share-modal');
    expect(shareModal).toBeTruthy();

    const authModal = app.shadowRoot?.querySelector('auth-modal');
    expect(authModal).toBeTruthy();
  });

  it('switches between all 4 tabs seamlessly', async () => {
    // Initial tab is loop (chords)
    expect(app.shadowRoot?.querySelector('tab-chords') || app.shadowRoot?.querySelector('.chords-tab-layout')).toBeTruthy();

    // Switch to melody
    (app as any).activeTab = 'melody';
    await app.updateComplete;
    expect(app.shadowRoot?.querySelector('tab-melody')).toBeTruthy();

    // Switch to song
    (app as any).activeTab = 'song';
    await app.updateComplete;
    expect(app.shadowRoot?.querySelector('tab-song')).toBeTruthy();

    // Switch to play
    (app as any).activeTab = 'play';
    await app.updateComplete;
    expect(app.shadowRoot?.querySelector('tab-play')).toBeTruthy();
  });

  describe('song arrangement reaches playback', () => {
    const mk = (name: string) => ({
      name, desc: '',
      progression: (app as any).progression,
      order: [0],
    });

    it('plays a section as many times as its repeat count', () => {
      const a = app as any;
      a.sections = [mk('Verse'), mk('Chorus')];
      a.songTimeline = [
        { id: 't1', sectionIndex: 0, repeats: 1 },
        { id: 't2', sectionIndex: 1, repeats: 2 },
      ];
      a.syncSongToEngine(false, true);
      expect(playbackEngine.getTotalSteps()).toBe(3);
      expect(a.expandedToTimeline).toEqual([0, 1, 1]);
    });

    it('follows timeline order, so a section can be reused', () => {
      const a = app as any;
      a.sections = [mk('Verse'), mk('Chorus')];
      a.songTimeline = [
        { id: 't1', sectionIndex: 0, repeats: 1 },
        { id: 't2', sectionIndex: 1, repeats: 1 },
        { id: 't3', sectionIndex: 0, repeats: 1 },
      ];
      a.syncSongToEngine(false, true);
      expect(playbackEngine.getTotalSteps()).toBe(3);
    });

    it('duplicating a section keeps its chords, gives it its own melody, and slots it into the song', () => {
      const a = app as any;
      a.sections = [mk('Verse')];
      a.songTimeline = [{ id: 't1', sectionIndex: 0, repeats: 1 }];
      a.onDuplicateSection(0);
      expect(a.sections.map((s: any) => s.name)).toEqual(['Verse', 'Verse 2']);
      expect(a.sections[1].progression.chords.map((c: any) => c.name)).toEqual(a.sections[0].progression.chords.map((c: any) => c.name));
      expect(a.sections[1].melodyTrack?.notes.length).toBeGreaterThan(0);
      expect(a.songTimeline.map((t: any) => t.sectionIndex)).toEqual([0, 1]);
    });
  });
});
