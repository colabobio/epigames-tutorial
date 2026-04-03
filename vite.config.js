import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This tells Vite exactly where the app will live on epidemica.info
  base: '/epigames/vinuepi26/tutorial/', 
})