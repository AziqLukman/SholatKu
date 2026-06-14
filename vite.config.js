import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Custom plugin to spawn the background chat auto-backup watcher
function chatBackupPlugin() {
  return {
    name: 'chat-backup-plugin',
    configureServer() {
      const watcherPath = path.resolve(__dirname, 'scripts/chat-backup-watcher.cjs')
      const child = spawn('node', [watcherPath], {
        detached: true,
        stdio: 'ignore'
      })
      child.unref()
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    chatBackupPlugin(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['icon.png'],
      workbox: {
        importScripts: ['/sw-custom.js'],
      },
      manifest: {
        name: 'Jadwal Sholat',
        short_name: 'SholatKu',
        description: 'Jadwal Sholat by Ajekkk',
        theme_color: '#d8ede8',
        background_color: '#d8ede8',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  preview: {
    allowedHosts: ['sholatku.ajekkk.my.id', 'ajekkk.my.id'],
  },
  server: {
    port: 3002,
    open: true,
    host: true,
  },
})

