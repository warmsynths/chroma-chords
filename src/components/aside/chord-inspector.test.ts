// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import './chord-inspector';
import { ChordInspector } from './chord-inspector';
import { Progression } from '../../services/chord-engine';

describe('ChordInspector Component', () => {
  let el: ChordInspector;

  const mockProgression: Progression = {
    genre: 'Pop',
    key: 'C',
    scaleType: 'MAJOR',
    mood: 'Warm',
    bpm: 84,
    chords: [
      { name: 'C', tag: 'I', roman: 'I', color: '#fff', scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 0.1, functionLabel: 'Tonic', notes: ['C4', 'E4', 'G4'] },
      { name: 'Am', tag: 'vi', roman: 'vi', color: '#fff', scaleLabel: 'A Min', desc: '', degree: '6', scaleKey: 'A', tension: 0.2, functionLabel: 'Submediant', notes: ['A3', 'C4', 'E4'] },
      { name: 'F', tag: 'IV', roman: 'IV', color: '#fff', scaleLabel: 'F Maj', desc: '', degree: '4', scaleKey: 'F', tension: 0.45, functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
      { name: 'G', tag: 'V', roman: 'V', color: '#fff', scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 0.85, functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
    ],
  };

  beforeEach(() => {
    el = document.createElement('chord-inspector') as ChordInspector;
    el.progression = mockProgression;
    document.body.appendChild(el);
  });

  it('renders idle state with tension arc title, bars and description', async () => {
    await el.updateComplete;
    const shadow = el.shadowRoot!;
    expect(shadow.querySelector('.kicker')?.textContent).toContain('THIS LOOP');
    expect(shadow.querySelector('.main-title')?.textContent).toBeTruthy();

    const bars = shadow.querySelectorAll('.arc-bar-col');
    expect(bars.length).toBe(4);
    expect(bars[0].textContent).toContain('C');
    expect(bars[3].textContent).toContain('G');
  });

  it('dispatches chord-select event when an arc bar is clicked', async () => {
    await el.updateComplete;
    const shadow = el.shadowRoot!;
    const bars = shadow.querySelectorAll('.arc-bar-col');
    const selectSpy = vi.fn();
    el.addEventListener('chord-select', selectSpy);

    (bars[1] as HTMLElement).click();
    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy.mock.calls[0][0].detail.index).toBe(1);
  });

  it('renders chord detail inspector when selectedChordIndex is set', async () => {
    el.selectedChordIndex = 0;
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    expect(shadow.querySelector('.kicker')?.textContent).toContain('CHORD');
    expect(shadow.querySelector('.main-title')?.textContent).toContain('C');

    const notePills = shadow.querySelectorAll('.note-pill');
    expect(notePills.length).toBe(3); // C, E, G

    const intervalTokens = shadow.querySelectorAll('.interval-token');
    expect(intervalTokens.length).toBeGreaterThan(0);
  });

  it('dispatches change-chord-quality when quality chip is clicked', async () => {
    el.selectedChordIndex = 0;
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const qualitySpy = vi.fn();
    el.addEventListener('change-chord-quality', qualitySpy);

    const qualityChips = shadow.querySelectorAll('.chips-grid .option-chip');
    expect(qualityChips.length).toBeGreaterThan(0);
    // Click 'Minor' chip
    const minorChip = Array.from(qualityChips).find(c => c.textContent?.includes('Minor')) as HTMLElement;
    expect(minorChip).toBeTruthy();
    minorChip.click();

    expect(qualitySpy).toHaveBeenCalledTimes(1);
    expect(qualitySpy.mock.calls[0][0].detail.quality).toBe('Minor');
    expect(qualitySpy.mock.calls[0][0].detail.index).toBe(0);
  });

  it('dispatches change-chord-extension when extension chip is clicked', async () => {
    el.selectedChordIndex = 0;
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const extSpy = vi.fn();
    el.addEventListener('change-chord-extension', extSpy);

    const optionChips = shadow.querySelectorAll('.option-chip');
    const maj7Chip = Array.from(optionChips).find(c => c.textContent?.includes('Major 7th')) as HTMLElement;
    expect(maj7Chip).toBeTruthy();
    maj7Chip.click();

    expect(extSpy).toHaveBeenCalledTimes(1);
    expect(extSpy.mock.calls[0][0].detail.extension).toBe('Major 7th (M7)');
  });

  it('renders theory box with cadences and voice leading when showTheory is true', async () => {
    el.showTheory = true;
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const theoryBox = shadow.querySelector('.theory-box');
    expect(theoryBox).toBeTruthy();
    expect(theoryBox?.textContent).toContain('Key & Scale');
    expect(theoryBox?.textContent).toContain('C Major');
  });

  it('renders audition state when swapIndex and abPick are provided', async () => {
    el.swapIndex = 2;
    el.abPick = { chord: 'Fm', notes: ['F3', 'Ab3', 'C4'], functionLabel: 'Minor iv Cadence' };
    el.activeSwapFamily = 'Borrowed';
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const auditionCard = shadow.querySelector('.audition-card');
    expect(auditionCard).toBeTruthy();
    expect(auditionCard?.textContent).toContain('Fm');
    expect(auditionCard?.textContent).toContain('Minor iv Cadence');
  });
});
