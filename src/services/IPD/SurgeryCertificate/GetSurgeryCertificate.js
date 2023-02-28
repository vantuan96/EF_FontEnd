import Service from '../../Service'

class GetSurgeryCertificate extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/SurgeryCertificate/', parameters)
  }
}

export default GetSurgeryCertificate
