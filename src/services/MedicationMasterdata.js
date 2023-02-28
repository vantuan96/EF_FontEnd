import Service from './Service'

class MedicationMasterdata extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/MedicationMasterdata', parameters)
  }
}

export default MedicationMasterdata
