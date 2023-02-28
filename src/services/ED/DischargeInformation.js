import Service from '../Service'

class DischargeInformation extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/DischargeInformation/', parameters)
  }
}

export default DischargeInformation
