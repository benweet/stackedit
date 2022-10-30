import {TinyEmitter} from 'tiny-emitter'

const instance = new TinyEmitter()
export default {
  $on: (...args) => instance.on(...args),
  $once: (...args) => instance.once(...args),
  $off: (...args) => instance.off(...args),
  $emit: (...args) => instance.emit(...args),
}
