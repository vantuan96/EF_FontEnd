import Service from '../Service'

class EIOService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/EIO/', parameters)
  }
}

export default EIOService
