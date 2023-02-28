import Service from '../Service'

class ProcedureSummary extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/ProcedureSummary/', parameters)
  }
}

export default ProcedureSummary
