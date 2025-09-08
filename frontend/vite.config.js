import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoupdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'PSCJesus',
        short_name: 'PSCJesus',
        description: 'App da Paroquia Sagrado Coracao de Jesus',
        start_url: '/',
        display: 'standalone', // Tela cheia
        theme_color: '#241e24',
        icons: [
          {
            src: '/logo_preto.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo_preto.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    sourcemap: true, // Ativa a geração de source maps durante o build
  },
  server: {
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
    proxy: {
      '/api': {
        target: 'https://www.paroquiascjesus.com.br',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  }
});
