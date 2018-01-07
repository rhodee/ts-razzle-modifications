import * as webpack from 'webpack'

export const fontLoader = (): webpack.Rule => {
  return {
    test: [/\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/],
    use: ['base64-font-loader'],
    options: {
      name: 'static/fonts/[name].[ext]'
    }
  }
}
