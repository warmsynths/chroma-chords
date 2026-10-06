// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import './midi-modal';
import { MidiModal } from './midi-modal';
import { midiService } from '../../services/midi-service';

describe('MidiModal Component & MidiService', () => {
  beforeEach(() => {
    // Reset midi routing
    midiService.setRouting({
      chordsChannel: 1,
      chordsInternalAudio: true,
      melodyChannel: 2,
      melodyInternalAudio: true,
    });
  });

  it('manages routing configuration in MidiService', () => {
    expect(midiService.routing.chordsChannel).toBe(1);
    expect(midiService.routing.melodyChannel).toBe(2);

    midiService.setRouting({ chordsChannel: 3, melodyChannel: 4 });
    expect(midiService.routing.chordsChannel).toBe(3);
    expect(midiService.routing.melodyChannel).toBe(4);
  });

  it('handles sendTestNote without throwing when no device connected', () => {
    expect(() => midiService.sendTestNote(1)).not.toThrow();
  });

  it('renders modal dialog with status and routing controls', async () => {
    const el = document.createElement('midi-modal') as MidiModal;
    el.isOpen = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const overlay = el.shadowRoot!.querySelector('.modal-overlay');
    expect(overlay?.classList.contains('open')).toBe(true);

    const title = el.shadowRoot!.querySelector('.header-title');
    expect(title?.textContent).toBe('Web MIDI Routing');

    const routingTitles = el.shadowRoot!.querySelectorAll('.routing-title');
    expect(routingTitles.length).toBe(2);
    expect(routingTitles[0].textContent).toBe('Chords');
    expect(routingTitles[1].textContent).toBe('Melody');

    el.remove();
  });

  it('updates part channel routing from modal selects', async () => {
    const el = document.createElement('midi-modal') as MidiModal;
    el.isOpen = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const channelSelects = el.shadowRoot!.querySelectorAll('.channel-select');
    expect(channelSelects.length).toBe(2);

    const chordsSelect = channelSelects[0] as HTMLSelectElement;
    chordsSelect.value = '5';
    chordsSelect.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect(midiService.routing.chordsChannel).toBe(5);

    el.remove();
  });

  it('toggles internal audio playback for parts', async () => {
    const el = document.createElement('midi-modal') as MidiModal;
    el.isOpen = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const toggleBtns = el.shadowRoot!.querySelectorAll('.audio-toggle-btn');
    expect(toggleBtns.length).toBe(2);

    const chordsAudioBtn = toggleBtns[0] as HTMLButtonElement;
    expect(chordsAudioBtn.textContent?.trim()).toBe('Sound: ON');

    chordsAudioBtn.click();
    await el.updateComplete;

    expect(midiService.routing.chordsInternalAudio).toBe(false);
    expect(chordsAudioBtn.textContent?.trim()).toBe('Muted');

    el.remove();
  });

  it('dispatches close event on close button click', async () => {
    const el = document.createElement('midi-modal') as MidiModal;
    el.isOpen = true;
    document.body.appendChild(el);
    await el.updateComplete;

    let closed = false;
    el.addEventListener('close', () => {
      closed = true;
    });

    const closeBtn = el.shadowRoot!.querySelector('.close-btn') as HTMLButtonElement;
    closeBtn.click();

    expect(closed).toBe(true);
    expect(el.isOpen).toBe(false);

    el.remove();
  });

  it('has a Sync section with a clock switch and a latency offset', async () => {
    midiService.setRouting({ sendClock: false, latencyMs: 0 });
    const el = document.createElement('midi-modal') as MidiModal;
    el.isOpen = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const sw = el.shadowRoot!.querySelector('[aria-label="Send MIDI clock"]') as HTMLButtonElement;
    expect(sw.getAttribute('aria-checked')).toBe('false');
    sw.click();
    await el.updateComplete;
    expect(midiService.routing.sendClock).toBe(true);

    const slider = el.shadowRoot!.querySelector('[aria-label="Latency offset in milliseconds"]') as HTMLInputElement;
    slider.value = '-40';
    slider.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(midiService.routing.latencyMs).toBe(-40);
    expect(el.shadowRoot!.textContent).toContain('Built-in sound is held back 40 ms');

    midiService.setRouting({ sendClock: false, latencyMs: 0 });
    el.remove();
  });
});
