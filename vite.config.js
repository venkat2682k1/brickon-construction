import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()], // <-- Ensure tailwindcss() is here
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // ... rest of config
  };
});