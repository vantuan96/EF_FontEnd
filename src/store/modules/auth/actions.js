/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import Auth from '@/services/Auth'
import Account from '@/services/Account'
export const check = ({ commit }) => {
  commit(types.CHECK)
}

export const register = ({ commit }) => {
  /*
   * Normally you would use a proxy to register the user:
   *
   * new Proxy()
   *  .register(payload)
   *  .then((response) => {
   *    commit(types.REGISTER, response)
   *  })
   *  .catch(() => {
   *    console.log('Request failed...')
   *  })
   */
  commit(types.LOGIN, 'No use Token')
  Vue.router.push({
    name: 'home.index'
  })
}

export const login = ({ commit }, user) => {
  new Auth()
    .login(user)
    .then((response) => {
      if (user.username === 'thangdc3' || user.username === 'dungnv53' || user.username === 'hunglq25') {
        localStorage.setItem('allowcopypaste', 1)
        localStorage.setItem('showmasterdatacode', 1)
      }
      if (user.username === 'thanhnt135') {
        localStorage.setItem('allowcopypaste', 1)
      }
      response.key = 'No use Token'
      Vue.$http.defaults.headers.common.Authorization = `Token ${response.key}`
      new Account().all().then(res => {
        // console.log(res.Position.ViName)
        if (res.Position) localStorage.setItem('UserPosition', res.Position.map(e => e.EnName))
        res.role = res.Role
        commit(types.LOGIN, {
          token: response.Token,
          role: res.role
        })
        var specialty = null
        res.Sites.forEach(site => {
          var specialtySelected = null
          site.Specialities.forEach(spe => {
            if (spe.Id === res.SpecialtyId) {
              specialty = spe
              specialtySelected = spe
            }
            return spe
          })
          site.Specialty = specialtySelected
          return site
        })

        var site = res.Sites.find(site => site.Id === res.SiteId)
        if (site && specialty && specialty.VisitTypeGroupCode) {
          window.location.href = `/#/${specialty.VisitTypeGroupCode || 'dashboard'}/`
        } else {
          window.location.href = '/#/dashboard/'
        }
        setTimeout(() => {
          location.reload()
        }, 10)
      })
    }).catch(() => {
      Vue.router.push({
        name: 'login.index'
      })
    })
}

export const logout = ({ commit }) => {
  new Auth()
    .logout()
    .then((reponse) => {
      localStorage.clear()
      commit(types.LOGOUT)
      let ok = reponse.url
      window.location.href = ok
      // setTimeout(e => {
      //   location.reload()
      // }, 10)
    })
}

export default {
  check,
  register,
  login,
  logout
}
