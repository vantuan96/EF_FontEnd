import Service from '../Service'

class SelfHarmRiskScreeningTool extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/SelfHarmRiskScreeningTool', parameters)
  }
}

export default SelfHarmRiskScreeningTool
