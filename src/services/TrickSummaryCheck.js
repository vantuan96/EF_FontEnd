import Service from './Service'

class TrickSummaryCheck extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'OPD') {
    super(`api/${type}/TrickSummaryV2/CheckFormLocked/`, parameters)
  }
}

export default TrickSummaryCheck
