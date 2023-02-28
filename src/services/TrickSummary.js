import Service from './Service'

class TrickSummary extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'OPD') {
    super(`api/${type}/ProcedureSummaryV2`, parameters)
  }
}

export default TrickSummary
