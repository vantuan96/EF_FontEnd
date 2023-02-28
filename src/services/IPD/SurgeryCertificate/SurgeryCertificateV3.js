import Service from '../../Service'

class SurgeryCertificateV3 extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/SurgeryCertificateV3/', parameters)
  }
}

export default SurgeryCertificateV3
