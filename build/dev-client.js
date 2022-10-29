import 'eventsource-polyfill'
import hotClient from 'webpack-hot-middleware'

hotClient.bind(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
