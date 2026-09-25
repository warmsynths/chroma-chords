# T5: Dynamic Band Tricks in Chord Inspector & Card Badges

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Completed

## Question

How do we integrate dynamic, key-aware band trick suggestions into the Chord Inspector / Swap Sheet when a user inspects a chord, replacing the hardcoded string matching with rich explanations (why Noel Gallagher uses Major III or why Lennon/McCartney use minor iv)? How do chord pads display badges when they contain a band trick?

## Resolution

1. **Card Badges**: In `LoopScreen.renderChordPad`, chords are evaluated against the active band's signature tricks via `matchChordToBandTrick(c, key, scaleType, selectedBand)`. When matched, a pill badge (`★ [Trick Name]`) is rendered in `pad-top-row` with tooltip explanations in both plain and theory modes.
2. **Dedicated Swap Family**: In `LoopScreen.getSwapFeelings`, when a band is active, a `${activeBand.name} Tricks` feeling group is generated dynamically using `getBandTrickCandidates(key, scaleType, activeBand.name)`. It is unshifted to the very first position of the swap lane options.
3. **Automatic Inspector Focus**: `openSwap(index)` automatically sets `activeSwapFamily = `${activeBand.name} Tricks``, immediately presenting the user with band tricks tailored to their current key and scale.
4. **Verified**: Validated with happy-dom component tests in `band-dna-interactions.test.ts` and interactive browser session.
