<template>
  <transition :css="false" v-bind="$attrs" v-on="$listeners"
    @enter="enter"
    @leave="leave"
    @enter-cancelled="enterCancelled"
    @leave-cancelled="enterCancelled"
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
      'from-top-left',
      'from-top-right',
      'from-bottom-left',
      'from-bottom-right'
    ).value('from-top-left'),
    duration: PropTypes.number.value(1000)
  },
  computed: {
    pivot() {
      return this.direction.replace(/from-/, '').replace('-', ' ')
    },
    from() {
      switch (this.direction) {
        case 'from-top-left':
        case 'from-bottom-right':
          return -90
        case 'from-top-right':
        case 'from-bottom-left':
          return 90
      }
    }
  },
  methods: {
    leave(el, done) {
      Velocity(
        el,
        { translateZ: 0 },
        { duration: this.duration, complete: done }
      )
    },
    enter(el, done) {
      el.style.transformOrigin = this.pivot
      Velocity(
        el,
        { rotateZ: ['0deg', 'easeOutSine', this.from + 'deg'] },
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
