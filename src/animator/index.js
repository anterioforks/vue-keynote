import push from './push'
import reveal from './reveal'
import drop from './drop'

const transitions = { push, reveal, drop }

function call (fn, ...args) {
  return typeof (fn) === 'function' ? fn(...args) || {} : {}
}

export function findEnterTransition (options) {
  const { name, enter } = options

  return call(transitions[enter || name || 'push'], options)
}

export function findLeaveTransition (options) {
  const { name, leave } = options

  return call(transitions[leave || name || 'push'], options)
}
