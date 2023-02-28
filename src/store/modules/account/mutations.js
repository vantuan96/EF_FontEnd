/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { FIND, UPDATE, QUEUE, UPDATECOUNTNOTIFY, UPDATENOTIFY } from './mutation-types'
/* eslint-disable no-param-reassign */
export default {
  [FIND] (state, account) {
    state.Username = account.Username
    state.Role = account.Role
    state.Fullname = account.Fullname
    state.SiteId = account.SiteId
    state.Sites = account.Sites
    state.Position = account.Position
    state.SpecialtyName = account.SpecialtyName
    state.SpecialtyId = account.SpecialtyId
    state.Site = account.Site
    state.Specialty = account.Specialty
    state.IsAnesthesia = account.IsAnesthesia
    localStorage.setItem('account_info', JSON.stringify(
      {
        Position: account.Position,
        SpecialtyName: account.SpecialtyName,
        Fullname: account.Fullname
      }
    ))
  },
  [UPDATE] (state, account) {
    if (account.CurrentPatient) state.CurrentPatient = account.CurrentPatient
    if (account.CurrentPatientObj) state.CurrentPatientObj = account.CurrentPatientObj
    if (account.Fullname) state.Fullname = account.Fullname
    if (account.IsAnesthesia) state.IsAnesthesia = account.IsAnesthesia
    if (account.Position) state.Position = account.Position
    if (account.SpecialtyName) state.SpecialtyName = account.SpecialtyName
  },
  [QUEUE] (state, status) {
    state.queue_status = status
  },
  [UPDATECOUNTNOTIFY] (state, count) {
    state.notify_count = count
  },
  [UPDATENOTIFY] (state, count) {
    state.notify = count
  }
}
