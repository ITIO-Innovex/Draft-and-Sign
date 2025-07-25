import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'phase2',
      filename: 'remoteEntry.js',
      exposes: {
        './Phase2App': './src/App.tsx',
      //  './Phase2Content': './src/Phase2Content.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    assetsDir: '',
    sourcemap: true,
  },
});
