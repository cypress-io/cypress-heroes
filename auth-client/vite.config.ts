import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3102,
  },
  preview: {
    port: 3102,
    strictPort: true,
  },
  plugins: [react()],
  base: '/client',
  build: {
    outDir: '../server/dist/client'
  }
});
