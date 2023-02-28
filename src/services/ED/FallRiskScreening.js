import Service from '../Service'

class FallRiskScreening extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/FallRiskScreening', parameters)
  }
}

export default FallRiskScreening
