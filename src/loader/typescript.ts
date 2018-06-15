import * as webpack from 'webpack'

/**
 *
 * @param config
 */
export const tsLoader = (config: webpack.Configuration, isDev: boolean, blendJS: boolean): any => {
  // Safely locate Babel-Loader in Razzle's webpack internals
  const rules = (config.module as webpack.NewModule).rules
  const babelLoader = rules && rules.findIndex((rule) => rule['options'] && rule['options']['babelrc'])
  const { include } = rules[babelLoader]

  if (blendJS) {
    return [
      {
        include,
        test: /\.tsx?$/,
        use: [
          isDev && { loader: require.resolve('cache-loader') },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader')
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            }
          }
        ].filter(x => x)
      },
      jsLoader(include)
    ]
  }

  return {
    include,
    test: /\.tsx?$/,
    use: [
      isDev && { loader: 'cache-loader' },
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
        }
      }
    ].filter(x => x)
  }
}

const jsLoader = (include) => ({
  include,
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
})
