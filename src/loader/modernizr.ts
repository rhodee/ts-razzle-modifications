import * as webpack from 'webpack'

/**
 *
 * @param loaderPath
 */
export const modernizrcLoader = (loaderPath?: RegExp | undefined): webpack.Rule => {
  const test = loaderPath || /\.modernizrrc$/
  return {
    use: ['webpack-modernizr-loader'],
    test
  }
}
