import { Progression } from './chord-engine';
import { SongSection } from '../components/song-screen';

export interface SectionTemplate {
  name: string;
  desc: string;
  reorder: (n: number) => number[];
}

export const SECTION_TEMPLATES: SectionTemplate[] = [
  { name: 'Verse', desc: 'Settled, familiar.', reorder: n => Array.from({ length: n }, (_, i) => i) },
  { name: 'Chorus', desc: 'Brighter, opens the key up.', reorder: n => Array.from({ length: n }, (_, i) => (i + Math.ceil(n / 2)) % n) },
  { name: 'Pre-chorus', desc: 'Leans in, sets up the turn.', reorder: n => Array.from({ length: n }, (_, i) => (i + 1) % n) },
  { name: 'Bridge', desc: 'Detours, borrows a shadow chord.', reorder: n => Array.from({ length: n }, (_, i) => n - 1 - i) },
  { name: 'Outro', desc: 'Settles back down.', reorder: n => Array.from({ length: n }, (_, i) => (i - 1 + n) % n) },
];

export class SongArranger {
  public static createInitialSong(progression: Progression, order?: number[]): SongSection[] {
    const defaultOrder = order || Array.from({ length: progression.chords.length }, (_, i) => i);
    return [
      {
        name: SECTION_TEMPLATES[0].name,
        desc: SECTION_TEMPLATES[0].desc,
        progression,
        order: defaultOrder.slice(),
      },
    ];
  }

  public static addSection(sections: SongSection[], baseProgression: Progression): { sections: SongSection[]; activeIndex: number } {
    if (sections.length >= SECTION_TEMPLATES.length) {
      return { sections, activeIndex: sections.length - 1 };
    }
    const template = SECTION_TEMPLATES[sections.length];
    const order = template.reorder(baseProgression.chords.length);
    const newSection: SongSection = {
      name: template.name,
      desc: template.desc,
      progression: baseProgression,
      order,
    };
    const updatedSections = [...sections, newSection];
    return {
      sections: updatedSections,
      activeIndex: updatedSections.length - 1,
    };
  }

  public static syncActiveSection(
    sections: SongSection[],
    activeSectionIdx: number,
    progression: Progression,
    order: number[]
  ): SongSection[] {
    if (!sections[activeSectionIdx]) return sections;
    const updated = [...sections];
    updated[activeSectionIdx] = {
      ...updated[activeSectionIdx],
      progression,
      order: order.slice(),
    };
    return updated;
  }
}
