# T7: Multi-Track MIDI & Audio Stem Export

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Open (Ready for Implementation)

## Question

How do we extend `export-service.ts` to output multi-track MIDI and dual-stem WAV audio incorporating the melody?

Specifically:
1. **Type 1 Standard MIDI File Serialization**:
   - Currently, `export-service.ts` serializes a single track MIDI file.
   - Extend the binary MIDI generator to emit a standard Format 1 MIDI file with:
     - Track 1: Chords (polyphonic chords, strum/arp events, channel 1)
     - Track 2: Melody (monophonic/melodic line, pitch bend/velocity, channel 2)
   - Allow user to export Chords Only, Melody Only, or Both.
2. **Audio Offline WAV Render**:
   - Render offline buffer incorporating both chord audio synth and lead synth audio, mixed with user volume balances.
   - Option to download separate WAV stems (chords.wav, melody.wav).

## Specification Reference

See Section 11 ("Multi-Track MIDI & Audio Stem Export") in [spec.md](file:///e:/work/chroma-chords/.wayfinder/melody-engine/spec.md).
