import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-schema-form': path.resolve(__dirname, '../src'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  optimizeDeps: {
    include: [
      'react-is',
      'hoist-non-react-statics',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled'
    ],
    // Prevent Vite from pre-bundling these in dev, relying on the
    // example app's node_modules installation.
    exclude: [
      // Include all peer dependencies of react-schema-form for safety
      'react-schema-form'
    ]
  },
  build: {
    rollupOptions: {
      external: [
        // CRITICAL: Ensure these are treated as external even when aliased
        '@emotion/react',
        '@emotion/styled',
        '@mui/material',
        '@mui/styles',
        'react',
        'react-dom'
      ],
    },
  },
})
