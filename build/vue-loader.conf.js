import utils from './utils.js'
import configFromIndex from '../config/index.js'
const isProduction = process.env.NODE_ENV === 'production'

const config = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? configFromIndex.build.productionSourceMap
      : configFromIndex.dev.cssSourceMap,
    extract: isProduction
  })
}
export default config
