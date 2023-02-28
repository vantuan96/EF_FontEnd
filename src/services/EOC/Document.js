import Service from '../Service'

class Document extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/EOC/Document', parameters)
  }
}

export default Document
