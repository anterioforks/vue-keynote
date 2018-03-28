<template>
  <transition :css="false" v-bind="$attrs" v-on="$listeners"
    @leave="leave"
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
    duration: PropTypes.number.value(5000)
  },
  methods: {
    leave(el, done) {
      el.style.zIndex = 1
      el.style.transformStyle = 'preserve-3d'
      el.style.transformOrigin = 'bottom center'
      Velocity(
        el,
        {
          rotateX: ['-90deg', 'easeInSine', '0deg']
        },
        {
          duration: this.duration,
          complete: done
        }
      )
    },
    leaveCancelled(el) {
      Velocity(el, 'finish')
    }
  }
}
</script>
