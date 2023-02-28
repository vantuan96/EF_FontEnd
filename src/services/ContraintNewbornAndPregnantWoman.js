import Service from './Service'

class ContraintNewbornAndPregnantWoman extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/EIO/ContraintNewbornAndPregnantWoman/', parameters)
  }
}

export default ContraintNewbornAndPregnantWoman
