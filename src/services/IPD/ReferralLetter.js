import Service from '../Service'

class ReferralLetter extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/Document/ReferralLetter', parameters)
  }
}

export default ReferralLetter
