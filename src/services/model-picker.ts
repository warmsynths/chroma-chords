// Optional dev-only override for which OpenRouter model the classifier Worker uses. There is
// no public UI for this — regular users never see or pick a model. When unset, the Worker
// picks a currently-valid free/text model on its own (see worker/worker.ts), which avoids
// hardcoding IDs here that inevitably get renamed/deprecated on OpenRouter's end.
//
// To try a different model, open the deployed Worker's /models endpoint in a browser to see
// what's currently free and text-only, then from devtools console on the app:
//   import('/src/services/model-picker.ts').then(m => m.setPreferredModel('provider/model:free'))
const STORAGE_KEY = 'chroma-chords-classifier-model';

export function getPreferredModel(): string | undefined {
  try {
    return localStorage.getItem(STORAGE_KEY) || undefined;
  } catch (e) {
    console.error('Failed to read preferred model from localStorage:', e);
    return undefined;
  }
}

export function setPreferredModel(modelId: string | null): void {
  try {
    if (modelId) localStorage.setItem(STORAGE_KEY, modelId);
    else localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to save preferred model to localStorage:', e);
  }
}
