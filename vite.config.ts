import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
          target: 'http://challenge.machinalabs.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
    }
  },
  resolve: {
    alias: {
      "Assets": resolve(__dirname, "./src/assets"),
      "Pages": resolve(__dirname, "./src/pages/"),
      "Components": resolve(__dirname, "./src/components/"),
      "Context": resolve(__dirname, "./src/context/"),
      "Hooks": resolve(__dirname, "./src/hooks/"),
      "Styles": resolve(__dirname, "./src/styles"),
      "Routes": resolve(__dirname, "./src/routes"),
      "Types": resolve(__dirname, "./src/types")
    }
  }
})
