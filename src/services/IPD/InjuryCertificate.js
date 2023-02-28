import Service from '../Service'

class InjuryCertificate extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/Document/InjuryCertificate', parameters)
  }
}

export default InjuryCertificate
