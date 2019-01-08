const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const pkg = require('../package');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: './src/',
  },
  node: {
    // For mermaid
    fs: 'empty', // jison generated code requires 'fs'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter'),
      //   },
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },
      // We can't pass graphlibrary to babel
      // {
      //   test: /\.js$/,
      //   loader: 'string-replace-loader',
      //   include: [
      //     resolve('node_modules/graphlibrary')
      //   ],
      //   options: {
      //     search: '^\\s*(?:let|const) ',
      //     replace: 'const ',
      //     flags: 'gm'
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          // resolve('node_modules/mermaid'),
        ],
        // exclude: [
        //   resolve('node_modules/mermaid/src/diagrams/class/parser'),
        //   resolve('node_modules/mermaid/src/diagrams/flowchart/parser'),
        //   resolve('node_modules/mermaid/src/diagrams/gantt/parser'),
        //   resolve('node_modules/mermaid/src/diagrams/git/parser'),
        //   resolve('node_modules/mermaid/src/diagrams/sequence/parser'),
        // ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(ttf|eot|otf|woff2?)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(md|yml|html)$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
  ],
};
