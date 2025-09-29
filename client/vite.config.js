import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://gdg-blog-project.onrender.com/', // backend port from .env
        changeOrigin: true,
      },
    },
  },
});
