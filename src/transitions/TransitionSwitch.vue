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
    direction: PropTypes.oneOf('left', 'right').value('left'),
    duration: PropTypes.number.value(1000)
  },
  methods: {
    enter(el, done) {
      el.style.transformOrigin =
        this.direction === 'left' ? 'center left' : 'center right'
      Velocity(
        el,
        {
          rotateZ: ['45deg', 'easeInSine', '0deg'],
          translateY: ['50%', 'easeInSine', '0%'],
          translateX: ['10%', 'easeInSine', '0%']
        },
        {
          duration: this.duration / 2,
          complete() {
            el.style.zIndex = 1
          }
        }
      )
      Velocity(
        el,
        {
          rotateZ: ['0deg', 'easeInSine', '45deg'],
          translateY: ['0%', 'easeInSine', '50%'],
          translateX: ['0%', 'easeInSine', '10%']
        },
        {
          duration: this.duration / 2,
          complete: done
        }
      )
    },
    leave(el, done) {
      el.style.transformOrigin =
        this.direction === 'left' ? 'center left' : 'center right'
      el.style.zIndex = 1
      Velocity(
        el,
        {
          rotateZ: ['-45deg', 'easeInSine', '0deg'],
          translateY: ['-50%', 'easeInSine', '0%'],
          translateX: ['10%', 'easeInSine', '0%']
        },
        {
          duration: this.duration / 2,
          complete() {
            el.style.zIndex = 0
          }
        }
      )
      Velocity(
        el,
        {
          rotateZ: ['0deg', 'easeInSine', '-45deg'],
          translateY: ['0%', 'easeInSine', '-50%'],
          translateX: ['0%', 'easeInSine', '10%']
        },
        {
          duration: this.duration / 2,
          complete: done
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
