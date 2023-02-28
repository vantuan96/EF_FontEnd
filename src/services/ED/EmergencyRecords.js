import Service from '../Service'

class EmergencyRecords extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/EmergencyRecords/', parameters)
  }
}

export default EmergencyRecords
