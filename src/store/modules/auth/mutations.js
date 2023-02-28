/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue'
// import $ from 'jquery'
import {
  CHECK,
  REGISTER,
  LOGIN,
  LOGOUT
} from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [CHECK] (state) {
    let role = localStorage.getItem('role')
    state.authenticated = !!localStorage.getItem('api-access-token')
    state.role = role ? role.split(',') : []
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Token ${localStorage.getItem('api-access-token')}`
    }
  },

  [REGISTER] () {
    //
  },

  [LOGIN] (state, rep) {
    state.authenticated = true
    state.role = rep.role
    localStorage.setItem('api-access-token', rep.token)
    localStorage.setItem('role', rep.role)
    Vue.$http.defaults.headers.common.Authorization = `Token ${rep.token}`
    if (rep.token) {
      // Axios.defaults.headers.common.RequestVerificationToken = rep.token
      // $('[name="__RequestVerificationToken]').val(rep.token)
    }
  },

  [LOGOUT] (state) {
    state.authenticated = false
    localStorage.clear()
  }
}
