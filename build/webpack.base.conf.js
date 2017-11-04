var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var StylelintPlugin = require('stylelint-webpack-plugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/'
  },
  node: {
    // For mermaid
    fs: 'empty' // jison generated code requires 'fs'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/mermaid/src')],
        exclude: [
          resolve('node_modules/mermaid/src/diagrams/classDiagram/parser'),
          resolve('node_modules/mermaid/src/diagrams/flowchart/parser'),
          resolve('node_modules/mermaid/src/diagrams/gantt/parser'),
          resolve('node_modules/mermaid/src/diagrams/gitGraph/parser'),
          resolve('node_modules/mermaid/src/diagrams/sequenceDiagram/parser'),
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(ttf|eot|otf|woff2?)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(md|yml|html)$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new StylelintPlugin({
      files: ['**/*.vue', '**/*.scss']
    }),
    new FaviconsWebpackPlugin({
      logo: resolve('src/assets/favicon.png'),
      title: 'StackEdit',
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('../package.json').version)
    })
  ]
}
