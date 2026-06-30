import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022'
  },
  server: {
    port: 3000,
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      'human-engine': resolve(__dirname, '../human-midi/docs/human-engine.js')
    }
  }
});
