import Service from './Service'

class MedicalRecords extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/MedicalRecord', parameters)
  }
}

export default MedicalRecords
