import Service from '../Service'

class ConsultationDrugWithAnAsteriskMark extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type) {
    super(`api/${type}/ConsultationDrugWithAnAsteriskMark/`, parameters)
  }
}

export default ConsultationDrugWithAnAsteriskMark
