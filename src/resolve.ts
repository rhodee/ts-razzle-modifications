import * as webpack from 'webpack'
import { razzleBuild } from './index'

const defaultSupportedExtensions = ['.ts', '.tsx']
const defaultAliasPaths = {}

export const coreResolver = (
  c: webpack.Configuration,
  aliasPaths: razzleBuild.AliasPaths = defaultAliasPaths,
  supportedExtensions: string[] = defaultSupportedExtensions
) => {
  const extensions =
    c.resolve &&
    c.resolve.extensions &&
    c.resolve.extensions.concat(supportedExtensions)
  return {
    alias: aliasPaths,
    extensions
  }
}
