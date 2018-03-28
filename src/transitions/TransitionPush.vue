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
    direction: PropTypes.oneOf(
      'left-to-right',
      'right-to-left',
      'top-to-bottom',
      'bottom-to-top'
    ).value('left-to-right'),
    duration: PropTypes.number.value(500)
  },
  computed: {
    startX() {
      switch (this.direction) {
        case 'left-to-right':
          return -100
        case 'right-to-left':
          return 100
        default:
          return 0
      }
    },
    startY() {
      switch (this.direction) {
        case 'top-to-bottom':
          return -100
        case 'bottom-to-top':
          return 100
        default:
          return 0
      }
    },
    endX() {
      return 0
    },
    endY() {
      return 0
    }
  },
  methods: {
    enter(el, done) {
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: [this.endX + '%', 'easeInSine', this.startX + '%'],
          translateY: [this.endY + '%', 'easeInSine', this.startY + '%']
        },
        { duration: this.duration, complete: done }
      )
    },
    leave(el, done) {
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: [-this.startX + '%', 'easeInSine', this.endX + '%'],
          translateY: [-this.startY + '%', 'easeInSine', this.endY + '%']
        },
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
