// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import './tab-play';
import { TabPlay, guitarVoicing, ukeVoicing } from './tab-play';
import { Progression } from '../../services/chord-engine';

describe('TabPlay Component & Instrument Voicings', () => {
  const sampleProgression: Progression = {
    genre: 'Pop',
    mood: 'Dreamy',
    key: 'C',
    scaleType: 'MAJOR',
    bpm: 120,
    chords: [
      { name: 'C', tag: 'I', roman: 'I', color: '#fff', functionLabel: 'Tonic', notes: ['C', 'E', 'G'], scaleLabel: 'C Maj', desc: '', degree: '1', scaleKey: 'C', tension: 0.1 },
      { name: 'F', tag: 'IV', roman: 'IV', color: '#fff', functionLabel: 'Subdominant', notes: ['F', 'A', 'C'], scaleLabel: 'F Maj', desc: '', degree: '4', scaleKey: 'F', tension: 0.4 },
      { name: 'G', tag: 'V', roman: 'V', color: '#fff', functionLabel: 'Dominant', notes: ['G', 'B', 'D'], scaleLabel: 'G Maj', desc: '', degree: '5', scaleKey: 'G', tension: 0.7 },
      { name: 'Am', tag: 'vi', roman: 'vi', color: '#fff', functionLabel: 'Submediant', notes: ['A', 'C', 'E'], scaleLabel: 'A Min', desc: '', degree: '6', scaleKey: 'A', tension: 0.3 },
    ],
  };

  it('computes valid open and barre voicings for guitar and ukulele', () => {
    // C major guitar
    const cGuitar = guitarVoicing({ root: 'C', rootPc: 0, q: 'maj', intervals: [0, 4, 7] });
    expect(cGuitar).toBeDefined();
    expect(cGuitar).toHaveLength(6);

    // Am ukulele
    const amUke = ukeVoicing({ root: 'A', rootPc: 9, q: 'm', intervals: [0, 3, 7] });
    expect(amUke).toBeDefined();
    expect(amUke).toHaveLength(4);
    // Standard Am on ukulele is [2, 0, 0, 0]
    expect(amUke).toEqual([2, 0, 0, 0]);
  });

  it('renders piano visualizer cards by default', async () => {
    const el = document.createElement('tab-play') as TabPlay;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    const cards = el.shadowRoot!.querySelectorAll('.play-card');
    expect(cards.length).toBe(4);

    const firstTitle = cards[0].querySelector('.chord-title')?.textContent;
    expect(firstTitle).toBe('C');

    // Piano SVG keyboard exists
    const pianoSvg = cards[0].querySelector('svg');
    expect(pianoSvg).toBeDefined();
    expect(pianoSvg?.getAttribute('viewBox')).toContain('0 84');

    el.remove();
  });

  it('switches between instruments and updates visualizers', async () => {
    const el = document.createElement('tab-play') as TabPlay;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    // Switch to Guitar
    const chips = el.shadowRoot!.querySelectorAll('.tier2-chip');
    const guitarChip = chips[1] as HTMLButtonElement;
    guitarChip.click();
    await el.updateComplete;

    expect(el.playInstrument).toBe('Guitar');
    let fretCards = el.shadowRoot!.querySelectorAll('.fret-grid .play-card');
    expect(fretCards.length).toBe(4);

    // Switch to Ukulele
    const ukeChip = chips[2] as HTMLButtonElement;
    ukeChip.click();
    await el.updateComplete;

    expect(el.playInstrument).toBe('Ukulele');
    fretCards = el.shadowRoot!.querySelectorAll('.fret-grid .play-card');
    expect(fretCards.length).toBe(4);

    el.remove();
  });

  it('toggles scale degrees switch', async () => {
    const el = document.createElement('tab-play') as TabPlay;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.showDegrees).toBe(false);

    const switchEl = el.shadowRoot!.querySelector('.degrees-switch') as HTMLElement;
    switchEl.click();
    await el.updateComplete;

    expect(el.showDegrees).toBe(true);

    // Notes line should now include degrees
    const notesLine = el.shadowRoot!.querySelector('.notes-line')?.textContent;
    expect(notesLine).toContain('(1)');

    el.remove();
  });

  it('dispatches play-chord event on card click', async () => {
    const el = document.createElement('tab-play') as TabPlay;
    el.progression = sampleProgression;
    document.body.appendChild(el);
    await el.updateComplete;

    let clickedChordName = '';
    let clickedIdx = -1;

    el.addEventListener('play-chord', (e: any) => {
      clickedChordName = e.detail.chord.name;
      clickedIdx = e.detail.index;
    });

    const firstCard = el.shadowRoot!.querySelectorAll('.play-card')[0] as HTMLElement;
    firstCard.click();

    expect(clickedChordName).toBe('C');
    expect(clickedIdx).toBe(0);

    el.remove();
  });
});
