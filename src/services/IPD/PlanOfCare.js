import Service from '../Service'

class PlanOfCare extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/PlanOfCare/', parameters)
  }
}

export default PlanOfCare
