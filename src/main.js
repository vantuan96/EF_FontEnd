/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue'

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 */
import './lib/eventBus'

import './plugins/vuex'
import './plugins/axios'
import { i18n } from './plugins/vue-i18n'
import { router } from './plugins/vue-router'
import './plugins/vuex-router-sync'
import './plugins/register-service-worker'
import './plugins/TextareaAutosize'
import 'va/lib/css'
import './lib/script'
import './lib/textavatar/initial.min.js'
import './lib/global'
import './assets/css/checkbox.css'
import './assets/css/v-tooltip.css'
import './assets/css/DropdownSelectMoreApp.css'
import App from './App.vue'
/* ============
 * Styling
 * ============
 *
 * Import the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Import the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://stylus-lang.com/
 */

import './assets/stylus/app.styl'
import './assets/stylus/customerBtn.styl'

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */

import store from './store'

// format
import * as format from '@/configs'

Vue.config.productionTip = false
if (!window.location.hash.includes('login')) {
  store.dispatch('auth/check')
}
Object.keys(format).forEach(key => {
  Vue.filter(key, (format)[key])
})

/* eslint-disable no-new */
new Vue({
  /**
   * Bind the Vue instance to the HTML.
   */
  el: '#app',

  /**
   * The localization plugin.
   */
  i18n,

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,
  data: {
    imageCarousel: []
  },
  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App)
})
