import Service from './Service'

class SyncLabAndXrayResults extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/SyncLabAndXrayResults/`, parameters)
  }
}

export default SyncLabAndXrayResults
