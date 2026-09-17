import {
  Progression,
  ChordBlock,
  RawChordData,
  ScaleProfile,
  preferFlatSpelling,
  buildChordBlock,
  pickWeighted,
  getMarkovTransitionWeight,
  getStartingDegreeWeight,
  synthCustomBlock,
  generateBorrowedChords,
  PITCH_CLASS,
  noteName,
  DEGREE_TENSION,
  DEGREE_FUNCTION,
  DEGREE_TAG,
  ROMAN_BY_SCALE,
  SCALE_LABEL,
} from './chord-engine';

export interface SongSection {
  name: string;
  desc: string;
  progression: Progression;
  order: number[];
}

export interface SectionTemplate {
  name: string;
  desc: string;
  reorder: (n: number) => number[];
}

export const SECTION_TEMPLATES: SectionTemplate[] = [
  { name: 'Verse', desc: 'Settled, familiar.', reorder: n => Array.from({ length: n }, (_, i) => i) },
  { name: 'Chorus', desc: 'Brighter, opens the key up.', reorder: n => Array.from({ length: n }, (_, i) => (i + Math.ceil(n / 2)) % n) },
  { name: 'Bridge', desc: 'Detours, borrows a shadow chord.', reorder: n => Array.from({ length: n }, (_, i) => n - 1 - i) },
  { name: 'Outro', desc: 'Settles back down.', reorder: n => Array.from({ length: n }, (_, i) => (i - 1 + n) % n) },
  { name: 'Pre-chorus', desc: 'Leans in, sets up the turn.', reorder: n => Array.from({ length: n }, (_, i) => (i + 1) % n) },
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

  /**
   * Intelligently generates a new section progression based on the musical properties
   * of the base progression, re-weighting Markov transition probabilities for the section type.
   */
  public static generateSectionProgression(
    baseProgression: Progression,
    sectionType: string,
    chordData?: RawChordData,
    targetLength?: number
  ): Progression {
    const key = baseProgression.key;
    const scaleType = baseProgression.scaleType || 'MAJOR';
    const genre = baseProgression.genre || 'Pop';
    const mood = baseProgression.mood || 'Uplifting';
    const bpm = baseProgression.bpm || 120;
    const preferFlat = preferFlatSpelling(key, scaleType);
    const scaleKey = `${key}_${scaleType}`;

    const baseLength = baseProgression.chords.length || 4;
    let length = targetLength && targetLength >= 2 && targetLength <= 8 ? targetLength : baseLength;
    if (sectionType === 'Pre-chorus' && !targetLength && baseLength > 4) {
      length = 4;
    }

    const scale: ScaleProfile | undefined = chordData?.scales ? chordData.scales[scaleKey] : undefined;

    let sectionChords: ChordBlock[] = [];

    if (scale && Object.keys(scale.degrees).length > 0) {
      sectionChords = this.walkSectionMarkov(scale, scaleKey, sectionType, genre, mood, preferFlat, length, baseProgression, chordData);
    } else {
      sectionChords = this.fallbackSectionChords(baseProgression, sectionType, length, preferFlat);
    }

    // Ensure Chorus feels distinct from Verse even if RNG picked similar degrees
    if (sectionType === 'Chorus' && this.areChordSequencesIdentical(baseProgression.chords, sectionChords)) {
      sectionChords = this.shiftChorusVariation(sectionChords, scale, scaleKey, preferFlat);
    }

    return {
      genre,
      mood,
      key,
      scaleType,
      bpm,
      chords: sectionChords,
    };
  }

  private static walkSectionMarkov(
    scale: ScaleProfile,
    scaleKey: string,
    sectionType: string,
    genre: string,
    mood: string,
    preferFlat: boolean,
    length: number,
    baseProgression: Progression,
    chordData?: RawChordData
  ): ChordBlock[] {
    const degreeOrder = Object.keys(scale.degrees);

    // 1. Pick Starting Degree with section-specific weights
    const startDegree = this.pickSectionStartDegree(sectionType, scale, genre, mood);
    const chosenDegrees: string[] = [startDegree];
    let currentDegree = startDegree;

    // 2. Step through Markov transitions re-weighted per section
    for (let i = 1; i < length; i++) {
      const isLast = i === length - 1;
      const candidates = degreeOrder.filter(d => scale.degrees[d] && d !== currentDegree);
      const pool = candidates.length ? candidates : degreeOrder;

      if (isLast) {
        // Cadence step
        const pick = pickWeighted(pool, d => {
          let w = getMarkovTransitionWeight(currentDegree, d, scale.type, genre, mood);
          if (sectionType === 'Outro' && d === 'TONIC') {
            w *= 8.0; // Outro strongly settles on TONIC
          } else if (sectionType === 'Pre-chorus' && (d === 'DOMINANT' || d === 'SUBDOMINANT')) {
            w *= 6.0; // Pre-chorus sets up tension on DOMINANT
          } else if (sectionType === 'Chorus') {
            if (d === 'TONIC' || d === 'SUBDOMINANT' || d === 'DOMINANT') w *= 2.5;
          }
          return Math.max(0.01, w);
        });
        chosenDegrees.push(pick);
      } else {
        const unused = pool.filter(d => !chosenDegrees.includes(d));
        const searchPool = unused.length ? unused : pool;

        const pick = pickWeighted(searchPool, d => {
          let w = getMarkovTransitionWeight(currentDegree, d, scale.type, genre, mood);
          w *= this.getSectionTransitionMultiplier(sectionType, currentDegree, d);
          return Math.max(0.01, w);
        });
        currentDegree = pick;
        chosenDegrees.push(pick);
      }
    }

    // 3. Build chord blocks for chosen degrees
    const chords = chosenDegrees.map(deg => buildChordBlock(scaleKey, deg, scale, preferFlat));

    // 4. For Bridge: inject a borrowed shadow chord for authentic harmonic detour
    if (sectionType === 'Bridge' && chords.length >= 3 && chordData) {
      try {
        const borrowedRows = generateBorrowedChords(chordData, baseProgression, 1);
        if (borrowedRows && borrowedRows.length > 0) {
          // Select a rich modal / borrowed chord (e.g. ♭VI, ♭VII, or iv)
          const shadowPick = borrowedRows.find(r => r.roman.includes('VI') || r.roman.includes('VII') || r.roman === 'iv') || borrowedRows[0];
          if (shadowPick && shadowPick.chord) {
            // Inject into position 1 (second chord) or position 2
            const insertIdx = Math.min(chords.length - 2, 1);
            chords[insertIdx] = {
              ...shadowPick.chord,
              desc: shadowPick.sub || 'Shadow chord borrowed for the bridge detour.',
            };
          }
        }
      } catch {
        // Safe fallback if borrowed chord generation encounters missing structure
      }
    }

    return chords;
  }

  private static pickSectionStartDegree(sectionType: string, scale: ScaleProfile, genre: string, mood: string): string {
    const degreeOrder = Object.keys(scale.degrees);
    const available = (deg: string) => Boolean(scale.degrees[deg]);

    if (sectionType === 'Chorus') {
      // Chorus: opens key up, lifts away from tonic to SUBDOMINANT (IV) or SUBMEDIANT (vi)
      const weights: Record<string, number> = {
        SUBDOMINANT: 3.5,
        SUBMEDIANT: 3.0,
        SUPERTONIC: 1.2,
        TONIC: 0.5,
        MEDIANT: 0.8,
        DOMINANT: 0.6,
      };
      return pickWeighted(degreeOrder, d => (weights[d] || 0.4) * (available(d) ? 1 : 0.01));
    }

    if (sectionType === 'Bridge') {
      // Bridge: harmonic detour, starts on introspective or contrasting degree
      const weights: Record<string, number> = {
        SUBMEDIANT: 3.5,
        MEDIANT: 2.5,
        SUBDOMINANT: 2.2,
        SUPERTONIC: 1.5,
        TONIC: 0.2,
      };
      return pickWeighted(degreeOrder, d => (weights[d] || 0.5) * (available(d) ? 1 : 0.01));
    }

    if (sectionType === 'Pre-chorus') {
      // Pre-chorus: leans in with stepping up motion
      const weights: Record<string, number> = {
        SUPERTONIC: 3.2,
        SUBDOMINANT: 2.8,
        SUBMEDIANT: 2.0,
        TONIC: 0.3,
      };
      return pickWeighted(degreeOrder, d => (weights[d] || 0.4) * (available(d) ? 1 : 0.01));
    }

    if (sectionType === 'Outro') {
      // Outro: soft settling
      const weights: Record<string, number> = {
        SUBDOMINANT: 2.5,
        SUBMEDIANT: 2.0,
        TONIC: 2.5,
      };
      return pickWeighted(degreeOrder, d => (weights[d] || 0.5) * (available(d) ? 1 : 0.01));
    }

    return pickWeighted(degreeOrder, d => getStartingDegreeWeight(d, scale.type, genre, mood));
  }

  private static getSectionTransitionMultiplier(sectionType: string, fromDegree: string, toDegree: string): number {
    if (sectionType === 'Chorus') {
      // Anthemic uplifting transitions
      if (fromDegree === 'SUBDOMINANT' && (toDegree === 'DOMINANT' || toDegree === 'TONIC')) return 2.2;
      if (fromDegree === 'SUBMEDIANT' && (toDegree === 'SUBDOMINANT' || toDegree === 'DOMINANT')) return 2.0;
      if (fromDegree === 'DOMINANT' && (toDegree === 'TONIC' || toDegree === 'SUBMEDIANT')) return 1.8;
      if (fromDegree === 'TONIC' && (toDegree === 'SUBDOMINANT' || toDegree === 'DOMINANT')) return 1.8;
    } else if (sectionType === 'Pre-chorus') {
      // Climbing tension towards DOMINANT
      if (fromDegree === 'SUPERTONIC' && (toDegree === 'SUBDOMINANT' || toDegree === 'DOMINANT')) return 2.8;
      if (fromDegree === 'SUBMEDIANT' && toDegree === 'SUPERTONIC') return 2.2;
      if (fromDegree === 'SUBDOMINANT' && toDegree === 'DOMINANT') return 3.2;
    } else if (sectionType === 'Bridge') {
      // Wider harmonic variety
      if (fromDegree === 'SUBMEDIANT' && toDegree === 'MEDIANT') return 2.0;
      if (fromDegree === 'MEDIANT' && toDegree === 'SUBDOMINANT') return 2.2;
      if (fromDegree === 'SUBDOMINANT' && toDegree === 'DOMINANT') return 2.0;
    } else if (sectionType === 'Outro') {
      // Soft plagal and resolving transitions
      if (fromDegree === 'SUBDOMINANT' && toDegree === 'TONIC') return 2.8;
      if (fromDegree === 'SUBMEDIANT' && toDegree === 'SUBDOMINANT') return 2.0;
    }
    return 1.0;
  }

  private static fallbackSectionChords(
    baseProgression: Progression,
    sectionType: string,
    length: number,
    preferFlat: boolean
  ): ChordBlock[] {
    const baseChords = baseProgression.chords;
    const keyPc = PITCH_CLASS[baseProgression.key] ?? 0;
    const isMinor = (baseProgression.scaleType || '').includes('MINOR');

    let pattern: ChordBlock[] = [];

    if (sectionType === 'Chorus') {
      // Open with IV or vi lift
      if (baseChords.length >= 4) {
        pattern = [baseChords[1], baseChords[2], baseChords[3] || baseChords[0], baseChords[0]];
      } else {
        pattern = [...baseChords].reverse();
      }
    } else if (sectionType === 'Bridge') {
      // Introduce a shadow/borrowed chord
      const shadowChord = isMinor
        ? synthCustomBlock(noteName(keyPc + 5, preferFlat), 'Major', 'None', 'IV', 'Major subdominant', 'the Dorian lift, sunny and open', 0.35, preferFlat)
        : synthCustomBlock(noteName(keyPc + 8, true), 'Major', 'None', '♭VI', 'Flat submediant', 'cinematic shadow detour', 0.48, true);

      if (baseChords.length >= 4) {
        pattern = [baseChords[3] || baseChords[1], shadowChord, baseChords[1] || baseChords[2], baseChords[2] || baseChords[0]];
      } else {
        pattern = [shadowChord, ...baseChords];
      }
    } else if (sectionType === 'Pre-chorus') {
      if (baseChords.length >= 4) {
        pattern = [baseChords[1], baseChords[2], baseChords[1], baseChords[2]];
      } else {
        pattern = baseChords;
      }
    } else if (sectionType === 'Outro') {
      if (baseChords.length >= 4) {
        pattern = [baseChords[1], baseChords[3] || baseChords[1], baseChords[1], baseChords[0]];
      } else {
        pattern = baseChords;
      }
    } else {
      const template = SECTION_TEMPLATES.find(t => t.name === sectionType) || SECTION_TEMPLATES[1];
      const order = template.reorder(baseChords.length);
      pattern = order.map(i => baseChords[i % baseChords.length]);
    }

    const result: ChordBlock[] = [];
    for (let i = 0; i < length; i++) {
      result.push(pattern[i % pattern.length]);
    }
    return result;
  }

  private static areChordSequencesIdentical(a: ChordBlock[], b: ChordBlock[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((chord, i) => chord.name === b[i]?.name);
  }

  private static shiftChorusVariation(
    chords: ChordBlock[],
    scale?: ScaleProfile,
    scaleKey?: string,
    preferFlat: boolean = true,
    length?: number
  ): ChordBlock[] {
    const targetLen = length || chords.length;
    if (!scale || !scaleKey) return chords;
    // Rotate and pick IV or vi as opening chord
    const iv = scale.degrees['SUBDOMINANT'] ? buildChordBlock(scaleKey, 'SUBDOMINANT', scale, preferFlat) : null;
    const v = scale.degrees['DOMINANT'] ? buildChordBlock(scaleKey, 'DOMINANT', scale, preferFlat) : null;
    const vi = scale.degrees['SUBMEDIANT'] ? buildChordBlock(scaleKey, 'SUBMEDIANT', scale, preferFlat) : null;
    const i = scale.degrees['TONIC'] ? buildChordBlock(scaleKey, 'TONIC', scale, preferFlat) : null;

    if (iv && v && vi && i) {
      const basePattern = [iv, v, vi, i];
      const result: ChordBlock[] = [];
      for (let j = 0; j < targetLen; j++) {
        result.push(basePattern[j % basePattern.length]);
      }
      return result;
    }
    return chords;
  }

  public static addSection(
    sections: SongSection[],
    baseProgression: Progression,
    chordData?: RawChordData,
    targetLength?: number
  ): { sections: SongSection[]; activeIndex: number } {
    if (sections.length >= SECTION_TEMPLATES.length) {
      return { sections, activeIndex: sections.length - 1 };
    }
    const template = SECTION_TEMPLATES[sections.length];
    const newProgression = this.generateSectionProgression(baseProgression, template.name, chordData, targetLength);
    const order = Array.from({ length: newProgression.chords.length }, (_, i) => i);
    const newSection: SongSection = {
      name: template.name,
      desc: template.desc,
      progression: newProgression,
      order,
    };
    const updatedSections = [...sections, newSection];
    return {
      sections: updatedSections,
      activeIndex: updatedSections.length - 1,
    };
  }

  public static removeSection(
    sections: SongSection[],
    indexToRemove: number
  ): { sections: SongSection[]; activeIndex: number } {
    if (sections.length <= 1 || indexToRemove < 0 || indexToRemove >= sections.length) {
      return { sections, activeIndex: 0 };
    }
    const updatedSections = sections.filter((_, i) => i !== indexToRemove);
    const newActiveIndex = Math.min(indexToRemove, updatedSections.length - 1);
    return {
      sections: updatedSections,
      activeIndex: Math.max(0, newActiveIndex),
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
