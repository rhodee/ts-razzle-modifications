import * as webpack from 'webpack'
import * as autoprefixer from 'autoprefixer'
import { cssPlugin } from '../plugin/css'

/**
 *
 * @param config
 * @param isDev
 */
export const cssLoader = (_config: webpack.Configuration, isDev: boolean): any => {
  if (isDev) {
    return {
      test: /.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
            plugins: () => [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9' // React doesn't support IE8 anyway
                ]
              })
            ]
          }
        },
        'sass-loader'
      ]
    }
  }

  return {
    test: /.scss$/,
    use: cssPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
            plugins: () => [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9' // React doesn't support IE8 anyway
                ]
              })
            ]
          }
        },
        'sass-loader'
      ]
    })
  }
}
