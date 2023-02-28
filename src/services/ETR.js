import Service from './Service'

class ETR extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ed/ETR', parameters)
  }
}

export default ETR
