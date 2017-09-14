

<script>
import { mapGetters } from 'vuex'
import Canvas from './Canvas.vue'
import Controller from './Controller.vue'
import Dashboard from '../components/PresenterDashboard.vue'

export default {
  computed: mapGetters(['total', 'index', 'lastIndex', 'isFirstSlide', 'isLastSlide', 'presenter']),
  render (h) {
    const props = {
      view: '16by9',
      index: this.index,
      lastIndex: this.lastIndex,
      isFirstSlide: this.isFirstSlide,
      isLastSlide: this.isLastSlide
    }

    const nextProps = {
      view: '16by9',
      index: this.index + 1,
      lastIndex: this.index,
      isFirstSlide: false,
      isLastSlide: this.index + 1 === this.total
    }

    const slots = {
        notes: [this.presenter.notes[this.index]],
        current: [
          h(Controller, {}, [
            h(Canvas, { props }, this.$slots.default)
          ])
        ],
        currentMessage: [h('div', { class: 'vue-keynote-slide-number' }, `Slide ${props.index} of ${this.total}`)],
        next: [
          h(Controller, {}, [
            h(Canvas, { props: nextProps }, this.$slots.default),
          ])
        ],
        nextMessage: [h('div', { class: 'vue-keynote-slide-number' }, `Slide ${nextProps.index} of ${this.total}`)],
        navigator: this.$slots.default.map(
          v => h('div', { class: 'vue-keynote-navigator-preview' }, [v])
        )
    }

    return h(Dashboard, {}, Object.keys(slots).map(
      slot => h('template', { slot }, slots[slot])
    ))
  }
}
</script>

<style lang="scss">
@import '../style.scss';

.vue-keynote-navigator-preview {
  @include aspect-ratio(16, 9);
  position: relative;
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.vue-keynote-slide-number {
  text-align: center;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  padding: 5px;
}
</style>

