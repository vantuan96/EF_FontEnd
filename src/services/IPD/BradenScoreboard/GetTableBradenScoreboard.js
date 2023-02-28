import Service from '../../Service'

class GetTableBradenScoreboard extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (data = {}) {
    super('api/IPD/BradenScale/GetByVisitId/', data)
  }
}

export default GetTableBradenScoreboard
