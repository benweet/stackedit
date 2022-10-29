import 'eventsource-polyfill'
import hotClient from 'webpack-hot-middleware'

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
