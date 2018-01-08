import * as webpack from 'webpack'
import * as MinifyPlugin from 'babel-minify-webpack-plugin'
import * as BrotliPlugin from 'brotli-webpack-plugin'
import * as CompressionPlugin from 'compression-webpack-plugin'

const optimizeAssets = (): webpack.Plugin[] => [
  new CompressionPlugin({
    asset: '[path].gz',
    algorithm: 'gzip',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8
  }),

  new BrotliPlugin({
    asset: '[path].br',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8
  }),

  new MinifyPlugin()
]
export { optimizeAssets }
