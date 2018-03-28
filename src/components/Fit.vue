<template>
  <div class="fit text" ref="container">
    <span class="content" ref="text" :style="{ zoom: scale }">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'Fit',

  data: () => ({
    scale: 1
  }),

  methods: {
    resize() {
      const { container, text } = this.$refs

      if (!container || !text) return

      const scale = container.offsetWidth / text.offsetWidth

      if (Math.abs(this.scale - scale) > 0.1) {
        this.scale = scale
      }
    }
  },

  mounted() {
    this.$nextTick(this.resize)
    window.addEventListener('load', this.resize)
    window.addEventListener('resize', this.resize)
  },

  updated() {
    this.$nextTick(this.resize)
  },

  destroyed() {
    window.removeEventListener('load', this.resize)
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style>
.fit {
  display: flex;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
}

.fit > .content {
  transition: 0.5s zoom;
}
</style>
