import Service from './Service'

class SyncLabAndXrayResultsByPid extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (type) {
    super(`api/SyncLabAndXrayResultsByPid/`)
  }
}

export default SyncLabAndXrayResultsByPid
