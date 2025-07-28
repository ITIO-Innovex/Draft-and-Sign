import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        // phase1: 'http://localhost:3000/remoteEntry.js',
        phase2: 'https://peppy-gnome-0cf29e.netlify.app/remoteEntry.js',
        phase3: 'https://stately-semifreddo-155790.netlify.app/remoteEntry.js',
        phase4: 'https://incredible-pithivier-2b7b29.netlify.app/remoteEntry.js',
        phase5: 'https://heartfelt-syrniki-4fddd5.netlify.app/remoteEntry.js',
        phase6: 'https://flourishing-travesseiro-58b537.netlify.app/remoteEntry.js',
        phase7: 'https://dazzling-snickerdoodle-2f0ade.netlify.app/remoteEntry.js',

      },
      shared: ['react', 'react-dom'],
    }),
  ],
   build: {
    target: 'esnext', // ← fix: allow top-level await
  },
  server: {
    port: 3000,
  },
});
