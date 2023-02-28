import Service from './Service'

class CardiacArrestRecord extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (type) {
    super(`api/${type}/CardiacArrestRecord/`)
  }
}

export default CardiacArrestRecord
