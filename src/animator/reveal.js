import v from 'velocity-animate'

function getEnterDuration ({ duration, enterDuration }) {
  return typeof (enterDuration) !== 'undefined' ? Number(enterDuration) : (
    typeof (duration) !== 'undefined' ? Number(duration) :
    600
  )
}

function getLeaveDuration ({ duration, leaveDuration }) {
  return typeof (leaveDuration) !== 'undefined' ? Number(leaveDuration) : (
    typeof (duration) !== 'undefined' ? Number(duration) :
    600
  )
}

const common = {
  beforeEnter (options, el) {
    v(el, { zIndex: 1 }, { duration: 0 })
  },
  afterEnter (options, el) {
    v(el, { zIndex: undefined }, { duration: 0 })
  },
  beforeLeave (options, el) {
    v(el, { zIndex: 2 }, { duration: 0 })
  },
  afterLeave (options, el) {
    v(el, { zIndex: undefined }, { duration: 0 })
  }
}

export const left = {
  leave (options, el, done) {
    v(el, { translateX: '-100%' }, { duration: getLeaveDuration(options), easing: 'ease-in', complete: done })
  }, ...common
}

export const right = {
  leave (options, el, done) {
    v(el, { translateX: '100%' }, { duration: getLeaveDuration(options), complete: done })
  }, ...common
}

export const top = {
  leave (options, el, done) {
    v(el, { translateY: '100%' }, { duration: getLeaveDuration(options), complete: done })
  }, ...common
}

export const bottom = {
  leave (options, el, done) {
    v(el, { translateY: '-100%' }, { duration: getLeaveDuration(options), complete: done })
  }, ...common
}

export default function (options) {
  switch (options.direction) {
    case 'right': return right
    case 'top': return top
    case 'bottom': return bottom
    default: return left
  }
}
