import Service from '../Service'

class IPDPregnantVitalSign extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/VitalSignsForPregnantWoman', parameters)
  }
}

export default IPDPregnantVitalSign
