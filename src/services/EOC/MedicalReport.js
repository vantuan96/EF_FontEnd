import Service from '../Service'

class MedicalReport extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/EOC/Document/MedicalReport', parameters)
  }
}

export default MedicalReport
