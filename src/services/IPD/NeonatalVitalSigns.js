import Service from '../Service'

class IPDNeonatalVitalSign extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/NeonatalObservationChart', parameters)
  }
}

export default IPDNeonatalVitalSign
