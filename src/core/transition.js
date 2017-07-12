import Velocity from 'velocity-animate'
import Slide from '../components/Slide.vue'

function snakeToCamel (s) {
  return s.replace(/(\-\w)/g, m => m[1].toUpperCase())
}

export function extract (slide) {
  const data = Object.assign({}, slide.data && slide.data.attrs, slide.componentOptions && slide.componentOptions.propsData)
  const result = {}

  Object.keys(data).forEach(key => {
    result[snakeToCamel(key)] = data[key]
  })

  return result
}

export function filterSlides (slides) {
  if (!Array.isArray(slides)) return []

  return slides.filter(slide => slide.tag)
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
    const transition = extract(current)
    const vnode = h(Slide, { key: 'slide-' + current.data.attrs['data-index'] }, [current])

    return h(
      'transition',
      {
        on: {
          beforeEnter: (...args) => this.beforeEnter(transition, ...args),
          enter: (...args) => this.enter(transition, ...args),
          afterEnter: (...args) => this.afterEnter(transition, ...args),
          enterCancelled: (...args) => this.enterCancelled(transition, ...args),
          beforeLeave: (...args) => this.beforeLeave(transition, ...args),
          leave: (...args) => this.leave(transition, ...args),
          afterLeave: (...args) => this.afterLeave(transition, ...args),
          leaveCancelled: (...args) => this.leaveCancelle(transition, ...args)
        },
        props: {
          css: false
        }
      },
      [vnode]
    )
  },

  methods: {
    beforeEnter (transition, el) {
      if (this.jump) return

      Velocity(el, { translateX: '100%' }, { duration: 0 })
    },
    enter (transition, el, done) {
      if (this.jump) return done()

      Velocity(el, { translateX: 0 }, { duration: 600, complete: done })
    },
    afterEnter (transition, el) {
    },
    enterCancelled (transition, el) {
    },
    beforeLeave (transition, el) {
    },
    leave (transition, el, done) {
      if (this.jump) return done()

      Velocity(el, { translateX: '-100%' }, { duration: 600, complete: done })
    },
    afterLeave (transition, el) {
    },
    leaveCancelled (transition, el) {
    }
  }
}
