import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      'shared-ui': path.resolve(__dirname, '../../../packages/shared-ui'),
      'auth-lib': path.resolve(__dirname, '../../../packages/auth-lib')
    }
  },
  optimizeDeps: {
    include: ['shared-ui', 'auth-lib']
  }
}) 