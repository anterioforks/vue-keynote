<script>
import BrokenSlide from '../components/BrokenSlide.vue'
import EndSlide from '../components/EndSlide.vue'
import StartSlide from '../components/StartSlide.vue'
import Transitioner from './transitioner'

const FORWARD = 1
const BACKWARD = 2

let id = 0

export default {
  name: 'Canvas',

  props: {
    view: {
      type: String,
      default: 'full'
    },
    transitions: {
      type: Boolean,
      default: true
    },
    lastIndex: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isLastSlide: {
      type: Boolean,
      required: true
    },
    isFirstSlide: {
      type: Boolean,
      default: true
    }
  },

  render (h) {
    const render = (...any) => h('div', {
      class: [this.$style.canvas, this.$style['view-' + this.view]]
    }, any)

    const isLastSlide = this.isLastSlide
    const isFirstSlide = this.isFirstSlide
    if (isFirstSlide) {
      return render(h(StartSlide))
    }

    // --> Reached end of presentation.
    if (isLastSlide) {
      return render(h(EndSlide))
    }

    // --> Find current view.
    const index = this.index - 1
    const slides = this.$slots.default
    const current = slides[index]
    if (!current) {
      return render(h(BrokenSlide))
    }

    if (!this.transitions) {
      return render(current)
    }

    return render(h(
      Transitioner,
      {
        props: {
          jump: this.lastIndex >= this.index,
          index: index
        }
      },
      slides
    ))
  }
}
</script>

<style lang="scss" module>
@mixin aspect-ratio($width, $height) {
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: ($height / $width) * 100%;
  }
  > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.canvas {
  position: relative;

  &.view-16by9 {
    @include aspect-ratio(16, 9);
  }

  &.view-4by3 {
    @include aspect-ratio(4, 3);
  }

  &.view-1by1 {
    @include aspect-ratio(1, 1);
  }

  &.view-full {
    width: 100%;
    height: 100%;
  }
}
</style>
