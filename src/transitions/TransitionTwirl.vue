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
    direction: PropTypes.oneOf('clockwise', 'counterclockwise').value(
      'clockwise'
    ),
    duration: PropTypes.number.value(1000)
  },
  computed: {
    unit() {
      return (
        (this.direction === 'clockwise' ? 360 : -360) * (this.duration / 1000)
      )
    }
  },
  methods: {
    enter(el, done) {
      Velocity(el, { scale: 0 }, { duration: 0 })
      Velocity(
        el,
        {
          scale: [1, 'easeOutSine', 0.1],
          rotateZ: [this.unit + 'deg', 'easeOutSine', '0deg']
        },
        {
          duration: this.duration / 2,
          delay: this.duration / 2,
          complete: done
        }
      )
    },
    leave(el, done) {
      el.style.zIndex = 1
      Velocity(
        el,
        {
          scale: [0.1, 'easeOutSine', 1],
          rotateZ: ['0deg', 'easeInSine', -this.unit + 'deg']
        },
        { duration: this.duration / 2, complete: done }
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
