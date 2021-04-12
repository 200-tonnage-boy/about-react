const path = require('path')
const nodeExternals = require('webpack-node-externals')// 打包文件时排除node_modules
module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        } 
      }
    ]
  },
  externals: [
    nodeExternals(),
  ]
}