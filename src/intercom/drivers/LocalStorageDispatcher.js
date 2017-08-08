export default class LocalStorageDispatcher {
  constructor (manager, prefix = 'keynote') {
    this.manager = manager
    this.INDEX_EMIT = `${prefix}_emit`
    this.INDEX_LOCK = `${prefix}_lock`
    this.THRESHOLD_TTL_EMIT = 50000
    this.previousValues = {}
    this.lastMessage = Date.now()

    if (window.attachEvent) document.attachEvent('onstorage', event => this.handleStorageEvent(event))
    else window.addEventListener('storage', event => this.handleStorageEvent(event), false)
  }

  hasLocalStorageChanged (event, field) {
    if (event && event.key) return event.key === field
    const currentValue = localStorage.getItem(field)
    if (currentValue === this.previousValues[field]) return false

    this.previousValues[field] = currentValue

    return true
  }

  handleStorageEvent (event) {
    event = event || window.event

    if (this.hasLocalStorageChanged(event, this.INDEX_EMIT)) {
      this.transaction(() => {
        const now = Date.now()
        const messages = JSON.parse(localStorage.getItem(this.INDEX_EMIT) || '[]')
        messages.forEach(message => {
          if (message.origin === this.manager.origin) return
          if (message.timestamp < this.lastMessage) return
          this.manager.trigger(message.name, message.payload)
        })
        this.lastMessage = Date.now()
      })
    }

    this.manager.trigger('storage', event)
  }

  dispatch (payload) {
    this.transaction(() => {
      const data = localStorage.getItem(this.INDEX_EMIT) || '[]'
      const delimiter = (data === '[]') ? '' : ','
      localStorage.setItem(this.INDEX_EMIT, [
        data.substring(0, data.length - 1), delimiter, JSON.stringify(payload), ']'
      ].join(''))
      setTimeout(() => this.cleanup(), 50)
    })
  }

  cleanup () {
    this.transaction(() => {
      const now = Date.now()
      const threshold = now - this.THRESHOLD_TTL_EMIT
      const messages = JSON.parse(localStorage.getItem(this.INDEX_EMIT) || '[]')
      const newMessages = messages.filter(message => message.timestamp > threshold)

      if (messages.length !== newMessages.length) {
        localStorage.setItem(this.INDEX_EMIT, JSON.stringify(messages))
      }
    })
  }

  transaction (fn) {
    const TIMEOUT = 1000
    const WAIT = 20
    let executed = false
    let listening = false
    let waitTimer = null
    const unlock = () => {
      if (listening) this.manager.off('storage', lock)
      if (waitTimer) clearTimeout(waitTimer)
        localStorage.removeItem(this.INDEX_LOCK)
    }
    const lock = () => {
      if (executed) return
      const now = Date.now()
      const activeLock = parseInt(localStorage.getItem(this.INDEX_LOCK) || 0)
      if (activeLock && now - activeLock < TIMEOUT) {
        if (!listening) {
          this.manager.on('storage', lock)
          listening = true
        }

        waitTimer = setTimeout(lock, WAIT)
      }
      executed = true
      localStorage.setItem(this.INDEX_LOCK, now)

      fn()
      unlock()
    }

    lock()
  }
}
