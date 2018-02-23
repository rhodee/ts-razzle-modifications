const modifyBuilder = require('ts-razzle-modifications').modifyBuilder
const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const path = require('path')
const appRoot = '.'
const srcRoot = path.resolve(__dirname, 'src')

const customConfigs = {
  appRoot,
  srcRoot,
  modernizrConfig: /\.modernizrrc$/,
  workboxConfig: {
    globDirectory: 'build',
    globPatterns: ['**/*.{js,css,svg,html}'],
    globIgnores: ['**\/sw.js'],
    swDest: 'build/public/sw.js',
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
    // These go in public. At least 512 if you want to pass Lighthouse testng.
    icons: [
      // {
      //   "src": "favicon.ico",
      //   "sizes": "192x192",
      //   "type": "image/png"
      // },
      // {
      //   "src": "android-chrome-192x192.png",
      //   "sizes": "192x192",
      //   "type": "image/png"
      // },
      // {
      //     "src": "android-chrome-512x512.png",
      //     "sizes": "512x512",
      //     "type": "image/png"
      // },
      // {
      //   "src": "favicon-144x144.png",
      //   "sizes": "144x144",
      //   "type": "image/png"
      // }
    ]
  },
  vendorPaths: [
    require.resolve('razzle/polyfills'),
    require.resolve('react'),
    require.resolve('react-dom'),
    require.resolve('react-router-dom')
    // ... add any other vendor packages with require.resolve('xxx')
  ],
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
        test: /\.(woff|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['base64-font-loader']
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
