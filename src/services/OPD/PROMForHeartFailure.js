import Service from '../Service'

class PROMForHeartFailure extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'IPD') {
    super(`api/${type}/PROMForheartFailure/`, parameters)
  }
}

export default PROMForHeartFailure
