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
    duration: PropTypes.number.value(1000)
  },
  methods: {
    enter(el, done) {
      Velocity(
        el,
        { opacity: [1, 'easeInSine', 0] },
        { duration: this.duration, complete: done }
      )
    },
    leave(el, done) {
      Velocity(
        el,
        { opacity: [0, 'easeInSine', 1] },
        { duration: this.duration, complete: done }
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
