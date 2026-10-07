// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { midiService } from '../services/midi-service';
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

  it('offers a song loop On/Off in the more menu on the Song tab', async () => {
    const el = document.createElement('mobile-dock') as MobileDock;
    el.activeTab = 'song';
    document.body.appendChild(el);
    await el.updateComplete;

    const spy = vi.fn();
    el.addEventListener('song-loop-change', spy);
    (el.shadowRoot!.querySelector('[aria-label="More actions"]') as HTMLElement).click();
    await el.updateComplete;
    const radios = Array.from(el.shadowRoot!.querySelectorAll('[aria-label="Loop the song"] .loop-seg-btn')) as HTMLElement[];
    expect(radios.map(b => b.textContent?.trim())).toEqual(['On', 'Off']);
    expect(radios[0].getAttribute('aria-checked')).toBe('true');
    radios[1].click();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ detail: { loop: false } }));
  });

  it('shows the AI capacity in the more menu (moved out of the header on phones)', async () => {
    const el = document.createElement('mobile-dock') as MobileDock;
    document.body.appendChild(el);
    await el.updateComplete;

    (el.shadowRoot!.querySelector('[aria-label="More actions"]') as HTMLElement).click();
    await el.updateComplete;

    const row = el.shadowRoot!.querySelector('.ai-row');
    expect(row).toBeTruthy();
    expect(row!.querySelectorAll('.ai-pip').length).toBe(4);
    expect(row!.textContent).toContain('AI ready');
  });

  it('says so in the more menu when the loop changed since it was saved, and still offers Keep', async () => {
    const el = document.createElement('mobile-dock') as MobileDock;
    el.saveState = 'edited';
    document.body.appendChild(el);
    await el.updateComplete;
    (el.shadowRoot!.querySelector('[aria-label="More actions"]') as HTMLElement).click();
    await el.updateComplete;

    const spy = vi.fn();
    el.addEventListener('save-set', spy);
    const keep = Array.from(el.shadowRoot!.querySelectorAll('.popover-menu-item')).find(b => b.textContent?.includes('Keep this loop')) as HTMLElement;
    expect(keep.textContent).toContain('Changed since you saved it');
    keep.click();
    expect(spy).toHaveBeenCalled();
  });

  it('lets you mute the chords under the melody from the more menu', async () => {
    const el = document.createElement('mobile-dock') as MobileDock;
    el.activeTab = 'melody';
    document.body.appendChild(el);
    await el.updateComplete;
    (el.shadowRoot!.querySelector('[aria-label="More actions"]') as HTMLElement).click();
    await el.updateComplete;

    const spy = vi.fn();
    el.addEventListener('toggle-melody-backing', spy);
    const muted = Array.from(el.shadowRoot!.querySelectorAll('[aria-label="Chords playing under the melody"] .loop-seg-btn')).find(b => b.textContent?.trim() === 'Muted') as HTMLElement;
    muted.click();
    expect(spy.mock.calls[0][0].detail).toEqual({ backingEnabled: false });
    await el.updateComplete;
    expect(muted.classList.contains('active')).toBe(true);
  });

  it('does not show the chords mute outside Melody', async () => {
    const el = document.createElement('mobile-dock') as MobileDock;
    el.activeTab = 'loop';
    document.body.appendChild(el);
    await el.updateComplete;
    (el.shadowRoot!.querySelector('[aria-label="More actions"]') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[aria-label="Chords playing under the melody"]')).toBeNull();
  });
});

describe('MobileDock quick MIDI send', () => {
  const svc = midiService as any;
  afterEach(() => {
    svc.midiAccess = null;
    svc.selectedOutputId = null;
    midiService.setSendMode('both');
  });

  it('puts a MIDI Both/Chords/Melody/Off row in the more menu once a device is connected', async () => {
    svc.midiAccess = { outputs: new Map([['o', { send: () => {} }]]), inputs: new Map() };
    svc.selectedOutputId = 'o';
    const el = document.createElement('mobile-dock') as MobileDock;
    el.activeTab = 'melody';
    document.body.appendChild(el);
    await el.updateComplete;
    (el.shadowRoot!.querySelector('[aria-label="More actions"]') as HTMLElement).click();
    await el.updateComplete;
    const row = Array.from(el.shadowRoot!.querySelectorAll('[aria-label="Which parts go to MIDI"] .loop-seg-btn')) as HTMLElement[];
    expect(row.map(b => b.textContent?.trim())).toEqual(['Both', 'Chords', 'Melody', 'Off']);
    row[2].click(); // Melody only: record the melody on its own
    await el.updateComplete;
    expect(midiService.getSendMode()).toBe('melody');
    expect(row[2].className).toContain('active');
    el.remove();
  });

  it('shows no MIDI row without a device', async () => {
    const el = document.createElement('mobile-dock') as MobileDock;
    document.body.appendChild(el);
    await el.updateComplete;
    (el.shadowRoot!.querySelector('[aria-label="More actions"]') as HTMLElement).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[aria-label="Which parts go to MIDI"]')).toBeNull();
    el.remove();
  });
});
