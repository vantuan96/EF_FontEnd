/* ============
 * Getters for the account module
 * ============
 *
 * The getters that are available on the
 * account module.
 */

export default {
  getSites: state => {
    return state.Sites ? JSON.parse(JSON.stringify(state.Sites)) : null
  },
  getSite: state => {
    return state.Site ? JSON.parse(JSON.stringify(state.Site)) : null
  },
  getSpecialty: state => {
    return state.Specialty ? JSON.parse(JSON.stringify(state.Specialty)) : null
  },
  getPosition: state => {
    return state.Position ? JSON.parse(JSON.stringify(state.Position)) : null
  },
  getDateOfBirth: state => {
    return state.CurrentPatientObj.DateOfBirth
  }
}
