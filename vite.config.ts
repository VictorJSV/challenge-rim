import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
      sass: {
        quietDeps: true,
      },
    },
  },
  server: {
    port: 3000,
  },
});
