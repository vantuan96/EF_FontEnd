import Service from '../Service'

class OPDNCCNBROV1 extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/NCCNBROV1', parameters)
  }
}

export default OPDNCCNBROV1
