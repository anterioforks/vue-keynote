import Vue from 'vue'
import Keynote from '../src'
import DefaultTheme from '../src/themes/default'

Vue.use(Keynote)
Keynote.use(DefaultTheme)

import App from './Simple.vue'

new Vue(App).$mount('#app')
