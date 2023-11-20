import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8545',
    },
  },
  resolve: {
    alias: {
      '@backend': path.resolve(__dirname, '../backend'),
    },
  },
});
