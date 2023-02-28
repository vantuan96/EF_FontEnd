import Service from '../../Service'

class CoordinatingWithThePatient extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/StillBirth', parameters)
  }
}

export default CoordinatingWithThePatient
