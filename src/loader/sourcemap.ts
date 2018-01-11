import * as webpack from 'webpack'

/**
 *
 * @param loaderPath
 */
export const sourcemapLoader = (loaderPath?: RegExp | undefined): webpack.Rule => {
  const test = loaderPath || /\.js$/
  return {
    test,
    use: ['source-map-loader']
  }
}
