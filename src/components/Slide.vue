<script>
export default {
  name: 'SlideContainer',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  render (h) {
    return h('div', {
      class: this.$style.slide,
    }, this.$slots.default)
  }
}
</script>

<style lang="scss" module>
.slide {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;

  position: absolute;
  top: 0;
  left: 0;

  background: white;

  > * {
    width: 100%;
    height: 100%;
  }
}
</style>

