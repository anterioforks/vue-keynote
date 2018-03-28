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
    direction: PropTypes.oneOf(
      'left-to-right',
      'right-to-left',
      'top-to-bottom',
      'bottom-to-top',
      'top-left-to-bottom-right',
      'top-right-to-bottom-left',
      'bottom-left-to-top-right',
      'bottom-right-to-top-left'
    ).value('left-to-right'),
    duration: PropTypes.number.value(500)
  },
  computed: {
    startX() {
      switch (this.direction) {
        case 'left-to-right':
        case 'top-left-to-bottom-right':
        case 'bottom-left-to-top-right':
          return -100
        case 'right-to-left':
        case 'top-right-to-bottom-left':
        case 'bottom-right-to-top-left':
          return 100
        default:
          return 0
      }
    },
    startY() {
      switch (this.direction) {
        case 'top-to-bottom':
        case 'top-right-to-bottom-left':
        case 'top-left-to-bottom-right':
          return -100
        case 'bottom-to-top':
        case 'bottom-left-to-top-right':
        case 'bottom-right-to-top-left':
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
    leave(el, done) {
      el.style.zIndex = 1
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
    leaveCancelled(el) {
      Velocity(el, 'finish')
    }
  }
}
</script>
