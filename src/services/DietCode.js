import Service from './Service'

class DietCodeService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/DietCode/', parameters)
  }
}

export default DietCodeService
