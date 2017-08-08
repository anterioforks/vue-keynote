export default class EventEmitter {
  constructor () {
    this.handlers = {}
  }

  on (name, fn) {
    !this.handlers[name] && (this.handlers[name] = [])
    this.handlers[name].push(fn)
    this.trigger('on', name, fn)
  }

  off (name, fn) {
    if (typeof name === 'undefined') {
      this.handlers = {}
    }

    if (!(name in this.handlers)) return

    if (typeof fn === 'function') {
      const index = this.handlers[name].indexOf(fn)

      index > -1 && this.handlers[name].splice(index, 1)
    } else if (typeof fn === 'undefined') {
      this.handlers[name] = []
    }

    this.trigger('off', name, fn)
  }

  trigger (name, ...args) {
    if (!(name in this.handlers)) return

    this.handlers[name].forEach(fn => fn.apply(this, args))
  }
}
