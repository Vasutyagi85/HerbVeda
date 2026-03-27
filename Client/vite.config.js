import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    allowedHosts: ['christopher-tacketed-pseudomythically.ngrok-free.dev'],
    proxy: {
      // This proxy helps avoid CORS issues if you decide to use 
      // specific Indian APIs that require a backend tunnel
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})