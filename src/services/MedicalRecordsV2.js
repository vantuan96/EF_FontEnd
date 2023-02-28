import Service from './Service'

class MedicalRecords extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/MedicalRecord/V2', parameters)
  }
}

export default MedicalRecords
