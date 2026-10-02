# T09: Multi-Track Export & Web MIDI Routing Modal

**Parent Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)
**Label**: `wayfinder:task`
**Status**: Blocked
**Blocked By**: [T03: Unified Transport Bar & Mobile Dock Component](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/003-unified-transport-and-mobile-dock.md), [T06: Melody Tab & MelodyGrid Sequencer Integration](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/tickets/006-melody-tab-and-grid-sequencer.md)

## Question

How should the export engine and Web MIDI routing be updated to handle multi-track outputs (Chords, Melody, Both) and channel separation in accordance with both the UI redesign and the melody engine specifications?

## Acceptance Criteria

1. Update `src/services/export-service.ts`:
   - Multi-Track Type 1 MIDI File Export:
     - Option to export `Chords`, `Melody`, or `Both`.
     - When `Both` is selected, generates a Type 1 Standard MIDI file with Track 1 = Chords and Track 2 = Melody.
   - Dual-Stem WAV Audio Rendering:
     - Exports individual or combined stems (`chords.wav`, `melody.wav`).
2. Implement `src/components/modals/midi-modal.ts`:
   - Triggered from AppHeader account menu or keyboard shortcut.
   - Device selectors for MIDI Out and MIDI In.
   - "Connect" and "Send test note" actions.
   - Per-part MIDI Channel routing:
     - Chords: Channel dropdown (default Ch 1) + internal audio toggle.
     - Melody: Channel dropdown (default Ch 2) + internal audio toggle.
   - Real-time connection status indicator dot (Green = connected, Yellow = idle, Red = error).
3. Connect share modal (`share-modal.ts`) with updated export choices.
