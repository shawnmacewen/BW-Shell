import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: false,
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  }
})
