import Service from './Service'

class MedicalRecordCDHA extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/RadiologyHistory`, parameters)
  }
}

export default MedicalRecordCDHA
