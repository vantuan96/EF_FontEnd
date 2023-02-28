import Service from './Service'

class ProcedureSummaryCheck extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'OPD') {
    super(`api/${type}/ProcedureSummary/CheckFormLocked/`, parameters)
  }
}

export default ProcedureSummaryCheck
