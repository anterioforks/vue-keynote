<script>
import BrokenSlide from '../components/BrokenSlide.vue'
import EndSlide from '../components/EndSlide.vue'
import StartSlide from '../components/StartSlide.vue'
import transition, { filterSlides } from './transition'

const FORWARD = 1
const BACKWARD = 2

let id = 0

export default {
  name: 'Presenter',

  data: () => ({
    _index: -1,
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
      class: 'vue-keynote-container vue-keynote-presenter'
    }, any)

    // --> Populate config on first render.
    if (this.isInitialRender) {
      this.init()

      return
    }

    if (this.index === -1) {
      return render(h(StartSlide))
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
    const last = slides[this.lastIndex]

    return render(h(transition, { props: { jump: this.lastIndex >= this.index, index: this.index } }, slides))
  },

  created () {
    this.$on('next', this.onNext)
    this.$on('prev', this.onPrev)
    this.$on('step', this.onStep)
    this.$on('end', this.onEnd)
    this.$on('home', this.onHome)
    this.$on('fullscreen', this.onFullscreen)
    this.$on('pause', this.onPause)
    this.$on('go', this.onGo)
  },

  methods: {
    onNext () {
      this.direction = FORWARD
      this.index = this.index + 1
    },
    onPrev () {
      this.direction = BACKWARD
      this.index = this.index - 1
    },
    onStep (delta) {
      if (delta > 0) this.onNext()
      else if (delta < 0) this.onPrev()
    },
    onEnd () {
      this.index = this.total
    },
    onHome () {
      this.index = -1
    },
    onPause () {
      // TODO: In next version.
    },
    onGo (index) {
      this.index = index
    },
    init () {
      console.debug('Initializing presenter.')
      const slides = filterSlides(this.$slots.default || [])
      this.$data._total = slides.length
      this.$data._initialRender = false
      slides.forEach(slide => {
        if (!slide.data) slide.data = {}
        if (!slide.data.attrs) slide.data.attrs = {}
        slide.data.attrs['data-index'] = id++
      })
    }
  }
}
</script>

<style>
.vue-keynote-presenter {
  position: relative;
}
</style>
