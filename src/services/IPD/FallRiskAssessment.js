import Service from '../Service'

class FallRiskAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/FallRiskAssessment/', parameters)
  }
}

export default FallRiskAssessment
