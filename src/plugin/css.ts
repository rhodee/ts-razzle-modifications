import * as ExtractTextPlugin from 'extract-text-webpack-plugin'

const cssPlugin = new ExtractTextPlugin('static/css/[name].[contenthash:8].css')

export { cssPlugin }
