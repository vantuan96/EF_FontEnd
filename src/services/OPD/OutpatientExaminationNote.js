import Service from '../Service'

class OutpatientExaminationNote extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/OPDOutpatientExaminationNote/', parameters)
  }
}

export default OutpatientExaminationNote
