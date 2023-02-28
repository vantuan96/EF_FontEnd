import Service from '../Service'

class PatientHandOverRecord extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/PatientManagement/', parameters)
  }
}

export default PatientHandOverRecord
