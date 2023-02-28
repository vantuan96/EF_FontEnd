import Service from '../Service'

class AmbulanceRunReport extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/AmbulanceRunReport/', parameters)
  }
}

export default AmbulanceRunReport
