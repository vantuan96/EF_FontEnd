
import Service from '../Service'

class ThrombosisRiskFactorAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/ThrombosisRiskFactorAssessment', parameters)
  }
}

export default ThrombosisRiskFactorAssessment
