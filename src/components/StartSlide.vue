<template lang="html">
<div :class="$style.slide">
    <small :class="$style.text">
      Built with Vue + <a href="https://github.com/znck/vue-keynote">Keynote</a>
    </small>
  </div>
</template>

<script lang="babel">
export default {
  name: 'StartSlide'
}
</script>


<style module>
.slide {
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

.text, .text a {
  font-size: 8px;
  color: rgb(150, 150, 150);
}
</style>
