import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',              // ✅ this is important for static deploy on Vercel
  server: { port: 5174 }   // ✅ this is fine for local dev
})
