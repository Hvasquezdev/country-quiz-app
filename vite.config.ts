import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/variables.scss";`,
      },
    },
  },
  plugins: [
    vue(),
    VitePWA({
      mode: 'production',
      base: '/',
      srcDir: 'src',
      filename: 'sw.ts',
      includeAssets: ['/favicon.png'],
      strategies: 'injectManifest',
      manifest: {
        name: 'Country Quiz',
        short_name: 'Country Quiz',
        theme_color: '#6066d0cc',
        background_color: '#6066d0cc',
        display: 'fullScreen',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: './images/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: './images/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: './images/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: './images/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: './images/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: './images/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './images/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
