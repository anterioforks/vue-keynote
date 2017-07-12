<template>
  <Keynote>
    <div enter="slide" enter-duration="600" key="1">
      <h1>Hello! I am VueKeynote.</h1>
    </div>

    <Slide enter="slide" enter-duration="600" leave="slide" key="2">
      <h2>Hey! Bro this works!</h2>
    </Slide>

    <div>
      <h2>Hey! Bro this works 2!</h2>
    </div>

    <div>
      <h2>Hey! Bro this works 3!</h2>
    </div>

    <div>
      <h2>Hey! Bro this works 4!</h2>
    </div>


    <div>
      <h2>Hey! Bro this works 5!</h2>
    </div>


    <div>
      <h2>Hey! Bro this works 6!</h2>
    </div>


    <div>
      <h2>Hey! Bro this works 7!</h2>
    </div>


    <div>
      <h2>Hey! Bro this works 8!</h2>
    </div>


    <div>
      <h2>Hey! Bro this works 9!</h2>
    </div>


    <div>
      <h2>Hey! Bro this works 10!</h2>
    </div>


    <div>
      <h2>Hey! Bro this works 11!</h2>
    </div>
  </Keynote>
</template>

<script>
import Keynote from '../../src/core/Keynote.vue'

const Slide = {
  props: ['enter', 'enter-duration'],
  render (h) {
    return h('div', this.$slots.default)
  }
}

export default {
  components: { Keynote, Slide }
}
</script>
