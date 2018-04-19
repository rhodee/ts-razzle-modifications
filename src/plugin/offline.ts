import * as webpack from 'webpack'
import * as WorkboxPlugin from 'workbox-webpack-plugin'
const { InjectManifest } = WorkboxPlugin
const { GenerateSW } = WorkboxPlugin

export interface OfflineConfig {
  swSrc?: string | undefined
  importWorkboxFrom?: 'cdn' | 'local' | 'disabled'
  chunks?: string[]
  include?: string[]
  exclude: string[]
  excludeChunks: string[] | string
  precacheManifestFilename: string
  swDest: string
  globDirectory?: string | undefined
  clientsClaim?: boolean
  skipWaiting?: boolean
  globPatterns?: string[]
  globIgnores?: string[]
  maximumFileSizeToCacheInBytes?: number
  dontCacheBustUrlsMatching?: RegExp | null
  modifyUrlPrefix?: null | { [name: string]: string }
}

const defaultWorkboxConfig = {
  swSrc: undefined,
  importWorkboxFrom: 'local'
}

/**
 *
 * @param offlineConfig
 */
const offline = (offlineConfig: OfflineConfig): webpack.Plugin[] => {
  const c = { ...defaultWorkboxConfig, ...offlineConfig }
  if (offlineConfig.swSrc) {
    return [ new InjectManifest(c) ]
  }
  delete c.swSrc
  return [ new GenerateSW(c) ]
}

export { offline }
