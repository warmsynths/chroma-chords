// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import './mobile-dock';
import { MobileDock } from './mobile-dock';

describe('MobileDock', () => {
  it('opens the sound sheet and emits set-chord-sound when a chord sound is picked', async () => {
    const el = document.createElement('mobile-dock') as MobileDock;
    el.activeTab = 'loop';
    document.body.appendChild(el);
    await el.updateComplete;

    const spy = vi.fn();
    el.addEventListener('set-chord-sound', spy);

    (el.shadowRoot!.querySelector('[aria-label="Sound settings"]') as HTMLElement).click();
    await el.updateComplete;
    const items = Array.from(el.shadowRoot!.querySelectorAll('button')) as HTMLElement[];
    items.find(b => b.textContent?.includes('Nylon Guitar'))!.click();

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ detail: { sound: 'Nylon Guitar' } }));
  });

  it('moves the loop control into the more menu on melody (no overflow in the bar)', async () => {
    const el = document.createElement('mobile-dock') as MobileDock;
    el.activeTab = 'melody';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('[aria-label="Change what loops"]')).toBeNull();

    const spy = vi.fn();
    el.addEventListener('loop-cycle', spy);
    (el.shadowRoot!.querySelector('[aria-label="More actions"]') as HTMLElement).click();
    await el.updateComplete;
    const span = Array.from(el.shadowRoot!.querySelectorAll('.loop-seg-btn')).find(b => b.textContent?.trim() === 'Span') as HTMLElement;
    span.click();

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ detail: { melodyLoop: 'Span' } }));
  });
});
