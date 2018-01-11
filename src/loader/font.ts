import * as webpack from 'webpack'

/**
 *
 * @param loaderPath
 */
export const fontLoader = (loaderPath?: RegExp | undefined): webpack.Rule => {
  const test = loaderPath || /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/
  return {
    test,
    use: [
      {
        loader: 'base64-font-loader',
        options: {
          name: 'static/fonts/[name].[ext]'
        }
      }
    ]
  }
}
