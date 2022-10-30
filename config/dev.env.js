import {merge} from 'webpack-merge'
import prodEnv from './prod.env.js'

const config = merge(prodEnv, {
  NODE_ENV: '"development"'
})

export default config
