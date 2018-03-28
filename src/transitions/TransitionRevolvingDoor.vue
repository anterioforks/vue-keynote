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
    direction: PropTypes.oneOf('left-to-right', 'right-to-left').value(
      'right-to-left'
    ),
    duration: PropTypes.number.value(1000)
  },
  computed: {
    origin() {
      return this.direction === 'left-to-right' ? 'center right' : 'center left'
    },
    easing() {
      return this.bounce ? [0.38, -0.99, 0.58, -0.15] : 'easeOutSine'
    },
    from() {
      return this.direction === 'left-to-right' ? -90 : 90
    }
  },
  methods: {
    enter(el, done) {
      const transformOrigin = el.style.transformOrigin
      el.style.transformOrigin = this.origin
      Velocity(
        el,
        { rotateY: ['0deg', this.easing, this.from + 'deg'] },
        {
          duration: this.duration,
          complete: () => {
            el.style.transformOrigin = transformOrigin
            done()
          }
        }
      )
    },
    leave(el, done) {
      el.style.transformOrigin = this.origin
      el.style.zIndex = 1
      Velocity(
        el,
        { rotateY: [-this.from + 'deg', this.easing, '0deg'] },
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
