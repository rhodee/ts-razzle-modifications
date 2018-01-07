import * as webpack from 'webpack'

export const imageLoader = (): webpack.Rule => {
  return {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    use: ['url-loader'],
    options: {
      limit: 10000,
      name: 'static/images/[name].[hash:8].[ext]'
    }
  }
}
