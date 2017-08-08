import store from '../../src/store'
import App from './Hello.vue'
import Vue from 'vue'

new Vue({
  el: '#app',
  store,
  render (h) {
    return h(App)
  }
})
