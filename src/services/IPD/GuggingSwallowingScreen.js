import Service from '../Service'

class GuggingSwallowingScreen extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/GuggingSwallowingScreen', parameters)
  }
}

export default GuggingSwallowingScreen
