import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'phase3',
      filename: 'remoteEntry.js',
      exposes: {
        './Phase3App': './src/App.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3002,
  },
   build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    assetsDir: '',
    sourcemap: true,
  },
});
