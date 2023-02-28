import Service from '../Service'

class EocService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/eoc', parameters)
  }
}

export default EocService
