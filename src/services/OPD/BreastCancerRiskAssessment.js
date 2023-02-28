import Service from '../Service'

class BreastCancerRiskAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/RiskAssessmentForCancer', parameters)
  }
}

export default BreastCancerRiskAssessment
