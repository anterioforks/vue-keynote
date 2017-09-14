<template>
  <div class="clock">
    {{ now }}
  </div>
</template>

<script>
const pad = any => `0${any}`.substr(-2)

export default {
  props: {
    format: {
      type: String,
      default: 'H:i:s A'
    }
  },

  data: () => ({
    time: Date.now()
  }),

  computed: {
    now () {
      const time = new Date(this.time)
      const format = this.format
      const h = time.getHours() % 12

      return format.replace('A', time.getHours() > 12 ? 'PM' : 'AM')
        .replace('H', pad(h || 12))
        .replace('i', pad(time.getMinutes()))
        .replace('s', pad(time.getSeconds()))
    }
  },

  beforeMount () {
    this.clock = setInterval(
      () => (this.time = Date.now()),
      1000
    )
  },

  beforeDestroy () {
    clearInterval(this.clock)
  }
}
</script>

<style lang="scss" scoped>
.clock {
  font-family: Monaco, "Courier New", Courier, monospace;
  font-size: 48px;
  text-align: center;
  line-height: 2;
}
</style>


