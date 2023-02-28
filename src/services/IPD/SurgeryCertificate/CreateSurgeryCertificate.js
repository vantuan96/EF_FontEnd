import Service from '../../Service'

class CreateSurgeryCertificate extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/SurgeryCertificate/', parameters)
  }
}

export default CreateSurgeryCertificate
