import * as webpack from 'webpack'
import * as WebpackPwaManifest from 'pwa-manifest-webpack-plugin'

export interface PWAIcon {
  src: string
  sizes: string
  type: string
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

/**
 *
 * @param manifest
 */
const pwa = (manifest: PWAManifest): webpack.Plugin[] => [ new WebpackPwaManifest(manifest) ]

export { pwa }
