import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

function criticalPreloadPlugin() {
  const preloads = []
  return {
    name: 'critical-preload',
    generateBundle(_, bundle) {
      for (const key of Object.keys(bundle)) {
        if (key.includes('enterprise-ai-operations')) {
          preloads.push(`  <link rel="preload" as="image" href="/${key}" fetchpriority="high">`)
        }
      }
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (!preloads.length) return html
        return html.replace('</head>', `${preloads.join('\n')}\n  </head>`)
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), criticalPreloadPlugin()],
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
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          helmet: ['react-helmet-async'],
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
