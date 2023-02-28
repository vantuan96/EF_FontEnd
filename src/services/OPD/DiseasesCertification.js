import Service from '../Service'

class DiseasesCertification extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/OPD/DiseasesCertification/', parameters)
  }
}

export default DiseasesCertification
