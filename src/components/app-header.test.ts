// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import './app-header';
import { AppHeader } from './app-header';
import { aiCapacity } from '../services/ai-capacity';

describe('AppHeader AI capacity', () => {
  it('still renders the capacity chip (hidden by CSS on phones) and follows the shared service', async () => {
    const el = document.createElement('app-header') as AppHeader;
    document.body.appendChild(el);
    await el.updateComplete;

    const chip = el.shadowRoot!.querySelector('.capacity-chip') as HTMLElement;
    expect(chip.textContent).toContain('AI ready');
    expect(chip.querySelectorAll('.pip-dot.filled').length).toBe(4);

    aiCapacity.consume();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.capacity-chip')!.textContent).toContain('Refill');
    expect(el.shadowRoot!.querySelectorAll('.pip-dot.filled').length).toBe(3);
    el.remove();
  });
});
