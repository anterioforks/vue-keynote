<template>
  <div class="slide">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style>
.slide {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 2rem;
  background-color: white;

  backface-visibility: hidden;

  /* box-shadow: 0 0 20px 0px rgba(0, 0, 0, .5);
  margin: 1rem; */
}
</style>
