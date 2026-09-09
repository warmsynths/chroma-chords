// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('tone', () => ({
  Compressor: class { connect() { return this; } toDestination() { return this; } },
  Sampler: class { connect() { return this; } triggerAttackRelease() { } triggerAttack() { } triggerRelease() { } },
  PolySynth: class { connect() { return this; } triggerAttackRelease() { } triggerAttack() { } triggerRelease() { } set() { } },
  Synth: class { triggerAttackRelease() { } },
  MonoSynth: class { triggerAttackRelease() { } },
  FMSynth: class { triggerAttackRelease() { } },
  Reverb: class { connect() { return this; } },
  Chorus: class { start() { return this; } connect() { return this; } },
  loaded: () => Promise.resolve(),
  start: () => Promise.resolve(),
  now: () => 0,
}));

import './loop-screen';
import './app-header';
import './auth-modal';
import { LoopScreen } from './loop-screen';
import { AppHeader } from './app-header';
import { AuthModal } from './auth-modal';
import { Progression } from '../services/chord-engine';

describe('Studio Component Interactions', () => {
  const sampleProgression: Progression = {
    genre: 'Pop',
    mood: 'Warm',
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

  it('renders loop-screen and handles Genre pill click', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    el.vibeOpen = true;
    await el.updateComplete;

    const setGenreSpy = vi.fn();
    el.addEventListener('set-genre', (e: any) => setGenreSpy(e.detail));

    const genrePills = el.shadowRoot?.querySelectorAll('.pills-group .pill');
    expect(genrePills && genrePills.length > 0).toBe(true);

    const lofiPill = Array.from(genrePills || []).find(p => p.textContent?.includes('Lo-fi')) as HTMLElement;
    if (lofiPill) {
      lofiPill.click();
      expect(setGenreSpy).toHaveBeenCalledWith('Lo-fi/Chill');
    }

    document.body.removeChild(el);
  });

  it('handles Mood pill click', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    el.vibeOpen = true;
    await el.updateComplete;

    const setMoodSpy = vi.fn();
    el.addEventListener('set-mood', (e: any) => setMoodSpy(e.detail));

    const moodPills = el.shadowRoot?.querySelectorAll('.pills-group .pill');
    const dreamPill = Array.from(moodPills || []).find(p => p.textContent?.includes('Dreamy')) as HTMLElement;
    if (dreamPill) {
      dreamPill.click();
      expect(setMoodSpy).toHaveBeenCalledWith('Dreamy');
    }

    document.body.removeChild(el);
  });

  it('switches view tabs between Chords, Song, and Play it', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    const tabs = el.shadowRoot?.querySelectorAll('.view-tab');
    expect(tabs?.length).toBe(3);

    const tabNames = Array.from(tabs || []).map(t => t.textContent?.trim());
    expect(tabNames).toEqual(['Chords', 'Song', 'Play it']);

    // Switch to Song
    const songTab = tabs![1] as HTMLElement;
    songTab.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.song-track-list')).toBeTruthy();

    // Switch to Play it
    const playTab = tabs![2] as HTMLElement;
    playTab.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.play-it-wrap, .play-card')).toBeTruthy();

    document.body.removeChild(el);
  });

  it('handles transport Play/Pause click and Steppers', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    const playSpy = vi.fn();
    const lenSpy = vi.fn();
    const rerollSpy = vi.fn();

    el.addEventListener('toggle-play', playSpy);
    el.addEventListener('set-length', (e: any) => lenSpy(e.detail));
    el.addEventListener('reroll', rerollSpy);

    const playBtn = el.shadowRoot?.querySelector('.play-circle-btn') as HTMLElement;
    playBtn?.click();
    expect(playSpy).toHaveBeenCalled();

    const stepperBtns = el.shadowRoot?.querySelectorAll('.stepper-btn');
    if (stepperBtns && stepperBtns.length >= 2) {
      (stepperBtns[1] as HTMLElement).click(); // + button
      expect(lenSpy).toHaveBeenCalledWith(5);
    }

    const diceBtn = el.shadowRoot?.querySelector('.dice-reroll-btn, button[aria-label="Try another progression"]') as HTMLElement;
    diceBtn?.click();
    expect(rerollSpy).toHaveBeenCalled();

    document.body.removeChild(el);
  });

  it('app-header dispatches request-login on Sign in click', async () => {
    const header = document.createElement('app-header') as AppHeader;
    document.body.appendChild(header);
    await header.updateComplete;

    const loginSpy = vi.fn();
    header.addEventListener('request-login', loginSpy);

    const signInBtn = header.shadowRoot?.querySelector('.sign-in-btn') as HTMLElement;
    expect(signInBtn).toBeTruthy();
    signInBtn.click();

    expect(loginSpy).toHaveBeenCalled();
    document.body.removeChild(header);
  });

  it('auth-modal mounts dialog when open is set to true', async () => {
    const modal = document.createElement('auth-modal') as AuthModal;
    modal.open = true;
    document.body.appendChild(modal);
    await modal.updateComplete;

    const modalBox = modal.shadowRoot?.querySelector('.modal.visible');
    expect(modalBox).toBeTruthy();

    const closeBtn = modal.shadowRoot?.querySelector('.close-btn') as HTMLElement;
    const closeSpy = vi.fn();
    modal.addEventListener('close', closeSpy);
    closeBtn?.click();
    expect(closeSpy).toHaveBeenCalled();

    document.body.removeChild(modal);
  });

  it('renders Your Loops popover when libraryOpen is true', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    el.libraryOpen = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const popover = el.shadowRoot?.querySelector('.library-popover');
    expect(popover).toBeTruthy();

    const searchInput = popover?.querySelector('input') as HTMLInputElement;
    expect(searchInput).toBeTruthy();
    expect(searchInput.placeholder).toContain('Search');

    document.body.removeChild(el);
  });

  it('renders interactive progression pads and triggers pad hold/play', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    const pads = el.shadowRoot?.querySelectorAll('.pad-cells-row .pad-cell');
    expect(pads?.length).toBe(4);

    const firstPad = pads![0] as HTMLElement;
    expect(firstPad.textContent).toContain('C');

    // Simulate pointerdown
    firstPad.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await el.updateComplete;

    expect(el.padFlash).toBe(0);
    expect(firstPad.classList.contains('pad-held')).toBe(true);

    // Simulate pointerup
    firstPad.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    await el.updateComplete;

    expect(el.padFlash).toBe(-1);
    expect(firstPad.classList.contains('pad-held')).toBe(false);

    document.body.removeChild(el);
  });

  it('renders honest loop strip with bar jump chips and triggers jump', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    const strip = el.shadowRoot?.querySelector('.loop-strip-header');
    expect(strip).toBeTruthy();

    const cells = strip?.querySelectorAll('.strip-cell');
    expect(cells?.length).toBe(16);

    const jumpChips = strip?.querySelectorAll('.strip-jump-chip');
    expect(jumpChips?.length).toBe(4);

    // Click bar 3 jump chip
    const bar3Chip = jumpChips![2] as HTMLElement;
    expect(bar3Chip.textContent?.trim()).toBe('3');
    bar3Chip.click();
    await el.updateComplete;

    expect(el.progressStep).toBe(8);

    document.body.removeChild(el);
  });

  it('quick settings bar controls tempo, feel, theory, and bounce modal', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    const quickBar = el.shadowRoot?.querySelector('.stage-quick-controls');
    expect(quickBar).toBeTruthy();

    // Key & Tempo chip
    const tempoChip = quickBar?.querySelector('.tempo-chip') as HTMLElement;
    expect(tempoChip).toBeTruthy();
    tempoChip.click();
    await el.updateComplete;
    expect(el.tempoOpen).toBe(true);

    // Feel chip
    const feelChip = quickBar?.querySelector('.feel-chip') as HTMLElement;
    expect(feelChip).toBeTruthy();
    feelChip.click();
    await el.updateComplete;
    expect(el.feelOpen).toBe(true);

    // Theory toggle button in inspector
    const theoryToggle = el.shadowRoot?.querySelector('.theory-toggle-btn') as HTMLElement;
    expect(theoryToggle).toBeTruthy();
    expect(el.showTheory).toBe(false);
    theoryToggle.click();
    await el.updateComplete;
    expect(el.showTheory).toBe(true);

    // Bounce button opens bounce modal
    const bounceBtn = quickBar?.querySelector('.bounce-btn') as HTMLElement;
    expect(bounceBtn).toBeTruthy();
    bounceBtn.click();
    await el.updateComplete;
    expect(el.bounceOpen).toBe(true);

    document.body.removeChild(el);
  });

  it('pad info button opens typographic Chord Info inspector without piano diagram', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    const pads = el.shadowRoot?.querySelectorAll('.pad-cells-row .pad-cell');
    const firstPad = pads![0] as HTMLElement;

    // Click detail button on chord C
    const infoBtn = firstPad.querySelector('.pad-detail-btn') as HTMLElement;
    expect(infoBtn).toBeTruthy();
    infoBtn.click();
    await el.updateComplete;

    const inspector = el.shadowRoot?.querySelector('aside.inspector-right');
    expect(inspector).toBeTruthy();
    expect(inspector?.textContent).toContain('Chord');
    expect(inspector?.textContent).toContain('Notes');

    // Note pills
    const pills = inspector?.querySelectorAll('.note-pill');
    expect(pills && pills.length >= 3).toBe(true);

    // Quality and Extension boxes
    expect(inspector?.querySelector('.detail-quality-box')).toBeTruthy();
    expect(inspector?.querySelector('.detail-extension-box')).toBeTruthy();

    // Verify NO piano keyboard graphic is rendered in chord info inspector
    expect(inspector?.querySelector('piano-card, .piano-card, svg rect[height="100"]')).toBeFalsy();

    // Close button
    const closeBtn = inspector?.querySelector('.close-detail-btn') as HTMLElement;
    expect(closeBtn).toBeTruthy();

    document.body.removeChild(el);
  });
});
