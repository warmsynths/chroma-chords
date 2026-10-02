// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
    const swapBtns = el.shadowRoot!.querySelectorAll('.pad-icon-btn');
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
});
