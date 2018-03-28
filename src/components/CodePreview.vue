<script>
import Prism from 'prismjs'
import deIndent from 'de-indent'

export default {
  functional: true,
  props: {
    code: {
      type: String
    },
    language: {
      type: String,
      default: 'markup'
    }
  },
  render(h, ctx) {
    const code = deIndent(ctx.props.code || ctx.children[0].text).trim()
    const language = ctx.props.language
    const prismLanguage = Prism.languages[language]
    const className = `language-${language}`

    return h(
      'pre',
      Object.assign({}, ctx.data, {
        class: [ctx.data.class, className]
      }),
      [
        h('code', {
          class: className,
          domProps: {
            innerHTML: Prism.highlight(code, prismLanguage)
          }
        })
      ]
    )
  }
}
</script>

<style src="prismjs/themes/prism.css">

</style>
