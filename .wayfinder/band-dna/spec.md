# Specification: Band DNA & Songwriting Trick Modes

**Status**: Ready for Agent (`ready-for-agent`)
**Domain Context**: [Chroma Chords Domain Glossary](file:///c:/reyn/Projects/chroma-chords/CONTEXT.md)
**Wayfinder Reference**: [.wayfinder/band-dna/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/band-dna/map.md)

---

## Problem Statement

When songwriters and producers use Chroma Chords to generate chord progressions via freeform text or AI assistance, the output frequently falls into repetitive, generic harmonic patterns (such as standard four-chord loops $I - V - vi - IV$ or diatonic pop cliches). Furthermore, even when an AI model suggests creative chromatic substitutions (such as Noel Gallagher's signature Major $III$ chord in a Major key, or The Beatles' minor $iv$ borrowed cadence), the underlying chord alignment engine forcibly snaps non-diatonic qualities back to rigid diatonic scale degrees (e.g. turning $E7$ in C major back into $Em$). 

Users have no direct, intuitive way to dial in the distinctive songwriting harmonic "tricks," signature voicings (e.g., anchored guitar pedal notes), and sonic playback personalities of iconic bands and artists when composing.

---

## Solution

Introduce **Band DNA Modes** (Songwriting Trick Profiles) to Chroma Chords. Users can select signature band profiles via interactive UI pills featuring authentic band logo badges or mention artists naturally in prompt queries (e.g., *"write an Oasis style progression in C"*). 

The system operates across a hybrid architecture:
1. **Engine-Level Diatonic Preservation**: Updates chord alignment logic to preserve requested chromatic qualities on diatonic roots (e.g., Major $III$, secondary dominants $II^7$, minor $iv$) and classify them accurately as borrowed/modal interchange chords rather than forcing them to diatonic scale triads.
2. **Cloud LLM Harmonic Injection**: Injects band-specific harmonic guidelines, secondary dominant tendencies, and few-shot progression examples into the LLM system prompt for nuanced, authentic chord suggestions.
3. **Deterministic Local Fallback Engine**: Enables 100% offline generation with band-specific Markov transition biasing and chromatic substitution rules.
4. **Signature Sonic Voicings & Presets**: Configures Tone.js instrument presets (e.g. acoustic guitar, vintage Rhodes, tape-chorus Juno synth) and rhythm strum patterns (e.g. driving acoustic strum with anchored $D4/G4$ drone notes, syncopated yacht-rock Rhodes).

---

## User Stories

1. As a songwriter, I want to click an "Oasis" Band DNA pill, so that generated progressions incorporate Noel Gallagher's signature Major $III$ chord, $\flat VII$ Mixolydian borrowings, and driving acoustic strumming.
2. As a musician, I want to type *"make a melancholic song like The Beatles"* into the prompt bar, so that the AI automatically activates Beatles DNA and suggests progressions featuring minor $iv$ cadences (e.g. $F \to Fm \to C$) and secondary dominant $II^7$ chords.
3. As a guitarist, I want the Oasis band mode to voice chords with high anchored pedal notes ($D4$ and $G4$ ringing open), so that playback authentically captures the acoustic sound of *Live Forever* and *Don't Look Back in Anger*.
4. As an indie producer, I want to select "Radiohead" mode, so that progressions feature chromatic mediants, minor/major ambiguity, and lush arpeggiated electric piano tones.
5. As a rock musician, I want to select "Nirvana" mode, so that chord generation utilizes parallel chromatic major leaps ($\flat VI, \flat III, \flat VII$) and punchy, aggressive distorted guitar timbres.
6. As a jazz-rock enthusiast, I want to select "Steely Dan" mode, so that progressions use $\mu$-major ($add2/add9$) voicings, slash chords ($IV/V$), and smooth Rhodes swing rhythms.
7. As a bedroom pop creator, I want to select "Mac DeMarco" mode, so that progressions generate smooth descending $maj7 \to min7$ walkdowns with warbly, chorus-laden synthesizer pads.
8. As a composer entering a prompt, I want to see crisp, high-contrast band logo badges on the quick-select pills, so that I can instantly recognize and browse artist styles visually.
9. As an offline user without an internet connection, I want Band DNA generation to work instantly using local heuristic Markov and template rules, so that I never lose creative flow when disconnected.
10. As a music theory student, I want non-diatonic chords (like $E7$ in C Major) to display accurate Roman numerals ($III^7$ or $V^7/vi$) and tension colors in the chord block UI, so that I understand why the chord works musically.
11. As a producer toggling band modes, I want the active instrument preset and rhythm play style to automatically adapt to the band's sonic aesthetic without overriding my ability to manually fine-tune them afterward.
12. As a user clearing a band selection, I want to easily deselect the active Band DNA pill to return to general genre/mood generation at any time.

---

## Implementation Decisions

### 1. Diatonic Quality Preservation & Scale Alignment
- Modify `alignChordsToScale` in the chord engine. When a requested chord matches a diatonic scale root pitch class, the engine compares the requested chord quality with the diatonic degree quality. If they differ (e.g. requested `maj`/`dom7` on degree `iii`), the engine will not blindly call `buildChordBlock`, but will construct a custom borrowed / secondary dominant `ChordBlock` with appropriate Roman numeral analysis ($III$, $III^7$, $II^7$, $iv$) and tension metadata.

### 2. Band DNA Taxonomy Specification
A typed schema defining each band archetype's musical and sonic profile:
- **Identifier**: `oasis`, `beatles`, `radiohead`, `nirvana`, `steely-dan`, `mac-demarco`
- **Display**: Band name, visual SVG badge icon, signature tagline, primary genre/mood associations
- **Harmonic Rules**: Substitution triggers (e.g. $iii \to III$, $IV \to iv$, $\flat VII$ mixolydian, chromatic mediants, $\mu$-majors)
- **Few-Shot Progression Corpus**: Authentic 8-chord progressions per band for LLM context and local template pools
- **Tone.js Sound Profile**: `presetId`, ADSR envelope overrides, filter/chorus/distortion attributes, and `rhythmStyle` mapping

### 3. Prompt Classifier & Cloud LLM Proxy
- Update `PromptClassifier` to accept an optional `bandId` parameter and scan prompt text for band keywords (e.g. "oasis", "noel gallagher", "beatles", "lennon", "mccartney", "radiohead", "thom yorke", "nirvana", "cobain", "steely dan", "fagen", "mac demarco").
- Enhance the Cloudflare Worker system prompt to include band profile directives, instructing the LLM to output accurate secondary dominants, borrowed chords, and band-specific instrument configs when a band context is active.

### 4. Local Offline Generator Biasing
- Update `generateProgression` to accept `bandId` in its options. When a band is active, the engine applies band-specific progression templates, Markov transition weights, and post-generation rule transforms (e.g. 50% chance of transforming degree $iii$ into Major $III$ in Oasis mode).

### 5. UI / Visual Badge Integration
- Introduce a `BandSelector` component in the Chroma Chords header / prompt section with smooth horizontal scrolling or wrap, featuring dark glassmorphic badge pills, authentic SVG logos, active glow indicators, and tooltips detailing the band's signature harmonic tricks.

---

## Testing Decisions

### What Makes a Good Test
- Tests must verify external behavior through public module APIs rather than testing private implementation details.
- Musical correctness tests should verify that requested chromatic chord combinations (e.g. $C \to E7 \to F$) produce valid `ChordBlock` objects with correct notes, Roman numerals, and non-destructive quality retention.

### Modules Tested
1. **Chord Alignment Engine (`chord-engine`)**:
   - Verify that `alignChordsToScale` preserves non-diatonic qualities on diatonic roots (e.g., $E$ major in C major, $D7$ in C major, $Fm$ in C major).
   - Verify that local `generateProgression` with `bandId: 'oasis'` produces valid Major III and $\flat VII$ chord structures.
2. **Prompt Classifier (`PromptClassifier` & `freetext-service`)**:
   - Verify that natural language queries containing band names correctly identify and populate the `bandId` and relevant genre/mood defaults.
   - Verify offline mock classifier outputs correct band-aligned progressions and instrument configs.
3. **Playback & Voicing Engine (`PlaybackEngine` & `audio-service`)**:
   - Verify that band instrument presets and rhythm styles map cleanly to valid Tone.js configurations without audio context exceptions.

### Prior Art
- Existing test patterns in `src/services/chord-engine.test.ts` (or equivalent test suites in the repository) testing scale degrees, borrowed chords, and progression generation.

---

## Out of Scope

- User-created custom band profile editor / builder (deferred to a subsequent release).
- Multi-track MIDI export containing separate bass/drums/lead tracks.
- Multi-band hybrid blend slider (e.g. 50% Beatles + 50% Nirvana).
- AI audio stem separation or audio sample playback outside Web Audio / Tone.js synthesis.

---

## Further Notes

- All SVG band logos will be created as clean, monochrome vector paths that adapt seamlessly to light and dark theme accents.
- The architecture is fully modular, allowing new band profiles (e.g. Queen, Daft Punk, Pink Floyd, Stevie Wonder) to be added simply by appending to the Band DNA registry.
