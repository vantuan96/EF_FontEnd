import Service from '../../Service'

class InsertVitalSignAdult extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/VitalSignAdult/', parameters)
  }
}

export default InsertVitalSignAdult
