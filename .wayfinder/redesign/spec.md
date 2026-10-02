# Specification: Chroma Chords Complete UI/UX Redesign & Melody Engine Integration

**Status**: Ready for Implementation (`ready-for-agent`)
**Domain Context**: [Chroma Chords Domain Glossary](file:///c:/reyn/Projects/chroma-chords/CONTEXT.md)
**Design Reference**: [Chroma Melody.dc.html](file:///c:/reyn/Projects/chroma-chords-design/Chroma%20Melody.dc.html)
**Design Styleguide**: [Styleguide.dc.html](file:///c:/reyn/Projects/chroma-chords-design/Styleguide.dc.html)
**Design Rules**: [CLAUDE.md](file:///c:/reyn/Projects/chroma-chords-design/CLAUDE.md)
**Melody Engine Reference**: [.wayfinder/melody-engine/spec.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/melody-engine/spec.md)
**Wayfinder Map**: [.wayfinder/redesign/map.md](file:///c:/reyn/Projects/chroma-chords/.wayfinder/redesign/map.md)

---

## 1. Executive Summary & Design Vision

Chroma Chords is undergoing a comprehensive UI/UX overhaul and engine integration, unifying the application around a single, cohesive design contract inspired by the **Chroma Melody** design system.

The core layout principle is **"One skeleton for every tab"**:
Every tab in the application adheres to the exact same high-level layout hierarchy:
```
[ App Header & Tier-1 Navigation ]
              │
[ ONE Main Panel (Mood-Tinted 18% alpha, Radius 26px / 22px mobile) ]
              │
[ Unified Transport Bar (Desktop Dark Bar #2E271F / Mobile Bottom Dock) ]
```

The redesign introduces four primary tabs:
1. **Chords (`loop`)**: Harmonic chord progression generator, chord pads grid, 5-feeling swap lane with 3 tension shades, Band DNA badges, and desktop chord inspector aside.
2. **Melody (`melody`)**: 16-step per chord melodic sequencer grid (`MelodyGrid`), Tier-2 Guide Mode (`Strict` | `Guide` | `Free`), note bloom micro-keyboard popover, and Tone.js lead synth voice.
3. **Song (`song`)**: Multi-section song arranger (Verse, Chorus, Bridge, Outro) with section library on the left and drag-to-reorder timeline with repeat counters on the right.
4. **Play It (`play`)**: Interactive instrument practice station featuring 2-octave piano keyboard SVG, guitar fretboards, ukulele fretboards, scale degrees toggle, and click-to-play chord audio.

---

## 2. Design System Contract (from Styleguide & CLAUDE.md)

### 2.1 Color Palette
- **Cream Page Background**: `#FBF3E6`
- **Surface**: `#F6EADB` (nav track, card backgrounds)
- **Surface 2**: `#F1E4CC` (hover states, inactive chips)
- **Ink**: `#2E271F` (primary text, selected Tier-1 tabs, transport bar)
- **Ink Muted**: `#6B5F50` (secondary labels, subtitles)
- **Label Small-Caps**: `#8A6B3F` (uppercase headers: 10.5px / weight 800 / letter-spacing 1.2px)
- **Tension Gradient**: Settled Blue `#9CC0EC` → Tense Coral `#F2735F` (`roleForTension(tension)`)
- **Action / Playhead**: `#9B7CA8`
- **Play Button Purple**: `#C9A9E0`

### 2.2 Navigation Hierarchy
- **Tier 1 (Main Tabs)**: `Chords`, `Melody`, `Song`, `Play it`. Selected = `#2E271F` ink pill with cream text `#FBF3E6`. Unselected = transparent pill with `#6B5F50` text. Track = `#F1E4CC` with 100px border radius.
- **Tier 2 (In-Panel Modes)**: (e.g. `Strict` | `Guide` | `Free` on Melody, `Piano` | `Guitar` | `Ukulele` on Play it). Sunken track `rgba(46,39,31,.06)`. Selected = cream chip `#FBF3E6` with `inset 0 0 0 1px rgba(46,39,31,.10), 0 1px 2px rgba(46,39,31,.12)`. Never an ink fill.

### 2.3 Panel Specifications
- **Background**: Mood color at 18% alpha (`panelMotionStyle`).
- **Corner Radius**: 26px on desktop, 22px on mobile.
- **Padding**: 14–20px desktop, 16px mobile.
- **Mobile Gap Consistency**: Mobile panel wrapper must use `padding: 14px 18px 26px` on every tab so the distance below the nav is identical.
- **Desktop Dimensions**: Full content width, no fixed heights anywhere; content flows naturally.

### 2.4 Chord Cards
- Role kicker: 9.5–10px / weight 800 / uppercase / letter-spacing 0.08em / `rgba(46,39,31,.62)`.
- Chord name: Weight 800 (desktop 22px, mobile 17–22px).
- Roman numeral: Space Mono 10px (visible when Theory is on).
- Card background: Tension color on `#9CC0EC` → `#F2735F` or cream `rgba(251,243,230,.72)`.

### 2.5 Swap Lane & Pills
- One family, three shades: 52%, 76%, and 100% color-mix with cream, ordered mild → deep by tension.
- Selected state = Ink `#2E271F` with checkmark `✓`.
- All controls have hover, active, and focus states.

### 2.6 Transport Bar & Mobile Dock
- Controls and order are identical on Chords and Melody:
  `Play · Section · (Loop) · Sound · Feel · Key · Tempo · Share`
- Sound and Feel share the same taxonomy lists with separate stored values for Chords vs Melody.

---

## 3. Architecture & Component Decomposition

To replace the monolithic ~6,400 line `loop-screen.ts`, the application is refactored into modular Web Components (`LitElement`):

```
src/
├── chroma-chords-app.ts         (Root app controller, state bridge, storage sync)
├── components/
│   ├── app-header.ts            (Header, logo, Tier-1 tabs, AI capacity pips, account menu)
│   ├── transport-bar.ts         (Desktop dark transport bar with popups)
│   ├── mobile-dock.ts           (Mobile bottom dock & drawer sheets)
│   ├── tabs/
│   │   ├── tab-chords.ts        (Chords pad grid, vibe pill, swap lane, scale strip)
│   │   ├── tab-melody.ts        (MelodyGrid sequencer, guide modes, bloom micro-keyboard)
│   │   ├── tab-song.ts          (Section library & drag-to-reorder song timeline)
│   │   └── tab-play.ts          (Piano keyboard SVG & Guitar/Ukulele fretboard cards)
│   ├── aside/
│   │   └── chord-inspector.ts   (Desktop right-hand aside: Tension Arc & Chord details)
│   ├── modals/
│   │   ├── midi-modal.ts        (Web MIDI device routing & channel assignments)
│   │   ├── share-modal.ts       (Multi-track MIDI, WAV stems, link sharing)
│   │   └── auth-modal.ts        (User sign-in & cloud sync)
├── services/
│   ├── melody-engine.ts         (Core melody music theory, contour, rhythm, guides, adaptation)
│   ├── audio-service.ts         (Tone.js chord polyphonic synth + lead synth voice channel)
│   ├── playback-engine.ts       (Master tempo, beat clock, chords/melody sync)
│   ├── export-service.ts        (Type 1 Multi-track MIDI export & dual-stem WAV render)
│   ├── chord-engine.ts          (Chord generation, Markov transitions, voicings)
│   └── song-arranger.ts         (Song sections, arrangement Markov walks)
```

---

## 4. Feature Mapping Matrix

| Feature / Capability | Legacy Code Location | Redesign Implementation Target | Status & Decision |
| :--- | :--- | :--- | :--- |
| **Tier-1 Navigation** | Missing (Header only) | `app-header.ts` (`v.navTabs`) | **NEW**: 4 tabs with ink pill selection |
| **AI Capacity Indicator** | Missing | `app-header.ts` (4 pips + countdown) | **NEW**: Rate/Token refill UI |
| **Chord Progression Grid** | `loop-screen.ts` | `tabs/tab-chords.ts` | **PORT**: Restyle to 26px tinted panel |
| **Chord Swap Lane** | `chord-swap-lane.ts` | `tabs/tab-chords.ts` / lane | **REDESIGN**: 5 feeling tiles + 3 tension shades |
| **Band DNA Bar & Moves** | `loop-screen.ts` | `tabs/tab-chords.ts` & top bar | **PORT**: Seamless banner & move badges |
| **Tension Arc & Sentences** | `loop-screen.ts` aside | `aside/chord-inspector.ts` | **PORT**: Idle state in desktop aside |
| **Voice Leading & Cadences** | `loop-screen.ts` | `aside/chord-inspector.ts` | **PORT**: Integrated into Chord Detail Inspector |
| **Theory Diatonic Strip** | `loop-screen.ts` | `tabs/tab-chords.ts` | **PORT**: Expands inside panel on Theory toggle |
| **Melody Sequencer Grid** | None (`melody-engine` spec) | `tabs/tab-melody.ts` (`MelodyGrid`) | **NEW**: 64-step sequencer with bloom popup |
| **Guide Modes** | None | `tabs/tab-melody.ts` (`Strict/Guide/Free`) | **NEW**: Melody scale & chord guide engine |
| **Song Arranger Timeline** | `song-arranger.ts` | `tabs/tab-song.ts` | **REDESIGN**: 2-column Library + Order list |
| **Instrument Practice Views** | None | `tabs/tab-play.ts` | **NEW**: Piano SVG, Guitar/Uke fretboard SVGs |
| **Scale Degrees Toggle** | None | `tabs/tab-play.ts` | **NEW**: Scale degree numbers on frets/keys |
| **Transport Bar** | `loop-screen.ts` bottom | `transport-bar.ts` & `mobile-dock.ts` | **REDESIGN**: Standard dark bar #2E271F |
| **MIDI Channel Routing** | `loop-screen.ts` basic | `modals/midi-modal.ts` | **REDESIGN**: Multi-device & Chords/Melody channels |
| **Multi-Track MIDI Export** | `export-service.ts` (mono) | `export-service.ts` (Format 1) | **ENHANCE**: Track 1 Chords + Track 2 Melody |
| **Live Performance Recording**| `loop-screen.ts` (`lanes`) | None | **OUT OF SCOPE**: Explicitly dropped per user |

---

## 5. Integrated Melody Engine & Mechanics Architecture

The **Melody Engine** (`src/services/melody-engine.ts`) acts as the theoretical and algorithmic brain driving `tab-melody.ts` and the lead audio pipeline.

### 5.1 Data Models
```typescript
export type ChordToneRole =
  | 'root'
  | '3rd'
  | '5th'
  | '7th'
  | 'tension'   // 9th, 11th, 13th
  | 'passing'   // diatonic scale degree between chord tones
  | 'chromatic' // non-scale chromatic passing tone
  | 'drone';    // static held pedal note

export interface MelodyNote {
  id: string;
  stepInBar: number;      // 0 to 15 (16th-note step within current bar)
  barIndex: number;       // 0 to progression.chords.length - 1
  beatOffset: number;     // absolute beat position from start of progression
  durationBeats: number;  // duration in quarter notes (0.25 = 16th, 1.0 = quarter)
  pitch: string;          // scientific pitch notation ('E5', 'C#4', 'G4')
  midi: number;           // MIDI pitch number (60 = C4, 76 = E5)
  velocity: number;       // 1 to 127
  chordToneRole: ChordToneRole;
  isClash?: boolean;      // flag for harsh minor-second rub
  tag?: string;           // optional stylistic tag ('band-oasis-drone', etc.)
}

export type GuideMode = 'strict-chord' | 'scale-key' | 'free';

export interface MelodyFeelSettings {
  humanVariance: number; // 0.0 to 1.0: microtiming jitter
  swing: number;         // 0 to 100%: 16th-note shuffle delay
  velocityDrift: number; // 0.0 to 1.0: dynamic touch variance & downbeat accents
  gateRatio: number;     // 0.2 to 1.5: articulation duration multiplier
  glide: number;         // 0.0 to 0.15s: portamento pitch glide
}

export type ContourArchetype =
  | 'Arch'              // Rises to peak around bar 3, descends to resolve
  | 'AscendingClimax'   // Starts low, climbs across bars to high climax
  | 'DescendingSigh'    // Starts high and emotional, gently steps down
  | 'CallAndResponse'   // 2-bar question (unstable), 2-bar answer (resolves)
  | 'OstinatoRiff'      // Punchy 1-2 bar repeating motif with harmonic shifts
  | 'AnthemHook';       // High-register soaring hook with syncopations

export interface MelodyTrack {
  id: string;
  progressionId?: string;
  notes: MelodyNote[];
  contour: ContourArchetype;
  density: number;          // 0 to 100 (sparse ambient to busy arp/riff)
  octave: number;           // 3, 4, or 5 (default 4/5 for lead)
  guideMode: GuideMode;
  feelSettings: MelodyFeelSettings;
  presetId: string;         // 'lead-synth', 'warm-pluck', 'lofi-sine', 'electric-lead'
  volume: number;           // 0 to 100
  muted: boolean;
  solo: boolean;
  bandId?: string;
}
```

### 5.2 Chord-Scale Harmonic Matrix
Maps chord qualities to safe chord tones, expressive tensions, and avoidance tones:
- **`maj` / `maj7` / `maj9`**: Chord tones ($1, 3, 5, 7$), Tensions ($9, \sharp11, 13$), Avoid: Natural 11 over Major 3rd.
- **`min` / `min7` / `min9`**: Chord tones ($1, \flat3, 5, \flat7$), Tensions ($9, 11, 13$), Avoid: $\flat6$ over natural 6.
- **`dom7` / `dom9`**: Chord tones ($1, 3, 5, \flat7$), Tensions ($9, \sharp11, 13, \flat9, \sharp9$), Avoid: Major 7th.
- **`dim` / `dim7`**: Chord tones ($1, \flat3, \flat5, \flat\flat7$), Tensions ($9, 11, \flat13$).
- **`sus4` / `sus2`**: Chord tones ($1, 4/2, 5$), Tensions ($\flat7, 9$), Avoid: Major 3rd.

### 5.3 Band DNA Melodic Profiles
- **Oasis**: Pentatonic vocal chants, held high drone pedals ($G4$/$D5$) over changing chords, soaring major 3rd leaps.
- **The Beatles**: Descending chromatic stepdowns ($8 \to 7 \to \flat7 \to 6$), stepwise counterpoint, major 6th/octave leaps.
- **Radiohead**: Haunting falsetto leaps, minor second oscillations, unresolved 9ths/11ths.
- **Nirvana**: Dissonant semitone vocal slides, raw 3-note minor motifs, downbeat octave unisons.
- **Steely Dan**: Syncopated jazz 16ths, chromatic enclosures, landing on 9ths/13ths.
- **Mac DeMarco**: Lazy behind-the-beat phrasing, gentle descending walkdowns, slide into major 7th.

### 5.4 MelodyGrid UI Integration
- **Grid Layout**: 4 chord bars × 16 16th-note steps (64 steps total).
- **Tier-2 Guide Mode**:
  - `Strict`: Calls `snapNoteToGuide(pitch, time, 'strict-chord', progression)` to lock notes to chord tones.
  - `Guide`: Highlights chord tones with dots on the bloom micro-keyboard; displays clash warning if minor-2nd rub is detected via `analyzeMelodyNote`.
  - `Free`: Unconstrained chromatic selection.
- **Note Blooming Micro-Keyboard**: Step click opens 1-octave keyboard centered on the cell showing chord-tone dots, role labels, duration tie dragging, and prev/next step buttons.
- **Adaptive Chord-Change**: When chords swap or transpose, `alignMelodyToChords` shifts pegged chord tones non-destructively to the new chord while preserving the rhythm.

### 5.5 Lead Synth Audio & Multi-Track Export
- `audio-service.ts` instantiates a dedicated Tone.js Lead Voice channel with presets (`Lead Synth`, `Warm Pluck`, `Lo-fi Sine`, `Electric Lead`, `Reed Lead`).
- `export-service.ts` emits Standard Type 1 MIDI files with Track 1 = Chords and Track 2 = Melody, plus dual-stem WAV audio rendering.

---

## 6. Verification Checklist

1. [ ] **8-Screen Visual Audit**: Capture 4 tabs on desktop (1280px) and 4 tabs on mobile (390px) to verify parity with design.
2. [ ] **Nav → Panel Gap**: Exactly identical across Chords, Melody, Song, and Play it.
3. [ ] **Panel Tokens**: Verified 18% alpha mood color background, 26px desktop radius, 22px mobile radius.
4. [ ] **Typography**: Plus Jakarta Sans for UI text, Space Mono for numerals/indices/keys.
5. [ ] **Interactivity**: Hover, active, focus states on all buttons and pills.
6. [ ] **Narrow Desktop Wrap**: Layout remains balanced and responsive at ~900px width.
7. [ ] **Melody Synthesis & Lockstep**: Lead synth plays in sample-accurate sync with progression chords.
8. [ ] **Multi-Track Export**: Standard MIDI file contains Track 1 Chords and Track 2 Melody.
