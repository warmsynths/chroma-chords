# Chroma Chords classifier Worker

Holds the Anthropic API key server-side and proxies freetext classification requests (calls
Claude Haiku directly). Required because the app itself is a static site committed into `docs/`
and served from GitHub Pages — any key embedded in the client bundle would be public.

## Setup

1. Install wrangler and login:
   ```bash
   npm install -g wrangler
   npx wrangler login
   ```
2. Get your free API keys:
   - **Google AI Studio (Recommended)**: [aistudio.google.com](https://aistudio.google.com/)
   - **Anthropic**: [console.anthropic.com](https://console.anthropic.com/)
   - **OpenCode AI**: [opencode.ai](https://opencode.ai)
   - **OpenRouter**: [openrouter.ai](https://openrouter.ai)
3. Upload keys as secrets:
   ```bash
   cd worker
   npx wrangler secret put GOOGLE_API_KEY
   npx wrangler secret put ANTHROPIC_API_KEY
   npx wrangler secret put OPENCODE_API_KEY
   npx wrangler secret put OPENROUTER_API_KEY
   ```
4. Deploy:
   ```bash
   npx wrangler deploy
   ```

Update `src/services/freetext-service.ts`'s `CLASSIFIER_ENDPOINT` with the deployed
`*.workers.dev` URL (or a custom route) after the first deploy.
