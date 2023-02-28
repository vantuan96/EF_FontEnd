import Service from '../Service'

class MonitoringChartAndHandoverForms extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/MonitoringChartAndHandoverForm/', parameters)
  }
}

export default MonitoringChartAndHandoverForms
