import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'phase6',
      filename: 'remoteEntry.js',
      exposes: {
        './Phase6App': './src/Phase6App.tsx',

      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3005,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    assetsDir: '',
    sourcemap: true,
  },
});
