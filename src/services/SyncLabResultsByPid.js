import Service from './Service'

class SyncLabResultsByPid extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/SyncLabByPid/${parameters.Pid}/${parameters.SiteCode}/`)
  }
}

export default SyncLabResultsByPid
