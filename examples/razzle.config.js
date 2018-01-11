const modifyBuilder = require('ts-razzle-modifications').modifyBuilder
const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const path = require('path')
const appRoot = path.resolve(__dirname)
const srcRoot = path.join(appRoot, 'src')

const customConfigs = {
  appRoot,
  srcRoot,
  modernizrConfig: /\.modernizrrc$/,
  workboxConfig: {
    globDirectory: path.join(appRoot, 'build'),
    globPatterns: ['**/*.{js,css,svg,html}'],
    globIgnores: ['**\/sw.js'],
    swDest: path.join(appRoot, 'public/sw.js'),
    clientsClaim: true,
    skipWaiting: true
  },
  pwaConfig: {
    name: 'React App',
    short_name: 'app',
    orientation: 'portrait',
    display: 'fullscreen',
    description: 'react on razzle',
    start_url: '.',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    related_applications: [],
    icons: []
  },
  vendorPaths: [
    require.resolve('razzle/polyfills'),
    require.resolve('react'),
    require.resolve('react-dom'),
    require.resolve('react-router-dom'),
    require.resolve('history')
    // ... add any other vendor packages with require.resolve('xxx')
  ],
  cssModules: {
    moduleIdentifer: 'localIdentName=[name]__[local]___[hash:base64:5]',
    cssFilePath: 'static/css/[name].[hash].css'
  },
  extensions: {
    aliasPaths: {
      '@assets': path.resolve(path.join(srcRoot, 'assets')),
      '@components': path.resolve(path.join(path.join(srcRoot, 'components'))),
      '@containers': path.resolve(path.join(path.join(srcRoot, 'containers'))),
      '@screens': path.resolve(path.join(path.join(srcRoot, 'screens'))),
      '@services': path.resolve(path.join(path.join(srcRoot, 'services'))),
      '@src': path.resolve(path.join(srcRoot))
    },
    loaders: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          configFile: path.join(appRoot, 'tslint.json')
        }
      }
    ],
    plugins: {
      server: [
        new webpack.BannerPlugin({
          banner: 'require("source-map-support").install();',
          raw: true,
          entryOnly: false
        })
      ],
      client: [
        new StyleLintPlugin({
          context: appRoot,
          files: ['src/assets/css/**/*.css']
        })
      ],
      universal: []
    }
  }
}

module.exports = {
  modify: modifyBuilder(customConfigs)
}
