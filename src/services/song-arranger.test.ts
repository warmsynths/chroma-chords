import { describe, it, expect } from 'vitest';
import { SongArranger, SECTION_TEMPLATES } from './song-arranger';
import { Progression, buildDeviceShareUrl } from './chord-engine';

describe('SongArranger Deep Module', () => {
  const sampleProgression: Progression = {
    genre: 'Pop',
    mood: 'Dreamy',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [
      { name: 'C', tag: 'I', roman: 'I', color: '#fff', functionLabel: 'Tonic', notes: ['C', 'E', 'G'], scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 0.1 },
      { name: 'F', tag: 'IV', roman: 'IV', color: '#fff', functionLabel: 'Subdominant', notes: ['F', 'A', 'C'], scaleLabel: 'F Maj', desc: '', degree: '4', scaleKey: 'F', tension: 0.4 },
      { name: 'G', tag: 'V', roman: 'V', color: '#fff', functionLabel: 'Dominant', notes: ['G', 'B', 'D'], scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 0.7 },
      { name: 'Am', tag: 'vi', roman: 'vi', color: '#fff', functionLabel: 'Submediant', notes: ['A', 'C', 'E'], scaleLabel: 'A Min', desc: '', degree: '6', scaleKey: 'A', tension: 0.3 },
    ],
  };

  it('creates initial song structure with Verse section', () => {
    const sections = SongArranger.createInitialSong(sampleProgression);
    expect(sections).toHaveLength(1);
    expect(sections[0].name).toBe('Verse');
    expect(sections[0].desc).toBe('Settled, familiar.');
    expect(sections[0].order).toEqual([0, 1, 2, 3]);
    expect(sections[0].progression).toBe(sampleProgression);
  });

  it('intelligently generates Chorus section with lifted progression', () => {
    const initial = SongArranger.createInitialSong(sampleProgression);
    const result = SongArranger.addSection(initial, sampleProgression);
    expect(result.sections).toHaveLength(2);
    expect(result.sections[1].name).toBe('Chorus');
    expect(result.sections[1].desc).toBe('Brighter, opens the key up.');
    expect(result.activeIndex).toBe(1);

    const chorusProg = result.sections[1].progression;
    expect(chorusProg).toBeDefined();
    expect(chorusProg.chords.length).toBe(4);
    // Chorus chords should start on IV (F) or vi (Am) or not be identical to Verse sequence C -> F -> G -> Am
    const chorusNames = chorusProg.chords.map(c => c.name);
    const verseNames = sampleProgression.chords.map(c => c.name);
    expect(chorusNames).not.toEqual(verseNames);
  });

  it('intelligently generates Bridge with borrowed shadow chord detour', () => {
    const initial = SongArranger.createInitialSong(sampleProgression);
    const withChorus = SongArranger.addSection(initial, sampleProgression);
    const withBridge = SongArranger.addSection(withChorus.sections, sampleProgression);

    expect(withBridge.sections).toHaveLength(3);
    const bridgeSection = withBridge.sections[2];
    expect(bridgeSection.name).toBe('Bridge');
    expect(bridgeSection.desc).toBe('Detours, borrows a shadow chord.');

    const bridgeChords = bridgeSection.progression.chords;
    expect(bridgeChords.length).toBe(4);
    // Should contain a shadow/borrowed chord or chromatic detour (e.g. ♭VI)
    const hasDetourChord = bridgeChords.some(c => c.tag?.includes('♭') || c.roman?.includes('♭') || c.name.includes('Ab') || c.name.includes('A♭'));
    expect(hasDetourChord).toBe(true);
  });

  it('supports custom target lengths for section variations', () => {
    const customChorus = SongArranger.generateSectionProgression(sampleProgression, 'Chorus', undefined, 8);
    expect(customChorus.chords.length).toBe(8);

    const customPreChorus = SongArranger.generateSectionProgression(sampleProgression, 'Pre-chorus', undefined, 2);
    expect(customPreChorus.chords.length).toBe(2);
  });

  it('removes sections cleanly and clamps activeIndex', () => {
    let sections = SongArranger.createInitialSong(sampleProgression);
    sections = SongArranger.addSection(sections, sampleProgression).sections; // + Chorus
    sections = SongArranger.addSection(sections, sampleProgression).sections; // + Bridge
    expect(sections).toHaveLength(3);

    // Remove Bridge (index 2)
    const res1 = SongArranger.removeSection(sections, 2);
    expect(res1.sections).toHaveLength(2);
    expect(res1.sections.map(s => s.name)).toEqual(['Verse', 'Chorus']);
    expect(res1.activeIndex).toBe(1);

    // Cannot remove Verse (length <= 1)
    const res2 = SongArranger.removeSection(res1.sections.slice(0, 1), 0);
    expect(res2.sections).toHaveLength(1);
    expect(res2.sections[0].name).toBe('Verse');
  });

  it('synchronizes active section progression and order', () => {
    const initial = SongArranger.createInitialSong(sampleProgression);
    const updatedOrder = [3, 2, 1, 0];
    const synced = SongArranger.syncActiveSection(initial, 0, sampleProgression, updatedOrder);
    expect(synced[0].order).toEqual(updatedOrder);
  });

  it('generates device share URLs using selected section chord order', () => {
    const initial = SongArranger.createInitialSong(sampleProgression);
    const { sections } = SongArranger.addSection(initial, sampleProgression);

    const verseSection = sections[0];
    const chorusSection = sections[1];

    const verseUrl = buildDeviceShareUrl(verseSection.progression, 'm8', verseSection.order);
    const chorusUrl = buildDeviceShareUrl(chorusSection.progression, 'm8', chorusSection.order);

    expect(verseUrl).toContain('m8hyper');
    expect(chorusUrl).toContain('m8hyper');
    // Chorus URL reflects the distinct chorus chords
    const chorusChordsQuery = chorusSection.order.map(i => chorusSection.progression.chords[i].name).join('+');
    expect(chorusUrl).toContain(`?p=${chorusChordsQuery}`);
  });
});
