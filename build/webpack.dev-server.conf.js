const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: config.dev.env.NODE_ENV,
      GOOGLE_CLIENT_ID: config.dev.env.GOOGLE_CLIENT_ID,
      GITHUB_CLIENT_ID: config.dev.env.GITHUB_CLIENT_ID,
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, '..'),
    port: 13100,
    publicPath: '/public/dist/',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    staticOptions: {
      setHeaders(res) {
        res.set('Access-Control-Allow-Origin', '*');
      },
    },
  },
});
