import {
  RawChordData,
  Progression,
  ChordBlock,
  RequestedChord,
  alignChordsToScale,
  generateProgression,
  ROOT_KEYS,
  PITCH_CLASS,
  noteName,
  preferFlatSpelling,
  preferChordFlatSpelling,
  splitChordRootAndSuffix,
  transposeChordName,
} from './chord-engine';

export { splitChordRootAndSuffix };

export interface BandTrick {
  id: string;
  name: string;
  roman: string;
  plain: string;
  theory: string;
  semitones: number; // Semitones offset from key tonic
  quality: string;   // maj, min, dom7, min7, maj7, maj9, sus4, etc.
}

export interface BandSignatureItem {
  k: string;
  v: string;
}

export interface BandArchetype {
  id: string;
  name: string;
  color: string;
  font: string;
  weight?: number;
  italic?: boolean;
  pillFs?: number;
  pillTrack?: string;
  presetId: string;
  rhythmStyle: string;
  defaultBpm: number;
  tagline: string;
  theoryTagline: string;
  plain: string;
  theory: string;
  sig: BandSignatureItem[];
  hoist: string[];
  genre: string;
  mood: string;
  favoredKeys: string[];
  favoredScales: string[];
  favoredMoods: string[];
  basisArchetypes: string[][];
  cMajorBasisChords: string[];
  signatureTricks: BandTrick[];
}

export interface MatchedBandTrick {
  bandId: string;
  bandName: string;
  trickName: string;
  plain: string;
  theory: string;
  badge: string;
  color: string;
  trick?: BandTrick;
}

export interface BandTrickCandidate {
  trick: BandTrick;
  chordName: string;
  roman: string;
  notes: string[];
  plain: string;
  theory: string;
  tension: number;
}

export const BAND_ARCHETYPES: Record<string, BandArchetype> = {
  oasis: {
    id: 'oasis',
    name: 'Oasis',
    color: '#F6D98B',
    font: 'Anton, sans-serif',
    weight: 800,
    pillFs: 13,
    pillTrack: '0.08em',
    presetId: 'guitar',
    rhythmStyle: 'driving_strum',
    defaultBpm: 116,
    tagline: 'Leans on a bright major chord that shouldn’t fit, then walks home',
    theoryTagline: 'Borrowed major ♭III, plagal IV–I, Major III substitution, anchored D4/G4 guitar drone',
    plain: 'leans on a bright chord that shouldn’t fit, then walks home',
    theory: 'borrowed major ♭III, plagal IV–I, sus4 held over a static root',
    sig: [
      { k: 'Harmony', v: 'Borrows a bright chord from outside the key — ♭III or ♭VI — and treats it as if it belonged.' },
      { k: 'Cadence', v: 'Lands on IV–I rather than V–I, so the ending feels wide open instead of shut.' },
      { k: 'Voicing', v: 'A sus4 held over a root that never moves, strummed the whole bar.' },
    ],
    hoist: ['E♭maj7', 'Fmaj7', 'A♭'],
    genre: 'Rock',
    mood: 'Uplifting',
    favoredKeys: ['C', 'G', 'D', 'A', 'E'],
    favoredScales: ['MAJOR', 'MIXOLYDIAN'],
    favoredMoods: ['Anthemic', 'Uplifting'],
    basisArchetypes: [
      ['C', 'G', 'Am', 'E7', 'F', 'G', 'C', 'C'],
      ['C', 'Bb', 'F', 'C', 'C', 'Bb', 'F', 'G'],
      ['C', 'G', 'Eb', 'F', 'C', 'G', 'F', 'C'],
    ],
    cMajorBasisChords: ['C', 'G', 'Am', 'E7', 'F', 'G', 'C', 'C'],
    signatureTricks: [
      {
        id: 'oasis-major-iii',
        name: 'Major III Lift',
        roman: 'III7',
        plain: 'Replaces the quiet minor iii with a soaring major chord that lifts the whole bar',
        theory: 'Secondary dominant (V7/vi) resolving to IV or vi (e.g. E7 in C major)',
        semitones: 4,
        quality: 'dom7',
      },
      {
        id: 'oasis-bvii',
        name: 'Borrowed ♭VII',
        roman: '♭VII',
        plain: 'Mixolydian borrowing that gives that anthem swagger',
        theory: 'Flattened 7th major triad borrowed from Mixolydian (e.g. B♭ in C major)',
        semitones: 10,
        quality: 'maj',
      },
      {
        id: 'oasis-biii',
        name: 'Borrowed ♭III',
        roman: '♭III',
        plain: 'Surprise bright borrowed lift before walking back to the tonic',
        theory: 'Major chord on the flat third borrowed from parallel minor (e.g. E♭ in C major)',
        semitones: 3,
        quality: 'maj',
      },
      {
        id: 'oasis-minor-iv',
        name: 'Minor iv Walkdown',
        roman: 'iv',
        plain: 'Emotional chromatic slide from IV into iv before resolving home to I',
        theory: 'Plagal cadence with borrowed minor subdominant (e.g. Fm in C major)',
        semitones: 5,
        quality: 'min',
      },
    ],
  },
  beatles: {
    id: 'beatles',
    name: 'The Beatles',
    color: '#F4B266',
    font: "'Plus Jakarta Sans', sans-serif",
    weight: 800,
    pillFs: 12.5,
    pillTrack: '0.03em',
    presetId: 'rhodes',
    rhythmStyle: 'straight_8ths',
    defaultBpm: 108,
    tagline: 'Warm 60s melodic surprises with bittersweet minor cadences',
    theoryTagline: 'Minor iv cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines',
    plain: 'warm 60s melodic surprises with bittersweet minor cadences',
    theory: 'minor iv plagal cadence (IV–iv–I), secondary dominant II7, chromatic descending inner lines',
    sig: [
      { k: 'Harmony', v: 'Bittersweet minor iv plagal cadences and unexpected chromatic shifts.' },
      { k: 'Motion', v: 'Secondary dominants resolving to unexpected diatonic steps.' },
      { k: 'Melody', v: 'Descending inner voice motion held together by strong vocal counterpoint.' },
    ],
    hoist: ['Fm', 'D7', 'E7'],
    genre: 'Pop',
    mood: 'Warm',
    favoredKeys: ['C', 'G', 'F', 'D', 'A', 'E'],
    favoredScales: ['MAJOR', 'DORIAN'],
    favoredMoods: ['Warm', 'Playful'],
    basisArchetypes: [
      ['C', 'E7', 'Am', 'Fm', 'C', 'G7', 'C', 'C'],
      ['C', 'D7', 'F', 'C', 'C', 'D7', 'G7', 'C'],
      ['C', 'Am', 'Dm7', 'G7', 'F', 'Fm', 'C', 'G7'],
    ],
    cMajorBasisChords: ['C', 'E7', 'Am', 'Fm', 'C', 'G7', 'C', 'C'],
    signatureTricks: [
      {
        id: 'beatles-minor-iv',
        name: 'Minor iv Cadence',
        roman: 'iv',
        plain: 'The ultimate bittersweet Beatles trick: major IV dips into dark minor iv before resolving home',
        theory: 'Minor subdominant borrowing (e.g. Fm in C major, IV -> iv -> I)',
        semitones: 5,
        quality: 'min',
      },
      {
        id: 'beatles-major-ii',
        name: 'Secondary Dominant II7',
        roman: 'II7',
        plain: 'Bright, forward-pushing dominant that charges straight into the V chord',
        theory: 'Secondary dominant (V7/V, e.g. D7 in C major -> G7)',
        semitones: 2,
        quality: 'dom7',
      },
      {
        id: 'beatles-major-iii',
        name: 'Major III7 Turn',
        roman: 'III7',
        plain: 'Unexpected major push on the 3rd degree leading into the minor relative',
        theory: 'V7/vi resolving to vi (e.g. E7 -> Am in C major)',
        semitones: 4,
        quality: 'dom7',
      },
    ],
  },
  radiohead: {
    id: 'radiohead',
    name: 'Radiohead',
    color: '#C9A9E0',
    font: "'Space Mono', monospace",
    weight: 700,
    pillFs: 12.5,
    pillTrack: '0.02em',
    presetId: 'juno-pad',
    rhythmStyle: 'slow_arpeggio',
    defaultBpm: 84,
    tagline: 'Swaps chords for their stranger neighbours a third away',
    theoryTagline: 'Chromatic mediants (♭VI, ♭III), parallel modal mixture, haunting voice leading',
    plain: 'swaps a chord for its stranger neighbour a third away',
    theory: 'chromatic mediants and modal mixture — ♭VI and ♭III against a major tonic',
    sig: [
      { k: 'Harmony', v: 'Chromatic mediants: the chord a third away, in the wrong quality.' },
      { k: 'Colour', v: 'Major and minor of the same key sit side by side, neither one winning.' },
      { k: 'Motion', v: 'Loops that circle without resolving, often in odd bar lengths.' },
    ],
    hoist: ['A♭maj7', 'E♭maj7', 'Em7'],
    genre: 'Rock',
    mood: 'Melancholy',
    favoredKeys: ['A', 'E', 'C', 'D', 'F'],
    favoredScales: ['NATURAL_MINOR', 'DORIAN', 'MAJOR'],
    favoredMoods: ['Melancholy', 'Dark'],
    basisArchetypes: [
      ['C', 'E', 'F', 'Fm', 'C', 'E', 'F', 'Fm'],
      ['Am', 'D', 'Em', 'G', 'Am', 'F', 'Em', 'G'],
      ['C', 'Ab', 'Eb', 'G', 'C', 'Ab', 'Fm', 'G'],
    ],
    cMajorBasisChords: ['C', 'E', 'F', 'Fm', 'C', 'E', 'F', 'Fm'],
    signatureTricks: [
      {
        id: 'radiohead-chromatic-mediant',
        name: 'Chromatic Mediant',
        roman: 'III',
        plain: 'Jumps from I straight to major III, sharing one note while every other voice twists',
        theory: 'Chromatic mediant with smooth half-step voice leading (e.g. C -> E in C major)',
        semitones: 4,
        quality: 'maj',
      },
      {
        id: 'radiohead-bvi',
        name: 'Parallel ♭VI Mediant',
        roman: '♭VI',
        plain: 'Dark, cinematic plunge into the flat-sixth from parallel minor',
        theory: 'Modal borrowing of ♭VI (e.g. A♭ in C major)',
        semitones: 8,
        quality: 'maj',
      },
      {
        id: 'radiohead-minor-iv',
        name: 'Minor iv Fade',
        roman: 'iv',
        plain: 'Plunges the IV into minor iv for that haunting Thom Yorke descent',
        theory: 'Borrowed minor iv (e.g. Fm in C major)',
        semitones: 5,
        quality: 'min',
      },
    ],
  },
  nirvana: {
    id: 'nirvana',
    name: 'Nirvana',
    color: '#F2A79B',
    font: "'Rock Salt', cursive",
    weight: 400,
    pillFs: 10,
    pillTrack: '0',
    presetId: 'stab',
    rhythmStyle: 'heavy_strum',
    defaultBpm: 118,
    tagline: 'Moves the root in visceral jumps with raw parallel power chords',
    theoryTagline: 'Minor third and tritone root jumps, parallel chromatic triads, open 5ths',
    plain: 'moves the root in big jumps and leaves the middle empty',
    theory: 'power-chord roots by minor third and tritone — no thirds, so major or minor stays open',
    sig: [
      { k: 'Motion', v: 'Roots jump by minor third and tritone instead of stepping.' },
      { k: 'Voicing', v: 'Power chords with no third, so major or minor stays undecided.' },
      { k: 'Space', v: 'The middle register is left empty; the weight is at the bottom.' },
    ],
    hoist: ['A♭', 'E♭maj7', 'B♭'],
    genre: 'Rock',
    mood: 'Dark',
    favoredKeys: ['E', 'D', 'F', 'C', 'A'],
    favoredScales: ['NATURAL_MINOR', 'DORIAN', 'HARMONIC_MINOR'],
    favoredMoods: ['Dark', 'Tense'],
    basisArchetypes: [
      ['C', 'Eb', 'Ab', 'F', 'C', 'Eb', 'Ab', 'F'],
      ['C', 'F', 'Eb', 'Ab', 'C', 'F', 'Eb', 'Ab'],
      ['Am', 'F', 'D', 'F', 'Am', 'F', 'D', 'G'],
    ],
    cMajorBasisChords: ['C', 'Eb', 'Ab', 'F', 'C', 'Eb', 'Ab', 'F'],
    signatureTricks: [
      {
        id: 'nirvana-biii',
        name: 'Parallel ♭III Shift',
        roman: '♭III',
        plain: 'Power chord slide up a minor 3rd, breaking diatonic scale rules with raw energy',
        theory: 'Symmetric minor 3rd jump (e.g. C -> E♭)',
        semitones: 3,
        quality: 'maj',
      },
      {
        id: 'nirvana-bvi',
        name: 'Parallel ♭VI Jump',
        roman: '♭VI',
        plain: 'Visceral jump to the flat 6th before dropping down to IV',
        theory: 'Parallel chromatic power motion (e.g. A♭ in C major)',
        semitones: 8,
        quality: 'maj',
      },
      {
        id: 'nirvana-bvii',
        name: 'Subtonic ♭VII Slam',
        roman: '♭VII',
        plain: 'Heavy punk rock bounce on the flat-7th',
        theory: 'Whole-step drop from tonic (e.g. B♭ in C major)',
        semitones: 10,
        quality: 'maj',
      },
    ],
  },
  'steely-dan': {
    id: 'steely-dan',
    name: 'Steely Dan',
    color: '#9CC0EC',
    font: "'Playfair Display', serif",
    weight: 700,
    italic: true,
    pillFs: 13,
    pillTrack: '0.01em',
    presetId: 'rhodes',
    rhythmStyle: 'syncopated_16ths',
    defaultBpm: 112,
    tagline: 'Adds one note that makes a plain chord sound expensive',
    theoryTagline: 'Mu-major (add9 without 7th), ii–V–I jazz chains, tritone substitutions',
    plain: 'adds one note that makes a plain chord sound expensive',
    theory: 'major triad plus 9th with no 7th, ii–V chains, tritone substitution',
    sig: [
      { k: 'Harmony', v: 'One added 9th over a plain triad, and the 7th left out.' },
      { k: 'Motion', v: 'ii–V chains that keep handing off to the next key.' },
      { k: 'Substitution', v: 'A tritone sub where the dominant was expected.' },
    ],
    hoist: ['Cmaj9', 'D♭7', 'Fm7'],
    genre: 'Jazz-ish',
    mood: 'Warm',
    favoredKeys: ['C', 'F', 'G', 'D', 'Bb', 'Eb'],
    favoredScales: ['MAJOR', 'DORIAN', 'MIXOLYDIAN'],
    favoredMoods: ['Warm', 'Peaceful'],
    basisArchetypes: [
      ['Cmaj9', 'F', 'Em7', 'A7', 'Dm7', 'G7', 'Cmaj9', 'Cmaj9'],
      ['Cmaj9', 'Dm7', 'Db7', 'Cmaj9', 'Em7', 'A7', 'Dm7', 'G7'],
      ['Cmaj9', 'Am7', 'Dm7', 'Fm7', 'Em7', 'A7', 'Dm7', 'G7'],
    ],
    cMajorBasisChords: ['Cmaj9', 'F', 'Em7', 'A7', 'Dm7', 'G7', 'Cmaj9', 'Cmaj9'],
    signatureTricks: [
      {
        id: 'steely-mu-major',
        name: 'Mu-Major (add9)',
        roman: 'I(add9)',
        plain: 'Major triad with the 2nd added right against the 3rd—the signature Donald Fagen sound',
        theory: 'Major triad + 9th with no 7th, creating smooth cluster dissonance (e.g. Cmaj9 / Cadd9)',
        semitones: 0,
        quality: 'maj9',
      },
      {
        id: 'steely-tritone-sub',
        name: 'Tritone Substitution',
        roman: 'subV7',
        plain: 'Swaps out the dominant G7 for D♭7, sliding smoothly into C by a half-step',
        theory: 'Dominant 7th a tritone away (e.g. D♭7 -> C in C major)',
        semitones: 1,
        quality: 'dom7',
      },
      {
        id: 'steely-secondary-dominant',
        name: 'Secondary VI7 Turn',
        roman: 'VI7',
        plain: 'Jazz approach chord setting up the ii-V turnaround',
        theory: 'Secondary dominant to ii (e.g. A7 -> Dm7 in C major)',
        semitones: 9,
        quality: 'dom7',
      },
    ],
  },
  'mac-demarco': {
    id: 'mac-demarco',
    name: 'Mac DeMarco',
    color: '#B8CC9E',
    font: "'Archivo Black', sans-serif",
    weight: 400,
    pillFs: 12,
    pillTrack: '-0.01em',
    presetId: 'juno-pad',
    rhythmStyle: 'slow_arpeggio',
    defaultBpm: 92,
    tagline: 'Two lush chords looped loose, bass sliding underneath',
    theoryTagline: 'Maj7 to min7 descending walkdowns, chromatic bass motion, unresolved floating feel',
    plain: 'two lush chords looped loose, bass sliding underneath',
    theory: 'maj7 vamp with chromatic bass motion, no real resolution',
    sig: [
      { k: 'Harmony', v: 'Two maj7 chords vamped, no third chord needed.' },
      { k: 'Motion', v: 'The bass slides chromatically underneath while the chords sit still.' },
      { k: 'Feel', v: 'Nothing resolves; the loop just keeps leaning.' },
    ],
    hoist: ['Fmaj7', 'Cmaj9', 'Em7'],
    genre: 'Lo-fi/Chill',
    mood: 'Warm',
    favoredKeys: ['D', 'C', 'A', 'G', 'F'],
    favoredScales: ['MAJOR', 'LYDIAN'],
    favoredMoods: ['Dreamy', 'Peaceful'],
    basisArchetypes: [
      ['Fmaj7', 'Em7', 'Dm7', 'Cmaj7', 'Fmaj7', 'G7', 'Cmaj7', 'Cmaj7'],
      ['Dm7', 'Em7', 'Fmaj7', 'Em7', 'Dm7', 'Em7', 'Fmaj7', 'G7'],
      ['Fmaj7', 'Abmaj7', 'Cmaj7', 'Em7', 'Fmaj7', 'G7', 'Cmaj7', 'Cmaj7'],
    ],
    cMajorBasisChords: ['Fmaj7', 'Em7', 'Dm7', 'Cmaj7', 'Fmaj7', 'G7', 'Cmaj7', 'Cmaj7'],
    signatureTricks: [
      {
        id: 'mac-maj7-vamp',
        name: 'Lush Maj7 Step',
        roman: 'IVmaj7',
        plain: 'Opens on a lazy, dreamy major 7th chord that floats without rushing to resolve',
        theory: 'Major 7th on the subdominant (e.g. Fmaj7 in C major)',
        semitones: 5,
        quality: 'maj7',
      },
      {
        id: 'mac-chromatic-approach',
        name: 'Chromatic Approach',
        roman: '♭VImaj7',
        plain: 'Dreamy modulation borrowed from parallel minor with chorus warble',
        theory: 'Borrowed ♭VImaj7 (e.g. A♭maj7 in C major)',
        semitones: 8,
        quality: 'maj7',
      },
      {
        id: 'mac-stepdown',
        name: 'Smooth iiim7 Stepdown',
        roman: 'iiim7',
        plain: 'Gentle stepdown connecting the IVmaj7 to iim7',
        theory: 'Diatonic minor 7th stepdown (e.g. Em7 in C major)',
        semitones: 4,
        quality: 'min7',
      },
    ],
  },
};

export const BAND_LIST = Object.values(BAND_ARCHETYPES);

export function getBandById(bandIdOrName?: string | null): BandArchetype | undefined {
  if (!bandIdOrName) return undefined;
  const norm = bandIdOrName.toLowerCase().trim().replace(/\s+/g, '-');
  return BAND_ARCHETYPES[norm] || BAND_LIST.find(b => b.name.toLowerCase() === bandIdOrName.toLowerCase().trim());
}

/**
 * Generate an authentic signature progression for a given band in ANY key and scale type.
 */
export function generateBandProgression(
  chordData: RawChordData,
  bandIdOrName?: string | null,
  targetKey: string = 'C',
  targetScaleType: string = 'MAJOR'
): Progression | null {
  if (!bandIdOrName) return null;
  const band = getBandById(bandIdOrName);
  if (!band) return null;

  // 1. Key & Scale determination:
  // If targetKey is provided and valid, respect user's key; otherwise pick from band's favored keys
  const key = (targetKey && ROOT_KEYS.includes(targetKey))
    ? targetKey
    : (band.favoredKeys && band.favoredKeys.length
        ? band.favoredKeys[Math.floor(Math.random() * band.favoredKeys.length)]
        : 'C');

  // Scale: if targetScaleType matches one of the band's favored scales or is compatible, keep it; otherwise pick from favoredScales
  const scaleType = (targetScaleType && band.favoredScales?.includes(targetScaleType))
    ? targetScaleType
    : (band.favoredScales && band.favoredScales.length
        ? band.favoredScales[Math.floor(Math.random() * band.favoredScales.length)]
        : 'MAJOR');

  // Mood: pick from band's favored moods
  const mood = (band.favoredMoods && band.favoredMoods.length)
    ? band.favoredMoods[Math.floor(Math.random() * band.favoredMoods.length)]
    : band.mood;

  let progression: Progression | null = null;

  // 2. Dynamic generation: 50% Markov-based with signature trick insertion, 50% template pool with mutation
  const tryMarkov = Math.random() < 0.5;

  if (tryMarkov) {
    try {
      const baseProg = generateProgression(chordData, band.genre, mood, {
        key,
        scaleType,
        length: 8,
      });

      if (baseProg && baseProg.chords.length === 8) {
        // Intelligently weave 1 or 2 signature tricks into strategic bars (e.g. bar 3 or 4, bar 6 or 7)
        const targetSlot = Math.random() < 0.5 ? 2 : 3;
        const secondSlot = Math.random() < 0.5 ? 5 : 6;
        const slotsToInject = [targetSlot];
        if (Math.random() < 0.6) {
          slotsToInject.push(secondSlot);
        }

        const requestedChords: RequestedChord[] = baseProg.chords.map((c, idx) => {
          if (slotsToInject.includes(idx) && band.signatureTricks.length > 0) {
            const trick = band.signatureTricks[Math.floor(Math.random() * band.signatureTricks.length)];
            const resolved = resolveBandTrickForScale(trick, key, scaleType);
            const { root, suffix } = splitChordRootAndSuffix(resolved.chordName);
            let quality = suffix || 'maj';
            if (quality === 'm') quality = 'min';
            return { root, quality };
          }
          const { root, suffix } = splitChordRootAndSuffix(c.name);
          let quality = suffix || 'maj';
          if (quality === 'm') quality = 'min';
          return { root, quality };
        });

        progression = alignChordsToScale(
          chordData,
          key,
          scaleType,
          requestedChords,
          band.genre,
          mood
        );
      }
    } catch {
      progression = null;
    }
  }

  // Fallback or alternate generation branch: pick from the band's curated basis archetypes + stochastic mutation
  if (!progression) {
    const templates = (band.basisArchetypes && band.basisArchetypes.length > 0)
      ? band.basisArchetypes
      : [band.cMajorBasisChords];

    const chosenTemplate = [...templates[Math.floor(Math.random() * templates.length)]];

    // With 40% probability, mutate one bar with a signature trick
    if (Math.random() < 0.4 && band.signatureTricks.length > 0) {
      const mutIdx = Math.floor(Math.random() * (chosenTemplate.length - 1)) + 1; // don't mutate bar 1
      const trick = band.signatureTricks[Math.floor(Math.random() * band.signatureTricks.length)];
      const cTrick = resolveBandTrickForScale(trick, 'C', 'MAJOR');
      chosenTemplate[mutIdx] = cTrick.chordName;
    }

    const keyPc = PITCH_CLASS[key] ?? 0;
    const cPc = PITCH_CLASS['C'] ?? 0;
    const semitonesDelta = ((keyPc - cPc) % 12 + 12) % 12;
    const preferFlat = preferFlatSpelling(key, scaleType);

    const requestedChords: RequestedChord[] = chosenTemplate.map(cSymbol => {
      const transposed = transposeChordName(cSymbol, semitonesDelta, preferFlat);
      const { root, suffix } = splitChordRootAndSuffix(transposed);
      let quality = suffix || 'maj';
      if (quality === 'm') quality = 'min';
      return { root, quality };
    });

    progression = alignChordsToScale(
      chordData,
      key,
      scaleType,
      requestedChords,
      band.genre,
      mood
    );
  }

  if (!progression) return null;

  return {
    ...progression,
    genre: band.genre,
    mood,
    bpm: band.defaultBpm,
  };
}

/**
 * Dynamically resolves a BandTrick into concrete chord details for the given key and scale type.
 */
export function resolveBandTrickForScale(
  trick: BandTrick,
  key: string,
  scaleType: string
): { chordName: string; root: string; quality: string; roman: string } {
  const keyPc = PITCH_CLASS[key] ?? 0;
  const scalePreferFlat = preferFlatSpelling(key, scaleType);
  const rootPc = ((keyPc + trick.semitones) % 12 + 12) % 12;

  // Flattened Roman degrees (♭VII, ♭III, ♭VI, ♭II, subV) should always be spelled with flats
  const trickPrefersFlat =
    trick.roman.includes('♭') ||
    trick.roman.includes('b') ||
    trick.roman.includes('subV') ||
    scalePreferFlat;

  const chordRoot = noteName(rootPc, trickPrefersFlat);

  let suffix = '';
  switch (trick.quality) {
    case 'maj': suffix = ''; break;
    case 'min': suffix = 'm'; break;
    case 'dom7': suffix = '7'; break;
    case 'min7': suffix = 'm7'; break;
    case 'maj7': suffix = 'maj7'; break;
    case 'maj9': suffix = 'maj9'; break;
    case 'sus4': suffix = 'sus4'; break;
    default: suffix = trick.quality; break;
  }

  return {
    chordName: `${chordRoot}${suffix}`,
    root: chordRoot,
    quality: trick.quality,
    roman: trick.roman,
  };
}

/**
 * Checks whether an existing ChordBlock matches any signature trick of an active band.
 */
export function matchChordToBandTrick(
  chord: ChordBlock,
  key: string,
  scaleType: string,
  bandIdOrName?: string | null
): MatchedBandTrick | null {
  if (!bandIdOrName) return null;
  const band = getBandById(bandIdOrName);
  if (!band) return null;

  const keyPc = PITCH_CLASS[key] ?? 0;
  const preferFlat = preferFlatSpelling(key, scaleType);

  for (const trick of band.signatureTricks) {
    const targetRootPc = ((keyPc + trick.semitones) % 12 + 12) % 12;
    const targetRoot = noteName(targetRootPc, preferFlat);
    const { root: chordRoot, suffix } = splitChordRootAndSuffix(chord.name);

    const rootMatches = (PITCH_CLASS[chordRoot] ?? -1) === targetRootPc;
    const romanMatches = chord.roman && (chord.roman === trick.roman || chord.roman.includes(trick.roman));

    // Quality match check
    let qualityMatches = false;
    if (trick.quality === 'dom7' && (suffix === '7' || chord.name.includes('7'))) qualityMatches = true;
    else if (trick.quality === 'min' && (suffix === 'm' || suffix === 'min')) qualityMatches = true;
    else if (trick.quality === 'maj' && (suffix === '' || suffix === 'maj')) qualityMatches = true;
    else if (trick.quality === 'maj7' && (suffix === 'maj7')) qualityMatches = true;
    else if (trick.quality === 'maj9' && (suffix === 'maj9' || suffix === 'add9')) qualityMatches = true;

    if ((rootMatches && qualityMatches) || romanMatches) {
      return {
        bandId: band.id,
        bandName: band.name,
        trickName: trick.name,
        plain: trick.plain,
        theory: trick.theory,
        badge: `${band.name} · ${trick.name}`,
        color: band.color,
        trick,
      };
    }
  }

  return null;
}

/**
 * Generates substitution candidates for a chord slot based on the active band's signature tricks.
 */
export function getBandTrickCandidates(
  key: string,
  scaleType: string,
  bandIdOrName?: string | null
): BandTrickCandidate[] {
  if (!bandIdOrName) return [];
  const band = getBandById(bandIdOrName);
  if (!band) return [];

  const keyPc = PITCH_CLASS[key] ?? 0;
  const preferFlat = preferFlatSpelling(key, scaleType);

  return band.signatureTricks.map(trick => {
    const resolved = resolveBandTrickForScale(trick, key, scaleType);
    const rootPc = PITCH_CLASS[resolved.root] ?? 0;

    // Standard intervals for notes
    const intervals: number[] = trick.quality === 'min' ? [0, 3, 7]
      : trick.quality === 'dom7' ? [0, 4, 7, 10]
      : trick.quality === 'min7' ? [0, 3, 7, 10]
      : trick.quality === 'maj7' ? [0, 4, 7, 11]
      : trick.quality === 'maj9' ? [0, 2, 4, 7]
      : [0, 4, 7];

    const effectivePreferFlat = preferChordFlatSpelling(resolved.root, trick.quality, preferFlat);
    const notes = intervals.map(iv => noteName(rootPc + iv, effectivePreferFlat));

    return {
      trick,
      chordName: resolved.chordName,
      roman: resolved.roman,
      notes,
      plain: trick.plain,
      theory: trick.theory,
      tension: trick.quality === 'dom7' ? 0.65 : trick.semitones === 4 ? 0.55 : 0.4,
    };
  });
}

export interface BandWordmark {
  l1?: string;
  l2?: string;
  font: string;
  weight?: number;
  italic?: boolean;
  pillFs: number;
  pillTrack: string;
}

export const BAND_WORDMARKS: Record<string, BandWordmark> = {
  Oasis: { l1: 'OA', l2: 'SIS', font: 'Anton, sans-serif', pillFs: 13, pillTrack: '0.08em' },
  Radiohead: { l1: 'RADIO', l2: 'HEAD', font: "'Space Mono', monospace", pillFs: 12.5, pillTrack: '0.02em', weight: 700 },
  Nirvana: { l1: 'NIR', l2: 'VANA', font: "'Rock Salt', cursive", pillFs: 10, pillTrack: '0', weight: 400 },
  'Steely Dan': { l1: 'STEELY', l2: 'DAN', font: "'Playfair Display', serif", pillFs: 13, pillTrack: '0.01em', weight: 700, italic: true },
  'Mac DeMarco': { l1: 'mac', l2: 'demarco', font: "'Archivo Black', sans-serif", pillFs: 12, pillTrack: '-0.01em', weight: 400 },
  'The Beatles': { l1: 'THE', l2: 'BEATLES', font: "'Plus Jakarta Sans', sans-serif", pillFs: 12.5, pillTrack: '0.03em', weight: 800 },
};

export interface BandMoveTrick {
  roman: string;
  chord: string; // C major basis
  name: string;
  role: 'Tonic' | 'Subdominant' | 'Dominant' | 'Borrowed' | 'Mediant';
  semitones: number;
  quality: string;
}

export const BAND_MOVES: Record<string, BandMoveTrick[]> = {
  Oasis: [
    { roman: '♭III', chord: 'E♭maj7', name: 'Borrowed ♭III', role: 'Borrowed', semitones: 3, quality: 'maj7' },
    { roman: 'IV', chord: 'Fmaj7', name: 'Plagal landing', role: 'Subdominant', semitones: 5, quality: 'maj7' },
    { roman: '♭VI', chord: 'A♭', name: 'Borrowed ♭VI', role: 'Borrowed', semitones: 8, quality: 'maj' },
  ],
  Radiohead: [
    { roman: '♭VI', chord: 'A♭maj7', name: 'Chromatic mediant', role: 'Borrowed', semitones: 8, quality: 'maj7' },
    { roman: '♭III', chord: 'E♭maj7', name: 'Modal mixture', role: 'Borrowed', semitones: 3, quality: 'maj7' },
    { roman: 'iii', chord: 'Em7', name: 'A third away', role: 'Mediant', semitones: 4, quality: 'min7' },
  ],
  Nirvana: [
    { roman: '♭VI', chord: 'A♭', name: 'Minor-third jump', role: 'Borrowed', semitones: 8, quality: 'maj' },
    { roman: '♭III', chord: 'E♭maj7', name: 'Flat-third root', role: 'Borrowed', semitones: 3, quality: 'maj7' },
    { roman: '♭VII', chord: 'B♭', name: 'Root drops away', role: 'Borrowed', semitones: 10, quality: 'maj' },
  ],
  'Steely Dan': [
    { roman: 'I9', chord: 'Cmaj9', name: 'Added 9th', role: 'Tonic', semitones: 0, quality: 'maj9' },
    { roman: '♭II7', chord: 'D♭7', name: 'Tritone sub', role: 'Borrowed', semitones: 1, quality: 'dom7' },
    { roman: 'iv', chord: 'Fm7', name: 'Minor iv', role: 'Borrowed', semitones: 5, quality: 'min7' },
  ],
  'Mac DeMarco': [
    { roman: 'IV', chord: 'Fmaj7', name: 'maj7 vamp', role: 'Subdominant', semitones: 5, quality: 'maj7' },
    { roman: 'I9', chord: 'Cmaj9', name: 'Add the 9th', role: 'Tonic', semitones: 0, quality: 'maj9' },
    { roman: 'iii', chord: 'Em7', name: 'Never resolves', role: 'Mediant', semitones: 4, quality: 'min7' },
  ],
  'The Beatles': [
    { roman: 'iv', chord: 'Fm', name: 'Minor iv fade', role: 'Borrowed', semitones: 5, quality: 'min' },
    { roman: 'III7', chord: 'E7', name: 'Major III lift', role: 'Dominant', semitones: 4, quality: 'dom7' },
    { roman: 'II7', chord: 'D7', name: 'Take the II7', role: 'Subdominant', semitones: 2, quality: 'dom7' },
  ],
};

export interface ResolvedBandMove {
  roman: string;
  chord: string;
  name: string;
  role: string;
  semitones: number;
}

/**
 * Finds the most appropriate band move for a given chord in the active key and scale,
 * skipping any move that is already identical to the chord.
 */
export function getBandMoveForChord(
  chord: { name: string; functionLabel?: string },
  bandNameOrId: string,
  key: string = 'C',
  scaleType: string = 'MAJOR'
): ResolvedBandMove | null {
  const band = getBandById(bandNameOrId);
  if (!band) return null;
  const moves = BAND_MOVES[band.name] || BAND_MOVES[band.id];
  if (!moves || !moves.length) return null;

  const resolvedList: ResolvedBandMove[] = moves.map(m => {
    const res = resolveBandTrickForScale(
      { id: m.name, name: m.name, roman: m.roman, plain: '', theory: '', semitones: m.semitones, quality: m.quality },
      key,
      scaleType
    );
    return {
      roman: m.roman,
      chord: res.chordName,
      name: m.name,
      role: m.role,
      semitones: m.semitones,
    };
  });

  const fn = String(chord.functionLabel || '');
  let want = 1;
  if (/^Subdominant/.test(fn)) want = 1;
  else if (/Dominant/.test(fn)) want = resolvedList.length - 1;
  else if (/^Tonic/.test(fn)) want = 0;

  const order = [want].concat(resolvedList.map((_, i) => i).filter(i => i !== want));
  for (let k = 0; k < order.length; k++) {
    const candidate = resolvedList[order[k]];
    if (candidate && candidate.chord !== chord.name) {
      return candidate;
    }
  }
  return null;
}

