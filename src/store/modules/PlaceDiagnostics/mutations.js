/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */
import Vue from 'vue'
import {
  FIND,
  UPDATE,
  ADD,
  REMOVE,
  REMOVEALL,
  SETEDITITEM,
  SETVIEWITEM,
  ADDPACKAGE,
  REMOVEPACKAGE
} from './mutation-types'
/* eslint-disable no-param-reassign */
export default {
  [FIND] (state, data) {
  },
  [ADD] (state, data) {
    var services = state.Services
    Vue.set(services, data.type, state.Services[data.type].concat(data.items))
    state.Services = services
  },
  [UPDATE] (state, data) {
    var services = state.Services
    Vue.set(services, data.type, state.Services[data.type].map(e => {
      if (e.Id === data.form.Id) return data.form
      return e
    }))
    state.Services = services
    Vue.set(state, 'EditItem', null)
  },
  [REMOVE] (state, data) {
    var services = state.Services
    Vue.set(services, data.type, state.Services[data.type].filter(e => e.Id !== data.Id))
    state.Services = services
  },
  [REMOVEALL] (state) {
    state.Services = [[], [], [], []]
    state.Packages = []
  },
  [SETEDITITEM] (state, data) {
    Vue.set(state, 'EditItem', data)
  },
  [SETVIEWITEM] (state, data) {
    Vue.set(state, 'ViewItem', data)
  },
  [ADDPACKAGE] (state, items) {
    var packages = state.Packages || []
    state.Packages = packages.concat(items)
  },
  [REMOVEPACKAGE] (state, itemId) {
    var packages = state.Packages.filter(e => e.Id !== itemId)
    state.Packages = packages
  }
}
