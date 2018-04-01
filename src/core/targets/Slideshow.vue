<template>
  <div class="slideshow">
    <component 
      v-if="keynote.activeSlide" 
      v-bind="transition"
        :is="transition.component" key="transition"
        @before-leave="beforeExit"
        @after-leave="afterExit"
    >
      <Vnode :vnode="keynote.activeSlide.vnode" :key="keynote.activeSlide.index"/>
    </component>
    <PreLoad v-show="false">
      <Vnode v-for="slide in keynote.slides" :vnode="clone(slide.vnode)" :key="slide.index"/>
    </PreLoad>
  </div>
</template>

<script>
export default {
  name: 'Slideshow',
  inject: ['keynote'],

  data: () => ({
    leaving: true
  }),

  computed: {
    prevTransition() {
      if (this.keynote.prevSlide) {
        return this.keynote.prevSlide.transition
      }

      return { component: 'transition-noop' }
    },
    transition() {
      if (this.keynote.activeSlide) {
        return this.keynote.activeSlide.transition
      }

      return { component: 'transition-noop' }
    }
  },
  methods: {
    clone(any) {
      return { ...any }
    },
    beforeExit(event) {
      this.leaving = true
      console.log('> ENTERED', event)
    },
    afterExit(event) {
      this.leaving = false
      console.log('> EXITED', event)
    }
  },
  components: {
    PreLoad: {
      provide: { preloading: true },
      render(h) {
        return h('div', {}, this.$slots.default)
      }
    }
  },
  watch: {
    transition: {
      handler: any => console.log(any),
      immediate: true
    }
  }
}
</script>

<style>
.slideshow {
  width: 100%;
  height: 100%;
  height: 100vh;
  position: relative;
  perspective: 400vw;
}

.slideshow > .slide {
  position: absolute;

  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}
</style>
