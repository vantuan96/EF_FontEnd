import Service from '../Service'

class InitialAssessmentForPediatric extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/InitialAssessmentForPediatricInpatient/', parameters)
  }
}

export default InitialAssessmentForPediatric
