import Service from '../Service'

class Tranfers extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/eoc/eoc-tranfers', parameters)
  }
}

export default Tranfers
