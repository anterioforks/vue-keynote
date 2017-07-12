<template>
<div class="vue-keynote-controller vue-keynote-container"
     @keyup.up="goNext"
     @keyup.right="goNext"
     @keyup.75="goNext"
     @keyup.68="goNext"

     @keyup.down="goPrev"
     @keyup.left="goPrev"
     @keyup.74="goPrev"
     @keyup.65="goPrev"

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
  <Touch class="vue-keynote-touch vue-keynote-container"

         @pinchout="enterFullscreen"
         @pinchin="exitFullscreen"

         @swipeleft="goNext"
         @swiperight="goPrev"

         :recognizeWith="{
            swipe: ['pinch'],
            pinch: ['swipe']
          }">
    <Presenter ref="target">
      <slot></slot>
    </Presenter>
  </Touch>
</div>
</template>


<script>
import Vue from 'vue'
import { Component as Touch } from 'vue-touch'

import Presenter from './Presenter.vue'

export default {
  name: 'Controller',

  data: () => ({
    index: -1
  }),

  methods: {
    debug (e) {
      console.log(e)
    },
    enterFullscreen () {
      this.fullscreen()
    },

    exitFullscreen () {
      this.fullscreen(false)
    },

    fullscreen (go = true) {
      console.log('Fullscreen', go)
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
      this.emit('next')
    },

    goPrev () {
      this.emit('prev')
    },

    stepNext (e) {
      this.emit('step', 1)
    },

    stepPrev () {
      this.emit('step', -1)
    },

    emit (event, payload) {
      this.$refs.target.$emit(event, payload)
    },

    onBlur () {
      console.log('Keyboard controls inactive.')
    },

    onFocus () {
      console.log('Keyboard controls active.')
    },

    onKeypress (e) {
      if (!/^digit/i.test(e.code)) return true

      if (this.index < 0) this.index = Number(e.key)
      else this.index = this.index * 10 + Number(e.key)

      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.go(), 400)
    },

    go () {
      this.emit('go', this.index)
      this.index = -1
    }
  },

  mounted () {
    this.$nextTick(() => this.$el.focus())
  },

  components: { Presenter, Touch }
}
</script>

<style>
.vue-keynote-controller, .vue-keynote-touch {
  overflow: hidden;
  outline: none;
}
</style>

