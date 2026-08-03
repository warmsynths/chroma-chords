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
      { name: 'C', tag: 'I', roman: 'I', color: '#fff', functionLabel: 'Tonic', notes: ['C', 'E', 'G'], scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 1 },
      { name: 'F', tag: 'IV', roman: 'IV', color: '#fff', functionLabel: 'Subdominant', notes: ['F', 'A', 'C'], scaleLabel: 'F Maj', desc: '', degree: '4', scaleKey: 'F', tension: 2 },
      { name: 'G', tag: 'V', roman: 'V', color: '#fff', functionLabel: 'Dominant', notes: ['G', 'B', 'D'], scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 3 },
      { name: 'Am', tag: 'vi', roman: 'vi', color: '#fff', functionLabel: 'Tonic Parallel', notes: ['A', 'C', 'E'], scaleLabel: 'A Min', desc: '', degree: '6', scaleKey: 'A', tension: 2 },
    ],
  };

  it('creates initial song structure with Verse section', () => {
    const sections = SongArranger.createInitialSong(sampleProgression);
    expect(sections).toHaveLength(1);
    expect(sections[0].name).toBe('Verse');
    expect(sections[0].order).toEqual([0, 1, 2, 3]);
  });

  it('adds Chorus section with reordered index permutation', () => {
    const initial = SongArranger.createInitialSong(sampleProgression);
    const result = SongArranger.addSection(initial, sampleProgression);
    expect(result.sections).toHaveLength(2);
    expect(result.sections[1].name).toBe('Chorus');
    expect(result.activeIndex).toBe(1);

    // Chorus template reorder for n=4 is (i + Math.ceil(4/2)) % 4 => (i + 2) % 4
    const chorusTemplateOrder = SECTION_TEMPLATES[1].reorder(4);
    expect(result.sections[1].order).toEqual(chorusTemplateOrder);
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

    const verseSection = sections[0]; // order: [0, 1, 2, 3] -> C, F, G, Am
    const chorusSection = sections[1]; // order: [2, 3, 0, 1] -> G, Am, C, F

    const verseUrl = buildDeviceShareUrl(verseSection.progression, 'm8', verseSection.order);
    const chorusUrl = buildDeviceShareUrl(chorusSection.progression, 'm8', chorusSection.order);

    expect(verseUrl).toContain('?p=C+F+G+Am');
    expect(chorusUrl).toContain('?p=G+Am+C+F');
  });
});

