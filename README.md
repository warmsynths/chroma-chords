# 🧭 Chord Voyager

> *"The distance between an idea in your head and a saved recording on your device should be zero."*

Chord Voyager is a tool designed to completely remove the friction of musical exploration. Instead of fighting complex DAW grids, loading heavy plugins, or getting lost in music theory menus, Chord Voyager lets you immediately set sail, map out chord progressions, feel the vibe, and instantly export the results directly to your device or the cloud.

---

## 🌊 The Philosophy

We've all been there: you have a melody or a vibe in your head, but by the time you open your DAW, load up a synth, configure your MIDI routing, and draw notes in a piano roll, the spark is gone. 

Chord Voyager exists to capture that spark before it fades:
* **Frictionless Exploration:** Use the **Voyage Metaphor** (curated modes like *Sunlit Harbor* or *The Twilight Hour*) to instantly find scales and modes that fit the vibe you are chasing.
* **Flow-State Composition:** A physical-feeling progression timeline and neumorphic interface designed to help you construct, audition, and rearrange chord steps effortlessly.
* **Instant Export:** Get your ideas out of the browser and into the real world. Save your session locally, sync it to **Google Drive**, or drag the MIDI/audio straight into your favorite sampler, DAW, or hardware device.

---

## 🛠️ How It's Put Together

Chord Voyager is built to be lightweight, incredibly fast, and runs entirely in the browser.

* **Frontend Architecture:** Built using [Lit](https://lit.dev/) for high-performance, lightweight, and native Web Components. It keeps the UI fast and modular without the overhead of heavy frameworks.
* **Type Safety:** Written entirely in [TypeScript](https://www.typescriptlang.org/) for robust, maintainable components and services.
* **Audio Engine:** Powered by [Tone.js](https://tonejs.github.io/) to synthesize lush, organic chord previews directly in the browser.
* **Build System:** Bundled and served via [Vite](https://vite.dev/) for near-instant dev server spin-up and optimized production builds.
* **Key Services:**
  * **Audio Service:** Handles playback, voicings, humanization (velocity & micro-timing deviations), and arpeggiation patterns.
  * **Project Service:** Manages local persistence, saving and loading your voyages.
  * **Google Drive Service:** Connects to your Google Drive to back up projects in the cloud.

---

## 🚀 Getting Started

### Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser and start exploring.

### Build
To build the app for production:
```bash
npm run build
```
