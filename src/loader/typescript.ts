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
          isDev && { loader: 'cache-loader' },
          blendJS && jsLoader,
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            }
          }
        ].filter(x => x)
      },
      jsLoader
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

const jsLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader'
    }
  ]
}
