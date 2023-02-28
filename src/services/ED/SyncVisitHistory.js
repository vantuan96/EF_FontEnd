import Service from '../Service'

class SyncVisitHistory extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/SyncVisitHistory/', parameters)
  }
}

export default SyncVisitHistory
