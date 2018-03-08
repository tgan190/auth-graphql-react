const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');


module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  /*
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ],
  */
  devtool: 'inline-source-map'
};
