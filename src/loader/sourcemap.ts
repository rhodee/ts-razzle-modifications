import * as webpack from 'webpack'

/**
 *
 * @param config
 * @param configFilePath
 */
export const sourcemapLoader = (): webpack.Rule => {
  return {
    test: /\.js$/,
    use: ['source-map-loader']
  }
}
