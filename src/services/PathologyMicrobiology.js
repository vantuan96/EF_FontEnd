import Service from './Service'

class PathologyMicrobiology extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/PathologyMicrobiology', parameters)
  }
}

export default PathologyMicrobiology
