/* ============
 * Getters for the account module
 * ============
 *
 * The getters that are available on the
 * account module.
 */

export default {
  getServices: state => {
    return state.Services
  },
  getPackages: state => {
    return state.Packages
  },
  getEditItem: state => {
    return state.EditItem
  },
  getViewItem: state => {
    return state.ViewItem
  }
}
