import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Lets `npm run dev` hit /api/* locally if you run `vercel dev`
      // alongside it. Safe to leave in even if unused.
      '/api': 'http://localhost:3000',
    },
  },
});
