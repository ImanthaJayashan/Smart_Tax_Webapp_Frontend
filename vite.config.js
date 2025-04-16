import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 5000, // Fixed port
    strictPort: true, // Prevents Vite from switching to a different port
    host: 'localhost' // Ensures it binds to localhost
  }
})


