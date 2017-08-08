<template>
<div :class="$style.controller"
     @keyup.up="goNext"
     @keyup.right="goNext"
     @keyup.75="goNext"
     @keyup.68="goNext"

     @keyup.down="goPrev"
     @keyup.left="goPrev"
     @keyup.74="goPrev"
     @keyup.65="goPrev"

     @keyup.80="togglePresenterView"

     @keyup.70="enterFullscreen"

     @keypress="onKeypress"

     @keyup.esc="exitFullscreen"

     @keyup.space="stepNext"
     @click.left="stepNext"

     @click.right.prevent="stepPrev"
     @contextmenu.prevent="stepPrev"

     @blur="onBlur"
     @focus="onFocus"

     tabindex="0" autofocus>
  <Touch :class="$style.touch"

         @pinchout="enterFullscreen"
         @pinchin="exitFullscreen"

         @swipeleft="goNext"
         @swiperight="goPrev"

         :recognizeWith="{
            swipe: ['pinch'],
            pinch: ['swipe']
          }">
        <slot/>
  </Touch>
</div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import { Component as Touch } from 'vue-touch'

import intercom from '../intercom'

const SYNC = 'keynote.controller:sync'

export default {
  name: 'Controller',

  data: () => ({
    indexKey: -1
  }),

  computed: mapGetters(['isPresenterViewEnabled']),

  methods: {
    togglePresenterView () {
      this.present({ enabled: !this.isPresenterViewEnabled })
    },

    enterFullscreen () {
      this.fullscreen()
    },

    exitFullscreen () {
      this.fullscreen(false)
    },

    fullscreen (go = true) {
      const element = this.$el
      const requestMethod = go ? (
        element.requestFullscreen ||
        element.webkitRequestFullscreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullscreen
      ) : (
        element.exitFullscreen ||
        element.webkitExitFullscreen ||
        element.webkitExitFullScreen ||
        element.mozExitFullScreen ||
        element.msExitFullscreen
      )

      requestMethod && requestMethod.call(element)
    },

    goNext () {
      this.move({ delta: 1 })
      this.doSync()
    },

    goPrev () {
      this.move({ delta: -1 })
      this.doSync()
    },

    stepNext (e) {
      this.step({ delta: 1 })
      this.doSync()
    },

    stepPrev () {
      this.step({ delta: -1 })
      this.doSync()
    },

    onBlur () {
      console.log('Keyboard controls inactive.')
    },

    onFocus () {
      console.log('Keyboard controls active.')
    },

    onKeypress (e) {
      if (!/^digit/i.test(e.code)) return true

      if (this.indexKey < 0) this.indexKey = Number(e.key)
      else this.indexKey = this.indexKey * 10 + Number(e.key)

      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.go(), 400)
    },

    go () {
      this.jump({ index: this.indexKey })
      this.doSync()
      this.indexKey = -1
    },

    doSync () {
      this.isPresenterViewEnabled && intercom.emit(SYNC, this.$store.state.control)
    },

    ...mapActions(['jump', 'move', 'step', 'sync', 'present'])
  },

  created () {
    intercom.on(SYNC, this.sync)
  },

  beforeDestroy () {
    intercom.off(SYNC, this.sync)
  },

  mounted () {
    this.$nextTick(() => this.$el.focus())
  },

  components: { Touch }
}
</script>

<style module>
.controller, .touch {
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: none;
}
</style>
