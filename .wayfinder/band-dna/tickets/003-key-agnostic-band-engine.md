# T3: Key-Agnostic Band Harmonic Engine & Archetype Progression Generators

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Closed (Resolved)

## Question

How do we design and implement a key-agnostic Band DNA engine (`src/services/band-dna-service.ts` or integrated in `chord-engine.ts`) that:
1. Generates authentic signature progressions for all 6 band archetypes (Oasis, Beatles, Radiohead, Nirvana, Steely Dan, Mac DeMarco) in **any** key and scale type?
2. Dynamically evaluates signature songwriting tricks (e.g. Major $III$, minor $iv$, borrowed $\flat VII$, chromatic mediants, $\mu$-majors) as harmonic substitution candidates for any chord in any key?
3. Detects whether an existing chord on the canvas matches a band trick and returns metadata (badge, trick name, plain and theory explanation)?

## Resolution

- Created `src/services/band-dna-service.ts` specifying typed band archetypes (`BAND_ARCHETYPES`), complete signature songwriting tricks, Tone.js preset/rhythm style bindings, and basis progressions for Oasis, The Beatles, Radiohead, Nirvana, Steely Dan, and Mac DeMarco.
- Implemented `generateBandProgression()` to transpose archetype progressions to any requested key/scale using `alignChordsToScale`.
- Implemented `resolveBandTrickForScale()` with automatic flat spelling for borrowed accidentals ($\flat VII, \flat III, \flat VI, \flat II, \text{subV7}$).
- Implemented `matchChordToBandTrick()` to detect whether any chord block on the canvas represents a band songwriting trick in the current key.
- Implemented `getBandTrickCandidates()` returning dynamic trick substitution options with notes, Roman analysis, and plain/theory descriptions for the Swap Sheet.
- Added comprehensive unit test suite in `src/services/band-dna-service.test.ts` (12/12 passing).
