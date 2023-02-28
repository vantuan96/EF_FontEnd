import Service from '../Service'

class OPDConfirmService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/', parameters)
  }
}

export default OPDConfirmService
