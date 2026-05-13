// ARTURO: Vite Configuration
// Vite is the bundler/dev server used to develop the React application

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
