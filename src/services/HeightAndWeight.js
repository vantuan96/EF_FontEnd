import Service from './Service'

class HeightAndWeight extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Customer/HeightAndWeight/', parameters)
  }
}

export default HeightAndWeight
