import Slide from '../components/Slide.vue'
import { findEnterTransition, findLeaveTransition } from '../animator'

function snakeToCamel (s) {
  return s.replace(/(\-\w)/g, m => m[1].toUpperCase())
}

function index (el) {
  try {
    return Number(el.dataset.index)
  } catch (e) {
    return Number(el.getAttribute('data-index'))
  }
}

export function extract (slide) {
  const data = Object.assign({}, slide.data && slide.data.attrs, slide.componentOptions && slide.componentOptions.propsData)
  const result = {}

  Object.keys(data).forEach(key => {
    result[snakeToCamel(key)] = data[key]
  })

  return result
}

export default {
  name: 'Transitioner',

  props: {
    jump: {
      type: Boolean,
      default: false
    },

    index: {
      type: Number,
      required: true
    }
  },

  render (h) {
    const slides = this.$slots.default
    const current = slides[this.index]
    this.transitions[this.index] = extract(current)
    const vnode = h(Slide, {
      key: 'slide-' + this.index,
      props: { index: this.index }
    }, [current])

    return h(
      'transition',
      {
        on: {
          beforeEnter: this.beforeEnter,
          enter: this.enter,
          afterEnter: this.afterEnter,
          enterCancelled: this.enterCancelled,
          beforeLeave: this.beforeLeave,
          leave: this.leave,
          afterLeave: this.afterLeave,
          leaveCancelled: this.leaveCancelled
        },
        props: {
          css: false
        }
      },
      [vnode]
    )
  },

  methods: {
    beforeEnter (el) {
      if (this.jump) return

      const options = this.transitions[this.index]
      const transition = findEnterTransition(options)

      transition.beforeEnter && transition.beforeEnter(options, el)
    },
    enter (el, done) {
      if (this.jump) return done()

      const options = this.transitions[this.index]
      const transition = findEnterTransition(options)

      transition.enter ? transition.enter(options, el, done) : done()
    },
    afterEnter (el) {
      if (this.jump) return

      const options = this.transitions[this.index]
      const transition = findEnterTransition(options)

      transition.afterEnter && transition.afterEnter(options, el)
    },
    enterCancelled (el) {
      if (this.jump) return

      const options = this.transitions[this.index]
      const transition = findEnterTransition(options)

      transition.enterCancelled && transition.enterCancelled(options, el)
    },
    beforeLeave (el) {
      if (this.jump) return

      const options = this.transitions[this.index]
      const transition = findLeaveTransition(options)

      transition.beforeLeave && transition.beforeLeave(options, el)
    },
    leave (el, done) {
      if (this.jump) return done()

      const options = this.transitions[this.index]
      const transition = findLeaveTransition(options)

      transition.leave ? transition.leave(options, el, done) : done()
    },
    afterLeave (el) {
      if (this.jump) return

      const options = this.transitions[this.index]
      const transition = findLeaveTransition(options)

      transition.afterLeave && transition.afterLeave(options, el)
    },
    leaveCancelled (el) {
      if (this.jump) return

      const options = this.transitions[this.index]
      const transition = findLeaveTransition(options)

      transition.leaveCancelled && transition.leaveCancelled(options, el)
    },
  },

  created () {
    this.transitions = {}
  }
}
