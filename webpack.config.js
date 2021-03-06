const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

var outputPath = __dirname + '/';
var outputFilename = 'public/js/transformed.js';

var plugins = [
  new HTMLWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
  })
];

module.exports = {
  entry: __dirname + '/src/index.js',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },{ 
      test: /\.css$/, 
      exclude: /node_modules/,
      use: [{ 
        loader: "style-loader" 
      },{ 
        loader: "css-loader", options: {minimize: true} 
      }]
    }]
  },
  output: {
    filename: outputFilename,
    path: outputPath
  },
  plugins: plugins
};
