import Service from '../Service'

class OPDService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/OPD', parameters)
  }
}

export default OPDService
