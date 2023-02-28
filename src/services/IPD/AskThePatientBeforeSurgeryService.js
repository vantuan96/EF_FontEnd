import Service from '../Service'

class AskThePatientBeforeSurgeryService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/', parameters)
  }
}

export default AskThePatientBeforeSurgeryService
