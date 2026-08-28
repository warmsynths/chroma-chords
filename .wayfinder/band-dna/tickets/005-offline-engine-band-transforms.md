# T5: Offline Engine Band Transforms & Voicing Bias

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Blocked by T1, T2

## Question

How do we implement deterministic offline Band Mode generator rules in `chord-engine.ts` (e.g. Markov biasing, template selection, and post-generation chromatic substitutions like swapping diatonic iii for Major III or injecting bVII) and Tone.js playback voicings (e.g. anchored D4/G4 pedal drones for Oasis) when working offline without LLM network calls?
