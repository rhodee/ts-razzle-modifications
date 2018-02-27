/**
 *
 * @param loaderPath
 */
export const sourcemapLoader = (loaderPath?: RegExp | undefined): any => {
  const test = loaderPath || /\.tsx?$/
  return {
    enforce: 'pre',
    test,
    loader: 'source-map-loader',
    exclude: [/node_modules/, /build/, /__tests__/, /__test__/]
  }
}
