import { RawChordData, Progression, alignChordsToScale, generateProgression } from './chord-engine';
import { classifyFreeText, getGoogleToken, setGoogleToken } from './freetext-service';
import { NormalizedPrompt } from './freetext-schema';
import { presetIdToUserInstrumentName, matchRhythmStyleToPlayStyleName } from './audio-service';

export interface PromptResolutionResult {
  progression: Progression;
  instrument: string | null;
  playStyle: string | null;
  normalizedSuggestion: NormalizedPrompt | null;
}

export class PromptClassifier {
  public static setGoogleToken(token: string) {
    setGoogleToken(token);
  }

  public static getGoogleToken(): string | null {
    return getGoogleToken();
  }

  public static async resolvePrompt(
    chordData: RawChordData,
    genre: string,
    mood: string,
    length: number,
    promptText?: string,
    pendingSuggestion?: NormalizedPrompt | null
  ): Promise<PromptResolutionResult> {
    let suggestion = pendingSuggestion || null;
    let mappedInstrument: string | null = null;
    let mappedPlayStyle: string | null = null;

    if (!suggestion && promptText && promptText.trim().length > 0) {
      try {
        suggestion = await classifyFreeText(promptText);
      } catch (err) {
        console.warn('Failed to classify prompt via LLM/local fallback:', err);
      }
    }

    const usingSuggestion = Boolean(suggestion && suggestion.chords?.length && suggestion.key && suggestion.scaleType);

    let progression: Progression | null = null;

    if (usingSuggestion && suggestion && suggestion.chords && suggestion.key && suggestion.scaleType) {
      progression = alignChordsToScale(
        chordData,
        suggestion.key,
        suggestion.scaleType,
        suggestion.chords,
        suggestion.genre || genre,
        suggestion.mood || mood
      );
    }

    if (!progression) {
      progression = generateProgression(chordData, genre, mood, { length });
    }

    if (usingSuggestion && suggestion) {
      if (suggestion.instrumentConfig?.presetId) {
        mappedInstrument = presetIdToUserInstrumentName(suggestion.instrumentConfig.presetId) ?? null;
      }
      if (suggestion.rhythmStyle) {
        mappedPlayStyle = matchRhythmStyleToPlayStyleName(suggestion.rhythmStyle) ?? null;
      }
    }

    if (progression.chords.length > length) {
      progression = {
        ...progression,
        chords: progression.chords.slice(0, length),
      };
    }

    if (promptText) {
      progression = {
        ...progression,
        searchTerm: promptText,
      };
    }

    return {
      progression,
      instrument: mappedInstrument,
      playStyle: mappedPlayStyle,
      normalizedSuggestion: suggestion,
    };
  }
}
