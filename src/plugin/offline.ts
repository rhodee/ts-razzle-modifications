import * as webpack from 'webpack'
import * as WorkboxPlugin from 'workbox-webpack-plugin'

export interface OfflineConfig {
  swDest: string
  globDirectory: string
  clientsClaim?: boolean
  skipWaiting?: boolean
  globPatterns?: string[]
  globIgnores?: string[]
}

/**
 *
 * @param offlineConfig
 */
const offline = (offlineConfig: OfflineConfig): webpack.Plugin[] => [ new WorkboxPlugin(offlineConfig) ]

export { offline }
