import Service from '../Service'

class HumanResourceAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/HumanResourceAssessment/', parameters)
  }
}

export default HumanResourceAssessment
