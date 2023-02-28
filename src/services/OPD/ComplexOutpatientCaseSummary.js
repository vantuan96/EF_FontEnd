import Service from '../Service'

class ComplexOutpatientCaseSummary extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Customer/ComplexOutpatientCaseSummary/', parameters)
  }
}

export default ComplexOutpatientCaseSummary
