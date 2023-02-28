import Service from '../Service'

class CustomersED extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/CustomerOPD/', parameters)
  }
}

export default CustomersED
