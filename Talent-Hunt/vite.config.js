// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // This will fix the JSX syntax error you were seeing
  // esbuild: {
  //   loader: {
  //     '.js': 'jsx',
  //   },
  // },
})