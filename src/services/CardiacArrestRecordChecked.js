import Service from './Service'

class CardiacArrestRecordChecked extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (type) {
    super(`api/${type}/CardiacArrestRecord/CheckFormLocked`)
  }
}

export default CardiacArrestRecordChecked
