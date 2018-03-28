<script>
export default {
  name: 'Photo',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  render(h) {
    new Image().src = this.src
    console.log('Loading > ' + this.src)

    return h('img', { attrs: { src: this.src } })
  }
}
</script>
