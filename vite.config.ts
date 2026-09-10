import { defineConfig } from 'vite';
import { resolve } from 'path';
import { existsSync } from 'fs';

const localHumanEngine = resolve(__dirname, '../human-midi/docs/human-engine.js');
const hasLocal = existsSync(localHumanEngine);

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    outDir: 'docs',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['human-engine'],
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        paths: {
          'human-engine': 'https://warmsynths.github.io/human-midi/human-engine.js'
        },
        manualChunks: {
          vendor: ['lit', 'tone', 'meyda']
        }
      }
    }
  },
  server: {
    port: 43301,
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: hasLocal ? {
      'human-engine': localHumanEngine
    } : {
      'human-engine': 'https://warmsynths.github.io/human-midi/human-engine.js'
    }
  },
  // @ts-ignore
  test: {
    exclude: ['**/node_modules/**', '**/e2e/**', '**/dist/**', '**/docs/**']
  }
});