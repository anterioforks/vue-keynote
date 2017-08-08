<template lang="html">
<div class="vue-keynote-slide">
    End of Keynote! <br>
    <small>
      <small>Built with Vue + <a href="https://github.com/znck/vue-keynote" style="color: white">Keynote</a></small>
    </small>
  </div>
</template>

<script lang="babel">
export default {
  name: 'EndSlide'
}
</script>


<style>
.vue-keynote-slide {
  font-family: Arial, Helvetica, sans-serif;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: black;
  color: white;

  text-align: center;
}
</style>
