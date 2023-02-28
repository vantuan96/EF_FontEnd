import Service from './Service'

class OHMedicationHistory extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/OHMedicationHistory`, parameters)
  }
}

export default OHMedicationHistory
