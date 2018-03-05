'use strict';

const path = require('path');

module.exports = {
  entry: {
    demo: './src/demo/index.js'
  },
  mode: 'development',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'demo.js',
    chunkFilename: '[chunk].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    watchOptions: {
      poll: true
    },
    compress: true,
    port: 8081,
    host: 'localhost',
    hot: true,
    inline: true
  }
};
