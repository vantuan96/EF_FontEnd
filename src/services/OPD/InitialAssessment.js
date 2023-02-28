import Service from '../Service'

class InitialAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/InitialAssessments/', parameters)
  }
}

export default InitialAssessment
