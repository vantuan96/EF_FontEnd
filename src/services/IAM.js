import Service from './Service'

class IAM extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/InitialAssessments/', parameters)
  }
}

export default IAM
