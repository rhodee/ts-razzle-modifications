import * as webpack from 'webpack'
import * as WorkboxPlugin from 'workbox-webpack-plugin'
import * as WebpackPwaManifest from 'pwa-manifest-webpack-plugin'

export interface PWAIcon {
  src: string
  sizes: string
  type: string
}

export interface OfflineConfig {
  swDest: string
  globDirectory: string
  clientsClaim?: boolean
  skipWaiting?: boolean
  globPatterns?: string[]
  globIgnores?: string[]
}

export interface PWARelatedApplication {
  platform: string
  id?: string
  url: string
}

export interface PWAManifest {
  name: string
  short_name?: string
  orientation: 'portrait'
  display: 'fullscreen' | 'standalone'
  description: string
  start_url: string
  theme_color: string
  background_color: string
  related_applications?: PWARelatedApplication[]
  icons?: PWAIcon[]
}

const defaultOfflineConfig = {
  swDest: '',
  globDirectory: '',
  clientsClaim: true,
  skipWaiting: true,
  globPatterns: ['**/*.{js,css,svg,html}'],
  globIgnores: ['**\/sw.js']
}

const offline = (offlineConfig: OfflineConfig = defaultOfflineConfig, manifest: PWAManifest): webpack.Plugin[] => [
  new WorkboxPlugin(offlineConfig),
  new WebpackPwaManifest(manifest)
]

export { offline }
