import Service from '../../Service'

class ConsultationDrugWithAnAsteriskMarkService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/ConsultationDrugWithAnAsteriskMark/', parameters)
  }
}

export default ConsultationDrugWithAnAsteriskMarkService
