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

  it('MIDI settings can be reopened after closing (the close event resets the parent state)', async () => {
    const a = app as any;
    a.midiModalOpen = true;
    await app.updateComplete;
    const modal = app.shadowRoot!.querySelector('midi-modal') as any;
    expect(modal.isOpen).toBe(true);

    modal.shadowRoot.querySelector('.close-btn').click();
    await app.updateComplete;
    expect(a.midiModalOpen).toBe(false);

    a.midiModalOpen = true;
    await app.updateComplete;
    expect((app.shadowRoot!.querySelector('midi-modal') as any).isOpen).toBe(true);
  });

  describe('saving a song', () => {
    const mkSection = (name: string) => ({ name, desc: '', progression: (app as any).progression, order: [0] });

    it('adding a section after saving makes the loop count as edited, so Save asks Update or Save as new', async () => {
      const a = app as any;
      a.sections = [mkSection('Verse')];
      a.songTimeline = [{ id: 't1', sectionIndex: 0, repeats: 1 }];
      a.activeSectionIdx = 0;
      a.saveProject('My song', true);
      expect(a.getSaveState()).toBe('saved');

      a.onDuplicateSection(0);
      expect(a.getSaveState()).toBe('edited');

      a.onSavePressed();
      expect(a.saveDialog?.edited).toBe(true);
    });

    it('saves every section, melody and the order, and restores them on load', async () => {
      const a = app as any;
      a.sections = [mkSection('Verse')];
      a.songTimeline = [{ id: 't1', sectionIndex: 0, repeats: 1 }];
      a.activeSectionIdx = 0;
      a.onDuplicateSection(0);
      a.songTimeline = a.songTimeline.map((t: any, i: number) => (i === 1 ? { ...t, repeats: 2 } : t));
      a.saveProject('Two verses', true);

      const saved = (await import('./services/project-service')).ProjectService.getProjects().find(p => p.name === 'Two verses')!;
      expect(saved.song?.sections.map(s => s.name)).toEqual(['Verse', 'Verse 2']);
      expect(saved.song?.timeline.map(t => t.repeats)).toEqual([1, 2]);
      expect(saved.song?.sections[1].melodyTrack?.notes.length).toBeGreaterThan(0);

      a.sections = [mkSection('Other')];
      a.songTimeline = [{ id: 'x', sectionIndex: 0, repeats: 1 }];
      a.onLoadProject(new CustomEvent('load', { detail: saved }));
      expect(a.sections.map((s: any) => s.name)).toEqual(['Verse', 'Verse 2']);
      expect(a.songTimeline.map((t: any) => t.repeats)).toEqual([1, 2]);
      expect(a.getSaveState()).toBe('saved');
    });

    it('a plain loop still behaves as before', async () => {
      const a = app as any;
      a.sections = [mkSection('Verse')];
      a.songTimeline = [{ id: 't1', sectionIndex: 0, repeats: 1 }];
      a.saveProject('Just a loop', true);
      expect(a.getSaveState()).toBe('saved');
      a.progression = { ...a.progression, chords: [{ ...a.progression.chords[0], name: 'Dm' }] };
      expect(a.getSaveState()).toBe('edited');
    });

    it('saves instrument and play style (chords and melody) and restores them on load', async () => {
      const a = app as any;
      a.instrument = 'Nylon Guitar';
      a.playStyle = 'Arpeggio';
      a.melodySound = 'Lead Synth';
      a.melodyFeel = 'Lazy';
      a.saveProject('Guitar arp', true);
      expect(a.getSaveState()).toBe('saved');

      a.instrument = 'Grand Piano';
      expect(a.getSaveState()).toBe('edited'); // changing the sound counts as a change to the save

      const saved = (await import('./services/project-service')).ProjectService.getProjects().find(p => p.name === 'Guitar arp')!;
      expect(saved.sound).toMatchObject({ instrument: 'Nylon Guitar', playStyle: 'Arpeggio', melodySound: 'Lead Synth', melodyFeel: 'Lazy' });

      a.playStyle = 'Strum';
      a.melodySound = 'Stage Rhodes';
      a.onLoadProject(new CustomEvent('load', { detail: saved }));
      expect(a.instrument).toBe('Nylon Guitar');
      expect(a.playStyle).toBe('Arpeggio');
      expect(a.melodySound).toBe('Lead Synth');
      expect(a.melodyFeel).toBe('Lazy');
      expect(playbackEngine.getFeelSettings()).toBeDefined();
      expect(a.getSaveState()).toBe('saved');
    });

    it('older saves without a sound are not flagged as edited because of it', async () => {
      const a = app as any;
      a.saveProject('Old style', true);
      const svc = (await import('./services/project-service')).ProjectService;
      const p = svc.getProjects().find(x => x.name === 'Old style')!;
      delete (p as any).sound;
      svc.saveProject(p);
      a.instrument = 'Drawbar Organ';
      expect(a.getSaveState()).toBe('saved');
    });
  });
});
