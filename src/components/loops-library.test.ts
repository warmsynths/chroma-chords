// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import './loops-library';
import { LoopsLibrary } from './loops-library';
import type { ProjectData } from '../services/project-service';

const mk = (id: string, name: string, genre: string, mood: string): ProjectData => ({
  id, name, lastModified: 1, genre, mood, key: 'C', scaleType: 'MAJOR', bpm: 100,
  chords: [0, 1, 2, 3].map(i => ({ name: 'C', tag: 'd', roman: 'I', color: '#9CC0EC', functionLabel: 'Tonic', notes: [], scaleLabel: '', desc: '', degree: '1', scaleKey: 'C', tension: 0.1 + i * 0.1 })),
});

async function make(sets: ProjectData[]) {
  const el = document.createElement('loops-library') as LoopsLibrary;
  el.sets = sets;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('LoopsLibrary', () => {
  const sets = [mk('a', '2am drive', 'Lo-fi', 'Dreamy'), mk('b', 'Sunday soul', 'R&B', 'Warm'), mk('c', 'Neon night', 'Pop', 'Tense')];

  it('shows an empty message when nothing is saved', async () => {
    const el = await make([]);
    expect(el.shadowRoot!.textContent).toContain('Nothing saved yet');
  });

  it('lists loops with chord dots and genre · mood, and loads one on click', async () => {
    const el = await make(sets);
    const rows = el.shadowRoot!.querySelectorAll('.row');
    expect(rows.length).toBe(3);
    expect(rows[0].querySelectorAll('.dots span').length).toBe(4);
    expect(rows[0].textContent).toContain('Lo-fi · Dreamy');

    const spy = vi.fn();
    el.addEventListener('select-set', spy);
    (rows[1].querySelector('.main') as HTMLElement).click();
    expect(spy.mock.calls[0][0].detail.id).toBe('b');
  });

  it('filters with search once there are more than two loops', async () => {
    const el = await make(sets);
    const input = el.shadowRoot!.querySelector('.search input') as HTMLInputElement;
    input.value = 'soul';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('.row').length).toBe(1);
  });

  it('deletes in two steps and emits the id', async () => {
    const el = await make(sets);
    const spy = vi.fn();
    el.addEventListener('delete-set', spy);
    (el.shadowRoot!.querySelector('[aria-label="Delete loop"]') as HTMLElement).click();
    await el.updateComplete;
    expect(spy).not.toHaveBeenCalled();
    (el.shadowRoot!.querySelector('.confirm-btn') as HTMLElement).click();
    expect(spy.mock.calls[0][0].detail).toBe('a');
  });

  it('renames in place on Enter', async () => {
    const el = await make(sets);
    const spy = vi.fn();
    el.addEventListener('rename-set', spy);
    (el.shadowRoot!.querySelector('[aria-label="Rename loop"]') as HTMLElement).click();
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('.rename-input') as HTMLInputElement;
    input.value = 'Late night';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy.mock.calls[0][0].detail).toEqual({ id: 'a', name: 'Late night' });
  });

  it('bulk-deletes selected loops', async () => {
    const el = await make(sets);
    const spy = vi.fn();
    el.addEventListener('delete-set', spy);
    (el.shadowRoot!.querySelector('.select-btn') as HTMLElement).click();
    await el.updateComplete;
    const checks = el.shadowRoot!.querySelectorAll('.check');
    (checks[0] as HTMLElement).click();
    (checks[2] as HTMLElement).click();
    await el.updateComplete;
    (el.shadowRoot!.querySelector('.bulk-delete') as HTMLElement).click();
    expect(spy.mock.calls.map(c => c[0].detail)).toEqual(['a', 'c']);
  });
});
