import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@styles': resolve(__dirname, './src/styles'),
      '@context': resolve(__dirname, './src/context'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, '/')
          // Keep shared React and CommonJS helpers out of optional page libraries.
          if (path.includes('commonjsHelpers') || /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(path)) return 'vendor'
          if (path.includes('/node_modules/framer-motion/')) return 'motion'
          if (path.includes('/node_modules/react-helmet-async/')) return 'helmet'
        },
      },
    },
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    reportCompressedSize: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-utils/setup.js'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test-utils/',
        '**/*.config.*',
        '**/index.html',
      ],
    },
  },
})
