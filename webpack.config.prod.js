const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

var outputPath = __dirname + '/public';
var outputFilename = 'js/transformed-mini.js';

var plugins = [
  new HTMLWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
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
