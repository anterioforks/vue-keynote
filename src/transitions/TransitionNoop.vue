<template>
  <transition :css="false" v-bind="$attrs" v-on="$listeners"
    @enter="enter"
    @leave="leave"
    mode="out-in"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  abstract: true,
  methods: {
    enter(el, done) {
      done()
    },
    leave(el, done) {
      done()
    }
  }
}
</script>
