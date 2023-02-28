import Service from '../Service'

class EDService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/ED', parameters)
  }
}

export default EDService
