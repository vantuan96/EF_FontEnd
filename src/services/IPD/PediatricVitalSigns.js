import Service from '../Service'

class IPDPediatricVitalSign extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/VitalSignsForPediatric', parameters)
  }
}

export default IPDPediatricVitalSign
