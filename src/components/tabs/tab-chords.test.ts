// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('tone', () => ({
  Compressor: class { connect() { return this; } toDestination() { return this; } },
  Sampler: class { connect() { return this; } triggerAttackRelease() { } triggerAttack() { } triggerRelease() { } },
  PolySynth: class { connect() { return this; } triggerAttackRelease() { } triggerAttack() { } triggerRelease() { } set() { } },
  Synth: class { triggerAttackRelease() { } },
  MonoSynth: class { triggerAttackRelease() { } },
  FMSynth: class { triggerAttackRelease() { } },
  Reverb: class { connect() { return this; } },
  Chorus: class { start() { return this; } connect() { return this; } },
  Gain: class {
    gain = { rampTo: vi.fn(), value: 1 };
    connect() { return this; }
    toDestination() { return this; }
  },
  Filter: class {
    frequency = { value: 1000 };
    connect() { return this; }
  },
  EQ3: class {
    high = { value: 0 };
    mid = { value: 0 };
    low = { value: 0 };
    connect() { return this; }
  },
  Vibrato: class {
    connect() { return this; }
  },
  Distortion: class {
    connect() { return this; }
  },
  Limiter: class {
    connect() { return this; }
    toDestination() { return this; }
  },
  loaded: () => Promise.resolve(),
  start: () => Promise.resolve(),
  now: () => 0,
}));

import './tab-chords';
import type { TabChords } from './tab-chords';
import type { ChordBlock, Progression } from '../../services/chord-engine';

describe('TabChords component', () => {
  let el: TabChords;

  const dummyChords: ChordBlock[] = [
    { name: 'C', tag: 'home', roman: 'I', color: '#9CC0EC', functionLabel: 'Tonic', notes: ['C', 'E', 'G'], scaleLabel: 'Major', desc: '', degree: 'TONIC', scaleKey: 'C_MAJOR', tension: 0.1 },
    { name: 'G', tag: 'reach', roman: 'V', color: '#F2A79B', functionLabel: 'Dominant', notes: ['G', 'B', 'D'], scaleLabel: 'Major', desc: '', degree: 'DOMINANT', scaleKey: 'C_MAJOR', tension: 0.7 },
    { name: 'Am', tag: 'drift', roman: 'vi', color: '#C9A9E0', functionLabel: 'Submediant', notes: ['A', 'C', 'E'], scaleLabel: 'Major', desc: '', degree: 'SUBMEDIANT', scaleKey: 'C_MAJOR', tension: 0.3 },
    { name: 'F', tag: 'lift', roman: 'IV', color: '#B3E0A9', functionLabel: 'Subdominant', notes: ['F', 'A', 'C'], scaleLabel: 'Major', desc: '', degree: 'SUBDOMINANT', scaleKey: 'C_MAJOR', tension: 0.4 },
  ];

  const dummyProgression: Progression = {
    genre: 'Indie Pop',
    mood: 'Nostalgic',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 96,
    chords: dummyChords,
  };

  beforeEach(async () => {
    el = document.createElement('tab-chords') as TabChords;
    el.progression = dummyProgression;
    el.moodColor = '#C9A9E0';
    el.showTheory = true;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it('renders vibe pill with mood, genre, and bpm', () => {
    const vibeBtn = el.shadowRoot!.querySelector('.vibe-pill-btn') as HTMLElement;
    expect(vibeBtn).toBeTruthy();
    expect(vibeBtn.textContent).toContain('Nostalgic');
    expect(vibeBtn.textContent).toContain('Indie Pop');
    expect(vibeBtn.textContent).toContain('96 BPM');
  });

  it('renders 4 chord pads with key shortcuts, names, and roman numerals', () => {
    const pads = el.shadowRoot!.querySelectorAll('.pad-cell');
    expect(pads.length).toBe(4);

    const firstPad = pads[0];
    expect(firstPad.textContent).toContain('A'); // Shortcut
    expect(firstPad.textContent).toContain('C'); // Chord name
    expect(firstPad.textContent).toContain('I'); // Roman numeral
    expect(firstPad.textContent).toContain('HOME'); // Role kicker
  });

  it('shows a Playing now footer: a hint first, then the last pad pressed', async () => {
    const row = () => el.shadowRoot!.querySelector('.now-playing-row') as HTMLElement;
    expect(row().textContent).toContain('Playing now');
    expect(row().textContent).toContain('Press a chord');

    (el as any).lastPad = { idx: 1, voicing: '1st inversion', vel: 94, zone: 1, reach: null };
    await el.updateComplete;

    expect(row().querySelector('.now-label')!.textContent).toBe(dummyChords[1].name);
    expect(row().querySelector('.now-sub')!.textContent).toContain('1st inversion \u00B7 velocity 94');
  });

  it('emits reroll event when Try Another is clicked', async () => {
    const rerollSpy = vi.fn();
    el.addEventListener('reroll', rerollSpy);

    const tryBtn = el.shadowRoot!.querySelector('.try-another-btn') as HTMLElement;
    tryBtn.click();

    expect(rerollSpy).toHaveBeenCalledTimes(1);
  });

  it('emits set-chord-count when stepper + button is clicked', async () => {
    const countSpy = vi.fn();
    el.addEventListener('set-chord-count', countSpy);

    const stepperBtns = el.shadowRoot!.querySelectorAll('.stepper-btn');
    const plusBtn = stepperBtns[1] as HTMLElement;
    plusBtn.click();

    expect(countSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { count: 5 },
    }));
  });

  it('opens swap lane when swap icon is clicked on a pad', async () => {
    const swapBtns = el.shadowRoot!.querySelectorAll('.pad-swap-btn');
    const firstSwapBtn = swapBtns[0] as HTMLElement;
    firstSwapBtn.click();
    await el.updateComplete;

    const swapLane = el.shadowRoot!.querySelector('chord-swap-lane');
    expect(swapLane).toBeTruthy();
  });

  it('renders Band DNA banner when selectedBand is set', async () => {
    el.selectedBand = 'oasis';
    await el.updateComplete;

    const banner = el.shadowRoot!.querySelector('.band-legend-banner');
    expect(banner).toBeTruthy();
    expect(banner!.textContent).toContain('Oasis');
  });

  it('latches voicing and extension when clicked and keeps them latched after release', async () => {
    const updateSpy = vi.fn();
    const changeSpy = vi.fn();
    el.addEventListener('progression-update', updateSpy);
    el.addEventListener('progression-change', changeSpy);

    const pads = el.shadowRoot!.querySelectorAll('.pad-cell');
    const firstPad = pads[0] as HTMLElement;

    // Mock getBoundingClientRect: width 200, height 120, left 100, top 100
    // Padding 14 -> usable width: 200 - 28 = 172.
    // Chord ladder for C is ['C', 'C6', 'C7', 'Cmaj7', 'Cmaj9'] (5 rungs).
    // Zone 0: Octave Up (y < 0.34, top 100 + 20 = 120)
    // Reach 3: Cmaj7 (x ~ 0.7 -> left 100 + 14 + 0.7 * 172 = 234.4)
    firstPad.getBoundingClientRect = () => ({
      left: 100,
      top: 100,
      width: 200,
      height: 120,
      right: 300,
      bottom: 220,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    // 1. Pointer Down in top-right area (zone 0: octave up, reach 3: Cmaj7)
    firstPad.dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 235,
      clientY: 120,
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    // While held, meta label should show preview reach
    const metaWhileHeld = firstPad.querySelector('.pad-meta-label') as HTMLElement;
    expect(metaWhileHeld.textContent).toContain('Cmaj7');

    // 2. Pointer Up (release)
    firstPad.dispatchEvent(new PointerEvent('pointerup', {
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    // Voicing and extension must now be latched!
    expect(updateSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
    const lastChange = changeSpy.mock.calls[changeSpy.mock.calls.length - 1][0] as CustomEvent;
    expect(lastChange.detail.chords[0].name).toBe('Cmaj7');
    expect(lastChange.detail.chords[0].voicing).toBe('up an octave');

    // Visual indicators must stay latched!
    // 1. Chord name updated to Cmaj7
    const chordNameEl = firstPad.querySelector('.pad-chord-name') as HTMLElement;
    expect(chordNameEl.textContent).toBe('Cmaj7');

    // 2. Meta label shows 'OCTAVE UP'
    const metaAfterRelease = firstPad.querySelector('.pad-meta-label') as HTMLElement;
    expect(metaAfterRelease.textContent).toBe('OCTAVE UP');

    // 3. 2D grid hit pill exists and stays rendered
    const hitPill = firstPad.querySelector('.grid-hit-pill') as HTMLElement;
    expect(hitPill).toBeTruthy();

    // 4. Rung dots active at index 3 (Cmaj7)
    const rungLabels = firstPad.querySelectorAll('.rung-step-label');
    expect(rungLabels[3].classList.contains('active')).toBe(true);

    // 3. Now click middle zone (zone 1: 1st inversion) on the same chord
    firstPad.dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 235,
      clientY: 160, // y = 60/120 = 0.5 -> zone 1 (1st inversion)
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    firstPad.dispatchEvent(new PointerEvent('pointerup', {
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    // Meta label now latched to '1ST INVERSION'
    expect(metaAfterRelease.textContent).toBe('1ST INVERSION');
    expect(el.progression.chords[0].voicing).toBe('1st inversion');
    expect(el.progression.chords[0].name).toBe('Cmaj7');
  });

  it('keeps latched voicings and extensions on separate pads independently', async () => {
    const pads = el.shadowRoot!.querySelectorAll('.pad-cell');
    const pad0 = pads[0] as HTMLElement;
    const pad1 = pads[1] as HTMLElement;

    pad0.getBoundingClientRect = () => ({
      left: 100, top: 100, width: 200, height: 120, right: 300, bottom: 220, x: 100, y: 100, toJSON: () => {},
    });
    pad1.getBoundingClientRect = () => ({
      left: 320, top: 100, width: 200, height: 120, right: 520, bottom: 220, x: 320, y: 100, toJSON: () => {},
    });

    // Latch Pad 0 to Octave Up
    pad0.dispatchEvent(new PointerEvent('pointerdown', { clientX: 200, clientY: 110, bubbles: true }));
    pad0.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    await el.updateComplete;

    // Latch Pad 1 to Low Root
    pad1.dispatchEvent(new PointerEvent('pointerdown', { clientX: 420, clientY: 200, bubbles: true }));
    pad1.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    await el.updateComplete;

    // Both pads must preserve their respective latched voicings
    const meta0 = pad0.querySelector('.pad-meta-label') as HTMLElement;
    const meta1 = pad1.querySelector('.pad-meta-label') as HTMLElement;
    expect(meta0.textContent).toBe('OCTAVE UP');
    expect(meta1.textContent).toBe('LOW ROOT');
    expect(pad0.querySelector('.grid-hit-pill')).toBeTruthy();
    expect(pad1.querySelector('.grid-hit-pill')).toBeTruthy();
  });
});


describe('TabChords double-tap reset', () => {
  it('double-tapping the centre of a card puts the chord back to how it started, silently', async () => {
    const el = document.createElement('tab-chords') as TabChords;
    const chords: ChordBlock[] = [
      { name: 'C', tag: 'home', roman: 'I', color: '#9CC0EC', functionLabel: 'Tonic', notes: ['C', 'E', 'G'], scaleLabel: 'Major', desc: '', degree: 'TONIC', scaleKey: 'C_MAJOR', tension: 0.1 },
    ];
    el.progression = { genre: 'Pop', mood: 'Warm', key: 'C', scaleType: 'MAJOR', bpm: 90, chords } as Progression;
    document.body.appendChild(el);
    await el.updateComplete;

    const pad = el.shadowRoot!.querySelector('.pad-cell') as HTMLElement;
    pad.getBoundingClientRect = () => ({ left: 100, top: 100, width: 200, height: 120, right: 300, bottom: 220, x: 100, y: 100, toJSON: () => {} });
    const tap = async (x: number, y: number) => {
      pad.dispatchEvent(new PointerEvent('pointerdown', { clientX: x, clientY: y, bubbles: true, composed: true }));
      await el.updateComplete;
      pad.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
      await el.updateComplete;
    };

    // Latch an extension and a voicing (top right: octave up, Cmaj7)
    await tap(235, 120);
    expect(el.progression.chords[0].name).toBe('Cmaj7');
    expect(el.progression.chords[0].initialChord?.name).toBe('C');

    // Two quick taps in the centre
    await tap(200, 160);
    await tap(200, 160);
    expect(el.progression.chords[0].name).toBe('C');
    expect(el.progression.chords[0].voicing).toBeUndefined();
    expect(el.progression.chords[0].initialChord).toBeUndefined();
    el.remove();
  });
});
