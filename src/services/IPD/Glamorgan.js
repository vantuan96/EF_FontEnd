import Service from '../Service'

class Glamorgan extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/Glamorgan/', parameters)
  }
}

export default Glamorgan
