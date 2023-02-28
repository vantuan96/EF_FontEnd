import Service from '../Service'

class CustomersED extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/CustomersED/', parameters)
  }
}

export default CustomersED
