import * as webpack from 'webpack'

/**
 *
 * @param loaderPath
 */
export const imageLoader = (loaderPath?: RegExp | undefined): webpack.Rule => {
  const test = loaderPath || /\.(gif|png|jpe?g)$/i
  return {
    test,
    use: [
      'url-loader',
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      }
    ]
  }
}
