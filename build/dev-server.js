import './check-versions.js'
import config from '../config/index.js'

Object.keys(config.dev.env).forEach((key) => {
  if (!process.env[key]) {
    process.env[key] = JSON.parse(config.dev.env[key]);
  }
});

import path from 'path'
import opn from 'opn'
import express from 'express'
import  webpack from 'webpack'
import devMiddlewareFunc from 'webpack-dev-middleware'
import proxyMiddleware from 'http-proxy-middleware'
import webpackConfig from './webpack.dev.conf.js'
import webpackHot from 'webpack-hot-middleware'
import index from '../server/index.js'
import connectHistory from 'connect-history-api-fallback'

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()


var compiler = webpack(webpackConfig.res)

// StackEdit custom middlewares
index(app);

var devMiddleware = devMiddlewareFunc(compiler, {
  publicPath: webpackConfig.res.output.publicPath,
})

var hotMiddleware = webpackHot(compiler, {
  log: () => {}
})


// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware.createProxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(connectHistory())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

export default {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
