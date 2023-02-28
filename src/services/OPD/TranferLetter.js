import Service from '../Service'

class TranferLetter extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/Document/TransferLetter', parameters)
  }
}

export default TranferLetter
