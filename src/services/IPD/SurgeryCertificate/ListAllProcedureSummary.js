import Service from '../../Service'

class ListAllProcedureSummary extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/ListAllProcedureSummary/', parameters)
  }
}

export default ListAllProcedureSummary
