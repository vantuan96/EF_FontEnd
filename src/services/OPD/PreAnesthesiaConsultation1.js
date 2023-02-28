import Service from '../Service'

class PreAnesthesiaConsultation1 extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/PreAnesthesiaConsultation`, parameters)
  }
}

export default PreAnesthesiaConsultation1
