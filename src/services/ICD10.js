import Service from './Service'

class ICD10Service extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/ICD10/', parameters)
  }
}

export default ICD10Service
