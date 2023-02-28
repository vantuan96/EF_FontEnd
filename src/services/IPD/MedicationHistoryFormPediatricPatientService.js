import Service from '../Service'

class MedicationHistory extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/MedicationHistory/Pediatric/', parameters)
  }
}

export default MedicationHistory
