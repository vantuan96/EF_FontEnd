import Service from '../../Service'

class IPDVitalSignAdult extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor () {
    super('api/IPD/VitalSignAdult/GetById')
  }
}

export default IPDVitalSignAdult
