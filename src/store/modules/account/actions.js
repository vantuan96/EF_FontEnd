/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */
import { router } from '@/plugins/vue-router'
import Transformer from '@/transformers/AccountTransformer'
import * as types from './mutation-types'
import Account from '@/services/Account'
import store from '@/store'
import utils from '@/utils'
export const find = ({
  commit
}) => {
  return new Account({hidemsg: true}).all().then((response) => {
    if ((response.AppVersion.Version + '') !== localStorage.getItem('AppVersion')) {
      localStorage.setItem('AppVersion', (response.AppVersion.Version))
      setTimeout(() => {
        location.reload()
      }, 100)
    }
    if (response.Position) localStorage.setItem('UserPosition', response.Position.map(e => e.EnName))
    commit(types.FIND, Transformer.fetch(response))
    var specialty = null
    response.Sites.forEach(site => {
      var specialtySelected = null
      site.Specialities.forEach(spe => {
        if (spe.Id === response.SpecialtyId) {
          specialty = spe
          specialtySelected = spe
        }
        return spe
      })
      site.Specialty = specialtySelected
      return site
    })
    var VisitTypeGroupCode = router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
    var site = response.Sites.find(site => site.Id === response.SiteId)
    if (router.currentRoute.name !== 'dashboard' && (!site && !specialty)) {
      window.location.href = '/#/dashboard/'
    } else if (router.currentRoute.name === 'home' && site && specialty) {
      window.location.href = '/#/' + specialty.VisitTypeGroupCode
    } else if (VisitTypeGroupCode && site && specialty && specialty.VisitTypeGroupCode !== VisitTypeGroupCode.meta.VisitTypeGroupCode) {
      var allowView = router.currentRoute.matched.find(m => m.meta.allowView)
      if (!allowView) window.location.href = '/#/' + specialty.VisitTypeGroupCode
    } else {
      // window.location.href = '/#/dashboard/'
    }
    if (response.Site) document.body.classList.add(response.Site.Code)
    if (response.Site) document.body.classList.add(response.SpecialtyId)
    response.Position.forEach(pos => {
      document.body.classList.add(utils.cleanSearchKey(pos.EnName))
    })
  }).catch(error => {
    console.log(error)
    store.dispatch('auth/logout')
  })
}
export const update = ({
  commit
}, res) => {
  commit(types.UPDATE, res)
}
export const updateQueue = ({
  commit
}, res) => {
  commit(types.QUEUE, res)
}
export const updateCountNofify = ({
  commit
}, res) => {
  commit(types.UPDATECOUNTNOTIFY, res)
}
export const updateNofify = ({
  commit
}, res) => {
  commit(types.UPDATENOTIFY, res)
}
export default {
  find,
  update,
  updateQueue,
  updateCountNofify,
  updateNofify
}
