import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), VitePWA({
    strategies: 'injectManifest',
    manifest: {

      short_name: 'Markee App',
      name: 'Markdown Editor',
      icons: [
        {
          src: 'favicon.png',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/png'
        },
        {
          src: 'logo192.png',
          type: 'image/png',
          sizes: '192x192'
        },
        {
          src: 'logo512.png',
          type: 'image/png',
          sizes: '512x512'
        }
      ],
      start_url: '.',
      display: 'standalone',
      theme_color: '#1E293B',
      background_color: '#ffffff'
    }
  })]
})
