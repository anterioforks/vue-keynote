<template>
  <Fit :fit="fit">
    <component 
      class="heading"
      :is="tag"
      :class="{
        caps: caps
      }"
      :style="style"
    >
      <slot />
    </component>
  </Fit>
</template>

<script>
export default {
  name: 'Title',
  props: {
    fit: Boolean,
    caps: Boolean,
    level: {
      type: Number,
      default: 1,
      validator: level => 1 <= level && level <= 6
    }
  },
  inject: ['theme'],
  computed: {
    style() {
      if (!this.theme) return {}
    },
    tag() {
      return 'h' + this.level
    }
  }
}
</script>

<style>
.caps {
  text-transform: uppercase;
}
</style>
