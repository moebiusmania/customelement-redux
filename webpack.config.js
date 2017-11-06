'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/demo/index.js'
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'demo.js',
    },
    devtool: 'source-map',
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
}