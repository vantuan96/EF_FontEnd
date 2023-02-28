import Service from '../Service'

class ScaleForAssessmentOfSuicideIntent extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/IPDScaleForAssessmentOfSuicideIntent', parameters)
  }
}

export default ScaleForAssessmentOfSuicideIntent
