# Research Findings: Band DNA Harmonic & Sonic Taxonomy Specification

**Linked Ticket**: [T2: Band DNA Harmonic & Sonic Taxonomy Specification](file:///c:/reyn/Projects/chroma-chords/.wayfinder/tickets/002-band-dna-taxonomy-spec.md)

## 1. Oasis / Britpop
- **Core Harmonic Tricks**:
  1. **Major III / $III^7$ Substitution**: In Major keys, replacing the diatonic $iii$ ($Em$ in C) with Major $III$ ($E$ or $E7$). Provides chromatic $G\sharp$, acting as a secondary dominant to $vi$ ($Am$) or resolving dramatically to $IV$ ($F$) as in *Don't Look Back In Anger*.
  2. **Borrowed $\flat VII$ (Mixolydian borrowing)**: In Major keys, using the $\flat VII$ major chord ($F$ in G major, $D$ in E major, $B\flat$ in C major) as in *Live Forever* and *Rock 'n' Roll Star*.
  3. **Anchored Pedal Voicing**: High $D4$ & $G4$ ringing open across acoustic chords ($G - Cadd9 - Em7 - Dsus4$).
- **Signature Progressions (Few-shot)**:
  - C Major: `C -> G -> Am -> E7 -> F -> G -> C -> C` (*Don't Look Back In Anger*)
  - G Major: `G -> D -> Am7 -> C -> D -> F -> C -> G` (*Live Forever*)
- **Sonic / Tone Profile**:
  - `presetId`: `guitar` (Acoustic Guitar / Bright 12-string feel)
  - `rhythmStyle`: `driving_strum`
  - `envelope`: `{ attack: 0.01, decay: 0.8, sustain: 0.3, release: 0.9 }`

---

## 2. The Beatles / Classic 60s
- **Core Harmonic Tricks**:
  1. **Minor $iv$ in Major Key**: Moving from $IV \to iv \to I$ ($F \to Fm \to C$), creating a poignant chromatic descending line ($A \to A\flat \to G$) as in *In My Life*, *Blackbird*, *Across The Universe*.
  2. **Secondary Dominant $II^7$**: Major $II^7$ ($D7$ in C major) resolving to $V$ ($G7$) as in *Eight Days a Week*, *You Won't See Me*.
  3. **Aeolian Cadence ($\flat VI \to \flat VII \to I$)**: e.g., $A\flat \to B\flat \to C$ in C Major (*Lady Madonna*).
- **Signature Progressions (Few-shot)**:
  - C Major: `C -> E7 -> Am -> Fm -> C -> G7 -> C -> C`
  - F Major: `F -> A7 -> Dm -> Bbm -> F -> C7 -> F -> F`
- **Sonic / Tone Profile**:
  - `presetId`: `epiano` / `rhodes` (Warm Abbey Road electric/acoustic piano)
  - `rhythmStyle`: `straight_8ths`
  - `envelope`: `{ attack: 0.02, decay: 0.9, sustain: 0.4, release: 1.0 }`

---

## 3. Radiohead / Art Rock
- **Core Harmonic Tricks**:
  1. **Chromatic Mediants**: Shifting between major chords whose roots are a third apart ($I \to III \to IV \to iv$ in *Creep*).
  2. **Dorian / Natural Minor Ambiguity**: Shifting root movements with sustained dissonant pedal notes (e.g. maj7 over minor, add9, min(maj7)).
  3. **Half-Step Tension Slides**: Moving chords up/down a semitone ($F \to F\sharp\text{dim} \to Gm$).
- **Signature Progressions (Few-shot)**:
  - G Major: `G -> B -> C -> Cm -> G -> B -> C -> Cm` (*Creep*)
  - A Minor: `Am -> C -> D -> F -> Am -> E7 -> F -> G` (*Karma Police*)
- **Sonic / Tone Profile**:
  - `presetId`: `rhodes` / `juno-pad`
  - `rhythmStyle`: `slow_arpeggio`
  - `envelope`: `{ attack: 0.04, decay: 1.2, sustain: 0.5, release: 1.8 }`

---

## 4. Nirvana / 90s Grunge
- **Core Harmonic Tricks**:
  1. **Parallel Chromatic Major / Power Shifts**: Ignoring diatonic scale rules in favor of visceral fretboard transposition ($\flat VI, \flat III, \flat VII$ parallel majors: $E \to G \to C \to A$).
  2. **Tritone Root Leaps**: Punchy chord root leaps based on riffs rather than classical voice leading (*In Bloom*, *Lithium*).
  3. **Sub-Tonic Bounce**: Heavy $i \to \flat VII \to \flat VI$ movement.
- **Signature Progressions (Few-shot)**:
  - E Minor: `E5 -> G5 -> C5 -> A5 -> E5 -> G5 -> C5 -> A5` (*Smells Like Teen Spirit*)
  - D Major: `D -> F -> Bb -> C -> D -> F -> Bb -> C` (*In Bloom*)
- **Sonic / Tone Profile**:
  - `presetId`: `stab` (Distorted guitar / Grunge heavy stab)
  - `rhythmStyle`: `heavy_strum`
  - `envelope`: `{ attack: 0.01, decay: 0.6, sustain: 0.7, release: 0.5 }`

---

## 5. Steely Dan / Yacht Rock
- **Core Harmonic Tricks**:
  1. **$\mu$-Major Chords ($\text{add}2 / \text{add}9$)**: Voicing major triads with the 2nd added directly next to the 3rd for iconic harmonic friction without jazz 7th clutter.
  2. **Slash Chords / Inverted Bass Dominants**: $IV/V$ (e.g. $F/G$ in C major, $B\flat/C$ in F major), creating floating dominant suspensions.
  3. **Major $II$ and Secondary $viidim7$ Transitions**: High harmonic complexity with smooth voice leading.
- **Signature Progressions (Few-shot)**:
  - C Major: `C(add9) -> F/G -> Em7 -> A7 -> Dm7 -> G7sus4 -> C(add9) -> C(add9)` (*Peg / Deacon Blues*)
  - G Major: `G(add9) -> C/D -> Bm7 -> E7 -> Am7 -> D7sus4 -> G(add9) -> G(add9)`
- **Sonic / Tone Profile**:
  - `presetId`: `rhodes` (Smooth vintage suitcase Rhodes)
  - `rhythmStyle`: `syncopated_16ths` / `swing_feel`
  - `envelope`: `{ attack: 0.02, decay: 0.7, sustain: 0.45, release: 1.1 }`

---

## 6. Mac DeMarco / Indie Bedroom Pop
- **Core Harmonic Tricks**:
  1. **Diatonic $maj7 \to min7$ Smooth Walkdowns**: $IVmaj7 \to iiim7 \to iim7 \to Imaj7$ with chorus/detune vibe (*Chamber of Reflection*, *My Kind of Woman*).
  2. **Secondary Minor 9th & Chromatic Approach**: Sliding into target chords from a half-step below or above.
  3. **$\flat VImaj7$ Modulation**: Bright, nostalgic borrowing of $\flat VImaj7$ in a major key.
- **Signature Progressions (Few-shot)**:
  - D Major: `Gmaj7 -> F#m7 -> Em7 -> Dmaj7 -> Gmaj7 -> A7 -> Dmaj7 -> Dmaj7`
  - A Major: `Dmaj7 -> C#m7 -> Bm7 -> Amaj7 -> Fmaj7 -> G -> Amaj7 -> Amaj7`
- **Sonic / Tone Profile**:
  - `presetId`: `juno-pad` / `epiano` (Warbly tape-chorus vintage synth/piano)
  - `rhythmStyle`: `slow_arpeggio` / `straight_8ths`
  - `envelope`: `{ attack: 0.05, decay: 1.0, sustain: 0.6, release: 1.5 }`
