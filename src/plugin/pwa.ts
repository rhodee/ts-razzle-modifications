import * as webpack from 'webpack'
import * as WebpackPwaManifest from 'webpack-pwa-manifest'

export interface PWARelatedApplication {
  platform: string
  id?: string
  url: string
}

export interface PWAManifest {
  name: string
  short_name: string
  start_url: string
  orientation: 'portrait' | 'landscape'
  display: 'fullscreen' | 'standalone'
  publicPath?: string
  fingerprints?: boolean
  ios?: boolean
  includeDirectory?: boolean
  description: string
  theme_color: string
  background_color: string
  related_applications?: PWARelatedApplication[]
  icons?: WebpackPwaManifest.Icon[]
}

/**
 *
 * @param manifest
 */
const pwa = (manifest: PWAManifest): webpack.Plugin[] => [new WebpackPwaManifest(manifest)]

export { pwa }
