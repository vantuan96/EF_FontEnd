/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes/index__.js'
import store from '@/store'

Vue.use(VueRouter)

export const router = new VueRouter({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.guest)) {
    next()
  } else if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({
      name: 'login.index'
    })
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next({
      name: 'dashboard'
    })
  } else {
    var VisitTypeGroupCode = to.matched.find(m => m.meta.VisitTypeGroupCode)
    var allowView = to.matched.find(m => m.meta.allowView)
    if (!allowView && VisitTypeGroupCode && store.state.account.Specialty && store.state.account.Specialty.VisitTypeGroupCode && VisitTypeGroupCode.meta.VisitTypeGroupCode !== store.state.account.Specialty.VisitTypeGroupCode) {
      next({
        path: '/' + store.state.account.Specialty.VisitTypeGroupCode
      })
    } else if (to.name === 'page403') {
      next()
    } else if (to.matched.some(m => m.meta.guest)) {
      next()
    } else if (to.matched.some(m => m.meta.auth) && to.matched[0].meta.roles) {
      next()
    } else {
      next({
        name: 'login.index'
      })
    }
  }
})
// else if (to.matched.some(m => m.meta.requireSettingDepartment) && (!store.state.account.SiteId || !store.state.account.SpecialtyId)) {
//   next({
//     name: 'dashboard'
//   })
// }
Vue.router = router

export default {
  router
}
