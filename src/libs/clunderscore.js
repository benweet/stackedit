let arrayProperties = {};
let liveCollectionProperties = {};
let functionProperties = {};
let objectProperties = {};
const slice = Array.prototype.slice;

arrayProperties.cl_each = function (cb) {
  let i = 0;
  const length = this.length;
  for (; i < length; i++) {
        cb(this[i], i, this)
    }
}

arrayProperties.cl_map = function (cb) {
  let i = 0;
  const length = this.length;
  const result = Array(length);
  for (; i < length; i++) {
        result[i] = cb(this[i], i, this)
    }
    return result
}

arrayProperties.cl_reduce = function (cb, memo) {
  let i = 0;
  const length = this.length;
  for (; i < length; i++) {
        memo = cb(memo, this[i], i, this)
    }
    return memo
}

arrayProperties.cl_some = function (cb) {
  let i = 0;
  const length = this.length;
  for (; i < length; i++) {
        if (cb(this[i], i, this)) {
            return true
        }
    }
}

arrayProperties.cl_filter = function (cb) {
  let i = 0;
  const length = this.length;
  const result = [];
  for (; i < length; i++) {
        cb(this[i], i, this) && result.push(this[i])
    }
    return result
}

liveCollectionProperties.cl_each = function (cb) {
    slice.call(this).cl_each(cb)
}

liveCollectionProperties.cl_map = function (cb) {
    return slice.call(this).cl_map(cb)
}

liveCollectionProperties.cl_filter = function (cb) {
    return slice.call(this).cl_filter(cb)
}

liveCollectionProperties.cl_reduce = function (cb, memo) {
    return slice.call(this).cl_reduce(cb, memo)
}

functionProperties.cl_bind = function (context) {
  const self = this;
  const args = slice.call(arguments, 1);
  context = context || null
    return args.length
        ? function () {
            return arguments.length
                ? self.apply(context, args.concat(slice.call(arguments)))
                : self.apply(context, args)
        }
        : function () {
            return arguments.length
                ? self.apply(context, arguments)
                : self.call(context)
        }
}

objectProperties.cl_each = function (cb) {
  let i = 0;
  const keys = Object.keys(this);
  const length = keys.length;
  for (; i < length; i++) {
        cb(this[keys[i]], keys[i], this)
    }
}

objectProperties.cl_map = function (cb) {
  let i = 0;
  const keys = Object.keys(this);
  const length = keys.length;
  const result = Array(length);
  for (; i < length; i++) {
        result[i] = cb(this[keys[i]], keys[i], this)
    }
    return result
}

objectProperties.cl_reduce = function (cb, memo) {
  let i = 0;
  const keys = Object.keys(this);
  const length = keys.length;
  for (; i < length; i++) {
        memo = cb(memo, this[keys[i]], keys[i], this)
    }
    return memo
}

objectProperties.cl_some = function (cb) {
  let i = 0;
  const keys = Object.keys(this);
  const length = keys.length;
  for (; i < length; i++) {
        if (cb(this[keys[i]], keys[i], this)) {
            return true
        }
    }
}

objectProperties.cl_extend = function (obj) {
    if (obj) {
      let i = 0;
      const keys = Object.keys(obj);
      const length = keys.length;
      for (; i < length; i++) {
            this[keys[i]] = obj[keys[i]]
        }
    }
    return this
}

function build(properties) {
    return objectProperties.cl_reduce.call(properties, function (memo, value, key) {
        memo[key] = {
            value: value,
            configurable: true
        }
        return memo
    }, {})
}

arrayProperties = build(arrayProperties)
liveCollectionProperties = build(liveCollectionProperties)
functionProperties = build(functionProperties)
objectProperties = build(objectProperties)

/* eslint-disable no-extend-native */
Object.defineProperties(Array.prototype, arrayProperties)
Object.defineProperties(Int8Array.prototype, arrayProperties)
Object.defineProperties(Uint8Array.prototype, arrayProperties)
Object.defineProperties(Uint8ClampedArray.prototype, arrayProperties)
Object.defineProperties(Int16Array.prototype, arrayProperties)
Object.defineProperties(Uint16Array.prototype, arrayProperties)
Object.defineProperties(Int32Array.prototype, arrayProperties)
Object.defineProperties(Uint32Array.prototype, arrayProperties)
Object.defineProperties(Float32Array.prototype, arrayProperties)
Object.defineProperties(Float64Array.prototype, arrayProperties)
Object.defineProperties(Function.prototype, functionProperties)
Object.defineProperties(Object.prototype, objectProperties)
if (typeof window !== 'undefined') {
    Object.defineProperties(HTMLCollection.prototype, liveCollectionProperties)
    Object.defineProperties(NodeList.prototype, liveCollectionProperties)
}
