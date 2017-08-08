<template lang="html">
<div class="vue-keynote-slide">
    <small class="vue-keynote-text">
      Built with Vue + <a href="https://github.com/znck/vue-keynote">Keynote</a>
    </small>
  </div>
</template>

<script lang="babel">
export default {
  name: 'StartSlide'
}
</script>


<style>
.vue-keynote-text, .vue-keynote-text a {
  font-size: 8px;
  color: rgb(150, 150, 150);
}
</style>
