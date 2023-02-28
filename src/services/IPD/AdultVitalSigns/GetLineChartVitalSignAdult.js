import Service from '../../Service'

class GetLineChartVitalSignAdult extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor () {
    super('api/IPD/VitalSignAdult/MewsChart/')
  }
}

export default GetLineChartVitalSignAdult
