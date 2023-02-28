import Service from '../Service'

class CustomersEOC extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/eoc/customer', parameters)
  }
}

export default CustomersEOC
