import Service from '../../Service'

class CoronaryIntervention extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/CoronaryIntervention', parameters)
  }
}

export default CoronaryIntervention
