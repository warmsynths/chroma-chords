// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

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

import './loop-screen';
import { LoopScreen } from './loop-screen';
import { Progression, RawChordData, injectModes } from '../services/chord-engine';
import { BAND_LIST } from '../services/band-dna-service';

describe('Band DNA Modern UX/UI Interactions', () => {
  let chordData: RawChordData;

  beforeAll(() => {
    const jsonPath = path.resolve(__dirname, '../../public/chroma_chords_data.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    chordData = JSON.parse(raw) as RawChordData;
    injectModes(chordData);
  });

  const sampleProgression: Progression = {
    genre: 'Rock',
    mood: 'Anthemic',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [
      { name: 'C', tag: 'I', roman: 'I', color: '#F2A79B', functionLabel: 'Tonic', notes: ['C4', 'E4', 'G4'], scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 0.1 },
      { name: 'G', tag: 'V', roman: 'V', color: '#F6D98B', functionLabel: 'Dominant', notes: ['G4', 'B4', 'D5'], scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 0.8 },
      { name: 'Am', tag: 'vi', roman: 'vi', color: '#9CC0EC', functionLabel: 'Submediant', notes: ['A4', 'C5', 'E5'], scaleLabel: 'A Min', desc: '', degree: '6', scaleKey: 'A', tension: 0.3 },
      { name: 'F', tag: 'IV', roman: 'IV', color: '#C9A9E0', functionLabel: 'Subdominant', notes: ['F4', 'A4', 'C5'], scaleLabel: 'F Maj', desc: '', degree: '4', scaleKey: 'F', tension: 0.4 },
    ],
  };

  it('renders Band selection pills in the Vibe panel with custom wordmark styles', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    el.chordData = chordData;
    document.body.appendChild(el);
    await el.updateComplete;

    // Open vibe panel
    el.vibeOpen = true;
    await el.updateComplete;

    const popover = el.shadowRoot?.querySelector('.vibe-popover-desktop');
    expect(popover).toBeTruthy();

    const bandButtons = Array.from(popover?.querySelectorAll('.pills-group button') || []);
    const bandTexts = bandButtons.map(b => b.textContent?.trim());
    expect(bandTexts).toContain('Oasis');
    expect(bandTexts).toContain('Radiohead');
    expect(bandTexts).toContain('Nirvana');
    expect(bandTexts).toContain('Steely Dan');
    expect(bandTexts).toContain('Mac DeMarco');

    document.body.removeChild(el);
  });

  it('selecting a band sets selectedBand and triggers sonic profile (instrument, style, bpm)', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    el.chordData = chordData;
    document.body.appendChild(el);
    await el.updateComplete;

    el.vibeOpen = true;
    await el.updateComplete;

    const instSpy = vi.fn();
    const styleSpy = vi.fn();
    const bpmSpy = vi.fn();
    el.addEventListener('set-instrument', (e: any) => instSpy(e.detail));
    el.addEventListener('set-play-style', (e: any) => styleSpy(e.detail));
    el.addEventListener('set-bpm', (e: any) => bpmSpy(e.detail));

    const popover = el.shadowRoot?.querySelector('.vibe-popover-desktop');
    const oasisBtn = Array.from(popover?.querySelectorAll('button') || []).find(b => b.textContent?.trim() === 'Oasis') as HTMLElement;
    expect(oasisBtn).toBeTruthy();

    oasisBtn.click();
    await el.updateComplete;

    expect(el.selectedBand).toBe('Oasis');
    expect(instSpy).toHaveBeenCalledWith('Nylon Guitar');
    expect(styleSpy).toHaveBeenCalledWith('Strum');
    expect(bpmSpy).toHaveBeenCalledWith(116);

    document.body.removeChild(el);
  });

  it('renders top sticky bandBar when a band is selected, and allows dismissal', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    el.chordData = chordData;
    document.body.appendChild(el);
    await el.updateComplete;

    el.selectedBand = 'Oasis';
    await el.updateComplete;

    const bandBar = el.shadowRoot?.querySelector('.band-bar-sticky');
    expect(bandBar).toBeTruthy();
    expect(bandBar?.textContent).toContain('Oasis');
    expect(bandBar?.textContent).toContain('Write loop');

    // Click dismiss button
    const dismissBtn = bandBar?.querySelector('.band-bar-dismiss-btn') as HTMLElement;
    expect(dismissBtn).toBeTruthy();

    dismissBtn.click();
    await el.updateComplete;

    expect(el.selectedBand).toBeNull();
    expect(el.shadowRoot?.querySelector('.band-bar-sticky')).toBeNull();

    document.body.removeChild(el);
  });

  it('clicking "Write loop" generates the band authentic signature progression transposed to active key', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression; // In C Major
    el.chordData = chordData;
    document.body.appendChild(el);
    await el.updateComplete;

    el.selectedBand = 'Oasis';
    await el.updateComplete;

    const progSpy = vi.fn();
    el.addEventListener('progression-change', (e: any) => progSpy(e.detail));

    const writeBtn = el.shadowRoot?.querySelector('.band-bar-write-btn') as HTMLElement;
    expect(writeBtn).toBeTruthy();

    writeBtn.click();
    await el.updateComplete;

    expect(progSpy).toHaveBeenCalled();
    const generatedProg: Progression = progSpy.mock.calls[0][0];
    expect(generatedProg.chords.length).toBe(8);
    expect(generatedProg.bpm).toBe(116);
    expect(generatedProg.genre).toBe('Rock');
    expect(el.order.length).toBe(8);

    // Clicking "Try another" (reroll) while in band mode generates another band progression
    const rerollBtn = el.shadowRoot?.querySelector('.dice-reroll-btn') as HTMLElement;
    expect(rerollBtn).toBeTruthy();
    rerollBtn.click();
    await el.updateComplete;

    expect(progSpy).toHaveBeenCalledTimes(2);
    const rerolledProg: Progression = progSpy.mock.calls[1][0];
    expect(rerolledProg.chords.length).toBe(8);
    expect(rerolledProg.bpm).toBe(116);

    document.body.removeChild(el);
  });

  it('renders interactive "Band Move" chips on chord pads that swap chord and toggle to "Revert"', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    el.chordData = chordData;
    document.body.appendChild(el);
    await el.updateComplete;

    el.selectedBand = 'Oasis';
    await el.updateComplete;

    // Band legend is present above pads
    const legend = el.shadowRoot?.querySelector('.band-legend-box');
    expect(legend).toBeTruthy();
    expect(legend?.textContent).toContain('Oasis moves');

    // Band move chips exist on pads
    const moveChips = el.shadowRoot?.querySelectorAll('.pad-band-move-chip');
    expect(moveChips && moveChips.length > 0).toBe(true);

    const firstChip = moveChips![0] as HTMLElement;
    const initialText = firstChip.textContent?.trim();
    expect(initialText).toBeTruthy();

    const progSpy = vi.fn();
    el.addEventListener('progression-change', (e: any) => progSpy(e.detail));

    // Click the band move chip to apply it
    firstChip.click();
    await el.updateComplete;

    expect(progSpy).toHaveBeenCalled();
    const updatedProg: Progression = progSpy.mock.calls[0][0];
    // The chord in bar 1 was modified to the band trick chord
    expect(updatedProg.chords[0].name).not.toBe(sampleProgression.chords[0].name);

    // Chip now displays "Revert"
    const revertedChip = el.shadowRoot?.querySelector('.pad-band-move-chip.applied') as HTMLElement;
    expect(revertedChip).toBeTruthy();
    expect(revertedChip.textContent).toContain('Revert');

    // Clicking Revert restores the original chord
    revertedChip.click();
    await el.updateComplete;

    expect(progSpy).toHaveBeenCalledTimes(2);
    const restoredProg: Progression = progSpy.mock.calls[1][0];
    expect(restoredProg.chords[0].name).toBe(sampleProgression.chords[0].name);

    document.body.removeChild(el);
  });

  it('hoists band moves in chord swap lane feelings with bandTag and banner', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    el.chordData = chordData;
    document.body.appendChild(el);
    await el.updateComplete;

    el.selectedBand = 'Radiohead';
    await el.updateComplete;

    // Open swap for bar 1
    (el as any).openSwap(0);
    await el.updateComplete;

    const feelings = (el as any).getSwapFeelings(0);
    expect(feelings.length).toBeGreaterThan(0);

    // Any feeling containing a matching band trick has bandTag set and hoisted to the top
    const feelingsWithBand = feelings.filter((f: any) => f.rows.some((r: any) => r.bandTag));
    expect(feelingsWithBand.length).toBeGreaterThan(0);

    const firstHoistingGroup = feelingsWithBand[0];
    const hoistedRow = firstHoistingGroup.rows[0];
    expect(hoistedRow.bandTag).toContain('Radiohead move');

    document.body.removeChild(el);
  });

  it('renders full bandCard in Studio inspector showing wordmark and 3 habit rows', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    el.chordData = chordData;
    document.body.appendChild(el);
    await el.updateComplete;

    el.selectedBand = 'Oasis';
    await el.updateComplete;

    const bandCard = el.shadowRoot?.querySelector('.band-card');
    expect(bandCard).toBeTruthy();
    expect(bandCard?.textContent).toContain('Oasis');
    expect(bandCard?.textContent).toContain('Band DNA');
    expect(bandCard?.textContent).toContain('Harmony');
    expect(bandCard?.textContent).toContain('Cadence');
    expect(bandCard?.textContent).toContain('Voicing');

    document.body.removeChild(el);
  });
});
