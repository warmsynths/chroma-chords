import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    outDir: 'docs',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
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
    alias: {
      'human-engine': resolve(__dirname, '../human-midi/docs/human-engine.js')
    }
  },
  // @ts-ignore
  test: {
    exclude: ['**/node_modules/**', '**/e2e/**', '**/dist/**', '**/docs/**']
  }
});