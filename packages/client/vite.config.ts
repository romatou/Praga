import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'
dotenv.config()

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  ssr: {
    target: 'node',
    format: 'cjs',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
  build: {
    rollupOptions: {
      input: { main: path.resolve(__dirname, 'index.html') },
    },
  },
})
