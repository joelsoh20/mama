import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

export default defineConfig({
  base: '/',  // Important pour Netlify
  plugins: [
    react(),
    tailwindcss(), 
  ],
  build: {
    chunkSizeWarningLimit: 1000, // On passe la limite à 1000 ko
  },
})