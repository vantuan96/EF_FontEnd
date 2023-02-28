import Service from './Service'

class Specialities extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Specialties', parameters)
  }
}

export default Specialities
