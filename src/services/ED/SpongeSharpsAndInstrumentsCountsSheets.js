import Service from '../Service'

class SpongeSharpsAndInstrumentsCountsSheets extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/SpongeSharpsAndInstrumentsCountsSheets/`, parameters)
  }
}

export default SpongeSharpsAndInstrumentsCountsSheets
