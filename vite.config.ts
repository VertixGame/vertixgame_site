import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Minificação otimizada com esbuild (mais rápido e não requer dependências extras)
    minify: 'esbuild',
    // Garantir que não use terser
    // Code splitting otimizado
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-vendor': ['framer-motion'],
          'lucide-vendor': ['lucide-react'],
        },
      },
    },
    // Otimização de assets
    assetsInlineLimit: 4096,
    // Chunk size warning
    chunkSizeWarningLimit: 1000,
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps apenas em produção para debug
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['lucide-react'],
  },
  // Performance
  server: {
    hmr: {
      overlay: false,
    },
  },
});
