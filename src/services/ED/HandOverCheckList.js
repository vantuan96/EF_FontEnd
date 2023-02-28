import Service from '../Service'

class HandOverCheckList extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ED/HandOverCheckList/', parameters)
  }
}

export default HandOverCheckList
