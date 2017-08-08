import Keynote from './core/Keynote.vue'
import store from './store'

function plugin (Vue) {
  Vue.component('Keynote', Keynote)
}

// Install by default if using the script tag
if (typeof window !== 'undefined') {
  'Vue' in window && window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  version,
  store,
  Keynote
}
