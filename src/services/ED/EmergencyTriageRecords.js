import Service from '../Service'

class EmergencyTriageRecords extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/EmergencyTriageRecords/', parameters)
  }
}

export default EmergencyTriageRecords
