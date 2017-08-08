import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/index.js',
  dest: 'dist/vue-keynote.js',
  format: 'es',
  plugins: [
    vue(), resolve({ jsnext: true, browser: true }),
    babel({ runtimeHelpers: true, exclude: 'node_modules/**' }), commonjs()
  ],
  external: ['velocity-animate', 'vue-touch', 'vue', 'vuex', 'babel-runtime']
}
