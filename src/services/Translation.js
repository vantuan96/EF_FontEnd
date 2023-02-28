import Service from './Service'

class Translation extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Translation/', parameters)
  }
}

export default Translation
