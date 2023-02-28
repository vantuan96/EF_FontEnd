import Service from './Service'

class Rooms extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Rooms', parameters)
  }
}

export default Rooms
