import Service from './Service'

class Prescription extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Prescription', parameters)
  }
}

export default Prescription
