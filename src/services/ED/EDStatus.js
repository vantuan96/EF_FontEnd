import Service from '../Service'

class EDStatus extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Status/', parameters)
  }
}

export default EDStatus
