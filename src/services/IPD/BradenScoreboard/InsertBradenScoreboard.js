import Service from '../../Service'

class InsertBradenScoreboard extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/BradenScale/', parameters)
  }
}

export default InsertBradenScoreboard
