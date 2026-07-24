# Chroma Chords classifier Worker

Holds the OpenRouter API key server-side and proxies freetext classification requests. Required
because the app itself is a static site committed into `docs/` and served from GitHub Pages —
any key embedded in the client bundle would be public.

## Deploy

```
npm install -g wrangler   # if not already installed
cd worker
wrangler secret put OPENROUTER_KEY
wrangler deploy
```

Update `src/services/freetext-service.ts`'s `CLASSIFIER_ENDPOINT` with the deployed
`*.workers.dev` URL (or a custom route) after the first deploy.
