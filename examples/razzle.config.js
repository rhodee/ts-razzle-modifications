const modifyBuilder = require('ts-razzle-modifications').modifyBuilder
const webpack = require('webpack')
const path = require('path')
const appRoot = path.resolve(path.join(__dirname))
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
    tslintConfig: path.resolve(path.join(appRoot, 'tslint.json')),
    aliasPaths: {
      '@assets': path.resolve(path.join(srcRoot, 'assets')),
      '@components': path.resolve(path.join(path.join(srcRoot, 'components'))),
      '@containers': path.resolve(path.join(path.join(srcRoot, 'containers'))),
      '@screens': path.resolve(path.join(path.join(srcRoot, 'screens'))),
      '@services': path.resolve(path.join(path.join(srcRoot, 'services'))),
      '@src': path.resolve(path.join(srcRoot))
    },
    styleLint: {
      cssPath: ['src/assets/css/**/*.css']
    },
    plugins: {
      server: [
        new webpack.BannerPlugin({
          banner: 'require("source-map-support").install();',
          raw: true,
          entryOnly: false
        })
      ],
      client: [],
      universal: []
    }
  }
}

module.exports = {
  modify: modifyBuilder(customConfigs)
}