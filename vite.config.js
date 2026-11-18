import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      input: {
        // Основное приложение CodeWay (Bootstrap)
        main: resolve(__dirname, 'index.html'),
        // Отдельный слой заданий на Tailwind CSS (без Bootstrap)
        tailwind: resolve(__dirname, 'tailwind.html'),
      },
    },
  },
  server: {
    port: 5173,
    // Не переезжать молча на 5174/5175: иначе ломаются инструкции и proxy
    strictPort: true,
    // Proxy API requests to json-server
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
