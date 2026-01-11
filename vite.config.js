import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl({
      include: [
        '**/*.glsl',
        '**/*.wgsl',
        '**/*.vert',
        '**/*.frag',
        '**/*.vs',
        '**/*.fs'
      ],
      exclude: undefined,
      warnDuplicatedImports: true,
      defaultExtension: 'glsl',
      compress: false,
      watch: true,
      root: '/'
    })
  ],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'react-three-vendor': ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@shaders': '/src/shaders',
      '@styles': '/src/styles'
    }
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  }
});