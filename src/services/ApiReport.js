import Service from './Service'

class ApiReport extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ApiReport', parameters)
  }
}

export default ApiReport
