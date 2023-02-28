import Service from '../../Service'

class GetDetailBradenScoreboard extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor () {
    super('api/IPD/BradenScale/GetById/')
  }
}

export default GetDetailBradenScoreboard
