import Service from './Service'

class Custome extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (endpoint, parameters = {}) {
    super(endpoint, parameters)
  }
}

export default Custome
