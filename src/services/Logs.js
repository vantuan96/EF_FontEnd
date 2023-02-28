import Service from './Service'

class Logs extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Logs', parameters)
  }
}

export default Logs
