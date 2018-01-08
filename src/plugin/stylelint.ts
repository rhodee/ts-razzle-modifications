import * as webpack from 'webpack'
import * as StyleLintPlugin from 'stylelint-webpack-plugin'

export interface StylelintConfig {
  context: string
  files: string[]
}

export const stylelintPlugin = (slc: StylelintConfig): webpack.Plugin[] => [
  new StyleLintPlugin(slc)
]
