import Service from '../../Service'

class GetListAllSumOf15DayTreatments extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/SumOf15DayTreatments', parameters)
  }
}

export default GetListAllSumOf15DayTreatments
