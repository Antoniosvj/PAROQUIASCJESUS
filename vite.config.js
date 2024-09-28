import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoupdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'aple-touch-icon.png'],
      manifest: {
        name: 'PSCJesus',
        short_name: 'PSCJesus',
        description: 'App da Paroquia Sagrado Coracao de Jesus',
        start_url: '/',
        display: 'standalone', //tela cheia
        theme_color: '#d9d9d9',
        icons: [
          {
            src:'/logo_preto.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src:'/logo_preto.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
        }
      
    })
  ],
})
