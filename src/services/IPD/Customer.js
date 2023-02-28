import Service from '../Service'

class CustomersIPD extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/CustomerIPD/', parameters)
  }
}

export default CustomersIPD
