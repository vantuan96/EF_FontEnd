import Service from '../Service'

class SkinTestResult extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/SkinTestResult/`, parameters)
  }
}

export default SkinTestResult
