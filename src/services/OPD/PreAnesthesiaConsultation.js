import Service from '../Service'

class PreAnesthesiaConsultation extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/OPD/PreAnesthesiaConsultation`, parameters)
  }
}

export default PreAnesthesiaConsultation
