import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    outDir: 'docs'
  },
  server: {
    port: 43301,
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
