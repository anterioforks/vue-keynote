import v from 'velocity-animate'

function getEnterDuration ({ duration, enterDuration }) {
  return typeof (enterDuration) !== 'undefined' ? Number(enterDuration) : (
    typeof (duration) !== 'undefined' ? Number(duration) :
    400
  )
}

function getLeaveDuration ({ duration, leaveDuration }) {
  return typeof (leaveDuration) !== 'undefined' ? Number(leaveDuration) : (
    typeof (duration) !== 'undefined' ? Number(duration) :
    400
  )
}

export const left = {
  beforeEnter (options, el) {
    v(el, { translateX: '100%' }, { duration: 0 })
  },
  enter (options, el, done) {
    v(el, { translateX: '0%' }, { duration: getEnterDuration(options), complete: done })
  },
  leave (options, el, done) {
    v(el, { translateX: '-100%' }, { duration: getLeaveDuration(options), complete: done })
  }
}

export const right = {
  beforeEnter (options, el) {
    v(el, { translateX: '-100%' }, { duration: 0 })
  },
  enter (options, el, done) {
    v(el, { translateX: '0%' }, { duration: getEnterDuration(options), complete: done })
  },
  leave (options, el, done) {
    v(el, { translateX: '100%' }, { duration: getLeaveDuration(options), complete: done })
  }
}

export const top = {
  beforeEnter (options, el) {
    v(el, { translateY: '-100%' }, { duration: 0 })
  },
  enter (options, el, done) {
    v(el, { translateY: '0%' }, { duration: getEnterDuration(options), complete: done })
  },
  leave (options, el, done) {
    v(el, { translateY: '100%' }, { duration: getLeaveDuration(options), complete: done })
  }
}

export const bottom = {
  beforeEnter (options, el) {
    v(el, { translateY: '100%' }, { duration: 0 })
  },
  enter (options, el, done) {
    v(el, { translateY: '0%' }, { duration: getEnterDuration(options), complete: done })
  },
  leave (options, el, done) {
    v(el, { translateY: '-100%' }, { duration: getLeaveDuration(options), complete: done })
  }
}

export default function (options) {
  switch (options.direction) {
    case 'right': return right
    case 'top': return top
    case 'bottom': return bottom
    default: return left
  }
}
