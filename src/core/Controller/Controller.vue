<template>
<Touch
  @swipeleft="goNext"
  @swiperight="goPrev"
  @tap="stepNext"
  @press="stepPrev"
  @doubletap="fullscreen(!isFullscreen)"
>
  <div class="controller"
    @keyup.down="goNext"

    @keyup.space="stepNext"
    @keyup.right="stepNext"
    @click.left="stepNext"

    @keyup.up="goPrev"
    
    @keyup.left="stepPrev"

    @keyup.esc="fullscreen(false)"
    @keyup.70="fullscreen(!isFullscreen)"

    @blur="onBlur"
    @focus="onFocus"
    @keypress="onKeypress"

    tabindex="0" autofocus>
    <slot/>
  </div>
</Touch>
</template>

<script>
import Touch from './Touch'
import { throttle } from '../../utils'

function on(element, event, fn, mode) {
  element.addEventListener(event, fn, mode)

  return () => element.removeEventListener(event, fn)
}

export default {
  name: 'Controller',

  abstract: process.env.NODE_ENV === 'production',

  data: () => ({
    indexKey: -1,
    isFullscreen: false
  }),

  methods: {
    onFullscreenChange() {
      console.log('ON >>>FULLSCREEN')
      if (document.fullscreenElement) {
        this.isFullscreen = true
      } else {
        this.isFullscreen = false
      }
    },

    fullscreen(go) {
      const element = this.$el
      const requestMethod = go
        ? element.requestFullscreen ||
          element.webkitRequestFullscreen ||
          element.webkitRequestFullScreen ||
          element.mozRequestFullScreen ||
          element.msRequestFullscreen
        : element.exitFullscreen ||
          element.webkitExitFullscreen ||
          element.webkitExitFullScreen ||
          element.mozExitFullScreen ||
          element.msExitFullscreen

      requestMethod && requestMethod.call(element)
    },

    goNext() {
      this.next()
    },

    goPrev() {
      this.previous()
    },

    stepNext() {
      this.step(1)
    },

    stepPrev() {
      this.step(-1)
    },

    onBlur() {
      console.log('Keyboard controls inactive.')
    },

    onFocus() {
      console.log('Keyboard controls active.')
    },

    onKeypress(e) {
      if (!/^digit/i.test(e.code)) return true

      if (this.indexKey < 0) this.indexKey = Number(e.key)
      else this.indexKey = this.indexKey * 10 + Number(e.key)

      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.go(), 400)
    },

    go() {
      if (this.indexKey > -1) {
        this.goto(this.indexKey)
        this.indexKey = -1
      }
    },

    next: throttle(function() {
      this.$emit('next')
    }),

    previous: throttle(function() {
      this.$emit('previous')
    }),

    step: throttle(function(step) {
      this.$emit('step', step)
    }),

    goto: throttle(function(index) {
      this.$emit('goto', index)
    })
  },

  beforeDestroy() {
    this.removeFullscreenEventListener()
  },

  mounted() {
    this.removeFullscreenEventListener = on(
      document,
      'fullscreenchange',
      this.onFullscreenChange
    )
    this.$nextTick(() => this.$el.focus())
  },

  components: { Touch }
}
</script>

<style>
.controller {
  overflow: hidden;
  outline: none;
}

.controller,
.controller:fullscreen {
  width: 100%;
  height: 100%;
}
</style>
