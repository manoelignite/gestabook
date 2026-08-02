import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.svg', 'icons.svg', 'icons/pwa-192x192.png', 'icons/pwa-512x512.png'],
      manifest: {
        name: 'Gestabook',
        short_name: 'Gestabook',
        description: 'Sistema de gestão Gestabook',
        theme_color: '#F3EDF7',
        background_color: '#F3EDF7',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone'],
        start_url: '/gestabook/',
        scope: '/gestabook/',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/gestabook/'
})


