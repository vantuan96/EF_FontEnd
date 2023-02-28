import Service from '../Service'

class Order extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/Order/', parameters)
  }
}

export default Order
