import Service from '../../Service'

class GetMedicationHistory extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/MedicationHistory', parameters)
  }
}

export default GetMedicationHistory
