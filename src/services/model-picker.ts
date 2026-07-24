// OpenRouter model options for the freetext classifier. Kept to free-tier models by default;
// the picker exists so this list can grow (or be swapped in dev) without touching call sites.
export interface ModelOption {
  id: string;
  label: string;
}

export const MODEL_OPTIONS: ModelOption[] = [
  { id: 'meta-llama/llama-3.1-8b-instruct:free', label: 'Llama 3.1 8B (free)' },
  { id: 'google/gemma-2-9b-it:free', label: 'Gemma 2 9B (free)' },
  { id: 'mistralai/mistral-7b-instruct:free', label: 'Mistral 7B (free)' },
  { id: 'qwen/qwen-2-7b-instruct:free', label: 'Qwen 2 7B (free)' },
];

export const DEFAULT_MODEL_ID = MODEL_OPTIONS[0].id;

const STORAGE_KEY = 'chroma-chords-classifier-model';

export function getPreferredModel(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && MODEL_OPTIONS.some(m => m.id === stored)) return stored;
  } catch (e) {
    console.error('Failed to read preferred model from localStorage:', e);
  }
  return DEFAULT_MODEL_ID;
}

export function setPreferredModel(modelId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, modelId);
  } catch (e) {
    console.error('Failed to save preferred model to localStorage:', e);
  }
}
