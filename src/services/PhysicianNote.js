import Service from './Service'

class PhysicianNote extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, visitType = '') {
    super(`api/${visitType}/PhysicianNote/`, parameters)
  }
}

export default PhysicianNote
