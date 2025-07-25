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
        phase2: 'http://localhost:3001/remoteEntry.js',
        phase3: 'http://localhost:3002/remoteEntry.js',
        phase4: 'http://localhost:3003/remoteEntry.js',
        phase5: 'http://localhost:3004/remoteEntry.js',
        phase6: 'http://localhost:3005/remoteEntry.js',
        phase7: 'http://localhost:3006/remoteEntry.js',

      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3000,
  },
});
