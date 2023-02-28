
/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js.
 *
 * https://kazupon.github.io/vue-i18n/
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/locale'
Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'vi',
  fallbackLocale: localStorage.getItem('locale') || 'vi',
  messages,
  silentTranslationWarn: true
})

export default {
  i18n
}
