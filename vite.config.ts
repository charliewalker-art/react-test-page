import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  // AJOUTE CETTE LIGNE ICI :
  base: '/react-test-page/', 

  plugins: [
    react(),
    UnoCSS(),
  ],

  server: {
    proxy: {
      "/api": {
        target: "https://javion-bolometric-verdie.ngrok-free.dev",
        changeOrigin: true,
        secure: false,
        // Ajoute ceci pour que le proxy envoie aussi le header
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
      },
    },
  },
})