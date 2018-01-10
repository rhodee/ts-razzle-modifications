export const fontLoader = () => {
  return {
    test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'base64-font-loader',
        options: {
          name: 'static/fonts/[name].[ext]'
        }
      }
    ]
  }
}
