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
