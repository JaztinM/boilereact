/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import { qrcode } from 'vite-plugin-qrcode'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  envDir: './env/',
  plugins: [
    react(),
    qrcode(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  server: {
    host: process.env.VITE_HOST || 'localhost',
    port: parseInt(process.env.VITE_PORT) || 3000,
  },
  test: {
    globals: true,
    watch: false,
    environment: 'happy-dom',
    setupFiles: './src/setup-test.ts',
  },
  build: {
    sourcemap: false,
    target: 'esnext',
    minify: true,
    cssTarget: 'esnext',
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react/jsx-runtime', 'react-dom'],
          'vendor-mantine': ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
        },
      },
    },
  },
})
