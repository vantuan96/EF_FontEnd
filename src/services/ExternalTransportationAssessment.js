
import Service from './Service'
class ExternalTransportationAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/ExternalTransportationAssessment/', parameters)
  }
}

export default ExternalTransportationAssessment
