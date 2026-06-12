import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

// На GitHub Pages проект публикуется по пути /gmm-pub/.
// В режиме разработки база — корень.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/gmm-pub/' : '/',
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Навигационная ментальная карта',
        short_name: 'Карта жизни',
        description: 'Панель управления жизнью: миссия → проекты → задачи',
        lang: 'ru',
        theme_color: '#1f2933',
        background_color: '#f7f7f5',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
}));
