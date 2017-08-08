<script>
import { mapActions, mapGetters } from 'vuex'
import Controller from './Controller.vue'
import Presenter from './Presenter.vue'
import Canvas from './Canvas.vue'

function filterSlides (slides) {
  if (!Array.isArray(slides)) return []

  return slides.filter(slide => slide.tag)
}

export default {
  name: 'Keynote',

  computed: {
    id () {
      return this._uid
    },
    ...mapGetters(['isInitialized', 'isPresenterViewEnabled', 'index', 'lastIndex', 'isFirstSlide', 'isLastSlide'])
  },

  render (h) {
    const slides = filterSlides(this.$slots.default)
    const isPresenterViewEnabled = this.isPresenterViewEnabled
    if (!this.isInitialized) {
      this.init({
        notes: slides.map(slide => (slide.data.attrs && slide.data.attrs.notes) || ''),
        total: slides.length + 1,
        steps: [1].concat(slides.map(slide => 1)).concat([1])
      })

      return // empty render.
    }

    if (isPresenterViewEnabled) return h(Presenter, {}, slides)

    return h(Controller, {}, [h(Canvas, { props: {
          index: this.index,
          lastIndex: this.lastIndex,
          isFirstSlide: this.isFirstSlide,
          isLastSlide: this.isLastSlide
        } }, slides)])
  },

  methods: mapActions(['init'])
}
</script>

<style>
html, body {
  margin: 0 !important;
  padding: 0 !important;
}

html, body, .vue-keynote-container {
  width: 100%;
  height: 100%;
}
</style>

