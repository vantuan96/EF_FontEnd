
import Service from '../Service'
class ExternalTransportationAssessment extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'IPD') {
    super(`api/${type}/ExternalTransportationAssessment/`, parameters)
  }
}

export default ExternalTransportationAssessment
