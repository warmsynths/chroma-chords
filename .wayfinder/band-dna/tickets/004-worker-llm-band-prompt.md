# T4: Worker & LLM Prompt Injection for Band Modes

**Label**: `wayfinder:task`
**Type**: AFK
**Status**: Blocked by T1, T2

## Question

How do we enhance the Cloudflare Worker system prompt in `worker/worker.ts` and client `freetext-service.ts` to accept an explicit `bandId` parameter and NLP free-text triggers, injecting the specific band's harmonic rules, secondary dominant tendencies, and Tone.js sound profiles into the LLM context?
