# Chroma Chords — Domain Glossary

This domain glossary defines the terms and conceptual models used across the Chroma Chords codebase.

## Core Concepts

### Progression
A musical chord sequence comprising an array of `ChordBlock` objects, along with musical parameters: key, scale type, BPM, genre, and mood.

### ChordBlock
An individual chord element within a progression containing root pitch, quality (e.g. `maj`, `min7`), extension, voicing, and specific note array representation.

### SongSection
A structural section of a song (e.g. Verse, Chorus, Bridge) derived from a base progression via a section permutation template.

### Band DNA Profile (`BandProfile`)
An archetype configuration defining artist-specific songwriting tricks and harmonic tendencies (Oasis, Radiohead, Nirvana, Steely Dan, Mac DeMarco). Encapsulates non-diatonic scale degree preservation (e.g. Major $III$, minor $iv$, chromatic mediants, mu major 9ths), hoisted signature chord lists, custom UI typography/color tokens, and plain-language vs. music-theory explanations. See [`BAND_MODES.md`](BAND_MODES.md) for full specification.

### MelodyTrack
A companion melodic sequence to a `Progression` consisting of an ordered collection of `MelodyNote` events, generation parameters (contour archetype, density, rhythmic subdivision, octave range), feel settings (`MelodyFeelSettings`), guide mode (`GuideMode`), and optional Band DNA melodic signature tags.

### MelodyNote
A single melodic event containing absolute timing (beat offset and duration), absolute pitch (note name, MIDI number), velocity, and a relative harmonic role tag (`root`, `3rd`, `5th`, `7th`, `tension`, `passing`, `chromatic`) pegged to the underlying `ChordBlock`.

### GuideMode
A guidance and quantization policy for user note input and editing: `'strict-chord'` (restricts/snaps notes to active chord tones and tensions), `'scale-key'` (restricts/snaps to the diatonic or modal scale of the key), or `'free'` (unconstrained chromatic plotting with real-time harmonic role labeling).

### MelodyFeelSettings (`MelodyHumanState`)
Melody-specific humanization parameters paralleling chord feel settings: `humanVariance` (microtiming drift), `swing` (8th/16th shuffle offset), `velocityDrift` (human touch dynamic curve), `gateRatio` (staccato vs. legato hold duration), and `glide` (portamento pitch glide between adjacent notes).

## Architectural Seams & Modules

### Melody Engine (`MelodyEngine`)
A deep module encapsulating melodic generation, harmonic contour algorithms, chord-scale pitch mapping, Markov rhythmic cell assembly, adaptive chord-change re-harmonization, and Band DNA melodic trick injection behind a clean generation and mutation API.

### Project Storage (`ProjectStorageManager`)
A deep module hiding local storage persistence, Google OAuth authentication, Cloudflare D1 cloud synchronization, and tombstone merge algorithms behind a unified interface (`ProjectStorage`).

### Playback Engine (`PlaybackEngine`)
A deep module encapsulating Web Audio scheduling, active chord step advancement, autoplay interval timers, and pitch note mapping behind a simple control interface (`play()`, `stop()`, `seek()`).

### Prompt Classifier (`PromptClassifier`)
A deep module that resolves freeform natural language text prompts into structured `Progression` suggestions by combining instant local keyword heuristic classification with cloud LLM resolution adapters.

### Song Arranger (`SongArranger`)
A deep module encapsulating song section template reordering algorithms and active progression section synchronization.

### Band Registry (`BandRegistry`)
A typed registry (`BANDS` in [`src/components/loop-screen.ts`](src/components/loop-screen.ts#L31)) and heuristic engine integration (`alignChordsToScale` in [`src/services/chord-engine.ts`](src/services/chord-engine.ts#L1265)) that provides non-diatonic chord preservation, signature chord hoisting in the Swap Sheet, prompt keyword extraction, and styled UI banner feedback.

