import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import imagemin from 'vite-plugin-imagemin';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/challenge-rim/',
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    imagemin({
      optipng: {
        optimizationLevel: 7,
      },
      webp: {
        quality: 75,
      }
    }),
    visualizer()
  ],
  resolve: {
    alias: {
      '@assets': '/src/assets',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@assets/styles/global.scss" as *;`,
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
