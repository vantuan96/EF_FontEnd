import Service from '../Service'

class EOCOutpatientExaminationNote extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/EOC/OutpatientExaminationNote/', parameters)
  }
}

export default EOCOutpatientExaminationNote
