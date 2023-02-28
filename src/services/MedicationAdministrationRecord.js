import Service from './Service'

class MedicationAdministrationRecord extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/MedicationAdministrationRecord', parameters)
  }
}

export default MedicationAdministrationRecord
