<template>
  <Controller>
    <slot></slot>
  </Controller>
</template>

<script>
import Controller from './Controller.vue'

export default {
  name: 'Keynote',

  components: { Controller }
}
</script>

<style>
html, body {
  margin: 0 !important;
  padding: 0 !important;
}

html, body, .vue-keynote-container {
  width: 100%;
  height: 100%;
}
</style>

