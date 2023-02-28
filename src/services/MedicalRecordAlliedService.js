import Service from './Service'

class MedicalRecordAlliedService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/AlliedService`, parameters)
  }
}

export default MedicalRecordAlliedService
