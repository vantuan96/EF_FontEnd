import Service from '../Service'

class OPDHandoverCheckListService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/HandOverCheckList', parameters)
  }
}

export default OPDHandoverCheckListService
