import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"; // ✅ REQUIRED

// https://vite.dev/config/
export default defineConfig({
  server:{
    host: '0.0.0.0',
    allowedHosts: ['.ngrok-free.app']
  },
  plugins: [react(), svgr(),],
})