import Service from './Service'

class StandingOrderMasterData extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/StandingOrderMasterDatas', parameters)
  }
}

export default StandingOrderMasterData
