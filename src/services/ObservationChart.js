import Service from './Service'

class ObservationChart extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/${parameters.VisitType}/ObservationChart/`, parameters)
  }
}

export default ObservationChart
