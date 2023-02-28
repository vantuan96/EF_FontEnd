import Service from '../Service'

class ResuscitationService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'IPD') {
    super(`api/${type}/RequestNoCardiopulmonaryResuscitation/`, parameters)
  }
}

export default ResuscitationService
