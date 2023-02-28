import Service from '../Service'

class ClinicalBreastExamNote extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/ClinicalBreastExamNote/', parameters)
  }
}

export default ClinicalBreastExamNote
