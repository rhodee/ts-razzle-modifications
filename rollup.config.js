const path = require('path')
const commonjs = require('rollup-plugin-commonjs')
const filesize = require('rollup-plugin-filesize')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const sourceMaps = require('rollup-plugin-sourcemaps')
const uglify = require('rollup-plugin-uglify')
const typescript = require('rollup-plugin-typescript2')
const json = require('rollup-plugin-json')


export default {
  input: path.join(__dirname, './src/index.ts'),
  external: ['react','react-native'],
  output: [
    { file: 'dist/index.es6.js', format: 'es', sourceMap: true, },
    { file: 'dist/index.js', format: 'cjs', sourceMap: true, },
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfig: 'tsconfig.json',
    }),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs(),
    resolve(),
    json(),
    sourceMaps(),
    filesize(),
    uglify()
  ]
}
