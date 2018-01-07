import * as path from 'path'
import { razzleBuild } from './index'

const defaultConfig: razzleBuild.Configuration = {
  appRoot: path.resolve(__dirname),
  srcRoot: path.resolve(__dirname, 'src'),
  modernizrConfig: /\.modernizrrc$/,
  workboxConfig: undefined,
  pwaConfig: undefined,
  vendorPaths: [],
  cssModules: {
    moduleIdentifer: 'localIdentName=[name]__[local]___[hash:base64:5]',
    cssFilePath: 'static/css/[name].[hash].css'
  },
  extensions: {
    tslintConfig: undefined,
    aliasPaths: undefined,
    styleLint: undefined,
    plugins: {
      server: [],
      client: [],
      universal: []
    }
  }
}

export { defaultConfig }
