import Service from '../../Service'

class SurgeryCertificateConfirm extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/SurgeryCertificate/Confirm/', parameters)
  }
}

export default SurgeryCertificateConfirm
