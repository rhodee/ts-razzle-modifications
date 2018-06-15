import * as webpack from 'webpack'
import * as path from 'path'

const modPath = path.join(__dirname, '..', '..', 'node_modules')

/**
 *
 * @param config
 */
export const tsLoader = (config: webpack.Configuration, isDev: boolean, blendJS: boolean): any => {
  // Safely locate Babel-Loader in Razzle's webpack internals
  const rules = (config.module as webpack.NewModule).rules
  const babelLoader = rules && rules.findIndex((rule) => rule['options'] && rule['options']['babelrc'])
  const { include } = rules[babelLoader]

  return {
    include,
    test: /\.tsx?$/,
    use: [
      isDev && { loader: require.resolve('cache-loader') },
      blendJS && {
        loader: require.resolve(`${modPath}/razzle/node_modules/babel-loader/lib/index.js`)
      },
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
