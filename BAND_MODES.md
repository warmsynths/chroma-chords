# Band DNA & Songwriting Trick Modes

**Chroma Chords** includes **Band DNA Modes** (Songwriting Trick Profiles)—a set of signature harmonic archetypes that allow music makers to instantly tap into the distinct songwriting habits, chord voicings, and modal tricks of legendary artists.

---

## 🎸 Overview of Band Archetypes

Each Band DNA Profile encapsulates **multiple distinct songwriting rules & harmonic tricks**:

| Band Archetype | Plain-Language Trick | Music Theory Breakdown (Multiple Rules) | Hoisted Signature Chords | Typography & Color |
| :--- | :--- | :--- | :--- | :--- |
| **Oasis** | *"leans on a bright chord that shouldn’t fit, then walks home"* | 1. Borrowed major $\flat\text{III}$ ($E\flat$ in C major)<br>2. Plagal $\text{IV} \to \text{I}$ and minor $\text{iv}$ cadences<br>3. $\text{sus4}$ held over a static root ($Dsus4 \to D$)<br>4. Anchored $D4/G4$ drone pedal voicings | `E♭maj7`, `Fmaj7`, `A♭` | `Anton, sans-serif`<br>`#F6D98B` |
| **Radiohead** | *"swaps a chord for its stranger neighbour a third away"* | 1. Chromatic mediants ($C \to E$ or $C \to A\flat$)<br>2. Modal mixture ($\flat\text{VI}$ and $\flat\text{III}$ against major tonic)<br>3. Half-step voice leading across non-diatonic shifts | `A♭maj7`, `E♭maj7`, `Em7` | `'Space Mono', monospace`<br>`#C9A9E0` |
| **Nirvana** | *"moves the root in big jumps and leaves the middle empty"* | 1. Root movement by minor 3rd and tritone ($G \to B\flat \to C \to C\sharp$)<br>2. Open 5th power-chords (omitting 3rds)<br>3. Parallel major triad jumps regardless of key | `A♭`, `E♭maj7`, `B♭` | `'Plus Jakarta Sans', sans-serif` (Bold)<br>`#F2A79B` |
| **Steely Dan** | *"adds one note that makes a plain chord sound expensive"* | 1. "Mu major" add9 triads (major triad + 9th, no 7th)<br>2. Extended $\text{ii} \to \text{V}$ chains ($Dm9 \to G13 \to Cmaj9$)<br>3. Tritone substitution ($\text{subV7}$, e.g. $D\flat7 \to Cmaj7$) | `Cmaj9`, `D♭7`, `Fm7` | `'Plus Jakarta Sans', sans-serif` (Italic)<br>`#9CC0EC` |
| **Mac DeMarco** | *"two lush chords looped loose, bass sliding underneath"* | 1. Two-chord $\text{maj7}$ vamps ($Fmaj7 \leftrightarrow Cmaj7$)<br>2. Chromatic bass motion sliding underneath<br>3. Unresolved cadences avoiding strong $\text{V} \to \text{I}$ resolution | `Fmaj7`, `Cmaj9`, `Em7` | `'Space Mono', sans-serif`<br>`#B8CC9E` |

---

## 🎼 Detailed Rule Breakdown by Band

### 1. Oasis (Britpop / Anthem Rock)
- **Rule 1: Borrowed Major $\flat\text{III}$**: Introduces bright, unexpected major chords built on the flattened 3rd degree (e.g. $E\flat$ in C Major).
- **Rule 2: Minor $\text{iv}$ & Plagal Walking**: Uses $\text{IV} \to \text{iv} \to \text{I}$ movement to transition smoothly back home.
- **Rule 3: Static Suspensions**: Holds $\text{sus4}$ notes over static roots to create stadium-style tension before resolving to major.
- **Rule 4: Anchored Drone Pedal Voicings**: Guitar voicings lock high $D4/G4$ strings open while moving lower bass roots.

### 2. Radiohead (Art Rock / Experimental)
- **Rule 1: Chromatic Mediants**: Shifts roots by major or minor thirds (e.g., $I \to III$, $I \to \flat VI$) while maintaining common tone links.
- **Rule 2: Parallel Modal Mixture**: Pulls $\flat\text{VI}$ ($A\flat$) and $\flat\text{III}$ ($E\flat$) from the parallel minor scale into a major tonic context.
- **Rule 3: Smooth Half-Step Voice Leading**: Inner voices step by semitones to make unexpected key jumps feel natural.

### 3. Nirvana (Grunge / Alternative Rock)
- **Rule 1: Symmetric Root Jumps**: Jumps roots by minor 3rds ($3$ semitones) and tritones ($6$ semitones).
- **Rule 2: Open 5th Power Chords**: Omits thirds entirely, leaving harmonic quality open between major and minor.
- **Rule 3: Chromatic Parallel Motion**: Shifts full major/power triad shapes up and down the fretboard regardless of diatonic scale constraints.

### 4. Steely Dan (Jazz Rock / Sophisti-Pop)
- **Rule 1: "Mu Major" Voicings**: Inserts an $\text{add9}$ (2nd) interval directly adjacent to the major 3rd while omitting the 7th.
- **Rule 2: Extended $\text{ii} \to \text{V}$ Chains**: Precedes tonic target chords with extended minor 9th and dominant 13th approach chords.
- **Rule 3: Tritone Substitutions**: Replaces dominant $\text{V}^7$ chords with dominant 7ths a tritone away ($\text{subV}^7 \to \text{I}$).

### 5. Mac DeMarco (Indie / Slacker Rock)
- **Rule 1: Two-Chord $\text{maj7}$ Vamp**: Loops two lush $\text{maj7}$ chords loosely back and forth without rushing to resolve.
- **Rule 2: Chromatic Bass Sliding**: Bass line steps chromatically between target chord roots under static upper structures.
- **Rule 3: Open-Ended Cadences**: Avoids hard dominant-to-tonic ($\text{V} \to \text{I}$) closures to maintain a floating, relaxed feel.

---

## 🎼 Harmonic Engine Mechanics

Standard scale degree snappers in chord generators often force chromatic variations back into standard diatonic triads (e.g., snapping an $E7$ chord in C Major down to $Em$). Chroma Chords preserves intentional non-diatonic songwriting tricks natively in [`alignChordsToScale()`](src/services/chord-engine.ts#L1265-L1312):

1. **Non-Diatonic Preservation**:
   - Detects intentional chromatic variations on diatonic scale roots ($III$, $III^7$, $iv$, $\flat VII$, $\flat VI$, $\flat III$, chromatic mediants).
   - Preserves non-diatonic chords as custom modal interchange / borrowed `ChordBlock` objects with accurate accidental Roman numerals rather than snapping them to diatonic triads.
2. **Modal Interchange & Borrowed Analysis**:
   - `buildChromaticDegreeBlock()` & `synthBorrowedBlock()` derive proper functional labels (e.g., *Subdominant*, *Dominant*, *Tonic*) and Roman numeral symbols ($\flat\text{VII}$, $\flat\text{III}$, $\text{iv}$).
3. **Markov Transition Weights**:
   - When generating or suggesting progressions under a Band DNA profile, transition probabilities favor signature chord moves (e.g. Noel Gallagher's $I \to III \to IV \to iv$ progression in *Don't Look Back In Anger*).

---

## 💻 UI & User Interaction Workflows

1. **Artist DNA Quick-Pills**:
   - Located on the Loop Screen control bar. Tapping a pill toggles the active Band DNA profile.
2. **Top Band DNA Banner**:
   - When active, a signature banner appears at the top of the Loop Screen styled with the band's typography and color theme.
   - **Theory Mode Support**: Toggling Theory Mode (`Show Theory`) dynamically switches the banner text from plain language (e.g., *"leans on a bright chord that shouldn't fit..."*) to formal music theory analysis (e.g., *"borrowed major ♭III, plagal IV–I..."*).
3. **Swap Sheet Hoisting**:
   - Tapping any chord card opens the Swap Sheet inspector.
   - When a Band DNA profile is selected, harmonic alternative recommendations matching the artist's signature chord set are hoisted to the top of the list with a dedicated `"{Band} move"` tag and high-visibility highlight.

---

## 🏛️ Architecture & Code References

- **Band Profile Registry**: [`src/components/loop-screen.ts`](src/components/loop-screen.ts#L17-L92)
- **Harmonic Alignment & Preservation Engine**: [`src/services/chord-engine.ts`](src/services/chord-engine.ts#L1265-L1312)
- **Engine Tests for Signature Band Progressions**: [`src/services/chord-engine.test.ts`](src/services/chord-engine.test.ts#L166-L277)
- **Architecture Decision Record**: [`adr/0003-band-dna-songwriting-trick-modes.md`](adr/0003-band-dna-songwriting-trick-modes.md)
