import Service from '../Service'

class DischargeCertificate extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/Document/DischargeCertificate/', parameters)
  }
}

export default DischargeCertificate
