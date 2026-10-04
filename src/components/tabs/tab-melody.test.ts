// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import './tab-melody';
import { TabMelody } from './tab-melody';
import { Progression } from '../../services/chord-engine';

describe('TabMelody Component', () => {
  let el: TabMelody;

  const mockProgression: Progression = {
    genre: 'Pop',
    mood: 'Warm',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [
      { name: 'C', tag: 'I', roman: 'I', color: '#fff', scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 0.1, functionLabel: 'Tonic', notes: ['C4', 'E4', 'G4'] },
      { name: 'Am', tag: 'vi', roman: 'vi', color: '#fff', scaleLabel: 'A Min', desc: '', degree: '6', scaleKey: 'A', tension: 0.2, functionLabel: 'Submediant', notes: ['A3', 'C4', 'E4'] },
      { name: 'F', tag: 'IV', roman: 'IV', color: '#fff', scaleLabel: 'F Maj', desc: '', degree: '4', scaleKey: 'F', tension: 0.45, functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
      { name: 'G', tag: 'V', roman: 'V', color: '#fff', scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 0.85, functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
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

  it('allows dragging the note tail to make note longer', async () => {
    const defaultFeel = { humanVariance: 0, swing: 0, velocityDrift: 0, gateRatio: 1, glide: 0 };
    el.melodyTrack = {
      id: 'test-track',
      contour: 'Arch',
      density: 50,
      octave: 4,
      guideMode: 'strict-chord',
      feelSettings: defaultFeel,
      presetId: 'lead-synth',
      volume: 80,
      muted: false,
      solo: false,
      notes: [
        {
          id: 'n1',
          barIndex: 0,
          stepInBar: 0,
          beatOffset: 0,
          durationBeats: 0.5, // 2 steps: 0 and 1
          pitch: 'C4',
          midi: 60,
          velocity: 100,
          chordToneRole: 'root',
        },
      ],
    };
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const tailCell = shadow.querySelector('.step-cell[data-step="1"]') as HTMLElement;
    expect(tailCell).toBeTruthy();
    expect(tailCell.classList.contains('is-tail-step')).toBe(true);

    const melSpy = vi.fn();
    el.addEventListener('melody-change', melSpy);

    // Pointer down on tail step
    tailCell.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 }));
    expect(el.isDraggingTail).toBe(true);

    // Mock elementFromPoint for dragging to step 3
    const step3Cell = shadow.querySelector('.step-cell[data-step="3"]') as HTMLElement;
    const origElementFromPoint = document.elementFromPoint;
    document.elementFromPoint = (_x: number, _y: number) => step3Cell;

    // Dispatch pointermove
    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 100, clientY: 100 }));
    await el.updateComplete;

    expect(el.melodyTrack!.notes[0].durationBeats).toBe(1.0); // 4 steps (0, 1, 2, 3)

    // Dispatch pointerup to finish drag
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    expect(el.isDraggingTail).toBe(false);
    expect(melSpy).toHaveBeenCalled();

    // Restore elementFromPoint
    document.elementFromPoint = origElementFromPoint;
  });

  it('allows dragging the tail backwards to shorten note to 1 step', async () => {
    const defaultFeel = { humanVariance: 0, swing: 0, velocityDrift: 0, gateRatio: 1, glide: 0 };
    el.melodyTrack = {
      id: 'test-track',
      contour: 'Arch',
      density: 50,
      octave: 4,
      guideMode: 'strict-chord',
      feelSettings: defaultFeel,
      presetId: 'lead-synth',
      volume: 80,
      muted: false,
      solo: false,
      notes: [
        {
          id: 'n1',
          barIndex: 0,
          stepInBar: 0,
          beatOffset: 0,
          durationBeats: 1.0, // 4 steps
          pitch: 'C4',
          midi: 60,
          velocity: 100,
          chordToneRole: 'root',
        },
      ],
    };
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const tailCell = shadow.querySelector('.step-cell[data-step="2"]') as HTMLElement;
    expect(tailCell).toBeTruthy();

    const origElementFromPoint = document.elementFromPoint;
    const step2Cell = shadow.querySelector('.step-cell[data-step="2"]') as HTMLElement;
    document.elementFromPoint = () => step2Cell;

    tailCell.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 }));

    // Drag back to step 0
    const step0Cell = shadow.querySelector('.step-cell[data-step="0"]') as HTMLElement;
    document.elementFromPoint = () => step0Cell;

    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));
    await el.updateComplete;

    expect(el.melodyTrack!.notes[0].durationBeats).toBe(0.25); // 1 step

    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    expect(el.isDraggingTail).toBe(false);

    document.elementFromPoint = origElementFromPoint;
  });

  it('caps note length at next note onset when dragging tail', async () => {
    const defaultFeel = { humanVariance: 0, swing: 0, velocityDrift: 0, gateRatio: 1, glide: 0 };
    el.melodyTrack = {
      id: 'test-track',
      contour: 'Arch',
      density: 50,
      octave: 4,
      guideMode: 'strict-chord',
      feelSettings: defaultFeel,
      presetId: 'lead-synth',
      volume: 80,
      muted: false,
      solo: false,
      notes: [
        {
          id: 'n1',
          barIndex: 0,
          stepInBar: 0,
          beatOffset: 0,
          durationBeats: 0.5, // steps 0 and 1
          pitch: 'C4',
          midi: 60,
          velocity: 100,
          chordToneRole: 'root',
        },
        {
          id: 'n2',
          barIndex: 0,
          stepInBar: 4, // next note starts at step 4
          beatOffset: 1.0,
          durationBeats: 0.5,
          pitch: 'G4',
          midi: 67,
          velocity: 100,
          chordToneRole: '5th',
        },
      ],
    };
    await el.updateComplete;
    const shadow = el.shadowRoot!;

    const origElementFromPoint = document.elementFromPoint;
    const tailCell = shadow.querySelector('.step-cell[data-step="1"]') as HTMLElement;
    document.elementFromPoint = () => tailCell;

    tailCell.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 }));

    // Try dragging past next note to step 7
    const step7Cell = shadow.querySelector('.step-cell[data-step="7"]') as HTMLElement;
    document.elementFromPoint = () => step7Cell;

    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));
    await el.updateComplete;

    // Must be capped at step 3 (length 4 steps = 1.0 beat) before step 4
    expect(el.melodyTrack!.notes[0].durationBeats).toBe(1.0);

    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    document.elementFromPoint = origElementFromPoint;
  });
});

