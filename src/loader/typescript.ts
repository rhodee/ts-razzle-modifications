import * as webpack from 'webpack'

/**
 *
 * @param config
 */
export const tsLoader = (config: webpack.Configuration): webpack.Rule => {
  // Safely locate Babel-Loader in Razzle's webpack internals
  const rules = (config.module as webpack.NewModule).rules
  const babelLoader = rules && rules.findIndex((rule) => rule['options'] && rule['options']['babelrc'])
  const { include } = rules[babelLoader]

  return {
    include,
    test: /\.tsx?$/,
    use: 'ts-loader',
    options: {
      // this will make errors clickable in `Problems` tab of VSCode
      // visualStudioErrorFormat: true,
    }
  }
}

/**
 *
 * @param config
 * @param configFilePath
 */
export const tslintLoader = (config: webpack.Configuration, configFilePath: string): webpack.Rule => {
  // Safely locate Babel-Loader in Razzle's webpack internals
  const rules = (config.module as webpack.NewModule).rules
  const babelLoader = rules && rules.findIndex((rule) => rule['options'] && rule['options']['babelrc'])
  const { include } = rules[babelLoader]

  return {
    include,
    enforce: 'pre',
    test: /\.tsx?$/,
    use: ['tslint-loader'],
    options: {
      emitErrors: true,
      configFile: configFilePath
    }
  }
}
