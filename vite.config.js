import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// During local dev, proxy /api to the local Express server (server.js on port 5000).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
