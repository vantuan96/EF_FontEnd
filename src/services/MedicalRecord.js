import Service from './Service'

class MedicalRecord extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/MedicalRecord', parameters)
  }
}

export default MedicalRecord
