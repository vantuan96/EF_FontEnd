import Service from '../Service'

class PatientMedicationList extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/PatientMedicationList/', parameters)
  }
}

export default PatientMedicationList
