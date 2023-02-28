import Service from './Service'

class SurgeryAndProcedureSummaryV3 extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'IPD') {
    super(`api/${type}/SurgeryAndProcedureSummary`, parameters)
  }
}

export default SurgeryAndProcedureSummaryV3
