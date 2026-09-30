# Specification: Chroma Chords Melody Engine & Mechanics

**Status**: Ready for Implementation (`ready-for-agent`)
**Domain Context**: [Chroma Chords Domain Glossary](file:///e:/work/chroma-chords/CONTEXT.md)
**Wayfinder Reference**: [.wayfinder/melody-engine/map.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/map.md)

---

## 1. Problem Statement

Chroma Chords has a sophisticated chord progression engine featuring diatonic and modal scale degrees, idiomatic structural templates, Markov transition probabilities, mood bias re-weighting, and signature Band DNA harmonic substitutions. However, it currently generates only chord voicings. Songwriters and producers composing top-lines, lead riffs, counter-melodies, or hooks must switch to external DAWs or plot notes without chord-scale awareness.

Without an equally intelligent melody engine:
1. Melodies either clash harshly with underlying non-diatonic or borrowed chords (such as minor $iv$ or chromatic mediants).
2. Random or naive generative notes lack musical phrasing, contour arcs, breathing rests, and genre-authentic rhythm.
3. Users who plot their own notes have no intelligent guidance system (`strict-chord`, `scale-key`, or `free`) or real-time harmonic analysis of their note choices.
4. Changing a chord in a progression breaks the top-line unless an adaptive re-alignment system understands chord-tone relationships.

---

## 2. Solution & Architectural Overview

The **Melody Engine** (`src/services/melody-engine.ts`) is a deep module operating as a companion to the progression engine. It combines:
1. **Chord-Scale Harmonic Matrix**: Maps every beat and chord quality (maj, min, dom7, min7, maj7, dim, aug, add9, sus4, etc.) to prioritized chord tones, color extensions (9th, 11th, #11, 13th), scale tones, and clash avoidance rules.
2. **Contour Archetype Shaper**: Directs pitch motion along expressive curves (*Arch*, *Ascending Climax*, *Call & Response*, *Descending Sigh*, *Ostinato Riff*, *Anthem Hook*).
3. **Markov Rhythmic Cell Vocabulary**: Assembles 16th-note rhythmic patterns, syncopations, and space scaled smoothly by a 0–100 density parameter.
4. **Band DNA Melodic Signatures**: Applies artist-specific songwriting habits (e.g. Oasis high drone vocal chant, Beatles descending chromatic stepdowns, Radiohead haunting leaps, Steely Dan syncopated 9ths, Nirvana raw riffs).
5. **Interactive Note Guidance & Analysis**: Enables user note plotting with 3 guide modes (`strict-chord`, `scale-key`, `free`), live harmonic role labeling, and collision analysis.
6. **Adaptive Re-Harmonization**: When chords change, `alignMelodyToChords` recalculates chord-tone roles and adapts pitches non-destructively.
7. **Human MIDI & Feel Dynamics**: Employs dedicated melody feel settings (`humanVariance`, `swing`, `velocityDrift`, `gateRatio`, `glide`).
8. **Sonic Synthesis & Multi-Track Export**: Separate Tone.js lead synth channel with presets, playback loop sync, and Type 1 multi-track MIDI / dual-stem WAV export.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Melody Engine API                            │
│                                                                        │
│  generateMelody()  │  alignMelodyToChords()  │  spiceWithBandTrick()  │
│  regenerateBar()   │  snapNoteToGuide()      │  analyzeMelodyNote()   │
│  mutateMelody()    │  shiftOctave()          │  validateMelody()      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│ Chord-Scale Matrix    │ │ Contour & Phrasing    │ │ Band DNA Melodic      │
│ - Chord tones (1,3,5,7│ │ - Arch, Climax, Sigh  │ │   Signatures          │
│ - Extensions (9,11,13)│ │ - 16th Rhythmic Cells │ │ - Oasis, Beatles      │
│ - Avoidance & Clashes │ │ - Density (0-100)     │ │ - Radiohead, Nirvana  │
└───────────────────────┘ └───────────────────────┘ └───────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Data Model: MelodyTrack                         │
│   notes: MelodyNote[] (beat, pitch, duration, velocity, chordRole)     │
│   guideMode: 'strict-chord' | 'scale-key' | 'free'                     │
│   feelSettings: MelodyFeelSettings (jitter, swing, dynamics, gate)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    ▼                                                               ▼
┌───────────────────────────────────────┐       ┌───────────────────────────────────────┐
│        Audio Service (Tone.js)        │       │             Export Service            │
│  - Dedicated Lead Synth Voice Channel │       │  - Standard Type 1 2-Track MIDI File  │
│  - Presets (Lead, Pluck, Sine, etc.)  │       │  - Track 1: Chords, Track 2: Melody  │
│  - Playback Loop Sync, Volume, Solo   │       │  - Combined & Stems WAV Render        │
└───────────────────────────────────────┘       └───────────────────────────────────────┘
```

---

## 3. Data Structures & Domain Models

### 3.1 `MelodyNote`
```typescript
export type ChordToneRole =
  | 'root'
  | '3rd'
  | '5th'
  | '7th'
  | 'tension'   // 9th, 11th, 13th
  | 'passing'   // diatonic scale degree between chord tones
  | 'chromatic' // non-scale chromatic passing or enclosure tone
  | 'drone';    // static held pedal note

export interface MelodyNote {
  id: string;
  stepInBar: number;      // 0 to 15 (16th-note step within current bar)
  barIndex: number;       // 0 to progression.chords.length - 1
  beatOffset: number;     // absolute beat position from start of progression (e.g. 0.0, 1.25)
  durationBeats: number;  // duration in quarter notes (e.g. 0.25 = 16th, 0.5 = 8th, 1.0 = quarter)
  pitch: string;          // scientific pitch notation (e.g. 'E5', 'C#4', 'G4')
  midi: number;           // MIDI pitch number (e.g. 60 = C4, 76 = E5)
  velocity: number;       // 1 to 127
  chordToneRole: ChordToneRole;
  isClash?: boolean;      // flag for harsh minor-second rub against active chord third
  tag?: string;           // optional stylistic tag (e.g. 'band-oasis-drone', 'blue-note')
}
```

### 3.2 `GuideMode`
```typescript
export type GuideMode =
  | 'strict-chord' // Notes strictly constrained to current ChordBlock notes & safe extensions
  | 'scale-key'     // Notes constrained to the progression's overarching diatonic or modal scale
  | 'free';         // Unconstrained 12-TET chromatic plotting with real-time harmonic tagging
```

### 3.3 `MelodyFeelSettings`
```typescript
export interface MelodyFeelSettings {
  humanVariance: number; // 0.0 to 1.0: microtiming jitter (push/pull in seconds)
  swing: number;         // 0 to 100%: 16th-note shuffle delay
  velocityDrift: number; // 0.0 to 1.0: human touch dynamic variation & downbeat accents
  gateRatio: number;     // 0.2 to 1.5: articulation duration multiplier (staccato to legato)
  glide: number;         // 0.0 to 0.15s: portamento pitch glide between adjacent notes
}
```

### 3.4 `MelodyTrack`
```typescript
export type ContourArchetype =
  | 'Arch'              // Rises to peak around bar 3, then descends to resolve
  | 'AscendingClimax'   // Starts low, climbs across bars to high climax
  | 'DescendingSigh'    // Starts high and emotional, gently steps down
  | 'CallAndResponse'   // 2-bar question (ends unstable), 2-bar answer (resolves)
  | 'OstinatoRiff'      // Punchy 1-2 bar repeating rhythmic motif with harmonic shifts
  | 'AnthemHook';       // High-register soaring hook with syncopated anticipations

export interface MelodyTrack {
  id: string;
  progressionId?: string;
  notes: MelodyNote[];
  contour: ContourArchetype;
  density: number;          // 0 to 100 (sparse ambient to busy arp/riff)
  octave: number;           // 3, 4, or 5 (default 4/5 for lead)
  guideMode: GuideMode;
  feelSettings: MelodyFeelSettings;
  presetId: string;         // e.g. 'lead-synth', 'warm-pluck', 'lofi-sine', 'electric-lead'
  volume: number;           // 0 to 100
  muted: boolean;
  solo: boolean;
  bandId?: string;          // optional active Band DNA signature
}
```

---

## 4. Music Theory & Chord-Scale Harmonic Matrix

For any chord in the progression, notes are prioritized by their metric position and harmonic function:

### 4.1 Metric Weighting
- **Strong Metric Beats (Beats 1 & 3 in 4/4)**:
  - 85% probability of landing on a Primary Chord Tone ($1, 3, 5, 7$).
  - 15% probability of landing on a consonant tension ($9, 13$ on Major; $9, 11$ on Minor).
- **Secondary Metric Beats (Beats 2 & 4 in 4/4)**:
  - 50% Chord Tone, 35% Consonant Tension, 15% Diatonic Passing Tone.
- **Off-Beats / 16th-Note Subdivisions**:
  - Diatonic scale steps, approach notes, and chromatic passing tones allowed to create fluid melodic motion.

### 4.2 Chord-Quality Pitch Class Mapping
| Chord Quality | Chord Tones (Strong) | Acceptable Color Tensions | Avoid Tones (Clashes) |
| :--- | :--- | :--- | :--- |
| **`maj` / `maj7` / `maj9`** | Root, 3, 5, 7 | 9 (add2), #11 (Lydian), 13 (6th) | Perfect 4th (natural 11) over major 3rd (creates minor 9th clash) |
| **`min` / `min7` / `min9`** | Root, $\flat3$, 5, $\flat7$ | 9, 11 (4th), 13 (Dorian) | $\flat6$ over natural 6 unless specifically in Aeolian context |
| **`dom7` / `dom9`** | Root, 3, 5, $\flat7$ | 9, #11, 13, $\flat9, \sharp9$ | Major 7th (clashes with dominant $\flat7$) |
| **`dim` / `dim7`** | Root, $\flat3, \flat5, (\flat\flat7)$ | $\flat9, 11, \flat13$ | Natural 5th |
| **`aug`** | Root, 3, $\sharp5$ | 9, $\sharp11$ | Natural 5th |
| **`sus4` / `sus2`** | Root, 4 (or 2), 5 | $\flat7, 9$ | Major 3rd (negates suspension) |

### 4.3 Melodic Stepwise Motion & Leap Rules
- **Conjunct Motion (Steps)**: 70–80% of melodic intervals are major or minor 2nds ($1$ or $2$ semitones).
- **Disjunct Motion (Leaps)**: 20–30% are 3rds, 4ths, 5ths, or octaves.
- **Leap Recovery**: Any leap of $\ge 5$ semitones must be followed by stepwise motion in the opposite direction (classical and pop voice-leading rule).

---

## 5. Contour Archetypes & Rhythmic Vocabulary

### 5.1 Contour Trajectories
```
1. Arch:               2. Ascending Climax:    3. Call & Response:
       ▲                      ▲                     ▲       ▲
      / \                    /                     / \     / \
     /   \                  /                     /   ▼   /   ▼
    /     ▼                /                     Q (bar 1-2) A (bar 3-4)

4. Descending Sigh:    5. Ostinato Riff:       6. Anthem Hook:
    ▲                      ┌─┐ ┌─┐ ┌─┐             ▲───────▲
     \                     │ │ │ │ │ │            /         \
      \                    └─┘ └─┘ └─┘           /           ▼
       ▼                   (1-bar repeat)        (Syncopated high vocal)
```

### 5.2 Density Scale (0 to 100)
- **`0 – 25` (Sparse / Ambient)**:
  - 1–2 notes per bar. Note values are half notes, dotted quarters, and whole notes.
  - Large resting gaps allowing the chord progression and reverb to breathe.
- **`26 – 60` (Topline Hook / Vocal Lead)**:
  - 3–6 notes per bar. Rhythmic mix of dotted 8ths, syncopated 8th notes, and quarter notes.
  - Typical pop/indie phrasing with breath pauses at bar ends.
- **`61 – 100` (Driving Riff / Lead Arp)**:
  - 8–16 notes per bar. Rapid 16th-note sequences, arpeggiated outlines, octave jumps, and syncopated rhythmic bursts.

---

## 6. Band DNA Melodic Signatures

When a Band DNA profile is active or `spiceWithBandTrick` is triggered, the engine injects authentic artist habits:

| Artist | Melodic Habits | Signature Trick Implementation |
| :--- | :--- | :--- |
| **Oasis** | Anthemic stadium vocal chant; repetitive 3-note pentatonic motifs; high tonic/fifth drone anchor. | Locks high $G4$ or $D5$ pedal note that rings over shifting chord changes; leaps to soaring major 3rd on upbeat. |
| **The Beatles** | Bittersweet chromatic descending lines; elegant stepwise counterpoint; interval leaps into chord thirds. | Generates chromatic half-step descent ($8 \to 7 \to \flat7 \to 6$) over plagal $IV \to iv \to I$ turnaround. |
| **Radiohead** | Haunting high falsetto leaps; eerie minor second oscillations; sparse unresolved suspensions. | Wide minor-seventh or octave leap landing on an unresolved 9th or 11th; eerie two-note semitone trill. |
| **Nirvana** | Raw minor pentatonic riffs; dissonant semitone slides; heavy downbeat octave unisons. | 3-note repeating grunge hook; slides from chromatic passing tone into minor 3rd; aggressive root unisons. |
| **Steely Dan** | Syncopated jazz phrasing; upper extensions ($9, 11, 13$); sharp chromatic enclosures. | Approaches chord 3rd or 5th via upper and lower chromatic neighbor tones; lands on un-resolved 9th with syncopated 16th swing. |
| **Mac DeMarco** | Lazy syncopated melodies; carefree major/lydian motifs; gentle descending walkdowns. | Behind-the-beat phrasing; gentle descending steps connecting $maj7$ to $min7$; slide into major 7th. |

---

## 7. Interactive Note Guidance & Snapping

For user note plotting, `melody-engine.ts` provides:

### 7.1 `snapNoteToGuide(pitch: string, time: number, mode: GuideMode, progression: Progression): string`
- In `'strict-chord'` mode: Snaps pitch to the closest pitch class in the active chord's chord tones + allowed tensions.
- In `'scale-key'` mode: Snaps pitch to the closest pitch class in the active key/scale (e.g. C Major, A Dorian).
- In `'free'` mode: Returns the exact plotted pitch without modification.

### 7.2 `analyzeMelodyNote(note: MelodyNote, progression: Progression): NoteAnalysis`
Returns:
```typescript
export interface NoteAnalysis {
  pitch: string;
  role: ChordToneRole;
  intervalFromRoot: string; // e.g. 'P1', 'm3', 'M3', 'P5', 'm7', 'M7', 'M9'
  chordName: string;        // e.g. 'Cmaj7', 'Fm'
  isClash: boolean;         // true if minor-second clash with chord third
  clashReason?: string;     // e.g. 'Natural 4th clashes with Major 3rd (E vs F)'
  suggestion?: string;      // recommended resolution pitch
}
```

---

## 8. Adaptive Chord-Change Re-harmonization

### `alignMelodyToChords(melody: MelodyTrack, newProgression: Progression): MelodyTrack`
When the user edits, swaps, or transposes a chord:
1. Notes with `chordToneRole === 'root' | '3rd' | '5th' | '7th'` are automatically shifted to the corresponding degree of the new chord.
2. Notes with `chordToneRole === 'tension'` shift to the nearest valid extension of the new chord quality.
3. Passing and chromatic notes are preserved, but evaluated for clashes. If a clash occurs, the note nudges by a half-step to the nearest consonant diatonic pitch.
4. Rhythmic timestamps, durations, and velocities are 100% preserved.

---

## 9. Melody Human MIDI Feel Engine

Paralleling the progression engine's `humanState`:
- **`humanVariance`**: Injects small gaussian timing offsets:
  $$t_{\text{playback}} = t_{\text{grid}} + \mathcal{N}(0, 1) \times \text{humanVariance} \times 0.025\text{s}$$
- **`swing`**: Delays even 16th-note steps:
  $$\Delta t_{\text{swing}} = \frac{\text{swing}}{100} \times 0.035\text{s}$$
- **`velocityDrift`**: Accents strong metric beats ($+10$ to $+18$ velocity on downbeats) with subtle per-note dynamic variance ($\pm 6$).
- **`gateRatio`**: Modulates note release timing ($duration \times gateRatio$).
- **`glide`**: Passed to Tone.js synth `portamento` property for smooth legato slides.

---

## 10. Tone.js Lead Audio Synthesis & Playback

`audio-service.ts` is extended with a dedicated **Lead Voice Channel**:
- **Independent Audio Chain**: Connects through a dedicated gain node with volume fader, mute, and solo controls, routed to master reverb and compressor.
- **Instrument Presets**:
  - `lead-synth`: `Tone.PolySynth(Tone.Synth)` with sawtooth oscillator, 24dB low-pass filter envelope, and subtle chorus.
  - `warm-pluck`: Triangle oscillator with snappy attack ($0.002\text{s}$), decay ($0.6\text{s}$), low sustain, and plate reverb.
  - `lofi-sine`: Sine oscillator with tape wobble vibrato and gentle saturation.
  - `electric-lead`: `Tone.FMSynth` configured for crystalline Rhodes/Wurlitzer bell attack.
  - `reed-lead`: Square oscillator with resonant bandpass filter and vibrato LFO.
- **Loop Sync**: Schedules note events on Tone.js Transport or synchronizes with `playback-engine.ts` interval clocks so chords and melody trigger in sample-accurate lockstep.

---

## 11. Multi-Track MIDI & Audio Stem Export

`export-service.ts` is extended to support:
1. **Format 1 Standard MIDI File**:
   - `Track 0`: Sequence name, tempo map, time signature.
   - `Track 1`: Chords (polyphonic channel 1, chord strum/arp events).
   - `Track 2`: Melody (monophonic/melodic line on channel 2 with velocity and note-off durations).
2. **Export Actions**:
   - `exportMultiTrackMidi(progression, melodyTrack)`: Combined 2-track `.mid`.
   - `exportMelodyMidi(melodyTrack)`: Dedicated melody-only `.mid`.
   - `renderDualStemWav(progression, melodyTrack)`: Offline AudioContext render producing both master mix and optional isolated melody/chord stems.

---

## 12. Public Programmatic API Specification

The primary interface exposed by `src/services/melody-engine.ts`:

```typescript
export class MelodyEngine {
  // Generation
  generateMelody(progression: Progression, options?: MelodyGenerateOptions): MelodyTrack;
  regenerateBar(melody: MelodyTrack, barIndex: number, progression: Progression): MelodyTrack;
  
  // Mutation & Styling
  mutateMelody(melody: MelodyTrack, intensity: number, progression: Progression): MelodyTrack;
  spiceWithBandTrick(melody: MelodyTrack, bandId: string, barIndex: number, progression: Progression): MelodyTrack;
  shiftOctave(melody: MelodyTrack, delta: number): MelodyTrack;
  setContour(melody: MelodyTrack, contour: ContourArchetype, progression: Progression): MelodyTrack;
  setDensity(melody: MelodyTrack, density: number, progression: Progression): MelodyTrack;
  
  // Guidance, Snapping & Analysis
  snapNoteToGuide(pitch: string, time: number, mode: GuideMode, progression: Progression): string;
  analyzeMelodyNote(note: MelodyNote, progression: Progression): NoteAnalysis;
  validateMelody(melody: MelodyTrack, progression: Progression): NoteAnalysis[];
  
  // Adaptive Re-Harmonization
  alignMelodyToChords(melody: MelodyTrack, newProgression: Progression): MelodyTrack;
  
  // Humanization
  applyHumanFeel(notes: MelodyNote[], feel: MelodyFeelSettings, bpm: number): ScheduledMelodyEvent[];
}
```

---

## 13. Verification Plan

1. **Unit Testing (`src/services/melody-engine.test.ts`)**:
   - Verify chord tone extraction for all 18 chord qualities.
   - Verify all 6 contour archetypes produce appropriate pitch direction profiles.
   - Test density scaling: density 10 produces 1–2 notes/bar; density 90 produces 10–16 notes/bar.
   - Test clash detection: detects natural 4 against major 3.
   - Test guide snapping for `'strict-chord'`, `'scale-key'`, and `'free'`.
   - Test adaptive re-alignment: swapping C into Am shifts chord tones accurately.
   - Test Band DNA signatures for all 6 launch bands.
2. **Audio & Export Verification (`audio-service.test.ts`, `export-service.test.ts`)**:
   - Verify multi-track MIDI header contains 2 tracks with correct channel events.
   - Verify Tone.js lead synth schedules without audio buffer under-runs.
