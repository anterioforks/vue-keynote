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
    direction: PropTypes.oneOf('from-left', 'from-right').value('from-right'),
    duration: PropTypes.number.value(1000)
  },
  computed: {
    unit() {
      return this.direction === 'from-right' ? 80 : -80
    }
  },
  methods: {
    enter(el, done) {
      Velocity(
        el,
        {
          translateZ: [0, 'easeOutSine', '-400vw'],
          scale: [1, 'easeInSine', 0.25]
        },
        { duration: this.duration, queue: false }
      )
      Velocity(
        el,
        { translateX: [this.unit + '%', 'easeOutSine', '0%'] },
        { duration: this.duration * 0.5 }
      )
      Velocity(
        el,
        { translateX: ['0%', 'easeOutSine', this.unit + '%'] },
        { duration: this.duration * 0.5, complete: done }
      )
    },
    leave(el, done) {
      el.style.zIndex = 1
      Velocity(
        el,
        {
          translateZ: ['-400vw', 'easeOutSine', 0],
          scale: [0.25, 'easeInSine', 1]
        },
        { duration: this.duration, queue: false }
      )
      Velocity(
        el,
        { translateX: [-this.unit + '%', 'easeOutSine', '0%'] },
        {
          duration: this.duration * 0.5,
          complete: () => {
            el.style.zIndex = 0
          }
        }
      )
      Velocity(
        el,
        { translateX: ['0%', 'easeOutSine', -this.unit + '%'] },
        { duration: this.duration * 0.5, complete: done }
      )
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
