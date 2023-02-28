import Service from './Service'

class ProcedureSummary extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'OPD') {
    super(`api/${type}/ProcedureSummary/`, parameters)
  }
}

export default ProcedureSummary
