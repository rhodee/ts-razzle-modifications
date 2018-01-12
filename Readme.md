# Razzle Configuration Function

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Features](#features)
- [Usage](#usage)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Read more about [razzle](https://github.com/jaredpalmer/razzle).
Check out the [example](./examples) to utilize this configuration.

## Features

- Typescript
- Offline
- Progressive Web App
- File compression optimizations (Brotli, GZIP)
- Stylelint

## Usage

```js
// razzle.config.js
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
    loaders: [],
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
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/737290?s=400" width="100px;"/><br /><sub><b>Denis Rhoden</b></sub>](http://rhodee.us)<br />[💬](#question-rhodee "Answering Questions") [💻](https://github.com/rhodee/ts-razzle-modifications/commits?author=rhodee "Code") [🎨](#design-rhodee "Design") [📖](https://github.com/rhodee/ts-razzle-modifications/commits?author=rhodee "Documentation") [💡](#example-rhodee "Examples") [🤔](#ideas-rhodee "Ideas, Planning, & Feedback") [👀](#review-rhodee "Reviewed Pull Requests") [⚠️](https://github.com/rhodee/ts-razzle-modifications/commits?author=rhodee "Tests") [🔧](#tool-rhodee "Tools") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
