// vite.config.ts in shell
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        pdf: 'http://localhost:4173/assets/remoteEntry.js',
        auth: 'http://localhost:4173/assets/remoteEntry.js',
        landing: 'http://localhost:4173/assets/remoteEntry.js',
        doc: 'http://localhost:4173/assets/remoteEntry.js',
        templates: 'http://localhost:4173/assets/remoteEntry.js',
        api: 'http://localhost:4173/assets/remoteEntry.js',
      },
      // webpack.config.js
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        'react-router-dom': { singleton: true, requiredVersion: '^6.0.0' }
      }
    })
  ],
  build: {
    target: 'esnext'
  },
  server: {
    port: 5000
  }
});
