import Service from '../Service'

class UploadFileService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('UploadFiles/', parameters)
  }
}

export default UploadFileService
