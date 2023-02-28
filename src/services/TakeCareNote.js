import Service from './Service'

class TakeCareNote extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, visitType = '') {
    super(`api/${visitType}/CareNote/`, parameters)
  }
}

export default TakeCareNote
