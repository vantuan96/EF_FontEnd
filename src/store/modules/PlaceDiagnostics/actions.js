/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */
import * as types from './mutation-types'
import Services from '@/services/Services'

export const find = ({ commit }, data) => {
  new Services().GetDetailService({Ids: [data.Id], PatientLocationId: data.PatientLocationId}).then(({items}) => {
    add({ commit }, {items: items, type: data.type})
    items[0].type = data.type
    items[0].Priority = 'R'
    setEditItem({ commit }, items[0])
  })
}
export const update = ({
  commit
}, res) => {
  commit(types.UPDATE, res)
}
export const remove = ({
  commit
}, res) => {
  commit(types.REMOVE, res)
}
export const removeAll = ({
  commit
}, res) => {
  commit(types.REMOVEALL, res)
}
export const add = ({
  commit
}, res) => {
  commit(types.ADD, res)
}
export const setEditItem = ({
  commit
}, res) => {
  commit(types.SETEDITITEM, res)
}
export const setViewItem = ({
  commit
}, res) => {
  commit(types.SETVIEWITEM, res)
}
export const addPackage = ({
  commit
}, res) => {
  commit(types.ADDPACKAGE, res)
}
export const removePackage = ({
  commit
}, res) => {
  commit(types.REMOVEPACKAGE, res)
}
export default {
  update,
  remove,
  add,
  find,
  removeAll,
  setEditItem,
  setViewItem,
  addPackage,
  removePackage
}
