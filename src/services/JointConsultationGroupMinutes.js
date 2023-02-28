import Service from './Service'

class JointConsultationGroupMinutes extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type) {
    super(`api/${type}/JointConsultationGroupMinutes`, parameters)
  }
}

export default JointConsultationGroupMinutes
