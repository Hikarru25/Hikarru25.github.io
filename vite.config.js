import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: '/' is required for GitHub Pages root repo (Hikarru25.github.io)
// Without this, all asset paths would be wrong after deployment
export default defineConfig({
  plugins: [react()],
  base: '/',
})
