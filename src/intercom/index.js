import uuid from 'uuid/v4'

import EventEmitter from './EventEmitter'
import LocalStorageDispatcher from './drivers/LocalStorageDispatcher'

export class Intercom extends EventEmitter {
  constructor (enabled = ['storage']) {
    super()
    this.origin = uuid()
    this.drivers = [new LocalStorageDispatcher(this)]
  }

  emit (name, payload, toOthers = true) {
    const packet = {
      id: uuid(),
      name,
      timestamp: Date.now(),
      origin: this.origin,
      payload
    }

    this.drivers.forEach(driver => driver.dispatch(packet))
    !toOthers && this.trigger(name, payload)
    console.log('DISPATCH', packet)
    this.trigger('emit', name, payload)
  }
}

export default new Intercom()
