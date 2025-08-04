import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        pdf: 'http://localhost:4173/assets/remoteEntry.js',
        auth: 'http://localhost:4173/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext'
  },
  server: {
    port: 5000
  }
});
