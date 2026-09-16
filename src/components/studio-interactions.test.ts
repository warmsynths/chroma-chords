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
    expect(el.shadowRoot?.querySelector('.song-track-list, .song-view-wrap')).toBeTruthy();

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

    const playBtn = el.shadowRoot?.querySelector('.play-circle-btn, .loop-play-btn') as HTMLElement;
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

  it('handles loops library select mode, select all, item selection, and deletion', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    el.libraryOpen = true;
    const testSets = [
      { id: 'loop-1', name: 'Chill Beats', genre: 'Lofi', mood: 'Warm', chords: [] },
      { id: 'loop-2', name: 'Jazz Glow', genre: 'Jazz', mood: 'Soulful', chords: [] },
    ];
    document.body.appendChild(el);
    (el as any).savedSets = testSets;
    el.requestUpdate();
    await el.updateComplete;

    const popover = el.shadowRoot?.querySelector('.library-popover');
    expect(popover).toBeTruthy();

    // 1. Initial state: "Select" button present, select-all control not visible
    const selectBtn = popover?.querySelector('.library-select-btn') as HTMLButtonElement;
    expect(selectBtn).toBeTruthy();
    expect(selectBtn.textContent?.trim()).toBe('Select');
    expect(popover?.querySelector('.library-select-all-btn')).toBeFalsy();

    // 2. Click "Select" button -> enters select mode
    selectBtn.click();
    await el.updateComplete;

    expect(selectBtn.textContent?.trim()).toBe('Done');
    const selectAllCheckbox = popover?.querySelector('.library-select-all-checkbox') as HTMLInputElement;
    const selectAllBtn = popover?.querySelector('.library-select-all-btn') as HTMLButtonElement;
    expect(selectAllCheckbox).toBeTruthy();
    expect(selectAllBtn).toBeTruthy();
    expect(selectAllBtn.textContent?.trim()).toBe('Select all');
    expect(selectAllCheckbox.checked).toBe(false);

    const itemCheckboxes = popover?.querySelectorAll('.loop-item-checkbox') as NodeListOf<HTMLInputElement>;
    expect(itemCheckboxes.length).toBe(2);

    // 3. Click first loop row -> selects it
    const items = popover?.querySelectorAll('.library-loop-item') as NodeListOf<HTMLElement>;
    expect(items.length).toBe(2);
    items[0].click();
    await el.updateComplete;

    expect((el as any).librarySelected).toEqual(['loop-1']);
    expect(items[0].classList.contains('selected')).toBe(true);
    expect(itemCheckboxes[0].checked).toBe(true);

    const deleteBtn = popover?.querySelector('.library-delete-btn') as HTMLButtonElement;
    expect(deleteBtn).toBeTruthy();
    expect(deleteBtn.textContent).toContain('Delete (1)');

    // 4. Click "Select all" button -> selects both
    selectAllBtn.click();
    await el.updateComplete;

    expect((el as any).librarySelected.length).toBe(2);
    expect((el as any).librarySelected).toContain('loop-1');
    expect((el as any).librarySelected).toContain('loop-2');
    expect(selectAllCheckbox.checked).toBe(true);
    expect(selectAllBtn.textContent?.trim()).toBe('Deselect all');
    expect(deleteBtn.textContent).toContain('Delete (2)');

    // 5. Click "Deselect all" button -> clears selection
    selectAllBtn.click();
    await el.updateComplete;

    expect((el as any).librarySelected.length).toBe(0);
    expect(selectAllCheckbox.checked).toBe(false);
    expect(selectAllBtn.textContent?.trim()).toBe('Select all');
    expect(popover?.querySelector('.library-delete-btn')).toBeFalsy();

    // 6. Test Select all checkbox change
    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect((el as any).librarySelected.length).toBe(2);

    // 7. Test delete selected
    const deleteProjectEvents: string[] = [];
    el.addEventListener('delete-project', ((e: CustomEvent<string>) => {
      deleteProjectEvents.push(e.detail);
    }) as EventListener);

    const activeDeleteBtn = popover?.querySelector('.library-delete-btn') as HTMLButtonElement;
    expect(activeDeleteBtn).toBeTruthy();
    activeDeleteBtn.click();
    await el.updateComplete;

    expect(deleteProjectEvents).toEqual(['loop-1', 'loop-2']);
    expect((el as any).librarySelected.length).toBe(0);

    // 8. Deleting all loops automatically exits select mode
    expect((el as any).librarySelectMode).toBe(false);
    expect(selectBtn.textContent?.trim()).toBe('Select');

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
    el.sections = [
      { name: 'Verse', desc: 'Main riff', progression: sampleProgression, order: [0, 1, 2, 3] },
      { name: 'Chorus', desc: 'Hook', progression: sampleProgression, order: [0, 1, 2, 3] },
    ];
    document.body.appendChild(el);
    await el.updateComplete;

    // Switch to song view
    const songTab = el.shadowRoot?.querySelectorAll('.view-tab')?.[1] as HTMLElement;
    songTab?.click();
    await el.updateComplete;

    const strip = el.shadowRoot?.querySelector('.loop-strip-header');
    expect(strip).toBeTruthy();

    const cells = strip?.querySelectorAll('.strip-cell');
    expect(cells?.length).toBe(2);

    document.body.removeChild(el);
  });

  it('quick settings bar controls tempo, feel, theory, and share modal', async () => {
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

    // Share button opens share modal
    const shareBtn = quickBar?.querySelector('.share-btn') as HTMLElement;
    expect(shareBtn).toBeTruthy();
    shareBtn.click();
    await el.updateComplete;
    expect(el.shareOpen).toBe(true);

    const shareModal = el.shadowRoot?.querySelector('share-modal') as HTMLElement;
    expect(shareModal).toBeTruthy();
    expect((shareModal as any).open).toBe(true);

    document.body.removeChild(el);
  });

  it('mobile share buttons open share modal/drawer', async () => {
    (window as any).innerWidth = 390;
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    // 1. Mobile quick chip share button
    const chipShareBtn = el.shadowRoot?.querySelector('.mobile-share-btn') as HTMLElement;
    expect(chipShareBtn).toBeTruthy();
    chipShareBtn.click();
    await el.updateComplete;
    expect(el.shareOpen).toBe(true);

    const shareModal = el.shadowRoot?.querySelector('share-modal') as HTMLElement;
    expect(shareModal).toBeTruthy();
    expect((shareModal as any).open).toBe(true);

    // Close modal
    shareModal.dispatchEvent(new CustomEvent('close'));
    await el.updateComplete;
    expect(el.shareOpen).toBe(false);

    // 2. Mobile bottom circle share button
    const circleShareBtn = el.shadowRoot?.querySelector('.mobile-bottom-transport-bar button[aria-label="Share this loop"]') as HTMLElement;
    expect(circleShareBtn).toBeTruthy();
    circleShareBtn.click();
    await el.updateComplete;
    expect(el.shareOpen).toBe(true);
    expect((shareModal as any).open).toBe(true);

    document.body.removeChild(el);
    (window as any).innerWidth = 1024;
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

  it('transposes progression on key click, adjusts bpm and barsPerChord, and updates feel settings', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = { ...sampleProgression, chords: [...sampleProgression.chords] };
    document.body.appendChild(el);
    await el.updateComplete;

    // Open tempo drawer
    el.tempoOpen = true;
    await el.updateComplete;

    // Test Transposition via Root button
    const keyButtons = Array.from(el.shadowRoot?.querySelectorAll('.tempo-popover-desktop button') || []);
    const gBtn = keyButtons.find(b => b.textContent?.trim() === 'G') as HTMLElement;
    expect(gBtn).toBeTruthy();

    const toastSpy = vi.fn();
    const progChangeSpy = vi.fn();
    el.addEventListener('toast', (e: any) => toastSpy(e.detail));
    el.addEventListener('progression-change', (e: any) => progChangeSpy(e.detail));

    gBtn.click();
    await el.updateComplete;

    expect(el.progression.key).toBe('G');
    expect(el.progression.chords[0].name).toBe('G');
    expect(toastSpy).toHaveBeenCalledWith(expect.stringContaining('Transposed to G'));
    expect(progChangeSpy).toHaveBeenCalled();

    // Test Scale shift via Scale button
    const minorBtn = keyButtons.find(b => b.textContent?.trim() === 'Minor') as HTMLElement;
    expect(minorBtn).toBeTruthy();
    minorBtn.click();
    await el.updateComplete;

    expect(el.progression.scaleType).toBe('NATURAL_MINOR');
    expect(el.progression.chords[0].name).toBe('Gm');
    expect(toastSpy).toHaveBeenCalledWith(expect.stringContaining('Scale shifted to G Minor'));

    // Test Direct BPM input
    const bpmInput = el.shadowRoot?.querySelector('.tempo-popover-desktop input[type="number"]') as HTMLInputElement;
    expect(bpmInput).toBeTruthy();
    bpmInput.value = '96';
    bpmInput.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect(el.progression.bpm).toBe(96);

    // Test Bars per chord
    const barsButtons = Array.from(el.shadowRoot?.querySelectorAll('.tempo-popover-desktop button') || []);
    const twoBarsBtn = barsButtons.find(b => b.textContent?.trim() === '2 bars') as HTMLElement;
    expect(twoBarsBtn).toBeTruthy();
    twoBarsBtn.click();
    await el.updateComplete;

    expect(el.barsPerChord).toBe(2);

    // Open Feel drawer
    el.tempoOpen = false;
    el.feelOpen = true;
    await el.updateComplete;

    // Test Feel selection (e.g. Swing: Light = 25)
    const feelButtons = Array.from(el.shadowRoot?.querySelectorAll('.feel-popover-desktop button') || []);
    const lightSwingBtn = feelButtons.find(b => b.getAttribute('aria-label')?.includes('Swing: Light')) as HTMLElement;
    expect(lightSwingBtn).toBeTruthy();
    lightSwingBtn.click();
    await el.updateComplete;

    expect(el.swing).toBe(25);

    // Test Tone selection (Glassy)
    const glassyBtn = feelButtons.find(b => b.textContent?.trim() === 'Glassy') as HTMLElement;
    expect(glassyBtn).toBeTruthy();
    glassyBtn.click();
    await el.updateComplete;

    expect(el.tone).toBe('Glassy');

    document.body.removeChild(el);
  });

  it('desktop swap button opens chord-swap-lane in main area and shows harmonic context in right inspector', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = { ...sampleProgression, chords: [...sampleProgression.chords] };
    document.body.appendChild(el);
    await el.updateComplete;

    const pads = el.shadowRoot?.querySelectorAll('.pad-cells-row .pad-cell');
    expect(pads?.length).toBe(4);

    // Click swap button on chord 1
    const swapBtn = pads![0].querySelector('.pad-swap-btn') as HTMLElement;
    expect(swapBtn).toBeTruthy();
    swapBtn.click();
    await el.updateComplete;

    // Verify chord-swap-lane exists in main stage pad grid
    const swapLane = el.shadowRoot?.querySelector('chord-swap-lane') as any;
    expect(swapLane).toBeTruthy();
    expect(swapLane.swapIndex).toBe(0);

    await swapLane.updateComplete;
    const chordsBox = swapLane.shadowRoot?.querySelector('.chords-box') as HTMLElement;
    const chordsNeck = swapLane.shadowRoot?.querySelector('.chords-neck') as HTMLElement;

    const firstFeel = swapLane.feelings[0]?.name;
    const lastFeel = swapLane.feelings[swapLane.feelings.length - 1]?.name;
    const middleFeel = swapLane.feelings[1]?.name;

    // First feel (seamless left corner)
    swapLane.activeFeel = firstFeel;
    await swapLane.updateComplete;
    expect(chordsBox.style.borderTopLeftRadius).toBe('0px');
    expect(chordsNeck.style.left).toBe('0px');

    // Last feel (seamless right corner, e.g. Borrowed)
    swapLane.activeFeel = lastFeel;
    await swapLane.updateComplete;
    expect(chordsBox.style.borderTopRightRadius).toBe('0px');
    expect(chordsNeck.style.right).toBe('0px');

    // Middle feel (rounded on both top corners)
    swapLane.activeFeel = middleFeel;
    await swapLane.updateComplete;
    expect(chordsBox.style.borderTopLeftRadius).toBe('12px');
    expect(chordsBox.style.borderTopRightRadius).toBe('12px');

    // Verify right inspector shows harmonic context
    const inspector = el.shadowRoot?.querySelector('aside.inspector-right');
    expect(inspector).toBeTruthy();
    expect(inspector?.textContent).toContain('Bar 1 Harmonic Context');

    // Simulate selecting a candidate chord
    swapLane.dispatchEvent(new CustomEvent('swap-audition', {
      detail: {
        chordName: 'Abmaj7',
        roman: '♭VI',
        notes: ['Ab4', 'C5', 'Eb5', 'G5'],
        sub: 'Cinematic shadow borrowed chord',
        tension: 0.55,
        feel: 'Darker',
      },
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    expect(inspector?.textContent).toContain('Auditioning · Darker');
    expect(inspector?.textContent).toContain('Abmaj7');
    expect(inspector?.textContent).toContain('Cinematic shadow');

    // Confirm swap
    swapLane.dispatchEvent(new CustomEvent('swap-confirm', { bubbles: true, composed: true }));
    await el.updateComplete;

    expect(el.progression.chords[0].name).toBe('Abmaj7');
    expect(el.shadowRoot?.querySelector('chord-swap-lane')).toBeFalsy();

    document.body.removeChild(el);
  });

  it('mobile swap flips pad into chord-pad-cycler inline without opening a bottom sheet', async () => {
    (window as any).innerWidth = 390;
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = { ...sampleProgression, chords: [...sampleProgression.chords] };
    document.body.appendChild(el);
    await el.updateComplete;

    const pads = el.shadowRoot?.querySelectorAll('.pad-cells-grid .pad-cell');
    expect(pads?.length).toBe(4);

    // Click swap on chord 2 (index 1)
    const swapBtn = pads![1].querySelector('.pad-swap-btn') as HTMLElement;
    expect(swapBtn).toBeTruthy();
    swapBtn.click();
    await el.updateComplete;

    // Verify NO bottom sheet was opened
    expect(el.shadowRoot?.querySelector('.mobile-swap-sheet')).toBeFalsy();

    // Verify chord-pad-cycler is rendered inline in the pad grid
    const cycler = el.shadowRoot?.querySelector('chord-pad-cycler') as HTMLElement;
    expect(cycler).toBeTruthy();
    expect((cycler as any).barIndex).toBe(1);
    expect((cycler as any).originalChord.name).toBe('G');

    // Simulate keeping the cycled chord
    cycler.dispatchEvent(new CustomEvent('cycler-keep', {
      detail: { chordName: 'Em7', feel: 'Resolve home' },
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('chord-pad-cycler')).toBeFalsy();

    document.body.removeChild(el);
    (window as any).innerWidth = 1024;
  });

  it('latches chord extension and voicing on pointer release', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = {
      ...sampleProgression,
      chords: sampleProgression.chords.map(c => ({ ...c })),
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const pad = el.shadowRoot?.querySelector('.pad-cells-grid .pad-cell') as HTMLElement;
    expect(pad).toBeTruthy();

    pad.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 150, right: 200, bottom: 150, x: 0, y: 0, toJSON: () => {}
    } as DOMRect);

    // Press down in the upper-right corner: x=180 (maj9), y=20 (up an octave)
    pad.dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 180,
      clientY: 20,
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    // Release pointer to latch
    pad.dispatchEvent(new PointerEvent('pointerup', {
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    expect(el.progression.chords[0].name).toBe('Cmaj9');
    expect(el.progression.chords[0].voicing).toBe('up an octave');
    expect(el.progression.chords[0].initialChord?.name).toBe('C');
    expect(el.progression.chords[0].tension).toBe(0.1);
    expect(el.progression.chords[0].color).toBe('#F2A79B');

    document.body.removeChild(el);
  });

  it('latches to another zone when pressing another zone on a locked chord', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = {
      ...sampleProgression,
      chords: sampleProgression.chords.map(c => ({ ...c })),
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const pad = el.shadowRoot?.querySelector('.pad-cells-grid .pad-cell') as HTMLElement;
    expect(pad).toBeTruthy();

    pad.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 150, right: 200, bottom: 150, x: 0, y: 0, toJSON: () => {}
    } as DOMRect);

    // Latch chord 0 to Cmaj9 first (x=180, y=20)
    pad.dispatchEvent(new PointerEvent('pointerdown', { clientX: 180, clientY: 20, bubbles: true, composed: true }));
    pad.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.progression.chords[0].name).toBe('Cmaj9');
    expect(el.progression.chords[0].initialChord?.name).toBe('C');

    // Press on Zone 2 (x=100, y=75 -> 7th / C7)
    pad.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 75, bubbles: true, composed: true }));
    pad.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
    await el.updateComplete;

    // Chord should now be latched to C7
    expect(el.progression.chords[0].name).toBe('C7');
    expect(el.progression.chords[0].voicing).toBe('1st inversion');
    expect(el.progression.chords[0].initialChord?.name).toBe('C');
    expect(el.progression.chords[0].tension).toBe(0.1);
    expect(el.progression.chords[0].color).toBe('#F2A79B');

    document.body.removeChild(el);
  });

  it('latches back to baseline triad when pressing zone 0 on a locked chord', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = {
      ...sampleProgression,
      chords: sampleProgression.chords.map(c => ({ ...c })),
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const pad = el.shadowRoot?.querySelector('.pad-cells-grid .pad-cell') as HTMLElement;
    expect(pad).toBeTruthy();

    pad.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 150, right: 200, bottom: 150, x: 0, y: 0, toJSON: () => {}
    } as DOMRect);

    // Latch chord 0 to Cmaj9 first
    pad.dispatchEvent(new PointerEvent('pointerdown', { clientX: 180, clientY: 20, bubbles: true, composed: true }));
    pad.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.progression.chords[0].name).toBe('Cmaj9');

    // Press on Zone 0 (x=20, y=75 -> root triad C)
    pad.dispatchEvent(new PointerEvent('pointerdown', { clientX: 20, clientY: 75, bubbles: true, composed: true }));
    pad.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
    await el.updateComplete;

    // Chord should latch back to baseline C
    expect(el.progression.chords[0].name).toBe('C');
    expect(el.progression.chords[0].voicing).toBe('1st inversion');
    expect(el.progression.chords[0].initialChord).toBeUndefined();

    document.body.removeChild(el);
  });

  it('slides across zones and latches target zone on pointerup', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    el.progression = {
      ...sampleProgression,
      chords: sampleProgression.chords.map(c => ({ ...c })),
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const pad = el.shadowRoot?.querySelector('.pad-cells-grid .pad-cell') as HTMLElement;
    expect(pad).toBeTruthy();

    pad.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 150, right: 200, bottom: 150, x: 0, y: 0, toJSON: () => {}
    } as DOMRect);

    // Pointer down at Zone 1 (x=60, y=75 -> C6)
    pad.dispatchEvent(new PointerEvent('pointerdown', { clientX: 60, clientY: 75, bubbles: true, composed: true }));
    await el.updateComplete;

    // Slide pointer across to Zone 3 (x=140, y=75 -> Cmaj7)
    pad.dispatchEvent(new PointerEvent('pointermove', { clientX: 140, clientY: 75, bubbles: true, composed: true }));
    await el.updateComplete;

    // Release pointer
    pad.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, composed: true }));
    await el.updateComplete;

    // Chord should latch to Cmaj7
    expect(el.progression.chords[0].name).toBe('Cmaj7');

    document.body.removeChild(el);
  });

  it('plays current chord and voicing when keyboard hotkey is pressed', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    const initialChords = sampleProgression.chords.map(c => ({ ...c }));
    initialChords[0] = { ...initialChords[0], name: 'Cmaj9', voicing: 'up an octave' };
    el.progression = {
      ...sampleProgression,
      chords: initialChords,
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const { playbackEngine } = await import('../services/playback-engine');
    const playNotesSpy = vi.spyOn(playbackEngine, 'playChordNotes');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    await el.updateComplete;

    expect(playNotesSpy).toHaveBeenCalledWith(
      expect.anything(),
      0.85,
      'up an octave',
      expect.any(Number)
    );

    document.body.removeChild(el);
  });

  it('triggers chords 5, 6, 7, 8 using keys z, x, c, v and renders correct badges', async () => {
    const el = document.createElement('loop-screen') as LoopScreen;
    const eightChords = [
      { name: 'C', tag: 'I', roman: 'I', color: '#F2A79B', functionLabel: 'Tonic', notes: ['C4', 'E4', 'G4'], scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 0.1 },
      { name: 'G', tag: 'V', roman: 'V', color: '#F6D98B', functionLabel: 'Dominant', notes: ['G4', 'B4', 'D5'], scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 0.8 },
      { name: 'Am', tag: 'vi', roman: 'vi', color: '#9CC0EC', functionLabel: 'Submediant', notes: ['A4', 'C5', 'E5'], scaleLabel: 'A Min', desc: '', degree: '6', scaleKey: 'A', tension: 0.3 },
      { name: 'F', tag: 'IV', roman: 'IV', color: '#C9A9E0', functionLabel: 'Subdominant', notes: ['F4', 'A4', 'C5'], scaleLabel: 'F Maj', desc: '', degree: '4', scaleKey: 'F', tension: 0.4 },
      { name: 'Dm', tag: 'ii', roman: 'ii', color: '#F2A79B', functionLabel: 'Supertonic', notes: ['D4', 'F4', 'A4'], scaleLabel: 'D Min', desc: '', degree: '2', scaleKey: 'D', tension: 0.3 },
      { name: 'Em', tag: 'iii', roman: 'iii', color: '#F6D98B', functionLabel: 'Mediant', notes: ['E4', 'G4', 'B4'], scaleLabel: 'E Min', desc: '', degree: '3', scaleKey: 'E', tension: 0.4 },
      { name: 'Fmaj7', tag: 'IV', roman: 'IV', color: '#C9A9E0', functionLabel: 'Subdominant', notes: ['F4', 'A4', 'C5', 'E5'], scaleLabel: 'F Maj', desc: '', degree: '4', scaleKey: 'F', tension: 0.5 },
      { name: 'G7', tag: 'V', roman: 'V', color: '#F6D98B', functionLabel: 'Dominant', notes: ['G4', 'B4', 'D5', 'F5'], scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 0.9 },
    ];
    el.progression = {
      ...sampleProgression,
      chords: eightChords,
    };
    document.body.appendChild(el);
    await el.updateComplete;

    // Check badges for all 8 pads
    const badges = el.shadowRoot?.querySelectorAll('.pad-cell .pad-key-badge span');
    expect(badges?.length).toBe(8);
    const expectedKeys = ['A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];
    badges?.forEach((badge, idx) => {
      expect(badge.textContent?.trim()).toBe(expectedKeys[idx]);
    });

    const { playbackEngine } = await import('../services/playback-engine');
    const playNotesSpy = vi.spyOn(playbackEngine, 'playChordNotes');

    // Test keys 'z', 'x', 'c', 'v' trigger chords 4, 5, 6, 7
    const testKeys = ['z', 'x', 'c', 'v'];
    for (let k = 0; k < testKeys.length; k++) {
      playNotesSpy.mockClear();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: testKeys[k] }));
      await el.updateComplete;

      expect(playNotesSpy).toHaveBeenCalledTimes(1);
      expect(playNotesSpy).toHaveBeenCalledWith(
        eightChords[4 + k].notes,
        0.85,
        expect.anything(),
        expect.any(Number)
      );
    }

    // Test modifier keys are ignored (e.g. Ctrl+Z, Ctrl+C should not trigger chord playback)
    playNotesSpy.mockClear();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', metaKey: true }));
    await el.updateComplete;
    expect(playNotesSpy).not.toHaveBeenCalled();

    document.body.removeChild(el);
  });
});


