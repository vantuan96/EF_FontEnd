import Service from './Service'

class CustomerApi extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Customer', parameters)
  }
}

export default CustomerApi
