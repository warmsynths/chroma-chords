import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Load the chord voyager data directly from the public folder
const dataPath = path.resolve(__dirname, '../../public/chord_voyager_data.json');
const chordData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const MIXOLYDIAN_PARENT_ROOTS: Record<string, string> = {
  'C': 'F', 'Db': 'F#', 'D': 'G', 'Eb': 'Ab', 'E': 'A', 'F': 'Bb',
  'F#': 'B', 'G': 'C', 'Ab': 'Db', 'A': 'D', 'Bb': 'Eb', 'B': 'E'
};

const DORIAN_PARENT_ROOTS: Record<string, string> = {
  'C': 'Bb', 'C#': 'B', 'D': 'C', 'D#': 'Db', 'E': 'D', 'F': 'Eb',
  'F#': 'E', 'G': 'F', 'G#': 'F#', 'A': 'G', 'A#': 'Ab', 'B': 'A'
};

const LYDIAN_PARENT_ROOTS: Record<string, string> = {
  'C': 'G', 'Db': 'Ab', 'D': 'A', 'Eb': 'Bb', 'E': 'B', 'F': 'C',
  'F#': 'Db', 'G': 'D', 'Ab': 'Eb', 'A': 'E', 'Bb': 'F', 'B': 'F#'
};

const modeToParentDegree: Record<string, string> = {
  // Dorian
  'DORIAN_TONIC': 'SUPERTONIC',
  'DORIAN_SUPERTONIC': 'MEDIANT',
  'DORIAN_MEDIANT': 'SUBDOMINANT',
  'DORIAN_SUBDOMINANT': 'DOMINANT',
  'DORIAN_DOMINANT': 'SUBMEDIANT',
  'DORIAN_SUBMEDIANT': 'LEADING-TONE',
  'DORIAN_SUBTONIC': 'TONIC',
  // Mixolydian
  'MIXOLYDIAN_TONIC': 'DOMINANT',
  'MIXOLYDIAN_SUPERTONIC': 'SUBMEDIANT',
  'MIXOLYDIAN_MEDIANT': 'LEADING-TONE',
  'MIXOLYDIAN_SUBDOMINANT': 'TONIC',
  'MIXOLYDIAN_DOMINANT': 'SUPERTONIC',
  'MIXOLYDIAN_SUBMEDIANT': 'MEDIANT',
  'MIXOLYDIAN_SUBTONIC': 'SUBDOMINANT',
  // Lydian
  'LYDIAN_TONIC': 'SUBDOMINANT',
  'LYDIAN_SUPERTONIC': 'DOMINANT',
  'LYDIAN_MEDIANT': 'SUBMEDIANT',
  'LYDIAN_SUBDOMINANT': 'LEADING-TONE',
  'LYDIAN_DOMINANT': 'TONIC',
  'LYDIAN_SUBMEDIANT': 'SUPERTONIC',
  'LYDIAN_LEADING-TONE': 'MEDIANT'
};

// Simulate the injection process to construct dynamic scales
function getInjectedScales() {
  const scales = { ...chordData.scales };

  // Mixolydian Mode
  for (const [modeRoot, parentRoot] of Object.entries(MIXOLYDIAN_PARENT_ROOTS)) {
    const parentScaleKey = `${parentRoot}_MAJOR`;
    const parentScale = scales[parentScaleKey];
    if (!parentScale) continue;

    const scaleKey = `${modeRoot}_MIXOLYDIAN`;
    const degreesObj: any = {};

    for (const modeDegree of ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'SUBTONIC']) {
      const parentDegree = modeToParentDegree[`MIXOLYDIAN_${modeDegree}`];
      const parentDegProfile = parentScale.degrees[parentDegree];
      if (!parentDegProfile) continue;

      const degProfile = JSON.parse(JSON.stringify(parentDegProfile));
      degreesObj[modeDegree] = degProfile;
    }

    scales[scaleKey] = {
      root: modeRoot,
      type: 'MIXOLYDIAN',
      degrees: degreesObj
    };
  }

  // Dorian Mode
  for (const [modeRoot, parentRoot] of Object.entries(DORIAN_PARENT_ROOTS)) {
    const parentScaleKey = `${parentRoot}_MAJOR`;
    const parentScale = scales[parentScaleKey];
    if (!parentScale) continue;

    const scaleKey = `${modeRoot}_DORIAN`;
    const degreesObj: any = {};

    for (const modeDegree of ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'SUBTONIC']) {
      const parentDegree = modeToParentDegree[`DORIAN_${modeDegree}`];
      const parentDegProfile = parentScale.degrees[parentDegree];
      if (!parentDegProfile) continue;

      const degProfile = JSON.parse(JSON.stringify(parentDegProfile));
      degreesObj[modeDegree] = degProfile;
    }

    scales[scaleKey] = {
      root: modeRoot,
      type: 'DORIAN',
      degrees: degreesObj
    };
  }

  // Lydian Mode
  for (const [modeRoot, parentRoot] of Object.entries(LYDIAN_PARENT_ROOTS)) {
    const parentScaleKey = `${parentRoot}_MAJOR`;
    const parentScale = scales[parentScaleKey];
    if (!parentScale) continue;

    const scaleKey = `${modeRoot}_LYDIAN`;
    const degreesObj: any = {};

    for (const modeDegree of ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'LEADING-TONE']) {
      const parentDegree = modeToParentDegree[`LYDIAN_${modeDegree}`];
      const parentDegProfile = parentScale.degrees[parentDegree];
      if (!parentDegProfile) continue;

      const degProfile = JSON.parse(JSON.stringify(parentDegProfile));
      degreesObj[modeDegree] = degProfile;
    }

    scales[scaleKey] = {
      root: modeRoot,
      type: 'LYDIAN',
      degrees: degreesObj
    };
  }

  return scales;
}

describe('Chord Voyager scale resolution', () => {
  const scales = getInjectedScales();

  const majorKeys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const minorKeys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  it('resolves all combinations of Major keys and scales', () => {
    for (const key of majorKeys) {
      const scaleKey = `${key}_MAJOR`;
      const scaleProfile = scales[scaleKey];
      expect(scaleProfile, `Failed to resolve ${scaleKey}`).toBeDefined();
      expect(scaleProfile.degrees.TONIC, `No TONIC for ${scaleKey}`).toBeDefined();
    }
  });

  it('resolves all combinations of Natural Minor keys and scales', () => {
    for (const key of minorKeys) {
      const scaleKey = `${key}_NATURAL_MINOR`;
      const scaleProfile = scales[scaleKey];
      expect(scaleProfile, `Failed to resolve ${scaleKey}`).toBeDefined();
      expect(scaleProfile.degrees.TONIC, `No TONIC for ${scaleKey}`).toBeDefined();
    }
  });

  it('resolves all combinations of Harmonic Minor keys and scales', () => {
    for (const key of minorKeys) {
      const scaleKey = `${key}_HARMONIC_MINOR`;
      const scaleProfile = scales[scaleKey];
      expect(scaleProfile, `Failed to resolve ${scaleKey}`).toBeDefined();
      expect(scaleProfile.degrees.TONIC, `No TONIC for ${scaleKey}`).toBeDefined();
    }
  });

  it('resolves all combinations of Melodic Minor keys and scales', () => {
    for (const key of minorKeys) {
      const scaleKey = `${key}_MELODIC_MINOR`;
      const scaleProfile = scales[scaleKey];
      expect(scaleProfile, `Failed to resolve ${scaleKey}`).toBeDefined();
      expect(scaleProfile.degrees.TONIC, `No TONIC for ${scaleKey}`).toBeDefined();
    }
  });

  it('resolves all combinations of Dorian keys and scales', () => {
    for (const key of minorKeys) {
      const scaleKey = `${key}_DORIAN`;
      const scaleProfile = scales[scaleKey];
      expect(scaleProfile, `Failed to resolve ${scaleKey}`).toBeDefined();
      expect(scaleProfile.degrees.TONIC, `No TONIC for ${scaleKey}`).toBeDefined();
    }
  });

  it('resolves all combinations of Mixolydian keys and scales', () => {
    for (const key of majorKeys) {
      const scaleKey = `${key}_MIXOLYDIAN`;
      const scaleProfile = scales[scaleKey];
      expect(scaleProfile, `Failed to resolve ${scaleKey}`).toBeDefined();
      expect(scaleProfile.degrees.TONIC, `No TONIC for ${scaleKey}`).toBeDefined();
    }
  });

  it('resolves all combinations of Lydian keys and scales', () => {
    for (const key of majorKeys) {
      const scaleKey = `${key}_LYDIAN`;
      const scaleProfile = scales[scaleKey];
      expect(scaleProfile, `Failed to resolve ${scaleKey}`).toBeDefined();
      expect(scaleProfile.degrees.TONIC, `No TONIC for ${scaleKey}`).toBeDefined();
    }
  });
});
