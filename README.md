# Chroma Chords

> *"A tactile audio widget for generating pleasing chord progressions in seconds."*

**Chroma Chords** is designed to completely eliminate friction when exploring musical ideas. Built as a fast, tactile web application, it lets you instantly seed chord progressions by genre and mood, swap chords with intelligent harmonic recommendations, customize voicings, view musical theory analysis, and export seamless loop helpers to your hardware or DAW.

---

![Chroma Chords Demo Layout](assets/demo.gif)
[Live App](https://warmsynths.github.io/chroma-chords)

---

## The Philosophy

Opening a DAW, loading heavy virtual instruments, configuring MIDI routings, and manually clicking notes into a piano roll often destroys the creative spark before an idea takes shape.

**Chroma Chords** acts as your instant progression sketchpad:
* **Audio Widget Simplicity:** Designed to look beautiful, feel tactile, and generate great-sounding chord loops with zero setup or menu diving.
* **Seed by Feel:** Choose a Genre (*Pop, Lo-fi, R&B/Soul, Synthwave, Jazz-ish, etc.*) and a Mood (*Uplifting, Melancholy, Dreamy, Tense, Warm, Nostalgic*) to instantly generate a 4-chord loop.
* **Intuitive Swap Sheet:** Tap any chord card to view harmonic alternative suggestions (*Darker, More tension, Dreamier, Resolve home*) or customize exact qualities and extensions.
* **Music Theory Made Visual:** Toggle theory mode to see Roman numeral notation, degree functions (*Tonic, Mediant, Dominant*), staff notation, and OKLCH tension color maps.
* **Instant Hardware & DAW Helpers:** Export progressions directly into hardware/software workflows such as Dirtywave M8 (`hypersyn-chord-helper`) and Novation Circuit (`circuit-chords`).

---

## App Features & Capabilities

* **Genre & Mood Seed Engine:** Curated probability rules for 10 musical genres and 6 distinct mood parameters.
* **Tone.js Web Synthesizers & Samplers:** Built-in Rhodes piano, warm organ, lush string pads, Juno synth pads, and house stabs with humanized velocity and micro-timing.
* **Key & Scale Controls:** Override key signatures (C through B with sharp/flat notation) and scale modes (Ionian, Aeolian, Dorian, Mixolydian, Lydian, Harmonic Minor).
* **Tactile Playback & Reorder:** Seamless drag-to-reorder cards while maintaining playback identity so loops never glitch mid-beat.

---

## Technical Stack

* **Frontend Architecture:** Built using [Lit](https://lit.dev/) for high-performance, lightweight Web Components.
* **Type Safety:** Written 100% in [TypeScript](https://www.typescriptlang.org/).
* **Audio Engine:** [Tone.js](https://tonejs.github.io/) for realtime browser synthesis and sample playback.
* **Build System:** [Vite](https://vite.dev/) for instant HMR and optimized production bundles.

---

## Getting Started

### Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the dev server link in your browser and start exploring.

### Production Build
To compile TypeScript and bundle for production (outputs to `docs/`):
```bash
npm run build
```
