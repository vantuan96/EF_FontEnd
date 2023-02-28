import Service from '../Service'

class OPDGENBRCA extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/OPDGENBRCA', parameters)
  }
}

export default OPDGENBRCA
