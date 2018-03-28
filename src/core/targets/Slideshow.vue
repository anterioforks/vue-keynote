<template>
  <div class="slideshow">
    <component 
      v-if="keynote.activeSlide" 
      v-bind="transition"
        :is="transition.component || 'transition-noop'"
        key="transition"
        @entered="onEnter"
        @exited="onExit"
    >
      <Vnode :vnode="keynote.activeSlide.vnode" :key="keynote.activeSlide.index"/>
    </component>
    <PreLoad v-show="false">
      <Vnode v-for="slide in keynote.slides" :vnode="clone(slide.vnode)" :key="slide.index"/>
    </PreLoad>
  </div>
</template>

<script>
import { getRealChild } from '../../core/Manager/helpers'

export default {
  name: 'Slideshow',
  inject: ['keynote'],
  computed: {
    transition() {
      this.entering //
      this.keynote.activeSlide //
      this.keynote.prevSlide //

      if (this.keynote.activeSlide) {
        return this.keynote.activeSlide.transition
      }

      return {}
    }
  },
  methods: {
    clone(any) {
      return { ...any }
    },
    onEnter(event) {
      console.log('ENTER', getRealChild(event), this.keynote.activeSlide)
    },
    onExit(event) {
      console.log('EXIT', getRealChild(event), this.keynote.activeSlide)
    }
  },
  components: {
    PreLoad: {
      provide: { preloading: true },
      render(h) {
        return h('div', {}, this.$slots.default)
      }
    }
  }
}
</script>

<style>
.slideshow {
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 400vw;
}

.slideshow > .slide {
  position: absolute;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}
</style>
