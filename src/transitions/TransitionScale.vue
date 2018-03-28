<template>
  <transition :css="false" v-bind="$attrs" v-on="$listeners"
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

export default {
  abstract: true,
  props: {
    bounce: PropTypes.bool.value(true),
    direction: PropTypes.oneOf('up', 'down', 'in', 'out').value('up'),
    duration: PropTypes.number.value(1500)
  },
  computed: {
    easing() {
      return this.bounce ? [0.28, -0.39, 0.58, -0.15] : 'easeOutSine'
    }
  },
  methods: {
    enter(el, done) {
      if (this.direction === 'up' || this.direction === 'in') {
        Velocity(
          el,
          { opacity: [1, 0] },
          { duration: this.duration * 0.5, queue: false }
        )
        Velocity(
          el,
          {
            scale: [
              1,
              [0.42, 0.56, 0.58, 1.43],
              this.direction === 'up' ? 0.25 : 2
            ]
          },
          { duration: this.duration, complete: done }
        )
      }
    },
    leave(el, done) {
      if (this.direction === 'up' || this.direction === 'in') {
        el.style.zIndex = 1
        Velocity(
          el,
          { opacity: [0, 1] },
          { duration: this.duration * 0.5, complete: done }
        )
      } else {
        el.style.zIndex = 1
        Velocity(
          el,
          { scale: [this.direction === 'down' ? 0 : 2, this.easing, 1] },
          { duration: this.duration, queue: false }
        )
        Velocity(
          el,
          { opacity: [0, 1] },
          {
            delay: 0.5 * this.duration,
            duration: 0.5 * this.duration,
            complete: done
          }
        )
      }
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
