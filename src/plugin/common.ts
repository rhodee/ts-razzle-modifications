import * as webpack from 'webpack'
import * as CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import * as CircularDependencyPlugin from 'circular-dependency-plugin'

import chunks from './chunks'

export const common = (): webpack.Plugin[] => [
  new CaseSensitivePathsPlugin(),
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true,
    // set the current working directory for displaying module paths
    cwd: process.cwd()
  })
]

export const node = (): webpack.Plugin[] => []

export const client = (): webpack.Plugin[] => [
  ...chunks()
]
