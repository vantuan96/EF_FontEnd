import Service from './Service'

class MasterDatas extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/MasterDatas', parameters)
  }
}

export default MasterDatas
