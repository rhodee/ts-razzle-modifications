import * as webpack from 'webpack'

/**
 *
 * @param config
 */
export const tsLoader = (config: webpack.Configuration): any => {
  // Safely locate Babel-Loader in Razzle's webpack internals
  const rules = (config.module as webpack.NewModule).rules
  const babelLoader = rules && rules.findIndex((rule) => rule['options'] && rule['options']['babelrc'])
  const { include } = rules[babelLoader]

  return {
    include,
    test: /\.tsx?$/,
    loader: 'ts-loader'
  }
}

/**
 *
 * @param config
 * @param configFilePath
 */
export const tslintLoader = (_config: webpack.Configuration, configFilePath: string): any => {

  return {
    enforce: 'pre',
    test: /\.tsx?$/,
    loader: 'tslint-loader',
    options: {
      emitErrors: true,
      configFile: configFilePath
    }
  }
}
