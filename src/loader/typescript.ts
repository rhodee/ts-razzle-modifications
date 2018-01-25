import * as webpack from 'webpack'

/**
 *
 * @param config
 */
export const tsLoader = (config: webpack.Configuration, isDev: boolean): any => {
  // Safely locate Babel-Loader in Razzle's webpack internals
  const rules = (config.module as webpack.NewModule).rules
  const babelLoader = rules && rules.findIndex((rule) => rule['options'] && rule['options']['babelrc'])
  const { include } = rules[babelLoader]

  return {
    include,
    test: /\.tsx?$/,
    use: [
      isDev && { loader: 'cache-loader' },
      isDev && {
        loader: 'thread-loader',
        options: {
          // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          workers: 2
        }
      },
      {
        loader: 'ts-loader',
        options: {
          happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
        }
      }
    ].filter(x => x)
  }
}
