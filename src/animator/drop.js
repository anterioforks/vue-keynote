import v from 'velocity-animate'

function getEnterDuration ({ duration, enterDuration }) {
  return typeof (enterDuration) !== 'undefined' ? Number(enterDuration) : (
    typeof (duration) !== 'undefined' ? Number(duration) :
    1000
  )
}

const drop = {
  beforeEnter (options, el) {
    v(el, { translateY: '-100%' }, { duration: 0 })
  },
  enter (options, el, done) {
    const duration = getEnterDuration(options) / 3

    v(el, { translateY: '0%' }, { duration: duration, easing: 'ease-in' })
    v(el, { translateY: '-60%' }, { duration: duration * .6, easing: 'ease-out' })
    // v(el, { translateY: '0%' }, { duration: duration * .6, easing: 'ease-in' })
    // v(el, { translateY: '-36%' }, { duration: duration * .36, easing: 'ease-out' })
    // v(el, { translateY: '0%' }, { duration: duration * .36, easing: 'ease-in' })
    // v(el, { translateY: '-21.6%' }, { duration: duration * .216, easing: 'ease-out' })
    // v(el, { translateY: '0%' }, { duration: duration * .216, easing: 'ease-in' })
    // v(el, { translateY: '-12.96%' }, { duration: duration * .1296, easing: 'ease-out' })
    v(el, { translateY: '0%' }, { duration: duration * .1296, easing: 'ease-in', complete: done })
  },
  leave (options, el, done) {
    v(el, { translateY: '0%' }, { duration: getEnterDuration(options), complete: done })
  }
}

export default function () {
  return drop
}
