import Service from './Service'

class HandOverCheckList extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/HandOverCheckList/', parameters)
  }
}

export default HandOverCheckList
