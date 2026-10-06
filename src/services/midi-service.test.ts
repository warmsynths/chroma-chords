import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { midiService, noteNameToMidi } from './midi-service';

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

  it('sends note-on now and note-off after the duration, on the part\'s channel', () => {
    midiService.playNotes('melody', ['C4'], 0.5, 1);
    expect(sent).toEqual([[0x92, 60, 127]]);
    vi.advanceTimersByTime(600);
    expect(sent[1]).toEqual([0x82, 60, 0]);
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

  it('delays later notes of an arpeggio instead of sending them all at once', () => {
    midiService.playEvents('chords', [
      { note: 'C4', offsetSec: 0, durSec: 0.1, vel: 0.8 },
      { note: 'E4', offsetSec: 0.25, durSec: 0.1, vel: 0.8 },
    ]);
    expect(sent.filter(([, m]) => m[0] === 0x90).map(([, m]) => m[1])).toEqual([60]);
    vi.advanceTimersByTime(300);
    expect(sent.filter(([, m]) => m[0] === 0x90).map(([, m]) => m[1])).toEqual([60, 64]);
  });
});
