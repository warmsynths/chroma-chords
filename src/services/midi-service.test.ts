import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { midiService, noteNameToMidi, MIDI_LOOKAHEAD_MS } from './midi-service';

describe('noteNameToMidi', () => {
  it('parses names with octaves and accidentals', () => {
    expect(noteNameToMidi('C4')).toBe(60);
    expect(noteNameToMidi('A4')).toBe(69);
    expect(noteNameToMidi('F#3')).toBe(54);
    expect(noteNameToMidi('Bb2')).toBe(46);
    expect(noteNameToMidi('nope')).toBeNull();
  });
});

describe('midiService.playNotes routing', () => {
  const sent: number[][] = [];
  const svc = midiService as any;

  beforeEach(() => {
    vi.useFakeTimers();
    sent.length = 0;
    svc.midiAccess = { outputs: new Map([['out1', { send: (m: number[]) => sent.push(m) }]]) };
    svc.selectedOutputId = 'out1';
    svc.routing = { chordsChannel: 1, chordsInternalAudio: true, melodyChannel: 3, melodyInternalAudio: false };
  });
  afterEach(() => {
    vi.useRealTimers();
    svc.midiAccess = null;
    svc.selectedOutputId = null;
  });

  it('sends note-on and a later note-off, stamped for the browser to schedule, on the part\'s channel', () => {
    const out: Array<{ d: number[]; ts?: number }> = [];
    svc.midiAccess = { outputs: new Map([['out1', { send: (d: number[], ts?: number) => out.push({ d, ts }) }]]) };
    midiService.playNotes('melody', ['C4'], 0.5, 1);
    expect(out.map(o => o.d)).toEqual([[0x92, 60, 127], [0x82, 60, 0]]);
    expect(out[1].ts! - out[0].ts!).toBeCloseTo(500, 0);
  });

  it('tells the engine whether built-in audio should also play', () => {
    expect(midiService.playNotes('chords', ['C4', 'E4'], 0.2, 0.8)).toBe(true);
    expect(midiService.playNotes('melody', ['C4'], 0.2, 0.8)).toBe(false);
  });

  it('never mutes the app when no device is connected', () => {
    svc.selectedOutputId = null;
    expect(midiService.playNotes('melody', ['C4'], 0.2, 0.8)).toBe(true);
    expect(sent).toHaveLength(0);
  });
});

import { planChordEvents } from './audio-service';

describe('MIDI output follows the play style', () => {
  const chord = ['C3', 'E3', 'G3', 'C4'];

  it('arpeggio sends one note at a time in rising order, at the arp rate', () => {
    const ev = planChordEvents(chord, 1, { arpMode: 'up', arpRate: '1/8', arpRange: 1, bpm: 120, velocity: 100 });
    expect(ev.map(e => e.note)).toEqual(chord);
    expect(ev.map(e => +e.offsetSec.toFixed(3))).toEqual([0, 0.25, 0.5, 0.75]);
    expect(ev[0].durSec).toBeLessThan(0.25);
  });

  it('descending arp reverses the order', () => {
    const ev = planChordEvents(chord, 1, { arpMode: 'down', arpRate: '1/8', bpm: 120 });
    expect(ev.map(e => e.note)).toEqual([...chord].reverse());
  });

  it('strum rolls quickly and lets the notes ring for the chord', () => {
    const ev = planChordEvents(chord, 1, { arpMode: 'up', arpRate: '1/32', isStrum: true, bpm: 120 });
    expect(ev[1].offsetSec).toBeLessThan(0.06);
    expect(ev[0].durSec).toBeGreaterThanOrEqual(1.4);
  });

  it('fast triplet is faster than the sixteenth', () => {
    const trip = planChordEvents(chord, 1, { arpMode: 'up', arpRate: '1/16T', bpm: 120 });
    const sixteenth = planChordEvents(chord, 1, { arpMode: 'up', arpRate: '1/16', bpm: 120 });
    expect(trip[1].offsetSec).toBeLessThan(sixteenth[1].offsetSec);
  });

  it('block chords start together, with only a small spread', () => {
    const ev = planChordEvents(chord, 1, { arpMode: 'off', spread: 0.3, velocity: 90 });
    expect(Math.max(...ev.map(e => e.offsetSec))).toBeLessThan(0.1);
    expect(ev.every(e => e.durSec === 1)).toBe(true);
  });
});

describe('midiService.playEvents timing', () => {
  const svc = midiService as any;
  const sent: Array<[number, number[]]> = [];
  beforeEach(() => {
    vi.useFakeTimers();
    sent.length = 0;
    svc.midiAccess = { outputs: new Map([['o', { send: (m: number[]) => sent.push([Date.now(), m]) }]]) };
    svc.selectedOutputId = 'o';
    svc.routing = { chordsChannel: 1, chordsInternalAudio: true, melodyChannel: 2, melodyInternalAudio: true };
  });
  afterEach(() => { vi.useRealTimers(); svc.midiAccess = null; svc.selectedOutputId = null; });

  it('stamps later notes of an arpeggio further ahead instead of using timers', () => {
    const out: Array<{ d: number[]; ts: number }> = [];
    svc.midiAccess = { outputs: new Map([['o', { send: (d: number[], ts: number) => out.push({ d, ts }) }]]) };
    midiService.playEvents('chords', [
      { note: 'C4', offsetSec: 0, durSec: 0.1, vel: 0.8 },
      { note: 'E4', offsetSec: 0.25, durSec: 0.1, vel: 0.8 },
    ]);
    const ons = out.filter(o => o.d[0] === 0x90);
    expect(ons.map(o => o.d[1])).toEqual([60, 64]);
    expect(ons[1].ts - ons[0].ts).toBeCloseTo(250, 1);
    expect(vi.getTimerCount()).toBe(0); // nothing waits on a JS timer
  });
});

describe('MIDI clock and latency', () => {
  const svc = midiService as any;
  const sent: Array<{ data: number[]; ts?: number }> = [];
  const fresh = (patch: Record<string, unknown> = {}) => {
    svc.routing = { chordsChannel: 1, chordsInternalAudio: true, melodyChannel: 2, melodyInternalAudio: true, sendClock: true, latencyMs: 0, ...patch };
  };
  beforeEach(() => {
    vi.useFakeTimers();
    sent.length = 0;
    svc.midiAccess = { outputs: new Map([['o', { send: (data: number[], ts?: number) => sent.push({ data, ts }) }]]) };
    svc.selectedOutputId = 'o';
    svc.lastTransport = { playing: false, bpm: 120 };
    fresh();
  });
  afterEach(() => {
    midiService.syncTransport(false, 120);
    vi.useRealTimers();
    svc.midiAccess = null;
    svc.selectedOutputId = null;
  });

  const pulses = () => sent.filter(s => s.data[0] === 0xF8);

  it('sends Start once, then 24 pulses per beat at the tempo', () => {
    midiService.syncTransport(true, 120);
    midiService.syncTransport(true, 120); // repeated ticks must not restart the device
    expect(sent.filter(s => s.data[0] === 0xFA)).toHaveLength(1);
    vi.advanceTimersByTime(1000);
    const p = pulses();
    expect(p.length).toBeGreaterThan(40); // 1 s at 120 BPM = 48 pulses
    const gap = (p[1].ts! - p[0].ts!);
    expect(gap).toBeCloseTo(60000 / (120 * 24), 3);
  });

  it('sends Stop when playback ends and stops pulsing', () => {
    midiService.syncTransport(true, 100);
    vi.advanceTimersByTime(200);
    midiService.syncTransport(false, 100);
    expect(sent.filter(s => s.data[0] === 0xFC)).toHaveLength(1);
    const count = pulses().length;
    vi.advanceTimersByTime(500);
    expect(pulses().length).toBe(count);
  });

  it('follows a tempo change while playing', () => {
    midiService.syncTransport(true, 60);
    vi.advanceTimersByTime(300);
    midiService.syncTransport(true, 120);
    sent.length = 0;
    vi.advanceTimersByTime(300);
    const p = pulses();
    expect(p[p.length - 1].ts! - p[p.length - 2].ts!).toBeCloseTo(60000 / (120 * 24), 3);
  });

  it('sends nothing when clock is off or no device is chosen', () => {
    fresh({ sendClock: false });
    midiService.syncTransport(true, 120);
    expect(sent).toHaveLength(0);
    fresh();
    svc.selectedOutputId = null;
    midiService.syncTransport(true, 120);
    expect(sent).toHaveLength(0);
  });

  it('turning clock on while already playing starts it right away', () => {
    fresh({ sendClock: false });
    midiService.syncTransport(true, 120);
    expect(sent).toHaveLength(0);
    midiService.setRouting({ sendClock: true });
    expect(sent.some(s => s.data[0] === 0xFA)).toBe(true);
  });

  it('positive latency delays MIDI and clock; negative delays the built-in sound', () => {
    fresh({ latencyMs: 80 });
    const before = performance.now();
    midiService.syncTransport(true, 120);
    expect(sent.find(s => s.data[0] === 0xFA)!.ts!).toBeGreaterThanOrEqual(before + 80 + MIDI_LOOKAHEAD_MS);
    expect(midiService.internalDelayMs()).toBe(MIDI_LOOKAHEAD_MS);

    midiService.syncTransport(false, 120);
    fresh({ latencyMs: -60 });
    expect(midiService.internalDelayMs()).toBe(MIDI_LOOKAHEAD_MS + 60);
    svc.selectedOutputId = null;
    expect(midiService.internalDelayMs()).toBe(0); // no device: never delay the app's own sound
  });

  it('holds MIDI notes back by a positive offset', () => {
    fresh({ latencyMs: 100 });
    const out: Array<{ d: number[]; ts: number }> = [];
    svc.midiAccess = { outputs: new Map([['o', { send: (d: number[], ts: number) => out.push({ d, ts }) }]]) };
    const now = performance.now();
    midiService.playEvents('chords', [{ note: 'C4', offsetSec: 0, durSec: 0.1, vel: 0.8 }]);
    expect(out[0].d).toEqual([0x90, 60, 102]);
    expect(out[0].ts).toBeGreaterThanOrEqual(now + 100 + MIDI_LOOKAHEAD_MS);
  });

  it('stamps notes from the engine\'s ideal grid time, so a late timer does not move them', () => {
    const out: Array<{ d: number[]; ts: number }> = [];
    svc.midiAccess = { outputs: new Map([['o', { send: (d: number[], ts: number) => out.push({ d, ts }) }]]) };
    const now = performance.now();
    // the timer fired 12 ms after the beat it belongs to
    midiService.setGridTime(now - 12);
    midiService.playEvents('chords', [{ note: 'C4', offsetSec: 0, durSec: 0.1, vel: 0.8 }]);
    midiService.setGridTime(null);
    expect(out[0].ts).toBeCloseTo(now - 12 + MIDI_LOOKAHEAD_MS, 1);
  });

  it('chords and melody on the same beat get the same timestamp', () => {
    const out: Array<{ part: string; ts: number }> = [];
    svc.midiAccess = { outputs: new Map([['o', { send: (d: number[], ts: number) => { if (d[0] >= 0x90 && d[0] < 0xA0) out.push({ part: d[0] === 0x90 ? 'c' : 'm', ts }); } }]]) };
    svc.routing = { ...svc.routing, chordsChannel: 1, melodyChannel: 2, chordsSend: true, melodySend: true };
    midiService.setGridTime(performance.now() + 5);
    midiService.playEvents('chords', [{ note: 'C3', offsetSec: 0, durSec: 0.2, vel: 0.8 }]);
    midiService.playEvents('melody', [{ note: 'G4', offsetSec: 0, durSec: 0.2, vel: 0.8 }]);
    midiService.setGridTime(null);
    expect(out).toHaveLength(2);
    expect(out[0].ts).toBe(out[1].ts);
  });

  it('can switch one part\'s MIDI off so the other records alone; the app still plays it', () => {
    const out: number[][] = [];
    svc.midiAccess = { outputs: new Map([['o', { send: (d: number[]) => out.push(d) }]]) };
    svc.routing = { ...svc.routing, chordsSend: false, melodySend: true, chordsInternalAudio: false };
    const internal = midiService.playEvents('chords', [{ note: 'C3', offsetSec: 0, durSec: 0.2, vel: 0.8 }]);
    expect(out).toHaveLength(0);
    expect(internal).toBe(true); // not sent to the device, so it must still sound in the app
    midiService.playEvents('melody', [{ note: 'G4', offsetSec: 0, durSec: 0.2, vel: 0.8 }]);
    expect(out.some(d => d[0] === 0x91)).toBe(true);
  });

  it('sends All Notes Off on both channels when playback stops', () => {
    const out: number[][] = [];
    svc.midiAccess = { outputs: new Map([['o', { send: (d: number[]) => out.push(d) }]]) };
    svc.routing = { ...svc.routing, chordsChannel: 1, melodyChannel: 2 };
    midiService.syncTransport(true, 120);
    midiService.syncTransport(false, 120);
    expect(out).toContainEqual([0xB0, 123, 0]);
    expect(out).toContainEqual([0xB1, 123, 0]);
  });

  it('clamps the offset to the slider range', () => {
    midiService.setRouting({ latencyMs: 9999 });
    expect(midiService.routing.latencyMs).toBe(250);
    midiService.setRouting({ latencyMs: -9999 });
    expect(midiService.routing.latencyMs).toBe(-250);
  });
});

describe('autoReconnect', () => {
  const svc = midiService as any;
  afterEach(() => {
    vi.unstubAllGlobals();
    svc.midiAccess = null;
    svc.selectedOutputId = null;
    svc.status = 'idle';
    svc.errorMessage = '';
  });

  it('reconnects when an output was chosen last time', async () => {
    svc.selectedOutputId = 'o';
    const access = { outputs: new Map([['o', { id: 'o', name: 'Circuit', send: vi.fn() }]]), inputs: new Map() };
    vi.stubGlobal('navigator', { requestMIDIAccess: vi.fn().mockResolvedValue(access) });
    expect(await midiService.autoReconnect()).toBe(true);
    expect(midiService.getStatus()).toBe('connected');
    expect(midiService.hasOutput()).toBe(true);
  });

  it('does nothing without a saved device, and stays quiet if the browser refuses', async () => {
    const request = vi.fn().mockRejectedValue(new Error('denied'));
    vi.stubGlobal('navigator', { requestMIDIAccess: request });
    svc.selectedOutputId = null;
    expect(await midiService.autoReconnect()).toBe(false);
    expect(request).not.toHaveBeenCalled();

    svc.selectedOutputId = 'o';
    expect(await midiService.autoReconnect()).toBe(false);
    expect(midiService.getStatus()).toBe('idle');
    expect(midiService.getErrorMessage()).toBe('');
  });
});
