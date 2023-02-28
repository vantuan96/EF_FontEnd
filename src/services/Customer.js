import Service from './Service'

class Customer extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/HISCustomer', parameters)
  }
}

export default Customer
