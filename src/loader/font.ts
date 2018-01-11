import * as webpack from 'webpack'

/**
 *
 * @param loaderPath
 */
export const fontLoader = (loaderPath?: RegExp | undefined): webpack.Rule => {
  const test = loaderPath || /\.(woff|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/
  return {
    test,
    use: ['base64-font-loader']
  }
}
