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
An archetype configuration defining artist-specific harmonic substitution tendencies (e.g., Major $III$, minor $iv$), Markov progression weights, Tone.js sound presets, and guitar/keyboard voicing patterns.

## Architectural Seams & Modules

### Project Storage (`ProjectStorageManager`)
A deep module hiding local storage persistence, Google OAuth authentication, Cloudflare D1 cloud synchronization, and tombstone merge algorithms behind a unified interface (`ProjectStorage`).

### Playback Engine (`PlaybackEngine`)
A deep module encapsulating Web Audio scheduling, active chord step advancement, autoplay interval timers, and pitch note mapping behind a simple control interface (`play()`, `stop()`, `seek()`).

### Prompt Classifier (`PromptClassifier`)
A deep module that resolves freeform natural language text prompts into structured `Progression` suggestions by combining instant local keyword heuristic classification with cloud LLM resolution adapters.

### Song Arranger (`SongArranger`)
A deep module encapsulating song section template reordering algorithms and active progression section synchronization.

### Band Registry (`BandRegistry`)
A typed registry and heuristic transformer that provides offline chord substitutions, prompt keyword extraction, and sound profile presets for artist DNA modes.
