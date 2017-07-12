<script>
export default {
  name: 'SlideContainer',
  render (h) {
    return h('div', {
      class: 'vue-keynote-slide-container',
    }, this.$slots.default)
  }
}
</script>

<style>
.vue-keynote-slide-container {
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
}
</style>

