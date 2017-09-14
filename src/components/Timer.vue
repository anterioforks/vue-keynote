<template>
  <div class="timer">
    {{ now }}
  </div>
</template>

<script>
const pad = any => `0${any}`.substr(-2)

export default {
  props: {
    countdown: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 15
    }
  },

  data: () => ({
    start: Date.now(),
    cur: Date.now(),
    end: Date.now()
  }),

  computed: {
    now () {
      const start = this.start
      const end = this.end
      const cur = this.cur
      const countdown = this.countdown

      const elapsed = cur - start
      const remaining = end - cur
      const t = countdown ? remaining : elapsed

      const m = Math.floor(t / 60000)
      const s = Math.floor((t % 60000) / 1000)
      const z = Math.floor((t / 10) % 100)

      return `${pad(m)}:${pad(s)}:${pad(z)}`
    }
  },

  beforeMount () {
    this.start = Date.now()
    this.end = this.start + this.duration * 60 * 1000
    this.timer = setInterval(
      () => (this.cur = Date.now()),
      60
    )
  },

  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.timer {
  font-family: Monaco, "Courier New", Courier, monospace;
  font-size: 48px;
  text-align: center;
  line-height: 2;
}
</style>
