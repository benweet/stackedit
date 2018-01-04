var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_CLIENT_ID: '"241271498917-c3loeet001r90q6u79q484bsh5clg4fr.apps.googleusercontent.com"',
  GITHUB_CLIENT_ID: '"cbf0cf25cfd026be23e1"'
})
