// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import './tab-song';
import { TabSong } from './tab-song';
import { SongSection, SongTimelineItem } from '../../services/song-arranger';
import { Progression } from '../../services/chord-engine';

describe('TabSong Component', () => {
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

  const sampleSections: SongSection[] = [
    {
      name: 'Verse',
      desc: 'Settled, familiar.',
      progression: sampleProgression,
      order: [0, 1, 2, 3],
    },
    {
      name: 'Chorus',
      desc: 'Brighter, opens the key up.',
      progression: sampleProgression,
      order: [1, 2, 3, 0],
    },
  ];

  it('renders sections library with badge, name, and chord chips', async () => {
    const el = document.createElement('tab-song') as TabSong;
    el.sections = sampleSections;
    document.body.appendChild(el);
    await el.updateComplete;

    const cards = el.shadowRoot!.querySelectorAll('.section-card');
    expect(cards.length).toBe(2);

    const firstCardName = cards[0].querySelector('.section-name')?.textContent;
    expect(firstCardName).toBe('Verse');

    const firstCardBadge = cards[0].querySelector('.section-badge')?.textContent?.trim();
    expect(firstCardBadge).toBe('A');

    const chordChips = cards[0].querySelectorAll('.chord-chip');
    expect(chordChips.length).toBe(4);

    el.remove();
  });

  it('renders default timeline and adjusts repeat count', async () => {
    const el = document.createElement('tab-song') as TabSong;
    el.sections = sampleSections;
    document.body.appendChild(el);
    await el.updateComplete;

    const timelineCards = el.shadowRoot!.querySelectorAll('.timeline-card');
    expect(timelineCards.length).toBe(2);

    // Initial repeat count for first item is ×1
    const repeatLabel = timelineCards[0].querySelector('.repeat-label');
    expect(repeatLabel?.textContent).toBe('×1');

    // Click plus stepper
    const stepperBtns = timelineCards[0].querySelectorAll('.stepper-btn');
    const plusBtn = stepperBtns[1] as HTMLButtonElement;

    let reorderEventFired = false;
    el.addEventListener('reorder-timeline', () => {
      reorderEventFired = true;
    });

    plusBtn.click();
    await el.updateComplete;

    expect(reorderEventFired).toBe(true);
    const updatedRepeatLabel = el.shadowRoot!.querySelectorAll('.timeline-card')[0].querySelector('.repeat-label');
    expect(updatedRepeatLabel?.textContent).toBe('×2');

    el.remove();
  });

  it('dispatches select-section, edit-chords, and edit-melody events', async () => {
    const el = document.createElement('tab-song') as TabSong;
    el.sections = sampleSections;
    document.body.appendChild(el);
    await el.updateComplete;

    let selectedIdx = -1;
    let editedChordsIdx = -1;
    let editedMelodyIdx = -1;

    el.addEventListener('select-section', (e: any) => {
      selectedIdx = e.detail.sectionIndex;
    });
    el.addEventListener('edit-chords', (e: any) => {
      editedChordsIdx = e.detail.sectionIndex;
    });
    el.addEventListener('edit-melody', (e: any) => {
      editedMelodyIdx = e.detail.sectionIndex;
    });

    const secondCard = el.shadowRoot!.querySelectorAll('.section-card')[1] as HTMLElement;
    secondCard.click();
    expect(selectedIdx).toBe(1);

    const editChordsBtn = secondCard.querySelectorAll('.action-btn')[1] as HTMLButtonElement;
    editChordsBtn.click();
    expect(editedChordsIdx).toBe(1);

    const editMelodyBtn = secondCard.querySelectorAll('.action-btn')[2] as HTMLButtonElement;
    editMelodyBtn.click();
    expect(editedMelodyIdx).toBe(1);

    el.remove();
  });

  it('appends section instance to timeline with + Add to song', async () => {
    const el = document.createElement('tab-song') as TabSong;
    el.sections = sampleSections;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelectorAll('.timeline-card').length).toBe(2);

    const addBtn = el.shadowRoot!.querySelectorAll('.section-card')[0].querySelector('.action-btn.primary') as HTMLButtonElement;
    addBtn.click();
    await el.updateComplete;

    expect(el.shadowRoot!.querySelectorAll('.timeline-card').length).toBe(3);

    el.remove();
  });

  it('reorders and removes timeline instances', async () => {
    const el = document.createElement('tab-song') as TabSong;
    el.sections = sampleSections;
    el.timeline = [
      { id: 't-0', sectionIndex: 0, repeats: 1 },
      { id: 't-1', sectionIndex: 1, repeats: 1 },
      { id: 't-2', sectionIndex: 0, repeats: 2 },
    ];
    document.body.appendChild(el);
    await el.updateComplete;

    const cards = el.shadowRoot!.querySelectorAll('.timeline-card');
    expect(cards.length).toBe(3);

    // Move first item down
    const firstMoveDownBtn = cards[0].querySelectorAll('.icon-action-btn')[1] as HTMLButtonElement;
    firstMoveDownBtn.click();
    await el.updateComplete;

    // After moving down, the first item should now be section 1 (Chorus)
    const newCards = el.shadowRoot!.querySelectorAll('.timeline-card');
    expect(newCards[0].querySelector('.timeline-card-name')?.textContent).toBe('Chorus');

    // Remove the last item
    const lastDeleteBtn = newCards[2].querySelector('.delete-item-btn') as HTMLButtonElement;
    lastDeleteBtn.click();
    await el.updateComplete;

    expect(el.shadowRoot!.querySelectorAll('.timeline-card').length).toBe(2);

    el.remove();
  });

  it('lets you pick which kind of section to add next', async () => {
    const el = document.createElement('tab-song') as TabSong;
    el.sections = sampleSections;
    document.body.appendChild(el);
    await el.updateComplete;

    const added: string[] = [];
    el.addEventListener('add-section', (e: Event) => added.push((e as CustomEvent).detail.type));

    (el.shadowRoot!.querySelector('.new-section-btn') as HTMLButtonElement).click();
    await el.updateComplete;
    const chips = Array.from(el.shadowRoot!.querySelectorAll('.type-chip')) as HTMLButtonElement[];
    expect(chips.map(c => c.querySelector('.type-chip-name')!.textContent)).toEqual(
      expect.arrayContaining(['Verse', 'Pre-chorus', 'Chorus', 'Bridge', 'Outro'])
    );
    chips.find(c => c.querySelector('.type-chip-name')!.textContent === 'Bridge')!.click();
    expect(added).toEqual(['Bridge']);

    el.remove();
  });

  it('stops offering new sections once the song is full', async () => {
    const el = document.createElement('tab-song') as TabSong;
    el.sections = Array.from({ length: 12 }, (_, i) => ({ ...sampleSections[0], name: `S${i}` }));
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.new-section-btn')).toBeNull();
    expect(el.shadowRoot!.querySelector('.picker-note')?.textContent).toContain('12 sections');
    el.remove();
  });

  it('reorders the song with a touch drag on the grip (HTML5 drag does not fire on touch)', async () => {
    const el = document.createElement('tab-song') as TabSong;
    el.sections = sampleSections;
    el.timeline = [
      { id: 't0', sectionIndex: 0, repeats: 1 },
      { id: 't1', sectionIndex: 1, repeats: 1 },
    ];
    document.body.appendChild(el);
    await el.updateComplete;

    const reordered: any[] = [];
    el.addEventListener('reorder-timeline', (e: any) => reordered.push(e.detail.timeline));

    const rows = el.shadowRoot!.querySelectorAll('.timeline-card');
    const grip = rows[0].querySelector('.drag-handle') as HTMLElement;
    const lastRow = rows[1] as HTMLElement;
    // happy-dom has no layout, so hit-test the second row directly
    (el.shadowRoot as any).elementFromPoint = () => lastRow;

    grip.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', bubbles: true, composed: true, cancelable: true }));
    window.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'touch', clientX: 10, clientY: 80 }));
    window.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'touch' }));

    expect(reordered.length).toBe(1);
    expect(reordered[0].map((t: any) => t.sectionIndex)).toEqual([1, 0]);
  });
});
