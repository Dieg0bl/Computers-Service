import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: { strict: false },
    middlewareMode: false,
  },
  build: {
    rollupOptions: {},
  },
  preview: {
    port: 4173,
  },
});
