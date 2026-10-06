// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import './transport-bar';
import './mobile-dock';
import type { TransportBar } from './transport-bar';
import type { MobileDock } from './mobile-dock';

describe('TransportBar component', () => {
  const dummySections = [
    { id: 'A', name: 'Verse', tint: '#9CC0EC', chords: [], order: [0, 1, 2, 3], progression: { chords: [], bpm: 84 } as any, desc: '' },
    { id: 'B', name: 'Chorus', tint: '#F2A79B', chords: [], order: [0, 1, 2, 3], progression: { chords: [], bpm: 84 } as any, desc: '' },
  ];

  let el: TransportBar;

  beforeEach(async () => {
    el = document.createElement('transport-bar') as TransportBar;
    el.activeTab = 'loop';
    el.isPlaying = false;
    el.playLabel = 'Play section';
    el.moodColor = '#C9A9E0';
    el.sections = dummySections;
    el.activeSectionId = 'A';
    el.chordSound = 'Stage Rhodes';
    el.chordFeel = 'Block chords';
    el.bpm = 84;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it('renders with dark background and play button', async () => {
    const playBtn = el.shadowRoot!.querySelector('.play-btn') as HTMLButtonElement;
    expect(playBtn).toBeTruthy();
    expect(playBtn.textContent).toContain('Play section');
    expect(playBtn.textContent).toContain('▶');

    const togglePlaySpy = vi.fn();
    el.addEventListener('toggle-play', togglePlaySpy);
    playBtn.click();

    expect(togglePlaySpy).toHaveBeenCalledTimes(1);
    expect(togglePlaySpy.mock.calls[0][0].detail.isPlaying).toBe(true);
  });

  it('shows Loop cycle button only on melody tab', async () => {
    el.activeTab = 'melody';
    el.melodyLoop = 'Section';
    await el.updateComplete;

    const loopBtn = Array.from(el.shadowRoot!.querySelectorAll('.tb-btn'))
      .find(b => b.textContent?.includes('Loop'));
    expect(loopBtn).toBeTruthy();
    expect(loopBtn?.textContent).toContain('Section');

    const loopSpy = vi.fn();
    el.addEventListener('loop-cycle', loopSpy);
    (loopBtn as HTMLElement).click();
    expect(loopSpy).toHaveBeenCalledTimes(1);
  });

  it('opens sound popover and dispatches set-chord-sound / set-melody-sound', async () => {
    const soundBtn = Array.from(el.shadowRoot!.querySelectorAll('.tb-btn'))
      .find(b => b.textContent?.includes('Sound')) as HTMLElement;
    expect(soundBtn).toBeTruthy();
    soundBtn.click();
    await el.updateComplete;

    const soundPopover = el.shadowRoot!.querySelector('.sound-popover');
    expect(soundPopover).toBeTruthy();

    const pianoItem = Array.from(soundPopover!.querySelectorAll('.sound-item'))
      .find(i => i.textContent?.includes('Grand Piano')) as HTMLElement;
    expect(pianoItem).toBeTruthy();

    const soundSpy = vi.fn();
    el.addEventListener('set-chord-sound', soundSpy);
    pianoItem.click();

    expect(soundSpy).toHaveBeenCalledTimes(1);
    expect(soundSpy.mock.calls[0][0].detail.sound).toBe('Grand Piano');
  });

  it('opens tempo popover and adjusts BPM and key', async () => {
    const tempoTrigger = Array.from(el.shadowRoot!.querySelectorAll('.tb-btn'))
      .find(b => b.textContent?.includes('BPM')) as HTMLElement;
    expect(tempoTrigger).toBeTruthy();
    tempoTrigger.click();
    await el.updateComplete;

    const tempoPopover = el.shadowRoot!.querySelector('.tempo-popover');
    expect(tempoPopover).toBeTruthy();

    const bpmSpy = vi.fn();
    el.addEventListener('set-bpm', bpmSpy);

    const plusBtn = Array.from(tempoPopover!.querySelectorAll('.bpm-stepper button'))
      .find(b => b.textContent === '+') as HTMLElement;
    plusBtn.click();

    expect(bpmSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { bpm: 85 }
    }));

    const keySpy = vi.fn();
    el.addEventListener('set-key', keySpy);

    const gKeyBtn = Array.from(tempoPopover!.querySelectorAll('.pill-btn'))
      .find(b => b.textContent?.trim() === 'G') as HTMLElement;
    gKeyBtn.click();

    expect(keySpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { root: 'G', mode: 'Major' }
    }));
  });

  it('dispatches open-share when share button is clicked', async () => {
    const shareBtn = el.shadowRoot!.querySelector('.share-btn') as HTMLElement;
    expect(shareBtn).toBeTruthy();

    const shareSpy = vi.fn();
    el.addEventListener('open-share', shareSpy);
    shareBtn.click();

    expect(shareSpy).toHaveBeenCalledTimes(1);
  });
});

describe('MobileDock component', () => {
  const dummySections = [
    { id: 'A', name: 'Verse', tint: '#9CC0EC', chords: [], order: [0, 1, 2, 3], progression: { chords: [], bpm: 84 } as any, desc: '' },
    { id: 'B', name: 'Chorus', tint: '#F2A79B', chords: [], order: [0, 1, 2, 3], progression: { chords: [], bpm: 84 } as any, desc: '' },
  ];

  let el: MobileDock;

  beforeEach(async () => {
    el = document.createElement('mobile-dock') as MobileDock;
    el.activeTab = 'loop';
    el.isPlaying = false;
    el.sections = dummySections;
    el.activeSectionId = 'A';
    el.keyRoot = 'C';
    el.scaleMode = 'Major';
    el.bpm = 84;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it('renders dock with play button, section badge, sound/feel/key triggers, and more button', async () => {
    const playBtn = el.shadowRoot!.querySelector('.play-btn') as HTMLElement;
    expect(playBtn).toBeTruthy();

    const playSpy = vi.fn();
    el.addEventListener('toggle-play', playSpy);
    playBtn.click();
    expect(playSpy).toHaveBeenCalledTimes(1);

    const secBadge = el.shadowRoot!.querySelector('.sec-letter-badge');
    expect(secBadge?.textContent?.trim()).toBe('A');

    const moreBtn = el.shadowRoot!.querySelector('.more-btn') as HTMLElement;
    expect(moreBtn).toBeTruthy();
    moreBtn.click();
    await el.updateComplete;

    const morePopover = el.shadowRoot!.querySelector('.popover-up');
    expect(morePopover).toBeTruthy();
    expect(morePopover?.textContent).toContain('Try another progression');
    expect(morePopover?.textContent).toContain('Share and export');
  });

  it('opens bottom sheet for Key & Tempo and allows BPM change', async () => {
    const keyBtn = Array.from(el.shadowRoot!.querySelectorAll('.dock-btn'))
      .find(b => b.textContent?.includes('C')) as HTMLElement;
    expect(keyBtn).toBeTruthy();
    keyBtn.click();
    await el.updateComplete;

    const bottomSheet = el.shadowRoot!.querySelector('.bottom-sheet');
    expect(bottomSheet).toBeTruthy();
    expect(bottomSheet?.textContent).toContain('Key & Tempo');

    const bpmSpy = vi.fn();
    el.addEventListener('set-bpm', bpmSpy);

    const plusBtn = Array.from(bottomSheet!.querySelectorAll('.bpm-stepper button'))
      .find(b => b.textContent === '+') as HTMLElement;
    plusBtn.click();

    expect(bpmSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { bpm: 85 }
    }));
  });
});

describe('TransportBar song loop', () => {
  it('shows Loop On/Off on the Song tab and toggles it', async () => {
    const el = document.createElement('transport-bar') as any;
    el.activeTab = 'song';
    el.songLoop = true;
    document.body.appendChild(el);
    await el.updateComplete;
    const btn = el.shadowRoot.querySelector('[aria-label="Loop the song"]') as HTMLButtonElement;
    expect(btn.textContent).toContain('On');
    const spy = vi.fn();
    el.addEventListener('song-loop-change', spy);
    btn.click();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ detail: { loop: false } }));
    el.songLoop = false;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[aria-label="Loop the song"]').textContent).toContain('Off');
    el.remove();
  });
});
