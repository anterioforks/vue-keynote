<script>
import BrokenSlide from '../components/BrokenSlide.vue'
import EndSlide from '../components/EndSlide.vue'
import transition, { filterSlides } from './transition'

const FORWARD = 1
const BACKWARD = 2

export default {
  name: 'Presenter',

  data: () => ({
    _index: 0,
    _lastIndex: -1,
    _total: null,
    _endOfPresentation: false,
    direction: FORWARD,
    _initialRender: true
  }),

  computed: {
    isInitialRender () {
      return this.$data._initialRender
    },

    index: {
      get () {
        return this.$data._index
      },

      set (index) {
        index = Math.min(this.total, Math.max(0, index))

        this.$data._lastIndex = this.$data._index
        this.$data._index = index
        this.$data._endOfPresentation = index >= this.total
      }
    },

    lastIndex () {
      return this.$data._lastIndex
    },

    total () {
      return this.$data._total
    },

    endOfPresentation () {
      return this.$data._endOfPresentation
    }
  },

  render (h) {
    const render = (...any) => h('div', {
      class: [this.$style.presenter]
    }, any)

    // --> Populate config on first render.
    if (this.isInitialRender) {
      this.init()
    }

    // --> Reached end of presentation.
    if (this.endOfPresentation) {
      return render(h(EndSlide))
    }

    const slides = filterSlides(this.$slots.default)

    // --> Find current view.
    const current = slides[this.index]
    if (!current) {
      return render(h(BrokenSlide))
    }

    return render(transition(h, current))
  },

  created () {
    this.$on('next', this.onNext)
    this.$on('prev', this.onPrev)
    this.$on('step', this.onStep)
    this.$on('end', this.onEnd)
    this.$on('home', this.onHome)
    this.$on('fullscreen', this.onFullscreen)
    this.$on('pause', this.onPause)
  },

  methods: {
    onNext () {
      this.index = this.index + 1
      this.direction = FORWARD
    },
    onPrev () {
      this.index = this.index - 1
      this.direction = BACKWARD
    },
    onStep (delta) {
      if (delta > 0) this.onNext()
      else if (delta < 0) this.onPrev()
    },
    onEnd () {
      this.index = this.total
    },
    onHome () {
      this.index = 0
    },
    onPause () {
      // TODO: In next version.
    },
    init () {
      this.$data._total = Array.isArray(this.$slots.default) ? filterSlides(this.$slots.default).length : (this.$slots.default ? 1 : 0)
      this.$data._initialRender = false
    }
  }
}
</script>

<style src="vue-animate/dist/vue-animate.min.css"/>

<style module>
.presenter {
  width: 100%;
  height: 100%;
}
</style>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

