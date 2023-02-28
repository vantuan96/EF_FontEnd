import Service from '../Service'

class EOCInitialAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/eoc/InitialAssessment', parameters)
  }
}

export default EOCInitialAssessment
