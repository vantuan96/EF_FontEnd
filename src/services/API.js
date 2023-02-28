import Service from './Service'

class API extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    // super('api/OPD/ClinicalBreastExamNote/', parameters)
    super('api', parameters)
  }
}

export default API
