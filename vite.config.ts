import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/challenge-rim/',
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '@styles': '/src/assets/styles',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/global.scss" as *;`,
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
