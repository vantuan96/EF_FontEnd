/* ============
 * Account Transformer
 * ============
 *
 * The transformer for the account.
 */

import Transformer from './Transformer'
// import Vue from 'vue'
export default class AccountTransformer extends Transformer {
  /**
   * Method used to transform a fetched account.
   *
   * @param account The fetched account.
   *
   * @returns {Object} The transformed account.
   */
  static fetch (account) {
    var specialty = null
    var sites = account.Sites.map(site => {
      var specialtySelected = null
      site.Specialities.map(spe => {
        spe.Name = `(${spe.VisitTypeGroupCode}) - ${spe.ViName}`
        spe.EnName = `(${spe.VisitTypeGroupCode}) - ${spe.EnName}`
        spe.EnLabel = spe.EnName
        if (spe.Id === account.SpecialtyId) {
          specialty = spe
          specialtySelected = spe
        }
        return spe
      })
      site.Specialty = specialtySelected
      return site
    })
    var site = account.Sites.find(site => site.Id === account.SiteId)
    if (site) {
      site = Object.assign(site, account.Site)
    }
    // console.log(Vue.$route.name, Vue.$route.query.fromLoginpage)
    // if (site && specialty && specialty.VisitTypeGroupCode && Vue.$route.name === 'dashboard' && Vue.$route.query.fromLoginpage) {
    //   this.$router.push({name: specialty.VisitTypeGroupCode || 'dashboard'})
    // }
    var position = account.Position.map(e => e.EnName)
    return {
      Position: position,
      Role: account.Role,
      SiteId: account.SiteId,
      Sites: sites,
      Username: account.Username,
      Fullname: account.Fullname,
      SpecialtyName: account.SpecialtyName,
      SpecialtyId: account.SpecialtyId,
      Site: site,
      Specialty: specialty,
      CurrentPatient: null,
      CurrentPatientObj: null,
      IsAnesthesia: account.IsAnesthesia
    }
  }

  /**
   * Method used to transform a send account.
   *
   * @param account The account to be send.
   *
   * @returns {Object} The transformed account.
   */
  static send (account) {
    return {
      email: account.email,
      first_name: account.firstName,
      last_name: account.lastName,
      role: account.role,
      id: account.id,
      hasIncomingCall: false,
      username: 'None',
      siteId: null
    }
  }
}
