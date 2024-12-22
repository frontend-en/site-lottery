import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Оптимизация рендеринга
          ['@babel/plugin-transform-react-inline-elements'],
          ['@babel/plugin-transform-react-constant-elements'],
        ],
        parserOpts: {
          plugins: ['optionalChaining', 'nullishCoalescingOperator'],
        },
      },
    }),
    splitVendorChunkPlugin(),
  ],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3,
        unsafe_math: true,
        unsafe_methods: true,
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
        wrap_iife: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'ui-core': ['@headlessui/react'],
          'utils': ['clsx', 'tailwindcss'],
        },
        inlineDynamicImports: false,
        compact: true,
      },
      treeshake: {
        moduleSideEffects: true,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    modulePreload: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@headlessui/react'],
    exclude: [],
    esbuildOptions: {
      target: 'esnext',
      treeShaking: true,
      minify: true,
      legalComments: 'none',
    },
  },
  esbuild: {
    target: 'esnext',
    legalComments: 'none',
    treeShaking: true,
  },
});
