import Service from './Service'

class UpdateStatus extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('./api/MedicalRecord/UpdateStatus/', parameters)
  }
}

export default UpdateStatus
