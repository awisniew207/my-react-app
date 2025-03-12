import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias for Node.js polyfills
      stream: 'stream-browserify',
      buffer: 'buffer',
      util: 'util',
      process: 'process/browser',
      events: 'events',
      path: 'path-browserify',
      crypto: 'crypto-browserify',
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        })
      ]
    },
    include: [
      'process/browser',
      'buffer',
      'util',
      'stream-browserify',
      'events',
      'path-browserify',
      'crypto-browserify'
    ]
  },
  define: {
    // Define process.env for both dev and prod
    'process.env': JSON.stringify({}),
    // Explicitly set global for production builds
    'global': 'window',
  },
  build: {
    // More verbose build output for debugging
    minify: 'terser',
    terserOptions: {
      compress: {
        // Don't drop console logs in production for debugging
        drop_console: false,
      },
    },
    // Make process available globally in the bundle
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Make sure polyfills are included in the bundle
      output: {
        manualChunks: undefined,
      },
    },
  },
})
