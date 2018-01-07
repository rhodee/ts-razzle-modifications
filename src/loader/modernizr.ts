import * as webpack from 'webpack'

export const modernizrcLoader = (loaderPath: RegExp | undefined): webpack.Rule => {
  const test = loaderPath || /\.modernizrrc$/
  return {
    use: ['webpack-modernizr-loader'],
    test
  }
}
