

<script>
import { mapGetters } from 'vuex'
import Canvas from './Canvas.vue'
import Controller from './Controller.vue'

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

    return h('div', { class: this.$style.presenter }, [
      h('div', { class: this.$style.top }, [
        h('div', { class: this.$style.main }, [
          h('div', { class: this.$style.current }, [
            h(Controller, {}, [
              h(Canvas, { props }, this.$slots.default)
            ])
          ]),
        ]),
        h('div', { class: this.$style.right }, [
          h('div', { class: this.$style.next }, [
            h(Canvas, { props: nextProps }, this.$slots.default)
          ]),
          h('div', { class: this.$style.description }, [
            this.index + 1 >= this.total ? 'Fin.' : 'Next Slide'
          ])
        ])
      ]),
      h('div', { class: this.$style.bottom }, [
        h('h1', this.presenter.notes[this.index])
      ])
    ])
  }
}
</script>

<style lang="scss" module>
.presenter {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.top {
  flex: 3;
  display: flex;
  flex-basis: row;
  padding: 5px;

  > * {
    margin: 5px;
  }
  .main {
    flex: 5;
  }

  .right {
    flex: 4;
    display: flex;
    flex-direction: column;

    .description {
      flex: 1;
      font-size: 14px
    }
  }

  .current {
    overflow: hidden;
    font-size: .8em
  }

  .next {
    overflow: hidden;
    font-size: .2em
  }
}

.bottom {
  flex: 1
}
</style>

