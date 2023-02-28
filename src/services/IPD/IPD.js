import Service from '../Service'

class IPDService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/IPD', parameters)
  }
}

export default IPDService
