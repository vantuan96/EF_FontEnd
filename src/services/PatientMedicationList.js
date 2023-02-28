import Service from './Service'

class Notification extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/PatientMedicationList/', parameters)
  }
}

export default Notification
