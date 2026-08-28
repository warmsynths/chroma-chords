# 0003: Band DNA and Songwriting Trick Modes

## Context
When generating chord progressions via natural language prompts or heuristic algorithms, harmonic suggestions often defaulted to diatonic pop cliches ($I - V - vi - IV$). Furthermore, the engine's strict scale degree snapper previously forced chromatic borrowings (such as Noel Gallagher's signature Major $III$ chord in a Major key or The Beatles' minor $iv$ borrowed cadence) back to standard diatonic triads (e.g., snapping $E7$ in C major to $Em$). Additionally, users had no mechanism to dial in artist-specific voicings (e.g. anchored guitar drone pedals), instrument presets, and strum rhythms.

## Decision
We introduced **Band DNA Modes** (Songwriting Trick Profiles) across the generator, prompt classifier, and playback engine:
1. **Engine-Level Diatonic Preservation**: Refactored `alignChordsToScale` to detect intentional chromatic variations on diatonic roots ($III$, $II^7$, $iv$, $\flat VII$, chromatic mediants) and preserve them as custom borrowed / modal interchange `ChordBlock` objects with accurate Roman numeral analysis rather than snapping them to scale triads.
2. **Deterministic Offline Fallback Generator**: Embedded band profile Markov transition tables, substitution weights (e.g. $iii \to III$), and template pools in local storage for instant offline operation.
3. **Cloud LLM Harmonic Injection**: Integrated band-specific system prompts and few-shot chord corpora in the Cloudflare Worker `/api/classify` endpoint to guide AI suggestions.
4. **Sonic Profiles & Voicings**: Associated each Band DNA profile with authentic instrument presets (Tone.js synths, acoustic guitar, Rhodes) and rhythmic strumming profiles (e.g., anchored $D4/G4$ drone pedal voicings).
5. **Interactive UI Quick-Pills**: Created accessible glassmorphic band selection badges with monochrome SVG logos for rapid style switching and heuristic prompt matching.

## Consequences
- The chord engine supports non-diatonic borrowed chords and secondary dominants natively without breaking Roman numeral analysis or playback.
- Prompt classification accurately identifies band names, applying both harmonic tendencies and sonic presets automatically.
- New band profiles can be added modularly by extending the typed Band DNA registry without altering core engine logic.
