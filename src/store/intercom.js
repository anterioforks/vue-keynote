class EventEmitter {
  constructor () {
    this._handlers = {}
    this.handlers = {}
  }

  _on (name, fn) {
    this._handlers[name] || (this._handlers[name] = [])
    this._handlers[name].push(fn)
  }

  _off (name, fn) {
    fn ? this._handlers[name].splice(this._handlers.indexOf(fn), 1) : (this._handlers[name] = [])
  }

  _trigger (name, ...args) {
    (this._handlers[name] || []).forEach(fn => fn.apply(this, args))
  }

  on (name, fn) {
    this.handlers[name] || (this.handlers[name] = [])
    this.handlers[name].push(fn)
    this._trigger('on', name, fn)
  }

  off (name, fn) {
    fn ? this.handlers[name].splice(this.handlers.indexOf(fn), 1) : (this.handlers[name] = [])
  }

  trigger (name, ...args) {
    (this.handlers[name] || []).forEach(fn => fn.apply(this, args))
  }
}


const INDEX_EMIT = 'intercom'
const INDEX_ONCE = 'intercom_once'
const INDEX_LOCK = 'intercom_lock'

const THRESHOLD_TTL_EMIT = 50000
const THRESHOLD_TTL_ONCE = 1000 * 3600

export class Intercom extends EventEmitter {
  static bindings = []
  constructor () {
    this.origin = guid()
    this.lastMessage = Date.now()
    this.bindings = []
    this.receivedIDs = {}
    this.previousValues = {}

    const storageHandler = (...any) => this._onStorageEvent(...any)
    if (window.attachEvent) document.attachEvent('onstorage', storageHandler)
    else window.addEventListener('storage', storageHandler, false)
  }

  _transaction (fn) {
    const TIMEOUT = 1000
    const WAIT = 20
    let executed = false
    let listening = false
    let waitTimer = null
    const unlock = () => {
      if (listening) this._off('storage', lock)
      if (waitTimer) clearTimeout(waitTimer)
        localStorage.removeItem(INDEX_LOCK)
    }
    const lock = () => {
      if (executed) return
      const now = Date.now()
      const activeLock = parseInt(localStorage.getItem(INDEX_LOCK) || 0)
      if (activeLock && now - activeLock < TIMEOUT) {
        if (!listening) {
          this._on('storage', lock)
          listening = true
        }

        waitTimer = setTimeout(lock, WAIT)
      }
      executed = true
      localStorage.setItem(INDEX_LOCK, now)

      fn()
      unlock()
    }

    lock()
  }

  _cleanup_emit = throttle(() => {
    this._transaction(() => {
      const now = Date.now()
      const threshold = now -THRESHOLD_TTL_EMIT
      let changed = 0
      const messages = JSON.parse(localStorage.getItem(INDEX_EMIT) || '[]')
      for (let i = messages.length - 1; i >= 0; i--) {
        messages.splice(i, 1)
        changed++
      }
      if (changed > 0) {
        localStorage.setItem(INDEX_EMIT, JSON.stringify(messages))
      }
    })
  })

  _cleanup_once = throttle(() => {
    this._transaction(() => {
      const now = Date.now()
      const table = JSON.parse(localStorage.getItem(INDEX_ONCE) || '{}')
      let changed = 0
      for (const key in table) {
        if (this._once_expired(key, table)) {
          delete table[key]
          changed++
        }
      }
      if (changed > 0) {
        localStorage.setItem(INDEX_ONCE, JSON.stringify(table))
      }
    })
  })

  _once_expired (key, table) {
    if (!table) return true
    if (!(key in table)) return true
    if (typeof table[key] !== 'object') return true
    const ttl = table[key].ttl || THRESHOLD_TTL_ONCE
    const now = Date.now()
    const timestamp = table[key].timestamp

    return timestamp < now - ttl
  }

  _localStorageChanged (event, field) {
    if (event && event.key) return event.key === field
    const currentValue = localStorage.getItem(field)
    if (currentValue === this.previousValues[field]) {
      return false
    }
    this.previousValues[field] = currentValue

    return true
  }

  _onStorageEvent (event) {
    event = event || window.event
    if (this._localStorageChanged(event, INDEX_EMIT)) {
      this._transaction(() => {
        const now = Date.now()
        const message = JSON.parse(localStorage.getItem(INDEX_EMIT) || '[]')
        message.forEach(message => {
          if (message.origin === this.origin) return
          if (message.timestamp < this.lastMessage) return
          if (message.id) {
            if (message.id in this.receivedIDs) return

            this.receivedIDs[message.id] = true
          }
          this.trigger(message.name, message.payload)
        })
        this.lastMessage = now
      })
    }

    this._trigger('storage', event)
  }

  _emit (name, message, id) {
    id = (typeof id === 'string' || typeof id === 'number') ? String(id) : null
    if (id && id.length) {
      if (id in this.receivedIDs) return
      this.receivedIDs[id] = true
    }
    const packet = {
      id,
      name,
      origin: this.origin,
      timestamp: Date.now(),
      payload: message
    }
    this._transaction(() => {
      const data = localStorage.getItem(INDEX_EMIT) || '[]'
      const delimiter = (data === '[]') ? '' : ','
      localStorage.setItem(INDEX_EMIT, [
        data.substring(0, data.length - 1), delimiter, JSON.stringify(package), ']'
      ].join(''))
      this.trigger(name, message)
      setTimeout(() => this._cleanup_emit(), 50)
    })
  }

  emit (name, message, id) {
    this._emit(name, message, id === undefined ? this.origin : id)
    this._trigger('emit', name, message)
  }

  once (key, fn, ttl) {
    this._transaction(() => {
      const data = JSON.parse(localStorage.getItem(INDEX_ONCE) || '{}')
      if (this._once_expired(key, data)) return

      data[key] = {
        timestamp: Date.now()
      }
      if (typeof ttl === 'number') {
        data[key].ttl = ttl * 1000
      }

      localStorage.setItem(INDEX_ONCE, JSON.stringify(data))
      fn()
      setTimeout(this._cleanup_once(), 50)
    })
  }

  static destroy () {
    localStorage.removeItem(INDEX_LOCK)
    localStorage.removeItem(INDEX_EMIT)
    localStorage.removeItem(INDEX_ONCE)
  }

  static getInstance {
    return Intercom.instance || (Intercom.instance = new Intercom)
  }
}

export default new Intercom()
