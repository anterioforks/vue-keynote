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
    direction: PropTypes.oneOf(
      'left-to-right',
      'right-to-left',
      'top-to-bottom',
      'bottom-to-top'
    ).value('left-to-right'),
    duration: PropTypes.number.value(3500)
  },
  computed: {
    startX() {
      switch (this.direction) {
        case 'top-to-bottom':
          return -180
        case 'bottom-to-top':
          return 180
        default:
          return 0
      }
    },
    endX() {
      return 0
    },
    startY() {
      switch (this.direction) {
        case 'left-to-right':
          return -180
        case 'right-to-left':
          return 180
        default:
          return 0
      }
    },
    endY() {
      return 0
    },
    spring() {
      return this.bounce ? [0.67, -0.87, 0.29, 1.6] : [250, 25]
    }
  },
  methods: {
    enter(el, done) {
      Velocity(
        el,
        {
          rotateX: [this.endX + 'deg', this.spring, this.startX + 'deg'],
          rotateY: [this.endY + 'deg', this.spring, this.startY + 'deg']
        },
        {
          duration: this.duration,
          complete: () => {
            this.$emit('entered', this)
            done()
          }
        }
      )
    },
    leave(el, done) {
      Velocity(
        el,
        {
          rotateX: [-this.startX + 'deg', this.spring, this.endX + 'deg'],
          rotateY: [-this.startY + 'deg', this.spring, this.endY + 'deg']
        },
        {
          duration: this.duration,
          complete: () => {
            this.$emit('exited', this)
            done()
          }
        }
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
