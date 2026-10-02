// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import './tab-melody';
import { TabMelody } from './tab-melody';
import { Progression } from '../../services/chord-engine';

describe('TabMelody Component', () => {
  let el: TabMelody;

  const mockProgression: Progression = {
    id: 'prog-1',
    name: 'Melody Test',
    genre: 'Pop',
    mood: 'Warm',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [
      { name: 'C', roman: 'I', tension: 0.1, functionLabel: 'Tonic', notes: ['C4', 'E4', 'G4'] },
      { name: 'Am', roman: 'vi', tension: 0.2, functionLabel: 'Submediant', notes: ['A3', 'C4', 'E4'] },
      { name: 'F', roman: 'IV', tension: 0.45, functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
      { name: 'G', roman: 'V', tension: 0.85, functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
    ],
  };

  beforeEach(() => {
    el = document.createElement('tab-melody') as TabMelody;
    el.progression = mockProgression;
    document.body.appendChild(el);
  });

  it('renders 4 bars with 16 steps each (64 total cells)', async () => {
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const barCols = shadow.querySelectorAll('.bar-column');
    expect(barCols.length).toBe(4);

    const stepCells = shadow.querySelectorAll('.step-cell');
    expect(stepCells.length).toBe(64);

    expect(shadow.querySelector('.small-caps-label')?.textContent).toContain('MELODY');
  });

  it('toggles guide modes with Tier-2 segmented control and dispatches event', async () => {
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const modeSpy = vi.fn();
    el.addEventListener('guide-mode-change', modeSpy);

    const guideButtons = shadow.querySelectorAll('.segmented-control .segment-btn');
    expect(guideButtons.length).toBe(3);

    // Click 'Guide' (second button)
    (guideButtons[1] as HTMLElement).click();
    await el.updateComplete;

    expect(modeSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { mode: 'scale-key' }
    }));
    expect(el.guideMode).toBe('scale-key');
  });

  it('opens note bloom popover on clicking a step cell', async () => {
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const firstStep = shadow.querySelector('.step-cell') as HTMLElement;
    expect(firstStep).toBeTruthy();
    firstStep.click();
    await el.updateComplete;

    const bloom = shadow.querySelector('.bloom-popover');
    expect(bloom).toBeTruthy();

    const whiteKeys = shadow.querySelectorAll('.white-key');
    expect(whiteKeys.length).toBe(7); // C, D, E, F, G, A, B

    const blackKeys = shadow.querySelectorAll('.black-key');
    expect(blackKeys.length).toBe(5); // C#, D#, F#, G#, A#
  });

  it('dispatches melody-change when reroll button is clicked', async () => {
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const melSpy = vi.fn();
    el.addEventListener('melody-change', melSpy);

    const rerollBtn = shadow.querySelector('.quick-chip') as HTMLElement;
    expect(rerollBtn).toBeTruthy();
    rerollBtn.click();

    expect(melSpy).toHaveBeenCalled();
  });

  it('plots note and updates track when key in bloom popover is clicked in Free mode', async () => {
    el.guideMode = 'free';
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    // Open bloom on step 0
    (shadow.querySelector('.step-cell') as HTMLElement).click();
    await el.updateComplete;

    const melSpy = vi.fn();
    el.addEventListener('melody-change', melSpy);

    // Click 'E' key (index 2)
    const eKey = shadow.querySelectorAll('.white-key')[2] as HTMLElement;
    expect(eKey).toBeTruthy();
    eKey.click();

    expect(melSpy).toHaveBeenCalled();
  });
});
