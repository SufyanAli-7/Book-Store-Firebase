import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    forwardConsole: true,
  },
  resolve: {
    alias: {
      // maps '@' to the absolute path of your 'src' directory
      '@': path.resolve(__dirname, './src'),
      // you can add more specific aliases
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
})