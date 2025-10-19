import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '@styles': '/src/styles',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/theme.scss" as *;`,
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
