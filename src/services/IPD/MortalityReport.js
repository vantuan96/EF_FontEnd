import Service from '../Service'

class MortalityReport extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/MortalityReport/', parameters)
  }
}

export default MortalityReport
