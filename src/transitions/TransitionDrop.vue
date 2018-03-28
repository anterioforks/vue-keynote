<template>
  <transition :css="false" v-bind="$attrs" v-on="$listeners"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    @enter-cancelled="enterCancelled"
    @leave-cancelled="leaveCancelled"
    
  >
    <slot />
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'
import PropTypes from '@znck/prop-types'

Velocity.Easings.easeOutBounce = t => {
  const a = 7.5625
  let t1
  let offset = 0

  if (t < 4 / 11) t1 = t
  else if (t < 8 / 11) {
    t1 = t - 6 / 11
    offset = 0.75
  } else if (t < 10 / 11) {
    t1 = t - 9 / 11
    offset = 0.9375
  } else {
    t1 = t - 10.5 / 11
    offset = 0.984375
  }

  return a * t1 * t1 + offset
}

export default {
  abstract: true,
  props: {
    duration: PropTypes.number.value(1000)
  },
  methods: {
    beforeEnter() {},
    enter(el, done) {
      Velocity(
        el,
        { translateY: ['0%', 'easeOutBounce', '-100%'], translateZ: [0, 0] },
        { duration: this.duration, complete: done }
      )
    },
    leave(el, done) {
      done()
    },
    enterCancelled(el) {
      Velocity(el, 'finish')
    },
    leaveCancelled(el) {
      Velocity(el, 'finish')
    }
  }
}
</script>
