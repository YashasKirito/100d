import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: '100-Day Challenge',
        short_name: '100 Days',
        description: 'Personal 100-day body transformation tracker',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0c0d10',
        theme_color: '#0c0d10',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // day pages are lazy chunks — precache them all so offline works
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/index.html',
        // never intercept Firebase traffic; its SDK handles offline itself
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/(firestore|identitytoolkit|securetoken)\.googleapis\.com\//,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
})
