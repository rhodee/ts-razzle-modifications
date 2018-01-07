import * as webpack from 'webpack'

// Use Twitter Lite's vendor & manifest bundle approach
// See https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3
const chunks = (): webpack.Plugin[] => [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: Infinity
  }),

  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 4
  })
]

export default chunks
