<template>
  <Keynote>
    <Slide>
      <h1>Hello! I am VueKeynote.</h1>
    </Slide>

    <Slide>
      <h2>Hey! Bro this works!</h2>
    </Slide>
  </Keynote>
</template>

<script>
import Keynote from '../../src/core/Keynote.vue'

const Slide = {
  render (h) {
    return h('div', { class: 'slide' }, this.$slots.default)
  }
}

export default {
  components: { Keynote, Slide }
}
</script>

<style>
.slide {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

