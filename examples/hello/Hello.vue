<template>
  <Keynote style="font-size: 48px">
    <div class="hello-slide" name="push" :style="{ background: random() }" notes="This is first slide.">
      <h2>Push Left 1</h2>
    </div>

    <div class="hello-slide" name="push" direction="right" :style="{ background: random() }">
      <h2>Push Right 2</h2>
    </div>

    <div class="hello-slide" name="push" direction="top" :style="{ background: random() }">
      <h2>Push Top 3</h2>
    </div>

    <div class="hello-slide" name="push" direction="bottom" :style="{ background: random() }">
      <h2>Push Bottom 4</h2>
    </div>

    <div class="hello-slide" name="reveal" :style="{ background: random() }">
      <h2>Reveal Left 5</h2>
    </div>


    <div class="hello-slide" name="reveal" direction="right" :style="{ background: random() }">
      <h2>Reveal Right 6</h2>
    </div>


    <div class="hello-slide" name="reveal" direction="top" :style="{ background: random() }">
      <h2>Reveal Top 7</h2>
    </div>


    <div class="hello-slide" name="reveal" direction="bottom" :style="{ background: random() }">
      <h2>Reveal Bottom 8</h2>
    </div>


    <div class="hello-slide" name="drop" :style="{ background: random() }">
      <h2>Drop 9</h2>
    </div>


    <div class="hello-slide" name="reveal" :style="{ background: random() }">
      <h2>Reveal 10</h2>
    </div>


    <div class="hello-slide" :style="{ background: random() }">
      <h2>Hey! Bro this works 11!</h2>
    </div>


    <div class="hello-slide" :style="{ background: random() }">
      <h2>Hey! Bro this works 12!</h2>
    </div>
  </Keynote>
</template>

<script>
import Keynote from '../../src/core/Keynote.vue'

const Slide = {
  render (h) {
    return h('div', { class: 'hello-slide' }, this.$slots.default)
  }
}

let i = 0
export default {
  components: { Keynote, Slide },
  methods: {
    random () {
      return `hsl(${(Math.random() * 360) % 360},100%,50%)`
    }
  }
}
</script>


<style>
.hello-slide {
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
