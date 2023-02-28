import Service from './Service'

class CustomerInfor extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/CustomerInfor', parameters)
  }
}

export default CustomerInfor
