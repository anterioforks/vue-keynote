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

export default {
  abstract: true,
  props: {
    direction: PropTypes.oneOf('left-to-right', 'right-to-left').value(
      'right-to-left'
    ),
    duration: PropTypes.number.value(500)
  },
  computed: {
    inverse() {
      return this.direction !== 'right-to-left'
    }
  },
  methods: {
    beforeEnter(el) {
      Velocity(
        el,
        {
          translateX: this.inverse ? '-130%' : '130%',
          rotateZ: this.inverse ? '35deg' : '-35deg'
        },
        { duration: 0 }
      )
    },
    enter(el, done) {
      Velocity(el, { translateZ: 0 }, { duration: this.duration * 0.2 })
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: ['0%', [250, 30]],
          rotateZ: ['0deg', [500, 60]]
        },
        { duration: this.duration * 0.8, complete: done }
      )
    },
    leave(el, done) {
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: this.inverse ? '120%' : '-120%',
          rotateZ: this.inverse ? '35deg' : '-35deg'
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
