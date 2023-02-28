import Service from './Service'

class HandOverCheckList extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'IPD') {
    super(`api/ConsentForTransfusionOfBlood/${type}`, parameters)
  }
}

export default HandOverCheckList
