import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
    force: true
  },
  server: {
    watch: {
      usePolling: true
    }
  }
});
