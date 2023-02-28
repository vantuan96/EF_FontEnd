import Service from '../Service'

class InitialAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/InitialAssessment/', parameters)
  }
}

export default InitialAssessment
